/**
 * Knowledge Base Seed Script
 *
 * Run once to populate Supabase with EPM knowledge:
 *   npx ts-node --project tsconfig.json src/lib/rag/ingest.ts
 *
 * Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
 */

import "dotenv/config";
import { supabase } from "./supabase-client";
import { embedBatch } from "./embeddings";

// ─────────────────────────────────────────────────────────────
// SEED CORPUS
// Each document becomes multiple chunks of ~400 tokens with 50-token overlap.
// ─────────────────────────────────────────────────────────────

const DOCUMENTS: Array<{ title: string; source: string; content: string }> = [
  {
    title: "EPM Product Overview",
    source: "website",
    content: `GFS EPM (Enhanced Performance Material) is a multifunctional fuel additive that replaces 3–5 separate chemical products with a single solution. It operates across the entire fuel lifecycle — from crude processing to final combustion. Price range: USD 1.50–3.00 per barrel. Traditional alternatives combined cost USD 0.65–5.80 per barrel. Tagline: "One additive. Five functions. Zero compromise." EPM is manufactured by Global Fuel Solutions (GFS) and targets refineries processing 50,000–500,000 barrels per day.`,
  },
  {
    title: "EPM Function 1: Demulsification",
    source: "website",
    content: `EPM achieves efficient water-oil separation without energy-intensive electrostatic desalters. It breaks emulsions at the molecular level, achieving separation within 30 days of treatment with zero external energy input. This replaces electrostatic desalters (USD 2–5 million CAPEX) and chemical demulsifiers (USD 0.05–0.15 per barrel). The demulsification mechanism modifies surface tension and interfacial properties at the molecular level to enable water separation.`,
  },
  {
    title: "EPM Function 2: Partial Desulfurization",
    source: "website",
    content: `EPM achieves 30–40% sulfur reduction without hydrogen or high-pressure reactors. It achieves partial desulfurization through catalytic interaction, significantly reducing the load on conventional hydrodesulfurization (HDS) units. Replaces partial HDS load (USD 100–500 million CAPEX for a full HDS unit). IMPORTANT: EPM does NOT fully replace HDS — conventional desulfurization is still required for regulatory compliance. EPM is a supplement that reduces HDS unit load by up to 40%.`,
  },
  {
    title: "EPM Function 3: Combustion Enhancement",
    source: "website",
    content: `EPM achieves 95–99% combustion efficiency compared to 85–92% with standard fuels. More complete combustion means higher energy yield per barrel and dramatically less unburned particulate matter. EPM acts as a catalyst during combustion, promoting more complete oxidation of fuel molecules. Replaces cetane improvers (USD 0.10–0.30 per barrel) and FBC additives (USD 0.05–0.15 per barrel). The 7–14 percentage point improvement in combustion efficiency translates to measurable fuel savings.`,
  },
  {
    title: "EPM Function 4: Emission Reduction",
    source: "website",
    content: `Preliminary testing shows EPM reduces NOx emissions by a factor of 284 below Euro 6 limits, CO by a factor of 10, and SO₂ by a factor of 15,000 below limits. These results exceed all current global emission standards including IMO 2020 and EPA Tier 4. DISCLAIMER: All emission data is preliminary and based on initial testing, subject to independent verification. The NOx reduction mechanism is currently under investigation. Replaces SCR systems (USD 50–200K), DPF filters (USD 10–50K), and EGR systems.`,
  },
  {
    title: "EPM Function 5: Biocide and Anti-Corrosion",
    source: "website",
    content: `EPM eliminates microbial contamination including bacteria, fungi, and algae. It removes root causes of internal corrosion: water, sulfur compounds, and microbial acids. EPM protects pipelines, storage tanks, and transport infrastructure. It prevents biofouling and MIC (Microbiologically Influenced Corrosion). Replaces Biobor JF (USD 0.05–0.10 per barrel), corrosion inhibitors (USD 0.10–0.25 per barrel), and cathodic protection systems.`,
  },
  {
    title: "EPM Pricing and Breakeven Analysis",
    source: "techspec",
    content: `EPM price range: USD 1.50–3.00 per barrel. Traditional multi-product approach: USD 0.65–5.80 per barrel combined. Breakeven analysis by crude type: Light sweet crude breakeven at USD 1.71 per barrel. Medium sour crude breakeven at USD 2.81 per barrel. Heavy sour crude breakeven at USD 4.68 per barrel. A refinery switches to EPM when their current combined additive costs exceed the breakeven for their crude type. At 100,000 bbl/day, a medium sour refinery would save approximately USD 10,900 per day versus traditional additives.`,
  },
  {
    title: "EPM ROI Calculator Guide",
    source: "website",
    content: `To calculate EPM ROI for your refinery: (1) Input your daily throughput in barrels per day. (2) Enter your current combined additive cost per barrel (demulsifiers + corrosion inhibitors + combustion additives + biocide). (3) Enter projected EPM cost (typically USD 1.50–3.00/bbl depending on crude type and volume). Daily savings = throughput × (current cost - EPM cost). Annual savings = daily savings × 330 operating days. Typical payback period for pilot program: 30–90 days.`,
  },
  {
    title: "EPM for Refineries",
    source: "website",
    content: `EPM is ideal for refineries processing 50,000–500,000 barrels per day. It consolidates multiple additive contracts into one. Benefits: reduced vendor management complexity, single-point accountability, consolidated billing. For a 150,000 bbl/day refinery processing medium sour crude at USD 3.50/bbl current additive cost, switching to EPM at USD 2.50/bbl saves USD 150,000 per day or USD 49.5 million per year. Implementation typically begins with a 30-day pilot trial.`,
  },
  {
    title: "EPM for Marine Applications",
    source: "website",
    content: `EPM helps ships meet IMO 2020 sulfur cap (0.5% global limit, 0.1% in ECAs). It treats bunker fuel (HFO, VLSFO, MGO) reducing sulfur content by 30–40% without expensive scrubbers. Additional benefits: prevents fuel tank corrosion and microbiological contamination, improves combustion efficiency reducing fuel consumption by estimated 3–7%. Cost effective alternative to installing scrubber systems (USD 2–5M per vessel) or switching entirely to more expensive low-sulfur fuels.`,
  },
  {
    title: "EPM for Upstream and Storage",
    source: "website",
    content: `Upstream applications: EPM treats crude oil at the wellhead, reducing water-oil separation time, preventing pipeline corrosion, and eliminating microbiological contamination in water injection systems. Storage tank applications: prevents tank bottom corrosion, eliminates microbiological contamination that causes fuel degradation, reduces sludge formation. EPM extends infrastructure life by preventing MIC (Microbiologically Influenced Corrosion) which accounts for 20–40% of corrosion failures in oil and gas infrastructure.`,
  },
  {
    title: "EPM Mechanism of Action",
    source: "techspec",
    content: `EPM works through three simultaneous mechanisms. Step 1 — Molecular Integration: EPM integrates at the molecular level with hydrocarbon chains, modifying surface tension and interfacial properties. Step 2 — Catalytic Enhancement: During combustion, EPM acts as a catalyst that promotes more complete oxidation, reducing unburned hydrocarbons and particulate emissions. Step 3 — Protective Layer: EPM forms a protective molecular layer on metal surfaces, preventing corrosion while eliminating microbial growth. These three mechanisms operate simultaneously and synergistically.`,
  },
  {
    title: "EPM Competitive Comparison",
    source: "techspec",
    content: `Traditional approach requires 3–5 separate products: demulsifiers (USD 0.05–0.15/bbl), HDS partial load (equivalent cost), combustion additives (USD 0.15–0.45/bbl), corrosion inhibitors (USD 0.10–0.25/bbl), biocide (USD 0.05–0.10/bbl). Combined cost: USD 0.65–5.80/bbl with multiple vendors. EPM replaces all five at USD 1.50–3.00/bbl with single vendor. Advantages over alternatives: single contract, single technical contact, no compatibility issues between additives, simpler dosing. Disadvantages vs. specialized products: EPM is new technology with preliminary data; mature alternatives have decades of field data.`,
  },
  {
    title: "EPM Pilot Program",
    source: "website",
    content: `GFS offers a structured pilot program for potential customers. Duration: 30–90 days. Process: (1) Initial technical assessment of your facility. (2) Custom dosing protocol design. (3) Treatment begins — water-oil separation improves within 30 days. (4) Weekly performance reports with emissions and efficiency data. (5) ROI analysis at pilot conclusion. Pilot cost: included in first purchase order (minimum order). To request a pilot, contact the GFS technical team via the pilot request form or through the chat assistant.`,
  },
  {
    title: "EPM Frequently Asked Questions",
    source: "website",
    content: `Q: Does EPM fully replace HDS? A: No. EPM reduces HDS load by 30–40% but conventional desulfurization is still required for regulatory compliance. Q: How quickly does EPM work? A: Water separation improves within 30 days; combustion efficiency changes are immediate upon treatment. Q: Is EPM data verified? A: Current data is preliminary. Independent third-party verification is ongoing. Q: What crude types does EPM work with? A: All crude types — light sweet, medium sour, and heavy sour. ROI is highest for medium and heavy sour crudes which currently have highest additive costs.`,
  },
  {
    title: "EPM Emission Data Details",
    source: "techspec",
    content: `Preliminary emission test results for EPM-treated fuel vs. untreated baseline: NOx: 284× below Euro 6 standard (Euro 6 limit: 0.46 g/kWh; EPM-treated: 0.0016 g/kWh in preliminary tests). CO: 10× below regulatory limits. SO₂: 15,000× below limits (driven by partial desulfurization function). Particulate Matter: significant reduction due to 95–99% combustion efficiency. All results are preliminary and based on initial laboratory and limited field testing. The NOx reduction mechanism is under independent scientific investigation. These results have not yet been independently replicated at scale.`,
  },
];

