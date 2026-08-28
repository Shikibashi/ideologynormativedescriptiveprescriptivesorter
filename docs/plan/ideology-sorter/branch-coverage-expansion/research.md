# Research brief: branch-sensitive authoring

## Current system observation

The sorter has three claim layers, seven descriptive/normative/prescriptive facet families, a source registry, canonical ontology nodes, contextual registry entries, and a production bank of 84 questions. src/research.ts already computes a target inventory and creates effect-free candidates. The missing capability is a curated, source-attributed bank that makes branch-specific distinctions inspectable without changing scoring.

## Ontology implications

The supplied ontology note is treated as an architectural constraint:

- macro, meso, and micro describe scope or rank; they do not require a universal ancestor.
- Only canonicalParentId creates canonical ancestry. Relations such as variant-of, hybrid-of, related-to, and hosted-by remain typed edges.
- Christian Democracy, Populism, and Islamism remain parentless meso nodes where the evidence supports cross-family or host status.
- Khomeinism and Qutbism are represented as micro nodes under Islamism because the source-backed traditions are independently institutionalized enough to warrant distinct research targets; they remain catalog-only.
- Deep Ecology, Bioregionalism, national manifestations, and similar material remain in the associated/contextual registry unless the evidence supports canonical respondent-facing treatment.
- A slash label or alias is not a second canonical node.

## Measurement implications

The 12-item local block per target is a content-coverage scaffold. The candidate’s qualitative direction says how the item is expected to relate to an existing facet; it does not assign a score. A target can have a complete candidate block while still having insufficient evidence for production measurement. Neighbor matrices and false-positive audits are therefore first-class artifacts.

## Evidence status

| Evidence | Status | Meaning |
|---|---|---|
| Source identity and bounded support | proved after registry update | A source URL and retrieval date are recorded for each expansion anchor. |
| Ontology relation closure | proved after implementation | New node parents and relation targets resolve through the existing validator. |
| Candidate structural validity | proved after tests | Every curated candidate has an existing target, facet, axis, source, and quarantine status. |
| Respondent comprehension | not-run by explicit constraint | No cognitive review is performed or inferred. |
| Empirical reliability/validity | not-run | No psychometric claim is made. |
| Production scoring impact | absent by design | QUESTIONS, anchors, manifest, and scoring remain unchanged. |
