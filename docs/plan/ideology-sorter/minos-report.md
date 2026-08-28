# Minos QA Report

## Summary

- Server mode: Docker delivery artifact
- Base URL: `http://127.0.0.1:8001`
- Container health: `healthy`
- Automated Playwright tests: 7 total, 7 passed, 0 failed, 0 fixme
- Healer iterations: 0; no failure loop was needed
- Exploratory pages: 1 (`/`)
- Exploratory issues: 0 console errors, 0 page errors, 0 failed responses
- Minos result: PASS

## Scenario execution

| Coverage | Evidence | Result |
|---|---|---|
| Intro and response gate | `tests/sorter.spec.ts` | PASS |
| Back navigation and retained answer | `tests/sorter.spec.ts` | PASS |
| Full 84-item flow and share restore | `tests/sorter.spec.ts` | PASS |
| Missing-information layer | `tests/sorter.spec.ts` | PASS |
| Malformed share recovery | `tests/sorter.spec.ts` | PASS |
| Passive browser exploration | `tests/explore/explore.spec.ts` | PASS |
| Docker health and HTTP delivery | `docker-images/docker-compose.yml`, `/healthz`, root HTML request | PASS |

## Browser exploration

The code-driven explorer wrote:

- `test-results/explorer/report.json`
- `test-results/explorer/intro.png`
- `test-results/explorer/intro.snapshot.json`

The report contains empty `consoleErrors`, `pageErrors`, and `failedRequests` arrays. The installed Playwright runtime does not expose the legacy `page.accessibility.snapshot()` API, so the snapshot file contains `null`; semantic role assertions and the dedicated browser tests remain the available accessibility evidence.

## Healer history

No test or explorer failure occurred in the Docker-backed run. Therefore no test or implementation modification was made during the Minos healer loop.

## Remaining manual checks

These are not P0/P1 blockers for the static MVP, but should be covered in a later regression pass:

1. keyboard-only traversal through every response and action;
2. text zoom at 200%;
3. denied Clipboard API permission and manual-copy fallback; and
4. a browser-level assertion that answer-related requests never leave the page.

## v29 browser verification — Social Ecology

The v29 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the existing ontology inventory, the responsive narrow viewport, the complete 684-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v29 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The remaining manual checks above are still not claimed as completed. No cognitive review, respondent testing, simulation substitute, or empirical validation was run.

## v30 browser verification — Womanism

The v30 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 696-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v30 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The manual checks listed above remain open. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence.

## v31 browser verification — Classical-Liberal Feminism

The v31 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 708-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v31 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The manual checks listed above remain open. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.

## v32 browser verification — Anarcho-Communism

The v32 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 720-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v32 image, reported healthy, and returned `ok` from `/healthz` on port 8001 after startup retry.

The manual checks listed above remain open. The initial immediate health probe raced nginx startup and reset once; a bounded retry succeeded and the container was healthy. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.

## v33 browser verification — Collectivist Anarchism

The v33 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 732-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v33 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The manual checks listed above remain open. The health probe passed on the first bounded attempt after recreation. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.

## v34 browser verification — Anarchism macro family

The v34 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 744-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v34 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The health probe passed after recreation and the Docker-backed suite passed without application-specific test changes. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.

## v36 browser verification — Ecologism / Green Ideology macro family

The v36 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 768-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v36 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The health probe passed after recreation. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.

## v35 browser verification — Conservatism macro family

The v35 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the research workbench's quarantined-candidate flow, the audited ontology inventory, responsive narrow viewport behavior, complete 756-question answer/share restore, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v35 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The health probe passed after recreation and the Docker-backed suite passed without application-specific test changes. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.
## v37 browser verification — Liberalism macro family

The v37 regression pass ran the full 10-scenario Playwright suite with one worker against both the local Vite server and the rebuilt Docker frontend. Both runs passed 10/10, including the quarantined research-workbench flow, audited ontology inventory, responsive narrow viewport behavior, complete 780-question answer/share flow, missing-information behavior, layer-transition announcements, and malformed-share recovery. The Docker service was recreated from the v37 image, reported healthy, and returned `ok` from `/healthz` on port 8001.

