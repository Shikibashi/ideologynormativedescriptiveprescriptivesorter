# Feature Spec — Ideology Layer Sorter

## Overview

The Ideology Layer Sorter is a client-side, non-scientific interpretive tool for separating three kinds of political reasoning that are commonly collapsed into one label:

- **Descriptive:** what the user thinks is true about social and political systems.
- **Normative:** what ends, values, rights, or social conditions the user regards as good.
- **Prescriptive:** what institutions, policies, and strategies the user prefers given that diagnosis and those values.

The result is a layered profile, not a psychological diagnosis or a claim that a person belongs to a political tradition.

## Context Map

### Shared assumptions

- Goal: make diagnosis, values, and preferred means visibly distinguishable.
- Industry: civic reflection / political education tooling.
- Scope: first MVP; fixed-length client-side web app.
- Success: a user can complete the flow, understand the three layers, see coverage-aware interpretive neighbors, and inspect the data/methodology behind the output.

### Stakeholders

| Role | Description | Related section |
|---|---|---|
| Self-explorer | Answers questions and reads a layered result. | `section-quiz-flow.md`, `section-results.md` |
| Methodology reviewer | Inspects item wording, facet effects, anchors, and source posture. | `section-data-methodology.md` |
| Facilitator/educator | Uses the tool as a discussion prompt without treating it as a test. | `section-results.md`, `section-data-methodology.md` |
| Item researcher | Uses ontology gaps and source records to draft candidates for later review. | `research-workbench.md` |

### Ecosystem map

| System | Target | Integration | Related section |
|---|---|---|---|
| Browser local state | Temporary answers and optional share fragment | In-process React state and URL hash | `section-quiz-flow.md` |
| Static dataset | Questions, facets, anchors, source references | TypeScript modules bundled at build time | `section-data-methodology.md` |
| Optional clipboard | Shareable local results link | Browser Clipboard API with text fallback | `section-results.md` |

### Existing environment

The repository was empty of application code. The MVP establishes React + TypeScript + Vite, Vitest unit tests, and Playwright browser tests. No API, database, authentication, or analytics is in scope.

## Current content continuation — 2026-08-27

The active manifest is content version 23 with 612 original prompts, 204 in each claim layer, and 50 editorial anchors. Forty-five canonical anchored targets have direct four-question-per-layer coverage; the v23 block is Council Communism over the existing `Socialism → Communism → Council Communism` path, in addition to the earlier source-backed branches. Five broad contextual anchors remain visible for research/provenance but are excluded from production neighbor scoring. These blocks are source-backed editorial additions, not cognitive or psychometric measures. The research workbench still holds 1,428 effect-free candidates across 119 targets outside the respondent flow, and the canonical ontology inventory remains 9 macro, 33 meso, and 60 micro nodes.

The v23 activation is a coverage-status change for an existing ontology node, not a claim that the taxonomy has been empirically confirmed. Each dedicated target has four target-tagged items in each layer, source-backed construct notes, named neighbor discriminants, false-positive audit records, and a provisional anchor vector. The separate research governance and promotion boundary remains fail-closed: citations and automated checks can support provenance and structural completeness, but cannot substitute for cognitive, cross-context, or later empirical evidence. Council Communism is explicitly bounded as a historically specific and internally varied current centered on worker councils, direct self-government, common control, and anti-vanguard organization; Neo-Fascism remains catalog-only because postwar continuity and adaptation remain unresolved.

## Problem Statement

| # | Core problem | Impact | Priority | Resolution section |
|---|---|---|---|---|
| P1 | Most ideological quizzes collapse claims about facts, values, and means into one axis or label. | Users cannot see why their diagnoses and preferred institutions may differ. | Required | `section-quiz-flow.md`, `section-results.md` |
| P2 | Manual mappings are often opaque and unanswered items can be mistaken for neutrality. | Results appear more certain than the data supports. | Required | `section-data-methodology.md`, `section-results.md` |
| P3 | Source-inspired datasets can silently copy content or inherit taxonomy bias. | Provenance and reuse boundaries become impossible to audit. | Required | `section-data-methodology.md` |
| P4 | A long questionnaire can cause fatigue and inaccessible progress. | Users abandon or answer without reading. | Important | `section-quiz-flow.md` |

## Goals

1. Keep the three claim layers explicit in the information architecture and the result language.
2. Separate question effects from ideology anchors through named facets.
3. Treat `no-view` as missing information and show layer/domain coverage.
4. Use family-balanced interpretive neighbors and tie language instead of forced precision.
5. Make questions, anchors, source references, and scoring policy inspectable.
6. Build an accessible, responsive, keyboard-friendly flow with no remote answer collection.
7. Give item researchers a derived target inventory and a quarantined candidate-drafting workflow.

## Non-goals and deferred scope

- Scientific validation, psychometric reliability, or identity diagnosis.
- Current party/candidate/policy matching or persuasion.
- Adaptive follow-up questions.
- Machine-learning classification.
- Accounts, remote answer storage, analytics, or moderation.
- Multilingual item banks.
- Direct copying of external source content or code.
- Treating a research candidate as a production question, anchor, or validated measurement.

## Functional requirements

### FR-1 Intro and framing

- Explain the three layers in plain language.
- State that the output is an interpretive calculation, not a scientific test or recommendation.
- Show the current manifest-derived item count and the ability to skip a layer only through explicit `no-view` responses.
- Provide a visible methodology/source link before the user starts.

### FR-2 Question flow

- Present 600 original items, 200 per layer, with a visible layer label and progress state.
- Offer `Strongly disagree`, `Disagree`, `Mixed / depends`, `Agree`, `Strongly agree`, and `No view yet`.
- Allow back navigation and changing a previous answer.
- Prevent forward navigation without a response.
- Show a layer transition notice when the flow moves from diagnosis to values or values to institutions.

### FR-3 Scoring

- Map directional answers to `-2, -1, 0, +1, +2`.
- Exclude `No view yet` from answer denominators.
- Produce a normalized facet profile for each layer.
- Compare the profile with anchor vectors through weighted squared distance.
- Normalize similarity for display as an internal fit signal, never as a probability.
- Return `insufficient information` when a layer has less than 50% answered coverage.
- Select up to three interpretive neighbors using one nearest anchor per family before filling remaining slots.

### FR-4 Results

- Show descriptive, normative, and prescriptive results as separate sections.
- Show coverage and answered/available counts for each layer.
- Show interpretive neighbors, fit language, and a short anchor note.
- Show facet signals that most influenced the layer result.
- Show cross-layer pulls/tensions without a consistency score or contradiction label.
- Provide restart and copy-link actions.

### FR-5 Inspectability

- Expose a methodology panel with the scoring formula, response policy, layer definitions, and source posture.
- Expose an item data view or source note for each question/anchor record.
- State that the source projects informed structure, not copied content.

### FR-6 Research workbench

