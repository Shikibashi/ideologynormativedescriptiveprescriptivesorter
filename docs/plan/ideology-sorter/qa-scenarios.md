# QA Scenarios — Ideology Layer Sorter

> Generated from `operation-scenarios.md`, `spec.md`, and the section manifest.

## Summary

- Unit scenarios: 16
- Browser scenarios: 12
- Accessibility/responsive scenarios: 6
- Security/privacy scenarios: 6
- Total planned cases: 40

## Unit and contract tests

| ID | Area | Steps | Expected |
|---|---|---|---|
| U-01 | Dataset | Load bundled dataset manifest. | 408 questions, 136 per layer, unique IDs, valid sources, 33 editorial anchors with 28 canonical scoring anchors. |
| U-02 | Dataset | Inject duplicate question ID. | Validator returns an error; app build gate fails. |
| U-03 | Answer map | Use `no-view` for every item. | No layer result is forced; coverage is zero. |
| U-04 | Answer map | Use mixed responses only. | Mixed counts as answered and contributes zero directional value. |
| U-05 | Coverage | Answer 67 of 136 items in a layer. | `insufficient-information`. |
| U-06 | Coverage | Answer exactly 68 of 136 items. | Layer is eligible for a result at the inclusive 50% threshold. |
| U-07 | Coverage | Answer 69 of 136 items. | Layer is eligible and coverage is reported. |
| U-08 | Aggregation | Apply positive and negative effects. | Facet profile respects signed effects and absolute denominators. |
| U-09 | Distance | Use a known fixture profile. | Anchor distances and fit normalization are deterministic. |
| U-10 | Families | Provide anchors from five families. | First visible neighbors include at most one nearest per family before filling. |
| U-11 | Ties | Give two anchors equal distance. | Stable tie language/order; no random choice. |
| U-12 | Pulls | Create decentralized values and centralized practice signals. | Cross-layer pull is emitted without contradiction wording. |
| U-13 | Share | Encode and decode a valid envelope. | Canonical answer map round-trips. |
| U-14 | Share | Decode unknown ID, duplicate ID, invalid value, or stale version. | Whole envelope rejected; no partial answers returned. |
| U-15 | Share | Decode oversized or malformed base64url. | Safe typed error; no throw escapes. |
| U-16 | Stability | Permute answer input order. | Same normalized result and serialized output. |
| U-17 | Ontology | Use the dedicated Right-Libertarianism item block. | The branch anchor is eligible as a provisional neighbor; catalog-only nodes remain excluded. |
| U-18 | Measurement coverage | Inspect the 28 direct branch blocks. | Each target has four target-tagged questions in every layer, a dedicated-scored derived status, and source-linked provisional wording. |
| U-19 | Anchor boundary | Inspect the five contextual bridge anchors. | They remain visible as `contextual-only` research/provenance context and do not enter production neighbor selection. |

## Browser and integration tests

| ID | Area | Steps | Expected |
|---|---|---|---|
| E-01 | Intro | Load `/`. | Three paired layer labels, disclaimer, methodology action, and start action visible. |
| E-02 | Navigation | Start; click a response; continue. | Progress advances and next question appears. |
| E-03 | Required response | Click Next without a response. | Current item remains; accessible validation text appears. |
| E-04 | Back | Answer; go Back; change answer. | Changed answer persists into calculation. |
| E-05 | Transition | Complete first 136 items. | Values transition notice appears before the next layer. |
| E-06 | Full run | Answer the current dataset with Agree. | Results view renders the combined pattern and all three layer sections. |
| E-07 | Sparse layer | Answer first layer with No view; complete remaining. | First layer shows insufficient information. |
| E-08 | Restart | Click Restart from results. | Intro returns and answer state clears. |
| E-09 | Share | Complete run; activate Copy link. | Link status reports success or manual fallback; no remote answer request. |
| E-10 | Share restore | Open a valid share fragment. | Answers restore at the first unanswered item or results if complete. |
| E-11 | Malformed link | Open invalid fragment. | Intro and generic recovery message; no crash or raw hash echo. |
| E-12 | Methodology | Open methodology from intro and results. | Formula, no-view rule, source posture, and limitations are readable. |

## Accessibility and responsive tests

| ID | Area | Steps | Expected |
|---|---|---|---|
| A-01 | Keyboard | Tab through intro and quiz. | Focus is visible and order is logical. |
| A-02 | Radio semantics | Use keyboard to choose each response. | Native group semantics and labels work. |
| A-03 | Focus movement | Advance and go Back. | Focus moves to the new question heading/group predictably. |
| A-04 | Reduced motion | Enable `prefers-reduced-motion`. | No required animation; content remains understandable. |
| A-05 | Mobile | Render at 320 CSS px. | No horizontal overflow; controls remain tappable. |
| A-06 | Text zoom | Render at 200% text size. | Prompt, answers, progress, and actions remain visible. |

## Security and privacy tests

| ID | Area | Steps | Expected |
|---|---|---|---|
| S-01 | Network | Observe requests during quiz. | No answer-storage endpoint or analytics request. |
| S-02 | Injection | Put HTML/script-like text in a fragment field. | Envelope rejected or treated as data; no HTML injection. |
| S-03 | Boundary | Use oversized hash. | Rejected before expensive parsing. |
| S-04 | Version | Use unsupported dataset/policy version. | Safe stale-link state; no silent reinterpretation. |
| S-05 | Clipboard | Deny clipboard permission. | Selectable link fallback and privacy copy visible. |
| S-06 | Error output | Trigger malformed fragment. | Error copy does not include political answers or raw payload. |

## Current v9 structural scenarios

| ID | Area | Steps | Expected |
|---|---|---|---|
| R-01 | Dataset closure | Run `npm run research:coverage`. | 432 questions, 144 per layer, 30 dedicated-scored targets, 72 catalog-only targets, five contextual-only anchors, 12 registry-only entries, and zero validation errors. |
| R-02 | Anchor closure | Run `npm run research:anchor-reachability`. | All 30 production anchors have four target questions in each layer and pass isolated-anchor routing; full-production overlap is reported as a diagnostic. |
| R-03 | Provenance | Inspect Populism and Mutualism in the workbench. | Each has source-linked target blocks and an explicit provisional boundary; research candidates remain effect-free. |

## Current v10 structural scenarios

| ID | Area | Steps | Expected |
|---|---|---|---|
| R-04 | Dataset closure | Run `npm run research:coverage`. | 456 questions, 152 per layer, 32 dedicated-scored targets, 70 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-05 | Conservative-school blocks | Inspect Radical Conservatism and Reactionary Conservatism. | Each has source-linked descriptive, normative, and prescriptive blocks with four target-tagged items per layer, provisional anchors, and explicit renewal-versus-restoration boundary notes. |
| R-06 | Anchor closure | Run `npm run research:anchor-reachability`. | All 32 production anchors have four target questions in each layer and pass isolated-anchor routing; full-production overlap is reported only as a diagnostic. |
| R-07 | Holds and quarantine | Inspect the research workbench and coverage output. | Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the 1,428 research candidates remain effect-free and separate from production scoring. |

## Current v11 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-08 | Dataset closure | Run `npm run research:coverage`. | 468 questions, 156 per layer, 33 dedicated-scored targets, 69 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-09 | Islamism block | Inspect Islamism in the research workbench and dataset. | Islamism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and a public-project/private-faith boundary. |
| R-10 | Remaining holds | Inspect the research workbench and coverage output. | Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the 1,428 research candidates remain effect-free and separate from production scoring. |
| R-11 | Anchor closure | Run `npm run research:anchor-reachability`. | All 33 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a diagnostic. |
| R-12 | Complete-run boundary | Complete all 468 prompts with a fixed directional response. | Results render 156/156/156 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |

## Current v12 structural scenarios — historical

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-13 | Dataset closure | Run `npm run research:coverage`. | 480 questions, 160 per layer, 34 dedicated-scored targets, 68 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-14 | Ordoliberalism block | Inspect Ordoliberalism in the research workbench and dataset. | Ordoliberalism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and an explicit competition/order, anti-concentration, and social-market boundary. |
| R-15 | Remaining holds | Inspect the research workbench and coverage output. | Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; the 1,428 research candidates remain effect-free and separate from production scoring. |
| R-16 | Anchor closure | Run `npm run research:anchor-reachability`. | All 34 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a structural diagnostic. |
| R-17 | Complete-run boundary | Complete all 480 prompts with a fixed directional response. | Results render 160/160/160 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |

