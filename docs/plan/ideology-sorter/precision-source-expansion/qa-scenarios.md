# QA Scenarios — Precision and Academic Source Expansion

| ID | Scenario | Expected result |
|---|---|---|
| PSE-01 | Validate the dataset manifest and source registry. | 204 questions, 68 per layer, no duplicate IDs, and every source has citation/support metadata. |
| PSE-02 | Complete all 204 prompts with a fixed directional response. | Results render three layer sections with 68/68 coverage in each. |
| PSE-03 | Complete exactly 34 prompts in one layer and mark the rest `No view yet`. | The layer is covered at the inclusive 50% threshold. |
| PSE-04 | Complete 33 prompts in one layer and mark the rest `No view yet`. | The layer remains insufficient and produces no neighbors. |
| PSE-05 | Use two identical anchor profiles in a fixture dataset. | The neighbors carry low separation, tie metadata, and no percentage-only certainty language. |
| PSE-06 | Open methodology. | Academic construct sources, survey-method sources, comparative-data boundaries, formula, and the editorial/provisional review posture are visible. |
| PSE-07 | Create and restore a share link. | The link contains the versioned 204-item answer map and restores the results. |
| PSE-08 | Open a share link with an old content or policy version. | The app fails closed with a recoverable stale-version notice. |
| PSE-09 | Cross the 68-item and 136-item boundaries. | Diagnosis-to-values and values-to-practice notices appear at manifest-derived boundaries. |
| PSE-11 | Answer the dedicated Right-Libertarianism branch block in a synthetic fixture. | The provisional branch anchor is eligible as a neighbor while remaining marked provisional in the methodology posture. |
| PSE-10 | Run the browser flow at mobile width. | Prompt text, source links, low-separation notes, controls, and coverage remain readable without horizontal overflow. |
| PSE-12 | Inspect a saved research candidate's promotion record. | Neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation are visibly pending; the record remains outside the production bank. |
| PSE-13 | Complete all three layers. | The result includes a combined pattern with descriptive, normative, and prescriptive contributions while retaining the separate layer results. |
| PSE-14 | Leave one layer below the coverage threshold. | The combined pattern is withheld with explicit missing-layer copy; covered layer results still render. |
| PSE-15 | Compare combined and layer-specific calculation fixtures. | The combined fit is the equal mean of the three full-precision layer fits; no rounded display value participates in calculation. |
| PSE-16 | Inspect the ten new direct branch blocks. | Each target has four target-tagged questions in every layer, a dedicated-scored derived status, source-linked wording, and a remaining provisional-validation note. |
| PSE-17 | Complete all 252 prompts with a fixed directional response. | Results render 84/84/84 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-18 | Inspect the four v6 canonical meso blocks. | Libertarianism, Marxism, Social Anarchism, and Liberal Feminism each expose four target-tagged prompts in every layer and a dedicated-scored status. |
| PSE-19 | Inspect the five broad contextual anchor targets. | Each remains labeled `contextual-only`, retains provenance and research metadata, and is excluded from production neighbor selection. |
| PSE-20 | Run the coverage audit after v6 activation. | The report shows 252 production questions, 20 editorial anchors, 15 scoring anchors, 1,428 quarantined candidates, and zero validation errors. |

## Content review boundary

Automated tests and source citations support engineering and provenance checks; they do not establish scientific validity or population evidence. Before the expanded bank is described as canonical, complete the substantive neighbor-distinctness review, the applicable cross-cultural/jurisdictional review, and later empirical validation, while preserving the item version, target rationale, source rationale, editorial decision, and unresolved risks in the review record.

## Current v7 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| PSE-21 | Validate the v7 manifest and source registry. | 348 questions, 116 per layer, 28 editorial anchors, 23 canonical scoring anchors, and zero validation errors. |
| PSE-22 | Complete all 348 prompts with a fixed directional response. | Results render 116/116/116 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-23 | Complete exactly 58 prompts in one layer and mark the remaining 58 `No view yet`. | The layer is covered at the inclusive 50% threshold; no-view remains separately visible. |
| PSE-24 | Complete 57 prompts in one layer and mark the remaining 59 `No view yet`. | The layer remains insufficient and produces no neighbors or dependent pulls. |
| PSE-25 | Inspect the eight v7 canonical meso blocks. | Each target exposes four target-tagged prompts in every layer, a dedicated-scored derived status, source-linked wording, and a provisional-validation note. |
| PSE-26 | Run the coverage audit after v7 activation. | The report shows 23 dedicated-scored targets, 79 catalog-only targets, five contextual-only anchors, 12 registry-only entries, 1,428 quarantined candidates, 119 targets, and zero validation errors. |
| PSE-27 | Measure a complete v7 share payload. | The measured payload remains below the finite 32,768-character bound; oversize input is rejected without truncation. |