- Derive the target list from the audited ontology nodes and secondary registry at runtime; do not maintain a parallel hardcoded ideology list.
- Distinguish dedicated scored, partial dedicated, scored-indirect, catalog-only, and registry-only coverage states.
- Show each target’s placement, canonical path where taxonomic ancestry exists, typed relations, source records, linked-context question IDs, existing constructs, and neighbors. Linked context must be labeled as provenance overlap rather than measurement evidence.
- Let an item researcher choose a target and layer, then draft one respondent-facing claim with a target-specific justification, domain, existing facet/axis mapping, theory context, item function, expected direction, neighbor differentiation, source IDs, and risk notes.
- Require `research_candidate` status and keep candidates separate from the production question/effect/anchor/manifest contracts. Saving, copying, or removing a draft must not alter quiz scoring or share-link behavior.
- Do not imply that source citations, a target mapping, or a candidate draft establishes reliability, validity, or scientific classification.

## Data contracts

### Question

```ts
type Question = {
  id: string;
  layer: "descriptive" | "normative" | "prescriptive";
  domain: string;
  prompt: string;
  context?: string;
  effects: Record<string, number>;
  sourceType: "original" | "inspired_by";
  sourceRefs: string[];
  version: number;
};
```

### Ideology anchor

```ts
type IdeologyAnchor = {
  id: string;
  label: string;
  family: string;
  summary: string;
  profiles: Record<Layer, Record<string, number>>;
  sourceType: "editorial" | "inspired_by";
  sourceRefs: string[];
  note: string;
  version: number;
};
```

### Answer

```ts
type Answer = number | "no-view";
type AnswerMap = Record<string, Answer | undefined>;
```

## Scoring contract

For each layer, convert answered items into a facet profile by weighted averaging. For an anchor `a`, calculate weighted squared distance between the user's facet vector and the anchor vector across the facets observed in that layer. Normalize the distance against the maximum possible distance in the same observed facet set. The display label is `internal fit`, not probability or identity.

Coverage is `answered / total`. `no-view` items count in total but not in the denominator used for facet means. A layer below the threshold returns a coverage warning instead of a forced result.

## Research candidate contract

Research candidates are review records, not `Question` records. They carry explicit target and substantive-distinctness justification before wording can be accepted, use only existing facet/axis contracts during this phase, cite at least one source marked for ideology research, and record qualitative risks. They intentionally have no production `effects`, anchor assignment, threshold, or activation flag. Before any future promotion into the production bank, the candidate must carry passed neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical-validation evidence. The complete field contract and review boundary are documented in [`research-workbench.md`](research-workbench.md).

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| Editorial anchor bias | High | High | Source notes, explicit wording, inspectable vectors, substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation before production promotion. |
| Ambiguous question wording | High | Medium | One claim per item, short prompts, original wording, and documented wording review. |
| Taxonomy density bias | Medium | Medium | Family-balanced neighbors and visible family metadata. |
| Users read fit as truth | High | High | Framing copy repeated on intro and results; avoid probability language. |
| Answer state corrupts results | Medium | Low | Typed answer contract, unit tests, malformed-hash fallback. |
| Browser clipboard unavailable | Low | Medium | Show the link and offer manual copy fallback. |
| External source licensing confusion | High | Medium | Inspiration-only posture; no copied content; provenance fields and pinned URLs. |

## Test Scenarios

| ID | Scenario | Expected result |
|---|---|---|
| TS-01 | Load the app | Intro renders with three-layer explanation and non-scientific framing. |
| TS-02 | Start and answer one item | Progress advances only after a response; next item renders. |
| TS-03 | Navigate backward | Previous answer remains selected and can be changed. |
| TS-04 | Choose `No view yet` repeatedly | Layer coverage decreases; no-view is not converted to zero. |
| TS-05 | Complete all 204 items | Results render with three layer sections and coverage counts. |
| TS-06 | Complete fewer than half of a layer | That layer shows insufficient information rather than a forced match. |
| TS-07 | Share-link creation | URL hash is generated without a server request and can be copied or manually selected. |
| TS-08 | Refresh a results link | Valid answers restore; malformed hash returns to intro safely. |
| TS-09 | Keyboard-only flow | Start, answer, back, next, and restart controls are reachable and visible. |
| TS-10 | Mobile-width render | No horizontal overflow; question controls remain readable and tappable. |
| TS-11 | Open the research workbench | All ontology and registry targets are available with distinct coverage labels and contextual entries are not given canonical paths. |
| TS-12 | Save an incomplete candidate | Missing target justification or wording is rejected; the production question count remains unchanged. |
| TS-13 | Save a complete research candidate | Candidate is labeled `research_candidate`, can be copied as JSON, and remains separate from live scoring and share data. |

## Acceptance criteria

- All required sections from `sections/index.md` are represented in source files.
- Unit tests cover missing answers, coverage threshold, facet aggregation, family balancing, ties, and tension detection.
- `npm run build` and `npm test -- --run` exit successfully.
- Playwright covers intro, progress, completion, coverage warning, and restart.
- The browser requests no remote endpoint for answer storage.
- Research candidate drafts cannot change the 600-question production bank, effects, anchors, thresholds, manifest, or share envelope.
- `docs/plan/ideology-sorter/verify-report.md` records static, design, security, and runtime evidence.

## Current v9 acceptance

- The active dataset is content version 9 with 432 questions, 144 per claim layer, 35 editorial anchors, and 30 canonical scoring anchors.
- Populism and Mutualism each have a source-linked 4/4/4 target-tagged block and a provisional anchor; the seven remaining canonical meso holds remain catalog-only.
- The existing scoring policy and share contract remain unchanged. The structural reachability audit reports isolated routing as a closure check and full-production overlap as a diagnostic only.

## Current v10 acceptance

- The active dataset is content version 10 with 456 questions, 152 per claim layer, 37 editorial anchors, and 32 canonical scoring anchors.
- Radical Conservatism and Reactionary Conservatism each have a source-linked 4/4/4 target-tagged production block and a provisional anchor. The five remaining canonical meso holds—Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only.
- The existing version-3 scoring policy, ontology topology, and share contract remain unchanged. The structural reachability audit reports isolated routing closure for all 32 production anchors and records full-production overlap only as a measurement-design diagnostic.
- Academic sources support construct terminology, historical scope, boundary wording, and provenance; they do not validate respondent interpretation, reliability, validity, invariance, or population generalization. No cognitive review or empirical respondent study was run.

## Current v11 acceptance

- The active dataset is content version 11 with 468 questions, 156 per claim layer, 38 editorial anchors, and 33 canonical scoring anchors.
- Islamism has a source-linked 4/4/4 target-tagged production block and a provisional anchor. Its public-project boundary must remain distinct from private faith, Muslim identity, generic conservatism, nationalism, and any one militant or constitutional subtype.
- Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only. The existing version-3 scoring policy, ontology topology, and share contract remain unchanged; full-production overlap remains a structural measurement diagnostic only.
- Academic sources support construct terminology, internal variation, boundary wording, and provenance. They do not validate the local item effects, anchor vector, respondent interpretation, reliability, validity, invariance, or population generalization. No cognitive review or empirical respondent study was run.

