# Taxonomy governance and measurement reconciliation

Date: 2026-08-30

## Purpose

The sorter has two related but non-identical states:

1. a source-backed research decision about where a tradition belongs in the ontology; and
2. a live measurement state derived from ontology placement, anchors, and target-tagged question coverage.

This document records the executable contract that joins those states without silently converting a research decision into a scoring rule. A taxonomy decision may promote a label into the canonical catalog while a separate measurement tranche supplies a provisional direct branch. That situation must be explicitly reconciled and must never be mistaken for empirical validation.

## Research basis

| Source | Relevant implication for this repository |
|---|---|
| [Freeden, “The Morphological Analysis of Ideology”](https://academic.oup.com/edited-volume/34324/chapter-abstract/291329165) | Ideologies can be represented as structured, contested configurations of political concepts with variants and changing boundaries. Shared concepts do not by themselves establish exclusive ancestry. |
| [Freeden, “Is Nationalism a Distinct Ideology?”](https://journals.sagepub.com/doi/10.1111/1467-9248.00165) | Host formations and adjacent concepts should remain distinguishable from a claim that one tradition subsumes another. |
| [W3C SKOS Reference](https://www.w3.org/TR/skos-reference/) | Hierarchical and associative knowledge-organization relations have different semantics; associative relations must not silently become transitive ancestry. |
| [W3C PROV-O](https://www.w3.org/TR/prov-o/) | Provenance and historical/contextual derivation can be recorded independently from domain-class hierarchy. |
| [AERA/APA/NCME Standards for Educational and Psychological Testing](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf) | Content documentation is one part of a validity argument and cannot substitute for evidence supporting an interpretation for a specified use. |

These sources support the data-model boundary and provenance workflow. They do not validate this repository's wording, vectors, questions, respondent interpretations, or morphology output.

## Executable contract

`src/research-governance.ts` enforces the following for every current ontology or registry target:

- exactly one research decision exists for the target;
- decision source ids exist, are `ideology-research` sources, are unique, and are attached to the target;
- each disposition has the corresponding placement and target-kind boundary;
- non-canonical placements cannot receive a scoring status;
- insufficient source-boundary evidence cannot be marked `scored-provisional`;
- every live measurement mismatch is either absent or covered by an explicit reconciliation record;
- every reconciliation points to the correct decision and target and records the current live measurement status.

`researchTaxonomyGovernanceSummary` reports the decision counts, evidence status, intended resulting status, live measurement exceptions, and unclassified mismatch list. `scripts/audit-research-coverage.ts` includes these governance errors in its top-level validation result and exits nonzero if any error is present.

## Current snapshot

The current executable coverage report records:

- 127 targets: 125 ontology nodes and 2 registry entries;
- 119 canonical nodes with dedicated 4/4/4 descriptive, normative, and prescriptive coverage;
- 6 contextual nodes and 2 registry-only entries kept outside production scoring;
- 119 live production anchors and 1,500 production questions, evenly split 500/500/500 across the three claim layers;
- 1,524 quarantined research candidates across 127 targets, with profiles and false-positive audits for every target;
- 127 source-backed governance decisions: 19 explicit canonical promotions, 100 canonical retentions, 6 contextual retentions, and 2 registry retentions;
- 117 governance results marked `scored-provisional`, 2 marked `catalog-only`, and 8 marked `not-scored`.

Two exceptions are intentionally explicit:

| Target | Research disposition | Live measurement state | Reconciliation |
|---|---|---|---|
| Khomeinism | Canonical catalog promotion, `catalog-only` research result | `dedicated-scored`, 4/4/4 direct coverage | Separate measurement activation record; no empirical-validity claim |
| Qutbism | Canonical catalog promotion, `catalog-only` research result | `dedicated-scored`, 4/4/4 direct coverage | Separate measurement activation record; no empirical-validity claim |

The exceptions preserve the existing decision that taxonomy promotion and measurement activation are separate. They are not silent drift, and they do not change the legacy scorer, coefficients, thresholds, picker behavior, or morphology semantics.

## Verification boundary

The local checks verify source attachment, target inventory closure, placement/status rules, explicit mismatch reconciliation, candidate quarantine, and deterministic report behavior. They do not establish comprehension, response-process interpretation, expert adjudication, reliability, validity, invariance, population consequences, or respondent-level ideological classification. Those external gates remain `NOT RUN` / `NOT VERIFIED` as recorded by the belief-validation protocol.

The current measurement-gap shelf remains effect-free. Its 19 candidates and the optional direct/relational pilot seams are not production questions, do not alter legacy facet distance, and do not promote any construct or ideology into a validated measure.
