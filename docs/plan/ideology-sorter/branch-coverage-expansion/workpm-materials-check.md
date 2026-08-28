# WorkPM materials check

## Phase 4 result

PASS_WITH_HOLDS. The implementation matches the selected Proposal A and the branch-coverage flow diagrams. Native explorer/worker delegation was unavailable in the current desktop tool surface, so this check was executed sequentially by the Lead under the documented WorkPM fallback. No MCP task board or hard file lock was needed.

## Boundary checks

| Check | Evidence | Result |
|---|---|---|
| New ontology scope | Only Khomeinism and Qutbism were added as canonical nodes; both are micro, parented to Islamism, catalog-only, and unanchored. | PASS |
| Candidate ownership | Curated content lives in src/research-bank.ts and is re-exported by src/research.ts. | PASS |
| Production question isolation | Unit tests prove 84 questions, 28 per layer, with the unchanged manifest. | PASS |
| Effects isolation | Unit tests prove every curated candidate is effect-free; the bank is not included in Dataset.questions. | PASS |
| Source and facet closure | validateCuratedResearchBank and validateCuratedResearchMetadata return no errors. | PASS |
| UI composition | App.tsx presents the pool only in the research workbench and keeps the promotion gate blocked. | PASS |
| Existing scoring/share behavior | scoring.test.ts and share.test.ts pass; no scoring or share module change was required. | PASS |
| Domain terminology | docs/domain-dictionary.md v8 terms are used for layers, catalog-only state, provenance, provisional bank, and promotion review. | PASS |

## Verification commands

- npm run build: PASS.
- npm run test:run: PASS, 25/25 tests.
- npm run qa: PASS, 9/9 tests against local Playwright server.
- E2E_BASE_URL=http://127.0.0.1:8001 npm run qa: PASS, 9/9 tests against Docker.
- npm audit --audit-level=high: PASS, 0 vulnerabilities.
- docker compose -f docker-images/docker-compose.yml config: PASS.
- docker build -t ideology-layer-sorter-frontend:latest -f frontend/Dockerfile .: PASS.
- Docker health endpoint: PASS, /healthz returned ok and the container reported healthy.

## Holds

- No respondent cognitive review was run or inferred, by explicit user instruction.
- No empirical reliability, validity, invariance, or psychometric evidence exists.
- Neighbor distinctness and cross-cultural/jurisdictional review remain promotion-gate evidence, not completed by static tests.
- The Git repository has no commit; the working tree remains uncommitted as requested by the user’s Git initialization step.