## Current v12 acceptance — historical

- The active dataset is content version 12 with 480 questions, 160 per claim layer, 39 editorial anchors, and 34 canonical scoring anchors.
- Ordoliberalism has a source-linked 4/4/4 target-tagged production block over its existing canonical micro node under Liberalism and a provisional anchor. Its competition-as-institutional-order, anti-concentration, and limited social-market boundary remains explicit.
- Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the research bank remains effect-free and separate from production scoring.
- The existing version-3 scoring policy, ontology topology, and share contract remain unchanged. Structural isolated-anchor closure and full-production overlap are diagnostics only.
- Academic sources support construct terminology, boundary wording, and provenance; they do not validate local effects, anchor vectors, respondent interpretation, reliability, validity, invariance, or population generalization. No cognitive review or empirical respondent study was run.

## Historical v13 acceptance

- The active dataset is content version 13 with 492 questions, 164 per claim layer, 40 editorial anchors, and 35 canonical scoring anchors.
- Pan-Africanism has a source-linked 4/4/4 target-tagged production block over its existing canonical micro node under Nationalism and a provisional anchor. Its boundary is African and diasporic solidarity, continuing colonial/racial power, collective self-determination, and cross-border cooperation without requiring one continental-state design.
- Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the research bank remains effect-free and separate from production scoring.
- The existing version-3 scoring policy, ontology topology, and share contract remain unchanged. Structural isolated-anchor closure and full-production overlap are diagnostics only.
- Academic sources support construct terminology, internal variation, boundary wording, and provenance; they do not validate local effects, anchor vectors, respondent interpretation, reliability, validity, invariance, or population generalization. No cognitive review, respondent study, substitute simulation, or empirical validation was run.

## Current v14 acceptance

- The active dataset is content version 14 with 504 questions, 168 per claim layer, 41 editorial anchors, and 36 canonical scoring anchors.
- Religious Nationalism has a source-linked 4/4/4 target-tagged production block over its existing canonical meso hybrid node and a provisional anchor. The parentless hybrid relation remains explicit; no canonical macro parent is invented, and religious-national micro variants remain distinct catalog nodes.
- Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only; the research bank remains effect-free and separate from production scoring. Private faith, cultural identity, generic Nationalism, and one religion-specific case are not sufficient target evidence.
- The existing version-3 scoring policy, ontology topology, facets, thresholds, family balancing, combined-layer calculation, and share contract remain unchanged. Structural isolated-anchor closure and full-production overlap are diagnostics only.
- Academic sources support construct terminology, comparative variation, boundary wording, and provenance; they do not validate local effects, anchor vectors, respondent interpretation, reliability, validity, invariance, or population generalization. No cognitive review, respondent study, substitute simulation, or empirical validation was run.

## Current v15 acceptance

- The active dataset is content version 15 with 516 questions, 172 per claim layer, 42 editorial anchors, and 37 canonical scoring anchors.
- Conservative Nationalism has a source-linked 4/4/4 target-tagged production block over its existing parentless canonical meso hybrid node and a provisional anchor. Its distinct National Conservatism micro child remains separate.
- National Socialism and Neo-Fascism remain catalog-only high-risk historical holds; research candidates remain effect-free and separate from production scoring.
- The finite share guard is 36,864 characters after the measured complete v15 answer fragment reached 33,459 characters; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Structural reachability is a design fixture, not cognitive, respondent, psychometric, or empirical validation.

## Current v16 acceptance

- `validateDataset(DATASET)` returns no errors for content version 16 with 528 questions and 176 questions in each layer.
- National Socialism has a source-linked 4/4/4 target-tagged production block over its existing canonical meso node and a provisional anchor. Every new prompt is explicitly scoped to German National Socialism, especially the interwar movement and the 1933–1945 regime, with a high-risk historical analytical boundary.
- Neo-Fascism remains catalog-only because post-1945 continuity, adaptation, and organizational boundaries are not closed for a single production block. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 43 editorial anchors: 38 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The finite share guard is 36,864 characters after the measured complete v16 answer fragment reached 34,275 characters; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Academic sources support terminology, provenance, and item-authoring only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v17 acceptance

- `validateDataset(DATASET)` returns no errors for content version 17 with 540 questions and 180 questions in each layer.
- Civic Nationalism has a source-linked 4/4/4 target-tagged production block over its existing canonical micro node under Nationalism and a provisional anchor. The block treats civic membership as context-sensitive and does not make the civic–ethnic distinction a universal ideal-type binary.
- The block distinguishes citizenship-mediated membership, civic narratives, institutional power and exclusion, contestable self-government, equal civic standing, bounded civic solidarity, rights protection, public capacity, social citizenship, cross-border cooperation, and corrigible institutions from generic patriotism, private constitutional preference, and isolated democratic support.
- Neo-Fascism remains catalog-only because post-1945 continuity, adaptation, and organizational boundaries remain broader and more contested. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 44 editorial anchors: 39 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The finite share guard is 36,864 characters after the measured complete v17 answer fragment reached 35,075 characters; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Civic Nationalism passes isolated structural reachability in all three layers, while its full-competition combined rank 6 and aggregate overlap remain design diagnostics rather than evidence for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v18 acceptance

- `validateDataset(DATASET)` returns no errors for content version 18 with 552 questions and 184 questions in each layer.
- Black Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical micro node under Nationalism, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary requires a joint dignity/linked-fate, anti-Black power, autonomy/self-determination, and self-directed-institution bundle; identity, cultural pride, separatism alone, Pan-Africanism alone, one organization, or current-actor inference is insufficient.
- Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives, while Neo-Fascism remains a high-risk catalog-only hold. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 45 editorial anchors: 40 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v18 answer fragment measures 35,875 characters under the finite 36,864-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Black Nationalism passes isolated structural reachability in all three layers; its full-production ranks 3/15/7 by layer and 4 combined, aggregate overlap, and worst ranks 37/33 remain design diagnostics rather than respondent evidence or grounds for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v19 acceptance

