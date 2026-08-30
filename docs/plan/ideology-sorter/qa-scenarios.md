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

## V104 — Market Socialism contextual research tranche

| ID | Scenario | Expected result |
|---|---|---|
| P-104-01 | Run the research coverage inventory after refreshing Market Socialism. | Production remains at 1,500 questions with 500 per layer, 119 production anchors, and 124 editorial anchors; the ontology remains at 125 nodes with 119 canonical/scored and six contextual/catalog-only placements, two registry entries, 127 research targets, 1,524 candidates, and zero validation errors. |
| P-104-02 | Select `market-socialism-context` in the research workbench. | The target is visibly contextual-only and not-scored, has no canonical path or direct production questions, exposes twelve quarantined candidates at 4/4/4, and shows the source-backed family boundary, four qualitative commitments, and neighbor controls. |
| P-104-03 | Inspect the Market Socialism profile and governance decision. | `social-control-with-market-coordination` is normative/defining and `democratic-investment-and-workplace-control` is prescriptive/characteristic; governance records retain-contextual/not-scored dated 2026-08-30; no production anchor or score effect exists. |
| P-104-04 | Run source and false-positive regression assertions. | All target candidates and profile dimensions retain valid ideology-research provenance; source records for Miller and Neuhäuser resolve; market support, public ownership, workplace democracy, opposition to capitalism, and one institutional design are not sufficient alone. |
| P-104-05 | Run deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, audit, coverage, reachability, belief audits, preview/browser checks, and Git checks report their actual PASS/FAIL/NOT RUN state. No cognitive review, respondent study, psychometric validation, empirical classification, or current-actor inference is substituted or implied. |

## V105 — Civic Republicanism registry conception tranche

| ID | Scenario | Expected result |
|---|---|---|
| P-105-01 | Run the research coverage inventory after enriching Civic Republicanism. | Production remains at 1,500 questions with 500 per layer, 119 production anchors, and 124 editorial anchors; the ontology remains at 125 nodes with 119 canonical/scored and six contextual/catalog-only placements, two registry entries, 127 research targets, 1,524 candidates, and zero validation errors. |
| P-105-02 | Select `civic-republicanism` in the research workbench. | The target is visibly registry-only and not-scored, has no canonical path or direct production questions, exposes twelve quarantined candidates at 4/4/4, and shows its historical/contemporary bridge boundary and source-backed profile. |
| P-105-03 | Inspect the Civic Republicanism qualitative conceptions. | `civic-freedom-through-non-domination` is normative/defining and `virtue-and-participatory-maintenance` is prescriptive/characteristic; all conception source IDs resolve; no production anchor or score effect exists. |
| P-105-04 | Inspect governance and false-positive controls. | The existing `taxonomy-civic-republicanism-retain-registry` decision remains `retain-registry-only` / `not-scored`; generic democracy, patriotism, participation, anti-corruption, and non-domination alone do not establish the registry label. |
| P-105-05 | Run deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, audit, coverage, reachability, belief audits, preview/browser checks, and Git checks report their actual PASS/FAIL/NOT RUN state. No cognitive review, respondent study, psychometric validation, empirical classification, or current-actor inference is substituted or implied. |

## V106 — Conservative New Right registry conception tranche

| ID | Scenario | Expected result |
|---|---|---|
| P-106-01 | Run the research coverage inventory after enriching Conservative New Right. | Production remains at 1,500 questions with 500 per layer, 119 production anchors, and 124 editorial anchors; the ontology remains at 125 nodes with 119 canonical/scored and six contextual/catalog-only placements, two registry entries, 127 research targets, 1,524 candidates, and zero validation errors. |
| P-106-02 | Select `conservative-new-right` in the research workbench. | The target is visibly registry-only and not-scored, has no canonical path or direct production questions, exposes twelve quarantined candidates at 4/4/4, and shows its heterogeneous Anglo-American/European boundary and source-backed profile. |
| P-106-03 | Inspect the Conservative New Right qualitative conceptions. | `cultural-continuity-and-particularism` is normative/contested and `metapolitical-cultural-work` is prescriptive/characteristic; all conception source IDs resolve; no production anchor or score effect exists. |
| P-106-04 | Inspect governance and false-positive controls. | The existing `taxonomy-conservative-new-right-retain-registry` decision remains `retain-registry-only` / `not-scored`; cultural continuity, national or civilizational language, market preference, anti-elite sentiment, or metapolitical activity alone do not establish the registry label. |
| P-106-05 | Run deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, audit, coverage, reachability, belief audits, preview/browser checks, and Git checks report their actual PASS/FAIL/NOT RUN state. No cognitive review, respondent study, psychometric validation, empirical classification, or current-actor inference is substituted or implied. |

## V107 — Anarchism contextual conception tranche

| ID | Scenario | Expected result |
|---|---|---|
| P-107-01 | Run the research coverage inventory after enriching Anarchism context. | Production remains at 1,500 questions with 500 per layer, 119 production anchors, and 124 editorial anchors; the ontology remains at 125 nodes with the existing contextual/catalog-only placements, two registry entries, 127 research targets, 1,524 candidates, and zero validation errors. |
| P-107-02 | Select `anarchism-context` in the research workbench. | The target remains linked to the existing `anarchism` family anchor, contextual-only, not-scored, without a canonical path or direct production questions; its twelve candidates remain quarantined at 4/4/4. |
| P-107-03 | Inspect the Anarchism qualitative conceptions. | `anti-hierarchical-freedom` is normative/defining and `voluntary-federated-self-government` is prescriptive/characteristic; every conception source ID resolves, and the records are visibly qualitative rather than respondent measurements. |
| P-107-04 | Inspect governance and false-positive controls. | The contextual disposition remains retained and non-scored; anti-government feeling, privacy, localism, personal independence, market exchange, cooperation, decentralization, or one anti-authority response alone does not establish the family context or any narrower branch. |
| P-107-05 | Run deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, audit, coverage, reachability, belief audits, preview/browser checks, and Git checks report their actual PASS/FAIL/NOT RUN state. No cognitive review, respondent study, psychometric validation, empirical classification, or current-actor inference is substituted or implied. |

