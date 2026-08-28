# Feature Spec — Precision and Academic Source Expansion

## Context Map

### Shared premises

- Goal: reduce false precision in the interpretive neighbor display and make the expanded item bank traceable to credible research and survey-method guidance.
- Scope: 204-item client-only prototype, three claim layers, deterministic local scoring, a gated equal-layer combined pattern, and versioned share fragments.
- Success: the app distinguishes “close but low separation” from a clearly separated neighbor, exposes academic source roles, and completes the expanded flow without breaking coverage, no-view, restart, or share contracts.

### Stakeholders

| Role | Need |
|---|---|
| Respondent | Clear, non-leading items and honest ambiguity language. |
| Maintainer | Stable IDs, source metadata, deterministic tests, and safe version bumps. |
| Methodology reviewer | Traceable claims, explicit evidence limits, and a documented substantive promotion-review boundary. |

### Existing environment

React + TypeScript + Vite, pure scoring in `src/scoring.ts`, local versioned data in `src/data.ts`, fail-closed share fragments in `src/share.ts`, and Vitest/Playwright verification.

## Current continuation — 2026-08-26

The active content release is version 5 with 204 original prompts, 68 per claim layer. Eleven existing anchors now have direct four-question-per-layer coverage: Right-Libertarianism from the preceding tranche, plus Classical Liberalism, Social Liberalism, Moderate Conservatism, Social Democracy, Democratic Socialism, Minarchism, Ecosocialism, Left-Libertarianism, Libertarian Socialism, and National Conservatism from the direct-coverage continuations. The ten new blocks are editorially derived from source-backed research seeds and remain provisional. The baseline requirements below document earlier precision releases; this continuation does not imply cognitive review, respondent evidence, psychometric calibration, or scientific validity.

The research workbench remains separate from the respondent bank: all 1,428 candidate records across 119 ontology/registry targets remain `research_candidate` material. Direct coverage changes target-level measurement metadata and adds target tags to ten source-backed blocks; it does not add registry entries to production scoring, change the facet vocabulary, alter the inclusive 50% threshold, or create an overall ideological ranking.

## Current v6 continuation — 2026-08-26