- `validateDataset(DATASET)` returns no errors for content version 19 with 564 questions and 188 questions in each layer.
- Materialist Feminism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over the existing canonical `Socialist / Marxist Feminism → Materialist Feminism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary is plural and materialist: labor, care/social reproduction, embodiment, institutions, structural power, resource access, historical specificity, and emancipatory change are jointly relevant; no single Marxist or socialist programme is required.
- Marxist Feminism, Socialist Feminism, and Radical Feminism remain distinct catalog branches where class/capital, socialist transformation, or patriarchy/sexual domination are more constitutive. Generic feminist identity, care approval, material policy preference, class analysis without gendered material power, and one ownership/state route are insufficient evidence. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 46 editorial anchors: 41 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v19 answer fragment measures 36,723 characters under the finite 36,864-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Materialist Feminism passes isolated structural reachability in all three layers; its full-production ranks 2/7/5 by layer and 4 combined, with aggregate overlap and worst ranks 38/34 retained as design diagnostics rather than evidence for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v20 acceptance

- `validateDataset(DATASET)` returns no errors for content version 20 with 576 questions and 192 questions in each layer.
- Anti-Colonial Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over the existing canonical `Nationalism → Anti-Colonial Nationalism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary jointly covers colonial or externally imposed domination, collective self-rule, open-ended self-determination, solidarity, accountable institution-building, and anti-imperial transformation while preserving historical variation.
- Formal independence, generic Nationalism, ordinary sovereignty preference, one state design, armed struggle, Marxist doctrine, pan-continental identity, racial/ethnic exclusion, or one historical movement are insufficient evidence. Arab Nationalism, Maoism, and Neo-Fascism remain catalog-only alternatives or holds with no forced replacement label.
- The active dataset contains 47 editorial anchors: 42 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v20 answer fragment measures 37,651 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. The guard widened for measured capacity; answer-only serialization and share semantics remain unchanged.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Anti-Colonial Nationalism passes isolated structural reachability in all three layers; its full-production ranks 6/9/7 by layer and 5 combined, and aggregate top-three hit rates of 43.6508% by layer and 54.7619% combined remain design diagnostics rather than evidence for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.
## Current v21 acceptance

- `validateDataset(DATASET)` returns no errors for content version 21 with 588 questions and 196 questions in each layer.
- Arab Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical `Nationalism → Arab Nationalism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary requires political Arab collective identity, cross-border solidarity, self-government, and accountable institutional routes while retaining territorial, Pan-Arab, secular, religious, and host-program variation.
- Arabic language, cultural affiliation, private faith, ordinary patriotism, one territorial state, one leader, one secular or religious host, or one economic programme is insufficient evidence. Maoism remains catalog-only and Neo-Fascism remains a high-risk hold; research candidates remain effect-free and quarantined.
- The active dataset contains 48 editorial anchors: 43 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v21 share fragment measures 38,435 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. The answer-only serialization and share semantics remain unchanged.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Arab Nationalism passes isolated structural reachability in all three layers; full-production ranks 10/9/13 by layer and 9 combined, with aggregate top-three hit rates of 43.4109% by layer and 51.1628% combined and worst ranks 40/36 retained as design diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v22 acceptance

- `validateDataset(DATASET)` returns no errors for content version 22 with 600 questions and 200 questions in each layer.
- Maoism exposes four target-tagged prompts in each layer over the existing canonical `Socialism → Communism → Maoism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. Its boundary requires historically situated adaptation of Marxism-Leninism, agrarian/colonial context, mass-line practice, contradiction, rectification, anti-bureaucratic critique, and collective transformation; generic Communism, anti-imperialism, peasant identity, authoritarianism, one regime outcome, or contemporary actor inference is insufficient.
- The active dataset contains 49 editorial anchors: 44 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v22 answer fragment measures 39,059 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. Answer-only serialization and share semantics remain unchanged.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer calculation remain unchanged. Isolated anchor closure passes; full-production ranks 2/14/1 by layer and 1 combined, aggregate top-three hit rates of 43.1818% by layer and 50.0000% combined, and worst ranks 41/37 are structural diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v23 acceptance

- `validateDataset(DATASET)` returns no errors for content version 23 with 612 questions and 204 questions in each layer.
- Council Communism is an existing canonical micro node under `Socialism → Communism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each claim layer. No ontology node is added, reparented, or demoted.
- The 45 production anchors each have 4/4/4 direct target coverage and pass isolated structural routing. Council Communism ranks 12/3/1 by layer and 1 combined in the full-production fixture; those ranks are measurement-design diagnostics only.
- The complete v23 answer fragment measures 39,859 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. Answer-only serialization and share semantics remain unchanged.
- The production addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v30 acceptance

- `validateDataset(DATASET)` returns no errors for content version 30 with 696 questions and 232 questions in each layer; the research bank remains 1,428 candidates across 119 targets with zero validation errors.
- Womanism is an existing canonical micro node under `Feminism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each layer. No ontology node is added, reparented, or demoted.
- The 52 production anchors each have 4/4/4 direct target coverage and pass isolated structural routing. Womanism ranks 43/43/43 by layer and 43 combined; aggregate rates are 35.2564% and 51.9231%, with worst ranks 49 and 46. These are design diagnostics only.
- Full v1 answer encoding measures 45,107 characters and exceeds the finite 40,960-character guard, so complete v30 encoding uses compact v2 at 7,478 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.
- TypeScript, 61/61 unit tests, build, audit, coverage, reachability, local browser QA 10/10, Docker rebuild/health, and Docker-backed browser QA 10/10 passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v29 acceptance — Social Ecology

- `validateDataset(DATASET)` returns no errors for content version 29 with 684 questions, 228 in each layer, 56 editorial anchors, and 51 canonical scoring anchors; research-bank validators also return zero errors.
- Social Ecology is an existing canonical micro node on the typed hybrid `Green Anarchism → Social Ecology` path. It has `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer; no macro ancestry, node reparenting, or topology change was introduced.
- All 51 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Social Ecology ranks 3/6/4 by layer and 2 combined in the deterministic full-production fixture; aggregate rates 36.6013% and 52.9412% and worst ranks 48/45 are design diagnostics only.
- The readable v1 complete-answer representation measures 44,451 characters and exceeds the finite 40,960-character guard. Complete v29 encoding uses compact v2 at 7,350 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, 60/60 unit tests, build, audit, coverage, reachability, local browser QA 10/10, Docker rebuild/health, and Docker-backed browser QA 10/10 passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v28 acceptance

- `validateDataset(DATASET)` returns no errors for content version 28 with 672 prompts, 224 prompts in each layer, 55 editorial anchors, and 50 canonical scoring anchors.
- Anarcho-Pacifism is an existing canonical micro node on `Anarchism → Social Anarchism`; it is `dedicated-scored` with one provisional anchor and exactly four target-tagged prompts in each layer. The source boundary preserves the distinction between pacifism and nonviolence and allows principled, pragmatic, religious, secular, radical, reformist, and self-defense variation.
- All 50 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Anarcho-Pacifism ranks 12/5/2 by layer and 1 combined in the deterministic full-production fixture; aggregate top-three rates are 37.3333% by layer and 52.0000% combined, with worst ranks 47 and 44. These are measurement-design diagnostics only.
- The complete readable v1 answer representation is 43,699 characters and exceeds the finite 40,960-character guard. Complete encoding uses compact v2 at 7,222 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (59/59), build, high-severity dependency audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v27 acceptance

- `validateDataset(DATASET)` returns no errors for content version 27 with 660 prompts, 220 prompts in each layer, 54 editorial anchors, and 49 canonical scoring anchors.
- Autonomist Marxism is an existing canonical micro node on `Socialism → Marxism`; it is `dedicated-scored` with one provisional anchor and exactly four target-tagged prompts in each layer. Ontology topology, facets, scorer policy, thresholds, family balancing, combined-layer semantics, and research quarantine are unchanged.
- All 49 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Autonomist Marxism ranks 10/8/2 by layer and 1 combined in the deterministic full-production fixture; these are measurement-design diagnostics only.
- The complete readable v1 answer representation is 42,915 characters and exceeds the finite 40,960-character guard. Complete encoding uses compact v2 at 7,094 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (58/58), build, audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v26 acceptance

- `validateDataset(DATASET)` returns no errors for content version 26 with 648 questions and 216 questions in each layer.
- Marxism-Leninism is an existing canonical micro node under `Socialism → Communism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each layer. No ontology node is added, reparented, or demoted.
- The 48 production anchors each have 4/4/4 direct target coverage and pass isolated structural routing. Marxism-Leninism ranks 10/27/1 by layer and 1 combined in the full-production fixture; those ranks are measurement-design diagnostics only.
- The readable v1 complete-answer payload remains above the finite 40,960-character guard. The encoder emits a compact index-based version-2 envelope for the expanded full-answer set; version-1 links remain decodable, and stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. The complete v26 emitted fragment measures 6,966 characters.
- The production addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v24 acceptance