## V108 — Integrated belief-structure trace

| ID | Scenario | Expected result |
|---|---|---|
| P-108-01 | Complete the base quiz and open the results view. | The primary result shows an integrated belief-structure trace with eleven dimensions before facet evidence and named morphology. |
| P-108-02 | Inspect the structure evidence postures. | Answered base-quiz evidence remains `facet-proxy`; priorities/conflicts, epistemic stance, and heterodoxy/contestation remain visibly unmeasured; unanswered and `no-view` records do not count as observed structure. |
| P-108-03 | Select direct categorical and relational follow-up options. | The corresponding dimensions show `categorical-pilot`, `explicit-relational`, or `mixed-provisional` evidence while preserving option text, attached question ids, and provenance without changing affinity weights or legacy compatibility output. |
| P-108-04 | Run structure and morphology adversarial fixtures. | The integrated trace covers every registered construct, distinguishes evidence forms, retains same-values/different-causal-belief and priority/conditional fixtures, and keeps morphology fail-closed for weak or all-mixed profiles. |
| P-108-05 | Run deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, belief audits, coverage, reachability, preview/browser checks, and Git checks report their actual PASS/FAIL/NOT RUN state. The six required external validation gates remain explicitly `NOT RUN` until study evidence is recorded. |

## V109 — Morphology basis provenance

| ID | Scenario | Expected result |
|---|---|---|
| P-109-01 | Complete the base quiz and open a morphology evidence trail. | Each directional commitment record identifies the primary profile dimension(s) that contextualize its construct and the evidence form used for its provisional fit. |
| P-109-02 | Inspect a facet-backed commitment. | The record reports `facet-proxy` (or the applicable observed item posture), retains its answered question ids, and does not imply that the facet is a validated latent trait. |
| P-109-03 | Inspect an explicit source-backed conception. | The record remains `indeterminate` with `none` as its fit source and states that it is configuration context only; it does not contribute to directional agreement or affinity. |
| P-109-04 | Select direct categorical and relational follow-up options. | Those records remain in their separate direct/relational evidence sections and do not alter the morphology basis, affinity output, or legacy compatibility calculation. |
| P-109-05 | Run the focused results scenario and completion audit. | Browser assertions for fit source and primary profile dimensions pass; structural checks pass; the six required external validation gates remain `NOT RUN`. |

## V110 — Claim-layer preservation

| ID | Scenario | Expected result |
|---|---|---|
| P-110-01 | Complete the base quiz and inspect an integrated structure row. | The row reports observed and directional item-record counts separately for descriptive, normative, and prescriptive claim layers; the counts reconcile to the row totals. |
| P-110-02 | Select a relational follow-up from a known layer. | The generated profile evidence and morphology trace retain that follow-up layer, and the results view labels it accordingly. |
| P-110-03 | Submit a relational record whose layer disagrees with its referenced follow-up. | Validation rejects the record with a layer-mismatch error; the invalid optional collection is withheld rather than silently relabeled. |
| P-110-04 | Inspect direct categorical and relational evidence beside morphology. | Direct and relational records show their claim layer and remain contextual evidence; they do not enter morphology affinity or legacy compatibility scoring. |
| P-110-05 | Run deterministic and focused browser checks. | TypeScript, focused/full Vitest, build, belief audits, completion structural checks, and the post-change focused results scenario report their actual status; the six external gates remain `NOT RUN`. |

## V111 — Explicit relationship participant trace

| ID | Scenario | Expected result |
|---|---|---|
| P-111-01 | Select the direct categorical pilot and inspect the integrated structure. | A multi-construct direct record appears in every declared participant dimension, with no new scalar signal or affinity contribution. |
| P-111-02 | Select the priority, conditional, conflict, uncertainty, contradiction, and contestation follow-ups. | Each explicit relational record appears in every profile dimension named by its construct links; the dedicated relationship kind and claim layer remain visible. |
| P-111-03 | Open a morphology evidence trail with direct or relational records present. | Contextual basis records expose their linked primary profile dimensions, while fit basis, weights, legacy layers, and affinities remain unchanged. |
| P-111-04 | Run the completion audit's relationship trace checks. | Every declared direct/relational construct participant is attached to a corresponding structure dimension; structural checks pass without promoting the records to measurements. |
| P-111-05 | Run deterministic and focused browser checks. | TypeScript, focused/full Vitest, build, belief audits, completion structural checks, and the focused results scenario report actual status; the six external gates remain `NOT RUN`. |

## V112 — Relational dimension adjacency trace

| ID | Scenario | Expected result |
|---|---|---|
| P-112-01 | Submit one or more relational follow-up selections and inspect the structure rows. | Dimensions connected by the selected records display explicit relationship links to the other participant dimensions. |
| P-112-02 | Inspect a dimension with no accepted relational evidence. | Its adjacency list remains empty and the UI does not imply that an unobserved relationship is absent from political theory. |
| P-112-03 | Compare the same base answers with and without relational selections. | Scalar observations, construct signals, morphology fit basis, legacy scoring, and affinity output are unchanged; only explicit relationship trace metadata changes. |
| P-112-04 | Run the completion audit's adjacency check. | Every derived related-dimension link corresponds to a shared explicit relational record, contains no self-link, and is complete for all declared participants. |
| P-112-05 | Run deterministic and full browser checks. | TypeScript, focused/full Vitest, build, belief audits, completion structural checks, exploratory QA, and the 10-scenario Playwright suite report actual status; the six external gates remain `NOT RUN`. |