// ─────────────────────────────────────────────────────────────
// CHUNKING
// ─────────────────────────────────────────────────────────────

function chunkText(
  text: string,
  targetTokens = 400,
  overlapTokens = 50,
): string[] {
  // Rough approximation: 1 token ≈ 4 characters
  const targetChars = targetTokens * 4;
  const overlapChars = overlapTokens * 4;

  if (text.length <= targetChars) return [text];

  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > targetChars && current.length > 0) {
      chunks.push(current.trim());
      // Start next chunk with overlap
      const words = current.split(" ");
      const overlapWords = words.slice(
        Math.max(0, words.length - Math.floor(overlapChars / 5)),
      );
      current = overlapWords.join(" ") + " " + sentence;
    } else {
      current += (current ? " " : "") + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

// ─────────────────────────────────────────────────────────────
// INGEST
// ─────────────────────────────────────────────────────────────

async function ingest() {
  console.log(`Ingesting ${DOCUMENTS.length} documents…`);

  for (const doc of DOCUMENTS) {
    console.log(`  → ${doc.title}`);

    // Upsert document
    const { data: docRow, error: docErr } = await supabase
      .from("knowledge_documents")
      .insert({
        title: doc.title,
        source: doc.source,
        locale: "en",
        content: doc.content,
      })
      .select("id")
      .single();

    if (docErr || !docRow) {
      console.error("    ERROR inserting document:", docErr);
      continue;
    }

    const chunks = chunkText(doc.content);
    const embeddings = await embedBatch(chunks);

    for (let i = 0; i < chunks.length; i++) {
      const { error: chunkErr } = await supabase
        .from("knowledge_chunks")
        .insert({
          document_id: docRow.id,
          chunk_index: i,
          content: chunks[i],
          token_count: Math.ceil(chunks[i].length / 4),
          embedding: embeddings[i],
        });

      if (chunkErr) {
        console.error(`    ERROR inserting chunk ${i}:`, chunkErr);
      }
    }

    console.log(`    ✓ ${chunks.length} chunk(s) ingested`);
  }

  console.log("Done.");
}

ingest().catch(console.error);