- `validateDataset(DATASET)` returns no errors for content version 24 with 624 questions and 208 questions in each layer.
- Guild Socialism is an existing canonical micro node under `Socialism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each layer. No ontology node is added, reparented, or demoted.
- The 46 production anchors each have 4/4/4 direct target coverage and pass isolated structural routing. Guild Socialism ranks 12/5/5 by layer and 5 combined in the full-production fixture; those ranks are measurement-design diagnostics only.
- The complete v24 answer fragment measures 40,627 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. Answer-only serialization and share semantics remain unchanged.
- The production addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.
## Current v25 acceptance

- `validateDataset(DATASET)` returns no errors for content version 25 with 636 questions and 212 questions in each layer.
- Trotskyism is an existing canonical micro node under `Socialism → Communism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each layer. No ontology node is added, reparented, or demoted.
- The 47 production anchors each have 4/4/4 direct target coverage and pass isolated structural routing. Trotskyism ranks 9/2/1 by layer and 1 combined in the full-production fixture; those ranks are measurement-design diagnostics only.
- The readable v1 complete-answer payload would measure 41,315 characters and exceed the finite 40,960-character guard. The encoder therefore emits a compact index-based version-2 envelope for the expanded full-answer set; version-1 links remain decodable, and stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. The complete v25 emitted fragment measures 6,838 characters.
- The production addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v31 acceptance

- `validateDataset(DATASET)` returns no errors for content version 31 with 708 prompts, 236 prompts in each layer, 58 editorial anchors, and 53 canonical scoring anchors; research-bank validation errors are zero.
- Classical-Liberal Feminism is an existing canonical micro node on `Feminism → Liberal Feminism` with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. Its family label remains explicitly contested and branch-sensitive; no ontology topology or scoring-policy change was made.
- All 53 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Classical-Liberal Feminism ranks 45/48/4 by layer and 45 combined; aggregate top-three rates are 36.4780% by layer and 50.9434% combined, with worst ranks 50 and 46. These are design diagnostics only.
- Complete v31 answer encoding uses compact v2 at 7,606 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (62/62), build, high-severity dependency audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v33 acceptance

- `validateDataset(DATASET)` returns no errors for content version 33 with 732 questions, 244 questions in each layer, 60 editorial anchors, and 55 canonical scoring anchors; research-bank validation errors are zero.
- Collectivist Anarchism is an existing canonical micro node under `Anarchism → Social Anarchism` with `dedicated-scored` status, one provisional anchor, and four target-tagged prompts in each layer. Its historically bounded collective-ownership, anti-state, federated, and labor-linked distribution boundary is kept distinct from Anarcho-Communism; no ontology node is added, reparented, or demoted.
- All 55 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Collectivist Anarchism ranks 9/5/1 by layer and 1 combined; aggregate top-three rates are 33.3333% by layer and 49.0909% combined, with worst ranks 52 and 48. These are design diagnostics only.
- Complete v33 answer encoding uses compact v2 at 7,862 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (64/64), build, high-severity dependency audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v34 specification delta — Anarchism macro family

- The canonical `Anarchism` macro may now carry the production anchor `anarchism-family`; the earlier `anarchism` anchor remains contextual-only and must not enter production neighbor scoring.
- The direct item contract is twelve original source-linked prompts targeting `anarchism`, with exactly four descriptive, four normative, and four prescriptive items. The context must preserve plural family variation and distinguish anti-hierarchy from anti-government sentiment or any one descendant route.
- Content version 34 contains 744 prompts (248 per layer), 61 editorial anchors, and 56 production anchors. The scorer, facet vocabulary, coverage threshold, combined-layer semantics, compact v2 share contract, and effect-free research-candidate quarantine are unchanged.
- Structural reachability passes in isolation for all 56 production anchors. Anarchism's full-production rank 45/45/45 and 45 combined is retained as an overlap diagnostic; it is not a validity claim, respondent result, or reason for arbitrary coefficient retuning.

## v35 specification delta — Conservatism macro family

- The canonical `Conservatism` macro carries the production anchor `conservatism-family`; existing Conservative branch and contextual anchors remain distinct and only canonical-placement anchors enter production neighbor scoring.
- Twelve original source-linked questions target `conservatism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic caution, status-quo preference, nationalism, anti-government sentiment, and single-school inference.
- Content version 35 contains 756 prompts (252 per layer), 62 editorial anchors, and 57 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 57 production anchors pass 4/4/4 isolated routing. Conservatism's full-production rank 38/46/4 and 18 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.

## v36 specification delta — Ecologism / Green Ideology macro family

- The canonical `Ecologism` macro carries the production anchor `ecologism-family`; existing ecological descendants, associated traditions, and contextual anchors remain distinct and are not merged into the macro.
- Twelve original source-linked questions target `ecologism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic environmental concern, conservation, Deep Ecology, bioregionalism, Green Politics, Social Ecology, Ecosocialism, single-policy, and single-tradition inference.
- Content version 36 contains 768 prompts (256 per layer), 63 editorial anchors, and 58 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 58 production anchors pass 4/4/4 isolated routing. Ecologism's full-production rank 21/48/3 and 8 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.
## v37 specification delta — Liberalism macro family

- The canonical `Liberalism` macro carries the production anchor `liberalism-family`; existing Classical Liberalism, Social Liberalism, Libertarianism, Neoliberalism, Republicanism, Liberal Feminism, Liberal Nationalism, and contextual Liberal-Conservatism relations remain distinct and are not merged into the macro.
- Twelve original source-linked questions target `liberalism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic individual preference, market support, constitutionalism alone, one party, one state size, and single-school inference.
- Content version 37 contains 780 prompts (260 per layer), 64 editorial anchors, and 59 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 59 production anchors pass 4/4/4 isolated routing. Liberalism's full-production rank 10/24/11 and 9 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.
## v38 data contract — Socialism macro family

- The canonical `socialism` node remains a macro at its existing ontology position and now carries `anchorId: socialism-family` plus fresh source references.
- Exactly twelve new production questions are target-tagged to `socialism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Socialism analytical-scope context.
- The manifest is content version 38 with 792 total questions and `{ descriptive: 264, normative: 264, prescriptive: 264 }`.
- The dataset contains 65 editorial anchors, 60 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records or promote any registry-only target.
- Isolated anchor reachability is a structural fixture. It must not be described as cognitive, psychometric, respondent, or empirical validation.