## Current v8 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| PSE-28 | Validate the v8 manifest and source registry. | 408 questions, 136 per layer, 33 editorial anchors, 28 canonical scoring anchors, and zero validation errors. |
| PSE-29 | Inspect the five v8 canonical meso blocks. | Communism, Historical Republicanism, Individualist Anarchism, Neoliberalism, and Socialist / Marxist Feminism each expose four target-tagged prompts in every layer, a dedicated-scored derived status, source-linked wording, and a provisional-validation note. |
| PSE-30 | Inspect the nine held canonical meso branches. | Conservative Nationalism, Islamism, Mutualism, National Socialism, Neo-Fascism, Populism, Radical Conservatism, Reactionary Conservatism, and Religious Nationalism remain catalog-only with research candidates and explicit boundary audits. |
| PSE-31 | Complete all 408 prompts with a fixed directional response. | Results render 136/136/136 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-32 | Complete exactly 68 prompts in one layer and mark the remaining 68 `No view yet`. | The layer is covered at the inclusive 50% threshold; no-view remains separately visible. |
| PSE-33 | Complete 67 prompts in one layer and mark the remaining 69 `No view yet`. | The layer remains insufficient and produces no neighbors or dependent pulls. |
| PSE-34 | Measure a complete v8 share payload. | The payload round-trips below the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v9 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| PSE-35 | Validate the v9 manifest and source registry. | 432 questions, 144 per layer, 35 editorial anchors, 30 canonical scoring anchors, and zero validation errors. |
| PSE-36 | Inspect the Populism and Mutualism direct blocks. | Each target exposes four target-tagged prompts in every layer, a source-linked provisional anchor, and a derived `dedicated-scored` status. |
| PSE-37 | Inspect the seven remaining canonical meso holds. | Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, Radical Conservatism, Reactionary Conservatism, and Religious Nationalism remain catalog-only. |
| PSE-38 | Run the structural anchor reachability audit. | All 30 production anchors have four target questions per layer and route in isolated-anchor fixtures; full-production top-three overlap is reported as a diagnostic only. |
| PSE-39 | Complete all 432 prompts with a fixed directional response. | Results render 144/144/144 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-40 | Measure a complete v9 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v10 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| PSE-41 | Validate the v10 manifest and source registry. | 456 questions, 152 per layer, 37 editorial anchors, 32 canonical scoring anchors, and zero validation errors. |
| PSE-42 | Inspect the Radical Conservatism and Reactionary Conservatism direct blocks. | Each target exposes four target-tagged prompts in every layer, a source-linked provisional anchor, and a derived `dedicated-scored` status; restoration versus decisive renewal remains visible as a documented boundary. |
| PSE-43 | Inspect the five remaining canonical meso holds. | Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only. |
| PSE-44 | Run the structural anchor reachability audit. | All 32 production anchors have four target questions per layer and route in isolated-anchor fixtures; full-production top-three overlap is reported as a diagnostic only. |
| PSE-45 | Complete all 456 prompts with a fixed directional response. | Results render 152/152/152 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-46 | Measure a complete v10 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v11 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-47 | Validate the v11 manifest and source registry. | 468 questions, 156 per layer, 38 editorial anchors, 33 canonical scoring anchors, and zero validation errors. |
| PSE-48 | Inspect the Islamism direct block. | Islamism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and an explicit public-project/private-faith boundary. |
| PSE-49 | Inspect the four remaining canonical meso holds. | Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only with effect-free research candidates and explicit boundary audits. |
| PSE-50 | Run the structural anchor reachability audit. | All 33 production anchors have four target questions per layer and route in isolated-anchor fixtures; full-production top-three overlap is diagnostic only. |
| PSE-51 | Complete all 468 prompts with a fixed directional response. | Results render 156/156/156 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-52 | Measure a complete v11 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v12 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-53 | Validate the v12 manifest and source registry. | 480 questions, 160 per layer, 39 editorial anchors, 34 canonical scoring anchors, and zero validation errors. |
| PSE-54 | Inspect the Ordoliberalism direct block. | Ordoliberalism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and explicit competition/order, anti-concentration, and social-market boundary notes. |
| PSE-55 | Inspect the remaining holds and alternatives. | Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; Pan-Africanism and Black Nationalism remain research-only alternatives; the 1,428 candidates remain effect-free. |
| PSE-56 | Run the structural anchor reachability audit. | All 34 production anchors have four target questions per layer and route in isolated-anchor fixtures; full-production top-three overlap is reported as a diagnostic only. |
| PSE-57 | Complete all 480 prompts with a fixed directional response. | Results render 160/160/160 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-58 | Measure a complete v12 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v13 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-59 | Validate the v13 manifest and source registry. | 492 questions, 164 per layer, 40 editorial anchors, 35 canonical scoring anchors, and zero validation errors. |
| PSE-60 | Inspect the Pan-Africanism direct block. | Pan-Africanism exposes four target-tagged prompts in every layer over its existing canonical micro node under Nationalism, a source-linked provisional anchor, a `dedicated-scored` derived status, and explicit African/diasporic, anti-colonial, self-determination, and cross-border boundaries. |
| PSE-61 | Inspect the remaining holds and alternatives. | Black Nationalism and Anti-Colonial Nationalism remain research-only alternatives; Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the 1,428 candidates remain effect-free. |
| PSE-62 | Run the structural anchor reachability audit. | All 35 production anchors have four target questions per layer and route in isolated-anchor fixtures; Pan-Africanism closes in isolation; full-production ranks are reported as a diagnostic only. |
| PSE-63 | Complete all 492 prompts with a fixed directional response. | Results render 164/164/164 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-64 | Measure a complete v13 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v14 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-65 | Validate the v14 manifest and source registry. | 504 questions, 168 per layer, 41 editorial anchors, 36 canonical scoring anchors, and zero validation errors. |
| PSE-66 | Inspect the Religious Nationalism direct block. | Religious Nationalism exposes four target-tagged prompts in every layer over its existing parentless canonical meso hybrid, a source-linked provisional anchor, a `dedicated-scored` derived status, and explicit public religion–nation and private-faith boundary notes. |
| PSE-67 | Inspect the remaining holds and variants. | Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only; Christian Nationalism, Hindutva, Buddhist Nationalism, and Religious Zionism remain distinct catalog variants; the 1,428 candidates remain effect-free. |
| PSE-68 | Run the structural anchor reachability audit. | All 36 production anchors have four target questions per layer and route in isolated-anchor fixtures; Religious Nationalism closes in isolation; full-production ranks are reported as a diagnostic only. |
| PSE-69 | Complete all 504 prompts with a fixed directional response. | Results render 168/168/168 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-70 | Measure a complete v14 share payload. | The payload round-trips under the finite 32,768-character bound; oversize input remains rejected without truncation. |

## Current v15 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-71 | Validate the v15 manifest and source registry. | 516 questions, 172 per layer, 42 editorial anchors, 37 canonical scoring anchors, and zero validation errors. |
| PSE-72 | Inspect the Conservative Nationalism direct block. | Conservative Nationalism exposes four target-tagged prompts in every layer over its existing parentless canonical meso hybrid, a source-linked provisional anchor, a `dedicated-scored` status, and explicit continuity, bounded-solidarity, sovereignty, stewardship, and ancestry-only false-positive boundaries. |
| PSE-73 | Inspect the remaining holds and child node. | National Socialism and Neo-Fascism remain catalog-only high-risk holds; National Conservatism remains a distinct micro child; the 1,428 candidates remain effect-free. |
| PSE-74 | Run the structural anchor reachability audit. | All 37 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a structural diagnostic. |
| PSE-75 | Complete all 516 prompts with a fixed directional response. | Results render 172/172/172 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |
| PSE-76 | Measure a complete v15 share payload. | The payload round-trips at the measured 33,459 characters under the finite 36,864-character bound; oversized input remains rejected without truncation. |

## Current v16 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-77 | Validate the v16 manifest and source registry. | 528 questions, 176 per layer, 43 editorial anchors, 38 canonical scoring anchors, and zero validation errors. |
| PSE-78 | Inspect the National Socialism direct block. | National Socialism exposes four target-tagged prompts in every layer over its existing canonical meso node, a source-linked provisional anchor, `dedicated-scored` status, and historical-scope context on every new prompt. |
| PSE-79 | Inspect the remaining hold and boundary. | Neo-Fascism remains catalog-only; the National Socialism block requires a convergent völkisch/racialized, anti-pluralist, leader-centered, institutional, exclusionary, and national-renewal bundle; generic nationalism or authoritarianism is insufficient. |
| PSE-80 | Run the structural reachability audit. | All 38 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is 46.4912% by layer and 63.1579% combined, with worst ranks 35 and 31; these values are reported only as diagnostics. |
| PSE-81 | Complete all 528 prompts with a fixed directional response. | Results render 176/176/176 layer coverage without admitting contextual-only anchors as production neighbors. |
| PSE-82 | Measure a complete v16 share payload. | The payload round-trips at the measured 34,275 characters under the finite 36,864-character bound; oversized input remains rejected without truncation. |

## Current v17 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-83 | Validate the v17 manifest and source registry. | 540 questions, 180 per layer, 44 editorial anchors, 39 canonical scoring anchors, the three Civic Nationalism source records, and zero validation errors. |
| PSE-84 | Inspect the Civic Nationalism direct block. | Civic Nationalism exposes four target-tagged prompts in every layer over its existing canonical micro node under Nationalism, a source-linked provisional anchor, `dedicated-scored` status, and context-sensitive civic-membership/self-government wording. |
| PSE-85 | Inspect the civic–ethnic boundary and remaining holds. | Civic and ethnic nationalism are not treated as universal ideal types; generic patriotism, private constitutional preference, and isolated democratic support are insufficient; Neo-Fascism remains catalog-only and the 1,428 candidates remain effect-free. |
| PSE-86 | Run the structural anchor reachability audit. | All 39 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap and ranks are reported only as structural diagnostics, with Civic Nationalism at 10/6/7 by layer and 6 combined. |
| PSE-87 | Complete all 540 prompts with a fixed directional response. | Results render 180/180/180 layer coverage without admitting contextual-only anchors as production neighbors. |
| PSE-88 | Measure a complete v17 share payload. | The payload round-trips at the measured 35,075 characters under the finite 36,864-character bound; oversized input remains rejected without truncation. |

