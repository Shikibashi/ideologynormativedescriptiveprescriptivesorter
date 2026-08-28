# Integration notes

## Existing composition points

- src/data.ts owns the production dataset and source registry.
- src/ontology.ts owns canonical nodes and the contextual registry.
- src/research.ts owns target derivation, candidate validation, and promotion gates.
- src/research-bank.ts owns curated candidate content and qualitative audit metadata.
- src/App.tsx owns the research workbench presentation.
- src/scoring.ts remains unchanged in behavior.

## Dependency direction

data.ts → ontology.ts / types.ts; research-bank.ts → data.ts / types.ts; research.ts → data.ts / research-bank.ts / types.ts; App.tsx → research.ts. The bank does not import the validation module, so there is no circular dependency.

## Production boundary

The candidate bank is not included in Dataset.questions. Candidate records deliberately omit the effects property. Qualitative anchors are not IdeologyAnchor records and cannot be consumed by calculateResults.

## Persistence boundary

The app remains local and client-only. Draft candidates already use component state; the curated bank is static module data. No account, network, API, or database layer is introduced.