## V109 — Green Politics contextual conception tranche

| ID | Scenario | Expected result |
|---|---|---|
| R-109-01 | Inspect the `green-politics` research target. | The target remains a meso contextual/catalog-only node with twelve quarantined candidates at 4/4/4, zero direct production questions, and no score path. |
| R-109-02 | Inspect the Green Politics qualitative profile. | The workbench exposes `ecological-justice-and-future-standing` as a normative characteristic conception and `participatory-multilevel-ecological-governance` as a prescriptive characteristic conception; every provenance id resolves to the source registry. |
| R-109-03 | Run coverage and governance audits. | Coverage reports the conception bridge without changing production question, anchor, coefficient, picker, or morphology counts; taxonomy governance remains `retain-contextual` / `not-scored`; false-positive and neighbor controls remain present. |
| R-109-04 | Run the full deterministic and delivery checks. | Focused/full Vitest, TypeScript, build, research coverage, reachability, belief audits, preview/browser checks, and Git checks report actual statuses. The six required external validation gates remain explicitly `NOT RUN`; no cognitive review or substitute is inferred from local QA. |

## V110 — Contextual bridge conception and quarantine coverage

| ID | Scenario | Expected result |
|---|---|---|
| R-110-01 | Inspect `green-communitarianism` and `liberal-conservatism-context` in the research workbench. | Each target remains a meso contextual/catalog-only node with twelve quarantined candidates at descriptive/normative/prescriptive 4/4/4, zero direct production questions, and no score path. |
| R-110-02 | Inspect the qualitative profile for each target. | Green Communitarianism exposes `ecological-community-relational-justice` and `place-based-accountable-stewardship`; Liberal Conservatism exposes `liberty-through-institutional-continuity` and `liberal-reform-with-conservative-prudence`; each conception has characteristic centrality and an explicit normative/prescriptive layer. |
| R-110-03 | Resolve source and governance provenance. | Every conception source id resolves to the source registry, and both governance decisions report `retain-contextual`, contextual placement, and `not-scored` status without creating canonical ancestry. |
| R-110-04 | Run the full deterministic audit surface. | Focused/full Vitest, TypeScript, build, dependency audit, research coverage, reachability, belief audits, and browser checks report actual statuses; the six external validation gates remain explicitly `NOT RUN`. |
| R-110-05 | Inspect the workbench boundary language. | Environmental concern, localism, community identity, decentralization, one liberal response, one conservative response, market support, institutional respect, or gradualism alone is not presented as sufficient evidence for either contextual bridge. |

## V113 — Quarantined gap-candidate response seam

| ID | Scenario | Expected result |
|---|---|---|
| P-113-01 | Complete the base quiz and open the research-candidate response seam. | The results view exposes the current candidate count behind an explicit disclosure, with stable labeled controls and construct/layer/format metadata; the controls are clearly marked as unvalidated research material. |
| P-113-02 | Select a substantive option for a priority, epistemic, and heterodoxy candidate. | The profile shows quarantined candidate evidence and `candidate-pilot` structure posture for those dimensions; each construct remains `not-yet-measured`, with no scalar signal created. |
| P-113-03 | Select a candidate no-view option. | The no-view selection is restorable in the share map but is omitted from substantive `BeliefGapEvidence`; it does not count as a response or candidate signal. |
| P-113-04 | Compare the same base answers with and without candidate selections. | Primary morphology, canonical affinity candidates, legacy layer results, and combined compatibility remain unchanged; only candidate trace metadata changes. |
| P-113-05 | Create and restore a versioned share link after selecting a candidate. | The candidate answer map round-trips with known candidate and option ids; unknown, duplicate, stale, or malformed candidate records are rejected without partial restoration. |
| P-113-06 | Run deterministic and browser checks. | TypeScript, focused/full Vitest, build, completion structural checks, the full serial Playwright suite, exploratory issue report, and preview cleanup report actual status; six external validation gates remain `NOT RUN`. |

## R-113 — Gap-candidate evidence boundary

| ID | Area | Steps | Expected result |
|---|---|---|---|
| R-113-01 | Candidate contract | Run the candidate research and pilot tests. | All current candidates retain `research_candidate` status, unique stable option ids, source references, and no production question ids; valid selected options create non-scoring evidence. |
| R-113-02 | Profile attachment | Run `npm run belief:completion-audit -- --summary`. | Candidate evidence is attached to each corresponding integrated dimension, all candidate-specific structural checks pass, and the three entirely unmeasured construct results remain `not-yet-measured`; candidates attached to already-proxied constructs remain non-scoring. |

## Current V114 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-114-01 | Construct/layer coverage | Run `npm run belief:measurement-audit -- --summary`. | The report includes typed construct-by-claim-layer counts and ten explicit uncovered cells: prescriptive concepts/conceptions; normative political economy; descriptive and normative change strategy; and the six cells belonging to the three entirely unmeasured constructs. |
| R-114-02 | Layer-gap research shelf | Run the belief-gap research tests and inspect the candidate inventory. | The 19 source-linked candidates include at least one candidate for every previously uncovered declared construct/layer cell; all remain effect-free and outside production questions. |
| R-113-03 | Scoring isolation | Inspect the audit output and compare base/pilot results. | Candidate responses do not enter observations, construct signals, morphology basis, ontology affinity, legacy layer scoring, or combined scoring. |
| R-113-04 | Share boundary | Run the share contract tests with candidate answers. | Valid candidate answers round-trip in the versioned envelope; malformed, duplicate, or unknown candidate entries are rejected as a whole. |
| R-113-05 | External evidence boundary | Inspect the validation protocol and completion ledger. | Candidate visibility and local PASS evidence do not promote the candidates or close cognitive, expert, empirical, invariance, population/consequence, or held-out respondent morphology gates. |

