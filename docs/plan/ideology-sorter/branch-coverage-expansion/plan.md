# Implementation plan: branch coverage expansion

## Phase 1 — research and design

- Freeze the source and ontology decisions in this directory.
- Add source-registry records with bounded claims and retrieval dates.
- Select the twelve-target tranche and map each block to existing facets.

## Phase 2 — implementation

- Extend src/types.ts with qualitative research metadata types.
- Extend src/ontology.ts with Khomeinism and Qutbism only.
- Add src/research-bank.ts as the single source of curated candidate content.
- Re-export bank data through src/research.ts and add structural helpers.
- Render the bank, anchor profile, neighbor matrix, and false-positive audit in src/App.tsx.
- Add minimal editorial styles without changing the quiz surface.

## Phase 3 — verification

- Run TypeScript build and Vitest.
- Run the project’s existing dataset validator through the unit tests.
- Run Argos-style static checks: no production effects, no new anchors, source closure, relation closure, and quarantine copy.

## Phase 4 — delivery

- Resolve the exact source-only Docker skill only at the Docker phase.
- Rebuild the static image if Docker is available; otherwise record the bounded fallback.

## Phase 5 — QA

- Run the existing Playwright suite against Vite or Docker.
- Exercise the research workbench target selector and candidate shelf.
- Record missing browser surfaces honestly; do not substitute cognitive review for browser QA.

## Phase 6 — closeout

- Append Zeus evidence to the existing log and report.
- Update continuation state with proved, weak, missing, or contradicted evidence.
- Leave the Git working tree uncommitted because the user only initialized Git.