The health probe passed after recreation and the Docker-backed suite passed without application-specific test changes. Browser QA is product-behavior evidence only; it is not cognitive review, respondent testing, simulation substitute, psychometric validation, or empirical classification evidence. No cognitive review or respondent/empirical validation was run or claimed.
## v38 Minos verification — Socialism macro family

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 2.8 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.7 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Research/structural gates | PASS | 792 questions, 264 per layer, 60 production anchors, zero validation errors; Socialism isolated 4/4/4 routing |

The browser and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v39 QA record — Nationalism macro family

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 2.9 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.8 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Compose configuration and no-cache image build | PASS | Compose config rendered; v39 frontend image built and recreated successfully |
| Research/structural gates | PASS | 804 questions, 268 per layer, 61 production anchors, zero validation errors; Nationalism isolated 4/4/4 routing |

The v39 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v40 QA record — Republicanism macro family

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 2.9 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.8 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Compose configuration and no-cache image build | PASS | Compose config rendered; v40 frontend image built and recreated successfully |
| Research/structural gates | PASS | 816 questions, 272 per layer, 62 production anchors, zero validation errors; Republicanism isolated 4/4/4 routing |

The v40 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v41 QA record — Feminism macro family

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 3.0 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.9 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Compose configuration and no-cache image build | PASS | Compose config rendered; v41 frontend image built and recreated successfully |
| Research/structural gates | PASS | 828 questions, 276 per layer, 63 production anchors, zero validation errors; Feminism isolated 4/4/4 routing |

The v41 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v42 QA record — Anarcho-Syndicalism micro branch

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 3.0 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.9 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Compose configuration and no-cache image build | PASS | Compose config rendered; v42 frontend image built and recreated successfully |
| Research/structural gates | PASS | 840 questions, 280 per layer, 64 production anchors, zero validation errors; Anarcho-Syndicalism isolated 4/4/4 routing |

The v42 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v43 QA record — Anarcho-Capitalism micro branch

| Check | Result | Evidence |
|---|---|---|
| Local serial Playwright suite | PASS | 10/10 scenarios; 3.1 minutes |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 3.0 minutes |
| Container health | PASS | `ideology-layer-sorter-frontend` healthy; `/healthz` returned `ok` |
| Compose configuration and no-cache image build | PASS | Compose config rendered; v43 frontend image built and recreated successfully |
| Research/structural gates | PASS | 852 questions, 284 per layer, 65 production anchors, zero validation errors; Anarcho-Capitalism isolated 4/4/4 routing |
| Full Vitest suite | PASS | 3 files; 64/64 tests; curated-bank validator completed within the explicit 60-second timeout |

The first v43 browser run exposed two stale delivery contracts, both corrected before the final run: the Anarcho-Capitalism research-workbench assertion still expected `catalog only`, and the missing-information traversal retained a fixed 60-second timeout after the bank grew to 852 questions. Targeted reruns passed 2/2 in both environments, followed by the full 10/10 runs above. The v43 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v44 QA record — Anarcho-Primitivism micro branch

| Check | Result | Evidence |
|---|---|---|
| Full Vitest suite | PASS | 3 files; 65/65 tests; curated-bank validator completed within the explicit 60-second timeout |
| TypeScript and production build | PASS | `npx tsc --noEmit --pretty false` and `npm run build`; existing large-client-chunk advisory remains |
| Research/structural gates | PASS | v44; 864 questions, 288 per layer, 66 production anchors, 71 editorial anchors, zero coverage errors; Anarcho-Primitivism isolated 4/4/4 routing and combined calculation |
| Anchor reachability | PASS | 66 production anchors have direct 4/4/4 blocks; no reachability or validation failures; Anarcho-Primitivism ranks 9/33/1 and 1 combined as diagnostics |
| Share capacity | PASS | Compact v2 complete-answer fragment measures 9,270 characters; v1 remains decodable and stale/malformed/oversized handling remains fail-closed |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config` passed |
| No-cache Docker build/recreate | PASS | v44 image built from `frontend/Dockerfile` and Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios; 3.2 minutes; actual repository command `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 2.9 minutes against `http://127.0.0.1:8001` |

