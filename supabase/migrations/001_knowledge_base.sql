-- GFS EPM Platform — Knowledge Base Schema
-- Run in Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

-- ─────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────────
create extension if not exists vector;

-- ─────────────────────────────────────────────────────────────
-- KNOWLEDGE BASE
-- ─────────────────────────────────────────────────────────────
create table if not exists knowledge_documents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  source      text not null,   -- 'website' | 'techspec' | 'calculator_result' | 'chat_feedback'
  locale      text not null default 'en',
  content     text not null,
  metadata    jsonb default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table if not exists knowledge_chunks (
  id           uuid primary key default gen_random_uuid(),
  document_id  uuid references knowledge_documents(id) on delete cascade,
  chunk_index  integer not null,
  content      text not null,
  token_count  integer,
  embedding    vector(1536),   -- text-embedding-3-small dimensions
  metadata     jsonb default '{}',
  created_at   timestamptz default now()
);

-- Full-text search index (for hybrid retrieval)
create index if not exists knowledge_chunks_fts
  on knowledge_chunks using gin(to_tsvector('english', content));

-- Approximate nearest-neighbour index (for vector search)
-- Tune 'lists' to sqrt(row_count) when you have > 1M rows
create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 50);

-- ─────────────────────────────────────────────────────────────
-- CHAT CONVERSATIONS  (for self-learning & analytics)
-- ─────────────────────────────────────────────────────────────
create table if not exists chat_conversations (
  id            uuid primary key default gen_random_uuid(),
  session_id    text not null,
  locale        text not null default 'en',
  messages      jsonb not null,          -- full MessageParam[] array
  lead_score    integer default 0,
  signals       text[] default '{}',
  feedback      text,                    -- 'helpful' | 'not_helpful' | null
  promoted      boolean default false,   -- true = promoted to knowledge_chunks
  input_tokens  integer,
  cached_tokens integer,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists chat_conversations_session_idx
  on chat_conversations(session_id);

create index if not exists chat_conversations_lead_score_idx
  on chat_conversations(lead_score desc);

-- ─────────────────────────────────────────────────────────────
-- CALCULATOR RUNS  (self-learning: confirmed data → RAG docs)
-- ─────────────────────────────────────────────────────────────
create table if not exists calculator_runs (
  id                          uuid primary key default gen_random_uuid(),
  session_id                  text,
  refinery_capacity_bpd       integer not null,
  current_additive_cost_bbl   numeric(10,4) not null,
  epm_cost_bbl                numeric(10,4),
  fuel_type                   text,           -- 'light_sweet' | 'medium_sour' | 'heavy_sour'
  sulfur_content_ppm          integer,
  current_hds_cost_bbl        numeric(10,4),
  emissions_compliance_annual numeric(14,2),
  operating_days_year         integer default 330,
  daily_savings               numeric(12,2),
  annual_savings              numeric(14,2),
  payback_months              numeric(5,1),
  inputs_json                 jsonb not null,
  locale                      text,
  confirmed_accurate          boolean,        -- user confirmed the estimate
  actual_savings_per_day      numeric(12,2),  -- user-provided actual (if different)
  knowledge_doc_id            uuid references knowledge_documents(id),
  created_at                  timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- MONITORING EVENTS
-- ─────────────────────────────────────────────────────────────
create table if not exists monitoring_events (
  id                   uuid primary key default gen_random_uuid(),
  event_type           text not null,   -- 'chat_turn' | 'rag_retrieval' | 'calculator_run'
  session_id           text,
  input_tokens         integer,
  cached_input_tokens  integer,
  output_tokens        integer,
  rag_chunks_retrieved integer,
  rag_retrieval_ms     integer,
  total_latency_ms     integer,
  locale               text,
  lead_score           integer,
  created_at           timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY  (server role bypasses via service_role key)
-- ─────────────────────────────────────────────────────────────
alter table knowledge_documents   enable row level security;
alter table knowledge_chunks      enable row level security;
alter table chat_conversations    enable row level security;
alter table calculator_runs       enable row level security;
alter table monitoring_events     enable row level security;

-- Service role has full access (used server-side only)
create policy "service_role_all" on knowledge_documents   for all using (true);
create policy "service_role_all" on knowledge_chunks      for all using (true);
create policy "service_role_all" on chat_conversations    for all using (true);
create policy "service_role_all" on calculator_runs       for all using (true);
create policy "service_role_all" on monitoring_events     for all using (true);

-- ─────────────────────────────────────────────────────────────
-- HYBRID SEARCH FUNCTION
-- Returns chunks ranked by combined semantic + keyword relevance (RRF)
-- ─────────────────────────────────────────────────────────────
create or replace function hybrid_search(
  query_embedding vector(1536),
  query_text      text,
  match_count     int default 5
)
returns table (
  id           uuid,
  content      text,
  document_id  uuid,
  semantic_rank bigint,
  keyword_rank  bigint,
  rrf_score     float
)
language sql stable
as $$
  with semantic as (
    select
      id,
      content,
      document_id,
      row_number() over (order by embedding <=> query_embedding) as rank
    from knowledge_chunks
    where embedding is not null
    order by embedding <=> query_embedding
    limit 20
  ),
  keyword as (
    select
      id,
      content,
      document_id,
      row_number() over (order by ts_rank_cd(to_tsvector('english', content), plainto_tsquery('english', query_text)) desc) as rank
    from knowledge_chunks
    where to_tsvector('english', content) @@ plainto_tsquery('english', query_text)
    order by ts_rank_cd(to_tsvector('english', content), plainto_tsquery('english', query_text)) desc
    limit 20
  ),
  combined as (
    select
      coalesce(s.id, k.id) as id,
      coalesce(s.content, k.content) as content,
      coalesce(s.document_id, k.document_id) as document_id,
      s.rank as semantic_rank,
      k.rank as keyword_rank,
      coalesce(1.0 / (60 + s.rank), 0) + coalesce(1.0 / (60 + k.rank), 0) as rrf_score
    from semantic s
    full outer join keyword k on s.id = k.id
  )
  select
    id,
    content,
    document_id,
    semantic_rank,
    keyword_rank,
    rrf_score
  from combined
  order by rrf_score desc
  limit match_count;
$$;