## Historical v13 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-18 | Dataset closure | Run `npm run research:coverage`. | 492 questions, 164 per layer, 35 dedicated-scored targets, 67 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-19 | Pan-Africanism block | Inspect Pan-Africanism in the research workbench and dataset. | Pan-Africanism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and explicit African/diasporic solidarity, anti-colonial power, self-determination, and cross-border cooperation boundaries. |
| R-20 | Remaining holds | Inspect the research workbench and coverage output. | Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only; Black Nationalism and Anti-Colonial Nationalism remain documented alternatives; the 1,428 research candidates remain effect-free. |
| R-21 | Anchor closure | Run `npm run research:anchor-reachability`. | All 35 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a structural diagnostic. |
| R-22 | Complete-run boundary | Complete all 492 prompts with a fixed directional response. | Results render 164/164/164 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |

## Current v14 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-23 | Dataset closure | Run `npm run research:coverage`. | 504 questions, 168 per layer, 36 dedicated-scored targets, 66 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-24 | Religious Nationalism block | Inspect Religious Nationalism in the research workbench and dataset. | Religious Nationalism exposes four target-tagged prompts in every layer, a source-linked provisional anchor, a `dedicated-scored` derived status, and explicit public religion–nation fusion, accountable self-government, comparative variation, and private-faith false-positive boundaries. |
| R-25 | Remaining holds | Inspect the research workbench and coverage output. | Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only; Christian Nationalism, Hindutva, Buddhist Nationalism, and Religious Zionism remain distinct catalog variants; the 1,428 research candidates remain effect-free. |
| R-26 | Anchor closure | Run `npm run research:anchor-reachability`. | All 36 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a structural diagnostic. |
| R-27 | Complete-run boundary | Complete all 504 prompts with a fixed directional response. | Results render 168/168/168 layer coverage and the combined pattern without admitting contextual-only anchors as production neighbors. |

## Current v15 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-28 | Dataset closure | Run `npm run research:coverage`. | 516 questions, 172 per layer, 37 dedicated-scored targets, 65 catalog-only targets, five contextual-only targets, 12 registry-only entries, and zero validation errors. |
| R-29 | Conservative Nationalism block | Inspect Conservative Nationalism in the research workbench and dataset. | Conservative Nationalism exposes four target-tagged prompts in every layer over its existing parentless canonical meso hybrid, a source-linked provisional anchor, a `dedicated-scored` status, and explicit continuity, bounded-solidarity, sovereignty, stewardship, and ancestry-only false-positive boundaries. |
| R-30 | Remaining holds | Inspect the research workbench and coverage output. | National Socialism and Neo-Fascism remain catalog-only high-risk historical holds; the National Conservatism micro child remains distinct; the 1,428 research candidates remain effect-free. |
| R-31 | Anchor closure | Run `npm run research:anchor-reachability`. | All 37 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap is reported only as a structural diagnostic. |
| R-32 | Complete-run and share boundary | Complete all 516 prompts with a fixed directional response and measure the encoded fragment. | Results render 172/172/172 layer coverage; the complete answer fragment round-trips at 33,459 characters under the finite 36,864-character guard, and an oversized input remains rejected without truncation. |

## Current v16 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-33 | Dataset closure | Run `npm run research:coverage`. | 528 questions, 176 per layer, 38 dedicated-scored targets, 64 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-34 | National Socialism block | Inspect National Socialism in the research workbench and dataset. | National Socialism exposes four target-tagged prompts in every layer over its existing canonical meso node, a source-linked provisional anchor, a `dedicated-scored` status, historical-scope context on every prompt, and a high-risk full-bundle boundary. |
| R-35 | Remaining hold and ontology | Inspect Neo-Fascism, the canonical path, and the ontology inventory. | Neo-Fascism remains catalog-only; National Socialism remains a canonical meso node under Fascism; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-36 | Anchor closure | Run `npm run research:anchor-reachability`. | All 38 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap and ranks are reported only as structural diagnostics. |
| R-37 | Complete-run and share boundary | Complete all 528 prompts with a fixed directional response and measure the encoded fragment. | Results render 176/176/176 layer coverage; the complete answer fragment round-trips at 34,275 characters under the finite 36,864-character guard, and an oversized input remains rejected without truncation. |

## Current v17 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-38 | Dataset closure | Run `npm run research:coverage`. | 540 questions, 180 per layer, 39 dedicated-scored targets, 63 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-39 | Civic Nationalism block | Inspect Civic Nationalism in the research workbench and dataset. | Civic Nationalism exposes four target-tagged prompts in every layer over its existing canonical micro node under Nationalism, a source-linked provisional anchor, a `dedicated-scored` status, and explicit context-sensitive civic-membership, equal-standing, self-government, and civic–ethnic boundary notes. |
| R-40 | Remaining hold and ontology | Inspect Neo-Fascism, the canonical path, and the ontology inventory. | Neo-Fascism remains catalog-only; Civic Nationalism remains a canonical micro node under Nationalism; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-41 | Anchor closure | Run `npm run research:anchor-reachability`. | All 39 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap and ranks are reported only as structural diagnostics. |
| R-42 | Complete-run and share boundary | Complete all 540 prompts with a fixed directional response and measure the encoded fragment. | Results render 180/180/180 layer coverage; the complete answer fragment round-trips at 35,075 characters under the finite 36,864-character guard, and an oversized input remains rejected without truncation. |

## Current v18 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-43 | Dataset closure | Run `npm run research:coverage`. | 552 questions, 184 per layer, 40 dedicated-scored targets, 62 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-44 | Black Nationalism block | Inspect Black Nationalism in the research workbench and dataset. | Black Nationalism exposes four target-tagged prompts in every layer over `Nationalism → Black Nationalism`, a source-linked provisional anchor, a `dedicated-scored` status, and explicit dignity/linked-fate, anti-Black power, autonomy, self-determination, institution, and variation boundaries. |
| R-45 | Remaining alternatives and ontology | Inspect Materialist Feminism, Anti-Colonial Nationalism, Neo-Fascism, the canonical path, and the ontology inventory. | Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives; Neo-Fascism remains a high-risk catalog-only hold; Black Nationalism remains an existing canonical micro node; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-46 | Anchor closure | Run `npm run research:anchor-reachability`. | All 40 production anchors have four target questions per layer and pass isolated-anchor routing; Black Nationalism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Black Nationalism at 3/15/7 by layer and 4 combined. |
| R-47 | Complete-run and share boundary | Complete all 552 prompts with a fixed directional response and measure the encoded fragment. | Results render 184/184/184 layer coverage; the complete answer fragment round-trips at 35,875 characters under the finite 36,864-character guard, and an oversized input remains rejected without truncation. |

## Current v19 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-48 | Dataset closure | Run `npm run research:coverage`. | 564 questions, 188 per layer, 41 dedicated-scored targets, 61 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-49 | Materialist Feminism block | Inspect Materialist Feminism in the research workbench and dataset. | Materialist Feminism exposes four target-tagged prompts in every layer over `Socialist / Marxist Feminism → Materialist Feminism`, a source-linked provisional anchor, a `dedicated-scored` status, and plural materialist-feminist labor, care/social-reproduction, embodiment, institutional-power, resource, historical-specificity, and emancipatory-change boundaries. |
| R-50 | Remaining alternatives and ontology | Inspect Marxist Feminism, Socialist Feminism, Anti-Colonial Nationalism, Neo-Fascism, the canonical path, and the ontology inventory. | Marxist Feminism and Socialist Feminism remain distinct catalog branches; Anti-Colonial Nationalism remains unactivated; Neo-Fascism remains a high-risk catalog-only hold; no ontology node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-51 | Anchor closure | Run `npm run research:anchor-reachability`. | All 41 production anchors have four target questions per layer and pass isolated-anchor routing; Materialist Feminism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Materialist Feminism at 2/7/5 by layer and 4 combined. |
| R-52 | Complete-run and share boundary | Complete all 564 prompts with a fixed directional response and measure the encoded fragment. | Results render 188/188/188 layer coverage; the complete answer fragment round-trips at 36,723 characters under the finite 36,864-character guard, and an oversized input remains rejected without truncation. |