## v39 data contract — Nationalism macro family

- The canonical `nationalism` node remains a macro at its existing ontology position and now carries `anchorId: nationalism-family` plus five fresh source references.
- Exactly twelve new production questions are target-tagged to `nationalism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Nationalism analytical-scope context string.
- The manifest is content version 39 with 804 total questions and `{ descriptive: 268, normative: 268, prescriptive: 268 }`.
- The dataset contains 66 editorial anchors, 61 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v58 data contract — Khomeinism micro branch

- The existing canonical `khomeinism` node remains a micro under `islamism`, now carrying `anchorId: khomeinism`, status `scored`, and source references for Iranian Shi'i political authority, modern sovereignty/state formation, anti-imperial independence, oppressed-centered mobilization, constitutional ambiguity, and governmental Shiism.
- Exactly twelve new production questions are target-tagged to `khomeinism`: four descriptive, four normative, and four prescriptive. Each uses existing facets, carries academic source references, and includes the Khomeinism analytical-scope context string.
- The manifest is content version 58 with 1,032 total questions and `{ descriptive: 344, normative: 344, prescriptive: 344 }`.
- The dataset contains 85 editorial anchors, 80 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts; 22 canonical ontology targets remain catalog-only and five contextual placements remain contextual-only.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics. No node was added or reparented.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Khomeinism routes in all three isolated layers; ranks 4/31/1 and 1 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v57 data contract — Zionism micro branch

- The existing `zionism` node remains a canonical micro node under `nationalism`, now carrying `anchorId: zionism`, status `scored`, and source references for Jewish national self-determination, historical institutional variation, cultural revival, plural constitutional routes, diaspora relations, and equal-citizenship boundaries.
- Exactly twelve new production questions are target-tagged to `zionism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes academic source references plus the Zionism analytical-scope context string.
- The manifest is content version 57 with 1,020 total questions and `{ descriptive: 340, normative: 340, prescriptive: 340 }`.
- The dataset contains 84 editorial anchors, 79 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics. No node was added or reparented.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Zionism routes in all three isolated layers; ranks 27/25/19 and 19 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v56 data contract — One-Nation Conservatism micro branch

- The existing canonical `one-nation-conservatism` node remains a micro under `moderate-conservatism`, now carries `anchorId: one-nation-conservatism`, status `scored`, and source references for Disraelian/conservative variation, the One Nation Group, welfare-state variation, and contemporary One-Nation disputes.
- Exactly twelve production questions are target-tagged to `one-nation-conservatism`: four descriptive, four normative, and four prescriptive. Each uses existing facets, carries the analytical-scope context string, and preserves historically varied national, institutional, social, market, welfare, and reform routes.
- The manifest is content version 56 with 1,008 total questions and `{ descriptive: 336, normative: 336, prescriptive: 336 }`.
- The dataset contains 83 editorial anchors, 78 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. One-Nation Conservatism routes in all three isolated layers; ranks 15/30/1 and 5 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v55 data contract — Lesbian Feminism micro branch

- The existing canonical `lesbian-feminism` node remains a micro under `feminism`, now carries `anchorId: lesbian-feminism`, status `scored`, and fresh source references for compulsory heterosexuality, lesbian separatism/community formation, collective defense, and adjacent feminist self-definition scholarship.
- Exactly twelve new production questions are target-tagged to `lesbian-feminism`: four descriptive, four normative, and four prescriptive. Each uses existing facets, includes academic source references, and carries the Lesbian Feminism analytical-scope context string.
- The manifest is content version 55 with 996 total questions and `{ descriptive: 332, normative: 332, prescriptive: 332 }`.
- The dataset contains 82 editorial anchors, 77 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Lesbian Feminism routes in all three isolated layers; ranks 3/16/10 and 4 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v54 data contract — Ethnocultural Nationalism micro branch

- Existing canonical node: `ethnocultural-nationalism`, micro, canonical placement under `nationalism`, `anchorId: ethnocultural-nationalism`, status `scored`; the existing `Nationalism → Ethnocultural Nationalism` path is preserved.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked, target-tagged, and scoped with the Ethnocultural Nationalism analytical-context string.
- Boundary: a contested nationalist conception that makes shared descent, inherited cultural continuity, language, customs, or ethnocultural membership constitutive of the nation or political community and gives that rule institutional or political consequences. Cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, and generic Nationalism are insufficient.
- Manifest: content version 54; 984 questions; 328 per layer; 81 editorial anchors; 76 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. Full-production ranks 15/28/1 and 3 combined are overlap diagnostics only; no scorer or picker retuning was made.

## v53 data contract — Cultural Nationalism micro branch

- The existing canonical 'cultural-nationalism' node remains a micro under 'nationalism', now carries 'anchorId: cultural-nationalism', status 'scored', and source references for cultural/political nationalism, national-community formation, language and schooling, and national-minded citizen formation.
- Exactly twelve new production questions are target-tagged to 'cultural-nationalism': four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Cultural Nationalism analytical-scope context string.
- The manifest is content version 53 with 972 total questions and { descriptive: 324, normative: 324, prescriptive: 324 }.
- The dataset contains 80 editorial anchors, 75 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, combined-layer semantics, or contextual-only exclusion.
- The direct boundary requires a national translation, a cultural mechanism, and a public or collective project. Cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, ethnocultural inherited membership, religious nationalism, anti-colonial domination, one state/party/heritage policy, fixed cultural homogeneity, or one author is insufficient.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v52 data contract — Cultural Feminism micro branch

- The existing canonical `cultural-feminism` node remains a micro under `radical-feminism` with `anchorId: cultural-feminism` and provisional `dedicated-scored` status; the `Feminism → Radical Feminism → Cultural Feminism` path is preserved.
- Exactly twelve new production questions are target-tagged to `cultural-feminism`: four descriptive, four normative, and four prescriptive. Each is source-linked and uses the Cultural Feminism analytical-scope context string.
- The source-bounded mechanism requires cultural or gendered norms to shape power, care/relational/embodied practices to carry political value without fixed female essence, and cultural/institutional valuation to remain open to contestation. Gender identity, care preference/work, feminist identity, generic feminism, one author, one community, or one policy alone is insufficient.
- The manifest is content version 52 with 960 total questions and `{ descriptive: 320, normative: 320, prescriptive: 320 }`; the dataset contains 79 editorial anchors and 74 production scoring anchors.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, contextual-only exclusion, or combined-layer semantics.
- Isolated anchor routing and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation; no scorer or picker retuning was made from overlap diagnostics.

## v51 data contract — Egoist Anarchism micro branch