The v44 browser, container, and structural checks confirm delivery behavior only. The two attempted `test:e2e`/`--project=chromium` variants were command/config mismatches that ran zero tests; the repository's actual `qa` script then passed in both environments. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v45 QA record — Austromarxism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 66/66 tests passed; research validation measured approximately 39.338 seconds within the explicit 60-second test timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Research coverage | PASS | Content version 45; 876 prompts; 292 per layer; 72 editorial anchors; 67 production anchors; 107 ontology nodes; 12 registry entries; 35 catalog-only ontology targets; zero validation errors |
| Anchor reachability | PASS | 67 production anchors; zero validation/structural-closure failures; Austromarxism has 4/4/4 isolated routing and full ranks 8/5/2 by layer and 2 combined |
| Share contract | PASS | Complete compact v2 fragment measures 9,398 characters; v1 round-trip and fail-closed incompatible-input behavior remain covered |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config` passed |
| No-cache Docker build/recreate | PASS | v45 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios; 3.2 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios; 3.0 minutes against `http://127.0.0.1:8001` |

The initial `npm run test:run -- --runInBand` invocation was a Vitest option mismatch and ran zero tests; it was not treated as a product result. The repository's actual `npm run test:run` command passed all tests. The v45 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v46 QA record — Egalitarian-Liberal Feminism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 67/67 tests passed; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` |
| Research coverage | PASS | Content version 46; 888 prompts; 296 per layer; 73 editorial anchors; 68 production anchors; 107 ontology nodes; 12 registry entries; 34 catalog-only ontology targets; zero validation errors |
| Anchor reachability | PASS | 68 production anchors; zero validation/structural-closure failures; Egalitarian-Liberal Feminism has 4/4/4 isolated routing and full ranks 54/57/2 by layer and 53 combined |
| Share contract | PASS | Complete compact v2 fragment measures 9,526 characters; v1 round-trip and fail-closed incompatible-input behavior remain covered |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v46 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local Playwright suite | PASS | 10/10 scenarios in 1.1 minutes; the new manifest-derived test timeouts and Egalitarian-Liberal Feminism workbench assertions passed |
| Docker-backed Playwright suite | PASS | 10/10 scenarios in 1.1 minutes against `http://127.0.0.1:8001` |

The v46 browser, container, and structural checks confirm delivery behavior only. The initial concurrent local run exposed fixed Playwright timeouts as the dataset grew; those test-harness limits were made manifest-derived and the isolated local rerun passed. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v47 QA record — Buddhist Nationalism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 68/68 tests passed; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` through `npm run build` |
| Research coverage | PASS | Content version 47; 900 prompts; 300 per layer; 74 editorial anchors; 69 production anchors; 107 ontology nodes; 12 registry entries; 33 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 69 production anchors; zero validation/structural-closure failures; Buddhist Nationalism has 4/4/4 isolated routing and full ranks 18/43/17 by layer and 22 combined |
| Share contract | PASS | Complete compact v2 fragment measures 9,654 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v47 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.2 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.1 minutes against `http://127.0.0.1:8001` |

The v47 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v48 QA record — Cultural / Spiritual Ecofeminism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 69/69 tests passed; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` through `npm run build` |
| Research coverage | PASS | Content version 48; 912 prompts; 304 per layer; 75 editorial anchors; 70 production anchors; 107 ontology nodes; 12 registry entries; 32 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 70 production anchors; zero validation/structural-closure failures; Cultural / Spiritual Ecofeminism has 4/4/4 isolated routing and full ranks 13/10/8 by layer and 6 combined |
| Share contract | PASS | Complete compact v2 fragment measures 9,782 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v48 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.3 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.1 minutes against `http://127.0.0.1:8001` |