## Current v20 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-53 | Dataset closure | Run `npm run research:coverage`. | 576 questions, 192 per layer, 42 dedicated-scored targets, 60 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-54 | Anti-Colonial Nationalism block | Inspect Anti-Colonial Nationalism in the research workbench and dataset. | Anti-Colonial Nationalism exposes four target-tagged prompts in every layer over `Nationalism → Anti-Colonial Nationalism`, a source-linked provisional anchor, a `dedicated-scored` status, and explicit domination, self-rule, self-determination, solidarity, institution-building, anti-imperial, and historical-variation boundaries. |
| R-55 | Remaining alternatives and ontology | Inspect Arab Nationalism, Maoism, Neo-Fascism, the canonical path, and the ontology inventory. | Arab Nationalism and Maoism remain catalog-only alternatives; Neo-Fascism remains a high-risk catalog-only hold; Anti-Colonial Nationalism remains an existing canonical micro node; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-56 | Anchor closure | Run `npm run research:anchor-reachability`. | All 42 production anchors have four target questions per layer and pass isolated-anchor routing; Anti-Colonial Nationalism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Anti-Colonial Nationalism at 6/9/7 by layer and 5 combined. |
| R-57 | Complete-run and share boundary | Complete all 576 prompts with a fixed directional response and measure the encoded fragment. | Results render 192/192/192 layer coverage; the complete answer fragment round-trips at 37,651 characters under the finite 40,960-character guard, and an oversized input remains rejected without truncation. |
## Current v21 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-58 | Dataset closure | Run `npm run research:coverage`. | 588 questions, 196 per layer, 43 dedicated-scored targets, 59 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-59 | Arab Nationalism block | Inspect Arab Nationalism in the research workbench and dataset. | Arab Nationalism exposes four target-tagged prompts in every layer over its existing canonical micro node under Nationalism, a source-linked provisional anchor, a `dedicated-scored` status, and explicit political-Arab-community, self-government, cross-border, territorial/Pan-Arab, and secular/religious boundary notes. |
| R-60 | Remaining hold and ontology | Inspect Maoism, Neo-Fascism, the canonical path, and the ontology inventory. | Maoism remains catalog-only for a separate doctrine/regime and mass-line pass; Neo-Fascism remains catalog-only; Arab Nationalism remains a canonical micro node under Nationalism; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-61 | Anchor closure | Run `npm run research:anchor-reachability`. | All 43 production anchors have four target questions per layer and pass isolated-anchor routing; full-production top-three overlap and ranks are reported only as structural diagnostics. |
| R-62 | Complete-run and share boundary | Complete all 588 prompts with a fixed directional response and measure the encoded fragment. | Results render 196/196/196 layer coverage; the complete answer fragment round-trips at 38,435 characters under the finite 40,960-character guard, and an oversized input remains rejected without truncation. |

## Current v22 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-63 | Dataset closure | Run `npm run research:coverage`. | 600 questions, 200 per layer, 44 dedicated-scored targets, 58 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-64 | Maoism block | Inspect Maoism in the research workbench and dataset. | Maoism exposes four target-tagged prompts in every layer over the existing `Socialism → Communism → Maoism` path, a source-linked provisional anchor, `dedicated-scored` status, and explicit doctrine/regime, agrarian/colonial, mass-line, rectification, anti-bureaucratic, social-hierarchy, and collective-transformation boundaries. |
| R-65 | Remaining hold and ontology | Inspect Neo-Fascism, the Maoism canonical path, and the ontology inventory. | Neo-Fascism remains a high-risk catalog-only hold; Maoism is an existing canonical micro node under Communism; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-66 | Anchor closure | Run `npm run research:anchor-reachability`. | All 44 production anchors have four target questions per layer and pass isolated-anchor routing; Maoism closes in isolation; full-production top-three overlap and ranks are reported only as structural diagnostics, with Maoism at 2/14/1 by layer and 1 combined. |
| R-67 | Complete-run and share boundary | Complete all 600 prompts with a fixed directional response and measure the encoded fragment. | Results render 200/200/200 layer coverage; the complete answer fragment round-trips at 39,059 characters under the finite 40,960-character guard, and an oversized input remains rejected without truncation. |

## Current v23 structural scenarios

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-68 | Dataset closure | Run `npm run research:coverage`. | 612 questions, 204 per layer, 45 dedicated-scored targets, 57 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-69 | Council Communism block | Inspect Council Communism in the research workbench and dataset. | Council Communism exposes four target-tagged prompts in every layer over the existing `Socialism → Communism → Council Communism` path, a source-linked provisional anchor, `dedicated-scored` status, and explicit worker-council, direct-self-government, common-control, anti-vanguard, representation/scale, and false-positive boundary notes. |
| R-70 | Remaining holds and ontology | Inspect Guild Socialism, Trotskyism, Marxism-Leninism, Neo-Fascism, and the ontology inventory. | The alternatives remain catalog-only or high-risk holds; Council Communism is an existing canonical micro node under Communism; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-71 | Anchor closure | Run `npm run research:anchor-reachability`. | All 45 production anchors have four target questions per layer and pass isolated-anchor routing; Council Communism closes in isolation with full ranks 12/3/1 by layer and 1 combined; full-production overlap and ranks are structural diagnostics only. |
| R-72 | Complete-run and share boundary | Complete all 612 prompts with a fixed directional response and measure the encoded fragment. | Results render 204/204/204 layer coverage; the complete answer fragment round-trips at 39,859 characters under the finite 40,960-character guard, and an oversized input remains rejected without truncation. |

## Current v24 structural scenarios — Guild Socialism

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-73 | Dataset closure | Run `npm run research:coverage`. | 624 questions, 208 per layer, 46 dedicated-scored targets, 56 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, and zero validation errors. |
| R-74 | Guild Socialism block | Inspect Guild Socialism in the research workbench and dataset. | Guild Socialism exposes four target-tagged prompts in every layer over `Socialism → Guild Socialism`, a source-linked provisional anchor, `dedicated-scored` status, and explicit industrial self-government, plural association, social ownership, coordination, and false-positive boundary notes. |
| R-75 | Neighbor and ontology boundary | Inspect Council Communism, Guild Socialism, Trotskyism, Marxism-Leninism, Neo-Fascism, and the ontology inventory. | Guild Socialism is distinguished from council-constitutive revolutionary organization and generic union/workplace/public-ownership signals; held alternatives remain catalog-only or high-risk; no node is added, reparented, or demoted; the 1,428 candidates remain effect-free. |
| R-76 | Anchor closure | Run `npm run research:anchor-reachability`. | All 46 production anchors have four target questions per layer and pass isolated-anchor routing; Guild Socialism closes in isolation with full ranks 12/5/5 by layer and 5 combined; full-production overlap and ranks are structural diagnostics only. |
| R-77 | Complete-run and share boundary | Complete all 624 prompts with a fixed directional response and measure the encoded fragment. | Results render 208/208/208 layer coverage; the complete answer fragment round-trips at 40,627 characters under the finite 40,960-character guard, and an oversized input remains rejected without truncation. |
## Current v25 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-78 | Load the manifest, source records, and Trotskyism target metadata. | Content version 25; 636 questions; 212 per layer; Cambridge provenance present; no validation errors. |
| R-79 | Inspect the Trotskyism direct branch and target-tagged prompts. | Existing `Socialism → Communism → Trotskyism` path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status. |
| R-80 | Run anchor coverage and isolated reachability. | 47 production anchors with 4/4/4 coverage; Trotskyism isolated in all layers; full-production diagnostic ranks 9/2/1 and 1 combined. |
| R-81 | Encode and decode a complete v25 answer map and a readable partial v1 payload. | Complete payload uses v2 at 6,838 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v26 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-82 | Load the v26 manifest, source records, and Marxism-Leninism target metadata. | Content version 26; 648 questions; 216 per layer; Cambridge/Oxford provenance present; no validation errors. |
| R-83 | Inspect the Marxism-Leninism direct branch and target-tagged prompts. | Existing `Socialism → Communism → Marxism-Leninism` path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status. |
| R-84 | Run anchor coverage and isolated reachability. | 48 production anchors with 4/4/4 coverage; Marxism-Leninism isolated in all layers; full-production diagnostic ranks 10/27/1 and 1 combined. |
| R-85 | Encode and decode a complete v26 answer map and a readable partial v1 payload. | Complete payload uses v2 at 6,966 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v27 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-86 | Load the v27 manifest, source records, and Autonomist Marxism target metadata. | Content version 27; 660 prompts; 220 per layer; 54 editorial and 49 production anchors; SAGE and Antipode provenance present; no validation errors. |
| R-87 | Inspect the Autonomist Marxism direct branch and target-tagged prompts. | Existing `Socialism → Marxism → Autonomist Marxism` path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present. |
| R-88 | Run production anchor coverage and isolated/full reachability diagnostics. | 49 production anchors with 4/4/4 coverage; Autonomist Marxism isolated in all layers; full-production ranks 10/8/2 and 1 combined; aggregate rates 37.4140% and 51.0204%, with worst ranks 46 and 43. |
| R-89 | Encode and decode a complete v27 answer map and a readable partial v1 payload. | Complete payload uses v2 at 7,094 characters because readable v1 is 42,915 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v28 structural scenarios — Anarcho-Pacifism