## Current v18 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-89 | Validate the v18 manifest and source registry. | 552 questions, 184 per layer, 45 editorial anchors, 40 canonical scoring anchors, the Black Nationalism source records, and zero validation errors. |
| PSE-90 | Inspect the Black Nationalism direct block. | Black Nationalism exposes four target-tagged prompts in every layer over its existing canonical micro node under Nationalism, a source-linked provisional anchor, `dedicated-scored` status, and explicit dignity/linked-fate, anti-Black power, autonomy, self-determination, institution, variation, and Pan-Africanism/separatism boundary notes. |
| PSE-91 | Inspect remaining alternatives and the ontology boundary. | Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives; Neo-Fascism remains a high-risk catalog-only hold; no ontology node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| PSE-92 | Run the structural anchor reachability audit. | All 40 production anchors have four target questions per layer and pass isolated-anchor routing; Black Nationalism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Black Nationalism at 3/15/7 by layer and 4 combined. |
| PSE-93 | Complete all 552 prompts with a fixed directional response. | Results render 184/184/184 layer coverage without admitting contextual-only anchors as production neighbors. |
| PSE-94 | Measure a complete v18 share payload. | The payload round-trips at the measured 35,875 characters under the finite 36,864-character guard; oversized input remains rejected without truncation. |

## Current v19 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-95 | Validate the v19 manifest and source registry. | 564 questions, 188 per layer, 46 editorial anchors, 41 canonical scoring anchors, the Materialist Feminism source records, and zero validation errors. |
| PSE-96 | Inspect the Materialist Feminism direct block. | Materialist Feminism exposes four target-tagged prompts in every layer over `Socialist / Marxist Feminism → Materialist Feminism`, a source-linked provisional anchor, `dedicated-scored` status, and plural materialist-feminist labor, care/social-reproduction, embodiment, institutional-power, resource, historical-specificity, and emancipatory-change boundaries. |
| PSE-97 | Inspect remaining alternatives and the ontology boundary. | Marxist Feminism and Socialist Feminism remain distinct catalog branches; Anti-Colonial Nationalism remains unactivated; Neo-Fascism remains a high-risk catalog-only hold; no ontology node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| PSE-98 | Run the structural anchor reachability audit. | All 41 production anchors have four target questions per layer and pass isolated-anchor routing; Materialist Feminism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Materialist Feminism at 2/7/5 by layer and 4 combined. |
| PSE-99 | Complete all 564 prompts with a fixed directional response. | Results render 188/188/188 layer coverage without admitting contextual-only anchors as production neighbors. |
| PSE-100 | Measure a complete v19 share payload. | The payload round-trips at the measured 36,723 characters under the finite 36,864-character guard; oversized input remains rejected without truncation. |

## Current v20 scenarios

| ID | Area | Expected result |
|---|---|---|
| PSE-101 | Validate the v20 manifest and source registry. | 576 questions, 192 per layer, 47 editorial anchors, 42 canonical scoring anchors, the Anti-Colonial Nationalism source records, and zero validation errors. |
| PSE-102 | Inspect the Anti-Colonial Nationalism direct block. | Anti-Colonial Nationalism exposes four target-tagged prompts in every layer over `Nationalism → Anti-Colonial Nationalism`, a source-linked provisional anchor, `dedicated-scored` status, and explicit domination, self-rule, self-determination, solidarity, institution-building, anti-imperial, and historical-variation boundary notes. |
| PSE-103 | Inspect remaining alternatives and the ontology boundary. | Arab Nationalism and Maoism remain catalog-only alternatives; Neo-Fascism remains a high-risk catalog-only hold; no ontology node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| PSE-104 | Run the structural anchor reachability audit. | All 42 production anchors have four target questions per layer and pass isolated-anchor routing; Anti-Colonial Nationalism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Anti-Colonial Nationalism at 6/9/7 by layer and 5 combined. |
| PSE-105 | Complete all 576 prompts with a fixed directional response. | Results render 192/192/192 layer coverage without admitting contextual-only anchors as production neighbors. |
| PSE-106 | Measure a complete v20 share payload. | The payload round-trips at the measured 37,651 characters under the finite 40,960-character guard; oversized input remains rejected without truncation. |
## Current v21 scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| PSE-107 | Manifest and source closure | Run `npm run research:coverage` and inspect the Arab Nationalism source IDs. | Content version 21 has 588 prompts, 196 per layer, 48 editorial anchors, 43 canonical scoring anchors, the four Arab Nationalism research records plus Dawn/SEP records, and zero validation errors. |
| PSE-108 | Direct branch contract | Inspect Arab Nationalism's ontology node, 12 production prompts, profile, and coverage summary. | The existing canonical `Nationalism → Arab Nationalism` micro node has a source-linked 4/4/4 block, anchor ID, dedicated-scored status, political-versus-cultural boundary, and no change to ontology topology or scorer policy. |
| PSE-109 | Isolated anchor closure | Run `npm run research:anchor-reachability`. | All 43 production anchors, including Arab Nationalism, have four target questions in each layer and pass isolated routing; full-production overlap remains diagnostic only. |
| PSE-110 | Complete share capacity | Complete all 588 prompts with one fixed directional response and decode the fragment. | The fragment round-trips at 38,435 characters under the finite 40,960-character guard; oversized input remains rejected without truncation. |

## Current v22 scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| PSE-111 | Manifest and source closure | Run `npm run research:coverage` and inspect the Maoism source IDs. | Content version 22 has 600 prompts, 200 per layer, 49 editorial anchors, 44 canonical scoring anchors, the four new Maoism source records plus existing Communism/Sen context, and zero validation errors. |
| PSE-112 | Direct branch contract | Inspect Maoism's ontology node, 12 production prompts, profile, and coverage summary. | The existing canonical `Socialism → Communism → Maoism` micro node has a source-linked 4/4/4 block, anchor ID, `dedicated-scored` status, and explicit doctrine/regime, agrarian/colonial, mass-line, rectification, anti-bureaucratic, social-hierarchy, and collective-transformation boundaries. |
| PSE-113 | Isolated anchor closure | Run `npm run research:anchor-reachability`. | All 44 production anchors, including Maoism, have four target questions in each layer and pass isolated routing; full-production overlap remains diagnostic only, with Maoism at 2/14/1 by layer and 1 combined. |
| PSE-114 | Complete share capacity | Complete all 600 prompts with one fixed directional response and decode the fragment. | The fragment round-trips at 39,059 characters under the finite 40,960-character guard; oversized input remains rejected without truncation. |