- The canonical `egoist-anarchism` node remains a micro at its existing ontology position under `individualist-anarchism` and now carries `anchorId: egoist-anarchism` plus source references for Stirner, egoism, individualist anarchism, and adjacent anarchist/libertarian distinctions.
- Exactly twelve new production questions are target-tagged to `egoist-anarchism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Egoist Anarchism analytical-scope context string.
- The manifest is content version 51 with 948 total questions and `{ descriptive: 316, normative: 316, prescriptive: 316 }`.
- The dataset contains 78 editorial anchors, 73 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v50 data contract — Christian Nationalism micro branch

- The existing canonical `christian-nationalism` node remains a micro node under `religious-nationalism`, carries `anchorId: christian-nationalism`, status `scored`, and source references for Christian-national political-theological variation, public institutional translation, national membership, and distinctions from private religiosity, patriotism, and adjacent religious-national forms.
- Exactly twelve new production questions are target-tagged to `christian-nationalism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Christian Nationalism analytical-scope context string.
- The manifest is content version 50 with 936 total questions and `{ descriptive: 312, normative: 312, prescriptive: 312 }`.
- The dataset contains 77 editorial anchors, 72 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v49 data contract — Materialist / Socialist Ecofeminism micro branch

- The existing canonical `materialist-socialist-ecofeminism` node remains a micro node under `ecofeminism`, now carries `anchorId: materialist-socialist-ecofeminism`, status `scored`, and eight source references for materialist/Marxist ecofeminism, feminist political ecology, social reproduction, resource control, and situated just transition.
- Exactly twelve new production questions are target-tagged to `materialist-socialist-ecofeminism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Materialist / Socialist Ecofeminism analytical-scope context string.
- The manifest is content version 49 with 924 total questions and `{ descriptive: 308, normative: 308, prescriptive: 308 }`.
- The dataset contains 76 editorial anchors, 71 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v48 specification — Cultural / Spiritual Ecofeminism micro branch

- Scope: promote the existing canonical `cultural-spiritual-ecofeminism` micro node under `ecofeminism` to provisional dedicated scoring without adding or reparenting an ontology node.
- Source boundary: a plural cultural, spiritual, symbolic, or relational ecofeminist strand connecting gendered domination with ecological interdependence; preserve religious/secular variation, relational selves, hierarchical-dualism critique, cultural diversity, anti-essentialist, intersectional, decolonial, care, justice, and material-versus-symbolic boundaries.
- Exclusions: private spirituality, gender identity, environmental concern, woman–nature essentialism, one religion or goddess tradition, cultural nostalgia, generic Ecofeminism, Cultural Feminism, Materialist / Socialist Ecofeminism, Deep Ecology, anti-technology sentiment, one author, one community, one policy, or one theological programme alone.
- Direct coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive source-linked questions, each carrying the Cultural / Spiritual Ecofeminism analytical context and target ID.
- Anchor: one provisional editorial `cultural-spiritual-ecofeminism` anchor attached to the existing node; it is eligible for production neighbor scoring but does not create a validated scale or respondent identity assignment.
- Manifest: content version 48; 912 questions; 304 per layer; 75 editorial anchors; 70 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: coverage, isolated routing, reachability, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v47 data contract — Buddhist Nationalism micro branch

- The existing canonical `buddhist-nationalism` node remains a micro under `religious-nationalism` and now carries the `buddhist-nationalism` anchor plus seven source references; its status is `scored` through the dedicated production block.
- Exactly twelve new production questions are target-tagged to `buddhist-nationalism`: four descriptive, four normative, and four prescriptive. Each is layer-correct, source-linked, and includes the Buddhist Nationalism analytical-scope context string.
- Boundary: variable public religion–nation translation in which Buddhist histories, institutions, symbols, or moral claims shape national identity, public order, membership, or self-determination; private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, one jurisdiction, one monk, one minority conflict, one constitutional model, or one party alone is insufficient.
- Manifest: content version 47; 900 questions; 300 per layer; 74 editorial anchors; 69 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v46 data contract — Egalitarian-Liberal Feminism micro branch

- Existing canonical node: `egalitarian-liberal-feminism`, micro, canonical placement under `liberal-feminism`, `anchorId: egalitarian-liberal-feminism`, status `scored`; the current ontology intentionally exposes the two-node `Liberal Feminism → Egalitarian-Liberal Feminism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Egalitarian-Liberal Feminism analytical context string.
- Boundary: personal and political autonomy, gendered institutional starting conditions, substantive equality and opportunity, democratic inclusion, and accountable public action that enables meaningful choice; generic liberalism, formal rights, equality, public provision, anti-discrimination, feminism, one policy, or one author alone is insufficient.
- Manifest: content version 46; 888 questions; 296 per layer; 73 editorial anchors; 68 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v45 data contract — Austromarxism micro branch

- The existing canonical `austromarxism` node remains a micro node on `Socialism → Marxism → Austromarxism`; it now carries source-linked metadata, `anchorId: austromarxism`, and provisional `dedicated-scored` production status.
- Exactly twelve new production questions are target-tagged to `austromarxism`: four descriptive, four normative, and four prescriptive. They require a convergent historically situated Austrian Marxist and Social Democratic boundary involving class transformation, worker-movement unity, democratic institutional strategy, and personal or non-territorial national autonomy in multinational conditions.
- The manifest is content version 45 with 876 total questions and `{ descriptive: 292, normative: 292, prescriptive: 292 }`.
- The dataset contains 72 editorial anchors, 67 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged canonical inventory of 9 macro / 33 meso / 60 micro nodes; five contextual placements remain outside production scoring.
- Research candidates remain effect-free and quarantined. Activating this block changes no facet, ontology parentage, target-specific scoring, scorer policy version 3, threshold, distance, family-balancing, combined-layer, or share semantics.
- Austromarxism has isolated 4/4/4 routing and full-production ranks 8/5/2 by layer and 2 combined. These deterministic fields are structural overlap diagnostics, not cognitive, psychometric, respondent, or empirical validation.

## v43 specification — Anarcho-Capitalism micro branch

- Existing canonical node: `anarcho-capitalism`, micro, canonical placement under `libertarianism`, `anchorId: anarcho-capitalism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Anarcho-Capitalism analytical context string.
- Boundary: territorial-monopoly rejection, strong private-property and contract claims, voluntary market coordination, exit, and polycentric proprietary/legal/protective institutions; do not infer the target from generic libertarianism, small-government preference, anti-state sentiment, Minarchism, non-market anarchism, Mutualism, or private provision alone.
- Manifest: content version 43; 852 questions; 284 per layer; 70 editorial anchors; 65 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. The relation between Anarcho-Capitalism and anarchism remains contested and is not adjudicated by the local anchor.

## v44 specification — Anarcho-Primitivism micro branch

- Existing canonical node: `anarcho-primitivism`, micro, existing relation under `green-anarchism`, `anchorId: anarcho-primitivism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Anarcho-Primitivism analytical context string.
- Boundary: civilization/industrial-scale/specialization/domestication/technical-dependence critique, ecological priority, and radically decentralized or self-organized lifeways; environmentalism, broad Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, or one theorist's programme alone is insufficient.
- Manifest: content version 44; 864 questions; 288 per layer; 71 editorial anchors; 66 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. The Green Anarchism relation is preserved without inventing a macro breadcrumb.