| ID | Scenario | Expected result |
|---|---|---|
| R-90 | Load the v28 manifest, source records, and Anarcho-Pacifism target metadata. | Content version 28; 672 prompts; 224 per layer; 55 editorial and 50 production anchors; Oxford and SAGE provenance present; no validation errors. |
| R-91 | Inspect the Anarcho-Pacifism direct branch and target-tagged prompts. | Existing `Anarchism → Social Anarchism → Anarcho-Pacifism` path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present. |
| R-92 | Run production anchor coverage and isolated/full reachability diagnostics. | 50 production anchors with 4/4/4 coverage; Anarcho-Pacifism is isolated in all layers; full-production ranks 12/5/2 and 1 combined; aggregate rates 37.3333% and 52.0000%, with worst ranks 47 and 44. |
| R-93 | Encode and decode a complete v28 answer map and a readable partial v1 payload. | Readable v1 measures 43,699 characters and exceeds the finite 40,960-character guard; complete payload uses v2 at 7,222 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v29 structural scenarios — Social Ecology

| ID | Scenario | Expected result |
|---|---|---|
| R-94 | Load the v29 manifest, source records, and Social Ecology target metadata. | Content version 29; 684 questions; 228 per layer; 56 editorial and 51 production anchors; SAGE, Frontiers, Oxford, and SEP provenance present; no validation errors. |
| R-95 | Inspect the Social Ecology direct branch and target-tagged prompts. | Existing `Green Anarchism → Social Ecology` hybrid path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present; no macro ancestry invented. |
| R-96 | Run production anchor coverage and isolated/full reachability diagnostics. | 51 production anchors with 4/4/4 coverage; Social Ecology isolated in all layers; full-production ranks 3/6/4 and 2 combined; aggregate rates 36.6013% and 52.9412%, with worst ranks 48 and 45; diagnostics are not respondent evidence. |
| R-97 | Encode and decode a complete v29 answer map and a readable partial v1 payload. | Readable v1 measures 44,451 characters and exceeds the finite 40,960-character guard; complete payload uses v2 at 7,350 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v30 structural scenarios — Womanism

| ID | Scenario | Expected result |
|---|---|---|
| R-98 | Load the v30 manifest, source records, and Womanism target metadata. | Content version 30; 696 questions; 232 per layer; 57 editorial and 52 production anchors; Oxford, Cambridge, Frontiers, Journal of Black Studies, SEP, and OUP Feminist Theory provenance present; no validation errors. |
| R-99 | Inspect the Womanism direct branch and target-tagged prompts. | Existing `Feminism → Womanism` canonical path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present; Black Feminism/Africana Womanism/womanist-theology variation remains explicit. |
| R-100 | Run production anchor coverage and isolated/full reachability diagnostics. | 52 production anchors with 4/4/4 coverage; Womanism isolated in all layers; full-production ranks 43/43/43 and 43 combined; aggregate rates 35.2564% and 51.9231%, with worst ranks 49 and 46; diagnostics are not respondent evidence. |
| R-101 | Encode and decode a complete v30 answer map and a readable partial v1 payload. | Readable v1 measures 45,107 characters and exceeds the finite 40,960-character guard; complete payload uses v2 at 7,478 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v31 structural scenarios — Classical-Liberal Feminism

| ID | Scenario | Expected result |
|---|---|---|
| R-102 | Load the v31 manifest, source records, and Classical-Liberal Feminism target metadata. | Content version 31; 708 questions; 236 per layer; 58 editorial and 53 production anchors; SEP Liberal Feminism, Baehr, SEP Libertarianism, and adjacent feminist provenance present; no validation errors. |
| R-103 | Inspect the Classical-Liberal Feminism direct branch and target-tagged prompts. | Existing `Feminism → Liberal Feminism → Classical-Liberal Feminism` canonical path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present; branch-sensitive variation and false-positive controls remain explicit. |
| R-104 | Run production anchor coverage and isolated/full reachability diagnostics. | 53 production anchors with 4/4/4 coverage; Classical-Liberal Feminism isolated in all layers; full-production ranks 45/48/4 and 45 combined; aggregate rates 36.4780% and 50.9434%, with worst ranks 50 and 46; diagnostics are not respondent evidence. |
| R-105 | Encode and decode a complete v31 answer map and a readable partial v1 payload. | Complete payload uses v2 at 7,606 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v32 structural scenarios — Anarcho-Communism

| ID | Scenario | Expected result |
|---|---|---|
| R-106 | Load the v32 manifest, source records, and Anarcho-Communism target metadata. | Content version 32; 720 questions; 240 per layer; 59 editorial and 54 production anchors; Cambridge, Edinburgh, Cornell, SEP, and Ostrom provenance present; no validation errors. |
| R-107 | Inspect the Anarcho-Communism direct branch and target-tagged prompts. | Existing `Anarchism → Social Anarchism → Anarcho-Communism` canonical path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present; Collectivist Anarchism remains catalog-only. |
| R-108 | Run production anchor coverage and isolated/full reachability diagnostics. | 54 production anchors with 4/4/4 coverage; Anarcho-Communism isolated in all layers; full-production ranks 11/3/1 and 1 combined; aggregate rates 35.8025% and 51.8519%, with worst ranks 51 and 47; diagnostics are not respondent evidence. |
| R-109 | Encode and decode a complete v32 answer map and a readable partial v1 payload. | Complete payload uses v2 at 7,734 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v33 structural scenarios — Collectivist Anarchism

| ID | Scenario | Expected result |
|---|---|---|
| R-110 | Load the v33 manifest, source records, and Collectivist Anarchism target metadata. | Content version 33; 732 questions; 244 per layer; 60 editorial and 55 production anchors; Oxford, Cambridge, SEP, Bakunin, Kropotkin, Ward, and Ostrom provenance present; no validation errors. |
| R-111 | Inspect the Collectivist Anarchism direct branch and target-tagged prompts. | Existing `Anarchism → Social Anarchism → Collectivist Anarchism` canonical path; exactly 4 descriptive, 4 normative, and 4 prescriptive prompts; dedicated-scored status; provisional anchor and direct source references present; collective ownership, anti-capital/anti-state, federated self-government, and labor-linked distribution boundary remain distinct from Anarcho-Communism. |
| R-112 | Run production anchor coverage and isolated/full reachability diagnostics. | 55 production anchors with 4/4/4 coverage; Collectivist Anarchism isolated in all layers; full-production ranks 9/5/1 and 1 combined; aggregate rates 33.3333% and 49.0909%, with worst ranks 52 and 48; diagnostics are not respondent evidence. |
| R-113 | Encode and decode a complete v33 answer map and a readable partial v1 payload. | Complete payload uses v2 at 7,862 characters; v1 remains decodable; answer semantics and fail-closed stale/malformed/duplicate/unknown/oversized checks remain intact. |

## Current v34 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-114 | Validate the v34 manifest, source provenance, and research-bank closure. | 744 prompts; 248 per layer; 61 editorial and 56 production anchors; SEP, Oxford Ward, Cambridge History of Socialism, and Ostrom provenance present; no validation errors. |
| R-115 | Inspect Anarchism macro-family direct coverage and contextual separation. | Existing canonical `Anarchism` macro has the `anarchism-family` production anchor and 4/4/4 target prompts; the existing `anarchism` bridge remains contextual-only; descendant branches remain distinct. |
| R-116 | Run production anchor coverage and isolated/full reachability diagnostics. | 56 production anchors have 4/4/4 coverage and isolated routing; Anarchism ranks 45/45/45 by layer and 45 combined; aggregate rates are 32.7381% and 48.2143%, with worst ranks 53 and 47; diagnostics are not respondent evidence. |
| R-117 | Encode and decode a complete v34 answer map and a readable partial v1 payload. | Complete payload uses v2 at 7,990 characters; v1 remains decodable; validation remains fail-closed. |

