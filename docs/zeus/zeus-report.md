# Zeus Execution Report

## Final status

Zeus completed the zero-interaction pipeline for the pasted brief:

> Make an ideology normative/descriptive/prescriptive sorter based on data from other ideological sorters; it is not scientific.

The delivered product is a client-only React + TypeScript + Vite web app. It separates descriptive, normative, and prescriptive prompts; preserves `No view yet` as missing information; exposes source and editorial-anchor provenance; calculates deterministic internal fit over a versioned local dataset; and supports explicit local share links.

The overall delivery is complete with conditions. Argos found no core implementation failure and no confirmed Critical or High security finding, but retained explicit verification-depth gaps for keyboard-only traversal, text zoom, clipboard-denial/network observation, and redacting historical secret scanning. Minos passed all automated and exploratory checks against the Docker image.

This artifact is a neutral software deliverable. It does not endorse, rank, score, recommend, or decide between political parties, candidates, or ideological positions. Its labels and internal fit values are presented in the product as provisional editorial interpretation, not scientific classification.

## Audit continuation — 2026-08-26

The supplied Political-Ideology Ontology audit was reconciled into the runtime contract. The strict canonical graph now contains exactly 9 macro families, 33 meso traditions, and 58 micro branches. Contextual MVP anchors and a separate secondary registry hold broad, historical, associated, and contested labels without inflating the canonical graph or making them scored neighbors. National Conservatism is represented once under Conservative Nationalism; Conservative New Right is contextual; Republicanism is split into historical and contemporary meso traditions; hybrids use typed relations; and Deep Ecology, Bioregionalism, and national Fascist cases remain registry context where the audit requires it.

Academic references were added for the expanded ontology and recorded with retrieval dates, citations, support boundaries, and explicit non-validation posture. The implementation does not use these sources to compare or rank a person's political views; it uses them to document terminology and the reasoning behind taxonomy boundaries. Right-Libertarianism now has a dedicated 12-item block and a provisional scored anchor; the wording and anchors remain editorial and provisional.

The rebuilt Docker delivery was also checked: Compose configuration passed, the container reported healthy on port 8001, and the same 7/7 Playwright scenarios passed against the container.

## Phase ledger

| Phase | Result | Evidence |
|---|---|---|
| 0. Description parsing | Complete | `docs/zeus/zeus-state.json`, `docs/zeus/zeus-log.md` |
| 1. Zephermine planning | Complete | `docs/plan/ideology-sorter/` with research, spec, domain, design, flows, sections, and QA scenarios |
| 2. Agent-team implementation | Complete | Agent-team foundation path attempted; stalled worker was closed and main-context sequential fallback completed the same disjoint contract |
| 3. Argos audit | Conditional pass | `docs/plan/ideology-sorter/verify-report.md` |
| 4. Docker delivery | Pass | `docker-images/docker-compose.yml`, built image, healthy container, `/healthz` |
| 5. Minos QA | Pass | `docs/plan/ideology-sorter/minos-report.md`; 7/7 Playwright tests |
| 6. Report and durable state | Complete | This report and completed `docs/zeus/zeus-state.json` |

## Product contract delivered

### Content and domain model

- 84 original questions, 28 per layer.
- Five response directions plus a separate `no-view` state.
- 20 named facets across the three layers.
- 16 approximate editorial anchors across five families.
- Versioned dataset manifest and scoring policy.
- Source registry with retrieval dates, URL, and inspiration/future-data posture.
- Explicit terminology for Layer, Descriptive, Normative, Prescriptive, Facet, Coverage, Anchor, Family, Internal fit, Provenance, Tension, and Share fragment.

### Scoring and safety boundaries

- Directional answers remain signed values from -2 through +2.
- `no-view` is excluded from answered denominators and never silently coerced to zero.
- A layer needs at least 50% answered coverage before producing a result.
- Facets are aggregated with signed answer effects and absolute effect weights.
- Anchor comparison uses a weighted mean squared distance over observed facets and a bounded internal-fit complement.
- Neighbors are family-balanced, deterministic, and carry tie language inside a tolerance band.
- Cross-layer cards describe tensions or design questions without a contradiction score.
- Share fragments are bounded, base64url encoded, version checked, and rejected whole when schema, version, ID, duplication, or value validation fails.

### UI and interaction

- Editorial research-notebook design from `DESIGN.md`: paper background, near-black ink, vermilion signal, Newsreader display type, and DM Sans body type.
- Intro framing with methodology disclosure and source links before starting.
- Accessible radio group with visible focus, hints, disabled forward action until answered, back navigation, layer transition notices, and status text.
- Coverage-first results with separate sections, provenance notes, facet signals, family metadata, and restart/share actions.
- No account, API, database, analytics, remote answer store, or current-party/candidate matching.

## Verification evidence

### Local application

| Command | Result |
|---|---|
| `npm install` | Completed; 0 npm audit vulnerabilities reported afterward |
| `npm run build` | Passed TypeScript and Vite production build |
| `npm test -- --run` | 17/17 unit and contract tests passed after the audit continuation |
| `npm run qa` | 7/7 Playwright tests passed against the local 4173 preview, including ontology disclosure/catalog coverage and explorer |
| `npm audit` | 0 vulnerabilities |
| `npm audit --omit=dev` | 0 vulnerabilities |

### Docker delivery

| Check | Result |
|---|---|
| `docker compose -f docker-images/docker-compose.yml config` | Passed |
| `docker build -t ideology-layer-sorter-frontend:latest -f frontend/Dockerfile .` | Passed |
| `docker compose -f docker-images/docker-compose.yml up -d` | Passed |
| `GET http://127.0.0.1:8001/healthz` | `ok` |
| Container health | `healthy` |
| `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` | 7/7 passed |

### Rendered evidence

The Argos visual pass inspected:

- `docs/ui-audit/screenshots/intro-desktop-light.png`
- `docs/ui-audit/screenshots/intro-mobile-light.png`
- `docs/ui-audit/screenshots/results-desktop-light.png`
- `docs/ui-audit/screenshots/results-mobile-light.png`

The 320px runtime probe reported `scrollWidth=320` and `innerWidth=320` on both intro and quiz. The explorer recorded no console errors, page errors, or failed network responses in `test-results/explorer/report.json`.

## Main artifacts

| Area | Files |
|---|---|
| Runtime contracts | `src/types.ts`, `src/data.ts`, `src/scoring.ts`, `src/share.ts` |
| UI | `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `DESIGN.md`, `index.html` |
| Tests | `src/scoring.test.ts`, `src/share.test.ts`, `tests/sorter.spec.ts`, `tests/explore/explore.spec.ts`, `playwright.config.ts` |
| Delivery | `frontend/Dockerfile`, `frontend/nginx.conf`, `docker-images/docker-compose.yml`, `docker-images/.env.example`, helper scripts |
| Documentation | `README.md`, `docs/plan/ideology-sorter/`, `docs/zeus/` |

## Source posture

The planning and data registry treated external projects as design and provenance inspirations, not as copied content or authoritative scoring rules. The registry links to [8values](https://github.com/8values/8values.github.io), [LeftValues](https://leftvalues.github.io/), a [PolitiScales clone repository](https://github.com/ketsapiwiq/Politiscales-dbhq), the [Political tests project directory](https://politicaltests.github.io/), and the [Manifesto Project Dataset 2025a](https://gitlab.manifesto-project.wzb.eu/datasets/MPDS2025a). The Manifesto Project entry is marked future-data only and is not part of the MVP calculation. These links are third-party source references for provenance, not an endorsement or comparative judgment.

## Conditions and deferred work

1. Wording and ontology changes remain subject to explicit provenance, substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation before production canonicalization; source citations and automated checks are not substitutes for those checks.
2. The editorial anchors remain provisional and should not be used for political identity, persuasion, or current-party matching.
3. Add direct Playwright cases for keyboard-only traversal, text zoom, reduced motion, clipboard denial, transition notices, methodology disclosure, and answer-network observation.
4. Add a redacting history secret scanner after the project is moved into an isolated repository rather than the broad parent home worktree.
5. A dark theme, multilingual item bank, adaptive follow-ups, remote persistence, and advanced provenance/audit infrastructure remain outside this MVP.

## Reproduction

From the project root:

```bash
npm install
npm run build
npm test -- --run
npm run qa
docker compose -f docker-images/docker-compose.yml config
docker build -t ideology-layer-sorter-frontend:latest -f frontend/Dockerfile .
docker compose -f docker-images/docker-compose.yml up -d
E2E_BASE_URL=http://127.0.0.1:8001 npm run qa
```

When finished with the local delivery container, run:

```bash
docker compose -f docker-images/docker-compose.yml down
```

## Continuation report — WorkPM branch-coverage expansion — 2026-08-26

### Outcome

The sorter was extended with a research-backed, quarantined authoring tranche without changing the production scoring contract. The strict canonical inventory is now 9 macro, 33 meso, and 60 micro nodes. The derived research target inventory is 119 entries: 107 ontology nodes plus 12 registry entries. The production bank remains 84 respondent questions, 28 per layer.

The continuation added 144 effect-free research candidates across twelve priority targets, four descriptive, four normative, and four prescriptive candidates per target. Each candidate carries existing facet/domain/construct metadata, a qualitative expected direction, source references, an academic rationale, same-answer/different-reason risk, ambiguity and social-desirability notes, jurisdictional and temporal notes, and a pending promotion record. They remain `research_candidate` records in the workbench and cannot alter effects, anchors, thresholds, manifests, share links, scoring, or result labels.

### Ontology and provenance decisions

- Khomeinism and Qutbism are represented as catalog-only micro nodes under Islamism. They have source and relation metadata but no production anchor or scoring effect.
- The implementation preserves the supplied ontology note's distinction between rank/scope and ancestry. Only explicit canonical parentage creates a breadcrumb; `related_to`, `variant_of`, `hybrid_of`, and `associated_with` relations do not silently create ancestry.
- Contextual, historical, associated, and contested formations remain outside the strict canonical graph where they do not meet the project's canonical-node boundary.
- Source records were added for the expansion, including the Oxford Handbook entry point for political-ideology scholarship, Cambridge and Oxford materials on Christian Democracy, Khomeinism, Qutbism, Pan-Africanism, Black Nationalism, and Zionism, and the Stanford Encyclopedia of Philosophy environmental-ethics entry for ecological boundary work. These are third-party research references for terminology and provenance only; this report does not compare, rank, assess, or recommend political parties, candidates, or ideologies.

### Verification evidence

| Check | Result |
|---|---|
| `npm run build` | Passed |
| `npm run test:run` | Passed, 25/25 tests |
| `npm run qa` | Passed, 9/9 local Playwright scenarios |
| `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` | Passed, 9/9 Docker-backed Playwright scenarios |
| `npm audit --audit-level=high` | Passed, zero vulnerabilities |
| `docker compose ... config` | Passed |
| Frontend Docker build | Passed |
| Docker health | Passed; container healthy and `/healthz` returned `ok` |
| Candidate-bank validators | Passed; no structural metadata or production-isolation errors |

### Explicit limits

- No cognitive review, respondent interview, comprehension test, or simulation substitute was run or claimed, per the user's explicit instruction.
- No empirical reliability, validity, invariance, or psychometric evidence exists for promotion. Neighbor distinctness and cross-cultural/jurisdictional review remain promotion-gate evidence to be supplied later if a future change requests production activation.
- No candidate was promoted, no production question was added, and no political comparison or recommendation was produced.
- Argos remains `PASS_WITH_HOLDS` for broader accessibility/security evidence that was outside this continuation, including dedicated keyboard-only, text-zoom, clipboard-denial/network-observation, and redacting historical secret-scan cases.
- The repository is initialized but has no commit. No commit, branch rewrite, or push was performed.

### Continuation artifacts

- WorkPM plan and research record: `docs/plan/ideology-sorter/branch-coverage-expansion/`
- Candidate bank: `src/research-bank.ts`
- Ontology additions: `src/ontology.ts`
- Research derivation and validators: `src/research.ts`
- Workbench presentation: `src/App.tsx`
- Argos boundary report: `docs/plan/ideology-sorter/branch-coverage-expansion/argos-report.md`
- Minos QA report: `docs/plan/ideology-sorter/branch-coverage-expansion/minos-report.md`
- WorkPM materials check: `docs/plan/ideology-sorter/branch-coverage-expansion/workpm-materials-check.md`

## Ontology coverage continuation — WorkPM cycle — 2026-08-26

### Current state

The active comprehensive-coverage goal remains open. This cycle moved the sorter from a twelve-target research tranche to an ontology-wide coverage ledger and a second core-family tranche. It did not claim that the resulting 288 candidates constitute a validated instrument.

The current audit reports 119 research targets: 107 ontology nodes and 12 registry entries. The strict canonical inventory remains 9 macro / 33 meso / 60 micro. There are 91 catalog-only ontology nodes, 15 scored-indirect targets, 12 registry-only targets, and one target with a complete explicit production block. Those gaps remain visible and are not converted into measured ideologies through shared source context.

### New research coverage

The quarantined bank now contains 288 effect-free candidates across 24 targets. The twelve new core targets are Classical Liberalism, Social Liberalism, Moderate Conservatism, National Conservatism, Social Democracy, Democratic Socialism, Left-Libertarianism, Minarchism, Libertarian Socialism, Ecosocialism, Marxism, and Communism. Each has four descriptive, four normative, and four prescriptive candidates, a qualitative profile, neighbor discriminants, a false-positive audit, and a remaining-gaps summary.

The intended composition is explicit: descriptive items address mechanisms or diagnoses, normative items address valued ends or standards, and prescriptive items address institutional routes. The three layers are evidence streams that may converge on an ideological tradition, conflict with one another, or support only a partial or hybrid interpretation. Ideology labels remain interpretive summaries rather than the end-state of the person's profile.

### Promotion and demotion ledger

`src/research-governance.ts` now records exactly one taxonomy decision for every target. Decisions include source-backed canonical promotion, canonical retention, contextual retention, associated demotion, registry-only retention, and catalog hold. Khomeinism and Qutbism are explicitly promoted to canonical catalog nodes on source-backed but contested evidence. Deep Ecology and Bioregionalism are explicitly demoted to associated registry status because their scholarly treatment does not automatically establish a political-ideology node. None of these decisions creates a numeric anchor or production scoring path.

Candidate activation remains a separate fail-closed gate. A research candidate needs substantive neighbor-distinctness evidence, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical validation before production promotion. No cognitive-review stage was added, and no empirical evidence was fabricated.

### Cycle verification

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 288 candidates, zero validation errors |
| `npm run test:run` | Passed, 26/26 |
| `npm run build` | Passed; content-size advisory only |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |

### Cycle artifacts

- Coverage plan: `docs/plan/ideology-sorter/ontology-coverage-expansion/`
- Governance: `src/research-governance.ts`
- Coverage audit: `scripts/audit-research-coverage.ts`
- Expanded candidate bank: `src/research-bank.ts`
- Workbench governance surface: `src/App.tsx`

### Remaining work

1. Research and add the remaining scored-indirect and high-centrality catalog branches.
2. Add source-backed coverage for remaining feminist, anarchist, nationalist, republican, fascist, ecological, and Islamist branches.
3. Add context-only research records for selected historical manifestations without turning them into canonical ancestry.
4. Reassess existing production anchors only after branch coverage and applicable review evidence are sufficient.

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Radical and Reactionary Conservatism coverage pass — WorkPM v10 — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for two existing canonical meso branches: Radical Conservatism and Reactionary Conservatism. Each receives four descriptive, four normative, and four prescriptive prompts plus a provisional editorial anchor. The ontology remains 9 macro, 33 canonical meso, and 60 micro nodes, with five contextual placements and a separate registry of 12 entries. The five remaining canonical meso holds—Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only.

### Research provenance and boundary

The boundary work uses [O'Sullivan's Oxford Handbook treatment of Conservatism](https://academic.oup.com/edited-volume/34324/chapter/291333309), [Pierson's Oxford account of Radical Conservatives](https://academic.oup.com/book/40376/chapter-abstract/347086894), the [Stanford Encyclopedia of Philosophy entry on Conservatism](https://plato.stanford.edu/archives/sum2024/entries/conservatism/), and [Pankakoski's peer-reviewed analysis of conservative revolution](https://www.frontiersin.org/journals/political-science/articles/10.3389/fpos.2022.959411/full). These sources support terminology, historical scope, renewal-versus-restoration boundary wording, and provenance only; they do not validate local item wording, anchors, respondent interpretation, or political classification. The production guard excludes Fascism's organic anti-pluralist unity, leader-centered mass mobilization, and movement-state transformation from the Radical Conservatism block.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 1,428 quarantined candidates, 32 dedicated-scored targets, 70 catalog-only targets, five contextual-only targets, 12 registry-only targets, zero validation errors |
| `npm run research:anchor-reachability` | Passed; all 32 production anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 53.125% layer top-three hit rate, 71.875% combined, worst ranks 29 and 25 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 42/42 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker build/health/QA | Passed; rebuilt image, healthy Compose service, `/healthz` `ok`, Docker-backed QA 10/10 |
| Documentation/state | Passed; WorkPM/Zeus records synchronized, state JSON parses, source/docs whitespace scan clean |

No cognitive review, respondent study, substitute simulation, empirical reliability, validity, invariance, psychometric calibration, or population evidence was run or claimed. The prompts and anchors remain provisional editorial measurement. Full-production overlap remains a design diagnostic; no arbitrary scoring coefficient or other production scoring change was introduced. The repository remains initialized but uncommitted, and no commit or push was performed.

## Populism and Mutualism canonical meso continuation — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This v9 continuation adds direct coverage for two already-canonical meso nodes, Populism and Mutualism, without adding, reparenting, or demoting ontology nodes. Seven canonical meso branches remain catalog-only holds: Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, Radical Conservatism, Reactionary Conservatism, and Religious Nationalism.

### Research and decision boundary

Populism was bounded from Oxford and Cambridge scholarship as a thin or host-dependent people–elite articulation involving popular sovereignty and contested institutional routes, not a fixed economic or cultural programme. Mutualism was bounded from Shantz, SEP Anarchism, and Ostrom as an anarchist-associated social/economic tradition involving reciprocal or equal exchange, possession/use, cooperatives, voluntary federation, and reduced permanent command. The sources support terminology, construct boundaries, and original item-authoring rationale only; they do not validate local effects, anchor vectors, respondent comprehension, respondent classification, or empirical discrimination.

The selected tranche adds four descriptive, four normative, and four prescriptive target-tagged prompts for each branch, plus two provisional editorial anchors. The active dataset is content version 9 with 432 prompts (144 per layer), 35 editorial anchors, and 30 canonical scoring anchors. The 1,428 effect-free research candidates remain quarantined across 119 targets. The scoring policy remains version 3; no threshold, distance, family-balancing, combined-layer, or share semantics changed.

### Structural measurement check

`npm run research:anchor-reachability` verifies that every production anchor has four target questions in each layer and routes in an isolated-anchor fixture. It also reports, without making it a pass/fail promotion criterion, that the full-production top-three fixture contains the intended anchor in 50% of layer cases and 70% of combined cases; the worst full-competition ranks are 27 by layer and 23 combined. This is an explicit overlap/coarseness diagnostic. A fixed target-block scoring blend was considered and rejected because its coefficient would be uncalibrated and unsupported by the cited literature.

### Verification evidence

| Check | Result |
|---|---|
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 42/42 |
| `npm run research:coverage --silent` | Passed; 432 prompts, 30 dedicated-scored targets, 72 catalog-only targets, five contextual-only anchors, 12 registry-only entries, 1,428 candidates, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; zero validation or isolated-routing failures; full-production overlap reported as a diagnostic |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 locally |
| Docker image rebuild | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace and Zeus JSON | Passed; no trailing whitespace and state parses as JSON |

### Explicit limits

No cognitive review, respondent study, comprehension test, response-process evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run. The two blocks and anchors are provisional editorial measurement and the production result remains an interpretive neighbor display, not an identity verdict, recommendation, or scientific classification. The repository is initialized but uncommitted; no commit or push was performed.

## Current v8 canonical meso coverage continuation — WorkPM cycle — 2026-08-26

### Scope and research decision

This WorkPM continuation selected five already-defined canonical meso branches for bounded direct coverage: Communism, Historical Republicanism, Individualist Anarchism, Neoliberalism, and Socialist / Marxist Feminism. The selection required existing canonical placement, source-backed construct metadata, a qualitative anchor profile, named neighbor discriminants, a false-positive audit, and a complete descriptive/normative/prescriptive authoring block. The decision is to retain each branch in the canonical ontology and activate a provisional dedicated-scored editorial path; it is not a claim that the local anchors classify respondents.

The source crosswalk uses the [Oxford Communism chapter](https://academic.oup.com/edited-volume/34324/chapter-abstract/291335150), [Oxford's *Socialism: A Very Short Introduction*](https://academic.oup.com/book/32741), and the [Stanford Encyclopedia entry on Marx](https://plato.stanford.edu/entries/marx/) for communist and Marxian boundaries; the [Stanford Encyclopedia entry on Republicanism](https://plato.stanford.edu/entries/republicanism/) and [Oxford's *Civic Republicanism*](https://academic.oup.com/book/1981/chapter-abstract/141819344) for historical republicanism; the [Stanford Encyclopedia entry on Anarchism](https://plato.stanford.edu/entries/anarchism/), [Stanford Encyclopedia entry on Max Stirner](https://plato.stanford.edu/entries/max-stirner/), and [Stanford Encyclopedia entry on Libertarianism](https://plato.stanford.edu/entries/libertarianism/) for individualist anarchism; the [Stanford Encyclopedia entry on Neoliberalism](https://plato.stanford.edu/entries/neoliberalism/index.html) for market/state and constitutional boundaries; and the [Stanford Encyclopedia entry on Feminist Perspectives on Class and Work](https://plato.stanford.edu/entries/feminism-class/index.html), [Stanford Encyclopedia entry on Feminist Perspectives on Power](https://plato.stanford.edu/entries/feminist-power/), and [Stanford Encyclopedia entry on Marx](https://plato.stanford.edu/entries/marx/) for socialist/Marxist-feminist production, reproduction, class, and gender distinctions. These references support terminology, historical scope, construct boundaries, and item-authoring rationale only.

Nine canonical meso branches remain explicit catalog-only holds: Conservative Nationalism, Islamism, Mutualism, National Socialism, Neo-Fascism, Populism, Radical Conservatism, Reactionary Conservatism, and Religious Nationalism. The holds preserve ontology visibility while deferring dedicated production coverage where host or jurisdictional variation, contested label boundaries, or high-risk historical scope remains unresolved. They are not ontology demotions and do not force a replacement label.

### Implementation result

- Added 60 original production prompts: four descriptive, four normative, and four prescriptive for each selected branch.
- Bumped the content version to 8: 408 prompts total, 136 per claim layer.
- Added five provisional editorial anchor vectors, bringing the dataset to 33 editorial anchors and 28 canonical scoring anchors.
- Added source metadata and canonical anchor links for the five selected nodes; no macro, meso, micro, or registry node was added or removed.
- Kept all 1,428 effect-free research candidates across 119 targets quarantined as `research_candidate` records.
- Preserved the five contextual bridge anchors as contextual-only and outside production neighbor scoring.
- Reconciled the existing governance ledger: selected branches resolve to `retain-canonical` / `scored-provisional`; held branches resolve to `hold-catalog-only`; taxonomy decisions remain separate from respondent scoring.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 408 questions, 136/136/136 layers, 28 dedicated-scored targets, 74 catalog-only targets, five contextual-only targets, 12 registry-only targets, 1,428 candidates across 119 targets, 119 profiles and false-positive audits, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed, 42/42 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker image build | Passed with `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health | Passed; recreated Compose frontend healthy and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 with `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` |
| `npm audit --audit-level=high` | Passed; zero vulnerabilities |
| JSON integrity | Passed; `docs/zeus/zeus-state.json` parses with `jq` |

### Explicit limits

The five new blocks and vectors are source-backed editorial measurement content, not cognitive or respondent-validated instruments. No cognitive review, respondent interview, comprehension test, substitute simulation, reliability estimate, validity estimate, invariance study, psychometric calibration, or population evidence was run or claimed. Automated unit, browser, Docker, coverage, build, and dependency checks establish deterministic implementation and provenance closure only. The active comprehensive goal remains open because the nine held branches and later empirical evidence gates remain unresolved.

The repository is initialized on `master` with no commits. No commit, branch rewrite, or push was performed.

## Current v7 canonical meso coverage continuation — WorkPM cycle — 2026-08-26

### Scope and research decision

The comprehensive-coverage goal remains open. This WorkPM cycle extends direct measurement coverage for eight already-defined canonical meso nodes: Christian Democracy, Contemporary Neo-Republicanism, Black Feminism, Ecofeminism, Green Anarchism, Anarcha-Feminism, Liberal Nationalism, and Radical Feminism. No new macro/meso/micro node was added; the canonical inventory remains 9 macro, 33 meso, and 60 micro nodes, with five contextual-placement nodes and a separate registry of 12 entries.

