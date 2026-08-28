# Integrated Team Review — Ideology Layer Sorter

> Main/Lead synthesis of the four bounded reviews. The individual files remain the evidence record.

## Consensus findings

1. The three-layer distinction is the product's core contract and must appear in data, UI, scoring, and results.
2. The scoring engine must be pure, typed, deterministic, versioned, and separate from React and browser adapters.
3. `No view yet` is missing information. `Mixed / depends` is an answered state that maps to the explicit midpoint `0` in this MVP and is counted in coverage; the UI must disclose that simplification.
4. The share fragment is a bearer artifact that may disclose political views. It must be bounded, versioned, strictly validated, and fail closed.
5. Family-balanced display reduces one visible taxonomy bias but does not prove representational neutrality; the methodology must say so.
6. The product should show interpretive neighbors and ties without leaderboard language, identity claims, probability language, or political recommendations.
7. Substantive promotion review remains the boundary before provisional wording or anchors become canonical: neighbor distinctness, applicable cross-cultural/jurisdictional review, and later empirical validation are required.

## Critical findings and decisions

| ID | Finding | Decision |
|---|---|---|
| AR-01 | Scoring semantics need a stable contract. | Add `ScoringPolicy` and `DatasetManifest` with versions and golden fixtures. |
| AR-02 | URL state is untrusted input. | Add schema/version checks, size limits, duplicate/unknown ID rejection, and whole-envelope failure. |
| RT-01 | Editorial anchors may appear more authoritative than they are. | Store authorial notes, source posture, family metadata, and non-scientific framing in results/methodology. |
| RT-02 | Taxonomy density can influence visible neighbors. | Select one nearest per family before filling remaining slots and disclose the limit. |
| UX-01 | Layer and coverage can be missed if shown after labels. | Put paired layer labels and coverage before neighbor content. |
| UX-02 | `No view yet` can be read as moderation. | Use the exact label and explanation; never substitute neutral or skip. |
| DR-01 | Current party data is time-sensitive and not equivalent to ideology. | Defer it from MVP and record a separate future provenance/freshness contract. |
| DR-02 | Promotion must not rely on a citation or an automated check alone. | Require explicit provenance, substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation before production promotion; do not claim that the current MVP has passed them. |

## Integrated dictionary changes

- Accepted: scoring policy, share fragment, layer result, facet registry, mixed/depends, claim type, epistemic state, source reference, canonical activation, current-party data, taxonomy density, family balancing, editorial anchor, sensitive political data, fail closed, layer transition, coverage warning, and facet signal.
- Clarified: `internal fit` is a within-dataset distance signal; `interpretive neighbor` is not a recommendation or ordinal leaderboard entry.
- Deferred: global dictionary sync for project-specific terms.

## Implementation gate

The implementation may proceed when the plan includes:

- a 48-item versioned dataset with 16 items per layer;
- a deterministic scoring module and validator;
- a safe share envelope;
- coverage-aware results and cross-layer pulls;
- methodology/source disclosure;
- unit and browser tests for the critical findings.
