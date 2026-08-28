# Specification: branch coverage expansion

## In scope

1. Add source records for the selected scholarly anchors.
2. Add Khomeinism and Qutbism as catalog-only micro nodes under Islamism.
3. Add a typed, effect-free research candidate bank for twelve priority targets.
4. Add qualitative anchor profiles, neighbor discriminants, false-positive audits, and coverage summaries.
5. Expose the bank in the existing research workbench with explicit quarantine language.
6. Add unit tests proving structural validity, target coverage, ontology closure, and production-contract stability.
7. Run build, unit, Docker, and Playwright verification as available.

## Out of scope

- Adding or changing production questions, numeric anchors, facets, scoring formulas, manifest counts, or share schemas.
- Adding a backend, database, account flow, remote answer storage, or live political data feed.
- Cognitive interviews, respondent testing, simulated cognitive evidence, psychometric validation, or promotion of a candidate.
- Assigning a respondent to an ideology from a single answer or from the research bank.

## Acceptance criteria

- The canonical inventory changes only by the two explicitly requested school nodes: 9 macro, 33 meso, 60 micro.
- DATASET.questions.length === 84 and the manifest remains 84 with 28 questions per layer.
- Every curated candidate validates against the existing structural contract, has no effects, and is marked research_candidate.
- Every selected target has 12 candidates, covering all three layers, plus a qualitative profile and at least two neighbor discriminants or an explicit boundary hold.
- Khomeinism and Qutbism have source-backed node records, canonicalParentId: islamism, status: catalog-only, and no production anchor.
- Production scoring tests remain green and no new anchor is introduced.
- The UI displays the candidate bank as a review shelf, not as live quiz content.