## Current v35 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-118 | Validate the v35 manifest, source provenance, and research-bank closure. | 756 prompts; 252 per layer; 62 editorial and 57 production anchors; current SEP, Oxford, and Cambridge Conservatism provenance present; no validation errors. |
| R-119 | Inspect Conservatism macro-family direct coverage and conservative-branch separation. | Existing canonical `Conservatism` macro has the `conservatism-family` production anchor and 4/4/4 target prompts; existing Conservative branch and contextual anchors remain distinct. |
| R-120 | Run production anchor coverage and isolated/full reachability diagnostics. | 57 production anchors have 4/4/4 isolated routing; Conservatism ranks 38/46/4 by layer and 18 combined; aggregate rates are 33.3333% and 49.1228%, with worst ranks 53 and 47; diagnostics are not respondent evidence. |
| R-121 | Encode and decode a complete v35 answer map and a readable partial v1 payload. | Complete payload uses v2 at 8,118 characters; v1 remains decodable; validation remains fail-closed. |

## Current v36 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-122 | Validate the v36 manifest, source provenance, and research-bank closure. | 768 prompts; 256 per layer; 63 editorial and 58 production anchors; Oxford, Cambridge, SEP, planetary-boundaries, and climate-ethics provenance present; no validation errors. |
| R-123 | Inspect Ecologism / Green Ideology macro-family direct coverage and ecological false-positive separation. | Existing canonical `Ecologism` macro has the `ecologism-family` production anchor and 4/4/4 target prompts; ecological descendants, associated traditions, and contextual anchors remain distinct. |
| R-124 | Run production anchor coverage and isolated/full reachability diagnostics. | 58 production anchors have 4/4/4 isolated routing; Ecologism ranks 21/48/3 by layer and 8 combined; aggregate rates are 33.3333% and 48.2759%, with worst ranks 54 and 48; diagnostics are not respondent evidence. |
| R-125 | Encode and decode a complete v36 answer map and a readable partial v1 payload. | Complete payload uses v2 at 8,246 characters; v1 remains decodable; validation remains fail-closed. |
## Current v37 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-37-01 | Validate the v37 manifest, source provenance, and research-bank closure. | 780 prompts; 260 per layer; 64 editorial and 59 production anchors; current SEP, Oxford, and Cambridge Liberalism provenance present; no validation errors. |
| P-37-02 | Inspect Liberalism macro-family direct coverage and branch separation. | Canonical `Liberalism` carries `liberalism-family` with 4/4/4 target prompts; Classical, Social, Libertarian, Neoliberal, Republican, feminist, nationalist, and contextual relations remain distinct. |
| P-37-03 | Run full-production reachability diagnostics. | All 59 anchors pass isolated routing; Liberalism ranks 10/24/11 by layer and 9 combined; aggregate rates are 33.3333% and 47.4576%, with worst ranks 55 and 48; diagnostics are not respondent evidence. |
| P-37-04 | Round-trip complete v37 share state and readable v1 partial state. | Complete state uses v2 at 8,374 characters; v1 decodes; validation remains fail-closed. |
## v38 QA scenarios — Socialism macro family

1. Verify the target inventory reports `socialism` as canonical, macro, `dedicated-scored`, with `socialism-family` and 4/4/4 direct question counts.
2. Verify each Socialism question carries the analytical-scope context and at least one ideology-research source reference.
3. Verify the complete answer set encodes and decodes at 8,502 characters under the finite share guard, while stale and malformed fragments remain fail-closed.
4. Verify isolated Socialism answers route to the Socialism anchor in descriptive, normative, prescriptive, and combined calculations.
5. Verify the research workbench keeps Socialism's 1,428 effect-free candidate pool and source metadata separate from production effects.
6. Verify local and Docker-backed browser suites retain the existing 10-scenario pass without exposing catalog-only or contextual-only anchors as production neighbors.

The v38 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v39 QA scenarios — Nationalism macro family

1. Confirm the Nationalism target reports canonical macro placement, `nationalism-family`, dedicated-scored status, and 4/4/4 direct coverage.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the plural Nationalism boundary.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Nationalism anchor without admitting contextual or catalog-only anchors.
4. Confirm the complete answer share fragment measures 8,630 characters and retains fail-closed stale or malformed handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 61-anchor production contract remain intact.

The v39 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v40 QA scenarios — Republicanism macro family

1. Confirm the Republicanism target reports canonical macro placement, `republicanism-family`, dedicated-scored status, and 4/4/4 direct coverage.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the distinct historical/contemporary Republicanism boundary.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Republicanism anchor without admitting contextual or catalog-only anchors.
4. Confirm the complete answer share fragment measures 8,758 characters and retains fail-closed stale or malformed handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 62-anchor production contract remain intact.

The v40 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v41 QA scenarios — Feminism macro family

1. Confirm the Feminism target reports canonical macro placement, `feminism-family`, dedicated-scored status, and 4/4/4 direct coverage.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the plural Feminism boundary.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Feminism anchor without admitting contextual or catalog-only anchors.
4. Confirm the complete answer share fragment measures 8,886 characters and retains fail-closed stale or malformed handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 63-anchor production contract remain intact.

The v41 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v42 QA scenarios — Anarcho-Syndicalism micro branch

1. Confirm the Anarcho-Syndicalism target reports canonical micro placement under Social Anarchism, `anarcho-syndicalism`, dedicated-scored status, and 4/4/4 direct coverage.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the worker-organization/direct-action/self-management boundary, with union support, anti-state sentiment, Guild Socialism, National-Syndicalism, and violence kept distinct.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Anarcho-Syndicalism anchor without admitting contextual or catalog-only anchors.
4. Confirm the complete answer share fragment measures 9,014 characters and retains fail-closed stale or malformed handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 64-anchor production contract remain intact.

The v42 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v43 QA scenarios — Anarcho-Capitalism micro branch

1. Confirm canonical `anarcho-capitalism` remains a micro node under Libertarianism and now carries its source links, anchor, dedicated-scored status, and exact 4/4/4 target prompts.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to territorial-monopoly rejection, property/contract, voluntary market coordination, exit, and polycentric institutions, with Minarchism, Right-Libertarianism, Individualist/Social Anarchism, Mutualism, and generic anti-state/private-provision responses kept distinct.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Anarcho-Capitalism anchor without admitting contextual or catalog-only anchors; record full ranks 12/1/1 and 1 combined as structural diagnostics only.
4. Confirm the complete answer share fragment measures 9,142 characters and retains v1 decoding plus fail-closed stale, malformed, duplicate, unknown, and oversized handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 65-anchor production contract remain intact.

The v43 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v44 QA scenarios — Anarcho-Primitivism micro branch

1. Confirm canonical `anarcho-primitivism` remains a micro node with its existing Green Anarchism relation and now carries its source links, anchor, dedicated-scored status, and exact 4/4/4 target prompts.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and scoped to the civilization/industrial-scale/technical-dependence, ecological-priority, and radical-decentralization boundary, with environmentalism, broad Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, and romanticized Indigenous identity kept distinct.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Anarcho-Primitivism anchor without admitting contextual or catalog-only anchors; record full ranks 9/33/1 and 1 combined as structural diagnostics only.
4. Confirm the complete answer share fragment measures 9,270 characters and retains v1 decoding plus fail-closed stale, malformed, duplicate, unknown, and oversized handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 ontology and 66-anchor production contract remain intact.

The v44 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v45 QA scenarios — Austromarxism micro branch

