# Target-specific evidence traceability

## Scope

This tranche closes a structural observability gap in the existing target-coverage audit. The audit now checks whether each canonical target's target-tagged question ids reach the primary belief profile and the target configuration's morphology basis through the real `calculateResults` path.

This is a local implementation contract. It does not promote a target, alter the ontology, add a production question, change a coefficient or threshold, select a leading candidate, or establish a respondent-level identity or validity claim.

## Evidence boundary

The design follows the existing belief-model boundary:

- [Freeden's morphological analysis](https://academic.oup.com/book/3196) supports inspecting configurations of political concepts and their relationships; it does not validate this repository's item effects or respondent interpretations.
- [Morucci et al.'s theory-driven measurement approach](https://www.cambridge.org/core/journals/american-political-science-review/article/measurement-that-matches-theory-theorydriven-identification-in-item-response-theory-models/395DA1DFE3DCD7B866DC053D7554A30B) supports making item-to-dimension links explicit before estimation; this tranche only checks repository dataflow and does not fit a latent model.

No cognitive review, response-process study, expert adjudication, psychometric calibration, reliability/validity estimate, invariance/DIF study, population/consequence review, or held-out respondent morphology study is performed here.

## Structural fixture

For each canonical configuration:

1. The audit derives the target's question ids by claim layer from existing `targetNodeIds` metadata.
2. Target-tagged questions receive the existing deterministic configuration-fixture direction only when a determinate source-backed commitment matches the item's facet effects. A zero alignment remains an explicit `mixed/depends` response; the fixture never manufactures a directional answer for an unrepresented item.
3. All non-target questions also receive explicit `mixed/depends` responses. They satisfy the existing numeric coverage gate but do not provide directional evidence to the profile or morphology basis.
4. The audit calls `calculateResults` and records item ids from `primary.profile.observations`.
5. It intersects the target configuration candidate's `basis[*].evidenceQuestionIds` with the target ids, grouped by layer.

The target metadata is therefore used to select a structural fixture only. It is not passed into production observations, construct aggregation, morphology fit, candidate ordering, or public answer state.

## Fail-closed checks

Each target/layer trace records:

- a representation posture: `directional`, `contested-indeterminate`, or `unrepresented`;
- target question ids;
- target ids receiving directional fixture responses;
- primary-profile evidence ids;
- primary-profile directional evidence ids;
- target morphology-basis evidence ids;
- `pass`, `gap`, or `not-established` status.

The report fails when a target question block is detached from primary-profile evidence, or when a target layer that has determinate source-backed representation has no evidence id in the target morphology basis. A target item with zero configuration alignment remains mixed and is visible as an unrepresented item; it is not silently promoted to directional evidence. A layer whose source-backed configuration is intentionally indeterminate remains an open `not-established` state rather than a blocking failure. The report does not require a particular candidate rank, fit, margin, or identity label.

`directional` means that at least one target item matches a determinate, same-layer configuration commitment. `contested-indeterminate` means the configuration has layer commitments but the source-backed configuration deliberately does not assign a determinate direction; that layer cannot supply morphology direction. `unrepresented` means the target block has no item matching a determinate configuration commitment, or has no layer configuration commitment; it remains underdetermined rather than being treated as composed.

## Current local result

On 2026-08-30, the fixture reached all 119 canonical targets. Every target had four target questions per layer, all target ids reached the primary profile, and determinate target layers contributed target ids to their morphology basis. The directional-trace summary remains false for the four intentionally indeterminate prescriptive layers—Populism, Islamism, Religious Nationalism, and Deep Ecology—and the target-morphology summary remains false for those same open layers. A negative-control test that removes one target question's effects produces a trace failure and flips the primary-profile structural check to `false`.

The separate source-backed commitment-direction gap remains visible for Populism, Islamism, Religious Nationalism, and Deep Ecology prescriptive layers. That gap is an editorial/source-traceability hold and is not converted into a structural or respondent-validity pass by this fixture.
