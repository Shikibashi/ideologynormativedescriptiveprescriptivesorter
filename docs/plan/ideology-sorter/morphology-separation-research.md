# Morphology separation and selection research tranche

Date: 2026-08-30

This tranche addresses a narrow measurement problem in the existing configuration projection: the candidate list was ordered by provisional internal fit, but the primary morphology contract did not expose how close the nearest competing candidate was. The change records a descriptive fit margin and a low/moderate/high display band. It does not add an ideology, change an anchor vector, promote a construct, or select a unique political identity.

## Evidence synthesis

| Evidence | Implication for this repository | Boundary |
|---|---|---|
| [Freeden, “The Morphological Analysis of Ideology”](https://doi.org/10.1093/oxfordhb/9780199585977.013.0034) describes ideologies as combinations of political concepts whose relative proximities and weights can vary, with boundaries that may be loose and changing. | Keep a candidate neighborhood visible and make closeness between configurations inspectable instead of presenting the first ordered record as a discovered essence. | The source supports an interpretive morphology lens; it does not validate this repository's proxies, anchor vectors, or respondent classifications. |
| [Adcock and Collier, “Measurement Validity”](https://doi.org/10.1017/S0003055401003100) distinguishes conceptualization from measurement and treats validity claims as dependent on the context and use of a measure. | Separate the internal fit margin from any claim about certainty, validity, or generalization. A display band is a software diagnostic, not a calibrated probability. | No respondent, cognitive, psychometric, invariance, or population evidence is created by this change. |
| [Pugnana and Ruggieri, “AUC-based Selective Classification”](https://proceedings.mlr.press/v206/pugnana23a.html) describes selection functions that can abstain when a prediction should not be accepted. | Treat “no unique label selected” as a legitimate output state for a coarse candidate grid; do not force a single output merely because an ordering exists. | This is a technical design analogy only. The project does not optimize risk-coverage, claim calibrated confidence, or import the paper's assumptions. |
| [AERA/APA/NCME Testing Standards](https://www.apa.org/science/programs/testing/standards) require validity evidence to support intended score interpretations and uses. | Keep the six external validation gates open and state that the margin is neither confidence nor validation evidence. | The current repository remains provisional and does not run cognitive or empirical review in this tranche. |

## Implementation decision

`configuration-projection` is now version 2. Each `IdeologicalMorphologyCandidate` carries:

- `margin`: the absolute difference between its internal fit and the closest other candidate's fit;
- `separation`: a display band using the already-versioned low/moderate/high policy thresholds.

The candidates remain the complete provisional canonical candidate neighborhood. The result adds a gap message describing the two leading candidates' margin and explicitly says that no unique ideology label is selected. The margin is not used to tune weights, reorder the ontology, promote a candidate, or convert an unmeasured construct into a scalar signal.

The existing legacy scorer and its separation behavior remain unchanged. This is an additive inspection seam between observed belief proxies and the existing interpretive candidate list.

## Local acceptance conditions

1. The morphology model version for this historical separation tranche was 2 and every exposed candidate had a finite margin in the normalized fit range. The current projection is version 3 because directional fit now reads construct-level profile evidence; see the subsequent integration note for that semantic change.
2. Candidate separation is derived from the predeclared display policy and does not alter the existing candidate order.
3. Identical configuration fixtures are marked low separation and produce an explicit no-unique-label message.
4. The canonical morphology audit still round-trips all current canonical configurations.
5. The completion audit continues to report the six external gates as `NOT RUN` and remains fail-closed.

Passing these conditions demonstrates traceability of a coarse candidate set only. It does not establish a respondent measure, a validated classification, or a scientific confidence estimate.

## V122 implementation boundary — provisional candidates versus under-determined diagnostics

The previous morphology contract exposed every configuration draft in `candidates` whenever at least one provisional record existed. That allowed a ranked list to contain records explicitly marked `under-determined`, even though those records lacked enough defining evidence to be compared as provisional candidates. This was a semantic leakage in the public interpretation boundary.

`configuration-projection` is now version 4. The public `candidates` collection contains only `provisional-candidate` records. The new `underDeterminedCandidates` collection retains source-backed configuration projections whose defining support or total configuration coverage is insufficient; it preserves their missing-evidence diagnostics without assigning them a rank. Provisional margins are computed against the provisional comparison set, while diagnostic records retain a finite grid margin only as non-ranking metadata. A profile with no provisional records remains `not-derived`, but its withheld diagnostics stay inspectable when the three-layer coverage threshold has been met.

This boundary follows the existing morphology and measurement evidence synthesis: ideology is treated as a structured, revisable configuration, conceptualization is kept distinct from measurement, and abstention is a legitimate software state when the current comparison grid cannot support a label. The implementation does not calibrate a confidence score, promote a construct, add a production question, or claim respondent, cognitive, psychometric, invariance, population, consequence, or empirical validity. Local tests and audits remain structural evidence only.