1. Confirm canonical `austromarxism` remains a micro node on the existing `Socialism → Marxism → Austromarxism` path and now carries its seven source links, anchor, dedicated-scored status, and exact 4/4/4 target prompts.
2. Confirm all twelve items are source-linked, layer-correct, target-tagged, and bounded around historically situated Austrian Marxist and Social Democratic analysis, class transformation, worker-movement unity, democratic institutional strategy, and personal or non-territorial national autonomy; keep generic Marxism, Social Democracy, Austrian identity, nationalism, multiculturalism, national autonomy alone, generic parliamentary reform, Marxism-Leninism, Communism, one regime, and one theorist distinct.
3. Confirm isolated descriptive, normative, prescriptive, and combined fixtures reach the Austromarxism anchor without admitting contextual or catalog-only anchors; record full ranks 8/5/2 and 2 combined as structural diagnostics only.
4. Confirm the complete answer share fragment measures 9,398 characters and retains v1 decoding plus fail-closed stale, malformed, duplicate, unknown, and oversized handling.
5. Confirm local and Docker-backed Playwright suites remain 10/10, `/healthz` is healthy, and the 9/33/60 canonical inventory, 107-node ontology, and 67-anchor production contract remain intact.

The v45 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v46 QA scenarios — Egalitarian-Liberal Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-46-01 | Inspect Egalitarian-Liberal Feminism target metadata and direct coverage. | Canonical `egalitarian-liberal-feminism` remains on `Liberal Feminism → Egalitarian-Liberal Feminism`, carries its fresh source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-46-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against formal equality or generic liberalism alone, Classical-Liberal Feminism, Social Liberalism, Socialist / Marxist / Materialist Feminism, Radical Feminism, public provision alone, and one-author inference. |
| P-46-03 | Run isolated and full-production reachability diagnostics. | Egalitarian-Liberal Feminism routes in all three isolated layers and the combined calculation; full-production ranks 54/57/2 and 53 combined are recorded as design diagnostics only. |
| P-46-04 | Round-trip complete v46 share state and stale/malformed fragments. | Complete state uses v2 at 9,526 characters; v1 decodes; validation remains fail-closed. |
| P-46-05 | Run local and Docker-backed browser delivery checks. | Both Playwright suites remain 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v46 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v47 QA scenarios — Buddhist Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-47-01 | Inspect Buddhist Nationalism target metadata and direct coverage. | Canonical `buddhist-nationalism` remains a micro under `Religious Nationalism`, carries its seven source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-47-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, nationalism without Buddhist-national translation, one jurisdiction, one monk, one minority conflict, one constitutional model, and one party. |
| P-47-03 | Run isolated and full-production reachability diagnostics. | Buddhist Nationalism routes in all three isolated layers and the combined calculation; full-production ranks 18/43/17 and 22 combined are recorded as design diagnostics only. |
| P-47-04 | Round-trip complete v47 share state and stale/malformed fragments. | Complete state uses v2 at 9,654 characters; v1 decodes; validation remains fail-closed. |
| P-47-05 | Run local and Docker-backed browser delivery checks. | Both Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v47 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v48 QA scenarios — Cultural / Spiritual Ecofeminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-48-01 | Inspect the Cultural / Spiritual Ecofeminism target metadata and direct coverage. | Canonical `cultural-spiritual-ecofeminism` remains a micro under `Ecofeminism`, carries the seven source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-48-02 | Inspect item-layer and boundary metadata. | Every direct item carries the branch context and source links; the block distinguishes ecological-gendered relational analysis from private spirituality, identity, environmental concern, essentialism, generic Ecofeminism, and materialist/socialist variants. |
| P-48-03 | Run isolated and full-production reachability diagnostics. | The branch routes in all three isolated layers; full-production ranks 13/10/8 and 6 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-48-04 | Round-trip complete v48 share state and stale/malformed fragments. | Complete state uses v2 at 9,782 characters; v1 decodes; validation remains fail-closed. |
| P-48-05 | Run local and Docker-backed browser delivery checks. | Both Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v48 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v49 QA scenarios — Materialist / Socialist Ecofeminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-49-01 | Inspect Materialist / Socialist Ecofeminism target metadata and direct coverage. | Canonical `materialist-socialist-ecofeminism` remains a micro under `Ecofeminism`, carries its eight source links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-49-02 | Inspect item-layer and boundary metadata. | Every direct item carries the branch context and source links; the block distinguishes material capitalist/patriarchal production-reproduction-ecology analysis from green policy, feminism, socialism, welfare, public ownership, generic Eco-socialism, Materialist Feminism without ecology, and Cultural / Spiritual Ecofeminism's cultural/spiritual mechanism. |
| P-49-03 | Run isolated and full-production reachability diagnostics. | The branch routes in all three isolated layers and the combined calculation; full-production ranks 2/1/2 and 1 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-49-04 | Round-trip complete v49 share state and stale/malformed fragments. | Complete state uses v2 at 9,910 characters; v1 decodes; validation remains fail-closed. |
| P-49-05 | Run local and Docker-backed browser delivery checks. | Both Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v49 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v50 QA scenarios — Christian Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-50-01 | Inspect Christian Nationalism target metadata and direct coverage. | Canonical `christian-nationalism` remains a micro under `Religious Nationalism`, carries the three fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-50-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against private faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, generic Religious Nationalism, one party, one actor, one country, and one policy. |
| P-50-03 | Run isolated and full-production reachability diagnostics. | Christian Nationalism routes in all three isolated layers and the combined calculation; full-production ranks 8/47/1 and 2 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-50-04 | Round-trip complete v50 share state and stale/malformed fragments. | Complete state uses v2 at 10,038 characters; v1 decodes; validation remains fail-closed. |
| P-50-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v50 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v52 QA scenarios — Cultural Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-52-01 | Inspect Cultural Feminism target metadata and direct coverage. | Canonical `cultural-feminism` remains a micro under `Radical Feminism`, carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-52-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against gender identity, care preference/work, feminist identity, one anti-essentialist statement, generic feminism, Radical, Materialist, Lesbian, and Ecofeminist mechanisms, one author, one community, and one policy. |
| P-52-03 | Run isolated and full-production reachability diagnostics. | Cultural Feminism routes in all three isolated layers; full-production ranks 12/32/16 and 11 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-52-04 | Round-trip complete v52 share state and stale/malformed fragments. | Complete state uses v2 at 10,294 characters; v1 decodes; validation remains fail-closed. |
| P-52-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v52 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v51 QA scenarios — Egoist Anarchism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-51-01 | Inspect Egoist Anarchism target metadata and direct coverage. | Canonical `egoist-anarchism` remains a micro under `Individualist Anarchism`, carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-51-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, and one interpretation of Stirner. |
| P-51-03 | Run isolated and full-production reachability diagnostics. | Egoist Anarchism routes in all three isolated layers and the combined calculation; full-production ranks 27/6/1 and 1 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-51-04 | Round-trip complete v51 share state and stale/malformed fragments. | Complete state uses v2 at 10,166 characters; v1 decodes; validation remains fail-closed. |
| P-51-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v51 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v53 QA scenarios — Cultural Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-53-01 | Inspect Cultural Nationalism target metadata and direct coverage. | Canonical 'cultural-nationalism' remains a micro under 'Nationalism', carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-53-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, ethnocultural inherited membership, religious nationalism, anti-colonial domination, one state/party/heritage policy, fixed cultural homogeneity, and one author. |
| P-53-03 | Run isolated and full-production reachability diagnostics. | Cultural Nationalism routes in all three isolated layers; full-production ranks 16/38/17 and 19 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-53-04 | Round-trip complete v53 share state and stale/malformed fragments. | Complete state uses v2 at 10,422 characters; v1 decodes; validation remains fail-closed. |
| P-53-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v53 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v54 QA scenarios — Ethnocultural Nationalism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-54-01 | Inspect Ethnocultural Nationalism target metadata and direct coverage. | Canonical `ethnocultural-nationalism` remains a micro under `Nationalism`, carries the five fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-54-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, and generic Nationalism; Cultural, Civic, Religious, Anti-Colonial, and racialized boundaries remain explicit. |
| P-54-03 | Run isolated and full-production reachability diagnostics. | Ethnocultural Nationalism routes in all three isolated layers; full-production ranks 15/28/1 and 3 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-54-04 | Round-trip complete v54 share state and stale/malformed fragments. | Complete state uses v2 at 10,550 characters; v1 decodes; validation remains fail-closed. |
| P-54-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available, and contextual/catalog-only anchors remain excluded from production scoring. |