## Current V115 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-115-01 | Construct-level morphology fit | Open a morphology evidence trail for a facet-linked commitment. | The directional basis uses the linked construct signal as `observedSignal` and reports `construct-proxy`, `direct-item`, or `mixed-provisional`; a facet signal, when present, is displayed as provenance context only. |
| R-115-02 | Evidence-question provenance | Inspect the question summaries for a facet-linked morphology commitment. | Primary evidence question ids resolve to the construct-level directional evidence, while any facet-context question ids remain separately labeled and cannot change fit. |
| R-115-03 | Affinity isolation | Compare the same base answers with direct categorical, relational, and candidate-pilot selections. | Construct-level morphology fit, canonical candidate values, legacy layer results, and combined compatibility remain unchanged by the non-scoring supplements. |
| R-115-04 | Model provenance | Inspect the morphology result and configuration-projection documentation. | The morphology model is version 3; the legacy scorer remains a compatibility regression path, and no local structural or browser result is presented as respondent, psychometric, empirical, invariance, population, or consequence validation. |
| R-115-05 | Regression audit | Run the morphology audit and completion audit. | The morphology audit reports `morphologyFitUsesConstructProfile: true` for all 119 source-backed canonical fixtures; completion remains fail-closed while the six external validation gates are `NOT RUN`. |

## Current V116 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-116-01 | Integrated profile signal | Complete the base quiz and inspect each integrated belief-structure row. | Each single-construct dimension mirrors its linked construct's provisional `observedSignal`; the supporting directional question ids are exposed separately from mixed/no-view/unanswered records. |
| R-116-02 | Mixed-response fail-closed trace | Submit mixed responses across the production bank. | Structure dimensions expose no `observedSignal` and no signal-support question ids; mixed records remain evidence posture only and do not become directional zeroes. |
| R-116-03 | Evidence-form isolation | Add direct categorical, relational, or quarantined candidate selections to the same base answers. | The structure's construct signal and signal-support ids remain unchanged; the additional records remain separate context and do not enter morphology or legacy scoring. |
| R-116-04 | Construct-to-structure audit | Run `npx vite-node scripts/audit-belief-completion.ts --summary`. | The new `structureSignalUsesConstructProfile` check passes for every current dimension, while completion remains fail-closed because six required external-study gates are `NOT RUN`. |
| R-116-05 | Browser disclosure | Run the fixed-preview serial Playwright suite and inspect the primary profile. | The UI labels the value as a provisional construct signal and retains the existing non-validation boundary language; no console errors, page errors, or failed requests occur. |

## Current V117 structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-117-01 | Run the canonical target question-coverage audit. | `npm run belief:question-coverage -- --summary` reports 119 canonical targets, zero validation errors, zero unexpected failures, four items in each claim layer for every target, and provisional primary morphology candidates for every target. |
| R-117-02 | Inspect Islamism normative coverage. | The existing `n-islamism-02` social-justice item aligns to a characteristic source-backed `equality` commitment in the Islamism profile; the item effect and legacy scorer remain unchanged. |
| R-117-03 | Inspect contested prescriptive layers. | Populism, Islamism, Religious Nationalism, and Deep Ecology remain explicit `not-established` open gaps because no determinate source-backed institutional direction is declared; the audit does not force a route. |
| R-117-04 | Inspect registry-only research targets. | A registry-only target may have a qualitative source profile, but the Confucian Political Thought tranche remains effect-free, without a production anchor or respondent scoring path. |
| R-117-05 | Run completion reconciliation. | The existing completion audit includes the coverage checks and reports all 28 structural checks true; overall status remains fail-closed while the six external validation gates are `NOT RUN`. |
| R-117-06 | Run the deterministic and browser regression surface. | TypeScript, full Vitest, build, component audits, research coverage/reachability, fixed-preview Playwright, and preview cleanup report their actual statuses; no local result is treated as external validation. |

## Current V118 adversarial structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-118-01 | Compare neighboring conceptions of political freedom. | Alternative direct categorical conceptions remain distinct statements in the primary profile; neither selected conception changes the morphology candidate or legacy affinity trace. |
| R-118-02 | Compare identical policy direction with different distributive reasons. | The shared policy context remains compatible with different stated principles; the direct evidence records differ, while morphology and legacy affinity remain unchanged because the pilot is non-scoring. |
| R-118-03 | Submit alternative priority and conditional rules. | The selected rule and condition are visible as explicit relational evidence attached to their declared constructs; no hidden scalar priority or conditional weight is created, and affinity remains unchanged. |
| R-118-04 | Submit an unresolved contradiction. | The contradiction is retained with `unresolvedContradictions: 1`, appears in the relational trace, and does not cause the system to invent a coherence score or alter affinity. |
| R-118-05 | Evaluate a weak directional profile. | Half-strength production responses yield a `partial` belief profile with bounded construct signals and a `provisional-candidates` morphology result; the system does not convert weak direction into validated certainty. |
| R-118-06 | Run `npx vite-node scripts/audit-belief-morphology.ts --summary`. | All named adversarial checks pass, including neighboring conceptions, weak directional profile behavior, contradiction isolation, same-values/different-causal-beliefs separation, hybrid visibility, and mixed/no-view fail-closed behavior. |