## Current v23 scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| PSE-115 | Manifest and source closure | Run `npm run research:coverage` and inspect the Council Communism source IDs. | Content version 23 has 612 prompts, 204 per layer, 50 editorial anchors, 45 canonical scoring anchors, the Council Communism source records plus existing Communism context, and zero validation errors. |
| PSE-116 | Direct branch contract | Inspect Council Communism's ontology node, 12 production prompts, profile, and coverage summary. | The existing canonical `Socialism → Communism → Council Communism` micro node has a source-linked 4/4/4 block, anchor ID, `dedicated-scored` status, and explicit worker-council, direct-self-government, common-control, anti-vanguard, representation/scale, and false-positive boundaries. |
| PSE-117 | Isolated anchor closure | Run `npm run research:anchor-reachability`. | All 45 production anchors, including Council Communism, have four target questions in each layer and pass isolated routing; full-production overlap remains diagnostic only, with Council Communism at 12/3/1 by layer and 1 combined. |
| PSE-118 | Complete share capacity | Complete all 612 prompts with one fixed directional response and decode the fragment. | The fragment round-trips at 39,859 characters under the finite 40,960-character guard; oversized input remains rejected without truncation. |

## Current v24 scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| PSE-119 | Manifest and source closure | Run `npm run research:coverage` and inspect the Guild Socialism source IDs. | Content version 24 has 624 prompts, 208 per layer, 51 editorial anchors, 46 canonical scoring anchors, the Guild Socialism source records plus existing Socialist context, and zero validation errors. |
| PSE-120 | Direct branch contract | Inspect Guild Socialism's ontology node, 12 production prompts, profile, and coverage summary. | The existing canonical `Socialism → Guild Socialism` micro node has a source-linked 4/4/4 block, anchor ID, `dedicated-scored` status, and explicit industrial self-government, plural-association, social-ownership, coordination, and false-positive boundaries. |
| PSE-121 | Isolated anchor closure | Run `npm run research:anchor-reachability`. | All 46 production anchors, including Guild Socialism, have four target questions in each layer and pass isolated routing; full-production overlap remains diagnostic only, with Guild Socialism at 12/5/5 by layer and 5 combined. |
| PSE-122 | Complete share capacity | Complete all 624 prompts with one fixed directional response and decode the fragment. | The fragment round-trips at 40,627 characters under the finite 40,960-character guard; oversized input remains rejected without truncation. |
## Current v25 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-25-01 | Validate v25 manifest and source provenance. | 636 prompts; 212 per layer; 52 editorial and 47 production anchors; no validation errors; Cambridge Trotskyism sources present. |
| P-25-02 | Inspect Trotskyism direct coverage and isolated routing. | Existing canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers. |
| P-25-03 | Run full-production reachability diagnostics. | Trotskyism ranks 9/2/1 by layer and 1 combined; rates 38.2979% by layer and 48.9362% combined; diagnostics are not respondent evidence. |
| P-25-04 | Round-trip complete v25 share state and readable v1 partial state. | Complete state uses v2 at 6,838 characters; v1 decodes; validation remains fail-closed. |

## Current v26 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-26-01 | Validate v26 manifest and source provenance. | 648 prompts; 216 per layer; 53 editorial and 48 production anchors; no validation errors; Cambridge/Oxford Marxism-Leninism sources present. |
| P-26-02 | Inspect Marxism-Leninism direct coverage and isolated routing. | Existing canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers. |
| P-26-03 | Run full-production reachability diagnostics. | Marxism-Leninism ranks 10/27/1 by layer and 1 combined; aggregate rates are 39.5833% by layer and 50.0000% combined; diagnostics are not respondent evidence. |
| P-26-04 | Round-trip complete v26 share state and readable v1 partial state. | Complete state uses v2 at 6,966 characters; v1 decodes; validation remains fail-closed. |

## Current v27 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-27-01 | Validate the v27 manifest, source provenance, and research-bank closure. | 660 prompts; 220 per layer; 54 editorial and 49 production anchors; SAGE/Antipode provenance present; no validation errors. |
| P-27-02 | Inspect Autonomist Marxism direct coverage and isolated routing. | Existing `Socialism → Marxism → Autonomist Marxism` path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers. |
| P-27-03 | Run full-production reachability diagnostics. | Autonomist Marxism ranks 10/8/2 by layer and 1 combined; aggregate top-three rates are 37.4140% and 51.0204%, with worst ranks 46 and 43; diagnostics are not respondent evidence. |
| P-27-04 | Round-trip complete v27 share state and readable v1 partial state. | Complete state uses v2 at 7,094 characters because v1 measures 42,915; v1 decodes; validation remains fail-closed. |

## Current v28 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-28-01 | Validate the v28 manifest, source provenance, and research-bank closure. | 672 prompts; 224 per layer; 55 editorial and 50 production anchors; Oxford/SAGE provenance present; no validation errors. |
| P-28-02 | Inspect Anarcho-Pacifism direct coverage and isolated routing. | Existing `Anarchism → Social Anarchism → Anarcho-Pacifism` path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers. |
| P-28-03 | Run full-production reachability diagnostics. | Anarcho-Pacifism ranks 12/5/2 by layer and 1 combined; aggregate top-three rates are 37.3333% and 52.0000%, with worst ranks 47 and 44; diagnostics are not respondent evidence. |
| P-28-04 | Round-trip complete v28 share state and readable v1 partial state. | Complete state uses v2 at 7,222 characters because v1 measures 43,699; v1 decodes; validation remains fail-closed. |

## Current v29 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-29-01 | Validate the v29 manifest, source provenance, and research-bank closure. | 684 prompts; 228 per layer; 56 editorial and 51 production anchors; Best/Shelley/Roth/Hammy-Miley/Oxford/SEP provenance present; no validation errors. |
| P-29-02 | Inspect Social Ecology direct coverage and isolated routing. | Existing `Green Anarchism → Social Ecology` hybrid path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers; no macro ancestry invented. |
| P-29-03 | Run full-production reachability diagnostics. | Social Ecology ranks 3/6/4 by layer and 2 combined; aggregate rates are 36.6013% and 52.9412%, with worst ranks 48 and 45; diagnostics are not respondent evidence. |
| P-29-04 | Round-trip complete v29 share state and readable v1 partial state. | Complete state uses v2 at 7,350 characters because v1 measures 44,451; v1 decodes; validation remains fail-closed. |

## Current v30 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-30-01 | Validate the v30 manifest, source provenance, and research-bank closure. | 696 prompts; 232 per layer; 57 editorial and 52 production anchors; Oxford/Cambridge/Frontiers/Journal of Black Studies/SEP/OUP provenance present; no validation errors. |
| P-30-02 | Inspect Womanism direct coverage and isolated routing. | Existing `Feminism → Womanism` canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers; Black Feminism/Africana Womanism/womanist-theology variation and false-positive controls are recorded. |
| P-30-03 | Run full-production reachability diagnostics. | Womanism ranks 43/43/43 by layer and 43 combined; aggregate top-three rates are 35.2564% and 51.9231%, with worst ranks 49 and 46; diagnostics are not respondent evidence. |
| P-30-04 | Round-trip complete v30 share state and readable v1 partial state. | Readable v1 measures 45,107 characters and exceeds the finite 40,960-character guard; complete state uses v2 at 7,478 characters; v1 decodes; validation remains fail-closed. |