The v48 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v49 verification — Materialist / Socialist Ecofeminism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 70/70 tests passed; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` and the TypeScript stage of `npm run build` |
| Research coverage | PASS | Content version 49; 924 prompts; 308 per layer; 76 editorial anchors; 71 production anchors; 107 ontology nodes; 12 registry entries; 31 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 71 production anchors; zero validation/structural-closure failures; Materialist / Socialist Ecofeminism has 4/4/4 isolated routing and full ranks 2/1/2 by layer and 1 combined |
| Share contract | PASS | Complete compact v2 fragment measures 9,910 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v49 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.4 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.2 minutes against `http://127.0.0.1:8001` |

The v49 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v50 verification — Christian Nationalism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 3 files and 71/71 tests passed; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` and the TypeScript stage of `npm run build` |
| Research coverage | PASS | Content version 50; 936 prompts; 312 per layer; 77 editorial anchors; 72 production anchors; 107 ontology nodes; 12 registry entries; 30 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 72 production anchors; zero validation/structural-closure failures; Christian Nationalism has 4/4/4 isolated routing and full ranks 8/47/1 by layer and 2 combined |
| Share contract | PASS | Complete compact v2 fragment measures 10,038 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v50 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.5 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.2 minutes against `http://127.0.0.1:8001` |

The v50 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v51 verification — Egoist Anarchism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 72/72 tests passed across 3 files; the curated-bank validator completed within the explicit 60-second timeout |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` and the TypeScript stage of `npm run build` |
| Research coverage | PASS | Content version 51; 948 prompts; 316 per layer; 78 editorial anchors; 73 production anchors; 107 ontology nodes; 12 registry entries; 29 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 73 production anchors; zero validation/structural-closure failures; Egoist Anarchism has 4/4/4 isolated routing and full ranks 27/6/1 by layer and 1 combined |
| Share contract | PASS | Complete compact v2 fragment measures 10,166 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v51 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios against `http://127.0.0.1:8001`; `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --workers=1` |

The v51 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## v52 verification — Cultural Feminism micro branch

## v53 verification — Cultural Nationalism micro branch

| Check | Status | Evidence |
|---|---|---|
| Research coverage | PASS | Content version 53; 972 prompts; 324 per layer; 80 editorial anchors; 75 production anchors; 107 ontology nodes; 12 registry entries; 27 canonical ontology targets remain catalog-only; zero coverage validation errors |
| Target branch | PASS | Existing 'Nationalism → Cultural Nationalism' micro node has dedicated-scored status and exact 4/4/4 direct target coverage |
| Reachability | PASS_WITH_HOLD | Isolated routing passes in all layers; full-production ranks 16/38/17 by layer and 19 combined; aggregate top-three rates 25.7778% and 45.3333%, with worst ranks 71 and 63; overlap values are structural diagnostics only |
| Unit/type/share/build/audit | PASS | 73/73 unit tests; TypeScript; compact v2 at 10,422 characters; Vite build; zero high-severity audit vulnerabilities |
| Compose configuration | PASS | 'docker compose -f docker-images/docker-compose.yml config --quiet' passed |
| No-cache Docker build/recreate | PASS | v53 image built from 'frontend/Dockerfile' and the Compose frontend was force-recreated |
| Container health | PASS | 'ideology-layer-sorter-frontend' running healthy; '/healthz' returned 'ok' on port 8001 |
| Browser suites | PASS | Local and Docker-backed serial Playwright suites passed 10/10 each |

The v53 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on 'master'.

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 72/72 tests passed across 3 files; the curated-bank validator completed in 46.08 seconds |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` and the TypeScript stage of `npm run build` |
| Research coverage | PASS | Content version 52; 960 prompts; 320 per layer; 79 editorial anchors; 74 production anchors; 107 ontology nodes; 12 registry entries; 28 catalog-only ontology targets; zero coverage validation errors |
| Anchor reachability | PASS | 74 production anchors; zero validation/structural-closure failures; Cultural Feminism has 4/4/4 isolated routing and full-production ranks 12/32/16 by layer and 11 combined |
| Share contract | PASS | Complete compact v2 fragment measures 10,294 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v52 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` running healthy; `/healthz` returned `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.6 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.3 minutes against `http://127.0.0.1:8001`; `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --workers=1` |