## Current V119 target-evidence structural scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-119-01 | Run the canonical target question-coverage audit with the normal dataset. | `npm run belief:question-coverage -- --summary` reports zero validation errors and zero blocking failures; determinate layers expose target morphology evidence, while the four intentionally indeterminate prescriptive layers remain explicit `not-established` open gaps. |
| R-119-02 | Inspect a target layer containing both matched and unmatched target-tagged items. | Matched items receive directional fixture evidence; zero-alignment items remain mixed/depends and are visible as primary-profile evidence without being promoted to a directional signal. |
| R-119-03 | Inspect a target with no determinate source-backed commitment for a layer. | The layer reports `contested-indeterminate` and `not-established`; the audit does not fabricate a positive answer or treat missing morphology basis evidence as a blocking failure. |
| R-119-04 | Remove one target item's effects in the negative-control fixture. | That item disappears from primary-profile evidence, the target layer becomes a trace `gap`, the relevant structural check becomes false, and the report records a blocking failure. |
| R-119-05 | Run TypeScript and coverage tests. | `npx tsc --noEmit --pretty false` and the focused `src/ideology-question-coverage.test.ts` suite pass; no scoring, ontology, or respondent-validity claim is made. |

## Current V120 inspectability scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-120-01 | Complete the base quiz, open the quarantined research-candidate disclosure, and inspect the first candidate. | Each candidate exposes its declared gap, scholarly rationale, and same-answer/different-reason risk behind an accessible disclosure; the candidate remains explicitly research-only. |
| P-120-02 | Select a candidate option after opening its rationale disclosure. | The selected response appears as quarantined evidence while construct status, morphology, canonical affinities, and legacy results remain unchanged. |
| R-120-01 | Run the built-preview completion/share scenario. | The rationale disclosure, candidate selection, versioned share restoration, primary profile, morphology evidence, and legacy compatibility path all pass; external validation gates remain `NOT RUN`. |

## Current V121 claim-layer status scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-121-01 | Complete the base quiz with directional answers and inspect political economy. | The construct remains a provisional `partial` proxy because its declared normative layer has no production item; `layerCoverage` shows descriptive/prescriptive coverage and a zero normative cell. |
| R-121-02 | Complete the base quiz with directional answers and inspect change strategy. | The construct remains a provisional `partial` proxy because its declared descriptive and normative layers have no production item; `layerCoverage` shows only prescriptive coverage. |
| R-121-03 | Run the measurement and completion audits. | The declared construct/layer gaps remain explicit and candidate-tracked; no gap candidate is promoted into scalar status, morphology, or legacy scoring, and the external validation gates remain `NOT RUN`. |

## Current V122 morphology diagnostic scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-122-01 | Submit a fully covered profile with mixed descriptive/normative answers and directional prescriptive answers, then open morphology. | The morphology status remains provisional only when supported records exist; the ordered candidate list contains only `provisional-candidate` records, with no under-determined status or rank mixed into that list. |
| P-122-02 | Open the under-determined configuration disclosure. | Source-backed withheld configurations expose missing defining evidence as diagnostics without rank, selection language, or identity assignment; the full diagnostic collection remains in the result contract. |
| R-122-01 | Run the morphology and completion audits against all-mixed and partially directional fixtures. | All-mixed remains `not-derived` with zero public candidates and explicit under-determined diagnostics; the partially directional fixture keeps provisional and under-determined anchor ids disjoint; completion remains fail-closed while external gates are `NOT RUN`. |

## Current V123 source-backed configuration relationship scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-123-01 | Open a morphology candidate whose configuration has researched relationships. | The candidate exposes source-backed relationship statements, their participating commitments, and source links as configuration context; no relationship is presented as respondent evidence or a fit contribution. |
| P-123-02 | Inspect a configuration with a contested relationship hypothesis. | The relationship is labeled as source-backed but contested, and its statement preserves variation rather than assigning one universal priority, condition, or conflict rule. |
| R-123-01 | Run the morphology and completion audits. | The 25 relationship records across 13 canonical profiles have resolved commitment participants and valid source provenance, including an epistemic relationship; profiles without records remain explicitly open, all structural checks pass, and the six external gates remain `NOT RUN`. |

## Current V124 Confucian profile scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-124-01 | Run `npm run research:coverage -- --summary` after loading the Confucian registry target. | `confucian-political-thought` reports `registry-only`, zero direct questions, a qualitative profile, 3 conceptions, 3 relationships, 12 quarantined candidates, and no score effect; the report has 128 profile rows, empty missing-profile and missing-conception lists, and zero validation errors. |
| R-124-02 | Inspect the Confucian profile and its source-backed relationships. | The profile exposes 4 descriptive, 5 normative, and 4 prescriptive dimensions; conceptions and relationship participants resolve to known source-backed records; contested modern translations remain marked as contested rather than collapsed into one institutional route. |
| R-124-03 | Run production and belief audits after the profile bridge. | Production remains 1,500 questions / 119 scoring anchors / 124 editorial anchors; the 119 canonical targets retain 4/4/4 direct coverage; the profile does not enter effects, affinity, morphology, legacy scoring, or respondent output. |
| R-124-04 | Run the completion audit and review its external-gate ledger. | Structural checks remain green, but the overall completion result remains `INCOMPLETE` / fail-closed because the six required external gates are still `NOT RUN`; no local structural result is reclassified as cognitive or empirical validation. |

## Current V125 morphology-resolution scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-125-01 | Complete the base quiz with enough directional responses to derive morphology and inspect the result. | The result exposes a `Selection posture` record and a bounded inspectable neighborhood; candidate rows show total configuration coverage and defining-commitment support separately. |
| P-125-02 | Use an all-directional or otherwise close synthetic fixture that produces low leading-candidate separation. | The result reports `coarse candidate neighborhood`, keeps the leading candidates visible, and explicitly says that no unique ideology label is selected; no new score or target-specific weighting appears. |
| R-125-01 | Run the morphology audit and regression tests after the resolution-seam change. | All canonical source-backed configurations retain their structural round trips, the all-mixed fixture remains `not-derived`, and the legacy scorer remains byte-for-byte unchanged for the tested result paths. |