The v54 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v55 QA scenarios — Lesbian Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-55-01 | Inspect Lesbian Feminism target metadata and direct coverage. | Canonical `lesbian-feminism` remains a micro under `Feminism`, carries the four fresh research sources plus adjacent provenance links and anchor, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-55-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against identity, orientation, relationship status, feminist identity, sexuality-rights support, anti-men sentiment, generic feminist strands, one separatist formation, one author, and one policy; coalition, separatist, trans, queer, bisexual, racial, class, disability, religious, historical, and contemporary variation remains explicit. |
| P-55-03 | Run isolated and full-production reachability diagnostics. | Lesbian Feminism routes in all three isolated layers; full-production ranks 3/16/10 and 4 combined are recorded as design diagnostics only, with no arbitrary scorer or picker retuning. |
| P-55-04 | Round-trip complete v55 share state and stale/malformed fragments. | Complete state uses v2 at 10,678 characters; v1 decodes; validation remains fail-closed. |
| P-55-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes the new dedicated-scored target, health is available after bounded startup retry, and contextual/catalog-only anchors remain excluded from production scoring. |

The v55 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.

## v56 QA scenarios — One-Nation Conservatism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-56-01 | Inspect One-Nation Conservatism target metadata and direct coverage. | The existing canonical micro node remains on `Conservatism → Moderate Conservatism`, carries the four fresh academic sources plus existing context, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-56-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against patriotism, welfare support, tradition, party affiliation, one leader, one policy, generic Conservatism, National Conservatism, and Social Democracy; historical and contemporary variation remains explicit. |
| P-56-03 | Run coverage and reachability checks. | Coverage is zero-error at 1,008/336/336; One-Nation Conservatism is isolated-reachable in all three layers; full ranks 15/30/1 and 5 combined are recorded only as overlap diagnostics. |
| P-56-04 | Round-trip complete v56 share state and stale/malformed fragments. | Complete state uses v2 at 10,817 characters; v1 decodes; validation remains fail-closed. |
| P-56-05 | Run local and Docker-backed browser delivery checks. | Both serial Playwright suites are 10/10, the research workbench exposes One-Nation Conservatism as dedicated and scored, the stale catalog-only assertion is absent, health is available after bounded startup verification, and catalog-only/contextual anchors remain excluded from production scoring. |

The v56 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.
+
## v58 QA scenarios — Khomeinism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-58-01 | Inspect Khomeinism target metadata and direct coverage. | Existing canonical `khomeinism` remains a micro under `Islamism`, carries the Abrahamian, Arjomand, Namazi, Hossainzadeh/Travers, Ghobadzadeh, and adjacent sources, has dedicated-scored status, and has exact 4/4/4 target prompts. |
| P-58-02 | Inspect source links, context, and branch separation. | All twelve items are layer-correct, source-linked, target-tagged, and bounded against Shi'i identity, private faith, generic Islamism, anti-imperialism, social-justice concern, opposition to monarchy, present Iranian policy opinion, one leader, and operational militancy; pre/post-revolutionary, constitutional/authoritarian, populist/clerical, national/transnational, and contested-theological variation remains explicit. |
| P-58-03 | Run coverage and reachability checks. | Coverage is zero-error at 1,032/344/344; Khomeinism is isolated-reachable in all three layers; full ranks 4/31/1 and 1 combined are recorded only as overlap diagnostics. |
| P-58-04 | Verify share and stale-fragment behavior. | Complete state uses v2 at 11,105 characters; v1 decodes; validation remains fail-closed. |
| P-58-05 | Verify browser and container delivery. | Local and Docker-backed serial Playwright are 10/10, the research workbench exposes Khomeinism as dedicated and scored, `/healthz` returns `ok`, and catalog-only/contextual targets remain excluded from production scoring. |

The v58 QA pass is structural and behavioral delivery verification. It does not replace cognitive review or later respondent/empirical validation.


## v59 QA scenarios — Qutbism micro branch

| ID | Area | Scenario | Expected evidence |
|---|---|---|---|
| P-59-01 | Sources and ontology | Inspect Qutbism sources, path, and metadata. | Existing `Islamism → Qutbism` canonical path; seven source references; four neighbor discriminants; no node added or reparented. |
| P-59-02 | Direct coverage | Inspect the production block and manifest. | Twelve target-tagged prompts at 4/4/4, one provisional anchor, content version 59, and 1,044 total prompts at 348 per layer. |
| P-59-03 | Reachability | Run research coverage and anchor reachability. | Zero errors/failures; isolated reachability in all three layers; ranks 3/48/3 and 10 combined remain diagnostics only. |
| P-59-04 | Status separation | Inspect the workbench and taxonomy governance note. | Workbench shows dedicated and scored; governance independently shows promote-to-canonical/catalog-only. |
| P-59-05 | Delivery | Run unit/type/build/audit and local/Docker browser checks. | 77/77 tests, zero high-severity audit findings, healthy `/healthz`, and Playwright 10/10 locally and against Docker. |
| P-59-06 | Evidence boundary | Inspect reports and candidates. | Candidates remain effect-free; no cognitive, respondent, simulation, psychometric, reliability/validity, invariance, empirical, or population evidence is claimed. |

## v60 QA scenarios — Radical Republicanism micro branch

| ID | Area | Scenario | Expected evidence |
|---|---|---|---|
| P-60-01 | Sources and ontology | Inspect Radical Republicanism sources, path, and metadata. | Existing `Republicanism → Historical Republicanism → Radical Republicanism` path; seven source references; two neighbor discriminants; no node added or reparented. |
| P-60-02 | Direct coverage | Inspect the production block and manifest. | Twelve target-tagged prompts at 4/4/4, one provisional anchor, content version 60, and 1,056 total prompts at 352 per layer. |
| P-60-03 | Reachability | Run coverage and anchor reachability. | Zero errors/failures; isolated routing in all three layers; full ranks 10/8/6 and 4 combined, aggregate rates 25.2033% and 41.4634%, and worst ranks 78 and 72 are diagnostics only. |
| P-60-04 | Status separation | Inspect the workbench and taxonomy governance note. | Workbench shows dedicated and scored; governance independently shows retain-canonical with `scored-provisional`. |
| P-60-05 | Delivery | Run unit/type/build/audit and local/Docker browser checks. | 77/77 tests, zero high-severity audit findings, healthy `/healthz`, and Playwright 10/10 locally and against Docker. |
| P-60-06 | Evidence boundary | Inspect reports, candidates, and unanswered queue. | Candidates remain effect-free; twenty canonical targets remain catalog-only; no cognitive, respondent, simulation, psychometric, reliability/validity, invariance, empirical, or population evidence is claimed. |

## v61 QA scenarios — Marxist Feminism micro branch

| ID | Scenario | Expected evidence |
|---|---|---|
| P-61-01 | Inspect source and ontology metadata. | Existing `Socialist / Marxist Feminism → Marxist Feminism` path, eight direct sources, no topology change, and the plural class-gender/production-reproduction boundary. |
| P-61-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 61, 1,068 total prompts at 356 per layer, and 83 production anchors. |
| P-61-03 | Run coverage/reachability. | Zero validation/failure output; isolated 4/4/4 routing; Marxist Feminism ranks 3/15/2 and 1 combined; aggregate rates 25.3012% and 42.1687% and worst ranks 79 and 73 are diagnostics only. |
| P-61-04 | Inspect governance versus workbench. | Workbench shows dedicated and scored; governance independently shows retain-canonical with `scored-provisional`. |
| P-61-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, share round-trip at 11,537 characters, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## v62 QA scenarios — Socialist Feminism micro branch

| ID | Scenario | Expected result |
|---|---|---|
| P-62-01 | Inspect source and ontology metadata. | Existing `Socialist / Marxist Feminism → Socialist Feminism` path, seven direct sources including three fresh academic records, two discriminants, and no topology change. |
| P-62-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 62, 1,080 total prompts at 360 per layer, and 84 production anchors. |
| P-62-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 2/70/65 and 1 combined, aggregate rates 24.2063% and 41.6667%, and worst ranks 80 and 73 are diagnostics only. |
| P-62-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-62-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,681-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## v63 QA scenarios — Left-Wing Populism micro branch

| ID | Scenario | Expected result |
|---|---|---|
| P-63-01 | Inspect source and ontology metadata. | Existing `Populism → Left-Wing Populism` path, five direct sources including two fresh academic records, two discriminants, and no topology change. |
| P-63-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 63, 1,092 total prompts at 364 per layer, and 85 production anchors. |
| P-63-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 9/27/16 and 10 combined, aggregate rates 23.1373% and 41.1765%, and worst ranks 81 and 74 are diagnostics only. |
| P-63-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-63-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,825-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## v64 QA scenarios — Neoconservatism micro branch