The v52 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## v54 verification — Ethnocultural Nationalism micro branch

| Check | Status | Evidence |
|---|---|---|
| Full Vitest suite | PASS | `npm run test:run`; 74/74 tests passed across 3 files; the curated-bank validator completed in 48.68 seconds |
| TypeScript | PASS | `npx tsc --noEmit --pretty false` and the TypeScript stage of `npm run build` |
| Research coverage | PASS | Content version 54; 984 prompts; 328 per layer; 81 editorial anchors; 76 production anchors; 107 ontology nodes; 12 registry entries; 26 canonical catalog-only targets; zero coverage validation errors |
| Anchor reachability | PASS | 76 production anchors; zero validation/structural-closure failures; Ethnocultural Nationalism has 4/4/4 isolated routing and full-production ranks 15/28/1 by layer and 3 combined |
| Share contract | PASS | Complete compact v2 fragment measures 10,550 characters; v1 remains decodable and stale/oversized input remains fail-closed |
| Build | PASS | `npm run build`; existing large-client-chunk advisory remains |
| Dependency audit | PASS | `npm audit --audit-level=high` reported zero vulnerabilities |
| Compose configuration | PASS | `docker compose -f docker-images/docker-compose.yml config --quiet` passed |
| No-cache Docker build/recreate | PASS | v54 image built from `frontend/Dockerfile` and the Compose frontend was force-recreated |
| Container health | PASS | `ideology-layer-sorter-frontend` served `/healthz` as `ok` on port 8001 |
| Local serial Playwright suite | PASS | 10/10 scenarios in 3.6 minutes; `npm run qa -- --workers=1` |
| Docker-backed serial Playwright suite | PASS | 10/10 scenarios in 3.4 minutes against `http://127.0.0.1:8001`; `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa -- --workers=1` |

The v54 browser, container, and structural checks confirm delivery behavior only. The full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## v55 verification — Lesbian Feminism micro branch

| Check | Result |
|---|---|
| TypeScript and unit suite | PASS — `npx tsc --noEmit --pretty false`; 75/75 Vitest tests |
| Research coverage | PASS — 996 prompts, 332 per layer, 77 dedicated-scored targets, 25 canonical catalog-only targets, 5 contextual-only targets, 12 registry-only targets, 1,428 candidates, zero validation errors |
| Anchor reachability | PASS — all 77 production anchors have isolated 4/4/4 routing; Lesbian Feminism is reachable in all three layers; full ranks 3/16/10 and 4 combined are overlap diagnostics |
| Build and dependency audit | PASS — Vite build completed with the existing large-chunk warning; `npm audit --audit-level=high` found zero vulnerabilities |
| Container delivery | PASS — Compose config, no-cache image build/recreate, bounded health retry, and `/healthz` `ok` |
| Local browser QA | PASS — serial Playwright 10/10 in 3.6 minutes |
| Docker-backed browser QA | PASS — serial Playwright 10/10 in 3.4 minutes |
| Share compatibility | PASS — compact v2 complete-answer fragment is 10,678 characters; v1 remains decodable and malformed/stale payloads fail closed |

The v55 browser, container, and structural checks confirm delivery behavior only. The first health probe reset during startup and the bounded retry passed; this is recorded as timing behavior rather than hidden. Full-production overlap fields remain structural diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## v56 Minos continuation — One-Nation Conservatism micro branch