## Current V126 researched relationship tranche scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-126-01 | Open a morphology candidate for one of the newly covered macro, family, or foundational configurations. | The configuration exposes its source-backed relationship statements, exact participating commitments, and source links as theoretical context; no relation becomes respondent evidence, a score, an affinity weight, or a morphology-fit input. |
| P-126-02 | Inspect a configuration with a priority, conditionality, conflict-resolution, epistemic, or contestation relation. | The relation kind and contested evidence posture remain explicit; the statement preserves variation and does not establish a universal priority, exception, epistemic stance, or heterodoxy rule for respondents. |
| R-126-01 | Run the relationship and completion audits after the tranche extension. | The registry reports 66 source-backed-contested relationship records across 33 canonical configuration owners; all participants resolve to commitments, zero structural validation/failure errors occur, the remaining 86 canonical owners retain open relation gaps, and the six external validation gates remain `NOT RUN`. |
| R-126-02 | Run the full regression, build, and browser QA commands. | Vitest, TypeScript/build, and all 11 browser scenarios pass; the existing large-client-chunk advisory remains informational, preview processes are cleaned up, and no political classification or empirical-validity claim is made. |

## Current V127 source-backed micro-branch relationship scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-127-01 | Open a candidate for a newly covered libertarian, anarchist, Marxist, or feminist branch. | The configuration shows two source-backed-contested relationship statements linked to its existing facet commitments and provenance; the relation layer remains explanatory context and does not change the candidate's fit, rank, affinity, or legacy score. |
| P-127-02 | Inspect a relationship that joins a substantive diagnosis to an institutional route. | The UI keeps the source-backed theoretical statement distinct from respondent evidence, preserves contested variation, and does not infer a scalar priority, confidence, contradiction, or identity from co-occurrence. |
| R-127-01 | Run the relationship, measurement, reachability, and completion audits after the micro-branch tranche. | The relationship registry reports 86 records across 43 canonical owners with all participants and sources resolved; measurement remains 1,500/1,500 with the three unmeasured constructs explicit; reachability has zero validation/failure errors; completion remains `INCOMPLETE` / fail-closed while the six external gates are `NOT RUN`. |
| R-127-02 | Run the focused and full regression, build, and browser QA commands. | The 27-test belief-structure suite, 173-test Vitest suite, production build, and all 11 browser scenarios pass; preview listeners are cleaned up and no empirical or political-ranking claim is made. |

## Current V129 configuration relationship scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-129-01 | Inspect a canonical configuration for one of the twenty new owners: Revisionist/Bernsteinian Social Democracy, Christian Nationalism, Buddhist Nationalism, Bioregionalism, Anarcha-Feminism, Liberal Nationalism, Radical Feminism, Historical Republicanism, Individualist Anarchism, Egoist Anarchism, Conservative Nationalism, Mutualism, National Socialism, Neo-Fascism, Neoliberalism, Radical Conservatism, Reactionary Conservatism, Religious Nationalism, Socialist/Marxist Feminism, or Anti-Colonial Nationalism. | The configuration exposes two source-backed-contested relationship statements with source references and exact participant commitment bindings; the relation remains theoretical context and does not become respondent evidence or an affinity input. |
| P-129-02 | Inspect a new `priority`, `conditionality`, `conflict-resolution`, `epistemic`, or `contestation` record. | The relation kind, statement, contested posture, and variation remain explicit; the system does not infer a respondent priority, condition, epistemic stance, contradiction rule, or heterodoxy posture from shared facets or answer co-occurrence. |
| R-129-01 | Run the configuration and morphology audits after the tranche. | The registry reports 146 source-backed-contested relationships across 73 canonical owners; all participants and sources resolve, relationship ids are unique, validation/failure counts are zero, and the remaining 46 owners retain open relation gaps. |
| R-129-02 | Run the full deterministic suite and stable-server browser paths. | TypeScript, focused and full Vitest, build, production/research/measurement/reachability audits, and the scoped browser scenarios provide current evidence; completion remains `INCOMPLETE` / fail-closed and the six external validation gates remain `NOT RUN`. |

## Current V130 source-backed relationship scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-130-01 | Inspect a canonical configuration for one of the 46 new owners: Arab Nationalism, Civic Nationalism, Ethnocultural Nationalism, Hindutva, Marxist Feminism, Neo-Nazism, Revolutionary Islamism, Council Communism, Guild Socialism, Maoism, Cultural Feminism, Cultural Nationalism, Lesbian Feminism, One-Nation Conservatism, Radical Republicanism, Left-Wing Populism, Neoconservatism, Paleoconservatism, Wasatiyya, Right-Wing Populism, Agrarian Populism, Religious Zionism, Socialist Feminism, Third-Positionism, National Syndicalism, Italian Fascism, Flemish-Belgian Fascism, Japanese Fascism, British Fascism, French Fascism, Falangism, Brazilian Integralism, Integral Nationalism, Legionary Fascism, White Nationalism, Salafi-Jihadism, Materialist Feminism, Trotskyism, Georgism, Degrowth, Distributism, Christian Socialism, Ujamaa, Labor Zionism, Islamic Feminism, or Deep Ecology. | The configuration exposes two source-backed-contested relationship statements with source references and exact participant commitment bindings; the relation remains theoretical context and does not become respondent evidence, an affinity input, or a legacy-score input. |
| P-130-02 | Inspect a new `priority`, `conditionality`, `conflict-resolution`, `epistemic`, or `contestation` record. | The relation kind, contested posture, statement, and variation remain explicit; the system does not infer respondent priority, institutional route, epistemic stance, contradiction rule, or identity from shared facets or answer co-occurrence. |
| R-130-01 | Run the configuration, morphology, measurement, coverage, reachability, and completion audits after the tranche. | The registry reports 238 source-backed-contested relationships across all 119 canonical owners with all participants and sources resolved; owner-level relationship gaps are zero; measurement remains 1,500/1,500 with the three unmeasured constructs explicit; completion remains `INCOMPLETE` / fail-closed while six external gates are `NOT RUN`. |
| R-130-02 | Run the full deterministic suite and browser QA. | TypeScript, 27 focused tests, 173 full Vitest tests, production build, and the five relation-relevant stable-server Playwright paths pass; any concurrent-run termination is recorded as an environment result rather than converted to a pass, preview listeners are cleaned up, and no empirical, psychometric, population, or political-identity claim is made. |