## Current v31 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-31-01 | Validate the v31 manifest, source provenance, and research-bank closure. | 708 prompts; 236 per layer; 58 editorial and 53 production anchors; SEP Liberal Feminism, Baehr, SEP Libertarianism, and adjacent feminist provenance present; no validation errors. |
| P-31-02 | Inspect Classical-Liberal Feminism direct coverage and isolated routing. | Existing `Feminism → Liberal Feminism → Classical-Liberal Feminism` canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers; contested family boundary and false-positive controls are recorded. |
| P-31-03 | Run full-production reachability diagnostics. | Classical-Liberal Feminism ranks 45/48/4 by layer and 45 combined; aggregate rates are 36.4780% and 50.9434%, with worst ranks 50 and 46; diagnostics are not respondent evidence. |
| P-31-04 | Round-trip complete v31 share state and readable v1 partial state. | Complete state uses v2 at 7,606 characters; v1 decodes; validation remains fail-closed. |

## Current v32 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-32-01 | Validate the v32 manifest, source provenance, and research-bank closure. | 720 prompts; 240 per layer; 59 editorial and 54 production anchors; SEP, Cambridge, Kinna, Bray, and Ostrom provenance present; no validation errors. |
| P-32-02 | Inspect Anarcho-Communism direct coverage and isolated routing. | Existing `Anarchism → Social Anarchism → Anarcho-Communism` canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers; anti-hierarchy/common-ownership/need-oriented-provision boundary and Collectivist distinction recorded. |
| P-32-03 | Run full-production reachability diagnostics. | Anarcho-Communism ranks 11/3/1 by layer and 1 combined; aggregate rates are 35.8025% and 51.8519%, with worst ranks 51 and 47; full-competition missing-layer output is diagnostic only because isolated coverage is complete. |
| P-32-04 | Round-trip complete v32 share state and readable v1 partial state. | Complete state uses v2 at 7,734 characters; v1 decodes; validation remains fail-closed. |

## Current v33 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-33-01 | Validate the v33 manifest, source provenance, and research-bank closure. | 732 prompts; 244 per layer; 60 editorial and 55 production anchors; Oxford, Cambridge, SEP, Bakunin, Kropotkin, Ward, and Ostrom provenance present; no validation errors. |
| P-33-02 | Inspect Collectivist Anarchism direct coverage and isolated routing. | Existing `Anarchism → Social Anarchism → Collectivist Anarchism` canonical path; 4/4/4 target prompts; dedicated-scored; isolated reachability in all layers; collective ownership, anti-capital/anti-state, federated self-government, and labor-linked distribution boundary are recorded separately from Anarcho-Communism. |
| P-33-03 | Run full-production reachability diagnostics. | Collectivist Anarchism ranks 9/5/1 by layer and 1 combined; aggregate rates are 33.3333% and 49.0909%, with worst ranks 52 and 48; diagnostics are not respondent evidence. |
| P-33-04 | Round-trip complete v33 share state and readable v1 partial state. | Complete state uses v2 at 7,862 characters; v1 decodes; validation remains fail-closed. |

## Current v34 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-34-01 | Validate the v34 manifest, source provenance, and research-bank closure. | 744 prompts; 248 per layer; 61 editorial and 56 production anchors; SEP, Oxford Ward, Cambridge History of Socialism, and Ostrom provenance present; no validation errors. |
| P-34-02 | Inspect Anarchism macro-family direct coverage and contextual separation. | Canonical `Anarchism` carries `anarchism-family` with 4/4/4 target prompts; the old `anarchism` bridge remains contextual-only; descendant branches remain separate. |
| P-34-03 | Run full-production reachability diagnostics. | All 56 anchors pass isolated routing; Anarchism ranks 45/45/45 by layer and 45 combined; aggregate rates are 32.7381% and 48.2143%, with worst ranks 53 and 47; diagnostics are not respondent evidence. |
| P-34-04 | Round-trip complete v34 share state and readable v1 partial state. | Complete state uses v2 at 7,990 characters; v1 decodes; validation remains fail-closed. |

## Current v35 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-35-01 | Validate the v35 manifest, source provenance, and research-bank closure. | 756 prompts; 252 per layer; 62 editorial and 57 production anchors; current SEP, Oxford, and Cambridge Conservatism provenance present; no validation errors. |
| P-35-02 | Inspect Conservatism macro-family direct coverage and conservative-branch separation. | Canonical `Conservatism` carries `conservatism-family` with 4/4/4 target prompts; existing Conservative branch and contextual anchors remain distinct. |
| P-35-03 | Run full-production reachability diagnostics. | All 57 anchors pass isolated routing; Conservatism ranks 38/46/4 by layer and 18 combined; aggregate rates are 33.3333% and 49.1228%, with worst ranks 53 and 47; diagnostics are not respondent evidence. |
| P-35-04 | Round-trip complete v35 share state and readable v1 partial state. | Complete state uses v2 at 8,118 characters; v1 decodes; validation remains fail-closed. |

## Current v36 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-36-01 | Validate the v36 manifest, source provenance, and research-bank closure. | 768 prompts; 256 per layer; 63 editorial and 58 production anchors; Oxford, Cambridge, SEP, planetary-boundaries, and climate-ethics provenance present; no validation errors. |
| P-36-02 | Inspect Ecologism / Green Ideology macro-family direct coverage and ecological false-positive separation. | Canonical `Ecologism` carries `ecologism-family` with 4/4/4 target prompts; ecological descendants, associated traditions, and contextual anchors remain distinct. |
| P-36-03 | Run full-production reachability diagnostics. | All 58 anchors pass isolated routing; Ecologism ranks 21/48/3 by layer and 8 combined; aggregate rates are 33.3333% and 48.2759%, with worst ranks 54 and 48; diagnostics are not respondent evidence. |
| P-36-04 | Round-trip complete v36 share state and readable v1 partial state. | Complete state uses v2 at 8,246 characters; v1 decodes; validation remains fail-closed. |
## Current v37 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-37-01 | Validate the v37 manifest, source provenance, and research-bank closure. | 780 prompts; 260 per layer; 64 editorial and 59 production anchors; current SEP, Oxford, and Cambridge Liberalism provenance present; no validation errors. |
| P-37-02 | Inspect Liberalism macro-family direct coverage and branch separation. | Canonical `Liberalism` carries `liberalism-family` with 4/4/4 target prompts; existing Liberal branches and contextual relations remain distinct. |
| P-37-03 | Run full-production reachability diagnostics. | All 59 anchors pass isolated routing; Liberalism ranks 10/24/11 by layer and 9 combined; aggregate rates are 33.3333% and 47.4576%, with worst ranks 55 and 48; diagnostics are not respondent evidence. |
| P-37-04 | Round-trip complete v37 share state and readable v1 partial state. | Complete state uses v2 at 8,374 characters; v1 decodes; validation remains fail-closed. |

## v39 QA scenarios — Nationalism macro family

| ID | Scenario | Expected evidence |
|---|---|---|
| P-39-01 | Inspect Nationalism macro target metadata and direct coverage. | Canonical `nationalism` carries `nationalism-family`, dedicated-scored status, and 4/4/4 target prompts. |
| P-39-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against patriotism, ancestry, ordinary citizenship, one membership rule, and Fascism. |
| P-39-03 | Run isolated and full-production reachability diagnostics. | Nationalism routes in all three isolated layers and combined calculation; ranks 28/32/14 and 19 combined are recorded as design diagnostics only. |
| P-39-04 | Round-trip complete v39 share state and stale/malformed fragments. | Complete state uses v2 at 8,630 characters; validation remains fail-closed. |
| P-39-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |
## v38 QA scenarios — Socialism macro family

