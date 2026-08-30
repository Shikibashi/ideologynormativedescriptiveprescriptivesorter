# Measurement-gap research tranche

Date: 2026-08-30

This tranche addresses the three belief constructs that the production bank does not yet measure directly—`priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation`—and four declared construct/claim-layer cells that have no production item: prescriptive `concept-conception`, normative `political-economy`, and descriptive plus normative `change-strategy`. The work adds source provenance and keeps the associated question bank on the effect-free research shelf. It does not add production questions, coefficients, thresholds, ideology assignments, or morphology affinity.

## Evidence synthesis

| Construct | Research basis | Design implication | Boundary |
|---|---|---|---|
| `priority-conflict` | [Schwartz (1992)](https://doi.org/10.1016/S0065-2601(08)60281-6) describes a structured value system with compatible and competing motivations. [Sagiv and Schwartz (2022)](https://doi.org/10.1146/annurev-psych-020821-125100) reviews evidence on value conflict, compatibility, priorities, and change across cultures. | Ask an explicit conflict or ordering question when the intended claim is about which commitment governs a trade-off. Do not infer a priority rule from two separate scalar answers. | The literature motivates the distinction; it does not validate this repository's wording, response options, or political classification. |
| `epistemic-stance` | [Adcock and Collier (2001)](https://doi.org/10.1017/S0003055401003100) separates conceptualization from measurement. [Elkjær and Wlezien (2025)](https://doi.org/10.1017/psrm.2024.42) report a preregistered survey experiment in which including a “don't know” option changes preference estimates in some conditions. | Preserve explicit uncertainty and missingness, and keep substantive agreement separate from confidence, revision conditions, and stated evidence standards. | The study is a survey-design risk signal, not evidence that this project's uncertainty candidates are valid or that a respondent's claim is accurate. |
| `heterodoxy-contestation` | [Freeden (1996)](https://academic.oup.com/book/3196) develops ideological morphology as structured combinations of political concepts. [Freeden (2013)](https://doi.org/10.1093/oxfordhb/9780199585977.013.0034) emphasizes contested combinations, variant proximities, and changing ideological boundaries. | Preserve internal disagreement, revision, and contested membership as explicit qualitative or relational evidence rather than forcing one official interpretation of a tradition. | The morphology literature supports an interpretive model of ideological variation; it does not validate a respondent measure or authorize a single ideological identity inference. |
| Missing claim-layer cells | Freeden and Rawls distinguish concept meanings and principles from their institutional enactment; Rawls, Sen, republican theory, North, Pierson, Tilly, and the existing source registry provide distinct normative, institutional, and change-mechanism rationales. | Add candidates only to make the declared measurement gap inspectable: a prescriptive conception, a normative economic-justice standard, a descriptive change mechanism, and a normative transition standard. Keep the claim layer explicit and do not let a cross-construct proxy count as coverage. | These candidates are design hypotheses. Source-backed rationale does not establish comprehension, option distinctness, construct validity, or cross-context comparability. |

## Candidate bank status

The quarantined bank contains 19 candidates. The original five-candidate tranches remain for each entirely uncovered construct:

- `priority-conflict`: four paired-priority choices and one conditional transition vignette;
- `epistemic-stance`: claim-specific confidence, revision, uncertainty, fact/value distinction, and evidence-change prompts;
- `heterodoxy-contestation`: revision, dissent, opposition, internal disagreement, and minority-response prompts.

The layer audit adds four candidates for cells that are declared by the construct registry but absent from production coverage:

- prescriptive `concept-conception`: a structured choice among competing institutional meanings of liberty;
- normative `political-economy`: a structured choice among competing standards for economic justice;
- descriptive `change-strategy`: a structured choice among mechanisms that may explain successful political change;
- normative `change-strategy`: a conditional vignette about the standard used to judge an incremental transition.

Every candidate remains `reviewStatus: "research_candidate"`, carries source references, declares its response format, and records a same-answer/different-reason risk. Candidate wording is therefore a research input and audit target, not a production observation. The bank is intentionally not connected to `DATASET.questions`, legacy effects, scalar coverage, affinity, or named morphology.

## Workflow decision

The coverage audit finds no remaining canonical catalog-only ideology node requiring a new scored branch. Adding another ideology label now would duplicate the current ontology boundary without improving the measured belief seam. The next useful implementation boundary is therefore source-backed construct coverage with explicit quarantine, followed by deterministic provenance checks. The external evidence gates in the belief-validation protocol remain unchanged and are not run by this tranche.

## Local acceptance conditions

The tranche is structurally acceptable only when:

1. all source references resolve in the dataset;
2. each entirely uncovered construct has five source-linked candidates;
3. every previously uncovered declared construct/layer cell has at least one source-linked candidate;
4. candidates remain effect-free and outside the production question ids;
5. the measurement audit still reports the three entirely uncovered constructs as `unmeasured` and reports the construct/layer gaps explicitly;
6. morphology and completion audits preserve their existing provisional and fail-closed status.

Passing these conditions demonstrates repository wiring and quarantine, not cognitive, psychometric, empirical, invariance, population, or respondent validation.

## V131 — duplicate-wording repair remains a measurement-hygiene change

The existing belief-measurement audit identified five exact normalized prompt duplicates across production branches: `n-liberal-feminism-02`, `n-french-fascism-01`, `p-french-fascism-01`, `n-british-fascism-01`, and `p-british-fascism-01`. The repair replaces the shared wording with branch-specific referents while preserving each item's source references, layer, target tags, and effect map. The content version is now 98; no research candidate was promoted and no production question was added or removed.

The post-repair audit reports complete coverage of all 1,500 items, `facet-proxy` as the only measurement mode, zero duplicate-wording flags, zero redundant dispositions, and zero validation errors. It still reports the three unmeasured constructs and 19 quarantined research candidates. This provides a structural uniqueness and contract-preservation check only. It does not establish comprehension, neighboring-item distinctness, cognitive response-process validity, expert agreement, psychometric validity, invariance, population/consequence safety, empirical classification, or respondent morphology.

## V132 — single-claim rewrite for the remaining non-cross-construct signal

The remaining `rewrite` disposition was `n-collectivist-anarchism-04`, whose wording combined participation by people who do common work with participation by people affected by it. The prompt now asks whether people who perform common work should participate as equals in the rules governing it. Its source references, normative layer, Democracy facet, and `democracy: 0.95` legacy effect are unchanged; no production item was added or removed and no candidate was promoted.

At content version 99, the measurement audit reports complete 1,500-item coverage, `facet-proxy` as the only production measurement mode, zero `rewrite`, duplicate-wording, and redundant dispositions, and 42 remaining cross-construct `split` signals. Those split signals remain a human content-review queue because the mechanical flag cannot determine whether a coordinated diagnosis, value, institutional route, condition, or change claim should be separated. This local repair does not establish comprehension, response-process validity, expert agreement, psychometric validity, invariance, population/consequence safety, empirical classification, or respondent morphology.
