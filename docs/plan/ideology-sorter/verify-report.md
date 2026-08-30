# Argos Verification Report

## Summary

- CPS traceability: PASS
- Functional requirements: 5/5 implemented
- Build: PASS (`npm run build`)
- Unit tests: 12/12 passed (`npm test -- --run`)
- Browser tests: 5/5 passed (`npm run qa`), including the exploratory browser test
- API match: skipped; no `api-spec.md` and no API is in scope
- Planned QA: 29/40 directly evidenced; 11 remain code-audit warnings rather than failures
- Process diagrams: 34/34 named nodes mapped by native flow comparison
- Design compliance: B, 8.4/10; rendered screenshots inspected at desktop and mobile widths
- Security: no Critical or High findings; `npm audit` and production-only audit report zero vulnerabilities
- Overall Argos status: CONDITIONAL, because keyboard/text-zoom/clipboard-denial cases and repository-history secret scanning remain unverified. No core implementation failure was found.

This audit evaluates a neutral, client-side civic-reflection tool. It does not endorse, rank, score, or recommend political parties, candidates, or ideological positions. The application itself labels its outputs as editorial and interpretive rather than scientific or prescriptive.

## Module Coverage

| Module | Resolved path | Status | Coverage limit |
|---|---|---|---|
| `domain-dictionary` | `/var/home/tcs/.codex/.olympus/source-skills/domain-dictionary/SKILL.md` | module | Used during planning; terms were checked against code and UI copy. |
| `flow-verifier` | `/var/home/tcs/.codex/.olympus/source-skills/flow-verifier/SKILL.md` | native-fallback | Node and branch comparison was performed in the main context; no dedicated verifier executable was available. |
| `frontend-design` | `/var/home/tcs/.codex/.olympus/source-skills/frontend-design/SKILL.md` | module | Rendered design and shared AI-slop blacklist applied. |
| `frontend-design / ai-slop-blacklist` | `/var/home/tcs/.codex/.olympus/source-skills/frontend-design/references/ai-slop-blacklist.md` | module | Seven visual blacklist items plus hard-rejection checks applied. |
| `ui-ux-auditor` | `/var/home/tcs/.codex/.olympus/source-skills/ui-ux-auditor/SKILL.md` | native-fallback with visual pass | Full 9-area rubric applied; no separate auditor command was available. |
| `code-reviewer` | `/var/home/tcs/.codex/.olympus/source-skills/code-reviewer/SKILL.md` | native-fallback | `codex review --uncommitted` could not be scoped because the project is an untracked directory inside the parent home worktree and the CLI rejects a custom prompt with `--uncommitted`; manual critical/domain/adversarial passes were used. |
| `security-audit` | `/var/home/tcs/.codex/.olympus/source-skills/code-reviewer/references/security-audit.md` | module | Comprehensive static MVP audit applied; history scanner coverage remains open. |

## Phase 0: CPS Traceability

The required `Context Map` and `Problem Statement` sections are present in `docs/plan/ideology-sorter/spec.md`.

### Problem to solution

| Problem | Corresponding requirements | Status |
|---|---|---|
| P1: factual, value, and means claims collapse into one label | FR-1, FR-2, FR-4; `src/App.tsx:56-58, 81-155, 230-249` | PASS |
| P2: opaque mappings and unanswered items appear certain | FR-3, FR-4, FR-5; `src/scoring.ts:19-67, 191-228`, `src/App.tsx:158-191, 237-241` | PASS |
| P3: source-inspired content can silently copy or inherit bias | FR-5; `src/data.ts` source registry, `src/App.tsx:64,131,176`, `README.md` source posture | PASS |
| P4: long flow can cause fatigue and inaccessible progress | FR-1, FR-2; `src/App.tsx:114-151`, `src/styles.css:106-154`, browser QA | PASS |

### Ecosystem to section coverage

| Ecosystem | Section | Status |
|---|---|---|
| Browser local state | `section-03-quiz-flow.md` | PASS |
| Static dataset | `section-02-data-methodology.md` | PASS |
| Optional clipboard | `section-04-results.md` | PASS |

All four section files listed in `sections/index.md` exist, and every problem resolution section points to an existing file.

## Phase 1: Static Verification

### Functional verification

| Requirement | Evidence | Status |
|---|---|---|
| Intro framing and three layer explanation | `src/App.tsx:81-97`; `src/data.ts` contains 48 questions and three layer labels | PASS |
| Six response states with separate `no-view` | `src/types.ts:10-13`; `src/data.ts` answer options; `src/App.tsx:132-145` | PASS |
| Forward navigation requires a response | `src/App.tsx:149-150` disables Next until an answer exists | PASS |
| Back navigation and changing prior answers | `src/App.tsx:148,264-268`; browser test | PASS |
| Coverage threshold and missing-information result | `src/scoring.ts:194-205`; unit and browser tests | PASS |
| Signed facet aggregation and weighted squared anchor distance | `src/scoring.ts:78-130`; methodology copy at `src/App.tsx:58` | PASS |
| Family-balanced neighbors and tie language | `src/scoring.ts:135-163`; unit tests | PASS |
| Layer-specific results, signals, pulls, restart, share | `src/App.tsx:165-253`; `src/share.ts:22-71` | PASS |
| Item and anchor provenance visibility | `src/App.tsx:64,131,176`; source registry in `src/data.ts` | PASS |

### Quality verification

| Quality area | Evidence | Status |
|---|---|---|
| Type safety | Strict TypeScript, discriminated `LayerResult`, `npm run build` | PASS |
| Input/data validation | `validateDataset` checks IDs, layers, weights, profiles, and sources | PASS |
| Share input boundary | Bounded base64url, schema/version/ID/value checks, whole-envelope rejection | PASS |
| Accessibility structure | `main`, `section`, `fieldset`, `legend`, labels, status regions, visible focus rules | PASS with minor gaps |
| Responsive behavior | Container query, mobile breakpoint, 320px scroll-width probe reported 320/320 | PASS |
| Documentation | README, DESIGN.md, planning artifacts, source posture, QA plan | PASS |
| Static anti-pattern scan | No purple gradient, generic card grid, emoji, `innerHTML`, `eval`, analytics storage, or answer `fetch` path | PASS |

## Phase 2: Runtime Verification

| Stage | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS; TypeScript and Vite production bundle completed |
| Unit/contract | `npm test -- --run` | PASS; 12 tests across `src/scoring.test.ts` and `src/share.test.ts` |
| Browser | `npm run qa` | PASS; 5 Playwright tests including `tests/explore/explore.spec.ts` |
| Docker-backed browser | `E2E_BASE_URL=http://127.0.0.1:8001 npx playwright test --reporter=list --workers=50%` | PASS; 5/5 tests against the healthy container |

Browser scenarios directly exercised:

- intro and required-response gate;
- back navigation with a retained answer;
- complete 48-item flow;
- sparse layer with `No view yet` and insufficient information;
- versioned share-link restore;
- malformed hash recovery; and
- restart after results.

## Phase 3: API Match

Skipped by design. There is no `api-spec.md`, no server package, and no API route. The static-site boundary is documented in `README.md`, `docs/plan/ideology-sorter/spec.md`, and `docs/zeus/zeus-state.json`.

## Phase 4: QA Scenario Verification

The 40 planned cases in `qa-scenarios.md` were checked against tests, code, and rendered evidence.

| Category | Direct pass | Code-audit warning | Failure | Notes |
|---|---:|---:|---:|---|
| Unit and contract | 14 | 2 | 0 | Distance fixture and input-order permutation are deterministic in code but do not have separate exact-value assertions. |
| Browser and integration | 10 | 2 | 0 | Transition notice and methodology are implemented and visually present but not separate named Playwright assertions. |
| Accessibility/responsive | 1 | 5 | 0 | Mobile overflow is directly measured; keyboard-only, text zoom, and reduced-motion cases remain manual/code-audit evidence. |
| Security/privacy | 4 | 2 | 0 | Clipboard denial and network-observation cases are not directly automated. |
| **Total** | **29** | **11** | **0** | **72.5% direct execution; all warning cases have implementation evidence. |

The warnings are verification-depth gaps, not known failures. The remaining coverage should be added before treating the MVP as a fully regression-hardened release.

## Phase 5: Process Diagram Verification

Source: native fallback based on the loaded `flow-verifier` contract. All named nodes in the three diagrams have corresponding code paths.

| Diagram | Nodes checked | Matched | Missing | Status |
|---|---:|---:|---:|---|
| `quiz-flow.mmd` | 11 | 11 | 0 | PASS |
| `scoring-flow.mmd` | 10 | 10 | 0 | PASS |
| `share-flow.mmd` | 13 | 13 | 0 | PASS |
| **Total** | **34** | **34** | **0** | PASS |

Branch checks:

- disabled Next is the no-response branch;
- the last-item branch transitions to results;
- question indices 16 and 32 render layer orientation notices;
- coverage below 50% returns `insufficient-information`;
- valid and invalid share hashes have separate restore/recovery paths; and
- clipboard success and manual-copy fallback are both represented in `ResultsView`.

## Phase 6: Design and UI/UX Verification

### Token and visual compliance

`DESIGN.md` is the root visual source of truth. The implementation uses the paper/ink/vermilion tokens, Newsreader display face, DM Sans body face, square editorial controls, and responsive layout rules. Google Fonts are loaded through CSS rather than only named in a font stack.

### AI-slop scan

The shared blacklist scan found no purple/indigo gradient, symmetric three-column feature grid, decorative blob/wave, emoji, center-aligned app shell, uniform rounded-card system, generic SaaS hero, or cookie-cutter pricing/testimonial rhythm. The one accent left border is used for a semantic layer-transition notice, not a card grid. No hard rejection pattern was observed.

### Render evidence

Screenshots were captured and inspected at:

- `docs/ui-audit/screenshots/intro-desktop-light.png`
- `docs/ui-audit/screenshots/intro-mobile-light.png`
- `docs/ui-audit/screenshots/results-desktop-light.png`
- `docs/ui-audit/screenshots/results-mobile-light.png`

The 320px runtime probe measured `document.documentElement.scrollWidth === window.innerWidth` for both intro and quiz (`320 === 320`). The results screenshot was captured after the entrance transition completed.

### UI/UX scorecard

| Area | Score | Evidence and remaining issue |
|---|---:|---|
| Light/dark mode | 7/10 | Light theme is tokenized and legible; the MVP intentionally ships light-only and has no dark theme toggle. |
| Responsive layout | 9/10 | Mobile breakpoint, container query, readable controls, and 320px no-overflow probe. |
| Accessibility | 8/10 | Native radio semantics, labels, focus movement, status text, and `prefers-reduced-motion`; skip-link and automated keyboard/text-zoom coverage are not present. |
| Loading/performance | 7/10 | Static SPA, no data fetch, 242 kB JS bundle before gzip and 74.94 kB gzip; external font CSS remains a render dependency. |
| Form UX | 9/10 | Required response gate, separate mixed/no-view states, answer hints, changeable answers, and visible focus. |
| Navigation | 8/10 | Consistent header, layer rail, back, restart, methodology, and share actions; no multi-route breadcrumb system is needed for this SPA. |
| Typography/spacing | 9/10 | Actual Newsreader/DM Sans loading, editorial hierarchy, asymmetric desktop layout, and readable mobile collapse. |
| Animation | 9/10 | Only opacity/transform transitions, with reduced-motion override. |
| AI slop | 9/10 | Intentional editorial treatment; no hard rejection pattern. |
| **Weighted total** | **8.4/10, grade B** | Good MVP presentation with explicit light-only and manual-a11y limits. |

## Phase 7: Security Verification

- Mode: comprehensive, bounded to this static MVP.
- Trust boundary: browser bundle and URL fragment; no authentication, authorization, server, database, analytics, or third-party answer transfer.
- Secret scan: no `.env`, credential, secret, or token-named files were found in the project tree. `gitleaks` and `trivy` are not installed. Parent-worktree history scan was not run because the project is an untracked subdirectory of a broad home worktree and no redacting history scanner is available.
- Supply chain: `npm audit` and `npm audit --omit=dev` both reported zero vulnerabilities; `package-lock.json` exists.
- CI/CD: no workflow or deployment credentials are present in the project scope; Docker delivery is audited in the Zeus Phase 4 record.
- OWASP scan: no server injection sink, `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `Function`, SQL, upload, SSRF, or answer-storage request path was found. External source links use `target="_blank" rel="noreferrer"`.
- Share privacy: the fragment is a bearer link containing answers. The UI discloses this as a versioned local share link; users must treat copied links as sensitive to their own answers.

### STRIDE summary

| Threat | Status | Evidence |
|---|---|---|
| Spoofing | Not applicable to the no-account MVP | No identity or session authority exists. |
| Tampering | Partially mitigated | Versioned schema and fail-closed validation reject altered/unknown payloads; a user can still deliberately create a different valid answer set. |
| Repudiation | Not applicable | No server-side action or account record exists. |
| Information disclosure | Partially mitigated | No remote answer transfer; bearer-link privacy is disclosed, but anyone with a copied fragment can read its answers. |
| Denial of service | Partially mitigated | Share fragment length is capped at 12,000 characters and answer count is bounded; no server resource is exposed. |
| Elevation of privilege | Not applicable | No privileged operation or authorization boundary exists. |

No Critical or High security finding was confirmed. Coverage gaps remain for redacting historical secret scanning and direct clipboard-denial/network-observation tests.

## Automatic Fixes Applied During Argos Round 1

| Finding | Change | Recheck |
|---|---|---|
| Distance formula drifted from spec | Added effect-derived facet weights and weighted mean squared anchor distance in `src/scoring.ts` | Build, 12 unit tests, and 4 browser tests passed |
| Provenance was stored but not visible | Added question source links and anchor notes in `src/App.tsx` | Build and browser tests passed |
| Clipboard fallback could report copy without an API | Added explicit Clipboard API availability branch and manual-copy message | Build and browser tests passed |
| Share URL input could overflow narrow screens | Added responsive full-width input styling | 320px probe remained 320px wide |

## Unresolved or Deferred Items

1. Add direct Playwright coverage for keyboard-only navigation, reduced motion, text zoom, clipboard denial, transition notices, and methodology from both intro and results.
2. Add an exact known-distance fixture and answer-map permutation test to close the two unit-test warnings.
3. Add a redacting historical secret scanner when this project is moved into an isolated Git repository.
4. Keep canonical ontology activation outside this MVP; the current anchors remain editorial and provisional.

## Final Argos Decision

CONDITIONAL. The implemented MVP builds, validates, renders, and completes its main local workflows with no confirmed Critical or High security finding. Conditional status is driven by explicit verification-depth gaps and the intentionally light-only, non-scientific scope, not by a known broken core path.

## Current v9 continuation verification — 2026-08-26

The WorkPM continuation added source-backed, target-tagged 4/4/4 blocks for the existing canonical meso targets Populism and Mutualism. The ontology remains 9 macro / 38 meso / 60 micro with 30 canonical scoring anchors and five contextual-only anchors; content version 9 contains 432 production questions, 144 per layer. No ontology node was added, reparented, or demoted, and the policy-version 3 scorer was not changed.

| Check | Status | Evidence |
|---|---|---|
| Typecheck | PASS | `npx tsc --noEmit --pretty false` |
| Unit/integration tests | PASS | `npm run test:run -- --reporter=dot`, 42/42 |
| Research coverage | PASS | `npm run research:coverage --silent`; 30 dedicated-scored, 72 catalog-only, five contextual-only, 12 registry-only, 1,428 candidates, zero validation errors |
| Structural anchor reachability | PASS | `npm run research:anchor-reachability --silent`; zero validation/closure failures, every production anchor has 4/4/4 target closure and isolated routing |
| Full-production overlap diagnostic | OBSERVED | Deterministic structural fixture: 50% layer top-three hit rate, 70% combined top-three hit rate, worst full-competition ranks 27 and 23; not a gate or respondent result |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker build/health/browser QA | PASS | no-cache image rebuild, Compose recreation, `/healthz`, healthy container, Docker-backed `npm run qa`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus records synchronized; Zeus state JSON parses; source/docs whitespace scan clean |

The overlap diagnostic exposed measurement coarseness but did not justify an arbitrary scoring coefficient. A target-block blend was prototyped and rejected as uncalibrated; no production scoring change was made. The seven remaining canonical meso holds remain catalog-only. No cognitive review, respondent evidence, simulation substitute, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed.

## Current v10 continuation verification — 2026-08-26

### Scope

WorkPM selected Radical Conservatism and Reactionary Conservatism for a bounded source-backed production-coverage tranche. The existing ontology, scoring policy, facet geometry, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved. The five remaining canonical meso holds—Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 42/42 |
| Research coverage | PASS | `npm run research:coverage --silent`; 456 questions, 152 per layer, 32 dedicated-scored targets, 70 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 32 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 53.125% layer top-three hit rate, 71.875% combined hit rate, worst ranks 29 and 25 |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker build/health/browser QA | PASS | Image rebuild, Compose recreation, `/healthz`, healthy container, and Docker-backed `npm run qa`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus records synchronized; Zeus state JSON parses; source/docs whitespace scan clean |

The full-production overlap remains a measurement-design diagnostic. No arbitrary target-block coefficient or other production scoring change was made. The boundary-transition browser scenario was given an explicit 60-second budget after the 152-item layer expansion; its focused run and the full 10-scenario suite pass without an application behavior change. The new anchors and prompts remain provisional editorial measurement; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed.

## Current v11 continuation verification — 2026-08-26

### Scope

WorkPM selected Islamism for a bounded source-backed direct-coverage tranche. The existing 9/33/60 ontology, version-3 scoring policy, 20-facet geometry, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 42/42 |
| Research coverage | PASS | `npm run research:coverage --silent`; 468 questions, 156 per layer, 33 dedicated-scored targets, 69 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 33 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 52.5253% layer top-three hit rate, 69.6970% combined hit rate, worst ranks 30 and 26 |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker build/health/browser QA | PASS | No-cache image rebuild, Compose recreation, `/healthz`, healthy container, and Docker-backed `npm run qa`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus records and activity record synchronized to v11; Zeus state JSON parses; source/docs whitespace scan clean |

The Islamism target passes isolated structural routing but does not reach the top three in any full-competition fixture because the current shared facet geometry remains coarse for a broad, internally varied religious-political field. This is retained as a measurement-design diagnostic; no arbitrary coefficient, new facet, or respondent claim was introduced. Academic sources support construct terminology, internal variation, and boundary wording only. No cognitive review, respondent evidence, simulation substitute, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed.

## Historical v12 continuation verification — Ordoliberalism — 2026-08-26

### Scope

WorkPM selected Ordoliberalism for a bounded source-backed direct-coverage tranche. The existing 9/33/60 ontology, version-3 scoring policy, 20-facet geometry, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved. Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false`, also included in `npm run build` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 43/43 |
| Research coverage | PASS | `npm run research:coverage --silent`; 480 questions, 160 per layer, 34 dedicated-scored targets, 68 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 34 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 51.9608% layer top-three hit rate, 70.5882% combined hit rate, worst ranks 31 and 27 |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker Compose config | PASS | `docker compose config` with `-f docker-images/docker-compose.yml` |
| Docker image build | PASS | No-cache image rebuild |
| Docker health and `/healthz` | PASS | Healthy `ideology-layer-sorter-frontend`; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`; 10/10 |
| Documentation/state | PASS | v12 WorkPM/Zeus/activity records synchronized; Zeus state parses as JSON; source/docs whitespace scan clean |

The Ordoliberalism prompts and anchor are source-backed editorial additions, not respondent measures. The full-production overlap diagnostic remains a measurement-design signal and did not change scoring. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Historical v13 continuation verification — Pan-Africanism — 2026-08-26

### Scope

WorkPM selected Pan-Africanism for a bounded source-backed direct-coverage tranche over its existing canonical micro node under Nationalism. The existing 9/33/60 ontology, version-3 scoring policy, 20-facet geometry, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved. Black Nationalism and Anti-Colonial Nationalism remain deferred research-only alternatives; Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 44/44 |
| Research coverage | PASS | `npm run research:coverage --silent`; 492 questions, 164 per layer, 35 dedicated-scored targets, 67 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 35 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 48.5714% layer top-three hit rate, 65.7143% combined hit rate, worst ranks 32 and 28; Pan-Africanism ranks 7/6/7 by layer and 6 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker Compose config | PASS | `docker compose config` with `-f docker-images/docker-compose.yml` |
| Docker image build | PASS | No-cache image rebuild |
| Docker health and `/healthz` | PASS | Healthy `ideology-layer-sorter-frontend`; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`; 10/10 |
| Documentation/state | PASS | v13 WorkPM/Zeus/activity records synchronized; Zeus state JSON parses; source/docs whitespace scan clean |

The Pan-Africanism prompts and anchor are source-backed editorial additions, not respondent measures. The structural audit closes isolated routing but retains full-production overlap as a measurement-design diagnostic; no arbitrary scoring coefficient, new facet, or scorer change was made. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v14 continuation verification — Religious Nationalism — 2026-08-27

### Scope

WorkPM selected Religious Nationalism for a bounded source-backed direct-coverage tranche over the existing parentless canonical meso hybrid. The existing 9/33/60 ontology, version-3 scoring policy, 20-facet geometry, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved. Conservative Nationalism, National Socialism, and Neo-Fascism remain canonical catalog-only holds; religion-specific variants such as Hindutva, Christian Nationalism, Buddhist Nationalism, and Religious Zionism remain distinct catalog-only nodes.

### Research boundary