1. Confirm the Socialism target reports canonical macro placement, `socialism-family`, dedicated-scored status, and 4/4/4 direct coverage.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the plural Socialism boundary.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Socialism anchor.
4. Confirm the complete answer share fragment measures 8,502 characters and retains fail-closed stale/malformed handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10 and contextual/catalog-only anchors remain excluded from production scoring.

## v40 QA scenarios — Republicanism macro family

| ID | Scenario | Expected evidence |
|---|---|---|
| P-40-01 | Inspect Republicanism macro target metadata and direct coverage. | Canonical `republicanism` carries `republicanism-family`, dedicated-scored status, and 4/4/4 target prompts. |
| P-40-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against patriotism, generic anti-corruption, majoritarianism, constitutionalism alone, the contemporary Republican Party, and one historical republic. |
| P-40-03 | Run isolated and full-production reachability diagnostics. | Republicanism routes in all three isolated layers and combined calculation; ranks 7/1/49 and 4 combined are recorded as design diagnostics only. |
| P-40-04 | Round-trip complete v40 share state and stale/malformed fragments. | Complete state uses v2 at 8,758 characters; v1 decodes; validation remains fail-closed. |
| P-40-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

## v41 QA scenarios — Feminism macro family

| ID | Scenario | Expected evidence |
|---|---|---|
| P-41-01 | Inspect Feminism macro target metadata and direct coverage. | Canonical `feminism` carries `feminism-family`, dedicated-scored status, and 4/4/4 target prompts. |
| P-41-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against formal equality alone, identity alone, one patriarchy account, one policy, one branch, and one historical movement. |
| P-41-03 | Run isolated and full-production reachability diagnostics. | Feminism routes in all three isolated layers and combined calculation; ranks 1/2/46 and 1 combined are recorded as design diagnostics only. |
| P-41-04 | Round-trip complete v41 share state and stale/malformed fragments. | Complete state uses v2 at 8,886 characters; v1 decodes; validation remains fail-closed. |
| P-41-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

## v42 precision QA scenarios — Anarcho-Syndicalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-42-01 | Inspect Anarcho-Syndicalism target metadata and direct coverage. | Canonical `anarcho-syndicalism` carries Social Anarchism parentage, its anchor, dedicated-scored status, and 4/4/4 target prompts. |
| P-42-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against generic labor support, anti-state sentiment, Guild Socialism, National-Syndicalism, and violence inference. |
| P-42-03 | Run isolated and full-production reachability diagnostics. | Anarcho-Syndicalism routes in all three isolated layers and combined calculation; ranks 15/8/1 and 1 combined are recorded as design diagnostics only. |
| P-42-04 | Round-trip complete v42 share state and stale/malformed fragments. | Complete state uses v2 at 9,014 characters; v1 decodes; validation remains fail-closed. |
| P-42-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

## v43 precision QA scenarios — Anarcho-Capitalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-43-01 | Inspect Anarcho-Capitalism target metadata and direct coverage. | Canonical `anarcho-capitalism` carries Libertarianism parentage, its anchor, dedicated-scored status, and 4/4/4 target prompts. |
| P-43-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against generic libertarianism, small-government preference, Minarchism, Right-Libertarianism, Individualist/Social Anarchism, Mutualism, anti-state sentiment, and private provision alone. |
| P-43-03 | Run isolated and full-production reachability diagnostics. | Anarcho-Capitalism routes in all three isolated layers and combined calculation; ranks 12/1/1 and 1 combined are recorded as design diagnostics only. |
| P-43-04 | Round-trip complete v43 share state and stale/malformed fragments. | Complete state uses v2 at 9,142 characters; v1 decodes; validation remains fail-closed. |
| P-43-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

## v44 precision QA scenarios — Anarcho-Primitivism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-44-01 | Inspect Anarcho-Primitivism target metadata and direct coverage. | Canonical `anarcho-primitivism` carries its Green Anarchism relation, `anarcho-primitivism` anchor, dedicated-scored status, and 4/4/4 target prompts. |
| P-44-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against broad environmentalism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, and one-theorist inference. |
| P-44-03 | Run isolated and full-production reachability diagnostics. | Anarcho-Primitivism routes in all three isolated layers and combined calculation; ranks 9/33/1 and 1 combined are recorded as design diagnostics only. |
| P-44-04 | Round-trip complete v44 share state and stale/malformed fragments. | Complete state uses v2 at 9,270 characters; v1 decodes; validation remains fail-closed. |
| P-44-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v44 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.