The source review used the [SEP Republicanism](https://plato.stanford.edu/entries/republicanism/), [SEP Nationalism](https://plato.stanford.edu/entries/nationalism/), [SEP Feminist Perspectives on Power](https://plato.stanford.edu/entries/feminist-power/), [SEP Feminist Environmental Philosophy](https://plato.stanford.edu/entries/feminism-environmental/), [SEP Anarchism](https://plato.stanford.edu/entries/anarchism/), [Cambridge social capitalism](https://www.cambridge.org/core/books/abs/what-is-christian-democracy/social-capitalism/8EE4DFB7697F5F05C8A63BEEA098461C), and the [Cambridge History treatment of Christian Democracy](https://www.cambridge.org/core/books/cambridge-history-of-twentiethcentury-political-thought/christian-democracy/0E40DBC230BD418CF8E8DCEB3D06AABF). These sources support terminology, construct boundaries, and item-authoring rationale only; they do not validate local wording, anchor vectors, or respondent classification.

### Implementation result

- Added 96 original target-tagged prompts: four descriptive, four normative, and four prescriptive for each of the eight targets.
- Added eight provisional editorial anchor vectors and activated the corresponding existing ontology nodes for dedicated-scored coverage.
- Bumped the active content version to 7: 348 prompts, 116 per layer, 28 editorial anchors, and 23 canonical scoring anchors. Five broad bridge anchors remain `contextual-only` and excluded from production neighbor selection.
- Preserved 1,428 effect-free `research_candidate` records across 119 targets. The audit now reports 23 `dedicated-scored`, 79 `catalog-only`, five `contextual-only`, and 12 `registry-only` targets.
- Raised the finite share-fragment bound to 32,768 after measuring the complete v7 answer payload at 22,274 characters; oversize input remains rejected without truncation.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed: 348 prompts, 116/116/116 layers, 107 ontology nodes, 12 registry entries, 23 scoring anchors, 28 editorial anchors, 1,428 candidates, 119 targets, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed: 42/42 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed: 10/10 local Playwright tests |
| Docker image build | Passed using `frontend/Dockerfile` |
| Docker health | Passed; recreated frontend is healthy and `/healthz` returned `ok` |
| Docker-backed QA | Passed: `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`, 10/10 |
| `npm audit --audit-level=high` | Passed; zero vulnerabilities |
| Zeus state JSON | Passed; `jq empty docs/zeus/zeus-state.json` |

### Explicit evidence boundary

No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability estimate, validity estimate, invariance study, or population evidence was run or claimed. The v7 questions and anchor vectors are source-backed provisional editorial measurement. The research candidates remain quarantined, and future production promotion still requires substantive neighbor-distinctness evidence, applicable cross-cultural/jurisdictional review or a documented not-applicable rationale, and later empirical validation. No political recommendation, respondent result, ranking, or current-actor comparison was produced.

The repository remains initialized on `master` with zero commits. No commit or push was performed; unrelated files were not reset or removed.

## Current v6 canonical meso and scoring-boundary continuation — WorkPM cycle — 2026-08-26

### Current state

The active manifest is content version 6 with 252 original prompts, 84 descriptive, 84 normative, and 84 prescriptive. The ontology remains 107 nodes plus 12 registry entries, with 9 canonical macro families, 33 canonical meso traditions, and 60 canonical micro branches. The dataset retains 20 editorial anchors; 15 canonical-placement anchors enter production neighbor scoring and five broad bridge anchors remain visible as `contextual-only` research/provenance context.

The research workbench remains quarantined: 1,428 effect-free `research_candidate` records cover all 119 targets, with 119 qualitative profiles, false-positive audits, and three-layer candidate blocks. The production bank adds 48 original target-tagged prompts for four existing canonical meso nodes—Libertarianism, Marxism, Social Anarchism, and Liberal Feminism—four in each claim layer per target. No registry entry or research candidate was copied into the respondent bank.

### Research basis and boundary

The source pass used the [Stanford Encyclopedia of Philosophy entry on Libertarianism](https://plato.stanford.edu/entries/libertarianism/), [SEP's Karl Marx entry](https://plato.stanford.edu/entries/marx/), [SEP's Anarchism entry](https://plato.stanford.edu/entries/anarchism/), and [SEP's Liberal Feminism entry](https://plato.stanford.edu/entries/feminism-liberal/) for terminology and construct-boundary context. The Libertarianism entry treats libertarianism as a family of views organized around individual freedom and limits on coercion; the Marx entry provides bounded context for historical materialism, class, capital, ideology, alienation, and emancipation; the Anarchism entry supports anti-hierarchy, anti-domination, voluntarism, and mutual aid distinctions; and the Liberal Feminism entry supports autonomy, equal rights/opportunity, inclusion, and institutional barriers. These sources do not validate local wording, hand-authored anchor vectors, respondent classifications, or any scientific measure.

The five broad bridge anchors—Anarchism, Green Communitarianism, Green Politics, Liberal Conservatism, and Market Socialism—were moved from indirect participation to `contextual-only`. They remain inspectable for provenance and research interpretation, but `scoringAnchorsFor()` admits only canonical-placement anchors. This prevents a broad or bridge label from silently becoming a second production scoring authority.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 252 production prompts, 84/84/84 layers, 20 editorial anchors, 15 scoring anchors, 1,428 candidates, 119 targets, 119 profiles/audits, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed, 42/42 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker build | Passed with `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health | Passed; recreated Compose frontend healthy and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`, 10/10 |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |

### Remaining gates

The four direct blocks and all anchor vectors remain provisional editorial content. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run. Future production canonicalization still requires substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a documented not-applicable rationale, and later empirical validation. The repository remains initialized on `master` with zero commits; no commit or push was performed.

## Canonical branch coverage continuation — WorkPM cycle — 2026-08-26

### Current result

The comprehensive coverage goal remains open. This continuation adds 48 original target-tagged production prompts for four already-defined canonical targets: Ecosocialism, Left-Libertarianism, Libertarian Socialism, and National Conservatism. Each block has four descriptive, four normative, and four prescriptive prompts and routes through an existing anchor. No new ideology node was added; the measured gap was direct coverage of existing ontology nodes.

The active manifest is content version 5 with 204 prompts, 68 per layer, 16 editorial anchors, and 11 `dedicated-scored` target blocks. The remaining target measurement states are 5 `scored-indirect`, 91 `catalog-only`, and 12 `registry-only`. All 1,428 research candidates across 119 targets remain quarantined as `research_candidate` records.

### Research provenance and boundary

The current authoring boundary was checked against [Löwy's Cambridge chapter on the Ecosocialist Alternative](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-environmental-sociology/ecosocialist-alternative/343A985DDDE8DAD0309D2A49C88B4208), the [Stanford Encyclopedia of Philosophy entry on Libertarianism](https://plato.stanford.edu/entries/libertarianism/), the [Stanford Encyclopedia of Philosophy entry on Anarchism](https://plato.stanford.edu/entries/anarchism/), [Ostrom's Governing the Commons](https://doi.org/10.1017/CBO9780511807763), Sen, and the existing [International Affairs treatment of national conservatism](https://academic.oup.com/ia/article/100/5/2233/7739689). These links are third-party academic provenance for terminology, construct boundaries, and authoring rationale only; they do not validate local item wording, anchor vectors, respondent classification, or a political comparison/ranking.

### Verification

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 204 production questions, 68/68/68 layers, 1,428 candidates across 119 targets, 11 dedicated-scored, 5 scored-indirect, 91 catalog-only, 12 registry-only, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed, 40/40, including complete share round trip |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; recreated image healthy on port 8001 and `/healthz` returned `ok` |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share contract | Passed; complete 12,850-character fragment round-trips under the 16,384-character bound; malformed/oversized inputs fail closed |

### Remaining conditions

No cognitive review, respondent interview, comprehension study, substitute simulation, empirical reliability, validity, invariance, or psychometric calibration was run or claimed. `dedicated-scored` is an internal coverage/traceability state, not evidence that a respondent belongs to a label. Further production promotion remains gated by substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a documented not-applicable rationale, and later empirical validation. The repository remains on `master`, initialized with zero commits; no commit or push was performed.

## Direct branch coverage continuation — WorkPM cycle — 2026-08-26

### Current state

The comprehensive sorter goal remains open. This continuation adds 72 original prompts to six already-defined ontology targets: Classical Liberalism, Social Liberalism, Moderate Conservatism, Social Democracy, Democratic Socialism, and Minarchism. Right-Libertarianism retains its preceding direct block. The active manifest is content version 4 with 156 prompts, 52 per layer, and seven `dedicated-scored` targets. No new ideology node was added because the audit identified a direct-coverage gap in existing nodes rather than an unsupported taxonomy gap.

The six blocks are source-backed editorial authoring material. The terminology and boundary review used the [Stanford Encyclopedia of Philosophy entry on Liberalism](https://plato.stanford.edu/entries/liberalism/), the [Oxford Handbook treatment of Conservatism](https://academic.oup.com/edited-volume/34324/chapter/291333309), [Kekes's *Moderate Conservatism: Reclaiming the Center*](https://academic.oup.com/book/44504), the [Oxford Handbook chapter on Social Democracy](https://academic.oup.com/edited-volume/34324/chapter-abstract/291334753?login=false), Sehon's [*Defining Socialism*](https://academic.oup.com/book/55905/chapter-abstract/439295936), Devine's [*Democratic Socialist Planning*](https://academic.oup.com/edited-volume/34643/chapter-abstract/295200384), and the [Stanford Encyclopedia of Philosophy entry on Libertarianism](https://plato.stanford.edu/entries/libertarianism/). These sources provide third-party construct context and provenance only; they do not validate the local wording, anchor vectors, or respondent classification.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 1,428 quarantined candidates, 7 dedicated-scored, 9 scored-indirect, 91 catalog-only, 12 registry-only, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed, 39/39 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; recreated container healthy on port 8001 and `/healthz` returned `ok` |
| Docker-backed QA | Passed, 10/10 with `E2E_BASE_URL=http://127.0.0.1:8001` |
| `npm audit --audit-level=high` | Passed; zero vulnerabilities |
| JSON/whitespace integrity | Passed; Zeus state parses and no trailing whitespace was reported |

### Explicit limits

- All 1,428 research candidates remain `research_candidate` records; no registry entry was added to production targeting.
- The new branch blocks are provisional editorial coverage. No cognitive review, respondent interview, substitute simulation, empirical reliability/validity, invariance, or psychometric calibration was run or claimed.
- Further canonicalization requires substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a documented not-applicable rationale, and later empirical validation.
- No commit or push was performed; the user-initialized repository remains uncommitted.

## Gated combined pattern — WorkPM cycle — 2026-08-26

### Current state

This continuation adds a typed combined result over the existing descriptive, normative, and prescriptive readings. The combined result is withheld until all three layers meet the existing 50% coverage threshold. When eligible, it calculates each layer's anchor proximity independently, averages the three full-precision fits equally, and exposes the descriptive, normative, and prescriptive contributions on each combined neighbor. The three separate layer results, taxonomy paths, source notes, and cross-layer pulls remain available.

The policy version advances from 2 to 3 so old share fragments cannot be silently reinterpreted under the changed derived-result semantics. The production bank remains 84 questions across 28 prompts per layer and 16 existing anchors. The research surface remains 1,428 quarantined candidates across all 119 targets; no candidate was promoted and no ontology status was changed.

### Research boundary

The composition is informed by [Freeden's ideological morphology](https://academic.oup.com/book/3196), which treats ideologies as structured combinations of political concepts, and [Treier and Hillygus's multidimensional measurement work](https://doi.org/10.1093/poq/nfp067). These are third-party construct references only. This report does not provide a political comparison, assessment, ranking, recommendation, or decision between ideologies, parties, candidates, policies, or issues; the local rule is an editorial display composition and not a validated identity classifier.

### Verification evidence

| Check | Result |
|---|---|
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 37/37 |
| `npm run research:coverage --silent` | Passed; 1,428 candidates, 119 targets, 119 profiles/audits, zero validation errors |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| `docker compose -f docker-images/docker-compose.yml config` | Passed |
| Docker image rebuild | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` | Passed, 10/10 Docker-backed Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Zeus JSON and source/docs whitespace checks | Passed; valid JSON and no trailing-whitespace findings |

### Holds

- Target-level production measurement remains partial: 91 catalog-only, 15 scored-indirect, 12 registry-only, and one dedicated-scored target.
- No cognitive review, respondent evidence, substitute simulation, empirical reliability/validity, invariance, or psychometric calibration was run or claimed.
- The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Completion tranche six — WorkPM cycle — 2026-08-26

### Current state

The final uncovered-target pass adds source-backed, research-only three-layer blocks for White Nationalism, Agrarian Populism, British Fascism, Civic Republicanism, Conservative New Right, Deep Ecology, Flemish/Belgian Fascism, French Fascism, Italian Fascism, Japanese Fascism, National-Syndicalism, Bernsteinian revisionism, and the existing Right-Libertarianism branch. It contributes 156 effect-free candidates, 13 qualitative profiles, 26 neighbor discriminants, 13 false-positive audits, and 13 coverage summaries.

The candidate ledger is now closed at 1,428 unique records across all 119 ontology and registry targets. Each target has four descriptive, four normative, and four prescriptive research candidates. The records remain `research_candidate` material and do not alter the respondent-facing bank, effects, anchors, thresholds, share behavior, result labels, or scoring paths.

### Measurement boundary

Candidate coverage is not production measurement. The current target states remain 91 catalog-only, 15 scored-indirect, 12 registry-only, and one dedicated-scored target. Production remains 84 questions, 28 per layer; only Right-Libertarianism has explicit target-tagged production coverage. Registry entries remain outside direct scoring, and no numeric anchors were generated from qualitative profiles.

The new structural unit fixture routes every one of the 16 existing production anchors through all three production layers using synthetic directional answers and checks the existing 28-question-per-layer contract. This is a technical reachability check only; it is not respondent data, cognitive evidence, simulation evidence, or psychometric validation. No cognitive review was run.

### Research provenance and verification

The source registry records academic provenance for the completion tranche, including the [Oxford treatment of White Nationalism](https://academic.oup.com/book/36900/chapter-abstract/322145498), [Oxford treatment of Civic Republicanism](https://academic.oup.com/book/1981/chapter-abstract/141819344), [Wiley agrarian-change research](https://doi.org/10.1111/joac.12506), [Cambridge's British Fascism volume](https://www.cambridge.org/core/books/abs/british-fascism-191839/arrival-of-fascism-the-british-fascisti-and-the-imperial-fascist-league/F42C440A230C33901F70000186CE96C6), the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510), [Cambridge's Fascist Italy treatment](https://www.cambridge.org/core/books/abs/fascist-italy/construction-of-the-regime-economic-and-social-developments/9D810505A5A384858B080F35ADD8F55A), the [Persée study of Le Cercle Proudhon](https://www.persee.fr/doc/mcm_1146-1225_1992_num_10_1_1057?pageId=T1_47), the [Oxford treatment of Bernsteinian revisionism](https://academic.oup.com/columbia-scholarship-online/book/23264/chapter-abstract/184192753), and the [Stanford Encyclopedia of Philosophy's Environmental Ethics entry](https://plato.stanford.edu/entries/ethics-environmental/). These links are provenance for terminology, boundaries, and authoring rationale, not a comparison, assessment, ranking, recommendation, or decision between political ideologies.

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 1,428 candidates across 119 targets, 119 profiles/audits, zero validation errors |
| `npm run test:run -- --reporter=dot` | Passed, 35/35 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains (1,245.76 kB minified client) |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| `docker compose -f docker-images/docker-compose.yml config` | Passed |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` | Passed, 10/10 Docker-backed Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |

The comprehensive goal remains open at the measurement and evidence gates even though candidate coverage is closed. No cognitive review, respondent study, substitute simulation, empirical reliability/validity claim, production promotion, commit, or push was performed.

## Selected canonical micro tranche IV — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds 12 source-backed canonical micro branches to the quarantined research surface: Brazilian Integralism, Cultural Nationalism, Falangism, Integral Nationalism, Legionary Fascism, One-Nation Conservatism, Paleoconservatism, Radical Republicanism, Religious Zionism, Right-Wing Populism, Salafi-Jihadism, and Third-Positionism.

The research bank now contains 1,200 unique effect-free candidates across 100 targets. The fourth tranche contributes 144 candidates, 12 qualitative profiles, 24 neighbor discriminants, 12 false-positive audits, and 12 coverage summaries. Every covered target has four descriptive, four normative, and four prescriptive candidates. Nineteen of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain `research_candidate` and `catalog-only`; they do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. Historical fascist variants, high-risk nationalist branches, and Salafi-Jihadism are bounded to analytical, source-linked, non-operational wording with explicit false-positive holds. Religious, cultural, national, and populist items do not infer a private identity, faith, party affiliation, or current-policy position. No cognitive review or substitute evidence was run.

### Research provenance and boundary

The tranche uses academic provenance including [Oxford research on Brazilian Integralism](https://academic.oup.com/isagsq/article/6/2/ksag085/8721365), [Oxford scholarship on Cultural Nationalism](https://academic.oup.com/edited-volume/28170/chapter-abstract/213006204), [Oxford's Handbook of Fascism](https://academic.oup.com/edited-volume/34510), [Oxford scholarship on the Romanian Legionary movement](https://academic.oup.com/cornell-scholarship-online/book/24049), [Oxford research on One-Nation conservatism](https://academic.oup.com/ehr/article/139/600/1199/7814564), [Oxford research on Paleoconservatism](https://academic.oup.com/book/58897/chapter-abstract/492899530), [the Stanford Encyclopedia entry on Republicanism](https://plato.stanford.edu/entries/republicanism/), [Cambridge scholarship on Zionism and its critics](https://www.cambridge.org/core/books/cambridge-history-of-judaism/zionism-and-its-critics/73C4F39C05491B593F680206CAB87978), [Oxford research on right-wing populism](https://academic.oup.com/book/62262/chapter-abstract/551612269), and [Oxford research on Salafi-Jihadism](https://academic.oup.com/book/43816/chapter/371017000). These links are third-party academic terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

No cognitive review, respondent interview, comprehension study, respondent simulation, empirical reliability, validity, invariance, or psychometric evidence was run or claimed. Production promotion remains blocked until the existing neighbor-distinctness, applicable cross-cultural/jurisdictional, and later empirical-validation gates are separately supplied.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 1,200 candidates across 100 targets, zero validation errors |
| `npm run test:run` | Passed, 32/32 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace and JSON integrity | Passed; no trailing whitespace and Zeus state parses as JSON |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Selected canonical micro tranche III — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds 12 source-backed canonical micro branches to the quarantined research surface: Austromarxism, Classical-Liberal Feminism, Collectivist Anarchism, Cultural Feminism, Egalitarian-Liberal Feminism, Egoist Anarchism, Left-Wing Populism, Lesbian Feminism, Neoconservatism, Social Ecology, Socialist Feminism, and Wasatiyya.

The research bank now contains 1,056 unique effect-free candidates across 88 targets. The third tranche contributes 144 candidates, 12 qualitative profiles, 24 neighbor discriminants, 12 false-positive audits, and 12 coverage summaries. Every covered target has four descriptive, four normative, and four prescriptive candidates. Thirty-one of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain `research_candidate` and `catalog-only`; they do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. Populist records preserve the distinction between a people–elite articulation and its host commitments. Feminist, anarchist, ecological, neoconservative, and Wasatiyya records preserve theoretical and historical boundaries without inferring identity, faith, private values, or party affiliation. No operational extremist content is included, and no historical or religious label is an automatic activation path.

### Research provenance and boundary

The tranche uses academic provenance including [Oxford scholarship on Austromarxism](https://academic.oup.com/fh/advance-article-pdf/doi/10.1093/fh/crae051/61287040/crae051.pdf), [the Oxford Handbook chapter on socialist, radical, and lesbian feminisms](https://academic.oup.com/edited-volume/43643/chapter-abstract/365011708), [Oxford scholarship on neoconservatism](https://academic.oup.com/nyu-press-scholarship-online/book/37056/chapter-abstract/323107676), [Oxford scholarship on Social Ecology and political movements](https://academic.oup.com/book/980/chapter-abstract/137838792), [Oxford research on left populism](https://academic.oup.com/ia/article/100/5/1899/7750271), [Oxford research on right-wing populism](https://academic.oup.com/book/62262/chapter-abstract/551612269), [the Stanford Encyclopedia entry on Anarchism](https://plato.stanford.edu/entries/anarchism/), and [Cambridge scholarship on the Wasatiyya trend](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/41EE0EE3D602AA3ED9E90525DF61DB47/9780511626814c2_p48-76_CBO.pdf). These links are third-party academic terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

No cognitive review, respondent interview, comprehension study, respondent simulation, empirical reliability, validity, invariance, or psychometric evidence was run or claimed. Production promotion remains blocked until the existing neighbor-distinctness, applicable cross-cultural/jurisdictional, and later empirical-validation gates are separately supplied.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 1,056 candidates across 88 targets, zero validation errors |
| `npm run test:run` | Passed, 31/31 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace and JSON integrity | Passed; no trailing whitespace and Zeus state parses as JSON |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Canonical meso coverage continuation — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds the remaining 19 canonical meso traditions to the quarantined research surface: Anarcha-Feminism, Black Feminism, Conservative Nationalism, Contemporary Neo-Republicanism, Historical Republicanism, Individualist Anarchism, Liberal Feminism, Liberal Nationalism, Libertarianism, Mutualism, National Socialism, Neo-Fascism, Neoliberalism, Radical Conservatism, Radical Feminism, Reactionary Conservatism, Religious Nationalism, Social Anarchism, and Socialist / Marxist Feminism.

The research bank now contains 624 effect-free candidates across 52 targets. Every covered target has four descriptive, four normative, and four prescriptive candidates, a qualitative anchor profile, two neighbor discriminants in the new meso tranche, a false-positive audit, and a coverage summary. All 33 canonical meso traditions now have research-only blocks; 67 of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain `research_candidate` and `catalog-only`. They do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. National Socialism and Neo-Fascism are bounded historical/analytical fields with explicit high-risk false-positive holds and no automatic activation path.

### Research provenance and boundary

The continuation refreshed the source registry with the current Stanford Encyclopedia treatment of Neoliberalism and used the existing SEP/Oxford records for anarchism, feminism, republicanism, nationalism, conservatism, liberalism, fascism, and related fields. These links are third-party terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

No cognitive review, respondent interview, comprehension study, respondent simulation, empirical reliability, validity, invariance, or psychometric evidence was run or claimed. Production promotion remains blocked until the existing neighbor-distinctness, applicable cross-cultural/jurisdictional, and later empirical-validation gates are separately supplied.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 624 candidates, 52 profile/audit rows, zero validation errors |
| `npm run test:run` | Passed, 28/28 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Macro-family coverage continuation — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds the nine macro-family blocks—Liberalism, Conservatism, Socialism, Anarchism, Nationalism, Republicanism, Fascism, Ecologism, and Feminism—to the quarantined research bank. It does not convert macro labels into production-scored results, and it does not claim that macro-family items can identify a person's complete ideology.

The audit now reports 119 research targets: 107 ontology nodes and 12 registry entries. The strict canonical inventory remains 9 macro / 33 meso / 60 micro. There are 91 catalog-only ontology nodes, 15 scored-indirect targets, 12 registry-only targets, and one target with a complete explicit production block. The remaining 86 targets without curated blocks stay visible as an explicit backlog.

### New research coverage

The effect-free bank now contains 396 candidates across 33 targets. Every covered target has four descriptive, four normative, and four prescriptive candidates, plus a qualitative anchor profile, at least two neighbor discriminants, a false-positive audit, and a coverage summary. The macro blocks use the same source-linked architecture as the earlier meso/micro tranches: descriptive mechanisms, normative commitments, and prescriptive routes are kept separate so an ideology label remains an interpretive synthesis rather than an end-state.

Fascism is included only as a bounded historical/analytical research target with explicit false-positive and social-desirability holds. It is not presented as a recommendation, a normative ranking, or an automatic production classification. The source links in this report are third-party terminology and provenance references; they are not a comparison, assessment, ranking, or recommendation of political parties, candidates, or ideologies.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 396 candidates, 33 profiled/audited targets, zero validation errors |
| `npm run test:run` | Passed, 27/27 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker-backed QA | Passed, 10/10 Playwright scenarios; container healthy and `/healthz` returned `ok` |

### Explicit limits

- No cognitive review, respondent interview, comprehension test, or simulation substitute was run or claimed, per the user's explicit instruction.
- No empirical reliability, validity, invariance, or psychometric evidence exists for production promotion.
- No candidate was promoted into `DATASET.questions`; production remains 84 questions, 28 per layer.
- No commit, branch rewrite, or push was performed; the user-initialized repository remains uncommitted.

## Selected canonical micro tranche continuation — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds 12 source-backed canonical micro branches to the quarantined research surface: Anarcho-Communism, Anarcho-Syndicalism, Anti-Colonial Nationalism, Arab Nationalism, Civic Nationalism, Ethnocultural Nationalism, Hindutva, Marxist Feminism, Materialist Feminism, Neo-Nazism, Revolutionary Islamism, and Womanism.

The research bank now contains 768 unique effect-free candidates across 64 targets. Every covered target has four descriptive, four normative, and four prescriptive candidates, a qualitative anchor profile, at least two neighbor discriminants, a false-positive audit, and a coverage summary. The new tranche contributes 144 candidates, 12 profiles, 24 neighbor discriminants, 12 false-positive audits, and 12 coverage summaries. Fifty-five of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain `research_candidate` and `catalog-only`; they do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. Hindutva, Neo-Nazism, and Revolutionary Islamism receive explicit identity/faith and high-risk historical or analytical false-positive holds. No operational extremist content is included, and no historical label is an automatic activation path.

### Research provenance and boundary

The tranche uses academic provenance including [SEP Feminist Perspectives on Class and Work](https://plato.stanford.edu/entries/feminism-class/index.html), [SEP Feminist Perspectives on Power](https://plato.stanford.edu/entries/feminist-power/), [Cambridge scholarship on Arab nationalism](https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/ulema-ethnicity-and-nationalism-in-the-arab-middle-east-a-revised-perspective/742255AA1E7C0A52A69BECF50A17C07A), [Oxford scholarship on Hindutva](https://academic.oup.com/edited-volume/62239/chapter-abstract/550810397), and [Oxford scholarship on Womanist Theology](https://academic.oup.com/edited-volume/34322/chapter-abstract/291323805), alongside existing records for anarchism, nationalism, Islamism, fascism, and feminist theory. These links are third-party terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

No cognitive review, respondent interview, comprehension study, respondent simulation, empirical reliability, validity, invariance, or psychometric evidence was run or claimed. Production promotion remains blocked until the existing neighbor-distinctness, applicable cross-cultural/jurisdictional, and later empirical-validation gates are separately supplied.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 768 candidates, 64 profiles/audits, zero validation errors |
| `npm run test:run` | Passed, 29/29 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace check | Passed; no trailing whitespace reported |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Selected canonical micro tranche II — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds 12 additional source-backed canonical micro branches to the quarantined research surface: Anarcho-Pacifism, Anarcho-Primitivism, Council Communism, Guild Socialism, Autonomist Marxism, Maoism, Marxism-Leninism, Trotskyism, Cultural / Spiritual Ecofeminism, Materialist / Socialist Ecofeminism, Buddhist Nationalism, and Christian Nationalism.

The research bank now contains 912 unique effect-free candidates across 76 targets. The second tranche contributes 144 candidates, 12 qualitative profiles, 24 neighbor discriminants, 12 false-positive audits, and 12 coverage summaries. Every covered target has four descriptive, four normative, and four prescriptive candidates. Forty-three of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain `research_candidate` and `catalog-only`; they do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. Historical communist and Marxist fields are doctrine-bounded rather than regime classifications. Religious-national fields are explicitly separated from private faith, cultural familiarity, or ordinary patriotism. No operational extremist content is included, and no historical or religious label is an automatic activation path.

### Research provenance and boundary

The tranche uses academic provenance including [Oxford's An Anarcho-Pacifist Reading of International Relations](https://academic.oup.com/isq/article/66/4/sqac070/6748234), [Oxford's Anarchism and World Politics](https://academic.oup.com/book/43805/chapter-abstract/369504327), [Oxford's Political Theory of Council Democracy](https://academic.oup.com/edinburgh-scholarship-online/book/37811/chapter-abstract/332278027?login=false), [Cambridge's Fabianism and Guild Socialism](https://www.cambridge.org/core/journals/international-review-of-social-history/article/fabianism-and-guild-socialism-two-views-of-democracy/351363ADC911948E0178D3E02B7D3FE1), [SAGE's Autonomism in Theory and Practice](https://journals.sagepub.com/doi/10.1521/siso.2015.79.2.221), and Oxford and Cambridge scholarship on [Maoism](https://academic.oup.com/edited-volume/35402/chapter-abstract/302647340), [communism](https://academic.oup.com/edited-volume/34324/chapter-abstract/291335150), [Trotskyism](https://www.cambridge.org/core/journals/international-review-of-social-history/article/trotskyism-emerges-from-obscurity-new-chapters-in-its-historiography/AFC0AD8346377E4949F441404D2E6A28), [ecofeminism](https://academic.oup.com/reference/62348/reference-article-abstract/554367572), [Buddhism and nationalism](https://academic.oup.com/edited-volume/27986/chapter-abstract/211689340), and [Christian Nationalism](https://www.cambridge.org/core/journals/politics-and-religion/article/varieties-of-american-christian-nationalism/B78994104CA1CCBBAC34A20E3AA2A980). These links are third-party academic terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

No cognitive review, respondent interview, comprehension study, respondent simulation, empirical reliability, validity, invariance, or psychometric evidence was run or claimed. Production promotion remains blocked until the existing neighbor-distinctness, applicable cross-cultural/jurisdictional, and later empirical-validation gates are separately supplied.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 912 candidates across 76 targets, zero validation errors |
| `npm run test:run` | Passed, 30/30 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace and JSON integrity (wave II) | Passed; no trailing whitespace and Zeus state parses as JSON |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Contextual and registry coverage pass — WorkPM cycle — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds six research-only context blocks: Anarchism (broad anchor), Green Communitarianism, Green Politics, Liberal Conservatism (broad anchor), Market Socialism (broad anchor), and Bioregionalism. The first five remain contextual `scored-indirect` targets; Bioregionalism remains a `registry-only` target. These placements preserve associated and broad formations as useful research context without promoting them into canonical ancestry or respondent-facing scoring.

The research bank now contains 1,272 unique effect-free candidates across 106 targets. The contextual/registry pass contributes 72 candidates, six qualitative profiles, 12 neighbor discriminants, six false-positive audits, and six coverage summaries. Every covered target has four descriptive, four normative, and four prescriptive candidates. Thirteen of the 119 derived targets remain without curated blocks and stay visible as backlog.

The new records remain quarantined research candidates. They do not add production questions, effects, anchors, thresholds, share behavior, result labels, or scoring paths. Contextual targets are tested for separation from direct production target tags; Bioregionalism is rendered as secondary context in the workbench while its audit status remains registry-only. No cognitive review or substitute evidence was run.

### Research provenance and boundary

The pass reuses the source registry's [Cambridge ecologism chapter](https://www.cambridge.org/core/books/politics-of-the-environment/green-political-thought/BA5EB7C4D160DD1D16ECF39BF55C2047), [Stanford Encyclopedia entry on Environmental Ethics](https://plato.stanford.edu/entries/ethics-environmental/), [Ostrom's Governing the Commons](https://doi.org/10.1017/CBO9780511807763), [Stanford Encyclopedia entry on Liberalism](https://plato.stanford.edu/entries/liberalism/), [Oxford Handbook treatment of Conservatism](https://academic.oup.com/edited-volume/34324), and [Oxford's Socialism: A Very Short Introduction](https://academic.oup.com/book/32741). These links are third-party terminology and provenance references only; this report does not compare, assess, rank, recommend, or decide between political ideologies, parties, candidates, policies, or issues.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage` | Passed; 119 targets, 1,272 candidates across 106 targets, zero validation errors |
| `npm run test:run` | Passed, 33/33 |
| `npm run build` | Passed; Vite emitted the existing content-size advisory for the inspectable research bank |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Source/docs whitespace and JSON integrity | Passed; no trailing whitespace and Zeus state parses as JSON |

The repository remains initialized but uncommitted. No commit, branch rewrite, or push was performed.

## Islamism direct-coverage continuation — WorkPM v11 — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical meso node Islamism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional editorial anchor. The ontology remains 9 macro, 33 canonical meso, and 60 micro nodes, with five contextual placements and a separate registry of 12 entries. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.

### Research provenance and boundary

The boundary work uses [Browers's Oxford Handbook chapter on Islamic Political Ideologies](https://academic.oup.com/edited-volume/34324/chapter-abstract/291340862), [Voll and Sonn's Oxford Bibliographies entry on Political Islam](https://academic.oup.com/reference/62361/reference-article-abstract/554568881), Cambridge's [Islamism and Ideology chapter](https://www.cambridge.org/core/books/abs/limits-of-islamism/islamism-and-ideology-philosophical-issues-and-analytical-categories/E2663B0987FDB1C3C1577B37014453AE), and the peer-reviewed [Valbjørn and Gunning article](https://academic.oup.com/isr/article/27/1/viaf001/8090009). These sources support terminology, internal variation, public-project/private-faith boundaries, and provenance only; they do not validate local item wording, effects, anchor vectors, respondent interpretation, or political classification. No operational violence content was added.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 468 questions, 156 per layer, 33 dedicated-scored targets, 69 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 33 production anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 52.5253% by layer and 69.6970% combined, with worst ranks 30 and 26 |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 42/42 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed; no-cache image rebuild |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| Source/docs whitespace and Zeus JSON | Passed; v11 state and activity records are synchronized, state parses as JSON, and source/docs whitespace scan is clean |

The structural audit closes isolated routing for Islamism but shows that the broad Islamism anchor is not in the top three in the full-competition fixture. This is retained as a measurement-design diagnostic; no arbitrary facet, target-block coefficient, or scorer change was introduced. The research bank remains effect-free and quarantined, and the new production prompts and anchor remain provisional editorial measurement. No cognitive review, respondent study, substitute simulation, empirical reliability, validity, invariance, psychometric calibration, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Ordoliberalism direct-coverage continuation — WorkPM v12 — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro node Ordoliberalism under Liberalism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional editorial anchor. The ontology remains 9 macro, 33 canonical meso, and 60 micro nodes, with five contextual placements and a separate registry of 12 entries. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.

### Research provenance and boundary

The boundary work uses the [Oxford Handbook of Ordoliberalism](https://academic.oup.com/edited-volume/44607), [Hayek's “The Use of Knowledge in Society”](https://www.aeaweb.org/aer/top20/35.4.519-530.pdf), and the [Stanford Encyclopedia of Philosophy entry on Liberalism](https://plato.stanford.edu/entries/liberalism/). The Oxford reference supports treating Ordoliberalism as historically specific, internally contested, and concerned in relevant strands with competition as an institutional order, rule-bound authority, and the social-market question. Hayek and SEP Liberalism provide adjacent context for dispersed knowledge, general rules, and liberal variation. These references support terminology, boundary wording, provenance, and original item authoring only; they do not validate local item wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary distinguishes Ordoliberalism from generic market preference, Classical Liberalism, Neoliberalism, Social Democracy, and Mutualism. Descriptive items address private concentration and institutional conditions of competition; normative items address liberty under general rules, protection against private domination, social stability, and a bounded social floor; prescriptive items address competition enforcement, anti-monopoly rules, predictable law, limited public ownership, and social-market provision. A single policy preference is not sufficient evidence for the label.

### Decision and alternatives

Ordoliberalism was selected because the repository already had canonical placement, high-strength source metadata, 12 effect-free candidates, two neighbor discriminants, a false-positive audit, and a complete three-layer candidate block. Pan-Africanism remains a research-only alternative because its continental/transnational, sovereign-state, and racial-solidarity visions require a sharper cross-cutting boundary. Black Nationalism remains research-only because its historically fluid relations among racial solidarity, self-determination, separatism, anti-colonialism, and Black Feminism create higher scope and false-positive risk. The four unresolved canonical meso holds were not activated.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 480 questions, 160 per layer, 34 dedicated-scored targets, 68 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 34 production anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 51.9608% by layer and 70.5882% combined, with worst ranks 31 and 27 |
| `npx tsc --noEmit --pretty false` | Passed through the production build |
| `npm run test:run -- --reporter=dot` | Passed, 43/43 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed; no-cache image rebuild |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| Source/docs whitespace and Zeus JSON | Passed; final v12 state, report, log, and activity records synchronize and parse cleanly |

The structural audit closes isolated routing for Ordoliberalism and all other production anchors but reports full-production overlap only as a measurement-design diagnostic. The current shared facet geometry does not establish that the branch is empirically identifiable. The 12 prompts and anchor remain provisional editorial measurement; no cognitive review, respondent study, substitute simulation, empirical reliability, validity, invariance, psychometric calibration, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Pan-Africanism direct-coverage continuation — WorkPM v13 — 2026-08-26

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro node Pan-Africanism under Nationalism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional editorial anchor. The ontology remains 9 macro, 33 canonical meso, and 60 micro nodes, with five contextual placements and a separate registry of 12 entries. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds; Black Nationalism and Anti-Colonial Nationalism remain deferred research-only alternatives.

### Research provenance and boundary

The boundary work uses the [Oxford African Affairs article “Bringing Pan-Africanism Back in as an Analytical Category”](https://academic.oup.com/afraf/article/125/498/1/8512174), the [Oxford Handbook sociology chapter on Pan-Africanism](https://academic.oup.com/edited-volume/44004/chapter-abstract/371683877), the [Cambridge article on internationalist, sovereigntist, and nativist visions](https://www.cambridge.org/core/journals/review-of-international-studies/article/abs/internationalists-sovereigntists-nativists-contending-visions-of-world-order-in-panafricanism/85ED07FAA4CCB08F6CDB2A532437B3E2), and the [Cambridge Du Bois Review distinction between Pan-Africanism and Black separatism](https://www.cambridge.org/core/journals/du-bois-review-social-science-research-on-race/article/abs/true-to-our-native-land-distinguishing-attitudinal-support-for-panafricanism-from-black-separatism/2378116FD1172FA43A339603DCB11). These references support terminology, internal-variation analysis, neighbor boundaries, provenance, and original item authoring only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary is a historically varied transnational liberation tradition centered on African and diasporic solidarity, anti-colonial self-determination, racial equality, and cooperation across borders. It does not require a single continental state or one racial-national strategy. The prompts distinguish continuing colonial/racial power, African/diasporic interdependence, solidarity, cultural recovery, self-determination, pooled sovereignty, diasporic participation, reduced external dependence, and cross-border liberation cooperation from cultural pride alone, ordinary state nationalism, Black separatism, and generic anti-imperial sentiment.

### Decision and alternatives

Pan-Africanism was selected because the repository already had canonical placement, source metadata, 12 effect-free candidates, two neighbor discriminants, a qualitative profile, and a false-positive audit. The Cambridge internal-visions record is retained as a scope limitation rather than split into unresearched sub-anchors. No facet or target-block coefficient was added, and the existing scorer remains unchanged.

Black Nationalism remains deferred because its historically fluid relationship among racial solidarity, self-determination, separatism, anti-colonialism, and Black Feminism creates a high cross-cutting false-positive risk. Anti-Colonial Nationalism remains deferred because its state-bounded independence emphasis is a useful neighbor, but the current pass does not establish a sufficiently discriminating production block. The four unresolved canonical meso holds were not activated.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 492 questions, 164 per layer, 35 dedicated-scored targets, 67 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 35 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 48.5714% by layer and 65.7143% combined, with worst ranks 32 and 28; Pan-Africanism ranks 7/6/7 by layer and 6 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 44/44 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed; no-cache image rebuild |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| Source/docs whitespace and Zeus JSON | Passed; final v13 state parses as JSON and source/docs whitespace scan is clean |

The structural audit closes isolated routing for Pan-Africanism but reports full-production overlap only as a measurement-design diagnostic. The shared facet geometry does not establish empirical identifiability. The 12 prompts and anchor remain provisional editorial measurement; no cognitive review, respondent study, substitute simulation, empirical reliability, validity, invariance, psychometric calibration, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Religious Nationalism direct-coverage continuation — WorkPM v14 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing parentless canonical meso hybrid Religious Nationalism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso including five contextual placements, and 60 micro nodes, with a separate registry of 12 entries. Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only canonical holds; religion-specific variants remain distinct catalog-only nodes.

### Research provenance and boundary

The boundary work uses the [Oxford Research Encyclopedia entry on Religious Nationalism and Religious Influence](https://academic.oup.com/edited-volume/62239/chapter-abstract/550810397), [Zubrzycki's comparative review in Sociology of Religion](https://academic.oup.com/socrel/advance-article/doi/10.1093/socrel/sraf015/8193892?searchresult=1), the [Oxford History of Hinduism chapter on Hindu Nationalism](https://academic.oup.com/book/35280/chapter/299881760), and the [Cambridge History of Judaism chapter on Zionism and its critics](https://www.cambridge.org/core/books/cambridge-history-of-judaism/zionism-and-its-critics/73C4F39C05491B593F680206CAB87978). These references support a public religion–nation fusion construct, comparative variation, bounded examples, provenance, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary requires religious authority, sacred history, or religiously marked membership to be jointly constitutive of national identity, self-government, or state purpose. It distinguishes that public fusion from private faith, religion-neutral nationalism, generic traditionalism, cultural majoritarianism without a religion–nation mechanism, and any single religion-specific variant. The construct is deliberately broad enough to cover comparative variation but does not imply that all religious political action is Religious Nationalism.

### Decision and alternatives

Religious Nationalism was selected because the repository already had a canonical parentless hybrid node, high-strength comparative source coverage, 12 effect-free candidates, two neighbor discriminants, a false-positive audit, and a complete 4/4/4 candidate block. Its anchor is provisional and editorial; it does not promote any religion-specific variant or create canonical parentage.

Conservative Nationalism remains deferred because its current boundary overlaps with the existing National Conservatism micro node and would require a clearer distinction between a broad national-conservative family and a canonical branch. National Socialism and Neo-Fascism remain deferred because their historically specific and high-risk boundaries require a more explicit handling policy than this tranche provides. These alternatives remain catalog-only rather than being silently merged or demoted.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 504 questions, 168 per layer, 36 dedicated-scored targets, 66 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 36 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 47.2222% by layer and 63.8889% combined, with worst ranks 33 and 29; Religious Nationalism ranks 6/19/11 by layer and 10 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 45/45 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| `npm run qa` | Passed, 10/10 local Playwright scenarios |
| Docker Compose config | Passed with `-f docker-images/docker-compose.yml` |
| Docker image build | Passed; no-cache image rebuild |
| Docker health and `/healthz` | Passed; healthy / `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| Source/docs whitespace and Zeus JSON | Passed; v14 records synchronize, state parses as JSON, and source/docs whitespace scan is clean |

The isolated reachability result closes structural routing for Religious Nationalism without changing the scorer, facet geometry, threshold, distance, family balancing, or share contract. Full-production overlap remains a deterministic measurement-design diagnostic. The 12 prompts and anchor are source-backed editorial additions, not respondent measures. No cognitive review, respondent study, substitute simulation, empirical reliability, validity, invariance, psychometric calibration, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Conservative Nationalism direct-coverage continuation — WorkPM v15 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing parentless canonical meso hybrid Conservative Nationalism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso including five contextual placements, and 60 micro nodes, with 12 registry entries. National Socialism and Neo-Fascism remain catalog-only high-risk historical holds; the National Conservatism micro child remains distinct.

### Research provenance and boundary

The boundary work uses the [SEP Nationalism entry](https://plato.stanford.edu/archives/sum2026/entries/nationalism/), the [Oxford Conservatism chapter](https://academic.oup.com/edited-volume/34324/chapter/291333309), the [International Affairs article on national conservatism](https://academic.oup.com/ia/article/100/5/2233/7739689), and [Sekerák's Journal of Political Ideologies article](https://www.tandfonline.com/doi/full/10.1080/13569317.2025.2484524). These references support a contested conservative-national formation, inherited continuity, bounded civic solidarity, sovereignty, institutional stewardship, comparative caution, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary jointly tests inherited national continuity, bounded civic solidarity, self-government and sovereignty, institutional stewardship, and accountable gradual change. It excludes generic patriotism, generic Conservatism, generic Nationalism, ancestry-only solidarity, and one contemporary movement as sufficient evidence. The selected block is not a universal policy programme or a respondent identity label.

### Decision and alternatives

Conservative Nationalism was selected because its existing research record has a complete 12-candidate block, a source-linked profile, two neighbor discriminants, a false-positive audit, and a bounded parentless hybrid placement. National Socialism remains held because its racial/völkisch, anti-pluralist, historically specific, and mass-mobilizational bundle requires a separate high-risk, time-bounded policy. Neo-Fascism remains held because postwar continuity and adaptation are contested and a broad block could become an imprecise contemporary label. These holds are research boundaries, not ontology demotions.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 516 questions, 172 per layer, 37 dedicated-scored targets, 65 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 37 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 46.8468% by layer and 62.1622% combined, with worst ranks 34 and 30; Conservative Nationalism ranks 5/20/1 by layer and 2 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 46/46 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v15 fragment measured 33,459 characters and round-tripped under the finite 36,864-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| State and documentation | Passed; JSON parse and source/docs whitespace checks completed after synchronization |

The 1,428 research candidates remain effect-free and quarantined. The v15 share guard is an explicit finite capacity accommodation from 32,768 to 36,864 characters; serialized answers and version checks remain unchanged. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population evidence was run. The repository remains initialized but uncommitted; no commit or push was performed.

## National Socialism direct-coverage continuation — WorkPM v16 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical meso National Socialism node. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Neo-Fascism remains catalog-only because post-1945 continuity, adaptation, and organizational boundaries require separate high-risk handling.

### Research provenance and boundary

The boundary work uses the [Oxford Handbook of the Weimar Republic chapter on National Socialism](https://academic.oup.com/edited-volume/40697/chapter-abstract/348423596), the [Oxford Handbook of Political Ideologies chapter on Fascism](https://academic.oup.com/edited-volume/34324/chapter-abstract/291337436), and the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510). These sources support a historically specific German National Socialist construct, the broader contested fascism field, historical scope, provenance, and original item authoring only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary is German National Socialism, especially the interwar movement and the 1933–1945 regime, requiring convergent völkisch/racialized membership, racial hierarchy, leader-centered mobilization, anti-liberal institutions, exclusionary rights, and national renewal. Generic nationalism, generic authoritarianism, private identity, or current-actor inference is insufficient evidence. The selection is a provisional editorial measurement decision, not a taxonomy rewrite, empirical validation, or identity label.

### Decision and alternatives

National Socialism was selected over Neo-Fascism because the historical object can be bounded to a defined German movement and regime period. Neo-Fascism remains a catalog-only hold because its post-1945 continuity and adaptation field is broader and more contested. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed. The 1,428 research candidates remain effect-free and quarantined.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 528 questions, 176 per layer, 38 dedicated-scored targets, 64 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 38 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 46.4912% by layer and 63.1579% combined, with worst ranks 35 and 31; National Socialism ranks 1/1/1 by layer and 1 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 47/47 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v16 fragment measured 34,275 characters and round-tripped under the finite 36,864-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| State and documentation | Passed; v16 WorkPM/Zeus/activity records synchronized, state parses as JSON, and source/docs whitespace checks pass |

The 12 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Anti-Colonial Nationalism direct-coverage continuation — WorkPM v20 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Anti-Colonial Nationalism node under `Nationalism`. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Arab Nationalism and Maoism remain catalog-only alternatives, and Neo-Fascism remains a high-risk catalog-only hold.

### Research provenance and boundary

The boundary work uses [Getachew's *A Political Theory of Decolonization*](https://academic.oup.com/princeton-scholarship-online/book/14344/chapter-abstract/168273047), [Go and Watson's comparative study of anticolonial nationalism](https://www.cambridge.org/core/journals/european-journal-of-sociology-archives-europeennes-de-sociologie/article/abs/anticolonial-nationalism-from-imagined-communities-to-colonial-conflict/A612DBBD02197ACF4612497676202CFD), [Simpson on self-determination and decolonization](https://academic.oup.com/edited-volume/28076/chapter-abstract/212122667), [Sultan on self-rule and peoplehood in colonial India](https://www.cambridge.org/core/journals/american-political-science-review/article/abs/selfrule-and-the-problem-of-peoplehood-in-colonial-india/9677B7E1E995EE5F118C75FE76FDC45D), [Walker on postcolonial nationalist claims](https://academic.oup.com/past/article/242/1/227/5298765), and the [SEP Nationalism entry](https://plato.stanford.edu/archives/sum2026/entries/nationalism/). These sources support colonial/external domination, collective self-rule, open-ended self-determination, international nondomination, postcolonial claims, historical variation, and boundary writing. They support terminology, provenance, and original item authoring only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary is a historically varied anti-imperial and national-liberation field in which colonial or externally imposed political, economic, cultural, and institutional domination is diagnosed; collective self-rule and self-determination are pursued; and inherited international or postcolonial arrangements may be transformed. Formal independence is one route rather than a sufficient endpoint. The block does not require one state design, armed struggle, Marxist doctrine, pan-continental identity, racial/ethnic exclusion, or one historical movement. It distinguishes this field from generic Nationalism, ordinary sovereignty preference, Pan-Africanism, Black Nationalism, Arab Nationalism, and Maoism.

### Decision and alternatives

Anti-Colonial Nationalism was selected over Arab Nationalism, Maoism, and Neo-Fascism because the repository already has an existing canonical micro node, a high-strength 12-candidate block, a profile, neighbor discriminants, a false-positive audit, and an academically supported historically varied anti-imperial/self-rule boundary. Arab Nationalism remains deferred for a language/community, pan-Arab, territorial, and colonial-state pass. Maoism remains deferred for a revolutionary-organization, peasant-strategy, mass-line, party/state, and historical-adaptation pass. Neo-Fascism remains a high-risk historical hold because postwar continuity and adaptation are broader and more contested. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed. The 1,428 research candidates remain effect-free and quarantined.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 576 questions, 192 per layer, 42 dedicated-scored targets, 60 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 42 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 43.6508% by layer and 54.7619% combined, with worst ranks 39 and 35; Anti-Colonial Nationalism ranks 6/9/7 by layer and 5 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 51/51 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v20 fragment measured 37,651 characters and round-tripped under the finite 40,960-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios against the rebuilt image |
| State and documentation | Passed; final v20 state/log/activity records parse and source/docs whitespace checks pass |

The 12 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Black Nationalism direct-coverage continuation — WorkPM v18 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Black Nationalism node under Nationalism. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives, while Neo-Fascism remains a high-risk catalog-only hold.

### Research provenance and boundary

The boundary work uses the [Cambridge Guide to African American History chapter on Black Nationalism](https://www.cambridge.org/core/books/abs/cambridge-guide-to-african-american-history/black-nationalism/13C0A82189B4F1086339C2E84BACB6A3), [Avilez's Oxford Research Encyclopedia treatment](https://academic.oup.com/edited-volume/61883/chapter-abstract/547804714), [Jagmohan's Political Theory article](https://doi.org/10.1177/0090591719897569), and [Spence, Shaw, and Brown's Du Bois Review distinction between Pan-Africanism and Black separatism](https://www.cambridge.org/core/journals/du-bois-review-social-science-research-on-race/article/abs/true-to-our-native-land-distinguishing-attitudinal-support-for-panafricanism-from-black-separatism/2378116FD1172FA43A339603DCB11). These sources support a protean field of racial consciousness, linked fate, collective action, autonomy, self-determination, solidarity, and varied institutional strategies; they support terminology, provenance, and original item authoring only. They do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary requires a convergent Black collective dignity or linked-fate claim, anti-Black institutional/material power analysis, collective autonomy or self-determination, and self-directed institutions. It preserves state-seeking, community-national, cultural, economic, diasporic, reformist, and revolutionary variation. Generic Black identity, cultural pride, separatism alone, Pan-Africanism alone, one historical organization, or current-actor inference is insufficient evidence. Black Nationalism remains analytically distinct from Pan-Africanism's constitutive African/diasporic scope and Black Feminism's constitutive gendered/intersectional social-reproduction analysis, while allowing historical traditions to bridge them.

### Decision and alternatives

Black Nationalism was selected over Materialist Feminism, Anti-Colonial Nationalism, and Neo-Fascism because the repository already had an existing canonical micro node, a high-strength 12-candidate block, a profile, two neighbor discriminants, a false-positive audit, and a source-supported boundary that can preserve variation without requiring one state, separatist, or economic programme. Materialist Feminism remains deferred pending a distinct Marxist/social-reproduction/feminist theory pass. Anti-Colonial Nationalism remains deferred because its state-oriented self-determination boundary overlaps heavily with Pan-African and Black-national fields. Neo-Fascism remains a high-risk historical hold because post-1945 continuity and adaptation are not closed for one generic block. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 552 questions, 184 per layer, 40 dedicated-scored targets, 62 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 40 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 45.0000% by layer and 60.0000% combined, with worst ranks 37 and 33; Black Nationalism ranks 3/15/7 by layer and 4 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 49/49 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v18 fragment measured 35,875 characters and round-tripped under the finite 36,864-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios when run separately |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios against the rebuilt image |
| State and documentation | Passed; WorkPM/Zeus/activity records synchronized, state JSON and source/docs whitespace checks pass |

The 12 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Civic Nationalism direct-coverage continuation — WorkPM v17 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical meso Civic Nationalism node. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Black Nationalism, Materialist Feminism, and Neo-Fascism remain catalog-only alternatives or holds.

### Research provenance and boundary

The boundary work uses [Renaud-Philippe Garner's Oxford Research Encyclopedia entry on Nationalism](https://academic.oup.com/edited-volume/62239/chapter-abstract/550750941), [Samuel Pehrson's Oxford chapter on the limits of a universal ethnic-civic dichotomy](https://doi.org/10.1093/oso/9780198842545.003.0008), and [Cécile Laborde's Cambridge article on civic political identity](https://www.cambridge.org/core/journals/british-journal-of-political-science/article/abs/from-constitutional-to-civic-patriotism/9C7723CE5D8DE5AF316783A224D1BB16). The references support nationalism terminology, civic membership and self-government boundaries, comparative/contextual caution, provenance, and original item authoring only. Laborde is adjacent conceptual support rather than an equation of civic patriotism with Civic Nationalism; none of the sources validates local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary is a context-sensitive nationalist formation in which citizenship, shared political institutions, and self-government organize national membership. It does not assume a universal civic-versus-ethnic binary, does not imply liberalism, and does not treat generic civic language, patriotism, religion-neutral nationalism, or current-actor inference as sufficient evidence. The block requires a convergent civic-membership, institutional-self-government, and national-solidarity mechanism while preserving the possibility of exclusionary or non-liberal civic forms.

### Decision and alternatives

Civic Nationalism was selected because the repository already has an existing canonical meso node, a high-strength 12-candidate source bundle, a profile, neighbor discriminants, a false-positive audit, and a bounded 4/4/4 direct block. Black Nationalism remains deferred because its historical, diaspora, separatist, and anti-colonial forms require careful variation and intersectional boundaries. Materialist Feminism remains deferred because its relationship to Marxist, socialist, social-reproduction, and feminist traditions requires a distinct analytical pass. Neo-Fascism remains a high-risk historical hold because post-1945 continuity and adaptation are broader and more contested. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 540 questions, 180 per layer, 39 dedicated-scored targets, 63 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 39 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 45.2991% by layer and 61.5385% combined, with worst ranks 36 and 32; Civic Nationalism ranks 10/6/7 by layer and 6 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 48/48 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v17 fragment measured 35,075 characters and round-tripped under the finite 36,864-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios |
| State and documentation | Passed; v17 WorkPM/Zeus/activity records synchronized, state parses as JSON, and source/docs whitespace checks pass |

## Materialist Feminism direct-coverage continuation — WorkPM v19 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Materialist Feminism node under `Socialist / Marxist Feminism`. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Marxist Feminism and Socialist Feminism remain distinct catalog branches; Anti-Colonial Nationalism remains an unactivated alternative, and Neo-Fascism remains a high-risk catalog-only hold.

### Research provenance and boundary

The boundary work uses the [Stanford Encyclopedia of Philosophy discussion of feminism, class, and work](https://plato.stanford.edu/entries/feminism-class/index.html), the [Stanford Encyclopedia of Philosophy entry on feminist political philosophy](https://plato.stanford.edu/archives/win2023/entries/feminism-political/), the [Stanford Encyclopedia of Philosophy entry on feminist perspectives on power](https://plato.stanford.edu/entries/feminist-power/), and Wingrove's [Oxford Handbook of Feminist Theory chapter on materialisms](https://academic.oup.com/edited-volume/34617/chapter-abstract/294776047). These sources support attention to material conditions, production and reproduction, care and labor, embodiment, structural power, historical specificity, and theoretical variation. They support terminology, provenance, and original item authoring only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

The production boundary is a plural feminist materialist tradition explaining gendered domination through historically specific labor, care/social reproduction, embodiment, institutions, and resource access while pursuing emancipatory change. It does not require one Marxist theory of history, one socialist identity, common ownership, a centralized state, or a single account of gender. Marxist Feminism and Socialist Feminism remain neighboring branches with more constitutive class/capital or socialist-transformation commitments; Radical Feminism remains distinct where patriarchy or sexual domination is the primary mechanism. Generic feminist identity, care approval, material policy preference, class analysis without gendered material power, or one ownership/state route is insufficient evidence.

### Decision and alternatives

Materialist Feminism was selected over Anti-Colonial Nationalism and Neo-Fascism because the repository already has an existing canonical micro node, a high-strength 12-candidate block, a profile, neighbor discriminants, a false-positive audit, and an academically supported plural materialist-feminist boundary. Anti-Colonial Nationalism remains deferred for a separate state-oriented, jurisdictional, and anti-imperial self-determination pass. Neo-Fascism remains a high-risk historical hold because post-1945 continuity and adaptation are broader and more contested. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed. The 1,428 research candidates remain effect-free and quarantined.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 564 questions, 188 per layer, 41 dedicated-scored targets, 61 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 41 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 44.7154% by layer and 56.0976% combined, with worst ranks 38 and 34; Materialist Feminism ranks 2/7/5 by layer and 4 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 50/50 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v19 fragment measured 36,723 characters and round-tripped under the finite 36,864-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios against the rebuilt image |
| State and documentation | Passed; final v19 state/log/activity records parse and source/docs whitespace checks pass |

The 12 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

The 12 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.
## Arab Nationalism direct-coverage continuation — WorkPM v21 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Arab Nationalism node under `Nationalism`. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Maoism remains catalog-only for a separate doctrine/regime and mass-line boundary pass; Neo-Fascism remains a high-risk catalog-only hold.

### Research provenance and boundary

The boundary work uses [Dawisha's *Arab Nationalism in the Twentieth Century*](https://academic.oup.com/princeton-scholarship-online/book/15170), [McDougall's Oxford Handbook chapter on the emergence of nationalism](https://academic.oup.com/edited-volume/34445/chapter-abstract/292266064), [Dawn's Cambridge study of interwar Pan-Arab ideology](https://www.cambridge.org/core/journals/international-journal-of-middle-east-studies/article/abs/formation-of-panarab-ideology-in-the-interwar-years/A0C0AC9B80CB8DAEDC96EF66F8CF6AEE), and [Ghazal's Cambridge study of Arabist-Salafi networks](https://www.cambridge.org/core/journals/international-journal-of-middle-east-studies/article/other-frontiers-of-arab-nationalism-ibadis-berbers-and-the-arabistsalafi-press-in-the-interwar-period/2AEB2D28E06E6B50F12F5050964C2C29), with the [Stanford Encyclopedia of Philosophy entry on Nationalism](https://plato.stanford.edu/entries/nationalism/) as adjacent context. The references support the cultural-Arabism/political-nationalism distinction, historical formation, pan-national and territorial variation, translocal and religious layering, self-government, provenance, and original item authoring only. They do not validate local wording, effects, anchor vectors, respondent interpretation, or classification.

The production boundary is a historically formed political field requiring wider Arab collective identity, self-government or sovereignty, and cross-border solidarity. It preserves territorial and Pan-Arab variation, secular/religious variation, equal minority standing, and accountable institutional routes. Arabic language, cultural affiliation, private faith, ordinary patriotism, one territorial state, one leader, one secular or religious host, or one economic programme is insufficient evidence.

### Decision and alternatives

Arab Nationalism was selected because the repository already has an existing canonical micro node, a high-strength source-linked candidate/profile/audit bundle, and a tractable 4/4/4 boundary distinct from Anti-Colonial Nationalism, Civic Nationalism, Religious Nationalism, and cultural Arabism. Maoism remains deferred because its separate pass must distinguish Sinified Marxism-Leninism, peasant and colonial context, mass-line practice, rectification, party authority, and revolutionary state strategy from generic Communism or regime identification. Neo-Fascism remains a high-risk hold because postwar continuity and adaptation remain contested. No ontology node was added, reparented, or demoted; no facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 588 questions, 196 per layer, 43 dedicated-scored targets, 59 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 43 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 43.4109% by layer and 51.1628% combined, with worst ranks 40 and 36; Arab Nationalism ranks 10/9/13 by layer and 9 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 52/52 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v21 fragment measured 38,435 characters and round-tripped under the finite 40,960-character guard |
| `npm run qa -- --reporter=dot` | Passed, 10/10 local Playwright scenarios |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios against the rebuilt image |
| State and documentation | Passed; WorkPM/Zeus/activity records synchronized, state JSON parses, and source/docs whitespace checks pass |

The 12 v21 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Maoism direct-coverage continuation — WorkPM v22 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Maoism node on the `Socialism → Communism → Maoism` path. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Neo-Fascism remains a high-risk catalog-only hold; no ontology node was added, reparented, or demoted.

### Research provenance and boundary

The boundary work uses [Cheek's Oxford Handbook chapter on Mao and Maoism](https://academic.oup.com/edited-volume/35402/chapter-abstract/302647340), [Smith's comparison of the Russian and Chinese revolutions](https://academic.oup.com/edited-volume/38652/chapter-abstract/335755252), [Wemheuer's chapter on Chinese society under Mao](https://www.cambridge.org/core/books/social-history-of-maoist-china/chinese-society-under-mao-classifications-social-hierarchies-and-distribution/4836D7D43D69906AC7A618C671186B82), and [Dutton's analysis of Cultural Revolution as method](https://www.cambridge.org/core/journals/china-quarterly/article/cultural-revolution-as-method/B68ED75498467E7E943AEFB1EFF9DF87). These references support historical context, terminology, variation, provenance, boundary writing, and original item authoring only. They do not validate local wording, effects, anchor vectors, respondent interpretation, or classification.

The production boundary is a historically situated communist current requiring the Sinification of Marxism-Leninism in agrarian, semi-colonial, or colonial conditions together with practice-centered revolutionary organization, mass-line politics, contradiction and rectification, anti-bureaucratic critique, and collective transformation. Generic Communism, anti-imperialism, peasant identity, authoritarianism, one historical regime, or contemporary actor inference is insufficient evidence. The block preserves historical variation and does not provide operational guidance.

### Decision and alternatives

Maoism was selected because the repository already has an existing canonical micro node, a high-strength source-linked candidate/profile/audit bundle, and a tractable 4/4/4 boundary distinct from generic Communism, Anti-Colonial Nationalism, and regime identification. Neo-Fascism remains a high-risk hold because post-1945 continuity, adaptation, and organizational boundaries require separate historical handling. No facet, coefficient, threshold, distance, family-balance, combined-layer, or share semantic changed.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 600 questions, 200 per layer, 44 dedicated-scored targets, 58 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 44 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 43.1818% by layer and 50.0000% combined, with worst ranks 41 and 37; Maoism ranks 2/14/1 by layer and 1 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 53/53 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v22 fragment measured 39,059 characters and round-tripped under the finite 40,960-character guard |
| Local browser QA | Passed, 10/10 with one worker; the previously flaky long-share scenario passed 1/1 when rerun in isolation |
| Docker Compose/image/health | Passed; Compose config, no-cache image build, recreation, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 Playwright scenarios against the rebuilt image |
| State and documentation | Passed; WorkPM/Zeus/activity records synchronized, state JSON parses, and source/docs whitespace checks pass |

The 12 v22 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## Council Communism direct-coverage continuation — WorkPM v23 — 2026-08-27

### Current state

The comprehensive-coverage goal remains open. This continuation adds direct source-backed production coverage for the existing canonical micro Council Communism node on the `Socialism → Communism → Council Communism` path. It contributes four descriptive, four normative, and four prescriptive original prompts plus one provisional anchor. The ontology remains 9 macro, 38 meso placements including five contextual nodes, and 60 micro nodes, with 12 registry entries. Guild Socialism, Trotskyism, and Marxism-Leninism remain catalog-only alternatives; Neo-Fascism remains a high-risk catalog-only hold. No ontology node was added, reparented, or demoted.

### Research provenance and boundary

The boundary work uses [Popp-Madsen and Kets's Polity article on workers' councils and radical democracy](https://www.journals.uchicago.edu/doi/abs/10.1086/711750) and [Popp-Madsen's *Political Theory of Council Democracy*](https://academic.oup.com/edinburgh-scholarship-online/book/37811/chapter-abstract/332278027?login=false), with existing Oxford records on Communism and political ideologies. These references support the distinction among Leninist, interwar council-communist, and later radical-democratic council conceptions, workers' councils, workplace/economic democracy, direct self-government, historical variation, provenance, boundary writing, and original item authoring only. They do not validate local wording, effects, anchor vectors, respondent interpretation, or classification.

The production boundary is a historically specific communist current requiring workers' councils as constitutive organs of direct or recallable political/economic self-government, common control, and resistance to permanent party-subordinated command. Generic Communism, workplace participation, union support, public ownership alone, anarchism, decentralization alone, or anti-elite sentiment is insufficient evidence. The prompts preserve variation over representation, scale, coordination, and historical party/council relations and provide no operational guidance.

### Decision and alternatives

Council Communism was selected because the repository already has an existing canonical micro node, a high-strength council-democracy source/candidate/profile/audit bundle, and a tractable 4/4/4 boundary distinct from Guild Socialism, Marxism-Leninism, Trotskyism, and generic council democracy. Guild Socialism, Trotskyism, and Marxism-Leninism remain deferred catalog-only alternatives pending separate associational, international-party, and party-state boundary passes. Neo-Fascism remains a high-risk hold because postwar continuity, adaptation, organizational variation, and anti-pluralist transformation require separate historical handling. No facet, coefficient, threshold, distance, family-balance, combined-layer, ontology, or share semantic changed.

### Verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 612 questions, 204 per layer, 45 dedicated-scored targets, 57 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 45 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 42.9630% by layer and 51.1111% combined, with worst ranks 42 and 38; Council Communism ranks 12/3/1 by layer and 1 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 54/54 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v23 fragment measured 39,859 characters and round-tripped under the finite 40,960-character guard |
| Local browser QA | Passed, 10/10 serial Playwright scenarios with one worker |
| Docker Compose/image/health | Passed; Compose config, no-cache image rebuild, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 serial Playwright scenarios against the rebuilt image |
| State and documentation | Passed; v23 WorkPM/Zeus/activity records, state JSON, and source/docs whitespace checks synchronized |

The 12 v23 prompts and anchor remain source-backed provisional editorial additions, not validated respondent measures or political recommendations. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## v24 WorkPM research continuation — Guild Socialism — 2026-08-27

WorkPM selected the existing canonical micro `Socialism → Guild Socialism` branch after comparing Guild Socialism with Trotskyism, Marxism-Leninism, and the high-risk Neo-Fascism hold. Hodgson's [“The institutional impossibility of guild socialism”](https://academic.oup.com/cje/article/47/1/21/6775929) supports a historically situated 1906–1925 current centered on workers' control, socialist pluralism, public ownership, functional representation, and limited or non-competitive markets while preserving legal, informational, centralization, representation, and gender tensions. Madden and Persky's [“Guild Socialism: The Integration of Cooperative Themes”](https://academic.oup.com/book/56397/chapter-abstract/448370103) supports a Cole-associated blueprint involving self-managed producers, democratic consumers, community institutions, bargaining, worker agency, and altered market functions. Existing Cambridge studies provide democracy and transnational-variation context. The sources support terminology, historical scope, variation, limitations, provenance, and original item authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation added four descriptive, four normative, and four prescriptive target-tagged prompts plus one provisional anchor. Guild Socialism is now dedicated-scored provisionally over the existing canonical path; no ontology node was added, reparented, or demoted, and Trotskyism and Marxism-Leninism remain catalog-only while Neo-Fascism remains a high-risk hold. The boundary requires industrial self-government, functional and plural representation, public or social ownership, and coordination across guild, civic, and territorial associations. Generic union support, workplace consultation, public ownership alone, welfare-state social democracy, Anarcho-Syndicalism, or Council Communism is insufficient evidence.

The active manifest is content version 24 with 624 prompts (208 per layer), 51 editorial anchors, and 46 canonical scoring anchors. The ontology remains 107 nodes plus 12 registry entries with the canonical 9/33/60 inventory and five contextual-only anchors. The research bank remains 1,428 effect-free candidates across 119 targets. The complete share fragment measures 40,627 characters under the finite 40,960-character guard; answer-only serialization and the scorer remain unchanged.

### v24 verification evidence

| Check | Result |
|---|---|
| `npm run research:coverage --silent` | Passed; 46 dedicated-scored, 56 catalog-only, five contextual-only, 12 registry-only targets, 1,428 candidates, 119 profiles/audits, and zero validation errors |
| `npm run research:anchor-reachability --silent` | Passed; all 46 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 41.3043% by layer and 50.0000% combined, with worst ranks 43 and 40; Guild Socialism ranks 12/5/5 by layer and 5 combined |
| `npx tsc --noEmit --pretty false` | Passed |
| `npm run test:run -- --reporter=dot` | Passed, 55/55 |
| `npm run build` | Passed; existing Vite large-client-chunk advisory remains |
| `npm audit --audit-level=high` | Passed; 0 vulnerabilities |
| Share capacity regression | Passed; complete v24 fragment measured 40,627 characters and round-tripped under the finite 40,960-character guard |
| Local browser QA | Passed, 10/10 serial Playwright scenarios with one worker |
| Docker Compose/image/health | Passed; Compose config, no-cache image rebuild, recreation, healthy container, and `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | Passed, 10/10 serial Playwright scenarios against the rebuilt image |
| State/documentation/whitespace | Passed; final state JSON parse and source/docs whitespace inventory completed after record synchronization |

The isolated reachability fixture closes all three Guild Socialism layers. Its full-production ranks and the aggregate top-three rates are structural measurement-design diagnostics only; they are not respondent evidence, psychometric evidence, or a reason to introduce uncalibrated scorer changes. The 12 prompts and anchor remain source-backed provisional editorial measurement. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.
## v25 WorkPM continuation — Trotskyism — 2026-08-27

WorkPM selected the existing canonical micro Trotskyism branch under `Socialism → Communism` after comparing it with Marxism-Leninism and the high-risk Neo-Fascism hold. [Stutje's historiography](https://www.cambridge.org/core/journals/international-review-of-social-history/article/trotskyism-emerges-from-obscurity-new-chapters-in-its-historiography/AFC0AD8346377E4949F441404D2E6A28) supports treating Trotskyism as a historically organized and internally divided Marxist current with a distinct Fourth International history. [Day's chapter](https://www.cambridge.org/core/books/abs/leon-trotsky-and-the-politics-of-economic-isolation/myth-of-trotskyism/95EE597BFA047615C393337F30CF63AF) supports the boundary around Permanent Revolution, internationalism, Socialism in One Country, and economic isolation. Existing Oxford records provide adjacent Communism and political-ideologies context. These sources support historical terminology, scope, variation, provenance, and original item authoring only; they do not validate the local item wording, effects, vectors, respondent interpretation, or classification.

The production block adds four descriptive, four normative, and four prescriptive target-tagged prompts plus one provisional anchor. It requires the convergent bundle of permanent revolution, internationalism, workers' democracy, organized revolutionary politics, and critique of bureaucratic degeneration. The wording distinguishes Trotskyism from free-floating permanent revolution, generic anti-Stalinism, anti-authoritarianism, international cooperation, generic socialism, Marxism-Leninism's party-state route, Council Communism's council-constitutive route, and one leader or regime. Historical and organizational variation remains explicit.

The active manifest is content version 25 with 636 prompts (212 per layer), 52 editorial anchors, and 47 canonical scoring anchors. The ontology remains 107 nodes with 9 macro, 38 meso, and 60 micro nodes; canonical/contextual placement remains 102/5. The research bank remains 1,428 effect-free candidates across 119 targets. Trotskyism passes isolated structural routing in all three layers and ranks 9/2/1 by layer and 1 combined in the full-production fixture. Aggregate top-three rates are 38.2979% by layer and 48.9362% combined, with worst ranks 44 and 41; these are routing diagnostics, not respondent or psychometric evidence.

The readable v1 complete-answer share representation measures 41,315 characters, so the encoder emits compact question-index version 2 at 6,838 characters for the expanded complete answer set. Version-1 links remain decodable, and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed. The 636-prompt browser scenario exposed a stale fixed 60-second test budget; the test now scales with the dataset, and the focused scenario passed in 52.2 seconds.

### v25 verification

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 47 dedicated-scored, 55 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; zero validation errors |
| Anchor reachability | PASS | 47 anchors with 4/4/4 direct coverage and isolated routing; Trotskyism ranks 9/2/1 and 1 combined |
| Unit/type/build/audit | PASS | 56/56 unit tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | v2 complete fragment 6,838 characters; v1 readable candidate 41,315; v1 decode preserved; finite guard 40,960 |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Documentation/state | PASS | v25 WorkPM records synchronized; state JSON parse and whitespace checks completed after final update |

The v25 prompts and anchor remain provisional editorial measurement. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. No commit or push was performed.

## v26 WorkPM continuation — Marxism-Leninism — 2026-08-27

WorkPM selected the existing canonical micro Marxism-Leninism branch under Socialism → Communism after comparing it with retained Trotskyism and the high-risk Neo-Fascism hold. [Kamrava's Cambridge chapter](https://www.cambridge.org/core/books/concise-history-of-revolution/from-rebellion-to-revolution/582B61EABC882057C41051CCB2F4CF19), [Femia's Oxford chapter](https://academic.oup.com/book/10904/chapter-abstract/159151217), and [Thornton's Cambridge study](https://www.cambridge.org/core/journals/china-quarterly/article/of-constitutions-campaigns-and-commissions-a-century-of-democratic-centralism-under-the-ccp/708D2FF94BC0C61863B53DFDA9C382E6) support vanguard-party organization, democratic centralism, revolutionary strategy, historical variation, and adjacent Marxist democratic models for terminology and original item authoring only. They do not validate local wording, effects, vectors, respondent interpretation, or classification.

The production block adds four descriptive, four normative, and four prescriptive target-tagged prompts plus one provisional anchor. It requires the convergent bundle of vanguard-party leadership, democratic centralism, class and capital analysis, state transformation, social/public ownership, planned coordination, and revolutionary internationalism. The wording distinguishes Marxism-Leninism from generic Marxism or Communism, public ownership, state intervention, Maoism, Trotskyism, Council Communism, and one historical regime. Historical and national variation remains explicit; Neo-Fascism remains a high-risk catalog-only hold.

The active manifest is content version 26 with 648 prompts (216 per layer), 53 editorial anchors, and 48 canonical scoring anchors. The ontology remains 107 nodes with 9 macro, 38 meso, and 60 micro nodes; canonical/contextual placement remains 102/5. The research bank remains 1,428 effect-free candidates across 119 targets. Marxism-Leninism passes isolated structural routing in all three layers and ranks 10/27/1 by layer and 1 combined in the full-production fixture. Aggregate top-three rates are 39.5833% by layer and 50.0000% combined, with worst ranks 45 and 41; these are routing diagnostics, not respondent or psychometric evidence.

The readable v1 complete-answer representation remains above the finite 40,960-character guard, so the encoder emits compact question-index version 2 at 6,966 characters for the expanded complete answer set. Version-1 links remain decodable, and stale, malformed, unknown, duplicate, out-of-range, and oversized payloads remain fail-closed.

### v26 verification

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 48 dedicated-scored, 54 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; zero validation errors |
| Anchor reachability | PASS | 48 anchors with 4/4/4 direct coverage and isolated routing; Marxism-Leninism ranks 10/27/1 and 1 combined |
| Unit/type/build/audit | PASS | 57/57 unit tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | v2 complete fragment 6,966 characters; readable v1 remains above 40,960; v1 decode preserved; finite guard enforced |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy health endpoint, and 10/10 serial Playwright scenarios |
| Documentation/state | PASS | v26 WorkPM records synchronized; state JSON and whitespace checks completed after final update |

The v26 prompts and anchor remain provisional editorial measurement. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. No commit or push was performed.

## v27 WorkPM continuation — Autonomist Marxism — 2026-08-27

WorkPM selected the existing canonical micro Autonomist Marxism branch under `Socialism → Marxism` after comparing it with Anarcho-Pacifism, Materialist / Socialist Ecofeminism, and the high-risk Neo-Fascism hold. [Alcoff and Alcoff's SAGE treatment](https://journals.sagepub.com/doi/10.1521/siso.2015.79.2.221) and [Gray's peer-reviewed Antipode article](https://eprints.gla.ac.uk/260543/) support a historically varied Marxist boundary involving worker and social autonomy, self-activity, class composition, expanded social reproduction, anti-vanguard organization, and principled decentralization. These sources support terminology, provenance, historical variation, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The implementation adds the Antipode source record, four descriptive, four normative, and four prescriptive source-linked prompts, and one provisional anchor. Content version 27 now has 660 prompts (220 per layer), 54 editorial anchors, and 49 canonical scoring anchors. The existing `Socialism → Marxism → Autonomist Marxism` path is unchanged, the research bank remains 1,428 effect-free candidates across 119 targets, and the new target is `dedicated-scored` with isolated coverage in all three layers.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 49 dedicated-scored, 53 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; zero validation errors |
| Anchor reachability | PASS | 49 anchors with 4/4/4 direct coverage and isolated routing; Autonomist Marxism ranks 10/8/2 and 1 combined; rates 37.4140% and 51.0204% are structural diagnostics |
| Unit/type/build/audit | PASS | 58/58 unit tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Readable v1 measures 42,915 characters; compact v2 complete fragment measures 7,094; v1 decoding preserved; finite guard enforced |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | No-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Documentation/state | PASS | v27 WorkPM, precision, Zeus, conversation, and state records synchronized; JSON and whitespace checks passed |

The Autonomist Marxism prompts and anchor remain provisional editorial measurement. Anarcho-Pacifism and Materialist / Socialist Ecofeminism remain deferred catalog-only candidates, and Neo-Fascism remains a high-risk hold. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. No commit or push was performed.

## v28 WorkPM continuation — Anarcho-Pacifism — 2026-08-27

WorkPM selected the existing canonical micro Anarcho-Pacifism branch under `Anarchism → Social Anarchism` after comparing it with Social Ecology, Austromarxism, Materialist / Socialist Ecofeminism, and the high-risk Neo-Fascism hold. [Christoyannopoulos's Oxford article on an anarcho-pacifist reading of international relations](https://academic.oup.com/isq/article/66/4/sqac070/6748234) and [his SAGE article mapping the landscape between pacifism and anarchism](https://journals.sagepub.com/doi/10.1177/13691481241257806) support a historically varied boundary involving anti-domination, opposition to war and militarism, structural violence, nonviolent or prefigurative routes, self-defense debates, and principled/pragmatic and religious/secular variation. These sources support terminology, provenance, historical variation, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The implementation adds the SAGE provenance record, four descriptive, four normative, and four prescriptive source-linked original prompts, one provisional anchor, and the research-bank profile. Content version 28 now has 672 prompts (224 per layer), 55 editorial anchors, and 50 canonical scoring anchors. The existing `Anarchism → Social Anarchism → Anarcho-Pacifism` path is unchanged, the research bank remains 1,428 effect-free candidates across 119 targets, and the new target is `dedicated-scored` with isolated coverage in all three layers.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 50 dedicated-scored, 52 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; zero validation errors |
| Anchor reachability | PASS | 50 anchors with 4/4/4 direct coverage and isolated routing; Anarcho-Pacifism ranks 12/5/2 and 1 combined; rates 37.3333% and 52.0000% are structural diagnostics |
| Unit/type/build/audit | PASS | 59/59 unit tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Readable v1 measures 43,699 characters; compact v2 complete fragment measures 7,222; v1 decoding preserved; finite guard enforced |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | No-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Documentation/state | PASS | v28 WorkPM, precision, Zeus, conversation, and state records synchronized; JSON and whitespace checks passed |

The Anarcho-Pacifism prompts and anchor remain provisional editorial measurement. Social Ecology, Austromarxism, and Materialist / Socialist Ecofeminism remain deferred catalog-only candidates, and Neo-Fascism remains a high-risk hold. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. No commit or push was performed.

## v29 WorkPM continuation — Social Ecology — 2026-08-27

WorkPM selected the existing canonical micro Social Ecology branch on the typed `Green Anarchism → Social Ecology` hybrid path after a source comparison with the next queue and the high-risk Neo-Fascism hold. Best's SAGE appraisal, Shelley's democratic-municipalism analysis, Roth/Russell/Thompson's radical-municipalism boundary, Hammy/Miley's critical Rojava comparison, and existing Oxford/SEP records support terminology, historical variation, institutional boundaries, and original item authoring only. They do not validate local wording, effects, vectors, respondent comprehension, or classification.

The implementation adds four source records, twelve target-tagged prompts, one provisional anchor, and the Social Ecology research profile. It preserves the typed hybrid placement, 9/33/60 canonical inventory, 20-facet scoring geometry, scorer coefficients, thresholds, family balancing, combined-layer semantics, contextual-only exclusion, and the 1,428 effect-free candidate quarantine. The active content version is 29 with 684 prompts (228 per layer), 56 editorial anchors, and 51 canonical scoring anchors. Social Ecology is `dedicated-scored` with four direct prompts in each layer and isolated routing in all three layers.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 51 dedicated-scored, 51 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 51 anchors have 4/4/4 direct coverage and isolated routing; Social Ecology ranks 3/6/4 by layer and 2 combined; aggregate rates 36.6013% and 52.9412%; worst ranks 48/45 are structural diagnostics |
| Share compatibility | PASS | Readable v1 measures 44,451 characters above the finite 40,960-character guard; compact v2 complete fragment measures 7,350; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 60/60 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Browser/Docker QA | PASS | Local and Docker-backed serial Playwright suites pass 10/10; rebuilt container is healthy and `/healthz` returns `ok` on port 8001 |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Social Ecology prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. Womanism is next in the comparison queue; other catalog-only and high-risk holds remain quarantined. The repository remains initialized and uncommitted; no commit or push was performed.

## v30 WorkPM continuation — Womanism — 2026-08-27

WorkPM selected the existing canonical micro Womanism branch under `Feminism` after comparing it with Classical-Liberal Feminism, Anarcho-Communism / Collectivist Anarchism, Materialist / Socialist Ecofeminism, and the high-risk Neo-Fascism hold. [Kirk-Duggan's Oxford Handbook chapter on Womanist Theology](https://academic.oup.com/edited-volume/34322/chapter-abstract/291323805), [the Cambridge chapter on Womanism and Black Feminism](https://www.cambridge.org/core/books/abs/black-political-thought/whats-in-a-name-womanism-black-feminism-and-beyond/AC3F7A2E002E4D8032DE15ACA85A9F51), [Alexander-Floyd and Simien's Frontiers article](https://doi.org/10.1353/fro.2006.0011), and [Musanga and Mukhuba's Journal of Black Studies article](https://journals.sagepub.com/doi/10.1177/0021934719835083) support terminology, historical/theoretical variation, boundary controls, provenance, and original item authoring only. They do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds four source records, twelve target-tagged prompts, one provisional anchor, and the Womanism research profile. It preserves the `Feminism → Womanism` path, the 9/33/60 ontology, 20-facet scoring geometry, scorer coefficients, thresholds, family balancing, combined-layer semantics, contextual-only exclusion, and the 1,428 effect-free candidate quarantine. The active content version is 30 with 696 prompts (232 per layer), 57 editorial anchors, and 52 canonical scoring anchors. Womanism has four direct prompts in each layer and isolated structural routing in all three layers.

The boundary requires interlocking racialized gender, class, sexual, and embodied domination; Black women's knowledge and self-definition; communal survival and wholeness without erasure; and varied material, spiritual, theological, secular, queer, or political routes. It distinguishes Womanism from Black Feminism, Africana Womanism, womanist theology, generic Feminism, identity alone, religion alone, family care, intersectionality in general, and social justice in general. No ontology node was added, reparented, or demoted.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 52 dedicated-scored, 50 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 52 anchors have 4/4/4 direct coverage and isolated routing; Womanism ranks 43/43/43 by layer and 43 combined; aggregate rates 35.2564% and 51.9231%; worst ranks 49/46 are structural diagnostics |
| Share compatibility | PASS | Readable v1 measures 45,107 characters above the finite 40,960-character guard; compact v2 complete fragment measures 7,478; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 61/61 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Womanism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. Classical-Liberal Feminism and Anarcho-Communism / Collectivist Anarchism remain catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, and Neo-Fascism remains a high-risk hold. No commit or push was performed.

## v31 WorkPM continuation — Classical-Liberal Feminism — 2026-08-27

WorkPM selected the existing canonical micro Classical-Liberal Feminism branch under `Feminism → Liberal Feminism` after comparing it with Anarcho-Communism / Collectivist Anarchism, Materialist / Socialist Ecofeminism, and the high-risk Neo-Fascism hold. The [SEP Liberal Feminism entry](https://plato.stanford.edu/entries/feminism-liberal/), [Baehr's peer-reviewed account of liberal feminism](https://ojs.lib.uwo.ca/index.php/fpq/article/view/3065), and the [SEP Libertarianism entry](https://plato.stanford.edu/entries/libertarianism/) support a contested, branch-sensitive family boundary around equal individual rights, autonomy, freedom from coercive interference, constitutional democracy, and generally limited or non-paternal public power. They support terminology, provenance, variation, and original item authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds the Baehr source record, twelve target-tagged prompts, one provisional anchor, and the Classical-Liberal Feminism research profile. It preserves the `Feminism → Liberal Feminism → Classical-Liberal Feminism` path, the 9/33/60 ontology, 20-facet scoring geometry, scorer coefficients, thresholds, family balancing, combined-layer semantics, contextual-only exclusion, and the 1,428 effect-free candidate quarantine. The active content version is 31 with 708 prompts (236 per layer), 58 editorial anchors, and 53 canonical scoring anchors. No ontology node was added, reparented, or demoted.

The boundary requires the joint account of gendered legal and institutional barriers, equal individual autonomy and rights, constitutional-democratic standing, and generally limited or non-paternal public power. It distinguishes Classical-Liberal Feminism from Liberal Feminism in general, Egalitarian-Liberal Feminism, Right-Libertarianism, generic market support, formal equality, and private-choice language alone. The family remains internally varied over patriarchal culture, markets, public provision, enabling conditions, and reform.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 53 dedicated-scored, 49 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 53 anchors have 4/4/4 direct coverage and isolated routing; Classical-Liberal Feminism ranks 45/48/4 by layer and 45 combined; aggregate rates 36.4780% and 50.9434%; worst ranks 50/46 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 7,606; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 62/62 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Classical-Liberal Feminism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. Anarcho-Communism / Collectivist Anarchism is next in the comparison queue, Materialist / Socialist Ecofeminism remains terminology-confounded, and Neo-Fascism remains a high-risk hold. No commit or push was performed.

## v32 WorkPM continuation — Anarcho-Communism — 2026-08-27

WorkPM treated the remaining `Anarcho-Communism / Collectivist Anarchism` label as two related but distinct canonical micro candidates. It selected the existing `Anarchism → Social Anarchism → Anarcho-Communism` branch for a bounded provisional activation and retained `Collectivist Anarchism` as catalog-only. The [SEP Anarchism entry](https://plato.stanford.edu/entries/anarchism/), [Cahm's Cambridge chapter](https://doi.org/10.1017/CBO9780511521294.004), [Vincent's Cambridge chapter](https://doi.org/10.1017/CHOL9780521430562.016), [Eckhardt's Cambridge chapter](https://doi.org/10.1017/9781108611022.014), [Kinna's chapter on Kropotkin](https://doi.org/10.3366/edinburgh/9780748642298.003.0010), [Bray's chapter on anarchist communism](https://doi.org/10.7591/cornell/9781501761928.003.0003), and [Ostrom's institutional-governance work](https://doi.org/10.1017/CBO9780511807763) support terminology, historical variation, provenance, institutional context, false-positive controls, and original item authoring only. They do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds five source records, twelve source-linked target-tagged prompts, one provisional anchor, and the Anarcho-Communism research profile. The boundary requires the joint account of anti-hierarchical and anti-state organization, common ownership, need-oriented provision, free association, and federated self-management. It preserves variation over communal scale, revolutionary and reformist strategy, voluntary association, and self-defense, and distinguishes the branch from Collectivist Anarchism's historically bounded labor-contribution and remuneration debates, broad Social Anarchism, Anarcho-Syndicalism, state-centered Communism, and Mutualism or market anarchism. No ontology node was added, reparented, or demoted; scorer, thresholds, combined-layer semantics, contextual-only exclusion, and the 1,428 effect-free candidate quarantine were preserved.

The active content version is 32 with 720 production questions (240 per layer), 59 editorial anchors, and 54 canonical scoring anchors. Anarcho-Communism has twelve direct prompts, exactly four in each layer, and isolated routing in all three layers. The deterministic full-production fixture ranks it 11/3/1 by layer and 1 combined; aggregate top-three rates are 35.8025% by layer and 51.8519% combined, with worst ranks 51 and 47. The full-competition descriptive `missingLayers` field is a competition diagnostic and does not contradict the target's complete isolated direct coverage. These are structural diagnostics, not respondent evidence and not grounds for uncalibrated scorer retuning.

The readable complete-answer representation remains above the finite v1 share guard, so compact v2 is emitted at 7,734 characters; v1 decoding and fail-closed validation remain supported.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 54 dedicated-scored, 48 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 54 anchors have 4/4/4 direct coverage and isolated routing; Anarcho-Communism ranks 11/3/1 by layer and 1 combined; aggregate rates 35.8025% and 51.8519%; worst ranks 51/47 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 7,734; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 63/63 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| JSON and whitespace integrity | PASS | Zeus state JSON parsed; package JSON parsed; trailing-whitespace and literal backslash-backtick scans reported no findings |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Anarcho-Communism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. Collectivist Anarchism remains catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, and Neo-Fascism remains a high-risk hold. The repository is initialized on `master` with no commits; no push was performed.

## v33 WorkPM continuation — Collectivist Anarchism — 2026-08-27

WorkPM separated the remaining Collectivist Anarchism catalog branch from the already activated Anarcho-Communist branch and selected the existing canonical `Anarchism → Social Anarchism → Collectivist Anarchism` path for a bounded provisional activation. [Franks's Oxford Handbook chapter on Anarchism](https://doi.org/10.1093/oxfordhb/9780199585977.013.0001), [Ward's federalist-agenda chapter](https://doi.org/10.1093/actrade/9780192804778.003.0009), [Kropotkin's Cambridge collectivist-wages chapter](https://doi.org/10.1017/CBO9781139170734.017), and [Bakunin's *Statism and Anarchy*](https://doi.org/10.1017/CBO9781139168083), with existing SEP, Cambridge, and Ostrom context, support terminology, historical variation, provenance, false-positive controls, and original item authoring only. They do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds four direct source records, twelve source-linked target-tagged prompts, one provisional anchor, updated ontology metadata, and a research-bank profile. The boundary requires collective ownership and equal economic self-government joined to opposition to private-capital and separate state domination, free association, federated coordination, and a historically associated but debated labor-contribution/remuneration route. It distinguishes Collectivist Anarchism from Anarcho-Communism's need-oriented route, broad Social Anarchism, Anarcho-Syndicalism, Mutualism, state-centered socialism, generic worker control, and anti-government sentiment. No ontology node was added, reparented, or demoted; scorer, thresholds, combined-layer semantics, contextual-only exclusion, and the 1,428 effect-free candidate quarantine were preserved.

The active content version is 33 with 732 production questions (244 per layer), 60 editorial anchors, and 55 canonical scoring anchors. Collectivist Anarchism has twelve direct prompts, exactly four in each layer, and isolated routing in all three layers. The deterministic full-production fixture ranks it 9/5/1 by layer and 1 combined; aggregate top-three rates are 33.3333% by layer and 49.0909% combined, with worst ranks 52 and 48. These are structural diagnostics, not respondent evidence and not grounds for uncalibrated scorer retuning. The readable complete-answer representation remains above the finite v1 share guard, so compact v2 is emitted at 7,862 characters; v1 decoding and fail-closed validation remain supported.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 55 dedicated-scored, 47 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 55 anchors have 4/4/4 direct coverage and isolated routing; Collectivist Anarchism ranks 9/5/1 by layer and 1 combined; aggregate rates 33.3333% and 49.0909%; worst ranks 52/48 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 7,862; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 64/64 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| JSON and whitespace integrity | PASS | Zeus state JSON parsed; package JSON parsed; trailing-whitespace and literal backslash-backtick scans reported no findings |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Collectivist Anarchism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains a high-risk hold, and the 1,428 candidates remain quarantined. The repository is initialized on `master` with no commits; no push was performed.

## v34 WorkPM continuation — Anarchism macro family — 2026-08-27

WorkPM selected the existing canonical `Anarchism` macro for direct family-level coverage after a fresh comparison with the SEP Anarchism entry, Ward's Oxford introduction, the Cambridge History of Socialism, and existing Ostrom governance context. The source set supports a plural family united by critique of centralized, hierarchical, or unjustified authority while varying across individualist, social, mutualist, communist, feminist, ecological, religious, and historical currents. It supports terminology, provenance, boundary writing, and original item authoring only; it does not validate local wording, effects, vectors, respondent interpretation, or classification.

The production boundary requires convergent anti-hierarchy, autonomy, mutual aid, voluntary association, and federated or self-organized coordination. It distinguishes the family from anti-government sentiment, localism, personal independence, Libertarianism, Social Anarchism, and any single market, collectivist, communist, feminist, ecological, religious, or historical programme. Twelve original target-tagged prompts and one `anarchism-family` anchor were added. The existing `anarchism` anchor remains contextual-only, no ontology node was added or reparented, and existing descendant branches remain distinct.

The active content version is 34 with 744 production questions (248 per layer), 61 editorial anchors, and 56 canonical scoring anchors. Anarchism has direct 4/4/4 coverage and isolated routing in every layer. The deterministic full-production fixture ranks it 45/45/45 by layer and 45 combined; aggregate top-three rates are 32.7381% by layer and 48.2143% combined, with worst ranks 53 and 47. These broad-family overlap values are structural diagnostics, not respondent evidence or grounds for uncalibrated scorer retuning. Compact v2 complete-answer output measures 7,990 characters; v1 decoding and fail-closed validation remain supported.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 56 dedicated-scored, 46 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 56 anchors have 4/4/4 direct coverage and isolated routing; Anarchism ranks 45/45/45 by layer and 45 combined; aggregate rates 32.7381% and 48.2143%; worst ranks 53/47 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 7,990; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 64/64 focused unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Anarchism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 46 targets remain catalog-only, Neo-Fascism remains a high-risk hold, and the broader comprehensive goal remains open. The repository is initialized on `master` with no commits; no push was performed.

## v35 WorkPM continuation — Conservatism macro family — 2026-08-27

WorkPM selected the existing canonical `Conservatism` macro for direct family-level coverage after a fresh comparison of the remaining macro queue and the [SEP Conservatism entry](https://plato.stanford.edu/entries/conservatism/), [O'Sullivan's Oxford Handbook chapter](https://academic.oup.com/edited-volume/34324/chapter/291333309), and [Blakely's 2024 Cambridge chapter](https://www.cambridge.org/core/books/abs/lost-in-ideology/in-the-name-of-the-past-conservatisms-multiple-traditions/73533F4CF4C72057615234CA725A4BF3). The source set supports a plural family organized around historically situated practical knowledge, living tradition, human fallibility, authority, continuity, prudence, and bounded or incremental change. It supports terminology, provenance, historical variation, and original item authoring only; it does not validate local wording, effects, vectors, respondent interpretation, or classification.

The production boundary requires convergent attention to those features and distinguishes the family from generic caution, age, status-quo preference, one religion, one party, anti-government sentiment, nationalism, and a single historical author. Moderate, reactionary, radical, national, religious, liberal, and New Right variations remain analytically distinct, as do positions on markets, welfare, democracy, hierarchy, and state capacity. Twelve original target-tagged prompts and one `conservatism-family` production anchor were added. The existing canonical macro node and ontology topology were preserved; no node was added, reparented, or demoted.

The active content version is 35 with 756 production questions (252 per layer), 62 editorial anchors, and 57 canonical scoring anchors. Conservatism has direct 4/4/4 coverage and isolated routing in every layer. The deterministic full-production fixture ranks it 38/46/4 by layer and 18 combined; aggregate top-three rates are 33.3333% by layer and 49.1228% combined, with worst ranks 53 and 47. These are structural diagnostics, not respondent evidence or grounds for uncalibrated scorer retuning. Compact v2 complete-answer output measures 8,118 characters; v1 decoding and fail-closed validation remain supported.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 57 dedicated-scored, 45 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 57 anchors have 4/4/4 direct coverage and isolated routing; Conservatism ranks 38/46/4 by layer and 18 combined; aggregate rates 33.3333% and 49.1228%; worst ranks 53/47 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 8,118; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 64/64 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios |
| JSON and whitespace integrity | PASS | Zeus state JSON parsed; package JSON parsed; trailing-whitespace and literal backslash-backtick scans reported no findings |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Conservatism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 45 targets remain catalog-only, Neo-Fascism remains a high-risk hold, and the broader comprehensive goal remains open. The repository is initialized on `master` with no commits; no push was performed.

## v36 WorkPM continuation — Ecologism / Green Ideology macro family — 2026-08-27

WorkPM selected the existing canonical `Ecologism` macro for direct family-level coverage after a fresh comparison of [Humphrey's Oxford Handbook chapter on Green Ideology](https://doi.org/10.1093/oxfordhb/9780199585977.013.0011), [Carter's third-edition Cambridge treatment](https://www.cambridge.org/core/books/abs/politics-of-the-environment/green-political-thought/BA5EB7C4D160DD1D16ECF39BF55C2047), and existing Ecologism, [SEP Environmental Ethics](https://plato.stanford.edu/entries/ethics-environmental/), planetary-boundaries, and climate-ethics sources. The source set supports a plural family organized around ecological limits, human–nature relations, ecological justice, and social or institutional transformation. It supports terminology, provenance, historical variation, false-positive controls, and original item authoring only; it does not validate local wording, effects, vectors, respondent interpretation, or classification.

The production boundary preserves variation over anthropocentric and ecocentric value, ecological law, grassroots democracy, decentralization, nonviolence, social justice, markets, ownership, state capacity, and local, national, and planetary coordination. It distinguishes Ecologism / Green Ideology from generic environmental concern, conservation, Deep Ecology, bioregionalism, Green Politics as a movement umbrella, Social Ecology, Ecosocialism, one policy, and any single philosophical or political tradition. Twelve original target-tagged prompts and one `ecologism-family` production anchor were added. The existing canonical macro and ontology topology were preserved; no node was added, reparented, or demoted.

The active content version is 36 with 768 production questions (256 per layer), 63 editorial anchors, and 58 canonical scoring anchors. Ecologism has direct 4/4/4 coverage and isolated routing in every layer. The deterministic full-production fixture ranks it 21/48/3 by layer and 8 combined; aggregate top-three rates are 33.3333% by layer and 48.2759% combined, with worst ranks 54 and 48. These are structural diagnostics, not respondent evidence or grounds for uncalibrated scorer retuning. Compact v2 complete-answer output measures 8,246 characters; v1 decoding and fail-closed validation remain supported.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 58 dedicated-scored, 44 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 58 anchors have 4/4/4 direct coverage and isolated routing; Ecologism ranks 21/48/3 by layer and 8 combined; aggregate rates 33.3333% and 48.2759%; worst ranks 54/48 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 8,246; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 64/64 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios; `10 passed (2.7m)` |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios against port 8001 |
| JSON and documentation integrity | PASS | Zeus state JSON parsed; root and precision WorkPM records, source map, methodology, results boundary, and Minos report synchronized |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Ecologism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 44 targets remain catalog-only, Neo-Fascism remains a high-risk hold, and the broader comprehensive goal remains open. The repository is initialized on `master` with no commits; no push was performed.
## v37 WorkPM continuation — Liberalism macro family — 2026-08-27

WorkPM selected the existing canonical `Liberalism` macro for a bounded family-level coverage tranche after comparing the current [Stanford Encyclopedia of Philosophy Liberalism entry](https://plato.stanford.edu/entries/liberalism/), [Freeden and Stears's Oxford Handbook chapter](https://academic.oup.com/edited-volume/34324/chapter-abstract/291334349), and [The Cambridge Companion to Liberalism](https://www.cambridge.org/core/books/cambridge-companion-to-liberalism/D73F918F7A3C4A26664C90B946C1B06C). The source comparison supports Liberalism as a plural and internally rival family organized around publicly justified authority, liberty, rights, equal standing, pluralism, and contestable limits on arbitrary power, while preserving variation over liberty concepts, classical/new liberalism, markets, welfare, constitutionalism, state capacity, and international reach. It supports terminology, provenance, historical variation, false-positive controls, and original item authoring only; it does not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation added two source records, twelve original target-tagged prompts (four descriptive, four normative, four prescriptive), one provisional `liberalism-family` anchor, and updated canonical metadata and research-bank coverage. Existing Liberal branches, hybrids, contextual anchors, and ontology ancestry remain distinct. The active research candidate bank remains effect-free and quarantined.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 59 dedicated-scored, 43 catalog-only, five contextual-only, 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| Anchor reachability | PASS | All 59 production anchors have 4/4/4 target blocks and isolated routing; Liberalism ranks 10/24/11 by layer and 9 combined; aggregate rates 33.3333% and 47.4576%; worst ranks 55/48 are structural diagnostics |
| Share compatibility | PASS | Compact v2 complete fragment measures 8,374; v1 decoding and fail-closed checks remain supported |
| Unit/type/build/audit | PASS | 64/64 unit tests, TypeScript, Vite build, and zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config, no-cache image rebuild, healthy `/healthz`, and 10/10 serial Playwright scenarios against port 8001 |
| JSON and documentation integrity | PASS | Zeus state JSON parsed; root and precision WorkPM records, source map, methodology, results boundary, and Minos report synchronized |
| Evidence boundary | PASS_WITH_HOLD | Sources support authoring boundaries only; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical, or population evidence was run |

The Liberalism prompts and anchor remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 43 targets remain catalog-only, Neo-Fascism remains a high-risk hold, and the broader goal remains open for Socialism, Nationalism, Republicanism, Fascism, and Feminism. The repository is initialized on `master` with no commits; no push was performed.
## v38 continuation report — Socialism macro family — 2026-08-27

The v38 WorkPM continuation selected the existing canonical `Socialism` macro for provisional direct coverage after a fresh comparison using the [SEP Socialism entry](https://plato.stanford.edu/entries/socialism/), [Dunn's *The Politics of Socialism*](https://www.cambridge.org/core/books/the-politics-of-socialism/AEC8DEF3D10DB34FA48137BD2D49F726), [Lane's *Socialist Visions*](https://www.cambridge.org/core/books/abs/global-neoliberal-capitalism-and-the-alternatives/socialist-visions/677C812A87A1CF67B44F9A3A7DE3CB36), and the [Oxford Handbook treatment of Social Democracy](https://academic.oup.com/edited-volume/34324/chapter-abstract/291334753). The source set supports a plural family boundary and original item authoring only; it does not validate local effects, vectors, respondent interpretation, or classification.

The implementation adds three source records, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one `socialism-family` anchor, and updated ontology/research metadata. Marxism, Communism, Social Democracy, Democratic Socialism, market-socialist, ecological, and feminist-socialist branches remain distinct. No ontology node was added or reparented; facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and share behavior remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v38; 792 prompts; 264 per layer; 65 editorial anchors; 60 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 60 dedicated-scored, 42 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Socialism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers |
| Reachability diagnostic | PASS | Socialism full-production ranks 18/6/48 by layer and 7 combined; aggregate top-three rates 32.7778% and 45.0000%; worst ranks 56 and 47 |
| Unit/type/build/audit | PASS | 64/64 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 8,502 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Socialism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The comprehensive goal remains open for Nationalism, Republicanism, Fascism, Feminism, and the remaining catalog-only queue. The repository is initialized on `master` with no commits; no push was performed.

## v39 continuation report — Nationalism macro family — 2026-08-27

The v39 WorkPM continuation selected the existing canonical `Nationalism` macro for provisional direct coverage after a fresh comparison using the [SEP Nationalism entry](https://plato.stanford.edu/entries/nationalism/), [Garner's Oxford Research Encyclopedia treatment](https://academic.oup.com/edited-volume/62239/chapter-abstract/550750941), [Pehrson's Oxford chapter](https://doi.org/10.1093/oso/9780198842545.003.0008), [Laborde's civic-patriotism account](https://www.cambridge.org/core/journals/british-journal-of-political-science/article/abs/from-constitutional-to-civic-patriotism/9C7723CE5D8DE5AF316783A224D1BB16), and [Anderson's *Imagined Communities*](https://www.versobooks.com/en-ca/products/1126-imagined-communities). The source set supports a plural family boundary and original item authoring only; it does not validate local effects, vectors, respondent interpretation, or classification.

The implementation adds five source records, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one `nationalism-family` anchor, and updated ontology/research metadata. Civic, liberal, ethnocultural, anti-colonial, religious, conservative, Arab, Pan-African, and other nationalist branches remain distinct. No ontology node was added or reparented; facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and share behavior remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v39; 804 prompts; 268 per layer; 66 editorial anchors; 61 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 61 dedicated-scored, 41 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Nationalism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers |
| Reachability diagnostic | PASS | Nationalism full-production ranks 28/32/14 by layer and 19 combined; aggregate top-three rates 31.6940% and 45.9016%; worst ranks 57 and 48 |
| Unit/type/build/audit | PASS | 64/64 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 2.9 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 2.8 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 8,630 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Nationalism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 41 targets remain catalog-only, Republicanism is the next comparison candidate, and Fascism remains a high-risk hold. The repository is initialized on `master` with no commits; no push was performed.

## v40 continuation report — Republicanism macro family — 2026-08-27

The v40 WorkPM continuation selected the existing canonical `Republicanism` macro for provisional direct coverage after a fresh comparison with the activated Liberalism and Nationalism families and the deferred Fascism and Feminism boundaries. The source set comprises the current [Stanford Encyclopedia of Philosophy entry on Republicanism](https://plato.stanford.edu/entries/republicanism/), [Laborde's Oxford Handbook chapter](https://academic.oup.com/edited-volume/34324/chapter/291338569), the [Oxford civic-republicanism source](https://academic.oup.com/book/1981/chapter-abstract/141819344), and [Dahl's democratic-accountability work](https://yalebooks.yale.edu/book/9780300015652/polyarchy/). These references support terminology, provenance, historical variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds four source-linked provenance references, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one `republicanism-family` anchor, and updated ontology/research metadata. The family boundary covers civic self-government, freedom from arbitrary or uncontrolled power, equal civic standing, accountable and contestable institutions, common public goods, and resistance to corruption. Historical civic republicanism and contemporary non-domination theory remain related but non-identical. Patriotism, generic anti-corruption, majoritarianism, constitutionalism alone, the contemporary Republican Party, and any one historical republic remain outside the macro inference boundary. No ontology node was added or reparented; facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and share behavior remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v40; 816 prompts; 272 per layer; 67 editorial anchors; 62 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 62 dedicated-scored, 40 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Republicanism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers |
| Reachability diagnostic | PASS | Republicanism full-production ranks 7/1/49 by layer and 4 combined; aggregate top-three rates 29.5699% and 46.7742%; worst ranks 58 and 50 |
| Unit/type/build/audit | PASS | 64/64 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 2.9 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 2.8 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 8,758 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Republicanism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 40 targets remain catalog-only, Fascism remains a high-risk hold, and Feminism requires a separate plural-family boundary pass. The repository is initialized on `master` with no commits; no push was performed.

## v41 continuation report — Feminism macro family — 2026-08-27

The v41 WorkPM continuation selected the existing canonical `Feminism` macro for provisional direct coverage after a fresh comparison using the [SEP Feminist Philosophy entry](https://plato.stanford.edu/entries/feminist-philosophy/), [SEP Feminist Political Philosophy entry](https://plato.stanford.edu/entries/feminism-political/), and the [Oxford Handbook of Feminist Philosophy](https://academic.oup.com/edited-volume/37184). The comparison also checked the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510) and [Mann's Cambridge chapter on interwar authoritarianism and fascism](https://www.cambridge.org/core/books/abs/fascists/explaining-the-rise-of-interwar-authoritarianism-and-fascism/CC1AE78421A18B0E1DB22B84D8A3BD65); Fascism remains a high-risk catalog-only hold because the broad definition and historical application remain contested. Sources support terminology, provenance, historical variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds the Feminist Political Philosophy source record, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional `feminism-family` anchor, and updated ontology/research metadata. The family boundary covers gendered structural and institutional power, equality, autonomy, solidarity, democratic or collective change, institutional voice, care/social reproduction, and public/private transformation while preserving liberal, radical, socialist/Marxist/materialist, Black, intersectional, ecological, queer, transnational, decolonial, Indigenous, religious, secular, and democratic variation. Formal equality alone, identity alone, one account of patriarchy, one policy, one branch, one historical movement, or generic care/welfare preference remains outside the macro inference boundary. No ontology node was added or reparented; facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and share behavior remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v41; 828 prompts; 276 per layer; 68 editorial anchors; 63 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 63 dedicated-scored, 39 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Feminism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers |
| Reachability diagnostic | PASS | Feminism full-production ranks 1/2/46 by layer and 1 combined; aggregate top-three rates 30.6878% and 46.0317%; worst ranks 59 and 50 |
| Unit/type/build/audit | PASS | 64/64 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.0 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 2.9 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 8,886 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Feminism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 39 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. The repository is initialized on `master` with no commits; no push was performed.

## v42 continuation report — Anarcho-Syndicalism micro branch — 2026-08-27

The v42 WorkPM continuation selected the existing canonical `Anarcho-Syndicalism` micro node under Social Anarchism after a fresh source comparison using the [Oxford Handbook treatment of Anarchism](https://doi.org/10.1093/oxfordhb/9780199585977.013.0001), [Oxford's *Anarchism: A Very Short Introduction*](https://academic.oup.com/book/43805), [Scalmer's Cambridge direct-action article](https://doi.org/10.1017/S0020859023000391), and [Batalha's Cambridge revolutionary-syndicalism study](https://doi.org/10.1017/S002085901700044X). The sources support branch-sensitive terminology, worker organization, direct-action repertoires, workplace self-government, federated transformation, historical and transnational variation, and false-positive controls; they support authoring boundaries only and do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds two Cambridge source records, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional `anarcho-syndicalism` anchor, and updated canonical metadata/research-bank coverage. The boundary requires the convergent bundle of worker-led organization, workplace self-government, direct-action repertoire, federated coordination, and opposition to permanent managerial or state command. Generic union support, labor solidarity, anti-state sentiment, worker consultation, Guild Socialism, Libertarian Socialism, National-Syndicalism, and direct action treated as synonymous with violence remain outside the activation boundary. No ontology node was added or reparented; the 9/33/60 topology, facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and research quarantine remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v42; 840 prompts; 280 per layer; 69 editorial anchors; 64 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 64 dedicated-scored, 38 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Anarcho-Syndicalism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers and combined calculation |
| Reachability diagnostic | PASS | Full-production ranks 15/8/1 by layer and 1 combined; aggregate top-three rates 31.25% and 46.875%; worst ranks 60 and 51 |
| Unit/type/build/audit | PASS | 64/64 unit tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.0 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 2.9 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,014 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Anarcho-Syndicalism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 38 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No commit or push was performed; the repository remains uncommitted on `master`.

## v43 continuation report — Anarcho-Capitalism micro branch — 2026-08-27

The v43 WorkPM continuation selected the existing canonical `Anarcho-Capitalism` micro node under Libertarianism after a fresh source comparison using the [SEP Anarchism entry](https://plato.stanford.edu/entries/anarchism/), [Spafford's Cambridge introduction to *Social Anarchism and the Rejection of Moral Tyranny*](https://www.cambridge.org/core/books/social-anarchism-and-the-rejection-of-moral-tyranny/introduction/5E48734271ADE9A86CC39992674B759F), and [Prévost's Cambridge critique of anarcho-capitalist state theory](https://www.cambridge.org/core/journals/canadian-journal-of-political-science-revue-canadienne-de-science-politique/article/abs/la-theorie-anarchocapitaliste-de-letat-une-critique-methodologique/92DCEAF86648FC835EF7FB342DB12798), with existing Libertarianism, Nozick, and Ostrom references. The sources support a contested market-anarchist boundary, distinctions from social anarchism and minimal-state libertarianism, historical/conceptual variation, provenance, and false-positive controls; they support authoring boundaries only and do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds two Cambridge source records, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional `anarcho-capitalism` anchor, updated canonical metadata/research-bank coverage, and the E2E contract updates needed for the newly scored node and larger dataset traversal. The boundary requires the convergent bundle of territorial-monopoly rejection, strong private-property and contract claims, voluntary market coordination, exit, and polycentric proprietary/legal/protective institutions. Generic libertarianism, small-government preference, anti-state sentiment, private provision alone, Minarchism, Individualist or Social Anarchism, Mutualism, and one theorist's complete programme remain insufficient evidence. No ontology node was added or reparented; the 9/33/60 topology, facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and research quarantine remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v43; 852 prompts; 284 per layer; 70 editorial anchors; 65 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 65 dedicated-scored, 37 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Anarcho-Capitalism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers and combined calculation |
| Reachability diagnostic | PASS | Full-production ranks 12/1/1 by layer and 1 combined; aggregate top-three rates 32.8205% and 49.2308%; worst ranks 61 and 52 |
| Unit/type/build/audit | PASS | 64/64 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.1 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.0 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,142 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Anarcho-Capitalism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 37 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No commit or push was performed; the repository remains uncommitted on `master`.

## v44 continuation report — Anarcho-Primitivism micro branch — 2026-08-27

The v44 WorkPM continuation selected the existing canonical `Anarcho-Primitivism` micro node after a fresh source comparison using the [SEP Anarchism entry](https://plato.stanford.edu/entries/anarchism/), [el-Ojeili and Taylor](https://doi.org/10.1080/08935696.2020.1727256), [Dunlap](https://doi.org/10.1080/14747731.2022.2073657), [Gordon](https://doi.org/10.1111/j.1743-4580.2009.00250.x), [Smith](https://academic.oup.com/minnesota-scholarship-online/book/16314/chapter-abstract/171432469), and [Zacharakis](https://doi.org/10.12681/ethiki.44122), with existing SEP environmental-ethics and Oxford anarchism context. The sources support a contested anti-civilization and industrial-scale boundary, ecological and technology distinctions, decolonial/Indigenous cautions, provenance, and false-positive controls; they support authoring boundaries only and do not validate local wording, effects, vectors, respondent interpretation, or classification.

The implementation adds five source records, twelve source-linked target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional `anarcho-primitivism` anchor, updated canonical metadata/research-bank coverage, and the E2E contract updates needed for the newly scored target. The boundary requires a convergent diagnosis of civilization, industrial scale, specialization, domestication, or technical dependence as domination or ecological disconnection, ecological priority, and radically decentralized/self-organized lifeways. Environmentalism, broad Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, and one theorist's programme remain insufficient evidence. No ontology node was added or reparented; the existing Green Anarchism relation, 9/33/60 topology, facets, scorer, thresholds, combined-layer semantics, contextual-only exclusion, and research quarantine remain unchanged.

| Gate | Status | Evidence |
|---|---|---|
| Production contract | PASS | v44; 864 prompts; 288 per layer; 71 editorial anchors; 66 canonical scoring anchors |
| Research coverage | PASS | 1,428 effect-free candidates across 119 targets; 66 dedicated-scored, 36 catalog-only, 5 contextual-only, 12 registry-only; zero validation errors |
| Anarcho-Primitivism structural closure | PASS | Direct 4/4/4 target block and isolated routing in all three layers and combined calculation |
| Reachability diagnostic | PASS | Full-production ranks 9/33/1 by layer and 1 combined; aggregate top-three rates 32.3232% and 48.4848%; worst ranks 62 and 53 |
| Unit/type/build/audit | PASS | 65/65 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.2 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 2.9 minutes against port 8001 |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,270 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Anarcho-Primitivism anchor remains provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 36 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## v45 continuation — Austromarxism micro branch

WorkPM selected the existing canonical `Austromarxism` micro node on `Socialism → Marxism` after a fresh source comparison. The [Historical Materialism volume on Austro-Marxism](https://www.historicalmaterialism.org/book-series/austro-marxism-the-ideology-of-unity/), Cambridge's [Austro-Marxism chapter in The Red Vienna Sourcebook](https://doi.org/10.1017/9781787446106.008), Beneš's [Workers and Nationalism in Habsburg Austria](https://doi.org/10.1093/acprof:oso/9780198789291.001.0001), Ota's [study of Karl Renner's national autonomy](https://doi.org/10.11498/jshet1963.46.17), Oxford's [Habsburg legacies of non-territorial national autonomy](https://academic.oup.com/book/41096/chapter/350380852), and Cambridge's [Marxist national-question analysis](https://www.cambridge.org/core/journals/nationalities-papers/article/answering-the-national-question-marxist-theories-and-the-intellectual-origins-of-soviet-nationality-policies/BE94CC899B73706C425A0ABD88CAB33A) support terminology, historical context, variation, and false-positive boundaries. Lagedamon's [French History study](https://academic.oup.com/fh/advance-article/doi/10.1093/fh/crae051/61287040/crae051.pdf) remains part of the existing provenance set. These records are authoring and provenance sources only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The activation boundary requires a convergent bundle of historically situated Austrian Marxist and Social Democratic analysis; class transformation; worker-movement unity; democratic institutional strategy; and personal or non-territorial national autonomy within multinational conditions. It preserves variation among Bauer, Renner, Adler, Hilferding, and Neurath and over reform, revolution, parliamentary, municipal, associational, territorial, and cultural routes. It does not infer Austromarxism from generic Marxism, Social Democracy, Austrian identity, nationalism, multiculturalism, national autonomy alone, generic parliamentary reform, Marxism-Leninism, Communism, one historical regime, one theorist, or a single contemporary programme.

The v45 implementation added seven fresh source records, twelve original target-tagged prompts (four descriptive, four normative, four prescriptive), one provisional `austromarxism` anchor, source-linked ontology metadata, and updated research-bank/profile/coverage metadata. No ontology node was added, reparented, or merged. Content version 45 contains 876 prompts (292 per layer), 72 editorial anchors, and 67 canonical scoring anchors. The ontology remains 9 macro / 33 canonical meso / 60 micro with five contextual placements and 12 registry-only entries; ontology-level totals remain 9/38/60. The 1,428 effect-free candidates remain quarantined.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 876 prompts; 292 per layer; 72 editorial anchors; 67 production anchors; 107 ontology nodes; 12 registry entries; 35 catalog-only ontology targets; zero coverage validation errors |
| Austromarxism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 8/5/2 by layer and 2 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 31.3433% by layer and 49.2537% combined; worst ranks 63 and 54; structural design diagnostics only |
| Unit/type/build/audit | PASS | 66/66 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,398 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.2 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.0 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Austromarxism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 35 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. The initial `npm run test:run -- --runInBand` invocation was a Vitest option mismatch and ran zero tests; the repository's actual `npm run test:run` command then passed 66/66. No commit or push was performed; the repository remains uncommitted on `master`.

## v46 continuation report — Egalitarian-Liberal Feminism micro branch — 2026-08-27

WorkPM selected the existing canonical `Egalitarian-Liberal Feminism` micro node under the existing `Liberal Feminism` meso root after a fresh source comparison. The [SEP Liberal Feminism entry](https://plato.stanford.edu/entries/feminism-liberal/), [Hartley and Watson's Oxford study of equal citizenship and public reason](https://doi.org/10.1093/oso/9780190683023.001.0001), [McClain's Oxford Handbook chapter on Liberal Feminist Jurisprudence](https://doi.org/10.1093/oxfordhb/9780197519998.013.2), and [Friedman's Oxford study of autonomy, gender, and politics](https://academic.oup.com/book/9525) support terminology, substantive-equality and autonomy distinctions, public-action boundaries, and false-positive controls. These sources support authoring and provenance only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The activation boundary requires personal and political autonomy, gendered institutional starting conditions, substantive equality and opportunity, democratic inclusion, and accountable public action that enables meaningful choice. It does not infer the branch from generic liberalism, formal rights, equality, public provision, anti-discrimination, feminism, one policy, or one author. Classical-Liberal Feminism, Social Liberalism, Socialist / Marxist / Materialist Feminism, Radical Feminism, and the broader Liberal Feminism family remain distinct. The implementation added three fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata without adding or reparenting a node.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 888 prompts; 296 per layer; 73 editorial anchors; 68 production anchors; 107 ontology nodes; 12 registry entries; 34 catalog-only ontology targets; zero coverage validation errors |
| Egalitarian-Liberal Feminism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 54/57/2 by layer and 53 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 31.8627% by layer and 48.5294% combined; worst ranks 64 and 55; structural design diagnostics only |
| Unit/type/build/audit | PASS | 67/67 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,526 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 Playwright scenarios in 1.1 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 Playwright scenarios in 1.1 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Egalitarian-Liberal Feminism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 34 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. The initial concurrent local QA timing failures were fixed by making two Playwright timeouts manifest-derived; the isolated local rerun and Docker-backed rerun both passed. No commit or push was performed; the repository remains uncommitted on `master`.

## v47 continuation report — Buddhist Nationalism micro branch — 2026-08-27

WorkPM selected the existing canonical `Buddhist Nationalism` micro node under the existing `Religious Nationalism` meso root after a fresh Oxford/Cambridge source comparison. The [Oxford Bibliographies entry on Buddhism and Nationalism](https://academic.oup.com/reference/62340/reference-article-abstract/554138513), [Walton's Oxford Handbook treatment](https://academic.oup.com/edited-volume/27986/chapter-abstract/211689340), [Malji's Cambridge comparative study](https://doi.org/10.1017/9781108919050), [Berkwitz's Cambridge Buddhist-nationalism article](https://doi.org/10.1017/S002191180800003X), and [Walton and Jerryson's Politics and Religion study](https://doi.org/10.1017/S1755048316000559) support terminology, public religion–nation variation, and false-positive controls. These sources support authoring and provenance only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The activation boundary requires a public-political translation in which Buddhist histories, institutions, symbols, or moral claims shape national identity, public order, membership, or self-determination, with institutional or membership implications. It does not infer Buddhist Nationalism from private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, nationalism without Buddhist-national translation, one country, one monk, one minority conflict, one constitutional model, or one party. Jurisdictional and historical variation, monastic and lay authority, anti-colonial and defensive narratives, state patronage, minority boundaries, democratic contestation, and global pressures remain explicit. The implementation added five fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata without adding or reparenting a node.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 900 prompts; 300 per layer; 74 editorial anchors; 69 production anchors; 107 ontology nodes; 12 registry entries; 33 catalog-only ontology targets; zero coverage validation errors |
| Buddhist Nationalism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 18/43/17 by layer and 22 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 30.9179% by layer and 47.8261% combined; worst ranks 65 and 56; structural design diagnostics only |
| Unit/type/build/audit | PASS | 68/68 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,654 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.2 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.1 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Buddhist Nationalism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 33 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## v48 continuation report — Cultural / Spiritual Ecofeminism micro branch — 2026-08-27

WorkPM selected the existing canonical `Cultural / Spiritual Ecofeminism` micro node under the existing `Ecofeminism` meso root after a fresh Oxford/Stanford/Wiley/Cambridge source comparison. The [Oxford Handbook chapter on Religious Ecofeminism](https://academic.oup.com/edited-volume/34392/chapter-abstract/291660295), the [Stanford Encyclopedia of Philosophy entry on Feminist Environmental Philosophy](https://plato.stanford.edu/archives/fall2025/entries/feminism-environmental/), [Kao's study of the universal and particular in ecofeminist ethics](https://doi.org/10.1111/j.1467-9795.2010.00455.x), and [Deane-Drummond's Cambridge chapter on Creation](https://doi.org/10.1017/CCOL052166327X.011) support terminology, plural religious/secular variation, relational and ecological boundaries, and false-positive controls. These sources support authoring and provenance only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The activation boundary requires a plural ecofeminist connection between gendered domination and ecological interdependence through cultural, spiritual, symbolic, or relational critique, with anti-essentialist, cross-context, care, justice, and appropriation safeguards. It does not infer the branch from private spirituality, gender identity, environmental concern, woman–nature essentialism, one religion, cultural nostalgia, generic Ecofeminism, Cultural Feminism, Materialist / Socialist Ecofeminism, Deep Ecology, anti-technology sentiment, or one author's or community's programme. The implementation added four fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata without adding or reparenting a node.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 912 prompts; 304 per layer; 75 editorial anchors; 70 production anchors; 107 ontology nodes; 12 registry entries; 32 catalog-only ontology targets; zero coverage validation errors |
| Cultural / Spiritual Ecofeminism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers; full-production ranks 13/10/8 by layer and 6 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 29.5238% by layer and 45.7143% combined; worst ranks 66 and 57; structural design diagnostics only |
| Unit/type/build/audit | PASS | 69/69 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,782 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.3 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.1 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Cultural / Spiritual Ecofeminism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 32 ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v49 — Materialist / Socialist Ecofeminism micro branch

The v49 source pass selected the existing canonical `Materialist / Socialist Ecofeminism` micro node under `Ecofeminism` after comparing Oksala's materialist and Marxist ecofeminism analysis, the Oxford Research Encyclopedia treatment of feminist environmental perspectives, Sundberg's feminist political ecology reference, and Cock's eco-feminist-socialist just-transition chapter. Together these sources support a plural material boundary connecting capitalist and patriarchal political economy, paid and unpaid labor, social reproduction, resource control, and ecological degradation through collective and democratic transformation routes. They support terminology, provenance, plural variation, false-positive controls, and item authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary does not infer the branch from green policy, feminism, socialism, welfare support, public ownership, social-reproduction language, generic Eco-socialism, Materialist Feminism without an ecological connection, Cultural / Spiritual Ecofeminism's cultural/spiritual mechanism, one country, one theorist, or one institutional model. The existing `Ecofeminism → Materialist / Socialist Ecofeminism` path is preserved; no ontology node is added or reparented. The implementation adds four fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 924 prompts; 308 per layer; 76 editorial anchors; 71 production anchors; 107 ontology nodes; 12 registry entries; 31 catalog-only ontology targets; zero coverage validation errors |
| Materialist / Socialist Ecofeminism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 2/1/2 by layer and 1 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 27.2300% by layer and 45.0704% combined; worst ranks 67 and 59; structural design diagnostics only |
| Unit/type/build/audit | PASS | 70/70 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,910 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.4 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.2 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Materialist / Socialist Ecofeminism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 31 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v50 — Christian Nationalism micro branch

The v50 source pass selected the existing canonical `Christian Nationalism` micro node under `Religious Nationalism` after comparing [Saiya's study of the varieties of American Christian nationalism](https://www.cambridge.org/core/journals/politics-and-religion/article/varieties-of-american-christian-nationalism/B78994104CA1CCBBAC34A20E3AA2A980), [Ishiyama's comparative article](https://www.cambridge.org/core/journals/politics-and-religion/article/christian-nationalism-and-attitudes-about-democracy-in-africa/59CD6B84EB9B078692980EBD87A17EBB), and [Hughes and Littlefield's Oxford chapter](https://academic.oup.com/illinois-scholarship-online/book/61164/chapter-abstract/532373762), with existing nationalism and political-ideologies references. Together these sources support a heterogeneous Christian-national political-theological boundary joining Christianized national membership with public institutional authority or political action. They support terminology, variation, provenance, false-positive controls, and item authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary does not infer the branch from private Christian faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, civic religion, generic Religious Nationalism, one party, one actor, one country, or one policy. Theological, constitutional, democratic, authoritarian, racialized/non-racialized, and jurisdictional variation remains explicit. The existing `Religious Nationalism → Christian Nationalism` path is preserved; no ontology node is added or reparented. The implementation adds two fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 936 prompts; 312 per layer; 77 editorial anchors; 72 production anchors; 107 ontology nodes; 12 registry entries; 30 catalog-only ontology targets; zero coverage validation errors |
| Christian Nationalism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 8/47/1 by layer and 2 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.8519% by layer and 45.8333% combined; worst ranks 68 and 60; structural design diagnostics only |
| Unit/type/build/audit | PASS | 71/71 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,038 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Local browser QA | PASS | 10/10 serial Playwright scenarios in 3.5 minutes |
| Docker QA | PASS | Compose config; no-cache image rebuild/recreate; healthy `/healthz`; 10/10 serial Playwright scenarios in 3.2 minutes against port 8001 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Christian Nationalism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 30 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v51 — Egoist Anarchism micro branch

The v51 source pass selected the existing canonical `Egoist Anarchism` micro node under `Individualist Anarchism` after comparing the [Stanford Encyclopedia of Philosophy entry on Max Stirner](https://plato.stanford.edu/entries/max-stirner/), [Jenkins's scholarly treatment of Max Stirner's Egoism](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-2265.2009.00444.x), [Leopold's Cambridge chapter on Stirner's anarchism](https://www.cambridge.org/core/books/new-hegelians/state-and-i-max-stirners-anarchism/64FA7AD3D26A367A859FB4DF30BC06E9), and [Ward's Oxford treatment of the individualist response](https://academic.oup.com/book/427/chapter-abstract/135222305), with existing anarchism and libertarianism references. Together these sources support a contested individualist-anarchist boundary around Stirnerian self-rule or ownness, resistance to imposed identity and compulsory authority, and voluntary association, while requiring interpretive, property, sociality, historical, and jurisdictional variation to remain explicit. They support terminology, provenance, false-positive controls, and item authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary does not infer Egoist Anarchism from nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, or one interpretation of Stirner. The existing `Anarchism → Individualist Anarchism → Egoist Anarchism` path is preserved; no ontology node is added or reparented. The implementation adds three fresh source records beyond the existing SEP Stirner record, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 948 prompts; 316 per layer; 78 editorial anchors; 73 production anchors; 107 ontology nodes; 12 registry entries; 29 catalog-only ontology targets; zero coverage validation errors |
| Egoist Anarchism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all layers and combined calculation; full-production ranks 27/6/1 by layer and 1 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.9406% by layer and 46.5753% combined; worst ranks 69 and 61; structural design diagnostics only |
| Unit/type/build/audit | PASS | 72/72 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,166 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local and Docker-backed serial Playwright suites; Compose config; no-cache image rebuild/recreate; healthy `/healthz` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Egoist Anarchism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 29 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v52 — Cultural Feminism micro branch

The v52 source pass selected the existing canonical `Cultural Feminism` micro node under `Radical Feminism` after comparing [Alcoff's *Cultural Feminism versus Post-Structuralism*](https://doi.org/10.1086/494426), her Oxford [*Visible Identities* chapter](https://academic.oup.com/book/36020/chapter-abstract/313079048), [Narayan's critique of cultural essentialism](https://doi.org/10.1111/j.1527-2001.1998.tb01227.x), and [Kotiswaran's care analysis](https://academic.oup.com/sp/article/28/4/854/6516156). Together these sources support a contested cultural, difference, anti-essentialist, relational, and care-oriented boundary in which gendered or cultural norms shape power and cultural or institutional valuation remains open to contestation. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary does not infer Cultural Feminism from gender identity, care preference or care work, feminist identity, one anti-essentialist statement, generic feminism, Radical Feminism's constitutive patriarchy mechanism, Materialist Feminism's labor/material-relations mechanism, Lesbian Feminism's compulsory-heterosexuality mechanism, Cultural / Spiritual Ecofeminism's ecological connection, one author, one community, or one policy. The existing `Feminism → Radical Feminism → Cultural Feminism` path is preserved; no ontology node is added or reparented. The implementation adds four fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 960 prompts; 320 per layer; 79 editorial anchors; 74 production anchors; 107 ontology nodes; 12 registry entries; 28 catalog-only ontology targets; zero coverage validation errors |
| Cultural Feminism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 12/32/16 by layer and 11 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.1261% by layer and 45.9459% combined; worst ranks 70 and 62; structural design diagnostics only |
| Unit/type/build/audit | PASS | 72/72 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,294 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local and Docker-backed serial Playwright suites; Compose config; no-cache image rebuild/recreate; healthy `/healthz` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Cultural Feminism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 28 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v53 — Cultural Nationalism micro branch

The v53 source pass selected the existing canonical 'Cultural Nationalism' micro node under 'Nationalism' after comparing Spencer on cultural and political nationalism, Hutchinson on memorialization and national communities, Giudici and Grizelj on language curricula and plural national/linguistic identities, and Trohler on national-minded citizen formation. Together these sources support a contested cultural national-community boundary involving language, memory, arts, education, symbols, heritage, and associations, including projects that precede or exceed direct state control. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary requires a national translation, a cultural mechanism, and a public or collective project. It does not infer Cultural Nationalism from cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, ethnocultural inherited membership, religious nationalism, anti-colonial domination, one state/party/heritage policy, fixed cultural homogeneity, or one author. The existing Nationalism → Cultural Nationalism path is preserved; no ontology node is added or reparented. The implementation adds four fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 972 prompts; 324 per layer; 80 editorial anchors; 75 production anchors; 107 ontology nodes; 12 registry entries; 27 catalog-only ontology targets; zero coverage validation errors |
| Cultural Nationalism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 16/38/17 by layer and 19 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 25.7778% by layer and 45.3333% combined; worst ranks 71 and 63; structural design diagnostics only |
| Unit/type/build/audit | PASS | 73/73 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,422 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local and Docker-backed serial Playwright suites; Compose config; no-cache image rebuild/recreate; healthy /healthz |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Cultural Nationalism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 27 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v54 — Ethnocultural Nationalism micro branch

The v54 source pass selected the existing canonical 'Ethnocultural Nationalism' micro node under 'Nationalism'. The comparison used [Tamir's Annual Review article on the ethnic/civic distinction](https://doi.org/10.1146/annurev-polisci-022018-024059), [Smith's chapter on ethnic nationalism and minorities](https://academic.oup.com/book/54589/chapter-abstract/422625505), [Smith's article on culture, community, and territory](https://doi.org/10.2307/2625550), [Piwoni and Mußotter's analysis of the civic/ethnic distinction](https://doi.org/10.1111/nana.12944), and [Lansbergen and Shaw's national-membership models](https://doi.org/10.1093/icon/mop036). Together they support a contested membership-model boundary involving shared descent, inherited cultural continuity, language, customs, territorialized memory, and institutional or political consequences. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary requires a national translation, a constitutive shared-descent or inherited-cultural membership rule, and an institutional or political implication. It does not infer Ethnocultural Nationalism from cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, or generic Nationalism. Non-racial and racialized variants, mixed civic/ethnocultural forms, religious and anti-colonial projects, regional/minority pluralism, and historical/postcolonial variation remain explicit. The existing 'Nationalism → Ethnocultural Nationalism' path is preserved; no ontology node is added or reparented.

The implementation adds five fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, source-linked ontology metadata, and updated research-bank/profile/coverage metadata. Content version 54 contains 984 prompts (328 per layer), 81 editorial anchors, and 76 canonical production anchors. The ontology remains 9 macro / 33 canonical meso / 60 micro with five contextual placements, 107 nodes, 12 registry entries, and 9/38/60 ontology-level totals; 26 canonical ontology targets remain catalog-only and 1,428 effect-free candidates remain quarantined.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 984 prompts; 328 per layer; 81 editorial anchors; 76 production anchors; 107 ontology nodes; 12 registry entries; 26 catalog-only ontology targets; zero coverage validation errors |
| Ethnocultural Nationalism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 15/28/1 by layer and 3 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.3158% by layer and 46.0526% combined; worst ranks 72 and 64; structural design diagnostics only |
| Unit/type/build/audit | PASS | 74/74 tests; TypeScript; Vite build; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,550 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local serial Playwright 10/10 in 3.6 minutes; Docker-backed serial Playwright 10/10 in 3.4 minutes; Compose config, no-cache image rebuild/recreate, and `/healthz` `ok` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Ethnocultural Nationalism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 26 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v55 — Lesbian Feminism micro branch

The v55 source pass selected the existing canonical `Lesbian Feminism` micro node under `Feminism`. The comparison used [Rich's “Compulsory Heterosexuality and Lesbian Existence”](https://www.journals.uchicago.edu/doi/10.1086/493756), [Schippers's “Compulsory Heterosexuality”](https://doi.org/10.1002/9781118663219.wbegss032), [Lee and Atchison's “Dykes First”: Lesbian Separatism in America](https://doi.org/10.1093/oso/9780190876500.003.0006), [Hobson's “A More Powerful Weapon: Lesbian Feminism and Collective Defense”](https://doi.org/10.1525/california/9780520279056.003.0003), and the existing [SEP feminist-trans source](https://plato.stanford.edu/entries/feminism-trans/). Together they support a contested structural and political boundary involving compulsory heterosexuality, gendered sexuality institutions, lesbian/feminist autonomy and self-definition, community formation, collective defense, coalition, and separatist variation. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary requires the joint structural critique of compulsory heterosexuality and gendered sexuality institutions, feminist or lesbian autonomy/self-definition, and a collective or institutional implication. It does not infer Lesbian Feminism from lesbian identity, sexual orientation, same-sex relationship, feminist identity, anti-men sentiment, sexuality-rights support, generic Radical/Cultural/Black Feminism, one separatist community, one author, or one policy. Coalition, separatist, sex-positive, trans, queer, bisexual, racial, class, disability, religious, historical, and contemporary variations remain explicit. The existing `Feminism → Lesbian Feminism` path is preserved; no ontology node is added or reparented. The implementation adds four fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 996 prompts; 332 per layer; 82 editorial anchors; 77 production anchors; 107 ontology nodes; 12 registry entries; 25 catalog-only ontology targets; zero coverage validation errors |
| Lesbian Feminism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 3/16/10 by layer and 4 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.8398% by layer and 44.1558% combined; worst ranks 73 and 65; structural design diagnostics only |
| Unit/type/build/audit | PASS | 75/75 tests; TypeScript; Vite build with the existing large-client-chunk advisory; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,678 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local serial Playwright 10/10 in 3.6 minutes; Docker-backed serial Playwright 10/10 in 3.4 minutes; Compose config, no-cache image rebuild/recreate, bounded startup retry, and `/healthz` `ok` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Lesbian Feminism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 25 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from the deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v56 — One-Nation Conservatism micro branch

The v56 reconciliation completed the existing canonical `One-Nation Conservatism` micro node on the `Conservatism → Moderate Conservatism` path. The comparison used [“Constructing Disraeli in Twentieth-Century Conservatism”](https://academic.oup.com/ehr/article/139/600/1199/7814564), [Walsha's “The One Nation Group and One Nation Conservatism, 1950–2002”](https://doi.org/10.1080/13619460308565444), [Page's welfare-state history](https://doi.org/10.1332/policypress/9781847424334.003.0002), and [Webb's contemporary One-Nation analysis](https://doi.org/10.1111/1467-923X.13405). Together they support a historically situated, internally varied boundary involving national translation, cross-class social cohesion, responsible inherited institutions, and constructive or gradual reform, while preserving variation over welfare, markets, state capacity, social liberalism, sovereignty, immigration, nationhood, and cosmopolitanism. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary excludes patriotism, welfare support, tradition, current party affiliation, one leader, one policy, generic Conservatism, National Conservatism, and Social Democracy as sufficient evidence. The existing path is preserved; no ontology node is added or reparented. The implementation completes three fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 1,008 prompts; 336 per layer; 83 editorial anchors; 78 production anchors; 107 ontology nodes; 12 registry entries; 24 canonical catalog-only targets; zero coverage validation errors |
| One-Nation Conservatism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 15/30/1 by layer and 5 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.9231% by layer and 43.5897% combined; worst ranks 74 and 67; the combined two-layer miss is a structural diagnostic only |
| Unit/type/build/audit | PASS | 76/76 tests; TypeScript; Vite build with the existing large-client-chunk advisory; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,817 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local serial Playwright 10/10 in 3.7 minutes; Docker-backed serial Playwright 10/10 in 3.5 minutes; Compose config, no-cache image rebuild/recreate, bounded health check, and `/healthz` `ok` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The One-Nation Conservatism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 24 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. A stale browser assertion expecting the newly scored target to remain catalog-only was repaired before the final green QA run. No scorer or picker retuning was made from deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## WorkPM continuation v57 — Zionism micro branch

The v57 continuation completed the existing canonical `Zionism` micro node on the `Nationalism` path. The source comparison used [Boix's “Political Emancipation and Modern Jewish National Identity”](https://doi.org/10.1017/S0003055424001412), [Shumsky's *Beyond the Nation-State*](https://doi.org/10.12987/yale/9780300230130.001.0001), [Mann's “Zionism and human rights”](https://doi.org/10.1093/icon/moz099), and the existing Cambridge/Oxford Zionism records. Together they support a historically situated and internally varied boundary involving Jewish collective self-determination, political community, cultural or institutional revival, diaspora, plural constitutional routes, and equal civic standing. They support terminology, provenance, variation, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, or classification.

The activation boundary excludes Jewish identity, private religious practice, generic nationalism, patriotism, current government or conflict opinion, antisemitism or anti-Palestinian sentiment alone, one territorial programme, and one policy or leader as sufficient evidence. The existing path is preserved; no ontology node is added or reparented. The implementation completes three fresh source records, twelve original target-tagged prompts (4 descriptive, 4 normative, 4 prescriptive), one provisional anchor, and updated ontology/research-bank metadata while preserving secular, religious, socialist, revisionist, cultural, diasporic, multinational, autonomy, and post-state variation.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 1,020 prompts; 340 per layer; 84 editorial anchors; 79 production anchors; 107 ontology nodes; 12 registry entries; 23 canonical catalog-only targets; zero coverage validation errors |
| Zionism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 27/25/19 by layer and 19 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.5823% by layer and 43.0380% combined; worst ranks 75 and 68; full-competition values are structural diagnostics only |
| Unit/type/build/audit | PASS | 77/77 tests; TypeScript; Vite build with the existing large-client-chunk advisory; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 10,961 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local serial Playwright 10/10 in 4.1 minutes; Docker-backed serial Playwright 10/10 in 3.6 minutes; Compose config, no-cache image rebuild/recreate, bounded startup retry, and `/healthz` `ok` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Zionism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 23 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## Current v58 continuation — Khomeinism micro branch

WorkPM completed a source-backed provisional activation of the existing canonical `Khomeinism` micro node under `Islamism`. The four fresh academic records from Arjomand, Namazi, Hossainzadeh and Travers, and Ghobadzadeh were added alongside the existing Abrahamian and Cambridge context. The boundary requires revolutionary Shi'i jurist guardianship, modern Islamic sovereignty/state formation, anti-monarchical or anti-imperial independence, and oppressed-centered mobilization while preserving pre/post-revolutionary, constitutional/authoritarian, populist/clerical, national/transnational, and contested Shi'i-theological variation. Shi'i identity, private faith, generic Islamism, current policy opinion, one leader, one regime, one policy, and operational militancy remain insufficient evidence.

| Verification | Status | Evidence |
|---|---|---|
| Coverage and source contract | PASS | 1,032 prompts; 344 per layer; 85 editorial anchors; 80 production anchors; 107 ontology nodes; 12 registry entries; 22 canonical catalog-only targets; zero coverage validation errors |
| Khomeinism reachability | PASS | Exact 4/4/4 direct block; isolated routing in all three layers; full-production ranks 4/31/1 by layer and 1 combined |
| Overlap diagnostics | PASS_WITH_HOLD | Aggregate top-three rates 26.2500% by layer and 43.7500% combined; worst ranks 76 and 69; normative rank 31 and layer misses remain structural diagnostics only |
| Unit/type/build/audit | PASS | 77/77 tests; TypeScript; Vite build with the existing large-client-chunk advisory; zero high-severity audit vulnerabilities |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 11,105 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Browser and Docker delivery | PASS | Local serial Playwright 10/10 in 4.0 minutes; Docker-backed serial Playwright 10/10 in 3.7 minutes; Compose config, Docker image rebuild/recreate, healthy container, and `/healthz` `ok` |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent evidence, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The Khomeinism anchor and item block remain provisional editorial measurement, not a validated respondent measure or political recommendation. The 1,428 candidates remain quarantined, 22 canonical ontology targets remain catalog-only, Fascism remains a high-risk hold, and the comprehensive goal remains open. No scorer or picker retuning was made from deterministic overlap diagnostics. No commit or push was performed; the repository remains uncommitted on `master`.

## V59 continuation — Qutbism micro branch

WorkPM completed a source-backed provisional activation of the existing canonical `Islamism → Qutbism` micro branch. Toth, Khatab, Faradj, and Wagemakers provide fresh OUP/T&F scholarship on Qutb's intellectual periods, divine sovereignty and `jahiliyya`, authority complexity, and contested reception; existing Qutb and Cambridge Islamism records preserve adjacent context. These sources support terminology, variation, provenance, and original item authoring only. They do not establish respondent comprehension, local item validity, psychometric quality, or empirical classification.

The boundary requires a convergent Qutbist account of divine sovereignty/`jahiliyya`, comprehensive moral order, disciplined transformative community, and varied revolutionary or reformist reception. Muslim identity, private faith, generic Islamism, religious conservatism, anti-Western sentiment, Muslim Brotherhood alignment, current policy, operational militancy, or one reading of Qutb is insufficient. Twelve prompts (4/4/4), one provisional anchor, source-linked ontology metadata, four neighbor discriminants, and a false-positive audit were added without adding or reparenting a node.

V59 evidence: 1,044 prompts (348 per layer), 86 editorial anchors, 81 production anchors, 107 ontology nodes, 12 registry entries, 81 dedicated-scored targets, 21 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Qutbism is isolated-reachable in all layers; full ranks are 3/48/3 and 10 combined, with aggregate top-three rates 25.5144% and 41.9753% and worst ranks 77 and 70. Compact v2 is 11,249 characters. TypeScript, 77/77 tests, build, audit, Compose, Docker health, local QA 10/10, and Docker QA 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger continues to report promote-to-canonical with governance `resultingScoringStatus: catalog-only`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V59 remains an uncommitted delta after the earlier V58 baseline commit `6f2b744`; no push remote is configured.

## V60 continuation — Radical Republicanism

WorkPM completed a source-backed provisional activation of the existing canonical `Republicanism → Historical Republicanism → Radical Republicanism` micro branch. Leipold, Nabulsi, and White's Oxford volume, Pettit's Cambridge non-domination chapter, Urbinati's APSR critique of the republican-democracy relationship, Thompson's radical-republican reading of Marx, and existing republican records provide convergent terminology and boundary material. These sources support original authoring and variation controls only; they do not establish respondent comprehension, local item validity, psychometric quality, or empirical classification.

The boundary requires a plural Radical Republicanism account of popular sovereignty, freedom as non-domination, equal civic standing, anti-corruption, continuous contestation, and transformative public institutions. Historical radical variants, critical/neo-republican theory, labour and socialist readings, popular constitutionalism, civic virtue, material independence, and direct or representative routes remain in scope as variation. Patriotism, generic anti-corruption, majoritarianism, civic participation alone, Marxism alone, one author, one movement, or one institutional design is insufficient. Twelve prompts (4/4/4), one provisional anchor, two neighbor discriminants, source-linked ontology metadata, and a false-positive audit were added without adding or reparenting a node.

V60 evidence: 1,056 prompts (352 per layer), 87 editorial anchors, 82 production anchors, 107 ontology nodes, 12 registry entries, 82 dedicated-scored targets, 20 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Radical Republicanism is isolated-reachable in all layers; full ranks are 10/8/6 and 4 combined, with aggregate top-three rates 25.2033% and 41.4634% and worst ranks 78 and 72. Compact v2 is 11,393 characters. TypeScript, 77/77 tests, build, audit, Compose, Docker health, local QA 10/10, and Docker QA 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Radical Republicanism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V60 remains an uncommitted delta after baseline `6f2b744`; no push remote is configured.

## V61 continuation — Marxist Feminism

WorkPM completed a source-backed provisional activation of the existing canonical `Socialist / Marxist Feminism → Marxist Feminism` micro branch. Arruzza's Guilford article, Boris and Swinth's Cambridge history of household labor and capitalism, Battistoni's APSR account of ideology and reproduction, Ferguson, Bhattacharya, and Farris's SAGE Handbook chapter, and existing Oxford/SEP feminist records provide convergent terminology and boundary material. These sources support original authoring and variation controls only; they do not establish respondent comprehension, local item validity, psychometric quality, or empirical classification.

The boundary requires a plural Marxist-Feminist account of linked class and gendered power, capitalist production, social reproduction, labor and care, material dependence, and transformative emancipation. Historical-materialist, dual-systems, unitary, social-reproduction, autonomist, Wages for Housework, intersectional, Black, queer, trans, decolonial, reformist, revolutionary, public, cooperative, union, household, and autonomous routes remain in scope as variation. Generic Feminism, Marxism alone, Socialist / Marxist Feminism as a whole, Materialist Feminism, welfare or public ownership alone, unpaid-care concern alone, one patriarchy theory, one author, one movement, or one institutional route is insufficient. Twelve prompts (4/4/4), one provisional anchor, two neighbor discriminants, source-linked ontology metadata, and a false-positive audit were added without adding or reparenting a node.

V61 evidence: 1,068 prompts (356 per layer), 88 editorial anchors, 83 production anchors, 107 ontology nodes, 12 registry entries, 83 dedicated-scored targets, 19 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Marxist Feminism is isolated-reachable in all layers; full ranks are 3/15/2 and 1 combined, with aggregate top-three rates 25.3012% and 42.1687% and worst ranks 79 and 73. Compact v2 is 11,537 characters. TypeScript, 77/77 tests, build, audit, Compose, Docker health, local QA 10/10, and Docker QA 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Marxist Feminism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V61 remains an uncommitted delta after local V60 commit `2d24271`; no push remote is configured.

## V62 — Socialist Feminism micro branch

The V62 WorkPM continuation selected the existing canonical `Socialist / Marxist Feminism → Socialist Feminism` micro path after comparing [Hennessy's SAGE Handbook chapter](https://us.sagepub.com/sites/default/files/upm-assets/67768_book_item_67768.pdf), [Cantillon, Mackett, and Stevano's social-reproduction chapter](https://www.cambridge.org/core/books/abs/feminist-political-economy/social-reproduction/9C6703B052EEC8F83F5DB3593E3D9450), and [Dean and Maiguashca's Politics & Gender analysis](https://www.cambridge.org/core/journals/politics-and-gender/article/abs/gender-power-and-left-politics-from-feminization-to-feministization/D6D078794F10D19A7B575CE582028894), alongside existing feminist sources. The sources support a plural boundary joining critique of patriarchy and gendered power to class analysis, socialist transformation, social reproduction, collective provision, and autonomous or institutional organizing variation; they support terminology and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves semi-autonomous sex-gender relations, production and social reproduction, race and sexuality, autonomous feminist movements, and public, cooperative, union, household, reformist, and revolutionary routes. It excludes Marxist Feminism's more constitutive Marxist political economy, Materialist Feminism's broader materialist field, generic Feminism, generic Socialism, welfare or care support alone, one theory of patriarchy, one author, one movement, or one institutional route. Twelve prompts (4/4/4), one provisional anchor, two neighbor discriminants, source-linked ontology metadata, and a false-positive audit were added without adding or reparenting a node.

V62 evidence: 1,080 prompts (360 per layer), 89 editorial anchors, 84 production anchors, 107 ontology nodes, 12 registry entries, 84 dedicated-scored targets, 18 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Socialist Feminism is isolated-reachable in all layers; full ranks are 2/70/65 and 1 combined, with aggregate top-three rates 24.2063% and 41.6667% and worst ranks 80 and 73. Compact v2 is 11,681 characters. TypeScript, 77/77 tests, build, audit, Compose, Docker health, local QA 10/10, and Docker QA 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Socialist Feminism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V62 remains an uncommitted delta after local V60 baseline commit `2d24271`; no push remote is configured.

## V63 — Left-Wing Populism micro branch

The V63 WorkPM continuation selected the existing canonical `Populism → Left-Wing Populism` micro path after comparing [Saalfeld's Cambridge analysis](https://www.cambridge.org/core/journals/government-and-opposition/article/identity-politics-and-leftwing-populism/9F986E26D6C2DAA194BF248C93AC44A9), [Eklundh, Stengel, and Wojczewski's Oxford article](https://academic.oup.com/ia/article/100/5/1899/7750271), and [Venizelos and Stavrakakis's Wiley assessment](https://onlinelibrary.wiley.com/doi/10.1111/1467-8675.12638), alongside existing populism records. The sources support a contested people-versus-elite articulation joined to a left-egalitarian host, not a fixed policy bundle or universal identity boundary; they support original authoring and variation controls only, not respondent comprehension, local item validity, psychometric quality, or empirical classification.

The boundary preserves identity-politics, class and multisectoral people-construction, leadership, movement organization, reform/transformative, domestic/international, and Global North/South variation. Generic anti-elite dissatisfaction, left policy alone, the thin Populist core, Right-Wing Populism, Nationalism, Socialism, Democratic Socialism, one definition of the people, one party, one leader, one policy, or one foreign-policy position is insufficient. Twelve prompts (4/4/4), one provisional anchor, two neighbor discriminants, source-linked ontology metadata, and a false-positive audit were added without adding or reparenting a node.

V63 evidence: 1,092 prompts (364 per layer), 90 editorial anchors, 85 production anchors, 107 ontology nodes, 12 registry entries, 85 dedicated-scored targets, 17 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Left-Wing Populism is isolated-reachable in all layers; full ranks are 9/27/16 and 10 combined, with aggregate top-three rates 23.1373% and 41.1765% and worst ranks 81 and 74. Compact v2 is 11,825 characters. TypeScript, 77/77 tests, build, high-severity audit, Compose config, Docker rebuild/recreate, health, local QA 10/10, and Docker-backed QA 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Left-Wing Populism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V63 remains uncommitted after local V60 baseline commit `2d24271`; no push remote is configured.

## V64 — Neoconservatism micro branch

The V64 WorkPM continuation selected the existing canonical `Conservatism → Neoconservatism` micro path after comparing [Feldman's account](https://academic.oup.com/nyu-press-scholarship-online/book/37056/chapter-abstract/323107676), [Hull's historical and biographical study](https://academic.oup.com/camqtly/article/53/1/34/7637309), and [Williams's national-interest analysis](https://journals.sagepub.com/doi/10.1177/1354066105055482), alongside existing Oxford conservatism and political-ideologies records. The sources support a historically situated and internally varied conservative current joining critique of relativism and pluralist fragmentation, republican-democratic common purpose, moral and civic order, active public authority, and a contested account of national interest and international engagement; they support terminology, provenance, variation controls, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves New York intellectual and other historical formations, liberal-to-conservative trajectories, domestic and foreign-policy emphasis, realism and idealism, multilateral and unilateral routes, national contexts, and critiques of social engineering. It excludes generic Conservatism, Neoliberalism, National Conservatism, Paleoconservatism, anti-communism, military hawkishness, democracy promotion alone, market support alone, current party or administration affiliation, one thinker, one country, one war, or one policy. Twelve prompts (4/4/4), one provisional anchor, source-linked ontology metadata, two neighbor discriminants, and a false-positive audit were added without adding or reparenting a node or changing scorer policy.

V64 evidence: 1,104 prompts (368 per layer), 91 editorial anchors, 86 production anchors, 107 ontology nodes, 12 registry entries, 86 dedicated-scored targets, 16 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Neoconservatism is isolated-reachable in all layers; full ranks are 27/28/5 and 7 combined, with aggregate top-three rates 23.2558% and 40.6977% and worst ranks 82 and 75. Compact v2 is 11,969 characters. TypeScript, 77/77 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, health, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. The curated-bank validation path was optimized to build its target map once per pass after a timeout-prone repeated-construction run. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Neoconservatism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V64 remains uncommitted and no push remote is configured.
## V65 — Paleoconservatism micro branch

The V65 WorkPM continuation selected the existing canonical Conservatism → Paleoconservatism micro path after comparing [Dougall's account of the post-war American New Right](https://academic.oup.com/book/58897/chapter-abstract/492899530), [Bartee's study of Paul Gottfried and paleoconservatism](https://academic.oup.com/book/25370/chapter-abstract/192452505), and [Kolozi's analysis of the paleoconservative critique of global capitalism](https://academic.oup.com/columbia-scholarship-online/book/16897/chapter-abstract/174138181), alongside existing Oxford conservatism and national-conservatism records. The sources support a historically situated and internally varied American conservative current joining post-war New Right formation, national particularity or sovereignty, inherited culture and local authority, restraint toward centralized or globalizing projects, and critique of universalizing or market-globalist arrangements; they support terminology, provenance, variation controls, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves traditionalist, agrarian, paleolibertarian, pluralist, exclusionary, domestic-economic, foreign-policy, historical, generational, and media/institutional variation. It excludes generic Conservatism, National Conservatism, Neoconservatism, Right-Wing Populism, the alt-right, White Nationalism, immigration concern alone, anti-globalization alone, protectionism alone, religious identity, one thinker, one party, one policy, or one issue. Twelve prompts (4/4/4), one provisional anchor, source-linked ontology metadata, two neighbor discriminants, a profile, and a false-positive audit were added without adding or reparenting a node or changing scorer policy.

V65 evidence: 1,116 prompts (372 per layer), 92 editorial anchors, 87 production anchors, 107 ontology nodes, 12 registry entries, 87 dedicated-scored targets, 15 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Paleoconservatism is isolated-reachable in all layers; full ranks are 12/48/1 and 6 combined, with aggregate top-three rates 23.7548% and 40.2299% and worst ranks 83 and 76. Compact v2 is 12,113 characters. TypeScript, 77/77 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, health, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Paleoconservatism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live measurement target is separately dedicated-scored. The comprehensive goal remains open, with Fascism and Neo-Fascism held as high-risk catalog-only targets. V65 remains an uncommitted delta and no push remote is configured.

## V66 — Wasatiyya micro branch

The V66 WorkPM continuation selected the existing canonical `Islamism → Wasatiyya` micro path after comparing [Browers's Cambridge account of the wasatiyya trend](https://www.cambridge.org/core/books/abs/political-ideology-in-the-arab-world/more-inclusive-islamism-the-wasatiyya-trend/41EE0EE3D602AA3ED9E90525DF61DB47), [Kazmi's Oxford analysis of Islamic democracy by numbers](https://academic.oup.com/book/4565/chapter-abstract/146666509), [Sakthivel's Middle East Journal study of moderate Islam in Algeria](https://doi.org/10.3751/78.1.11), and [Teitelbaum and Abdulaev's analysis of centrist Islamic discourse](https://www.tandfonline.com/doi/abs/10.1080/00263206.2025.2595675), alongside existing Islamism, Qutbism, and Khomeinism records. The sources support a contested and internally varied Islamist current using middle-way or centrist Islamic political vocabularies to negotiate modernity, participation, citizenship, coexistence, public moral order, theological boundaries, secular pluralism, and violence; they support terminology, provenance, variation controls, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves theological, reformist, movement, national, transnational, egalitarian, hierarchical, electoral, consultative, gradualist, anti-violent, and state-sponsored uses while excluding generic Islamism, Qutbism, Khomeinism, Revolutionary Islamism, Religious Nationalism, private Muslim faith or piety, “moderation” as a personality trait or scalar score, one scholar, one organization, one state's counter-extremism policy, one fatwa, one leader, or one policy. Twelve prompts (4/4/4), one provisional anchor, source-linked ontology metadata, two neighbor discriminants, a qualitative profile, and a false-positive audit were added without adding or reparenting a node or changing scorer policy.

V66 evidence: 1,128 prompts (376 per layer), 93 editorial anchors, 88 production anchors, 107 ontology nodes, 12 registry entries, 88 dedicated-scored targets, 14 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Wasatiyya is isolated-reachable in all layers; full ranks are 26/30/32 and 28 combined, with aggregate top-three rates 22.3485% and 39.7727% and worst ranks 84 and 77. Compact v2 is 12,257 characters. TypeScript, 77/77 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, health, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. No cognitive review or respondent/empirical validation was run.

The taxonomy ledger retains Wasatiyya as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live measurement target is separately dedicated-scored. The comprehensive goal remains open, with 14 canonical catalog-only targets and Fascism/Neo-Fascism held as high-risk historical targets. V66 remains an uncommitted delta and no push remote is configured.

## V67 — Right-Wing Populism micro branch

The V67 WorkPM continuation selected the existing canonical `Populism → Right-Wing Populism` micro path after comparing [Meijers, Huber, and Zaslove's Cambridge/EJPR anatomy of populist ideology](https://www.cambridge.org/core/journals/european-journal-of-political-research/article/anatomy-of-populist-ideology-how-political-parties-define-the-people-and-the-elite/530AC0E964E62C709929D155CE14CEBB), [Praet's Journal of Political Ideologies analysis](https://www.tandfonline.com/doi/full/10.1080/13569317.2024.2442334), and the existing [Oxford right-wing populism account](https://academic.oup.com/book/62262/chapter-abstract/551612269), alongside existing Cambridge/Oxford populism records. The sources support a contested people-versus-elite articulation whose right-wing host varies across national, cultural, ethnocultural, nativist, conservative, authoritarian, economic, institutional, democratic, and anti-pluralist contexts; they support terminology, provenance, variation controls, adjacent-construct separation, and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves variation across people-construction, economic and cultural grievance, institutions, leadership, party/movement form, democratic and anti-pluralist routes, and transnational scope. Generic anti-elite dissatisfaction, national pride, immigration concern, nativism, authoritarian preference, Nationalism, Conservatism, National Conservatism, Ethnocultural Nationalism, Left-Wing Populism, one party, one leader, one country, one policy, or one issue is insufficient. Twelve prompts (4/4/4), one provisional anchor, five source references, two neighbor discriminants, a qualitative profile, source-linked ontology metadata, and a false-positive audit were added without adding or reparenting a node or changing scorer policy.

V67 evidence: 1,140 prompts (380 per layer), 94 editorial anchors, 89 production anchors, 107 ontology nodes, 12 registry entries, 89 dedicated-scored targets, 13 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Right-Wing Populism is isolated-reachable in all layers; full ranks are 8/21/3 and 4 combined, with aggregate top-three rates 22.0974% and 38.2022% and worst ranks 85 and 78. Compact v2 is 12,401 characters. TypeScript, 78/78 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, health, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. The full-competition descriptive and normative non-reachability fields remain deterministic geometry diagnostics only.

The taxonomy ledger retains Right-Wing Populism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with thirteen canonical targets still catalog-only and Fascism/Neo-Fascism held as high-risk historical targets. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V67 delta remains uncommitted and no push remote is configured.
## V68 — Hindutva micro branch

The V68 WorkPM continuation selected the existing canonical `Religious Nationalism → Hindutva (Hindu Nationalism)` micro path after comparing [Mehta's peer-reviewed treatment of Hindu nationalism](https://journals.sagepub.com/doi/10.1177/23210230221082828), [Sarkar's Oxford history](https://academic.oup.com/book/41849), and [Brass's Cambridge chapter on Hindu nationalism and the Indian state](https://www.cambridge.org/core/books/abs/politics-of-india-since-independence/communal-and-caste-conflict-secularism-hindu-nationalism-and-the-indian-state/CB4FC4BBBB1212F766248681500FF019), alongside existing Hindutva, nationalism, and religious-nationalism records. These sources support a historically specific and internally contested political formulation linking Hindu civilizational or cultural nationhood to public authority, political membership, and institutional transformation; they support terminology, provenance, variation controls, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The boundary preserves religiously thick and culturally secularized formations, caste and internal diversity, pluralist and majoritarian membership claims, Hindu Rashtra/Hindu Rajya and national-culture distinctions, and movement, party, state, educational, legal, symbolic, historical, contemporary, and diaspora routes. It excludes Hindu faith or piety, Hindu cultural identity, Indian patriotism, generic Nationalism or Religious Nationalism, one party, one leader, one government, one policy, anti-minority sentiment alone, and operational hostility or violence. Twelve prompts (4/4/4), one provisional anchor, six source references, two neighbor discriminants, source-linked ontology metadata, a qualitative profile, and a false-positive audit were added without adding or reparenting a node or changing scorer policy.

V68 evidence: 1,152 prompts (384 per layer), 95 editorial anchors, 90 production anchors, 107 ontology nodes, 12 registry entries, 90 dedicated-scored targets, 12 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Hindutva is isolated-reachable in all layers; full ranks are 10/81/3 and 6 combined, with aggregate top-three rates 21.8519% and 38.8889% and worst ranks 85 and 78. Compact v2 is 12,545 characters. TypeScript, 79/79 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, health, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. The full-competition descriptive and normative non-reachability fields remain deterministic geometry diagnostics only.

The taxonomy ledger retains Hindutva (Hindu Nationalism) as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with twelve canonical targets still catalog-only and Fascism/Neo-Fascism held as high-risk historical targets. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V68 delta remains uncommitted and no push remote is configured.


## V69 — Religious Zionism micro branch

The V69 WorkPM continuation selected the existing canonical `Religious Nationalism → Religious Zionism` micro path after comparing [Schwartz's *Religious Zionism: History and Ideology*](https://www.jstor.org/stable/jj.36309378), [Yadgar and Hadad's *Journal of Political Ideologies* analysis](https://www.tandfonline.com/doi/full/10.1080/13569317.2021.1957297), [Novak's *Zionism and Judaism: A New Theory*](https://www.cambridge.org/core/books/zionism-and-judaism/0B8316564B7014F82462B614D5E20928), and [Rubin's study of religious actors in democratic politics](https://www.tandfonline.com/doi/full/10.1080/09637494.2014.887358), alongside existing Zionism and Religious Nationalism records. These sources support a historically situated and internally plural Jewish religious-national current connecting religious interpretation, collective self-determination, and public/state institutions, with variation over theology, statehood, territory, democracy, constitutionalism, organization, and diaspora. They support terminology, provenance, variation controls, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The V69 block contains twelve original target-tagged prompts at 4/4/4 and one provisional anchor. The boundary excludes Jewish identity, private faith, broad Zionism, Israeli citizenship or patriotism, one party or leader, current government or territorial/war policy, anti-Arab or anti-Palestinian sentiment alone, one theological claim, and one territorial preference. No ontology node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, and the effect-free candidate quarantine remain unchanged. Taxonomy retains the node as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`.

V69 evidence: 1,164 prompts (388 per layer), 96 editorial anchors, 91 production anchors, 107 ontology nodes, 12 registry entries, 91 dedicated-scored targets, 11 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Religious Zionism is isolated-reachable in all layers; full ranks are 74/84/17 and 24 combined, with aggregate top-three rates 22.3443% and 39.5604% and worst ranks 86 and 79. Compact v2 is 12,689 characters. TypeScript, 80/80 tests, build, high-severity audit, Compose config, no-cache Docker rebuild/recreate, healthy `/healthz`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic geometry diagnostics only.

The comprehensive goal remains open, with eleven canonical targets still catalog-only and Fascism/Neo-Fascism held as high-risk historical targets. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V69 delta remains uncommitted and no push remote is configured.

## V70 — Neo-Fascism meso-branch continuation

The V70 WorkPM continuation selected the existing canonical Fascism → Neo-Fascism meso path after comparing Bull, Wolff, Albanese, and Forlenza with existing Fascism, National Socialism, and Neo-Nazism records. These sources support a historically situated post-1945 field of fascist continuities, adaptations, and revivals, with variation across countries, generations, democracy/corporatism, state power, sovereignty, organization, and transnational form. They support terminology, provenance, boundary design, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The V70 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, seven direct source references, two neighbor discriminants, a false-positive audit, and an 18-dimension profile. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, and effect-free candidate quarantine remain unchanged. The branch is live dedicated-scored while taxonomy remains retain-canonical/scored-provisional; generic nationalism, authoritarianism, anti-communism, immigration concern, racial prejudice, violence, nostalgia, one symbol, one actor, one party, one country, one policy, or operational tactics are not sufficient evidence.

V70 evidence: 1,176 prompts (392 per layer), 97 editorial anchors, 92 production anchors, 107 ontology nodes, 12 registry entries, 92 dedicated-scored targets, 10 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Neo-Fascism is isolated-reachable in all layers; full ranks are 3/1/1 and 1 combined, with aggregate top-three rates 21.7391% and 38.0435% and worst ranks 87 and 80. Compact v2 is 12,833 characters. TypeScript, 81/81 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic geometry diagnostics only.

The comprehensive goal remains open, with ten canonical targets still catalog-only: Brazilian Integralism, Falangism, Fascism, Integral Nationalism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed.

## V71 — Falangism micro branch

The V71 WorkPM continuation selected the existing canonical `Fascism → Falangism` micro path after comparing [Vincent's Oxford Handbook chapter on Spain](https://academic.oup.com/edited-volume/34510/chapter-abstract/292831365) and [Colás's Wiley reference entry on Falangism](https://onlinelibrary.wiley.com/doi/abs/10.1002/9781118474396.wbept0351) with existing Fascism, National-Syndicalism, and political-ideologies records. The sources support a historically situated Spanish fascist and national-syndicalist current associated with the Falange Española and FE de las JONS and with interwar-to-Franco transformations; they support terminology, provenance, historical and institutional boundaries, false-positive controls, and original item authoring only, not local measurement validity or respondent classification.

The V71 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, four direct source references, two neighbor discriminants, a false-positive audit, and a 16-dimension qualitative profile. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, and effect-free candidate quarantine remain unchanged. The branch requires convergent historical and institutional evidence and excludes Spanish identity, patriotism, Catholic faith, anti-party sentiment, corporatism or state capacity alone, one leader, symbol, party, policy, current actor, or operational tactics.

V71 evidence: 1,188 prompts (396 per layer), 98 editorial anchors, 93 production anchors, 107 ontology nodes, 12 registry entries, 93 dedicated-scored targets, 9 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Falangism is isolated-reachable in all layers; full ranks are 2/1/1 and 1 combined, with aggregate top-three rates 22.9391% and 39.7849% and worst ranks 88 and 81. Compact v2 is 12,977 characters. TypeScript, 82/82 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy `/healthz`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic overlap diagnostics only.

The taxonomy ledger retains Falangism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with nine canonical targets still catalog-only: Brazilian Integralism, Fascism, Integral Nationalism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed.
## V72 — Brazilian Integralism micro branch

The V72 WorkPM continuation retained the existing canonical `Fascism → Brazilian Integralism` micro path and repaired its direct provenance using [Bianchi, Defina, and Cardoso (2026)](https://doi.org/10.1590/S2178-149420260704), [Gonçalves (2023)](https://doi.org/10.1080/14701847.2023.2226977), [Calil (2012; updated 2021)](https://periodicos.ufjf.br/index.php/locus/article/view/20366), and [Pérez Climent (2024)](https://doi.org/10.18223/hiscult.v13i1.4361), alongside existing Fascism, nationalism, and political-ideologies records. The sources support a historically situated Brazilian integralist current, transnational circulation and local translation, the Ação Integralista Brasileira and Plínio Salgado, religious-cultural and corporative mediation, and postwar reinterpretation; they support terminology, provenance, boundary design, and original authoring only, not local measurement validity or respondent classification.

The V72 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, seven direct source references, two neighbor discriminants, a false-positive audit, and a 16-dimension qualitative profile. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged. The branch excludes Brazilian identity, patriotism, Catholic faith, generic nationalism, anti-communism, corporative policy or state capacity alone, Falangism, Integral Nationalism, one leader, one symbol, one party, one policy, current Brazilian actors, or operational tactics.

V72 evidence: 1,200 prompts (400 per layer), 99 editorial anchors, 94 production anchors, 107 ontology nodes, 12 registry entries, 94 dedicated-scored targets, 8 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Brazilian Integralism is isolated-reachable in all layers; full ranks are 3/2/1 and 1 combined, with aggregate top-three rates 24.1135% and 39.3617% and worst ranks 89 and 81. Compact v2 is 13,121 characters. TypeScript, 83/83 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy `/healthz`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic overlap diagnostics only.

The taxonomy ledger retains Brazilian Integralism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with eight canonical targets still catalog-only: Fascism, Integral Nationalism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed.

## V73 — Integral Nationalism cross-case historical category

The V73 WorkPM continuation activated the existing canonical `Nationalism → Integral Nationalism` micro path after comparing [Gershoni and Jankowski's Cambridge study of integral Egyptian nationalism](https://www.cambridge.org/core/books/abs/redefining-the-egyptian-nation-19301945/integral-egyptian-nationalism/35F359928AEB5E4E3ECF775E918F4500), [Zaitsev's Ukrainian analysis](https://online.ucpress.edu/cpcs/article-abstract/48/2-3/183/532/Fascism-or-ustashism-Ukrainian-integral?redirectedFrom=fulltext), [Zajtsev's theoretical model](https://www.uvr.in.ua/index.php/uvr/article/view/308), [Matsaberidze's Georgian study](https://psage.tsu.ge/index.php/Politics/article/view/179), and [Spektorowski's comparative account](https://journals.sagepub.com/doi/10.1177/002200949402900106), alongside existing Nationalism, Fascism, and political-ideologies records. The sources support a contested cross-case category associated with Maurrasian national absolutism, integrated authority, and anti-fragmentation, while preserving variation across national and historical applications and the disputed boundary with Fascism.

The V73 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, eight direct source references, two neighbor discriminants, a false-positive audit, and a 16-dimension qualitative profile. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged. The branch excludes national pride, patriotism, cultural identity, sovereignty preference, generic nationalism, one country, one leader, one policy, and operational content.

V73 evidence: 1,212 prompts (404 per layer), 100 editorial anchors, 95 production anchors, 107 ontology nodes, 12 registry entries, 95 dedicated-scored targets, 7 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Integral Nationalism is isolated-reachable in all layers; full ranks are 9/2/1 and 1 combined, with aggregate top-three rates 25.2632% and 40% and worst ranks 90 and 82. Compact v2 is 13,265 characters. TypeScript, 84/84 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic geometry diagnostics only.

The taxonomy ledger retains Integral Nationalism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with seven canonical targets still catalog-only: Fascism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V73 delta remains uncommitted; remote delivery is a separate condition.

## V74 — Legionary Fascism micro branch

The V74 WorkPM continuation activated the existing canonical `Fascism → Legionary Fascism` micro path after comparing [Ioanid's study of the Romanian Iron Guard's sacralised politics](https://doi.org/10.1080/1469076042000312203), [Iordachi's monograph on the Legionary fascist faith](https://doi.org/10.4324/9780429428043), [Cercel's study of fascist claims to sovereign power](https://doi.org/10.1017/S0960777323000279), and [Clark's history of Holy Legionary Youth](https://www.jstor.org/stable/10.7591/j.ctt20d89z0), alongside existing Legionary Fascism, Fascism, nationalism, and political-ideologies records. The sources support a historically bounded Romanian fascist current with political-faith, religious-national, organizational, movement/state, law, sovereignty, social, and period boundaries while preserving variation and excluding generic Romanian identity, Orthodox faith or private piety, generic nationalism, current actors, and operational content.

The V74 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, eight direct source references, two neighbor discriminants, a false-positive audit, and a 16-dimension qualitative profile. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged.

V74 evidence: 1,224 prompts (408 per layer), 101 editorial anchors, 96 production anchors, 107 ontology nodes, 12 registry entries, 96 dedicated-scored targets, 6 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Legionary Fascism is isolated-reachable in every layer; full ranks are 1/1/2 and 1 combined, with aggregate top-three rates 25.6944% and 41.6667% and worst ranks 91 and 83. Compact v2 is 13,409 characters. TypeScript, 85/85 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic geometry diagnostics only.

The taxonomy ledger retains Legionary Fascism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with six canonical targets still catalog-only: Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V74 delta remains uncommitted; the repository has no configured remote for push.

## V75 — Fascism macro family

The V75 WorkPM continuation activated the existing canonical Fascism macro path after comparing [Griffin's *The Nature of Fascism*](https://www.routledge.com/The-Nature-of-Fascism/Griffin/p/book/9781138174085), [Paxton's *The Anatomy of Fascism*](https://www.penguinrandomhouse.com/books/128540/the-anatomy-of-fascism-by-robert-o-paxton/9781400033911/), [Payne's comparative history](https://uwpress.wisc.edu/Books/A/A-History-of-Fascism-1914-1945), and [Mann's *Fascists*](https://www.cambridge.org/core/books/fascists/07E35B94A84B2A49A412173C6FD41F6B), alongside the existing [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510), National Socialism, Neo-Fascism, Legionary Fascism, nationalism, and political-ideologies records. The sources support a contested family-level historical boundary joining national rebirth, organic or anti-pluralist community, activist mass politics, movement-centered leadership, and transformed public order while preserving cross-national and institutional variation; they support terminology, provenance, boundary design, and original authoring only, not local measurement validity or respondent classification.

The V75 block contains twelve original target-tagged prompts at 4/4/4, four fresh academic source records, one provisional Fascism anchor, seven direct source references, four neighbor discriminants, a false-positive audit, a 17-dimension qualitative profile, and coverage metadata. No node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged. The branch excludes National Socialism as a specific German racial-völkisch formation, Neo-Fascism as a post-1945 field, Legionary Fascism as a specific Romanian case, Third Positionism, Religious Nationalism, National Conservatism, generic authoritarianism, conservatism, populism, nationalism, anti-communism, one leader, one symbol, one party, one event, one current actor, one policy, and operational content.

V75 evidence: 1,236 prompts (412 per layer), 102 editorial anchors, 97 production anchors, 107 ontology nodes, 12 registry entries, 97 dedicated-scored targets, 5 canonical catalog-only targets, 1,428 candidates across 119 research targets, and zero coverage/reachability errors. Fascism is isolated-reachable in all layers; full ranks are 3/1/1 and 1 combined, with aggregate top-three rates 26.1168% and 46.3918% and worst ranks 92 and 84. Compact v2 is 13,553 characters. TypeScript, 86/86 tests, build, high-severity audit, Compose config, fresh no-cache Docker rebuild/recreate, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Full-competition values remain deterministic overlap diagnostics only.

The taxonomy ledger retains Fascism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live measurement target is separately `dedicated-scored`. The comprehensive goal remains open, with five canonical targets still catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V75 delta remains uncommitted; the repository has no configured remote for push.

## V76 — White Nationalism high-risk racial-national boundary

The V76 WorkPM continuation activated the existing canonical `Nationalism → White Nationalism` micro path after comparing [Geary, Schofield, and Sutton's global history](https://doi.org/10.7765/9781526147080.00007), [Búzás's analysis of racial nationalism](https://doi.org/10.1017/S0020818320000521), [Fording and Schram's study of the modern movement](https://academic.oup.com/book/36900/chapter/322145498), [Nieli's White Identity analysis](https://doi.org/10.1093/oso/9780190877583.003.0009), and [Rosenberg's study of evolving white-supremacist discourse](https://www.cambridge.org/core/journals/nationalities-papers/article/taking-the-race-out-of-master-race-the-evolving-role-of-the-jew-in-white-supremacist-discourse/3B6356B38246457414CDA6B10C14CC93), alongside existing Nationalism, ethnocultural-nationalism, Fascism, and political-ideologies records. The sources support a high-risk, historically adaptive racial-national formation in which a white collective is politically constitutive and membership, continuity, power, and institutional preference are organized around that racialized category; they support terminology, provenance, variation, boundary design, and original authoring only, not local measurement validity or respondent classification.

The V76 boundary requires convergent racialized political membership, white collective continuity or threat diagnosis, racialized power, and translation into public institutions or sovereignty claims. It preserves national, transnational, settler-colonial, postcolonial, religious, secular, conservative, liberal, populist, fascist-adjacent, and discursive variation. It excludes ancestry or identity alone, demographic or migration concern, ordinary patriotism, ethnocultural nationalism without a white racial membership rule, White Christian Nationalism as a separate synthesis, Neo-Nazism's specific postwar revival, Fascism as a wider family, one actor, symbol, slogan, party, policy, current affiliation, or operational content. No ontology node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged.

The V76 block contains twelve original target-tagged prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and an 18-dimension qualitative profile. The measured contract is 1,248 prompts (416 per layer), 103 editorial anchors, 98 production anchors, 107 ontology nodes, 12 registry entries, 98 dedicated-scored targets, 4 canonical catalog-only targets, 1,428 candidates across 119 targets, and a 13,697-character compact v2 fragment. White Nationalism is isolated-reachable in every layer; full ranks are 29/5/3 and 2 combined, aggregate top-three rates are 26.1905% and 46.9388%, and worst ranks are 92 and 85. These are deterministic geometry diagnostics only. Coverage and reachability report zero errors/failures.

TypeScript, 87/87 unit tests, build, high-severity audit, Compose configuration, fresh no-cache Docker rebuild/recreate, healthy `/healthz`, and local/Docker Playwright 10/10 gates passed. The taxonomy ledger retains White Nationalism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Four canonical targets remain catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, and Third Positionism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V76 delta remains uncommitted and the repository has no configured remote for push.


## V77 — Neo-Nazism postwar continuity and adaptation

The V77 WorkPM continuation activates the existing canonical Fascism → National Socialism → Neo-Nazism micro path after comparing [Jackson's Colin Jordan and Britain's Neo-Nazi Movement](https://www.bloomsbury.com/uk/colin-jordan-and-britains-neonazi-movement-9781472509062/), [Goodrick-Clarke's Black Sun](https://nyupress.org/9780814731246/black-sun/), [Kahn's study of American influence on German Neo-Nazism](https://doi.org/10.1080/25785648.2021.1901496), and [Simi's overview of Neo-Nazi movements in Europe and the United States](https://onlinelibrary.wiley.com/doi/abs/10.1002/9780470674871.wbespm353.pub2), alongside existing Oxford and Palgrave references on Neo-Nazism, National Socialism, Fascism, and Neo-Fascism. The sources support a high-risk, historically situated postwar successor/revival field in which National Socialist political resources are inherited, revived, or adapted across national, organizational, cultural, and transnational forms; they support terminology, provenance, historical variation, boundary design, and original authoring only, not local measurement validity or respondent classification.

The V77 boundary requires convergent postwar historical specificity, an explicit relationship to National Socialist political resources, racialized or ethnonational membership/power, anti-pluralist restoration, and institutional or public-order translation. It preserves direct continuity, imitation, adaptation, party/network/cultural/esoteric/religious forms, British/American/German/European/transnational settings, and period variation. It excludes historical National Socialism as a specific German movement/regime, Neo-Fascism as a wider post-1945 field, White Nationalism as a broader racial-national formation, Fascism as a wider family, Third Positionism, generic nationalism or radical-right rhetoric, authoritarianism, racism or antisemitic prejudice alone, one symbol, slogan, affiliation, online statement, current actor, private identity, or operational content. No tactics, targets, recruitment, or violence content was added.

The V77 implementation contains four fresh academic source records, twelve original target-tagged prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. No ontology node was added or reparented; scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged. The measured contract is 1,260 prompts (420 per layer), 104 editorial anchors, 99 production anchors, 107 ontology nodes, 12 registry entries, 99 dedicated-scored targets, 3 canonical catalog-only targets, 1,428 effect-free candidates across 119 targets, and a 13,841-character compact v2 fragment. Neo-Nazism is isolated-reachable in every layer and combined; full ranks are 6/1/4 and 1 combined, aggregate top-three rates are 26.9360% and 47.4747%, and worst ranks are 93 and 86. These are deterministic structural-overlap diagnostics only.

TypeScript, 88/88 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker rebuild/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger retains Neo-Nazism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Three canonical targets remain catalog-only: Revolutionary Islamism, Salafi-Jihadism, and Third Positionism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open.

## V78 — Revolutionary Islamism cross-case public-order boundary

The V78 WorkPM continuation activates the existing canonical Islamism → Revolutionary Islamism micro path after comparing [Chalcraft's Cambridge chapter](https://www.cambridge.org/core/books/abs/popular-politics-in-the-making-of-the-modern-middle-east/islamism-revolution-uprisings-and-liberalism-19772011/8E259553C1232AFE372FDDFF151E92D9), [Sadeghi-Boroujerdi's Cambridge chapter](https://www.cambridge.org/core/books/abs/revolution-and-its-discontents/constructing-beheshte-jahan-islam-the-clergy-and-the-state/49E343BBBB5084A114F6A2FA24022C5C), [Maidul Islam's Cambridge chapter](https://www.cambridge.org/core/books/abs/limits-of-islamism/islamism-and-ideology-philosophical-issues-and-analytical-categories/E2663B0987FDB1C3C1577B37014453AE), and [Nasr's Oxford book](https://academic.oup.com/book/6278), alongside existing Islamist sources. The sources support a historically situated cross-case branch requiring public Islamic moral authority, foundational transformation, collective agency, and institutional or state-mediated translation; they support provenance and authoring boundaries, not local measurement validity or respondent classification.

The V78 boundary preserves Sunni/Shi'a, national/transnational, movement/state, constitutional, democratic, authoritarian, reformist, and revolutionary variation. It excludes private faith, Muslim identity, religious conservatism, generic Islamism, anti-imperialism or anti-elite anger alone, Qutbism, Khomeinism, Wasatiyya, Salafi-Jihadism, one actor, leader, party, regime, policy, current event, and operational content. No ontology node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged.

The V78 block contains four fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. The measured contract is 1,272 prompts (424 per layer), 105 editorial anchors, 100 production anchors, 107 ontology nodes, 12 registry entries, 100 dedicated-scored targets, 2 canonical catalog-only targets, 1,428 candidates across 119 targets, and a 13,985-character compact v2 fragment. Revolutionary Islamism is isolated-reachable in every layer and combined; full ranks are 32/1/2 and 1 combined, aggregate top-three rates are 27.3333% and 49.0000%, and worst ranks are 94 and 87. These are deterministic structural-overlap diagnostics only.

TypeScript, 89/89 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker rebuild/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger retains Revolutionary Islamism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Two canonical targets remain catalog-only: Salafi-Jihadism and Third Positionism. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open.

## V79 — Third Positionism postwar far-right boundary

The V79 WorkPM continuation activates the existing canonical Fascism → Neo-Fascism → Third Positionism micro path after comparing [Wolff's study of CasaPound and the Italian Terza Posizione lineage](https://www.aup-online.com/content/journals/10.1163/22116257-00801004), [Holland's Oxford chapter on British postwar Third Positionism](https://academic.oup.com/book/47490/chapter-abstract/422416323), [Taiana's account of Argentina's separate Peronist and Cold War non-alignment use of “Third Position”](https://www.cambridge.org/core/books/abs/latin-american-foreign-policies-in-the-new-world-order/argentina-and-the-third-position/1208E2B4A3C8DB66623F8EFF97957455), and [Kressel's analysis of Argentine authoritarian and corporatist ideological dialogue](https://www.cambridge.org/core/journals/americas/article/argentine-franco-the-regime-of-juan-carlos-ongania-and-its-ideological-dialogue-with-francoist-spain-19661970/B2CB016E3EA4523A771B46688DF3FAD4). The sources support historical provenance, national and period variation, and terminology disambiguation; they do not support a universal current-actor label or local measurement-validity claim.

The V79 boundary requires a historically situated postwar far-right or neo-fascist current presenting a syncretic national-social synthesis beyond liberal capitalism and centralized communism, with a convergent anti-liberal, corporative/occupational, sovereign, institutional, or public-order route. It preserves Italian, British/Strasserite, other national/transnational, intellectual, movement, party, economic, constitutional, democratic, and authoritarian variation. It excludes broad Fascism, wider Neo-Fascism, specific German National Socialism, National-Syndicalism, National Conservatism, generic nationalism, anti-capitalism, anti-communism, corporatism or mixed economy alone, Peronist or non-aligned “Third Position,” generic third-way language, current actors, recruitment, tactics, violence, and operational content. No ontology node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged.

The V79 block contains four fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. The measured contract is 1,284 prompts (428 per layer), 106 editorial anchors, 101 production anchors, 107 ontology nodes, 12 registry entries, 101 dedicated-scored targets, 1 canonical catalog-only target, 1,428 candidates across 119 targets, and a 14,129-character compact v2 fragment. Third Positionism is isolated-reachable in every layer and combined; full ranks are 13/2/1 and 2 combined, aggregate top-three rates are 27.7228% and 49.5050%, and worst ranks are 95 and 88. These are deterministic structural-overlap diagnostics only.

TypeScript, 90/90 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger retains Third Positionism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Salafi-Jihadism is the sole remaining canonical catalog-only target. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open.

## V80 — Salafi-Jihadism high-risk doctrinal boundary

The V80 WorkPM continuation activates the existing canonical Islamism → Salafi-Jihadism micro path after comparing [Meijer's *Global Salafism*](https://academic.oup.com/book/1728), [Wehrey and Boukhars's Oxford treatment of Salafism](https://academic.oup.com/book/35035/chapter-abstract/298879908), [Wagemakers's *A Quietist Jihadi*](https://www.cambridge.org/core/books/quietist-jihadi/9C679BEC1787A474A49E78E96476E8CE), and [Lav's Cambridge chapter on Salafi Jihadi Theonomy](https://www.cambridge.org/core/books/abs/salafi-political-theology/salafi-jihadi-theonomy/71E03EF21127347C081067A899133BB4). The sources support Salafism as diverse and contested and Salafi-Jihadism as a historically situated Sunni doctrinal/political current joining Salafi scriptural authority and purification with divine-sovereignty or theonomic legitimacy and a jihadist-revolutionary project; they support provenance, variation, terminology, and original authoring only, not local measurement validity or respondent classification.

The V80 boundary preserves quietist, political, and jihadi Salafi distinctions alongside national, transnational, regional, intellectual, movement, organizational, and period variation. It requires a convergent Salafi early-generations/scriptural authority claim, divine sovereignty or theonomy, an anti-pluralist political-order boundary, a wider Muslim-community horizon, and a jihadist-revolutionary transformation claim. It excludes Muslim identity, private faith, generic Salafism, religious conservatism, generic sharia support, anti-Western or anti-imperial sentiment, authoritarianism, anti-state anger, broad Islamism, Revolutionary Islamism, Qutbism, Khomeinism, Wasatiyya, current actors, membership, recruitment, tactics, targets, and operational content. No ontology node was added or reparented, and scorer policy, facets, thresholds, combined-layer semantics, contextual exclusion, share semantics, and effect-free candidate quarantine remain unchanged.

The V80 block contains four fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. The measured contract is 1,296 prompts (432 per layer), 107 editorial anchors, 102 production anchors, 107 ontology nodes, 12 registry entries, 102 dedicated-scored targets, no canonical catalog-only targets, 1,428 candidates across 119 targets, and a 14,273-character compact v2 fragment. Salafi-Jihadism is isolated-reachable in every layer and combined; full ranks are 13/1/2 and 1 combined, aggregate top-three rates are 28.7582% and 50.9804%, and worst ranks are 96 and 89. These are deterministic structural-overlap diagnostics only.

TypeScript, 90/90 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger retains Salafi-Jihadism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 12 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V80 delta remains uncommitted and no push remote is configured.

## V81 — Revisionist / Bernsteinian Social Democracy historical microtype

The V81 WorkPM continuation promotes a new canonical Socialism → Social Democracy → Revisionist / Bernsteinian Social Democracy microtype after comparing [Ostrowski's study of Bernstein and the 1918–19 German Revolution](https://academic.oup.com/histres/article-abstract/95/268/213/6564402), [Fletcher's analysis of Bernstein's socialist foreign policy](https://www.cambridge.org/core/journals/review-of-international-studies/article/abs/in-the-interest-of-peace-and-progress-eduard-bernsteins-socialist-foreign-policy/0DB1AF421AC6CAD9E35230CD25B994F4), [Greally's account of political constitutionalism](https://academic.oup.com/ojls/article/44/4/949/7749547), and [Steger's history of the revisionist debate](https://www.cambridge.org/core/books/abs/quest-for-evolutionary-socialism/revisionist-debate-extended/B908E07EE40D0C47BF6001466BF561DA). The evidence supports a historically situated and internally varied revision of orthodox Marxist strategy associated with democratic means and ends, gradual or constitutional reform, equality and solidarity aims, and institutional or social-provision routes; it does not support treating “revisionism” as a universal current identity or all reformist socialism as Bernsteinian.

The V81 boundary preserves variation over reform and revolution, class analysis, ownership, cooperative and regulated coordination, party and trade-union practice, national and international institutions, historical period, and later reinterpretation. It excludes generic Social Democracy, Democratic Socialism, Marxism, Market Socialism, Guild Socialism, market liberalism, New Labour, welfare support alone, public ownership alone, current party membership, present-day identity, one leader, one country, one programme, and generic democracy or reform preference. No ontology family was collapsed, no existing node was reparented, and no cognitive or respondent review was run.

The V81 block contains one canonical micro node, four fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. The measured contract is 1,308 prompts (436 per layer), 108 editorial anchors, 103 production anchors, 108 ontology nodes, 11 registry entries, 103 dedicated-scored targets, five contextual-only targets, 1,428 candidates across 119 targets, and a 14,417-character compact v2 fragment. Revisionist / Bernsteinian Social Democracy is isolated-reachable in every layer and combined; full ranks are 21/82/3 and 3 combined, aggregate rates are 28.4790% and 51.4563%, and worst ranks are 97 and 90. These are deterministic structural-overlap diagnostics only.

TypeScript, 91/91 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger records promote-to-canonical with resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 11 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open.

## V82 — National-Syndicalism historical microtype

The V82 WorkPM continuation promotes National-Syndicalism from the registry into a canonical Fascism → National-Syndicalism microtype after comparing [Abse's account of syndicalism and Italian Fascism](https://www.cambridge.org/core/journals/historical-journal/article/syndicalism-and-the-origins-of-italian-fascism/FD9A8135436051937B75FF3E7D2F8F63), [Ganapini's study of Italian history](https://www.cambridge.org/core/journals/modern-italy/article/abs/dark-side-of-italian-history-19431945/80C07BCA6D0CEFC4C3F40C1463FE8A2C), [the Portuguese study of Lusitanian Integralism and National Syndicalism](https://pucminas.emnuvens.com.br/cadernoshistoria/article/view/P.2237-8871.2015v16n24p30), [Shin's analysis of Cercle Proudhon](https://journal.kci.go.kr/krfh/archive/articleView?artiId=ART003109300), and [the Persée National-Syndicalism record](https://www.persee.fr/doc/mcm_1146-1225_1992_num_10_1_1057?pageId=T1_47), alongside existing Fascism, Mann, OUP, Falangism, Anarcho-Syndicalism, and political-ideologies records. The evidence supports a historically bounded and internally varied nationalist-syndicalist current joining occupational organization, nationally framed solidarity, corporative mediation, and transformed public authority; it does not support treating National-Syndicalism as synonymous with Fascism, Falangism, Anarcho-Syndicalism, or generic nationalism.

The V82 boundary preserves variation over French, Italian, Portuguese, Spanish, and related cases; national and transnational frames; period; movement and regime translation; democratic and anti-pluralist routes; and economic coordination. It excludes generic labor solidarity, nationalism, corporatism, mixed economy, current actors, membership, recruitment, tactics, and operational content. Civic Republicanism remains registry-only because [the Stanford Encyclopedia of Philosophy's republicanism entry](https://plato.stanford.edu/entries/republicanism/) distinguishes historical and contemporary uses that overlap existing Historical Republicanism and Contemporary Neo-Republicanism branches. No ontology family was collapsed, no existing canonical family was reparented, and no cognitive or respondent review was run.

The V82 block contains one canonical micro node, five fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a twelve-dimension qualitative profile. The measured contract is 1,320 prompts (440 per layer), 109 editorial anchors, 104 production anchors, 109 ontology nodes, 10 registry entries, 104 dedicated-scored targets, five contextual-only targets, 1,428 candidates across 119 targets, and a 14,561-character compact v2 fragment. National-Syndicalism is isolated-reachable in every layer and combined; full ranks are 9/2/1 and 1 combined, aggregate rates are 28.2051% and 52.8846%, and worst ranks are 98 and 91. These are deterministic structural-overlap diagnostics only.

TypeScript, 92/92 unit tests, build, production audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger records promote-to-canonical with resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 10 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V82 delta remains uncommitted and no push remote is configured.


## V83 — British Fascism historical microtype

The V83 WorkPM continuation promotes British Fascism from the registry into a provisional canonical Fascism → British Fascism microtype after comparing [Jackson](<https://www.cambridge.org/core/books/abs/pride-in-prejudice/roots/D954116B01EF5C6AA55E3C0934460E24>), [Liburd](<https://academic.oup.com/tcbh/article-abstract/32/1/46/5824948>), [Douglas](<https://www.cambridge.org/core/journals/albion/article/abs/swastika-and-the-shamrock-british-fascism-and-the-irish-question-19181940/2BE41B4EB6A909FED9B0363244D3CBFB>), [Loughlin](<https://www.cambridge.org/core/journals/irish-historical-studies/article/abs/northern-ireland-and-british-fascism-in-the-inter-war-years/E05E8B7FF8483B04D453910B793B8667>), and existing [Linehan](<https://www.cambridge.org/core/books/abs/british-fascism-191839/arrival-of-fascism-the-british-fascisti-and-the-imperial-fascist-league/F42C440A230C33901F70000186CE96C6>). The comparison supports a historically situated field of competing British fascist movements and organizations with indigenous political-cultural roots, imperial and regional variation, and continental influence; it does not support a uniform doctrine or a current-actor label.

The boundary requires convergent historical British movement context, national regeneration, anti-pluralist or movement-centered public authority, disciplined social integration, and institutional or imperial translation. It preserves organizational, regional, imperial, racial, constitutional, social, and period variation. It distinguishes wider Fascism, National Socialism, Neo-Fascism, National-Syndicalism, Falangism, White Nationalism, Integral Nationalism, National Conservatism, British identity, patriotism, conservatism, and imperial nostalgia. It excludes current actors, respondent identity, membership, recruitment, tactics, violence, and operational inference. No ontology family was collapsed, no existing canonical family was reparented, and no cognitive or respondent review was run.

The V83 block contains one canonical micro node, four fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a twelve-dimension qualitative profile. The measured contract is 1,332 prompts (444 per layer), 110 editorial anchors, 105 production anchors, 110 ontology nodes, 9 registry entries, 105 dedicated-scored targets, five contextual-only targets, 1,428 candidates across 119 targets, and a 14,705-character compact v2 fragment. British Fascism is isolated-reachable in every layer and combined; full ranks are 13/2/3 by layer and 2 combined, aggregate top-three rates are 27.9365% and 52.3810%, and worst ranks are 99 and 92. These are deterministic structural-overlap diagnostics only.

TypeScript, 93/93 unit tests, build, production audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 gates passed. The taxonomy ledger records promote-to-canonical with resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 9 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V83 delta remains uncommitted and no push remote is configured.
## V84 verification record — French Fascism historical microtype

V84 records the provisional source-backed promotion of French Fascism to the canonical Fascism → French Fascism micro path. Academic support comes from Passmore's [provincial French-right study](https://www.cambridge.org/core/books/from-liberalism-to-fascism/92F1B1A067D53DAA678A870677B25980), [history of the French right through Vichy](https://academic.oup.com/book/7430), Millington's [veterans and extreme-right study](https://academic.oup.com/manchester-scholarship-online/book/29250/chapter-abstract/243102493), Paxton's [French peasant Fascism](https://academic.oup.com/book/47498), and Desan's [neo-socialism, fascism, and political-conversion study](https://www.cambridge.org/core/books/abs/order-authority-nation/order-authority-nation/A150AC38D963F64D27942B6377B050FD). These sources support historical terminology, scope, variation, provenance, and false-positive controls only.

The V84 contract contains 1,344 production prompts (448 per layer), 111 editorial anchors, 106 production anchors, 111 ontology nodes, 8 registry entries, 106 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 14,849-character compact v2 fragment. French Fascism has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, a twelve-dimension profile, four neighbor discriminants, and a false-positive audit. It is isolated-reachable in all three layers; full-production ranks are 18/4/4 and 5 combined, with aggregate top-three rates of 27.6729% and 51.8868% and worst ranks 100 and 93. These are deterministic structural-overlap diagnostics only. No scoring or picker retuning was justified.

All V84 verification gates pass: TypeScript, coverage, reachability, Vitest 94/94, Vite build, high-severity production dependency audit with zero vulnerabilities, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check`. The build retains the existing large-client-chunk advisory. No cognitive/respondent/psychometric/empirical/population evidence was run or claimed; eight registry-only entries and five contextual anchors remain outside production scoring and the comprehensive goal remains open.

## V87 — Flemish / Belgian Fascism historical microtype

The V87 WorkPM continuation promotes Flemish / Belgian Fascism from the registry into a provisional canonical Fascism → Flemish / Belgian Fascism microtype after comparing De Wever on Belgium and Catholicism/Fascism, Conway on Rexism and collaboration, van de Maele on technocratic planning, Dalle Mulle on Flanders and nationality questions, and Kunkeler/Hamre on Verdinaso and VNV, alongside existing Belgian and comparative Fascism context. The comparison supports a historically bounded, contested, internally varied field through 1945 and does not equate Flemish or Belgian identity, language politics, regional autonomy, Catholicism, corporatism, authoritarianism, anti-parliamentary dissatisfaction, collaboration alone, or current actors with the target.

The V87 delta adds one canonical micro node, six fresh academic source records, nine direct source references, twelve original effect-free prompts at 4/4/4, one provisional anchor, four neighbor discriminants, a 17-dimension profile, a false-positive audit, coverage metadata, explicit promotion governance, and regression/QA assertions. No scorer, picker, threshold, facet, distance, or combined-layer coefficient changed. The verified contract is content version 87 with 1,380 prompts (460 per layer), 114 editorial anchors, 109 production anchors, 114 ontology nodes, 5 registry entries, 109 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,281-character compact v2 fragment. Flemish / Belgian Fascism is isolated-reachable in all layers and combined; full ranks are 7/8/4 by layer and 2 combined, aggregate top-three rates are 29.0520% and 54.1284%, and worst ranks are 103 and 96. These are deterministic geometry diagnostics only.

TypeScript, 97/97 unit tests, build, high-severity dependency audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and documentation diff hygiene pass. The build retains the existing large-client-chunk advisory. Five contextual placements and five registry-only targets remain outside production scoring; the comprehensive goal remains open. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed. The V87 commit is scoped to tranche-owned files and push remains dependent on configured remote state.

## V86 — Japanese Fascism historical microtype

The V86 WorkPM continuation promotes Japanese Fascism from the registry into a provisional canonical Fascism → Japanese Fascism microtype after comparing [Fletcher's study of intellectuals and Fascism in early Shōwa Japan](https://www.cambridge.org/core/journals/journal-of-asian-studies/article/abs/intellectuals-and-fascism-in-early-showa-japan/24375A72B18397DE8C6D19247A1E165B), [Hofmann's comparative study of Japan and Italy](https://academic.oup.com/cornell-scholarship-online/book/24047), [Young's analysis of fascism and empire in Japanese-occupied Manchuria](https://www.cambridge.org/core/journals/journal-of-global-history/article/when-fascism-met-empire-in-japaneseoccupied-manchuria/4D050824AA8EA411A0D9B1884935FB23), [Mimura's study of military Fascism and Manchukuo](https://academic.oup.com/cornell-scholarship-online/book/24122/chapter-abstract/185559288), and [Tsuzuki's account of Fascism, militarism, and thought control](https://academic.oup.com/book/7118/chapter-abstract/151649407), alongside existing Oxford Fascism context. The comparison supports a historically bounded and internally varied Japanese field while preserving the scholarly dispute over whether the label applies to Japan as a whole; it does not support a universal Japanese, militarist, imperial, security, or current-actor classification.

The V86 boundary covers interwar and early-Shōwa intellectual, military, bureaucratic, technocratic, associational, New Order, wartime, and imperial or Manchurian formations through 1945. It distinguishes Japanese Fascism from wider Fascism, Italian Fascism, National Socialism, National-Syndicalism, Integral Nationalism, National Conservatism, generic militarism, authoritarianism, imperialism, Japanese identity, cultural tradition, patriotism, security preference, one institution, current actors, current Japan, and postwar identity. No cognitive or respondent review was run.

The V86 block contains one canonical micro node, five fresh academic source records, twelve direct prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile. The measured contract is 1,368 prompts (456 per layer), 113 editorial anchors, 108 production anchors, 113 ontology nodes, 6 registry entries, 108 dedicated-scored targets, five contextual-only targets, 1,428 candidates across 119 targets, and a 15,137-character compact v2 fragment. Japanese Fascism is isolated-reachable in every layer and combined; full ranks are 11/7/3 by layer and 2 combined, aggregate top-three rates are 28.7037% and 53.7037%, and worst ranks are 102 and 95. These remain deterministic geometry diagnostics only.

TypeScript, 96/96 unit tests, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy container, `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` passed. The build retains the existing large-client-chunk advisory. The taxonomy ledger records promote-to-canonical with resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 6 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V86 delta is ready for the user's requested scoped Git commit/push, subject to the repository's remote configuration.

## V85 — Italian Fascism historical microtype

The V85 WorkPM continuation promotes Italian Fascism from the registry into a provisional canonical Fascism → Italian Fascism microtype after comparing [Cerasi's study of corporative populism](https://www.cambridge.org/core/journals/modern-italy/article/they-the-people-italian-fascism-and-the-ambivalences-of-corporative-populism/D6421957129E36E8DB9A511D2B900B46), [Morgan's Oxford Handbook chapter on corporatism](https://academic.oup.com/edited-volume/34510/chapter-abstract/292825842), [Corner's study of the Fascist Party and popular opinion](https://academic.oup.com/book/10002), [Whittam's transition from coalition to regime](https://www.cambridge.org/core/books/abs/fascist-italy/transition-from-coalition-to-regime-19221928/E02A8D60177929AAC0628E3316540A1A), and [Forlenza's analysis of fascism as political form](https://www.cambridge.org/core/journals/modern-italy/article/end-of-fascism/F3A25EAD5FCF3342AC693876A0B3649C), alongside existing Italian and Oxford context. The comparison supports a historically bounded and internally varied Italian movement-and-regime field joining national rebirth, movement-state integration, corporative social organization, transformed public authority, and historically specific political culture; it does not support a universal current-actor label.

The boundary preserves variation across movement, party, coalition, dictatorship, local, industrial, agrarian, Catholic, secular, wartime, racial, imperial, and project-versus-realization settings. It separates Italian Fascism from wider Fascism, National Socialism, Neo-Fascism, National-Syndicalism, Falangism, Legionary Fascism, National Conservatism, generic authoritarianism, nationalism, corporatism, Italian identity, patriotism, one leader, one policy, current actors, and postwar identity. No ontology family was collapsed, no scorer or picker coefficient changed, and no cognitive or respondent review was run.

The V85 delta adds one canonical micro node, four fresh academic source records, twelve direct effect-free prompts at 4/4/4, one provisional anchor, eight direct source references, four neighbor discriminants, a 17-dimension qualitative profile, a false-positive audit, coverage metadata, promotion governance, and regression/QA assertions. The verified contract is 1,356 prompts (452 per layer), 112 editorial anchors, 107 production anchors, 112 ontology nodes, 7 registry entries, 107 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 14,993-character compact v2 fragment. Italian Fascism is isolated-reachable in every layer and combined; full ranks are 6/1/4 by layer and 1 combined, aggregate top-three rates are 28.0374% and 52.3364%, and worst ranks are 101 and 94. These remain deterministic structural-overlap diagnostics only.

TypeScript, 95/95 unit tests, build, production audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, Docker-backed Playwright 10/10, and git diff --check pass. The build retains the existing large-client-chunk advisory. The taxonomy ledger records promote-to-canonical with resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 7 registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or claimed; the comprehensive goal remains open. The V85 delta remains uncommitted and no push remote is configured.

## V88 — Agrarian Populism historical microtype

The V88 WorkPM continuation promotes Agrarian Populism from historical-variant registry context into a provisional canonical `Populism → Agrarian Populism` microtype after comparing [Arter](https://onlinelibrary.wiley.com/doi/10.1111/1467-9477.12251), [Hajdu and Mamonova](https://onlinelibrary.wiley.com/doi/10.1111/soru.12301), [Borras](https://onlinelibrary.wiley.com/doi/10.1111/joac.12311), [Pattenden](https://onlinelibrary.wiley.com/doi/full/10.1111/joac.12532), and [Mamonova and Franquesa](https://onlinelibrary.wiley.com/doi/10.1111/soru.12306), alongside existing Oxford, Cambridge, and Wiley populism context. The comparison supports a historically bounded rural or land-based people–elite construct tied to land, food, agricultural production, or rural political power while preserving rural–urban, class-composition, country, period, cross-class, progressive, reactionary, cooperative, market, socialist, nationalist, and democratic variation. These sources support terminology, provenance, boundary design, false-positive controls, and original authoring only; they do not validate local wording, effects, vectors, respondent interpretation, reliability, validity, invariance, or empirical classification.

The boundary excludes rural residence, farming status, localism, food or land policy, tariffs, generic anti-elite sentiment, left/right host alone, current party affiliation, current actors, and private identity. The implementation adds one canonical micro node, five fresh academic source records, eight direct source references, twelve original effect-free prompts at 4/4/4, one provisional anchor, a 17-dimension qualitative profile, four neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. No scorer, picker, threshold, facet, distance, or combined-layer coefficient changed; candidates remain quarantined.

The verified V88 contract is 1,392 prompts (464 per layer), 115 editorial anchors, 110 production anchors, 115 ontology nodes (9 macro / 38 total meso / 68 micro; 9 / 33 / 68 canonical), 4 registry entries, 110 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,425-character compact v2 fragment. Agrarian Populism is isolated-reachable in all three layers; the combined top-three diagnostic omits normative and prescriptive layers and is recorded only as deterministic geometry evidence.

TypeScript, 98/98 unit tests, build, high-severity dependency audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` pass. The build retains the existing large-client-chunk advisory. Four registry-only targets and five contextual placements remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical validation, or population evidence was run or implied; the comprehensive goal remains open.
