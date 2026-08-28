---
generated-by: zeus-autopilot
date: 2026-08-25
source-description: "make ideology normative descriptive prescriptive sorter based on data from other ideological sorters etc, its not scientific"
industry: civic-reflection
---

# Interview Transcript

> This is a synthesized, non-interactive interview. Every answer is an automatic inference from the supplied brief and source research.

## Phase C — Context

### C1. Who is this for?

**[ZEUS-AUTO]** A curious person who wants a more granular self-reflection tool, plus a methodology-minded reader who wants to inspect questions, mappings, and sources.

### C2. What should the product not claim?

**[ZEUS-AUTO]** It must not claim scientific validity, diagnose identity, estimate probabilities, or recommend parties, candidates, or policies.

### C3. What is the MVP boundary?

**[ZEUS-AUTO]** A fixed-length, client-only web app with 48 original items, deterministic scoring, a methodology view, and no account or remote answer collection.

### Gate 1 — Context result

- **[ZEUS-AUTO] Goal:** make differences between diagnosis, values, and preferred means visible.
- **[ZEUS-AUTO] Success:** a user can complete the flow, see three covered profiles or explicit insufficient-information notices, and inspect the basis of the output.
- **[ZEUS-AUTO] Boundary:** no current political actor matching and no scientific validation claim.

## Phase P — Product behavior

### P1. What are the three layers?

**[ZEUS-AUTO]** Descriptive means what the user thinks is true about political and social systems; normative means what ends or standards the user values; prescriptive means what institutions, policies, and strategies the user would choose.

### P2. What response types are needed?

**[ZEUS-AUTO]** A five-point directional scale with a distinct mixed/depends choice and a distinct no-view choice. The data model may support competing explanations later, but the MVP keeps interaction consistent and auditable.

### P3. What should results show?

**[ZEUS-AUTO]** Three separate layer summaries, coverage, three family-balanced interpretive neighbors per covered layer, key facet signals, and cross-layer tensions described as pulls rather than contradictions.

### P4. What should happen with sparse answers?

**[ZEUS-AUTO]** Exclude no-view responses from denominators and show insufficient information below the 50% layer-coverage threshold.

### Gate 2 — Product result

- **[ZEUS-AUTO] Core loop:** intro → layer-aware question flow → deterministic scoring → transparent result explanation → restart/share.
- **[ZEUS-AUTO] Data rule:** item IDs and anchors are versioned, source-tagged, and inspectable.
- **[ZEUS-AUTO] Error rule:** malformed answer state falls back to the intro and does not produce a result.

## Phase S — Solution and design

### S1. What visual direction fits?

**[ZEUS-AUTO:taste]** Editorial research notebook: paper-like field, near-black ink, one sharp vermilion accent, serif display type paired with a readable sans, hairline rules, and restrained motion.

### S2. What technical approach fits?

**[ZEUS-AUTO:mechanical]** React + TypeScript + Vite, with scoring/data modules separated from UI components. No backend or database.

### S3. What is deferred?

**[ZEUS-AUTO]** Adaptive follow-ups, live party/manifesto imports, multilingual content, user accounts, analytics, and statistical validation.

### Gate 3 — Solution result

- **[ZEUS-AUTO] Differentiator:** the same person can receive different interpretive neighbors for diagnosis, values, and preferred institutions.
- **[ZEUS-AUTO] Trust treatment:** show methodology, coverage, source posture, and the non-scientific disclaimer alongside results.
- **[ZEUS-AUTO] Reversible decisions:** all content and anchors are local data records; visual tokens and scoring policy are isolated.