## v42 data contract — Anarcho-Syndicalism micro branch

- The existing canonical `anarcho-syndicalism` node remains a micro node under `social-anarchism`, now carries `anchorId: anarcho-syndicalism`, status `scored`, and source references for anarchist branch distinction, syndicalist history, direct action, local variation, and self-governance.
- Exactly twelve new production questions are target-tagged to `anarcho-syndicalism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Anarcho-Syndicalism analytical-scope context string.
- The manifest is content version 42 with 840 total questions and `{ descriptive: 280, normative: 280, prescriptive: 280 }`.
- The dataset contains 69 editorial anchors, 64 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v40 data contract — Republicanism macro family

- The canonical `republicanism` node remains a macro at its existing ontology position and now carries `anchorId: republicanism-family` plus source references for historical republicanism, contemporary non-domination theory, civic republicanism, and democratic accountability.
- Exactly twelve new production questions are target-tagged to `republicanism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Republicanism analytical-scope context string.
- The manifest is content version 40 with 816 total questions and `{ descriptive: 272, normative: 272, prescriptive: 272 }`.
- The dataset contains 67 editorial anchors, 62 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.

## v41 data contract — Feminism macro family

- The canonical `feminism` node remains a macro at its existing ontology position and now carries `anchorId: feminism-family` plus source references for feminist philosophy, feminist political philosophy, and feminist-philosophy pluralism.
- Exactly twelve new production questions are target-tagged to `feminism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes an academic source reference and the Feminism analytical-scope context string.
- The manifest is content version 41 with 828 total questions and `{ descriptive: 276, normative: 276, prescriptive: 276 }`.
- The dataset contains 68 editorial anchors, 63 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. They must not be described as cognitive, psychometric, respondent, or empirical validation.


## v59 content contract — Qutbism micro branch

The live dataset is content version 59 with 1,044 questions (348 descriptive, 348 normative, and 348 prescriptive), 86 editorial anchors, and 81 canonical scoring anchors. The canonical inventory remains 9 macro, 33 meso, and 60 micro nodes; ontology totals remain 9/38/60 with five contextual placements, and the registry remains 12 entries.

The existing `Islamism → Qutbism` node is `dedicated-scored` with one provisional anchor and twelve direct prompts at 4/4/4. The source-bounded construct covers divine sovereignty/`jahiliyya`, comprehensive moral order, disciplined transformation, and varied reception; identity, private faith, generic Islamism, current policy, militancy, or one reading is insufficient.

Governance remains independently recorded as promote-to-canonical with `resultingScoringStatus: catalog-only`; it must not overwrite live measurement. Production excludes 21 canonical catalog-only targets, five contextual-only anchors, and 12 registry-only targets. The 1,428 candidates remain effect-free. No cognitive or empirical evidence is claimed.

## v60 content contract — Radical Republicanism micro branch

The live dataset is content version 60 with 1,056 questions (352 descriptive, 352 normative, and 352 prescriptive), 87 editorial anchors, and 82 canonical scoring anchors. The canonical inventory remains 9 macro, 33 meso, and 60 micro nodes; ontology totals remain 9/38/60 with five contextual placements, and the registry remains 12 entries.

The existing `Republicanism → Historical Republicanism → Radical Republicanism` node is `dedicated-scored` with one provisional anchor and twelve direct prompts at 4/4/4. The source-bounded construct covers popular sovereignty, freedom as non-domination, equal civic standing, anti-corruption, continuous contestation, and transformative public institutions; patriotism, generic anti-corruption, majoritarianism, civic participation alone, Marxism alone, or one institutional route is insufficient.

Governance retains the node as canonical with `retain-canonical` and `resultingScoringStatus: scored-provisional`; this value is separate from the live measurement state and does not validate the anchor. Production excludes 20 canonical catalog-only targets, five contextual-only anchors, and 12 registry-only targets. The 1,428 candidates remain effect-free. No cognitive or empirical evidence is claimed.

## v61 content contract — Marxist Feminism micro branch

The live dataset is content version 61 with 1,068 questions (356 descriptive, 356 normative, and 356 prescriptive), 88 editorial anchors, and 83 canonical scoring anchors. The canonical inventory remains 9 macro, 33 meso, and 60 micro nodes; ontology totals remain 9/38/60 with five contextual placements, and the registry remains 12 entries.

The existing `Socialist / Marxist Feminism → Marxist Feminism` node is `dedicated-scored` with one provisional anchor and twelve direct prompts at 4/4/4. The source-bounded construct covers linked class and gendered power, capitalist production, social reproduction, labor and care, material dependence, and transformative emancipation; generic Feminism, Marxism alone, welfare or public ownership alone, unpaid-care concern alone, one author, or one institutional route is insufficient.

Governance retains the node as canonical with `retain-canonical` and `resultingScoringStatus: scored-provisional`; this value is separate from the live measurement state and does not validate the anchor. Production excludes 19 canonical catalog-only targets, five contextual-only anchors, and 12 registry-only targets. The 1,428 candidates remain effect-free. No cognitive or empirical evidence is claimed.

## V62 specification — Socialist Feminism micro branch

V62 adds provisional direct measurement to the existing canonical `Socialist / Marxist Feminism → Socialist Feminism` micro node: four descriptive, four normative, and four prescriptive prompts plus one provisional anchor. The construct covers linked but non-identical patriarchy and class relations, production and social reproduction, paid and unpaid labor, care, collective provision, socialist transformation, and autonomous feminist-socialist organizing; Marxist Feminism, Materialist Feminism, generic Feminism, generic Socialism, welfare or care support alone, and one institutional route are insufficient.

The contract is 1,080 prompts (360 per layer), 89 editorial anchors, 84 scoring anchors, 18 canonical catalog-only targets, 12 registry targets, and 1,428 effect-free candidates across 119 targets. Governance retains the node as canonical with `retain-canonical` and `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Delivery checks passed; respondent and empirical evidence remain open.

## V63 specification — Left-Wing Populism micro branch

V63 adds provisional direct measurement to the existing canonical `Populism → Left-Wing Populism` micro node: four descriptive, four normative, and four prescriptive prompts plus one provisional anchor. The construct covers a people-versus-elite articulation joined to a left-egalitarian host, with variation over identity construction, class and multisectoral people-construction, policy content, institutional strategy, leadership, movement organization, reform/transformative routes, and domestic/international scope; generic anti-elite dissatisfaction, left policy alone, the thin Populist core, Right-Wing Populism, Nationalism, Socialism, Democratic Socialism, and one project-specific position are insufficient.

The contract is 1,092 prompts (364 per layer), 90 editorial anchors, 85 scoring anchors, 17 canonical catalog-only targets, 12 registry targets, and 1,428 effect-free candidates across 119 targets. Governance retains the node as canonical with `retain-canonical` and `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Delivery checks remain evidence-gated; respondent and empirical evidence remain open.