The boundary work uses the [Oxford Research Encyclopedia entry on Religious Nationalism and Religious Influence](https://academic.oup.com/edited-volume/62239/chapter-abstract/550810397), [Zubrzycki's comparative review in Sociology of Religion](https://academic.oup.com/socrel/advance-article/doi/10.1093/socrel/sraf015/8193892?searchresult=1), the [Oxford History of Hinduism chapter on Hindu Nationalism](https://academic.oup.com/book/35280/chapter/299881760), and the [Cambridge History of Judaism chapter on Zionism and its critics](https://www.cambridge.org/core/books/cambridge-history-of-judaism/zionism-and-its-critics/73C4F39C05491B593F680206CAB87978). These references support a public religion–nation fusion construct, comparative variation, bounded examples, provenance, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 45/45 |
| Research coverage | PASS | `npm run research:coverage --silent`; 504 questions, 168 per layer, 36 dedicated-scored targets, 66 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 36 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 47.2222% layer top-three hit rate, 63.8889% combined hit rate, worst ranks 33 and 29; Religious Nationalism ranks 6/19/11 by layer and 10 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Local browser QA | PASS | `npm run qa`; 10/10 |
| Docker Compose config | PASS | `docker compose config` with `-f docker-images/docker-compose.yml` |
| Docker image build | PASS | No-cache image rebuild |
| Docker health and `/healthz` | PASS | Healthy `ideology-layer-sorter-frontend`; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`; 10/10 |
| Documentation/state | PASS | v14 WorkPM/Zeus/activity records synchronized; Zeus state JSON parses; source/docs whitespace scan clean |

The Religious Nationalism target passes isolated structural routing in all three layers while remaining a parentless hybrid; no canonical parentage was invented. The full-production rank and overlap figures are measurement-design diagnostics, not empirical respondent evidence. The 12 prompts and anchor remain provisional editorial measurement. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v15 continuation verification — Conservative Nationalism — 2026-08-27

### Scope

WorkPM selected Conservative Nationalism for a bounded source-backed direct-coverage tranche over the existing parentless canonical meso hybrid. The existing 9/33/60 ontology, version-3 scoring policy, 20-facet geometry, answer/share semantics, contextual-anchor boundary, and quarantined research bank were preserved. National Socialism and Neo-Fascism remain catalog-only high-risk historical holds; the National Conservatism micro child remains distinct.

### Research boundary

The boundary work uses the [SEP Nationalism entry](https://plato.stanford.edu/archives/sum2026/entries/nationalism/), the [Oxford Conservatism chapter](https://academic.oup.com/edited-volume/34324/chapter/291333309), the [International Affairs article on national conservatism](https://academic.oup.com/ia/article/100/5/2233/7739689), and [Sekerák's Journal of Political Ideologies article](https://www.tandfonline.com/doi/full/10.1080/13569317.2025.2484524). These sources support a contested conservative-national formation, inherited continuity, bounded civic solidarity, sovereignty, stewardship, comparative caution, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 46/46 |
| Research coverage | PASS | `npm run research:coverage --silent`; 516 questions, 172 per layer, 37 dedicated-scored targets, 65 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 37 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 46.8468% layer top-three hit rate, 62.1622% combined top-three hit rate, worst ranks 34 and 30; Conservative Nationalism ranks 5/20/1 by layer and 2 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Share capacity regression | PASS | Complete v15 answer fragment measured 33,459 characters and round-tripped under the finite 36,864-character guard; oversized input remains rejected without truncation |
| Local browser QA | PASS | `npm run qa -- --reporter=dot`; 10/10 |
| Docker Compose config | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` |
| Docker image build | PASS | `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health and `/healthz` | PASS | Recreated `ideology-layer-sorter-frontend` is healthy; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus/activity records synchronized; final state JSON parse and source/docs whitespace checks recorded after synchronization |

The Conservative Nationalism target passes isolated structural routing in all three layers while preserving its parentless hybrid semantics. Full-production ranks and top-three overlap remain design diagnostics, not empirical respondent evidence and not a basis for arbitrary scorer retuning. The share-capacity increase is explicitly documented as a finite compatibility accommodation; the envelope remains answer-only and version-checked. The 12 prompts and anchor remain provisional editorial measurement. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, or population study was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v16 continuation verification — National Socialism — 2026-08-27

### Scope

WorkPM selected National Socialism for a historically bounded, source-backed direct-coverage tranche over the existing canonical meso node. The block is explicitly scoped to German National Socialism, especially the interwar movement and the 1933–1945 regime. Neo-Fascism remains catalog-only because its post-1945 continuity, adaptation, and organizational boundaries require separate handling. The existing 9/33/60 canonical inventory, 20-facet geometry, version-3 scorer, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved.

### Research boundary

The boundary work uses the [Oxford Handbook of the Weimar Republic chapter on National Socialism](https://academic.oup.com/edited-volume/40697/chapter-abstract/348423596), the [Oxford Handbook of Political Ideologies chapter on Fascism](https://academic.oup.com/edited-volume/34324/chapter-abstract/291337436), and the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510). These references support historical terminology, scope, provenance, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 47/47 |
| Research coverage | PASS | `npm run research:coverage --silent`; 528 questions, 176 per layer, 38 dedicated-scored targets, 64 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 38 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostic is 46.4912% by layer and 63.1579% combined, with worst ranks 35 and 31; National Socialism ranks 1/1/1 by layer and 1 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Share capacity regression | PASS | Complete v16 answer fragment measured 34,275 characters and round-tripped under the finite 36,864-character guard; oversized input remains rejected without truncation |
| Local browser QA | PASS | `npm run qa -- --reporter=dot`; 10/10 |
| Docker Compose config | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` |
| Docker image build | PASS | `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health and `/healthz` | PASS | Recreated `ideology-layer-sorter-frontend` is healthy; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus/activity records synchronized; state JSON and source/docs whitespace checks pass |

The National Socialism prompts and anchor remain provisional editorial measurement. The reachability fixture closes the target in isolation; full-production overlap and ranks are structural diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v17 continuation verification — Civic Nationalism — 2026-08-27

### Scope

WorkPM selected Civic Nationalism for a bounded, source-backed direct-coverage tranche over the existing canonical micro node under Nationalism. The block is explicitly context-sensitive: citizenship-mediated membership, civic political identity, and self-government are measured without treating civic and ethnic nationalism as universal ideal types or inferring liberalism from civic language alone. Neo-Fascism remains catalog-only because its postwar continuity, adaptation, and organizational boundaries require separate handling. The existing 9/33/60 canonical inventory, 20-facet geometry, version-3 scorer, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved.

### Research boundary

The boundary work uses [Garner's Oxford Research Encyclopedia treatment of Nationalism](https://academic.oup.com/edited-volume/62239/chapter-abstract/550750941), [Pehrson's Oxford chapter on argumentative contexts of national identity](https://doi.org/10.1093/oso/9780198842545.003.0008), and [Laborde's account of civic patriotism](https://www.cambridge.org/core/journals/british-journal-of-political-science/article/abs/from-constitutional-to-civic-patriotism/9C7723CE5D8DE5AF316783A224D1BB16), alongside the existing SEP Nationalism and Anderson records. These references support terminology, context-sensitive scope, provenance, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 48/48 |
| Research coverage | PASS | `npm run research:coverage --silent`; 540 questions, 180 per layer, 39 dedicated-scored targets, 63 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 39 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 45.2991% layer top-three hit rate, 61.5385% combined top-three hit rate, worst ranks 36 and 32; Civic Nationalism ranks 10/6/7 by layer and 6 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Share capacity regression | PASS | Complete v17 answer fragment measured 35,075 characters and round-tripped under the finite 36,864-character guard; oversized input remains rejected without truncation |
| Local browser QA | PASS | `npm run qa -- --reporter=dot`; 10/10 |
| Docker Compose config | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` |
| Docker image build | PASS | `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health and `/healthz` | PASS | Recreated `ideology-layer-sorter-frontend` is healthy; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus/activity records synchronized; final state JSON parse and source/docs whitespace checks recorded after synchronization |

The Civic Nationalism prompts and anchor remain provisional editorial measurement. The isolated reachability fixture closes all three layers; full-production overlap and ranks are structural diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v18 continuation verification — Black Nationalism — 2026-08-27

### Scope

WorkPM selected Black Nationalism for a bounded, source-backed direct-coverage tranche over the existing canonical micro node under Nationalism. The block is explicitly varied rather than monolithic: Black collective dignity or linked fate, anti-Black institutional/material power, collective autonomy or self-determination, and self-directed institutions organize the construct, while state-seeking, community-national, cultural, economic, diasporic, reformist, and revolutionary routes remain possible. Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives; Neo-Fascism remains a high-risk hold. The existing 9/33/60 ontology, 20-facet geometry, version-3 scorer, answer/share contracts, contextual-anchor boundary, and quarantined research bank were preserved.

### Research boundary

The boundary work uses the [Cambridge Guide to African American History chapter on Black Nationalism](https://www.cambridge.org/core/books/abs/cambridge-guide-to-african-american-history/black-nationalism/13C0A82189B4F1086339C2E84BACB6A3), [Avilez's Oxford Research Encyclopedia treatment](https://academic.oup.com/edited-volume/61883/chapter-abstract/547804714), [Jagmohan's Political Theory article](https://doi.org/10.1177/0090591719897569), and [Spence, Shaw, and Brown's Du Bois Review distinction between Pan-Africanism and Black separatism](https://www.cambridge.org/core/journals/du-bois-review-social-science-research-on-race/article/abs/true-to-our-native-land-distinguishing-attitudinal-support-for-panafricanism-from-black-separatism/2378116FD1172FA43A339603DCB11). These references support terminology, historical variation, scope, provenance, and original item-authoring rationale only; they do not validate local wording, effects, anchor vectors, respondent interpretation, or political classification.

### Decision and measurement boundary

The source pass supports a protean field of racial consciousness, linked fate, collective action, autonomy, self-determination, solidarity, and self-directed institutions. The production block therefore requires a convergent dignity/power/autonomy/institution bundle and does not equate Black identity, cultural pride, separatism, Pan-Africanism, one organization, or current-actor inference with the ideology. The local questions and vector remain provisional editorial measurement; no new facet or target-specific blend was introduced. Black Nationalism is structurally distinct from Pan-Africanism because Pan-Africanism adds a constitutive African/diasporic transnational scope, and from Black Feminism because Black Feminism makes gendered power and intersectional social reproduction constitutive; historical movements may bridge these fields.

### Evidence

| Check | Status | Notes |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 49/49 |
| Research coverage | PASS | `npm run research:coverage --silent`; 552 questions, 184 per layer, 40 dedicated-scored targets, 62 catalog-only targets, five contextual-only targets, 12 registry-only entries, 1,428 candidates, 119 profiles/audits, zero validation errors |
| Anchor reachability | PASS | `npm run research:anchor-reachability --silent`; all 40 anchors have 4/4/4 target blocks and isolated routing; full-production diagnostics report 45.0000% layer top-three hit rate, 60.0000% combined top-three hit rate, worst ranks 37 and 33; Black Nationalism ranks 3/15/7 by layer and 4 combined |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Share capacity regression | PASS | Complete v18 answer fragment measured 35,875 characters and round-tripped under the finite 36,864-character guard; oversized input remains rejected without truncation |
| Local browser QA | PASS | `npm run qa -- --reporter=dot`; 10/10 |
| Docker Compose config | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` |
| Docker image build | PASS | `docker build --no-cache -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .` |
| Docker health and `/healthz` | PASS | Recreated `ideology-layer-sorter-frontend` is healthy; endpoint returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot`; 10/10 |
| Documentation/state | PASS | WorkPM/Zeus/activity records synchronized; state JSON and source/docs whitespace checks pass after synchronization |

The Black Nationalism prompts and anchor remain provisional editorial measurement. The isolated reachability fixture closes all three layers; full-production overlap and ranks are structural diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v22 continuation verification — Maoism — 2026-08-27

### Scope

WorkPM selected the existing canonical micro branch `Socialism → Communism → Maoism` for a bounded, source-backed direct-coverage tranche. The implementation adds twelve target-tagged original prompts and one provisional anchor, preserves the 9/33/60 ontology, version-3 scorer, 20-facet geometry, answer/share contracts, contextual-only boundary, and quarantined research bank, and makes no ontology addition, reparenting, demotion, cognitive review, respondent study, simulation substitute, or psychometric claim.

### Verification evidence

| Check | Status | Evidence |
|---|---|---|
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Unit tests | PASS | `npm run test:run -- --reporter=dot`; 53/53 |
| Research coverage | PASS | 600 prompts, 200 per layer, 44 dedicated-scored targets, 58 catalog-only, 5 contextual-only, 12 registry-only, 1,428 quarantined candidates, zero validation errors |
| Anchor reachability | PASS | All 44 production anchors have 4/4/4 target blocks and isolated routing; Maoism ranks 2/14/1 by layer and 1 combined in the full diagnostic fixture |
| Production build | PASS | `npm run build`; existing Vite large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high`; zero vulnerabilities |
| Share capacity | PASS | Complete v22 answer fragment measures 39,059 characters under the finite 40,960-character guard |
| Local browser QA | PASS | Full serial suite: 10/10 with one worker; the previously flaky isolated long-share scenario also passed 1/1 when rerun in isolation |
| Docker Compose and image | PASS | Compose config passed; no-cache `frontend/Dockerfile` image build passed and the frontend container was recreated |
| Docker health | PASS | `/healthz` returned `ok` on port 8001 |
| Docker-backed QA | PASS | `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot`; 10/10 |
| Documentation/state | PASS | README, root and precision WorkPM records, source map, methodology, results boundary, Zeus state/report/log, and conversation record synchronized; state JSON and whitespace checks pass |

### Conclusion

The Maoism prompts and anchor remain provisional editorial measurement. The isolated reachability fixture closes all three layers; full-production overlap and ranks are structural diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized and uncommitted; no commit or push was performed.

## Current v23 continuation verification — Council Communism — 2026-08-27

| Check | Status | Notes |
|---|---|---|
| `npm run research:coverage --silent` | PASS | 612 questions; 204 per layer; 45 dedicated-scored, 57 catalog-only, five contextual-only, and 12 registry-only targets; 1,428 candidates; 119 profiles/audits; zero validation errors |
| `npm run research:anchor-reachability --silent` | PASS | All 45 anchors have 4/4/4 target blocks and isolated routing; full-production top-three is 42.9630% by layer and 51.1111% combined, with worst ranks 42 and 38; Council Communism ranks 12/3/1 by layer and 1 combined |
| `npx tsc --noEmit --pretty false` | PASS | Typecheck completed without errors |
| `npm run test:run -- --reporter=dot` | PASS | 54/54 tests passed |
| `npm run build` | PASS | Vite build completed; existing large-client-chunk advisory remains |
| `npm audit --audit-level=high` | PASS | 0 vulnerabilities reported |
| Share capacity regression | PASS | Complete v23 answer fragment measured 39,859 characters under the finite 40,960-character guard |
| Local browser QA | PASS | 10/10 Playwright scenarios passed with one worker |
| Docker Compose/image/health | PASS | Compose config, no-cache image rebuild, recreation, `/healthz=ok`, and healthy container on port 8001 |
| Docker-backed QA | PASS | 10/10 Playwright scenarios passed against the rebuilt image |
| State/documentation/whitespace | PASS | v23 records synchronized; state JSON parses and source/docs whitespace checks pass |

The 12 v23 prompts and provisional anchor are source-backed editorial additions, not validated respondent measures or political recommendations. Council Communism remains a bounded existing ontology node; the 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity evidence, invariance study, empirical validation, or population evidence was run or claimed. The repository remains initialized but uncommitted; no commit or push was performed.

## v28 WorkPM verification — Anarcho-Pacifism

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | Content version 28; 672 prompts; 224 per layer; 50 dedicated-scored targets; 52 catalog-only targets; 5 contextual-only targets; 12 registry-only entries; 1,428 candidates; zero validation errors. |
| Anarcho-Pacifism branch | PASS | Existing `Anarchism → Social Anarchism → Anarcho-Pacifism` path; 4/4/4 target-tagged prompts; source-linked provisional anchor; dedicated-scored status. |
| Anchor reachability | PASS | 50 production anchors close at 4/4/4; Anarcho-Pacifism isolated in all layers; full ranks 12/5/2 and 1 combined; aggregate rates 37.3333% and 52.0000%; worst ranks 47/44. |
| Share compatibility | PASS | Readable v1 complete representation 43,699 characters, above the 40,960 guard; compact v2 complete fragment 7,222 characters; v1 decode and fail-closed validation preserved. |
| Unit/type/build | PASS | 59/59 unit tests, `npx tsc --noEmit --pretty false`, and `npm run build`. |
| Security/dependency | PASS | `npm audit --audit-level=high` reported zero vulnerabilities. |
| Browser QA | PASS | Local serial suite 10/10 and Docker-backed serial suite 10/10. |
| Docker delivery | PASS | Compose configuration, no-cache frontend rebuild, forced recreation, health status, and `/healthz` passed. |
| Evidence boundary | PASS_WITH_HOLD | Academic sources support terminology, historical variation, and authoring boundaries only. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity, invariance, empirical validation, or population evidence was run. |

The repository remains initialized and uncommitted; no commit or push was performed. The 50 production branches are not a claim that the 102 canonical micro nodes are comprehensively measured.

## V59 verification — Qutbism micro branch

The V59 continuation adds provisional direct coverage for the existing canonical `Islamism → Qutbism` micro branch after the OUP/T&F source comparison. Toth, Khatab, Faradj, Wagemakers, and existing Qutb/Islamism records support a historically situated, internally contested boundary around divine sovereignty/`jahiliyya`, comprehensive moral order, disciplined transformation, and varied revolutionary or reformist reception. The sources support authoring boundaries only; they do not validate respondent interpretation or empirical classification.

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | 1,044 questions; 348 per layer; 81 dedicated-scored; 21 canonical catalog-only; five contextual-only; 12 registry-only; 1,428 candidates across 119 targets; zero validation errors |
| Qutbism direct branch | PASS | Existing `Islamism → Qutbism` path; twelve target-tagged prompts at 4/4/4; one provisional anchor; four neighbor discriminants; no node added or reparented |
| Reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 3/48/3 and 10 combined; aggregate rates 25.5144% and 41.9753%; worst ranks 77 and 70; deterministic overlap diagnostics only |
| Unit/type/build/share | PASS | 77/77 tests; TypeScript; Vite build with existing large-client-chunk advisory; compact v2 share 11,249 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10 in 1m21s, Docker Playwright 10/10 in 1m14s |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger continues to report Qutbism as promote-to-canonical with governance `resultingScoringStatus: catalog-only`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, and the comprehensive goal remains open. The V59 delta is uncommitted after the earlier V58 baseline commit `6f2b744`; no push occurred because no remote is configured.

## V60 verification — Radical Republicanism micro branch

The V60 continuation adds provisional direct coverage for the existing canonical `Republicanism → Historical Republicanism → Radical Republicanism` micro branch after the Oxford/Cambridge/APSR/T&F source comparison. These sources support terminology, variation, boundary controls, and original authoring only; they do not validate respondent interpretation or empirical classification.

| Check | Status | Evidence |
|---|---|---|
| Radical Republicanism direct branch | PASS | Existing canonical path; twelve target-tagged prompts at 4/4/4; one provisional anchor; two neighbor discriminants; no node added or reparented |
| Research coverage | PASS | 1,056 questions; 352 per layer; 82 dedicated-scored; 20 canonical catalog-only; five contextual-only; 12 registry-only; 1,428 candidates across 119 targets; zero validation errors |
| Reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 10/8/6 and 4 combined; aggregate rates 25.2033% and 41.4634%; worst ranks 78 and 72; deterministic overlap diagnostics only |
| Unit/type/build/share | PASS | 77/77 tests; TypeScript; Vite build with existing large-client-chunk advisory; compact v2 share 11,393 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10, Docker Playwright 10/10 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Radical Republicanism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, twenty canonical targets remain catalog-only, and the comprehensive goal remains open. The V60 delta is uncommitted after baseline `6f2b744`; no push occurred because no remote is configured.

## V61 verification — Marxist Feminism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Four fresh academic records; existing `Socialist / Marxist Feminism → Marxist Feminism` path; plural class-gender and production-reproduction boundary; no topology change |
| Production contract | PASS | Content version 61; 1,068 prompts at 356 per layer; 88 editorial anchors; 83 canonical scoring anchors; 19 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Marxist Feminism has twelve direct prompts at 4/4/4 |
| Structural reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 3/15/2 and 1 combined; aggregate top-three rates 25.3012% and 42.1687%; worst ranks 79 and 73; diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 11,537 characters and round-trip |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Marxist Feminism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, nineteen canonical targets remain catalog-only, and the comprehensive goal remains open. Docker/build/browser delivery checks are run in the V61 closure pass; the V61 delta is currently uncommitted and no push is authorized without a configured remote.

## V62 verification — Socialist Feminism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Three fresh academic records; existing `Socialist / Marxist Feminism → Socialist Feminism` path; plural patriarchy-class/social-reproduction boundary; no topology change |
| Production contract | PASS | Content version 62; 1,080 prompts at 360 per layer; 89 editorial anchors; 84 canonical scoring anchors; 18 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Socialist Feminism has twelve direct prompts at 4/4/4 |
| Structural reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 2/70/65 and 1 combined; aggregate top-three rates 24.2063% and 41.6667%; worst ranks 80 and 73; diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 11,681 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10, Docker Playwright 10/10 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Socialist Feminism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, eighteen canonical targets remain catalog-only, and the comprehensive goal remains open. The V62 delta is currently uncommitted and no push is authorized without a configured remote.

## V63 verification report — Left-Wing Populism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Two fresh academic records plus existing Oxford/Cambridge populism sources; existing `Populism → Left-Wing Populism` path; contested left-egalitarian-host boundary; no topology change |
| Production contract | PASS | Content version 63; 1,092 prompts at 364 per layer; 90 editorial anchors; 85 canonical scoring anchors; 17 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Left-Wing Populism has twelve direct prompts at 4/4/4 |
| Structural reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 9/27/16 and 10 combined; aggregate top-three rates 23.1373% and 41.1765%; worst ranks 81 and 74; diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 11,825 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Left-Wing Populism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, seventeen canonical targets remain catalog-only, and the comprehensive goal remains open. The V63 delta is currently uncommitted and no push remote is configured.

## V64 verification report — Neoconservatism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Two fresh academic records plus existing Oxford conservatism/political-ideologies sources; existing `Conservatism → Neoconservatism` path; historically situated moral-order/republican-democratic/public-authority boundary; no topology change |
| Production contract | PASS | Content version 64; 1,104 prompts at 368 per layer; 91 editorial anchors; 86 canonical scoring anchors; 16 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Neoconservatism has twelve direct prompts at 4/4/4, profile, two discriminants, and false-positive audit |
| Structural reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 27/28/5 and 7 combined; aggregate top-three rates 23.2558% and 40.6977%; worst ranks 82 and 75; diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 11,969 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, no-cache Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Neoconservatism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Fascism and Neo-Fascism remain high-risk catalog-only holds, sixteen canonical targets remain catalog-only, and the comprehensive goal remains open. The curated-bank validator's target-map setup was optimized after a timeout-prone validation run; the optimized full suite passed. The V64 delta is uncommitted and no push remote is configured.
## V65 verification report — Paleoconservatism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Two fresh academic records plus the existing Dougall source and conservatism/national-conservatism sources; existing Conservatism → Paleoconservatism path; historically situated national-particularity/inherited-culture/local-authority/restraint boundary; no topology change |
| Production contract | PASS | Content version 65; 1,116 prompts at 372 per layer; 92 editorial anchors; 87 canonical scoring anchors; 15 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Paleoconservatism has twelve direct prompts at 4/4/4, profile, two discriminants, and false-positive audit |
| Structural reachability | PASS_WITH_HOLD | Isolated 4/4/4 routing; full ranks 12/48/1 and 6 combined; aggregate top-three rates 23.7548% and 40.2299%; worst ranks 83 and 76; diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 12,113 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, no-cache Docker rebuild/recreate, healthy container, /healthz ok, local Playwright 10/10, and Docker-backed Playwright 10/10 passed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Paleoconservatism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live dataset target is separately dedicated-scored. Fascism and Neo-Fascism remain high-risk catalog-only holds, fifteen canonical targets remain catalog-only, and the comprehensive goal remains open. Although isolated routing is complete, the full-competition reachability row reports combinedReachable false with descriptive and normative missing fields; because direct coverage is complete and validationErrors/failures are empty, this remains a structural geometry diagnostic rather than a claim that item coverage is missing. The V65 delta is uncommitted and no push remote is configured.

## V66 verification report — Wasatiyya micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Three fresh academic records plus the existing Cambridge Wasatiyya source and Islamism context; existing Islamism → Wasatiyya path; contested middle-way Islamist/public-order/citizenship boundary; no topology change |
| Production contract | PASS | Content version 66; 1,128 prompts at 376 per layer; 93 editorial anchors; 88 canonical scoring anchors; 14 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Wasatiyya has twelve direct prompts at 4/4/4, profile, two discriminants, and false-positive audit |
| Structural reachability | PASS_WITH_HOLD | Wasatiyya isolated-reachable in all three layers; full ranks 26/30/32 and 28 combined; aggregate top-three rates 22.3485% and 39.7727%, worst ranks 84 and 77; geometry diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 77/77; complete compact v2 fragment 12,257 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, no-cache Docker rebuild/recreate, healthy container, /healthz ok, local Playwright 10/10, and Docker-backed Playwright 10/10 passed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Wasatiyya as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live dataset target is separately dedicated-scored. Fourteen canonical targets remain catalog-only, with Fascism and Neo-Fascism still high-risk holds. Full-competition non-reachability remains a structural geometry diagnostic because direct coverage is complete and validationErrors/failures are empty; it is not respondent evidence or a reason for uncalibrated coefficient changes. The V66 delta remains uncommitted and no push remote is configured.

## V67 verification report — Right-Wing Populism micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Two fresh academic records plus existing Cambridge/Oxford populism records; existing `Populism → Right-Wing Populism` path; joint people–elite/right-host boundary; no topology change |
| Production contract | PASS | Content version 67; 1,140 prompts at 380 per layer; 94 editorial anchors; 89 canonical scoring anchors; 13 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Right-Wing Populism has twelve direct prompts at 4/4/4, profile, two discriminants, and false-positive audit |
| Structural reachability | PASS_WITH_HOLD | Right-Wing Populism is isolated-reachable in all three layers; full ranks 8/21/3 and 4 combined; aggregate top-three rates 22.0974% and 38.2022%, worst ranks 85 and 78; geometry diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 78/78; complete compact v2 fragment 12,401 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, no-cache Docker rebuild/recreate, healthy container, /healthz ok, local Playwright 10/10, and Docker-backed Playwright 10/10 |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Right-Wing Populism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live dataset target is separately dedicated-scored. Thirteen canonical targets remain catalog-only, with Fascism and Neo-Fascism still high-risk holds. Full-competition non-reachability in the descriptive and normative fields remains a structural geometry diagnostic because direct coverage is complete and validationErrors/failures are empty; it is not respondent evidence or a reason for uncalibrated coefficient changes. The V67 delta remains uncommitted and no push remote is configured.
## V68 verification report — Hindutva micro branch

| Check | Status | Evidence |
|---|---|---|
| Source and ontology boundary | PASS_WITH_HOLD | Three fresh academic records plus existing Hindutva/nationalism/religious-nationalism sources; existing `Religious Nationalism → Hindutva (Hindu Nationalism)` path; historically specific political-project boundary; no topology change |
| Production contract | PASS | Content version 68; 1,152 prompts at 384 per layer; 95 editorial anchors; 90 canonical scoring anchors; 12 canonical catalog-only targets |
| Research-bank coverage | PASS | 1,428 effect-free candidates across 119 targets; zero coverage validation errors; Hindutva has twelve direct prompts at 4/4/4, profile, two discriminants, and false-positive audit |
| Structural reachability | PASS_WITH_HOLD | Hindutva isolated-reachable in all three layers; full ranks 10/81/3 and 6 combined; aggregate top-three rates 21.8519% and 38.8889%, worst ranks 85 and 78; geometry diagnostics only |
| Unit/type/share | PASS | TypeScript passed; Vitest 79/79; complete compact v2 fragment 12,545 characters and round-trip |
| Security and delivery | PASS | High-severity npm audit has zero findings; Compose config, no-cache Docker rebuild/recreate, healthy container, `/healthz` `ok`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run |

The taxonomy ledger retains Hindutva (Hindu Nationalism) as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Twelve canonical targets remain catalog-only, with Fascism and Neo-Fascism still high-risk holds. Full-competition non-reachability in the descriptive and normative fields remains a structural geometry diagnostic because direct coverage is complete and validationErrors/failures are empty; it is not respondent evidence or a reason for uncalibrated coefficient changes. The V68 delta remains uncommitted and no push remote is configured.


## V69 verification record — Religious Zionism micro branch

| Check | Status | Evidence |
| --- | --- | --- |
| Direct coverage | PASS | Religious Zionism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4; ontology path remains canonical under Religious Nationalism. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 91 dedicated-scored and 11 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 91 production anchors close under isolated 4/4/4 routing; Religious Zionism ranks 74/84/17 by layer and 24 combined in full competition, with aggregate rates 22.3443% and 39.5604% and worst ranks 86 and 79. |
| Unit/type/build | PASS | `npm exec -- tsc --noEmit`, `npm run test:run` 80/80, and `npm run build` passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 12,689 characters, round-trips, and remains under the 40,960-character finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | High-severity npm audit, Compose config, no-cache Docker build/recreate/health, `/healthz`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Religious Zionism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Eleven canonical targets remain catalog-only, with Fascism and Neo-Fascism still high-risk holds. Full-competition non-reachability is a structural geometry diagnostic because direct coverage is complete and validationErrors/failures are empty; it is not respondent evidence or a reason for uncalibrated coefficient changes. The V69 delta remains uncommitted and no push remote is configured.

## V70 verification — Neo-Fascism meso branch

| Check | Status | Notes |
| --- | --- | --- |
| Direct coverage | PASS | Neo-Fascism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4 on the existing Fascism path. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 92 dedicated-scored and 10 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 92 production anchors close under isolated 4/4/4 routing; Neo-Fascism ranks 3/1/1 by layer and 1 combined in full competition, with aggregate rates 21.7391% and 38.0435% and worst ranks 87 and 80. |
| Unit/type/build | PASS | npm exec -- tsc --noEmit, npm run test:run 81/81, and npm run build passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 12,833 characters, round-trips, and remains under the finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | High-severity npm audit, Compose config, fresh no-cache Docker build/recreate/health, /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Neo-Fascism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; the live dataset target is separately dedicated-scored. Ten canonical targets remain catalog-only, including Fascism and Neo-Nazism. Full-competition non-reachability is a structural geometry diagnostic because direct coverage is complete and validationErrors/failures are empty; it is not respondent evidence or a reason for uncalibrated coefficient changes. The comprehensive goal remains open.

## V71 verification — Falangism micro branch

| Check | Status | Notes |
| --- | --- | --- |
| Direct coverage | PASS | Falangism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4 on the existing Fascism path. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 93 dedicated-scored and 9 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 93 production anchors close under isolated 4/4/4 routing; Falangism ranks 2/1/1 by layer and 1 combined, with aggregate rates 22.9391% and 39.7849% and worst ranks 88 and 81. |
| Unit/type/build | PASS | npm exec -- tsc --noEmit, npm run test:run 82/82, and npm run build passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 12,977 characters, round-trips, and remains under the finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | High-severity npm audit, Compose config, fresh no-cache Docker build/recreate/health, /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Falangism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Nine canonical targets remain catalog-only, including Fascism and Neo-Nazism. Full-competition values remain deterministic geometry diagnostics because direct coverage is complete and validationErrors/failures are empty; they are not respondent evidence or a reason for uncalibrated coefficient changes. The comprehensive goal remains open.

## V72 verification — Brazilian Integralism micro branch

| Check | Status | Notes |
| --- | --- | --- |
| Source and boundary repair | PASS | Four direct historical/research records now support the existing Brazilian Integralism path; direct wording preserves Brazilian translation, transnational circulation, religious-cultural language, corporative mediation, movement/state variation, and postwar reinterpretation. |
| Direct coverage | PASS | Brazilian Integralism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4 on the existing Fascism path. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 94 dedicated-scored and 8 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 94 production anchors close under isolated 4/4/4 routing; Brazilian Integralism ranks 3/2/1 by layer and 1 combined, with aggregate rates 24.1135% and 39.3617% and worst ranks 89 and 81. These are deterministic geometry diagnostics only. |
| Unit/type/build | PASS | `npm exec -- tsc --noEmit`, `npm run test:run` 83/83, and `npm run build` passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 13,121 characters, round-trips, and remains under the finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | High-severity npm audit reported zero vulnerabilities; Compose config, fresh no-cache `frontend/Dockerfile` build, forced recreation, healthy `/healthz`, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Brazilian Integralism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Eight canonical targets remain catalog-only, including Fascism and Neo-Nazism. Full-competition values remain deterministic geometry diagnostics because direct coverage is complete and validationErrors/failures are empty; they are not respondent evidence or a reason for uncalibrated coefficient changes. The comprehensive goal remains open.

## V73 verification — Integral Nationalism cross-case historical category

| Check | Status | Notes |
| --- | --- | --- |
| Source and boundary comparison | PASS | Five fresh academic records support a bounded cross-case historical category associated with Maurrasian national absolutism and varied Egyptian, Ukrainian, Georgian, and fascist-synthesis applications; sources are used for authoring and provenance, not validation. |
| Direct coverage | PASS | Integral Nationalism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4 on the existing Nationalism path. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 95 dedicated-scored and 7 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 95 production anchors close under isolated 4/4/4 routing; Integral Nationalism ranks 9/2/1 by layer and 1 combined, with aggregate rates 25.2632% and 40% and worst ranks 90 and 82. These are deterministic geometry diagnostics only. |
| Unit/type/build | PASS | npm exec -- tsc --noEmit, npm run test:run 84/84, and npm run build passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 13,265 characters, round-trips, and remains under the finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | npm audit --audit-level=high reported zero vulnerabilities; Compose config, fresh no-cache frontend/Dockerfile build, forced recreation, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Integral Nationalism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Seven canonical targets remain catalog-only, including Fascism and Neo-Nazism. Full-competition values remain deterministic geometry diagnostics because direct coverage is complete and validationErrors/failures are empty; they are not respondent evidence or a reason for uncalibrated coefficient changes. The comprehensive goal remains open.

## V74 verification record — Legionary Fascism micro branch

| Check | Status | Evidence |
| --- | --- | --- |
| Source and boundary comparison | PASS | Four fresh academic records support a historically bounded Romanian Legionary Fascism case spanning political faith, religious-national public doctrine, organization, movement/state relations, law, sovereignty, social formation, and period variation; sources are used for authoring and provenance, not validation. |
| Direct coverage | PASS | Legionary Fascism has 12 target-tagged prompts at descriptive/normative/prescriptive 4/4/4 on the existing Fascism path. |
| Research coverage | PASS | 119 targets, 1,428 quarantined candidates, 119 profiles/audits, zero validation errors; 96 dedicated-scored and 6 canonical catalog-only targets. |
| Structural reachability | PASS_WITH_HOLD | All 96 production anchors close under isolated 4/4/4 routing; Legionary Fascism ranks 1/1/2 by layer and 1 combined, with aggregate rates 25.6944% and 41.6667% and worst ranks 91 and 83. These are deterministic geometry diagnostics only. |
| Unit/type/build | PASS | npm exec -- tsc --noEmit, npm run test:run 85/85, and npm run build passed; Vite retains the existing large-client-chunk advisory. |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 13,409 characters, round-trips, and remains under the finite guard; version 1 decoding and fail-closed malformed/oversized handling remain covered. |
| Dependency/container/browser | PASS | npm audit --audit-level=high reported zero vulnerabilities; Compose config, fresh no-cache frontend/Dockerfile build, forced recreation, healthy /healthz, local Playwright 10/10, and Docker-backed Playwright 10/10 passed. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Legionary Fascism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; the live dataset target is separately `dedicated-scored`. Six canonical targets remain catalog-only: Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. Full-competition values remain deterministic geometry diagnostics because direct coverage is complete and validationErrors/failures are empty; they are not respondent evidence or a reason for uncalibrated coefficient changes. The comprehensive goal remains open.

## V75 verification — Fascism macro family

| Check | Status | Evidence |
| --- | --- | --- |
| Focused research/scoring/share | PASS | 86/86 Vitest tests; dataset/share contracts updated to 1,236 questions, 412 per layer, and 13,553-character compact v2 output. |
| Research coverage | PASS | `npm run research:coverage`; 119 targets, 1,428 effect-free candidates, 119 profiles/audits, and zero validation errors. |
| Anchor reachability | PASS | `npm run research:anchor-reachability`; 97 production anchors, zero failures, Fascism isolated-reachable in all layers, full ranks 3/1/1 and 1 combined. |
| TypeScript/build | PASS | `npx tsc --noEmit` and `npm run build`; existing >500 kB client chunk advisory remains. |
| Dependency audit | PASS | `npm audit --omit=dev --audit-level=high`; zero vulnerabilities. |
| Compose/Docker/health | PASS | Compose config, fresh `docker build --no-cache -f frontend/Dockerfile ...`, forced recreation, healthy container, `/healthz` returned `ok`. |
| Browser QA | PASS | Local `npm run qa` 10/10 and `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` 10/10. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Fascism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Five canonical targets remain catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes. The comprehensive goal remains open.

## V76 verification — White Nationalism high-risk racial-national boundary

| Check | Status | Evidence |
| --- | --- | --- |
| Focused research/scoring/share | PASS | 87/87 Vitest tests; dataset/share contracts updated to 1,248 questions, 416 per layer, and 13,697-character compact v2 output. |
| Research coverage | PASS | `npm run research:coverage`; 119 targets, 1,428 effect-free candidates, 119 profiles/audits, and zero validation errors. |
| Anchor reachability | PASS | `npm run research:anchor-reachability`; 98 production anchors, zero failures, White Nationalism isolated-reachable in all layers, full ranks 29/5/3 and 2 combined. |
| TypeScript/build | PASS | `npx tsc --noEmit` and `npm run build`; existing >500 kB client chunk advisory remains. |
| Dependency audit | PASS | `npm audit --omit=dev --audit-level=high`; zero vulnerabilities. |
| Compose/Docker/health | PASS | Compose config, fresh `docker build --no-cache -f frontend/Dockerfile ...`, forced recreation, healthy container, `/healthz` returned `ok`. |
| Browser QA | PASS | Local `npm run qa` 10/10 and `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa` 10/10. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains White Nationalism as canonical with `retain-canonical` and governance `resultingScoringStatus: scored-provisional`; live measurement is separately `dedicated-scored`. Four canonical targets remain catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, and Third Positionism. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes. The comprehensive goal remains open.


## V77 verification — Neo-Nazism postwar continuity and adaptation

| Check | Status | Notes |
| --- | --- | --- |
| Focused research/scoring/share | PASS | Focused research, scoring, and share tests passed 88/88; 1,260 prompts at 420 per layer; compact v2 fragment is 13,841 characters. |
| Research coverage | PASS | 107 ontology nodes, 12 registry entries, 99 dedicated-scored targets, 3 canonical catalog-only targets, 1,428 effect-free candidates across 119 targets, and zero validation errors. |
| Anchor reachability | PASS | 99 production anchors, zero validation or structural-closure failures; Neo-Nazism is isolated-reachable in all layers, with full ranks 6/1/4 and 1 combined. |
| TypeScript/build | PASS | npx tsc --noEmit and npm run build; the existing greater-than-500 kB client chunk advisory remains. |
| Dependency audit | PASS | npm audit --omit=dev --audit-level=high; zero vulnerabilities. |
| Compose/Docker/health | PASS | Compose config, fresh docker build --no-cache -f frontend/Dockerfile ..., forced recreation, healthy container, and /healthz returning ok. |
| Browser QA | PASS | Serial local npm run qa -- --workers=1 10/10 and E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --reporter=dot 10/10; isolated local share-flow rerun 1/1. |
| Evidence boundary | PASS_WITH_HOLD | No cognitive review, respondent study, substitute simulation, psychometric, reliability/validity, invariance, empirical, or population evidence was run. |

The taxonomy ledger retains Neo-Nazism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Three canonical targets remain catalog-only: Revolutionary Islamism, Salafi-Jihadism, and Third Positionism. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes. The comprehensive goal remains open.

## V78 verification record — Revolutionary Islamism

The V78 data and research-bank contracts pass with 1,272 questions at 424 per layer, 105 editorial anchors, 100 production anchors, 100 dedicated-scored targets, 2 canonical catalog-only targets, 1,428 quarantined candidates, and 119 research targets. The source comparison and metadata validate the presence of provenance, historical/contextual boundaries, 4/4/4 direct coverage, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile as editorial research artifacts; they do not validate the local measure.

The anchor reachability audit reports zero validation errors and zero failures, with Revolutionary Islamism isolated-reachable in all three layers and combined. Its full-competition ranks are 32/1/2 and 1 combined; aggregate top-three rates are 27.3333% by layer and 49.0000% combined, with worst ranks 94 and 87. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes.

The taxonomy ledger retains Revolutionary Islamism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Two canonical targets remain catalog-only: Salafi-Jihadism and Third Positionism. No cognitive review, respondent study, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied; the comprehensive goal remains open.

## V79 verification record — Third Positionism postwar far-right boundary

The V79 data and research-bank contracts pass with 1,284 questions at 428 per layer, 106 editorial anchors, 101 production anchors, 101 dedicated-scored targets, 1 canonical catalog-only target, 1,428 quarantined candidates, and 119 research targets. The source comparison and metadata validate the presence of provenance, historical/contextual boundaries, 4/4/4 direct coverage, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile as editorial research artifacts; they do not validate the local measure.

The anchor reachability audit reports zero validation errors and zero failures, with Third Positionism isolated-reachable in all three layers and combined. Its full-competition ranks are 13/2/1 and 2 combined; aggregate top-three rates are 27.7228% by layer and 49.5050% combined, with worst ranks 95 and 88. The production report's `missingLayers: ["descriptive"]` is a top-three-overlap diagnostic, not an isolated routing failure; isolated missing layers are empty. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes.

The taxonomy ledger retains Third Positionism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Salafi-Jihadism is the sole remaining canonical catalog-only target. TypeScript, the full 90/90 Vitest suite, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Compact v2 share round-trip is 14,129 characters. No cognitive review, respondent study, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied; the comprehensive goal remains open.

## V80 verification record — Salafi-Jihadism high-risk doctrinal boundary

The V80 data and research-bank contracts pass with 1,296 questions at 432 per layer, 107 editorial anchors, 102 production anchors, 102 dedicated-scored targets, no canonical catalog-only targets, 1,428 quarantined candidates, and 119 research targets. The source comparison and metadata validate the presence of provenance, historical/contextual boundaries, 4/4/4 direct coverage, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile as editorial research artifacts; they do not validate the local measure.

The anchor reachability audit reports zero validation errors and zero failures, with Salafi-Jihadism isolated-reachable in all three layers and combined. Its full-competition ranks are 13/1/2 and 1 combined; aggregate top-three rates are 28.7582% by layer and 50.9804% combined, with worst ranks 96 and 89. The production top-three missing descriptive layer is an overlap diagnostic, not an isolated routing failure; isolated missing layers are empty. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes.

The taxonomy ledger retains Salafi-Jihadism as canonical with retain-canonical and governance resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. Five contextual anchors and 12 registry-only targets remain outside production scoring. TypeScript, the full 90/90 Vitest suite, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Compact v2 share round-trip is 14,273 characters. No cognitive review, respondent study, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied; the comprehensive goal remains open.
## V81 verification record — Revisionist / Bernsteinian Social Democracy historical microtype

The V81 data and research-bank contracts pass with 1,308 questions at 436 per layer, 108 editorial anchors, 103 production anchors, 103 dedicated-scored targets, five contextual-only targets, 11 registry-only targets, 1,428 quarantined candidates, and 119 research targets. The source comparison and metadata establish a historically situated, internally varied Bernsteinian/revisionist boundary with 4/4/4 direct coverage, eight direct source references, four neighbor discriminants, a false-positive audit, and a 17-dimension qualitative profile as editorial research artifacts; they do not validate the local measure.

The anchor reachability audit reports zero validation errors and zero failures, with Revisionist / Bernsteinian Social Democracy isolated-reachable in all three layers and combined. Its full-competition ranks are 21/82/3 and 3 combined; aggregate top-three rates are 28.4790% by layer and 51.4563% combined, with worst ranks 97 and 90. The production top-three descriptive and normative misses are overlap diagnostics; isolated missing layers are empty. Full-competition values remain deterministic geometry diagnostics and do not justify uncalibrated coefficient changes.

The taxonomy ledger records the new microtype as canonical with a promote-to-canonical decision and resultingScoringStatus scored-provisional; live measurement is separately dedicated-scored. TypeScript, the full 91/91 Vitest suite, build, high-severity audit, coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, and Docker-backed Playwright 10/10 passed. Compact v2 share round-trip is 14,417 characters. No cognitive review, respondent study, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied; the comprehensive goal remains open.

## V82 verification record — National-Syndicalism

V82 records the source-backed promotion of National-Syndicalism to the canonical `Fascism → National-Syndicalism` micro path. Coverage reports 1,320 production prompts at 440 per layer, 109 editorial anchors, 104 production anchors, 109 ontology nodes, 10 registry entries, 104 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates, 119 research targets, and zero validation errors. The target has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, a twelve-dimension profile, four neighbor discriminants, and a false-positive audit.

National-Syndicalism is isolated-reachable in every layer and combined; full ranks are 9/2/1 and 1 combined, aggregate top-three rates are 28.2051% and 52.8846%, worst ranks are 98 and 91, and compact v2 complete-answer output is 14,561 characters. These are deterministic geometry diagnostics only. `npx tsc --noEmit`, `npm run test:run` (92/92), `npm run build`, `npm audit --omit=dev --audit-level=high`, coverage, reachability, Compose config, fresh no-cache Docker build/recreate, healthy `/healthz`, local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` passed. The build retains the existing large-client-chunk advisory. No cognitive/respondent/psychometric/empirical/population evidence was run or implied; Civic Republicanism remains registry-only and the comprehensive goal remains open.


## V83 verification record — British Fascism historical microtype

V83 records the source-backed promotion of British Fascism to the canonical Fascism → British Fascism micro path. Coverage reports 1,332 production prompts at 444 per layer, 110 editorial anchors, 105 production anchors, 110 ontology nodes, 9 registry entries, 105 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and zero validation errors. The target has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, a twelve-dimension profile, four neighbor discriminants, and a false-positive audit.

The verified V83 contract is 1,332 production prompts (444 per layer), 110 editorial anchors, 105 production anchors, 110 ontology nodes, 9 registry entries, 105 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 14,705-character compact v2 fragment. British Fascism is isolated-reachable at 4/4/4 and combined; full-competition ranks are 13/2/3 by layer and 2 combined. Aggregate top-three rates are 27.9365% by layer and 52.3810% combined, with worst ranks 99 and 92. These are deterministic structural-overlap diagnostics only. Coverage and reachability report zero validation or structural-closure failures. TypeScript, 93/93 unit tests, Vite build, high-severity dependency audit, Compose configuration, fresh no-cache Docker build/recreate, healthy /healthz, serial local Playwright 10/10, Docker-backed Playwright 10/10, and git diff --check pass. The build retains the existing large-client-chunk advisory. No cognitive/respondent/psychometric/empirical/population evidence was run or implied; contextual and registry-only targets remain outside production scoring and the comprehensive goal remains open.
## V84 verification record — French Fascism historical microtype

V84 records the source-backed promotion of French Fascism to the canonical `Fascism → French Fascism` micro path. The target has five fresh academic source records, eight direct source references, twelve direct prompts at 4/4/4, one provisional anchor, four neighbor discriminants, a twelve-dimension qualitative profile, a false-positive audit, and explicit promotion governance. Its historical context covers interwar French movements through the Occupation while preserving organizational, regional, social-base, period, democratic/authoritarian, Vichy/collaboration, agrarian, Catholic, and imperial variation.

The verified contract is 1,344 production prompts (448 per layer), 111 editorial anchors, 106 production anchors, 111 ontology nodes, 8 registry entries, 106 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 14,849-character compact v2 fragment. French Fascism is isolated-reachable in descriptive, normative, and prescriptive layers. Full-production ranks are 18/4/4 by layer and 5 combined; aggregate top-three rates are 27.6729% by layer and 51.8868% combined, with worst ranks 100 and 93. These are deterministic structural-overlap diagnostics only.

All V84 verification gates pass: `npx tsc --noEmit`, `npm run test:run` (94/94), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage validation, reachability structural closure, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check`. The build retains the existing large-client-chunk advisory. No cognitive/respondent/psychometric/empirical/population evidence was run or implied; the comprehensive goal remains open.

## V87 verification record — Flemish / Belgian Fascism historical microtype

V87 records the source-backed promotion of Flemish / Belgian Fascism to the canonical `Fascism → Flemish / Belgian Fascism` micro path. The source comparison uses De Wever on Belgium and Catholicism/Fascism, Conway on Rexism and collaboration, van de Maele on technocratic planning, Dalle Mulle on Flanders and nationality questions, and Kunkeler/Hamre on Verdinaso and VNV, alongside existing Belgian and comparative Fascism context. These sources support a historically bounded, internally varied, contested field through 1945; they support terminology, provenance, boundary design, and false-positive controls only.

The verified contract contains 1,380 production prompts (460 per layer), 114 editorial anchors, 109 production anchors, 114 ontology nodes, 5 registry entries, 109 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,281-character compact v2 fragment. Flemish / Belgian Fascism has twelve direct prompts at 4/4/4, nine direct source references, one provisional anchor, four neighbor discriminants, a 17-dimension qualitative profile, a false-positive audit, and explicit promote-to-canonical governance. It is isolated-reachable in all three layers and combined; full-production ranks are 7/8/4 by layer and 2 combined. Aggregate top-three rates are 29.0520% by layer and 54.1284% combined, with worst ranks 103 and 96. These are deterministic structural-overlap diagnostics only; no scorer or picker retuning was justified.

All V87 verification gates pass: `npx tsc --noEmit`, `npm run test:run` (97/97), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage validation, reachability structural closure, Compose configuration, fresh no-cache Docker build, Compose recreation with healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` after documentation synchronization. The build retains the existing large-client-chunk advisory. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Five contextual placements and five registry-only targets remain outside production scoring; the comprehensive goal remains open.

## V86 verification record — Japanese Fascism historical microtype

V86 records the source-backed promotion of Japanese Fascism to the canonical `Fascism → Japanese Fascism` micro path. The source comparison uses [Fletcher's study of intellectuals and Fascism in early Shōwa Japan](https://www.cambridge.org/core/journals/journal-of-asian-studies/article/abs/intellectuals-and-fascism-in-early-showa-japan/24375A72B18397DE8C6D19247A1E165B), [Hofmann's comparative study of Japan and Italy](https://academic.oup.com/cornell-scholarship-online/book/24047), [Young's analysis of fascism and empire in Japanese-occupied Manchuria](https://www.cambridge.org/core/journals/journal-of-global-history/article/when-fascism-met-empire-in-japaneseoccupied-manchuria/4D050824AA8EA411A0D9B1884935FB23), [Mimura's study of military Fascism and Manchukuo](https://academic.oup.com/cornell-scholarship-online/book/24122/chapter-abstract/185559288), and [Tsuzuki's account of Fascism, militarism, and thought control](https://academic.oup.com/book/7118/chapter-abstract/151649407), alongside existing Oxford Fascism context. These sources support a historically bounded, internally varied, and contested Japanese field; they support terminology, provenance, boundary design, and false-positive controls only.

The verified contract contains 1,368 production prompts (456 per layer), 113 editorial anchors, 108 production anchors, 113 ontology nodes, 6 registry entries, 108 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,137-character compact v2 fragment. Japanese Fascism has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, four neighbor discriminants, a 17-dimension qualitative profile, a false-positive audit, and explicit promote-to-canonical governance. It is isolated-reachable in all three layers and combined; full-production ranks are 11/7/3 by layer and 2 combined. Aggregate top-three rates are 28.7037% by layer and 53.7037% combined, with worst ranks 102 and 95. These are deterministic structural-overlap diagnostics only. `npx tsc --noEmit`, `npm run test:run` (96/96), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy container, `/healthz` returning `ok`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` all pass. The build retains the existing large-client-chunk advisory. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied.

## V85 verification record — Italian Fascism historical microtype

V85 records the source-backed promotion of Italian Fascism to the canonical `Fascism → Italian Fascism` micro path. The source comparison uses [Cerasi's study of corporative populism](https://www.cambridge.org/core/journals/modern-italy/article/they-the-people-italian-fascism-and-the-ambivalences-of-corporative-populism/D6421957129E36E8DB9A511D2B900B46), [Morgan's Oxford Handbook chapter on corporatism](https://academic.oup.com/edited-volume/34510/chapter-abstract/292825842), [Corner's study of the Fascist Party and popular opinion](https://academic.oup.com/book/10002), [Whittam's movement-to-regime transition study](https://www.cambridge.org/core/books/abs/fascist-italy/transition-from-coalition-to-regime-19221928/E02A8D60177929AAC0628E3316540A1A), and [Forlenza's account of fascism as political form](https://www.cambridge.org/core/journals/modern-italy/article/end-of-fascism/F3A25EAD5FCF3342AC693876A0B3649C), alongside existing Italian and Oxford context. These sources support a historically bounded, internally varied, and contested Italian movement-and-regime field; they support terminology, provenance, boundary design, and false-positive controls only.

The verified contract contains 1,356 production prompts (452 per layer), 112 editorial anchors, 107 production anchors, 112 ontology nodes, 7 registry entries, 107 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 14,993-character compact v2 fragment. Italian Fascism has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, four neighbor discriminants, a 17-dimension qualitative profile, a false-positive audit, and explicit promote-to-canonical governance. It is isolated-reachable in all three layers and combined; full-production ranks are 6/1/4 by layer and 1 combined. Aggregate top-three rates are 28.0374% by layer and 52.3364% combined, with worst ranks 101 and 94. The production top-three missing fields are overlap diagnostics, not isolated routing failures, and no scorer or picker retuning was justified.

All V85 verification gates pass: `npx tsc --noEmit`, `npm run test:run` (95/95), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage validation, reachability structural closure, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check`. The build retains the existing large-client-chunk advisory. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Five contextual anchors and 7 registry-only targets remain outside production scoring; the comprehensive goal remains open. The V85 delta remains uncommitted and no push remote is configured.

## V88 verification record — Agrarian Populism historical microtype

V88 records the source-backed promotion of Agrarian Populism to the canonical `Populism → Agrarian Populism` micro path. The source comparison uses Arter, Hajdu/Mamonova, Borras, Pattenden, and Mamonova/Franquesa, alongside existing populism context. The sources support a historically bounded rural or land-based people–elite construct tied to land, food, agricultural production, or rural political power; they support terminology, provenance, boundary design, and false-positive controls only. Rural identity, farmer status, localism, policy, tariffs, generic anti-elite sentiment, current actors, and private identity are not sufficient evidence.

The verified contract contains 1,392 production prompts (464 per layer), 115 editorial anchors, 110 production anchors, 115 ontology nodes, 4 registry entries, 110 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,425-character compact v2 fragment. Agrarian Populism has twelve direct prompts at 4/4/4, eight direct source references, one provisional anchor, four neighbor discriminants, a 17-dimension qualitative profile, a false-positive audit, and explicit promotion governance. It is isolated-reachable in every layer. The combined top-three diagnostic omits normative and prescriptive layers; full-competition output is recorded only as deterministic geometry diagnostics, and no scorer or picker retuning was justified.

All V88 verification gates pass: `npx tsc --noEmit`, `npm run test:run` (98/98), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage validation, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check`. The build retains the existing large-client-chunk advisory. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Four registry-only targets and five contextual placements remain outside production scoring; the comprehensive goal remains open.

## V89 verification record — Bioregionalism ecological microtype

V89 records the source-backed promotion of Bioregionalism from associated registry context to the provisional canonical `Ecologism / Green Ideology → Bioregionalism` micro path. The source comparison uses McTaggart, Hubbard et al., Wearne et al., and Waldenberger/Savini, alongside SEP Environmental Ethics and existing Ecologism and commons-governance context. The sources support place, scale, network, more-than-human, regenerative, participatory, justice, and accountable multi-level governance terminology and boundaries while preserving plurality and environmental-determinism/localist-bias cautions; they do not validate local wording, effects, vectors, respondent interpretation, reliability, validity, invariance, or empirical classification.

The verified data shape is 1,404 production prompts (468 per layer), 116 editorial anchors, 111 production anchors, 116 ontology nodes (9 macro / 38 total meso / 69 micro; 9 / 33 / 69 canonical), 3 registry entries, 111 dedicated-scored targets, five contextual-only targets, 1,428 quarantined candidates across 119 research targets, and a 15,569-character compact v2 fragment. Bioregionalism has twelve direct prompts at 4/4/4, seven direct source references, one provisional anchor, three neighbor discriminants, a seven-dimension profile, a false-positive audit, and explicit promote-to-canonical governance. Coverage and reachability report zero validation errors and zero isolated-reachability failures; the combined top-three diagnostic omits all three layers and is recorded only as deterministic geometry evidence.

All V89 verification gates pass: `npx tsc --noEmit`, `npm run test:run` (99/99), `npm run build`, `npm audit --omit=dev --audit-level=high` (zero vulnerabilities), coverage validation, reachability, Compose configuration, fresh no-cache Docker build/recreate, healthy `/healthz`, serial local Playwright 10/10, Docker-backed Playwright 10/10, and `git diff --check` after documentation synchronization. The build retains the existing large-client-chunk advisory. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied; three registry-only targets and five contextual placements remain outside production scoring, and the comprehensive goal remains open.

## V90 verification record — Civic Republicanism registry retention

The V90 delta refreshes Civic Republicanism provenance and governance while preserving the production contract. The source set includes the Cambridge Rawls Lexicon, Oxford Handbook of Republicanism, SEP Republicanism, and Tóth's 2025 Res Publica analysis. These sources support terminology, historical/contemporary variation, civic-virtue and participation boundaries, non-domination context, and the decision to retain the label as associated registry context; they do not validate local wording, effects, vectors, respondent interpretation, reliability, validity, invariance, or empirical classification.

Focused `src/research.test.ts` verification passes 75/75. The remaining V90 deterministic gates are required after documentation synchronization: TypeScript, full Vitest, build, production dependency audit, coverage, reachability, Compose/Docker, health, serial local and Docker-backed Playwright, and `git diff --check`. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied.

## V91 verification record — Conservative New Right registry retention

The V91 source and governance delta preserves the production contract while clarifying a contested label. The source set includes [Freeden's Oxford chapter on the conservative revival](https://doi.org/10.1093/019829414X.003.0011), [Williams's study of the New Right and British conservatism](https://doi.org/10.1080/13569317.2021.1979139), [Jackson's study of British New Right and neoliberal currents](https://doi.org/10.1093/ehr/cew237), [Bures's study of European New Right metapolitics](https://doi.org/10.1163/22116257-bja10055), [Drolet and Williams's study of European New Right geopolitics](https://doi.org/10.1177/13540661251327108), and [Gianoncelli's comparative study of New Right unification](https://doi.org/10.1177/2336825X211052967). The comparison supports a historically and geographically plural boundary spanning non-equivalent Anglo-American/British and European usages; it does not support a single scored respondent construct or an exclusive canonical parent.

The direct target remains a `contextual-formation` registry entry with registry-only/not-scored status, eight total source references including six fresh V91 records, twelve quarantined candidates at 4/4/4, a seven-dimension qualitative profile, three neighbor discriminants, and explicit `retain-registry-only` governance dated 2026-08-29. No canonical node, ancestry mutation, production question, numeric anchor, scorer path, current-party label, or respondent classification was added. The existing Conservatism, National Conservatism, Paleoconservatism, Neoconservatism, and Right-Wing Populism branches remain distinct. The aliases “New Right” and “European New Right” are lookup labels only, not equivalence claims.

The V91 deterministic gates pass: focused `src/research.test.ts` 76/76; full Vitest 100/100 across three files; `npx tsc --noEmit`; `npm run build`; `npm audit --omit=dev --audit-level=high` with zero vulnerabilities; `npm run research:coverage` with 1,404 prompts, 116 nodes, 3 registry entries, 1,428 candidates across 119 targets, and zero validation errors; `npm run research:anchor-reachability` with zero validation errors or reachability failures; fresh no-cache Docker build; Compose recreation; healthy `/healthz`; serial local Playwright 10/10; Docker-backed Playwright 10/10; and `git diff --check`. The build retains the existing large-client-chunk advisory. A first local QA attempt encountered transient Playwright screenshot/click timeouts; the targeted rerun passed 1/1 and the clean full rerun passed 10/10 in 5.5 minutes.

No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Three registry-only targets and five contextual placements remain outside production scoring, and the comprehensive-coverage goal remains open. No Git remote is configured, so the requested push still requires a user-provided remote target.

## V93 verification record — Georgism canonical meso promotion

The V93 source and governance delta adds a parentless canonical Georgism meso node, eight source records, twelve direct production prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a provisional anchor, a thirteen-dimension existing-facet profile, four neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. The source set supports a land/location-value, rent, natural-opportunity, socially created value, labor/improvement, and institutional-route boundary while preserving liberal, republican, socialist-adjacent, cooperative, ecological, urban, rural, national, international, and implementation variation. The shared facet schema and scoring policy remain unchanged; no dedicated land/rent facet was invented.

The V93 deterministic and delivery gates pass: focused research contracts passed 78/78 before the stabilized concurrent workstream completed; full Vitest passed 109/109 across four files; npx tsc --noEmit passed; npm run build passed; npm audit --omit=dev --audit-level=high reported zero vulnerabilities; research coverage reported 1,416 prompts, 117 ontology nodes, 112 production anchors, 3 registry-only targets, 5 contextual placements, 1,440 candidates across 120 targets, and zero validation errors; research anchor reachability reported zero validation/reachability failures and isolated Georgism routing in all three layers; the share regression passed 5/5 with a 15,713-character complete-answer fragment; docker compose config passed; a fresh no-cache Docker build passed; forced Compose recreation served /healthz as ok and reached healthy status; serial local Playwright passed 10/10; and clean Docker-backed Playwright passed 10/10. The build retains the existing large-client-chunk advisory.

The full checks ran with a separate uncommitted belief-profile/morphology workstream present in the working tree. That workstream is not part of the Georgism commit boundary and was not staged or modified by this tranche. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Full-production overlap remains a deterministic geometry diagnostic only; it does not authorize uncalibrated scorer, picker, threshold, coefficient, or anchor retuning. The comprehensive-coverage goal remains open, and no Git remote is configured, so push remains blocked until a user-provided remote target exists.

## V92 verification record — Deep Ecology associated-framework retention

The V92 source and governance delta preserves the production contract while strengthening the boundary around Deep Ecology as a plural philosophical and movement platform. The source set includes the [SEP environmental-ethics entry](https://plato.stanford.edu/archives/spr2014/entries/ethics-environmental/), [Drengson and Devall's movement account](https://trumpeter.athabascau.ca/index.php/trumpet/article/view/1191), the [MIT critical anthology](https://mitpress.mit.edu/9780262611497/beneath-the-surface/), [Grey's critique](https://doi.org/10.1111/j.1468-5930.1986.tb00420.x), [diZerega's political-theory study](https://doi.org/10.1017/S003467050002043X), [Bombik's methodology study](https://doi.org/10.21697/seb.2020.18.5.06), and [Luke's movement-and-politics analysis](https://doi.org/10.1177/10826602015002005). Together they support explicit separation among ecosophy, platform principles, policy formulations, concrete actions, movement history, and contested political translations; they do not support one uniform scored ideology or respondent construct.

The direct target remains an `associated-tradition` registry entry with `registry-only`/`not-scored` status, eight registry source references including six fresh V92 records, twelve quarantined candidates at 4/4/4, a twelve-dimension qualitative profile using the existing facet vocabulary, four neighbor discriminants, and explicit dated `demote-to-associated` governance. No canonical node, ancestry mutation, production question, numeric anchor, facet schema expansion, scorer path, current-party label, or respondent classification was added. The initial focused validator caught an invalid `ecological-self` profile facet; it was repaired by mapping the expanded-self construct to the existing descriptive `cultural-causation` facet, after which focused research tests passed 77/77.

The V92 deterministic and delivery gates pass: full Vitest 101/101 across three files; `npx tsc --noEmit`; `npm run build`; `npm audit --omit=dev --audit-level=high` with zero vulnerabilities; `npm run research:coverage` with 1,404 prompts, 116 nodes, 3 registry-only targets, 5 contextual placements, 1,428 candidates across 119 targets, and zero validation errors; `npm run research:anchor-reachability` with zero validation or reachability failures; `docker compose config`; fresh no-cache Docker build; forced Compose recreation; healthy `/healthz`; serial local Playwright 10/10 in 5.6 minutes; clean Docker-backed Playwright 10/10 in 4.9 minutes; and `git diff --check`. A first Docker-backed attempt returned 10 connection-refused errors during an automatic container restart; nginx logs showed a clean restart, health was rechecked successfully, and the clean rerun passed. The build retains the existing large-client-chunk advisory.

No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Three registry-only targets and five contextual placements remain outside production scoring, and the comprehensive-coverage goal remains open. No Git remote is configured, so push requires a user-provided remote target.

## V94 verification record — Degrowth canonical meso promotion

The V94 source and governance delta adds a parentless canonical Degrowth meso node, eight source records, twelve direct production prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a provisional anchor, a fifteen-dimension existing-facet profile, six neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. The source set supports a contested growth-critical ecological-economic and political boundary involving material and energy throughput, ecological limits or unequal ecological costs, sufficiency/wellbeing, justice, democracy, provisioning, transformation, movement, and plural institutional routes. The shared facet schema and scoring policy remain unchanged; no dedicated growth/throughput facet was invented.

The verified V94 data shape is content version 91 with 1,428 production prompts (476 per layer), 118 editorial anchors, 113 production anchors, 118 ontology nodes (9 macro / 40 meso / 69 micro), 3 registry entries, 113 dedicated-scored targets, five contextual-only placements, and 1,452 quarantined candidates across 121 research targets. Degrowth has twelve direct prompts at 4/4/4, eight source references, twelve quarantined candidates at 4/4/4, a fifteen-dimension profile, six neighbor discriminants, a false-positive audit, and a parentless canonical meso path. The complete-answer share regression measures 15,857 characters and round-trips.

The V94 deterministic and delivery gates pass: focused research/scoring/share contracts 103/103; full Vitest 118/118 across four files; `npx tsc --noEmit`; `npm run build`; `npm audit --omit=dev --audit-level=high` with zero vulnerabilities; research coverage with 121 target rows and the expected V94 counts; research anchor reachability with zero validation errors or structural failures and isolated Degrowth reachability in all three layers; `docker compose config`; fresh no-cache Docker build; forced Compose recreation; healthy `/healthz`; serial local Playwright 10/10; Docker-backed Playwright 10/10; and diff hygiene after documentation synchronization. The build retains the existing large-client-chunk advisory.

The browser suites ran against both the local served path and the Docker-served path; each passed all ten scenarios. The local run took approximately 5.8 minutes and the Docker run approximately 5.0 minutes. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Full-production overlap remains deterministic geometry evidence only and does not authorize uncalibrated scorer, picker, threshold, coefficient, or anchor retuning.

The comprehensive-coverage goal remains open. Three registry-only targets and five contextual placements remain outside production scoring, and the Degrowth research candidates remain quarantined. A separate uncommitted belief-profile/morphology workstream remains outside this scoped tranche and was not staged. No Git remote is configured, so push remains blocked until a user-provided remote target exists.

## V95 verification record — Distributism canonical meso promotion

The V95 source and governance delta adds a parentless canonical Distributism meso node, eight scholarly and primary source records, twelve direct production prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a provisional anchor, a fifteen-dimension existing-facet profile, six neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. The source pass includes [Salter's political-economy treatment](https://www.jstor.org/stable/jj.3485520), [Boyd's history of Chesterton and Distributism](https://doi.org/10.1111/j.1741-2005.1974.tb03889.x), [Mathews's account of its Catholic intellectual formation](https://doi.org/10.1017/S0034193200012814), [Pierson's property-radicalism analysis](https://doi.org/10.1093/oso/9780198787105.003.0009), [Quilley's Schumacher and subsidiarity study](https://doi.org/10.1177/13684310241237428), [Utrera García's peer-reviewed reconsideration](https://doi.org/10.17398/2340-4256.17.637), [Kelly's study of the Catholic Land Movement](https://doi.org/10.1111/j.1741-2005.2009.01298.x), and a [1927 primary text](https://doi.org/10.1111/j.1741-2005.1927.tb04727.x). Together they support a contested property-and-common-good tradition involving widely dispersed productive ownership, material independence, social responsibility, subsidiarity, associational or worker control, and plural routes; they do not establish respondent or empirical validity.

The implementation keeps Distributism parentless at the meso level rather than forcing it under Christian Democracy, Conservatism, Socialism, or Guild Socialism. Communitarianism is retained as a contextual bridge rather than promoted to a separate scored node because the current literature treats it as a diverse and contested family spanning metaphysical and policy critiques of individualism. The shared facet schema and scoring policy remain unchanged; no dedicated property-dispersion facet was invented. Generic Catholic identity, family traditionalism, small business, localism, cooperatives, private-property support, anti-capitalism, anti-monopoly language, agrarian identity, or one ownership proposal is not sufficient evidence for the target.

The verified V95 data shape is content version 92 with 1,440 production prompts (480 per layer), 119 editorial anchors, 114 production anchors, 119 ontology nodes (9 macro / 41 meso / 69 micro), 3 registry entries, 114 dedicated-scored targets, five contextual-only placements, and 1,464 quarantined candidates across 122 research targets. Distributism has twelve direct prompts at 4/4/4, eight source references, a fifteen-dimension profile, six neighbor discriminants, a false-positive audit, and isolated reachability in all three layers. The complete-answer share regression measures 16,001 characters and round-trips.

The V95 deterministic and delivery gates pass: focused research/scoring/share contracts 104/104; full Vitest 122/122 across four files; `npx tsc --noEmit`; `npm run build`; `npm audit --omit=dev --audit-level=high` with zero vulnerabilities; research coverage with zero validation errors; research anchor reachability with zero validation errors or structural failures; `docker compose config`; fresh no-cache Docker build; forced Compose recreation; healthy `/healthz`; serial local Playwright 10/10; rebuilt Docker-backed Playwright 10/10; and final diff hygiene. The first local managed-server attempt ended 8/10 when the Playwright child dev server stopped responding; the supervised-server rerun passed 10/10. The first Docker run used an image stale relative to the concurrent belief-profile UI and ended 9/10; a fresh image build and recreation passed 10/10. The build retains the existing large-client-chunk advisory.

No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Full-production overlap remains deterministic geometry evidence only and does not authorize uncalibrated scorer, picker, threshold, coefficient, or anchor retuning. The comprehensive-coverage goal remains open, and the separate uncommitted belief-profile/morphology workstream remains outside this scoped tranche and was not staged.

## V96 verification record — Christian Socialism canonical meso promotion

The V96 source and governance delta adds a parentless canonical Christian Socialism meso node, eight scholarly source records, twelve direct production prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a provisional anchor, a fifteen-dimension existing-facet profile, six neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. The source set supports a plural Christian-socialist boundary joining Christian moral or theological grounding to socialist structural critique, solidarity, collective economic transformation, and varied democratic, labor, cooperative, public, church-linked, lay, and movement routes. The shared facet schema and scoring policy remain unchanged; no dedicated religious-socialism or theological-grounding facet was invented.

The verified V96 data shape is content version 93 with 1,452 production prompts (484 per layer), 120 editorial anchors, 115 production anchors, 120 ontology nodes (9 macro / 42 total meso / 69 micro), 9 macro / 37 canonical meso / 69 micro inventory, 3 registry entries, 115 dedicated-scored targets, five contextual-only placements, and 1,476 quarantined candidates across 123 research targets. Christian Socialism has twelve direct prompts at 4/4/4, eight source references, twelve quarantined candidates at 4/4/4, a fifteen-dimension profile, six neighbor discriminants, a false-positive audit, and a parentless canonical meso path. The complete-answer share regression measures 16,145 characters and round-trips.

The V96 deterministic and delivery gates pass: focused research/scoring contracts 100/100; share tests 6/6; full Vitest 130/130 across five files; `npx tsc --noEmit`; `npm run build`; `npm audit --omit=dev --audit-level=high` with zero vulnerabilities; research coverage with zero validation errors; research anchor reachability with zero validation errors or structural failures and isolated Christian Socialism routing in all three layers; `docker compose -f docker-images/docker-compose.yml config`; fresh no-cache `docker build -f frontend/Dockerfile -t ideology-layer-sorter-frontend:latest .`; forced Compose recreation; healthy `/healthz`; healthy container status; and Docker-backed Playwright 10/10. The build retains the existing large-client-chunk advisory. The first compose build command reported no services to build because the compose file references a prebuilt image; the explicit no-cache Dockerfile build supplied the fresh image used for browser verification.

The separate uncommitted belief-profile/morphology workstream remained present and was not staged or modified by this tranche. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Full-production overlap remains deterministic geometry evidence only and does not authorize uncalibrated scorer, picker, threshold, coefficient, or anchor retuning. The comprehensive-coverage goal remains open, five contextual placements and three registry-only targets remain outside production scoring, and no Git remote is configured so push remains blocked pending a user-provided remote target.

## V97 verification record — Ujamaa / Nyererean African Socialism canonical meso promotion

The V97 source and governance delta adds a parentless canonical Ujamaa meso node, eight scholarly or primary source records, twelve direct production prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a provisional anchor, a seventeen-dimension existing-facet profile, six neighbor discriminants, a false-positive audit, and explicit promote-to-canonical governance. The source set supports a historically bounded and internally varied African-Socialist boundary involving familyhood, egalitarian social relations, anti-exploitation, collective self-reliance, participation in nation-building, communal or public development, local agency, and contested state-directed implementation. The shared facet schema and scoring policy remain unchanged; no dedicated African-Socialism or postcolonial-development facet was invented.

The verified V97 data shape is content version 94 with 1,464 production prompts (488 per layer), 121 ontology nodes (9 macro / 43 total meso / 69 micro), 9 macro / 38 canonical meso / 69 micro inventory, 3 registry entries, 116 dedicated-scored targets, five contextual-only placements, and 1,488 quarantined candidates across 124 research targets. Ujamaa has twelve direct prompts at 4/4/4, eight source references, twelve quarantined candidates at 4/4/4, a seventeen-dimension profile, six neighbor discriminants, a false-positive audit, and a parentless canonical meso path. The supported share contract passes its finite-bound and round-trip assertions.

The V97 deterministic and delivery gates pass: focused research 82/82, focused scoring 19/19, share tests 6/6, full Vitest 134/134 across five files, `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev --audit-level=high` with zero vulnerabilities, research coverage with zero validation errors and complete 124/124 profile/audit rows, research anchor reachability with zero validation errors or structural failures and isolated Ujamaa routing in all three layers, `docker compose -f docker-images/docker-compose.yml config`, fresh no-cache Docker build, forced Compose recreation, healthy `/healthz`, healthy container status, and Docker-backed Playwright 10/10. The build retains the existing large-client-chunk advisory.

The separate uncommitted belief-profile/morphology workstream remained present and was not staged or modified by this tranche. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run or implied. Full-production overlap remains deterministic geometry evidence only. The comprehensive-coverage goal remains open, five contextual placements and three registry-only targets remain outside production scoring, and no Git remote is configured so push remains blocked pending a user-provided remote target.

## V98 verification boundary — Gandhian Political Thought contextual tranche

At authoring time, the V98-specific evidence is: focused `src/research.test.ts` 83/83 PASS; `npx tsc --noEmit` PASS; `npm run research:coverage` PASS with zero validation errors and 1,500 candidates across 125 targets; and `git diff --check` PASS. The inventory remains production content version 94 with 1,464 prompts (488 per layer) and 116 production anchors, while the editorial ontology reports 122 nodes with 9 macro / 44 total meso / 69 micro placements, six contextual placements, and three registry entries. Gandhian Political Thought has no production questions, anchor, canonical path, or score effect.

The broader Vitest suite, build, high-severity audit, anchor-reachability command, Compose/Docker configuration and image checks, health check, and Playwright delivery checks are part of the remaining V98 verification pass and must be reported from their actual command results. No cognitive review, respondent study, substitute simulation, psychometric validation, reliability/validity estimate, invariance study, empirical classification, or population evidence was run or implied. The unrelated uncommitted belief-profile/morphology workstream remains outside the tranche and must not be staged.

## V98 final observed verification — 2026-08-30

| Check | Status | Observed result |
|---|---|---|
| `npm run test:run` | PASS | 5 files, 137/137 tests; the 83 research-contract tests and the existing belief-profile tests all pass in the current worktree |
| `npx tsc --noEmit` and `npm run build` | PASS | Production bundle built; the existing Vite large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | 0 validation errors; 1,500 candidates across 125 targets; Gandhian target is contextual-only with 0 direct questions and 4/4/4 candidates |
| `npm run research:anchor-reachability` | PASS | 116 production anchors; 0 validation errors; 0 structural failures; all production anchors isolated-reachable across all three layers |
| Compose config, fresh image, health | PASS | Compose config passed; current-tree no-cache Docker image built; forced recreation is healthy and `/healthz` returns `ok` |
| local Playwright | PASS after rerun | A Playwright-managed-server attempt failed 1/10 when the long share test encountered a stopped Vite server; the affected test then passed 1/1 and the complete suite passed 10/10 against a manually held Vite server |
| Docker Playwright | PASS after rebuild | A stale-image attempt failed 1/10 because it lacked the latest unrelated `Compatibility baseline` UI; after rebuilding from the current tree, the complete suite passed 10/10 |
| `git diff --check` | PASS | No whitespace errors |

The initial browser failures are retained as diagnostic history, not silently converted into passes; the final PASS rows are the successful reruns against the explicitly controlled runtime surfaces. No cognitive review, respondent study, substitute simulation, psychometric validation, reliability/validity estimate, invariance study, empirical classification, or population evidence was run or implied. The unrelated belief-profile/morphology workstream remains outside the V98 tranche and is not authorized for staging.

## V99 verification boundary — Labor Zionism canonical micro tranche

At authoring time, the V99-specific evidence is: focused `src/research.test.ts` 84/84 PASS; `npx tsc --noEmit` PASS; `npm run research:coverage` PASS with zero validation errors and 1,512 candidates across 126 targets; and `git diff --check` still pending after documentation edits. The current production inventory is content version 95 with 1,476 prompts (492 per layer), 117 production anchors, 122 editorial anchors, 123 ontology nodes, 9 macro / 44 total meso / 70 micro placements, 117 canonical nodes, six contextual placements, three registry entries, and a Labor Zionism canonical micro target with twelve direct prompts at 4/4/4.

The V99 branch adds eight source records, one canonical micro node under `nationalism`, one provisional anchor, twelve direct prompts, twelve quarantined effect-free candidates, a seventeen-dimension profile, six neighbor discriminants, a false-positive audit, coverage metadata, and explicit source-backed promotion governance. The full Vitest suite, build, audit, anchor-reachability, Compose/Docker, health, share, and Playwright gates must be recorded from actual current-tree execution before this record can be closed. No cognitive review, respondent study, substitute simulation, psychometric validation, reliability/validity estimate, invariance study, empirical classification, or population generalization was run or implied.


## V99 final observed verification — 2026-08-30

| Check | Status | Observed result |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | 84/84 focused research-contract tests |
| `npm run test:run` | PASS | 5 files, 140/140 Vitest tests |
| `npx tsc --noEmit` and `npm run build` | PASS | Current tree typechecks and builds; the existing Vite large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | 0 validation errors; 1,512 candidates across 126 targets; 126 profiles, false-positive audits, and coverage rows |
| `npm run research:anchor-reachability` | PASS | 117 production anchors; 0 validation errors; 0 structural failures; all production anchors isolated-reachable across all three layers |
| Compose config, fresh image, health | PASS | Compose config passed; current-tree no-cache Docker image built; forced recreation is healthy and `/healthz` returns `ok` |
| local Playwright | PASS | Complete suite passed 10/10 against the local Vite runtime |
| Docker Playwright | PASS | Complete suite passed 10/10 against the rebuilt Docker runtime |
| `git diff --check` and Zeus-state JSON parse | PASS | No whitespace errors; `python -m json.tool` passed |

The current production contract is content version 95 with 1,476 prompts (492 per layer), 117 production anchors, 122 editorial anchors, 123 ontology nodes, 9 macro / 44 total meso / 70 micro placements, six contextual placements, three registry entries, and 1,512 quarantined candidates across 126 research targets. Labor Zionism is source-backed, canonical, and provisional: it has twelve direct prompts at 4/4/4, six neighbor discriminants, a false-positive audit, and isolated three-layer reachability. No cognitive review, respondent study, substitute simulation, psychometric validation, reliability/validity estimate, invariance study, empirical classification, or population generalization was run or implied. The separate belief-profile/morphology workstream remains outside this tranche and is not staged.

## V100 final observed verification — Islamic Feminism canonical micro branch — 2026-08-30

| Check | Status | Observed result |
|---|---|---|
| `npx vitest run src/research.test.ts src/scoring.test.ts` | PASS | 104/104 focused research and scoring-contract tests |
| `npm run test:run` | PASS | 5 files, 142/142 Vitest tests, including the existing belief-model structural tests |
| `npx tsc --noEmit` | PASS | Current tree typechecks |
| `npm run build` | PASS | Vite production build completes; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 96; 1,488 prompts; 118 production anchors; 123 editorial anchors; 124 ontology nodes; 1,524 candidates across 127 targets; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 118 production anchors; zero validation errors and zero structural failures; every production anchor is isolated-reachable across all three layers, including Islamic Feminism |
| `npm run qa` | PASS | Complete Playwright suite passes 10/10 against the local Vite runtime |
| `npm run belief:measurement-audit` | PASS | 1,488 production items audited; 11 constructs; all items covered; three construct gaps remain explicit; no directional facet or construct evidence is inferred |
| `npm run belief:morphology-audit` | PASS | 118 source-backed canonical configurations round-trip; adversarial structural checks pass; synthetic output is not respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | 8-item effect-free categorical pilot is isolated from legacy scoring; no validation errors |
| `npm run belief:completion-audit` | NOT PASS / FAIL-CLOSED | Exit remains nonzero because cognitive/response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology gates are `NOT RUN` by explicit scope |
| `git diff --check` | PASS | No whitespace errors before documentation finalization |
| Compose/Docker delivery | NOT RUN | Not rerun for V100; no Docker or hosted-runtime claim is made |

The V100 production contract is content version 96 with 1,488 prompts (496 per layer), 118 production anchors, 123 editorial anchors, 124 ontology nodes, 9 macro / 44 total meso / 71 micro placements, 9 macro / 38 canonical meso / 71 canonical micro inventory, six contextual placements, three registry entries, and 1,524 quarantined candidates across 127 research targets. Islamic Feminism is source-backed, canonical, and provisional: it has nine source references, twelve direct prompts at 4/4/4, twelve quarantined effect-free candidates at 4/4/4, a seventeen-dimension profile, six neighbor discriminants, a false-positive audit, explicit promotion governance, and isolated three-layer reachability. The public repository remote remains configured separately; the V100 commit and push are the next repository-state operations. The separate belief-profile/morphology workstream remains outside the V100 commit scope.

No cognitive review, respondent study, expert content adjudication, psychometric calibration, reliability/validity estimate, invariance/DIF study, empirical validation, population/consequence review, or held-out respondent morphology evidence was run or implied. Local tests and synthetic audits are structural evidence only; they do not validate an ideological classification instrument or authorize political recommendations.

## V101 final observed verification — Gandhian contextual conception bridge — 2026-08-30

V101 adds four source-backed qualitative conceptions to the existing Gandhian Political Thought contextual profile: ethical self-rule, means-ends nonviolence, constructive self-government, and trusteeship as a contested economic duty. The Oxford and Cambridge source pass supports these as an internally varied political-ethical vocabulary, while preserving disagreement over state power, democracy, economic translation, and political strategy. The profile remains `contextual-only` / `not-scored`; no direct production item, anchor, effect, coefficient, threshold, picker, morphology output, or combined-layer semantic changed.

| Check | Status | Observed result |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | 1 file, 85/85 focused research-contract tests |
| `npm run test:run` | PASS | 5 files, 143/143 Vitest tests |
| `npx tsc --noEmit` and `npm run build` | PASS | Current tree typechecks and builds; the existing Vite large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 96; 1,488 production questions; 118 production anchors; 123 editorial anchors; 124 ontology nodes; 1,524 candidates across 127 targets; 127 profile rows and false-positive audit rows; 30 profile conceptions across 27 targets; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 118 production anchors; zero validation errors and zero structural failures; every production anchor remains isolated-reachable across descriptive, normative, and prescriptive layers |
| `npm run belief:measurement-audit` | PASS | 1,488 production items audited; all remain facet-proxy observations; construct gaps and review dispositions remain explicit |
| `npm run belief:morphology-audit` | PASS | 118 source-backed canonical configurations round-trip; 26 explicit research conception records across 26 canonical configurations are distinguished from facet-proxy conceptual mappings; all-mixed profiles return `not-derived` with no candidate records; structural failures and validation errors are zero; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | 8-item effect-free categorical pilot remains isolated from legacy scoring; zero validation errors and zero failures |
| `npm run qa -- --workers=1` against `http://127.0.0.1:4174` | PASS | Complete production-preview Playwright suite passed 10/10, including research workbench, responsive, share, missing-information, and layer-transition paths |
| `npm run belief:completion-audit` | NOT PASS / FAIL-CLOSED | Exit remains nonzero because cognitive/response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology gates are `NOT RUN` by explicit scope |
| `git diff --check` | PASS | No whitespace errors before documentation finalization |
| Compose/Docker delivery | NOT RUN | Not rerun for V101; no container or hosted-runtime claim is made |

The verified V101 production contract remains content version 96 with 1,488 questions (496 per layer), 118 production anchors, 123 editorial anchors, six contextual placements, three registry entries, and 1,524 quarantined candidates across 127 research targets. Gandhian Political Thought has four source-backed conceptions, zero production questions, no production anchor, and no score path. The [Parel *Pax Gandhiana* source](https://academic.oup.com/book/12258) and [Mantena's *Another Realism* source](https://www.cambridge.org/core/journals/american-political-science-review/article/abs/another-realism-the-politics-of-gandhian-nonviolence/7BE21CF751176FAF880BD41A9E5EF10F) are used for provenance and contextual interpretation, not respondent measurement.

The conceptual representation audit now distinguishes an explicit research conception from a facet-linked conceptual proxy. All canonical configurations have source-backed conceptual representation, but only 26 canonical configurations currently carry explicit research conception records; the remaining records are not presented as direct respondent conceptions.

No cognitive review, respondent study, expert content adjudication, psychometric calibration, reliability/validity estimate, invariance/DIF study, empirical validation, population/consequence review, or held-out respondent morphology evidence was run or implied. This is a neutral research-model/data and UI continuation, not a personal ideological comparison, political recommendation, ranking, or score.

## V102 verification — Deep Ecology canonical micro branch

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | Focused research contract 85/85 |
| `npm run test:run` | PASS | Full current-tree Vitest suite 144/144 across five files; one pre-existing unowned test remains outside the V102 commit |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions; 119 production anchors; 124 editorial anchors; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors and structural failures; Deep Ecology is isolated-reachable across all three layers; full-competition overlap remains diagnostic |
| `npm run belief:measurement-audit` | PASS | All 1,500 production items audited as facet-proxy observations; construct gaps and review dispositions remain explicit |
| `npm run belief:morphology-audit` | PASS | 119 canonical configurations round-trip; zero validation errors and structural failures; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | Eight-item effect-free categorical pilot remains isolated from legacy scoring; zero validation errors and failures |
| `E2E_BASE_URL=http://127.0.0.1:4174 npm run qa -- --workers=1` | PASS | Production-preview Playwright suite 10/10; inventory, research workbench, governance, responsive, full-layer, share-link, transition, and malformed-share paths pass |
| `npm run belief:completion-audit` | NOT PASS / FAIL-CLOSED | Exit 1 because cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology gates remain `NOT RUN` by explicit scope |
| `git diff --check` | PASS | No whitespace errors after V102 finalization |
| Compose/Docker delivery | NOT RUN | Not rerun for V102; no container or hosted-runtime claim is made |

The V102 structural contract is eligible but the overall completion status remains incomplete by design. The six external-study gates are not substituted with synthetic fixtures, source citations, automated audits, or cognitive-review alternatives. This is neutral repository taxonomy/data authoring and verification, not a personal ideological comparison, recommendation, ranking, or score.

## V103 verification — registry-boundary source refresh

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | 85/85 focused research-workbench tests pass, including refreshed Civic Republicanism and Conservative New Right provenance and governance assertions |
| `npm run test:run` | PASS | 144/144 current-tree Vitest tests pass across five files; unrelated dirty belief-workstream files remain outside the V103 commit |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions; 119 production anchors; 124 editorial anchors; two registry entries; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors and structural failures; registry entries remain outside production anchor routing |
| `npm run belief:measurement-audit` | PASS | All 1,500 production items audited; existing construct gaps and review dispositions remain explicit |
| `npm run belief:morphology-audit` | PASS | 119 canonical configurations round-trip; zero validation errors and structural failures; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | Eight-item effect-free categorical pilot remains isolated from legacy scoring; zero validation errors and failures |
| `E2E_BASE_URL=http://127.0.0.1:4174 npm run qa -- --workers=1` | PASS | Production-preview Playwright suite 10/10; inventory, research workbench, governance, responsive, full-layer, share-link, transition, and malformed-share paths pass in 5.3 minutes |
| `npm run belief:completion-audit --silent -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors after V103 documentation and source updates |
| Compose/Docker delivery | NOT RUN | Not rerun for this source-only registry refresh; no container or hosted-runtime claim is made |

V103 leaves production content at version 97 with 1,500 questions and 119 production anchors. The two registry entries remain outside production scoring, and their 24 research candidates remain quarantined and effect-free. The six external-study gates remain explicitly `NOT RUN`; no cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, or population/consequence review was run or implied.

## V104 final observed verification — Market Socialism contextual boundary — 2026-08-30

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | Focused research-workbench contract 86/86, including Market Socialism source, conception, contextual-status, quarantine, and governance assertions |
| `npm run test:run` | PASS | Full current-tree Vitest suite 146/146 across five files |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 research candidates; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors and structural failures; contextual Market Socialism remains outside production anchor routing |
| `npm run belief:measurement-audit` | PASS | All 1,500 production items audited; existing construct gaps and review dispositions remain explicit |
| `npm run belief:morphology-audit` | PASS | 119 canonical configurations round-trip; zero validation errors and structural failures; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | Eight-item effect-free categorical pilot remains isolated from legacy scoring; zero validation errors and failures |
| `E2E_BASE_URL=http://127.0.0.1:4174 npm run qa -- --workers=1` | PASS | Production-preview Playwright suite 10/10; inventory, workbench, governance, responsive, full-layer, share-link, transition, and malformed-share paths pass |
| `npm run belief:completion-audit --silent -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors after the V104 documentation and source updates |
| Compose/Docker delivery | NOT RUN | Not rerun for this source-only contextual refresh; no container or hosted-runtime claim is made |

V104 refreshes provenance and qualitative boundary context for `market-socialism-context` but leaves production content at version 97 with 1,500 questions, 119 production anchors, 124 editorial anchors, 125 ontology nodes, two registry entries, six contextual placements, and 1,524 quarantined research candidates. Market Socialism remains contextual-only and not-scored; no canonical node, direct production question, anchor, effect, coefficient, threshold, picker behavior, morphology output, layer weight, combined-layer semantic, or share semantic changed. The six external-study gates remain explicitly `NOT RUN`; no cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, population/consequence review, or current-actor inference was run or implied.

## V105 final observed verification — Civic Republicanism registry conception bridge — 2026-08-30

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | Focused research-workbench contract 87/87, including Civic Republicanism source, conception, registry-status, quarantine, and governance assertions |
| `npm run test:run` | PASS | Full current-tree Vitest suite 147/147 across five files |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 research candidates; 122 target rows with conceptions; 127 profile conceptions; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors and structural failures; registry-only Civic Republicanism remains outside production anchor routing |
| `npm run belief:measurement-audit` | PASS | All 1,500 production items audited; existing construct gaps and review dispositions remain explicit |
| `npm run belief:morphology-audit` | PASS | 119 canonical configurations round-trip; zero validation errors and structural failures; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit` | PASS | Eight-item effect-free categorical pilot remains isolated from legacy scoring; zero validation errors and failures |
| `E2E_BASE_URL=http://127.0.0.1:4174 npm run qa -- --workers=1` | PASS | Production-preview Playwright suite 10/10 in 5.3 minutes; inventory, workbench, registry governance, responsive, full-layer, share-link, transition, and malformed-share paths pass |
| `npm run belief:completion-audit --silent -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors after the V105 documentation and source updates |
| Compose/Docker delivery | NOT RUN | Not rerun for this registry-only contextual refresh; no container or hosted-runtime claim is made |

V105 enriches the existing `civic-republicanism` registry profile with two qualitative conceptions while leaving production content at version 97 with 1,500 questions, 119 production anchors, 124 editorial anchors, 125 ontology nodes, two registry entries, six contextual placements, and 1,524 quarantined research candidates. Civic Republicanism remains registry-only and not-scored; no canonical node, direct production question, production anchor, effect, coefficient, threshold, picker behavior, morphology output, layer weight, combined-layer semantic, or share semantic changed. The six external-study gates remain explicitly `NOT RUN`; no cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, population/consequence review, or current-actor inference was run or implied.

## V105 observed verification — explicit conception coverage and belief-model continuation — 2026-08-30

This continuation adds qualitative, source-linked `ResearchAnchorConception` records for the remaining canonical configurations. All 119 canonical configurations now expose an explicit research conception in addition to their existing facet-proxy representation. These records explain source-backed concepts and boundaries; they remain outside respondent observations, legacy affinity weights, morphology scoring, coefficient tuning, and political classification. The fixed macro/meso/micro/hybrid ontology, 1,500-question production bank, six respondent-level relational follow-ups, and eight-item direct categorical pilot remain unchanged in scope.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- --reporter=dot` | PASS | 5 files, 146/146 Vitest tests |
| `npm run build` | PASS | TypeScript and Vite production build; existing large-client-chunk advisory remains |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; 119 explicit research conceptions; zero proxy-only configurations; zero validation errors; adversarial isolation checks remain true |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 items at 500/500/500; all remain facet-proxy; zero ideology-coded wording flags; branch metadata remains separately audited; three construct gaps and 15 quarantined candidates remain explicit |
| `npm run belief:direct-pilot-audit` | PASS | 8 effect-free categorical items; 21 recordable option-source references; zero validation errors/failures; legacy and affinity isolation remains true |
| `npm run research:coverage` | PASS | 1,500 production questions; 119 production anchors; 124 editorial anchors; 1,524 candidates across 127 targets; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors and structural failures; isolated three-layer reachability remains intact |
| `npm run belief:completion-audit -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks pass, but exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npm run qa -- --workers=1` | PASS | Minos Playwright suite 10/10 against the current production preview; preview was stopped after the run |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | This source/data/docs continuation makes no Docker, hosted-runtime, or production-readiness claim |

The current completion audit reports `structuralEligible: true`, `eligible: false`, and `status: "incomplete"`. The open required gates remain cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. No local test, synthetic profile, source citation, browser run, or automated audit substitutes for those external studies.

## V106 final observed verification — Conservative New Right registry conception bridge — 2026-08-30

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | Focused research-workbench contract 87/87, including Conservative New Right source, conception, registry-status, quarantine, and governance assertions |
| `npm run test:run` | PASS | Full current-tree Vitest suite 148/148 across five files |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 research candidates; 123 target rows with conceptions; 129 profile conceptions; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors, failures, or isolated structural failures |
| `npm run belief:measurement-audit -- --summary` | PASS | All 1,500 production items audited; all remain facet-proxy observations and the three construct gaps remain explicit |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; 119 explicit research conceptions; zero validation errors and failures; synthetic output remains non-respondent evidence |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight-item effect-free categorical pilot; 21 recordable option-source references; zero validation errors and failures; legacy and affinity isolation remains true |
| `E2E_BASE_URL=http://127.0.0.1:4179 npm run qa -- --workers=1` | PASS | Production-preview Playwright suite 10/10 in 5.3 minutes; inventory, workbench, registry governance, responsive, full-layer, share-link, transition, and malformed-share paths pass |
| `npm run belief:completion-audit -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --cached --check` | PASS | No whitespace errors in the owned staged V106 changes |
| `git diff --check` | PASS | No whitespace errors in the remaining worktree diff |
| Compose/Docker delivery | NOT RUN | Not rerun for this registry-only qualitative refresh; no container or hosted-runtime claim is made |

V106 enriches the existing `conservative-new-right` registry profile with two qualitative conceptions while leaving production content at version 97 with 1,500 questions, 119 production anchors, 124 editorial anchors, 125 ontology nodes, two registry entries, six contextual placements, and 1,524 quarantined research candidates. Conservative New Right remains registry-only and not-scored; no canonical node, direct production question, production anchor, effect, coefficient, threshold, picker behavior, morphology output, layer weight, combined-layer semantic, or share semantic changed. The six external-study gates remain explicitly `NOT RUN`; no cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, population/consequence review, or current-actor inference was run or implied.

## V106 observed verification — primary belief inference path — 2026-08-30

This continuation closes the composition-boundary gap identified in the prior additive implementation. `calculateResults` now constructs the primary `BeliefProfile` first, derives profile-owned cross-layer pulls and `IdeologicalMorphology`, and then evaluates the retained facet-distance scorer as `result.legacy`. The application and current belief audits consume `result.primary`; deprecated top-level aliases remain only for existing consumers. The refactor does not promote proxy observations to validated latent measures, alter the fixed ontology, retune affinity coefficients, or change the legacy answer-to-anchor calculation.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree and audit scripts typecheck |
| `npm run test:run -- --reporter=dot` | PASS | 5 files, 149/149 Vitest tests |
| `npm run build` | PASS | `tsc --noEmit` and Vite build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 items at 500/500/500; all remain facet proxies; three construct gaps and 15 quarantined candidates remain explicit |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; explicit conceptions and adversarial structural checks remain valid; zero validation errors/failures |
| `npm run belief:direct-pilot-audit` | PASS | Eight effect-free direct items; legacy scoring and morphology affinity remain isolated; zero validation errors/failures |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `E2E_BASE_URL=http://127.0.0.1:4178 npm run qa -- --workers=1` | PASS | Minos serial Playwright suite 10/10 against the current preview; preview was stopped and port 4178 verified closed |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | `primaryBeliefPathIsExplicit` and all other structural checks are true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The local result-path refactor is verified, but the overall objective remains incomplete. The six open gates are cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Those gates require external study evidence and are not substituted by source-backed configurations, synthetic profiles, local tests, or browser QA.

## V107 final observed verification — Anarchism contextual conception bridge — 2026-08-30

V107 enriches the existing contextual `anarchism-context` profile with two qualitative conceptions while leaving production content at version 97 with 1,500 questions, 119 production anchors, 124 editorial anchors, 125 ontology nodes, two registry entries, six contextual placements, and 1,524 quarantined research candidates. The node remains linked to the existing `anarchism` family anchor, contextual-only, catalog-only, and not-scored; no direct production question or score path was added.

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts` | PASS | Focused research-workbench contract 88/88, including Anarchism context placement, family link, source resolution, conception layers, quarantine, and non-scored governance assertions |
| `npm run test:run -- --reporter=dot` | PASS | 5 files, 151/151 Vitest tests |
| `npx tsc --noEmit` | PASS | Current TypeScript tree typechecks |
| `npm run build` | PASS | Production bundle builds; the existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | Content version 97; 1,500 production questions at 500/500/500; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 candidates; 124 target rows with conceptions; 131 profile conceptions; zero validation errors; Anarchism context has 2 conceptions and 0 direct questions |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors, failures, or isolated missing layers |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 production items audited; all remain facet-proxy observations; the audit interpretation remains non-cognitive and non-psychometric |
| `npm run belief:morphology-audit -- --summary` | PASS | 119/119 source-backed canonical configurations with classified explicit research conceptions; zero configurations missing conceptions; zero validation failures; neutral and mixed-profile safeguards remain intact |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct items remain isolated; zero direct items are in production; zero validation errors/failures |
| `E2E_BASE_URL=http://127.0.0.1:4179 npm run qa -- --workers=1` | PASS | Serial production-preview Playwright suite 10/10 in 5.3 minutes; preview was stopped and port 4179 was verified closed |
| `npm run belief:completion-audit -- --summary` | NOT PASS / FAIL-CLOSED | Structural checks are true, but `eligible: false` and exit 1 remain correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors in the remaining worktree diff |
| `git diff --cached --check` | PASS | No whitespace errors in the owned staged V107 changes |
| Compose/Docker delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The V107 source pass uses the [Stanford Encyclopedia of Philosophy entry on Anarchism](https://plato.stanford.edu/entries/anarchism/) for the family-level authority, domination, hierarchy, and plural constructive-route boundary, and [Ostrom's *Governing the Commons* source](https://doi.org/10.1017/CBO9780511807763) only for comparative self-governance terminology. `anti-hierarchical-freedom` is normative/defining and `voluntary-federated-self-government` is prescriptive/characteristic; both remain editorial context outside respondent observations, affinity weights, morphology output, or score effects. No cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, population/consequence review, current-actor inference, comparison, ranking, recommendation, or personal ideological classification was run or implied. The overall objective remains incomplete because the six external-study gates remain open.

## V108 observed verification — integrated belief-structure trace — 2026-08-30

This continuation makes the intermediate integrated political-philosophical profile a first-class, typed part of `BeliefProfile`. The primary result now exposes eleven separately named dimensions covering normative values and moral scope, concepts and competing conceptions, descriptive and causal beliefs, legitimacy and authority, distributive principles, institutional commitments, political economy, theories of change, priorities and conflicts, epistemic uncertainty, and heterodoxy or contestation. Each dimension retains its construct bridge, answered evidence counts, direct categorical pilot ids, relational evidence ids, attached question records, provenance, and an explicit evidence posture. The trace is organizational and explanatory only: it adds no affinity weights, does not infer relationships from co-occurrence, and preserves the three unmeasured dimensions as `unmeasured` for a base-quiz response set.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree and audit scripts typecheck |
| `npm run test:run -- --reporter=dot` | PASS | 5 files, 151/151 Vitest tests |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 items at 500/500/500; all remain facet proxies; three construct gaps and 15 quarantined candidates remain explicit |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; explicit conception coverage and adversarial checks remain valid; zero validation errors/failures |
| `npm run belief:direct-pilot-audit` | PASS | Eight effect-free direct items; option-level provenance and affinity isolation remain valid; zero validation errors/failures |
| `npm run research:coverage` | PASS | Current production question, anchor, ontology, registry, contextual-placement, and research-candidate coverage remains valid; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | New `integratedBeliefStructureTrace` and all other structural checks are true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npm run qa -- --workers=1` | PASS | Minos serial Playwright suite 10/10 against the updated preview; primary structure trace assertions, responsive workbench, share-link, missing-information, transition, and malformed-share paths pass; preview was stopped and port 4178 verified closed |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The local structure trace and result rendering are verified, but the objective remains incomplete. The six open gates are cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Local structural checks, source-backed configurations, synthetic profiles, and browser QA do not substitute for those external studies.

## V109 observed verification — Green Politics contextual conception bridge — 2026-08-30

V109 adds two source-backed qualitative conceptions to the existing contextual `green-politics` profile while preserving the current production contract. The target remains a meso contextual/catalog-only node with twelve quarantined candidates at descriptive/normative/prescriptive 4/4/4, zero direct production questions, and no anchor, coefficient, threshold, picker, morphology, or score path. The current worktree also contains pre-existing unowned V108 belief-structure and source-key changes; those were preserved and were included in runtime verification but not in the owned staged tranche.

| Check | Status | Notes |
|---|---|---|
| `git diff --check` before verification | PASS | No whitespace errors in the current worktree diff |
| `npx vitest run src/research.test.ts --reporter=dot` | PASS | Focused research-workbench contract 89/89, including Green Politics source resolution, conception layers, quarantine, contextual placement, and non-scored governance |
| `npm run test:run -- --reporter=dot` | PASS | 5 files, 152/152 Vitest tests |
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree and audit scripts typecheck |
| `npm run build` | PASS | 42 modules; existing Vite large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `npm run research:coverage` | PASS | 1,500 production questions at 500/500/500; 119 production anchors; 124 editorial anchors; 125 ontology nodes; 2 registry entries; 6 contextual placements; 1,524 candidates; 125 target rows with conceptions; 133 profile conceptions; zero validation errors; `green-politics` has 2 conceptions and 0 direct questions |
| `npm run research:anchor-reachability` | PASS | Exit 0; 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact. Full-competition ranks remain structural diagnostics only |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 production items; all remain `facet-proxy`; three construct gaps remain explicit; interpretation remains non-cognitive and non-psychometric |
| `npm run belief:morphology-audit -- --summary` | PASS | 119/119 source-backed canonical configurations with classified conceptions; zero validation errors/failures; mixed and neutral safeguards remain intact |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct items remain isolated; zero direct items are in production; zero validation errors/failures |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | Exit 1 is correct: structural eligibility is true, but six required external-study gates remain `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npm run qa -- --workers=1` | FAIL / NOT VERIFIED | The preview process received SIGTERM during the share-link test; tests 8–10 then reported `ERR_CONNECTION_REFUSED`. This is a preview-lifecycle failure, not evidence against the V109 research contract |
| `E2E_BASE_URL=http://127.0.0.1:4179 npm run qa -- --workers=1` | PASS | 10/10 Playwright scenarios in 5.3 minutes against a separately supervised production preview; preview stopped and port 4179 verified closed |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The source pass uses [Carter's chapter on Green political thought](https://doi.org/10.1017/CBO9780511819179.006) for ecological limits, human–nature relations, grassroots democracy, decentralization, social justice, and plural green routes; the [Stanford Encyclopedia of Philosophy Environmental Ethics entry](https://plato.stanford.edu/entries/ethics-environmental/) for moral and political variation, environmental justice, sustainability, and future-generation boundaries; and [Ostrom's *Governing the Commons*](https://doi.org/10.1017/CBO9780511807763) only for comparative institutional diversity and self-governance terminology. The conception records remain editorial context outside respondent observations, affinity weights, morphology output, or score effects. No cognitive review, respondent study, substitute simulation, expert adjudication, psychometric validation, reliability/validity estimate, invariance/DIF study, empirical classification, population/consequence review, or current-actor inference was run or implied. This is neutral taxonomy/provenance authoring, not a comparison, assessment, ranking, recommendation, or decision between political ideologies, parties, candidates, policies, or issues.

## V109 observed verification — morphology basis provenance — 2026-08-30

This continuation connects each directional morphology commitment to the primary profile dimensions that contextualize its construct and records the evidence form actually used for provisional fit. Explicit source-backed conceptions are retained as indeterminate context, while categorical pilot and relational records remain separate from the directional basis. The change adds explanation and traceability without adding an affinity weight, changing the fixed ontology, or promoting proxy evidence to validated measurement.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree and audit scripts typecheck after the morphology provenance fields and UI changes |
| `npm run test:run -- src/belief-structure.test.ts --reporter=dot` | PASS | Focused structure contract 27/27 |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite 152/152 across five files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:direct-pilot-audit` | PASS | Eight effect-free categorical pilot items; direct evidence remains isolated from legacy scoring and affinity; zero validation errors/failures |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations with classified conceptions; adversarial checks remain true; zero validation errors/failures |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 production items at 500/500/500; all remain facet proxies; three construct gaps and 15 quarantined candidates remain explicit |
| `npm run research:coverage` | PASS | 1,500 production questions; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 candidates across 127 targets; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 14 structural checks pass and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npm run qa -- --workers=1` | PASS | Full serial Minos suite 10/10 in 5.3 minutes against the updated preview; preview was stopped and port 4178 verified closed |
| `E2E_BASE_URL=http://127.0.0.1:4178 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1` | PASS | Post-assertion focused results scenario 1/1 in 1.8 minutes; new fit-source and primary-dimension assertions pass |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The six external gates remain `NOT RUN`: cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. The new fields are a structural explanation seam; they are not evidence that the underlying proxy model has passed those studies.

## V110 observed verification — claim-layer preservation — 2026-08-30

V110 keeps descriptive, normative, and prescriptive claim type orthogonal to the substantive integrated dimensions. Each structure row now reports observed and directional item-record counts by claim layer. The relational evidence contract also preserves the follow-up layer through profile construction, morphology trace projection, validation, and rendering; a layer mismatch is rejected rather than silently relabeled.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The repaired relational layer contract, per-dimension layer counts, audit checks, and UI compile successfully |
| `npm run test:run -- src/belief-structure.test.ts src/belief-followups.test.ts --reporter=dot` | PASS | Focused belief-structure and relational-contract tests 38/38 |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite 152/152 across five files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free categorical pilot items; layer-aware direct evidence remains isolated; zero validation errors/failures |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; adversarial layer and isolation checks remain valid; zero validation errors/failures |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 production items at 500/500/500; all remain facet proxies; three construct gaps and 15 quarantined candidates remain explicit |
| `npm run research:coverage` | PASS | 1,500 production questions; 119 production anchors; 124 editorial anchors; 125 ontology nodes; two registry entries; six contextual placements; 1,524 candidates across 127 targets; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 14 structural checks pass and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1` | PASS | Post-layer-contract focused results scenario 1/1 in 1.8 minutes; claim-layer, morphology provenance, direct/relational, share, and primary-profile assertions pass |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The six external gates remain `NOT RUN`: cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Claim-layer preservation improves interpretability and contract integrity; it does not validate the underlying measure or its cross-context use.

## V111 observed verification — explicit relationship participant trace — 2026-08-30

V111 repairs the integrated-profile routing for multi-construct direct and relational records. Each record is now attached to every profile dimension named by its explicit `constructIds`, rather than only to a dimension selected by its evidence kind. Morphology contextual basis records carry the same linked dimension ids. This preserves the relationship's participants and explanation path without creating a scalar signal, a new weight, an affinity contribution, or an ontology change.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | TypeScript and audit contracts compile with dimension-linked direct/relational morphology basis records |
| `npm run test:run -- src/belief-structure.test.ts src/belief-followups.test.ts --reporter=dot` | PASS | Focused structure and follow-up contract tests 38/38 |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite 152/152 across five files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct items; construct and structure attachment plus legacy/affinity isolation remain valid |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; adversarial and relational isolation checks remain valid; zero validation errors/failures |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97; 1,500 items at 500/500/500; all remain facet proxies; three construct gaps and 15 candidates remain explicit |
| `npm run research:coverage` | PASS | Existing production, anchor, ontology, registry, contextual-placement, conception, and research-bank validation remains green |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 16 structural checks are true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4178 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1` | PASS | One serial production-preview results scenario passed in 1.8 minutes; structure, direct/relational, morphology, share, and legacy-compatibility assertions remained green |
| `E2E_BASE_URL=http://127.0.0.1:4178 npx playwright test tests/explore/explore.spec.ts --workers=1` | PASS | Intro exploration passed; report contains no console errors, page errors, or failed requests; screenshot/accessibility artifact collection completed |
| `git diff --check` | PASS | No whitespace errors |
| Preview cleanup / port 4178 | PASS | Preview stopped after browser checks; no listener remained on port 4178 |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The local participant trace is verified, but the overall objective remains incomplete. The six open gates are cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Explicit construct links and deterministic tests do not substitute for those external studies.

## V110 observed verification — contextual bridge provenance — 2026-08-30

V110 adds source-backed qualitative conception bridges for the existing `green-communitarianism` and `liberal-conservatism-context` contextual meso targets. Both remain catalog-only and non-scored, with twelve quarantined candidates each, zero direct production questions, no canonical path, and explicit `retain-contextual` governance. No scoring, belief-model, morphology, share, or ontology semantics changed.

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts --reporter=dot` | PASS | Focused research file: 90/90 tests |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 153/153 tests across five files |
| `npx tsc --noEmit --pretty false` | PASS | TypeScript and research/governance contracts compile |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm audit --omit=dev --audit-level=high` | PASS | Zero vulnerabilities reported |
| `npm run research:coverage` | PASS | 1,500 production questions; 127 targets/profiles/conception rows; 1,524 quarantined candidates; zero validation errors |
| `npm run research:anchor-reachability` | PASS | 119 production anchors; zero validation errors/failures; isolated routing remains intact; overlap ranks remain diagnostics only |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 facet-proxy items; complete audit coverage; three unmeasured constructs and 15 gap candidates remain visible |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; zero validation/failure counts; adversarial isolation checks remain true |
| `npm run belief:direct-pilot-audit` | PASS | Eight effect-free categorical pilot items; isolation and provenance checks pass |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All structural checks true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4180 npm run qa -- --reporter=list` | PASS | Stable Vite server; all 10 Playwright scenarios passed in 1.8 minutes, including full research-target iteration and all-layer share flow |
| `git diff --check` | PASS | No whitespace errors in the worktree and staged diff |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The structural and browser evidence confirms the V110 code path and quarantine boundary only. It does not validate respondent interpretation, cognition, reliability, validity, invariance, population behavior, consequences, or political classification. The six external gates remain `NOT RUN`, and no substitute or personal ideological assessment is claimed.

## V112 observed verification — relational dimension adjacency trace — 2026-08-30

V112 adds a derived `relatedDimensionIds` trace to each integrated belief-structure dimension. The trace is calculated only from explicit relational records and their declared `constructIds`, so it preserves cross-dimension participants for explanation without adding a scalar signal, affinity weight, morphology contribution, or ontology change. The results UI exposes the links as an explicit relationship line, while dimensions without such records remain visibly unlinked rather than being treated as theoretically unrelated.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree, structure adjacency type, UI rendering, and completion audit compile |
| `npm run test:run -- src/belief-structure.test.ts src/belief-followups.test.ts --reporter=dot` | PASS | Focused belief-structure and relational-contract tests: 38/38 |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 153/153 across five files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; existing large-client-chunk advisory remains |
| `npx vite-node scripts/audit-belief-direct-pilot.ts` | PASS | Eight effect-free direct items; evidence remains visible in the profile and isolated from legacy scoring and affinity; zero validation errors/failures |
| `npx vite-node scripts/audit-belief-morphology.ts` | PASS | 119 source-backed canonical configurations; adversarial, causal/principle, priority, conditional, contradiction, and relational-isolation checks remain true |
| `npx vite-node scripts/audit-belief-measurement.ts --summary` | PASS | 1,500/1,500 production items audited at 500/500/500; all remain facet proxies; three uncovered constructs and 15 quarantined research candidates remain explicit; zero validation errors |
| `npx vite-node scripts/audit-research-coverage.ts` | PASS | 1,500 production questions; 119 production anchors; 125 ontology nodes; 2 registry entries; 6 contextual placements; 1,524 research candidates; 127 target rows with profiles/conceptions; zero validation errors |
| `npx vite-node scripts/audit-anchor-reachability.ts` | PASS | 119 production anchors; zero validation errors/failures; isolated three-layer routing remains intact |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 17 structural checks are true and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4179 npm run qa -- --workers=1` | PASS | Full serial Minos Playwright suite: 10/10 in 5.3 minutes; includes the V112 visible relationship-link assertion and the exploratory route |
| Explorer issue report | PASS | `test-results/explorer/report.json` contains 0 pages with console errors, page errors, or failed requests |
| Preview cleanup / port 4179 | PASS | Preview stopped after browser checks; no listener remained on port 4179 |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The V112 local trace is verified, but the comprehensive objective remains incomplete. The six open gates are cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Local structural checks, synthetic profile projections, source provenance, and browser QA do not substitute for those external studies. The three unmeasured dimensions remain explicit: priorities/conflicts, epistemic stance, and heterodoxy/contestation.

## V113 observed verification — quarantined gap-candidate response seam — 2026-08-30

V113 adds an optional typed response seam for the 15 existing research candidates covering priority/conflict rules, epistemic stance, and heterodoxy/contestation. Candidate selections produce separate `BeliefGapEvidence` records and versioned share answers. The profile and results UI expose the trace, but candidate evidence remains quarantined: it is not a production question, scalar observation, construct signal, morphology fit input, canonical affinity contribution, or legacy scorer input. A selected no-view option is share-restorable but is omitted from substantive candidate evidence.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Candidate evidence, profile/structure fields, scorer signature, share envelope, React session state, and tests compile |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 159/159 across seven files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight direct categorical items remain effect-free; zero validation/failure errors |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; adversarial and affinity-isolation checks remain true; zero validation/failure errors |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 production questions audited; all remain facet proxies; priority/conflict, epistemic stance, and heterodoxy/contestation remain uncovered; 15 candidates remain quarantined |
| `npm run research:coverage -- --summary` | PASS | Current production, ontology, source, research-bank, contextual-placement, and candidate coverage validation remains green |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; isolated three-layer reachability and validation remain green |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 20 structural checks are true and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4180 npm run qa -- --workers=1 --reporter=list` | PASS | Full serial Minos suite: 10/10 in 5.4 minutes; includes candidate selection, quarantined profile trace, and share restoration |
| Explorer issue report | PASS | `test-results/explorer/report.json`: one inspected route; zero console errors, page errors, or failed requests |
| Preview cleanup / port 4180 | PASS | Preview stopped after QA; no listener remained on port 4180 |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The V113 local evidence verifies the response seam and its non-scoring quarantine only. It does not validate candidate comprehension, response-process interpretation, expert content, reliability, validity, invariance, population behavior, consequences, or respondent morphology. The six external gates remain `NOT RUN`, the three production constructs remain unmeasured, and the overall objective remains incomplete.

## V114 observed verification — construct/layer coverage and research shelf expansion — 2026-08-30

V114 adds an explicit construct-by-claim-layer audit and four source-linked candidates for the layer gaps it exposed. The production bank remains fixed at 1,500 facet-proxy questions, split 500/500/500 across descriptive, normative, and prescriptive layers. The audit now reports ten uncovered declared construct/layer cells and the research shelf contains 19 quarantined candidates: five for each entirely unmeasured construct plus one prescriptive concept/conception candidate, one normative political-economy candidate, one descriptive change-mechanism candidate, and one normative change-transition candidate. No candidate was promoted into production scoring.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Construct/layer summary types, candidate records, completion checks, UI rendering, and browser-test import compile |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 162/162 tests across eight files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains (`index-Zd44RATn.js`, 2,867.20 kB) |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 items audited; all remain facet proxies; ten uncovered construct/layer pairs are explicit; zero validation errors |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct categorical pilot items; zero validation/failure errors and unchanged scoring isolation |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; adversarial and affinity-isolation checks remain true; zero validation/failure errors |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 production anchors, 125 ontology nodes, 2 registry entries, 6 contextual placements, 1,524 research-bank candidates; zero validation errors |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; isolated three-layer routing remains intact |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 22 structural checks are true and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4181 npm run qa -- --workers=1 --reporter=list` | PASS | Full serial Playwright suite: 10/10 in 5.3 minutes after a corrected stale test import; affected all-layer scenario also passed 1/1 in 1.8 minutes |
| Explorer issue report | PASS | `test-results/explorer/report.json`: one inspected route; zero console errors, page errors, or failed requests |
| Preview cleanup / port 4181 | PASS | Preview stopped after QA; port 4181 was closed after the run |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The V114 local evidence improves gap diagnosis and candidate traceability but does not close any external validation gate. The three entirely unmeasured constructs remain `not-yet-measured`; all 19 candidates remain quarantined and non-scoring. Cognitive response-process review, expert content adjudication, empirical reliability/validity, invariance/DIF, population/consequence review, and held-out respondent morphology evidence remain `NOT RUN`, so the overall objective remains incomplete.

## V115 observed verification — construct-level morphology fit provenance — 2026-08-30

V115 moves directional morphology fit from facet-level signals to the linked construct-level signal in the integrated `BeliefProfile`. Facet signal and facet evidence-question ids remain separate provenance context; direct categorical, relational, and gap-candidate evidence remains excluded from affinity. The `configuration-projection` model is version 3, and the legacy scorer remains a compatibility regression path.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current TypeScript tree, construct-level morphology basis, provenance fields, UI labels, and audit additions compile; the same check also ran through `npm run build` |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 163/163 tests across eight files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; existing large-client-chunk advisory remains (`index-CeYMp5xP.js`, 2,867.67 kB) |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 production items audited at 500/500/500; all remain facet proxies; ten uncovered construct/layer pairs and 19 quarantined candidates remain explicit; zero validation errors |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct categorical pilot items remain isolated from construct signals, morphology affinity, and legacy scoring; zero validation/failure errors |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; all target fixtures round-trip; `morphologyFitUsesConstructProfile: true`; all adversarial and isolation checks true; zero validation/failure errors |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 production anchors, 125 ontology nodes, 2 registry entries, 6 contextual placements, 1,524 research-bank candidates, and 127 profiled/conception-bearing target rows; zero validation errors |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; isolated three-layer routing remains reachable with zero validation errors/failures |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 23 structural checks are true and `structuralEligible` is true; exit 1 remains correct because the six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4182 npm run qa -- --workers=1 --reporter=list` | PASS | Full serial Playwright suite: 10/10 in 5.3 minutes, including explorer, morphology evidence, share, all-layer, malformed-share, and responsive scenarios |
| Explorer issue report | PASS | `test-results/explorer/report.json` contains one inspected route with zero console errors, page errors, and failed requests |
| Preview cleanup / port 4182 | PASS | Preview stopped after QA and no listener remained on port 4182 |
| `git diff --check` | PASS | No whitespace errors after the V115 documentation and source changes |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

V115 closes the local construct-to-morphology provenance seam but does not establish comprehension, expert agreement, reliability, validity, invariance, population/consequence behavior, or held-out respondent morphology. The three priority/conflict, epistemic-stance, and heterodoxy/contestation dimensions remain unmeasured, the 19 gap candidates remain quarantined, and the six external gates remain `NOT RUN`; the objective remains incomplete.

## V116 observed verification — integrated structure signal trace — 2026-08-30

V116 exposes each single-construct dimension's provisional construct signal and its directional evidence-question ids in the integrated belief-structure trace. The structure reuses the construct result rather than recalculating a second scalar, and the UI states that the value is provisional. Mixed, no-view, unanswered, direct categorical, relational, and quarantined candidate evidence remain outside this scalar field.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Structure signal type, profile construction, UI summary, and completion-audit comparison compile |
| `npm run test:run -- src/belief-structure.test.ts src/belief-gap-pilot.test.ts src/belief-followups.test.ts --reporter=dot` | PASS | Focused structure, mixed-response, candidate-quarantine, and relational tests: 42/42 |
| `git diff --check` | PASS | No whitespace errors after the V116 source and documentation changes |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | Exit 1 is correct; all 24 structural checks are true and `structuralEligible` is true, while the six required external-study gates remain `NOT RUN` |
| Full Vitest suite | PASS | Current-tree suite: 164/164 tests across eight files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; current artifact `index-Cm3TK8jC.js` is 2,868.31 kB (640.80 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 production items audited at 500/500/500; all remain facet proxies; ten uncovered construct/layer cells and 19 quarantined candidates remain explicit; zero validation errors |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct categorical pilot items remain isolated from scalar signals, morphology, and legacy scoring; zero validation/failure errors |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; construct-profile fit check and adversarial/isolation checks pass; zero validation/failure errors |
| `npm run research:coverage -- --summary` | PASS | Current production/research coverage and provenance audit exits 0 with zero validation errors |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors and isolated three-layer reachability audit exits 0 with zero validation errors/failures |
| Fixed-preview serial Playwright suite | PASS | `E2E_BASE_URL=http://127.0.0.1:4183 npm run qa -- --workers=1 --reporter=list`: 10/10 in 5.4 minutes, including the updated primary-profile surface |
| Focused signal-disclosure Playwright case | PASS | `E2E_BASE_URL=http://127.0.0.1:4184 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1 --reporter=list`: 1/1 in 1.8 minutes; the new `Provisional construct signal` assertion passed |
| Explorer issue report | PASS | One inspected route with zero console errors, page errors, or failed requests |
| Preview cleanup / port 4183 | PASS | Preview stopped after QA; no listener remained on port 4183 |
| Focused preview cleanup / port 4184 | PASS | Focused preview stopped after the signal-disclosure case; no listener remained on port 4184 |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The V116 implementation remains subject to the six external validation gates: cognitive response process, expert content adjudication, empirical reliability/validity, invariance/DIF across intended contexts, population/consequence review, and held-out respondent morphology. Local structural checks and browser QA cannot substitute for those study-specific records; the overall objective remains incomplete until the completion ledger is legitimately advanced.

## V117 observed verification — canonical question-coverage reconciliation — 2026-08-30

V117 corrects the Islamism configuration-to-item mismatch and adds the canonical target question-coverage audit to the existing completion harness. The current shared research bank also contains the source-backed, effect-free Confucian Political Thought registry-only tranche; tests now preserve the distinction between optional qualitative registry profiles and required non-registry profiles.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current configuration, coverage-audit, completion-harness, test, and package-script changes compile |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 168/168 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-DsyWWTdf.js` 2,884.58 kB (644.64 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 production items audited at 500/500/500; dispositions are 1,452 preserve, 1 rewrite, 41 split, and 6 redundant; zero validation errors |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct categorical pilot items remain isolated from scalar signals, morphology affinity, and legacy scoring; zero validation/failure errors |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; 119 synthetic profiles and provisional target candidates; explicit research conception count 119; zero validation/failure errors |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets; all 4/4/4 target blocks and all provisional morphology candidates pass; zero validation errors/unexpected failures; four prescriptive layers remain explicit `not-established` open gaps |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 production anchors, 124 editorial anchors, 125 ontology nodes, 3 registry entries, 6 contextual placements, 1,536 research candidates across 128 targets; 127 targets have qualitative profiles/conceptions; zero validation errors |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; full-competition rank diagnostics remain non-validating overlap measures |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 28 structural checks are true and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4185 npm run qa -- --workers=1 --reporter=list` | PASS | Fixed-preview serial Playwright suite: 10/10 in 5.4 minutes; the updated all-layer/share flow passed |
| Explorer issue report | NOT RUN | The explorer test passed as part of the suite, but no durable `test-results/explorer/report.json` was present after this run, so a separate zero-error report is not claimed |
| Preview cleanup / port 4185 | PASS | Preview stopped after QA; no listener remained on port 4185 |
| `git diff --check` | PASS | No whitespace errors |
| Docker/hosted delivery | NOT RUN | No container, hosted-runtime, or production-readiness claim is made |

The Islamism normative question block now has a direct source-backed profile commitment for its existing equality/social-justice item. The four prescriptive open gaps are intentionally retained as underdetermined rather than forced into an institutional score. The six external gates remain `NOT RUN`, so the overall objective remains incomplete despite the local structural and browser passes.

## V118 observed verification — adversarial conception and weak-profile matrix — 2026-08-30

V118 expands the existing morphology audit's adversarial fixture matrix. It does not add a production question or alter scoring. The added checks cover neighboring direct conceptions of political freedom, different distributive principles behind the same broad policy context, alternative priority and conditional rules, unresolved contradiction, and a weak half-strength directional profile. Direct, relational, and categorical pilot selections remain contextual evidence and are required not to alter morphology or legacy affinity traces.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 170/170 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-DsyWWTdf.js` 2,884.58 kB (644.64 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets; zero validation errors and zero blocking failures; four intentional `not-established` open gaps remain visible without failing the CLI |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 source-backed canonical configurations; all named adversarial checks true, including `neighboringConceptionsVisible`, `neighboringConceptionsDoNotChangeAffinity`, `contradictionDoesNotChangeAffinity`, and `weakDirectionalProfileRemainsProvisional`; zero validation/failure errors |
| Neighboring conception isolation | PASS | `non-interference` and `non-domination` remain distinct direct profile statements while the morphology affinity trace is unchanged |
| Same policy / different principle isolation | PASS | Alternative distributive reasons remain visible in direct evidence while affinity remains unchanged |
| Priority/conditional relational isolation | PASS | Alternative rules and conditions remain explicit and attached to constructs without a hidden morphology or legacy-score contribution |
| Contradiction isolation | PASS | An unresolved contradiction is visible as relational evidence with no invented coherence score and no affinity change |
| Weak directional profile | PASS | Half-strength responses remain `partial`, keep construct signals at or below `0.5`, and yield only provisional morphology candidates |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 28 structural checks are true and `structuralEligible` is true; the exit remains nonzero because the six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors after the audit and documentation changes |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V118 strengthens local adversarial traceability but does not provide respondent, cognitive, psychometric, empirical, invariance, population, or held-out validation. The completion objective therefore remains `INCOMPLETE` / fail-closed.

## V119 observed verification — fail-closed target evidence trace — 2026-08-30

V119 removes the target-trace fixture's zero-alignment fallback. The audit now preserves mixed/depends responses for target-tagged items that are not represented by a determinate source-backed configuration commitment, and records representation posture per target/layer. The four broad-family prescriptive layers with intentionally indeterminate configuration direction remain open data rather than synthetic directional evidence.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- src/ideology-question-coverage.test.ts --reporter=dot` | PASS | Focused coverage suite: 7/7 tests; normal target traces pass, mixed unmatched items remain profile evidence, indeterminate layers remain `not-established`, and effects-removal negative control fails closed |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 172/172 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-DsyWWTdf.js` 2,884.58 kB (644.64 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets; 4/4/4 target blocks; zero validation errors and zero blocking failures; four intentional `not-established` open gaps remain visible |
| `npx tsc --noEmit --pretty false` | PASS | Target trace posture fields, renamed directional-layer summary, and updated tests compile |
| Zero-alignment fallback removal | PASS | No target item is forced from a zero configuration alignment into a directional answer; unmatched items remain mixed/depends |
| Negative-control trace | PASS | Removing `n-classical-liberalism-01` effects produces a target-layer trace gap and a blocking coverage failure |
| `git diff --check` | PASS | No whitespace errors after the source, documentation, and test updates |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V119 improves evidence integrity in the local target trace but does not validate the instrument. The primary profile and morphology remain provisional; the six external gates remain `NOT RUN`, and the overall objective remains `INCOMPLETE` / fail-closed.

## V120 observed verification — research-candidate rationale disclosure — 2026-08-30

V120 adds a collapsed, per-candidate disclosure for the quarantined gap shelf. It exposes the declared gap, scholarly rationale, and same-answer/different-reason risk next to the existing response controls and source links. The change is presentation-only and does not promote candidate evidence into production scoring or morphology.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- src/belief-gap-pilot.test.ts src/belief-gap-research.test.ts --reporter=dot` | PASS | Candidate contract, quarantine, malformed-input rejection, and scoring-isolation tests: 6/6 |
| `npx tsc --noEmit --pretty false` | PASS | New disclosure markup and styles compile |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-CJjzlTFf.js` 2,885.12 kB (644.72 kB gzip); existing large-client-chunk advisory remains |
| `E2E_BASE_URL=http://127.0.0.1:4186 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1 --reporter=list` | PASS | Built-preview completion/share scenario: 1/1 in 1.8 minutes; rationale disclosure, candidate selection, share restoration, primary profile, morphology, and legacy compatibility assertions passed |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V120 improves inspectability of the research shelf but does not provide respondent or instrument validation. The six external gates remain `NOT RUN`, and the overall objective remains `INCOMPLETE` / fail-closed.

## V121 observed verification — declared claim-layer status boundary — 2026-08-30

V121 corrects the construct-level status reported for mapped proxies whose declared claim-layer scope is not fully represented in the production bank. An all-directional answer map now leaves political economy and change strategy `partial`, because their declared normative or descriptive/normative cells have no production items; their per-construct layer coverage remains explicit. The completion harness adds a structural assertion that a construct with a declared item-layer gap cannot be reported as `observed`.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- src/belief-structure.test.ts --reporter=dot` | PASS | Focused belief-structure suite: 27/27; political economy and change strategy retain `partial` status with their empty declared layers visible in `layerCoverage` |
| `npx tsc --noEmit --pretty false` | PASS | Status computation, completion-audit invariant, and regression assertions compile |
| `npx vite-node scripts/audit-belief-measurement.ts --summary` | PASS | 1,500/1,500 production items; 11 constructs; ten uncovered declared construct/layer pairs remain explicit; three entirely unmeasured constructs remain listed |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 29 structural checks pass, including `declaredLayerGapsRemainNonObserved`; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 172/172 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-DsMwCRS4.js` 2,885.17 kB (644.79 kB gzip); existing large-client-chunk advisory remains |
| `E2E_BASE_URL=http://127.0.0.1:4187 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1 --reporter=list` | PASS | Rebuilt-preview completion/share scenario: 1/1 in 1.8 minutes; preview was stopped afterward |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V121 improves the honesty of local claim-layer status and makes the gap machine-checkable, but it does not add evidence for the absent cells or validate the proxy model. The fixed ontology, production questions, legacy scorer, morphology configuration, share contract, and quarantined research candidates remain unchanged. The overall objective remains `INCOMPLETE` / fail-closed.

## V122 observed verification — under-determined morphology diagnostics — 2026-08-30

V122 separates source-backed configuration projections that lack sufficient defining evidence from the ordered provisional candidate set. The new adversarial fixture uses mixed descriptive/normative answers with directional prescriptive answers: 110 provisional candidates remain in the public ordering and 9 under-determined projections are retained in the diagnostic collection. An all-mixed profile has zero public candidates and 119 under-determined diagnostics. The V121 claim-layer status correction remains included in this tranche.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The version-4 morphology contract, UI disclosure, audits, and tests compile |
| `npx vitest run src/morphology-separation.test.ts src/belief-structure.test.ts --no-file-parallelism --testTimeout=60000` | PASS | Focused structural suites: 30/30 tests |
| `npx vitest run --no-file-parallelism --testTimeout=60000` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build; 42 modules; existing large-client-chunk advisory remains |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations; 119 canonical round trips; separated provisional/under-determined fixture checks pass; zero validation errors and zero failures |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 production items; 11 constructs; ten uncovered declared construct/layer pairs remain explicit; priority/conflict, epistemic stance, and heterodoxy/contestation remain unmeasured |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight direct categorical pilot items remain isolated from scalar scoring and morphology affinity |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets; 4/4/4 target blocks; zero validation errors and zero blocking failures; four contested prescriptive gaps remain open |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 canonical targets, and 1,536 quarantined research candidates across 128 targets; zero validation errors |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; rank and top-three outputs remain structural overlap diagnostics |
| `npx playwright test tests/sorter.spec.ts -g "under-determined configurations" --workers=1` | PASS | Real 1,500-question browser flow and diagnostic disclosure: 1/1 in 1.8 minutes |
| `npm run qa` | PASS | Full browser suite: 11/11 in 2.3 minutes, including the under-determined disclosure, full completion/share, research workbench, missing-information, and malformed-share scenarios |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 29 structural checks pass and `structuralEligible` is true; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `git diff --check` | PASS | No whitespace errors |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V122 improves the interpretive boundary without adding production items or ideology nodes. Under-determined records remain inspectable but are not ranked, selected, or treated as identity assignments. Local structural, audit, and browser evidence does not establish a respondent measure, cognitive validity, psychometric validity, invariance, population/consequence safety, or empirical morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.

## V122 observed verification — under-determined morphology diagnostics — 2026-08-30

V122 closes a public interpretation leak in the configuration projection. Configuration records without enough defining support remain inspectable as `underDeterminedCandidates`, but they are excluded from the ordered `candidates` collection. The ranked collection therefore contains only `provisional-candidate` records; an all-mixed profile stays `not-derived` with zero ranked candidates while retaining withheld diagnostics. Diagnostic margins remain non-ranking metadata.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- src/morphology-separation.test.ts --reporter=dot` | PASS | Focused morphology separation suite: 3/3; provisional and under-determined records are disjoint, and all-mixed output remains fail-closed |
| `npx tsc --noEmit --pretty false` | PASS | Under-determined morphology contract, diagnostic rendering, audit fixture, and browser assertions compile |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-BGpMdueU.js` 2,886.84 kB (645.22 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical configurations round-trip; 119 source-backed; 119 provisional target records; all named adversarial checks true; under-determined diagnostic separation passes with zero failures |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 29 structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4188 npx playwright test tests/sorter.spec.ts -g "keeps under-determined configurations visible without ranking them as candidates" --workers=1 --reporter=list` | PASS | Rebuilt-preview under-determined disclosure scenario: 1/1 in 1.7 minutes; withheld records are visible as diagnostics and absent from ranked candidate ordering |
| `git diff --check` | PASS | No whitespace errors after the morphology, audit, test, and documentation changes |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V122 improves the separation between an inspectable configuration diagnostic and a ranked provisional candidate, but it does not establish a respondent measure or identity classification. The fixed ontology, source-backed configuration records, production effects, legacy scorer, share contract, and external validation ledger remain unchanged. The overall objective remains `INCOMPLETE` / fail-closed.

## V123 observed verification — source-backed configuration relationships — 2026-08-30

V123 adds an explicit research relationship layer to the configuration explanation. The first tranche contains 25 `source-backed-contested` relationship hypotheses across 13 canonical configurations, including an epistemic relation for Conservatism. Every participant resolves to one or more exact configuration commitments and every relationship retains source provenance. The records are rendered as theoretical configuration context and do not enter respondent observations, construct signals, morphology fit, affinity weights, or legacy scoring.

| Check | Status | Notes |
|---|---|---|
| `npm run test:run -- src/belief-structure.test.ts --reporter=dot` | PASS | Focused configuration suite: 27/27; relationship ids, contested posture, source provenance, and participant bindings are validated |
| `npx tsc --noEmit --pretty false` | PASS | Research relationship types, profile enrichment, configuration mapping, audit invariant, and UI disclosure compile |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-CXAsNm66.js` 2,899.10 kB (648.10 kB gzip); existing large-client-chunk advisory remains |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical/source-backed configurations; 25 researched relationships across 13 configurations; all participants resolved; all adversarial checks true; zero validation/failure errors |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass, including `researchedConfigurationRelationshipsAreTraceable`; exit 1 remains correct because six required external-study gates are `NOT RUN` |
| `E2E_BASE_URL=http://127.0.0.1:4189 npx playwright test tests/sorter.spec.ts -g "can complete all layers and create a versioned share link" --workers=1 --reporter=list` | PASS | Rebuilt-preview completion/share scenario: 1/1 in 1.8 minutes; the source-backed configuration relationship disclosure and existing evidence/share paths pass |
| `git diff --check` | PASS | No whitespace errors after the relationship layer, UI, audit, test, and documentation changes |
| Preview cleanup / port 4189 | PASS | Preview stopped after browser QA; no listener remained |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open |

V123 advances the researched configuration explanation while preserving the fail-closed boundary. The 25 relationship hypotheses are not exhaustive validation of the 119 canonical traditions; the remaining configurations retain explicit open relational gaps, and the six external validation gates remain `NOT RUN`. The overall objective remains `INCOMPLETE` / fail-closed.

## V124 observed verification — Confucian Political Thought qualitative profile bridge — 2026-08-30

V124 adds the missing qualitative profile, conception records, and relationship records for the existing Confucian Political Thought registry target. The profile is source-backed and contested, but remains research-only: the target has no production questions, no production anchor, no score contribution, and no respondent-facing classification path. The existing production and belief-structure contracts remain unchanged.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The Confucian profile, conception map, relationship map, audit fields, and focused test imports compile. |
| `npx vitest run src/confucian-research.test.ts src/research.test.ts --no-file-parallelism --testTimeout=60000` | PASS | 94/94 focused tests pass, including the registry-only boundary, 13 profile dimensions, 3 conceptions, 3 relationships, and source provenance assertions. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets; 128/128 profiles and conceptions, empty missing-id lists, and zero validation errors. |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets retain 4/4/4 question blocks, zero validation errors, and zero blocking failures; four contested prescriptive gaps remain explicitly open. |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 97 and all 1,500 production items remain covered by the existing facet-proxy measurement audit; three constructs remain unmeasured and 10 construct/layer cells remain open. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical/source-backed configurations and 25 existing canonical relationship records remain traceable; no registry-only Confucian record enters morphology. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass; exit 1 remains correct because six required external-study gates are `NOT RUN`. |
| `npx vitest run --no-file-parallelism --testTimeout=60000` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; 2,908.46 kB JavaScript / 650.10 kB gzip; existing large-client-chunk advisory remains. |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; isolated reachability remains the structural criterion and competition ranks remain diagnostics. |
| `npm run qa` | PASS | Full browser suite: 11/11 scenarios in 2.6 minutes, including inventory, research workbench, missing-information, under-determined diagnostics, completion/share, responsive, and malformed-share paths. |
| `git diff --check` | PASS | No whitespace errors after the profile bridge, audit field, test, and documentation changes. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The research coverage audit confirms that the qualitative bridge closes the sole missing profile/conception row without changing the production surface. Local TypeScript, unit, and structural evidence does not establish comprehension, expert agreement, psychometric validity, invariance, population/consequence safety, or respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed until those external gates are separately run and recorded.

## V125 observed verification — coarse morphology resolution posture

V125 adds an additive resolution seam to the primary configuration projection. Candidate records expose defining-commitment support separately from total configuration coverage, and the morphology result reports an explicit `insufficient-information`, `not-derived`, `coarse-neighborhood`, or `provisional-neighborhood` posture with at most five inspectable candidate ids. The candidate order and all scoring inputs remain unchanged.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The version-5 morphology contract, resolution record, candidate support fields, UI disclosure, and audit additions compile. |
| `npx vitest run src/morphology-separation.test.ts --no-file-parallelism --testTimeout=60000` | PASS | Focused morphology suite: 3/3; low-separation output is explicitly a coarse neighborhood, defining support is bounded, and all-mixed/under-determined behavior remains fail-closed. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations remain present; the explicit-resolution adversarial check passes; validation and failure counts are zero. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | Observed exit 1 with all 30 structural checks passing; the six required external-study gates remain `NOT RUN`. |
| Browser resolution disclosure | PASS | Explicit stable-server Playwright retest passed the completion/share scenario and displayed the resolution posture plus the no-unique-label disclosure. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The new resolution fields are structural observability only. They do not establish respondent comprehension, confidence calibration, psychometric or empirical validity, cross-context comparability, population safety, or a unique political identity classification; the overall objective remains `INCOMPLETE` / fail-closed.

## V126 observed verification — expanded source-backed configuration relationships — 2026-08-30

V126 extends the separate research relationship registry from the initial foundational tranche to 33 of the 119 canonical configuration owners. The registry now contains 66 `source-backed-contested` records across priority, conditionality, conflict-resolution, epistemic, and contestation kinds. The relationship statements bind to exact configuration commitments and source references, remain theoretical configuration context, and do not enter respondent observations, construct signals, morphology fit, affinity weights, or legacy scoring. The other 86 canonical owners retain the existing five explicit `not-established` relational constraint gaps.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The moved macro-family registry block, expanded relationship map, configuration aliases, and test expectations compile. |
| `npm run test:run -- src/belief-structure.test.ts --reporter=dot` | PASS | Focused configuration suite: 27/27; 33 public canonical configuration owners and 66 relationship records are checked, with source provenance and participant commitment bindings. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical/source-backed configurations; 66 source-backed-contested relationships across 33 canonical owners; all participants resolved; all adversarial checks true; zero validation/failure errors. |
| `npm run belief:question-coverage -- --summary` | PASS | 119 canonical targets retain 4/4/4 blocks and zero validation errors/failures; four contested prescriptive gaps remain explicitly open. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 128 research targets, 128/128 profile and conception rows, and zero validation errors. |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-WGO-2TwM.js` 2,927.64 kB (654.35 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run qa -- --workers=50% --reporter=list` | PASS | Rebuilt application browser suite: 11/11 scenarios in 2.4 minutes, including inventory, research-workbench quarantine, completion/share, missing-information, under-determined diagnostics, responsive layout, layer transitions, and malformed-share behavior. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true; exit 1 remains correct because the six required external-study gates are `NOT RUN`. |
| Preview cleanup / ports 4173, 4187, 4188, 4189 | PASS | No listener remained after browser QA. |
| `git diff --check` | PASS | No whitespace errors after the registry repair, test update, and verification notes. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

V126 broadens the source-backed explanatory layer without changing the fixed macro/meso/micro/hybrid ontology, production question bank, legacy scorer, morphology fit, or respondent-facing classification semantics. Local structural, synthetic, unit, build, and browser evidence does not establish comprehension, expert agreement, psychometric validity, invariance, population/consequence safety, or empirical respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.

## V127 observed verification — source-backed micro-branch relationships — 2026-08-30

V127 extends the separate relationship registry across ten additional canonical micro branches: Right-Libertarianism, Libertarianism, Anarcho-Syndicalism, Anarcho-Primitivism, Autonomist Marxism, Marxism-Leninism, Egalitarian-Liberal Feminism, Cultural/Spiritual Ecofeminism, Materialist/Socialist Ecofeminism, and Classical-Liberal Feminism. The current registry contains 86 `source-backed-contested` records across 43 of 119 canonical configuration owners. Each record names existing facet commitments and source references; the records remain theoretical, contested configuration context and do not enter respondent observations, construct signals, morphology fit, affinity weights, or legacy scoring. The other 76 canonical owners retain explicit open relational gaps.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The ten-branch relationship additions and updated coverage assertions compile. |
| `npm run test:run -- src/belief-structure.test.ts --reporter=dot` | PASS | Focused configuration suite: 27/27; 43 public canonical owners and 86 relationship records are checked for unique ids, contested posture, provenance, and participant commitment bindings. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical/source-backed configurations; 86 source-backed-contested relationships across 43 canonical owners; all participants resolved; all adversarial checks true; zero validation/failure errors. |
| `npm run test:run -- --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-BB-jg8nU.js` 2,937.48 kB (656.44 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run qa -- --workers=50% --reporter=list` | PASS | Rebuilt application browser suite: 11/11 scenarios in 2.5 minutes; completion/share, research-workbench quarantine, missing-information, under-determined diagnostics, responsive, transition, and malformed-share paths pass. |
| `npm run belief:measurement-audit -- --summary` | PASS | Current content remains 1,500/1,500 audited facet-proxy items; `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation` remain explicitly unmeasured; interpretation remains non-psychometric and non-empirical. |
| `npm run research:anchor-reachability -- --summary` | PASS | Current 119-anchor isolated reachability report has zero validation/failure errors; competition ranks remain structural overlap diagnostics only. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true; exit 1 remains correct because the six required external-study gates are `NOT RUN`. |
| Preview cleanup / ports 4173, 4187, 4188, 4189 | PASS | No listener remained after the browser run. |
| `git diff --check` | PASS | No whitespace errors after the micro-branch registry, test, and documentation updates. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

V127 increases the coverage of the researched explanatory layer without converting source-backed theory into respondent measurement. The fixed ontology, production question bank, legacy scorer, morphology fit, and fail-closed boundary remain intact. Local source, structural, synthetic, unit, build, and browser evidence still does not establish comprehension, expert agreement, psychometric validity, invariance, population/consequence safety, empirical classification, or respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.

## V128 observed current-tree verification — stable-server browser retest — 2026-08-30

After the V125 morphology-resolution seam and V126-V127 relationship tranches settled in the shared tree, the current implementation was rechecked as one combined delta. The production surface remains 1,500 questions, 119 scoring anchors, and the fixed macro/meso/micro/hybrid ontology. The researched configuration layer now reports 86 `source-backed-contested` relationships across 43 canonical owners; the morphology resolution posture remains additive, inspectable, and outside scoring.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current combined relationship, morphology-resolution, audit, UI, and test changes compile. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npx vitest run src/belief-structure.test.ts --no-file-parallelism --reporter=dot` | PASS | Focused configuration suite: 27/27; 43 owners and 86 relationships are checked for source provenance, contested posture, uniqueness, and participant bindings. |
| `npm run build` | PASS | TypeScript and Vite build: 42 modules; `index-BB-jg8nU.js` 2,937.48 kB (656.44 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, 128/128 profile and conception rows, and zero validation errors. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; four contested prescriptive gaps remain explicitly open. |
| `npm run belief:measurement-audit -- --summary` | PASS | All 1,500 items remain audited through the existing facet-proxy mode; `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation` remain unmeasured, with 19 quarantined research candidates. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical configurations; 86 source-backed-contested relationships across 43 owners; all participants resolved; all adversarial checks true; zero validation/failure errors. |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; competition ranks remain structural overlap diagnostics only. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | Exit 1 is correct: all 30 structural checks pass and `structuralEligible` is true, while the six required external-study gates remain `NOT RUN`. |
| `npm run qa` | FAIL — preview-server environment | The default 10-worker run ended with 6/11 passing and 5 failures after the preview server became unavailable: four long flows timed out waiting for the initial control and the malformed-share case received `ERR_CONNECTION_REFUSED`; no morphology assertion failure was reported. |
| Stable-server Playwright retest, research/completion/malformed-share subset | PASS | `E2E_BASE_URL=http://127.0.0.1:4174 ... --workers=1`: 3/3 passed in 3.7 minutes, including the new resolution disclosure and versioned share restoration. |
| Stable-server Playwright retest, missing-information/transition subset | PASS | `E2E_BASE_URL=http://127.0.0.1:4174 ... --workers=1`: 2/2 passed in 3.2 minutes. |
| `git diff --check` | PASS | No whitespace errors in the current tracked-objective diff. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The stable-server retries provide behavioral evidence for the affected browser paths, while the default QA failure remains recorded rather than converted into a pass. No cognitive review, respondent study, psychometric claim, empirical validity claim, or unique political identity classification is inferred from these checks; the overall objective remains `INCOMPLETE` / fail-closed.

## V129 observed verification — additional configuration relationship tranche — 2026-08-30

V129 verifies the next source-backed relationship tranche after the 40 new records for twenty canonical owners settled in the shared tree. The production question bank, fixed macro/meso/micro/hybrid ontology, question effects, morphology fit, candidate ordering, legacy scorer, and share contract remain unchanged. The research registry now exposes 146 `source-backed-contested` relationships across 73 of 119 canonical owners; the remaining 46 owners retain explicit open relational gaps.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The additional relationship records, public configuration aliases, and focused assertions compile. |
| `npx vitest run src/belief-structure.test.ts --no-file-parallelism --reporter=dot` | PASS | Focused configuration suite: 27/27; 73 relationship-bearing canonical owners and 146 unique contested records are checked for source provenance and participant commitment bindings. |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 canonical configurations; 146 source-backed-contested relationships across 73 owners; all participants resolved; all adversarial checks true; zero validation/failure errors. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite build: 42 modules; `index-OCimuFIL.js` 2,956.42 kB (660.36 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, 128/128 profile and conception rows, and zero validation errors. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; four contested prescriptive gaps remain explicitly open. |
| `npm run belief:measurement-audit -- --summary` | PASS | All 1,500 items remain audited through facet-proxy mode; `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation` remain unmeasured, with 19 quarantined research candidates. |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; competition ranks remain structural overlap diagnostics only. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | Exit 1 remains correct: all 30 structural checks pass and `structuralEligible` is true, while the six required external-study gates remain `NOT RUN`. |
| Stable-server Playwright relationship/production paths | PASS | The stable-server completion/share, research-workbench, malformed-share, missing-information, and layer-transition scenarios passed 5/5 in the current verification cycle. |
| `git diff --check` | PASS | No whitespace errors after the tranche documentation and assertion updates. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The relationship expansion improves source-backed explanatory coverage but does not make the configuration model exhaustive or empirically validated. No cognitive review, respondent study, psychometric or empirical validity claim, population/invariance claim, or unique political identity classification is inferred; the overall objective remains `INCOMPLETE` / fail-closed.

## V130 observed verification — source-backed relationship tranche for national, religious, feminist, communist, populist, conservative, and historical-fascist configurations — 2026-08-30

V130 verifies 46 additional canonical configuration owners: Arab Nationalism, Civic Nationalism, Ethnocultural Nationalism, Hindutva, Marxist Feminism, Neo-Nazism, Revolutionary Islamism, Council Communism, Guild Socialism, Maoism, Cultural Feminism, Cultural Nationalism, Lesbian Feminism, One-Nation Conservatism, Radical Republicanism, Left-Wing Populism, Neoconservatism, Paleoconservatism, Wasatiyya, Right-Wing Populism, Agrarian Populism, Religious Zionism, Socialist Feminism, Third-Positionism, National Syndicalism, Italian Fascism, Flemish-Belgian Fascism, Japanese Fascism, British Fascism, French Fascism, Falangism, Brazilian Integralism, Integral Nationalism, Legionary Fascism, White Nationalism, Salafi-Jihadism, Materialist Feminism, Trotskyism, Georgism, Degrowth, Distributism, Christian Socialism, Ujamaa, Labor Zionism, Islamic Feminism, and Deep Ecology. The separate research relationship registry now exposes 238 `source-backed-contested` records across all 119 canonical owners; no owner-level relationship gap remains. The fixed macro/meso/micro/hybrid ontology, production question bank, legacy scorer, morphology fit, candidate ordering, and respondent-facing semantics remain unchanged.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The 46-owner relationship additions and focused assertions compile. |
| `npx vitest run src/belief-structure.test.ts --no-file-parallelism --reporter=dot` | PASS | Focused configuration suite: 27/27; all 119 canonical owners and 238 unique contested records are checked for provenance and participant commitment bindings. |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 canonical configurations; 238 source-backed-contested relationships across all 119 owners; all participants resolved; all adversarial checks true; zero validation/failure errors. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 173/173 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-LcxSQeRQ.js` 3,020.41 kB (673.05 kB gzip); the existing large-client-chunk advisory remains. |
| `npx vite-node scripts/audit-research-coverage.ts --summary` | PASS | 1,500 production questions (500 per layer), 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, 128/128 profile and conception rows, and zero validation errors. |
| `npx vite-node scripts/audit-ideology-question-coverage.ts --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; four contested prescriptive gaps remain explicitly open. |
| `npx vite-node scripts/audit-belief-measurement.ts --summary` | PASS | All 1,500 items remain audited through facet-proxy mode; the 11-construct registry retains three unmeasured constructs (`priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation`) and 19 quarantined research candidates. |
| `npx vite-node scripts/audit-belief-direct-pilot.ts --summary` | PASS | Eight effect-free categorical pilot items remain outside production, all three relational/epistemic constructs remain uncovered by the pilot, isolation checks are true, and validation/failure counts are zero. |
| `npx vite-node scripts/audit-anchor-reachability.ts --summary` | PASS | 119 production anchors; zero validation/failure errors; full-competition ranks remain structural overlap diagnostics only. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true; exit 1 remains correct because the six required external-study gates remain `NOT RUN`. |
| `npm run qa -- --workers=50% --reporter=list` | INCOMPLETE / TERMINATED | The default concurrent run reached 6/11 passing scenarios before the runner terminated it with exit 143 at approximately 30 seconds; this is not converted into a pass. |
| Stable-server Playwright, research/completion/share/malformed-share subset | PASS | `E2E_BASE_URL=http://127.0.0.1:4174 ... --workers=1`: 3/3 passed in 3.0 minutes. |
| Stable-server Playwright, missing-information/transition subset | PASS | `E2E_BASE_URL=http://127.0.0.1:4174 ... --workers=1`: 2/2 passed in 3.0 minutes. |
| Preview cleanup / port 4174 | PASS | The explicitly started Vite server was stopped; no listener remained after the stable-server browser runs. |
| `git diff --check` | PASS | No whitespace errors in the final tracked-objective diff. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The tranche adds source-backed theoretical relationship context while preserving the separation from respondent evidence, construct signals, morphology fit, affinity weights, and legacy scoring. Local structural, synthetic, unit, build, browser, and reachability evidence does not establish comprehension, expert agreement, psychometric validity, invariance, population/consequence safety, empirical classification, or respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.


## V131 observed verification — remove exact duplicate production wording — 2026-08-30

V131 repairs the lowest failing question-layer signal identified by the measurement audit. Five production prompts were rewritten: `n-liberal-feminism-02`, `n-french-fascism-01`, `p-french-fascism-01`, `n-british-fascism-01`, and `p-british-fascism-01`. These five edits remove six duplicate-wording flags because one member of the liberal-feminism pair and both members of each historical-fascism pair were revised. The existing `Question.effects`, source references, fixed ontology, morphology path, candidate order, affinity basis, share contract, and legacy scorer remain unchanged. Content version is now 98.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current source and regression assertions compile with no output. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 174/174 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-C8Q_jiic.js` 3,020.68 kB (673.17 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 98; 1,500/1,500 items audited; `duplicate: 0`, `redundant: 0`; three constructs remain unmeasured and 19 candidates remain quarantined. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | All 119 canonical targets retain 4/4/4 blocks with zero validation errors; the four contested prescriptive gaps remain explicit. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations, 238 source-backed-contested relationships, all participants resolved, and zero validation/failure errors. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, 128/128 profile and conception rows, and zero validation errors. |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; isolated reachability has no validation/failure errors; full-competition ranks remain structural overlap diagnostics only. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct pilot items remain outside production; source/option validation and effect isolation pass. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true, but all six required external-study gates remain `NOT RUN`; exit 1 is expected. |
| `git diff --check` | PASS | No whitespace errors after the V131 source, test, and documentation updates. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

This is a bounded wording repair and regression result, not evidence of respondent comprehension, expert agreement, psychometric validity, invariance, population/consequence safety, empirical classification, or respondent-morphology validity. The comprehensive objective remains `INCOMPLETE` / fail-closed; the remaining mechanical review signals, unmeasured constructs, open claim-layer gaps, and external gates are still visible.

## V132 observed verification — remove the remaining single-item compound signal — 2026-08-30

V132 rewrites `n-collectivist-anarchism-04` from a coordinated “do and are affected” predicate to the single-claim wording “People who perform common work should participate as equals in the rules governing it.” The item retains its existing `democracy: 0.95` effect, source references, layer, facet, target metadata, and facet-proxy measurement mode. No ontology, morphology, affinity, candidate-order, share, or legacy-scoring behavior changes. Content version is now 99.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current source and regression assertions compile. |
| `npm run test:run -- src/belief-structure.test.ts src/share.test.ts --reporter=dot` | PASS | Focused regression: 35/35 tests across 2 files. |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 99; 1,500/1,500 items audited; `rewrite: 0`, `duplicate: 0`, `redundant: 0`; 42 cross-construct split signals remain for human review. |
| `npx vite-node scripts/audit-ideology-question-coverage.ts --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; the four contested prescriptive gaps remain explicit. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-B7VVewvA.js` 3,020.67 kB (673.16 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations, 238 source-backed-contested relationships, all participants resolved, all adversarial checks true, and zero validation/failure errors. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, complete profile/conception rows, and zero validation errors. |
| `npm run research:anchor-reachability -- --summary` | PASS | 119 production anchors; zero validation/failure errors; overlap ranks remain structural diagnostics only. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct pilot items remain outside production; all isolation checks and validation counts pass. |
| Stable-server Playwright, research/completion/share/malformed-share subset | PASS | With `E2E_BASE_URL=http://127.0.0.1:4174` and `--workers=1`, 3/3 current scenarios passed in 3.1 minutes. |
| Stable-server Playwright, missing-information/transition subset | PASS | With `E2E_BASE_URL=http://127.0.0.1:4174` and `--workers=1`, 2/2 current scenarios passed in 3.0 minutes. |
| Preview cleanup / port 4174 | PASS | The explicitly started Vite server was stopped; no listener remained on ports 4174 or 5173 at the cleanup check. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true, but all six required external-study gates remain `NOT RUN`; exit 1 is expected. |
| `git diff --check` | PASS | No whitespace errors after the V132 source and test updates. |

The repair removes one mechanical rewrite disposition; it is not evidence of respondent comprehension or response-process validity. The remaining 42 split signals, three unmeasured constructs, four contested prescriptive gaps, and six external validation gates remain open and explicitly fail-closed.

## V133 observed verification — read-only production measurement audit queue — 2026-08-30

V133 adds a Research Workbench presentation of the existing production measurement audit. The UI exposes open dispositions and machine flags as a bounded, searchable queue and keeps the complete machine-readable audit in the validation script. It does not change production questions, effects, ontology nodes, morphology, candidate promotion, share encoding, or legacy scoring.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The audit queue imports the existing audit contract and compiles with no output. |
| Focused stable-server Playwright queue/responsive paths | PASS | `E2E_BASE_URL=http://127.0.0.1:4174 npx playwright test tests/sorter.spec.ts --grep 'exposes a bounded production measurement audit queue|keeps the research surface within a narrow viewport' --workers=1`: 2/2 passed in 6.2 seconds; the explicitly started server was stopped afterward. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | Production build: 42 modules; `index-C6_vt1oZ.js` 3,026.26 kB (674.53 kB gzip) and `index-D6wjrBST.css` 54.80 kB (8.52 kB gzip); the existing large-client-chunk advisory remains. |
| `git diff --check` | PASS | No whitespace errors in the bounded tracked-objective diff. |
| Current measurement/coverage/morphology evidence | INHERITED | The V132 audit remains the current data evidence because this slice only reads `auditBeliefMeasurement(DATASET)`: 1,500/1,500 audited items, 42 split dispositions, three unmeasured constructs, 119 canonical owners with 238 source-backed-contested relationships, and four open prescriptive gaps. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The browser and deterministic checks establish the workbench interaction and presentation contract only. They do not establish respondent comprehension, expert agreement, psychometric validity, reliability, invariance, population/consequence safety, empirical classification, or respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.

## V134 observed verification — full current-tree regression after the audit queue — 2026-08-30

After the V133 queue was present at `HEAD` (`5e06d3e`, `feat(workbench): expose measurement audit queue`), the full current-tree browser suite and the structural audit surface were rerun. This verification observes the committed queue and does not add a second review mechanism or alter the production bank.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current committed queue and application source compile with no output. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-C6_vt1oZ.js` 3,026.26 kB (674.53 kB gzip) and `index-D6wjrBST.css` 54.80 kB (8.52 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 99; 1,500/1,500 items audited; 42 split dispositions, zero duplicate/rewrite/redundant dispositions, three unmeasured constructs, and zero validation errors. |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 source-backed canonical configurations, 238 source-backed-contested relationships, all adversarial checks true, and zero validation/failure errors. |
| `npx vite-node scripts/audit-ideology-question-coverage.ts --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; four contested prescriptive gaps remain explicit. |
| `npx vite-node scripts/audit-research-coverage.ts --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, complete profile/conception rows, and zero validation errors. |
| `npx vite-node scripts/audit-anchor-reachability.ts --summary` | PASS | 119 production anchors; zero validation/failure errors; overlap ranks remain structural diagnostics only. |
| `npx vite-node scripts/audit-belief-direct-pilot.ts --summary` | PASS | Eight effect-free direct pilot items remain outside production; source/option and isolation checks pass. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true, but six required external-study gates remain `NOT RUN`; exit 1 is expected. |
| `npm run qa -- --workers=1 --reporter=list` | PASS | Full current browser suite: 13/13 scenarios passed in 8.3 minutes, including the long all-layer share-link and both audit-queue scenarios. |
| `ss -ltnp \| rg ':4173|:4174|:5173'` | PASS | No preview listener remained after the browser suite. |
| `git diff --check` | PASS | No whitespace errors in the current tracked-objective diff. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The completed local checks establish the queue, regression, and structural presentation contracts only. They do not establish respondent comprehension, expert agreement, psychometric validity, reliability, invariance, population/consequence safety, empirical classification, or respondent-morphology validity; the overall objective remains `INCOMPLETE` / fail-closed.

## V135 observed verification — Khomeinism/Qutbism governance alignment — 2026-08-30

The V135 change aligns the two explicit taxonomy decisions with their already activated dedicated production branches. It changes only research-governance source coverage, decision status, tests, and documentation; it does not change the ontology inventory, production question bank, question effects, anchors, legacy scorer, morphology rules, or optional pilot contracts.

| Check | Status | Notes |
|---|---|---|
| `npx vitest run src/research.test.ts --reporter=dot --no-file-parallelism` | PASS | Focused governance/research suite: 93/93 tests. |
| `npx tsc --noEmit --pretty false` | PASS | TypeScript compilation completed with no output; also exercised by the production build. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | Vite production build: 42 modules; `index-CDrWl49i.js` 3,027.53 kB (674.87 kB gzip) and `index-D6wjrBST.css` 54.80 kB (8.52 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500/1,500 production items audited; 42 split dispositions remain explicit, three constructs remain unmeasured, and validation-error count is zero. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed canonical configurations, zero validation errors, zero failures, and adversarial separation checks remain true. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks and zero validation errors; four contested prescriptive gaps remain explicit. |
| `npm run research:coverage -- --summary` | PASS | 128 decisions validate; governance status counts are 119 `scored-provisional` and 9 `not-scored`, with zero measurement-status exceptions and an empty reconciliation list. |
| `npm run research:anchor-reachability -- --summary` | PASS | Canonical reachability audit exited 0 with no validation/failure errors; full-competition ranks remain structural diagnostics only. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight effect-free direct pilot items remain outside production and preserve legacy/affinity isolation. |
| `npm run qa -- --workers=1 --reporter=list` | PASS | Full browser suite: 13/13 scenarios passed in 8.4 minutes, including the updated taxonomy panel, workbench queue, responsive, share, under-determined, and malformed-share paths. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | Exit 1 is expected: all structural checks are eligible, while six required external-study gates remain `NOT RUN`. |
| Preview cleanup check | PASS | No listener remained on ports 4173, 4174, or 5173 after browser verification. |
| `git diff --check` | PASS | No whitespace errors after the final documentation edits. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |

The source review supports historical and interpretive taxonomy boundaries only. It does not provide a comparison, assessment, ranking, recommendation, respondent classification, or political preference, and none is implemented by this tranche. Local source review, structural tests, synthetic profiles, browser behavior, and build output remain insufficient for cognitive, psychometric, empirical, invariance, population, or respondent-morphology claims; the overall objective remains `INCOMPLETE` / fail-closed.

## V136 observed verification — export study-ready belief review packet — 2026-08-30

V136 adds a machine-checkable export over existing measurement and research seams. The script is stdout-only and does not write a packet file, mutate the dataset, add scoring behavior, or change the validation ledger. The full export has a blind first-pass production view and a complete adjudication view keyed by stable review ids; no external review or respondent records are fabricated.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The new exporter, package entry point, and current source compile with no output. |
| `npm run belief:review-packet -- --summary` | PASS | Packet version 1; content version 99; scoring policy 3; belief model 2; morphology model 5; 1,500 production audits and blind records; 42 open dispositions; 19 candidates; 8 direct items; 6 relational follow-ups; 464 sources; 11 constructs; zero local packet validation errors. |
| Full-packet structural inspection | PASS | Default JSON contains both review arrays; blind records omit anchoring fields; full records retain question ids; open-disposition ids are aligned; the evidence ledger is empty; promotion is false. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | TypeScript and Vite production build: 42 modules; `index-CDrWl49i.js` 3,027.53 kB (674.87 kB gzip); the existing large-client-chunk advisory remains. |
| `npm run belief:measurement-audit -- --summary` | PASS | Content version 99; 1,500/1,500 items audited; 42 split dispositions, zero duplicate/rewrite/redundant dispositions, and zero validation errors. |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 source-backed canonical configurations, 238 source-backed-contested relationships, all adversarial checks true, and zero validation/failure errors. |
| `npx vite-node scripts/audit-ideology-question-coverage.ts --summary` | PASS WITH OPEN GAPS | 119 canonical targets retain 4/4/4 blocks with zero validation errors/failures; four contested prescriptive gaps remain explicit. |
| `npx vite-node scripts/audit-research-coverage.ts --summary` | PASS | 1,500 production questions, 119 scoring anchors, 124 editorial anchors, 1,536 candidates across 128 targets, complete profile/conception rows, and zero validation errors. |
| `npx vite-node scripts/audit-anchor-reachability.ts --summary` | PASS | 119 production anchors; zero validation/failure errors; overlap ranks remain structural diagnostics only. |
| `npx vite-node scripts/audit-belief-direct-pilot.ts --summary` | PASS | Eight effect-free direct pilot items remain outside production; source/option validation and isolation checks pass. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All 30 structural checks pass and `structuralEligible` is true, but all six required external-study gates remain `NOT RUN`; exit 1 is expected. |
| Browser suite | INHERITED | The exporter is script-only; the latest full current-tree browser evidence remains V134's 13/13 single-worker run, including both audit-queue scenarios. No new browser run is claimed for V136. |
| Required external validation gates | NOT RUN | Cognitive response-process, expert adjudication, empirical reliability/validity, invariance/DIF, population/consequence, and held-out respondent morphology studies remain open. |
| `git diff --check` | PASS | No whitespace errors after the V136 exporter and documentation updates. |

The packet is study-ready as an instrument-development handoff, not as evidence that the study has occurred. Its empty evidence ledger and `eligibleForPromotion: false` status preserve the objective's fail-closed boundary; the overall goal remains `INCOMPLETE`.

## V137 observed verification — validate external-review record intake — 2026-08-30

V137 adds a structural validator for completed reviewer and evidence-ledger records. It accepts the full packet from stdin or a task-specific input path, validates current snapshot and queue identity, enforces required review fields and allowed dispositions, checks two-reviewer completeness and adjudication coverage, and validates external-gate links. It never authenticates external evidence or updates the typed gate ledger.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The shared review contract, exporter updates, and intake validator compile with no output. |
| `npx vite-node scripts/export-belief-review-packet.ts | npx vite-node scripts/validate-belief-review-packet.ts --summary` | INCOMPLETE / FAIL-CLOSED | Current packet parses successfully; 1,533 queue items have no reviewer records, zero evidence records exist, all six external gates remain `NOT RUN`, and promotion remains false; exit 1 is expected. |
| Stale-snapshot structural check | PASS | A synthetic content-version change is rejected as `INVALID` with a stale snapshot error; this is validator testing, not study evidence. |
| Malformed-review structural check | PASS | A synthetic reviewer record with missing fields, invalid disposition, missing rationale, and invalid timestamp is rejected with 13 field-level errors; this is validator testing, not study evidence. |
| `git diff --check` | PASS | No whitespace errors after the V137 validator and documentation updates. |
| External validation gates | NOT RUN | No reviewer, respondent, coding, comparison, population, consequence, or held-out morphology evidence was created or promoted. |

V137 improves evidence intake but does not advance any external gate from `NOT RUN`; the comprehensive goal remains `INCOMPLETE` / fail-closed.

## V138 observed verification — deduplicate malformed review diagnostics — 2026-08-30

V138 repairs diagnostic duplication in the review-record intake validator. Missing required fields are reported once; semantic checks still reject fields that are present but invalid. The change does not create reviewer, respondent, coding, comparison, population, consequence, or held-out morphology evidence.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The validator and current TypeScript source compile with no output. |
| Fresh packet through validator | PASS / INCOMPLETE | The full packet parses with zero structural validation errors, 1,533 pending review items, zero evidence rows, all six external gates `NOT RUN`, and promotion false; the exit code remains 1 because review completeness is intentionally unmet. |
| Stale-snapshot structural check | PASS | A synthetic content-version change remains `INVALID` with one stale-snapshot error. |
| Empty-review-row structural check | PASS | A synthetic `reviewRecords: [{}]` packet remains `INVALID` with exactly 13 missing required-field errors and no duplicate semantic diagnostics. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `git diff --check` | PASS | No whitespace errors in the current tracked-objective diff. |
| Required external validation gates | NOT RUN | No reviewer or respondent study was performed, and no gate status was advanced. |

The repair improves intake readability only. The packet remains an instrument-development artifact, not respondent evidence or a promotion decision; the overall goal remains `INCOMPLETE` / fail-closed.

## V139 observed verification — enforce exact review-packet identity — 2026-08-30

V139 closes a provenance-integrity gap in the review intake validator. Stable review ids are now checked against their current queue type, item id, and layer; the question-id sequence, per-layer counts, fixed-ontology snapshot, blinded production items, adjudication audits, open-disposition rows, and question-id list are also compared to the current checkout. The change only strengthens packet freshness and identity checks; it creates no external evidence and does not update the gate ledger.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The validator and current TypeScript source compile with no output. |
| `npm run belief:review-packet -- --summary` | PASS | Current packet remains version 1 at content 99, with 1,500 production audits, 42 open dispositions, 1,533 queue items, zero packet-contract errors, and promotion false. |
| `npx vite-node scripts/export-belief-review-packet.ts | npx vite-node scripts/validate-belief-review-packet.ts --summary` | INCOMPLETE / FAIL-CLOSED | Fresh packet parses with zero structural validation errors; 1,533 items have no independent reviewer records, no evidence rows exist, all six external gates remain `NOT RUN`, and promotion remains false. Exit 1 is expected. |
| Queue-metadata mutation | PASS | Changing the `itemId` under `production-0001` is rejected as `INVALID` with a mismatched queue-item identity error. |
| Question-snapshot mutation | PASS | Changing one snapshot question id is rejected as `INVALID` with a question-id snapshot error. |
| Production-prompt mutation | PASS | Changing the first blinded production prompt is rejected as `INVALID` with a production-item content error. |
| `git diff --check` | PASS | No whitespace errors after the validator and documentation update. |
| Required external validation gates | NOT RUN | No reviewer, respondent, coding, comparison, population, consequence, or held-out morphology evidence was created or promoted. |

V139 improves packet integrity only. The validator still cannot authenticate external evidence, modify `BELIEF_VALIDATION_GATES`, or promote the belief model; the comprehensive goal remains `INCOMPLETE` / fail-closed.

## V140 observed verification — enforce exact research-review snapshots — 2026-08-30

V140 extends packet identity validation beyond production questions. The validator now compares all quarantined research queues and source/construct registries, queue counts, complete validation-gate snapshot, promotion blocking gates, allowed dispositions, and reviewer-design minimums with the current checkout. A changed gap-candidate prompt and a changed gate boundary are rejected even when their enclosing arrays retain the expected lengths.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The validator and current TypeScript source compile with no output. |
| `npx vite-node scripts/export-belief-review-packet.ts | npx vite-node scripts/validate-belief-review-packet.ts --summary` | INCOMPLETE / FAIL-CLOSED | Fresh packet parses with zero structural validation errors; 1,533 items have no independent reviewer records, no evidence rows exist, all six external gates remain `NOT RUN`, and promotion remains false. Exit 1 is expected. |
| Research-queue mutation | PASS | Changing the first gap-candidate prompt is rejected as `INVALID` with a source-snapshot error. |
| Gate-snapshot mutation | PASS | Changing the first gate boundary is rejected as `INVALID` with a gate-snapshot error. |
| `git diff --check` | PASS | No whitespace errors after the validator and documentation update. |
| Required external validation gates | NOT RUN | No reviewer, respondent, coding, comparison, population, consequence, or held-out morphology evidence was created or promoted. |

V140 strengthens packet provenance only. It does not authenticate external evidence, modify `BELIEF_VALIDATION_GATES`, alter the belief-to-morphology path, or close the comprehensive objective.

## V141 observed verification — distinguish gate linkage from recorded evidence — 2026-08-30

V141 makes evidence-ledger coverage explicit. A gate reference is reported separately from a recorded result; only a structurally valid evidence row with a status other than `NOT RUN` counts toward recorded-result coverage. The validator keeps every required gate in `evidenceGateIdsMissing` until such a row exists, without authenticating the evidence or changing the typed gate ledger.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The validator and current TypeScript source compile with no output. |
| Fresh exporter-to-validator pipeline | INCOMPLETE / FAIL-CLOSED | The empty packet has zero evidence rows, all six gates missing recorded results, 1,533 incomplete review items, zero structural validation errors, and promotion false. |
| `NOT RUN` evidence-row mutation | PASS | A valid-looking row linked to `cognitive-response-process` with status `NOT RUN` is counted as linked but not as recorded evidence; the gate remains missing. |
| Recorded-result mutation | PASS | Changing that row to `PASS` moves only that gate into recorded-result coverage; the other five gates remain missing, reviewer completeness remains unmet, and promotion remains false. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 175/175 tests across 10 files. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `git diff --check` | PASS | No whitespace errors after the validator and documentation update. |
| Required external validation gates | NOT RUN | No reviewer, respondent, coding, comparison, population, consequence, or held-out morphology evidence was created or promoted. |

V141 improves gate-result observability only. A non-`NOT RUN` row is still not authenticated by this tool, does not advance the typed gate ledger, and cannot close the comprehensive goal.

## V142 observed verification — Research Workbench relationship context — 2026-08-30

The current worktree's Research Workbench relationship surface was verified against the existing `deep-ecology` research anchor. The selected profile exposes two source-backed configuration relationships and keeps their qualitative, contested, non-scoring status explicit. The browser assertion exercises the rendered heading, record count, evidence posture, and representative statement without changing the live question bank or scorer.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current source, including the relationship rendering and formatter, compiles with no output. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `E2E_BASE_URL=http://127.0.0.1:4174 npx playwright test tests/sorter.spec.ts --grep "shows research-backed taxonomy decisions separately from scoring" --workers=1 --reporter=list` | PASS | One focused browser scenario passed against an isolated production preview; Deep Ecology rendered two `source-backed-contested` relationship records. |
| `npm run qa -- --workers=1 --reporter=list` | PASS | Full current-tree browser suite: 13/13 scenarios passed against the isolated production preview; the suite took 7.5 minutes and the preview was stopped cleanly. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 10 files and 175/175 tests passed in 56.26 seconds. |
| `git diff --check` | PASS | No whitespace errors after the current worktree documentation and UI/test changes. |
| Required external validation gates | NOT RUN | No respondent, reviewer, psychometric, cross-context, population/consequence, or held-out morphology evidence was created or promoted. |

V142 is a UI traceability check only. It does not convert scholarship into respondent evidence, infer ideological identity, alter the fixed ontology or legacy scorer, or close the comprehensive objective.

## V143 observed verification — production/research construct-layer coverage — 2026-08-30

V143 adds an explicit 25-cell matrix for the declared belief constructs and claim layers. The matrix keeps current production item counts separate from the 19 effect-free research candidates, is included in the measurement audit and review-packet snapshot, and is rendered in the Research Workbench. No production question, legacy effect, anchor vector, ontology node, affinity calculation, or morphology rule was changed.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current source and review-packet exporter/validator compile with no output. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 11 files and 177/177 tests passed in 59.04 seconds. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 production items audited; 25 declared construct/layer cells; 15 production-covered, 10 candidate-only, 19 quarantined candidates, and 0 unrepresented cells; validation errors 0. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 canonical source-backed configurations and 238 source-backed-contested relationships remain resolved; adversarial checks pass and failure count is 0. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | All 119 canonical targets retain 4/4/4 production blocks and no validation failures; Populism, Islamism, Religious Nationalism, and Deep Ecology prescriptive direction remains contested/indeterminate. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 canonical anchors, 124 editorial anchors, 125 ontology nodes, 128 research targets, and 0 research-bank validation errors. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All structural checks pass; the six required external gates remain `NOT RUN`, so eligibility is false and exit 1 is expected. |
| Fresh exporter-to-validator pipeline | INCOMPLETE / FAIL-CLOSED | 1,533 review-queue items, 0 structural validation errors, no reviewer/evidence records, six missing recorded gate results, and promotion false. |
| Coverage-snapshot mutation | PASS | Replacing a candidate id in `snapshot.measurementCoverage.constructLayer` is rejected as `INVALID` with a construct/layer coverage snapshot mismatch. |
| Focused coverage-matrix browser scenario | PASS | The workbench rendered 25 rows and 10 candidate-only posture cells against an isolated production preview on port 4175. |
| `E2E_BASE_URL=http://127.0.0.1:4175 npm run qa -- --workers=1 --reporter=list` | PASS | Full current-tree browser suite: 13/13 scenarios passed in 7.4 minutes; the owned preview was stopped cleanly. |
| `git diff --check` | PASS | No whitespace errors after the coverage-matrix implementation and documentation update. |
| Required external validation gates | NOT RUN | No cognitive review, respondent study, expert adjudication, psychometric/reliability/validity, invariance, population/consequence, or held-out morphology evidence was created or promoted. |

V143 improves measurement-gap traceability and packet freshness only. Candidate presence remains a research/authoring signal, not a measured construct or ideological classification result; the comprehensive objective remains `INCOMPLETE` / fail-closed.

## V144 observed verification — contested prescriptive route variants — 2026-08-30

The current checkout exposes ten source-backed-contested route variants for the four canonical family profiles whose base prescriptive direction remains indeterminate: Populism (2), Islamism (2), Religious Nationalism (2), and Deep Ecology (4). The route validator requires nonempty route identity and statement, profile-attached ideology-research sources, existing prescriptive facets, dimension-level provenance, and at least one determinate direction. The base profile is not rewritten and no route is treated as a universal family-level commitment.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current route type, validator, coverage fields, UI formatter, and tests compile with no output. |
| `npm run test:run -- src/research.test.ts src/belief-structure.test.ts --no-file-parallelism --reporter=dot` | PASS | Focused current-tree contracts: 2 files and 124/124 tests passed, including route-target counts and malformed route rejection. |
| `npm run research:coverage` | PASS | Current report: 1,500 production questions, 119 canonical anchors, 128 research targets/profiles, 140 conceptions, 10 route variants across 4 targets, and zero research-bank validation errors. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 11 files and 179/179 tests passed. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `E2E_BASE_URL=http://127.0.0.1:4176 npm run qa -- --workers=1 --reporter=list` | PASS | Full current-tree Playwright suite: 13/13 scenarios passed in 7.4 minutes against a stable isolated preview; the all-target workbench traversal and long-running quiz paths completed successfully. |
| Fresh exporter-to-validator pipeline | INCOMPLETE / FAIL-CLOSED | Zero structural validation errors, 1,533 queue items, zero reviewer/evidence records, six missing recorded gate results, promotion false; exit 1 is expected until real records exist. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | Structural eligibility true and validation error count 0, but all six required external gates remain `NOT RUN`; exit 1 is expected. |
| Required external validation gates | NOT RUN | No external reviewer, respondent, psychometric, cross-context, population/consequence, or held-out morphology evidence was created or promoted. |

V144 preserves contested scholarly plurality as qualitative context and improves route traceability only. It does not promote research candidates, establish a respondent belief, change the fixed ontology, alter the belief-to-morphology path, or close the comprehensive objective.

## V145 observed verification — include research-route integrity in completion audit — 2026-08-30

The objective-level completion audit now includes the existing research metadata validator and explicit checks for the four contested route-bearing profiles. This ensures that a malformed route or a route that overlaps a production/scoring id cannot coexist with an otherwise structurally green objective report.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The completion-audit imports and route assertions compile with no output. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed configurations, 238 source-backed-contested relationships, all adversarial checks true, validation errors 0, failure count 0. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | Eight source-linked direct pilot items remain isolated from production scoring. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | New route checks pass; structural eligibility is true, validation errors are 0, and the six external-study gates remain `NOT RUN`, so exit 1 is expected. |
| `npm run test:run -- src/research.test.ts --no-file-parallelism --reporter=dot` | PASS | 95/95 research tests passed, including route metadata/layer/provenance rejection. |
| `git diff --check` | PASS | No whitespace errors. |

V145 closes a local completion-audit observability gap only. It does not create external evidence, promote route context, change scoring or morphology, or close the comprehensive objective.

## V146 observed verification — direct pilot coverage for production-unmeasured constructs — 2026-08-30

V146 adds three optional source-linked direct categorical items for the production-unmeasured priority, epistemic-stance, and heterodoxy/contestation constructs. The items remain outside the 1,500-question production bank and retain explicit missingness; selected records are visible in the belief profile and morphology trace but do not enter legacy scoring, morphology affinity, anchor ordering, or ontology placement. The current source tree has 11 direct pilot items, 19 quarantined candidates, six relational follow-ups, and a 1,536-item review queue.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The new evidence-kind union, direct items, audit coverage assertion, UI copy, and browser-test imports compile with no output. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 11 files and 179/179 tests passed in 60.36 seconds. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | 11 direct items; all three constructs without a production signal are covered; zero production overlap, zero validation errors, and legacy/affinity isolation remain true. |
| `npm run belief:measurement-audit -- --summary` | PASS | 1,500 production items remain `facet-proxy`; the three constructs remain production-unmeasured and all 25 construct/layer cells remain explicitly represented. |
| `npm run belief:morphology-audit -- --summary` | PASS | 119 source-backed configurations and 238 source-backed-contested relationships remain valid; validation and failure counts are 0. |
| `npm run research:coverage -- --summary` | PASS | 1,500 production questions, 119 canonical anchors, 124 editorial anchors, 125 ontology nodes, 128 research targets, and 0 research-bank validation errors. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | All 119 canonical targets retain 4/4/4 production blocks with no validation failures; four family-level prescriptive directions remain contested/indeterminate. |
| Fresh exporter-to-validator pipeline | INCOMPLETE / FAIL-CLOSED | The fresh packet has 1,536 queue items, 0 structural validation errors, no reviewer/evidence records, six missing recorded gate results, and `eligibleForPromotion: false`; exit 1 is expected. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All structural checks, including direct-pilot coverage, pass; the six required external-study gates remain `NOT RUN`, so eligibility is false and exit 1 is expected. |
| `E2E_BASE_URL=http://127.0.0.1:4176 npm run qa -- --workers=1 --reporter=list` | PASS | Full current-tree Playwright suite: 13/13 scenarios passed in 7.4 minutes against a stable isolated preview, including direct-item rendering and share restoration for all three new records; the preview was stopped cleanly. |
| `git diff --check` | PASS | No whitespace errors after the source, audit, test, UI, and documentation changes. |
| Required external validation gates | NOT RUN | No cognitive review, respondent study, expert adjudication, psychometric/reliability/validity, invariance/DIF, population/consequence, or held-out morphology evidence was created or promoted. |

V146 improves inspectability and evidence routing for the three unmeasured constructs only. Local source citations, deterministic audits, synthetic evidence, browser behavior, and build results are not substitutes for the six external gates; the comprehensive objective remains `INCOMPLETE` / fail-closed.

## V147 observed verification — direct pilot coverage of candidate-only claim-layer cells — 2026-08-30

V147 adds seven optional source-linked direct categorical items for the remaining candidate-only construct/layer cells. The source tree now has 18 direct pilot items: nine normative, four descriptive, and five prescriptive. The records remain outside the 1,500-question production bank, preserve explicit `No view yet` missingness, and expose selected option text only through the non-scoring belief-profile and morphology trace. The production audit still reports `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation` as unmeasured; all ten candidate-only cells remain explicit in the production-versus-research matrix.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | The two new direct evidence kinds, seven item definitions, audit coverage fields, UI copy, unit tests, and browser selectors compile with no output. |
| `npm run test:run -- --no-file-parallelism --reporter=dot` | PASS | Full current-tree Vitest suite: 12 files and 182/182 tests passed in 57.26 seconds, including the existing review-contract test. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | 18 direct items; all three production-unmeasured constructs and all ten candidate-only construct/layer cells are covered; zero production overlap and zero validation errors; legacy and affinity isolation remain true. |
| `npx vite-node scripts/audit-belief-measurement.ts --summary` | PASS | 1,500 production questions remain `facet-proxy`, distributed 500/500/500 by layer; all ten construct/layer gaps and three production-unmeasured constructs remain explicit; validation errors are 0. |
| `npx vite-node scripts/audit-belief-morphology.ts --summary` | PASS | 119 source-backed configurations and 238 source-backed-contested relationships remain valid; validation and failure counts are 0. |
| `npx vite-node scripts/audit-research-coverage.ts --summary` | PASS | 1,500 production questions, 119 canonical anchors, 124 editorial anchors, 125 ontology nodes, 128 research targets, and zero research-bank validation errors. |
| `npx vite-node scripts/audit-ideology-question-coverage.ts --summary` | PASS WITH OPEN GAPS | All 119 canonical targets retain 4/4/4 production blocks with zero validation failures; four family-level prescriptive directions remain contested/indeterminate. |
| Fresh exporter-to-validator pipeline | INCOMPLETE / FAIL-CLOSED | The fresh packet has 1,543 queue items, 0 structural validation errors, no reviewer/evidence records, six missing recorded gate results, and `eligibleForPromotion: false`; exit 1 is expected. |
| `npx vite-node scripts/audit-belief-completion.ts --summary` | INCOMPLETE / FAIL-CLOSED | All structural checks, including `directPilotCoversCandidateOnlyCells`, pass; structural eligibility is true, but all six required external-study gates remain `NOT RUN`, so eligibility is false and exit 1 is expected. |
| `E2E_BASE_URL=http://127.0.0.1:4176 npm run qa -- --workers=1 --reporter=list` | PASS | Full current-tree Playwright suite: 13/13 scenarios passed in 7.5 minutes against a stable preview, including selection and share restoration for all seven new direct records; the preview was stopped cleanly. |
| `git diff --check` | PASS | No whitespace errors after the V147 source, audit, test, UI, and documentation changes. |
| Required external validation gates | NOT RUN | No cognitive review, respondent study, expert adjudication, psychometric/reliability/validity, invariance/DIF, population/consequence, or held-out morphology evidence was created or promoted. |

V147 closes a local direct-pilot coverage observability gap only. Research citations, categorical options, synthetic evidence, deterministic tests, browser behavior, and build results do not establish comprehension, response-process validity, expert agreement, psychometric validity, reliability, invariance, population/consequence safety, empirical classification, or respondent morphology; the comprehensive objective remains `INCOMPLETE` / fail-closed.

## V149 observed verification — layered morphology and ontology-shape trace — 2026-08-30

V149 adds an additive morphology observability trace over the existing source-backed configuration projection. Candidates now expose their existing macro/meso/micro shape or direct typed hybrid relation, plus descriptive, normative, and prescriptive layer-support slots. Each slot separates same-layer directional agreement from commitment-weight coverage and observed-versus-total directional commitment counts. The trace does not alter fit, candidate order, margins, thresholds, layer weights, legacy scoring, production content, ontology placement, or the no-unique-label posture.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Current source, same-layer construct signal trace, morphology metadata, audit assertions, UI rendering, and tests compile with no output. |
| `npm run test:run -- --no-file-parallelism` | PASS | Full current-tree Vitest suite: 12 files and 182/182 tests passed in 56.57 seconds. |
| `npm run build` | PASS | Vite production build: 42 modules; the existing large-client-chunk advisory remains. |
| `npm run belief:morphology-audit -- --summary` | PASS | All 119 canonical configurations remain source-backed and round-trip; 238 researched relationships remain resolved; layer-support completeness and ontology-consistent interpretation metadata checks are true; validation and failure counts are 0. |
| `npm run belief:measurement-audit -- --summary` | PASS | The production bank remains 1,500 `facet-proxy` questions split 500/500/500 by layer; the three production-unmeasured constructs and ten candidate-only cells remain explicit; validation errors are 0. |
| `npm run belief:direct-pilot-audit -- --summary` | PASS | The direct pilot now has 30 source-linked items; all 19 research candidates and all ten candidate-only cells remain covered without production overlap, scoring effects, or affinity changes. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | All 119 canonical targets retain 4/4/4 production blocks with zero validation failures; four family-level prescriptive directions remain contested/indeterminate. |
| `npm run research:coverage -- --summary` | PASS | The current research bank reports 1,536 candidates, 128 targets, 125 ontology nodes, 119 canonical scored placements, 9 non-scored registry/contextual placements, and zero validation errors. |
| `npm run belief:completion-audit -- --summary` | INCOMPLETE / FAIL-CLOSED | All structural checks pass and validation errors are 0; the six required external-study gates remain `NOT RUN`, so eligibility is false and exit 1 is expected. |
| `npx vite-node scripts/export-belief-review-packet.ts | npx vite-node scripts/validate-belief-review-packet.ts --summary` | INCOMPLETE / FAIL-CLOSED | Fresh packet parses with zero structural validation errors; morphology model version is 6, the queue has 1,555 items, no reviewer or evidence records exist, all six recorded gate results are missing, and promotion remains false; exit 1 is expected. |
| `E2E_BASE_URL=http://127.0.0.1:4176 npm run qa -- --workers=1 --reporter=list` | PASS | Full stable-preview Playwright suite: 13/13 scenarios passed in 7.5 minutes, including morphology-shape inventory, per-layer trace rendering, share-link restoration, under-determined diagnostics, missing-layer messaging, and malformed-share resilience; the preview was stopped cleanly. |
| `git diff --check` | PASS | No whitespace errors after the source, audit, test, UI, and documentation changes. |
| Required external validation gates | NOT RUN | No cognitive review, respondent study, expert adjudication, psychometric/reliability/validity, invariance/DIF, population/consequence, or held-out morphology evidence was created or promoted. |

V149 improves structural interpretability and same-layer evidence traceability only. It does not establish respondent comprehension, expert agreement, layer separability, reliability, validity, invariance, population/consequence safety, empirical classification, or held-out respondent morphology; the comprehensive objective remains `INCOMPLETE` / fail-closed.

## V150 observed verification — route-aware target-question trace — 2026-08-30

V150 extends the existing canonical question-coverage audit with a non-duplicative route trace. The repository already had the claim-review ledger and packet validator proposed during planning, so no second ledger was added. The new trace joins the ten existing source-backed-contested prescriptive route variants to the existing four-item target blocks for Populism, Islamism, Religious Nationalism, and Deep Ecology. It preserves base-family indeterminacy and remains outside production scoring and respondent evidence.

| Check | Status | Notes |
|---|---|---|
| `npx tsc --noEmit --pretty false` | PASS | Route coverage types, audit summaries, completion structural check, and regression contracts compile with no output. |
| `npx vitest run src/ideology-question-coverage.test.ts --no-file-parallelism` | PASS | Focused route/content trace suite: 9/9 tests passed, including normal 2/2/2/4 route inventory and broken-effect fail-closed behavior. |
| `npm run belief:question-coverage -- --summary` | PASS WITH OPEN GAPS | 119 canonical targets, 10 route variants, route trace structural check true, zero validation errors/failures; the same four family-level prescriptive gaps remain open and `contested-indeterminate`. |
| `git diff --check` | PASS | No whitespace errors after the V150 source, audit, flow, test, and documentation changes. |
| Required external validation gates | NOT RUN | No cognitive review, respondent study, expert adjudication, psychometric/reliability/validity, invariance/DIF, population/consequence, or held-out morphology evidence was created or promoted. |

The V150 local evidence is limited to route-to-existing-question traceability and fail-closed structural behavior. It does not establish comprehension, response-process validity, expert agreement, route exclusivity, psychometric reliability/validity, invariance, population/consequence safety, empirical classification, or held-out respondent morphology; the comprehensive objective remains `INCOMPLETE` / fail-closed.
