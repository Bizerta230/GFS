# GFS EPM — FINAL TECHNICAL SPECIFICATION
## Full-Stack Automated Business Platform
### Document: GFS-PLATFORM-FINAL-001
### Version: 1.0 | March 2026

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Technology Stack Decision](#3-technology-stack-decision)
4. [Token Optimization Strategy: Obsidian + Claude](#4-token-optimization-strategy)
5. [Multilingual System (8 Languages)](#5-multilingual-system)
6. [AI Chatbot & Feedback System](#6-ai-chatbot--feedback-system)
7. [Business Automation Layer](#7-business-automation-layer)
8. [Agent Orchestrator Architecture](#8-agent-orchestrator-architecture)
9. [Financial Automation](#9-financial-automation)
10. [CRM & Lead Management](#10-crm--lead-management)
11. [Website: Full Page Map](#11-website-full-page-map)
12. [ROI Calculator](#12-roi-calculator)
13. [Budget & Cost Optimization](#13-budget--cost-optimization)
14. [Implementation Stages (VS Code + Cursor)](#14-implementation-stages)
15. [Step-by-Step Cursor Prompts](#15-step-by-step-cursor-prompts)
16. [Quality Assurance & Testing](#16-quality-assurance--testing)
17. [Maintenance & Monitoring](#17-maintenance--monitoring)

---

## 1. EXECUTIVE SUMMARY

### Project Scope

Build a fully automated business platform for GFS (Global Fuel Solutions) that includes:
- Marketing website with ROI calculator (8 languages)
- AI-powered chatbot for customer interaction and automatic CRM data collection
- Financial automation: invoicing, bank statement import, commercial offers
- Agent orchestrator managing sub-agents for specific tasks
- Minimal human involvement in day-to-day operations

### Key Principles
- **Maximum automation** — the system runs itself; humans handle only exceptions and strategy
- **Cost efficiency** — open-source where possible, SaaS only where justified by ROI
- **AI-native** — every process has an AI component for decision-making
- **Scalable** — architecture supports growth from 0 to 1000+ clients
- **Measurable** — every cost, every process, every outcome is tracked

### What Changed Since Previous TechSpec

| Previous TechSpec | This Document |
|---|---|
| 6 languages (EN, AR, RU, DE, ES, FR) | 8 languages (+Chinese, kept all previous) |
| Manual follow-up via email | AI chatbot + auto CRM collection |
| Basic contact form | Smart lead scoring + auto-routing |
| No financial automation | Full invoicing, bank sync, commercial offers |
| Single Cursor workflow | Obsidian vault + Claude Code + Cursor hybrid |
| No agent system | Orchestrator + 7 sub-agents |
| ~$8-15K budget | Optimized $12-22K with full automation |

---

## 2. ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│                  USER-FACING LAYER                   │
│  Next.js Website (8 languages) + ROI Calculator     │
│  AI Chatbot (Claude API) + Knowledge Base           │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              ORCHESTRATOR AGENT (n8n)                 │
│  Routes tasks → Sub-agents → Validates → Reports    │
└──┬──────┬──────┬──────┬──────┬──────┬──────┬────────┘
   │      │      │      │      │      │      │
   ▼      ▼      ▼      ▼      ▼      ▼      ▼
┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐
│LEAD ││SALES││FINANCE││SUPPORT││CONTENT││ANALYTICS││COMPLIANCE│
│AGENT││AGENT││AGENT ││AGENT  ││AGENT  ││AGENT    ││AGENT    │
└─────┘└─────┘└──────┘└───────┘└───────┘└─────────┘└─────────┘
   │      │      │        │       │         │          │
   ▼      ▼      ▼        ▼       ▼         ▼          ▼
┌─────────────────────────────────────────────────────┐
│              BACKEND SERVICES LAYER                   │
│  Odoo ERP (CRM, Invoicing, Accounting, Inventory)   │
│  + Stripe/Bank API + Email (Resend) + Storage       │
└─────────────────────────────────────────────────────┘
```

---

## 3. TECHNOLOGY STACK DECISION

### Why These Tools (Based on TOP Company Research)

| Layer | Tool | Why (Not Alternatives) | Monthly Cost |
|---|---|---|---|
| **Website** | Next.js 14+ (App Router) | Best SEO, i18n support, React ecosystem | $0 (framework) |
| **Hosting** | Vercel | Auto-deploy, edge CDN, serverless | $20/mo |
| **Styling** | Tailwind CSS | Utility-first, no design skills needed | $0 |
| **i18n** | next-intl | Best Next.js App Router integration, type-safe | $0 |
| **CRM/ERP** | Odoo Enterprise | All-in-one: CRM + invoicing + accounting + inventory. Open-source, $24.90/user/mo. Replaces 5-7 separate tools | ~$75/mo (3 users) |
| **Automation** | n8n (self-hosted) | AI-native workflows, 400+ integrations, free self-hosted, replaces Zapier ($600+/mo savings) | $5/mo (VPS) |
| **AI API** | Claude API (Anthropic) | Best for structured output, long context, reasoning | ~$50-150/mo |
| **Chatbot** | Custom (Claude API + Next.js) | Full control, multilingual, CRM-connected | Included in AI API |
| **Email** | Resend | Developer-friendly, React Email templates | $20/mo |
| **Payments** | Stripe | Global, invoicing API, bank payouts | 2.9% + $0.30/tx |
| **Bank Sync** | Odoo + Plaid/Salt Edge | Auto-import statements, reconciliation | $0-50/mo |
| **Analytics** | Plausible (self-hosted) | Privacy-first, GDPR compliant, no cookie banner | $0 (self-hosted) |
| **Knowledge Base** | Obsidian + Claude Code | Token optimization, context management | $0 |
| **Translations** | Crowdin + Claude API | AI-assisted translation + human review | $0-50/mo |
| **PDF Generation** | react-pdf / Puppeteer | Invoices, reports, commercial offers | $0 |

**Estimated monthly operational cost: $170-370/mo** (vs. $800-2000/mo with SaaS-only stack)

---

## 4. TOKEN OPTIMIZATION STRATEGY

### Problem
Claude API costs scale with tokens. A naive approach sends entire project context every time, wasting 60-80% of tokens on repeated information.

### Solution: Obsidian Vault as Context Manager

```
GFS-Project-Vault/
├── .claude/                    # Claude Code skills + config
│   ├── CLAUDE.md              # Master project context (always loaded)
│   ├── skills/
│   │   ├── obsidian-skills/   # Kepano's official Obsidian skills
│   │   ├── website-dev.md     # Website development patterns
│   │   ├── odoo-integration.md # Odoo API patterns
│   │   └── n8n-workflows.md   # Automation patterns
│   └── memory/                # Session summaries (auto-generated)
├── 00-Project/
│   ├── Architecture.md        # System architecture (this document, condensed)
│   ├── Tech-Stack.md          # All tool decisions with reasons
│   ├── API-Keys.md            # (encrypted) All credentials
│   └── Budget-Tracker.md      # Running cost tracking
├── 01-Website/
│   ├── Pages/                 # Page specs (1 file per page)
│   ├── Components/            # Reusable component specs
│   ├── i18n/                  # Translation keys and rules
│   └── SEO/                   # Keywords, meta descriptions
├── 02-Calculator/
│   ├── Logic.md               # All formulas and constants
│   ├── Prompts/               # Claude API prompts for calculator
│   └── Test-Cases.md          # Expected inputs/outputs
├── 03-Chatbot/
│   ├── System-Prompt.md       # Main chatbot personality
│   ├── Knowledge-Base/        # FAQ, product info, objection handling
│   └── Escalation-Rules.md    # When to route to human
├── 04-Automation/
│   ├── n8n-Workflows/         # Workflow descriptions (1 per file)
│   ├── Agent-Specs/           # Sub-agent specifications
│   └── Triggers.md            # All automation triggers
├── 05-Finance/
│   ├── Invoice-Templates.md   # Invoice structure and rules
│   ├── Banking-Setup.md       # Bank integration config
│   └── Accounting-Rules.md    # Chart of accounts, tax rules
├── 06-Content/
│   ├── Translations/          # Translation status tracker
│   ├── Email-Templates/       # All automated emails
│   └── Documents/             # Commercial offers, whitepapers
└── 07-Analytics/
    ├── KPIs.md                # All metrics and targets
    ├── Reports/               # Report templates
    └── Alerts.md              # Alert thresholds
```

### How Token Optimization Works

1. **CLAUDE.md** (500 tokens) — always loaded, contains project summary + navigation
2. **Per-task context** — Cursor/Claude Code loads ONLY the relevant folder
3. **Session memory** — after each session, Claude summarizes key decisions → saved to memory/
4. **QMD semantic search** — instead of loading entire files, search for relevant chunks (60%+ token reduction)
5. **Prompts in English** — all system prompts and technical docs in English (30-40% fewer tokens than Russian for same content)

### Setup Steps (for non-programmer)

```
STEP 1: Install Obsidian (free) from obsidian.md
STEP 2: Create vault in your project folder
STEP 3: Install plugins: Terminal, Nexus (MCP bridge)
STEP 4: Copy the folder structure above
STEP 5: In VS Code (Cursor), the vault folder IS your project folder
```

---

## 5. MULTILINGUAL SYSTEM (8 LANGUAGES)

### Supported Languages

| Code | Language | Priority | Text Expansion vs EN | RTL | Notes |
|---|---|---|---|---|---|
| `en` | English | P0 (default) | baseline | No | All content written first in EN |
| `ar` | Arabic | P1 | -20% shorter | **Yes** | RTL layout, custom fonts |
| `ru` | Russian | P1 | +15% longer | No | CIS market |
| `de` | German | P2 | +30% longer | No | EU engineering market |
| `es` | Spanish | P2 | +20% longer | No | Latin America + Spain |
| `fr` | French | P2 | +20% longer | No | Africa + France + Canada |
| `zh` | Chinese (Simplified) | P2 | -30% shorter | No | China market, special fonts |
| `zh-tw` | Chinese (Traditional) | P3 (optional) | -30% shorter | No | Taiwan, Hong Kong |

### Technical Implementation

**Library:** `next-intl` (best for Next.js App Router)

**URL structure:** subdirectory pattern
```
gfs-epm.com/           → English (default)
gfs-epm.com/ar/        → Arabic
gfs-epm.com/ru/        → Russian
gfs-epm.com/de/        → German
gfs-epm.com/es/        → Spanish
gfs-epm.com/fr/        → French
gfs-epm.com/zh/        → Chinese
```

**Translation workflow:**
1. All content written in English (source)
2. Claude API generates first-pass translations for all 7 languages
3. Crowdin platform stores translations, enables human review
4. Native speakers review critical pages (Home, Technology, Calculator)
5. Auto-deploy on approval

**Critical design rules for multilingual:**
- No fixed-width text containers (German is 30% longer)
- All buttons use `min-width`, not `width`
- Arabic: complete RTL mirror (layout, icons, reading direction)
- Chinese: Noto Sans SC font, larger base font size (16px → 18px)
- Language switcher: language names in their own script (Deutsch, Español, Français, 中文, العربية, Русский)
- No flags (flags = countries, not languages)
- Store preference in cookie for returning visitors

### Translation Budget

| Method | Cost per 1000 words | Quality | Speed |
|---|---|---|---|
| Claude API auto-translate | ~$0.05 | 85-90% accurate | Instant |
| Crowdin community | $0 (if open-source model) | 90-95% | 1-3 days |
| Professional translator | $80-150 | 98%+ | 3-7 days |
| **Recommended hybrid** | ~$5-15/page | 95%+ | 1-2 days |

---

## 6. AI CHATBOT & FEEDBACK SYSTEM

### Architecture

```
User opens chat widget → Claude API processes message
                       → Checks Knowledge Base (RAG)
                       → Responds in user's language
                       → Logs to CRM (Odoo) automatically
                       → Scores lead (if applicable)
                       → Routes to human (if needed)
```

### Chatbot System Prompt (English for token efficiency)

```
You are GFS Technical Advisor, an AI assistant for Global Fuel Solutions.

ROLE: Help visitors understand EPM fuel additive technology, answer technical 
questions, collect lead information naturally, and route serious inquiries to 
the sales team.

KNOWLEDGE BASE:
- EPM is a multi-functional fuel additive: demulsification, desulfurization 
  (partial, 30-40%), combustion improvement (95-99%), emission reduction 
  (NOx ×284 below Euro 6), biocide, anti-corrosion
- Pricing: projected $1.50-3.00/bbl depending on crude type
- Breakeven: Light sweet $1.71/bbl, Medium sour $2.81/bbl, Heavy sour $4.68/bbl
- Target customers: refineries processing 50K-500K bbl/day, especially 
  medium-to-heavy sour crude (ADNOC, Aramco, PEMEX, Petrobras)
- EPM data is PRELIMINARY — always state this clearly

BEHAVIOR RULES:
1. Detect user language automatically, respond in same language
2. Be technically precise — this audience is petroleum engineers
3. After 2-3 exchanges, naturally ask for: name, company, role, email
4. NEVER fabricate data. If unsure, say "our technical team can provide 
   detailed specifications"
5. If user asks about pricing/pilot — flag as HOT LEAD, collect info, 
   notify CBDO within 1 hour
6. If user asks about competitor comparison — provide factual data from 
   competitive analysis, remain objective
7. Maximum response: 150 words (concise, professional)
8. Log every conversation to CRM with: language, topics discussed, 
   lead score (0-100), recommended next action

LEAD SCORING:
- Mentions specific refinery/company: +30
- Asks about pricing: +25
- Asks about pilot program: +35
- Provides email: +20
- Technical depth questions: +15
- Just browsing/student: +5

ESCALATION:
- Score > 60: AUTO-NOTIFY CBDO via email + Slack
- Score > 80: FLAG URGENT — schedule call within 24h
- User requests human: immediate handoff acknowledgment
```

### Feedback Collection (Automatic)

Every chat interaction automatically creates/updates in Odoo CRM:
- **Contact record**: name, email, company, role, language
- **Interaction log**: full transcript, topics, sentiment
- **Lead score**: cumulative across all interactions
- **Tags**: auto-assigned (e.g., "refinery", "marine", "investor", "media")
- **Next action**: auto-scheduled based on score

### Chat Widget Technical Specs

- Position: bottom-right corner, floating button
- Expand: 380px wide × 520px tall panel
- Mobile: full-screen overlay
- Offline mode: collect email + message, queue for processing
- Typing indicator: streaming response from Claude API
- File upload: accept PDF/images for technical questions
- History: persistent per user (cookie-based for anonymous, account-based for logged-in)

---

## 7. BUSINESS AUTOMATION LAYER

### n8n as Orchestration Platform

**Why n8n (not Zapier, Make, or custom code):**
- Self-hosted = unlimited executions for free (Zapier costs $600+/mo)
- 400+ pre-built integrations including Odoo, Stripe, Claude API
- Native AI Agent nodes — can build autonomous workflows
- Visual builder — non-programmers can modify workflows
- Fair-code license — full access to source code

**Deployment:** Docker container on $5/mo VPS (DigitalOcean/Hetzner)

### Core Automated Workflows

| # | Workflow | Trigger | Actions | Human Involvement |
|---|---|---|---|---|
| 1 | **New Lead Processing** | Chat/form submission | Create Odoo contact → Score lead → Send welcome email → Notify CBDO if hot | None (unless hot lead) |
| 2 | **Follow-Up Sequence** | 3 days after first contact | Send follow-up email → Check if opened → If no response in 7 days, send second follow-up → If still no response, move to nurture | None |
| 3 | **Meeting Scheduler** | Lead score > 60 | Send Calendly link → Create calendar event → Send reminder 1h before → After meeting, create summary note in CRM | Meeting itself only |
| 4 | **Invoice Generation** | Sales order confirmed in Odoo | Generate PDF invoice → Email to client → Log in accounting → Set payment reminder for 30 days | Approval for first invoice per client |
| 5 | **Bank Statement Import** | Daily at 6:00 AM | Fetch bank statements (Plaid/Salt Edge API) → Match with invoices → Auto-reconcile → Flag unmatched for review | Review unmatched only |
| 6 | **Commercial Offer** | CBDO triggers from CRM | Pull client data → Calculate custom ROI → Generate PDF offer from template → Send for approval → Email to client | Approval before send |
| 7 | **Content Publishing** | Scheduled dates | Pull article from CMS → Translate to all languages → Post to website → Share on LinkedIn → Send newsletter | Content review |
| 8 | **Weekly Report** | Monday 8:00 AM | Aggregate: leads, conversions, revenue, website traffic, chatbot interactions → Generate PDF → Email to team | None |
| 9 | **Chatbot Escalation** | Lead score > 80 | Immediate Slack notification → Email to CBDO → Create urgent task in Odoo → If no response in 2h, SMS alert | Response to lead |
| 10 | **Subscription Renewal** | 30 days before expiry | Email reminder → If no response, email at 14 days → If no response, call task for sales → Process payment on renewal date | None (unless issue) |

---

## 8. AGENT ORCHESTRATOR ARCHITECTURE

### Design Pattern: Hierarchical Orchestration

Based on best practices from Deloitte, Gartner, and leading enterprise implementations in 2026.

```
                    ┌──────────────────┐
                    │  ORCHESTRATOR    │
                    │  (n8n Master)    │
                    │                  │
                    │ Routes tasks     │
                    │ Validates output │
                    │ Handles errors   │
                    │ Reports status   │
                    └────────┬─────────┘
                             │
         ┌───────┬───────┬───┴───┬───────┬───────┬───────┐
         ▼       ▼       ▼       ▼       ▼       ▼       ▼
    ┌────────┐┌──────┐┌───────┐┌───────┐┌───────┐┌──────┐┌──────┐
    │ LEAD   ││SALES ││FINANCE││SUPPORT││CONTENT││ANALYT││COMPLI│
    │ AGENT  ││AGENT ││AGENT  ││AGENT  ││AGENT  ││AGENT ││AGENT │
    └────────┘└──────┘└───────┘└───────┘└───────┘└──────┘└──────┘
```

### Sub-Agent Specifications

**Agent 1: Lead Agent**
- **Trigger:** New form submission, chat interaction, website visit with high engagement
- **Actions:** Score lead, enrich data (company size, industry), route to appropriate pipeline
- **Tools:** Odoo CRM API, Claude API (for scoring), Clearbit/Clay (enrichment)
- **Autonomy level:** Full autonomous — human review only for score > 80

**Agent 2: Sales Agent**
- **Trigger:** Lead reaches "qualified" status, meeting scheduled, proposal requested
- **Actions:** Prepare meeting brief, generate custom ROI calculation, draft commercial offer
- **Tools:** Odoo CRM, Claude API, PDF generator, Calculator engine
- **Autonomy level:** Semi-autonomous — generates proposals, human approves before sending

**Agent 3: Finance Agent**
- **Trigger:** Invoice due, payment received, bank statement available, expense submitted
- **Actions:** Generate invoices, match payments, reconcile accounts, flag anomalies
- **Tools:** Odoo Accounting, Stripe API, Plaid/bank API, PDF generator
- **Autonomy level:** Full autonomous for routine, human approval for amounts > $10,000

**Agent 4: Support Agent**
- **Trigger:** Customer question via chat/email, ticket created, SLA approaching
- **Actions:** Search knowledge base, generate response, escalate if needed
- **Tools:** Claude API (with RAG), Odoo Helpdesk, email
- **Autonomy level:** Full autonomous for FAQ, escalate for technical/complaint

**Agent 5: Content Agent**
- **Trigger:** Content calendar date, new blog post needed, translation required
- **Actions:** Draft content, translate, schedule publication, share on social
- **Tools:** Claude API, Crowdin API, LinkedIn API, website CMS
- **Autonomy level:** Semi-autonomous — drafts content, human reviews before publish

**Agent 6: Analytics Agent**
- **Trigger:** Daily/weekly/monthly schedule, anomaly detected
- **Actions:** Aggregate metrics, generate reports, detect trends, alert on anomalies
- **Tools:** Plausible API, Odoo reports, Stripe dashboard, n8n execution logs
- **Autonomy level:** Full autonomous — generates reports, alerts on issues

**Agent 7: Compliance Agent**
- **Trigger:** New user data collected, GDPR request, policy change
- **Actions:** Validate data handling, process deletion requests, audit trail
- **Tools:** Odoo, database, email
- **Autonomy level:** Full autonomous for standard requests, legal review for disputes

### Error Handling & Fallbacks

| Scenario | Primary Action | Fallback |
|---|---|---|
| Agent fails to complete task | Retry 3x with exponential backoff | Alert orchestrator → human notification |
| Claude API rate limit | Queue task, retry after cooldown | Switch to cached response or template |
| Odoo API down | Queue all CRM operations | Batch process when restored |
| Bank API connection lost | Skip import, try next hour | Manual import notification after 24h |
| Lead score calculation fails | Use default score (50) | Flag for manual review |

---

## 9. FINANCIAL AUTOMATION

### Invoice Workflow

```
Sale Confirmed in Odoo
        │
        ▼
n8n generates invoice (PDF)
  - Client data from CRM
  - Line items from sale order
  - Tax calculation (by region)
  - Payment terms (Net 30/60)
  - Multi-currency support
        │
        ▼
Auto-email to client
  - PDF attachment
  - Payment link (Stripe)
  - Follow-up reminders: Day 7, 21, 28
        │
        ▼
Payment received (Stripe webhook / bank match)
  - Mark invoice paid
  - Update accounting
  - Send receipt
  - Update revenue dashboard
```

### Bank Statement Automation

**Supported banks (via Plaid or Salt Edge):**
- UAE banks (ADCB, Emirates NBD, FAB)
- European banks (SEPA compatible)
- US banks (via Plaid)
- Russian banks (manual CSV import)

**Daily process (6:00 AM):**
1. Fetch transactions from all connected accounts
2. AI-powered matching: transaction description → invoice/expense
3. Auto-reconcile matched items (confidence > 95%)
4. Flag unmatched items for review
5. Generate daily cash position report

### Commercial Offer Automation

**Trigger:** CBDO clicks "Generate Offer" in CRM

**Process:**
1. Pull client data: company, refinery capacity, crude type, current costs
2. Run ROI calculator with client-specific parameters
3. Generate branded PDF proposal (multi-language based on client preference)
4. Include: executive summary, ROI projection, sensitivity analysis, pilot program details
5. Route for CBDO approval
6. On approval: email to client with tracking (open/download notifications)

### Accounting Integration

**Odoo handles:**
- Chart of accounts (multi-currency: USD, EUR, AED, SAR, RUB, CNY)
- Accounts payable / receivable
- Bank reconciliation
- Tax reporting (VAT for UAE/EU, sales tax for US)
- Financial statements (P&L, balance sheet, cash flow)
- Multi-entity support (if GFS has subsidiaries)

---

## 10. CRM & LEAD MANAGEMENT

### Odoo CRM Pipeline

```
LEAD → QUALIFIED → PROPOSAL → NEGOTIATION → PILOT → CONTRACT → CLIENT
 │         │           │           │           │         │         │
Auto-     Sales       Offer      Follow-    Pilot     Contract   Onboard
score     Agent       generated   up auto   setup     generated  sequence
          reviews     (AI+human) sequence   manual    (template) automated
```

### Automatic Data Collection Points

| Source | Data Captured | Method |
|---|---|---|
| Website chat | Name, company, email, role, interests, language | Chatbot extracts naturally during conversation |
| ROI Calculator | All input parameters + results | Gated: email required to see full report |
| Contact form | Name, email, company, message | Direct form submission |
| White paper download | Email, company, role | Gated content |
| Conference QR scan | Name, company | QR → landing page → form |
| Email opens/clicks | Engagement tracking | Resend analytics |
| Website behavior | Pages visited, time on site, return visits | Plausible analytics |

### Lead Scoring Model

| Action | Points | Decay |
|---|---|---|
| Visits technology page | +5 | -1/week |
| Uses ROI calculator | +20 | -2/week |
| Downloads white paper | +15 | -2/week |
| Chats with bot (technical Qs) | +15 | -1/week |
| Provides email | +20 | Never |
| Mentions refinery by name | +30 | Never |
| Asks about pilot | +35 | -3/week |
| Asks about pricing | +25 | -2/week |
| Returns to site (2+ visits) | +10 | -1/week |
| Opens email | +5 | -1/week |

**Thresholds:**
- 0-30: Cold → nurture sequence
- 31-60: Warm → personalized follow-up
- 61-80: Hot → CBDO notification, schedule call
- 81-100: Urgent → immediate outreach, pilot proposal

---

## 11. WEBSITE: FULL PAGE MAP

### Site Structure (8 languages × ~20 pages = 160 total URLs)

```
/                           Home
/technology/
    /how-it-works          How EPM Works (science)
    /comparison            EPM vs Traditional Methods
    /data                  Test Data & Results
/solutions/
    /upstream              Upstream Oil & Gas
    /refinery              Refinery Operations
    /marine                Marine Fuel
    /storage               Storage & Transportation
/calculator                ROI Calculator (gated results)
/resources/
    /white-paper           Technical White Paper (gated)
    /data-sheets           Product Data Sheets
    /articles              Blog / Articles
    /press                 Press Releases
    /videos                Video Library
    /faq                   FAQ
/about/
    /team                  Leadership Team
    /partners              Partners & Validation
    /careers               Careers (future)
/investors                 Investor Portal (gated)
/contact                   Contact Form
/pilot                     Request Pilot Program
/demo                      Request Demo / Consultation
/privacy                   Privacy Policy
/terms                     Terms of Service
```

---

## 12. ROI CALCULATOR

Refer to existing documents:
- `GFS ROI Calculator TechSpec` (full logic, formulas, constants)
- `GFS ROI AI Prompt Package v2` (Claude API prompts, examples, error handling)
- `GFS EPM Cursor Step-by-Step Guide` (implementation steps)

**What's NEW in this version:**
- Calculator available in all 8 languages
- Results auto-save to CRM (with user consent)
- PDF report generated in user's language
- Chatbot offered after calculation for Q&A
- A/B testing on gating strategy (gate at 50% vs 100% of results)

---

## 13. BUDGET & COST OPTIMIZATION

### Monthly Operational Costs (Steady State)

| Service | Cost/mo | What It Covers | Alternatives Considered |
|---|---|---|---|
| Vercel (Pro) | $20 | Website hosting, CDN, serverless | Netlify ($19), self-host ($5 but more maintenance) |
| Odoo Enterprise (3 users) | $75 | CRM + Invoicing + Accounting | HubSpot ($500+), Salesforce ($750+), Zoho ($90) |
| n8n VPS (Hetzner) | $5 | Automation platform (unlimited) | Zapier ($600), Make ($200) |
| Claude API | $50-150 | Chatbot + Calculator + Content | GPT-4 (similar cost, less structured output) |
| Resend | $20 | Transactional + marketing emails | SendGrid ($25), Mailchimp ($50+) |
| Plausible (self-hosted) | $0 | Web analytics | Google Analytics (free but privacy issues) |
| Plaid / Salt Edge | $0-50 | Bank statement import | Manual import ($0 but time cost) |
| Domain + SSL | $15 | gfs-epm.com | — |
| Crowdin | $0-50 | Translation management | Lokalise ($120), Phrase ($100) |
| Backups (S3) | $5 | Daily encrypted backups | — |
| **TOTAL** | **$190-390/mo** | | **Savings vs SaaS-only: $1,500-3,000/mo** |

### One-Time Implementation Costs

| Stage | Scope | Est. Cost | Timeline |
|---|---|---|---|
| Stage 1: MVP Website | Home + Technology + Contact + Calculator (EN only) | $2,000-3,500 | 2-3 weeks |
| Stage 2: Full Website | All pages + 3 languages (EN, AR, RU) | $2,000-3,000 | 2-3 weeks |
| Stage 3: Chatbot + CRM | AI chatbot + Odoo setup + lead scoring | $1,500-2,500 | 1-2 weeks |
| Stage 4: Automation | n8n setup + 10 core workflows + agents | $2,000-3,500 | 2-3 weeks |
| Stage 5: Finance | Invoicing + bank sync + commercial offers | $1,500-2,500 | 1-2 weeks |
| Stage 6: Full i18n | Add DE, ES, FR, ZH + review | $1,500-3,000 | 2-3 weeks |
| Stage 7: Polish | Testing, optimization, documentation | $1,000-2,000 | 1-2 weeks |
| **TOTAL** | | **$11,500-20,000** | **11-18 weeks** |

### Cost Efficiency Measures

1. **Obsidian vault** — reduces Claude token usage by 60%+ ($30-90/mo savings)
2. **n8n self-hosted** — saves $600+/mo vs Zapier
3. **Odoo** — replaces CRM ($500) + invoicing ($200) + accounting ($300) + helpdesk ($200)
4. **English prompts** — 30-40% fewer tokens than Russian
5. **Cached responses** — chatbot FAQ answers cached, not re-generated
6. **Progressive loading** — translate P0 languages first, add P2 languages later
7. **One-time investments** — most costs are implementation, not recurring

---

## 14. IMPLEMENTATION STAGES (VS CODE + CURSOR)

### Prerequisites (Install Once)

```bash
# 1. Install Node.js (LTS version)
# Download from: https://nodejs.org

# 2. Install VS Code with Cursor extension
# Download from: https://cursor.sh

# 3. Install Obsidian
# Download from: https://obsidian.md

# 4. Install Git
# Download from: https://git-scm.com

# 5. Get API Keys (save in Obsidian vault securely):
#    - Anthropic (Claude API): console.anthropic.com
#    - Vercel: vercel.com
#    - Stripe: stripe.com
#    - Resend: resend.com
```

### Stage 1: Foundation (Week 1-2)

**Goal:** Working website with Home page, Technology section, Contact form. English only.

**Steps:**
1. Set up Obsidian vault (copy folder structure from Section 4)
2. Initialize Next.js project
3. Create base layout (header, footer, navigation)
4. Build Home page
5. Build Technology pages (3 pages)
6. Build Contact form
7. Deploy to Vercel

### Stage 2: Calculator + Gating (Week 3-4)

**Goal:** Working ROI calculator with email gating and PDF export.

**Steps:**
1. Build calculator input form (5 required + 5 optional fields)
2. Implement local JS calculation engine (fallback)
3. Connect Claude API for enhanced calculation
4. Build results display with charts (Recharts)
5. Add email gating (require email for full results)
6. Build PDF report generator
7. Connect to Resend for email delivery

### Stage 3: Chatbot + CRM (Week 5-6)

**Goal:** AI chatbot on website, Odoo CRM set up, automatic lead collection.

**Steps:**
1. Set up Odoo instance (cloud or self-hosted)
2. Configure CRM pipeline, lead scoring fields
3. Build chat widget component (React)
4. Connect to Claude API with system prompt
5. Build CRM integration (chat → Odoo contact/lead)
6. Set up email notifications for hot leads
7. Test: simulate 10 conversations, verify CRM entries

### Stage 4: Multilingual (Week 7-8)

**Goal:** Website in 3 priority languages (EN, AR, RU), translation system ready for expansion.

**Steps:**
1. Install and configure next-intl
2. Extract all strings to translation files
3. Build language switcher component
4. Generate AR/RU translations via Claude API
5. Implement RTL layout for Arabic
6. Test all pages in all 3 languages
7. Set up Crowdin for ongoing translation management

### Stage 5: Automation + Agents (Week 9-11)

**Goal:** n8n deployed, 10 core workflows running, agent system active.

**Steps:**
1. Deploy n8n on VPS (Docker)
2. Connect n8n to Odoo, Resend, Claude API, Stripe
3. Build workflows 1-10 (from Section 7 table)
4. Configure orchestrator logic
5. Set up monitoring and alerting
6. Test: trigger each workflow manually, verify outputs
7. Enable automation (switch from manual to auto triggers)

### Stage 6: Financial Automation (Week 12-13)

**Goal:** Invoicing, bank sync, commercial offer generation working.

**Steps:**
1. Configure Odoo Accounting (chart of accounts, tax rules)
2. Set up Stripe integration for payments
3. Build invoice PDF template
4. Connect bank accounts (Plaid/Salt Edge or manual CSV)
5. Build commercial offer template and generation workflow
6. Set up auto-reconciliation rules
7. Test: create invoice → pay via Stripe → verify reconciliation

### Stage 7: Remaining Languages + Polish (Week 14-18)

**Goal:** All 8 languages live, all systems tested, documentation complete.

**Steps:**
1. Add German, Spanish, French, Chinese translations
2. Test all languages (layout, content, functionality)
3. Performance optimization (Lighthouse score > 90)
4. Security audit (GDPR compliance, reCAPTCHA, rate limiting)
5. Write maintenance documentation
6. Train team on Odoo, n8n, content management
7. Go-live checklist and launch

---

## 15. STEP-BY-STEP CURSOR PROMPTS

### How to Use These Prompts

1. Open VS Code with Cursor
2. Open the Obsidian vault folder as your project
3. Open Cursor Chat (Ctrl+L or Cmd+L)
4. Copy-paste the prompt for your current step
5. Let Cursor generate code
6. Verify it works (run `npm run dev`, check browser)
7. Move to next step

### STAGE 1 PROMPTS

**Prompt 1.1 — Project Setup:**
```
Create a new Next.js 14 project with App Router, TypeScript, and Tailwind CSS.
Use the following structure:
- /src/app/ for pages
- /src/components/ for reusable components
- /src/lib/ for utilities
- /src/i18n/ for translations (prepare for next-intl)
- /public/ for static assets

Install these dependencies:
- next-intl (for i18n)
- recharts (for charts)
- lucide-react (for icons)
- @react-pdf/renderer (for PDF generation)
- resend (for emails)

Create a tailwind.config.ts with a professional color scheme:
- Primary: deep blue (#1e3a5f)
- Secondary: petroleum gold (#c4973b)
- Accent: technical green (#2d8a4e)
- Background: clean white/light gray
- Text: dark charcoal (#1a1a2e)

Set up the project. Show me the commands to run and the files to create.
```

**Prompt 1.2 — Layout & Navigation:**
```
Read the file at 01-Website/Pages/ in the vault for page structure.

Create the main layout with:
1. Header: GFS logo (placeholder SVG), navigation menu, language switcher 
   (prepare for 8 languages but only EN active now), CTA button "Request Pilot"
2. Footer: company info, quick links, contact info, social media links, 
   disclaimer text, copyright
3. Mobile: hamburger menu, sticky header, bottom CTA bar

Navigation items:
- Technology (dropdown: How It Works, Comparison, Data)
- Solutions (dropdown: Upstream, Refinery, Marine, Storage)
- Calculator
- Resources (dropdown: White Paper, Articles, FAQ)
- About (dropdown: Team, Partners)
- Contact

Style: professional, clean, petroleum industry aesthetic. 
No generic startup look. Think Shell/BP/Halliburton quality.
```

**Prompt 1.3 — Home Page:**
```
Build the Home page with these sections:

1. HERO: Full-width, dark gradient background
   - Headline: "One Additive. Five Functions. Zero Compromise."
   - Subheadline: "EPM replaces 3-5 chemical additives with a single 
     multifunctional solution — reducing costs, emissions, and complexity."
   - CTA: "Calculate Your Savings" → /calculator
   - Secondary CTA: "Learn the Science" → /technology/how-it-works

2. FIVE FUNCTIONS: Grid/cards showing 5 EPM functions
   - Demulsification (water separation)
   - Partial Desulfurization (30-40% sulfur reduction)
   - Combustion Enhancement (95-99% efficiency)
   - Emission Reduction (NOx ×284 below Euro 6)
   - Biocide + Anti-corrosion
   Each card: icon, title, one-line description, "Learn more" link

3. NUMBERS: Key statistics in large bold format
   - "$0.65-5.80/bbl for separate additives → $1.50-3.00/bbl for EPM"
   - "5 functions in 1 product"
   - "Up to 98-99% combustion efficiency"
   - "Emissions up to ×284 below Euro 6"

4. COMPARISON PREVIEW: Simple table or visual
   - "Traditional approach: 3-5 vendors, 3-5 products, 3-5 contracts"
   - "EPM approach: 1 vendor, 1 product, 1 solution"
   - CTA: "See Full Comparison" → /technology/comparison

5. TRUST: Partner logos placeholder, "Pilot Program" CTA
   - "Currently accepting pilot program applications for refineries 
     processing 50,000+ bbl/day"

6. LATEST: Space for 1-2 latest articles/news

IMPORTANT: All text should be translation-ready (use placeholder functions 
that will be replaced with next-intl later). No hardcoded strings.
```

*(Continue with prompts for each subsequent step — the pattern is established)*

### STAGE 3 PROMPTS (Chatbot Example)

**Prompt 3.4 — Chat Widget:**
```
Build an AI chat widget component for the GFS website.

Requirements:
1. Floating button (bottom-right): circular, GFS brand color, chat icon
2. On click: expand to 380×520px panel with:
   - Header: "GFS Technical Advisor" + close button
   - Messages area: scrollable, supports markdown
   - Input: text field + send button + file upload (PDF/image)
   - Typing indicator while AI responds
3. API route: /api/chat that connects to Claude API
   - System prompt: read from vault at 03-Chatbot/System-Prompt.md
   - Stream responses (use ReadableStream)
   - Log every interaction to a webhook (for n8n → Odoo later)
4. Language detection: detect from page locale, respond in same language
5. Persist chat history in sessionStorage (for session continuity)
6. Lead collection: after 2 messages, show subtle "Get personalized 
   analysis" prompt asking for email
7. Mobile: full-screen overlay with swipe-down to close

Use the Claude API model: claude-sonnet-4-20250514
Max tokens per response: 500
Temperature: 0.3 (factual, not creative)

Read 03-Chatbot/Knowledge-Base/ for FAQ content to include in the system prompt.
```

---

## 16. QUALITY ASSURANCE & TESTING

### Automated Testing

| Type | Tool | Scope |
|---|---|---|
| Unit tests | Jest + React Testing Library | Calculator logic, lead scoring |
| E2E tests | Playwright | All pages load, forms submit, chat works |
| i18n tests | Custom script | All pages render in all 8 languages |
| Performance | Lighthouse CI | Score > 90 on all pages |
| Accessibility | axe-core | WCAG 2.1 AA compliance |
| SEO | next-sitemap + manual | Sitemaps, meta tags, hreflang |

### Manual Testing Checklist (Before Each Stage Release)

- [ ] All pages load in all active languages
- [ ] Language switcher works correctly
- [ ] Arabic pages display RTL correctly
- [ ] Chinese text renders with correct font
- [ ] Calculator produces correct results (3 test cases from previous docs)
- [ ] Chat widget opens/closes, sends/receives messages
- [ ] Mobile responsive on iPhone, Android, iPad
- [ ] Contact form submits successfully
- [ ] Email notifications delivered
- [ ] CRM entries created correctly
- [ ] No console errors in browser

---

## 17. MAINTENANCE & MONITORING

### Daily Automated Checks (via n8n)

- Website uptime (every 5 min)
- API response times (Claude, Odoo, Stripe)
- Chatbot error rate (> 5% = alert)
- Lead flow (0 leads in 24h on business day = alert)
- Bank sync status
- SSL certificate expiry (30 days warning)

### Monthly Review (Human)

- Budget vs actual costs
- Lead conversion rates by language
- Chatbot conversation quality review (sample 10%)
- Translation quality spot-check
- Security updates for all dependencies
- n8n workflow performance review

### Annual

- Full security audit
- Technology stack review (any better options?)
- Contract renewals (Odoo, domains, hosting)
- Pricing model review

---

## APPENDIX A: COMPLETE API KEY LIST

Store all keys in Obsidian vault (encrypted section) AND in environment variables:

| Service | Key Name | Where to Get |
|---|---|---|
| Anthropic | `ANTHROPIC_API_KEY` | console.anthropic.com |
| Vercel | `VERCEL_TOKEN` | vercel.com/account/tokens |
| Stripe | `STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com |
| Resend | `RESEND_API_KEY` | resend.com/api-keys |
| Odoo | `ODOO_URL` + `ODOO_API_KEY` | Your Odoo instance |
| Plaid | `PLAID_CLIENT_ID` + `PLAID_SECRET` | dashboard.plaid.com |
| Crowdin | `CROWDIN_TOKEN` | crowdin.com/settings |

---

## APPENDIX B: GLOSSARY

| Term | Meaning |
|---|---|
| EPM | Enhanced Performance Material — GFS multi-functional fuel additive |
| bbl | Barrel (159 liters / 42 US gallons) |
| bpd | Barrels per day |
| HDS | Hydrodesulfurization (conventional sulfur removal) |
| CBDO | Chief Business Development Officer |
| n8n | Open-source automation platform (pronounced "nodemation") |
| MCP | Model Context Protocol — standard for AI tool integration |
| RAG | Retrieval-Augmented Generation — AI + knowledge base search |
| i18n | Internationalization (adapting software for multiple languages) |
| RTL | Right-to-Left (Arabic, Hebrew layout direction) |
| CRM | Customer Relationship Management |
| ERP | Enterprise Resource Planning |

---

## APPENDIX C: FILE NAMING CONVENTIONS

All files in the project follow these rules:
- **Code files:** kebab-case (`roi-calculator.tsx`, `chat-widget.tsx`)
- **Components:** PascalCase (`ChatWidget.tsx`, `LanguageSwitcher.tsx`)
- **Translations:** `{locale}.json` (`en.json`, `ar.json`, `de.json`)
- **Documents:** UPPERCASE with hyphens (`GFS-COMMERCIAL-OFFER-001.pdf`)
- **n8n workflows:** descriptive (`lead-scoring-pipeline`, `invoice-generator`)
- **Obsidian notes:** Title Case (`How EPM Works.md`, `Budget Tracker.md`)

---

*Document prepared: March 2026*
*Next review: After Stage 1 completion*
*Owner: GFS Technical Team*