## Current V131 question-layer repair scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-131-01 | Inspect `n-liberal-feminism-02` beside `n-egalitarian-liberal-feminism-02`. | The liberal-feminist item has distinct wording about equal legal rights and fair opportunity while preserving its source references and `{ equality: 0.9 }` legacy effect; the audit no longer treats the pair as exact duplicate production wording. |
| P-131-02 | Inspect the French- and British-fascism normative and prescriptive items that previously shared generic wording. | The five revised prompts retain historically bounded, source-backed branch context and their original effects; they do not add ideology-coded metadata, hidden weighting, or a new scoring path. |
| R-131-01 | Run the measurement audit and focused/full regression after the wording repair. | Content version 98 reports 1,500 audited items with zero duplicate or redundant dispositions; the focused duplicate/effect regression and full 174-test suite pass, while the three unmeasured constructs, four open coverage gaps, and six external gates remain visible. |

## Current V132 single-claim wording scenario

| ID | Scenario | Expected result |
|---|---|---|
| P-132-01 | Inspect `n-collectivist-anarchism-04` and its measurement audit record. | The normative item asks one participation claim about people who perform common work; it retains the source-backed context and `{ democracy: 0.95 }` effect without a compound-wording or rewrite disposition. |
| R-132-01 | Run the focused regression and measurement audit after the V132 edit. | The focused suite passes 35/35; content version 99 reports zero rewrite, duplicate, and redundant dispositions, while 42 cross-construct split signals remain explicit review items. |

## Current V133 measurement-audit workbench scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-133-01 | Open Research and inspect the default production measurement queue. | The read-only queue shows 42 open disposition signals, the 1,500-item audit total, retained legacy effects and source metadata, and an explicit mechanical-only boundary. |
| P-133-02 | Switch among conditional wording and all-item filters, then search `n-collectivist-anarchism-04`. | The conditional filter reports 510 matching audit records and caps the rendered list at 80; the all-item search narrows to one record and exposes the preserved single-claim prompt and `Democracy +0.95` effect without changing the live bank. |
| R-133-01 | Run TypeScript, the full Vitest suite, production build, focused queue/responsive browser paths, and `git diff --check`. | All executed deterministic checks pass; the existing large-client-chunk advisory remains informational, while the three unmeasured constructs, four open prescriptive gaps, 42 split dispositions, and six external validation gates remain visible and fail-closed. |

## Current V134 full regression scenario

| ID | Scenario | Expected result |
|---|---|---|
| R-134-01 | Run the full current-tree TypeScript, Vitest, build, structural audits, single-worker browser suite, preview cleanup check, and `git diff --check` after the committed audit queue. | All deterministic checks pass, including 13/13 browser scenarios; the 42 split dispositions, three unmeasured constructs, four open prescriptive gaps, and six `NOT RUN` external validation gates remain visible and fail-closed. |

## Current V135 taxonomy-governance scenario

| ID | Scenario | Expected result |
|---|---|---|
| P-135-01 | Open Research and inspect Khomeinism and Qutbism in the taxonomy decision panel. | Each target shows a source-backed-contested promotion to the canonical ontology with `scored-provisional` governance consequence, while the live target remains dedicated-scored and the historical/interpretive boundary remains visible. |
| R-135-01 | Run the research-coverage audit and focused governance tests after the status alignment. | The 128-target ledger validates with 119 `scored-provisional` and 9 `not-scored` results, zero measurement-status exceptions/reconciliations, and zero validation errors; the fail-closed mismatch test still detects an unrecorded downgrade. |

## Current V136 review-packet scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-136-01 | Run `npm run belief:review-packet -- --summary` against the current content snapshot. | The packet reports content version 99, belief model 2, morphology model 5, 1,500 production audit records, 42 open dispositions, 19 gap candidates, 8 direct items, 6 relational follow-ups, 464 sources, 11 constructs, zero packet validation errors, and `eligibleForPromotion: false`. |
| R-136-02 | Inspect the full packet's blind and adjudication production arrays. | Both arrays contain 1,500 records with stable one-to-one review ids; blind records omit question ids, ideology-bearing target metadata, effects, source refs, construct bridges, flags, dispositions, and rationale, while adjudication records retain the full audit. |
| R-136-03 | Inspect the packet evidence ledger and gate snapshot. | The evidence ledger is empty, all six required external-study gates remain `NOT RUN`, and exporting the packet does not alter the typed validation ledger or completion-audit status. |

## Current V137 review-record intake scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-137-01 | Pipe the full exporter output to `npx vite-node scripts/validate-belief-review-packet.ts --summary`. | The validator reports `INCOMPLETE`, recognizes 1,533 queue items, finds zero reviewer and evidence records, reports 1,533 incomplete review items, and keeps promotion ineligible. |
| R-137-02 | Validate a packet whose content snapshot is changed from 99 to 98. | The validator reports `INVALID` with a stale content-version error and keeps promotion ineligible. |
| R-137-03 | Validate a packet containing one malformed reviewer record. | The validator reports field-level structural errors for missing review fields, invalid disposition, missing rationale, or invalid timestamp; it does not accept the record as evidence. |

## Current V138 validator-diagnostic scenario

