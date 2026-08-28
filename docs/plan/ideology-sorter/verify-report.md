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
