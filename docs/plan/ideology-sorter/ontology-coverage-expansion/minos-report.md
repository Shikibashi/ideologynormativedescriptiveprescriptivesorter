# Minos QA report — ontology coverage expansion

## Result

PASS. The local and Docker-backed Playwright suites passed after the 1,428-candidate completion tranche and expanded workbench coverage were added.

## Evidence

- Local `npm run qa`: 10/10 passed.
- Docker-backed `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`: 10/10 passed.
- The suite covers the existing intro, quiz, missing-information, transition, share, malformed-hash, and responsive paths.
- The research workbench tests cover the 1,428-candidate count, all-target candidate closure, macro/meso/four selected-micro research tranches, completion-tranche entries including White Nationalism, Deep Ecology, and Right-Libertarianism, contextual/registry status labels, taxonomy decisions, draft saving, and narrow viewport layout.
- Docker container health is healthy and `/healthz` returns `ok`.

## Non-evidence

No respondent cognitive testing, interview, comprehension study, or empirical validity evidence is claimed.

## Current continuation — combined pattern — 2026-08-26

- Browser coverage now asserts the full-run combined pattern, its three layer contribution fields, and the missing-layer abstention state.
- Local `npm run qa`: 10/10 passed after the result-contract update.
- Docker-backed `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`: 10/10 passed against the rebuilt Docker image.

The browser checks validate rendering and state transitions only. They do not provide cognitive, respondent, comparative, or psychometric evidence.

## Current continuation — direct branch coverage — 2026-08-26

- Local `npm run qa`: 10/10 passed after adding browser coverage for all six new direct branches and correcting the layer-contiguous question ordering.
- Docker-backed `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`: 10/10 passed against the recreated image containing the content version 4, 156-question bundle.
- The suite covers the 156-question full flow and share restore, the 26/52 coverage boundary through the missing-layer flow, manifest-derived 52/104 transition notices, malformed-share recovery, responsive workbench behavior, and the six direct branch workbench states.
- The six new branch states each expose 12 source-backed research items and `dedicated and scored` metadata while remaining provisional and separate from respondent evidence.

The browser results validate route reachability, rendering, and state transitions only. They do not establish comprehension, respondent validity, reliability, psychometric performance, or a political comparison/ranking.

## Current continuation — four canonical branch blocks — 2026-08-26

- Local `npm run qa`: 10/10 passed after the v5 direct-coverage expansion and share-fragment bound fix.
- Docker-backed `E2E_BASE_URL=http://127.0.0.1:8001 npm run qa`: 10/10 passed against the recreated v5 image.
- The suite covers the 204-question full flow and restored share link, the 34/68 coverage boundary through the missing-layer flow, manifest-derived 68/136 transition notices, malformed-share recovery, responsive workbench behavior, and the ten direct branch workbench states.
- The four current branch states each expose 12 source-backed research items and `dedicated and scored` metadata while remaining provisional and separate from respondent evidence.
- The full-answer share regression was traced to the previous 12,000-character decoder bound; the measured complete v5 fragment is 12,850 characters. The bound is now 16,384 and a unit round-trip test protects the contract.

The browser results validate route reachability, rendering, share restoration, and state transitions only. They do not establish comprehension, respondent validity, reliability, psychometric performance, or a political comparison/ranking.
