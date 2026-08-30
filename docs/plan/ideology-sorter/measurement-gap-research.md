# Measurement-gap research tranche

Date: 2026-08-30

This tranche addresses the three belief constructs that the production bank does not yet measure directly: `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation`. The work adds source provenance and keeps the associated question bank on the effect-free research shelf. It does not add respondent-facing questions, coefficients, thresholds, ideology assignments, or morphology affinity.

## Evidence synthesis

| Construct | Research basis | Design implication | Boundary |
|---|---|---|---|
| `priority-conflict` | [Schwartz (1992)](https://doi.org/10.1016/S0065-2601(08)60281-6) describes a structured value system with compatible and competing motivations. [Sagiv and Schwartz (2022)](https://doi.org/10.1146/annurev-psych-020821-125100) reviews evidence on value conflict, compatibility, priorities, and change across cultures. | Ask an explicit conflict or ordering question when the intended claim is about which commitment governs a trade-off. Do not infer a priority rule from two separate scalar answers. | The literature motivates the distinction; it does not validate this repository's wording, response options, or political classification. |
| `epistemic-stance` | [Adcock and Collier (2001)](https://doi.org/10.1017/S0003055401003100) separates conceptualization from measurement. [Elkjær and Wlezien (2025)](https://doi.org/10.1017/psrm.2024.42) report a preregistered survey experiment in which including a “don't know” option changes preference estimates in some conditions. | Preserve explicit uncertainty and missingness, and keep substantive agreement separate from confidence, revision conditions, and stated evidence standards. | The study is a survey-design risk signal, not evidence that this project's uncertainty candidates are valid or that a respondent's claim is accurate. |
| `heterodoxy-contestation` | [Freeden (1996)](https://academic.oup.com/book/3196) develops ideological morphology as structured combinations of political concepts. [Freeden (2013)](https://doi.org/10.1093/oxfordhb/9780199585977.013.0034) emphasizes contested combinations, variant proximities, and changing ideological boundaries. | Preserve internal disagreement, revision, and contested membership as explicit qualitative or relational evidence rather than forcing one official interpretation of a tradition. | The morphology literature supports an interpretive model of ideological variation; it does not validate a respondent measure or authorize a single ideological identity inference. |

## Candidate bank status

The quarantined bank contains five candidates for each of the three uncovered constructs:

- `priority-conflict`: four paired-priority choices and one conditional transition vignette;
- `epistemic-stance`: claim-specific confidence, revision, uncertainty, fact/value distinction, and evidence-change prompts;
- `heterodoxy-contestation`: revision, dissent, opposition, internal disagreement, and minority-response prompts.

Every candidate remains `reviewStatus: "research_candidate"`, carries source references, declares its response format, and records a same-answer/different-reason risk. Candidate wording is therefore a research input and audit target, not a production observation. The bank is intentionally not connected to `DATASET.questions`, legacy effects, scalar coverage, affinity, or named morphology.

## Workflow decision

The coverage audit finds no remaining canonical catalog-only ideology node requiring a new scored branch. Adding another ideology label now would duplicate the current ontology boundary without improving the measured belief seam. The next useful implementation boundary is therefore source-backed construct coverage with explicit quarantine, followed by deterministic provenance checks. The external evidence gates in the belief-validation protocol remain unchanged and are not run by this tranche.

## Local acceptance conditions

The tranche is structurally acceptable only when:

1. all three new source records resolve in the dataset;
2. each uncovered construct has five source-linked candidates;
3. candidates remain effect-free and outside the production question ids;
4. the measurement audit still reports the three constructs as `unmeasured`;
5. morphology and completion audits preserve their existing provisional and fail-closed status.

Passing these conditions demonstrates repository wiring and quarantine, not cognitive, psychometric, empirical, invariance, population, or respondent validation.