The active content release is now version 6 with 252 original prompts, 84 per claim layer. Four existing canonical meso nodes—Libertarianism, Marxism, Social Anarchism, and Liberal Feminism—receive four descriptive, four normative, and four prescriptive target-tagged prompts each. Their source boundary was checked against the [SEP Libertarianism entry](https://plato.stanford.edu/entries/libertarianism/), [SEP Karl Marx](https://plato.stanford.edu/entries/marx/), [SEP Anarchism](https://plato.stanford.edu/entries/anarchism/), and [SEP Liberal Feminism](https://plato.stanford.edu/entries/feminism-liberal/); these sources support terminology and construct boundaries only.

The dataset retains 20 editorial anchors, but production scoring now admits only the 15 anchors whose ontology nodes have canonical placement. The five broad contextual bridge anchors remain visible in the research workbench and provenance metadata as `contextual-only`; they are not production neighbors. The 1,428 effect-free research candidates remain quarantined. No cognitive review, respondent evidence, psychometric calibration, or empirical validity evidence was run or implied.

## Problem Statement

| ID | Problem | Impact | Priority |
|---|---|---|---|
| P1 | The preceding 72-item bank and sparse branch coverage left multiple anchors close together. | Several neighbors displayed at 98–99%, which reads as unsupported certainty. | Required |
| P2 | The source registry is mostly design inspiration and does not distinguish academic construct sources from party-position data or survey-method guidance. | Reviewers cannot tell what a citation supports or what it does not support. | Required |
| P3 | The UI presents a bounded distance as a percentage without a separation/ambiguity state. | The user sees a precise-looking tie instead of an honest near-neighbor set. | Required |
| P4 | The bank remains an editorial and provisional instrument. | More items can add burden or ambiguity without establishing measurement validity. | Informational |

## Requirements

1. Extend the versioned dataset from 72 to 84 original prompts, 28 per layer, adding branch-sensitive coverage for Right-Libertarianism.
2. Add academically grounded source records with citation, role, retrieval date, and explicit support boundaries.
3. Add four new prompts per layer covering the Right-Libertarianism discriminators identified in research, without copying external wording.
4. Keep descriptive, normative, and prescriptive items separate; keep `No view yet` missing and `Mixed / depends` answered midpoint data.
5. Preserve family-balanced neighbor selection but add separation metadata derived from the ordered candidate distances.
6. Do not show a percentage-like fit when a neighbor is inside the low-separation tolerance band; say that multiple anchors remain close.
7. Show source-role information in methodology and retain per-item/per-anchor source links.
8. Bump the content version so old share fragments fail closed rather than being silently reinterpreted.
9. Update tests and browser flows to use dataset counts rather than hard-coded 48/16 assumptions.
10. Withhold the combined pattern until all three layers meet the coverage threshold; preserve covered layer results when the combined pattern is withheld.
11. Compute the combined anchor fit as the equal mean of the three layer-specific anchor fits and expose each layer contribution in the returned result.
12. Bump the scoring-policy version for the new derived-result semantics and disclose that the combined pattern is not an identity assignment or recommendation.

## Acceptance criteria

- `validateDataset(DATASET)` returns no errors for the 84-item dataset.
- Each layer has exactly 28 prompts and at least two prompts for every observed facet.
- Academic and survey-method sources are linked from the methodology disclosure and carry retrieval dates and roles.
- Unit tests cover low-separation neighbors, a clearly separated neighbor, dynamic coverage thresholds, and stale share versions.
- Browser tests complete all dataset questions, exercise both layer transitions, create/restore a share link, and restart.
- The results screen no longer presents a 98–99% number as the only interpretation when several anchors are close.
- The methodology copy states that academic sources support construct/item-development choices, not respondent classification or anchor truth.
- A fully covered run renders a combined pattern with three inspectable layer contributions and retains all three separate layer sections.
- A run with one insufficient layer renders no combined neighbors while preserving the other covered layer sections.

## Current continuation acceptance

- `validateDataset(DATASET)` returns no errors for content version 5 with 204 questions and 68 questions in each layer.
- The ten new target blocks each contain four descriptive, four normative, and four prescriptive target-tagged prompts, with source references that resolve to academic ideology-research records.
- `npm run research:coverage` reports eleven `dedicated-scored` targets, five `scored-indirect` targets, 91 `catalog-only` targets, 12 `registry-only` targets, and zero research/governance validation errors.
- The 1,428 research candidates remain quarantined and are not copied into production effects, anchors, or respondent-facing prompts.
- Unit, strict TypeScript, build, and browser checks use manifest-derived counts and preserve no-view, share, restart, provenance, and combined-pattern contracts.
- The current release remains editorial and provisional; no cognitive review, respondent/field study, psychometric estimate, reliability/validity evidence, or political comparison claim is made.

## Current v7 continuation — 2026-08-26

The active content release is version 7 with 348 original prompts, 116 per claim layer, 28 editorial anchors, and 23 canonical scoring anchors. Eight existing canonical meso nodes now have dedicated 4/4/4 blocks: Christian Democracy, Contemporary Neo-Republicanism, Black Feminism, Ecofeminism, Green Anarchism, Anarcha-Feminism, Liberal Nationalism, and Radical Feminism. The canonical graph remains 9 macro, 33 meso, and 60 micro nodes; five contextual-placement anchors remain outside production scoring.

The v7 blocks are grounded in the [SEP Republicanism](https://plato.stanford.edu/entries/republicanism/), [SEP Nationalism](https://plato.stanford.edu/entries/nationalism/), [SEP Feminist Perspectives on Power](https://plato.stanford.edu/entries/feminist-power/), [SEP Feminist Environmental Philosophy](https://plato.stanford.edu/entries/feminism-environmental/), [SEP Anarchism](https://plato.stanford.edu/entries/anarchism/), and Cambridge [Christian-democratic social-capitalism](https://www.cambridge.org/core/books/abs/what-is-christian-democracy/social-capitalism/8EE4DFB7697F5F05C8A63BEEA098461C) context records. These sources support terminology, construct boundaries, and item-writing rationale only. They do not validate the local wording, anchor vectors, or respondent classification.

### Current v7 acceptance

- `validateDataset(DATASET)` returns no errors for content version 7 with 348 questions and 116 questions in each layer.
- `npm run research:coverage` reports 23 `dedicated-scored` targets, 79 `catalog-only` ontology targets, five `contextual-only` anchors, 12 `registry-only` entries, 1,428 candidates, 119 targets, and zero validation errors.
- The 96 new production items are target-tagged to eight existing canonical meso nodes and preserve the descriptive/normative/prescriptive separation.
- The current release remains editorial and provisional; no cognitive review, respondent/field study, substitute simulation, psychometric estimate, reliability/validity evidence, or political comparison claim is made.

## Current v8 continuation — 2026-08-26

The active content release is version 8 with 408 original prompts, 136 per claim layer, 33 editorial anchors, and 28 canonical scoring anchors. Five existing canonical meso nodes now have dedicated 4/4/4 blocks: Communism, Historical Republicanism, Individualist Anarchism, Neoliberalism, and Socialist / Marxist Feminism. The canonical graph remains 9 macro, 33 meso, and 60 micro nodes; five contextual-placement anchors remain outside production scoring.

The v8 blocks use the [Oxford Communism](https://academic.oup.com/edited-volume/34324/chapter-abstract/291335150), [SEP Marx](https://plato.stanford.edu/entries/marx/), [SEP Republicanism](https://plato.stanford.edu/entries/republicanism/), [Oxford Civic Republicanism](https://academic.oup.com/book/1981/chapter-abstract/141819344), [SEP Anarchism](https://plato.stanford.edu/entries/anarchism/), [SEP Max Stirner](https://plato.stanford.edu/entries/max-stirner/), [SEP Neoliberalism](https://plato.stanford.edu/entries/neoliberalism/index.html), [Oxford Socialism: A Very Short Introduction](https://academic.oup.com/book/32741), and [SEP Feminist Perspectives on Class and Work](https://plato.stanford.edu/entries/feminism-class/index.html) as terminology and construct-boundary context only. They do not validate local wording, anchor vectors, or respondent classification.

### Current v8 acceptance

- `validateDataset(DATASET)` returns no errors for content version 8 with 408 questions and 136 questions in each layer.
- `npm run research:coverage` reports 28 `dedicated-scored` targets, 74 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- The 60 new production items are target-tagged to five existing canonical meso nodes and preserve the descriptive/normative/prescriptive separation.
- The current release remains editorial and provisional; no cognitive review, respondent/field study, substitute simulation, psychometric estimate, reliability/validity evidence, invariance study, or political comparison claim is made.

## Current v6 acceptance

- `validateDataset(DATASET)` returns no errors for content version 6 with 252 questions and 84 questions in each layer.
- `npm run research:coverage` reports 15 `dedicated-scored` targets, five `contextual-only` targets, 87 `catalog-only` targets, 12 `registry-only` targets, and zero research/governance validation errors.
- The audit reports 20 editorial anchors and 15 canonical scoring anchors; contextual bridge anchors do not enter production neighbor selection.
- The 48 new production items are target-tagged to four canonical meso nodes and preserve layer-contiguous ordering and the existing inclusive 50% threshold.
- The current release remains editorial and provisional; no cognitive review, respondent/field study, psychometric estimate, reliability/validity evidence, or political comparison claim is made.

## Future validation gate

The expanded bank remains editorial and provisional; source citations and automated checks do not establish respondent comprehension, response-process validity, reliability, or population-level validity. Before any candidate enters the production bank, it must pass substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review (or a documented not-applicable decision), and later empirical validation. The current workbench does not assert that any of these promotion checks has passed.

## Current v9 acceptance

- `validateDataset(DATASET)` returns no errors for content version 9 with 432 questions and 144 questions in each layer.
- `npm run research:coverage` reports 30 `dedicated-scored` targets, 72 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Populism and Mutualism each expose four target-tagged descriptive, four normative, and four prescriptive prompts and a source-linked provisional anchor; the seven remaining canonical meso holds remain catalog-only.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 30 canonical production anchors. It reports full-production top-three overlap separately and does not treat that fixture as cognitive, respondent, psychometric, or empirical validation.
- The scoring policy remains version 3; no threshold, distance, family-balancing, or combined-layer rule was changed in this tranche.

## Current v10 acceptance

- `validateDataset(DATASET)` returns no errors for content version 10 with 456 questions and 152 questions in each layer.
- `npm run research:coverage` reports 32 `dedicated-scored` targets, 70 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Radical Conservatism and Reactionary Conservatism each expose four target-tagged descriptive, four normative, and four prescriptive prompts and a source-linked provisional anchor; the five remaining canonical meso holds remain catalog-only.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 32 canonical production anchors. It reports full-production top-three overlap separately and does not treat that fixture as cognitive, respondent, psychometric, or empirical validation.
- The scoring policy remains version 3. The shared order/tradition/reform geometry is a documented measurement limitation; no arbitrary facet or target-block coefficient was added.

## Current v11 acceptance

- `validateDataset(DATASET)` returns no errors for content version 11 with 468 questions and 156 questions in each layer.
- `npm run research:coverage` reports 33 `dedicated-scored` targets, 68 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Islamism exposes four target-tagged descriptive, four normative, and four prescriptive prompts and a source-linked provisional anchor. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 33 canonical production anchors. Full-production overlap remains a diagnostic only.
- The scoring policy remains version 3. The public-project versus private-faith boundary is explicit; no arbitrary facet, target-block coefficient, militant-content classifier, or cognitive/empirical validation claim is added.

## Historical v12 acceptance

- `validateDataset(DATASET)` returns no errors for content version 12 with 480 questions and 160 questions in each layer.
- `npm run research:coverage` reports 34 `dedicated-scored` targets, 68 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Ordoliberalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical micro node, with a source-linked provisional anchor and explicit competition/order, anti-concentration, and social-market boundaries.
- Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; Pan-Africanism and Black Nationalism remain research-only alternatives in this decision.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 34 canonical production anchors. Full-production overlap remains a structural measurement diagnostic only.
- The scoring policy remains version 3; no threshold, distance, family-balancing, or combined-layer rule was changed. Academic sources support terminology and item-authoring rationale, not respondent classification or empirical validation.

## Current v13 acceptance

- `validateDataset(DATASET)` returns no errors for content version 13 with 492 questions and 164 questions in each layer.
- `npm run research:coverage` reports 35 `dedicated-scored` targets, 67 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Pan-Africanism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical micro node under Nationalism, with a source-linked provisional anchor and explicit African/diasporic solidarity, continuing colonial/racial power, self-determination, and cross-border cooperation boundaries.
- Black Nationalism and Anti-Colonial Nationalism remain research-only alternatives; Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds. The Pan-Africanism source record documents internal internationalist, sovereigntist, and nativist variation rather than a single universal subtype.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 35 canonical production anchors. Pan-Africanism closes in isolation; full-production ranks remain a structural measurement diagnostic only.
- The scoring policy remains version 3; no threshold, distance, family-balancing, or combined-layer rule was changed. Academic sources support terminology and item-authoring rationale, not respondent classification or empirical validation. No cognitive review was run.

## Current v20 acceptance

- `validateDataset(DATASET)` returns no errors for content version 20 with 576 questions and 192 questions in each layer.
- Anti-Colonial Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over the existing canonical `Nationalism → Anti-Colonial Nationalism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary jointly covers colonial or externally imposed domination, collective self-rule, open-ended self-determination, solidarity, accountable institution-building, and anti-imperial transformation while preserving historical variation.
- Formal independence, generic Nationalism, ordinary sovereignty preference, one state design, armed struggle, Marxist doctrine, pan-continental identity, racial/ethnic exclusion, or one historical movement are insufficient evidence. Arab Nationalism, Maoism, and Neo-Fascism remain catalog-only alternatives or holds with no forced replacement label.
- The active dataset contains 47 editorial anchors: 42 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v20 answer fragment measures 37,651 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. The guard widened for measured capacity; answer-only serialization and share semantics remain unchanged.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Anti-Colonial Nationalism passes isolated structural reachability in all three layers; its full-production ranks 6/9/7 by layer and 5 combined, and aggregate top-three hit rates of 43.6508% by layer and 54.7619% combined remain design diagnostics rather than evidence for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v19 acceptance

- `validateDataset(DATASET)` returns no errors for content version 19 with 564 questions and 188 questions in each layer.
- Materialist Feminism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over the existing canonical `Socialist / Marxist Feminism → Materialist Feminism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary requires material labor/care/social-reproduction, embodiment, institutional, structural-power, resource, historical-specificity, and emancipatory dimensions without requiring one Marxist or socialist programme.
- Marxist Feminism, Socialist Feminism, and Radical Feminism remain distinct catalog branches where class/capital, socialist transformation, or patriarchy/sexual domination are more constitutive. Generic feminist identity, care approval, material policy preference, class analysis without gendered material power, and one ownership/state route are insufficient evidence. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 46 editorial anchors: 41 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v19 answer fragment measures 36,723 characters under the finite 36,864-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scorer, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Materialist Feminism passes isolated structural reachability in all three layers; its full-production ranks 2/7/5 by layer and 4 combined, with aggregate overlap and worst ranks 38/34 retained as design diagnostics rather than evidence for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v17 acceptance

- `validateDataset(DATASET)` returns no errors for content version 17 with 540 questions and 180 questions in each layer.
- `npm run research:coverage` reports 39 `dedicated-scored` targets, 63 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` entries, 1,428 candidates, 119 targets, and zero validation errors.
- Civic Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical micro node under Nationalism, with a source-linked provisional anchor and explicit context-sensitive civic-membership, equal-standing, self-government, and civic–ethnic boundary notes. It is not inferred from generic patriotism, private constitutional preference, or isolated democratic support.
- Neo-Fascism remains catalog-only; the research bank remains effect-free and separate from production scoring. Black Nationalism and Materialist Feminism remain documented alternatives rather than silently forced replacements.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 39 canonical production anchors. Full-production overlap remains a structural measurement diagnostic only; Civic Nationalism ranks 10/6/7 by layer and 6 combined in the deterministic fixture.
- The finite share guard is 36,864 characters after the measured complete v17 answer fragment reached 35,075 characters. The scorer remains policy version 3; academic sources support terminology and item-authoring rationale, not respondent classification or empirical validation. No cognitive review was run.

## Current v18 acceptance

- `validateDataset(DATASET)` returns no errors for content version 18 with 552 questions and 184 questions in each layer.
- Black Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical micro node under Nationalism, with a source-linked provisional anchor and `dedicated-scored` derived status. The boundary requires a joint dignity/linked-fate, anti-Black power, autonomy/self-determination, and self-directed-institution bundle; identity, cultural pride, separatism alone, Pan-Africanism alone, one organization, or current-actor inference is insufficient.
- Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives, while Neo-Fascism remains a high-risk catalog-only hold. The research bank remains effect-free and separate from production scoring.
- The active dataset contains 45 editorial anchors: 40 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v18 answer fragment measures 35,875 characters under the finite 36,864-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer rule remain unchanged. Black Nationalism passes isolated structural reachability in all three layers; its full-production ranks 3/15/7 by layer and 4 combined, aggregate overlap, and worst ranks 37/33 remain design diagnostics rather than respondent evidence or grounds for arbitrary retuning. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.

## Current v16 acceptance

- `validateDataset(DATASET)` returns no errors for content version 16 with 528 questions and 176 questions in each layer.
- National Socialism exposes four original target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical meso node, with a source-linked provisional anchor and explicit German interwar/1933–1945 historical scope.
- The block requires a convergent völkisch/racialized, anti-pluralist, leader-centered, institutional, exclusionary, and national-renewal bundle. Generic nationalism, generic authoritarianism, private identity, and current-actor inference are not sufficient evidence. Neo-Fascism remains catalog-only.
- `npm run research:anchor-reachability` reports all 38 canonical production anchors with 4/4/4 target blocks and zero validation or structural-closure failures. National Socialism closes in isolation; full-production overlap and ranks remain structural diagnostics only.
- The active scoring policy remains version 3; no facet, threshold, distance, family-balancing, combined-layer, ontology, or share semantic changed. The research bank remains 1,428 effect-free candidates across 119 targets. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or empirical validation was run.

## Current v15 acceptance

- `validateDataset(DATASET)` returns no errors for content version 15 with 516 questions and 172 questions in each layer.
- `npm run research:coverage` reports 37 `dedicated-scored` targets, 65 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` entries, 1,428 candidates, 119 targets, and zero validation errors.
- Conservative Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing parentless canonical meso hybrid, with a source-linked provisional anchor and explicit continuity, bounded-solidarity, sovereignty, stewardship, and ancestry-only false-positive boundaries. National Conservatism remains a distinct micro child.
- National Socialism and Neo-Fascism remain catalog-only high-risk historical holds; the research bank remains effect-free and separate from production scoring.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 37 canonical production anchors. Full-production overlap remains a structural measurement diagnostic only.
- The finite share guard is 36,864 characters after the measured complete v15 answer fragment reached 33,459 characters. The scorer remains policy version 3; academic sources support terminology and item-authoring rationale, not respondent classification or empirical validation. No cognitive review was run.

## Current v14 acceptance

- `validateDataset(DATASET)` returns no errors for content version 14 with 504 questions and 168 questions in each layer.
- `npm run research:coverage` reports 36 `dedicated-scored` targets, 66 `catalog-only` targets, five `contextual-only` targets, 12 `registry-only` targets, 1,428 candidates, 119 targets, and zero validation errors.
- Religious Nationalism exposes four target-tagged descriptive, four normative, and four prescriptive prompts over its existing canonical meso hybrid node, with a source-linked provisional anchor and explicit public religion–nation, accountable self-government, comparative-variation, and private-faith boundary notes. No canonical parent is invented.
- Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only; Christian Nationalism, Hindutva, Buddhist Nationalism, and Religious Zionism remain distinct catalog variants.
- `npm run research:anchor-reachability` verifies four target questions per layer and isolated-anchor routing for all 36 canonical production anchors. Full-production overlap remains a structural measurement diagnostic only.
- The scoring policy remains version 3; no threshold, distance, family-balancing, or combined-layer rule was changed. Academic sources support terminology and item-authoring rationale, not respondent classification or empirical validation. No cognitive review was run.
## Current v21 acceptance

- `validateDataset(DATASET)` returns no errors for content version 21 with 588 questions and 196 questions in each layer.
- Arab Nationalism exposes four target-tagged prompts in each layer over its existing canonical `Nationalism → Arab Nationalism` path, with a source-linked provisional anchor and `dedicated-scored` derived status. Its boundary requires political Arab collective identity, self-government, cross-border solidarity, and accountable institutions, while preserving territorial/Pan-Arab and secular/religious variation.
- The active dataset contains 48 editorial anchors: 43 canonical-placement anchors enter production neighbor scoring and five contextual bridge anchors remain outside it. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60.
- The complete v21 answer fragment measures 38,435 characters under the finite 40,960-character guard; stale, malformed, unknown, duplicate, and oversized payloads remain fail-closed. Answer-only serialization and share semantics remain unchanged.
- The version-3 scoring policy, ontology topology, facets, thresholds, family balancing, and combined-layer calculation remain unchanged. Isolated anchor closure passes; full-production ranks 10/9/13 by layer and 9 combined, aggregate top-three hit rates of 43.4109% by layer and 51.1628% combined, and worst ranks 40/36 are structural diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v22 acceptance — Maoism

- The active contract is content version 22 with 600 original questions, 200 per claim layer, 49 editorial anchors, and 44 canonical scoring anchors. `validateDataset(DATASET)` and the research coverage audit return zero validation errors; the ontology remains 107 nodes plus 12 registry entries with the 9/33/60 canonical inventory and five contextual placements.
- Maoism has a source-linked 4/4/4 target-tagged block and provisional anchor over the existing `Socialism → Communism → Maoism` path. The boundary requires historically situated adaptation of Marxism-Leninism, agrarian/colonial context, practice, contradiction, rectification, mass-line organization, anti-bureaucratic critique, and collective transformation; generic Communism, anti-imperialism, peasant identity, authoritarianism, one regime outcome, or contemporary actor inference is insufficient.
- `npm run research:anchor-reachability` closes all 44 production anchors in isolated fixtures. Maoism ranks 2/14/1 by layer and 1 combined in the deterministic full-production fixture; aggregate top-three rates and worst ranks are structural diagnostics only, not respondent or psychometric evidence.
- The complete share fragment measures 39,059 characters under the finite 40,960-character guard and stale, malformed, unknown, duplicate, and oversized payload handling remains fail-closed. No facet, scorer, threshold, distance, family-balancing, combined-layer, ontology, or share semantic changed. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v23 acceptance — Council Communism

- The active contract is content version 23 with 612 original questions, 204 per claim layer, 50 editorial anchors, and 45 canonical scoring anchors. `validateDataset(DATASET)` and the research coverage audit return zero validation errors; the ontology remains 107 nodes plus 12 registry entries with the 9/33/60 canonical inventory and five contextual placements.
- Council Communism has a source-linked 4/4/4 target-tagged block and provisional anchor over the existing `Socialism → Communism → Council Communism` path. The boundary requires worker-council authority, direct or recallable self-government, common control, and resistance to permanent party-subordinated command; generic Communism, workplace participation, union support, public ownership alone, anarchism, or anti-elite sentiment is insufficient.
- `npm run research:anchor-reachability` closes all 45 production anchors in isolated fixtures. Council Communism ranks 12/3/1 by layer and 1 combined in the deterministic full-production fixture; aggregate top-three rates and worst ranks are structural diagnostics only, not respondent or psychometric evidence.
- The complete share fragment measures 39,859 characters under the finite 40,960-character guard and stale, malformed, unknown, duplicate, and oversized payload handling remains fail-closed. No facet, scorer, threshold, distance, family-balancing, combined-layer, ontology, or share semantic changed. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v24 acceptance — Guild Socialism

- The active contract is content version 24 with 624 original questions, 208 per claim layer, 51 editorial anchors, and 46 canonical scoring anchors. `validateDataset(DATASET)` and the research coverage audit return zero validation errors; the ontology remains 107 nodes plus 12 registry entries with the 9/33/60 canonical inventory and five contextual placements.
- Guild Socialism has a source-linked 4/4/4 target-tagged block and provisional anchor over the existing canonical `Socialism → Guild Socialism` path. The boundary requires worker control, industrial self-government, plural functional institutions, social ownership, and accountable coordination; generic union support, workplace participation, public ownership alone, welfare-state social democracy, Anarcho-Syndicalism, or Council Communism is insufficient.
- `npm run research:anchor-reachability` closes all 46 production anchors in isolated fixtures. Guild Socialism ranks 12/5/5 by layer and 5 combined in the deterministic full-production fixture; aggregate top-three rates and worst ranks are structural diagnostics only, not respondent or psychometric evidence.
- The complete share fragment measures 40,627 characters under the finite 40,960-character guard and stale, malformed, unknown, duplicate, and oversized payload handling remains fail-closed. No facet, scorer, threshold, distance, family-balancing, combined-layer, ontology, or share semantic changed. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.
## Current v25 acceptance

- The dataset validates at content version 25 with 636 prompts, 212 per layer, 52 editorial anchors, and 47 canonical scoring anchors.
- Trotskyism remains an existing canonical micro node under `Socialism → Communism`; it has dedicated-scored status, one provisional anchor, and four target-tagged prompts in each layer. Ontology topology and scoring policy are unchanged.
- All 47 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Trotskyism ranks 9/2/1 by layer and 1 combined in the full-production fixture; these are design diagnostics only.
- Full v1 answer encoding would measure 41,315 characters, so complete v25 encoding uses compact v2 at 6,838 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.

## Current v26 acceptance

- The dataset validates at content version 26 with 648 prompts, 216 per layer, 53 editorial anchors, and 48 canonical scoring anchors.
- Marxism-Leninism remains an existing canonical micro node under `Socialism → Communism`; it has dedicated-scored status, one provisional anchor, and four target-tagged prompts in each layer. Ontology topology and scoring policy are unchanged.
- All 48 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Marxism-Leninism ranks 10/27/1 by layer and 1 combined in the full-production fixture; these are design diagnostics only.
- Full v1 answer encoding remains above the finite 40,960-character guard, so complete v26 encoding uses compact v2 at 6,966 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.
- The Marxism-Leninism addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v27 acceptance

- The dataset validates at content version 27 with 660 prompts, 220 per layer, 54 editorial anchors, and 49 canonical scoring anchors; research-bank validation errors are zero.
- Autonomist Marxism remains an existing canonical micro node under `Socialism → Marxism`; it has dedicated-scored status, one provisional anchor, and exactly four target-tagged prompts in each layer. Ontology topology and scoring policy are unchanged.
- All 49 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Autonomist Marxism ranks 10/8/2 by layer and 1 combined in the full-production fixture; these are design diagnostics only.
- Full v1 answer encoding measures 42,915 characters and exceeds the finite 40,960-character guard, so complete v27 encoding uses compact v2 at 7,094 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.
- TypeScript, 58/58 unit tests, build, audit, coverage, reachability, local browser QA 10/10, Docker rebuild/health, and Docker-backed browser QA 10/10 passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v28 acceptance

- The dataset validates at content version 28 with 672 prompts, 224 per layer, 55 editorial anchors, and 50 canonical scoring anchors; research-bank validation errors are zero.
- Anarcho-Pacifism is an existing canonical micro node under `Anarchism → Social Anarchism`; it has dedicated-scored status, one provisional anchor, and exactly four target-tagged prompts in each layer. Oxford and SAGE provenance is attached for terminology and boundary authoring.
- All 50 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Anarcho-Pacifism ranks 12/5/2 by layer and 1 combined; aggregate top-three rates are 37.3333% by layer and 52.0000% combined, with worst ranks 47 and 44. These are design diagnostics only.
- Full v1 answer encoding measures 43,699 characters and exceeds the finite 40,960-character guard, so complete v28 encoding uses compact v2 at 7,222 characters. v1 remains decodable and fail-closed validation remains intact.
- The addition remains provisional editorial measurement. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v29 acceptance

- The dataset validates at content version 29 with 684 prompts, 228 per layer, 56 editorial anchors, and 51 canonical scoring anchors; research-bank validation errors are zero.
- Social Ecology is an existing canonical micro node on the typed hybrid `Green Anarchism → Social Ecology` path with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. No ontology topology or scoring-policy change was made.
- All 51 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Social Ecology ranks 3/6/4 by layer and 2 combined; aggregate top-three rates are 36.6013% and 52.9412%, with worst ranks 48 and 45. These are design diagnostics only.
- Full v1 answer encoding measures 44,451 characters and exceeds the finite 40,960-character guard, so complete v29 encoding uses compact v2 at 7,350 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.
- TypeScript, 60/60 unit tests, build, audit, coverage, reachability, local browser QA 10/10, Docker rebuild/health, and Docker-backed browser QA 10/10 passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v30 acceptance

- The dataset validates at content version 30 with 696 prompts, 232 per layer, 57 editorial anchors, and 52 canonical scoring anchors; research-bank validation errors are zero.
- Womanism is an existing canonical micro node under `Feminism` with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. No ontology topology or scoring-policy change was made.
- All 52 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Womanism ranks 43/43/43 by layer and 43 combined; aggregate top-three rates are 35.2564% and 51.9231%, with worst ranks 49 and 46. These are design diagnostics only.
- Full v1 answer encoding measures 45,107 characters and exceeds the finite 40,960-character guard, so complete v30 encoding uses compact v2 at 7,478 characters. v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized inputs remain fail-closed.
- TypeScript, 61/61 unit tests, build, audit, coverage, reachability, local browser QA 10/10, Docker rebuild/health, and Docker-backed browser QA 10/10 passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v31 acceptance

- The dataset validates at content version 31 with 708 prompts, 236 per layer, 58 editorial anchors, and 53 canonical scoring anchors; research-bank validation errors are zero.
- Classical-Liberal Feminism is an existing canonical micro node under `Feminism → Liberal Feminism` with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. Its family label remains explicitly contested and branch-sensitive; no ontology topology or scoring-policy change was made.
- All 53 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Classical-Liberal Feminism ranks 45/48/4 by layer and 45 combined; aggregate top-three rates are 36.4780% by layer and 50.9434% combined, with worst ranks 50 and 46. These are design diagnostics only.
- Complete v31 answer encoding uses compact v2 at 7,606 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (62/62), build, high-severity dependency audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v32 acceptance

- The dataset validates at content version 32 with 720 prompts, 240 per layer, 59 editorial anchors, and 54 canonical scoring anchors; research-bank validation errors are zero.
- Anarcho-Communism is an existing canonical micro node under `Anarchism → Social Anarchism` with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. Its family label remains historically varied and branch-sensitive; `Collectivist Anarchism` remains catalog-only and no ontology topology or scoring-policy change was made.
- All 54 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Anarcho-Communism ranks 11/3/1 by layer and 1 combined; aggregate top-three rates are 35.8025% by layer and 51.8519% combined, with worst ranks 51 and 47. These are design diagnostics only; the full-competition descriptive missing-layer field does not negate isolated direct coverage.
- Complete v32 answer encoding uses compact v2 at 7,734 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests, build, high-severity dependency audit, coverage, reachability, local browser QA, Docker rebuild/health, and Docker-backed browser QA must all pass before closure is reported. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v33 acceptance

- The dataset validates at content version 33 with 732 prompts, 244 per layer, 60 editorial anchors, and 55 canonical scoring anchors; research-bank validation errors are zero.
- Collectivist Anarchism is an existing canonical micro node under `Anarchism → Social Anarchism` with `dedicated-scored` status, one provisional anchor, and exactly four target-tagged prompts in each layer. Its historically bounded collective-ownership, anti-capital/anti-state, federated, and labor-linked distribution boundary remains distinct from Anarcho-Communism; no ontology topology or scoring-policy change was made.
- All 55 production anchors have 4/4/4 direct coverage and pass isolated structural routing. Collectivist Anarchism ranks 9/5/1 by layer and 1 combined; aggregate top-three rates are 33.3333% by layer and 49.0909% combined, with worst ranks 52 and 48. These are design diagnostics only.
- Complete v33 answer encoding uses compact v2 at 7,862 characters; v1 remains decodable and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.
- TypeScript, unit tests (64/64), build, high-severity dependency audit, coverage, reachability, local browser QA (10/10), Docker rebuild/health, and Docker-backed browser QA (10/10) passed. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v34 specification delta — Anarchism macro family

- The canonical `Anarchism` macro carries the production anchor `anarchism-family`; the earlier `anarchism` anchor remains contextual-only and is excluded from production neighbor scoring.
- Twelve original source-linked questions target `anarchism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against anti-government, localist, personal-independence, and single-branch inference.
- Content version 34 contains 744 prompts (248 per layer), 61 editorial anchors, and 56 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 56 production anchors pass 4/4/4 isolated routing. Anarchism's full-production rank 45/45/45 and 45 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.

## v35 specification delta — Conservatism macro family

- The canonical `Conservatism` macro carries the production anchor `conservatism-family`; existing Conservative branch and contextual anchors remain distinct and are not merged into the macro.
- Twelve original source-linked questions target `conservatism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic caution, status-quo preference, nationalism, anti-government sentiment, and single-school inference.
- Content version 35 contains 756 prompts (252 per layer), 62 editorial anchors, and 57 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 57 production anchors pass 4/4/4 isolated routing. Conservatism's full-production rank 38/46/4 and 18 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.

## v36 specification delta — Ecologism / Green Ideology macro family

- The canonical `Ecologism` macro carries the production anchor `ecologism-family`; existing ecological descendants, associated traditions, and contextual anchors remain distinct and are not merged into the macro.
- Twelve original source-linked questions target `ecologism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic environmental concern, conservation, Deep Ecology, bioregionalism, Green Politics, Social Ecology, Ecosocialism, single-policy, and single-tradition inference.
- Content version 36 contains 768 prompts (256 per layer), 63 editorial anchors, and 58 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 58 production anchors pass 4/4/4 isolated routing. Ecologism's full-production rank 21/48/3 and 8 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.
## v37 specification delta — Liberalism macro family

- The canonical `Liberalism` macro carries the production anchor `liberalism-family`; existing Liberal branches, hybrids, and contextual anchors remain distinct and are not merged into the macro.
- Twelve original source-linked questions target `liberalism`, with exactly four descriptive, four normative, and four prescriptive items. The shared context preserves plural family variation and guards against generic individual preference, market support, constitutionalism alone, one party, one state size, and single-school inference.
- Content version 37 contains 780 prompts (260 per layer), 64 editorial anchors, and 59 production anchors. Facets, effects, thresholds, combined-layer semantics, share validation, and the effect-free research-candidate quarantine are unchanged.
- All 59 production anchors pass 4/4/4 isolated routing. Liberalism's full-production rank 10/24/11 and 9 combined is retained as an overlap diagnostic rather than a validity claim or reason for coefficient retuning.

## v39 specification — Nationalism macro family

- Existing canonical node: `nationalism`, macro, canonical placement, `anchorId: nationalism-family`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Nationalism context string.
- Manifest: content version 39; 804 questions; 268 per layer; 66 editorial anchors; 61 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, and browser behavior are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.

## v41 specification — Feminism macro family

- Existing canonical node: `feminism`, macro, canonical placement, `anchorId: feminism-family`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Feminism context string.
- Manifest: content version 41; 828 questions; 276 per layer; 68 editorial anchors; 63 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, and browser behavior are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.

## v40 specification — Republicanism macro family

- Existing canonical node: `republicanism`, macro, canonical placement, `anchorId: republicanism-family`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Republicanism context string.
- Manifest: content version 40; 816 questions; 272 per layer; 67 editorial anchors; 62 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, and browser behavior are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.
## v38 specification — Socialism macro family

- Existing canonical node: `socialism`, macro, canonical placement, `anchorId: socialism-family`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Socialism context string.
- Manifest: content version 38; 792 questions; 264 per layer; 65 editorial anchors; 60 production anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, and browser behavior are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.

## v42 precision specification — Anarcho-Syndicalism micro branch

- Existing canonical node: `anarcho-syndicalism`, micro, canonical placement under `social-anarchism`, `anchorId: anarcho-syndicalism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Anarcho-Syndicalism context string.
- Manifest: content version 42; 840 questions; 280 per layer; 69 editorial anchors; 64 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.

## v43 precision specification — Anarcho-Capitalism micro branch

- Existing canonical node: `anarcho-capitalism`, micro, canonical placement under `libertarianism`, `anchorId: anarcho-capitalism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Anarcho-Capitalism analytical context string.
- Boundary: territorial-monopoly rejection, strong private-property and contract claims, voluntary market coordination, exit, and polycentric proprietary/legal/protective institutions; generic libertarianism, small-government preference, anti-state sentiment, Minarchism, non-market anarchism, Mutualism, or private provision alone is insufficient.
- Manifest: content version 43; 852 questions; 284 per layer; 70 editorial anchors; 65 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. The relation between Anarcho-Capitalism and anarchism remains contested and is not adjudicated by the local anchor.

## v44 precision specification — Anarcho-Primitivism micro branch

- Existing canonical node: `anarcho-primitivism`, micro, existing relation under `green-anarchism`, `anchorId: anarcho-primitivism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Anarcho-Primitivism analytical context string.
- Boundary: civilization/industrial-scale/specialization/domestication/technical-dependence critique, ecological priority, and radically decentralized or self-organized lifeways; environmentalism, broad Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, or one theorist's programme alone is insufficient.
- Manifest: content version 44; 864 questions; 288 per layer; 71 editorial anchors; 66 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. The Green Anarchism relation is preserved without inventing a macro breadcrumb.

## v45 precision specification — Austromarxism micro branch

- Existing canonical node: `austromarxism`, micro, canonical placement on `Socialism → Marxism → Austromarxism`, `anchorId: austromarxism`, status `scored`.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Austromarxism analytical context string.
- Boundary: historically situated Austrian Marxist and Social Democratic analysis, class transformation, worker-movement unity, democratic institutional strategy, and personal or non-territorial national autonomy within multinational conditions; generic Marxism, Social Democracy, Austrian identity, nationalism, autonomy alone, one regime, or one theorist is insufficient.
- Manifest: content version 45; 876 questions; 292 per layer; 72 editorial anchors; 67 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, and Docker health are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation.

## v46 precision specification — Egalitarian-Liberal Feminism micro branch

- Existing canonical node: `egalitarian-liberal-feminism`, micro, canonical placement under `liberal-feminism`, `anchorId: egalitarian-liberal-feminism`, status `scored`; the current ontology intentionally exposes the two-node `Liberal Feminism → Egalitarian-Liberal Feminism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Egalitarian-Liberal Feminism analytical context string.
- Boundary: personal and political autonomy, gendered institutional starting conditions, substantive equality and opportunity, democratic inclusion, and accountable public action that enables meaningful choice; generic liberalism, formal rights, equality, public provision, anti-discrimination, feminism, one policy, or one author alone is insufficient.
- Manifest: content version 46; 888 questions; 296 per layer; 73 editorial anchors; 68 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v52 precision specification — Cultural Feminism micro branch

- Existing canonical node: `cultural-feminism`, micro, canonical placement under `radical-feminism`, `anchorId: cultural-feminism`, status `dedicated-scored` through the dedicated production block.
- Source boundary: gendered and cultural norms can organize power; care, relationship, embodiment, and devalued cultural practices can be politically meaningful without requiring one fixed female essence; feminist transformation may change cultural and institutional valuation while remaining contested and plural.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked, target-tagged, and scoped with the Cultural Feminism analytical context string.
- Exclusions: gender identity, care preference or care work, feminist identity, a single anti-essentialist claim, generic feminism, Radical Feminism's constitutive patriarchy mechanism, Materialist Feminism's labor/material-relations mechanism, Lesbian Feminism's compulsory-heterosexuality mechanism, Cultural / Spiritual Ecofeminism's ecological connection, one author, one community, or one policy alone.
- Manifest: content version 52 with 960 total questions and `{ descriptive: 320, normative: 320, prescriptive: 320 }`; 79 editorial anchors and 74 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scorer policy version 3, contextual-only exclusion, combined-layer semantics, compact-share compatibility, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, reachability, build, share, browser behavior, Docker health, and test-harness timing are structural or delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v51 precision specification — Egoist Anarchism micro branch

- Existing canonical node: `egoist-anarchism`, micro, canonical placement under `individualist-anarchism`, `anchorId: egoist-anarchism`, status `scored` through the dedicated production block; the current ontology intentionally exposes the existing `Anarchism → Individualist Anarchism → Egoist Anarchism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Egoist Anarchism analytical context string.
- Boundary: a contested individualist-anarchist current associated with Stirnerian self-rule or ownness, resistance to imposed identity and compulsory authority, and voluntary association without absorption into a fixed collective; nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, and one interpretation of Stirner are insufficient.
- Manifest: content version 51; 948 questions; 316 per layer; 78 editorial anchors; 73 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v50 precision specification — Christian Nationalism micro branch

- Existing canonical node: `christian-nationalism`, micro, canonical placement under `religious-nationalism`, `anchorId: christian-nationalism`, status `scored` through the dedicated production block; the current ontology intentionally exposes the existing `Religious Nationalism → Christian Nationalism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Christian Nationalism analytical context string.
- Boundary: a heterogeneous religious-national political project joining Christian identity, narratives, institutions, or authority claims to national membership and public institutional power or political action, while preserving theological, constitutional, democratic, authoritarian, racialized/non-racialized, and jurisdictional variation; private faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, civic religion, generic Religious Nationalism, one party, one actor, one country, or one policy alone is insufficient.
- Manifest: content version 50; 936 questions; 312 per layer; 77 editorial anchors; 72 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v49 precision specification — Materialist / Socialist Ecofeminism micro branch

- Existing canonical node: `materialist-socialist-ecofeminism`, micro, canonical placement under `ecofeminism`, `anchorId: materialist-socialist-ecofeminism`, status `scored`; the current ontology intentionally exposes the existing `Ecofeminism → Materialist / Socialist Ecofeminism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Materialist / Socialist Ecofeminism analytical context string.
- Boundary: a plural materialist branch connecting capitalist and patriarchal political economy, paid and unpaid labor, social reproduction, resource control, and ecological degradation through collective and democratic transformation routes; green policy, feminism, socialism, welfare, public ownership, social-reproduction language, generic Eco-socialism, Materialist Feminism without ecology, and Cultural / Spiritual Ecofeminism's cultural or spiritual mechanism alone are insufficient.
- Manifest: content version 49; 924 questions; 308 per layer; 76 editorial anchors; 71 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v48 precision specification — Cultural / Spiritual Ecofeminism micro branch

- Existing canonical node: `cultural-spiritual-ecofeminism`, micro, canonical placement under `ecofeminism`, `anchorId: cultural-spiritual-ecofeminism`, status `scored`; the current ontology intentionally exposes the existing `Ecofeminism → Cultural / Spiritual Ecofeminism` path.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Cultural / Spiritual Ecofeminism analytical context string.
- Boundary: a plural ecofeminist strand connecting gendered domination and ecological interdependence through cultural, spiritual, symbolic, or relational critique, with anti-essentialist, cross-context, care, justice, and appropriation safeguards; private spirituality, gender identity, environmental concern, woman–nature essentialism, one religion, cultural nostalgia, generic Ecofeminism, Cultural Feminism, Materialist / Socialist Ecofeminism, Deep Ecology, and anti-technology sentiment alone are insufficient.
- Manifest: content version 48; 912 questions; 304 per layer; 75 editorial anchors; 70 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v47 precision specification — Buddhist Nationalism micro branch

- Existing canonical node: `buddhist-nationalism`, micro, canonical placement under `religious-nationalism`, `anchorId: buddhist-nationalism`, status `scored` through the dedicated production block.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked and scoped with the Buddhist Nationalism analytical context string.
- Boundary: variable public religion–nation translation in which Buddhist histories, institutions, symbols, or moral claims shape national identity, public order, membership, or self-determination; private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, one jurisdiction, one monk, one minority conflict, one constitutional model, or one party alone is insufficient.
- Manifest: content version 47; 900 questions; 300 per layer; 74 editorial anchors; 69 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. No scorer or picker retuning was made from full-production overlap diagnostics.

## v53 data contract — Cultural Nationalism micro branch

- Existing canonical node: `cultural-nationalism`, micro, canonical placement under `nationalism`, `anchorId: cultural-nationalism`, status `scored`; the existing `Nationalism → Cultural Nationalism` path is preserved.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked, target-tagged, and scoped with the Cultural Nationalism analytical context string.
- Boundary: a contested nationalist project of forming, preserving, and renewing a national community through language, memory, arts, education, symbols, heritage, and cultural associations, including projects that precede or exceed direct state control; cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, religious identity, one heritage policy, fixed cultural essence, generic Nationalism, and one historical case are insufficient.
- Manifest: content version 53; 972 questions; 324 per layer; 80 editorial anchors; 75 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. Full-production ranks 16/38/17 and 19 combined are overlap diagnostics only; no scorer or picker retuning was made.

## v54 precision data contract — Ethnocultural Nationalism micro branch

- Existing canonical node: `ethnocultural-nationalism`, micro, canonical placement under `nationalism`, `anchorId: ethnocultural-nationalism`, status `scored`; the existing `Nationalism → Ethnocultural Nationalism` path is preserved.
- Direct target coverage: exactly 4 descriptive, 4 normative, and 4 prescriptive questions, each source-linked, target-tagged, and scoped with the Ethnocultural Nationalism analytical-context string.
- Boundary: a contested nationalist conception that makes shared descent, inherited cultural continuity, language, customs, or ethnocultural membership constitutive of the nation or political community and gives that rule institutional or political consequences. Cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, and generic Nationalism are insufficient.
- Manifest: content version 54; 984 questions; 328 per layer; 81 editorial anchors; 76 production scoring anchors.
- Preservation: 9/33/60 canonical inventory, 107 ontology nodes, 12 registry entries, 20 facets, scoring policy version 3, contextual-only exclusion, combined-layer semantics, and effect-free research candidates.
- Validation boundary: isolated routing, coverage, build, share, browser behavior, Docker health, and test-harness timing are structural/delivery checks, not cognitive, psychometric, respondent, or empirical validation. Full-production ranks 15/28/1 and 3 combined are overlap diagnostics only; no scorer or picker retuning was made.

## v55 precision data contract — Lesbian Feminism micro branch

- The existing canonical `lesbian-feminism` node remains a micro under `feminism`, now carries `anchorId: lesbian-feminism`, status `scored`, and source references for compulsory heterosexuality, lesbian separatism/community formation, collective defense, and adjacent feminist self-definition scholarship.
- Exactly twelve new production questions are target-tagged to `lesbian-feminism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and carries the Lesbian Feminism analytical-scope context string.
- The manifest is content version 55 with 996 total questions and `{ descriptive: 332, normative: 332, prescriptive: 332 }`.
- The dataset contains 82 editorial anchors, 77 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Lesbian Feminism routes in all three isolated layers; ranks 3/16/10 and 4 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v56 precision data contract — One-Nation Conservatism micro branch

- The existing canonical `one-nation-conservatism` node remains a micro under `moderate-conservatism`, now carries `anchorId: one-nation-conservatism`, status `scored`, and source references for Disraeli/conservative variation, the One Nation Group, welfare-state variation, and contemporary One-Nation disputes.
- Exactly twelve production questions are target-tagged to `one-nation-conservatism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and carries the One-Nation analytical-scope context string.
- The manifest is content version 56 with 1,008 total questions and `{ descriptive: 336, normative: 336, prescriptive: 336 }`.
- The dataset contains 83 editorial anchors, 78 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics.
- Isolated anchor reachability and full-production rank fields are structural fixtures. One-Nation Conservatism routes in all three isolated layers; ranks 15/30/1 and 5 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v57 precision data contract — Zionism micro branch

- The existing `zionism` node remains a canonical micro node under `nationalism`, now carrying `anchorId: zionism`, status `scored`, and source references for Jewish national self-determination, historical institutional variation, cultural revival, plural constitutional routes, diaspora relations, and equal-citizenship boundaries.
- Exactly twelve new production questions are target-tagged to `zionism`: four descriptive, four normative, and four prescriptive. Each uses existing facets and includes academic source references plus the Zionism analytical-scope context string.
- The manifest is content version 57 with 1,020 total questions and `{ descriptive: 340, normative: 340, prescriptive: 340 }`.
- The dataset contains 84 editorial anchors, 79 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics. No node was added or reparented.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Zionism routes in all three isolated layers; ranks 27/25/19 and 19 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v58 precision data contract — Khomeinism micro branch

- The existing canonical `khomeinism` node remains a micro under `islamism`, now carrying `anchorId: khomeinism`, status `scored`, and source references for Iranian Shi'i political authority, modern sovereignty/state formation, anti-imperial independence, oppressed-centered mobilization, constitutional ambiguity, and governmental Shiism.
- Exactly twelve new production questions are target-tagged to `khomeinism`: four descriptive, four normative, and four prescriptive. Each uses existing facets, includes academic source references, and carries the Khomeinism analytical-scope context string.
- The manifest is content version 58 with 1,032 total questions and `{ descriptive: 344, normative: 344, prescriptive: 344 }`.
- The dataset contains 85 editorial anchors, 80 production scoring anchors, 107 ontology nodes, 12 registry entries, and unchanged 9/33/60 canonical macro/meso/micro counts; 22 canonical ontology targets remain catalog-only and five contextual placements remain contextual-only.
- Research candidates remain effect-free and quarantined; activating this block does not change candidate records, registry-only targets, ontology topology, scorer policy, thresholds, or combined-layer semantics. No node was added or reparented.
- Isolated anchor reachability and full-production rank fields are structural fixtures. Khomeinism routes in all three isolated layers; ranks 4/31/1 and 1 combined are overlap diagnostics only and must not be described as cognitive, psychometric, respondent, or empirical validation.

## v59 specification — Qutbism micro branch

V59 adds provisional direct measurement to the existing canonical `Islamism → Qutbism` micro node. The block contains four descriptive, four normative, and four prescriptive prompts and one editorial anchor. Its source-bounded construct covers divine sovereignty and `jahiliyya`, comprehensive moral order, disciplined transformative community, and varied revolutionary or reformist reception; identity, private faith, generic Islamism, religious conservatism, anti-Western sentiment, organizational alignment, current policy, operational militancy, or one reading of Qutb is insufficient.

The versioned dataset contract is 1,044 prompts (348 per layer), 86 editorial anchors, 81 canonical scoring anchors, 107 ontology nodes, 12 registry entries, 81 dedicated-scored targets, 21 canonical catalog-only targets, and 1,428 effect-free candidates across 119 research targets. The canonical inventory and scorer policy remain unchanged.

Taxonomy governance continues to report Qutbism as promote-to-canonical with `resultingScoringStatus: catalog-only`; this value is not the live measurement state. The live target is `dedicated-scored`, and both states are tested separately. Delivery verification is complete; respondent comprehension and empirical measurement evidence remain open.


## v59 specification — Qutbism micro branch

V59 adds provisional direct measurement to the existing canonical `Islamism → Qutbism` micro node: four descriptive, four normative, and four prescriptive prompts plus one provisional anchor. The construct covers divine sovereignty/`jahiliyya`, comprehensive moral order, disciplined transformation, and varied reception; identity, private faith, generic Islamism, current policy, militancy, or one reading is insufficient.

The contract is 1,044 prompts (348 per layer), 86 editorial anchors, 81 scoring anchors, 21 canonical catalog-only targets, 12 registry targets, and 1,428 effect-free candidates across 119 targets. Governance catalog-only remains separate from live dedicated-scored measurement. Delivery checks pass; respondent and empirical evidence remain open.

## v60 specification — Radical Republicanism micro branch

V60 adds provisional direct measurement to the existing canonical `Republicanism → Historical Republicanism → Radical Republicanism` micro node: four descriptive, four normative, and four prescriptive prompts plus one provisional anchor. The construct covers popular sovereignty, freedom as non-domination, equal civic standing, anti-corruption, continuous contestation, and transformative public institutions; patriotism, generic anti-corruption, majoritarianism, civic participation alone, Marxism alone, or one institutional route is insufficient.

The contract is 1,056 prompts (352 per layer), 87 editorial anchors, 82 scoring anchors, 20 canonical catalog-only targets, 12 registry targets, and 1,428 effect-free candidates across 119 targets. Governance retains the node as canonical with `retain-canonical` and `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Delivery checks pass; respondent and empirical evidence remain open.