| Check | Status | Evidence |
|---|---|---|
| Research workbench contract | PASS | One-Nation Conservatism is exposed as dedicated and scored with 12 source-backed items; the stale catalog-only assertion was repaired and the targeted browser test passed |
| Coverage and target isolation | PASS | 1,008 prompts; 336 per layer; 83 editorial anchors; 78 production anchors; 24 canonical catalog-only targets; zero coverage validation errors |
| Anchor reachability | PASS_WITH_HOLD | All 78 production anchors have isolated 4/4/4 routing; One-Nation Conservatism is isolated-reachable in all three layers; full ranks 15/30/1 and 5 combined are overlap diagnostics |
| Build and dependency audit | PASS | Vite build completed with the existing large-chunk warning; `npm audit --audit-level=high` found zero vulnerabilities |
| Container delivery | PASS | Compose config, no-cache image build/recreate, bounded health check, and `/healthz` `ok` |
| Local browser QA | PASS | Serial Playwright 10/10 in 3.7 minutes |
| Docker-backed browser QA | PASS | Serial Playwright 10/10 in 3.5 minutes |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 10,817 characters; v1 remains decodable and malformed/stale payloads fail closed |

The v56 browser, container, and structural checks confirm delivery behavior only. The combined two-layer miss and full-production ranks remain deterministic overlap diagnostics; no scorer or picker retuning was made. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## v57 Minos continuation — Zionism micro branch

| Check | Status | Evidence |
|---|---|---|
| Research workbench contract | PASS | Zionism is exposed as dedicated and scored with 12 source-backed items; the browser path selects it and confirms the dedicated-scored status |
| Coverage and target isolation | PASS | 1,020 prompts; 340 per layer; 84 editorial anchors; 79 production anchors; 23 canonical catalog-only targets; zero coverage validation errors |
| Anchor reachability | PASS_WITH_HOLD | All 79 production anchors have isolated 4/4/4 routing; Zionism is isolated-reachable in all three layers; full ranks 27/25/19 and 19 combined are overlap diagnostics |
| Build and dependency audit | PASS | Vite build completed with the existing large-chunk warning; `npm audit --audit-level=high` found zero vulnerabilities |
| Container delivery | PASS | Compose config, no-cache image build/recreate, bounded health retry, and `/healthz` `ok` |
| Local browser QA | PASS | Serial Playwright 10/10 in 4.1 minutes |
| Docker-backed browser QA | PASS | Serial Playwright 10/10 in 3.6 minutes |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 10,961 characters; v1 remains decodable and malformed/stale payloads fail closed |

The v57 browser, container, and structural checks confirm delivery behavior only. Full-production overlap fields remain deterministic diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## v58 behavioral delivery verification — Khomeinism micro branch

| Check | Status | Evidence |
|---|---|---|
| Coverage and target isolation | PASS | 1,032 prompts; 344 per layer; 85 editorial anchors; 80 production anchors; 22 canonical catalog-only targets; zero coverage validation errors |
| Anchor reachability | PASS_WITH_HOLD | All 80 production anchors have isolated 4/4/4 routing; Khomeinism is isolated-reachable in all three layers; full ranks 4/31/1 and 1 combined are overlap diagnostics |
| Build and dependency audit | PASS | Vite build completed with the existing large-chunk warning; `npm audit --audit-level=high` found zero vulnerabilities |
| Container delivery | PASS | Compose config, Docker image build/recreate, bounded health check, and `/healthz` `ok` |
| Local browser QA | PASS | Serial Playwright 10/10 in 4.0 minutes |
| Docker-backed browser QA | PASS | Serial Playwright 10/10 in 3.7 minutes |
| Share compatibility | PASS | Compact v2 complete-answer fragment is 11,105 characters; v1 remains decodable and malformed/stale payloads fail closed |

The v58 browser, container, and structural checks confirm delivery behavior only. Full-production overlap fields remain deterministic diagnostics and did not trigger scorer or picker retuning. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.


## v59 Minos delivery report — Qutbism

Local Playwright passed 10/10 in 1m21s, including the dedicated-scored Qutbism workbench path. After Docker image rebuild and forced Compose recreation, the container was healthy, `/healthz` returned `ok`, and Docker-backed Playwright passed 10/10 in 1m14s. The separate taxonomy scenario continues to verify governance catalog-only text.

This is delivery evidence only; it does not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring.

## V63 QA record — Left-Wing Populism micro branch