## v46 precision QA scenarios — Egalitarian-Liberal Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-46-01 | Inspect Egalitarian-Liberal Feminism target metadata and direct coverage. | Canonical `egalitarian-liberal-feminism` remains on `Liberal Feminism → Egalitarian-Liberal Feminism`, carries its fresh source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-46-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against formal equality or generic liberalism alone, Classical-Liberal Feminism, Social Liberalism, Socialist / Marxist / Materialist Feminism, Radical Feminism, public provision alone, and one-author inference. |
| P-46-03 | Run isolated and full-production reachability diagnostics. | Egalitarian-Liberal Feminism routes in all three isolated layers and the combined calculation; full-production ranks 54/57/2 and 53 combined are recorded as design diagnostics only. |
| P-46-04 | Round-trip complete v46 share state and stale/malformed fragments. | Complete state uses v2 at 9,526 characters; v1 decodes; validation remains fail-closed. |
| P-46-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v46 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v47 precision QA scenarios — Buddhist Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-47-01 | Inspect Buddhist Nationalism target metadata and direct coverage. | Canonical `buddhist-nationalism` remains a micro under `Religious Nationalism`, carries its seven source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-47-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, nationalism without Buddhist-national translation, one jurisdiction, one monk, one minority conflict, one constitutional model, and one party. |
| P-47-03 | Run isolated and full-production reachability diagnostics. | Buddhist Nationalism routes in all three isolated layers and the combined calculation; full-production ranks 18/43/17 and 22 combined are recorded as design diagnostics only. |
| P-47-04 | Round-trip complete v47 share state and stale/malformed fragments. | Complete state uses v2 at 9,654 characters; v1 decodes; validation remains fail-closed. |
| P-47-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v47 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v48 precision QA scenarios — Cultural / Spiritual Ecofeminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-48-01 | Inspect Cultural / Spiritual Ecofeminism target metadata and direct coverage. | Canonical `cultural-spiritual-ecofeminism` remains a micro under `Ecofeminism`, carries its seven source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-48-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against private spirituality, identity, environmental concern, woman–nature essentialism, one religion, cultural nostalgia, generic Ecofeminism, Cultural Feminism, Materialist / Socialist Ecofeminism, Deep Ecology, anti-technology sentiment, and one-author or one-community inference. |
| P-48-03 | Run isolated and full-production reachability diagnostics. | Cultural / Spiritual Ecofeminism routes in all three isolated layers; full-production ranks 13/10/8 and 6 combined are recorded as design diagnostics only. |
| P-48-04 | Round-trip complete v48 share state and stale/malformed fragments. | Complete state uses v2 at 9,782 characters; v1 decodes; validation remains fail-closed. |
| P-48-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v48 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v49 precision QA scenarios — Materialist / Socialist Ecofeminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-49-01 | Inspect Materialist / Socialist Ecofeminism target metadata and direct coverage. | Canonical `materialist-socialist-ecofeminism` remains a micro under `Ecofeminism`, carries its eight source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-49-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against green policy, feminism, socialism, welfare, public ownership, social-reproduction language, generic Eco-socialism, Materialist Feminism without ecology, Cultural / Spiritual Ecofeminism's cultural/spiritual mechanism, and one-model inference. |
| P-49-03 | Run isolated and full-production reachability diagnostics. | Materialist / Socialist Ecofeminism routes in all three isolated layers and the combined calculation; full-production ranks 2/1/2 and 1 combined are recorded as design diagnostics only. |
| P-49-04 | Round-trip complete v49 share state and stale/malformed fragments. | Complete state uses v2 at 9,910 characters; v1 decodes; validation remains fail-closed. |
| P-49-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v49 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v50 precision QA scenarios — Christian Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-50-01 | Inspect Christian Nationalism target metadata and direct coverage. | Canonical `christian-nationalism` remains a micro under `Religious Nationalism`, carries the source records and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-50-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against private faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, generic Religious Nationalism, one party, one actor, one country, and one policy. |
| P-50-03 | Run isolated and full-production reachability diagnostics. | Christian Nationalism routes in all three isolated layers and the combined calculation; full-production ranks 8/47/1 and 2 combined are recorded as design diagnostics only. |
| P-50-04 | Round-trip complete v50 share state and stale/malformed fragments. | Complete state uses v2 at 10,038 characters; v1 decodes; validation remains fail-closed. |
| P-50-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v50 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v51 precision QA scenarios — Egoist Anarchism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-51-01 | Inspect Egoist Anarchism target metadata and direct coverage. | Canonical `egoist-anarchism` remains a micro under `Individualist Anarchism`, carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-51-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, and one interpretation of Stirner. |
| P-51-03 | Run isolated and full-production reachability diagnostics. | Egoist Anarchism routes in all three isolated layers and the combined calculation; full-production ranks 27/6/1 and 1 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-51-04 | Round-trip complete v51 share state and stale/malformed fragments. | Complete state uses v2 at 10,166 characters; v1 decodes; validation remains fail-closed. |
| P-51-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v51 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v52 precision QA scenarios — Cultural Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-52-01 | Inspect Cultural Feminism target metadata and direct coverage. | Canonical `cultural-feminism` remains a micro under `Radical Feminism`, carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-52-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against gender identity, care preference/work, feminist identity, one anti-essentialist statement, generic feminism, Radical, Materialist, Lesbian, and Ecofeminist mechanisms, one author, one community, and one policy. |
| P-52-03 | Run isolated and full-production reachability diagnostics. | Cultural Feminism routes in all three isolated layers; full-production ranks 12/32/16 and 11 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-52-04 | Round-trip complete v52 share state and stale/malformed fragments. | Complete state uses v2 at 10,294 characters; v1 decodes; validation remains fail-closed. |
| P-52-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v52 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v53 precision QA scenarios — Cultural Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-53-01 | Inspect Cultural Nationalism target metadata and direct coverage. | Canonical `cultural-nationalism` remains a micro under `Nationalism`, carries the existing and four fresh research sources plus anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-53-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, religious identity, one heritage policy, fixed essence, generic Nationalism, and one historical case; Civic and Ethnocultural Nationalism remain explicit neighbors. |
| P-53-03 | Run isolated and full-production reachability diagnostics. | Cultural Nationalism routes in all three isolated layers; full-production ranks 16/38/17 and 19 combined are recorded as design diagnostics only, with the combined missing-layer fields treated as overlap rather than direct-coverage failure and no arbitrary scorer or picker retuning. |
| P-53-04 | Round-trip complete v53 share state and stale/malformed fragments. | Complete state uses v2 at 10,422 characters; v1 decodes; validation remains fail-closed. |
| P-53-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v53 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v54 precision QA scenarios — Ethnocultural Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-54-01 | Inspect Ethnocultural Nationalism metadata and direct coverage. | Existing canonical `ethnocultural-nationalism` is a micro under `Nationalism`, has dedicated-scored status, carries the five fresh sources plus adjacent provenance and anchor, and has exact 4/4/4 target prompts. |
| P-54-02 | Inspect source links, analytical context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, and generic Nationalism. |
| P-54-03 | Run isolated and full-production reachability diagnostics. | Ethnocultural Nationalism routes in all three isolated layers; full-production ranks 15/28/1 and 3 combined are recorded as structural overlap diagnostics only, with no arbitrary scorer or picker retuning. |
| P-54-04 | Round-trip complete v54 share state and stale/malformed fragments. | Complete state uses v2 at 10,550 characters; v1 decodes; validation remains fail-closed. |
| P-54-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the workbench exposes the new dedicated-scored target, the container is healthy, and contextual/catalog-only anchors remain outside production scoring. |

The v54 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v55 precision QA scenarios — Lesbian Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-55-01 | Inspect Lesbian Feminism metadata and source map. | The canonical micro node remains under `Feminism`, has four fresh source records plus adjacent SEP context, a provisional anchor, and a dedicated-scored state. |
| P-55-02 | Inspect layer discipline and false-positive boundaries. | Twelve prompts are exactly 4/4/4, use only layer-valid facets, are target-tagged, and distinguish structural compulsory-heterosexuality analysis from identity, orientation, relationship status, generic feminism, sexuality-rights support, and one historical formation. |
| P-55-03 | Run coverage and reachability checks. | Coverage is zero-error at 996/332/332; Lesbian Feminism is isolated-reachable in all three layers; full ranks 3/16/10 and 4 combined are recorded only as overlap diagnostics. |
| P-55-04 | Verify share and stale-fragment behavior. | Compact v2 complete-answer output is 10,678 characters, v1 remains decodable, and malformed/stale fragments fail closed. |
| P-55-05 | Verify browser and container delivery. | Local and Docker-backed serial Playwright are 10/10, `/healthz` returns `ok` after bounded startup retry, and catalog-only/contextual targets remain excluded from production scoring. |

The v55 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v56 precision QA scenarios — One-Nation Conservatism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-56-01 | Inspect One-Nation Conservatism metadata and source map. | The existing micro node remains under `Conservatism → Moderate Conservatism`, has the four academic source records plus adjacent context, a provisional anchor, and a dedicated-scored state. |
| P-56-02 | Inspect layer discipline and false-positive boundaries. | Twelve prompts are exactly 4/4/4, use only layer-valid facets, are target-tagged, and distinguish national/cross-class/institutional/constructive-reform analysis from patriotism, welfare support, tradition, party affiliation, one leader, one policy, generic Conservatism, National Conservatism, and Social Democracy. |
| P-56-03 | Run coverage and reachability checks. | Coverage is zero-error at 1,008/336/336; One-Nation Conservatism is isolated-reachable in all three layers; full ranks 15/30/1 and 5 combined are recorded only as overlap diagnostics. |
| P-56-04 | Verify share and stale-fragment behavior. | Compact v2 complete-answer output is 10,817 characters, v1 remains decodable, and malformed/stale fragments fail closed. |
| P-56-05 | Verify browser and container delivery. | Local and Docker-backed serial Playwright are 10/10, the research workbench exposes the new dedicated-scored target, `/healthz` returns `ok`, and catalog-only/contextual targets remain excluded from production scoring. |