| ID | Scenario | Expected result |
|---|---|---|
| R-138-01 | Validate a packet whose `reviewRecords` contains one empty object. | The validator reports exactly 13 missing required-field errors, does not duplicate each missing field as an invalid-value error, remains `INVALID`, and keeps promotion ineligible. |

## Current V139 packet-integrity scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-139-01 | Validate a packet whose first queue entry keeps `production-0001` but changes its `itemId`. | The validator reports `INVALID` with a mismatched queue-item identity error and keeps promotion ineligible. |
| R-139-02 | Validate a packet whose first snapshot `questionIds` entry is changed. | The validator reports `INVALID` with a question-id snapshot error and keeps promotion ineligible. |
| R-139-03 | Validate a packet whose first blinded production prompt is changed. | The validator reports `INVALID` with a production-item content error and keeps promotion ineligible. |
| R-139-04 | Validate the fresh exporter output. | The packet remains structurally valid, reports `INCOMPLETE` only because no external review/evidence records exist, and preserves all six external gates as `NOT RUN`. |

## Current V140 research-snapshot scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-140-01 | Validate a packet whose first gap-candidate prompt is changed without changing the array length. | The validator reports `INVALID` with a research-queue source-snapshot error and keeps promotion ineligible. |
| R-140-02 | Validate a packet whose first validation-gate boundary is changed. | The validator reports `INVALID` with a gate-snapshot error and keeps promotion ineligible. |
| R-140-03 | Validate the fresh exporter output. | The research queues, registries, queue counts, gate snapshot, review contract, and promotion boundary match the current source; the packet remains `INCOMPLETE` only because actual review/evidence records are absent. |

## Current V141 gate-evidence coverage scenarios

| ID | Scenario | Expected result |
|---|---|---|
| R-141-01 | Add a structurally valid evidence row for one gate with status `NOT RUN`. | The gate appears in `evidenceGateIdsCovered` but not `evidenceGateIdsWithRecordedResults`; it remains in `evidenceGateIdsMissing`, and the packet remains `INCOMPLETE`. |
| R-141-02 | Change that row’s status to `PASS` without changing its gate ID. | The gate moves to `evidenceGateIdsWithRecordedResults` and leaves `evidenceGateIdsMissing`; no promotion or typed gate update occurs. |
| R-141-03 | Validate the fresh exporter output. | All six required gates are reported missing recorded results, zero evidence rows exist, promotion remains false, and the packet remains `INCOMPLETE`. |

## V142 Research Workbench relationship scenario

| ID | Scenario | Expected result |
|---|---|---|
| P-142-01 | Open Research, select `deep-ecology`, and inspect the selected anchor profile. | The workbench displays the source-backed configuration relationship section with two records, explicit participants, `source-backed-contested` posture, statements, source links, and a clear qualitative/non-scoring boundary. |
| R-142-01 | Run TypeScript, the production build, and the focused relationship browser scenario against a stable preview. | All executed checks pass; the UI only exposes existing research context, while the fixed ontology, production scoring/morphology paths, and six external `NOT RUN` gates remain unchanged. |

## V143 construct-layer coverage scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-143-01 | Open Research and inspect the production-versus-research construct/layer coverage table. | The table has 25 declared cells, 15 production-covered cells, 10 candidate-only gap cells, and 19 quarantined candidate bindings; it labels the matrix as an authoring/provenance aid rather than a respondent measure. |
| R-143-01 | Run the focused coverage regression, TypeScript, production build, full Vitest suite, full browser suite, fresh packet validation, and coverage-snapshot mutation. | The executed local checks pass; the fresh packet remains `INCOMPLETE`, the mutated coverage snapshot is `INVALID`, promotion remains false, and all six external gates remain `NOT RUN`. |

## V144 qualitative route-variant scenarios

| ID | Scenario | Expected result |
|---|---|---|
| P-144-01 | Open Research and select each of `populism`, `islamism`, `religious-nationalism`, and `deep-ecology`. | The selected profile exposes 2, 2, 2, and 4 `source-backed-contested` prescriptive route variants respectively; each route has a statement, source links, and prescriptive dimensions while the base family direction remains contested/indeterminate. |
| R-144-01 | Run the route metadata regression and research coverage audit. | The route validator accepts the current source snapshot, rejects missing route provenance or a non-prescriptive route dimension, reports 10 route variants across 4 targets, and reports zero research-bank validation errors. |
| R-144-02 | Run TypeScript, full Vitest, production build, and browser QA after the route surface is present. | All executed local checks pass; the route records remain qualitative context and do not enter respondent scoring, morphology fit, affinity ordering, or promotion. |

## V145 completion-audit reconciliation scenario

| ID | Scenario | Expected result |
|---|---|---|
| R-145-01 | Run `npm run belief:completion-audit -- --summary` with the contested route metadata present. | The report includes passing research-metadata, expected-route-coverage, and route-non-scoring structural checks; structural eligibility is true, while the six external-study gates remain `NOT RUN` and overall status remains `INCOMPLETE`. |

## V146 direct-pilot extension

| ID | Scenario | Expected result |
|---|---|---|
| P-146-01 | Complete the production quiz and inspect the optional direct-belief pilot. | The existing result surface renders `BELIEF_DIRECT_ITEMS.length` items, including the priority-rule, epistemic-stance, and contestation-response records; each retains explicit `No view yet` missingness and non-scoring explanatory copy. |
| R-146-01 | Select one option for each new pilot item, create a share link, and restore it. | The selected option text is visible in the direct-evidence profile, all three answers restore from the versioned share payload, and legacy/morphology affinity remains unchanged. |
| R-146-02 | Run the direct-pilot, measurement, completion, packet, TypeScript, Vitest, build, and browser checks. | Structural and deterministic checks pass; the production audit still reports the three constructs as unmeasured, the packet remains incomplete with promotion false, and all six external gates remain `NOT RUN`. |