The V63 browser target is the existing `Populism → Left-Wing Populism` path. The research workbench exposes five source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently `retain-canonical`/`scored-provisional`.

Final V63 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, image rebuild/recreate, a healthy container, and `/healthz` `ok`. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with seventeen canonical catalog-only targets after V63.

## V64 QA record — Neoconservatism micro branch

The V64 browser target is the existing `Conservatism → Neoconservatism` path. The research workbench exposes five source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently `retain-canonical`/`scored-provisional`.

Final V64 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and `/healthz` `ok`. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with sixteen canonical catalog-only targets after V64.

## v62 Minos delivery report — Socialist Feminism

Local Playwright passed 10/10, including the dedicated-scored Socialist Feminism workbench path and the taxonomy/status-separation scenario. After Docker image rebuild and forced Compose recreation, the container was healthy, `/healthz` returned `ok`, and Docker-backed Playwright passed 10/10. The branch exposes the existing canonical path and twelve direct source-linked items without changing the scorer policy.

This is delivery evidence only; it does not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring.

## V61 QA record — Marxist Feminism micro branch

The V61 browser target is the existing `Socialist / Marxist Feminism → Marxist Feminism` path. The research workbench exposes eight source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently `retain-canonical`/`scored-provisional`.

V61 delivery verification passed: local Playwright 10/10, a rebuilt Docker service with `/healthz` returning `ok` and a healthy container, and Docker-backed Playwright 10/10. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with nineteen canonical catalog-only targets after V61.

## v60 Minos delivery report — Radical Republicanism

Local Playwright passed 10/10, including the dedicated-scored Radical Republicanism workbench path and the taxonomy/status-separation scenario. After Docker image rebuild and forced Compose recreation, the container was healthy, `/healthz` returned `ok`, and Docker-backed Playwright passed 10/10. The branch exposes the existing canonical path and twelve direct source-linked items without changing the scorer policy.

This is delivery evidence only; it does not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring.
## V65 QA record — Paleoconservatism micro branch

The V65 browser target is the existing Conservatism → Paleoconservatism path. The research workbench exposes five source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V65 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and /healthz ok. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with fifteen canonical catalog-only targets after V65.

## V66 QA record — Wasatiyya micro branch

The V66 browser target is the existing Islamism → Wasatiyya path. The research workbench exposes five source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V66 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and /healthz ok. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with fourteen canonical catalog-only targets after V66.

## V67 QA record — Right-Wing Populism micro branch

The V67 browser target is the existing Populism → Right-Wing Populism path. The research workbench exposes five source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V67 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and /healthz ok. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with thirteen canonical catalog-only targets after V67.
## V68 QA record — Hindutva micro branch

The V68 browser target is the existing `Religious Nationalism → Hindutva (Hindu Nationalism)` path. The research workbench exposes six source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V68 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and `/healthz` `ok`. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with twelve canonical catalog-only targets after V68.


## V69 QA record — Religious Zionism micro branch

The V69 browser target is the existing `Religious Nationalism → Religious Zionism` path. The research workbench exposes eight source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, an 18-dimension profile, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V69 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, no-cache image rebuild/recreate, a healthy container, and `/healthz` `ok`. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with eleven canonical catalog-only targets after V69.

## V70 QA record — Neo-Fascism meso branch

The V70 browser target is the existing Fascism → Neo-Fascism path. The research workbench exposes seven source references, twelve direct source-linked prompts at 4/4/4, one provisional anchor, two neighbor discriminants, an 18-dimension profile, and a false-positive audit. The branch is shown as dedicated and scored while taxonomy governance remains independently retain-canonical/scored-provisional.

Final V70 delivery verification passed: local Playwright 10/10 and Docker-backed Playwright 10/10, Compose configuration, fresh no-cache Docker image rebuild/recreate, a healthy container, and /healthz ok. These are delivery checks only; they do not establish cognitive validity, respondent comprehension, psychometric quality, empirical classification, or population generalizability. Catalog-only and contextual-only anchors remain outside production scoring, with ten canonical catalog-only targets after V70.