| ID | Scenario | Expected result |
|---|---|---|
| P-64-01 | Inspect source and ontology metadata. | Existing `Conservatism → Neoconservatism` path, five direct sources including two fresh academic records, two discriminants, and no topology change. |
| P-64-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 64, 1,104 total prompts at 368 per layer, and 86 production anchors. |
| P-64-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 27/28/5 and 7 combined, aggregate rates 23.2558% and 40.6977%, and worst ranks 82 and 75 are diagnostics only. |
| P-64-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-64-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 11,969-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |
## v65 QA scenarios — Paleoconservatism micro branch

| ID | Scenario | Expected result |
|---|---|---|
| P-65-01 | Inspect source and ontology metadata. | Existing Conservatism → Paleoconservatism path, five direct sources including two fresh academic records plus the existing Dougall source, two discriminants, and no topology change. |
| P-65-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 65, 1,116 total prompts at 372 per layer, and 87 production anchors. |
| P-65-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 12/48/1 and 6 combined, aggregate rates 23.7548% and 40.2299%, and worst ranks 83 and 76 are diagnostics only. |
| P-65-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-65-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 12,113-character share round-trip, build/audit, healthy /healthz, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## v66 QA scenarios — Wasatiyya micro branch

| ID | Action | Expected evidence |
|---|---|---|
| P-66-01 | Inspect source and ontology metadata. | Existing Islamism → Wasatiyya path, five direct source references including three fresh academic records, two discriminants, and no topology change. |
| P-66-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 66, 1,128 total prompts at 376 per layer, and 88 production anchors. |
| P-66-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 26/30/32 and 28 combined, aggregate rates 22.3485% and 39.7727%, and worst ranks 84 and 77 are diagnostics only. |
| P-66-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-66-05 | Run delivery/evidence checks. | TypeScript, 77/77 tests, 12,257-character share round-trip, build/audit, healthy /healthz, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## v67 QA scenarios — Right-Wing Populism micro branch

| ID | Action | Expected evidence |
|---|---|---|
| P-67-01 | Inspect source and ontology metadata. | Existing Populism → Right-Wing Populism path, five direct source references including two fresh academic records, two discriminants, a profile, and no topology change. |
| P-67-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 67, 1,140 total prompts at 380 per layer, and 89 production anchors. |
| P-67-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 8/21/3 and 4 combined, aggregate rates 22.0974% and 38.2022%, and worst ranks 85 and 78 are diagnostics only. |
| P-67-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-67-05 | Run delivery/evidence checks. | TypeScript, 78/78 tests, 12,401-character share round-trip, build/audit, healthy /healthz, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |
## v68 QA scenarios — Hindutva micro branch

| ID | Action | Expected evidence |
|---|---|---|
| P-68-01 | Inspect source and ontology metadata. | Existing `Religious Nationalism → Hindutva (Hindu Nationalism)` path, six direct source references including three fresh academic records, two discriminants, a profile, and no topology change. |
| P-68-02 | Inspect production block. | Twelve prompts at 4/4/4, one provisional anchor, version 68, 1,152 total prompts at 384 per layer, and 90 production anchors. |
| P-68-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 10/81/3 and 6 combined, aggregate rates 21.8519% and 38.8889%, and worst ranks 85 and 78 are diagnostics only. |
| P-68-04 | Inspect governance versus workbench. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states. |
| P-68-05 | Run delivery/evidence checks. | TypeScript, 79/79 tests, 12,545-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |


## V69 QA scenarios — Religious Zionism micro branch

| ID | Action | Expected result |
| --- | --- | --- |
| P-69-01 | Select Religious Zionism in the research workbench. | The existing Religious Nationalism → Religious Zionism breadcrumb renders; status is dedicated and scored; twelve research-bank items are visible. |
| P-69-02 | Inspect the direct item block and source records. | Twelve target-tagged prompts appear at 4/4/4, each with the Religious Zionism analytical context and the four fresh academic source records. |
| P-69-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 74/84/17 and 24 combined, aggregate rates 22.3443% and 39.5604%, and worst ranks 86 and 79 are diagnostics only. |
| P-69-04 | Inspect taxonomy and false-positive metadata. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states; the audit guards identity, private faith, broad Zionism, current policy, and current-conflict inference. |
| P-69-05 | Run delivery/evidence checks. | TypeScript, 80/80 tests, 12,689-character share round-trip, build/audit, healthy `/healthz`, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

| P-70-01 | Select Neo-Fascism in the research workbench. | The existing Fascism → Neo-Fascism breadcrumb renders; status is dedicated and scored; twelve research-bank items are visible. |
| P-70-02 | Inspect the direct item block and source records. | Twelve target-tagged prompts appear at 4/4/4, each with the Neo-Fascism analytical context and the four fresh academic source records. |
| P-70-03 | Run coverage/reachability. | Zero errors/failures; isolated routing in all layers; ranks 3/1/1 and 1 combined, aggregate rates 21.7391% and 38.0435%, and worst ranks 87 and 80 are diagnostics only. |
| P-70-04 | Inspect taxonomy and false-positive metadata. | Governance shows retain-canonical/scored-provisional and the workbench shows dedicated-and-scored as separate states; generic nationalism, authoritarianism, anti-communism, symbols, actors, nostalgia, and operational content are not sufficient. |
| P-70-05 | Run delivery/evidence checks. | TypeScript, 81/81 tests, 12,833-character share round-trip, build/audit, healthy /healthz, and Playwright 10/10 locally and against Docker; no cognitive/respondent/empirical claim. |

## V89 QA scenarios — Bioregionalism ecological microtype

| ID | Action | Expected evidence |
|---|---|---|
| P-89-01 | Run research coverage and dataset validation. | 1,404 prompts at 468 per layer; 116 editorial anchors; 111 production anchors; 116 ontology nodes with canonical inventory 9/33/69; 3 registry entries; 1,428 candidates across 119 targets; zero validation errors. |
| P-89-02 | Inspect the Bioregionalism target. | Canonical `Ecologism / Green Ideology → Bioregionalism` micro path; dedicated-scored state; 12 direct items at 4/4/4; seven direct source references; three neighbors; seven-dimension profile; false-positive audit; and promote-to-canonical governance. |
| P-89-03 | Run isolated anchor reachability and full fixture diagnostics. | Bioregionalism reaches every layer in an isolated-anchor fixture; the combined top-three diagnostic omits all three layers; full-production output remains deterministic geometry evidence only, with no uncalibrated retuning. |
| P-89-04 | Run complete-answer share round trip. | Versioned v2 fragment measures 15,569 characters, remains below the finite limit, and decodes to the complete answer map. |
| P-89-05 | Run delivery and browser checks. | TypeScript, Vitest 99/99, build, high-severity audit, coverage, reachability, Compose/Docker, `/healthz`, and serial local/Docker Playwright suites pass; no cognitive, respondent, psychometric, or empirical claim. |

## V98 — Gandhian Political Thought contextual research tranche

| ID | Scenario | Expected result |
|---|---|---|
| P-98-01 | Run the research coverage inventory after adding Gandhian Political Thought. | Production remains content version 94 with 1,464 prompts and 116 production anchors; editorial inventory reports 122 nodes, 9 macro / 44 total meso / 69 micro placements, six contextual placements, three registry entries, 125 targets, and 1,500 candidates with zero validation errors. |
| P-98-02 | Select `gandhian-political-thought` in the research workbench. | The target is visibly `contextual, not scored`, has no canonical path or direct production questions, exposes exactly twelve quarantined candidates at 4/4/4, and shows its source-backed boundary and neighbors. |
| P-98-03 | Run anchor reachability and inspect the target's score surface. | Gandhian Political Thought has no production anchor, is absent from dedicated-scored reachability, contributes no score effect, and does not alter layer or combined results. |
| P-98-04 | Run source, governance, profile, neighbor, and false-positive regression assertions. | All twelve candidates carry the source-backed provenance required by the tranche; the anchor profile remains intentionally dimensionless; six discriminants, the contextual coverage summary, and retain-contextual / not-scored governance remain present. |
| P-98-05 | Run the complete deterministic and delivery gate set. | Focused and full Vitest, TypeScript, build, audit, coverage, reachability, Compose/Docker, health, and browser checks report their actual PASS/FAIL/NOT RUN state. No cognitive review, respondent study, psychometric validation, or empirical classification is substituted or implied. |
