# Research promotion and demotion governance

## Two separate decisions

The sorter now separates:

1. **Taxonomy placement** — whether a source-backed tradition is canonical, contextual, associated, historical, or catalog-only.
2. **Measurement activation** — whether a candidate question can enter the production bank and affect scoring.

A taxonomy promotion does not activate measurement. A taxonomy demotion does not erase the historical or scholarly record. Both decisions retain rationale, boundaries, competing interpretations, source IDs, and date.

## Current ledger rules

- `promote-to-canonical` requires an ontology node, explicit ideology-research sources, and a bounded rationale. The current Khomeinism and Qutbism promotions result in `catalog-only`, never a score.
- `retain-canonical` keeps a source-backed node visible while leaving anchor validity and measurement activation separate.
- `demote-to-associated` results in registry-only, not-scored context. Deep Ecology and Bioregionalism use this path.
- `retain-contextual` preserves broad or bridge anchors without exclusive ancestry.
- `retain-registry-only` preserves historical, host-dependent, or contested cases.
- `hold-catalog-only` means the label remains visible but has insufficient source/boundary evidence or dedicated measurement for activation.

## Candidate activation gate

`validateResearchPromotion()` remains fail-closed. A candidate must have structural validity, a substantive neighbor-distinctness record, applicable cross-cultural/jurisdictional evidence or a documented not-applicable rationale, and later empirical validation. No cognitive review or respondent-testing stage is added to this workflow. No current candidate satisfies the production activation gate.

## v6 anchor-placement governance

The five broad bridge anchors are retained as contextual records but no longer participate in production neighbor selection. `scoringAnchorsFor()` admits only anchors whose ontology nodes have canonical placement, so contextual visibility cannot silently create a second scoring authority. The four v6 direct blocks are existing canonical nodes with source-backed editorial coverage; their activation remains provisional and does not satisfy the later substantive, cross-context, or empirical promotion gates.