The v56 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v57 precision QA scenarios — Zionism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-57-01 | Inspect Zionism target metadata and direct coverage. | Existing canonical `zionism` remains a micro under `Nationalism`, carries the three fresh academic sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-57-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against Jewish identity, private religion, generic nationalism, patriotism, current conflict or government opinion, antisemitism or anti-Palestinian sentiment alone, and one territorial programme; secular, religious, socialist, revisionist, cultural, diasporic, multinational, autonomy, post-state, and equal-citizenship variation remains explicit. |
| P-57-03 | Run coverage and reachability checks. | Coverage is zero-error at 1,020/340/340; Zionism is isolated-reachable in all three layers; full ranks 27/25/19 and 19 combined are recorded only as overlap diagnostics. |
| P-57-04 | Verify share and stale-fragment behavior. | Compact v2 complete-answer output is 10,961 characters, v1 remains decodable, and malformed/stale fragments fail closed. |
| P-57-05 | Verify browser and container delivery. | Local and Docker-backed serial Playwright are 10/10, the research workbench exposes Zionism as dedicated and scored, `/healthz` returns `ok`, and catalog-only/contextual targets remain excluded from production scoring. |

The v57 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v58 precision QA scenarios — Khomeinism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-58-01 | Inspect Khomeinism metadata and source map. | Existing `khomeinism` remains a canonical micro under `Islamism`, has the six source refs and provisional anchor, is dedicated-scored, and has exact 4/4/4 direct coverage. |
| P-58-02 | Inspect layer discipline and false-positive boundaries. | Twelve prompts are exactly 4/4/4, source-linked, target-tagged, and distinguish guardianship/state-form/independence/oppressed mobilization from Shi'i identity, private faith, generic Islamism, current policy, and operational militancy. |
| P-58-03 | Run coverage and reachability checks. | Coverage is zero-error at 1,032/344/344; Khomeinism is isolated-reachable in all three layers; full ranks 4/31/1 and 1 combined are recorded only as overlap diagnostics. |
| P-58-04 | Verify share and stale-fragment behavior. | Compact v2 complete-answer output is 11,105 characters, v1 remains decodable, and malformed/stale fragments fail closed. |
| P-58-05 | Verify browser and container delivery. | Local and Docker-backed serial Playwright are 10/10, the workbench exposes Khomeinism as dedicated and scored, `/healthz` returns `ok`, and catalog-only/contextual anchors remain excluded from production scoring. |

The v58 precision QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v59 QA scenarios — Qutbism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-59-01 | Inspect Qutbism sources, path, target, and metadata. | Existing `Islamism → Qutbism` canonical path; seven source references; contested historical boundary; four neighbor discriminants; no node added or reparented. |
| P-59-02 | Inspect direct production coverage. | Twelve target-tagged prompts with 4/4/4 layer counts, one provisional anchor, content version 59, and 1,044 total prompts at 348 per layer. |
| P-59-03 | Run research coverage and isolated reachability. | Zero validation/closure failures; Qutbism isolated-reachable in all layers; deterministic full ranks 3/48/3 and 10 combined remain diagnostics only. |
| P-59-04 | Inspect taxonomy governance and workbench measurement status. | Governance remains promote-to-canonical/catalog-only while the workbench and target inventory show dedicated and scored; the separation is explicit. |
| P-59-05 | Run delivery checks. | 77/77 unit tests, TypeScript/build, zero high-severity audit findings, local and Docker Playwright 10/10, healthy port-8001 container, and `/healthz` `ok`. |
| P-59-06 | Inspect evidence boundary. | Candidates remain effect-free; no cognitive, respondent, psychometric, reliability/validity, invariance, empirical, or population evidence is claimed. |


## v59 QA scenarios — Qutbism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-59-01 | Inspect source and ontology metadata. | Existing `Islamism → Qutbism` path, seven sources, four discriminants, and no topology change. |
| P-59-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 59, and 1,044 total prompts at 348 per layer. |
| P-59-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 3/48/3 and 10 combined are diagnostics only. |
| P-59-04 | Inspect governance versus workbench. | Governance promote-to-canonical/catalog-only and workbench dedicated-and-scored are both visible and separate. |
| P-59-05 | Run delivery/evidence checks. | 77/77 tests, build/audit pass, local/Docker Playwright 10/10, healthy `/healthz`, effect-free candidates, and no cognitive/empirical claim. |

## v60 QA scenarios — Radical Republicanism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-60-01 | Inspect source and ontology metadata. | Existing `Republicanism → Historical Republicanism → Radical Republicanism` path, seven sources, two discriminants, and no topology change. |
| P-60-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 60, and 1,056 total prompts at 352 per layer. |
| P-60-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 10/8/6 and 4 combined, aggregate rates 25.2033% and 41.4634%, and worst ranks 78 and 72 are diagnostics only. |
| P-60-04 | Inspect governance versus workbench. | Governance retain-canonical/scored-provisional and workbench dedicated-and-scored are both visible and separate. |
| P-60-05 | Run delivery/evidence checks. | 77/77 tests, build/audit pass, local/Docker Playwright 10/10, healthy `/healthz`, effect-free candidates, and no cognitive/empirical claim. |

## v61 QA scenarios — Marxist Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-61-01 | Inspect source and ontology metadata. | Existing `Socialist / Marxist Feminism → Marxist Feminism` path, eight direct sources, two discriminants, and no topology change. |
| P-61-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 61, and 1,068 total prompts at 356 per layer. |
| P-61-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 3/15/2 and 1 combined, aggregate rates 25.3012% and 42.1687%, and worst ranks 79 and 73 are diagnostics only. |
| P-61-04 | Inspect governance versus workbench. | Governance retain-canonical/scored-provisional and workbench dedicated-and-scored are both visible and separate. |
| P-61-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,537-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/empirical claim. |

## v62 precision QA scenarios — Socialist Feminism micro branch

|---|---|---|
| P-62-01 | Inspect source and ontology metadata. | Existing `Socialist / Marxist Feminism → Socialist Feminism` path, seven direct sources including three fresh academic records, two discriminants, and no topology change. |
| P-62-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 62, and 1,080 total prompts at 360 per layer. |
| P-62-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 2/70/65 and 1 combined, aggregate rates 24.2063% and 41.6667%, and worst ranks 80 and 73 are diagnostics only. |
| P-62-04 | Inspect governance versus workbench. | Governance retain-canonical/scored-provisional and workbench dedicated-and-scored are both visible and separate. |
| P-62-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,681-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/empirical claim. |

## v63 precision QA scenarios — Left-Wing Populism micro branch

|---|---|---|
| P-63-01 | Inspect source and ontology metadata. | Existing `Populism → Left-Wing Populism` path, five direct sources including two fresh academic records, two discriminants, and no topology change. |
| P-63-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 63, 1,092 total prompts at 364 per layer, and 85 production anchors. |
| P-63-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 9/27/16 and 10 combined, aggregate rates 23.1373% and 41.1765%, and worst ranks 81 and 74 are diagnostics only. |
| P-63-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-63-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,825-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |
