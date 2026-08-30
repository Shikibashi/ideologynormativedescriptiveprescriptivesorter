import { DATASET } from "../src/data";
import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers } from "../src/belief-direct-items";
import { BELIEF_RELATIONAL_FOLLOWUPS, relationalEvidenceForAnswers } from "../src/belief-followups";
import { calculateBeliefProfile, ideologyConfigurationsFor, RELATIONAL_CONSTRUCT_FOR_KIND, validateBeliefModel } from "../src/beliefs";
import { BELIEF_VALIDATION_GATES, openBeliefValidationGates, validateBeliefValidationLedger } from "../src/belief-validation";
import { deriveIdeologicalMorphology } from "../src/morphology";
import { calculateResults, scoringAnchorsFor, validateDataset } from "../src/scoring";
import type { Answer, AnswerMap, Dataset, IdeologyConfiguration, Layer } from "../src/types";

const layers = ["descriptive", "normative", "prescriptive"] as const satisfies readonly Layer[];

const answersWithLayerFromConfiguration = (configuration: IdeologyConfiguration, layer: Layer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => {
  if (question.layer !== layer) return [question.id, 0];
  const alignment = Object.entries(question.effects).reduce(
    (sum, [facetId, weight]) => sum + Math.abs(weight) * Math.sign(weight) * commitmentDirectionFor(configuration, question.layer, facetId),
    0,
  );
  return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
}));

const commitmentDirectionFor = (configuration: IdeologyConfiguration, layer: Layer, facetId: string): number => configuration.commitments
  .filter((commitment) => commitment.layer === layer && commitment.facetId === facetId && commitment.expectedDirection !== "indeterminate")
  .reduce((sum, commitment) => sum + (commitment.expectedDirection === "positive" ? 1 : -1) * (commitment.centrality === "defining" ? 2 : commitment.centrality === "characteristic" ? 1 : 0.5), 0);

const answersTowardConfiguration = (configuration: IdeologyConfiguration): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => {
  const alignment = Object.entries(question.effects).reduce(
    (sum, [facetId, weight]) => sum + Math.abs(weight) * Math.sign(weight) * commitmentDirectionFor(configuration, question.layer, facetId),
    0,
  );
  return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
}));

const mixAnswerMaps = (left: AnswerMap, right: AnswerMap): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => {
  const leftAnswer = left[question.id];
  const rightAnswer = right[question.id];
  const leftValue = typeof leftAnswer === "number" ? leftAnswer : 0;
  const rightValue = typeof rightAnswer === "number" ? rightAnswer : 0;
  const mixed = (leftValue + rightValue) / 2;
  return [question.id, mixed === 0 ? 0 : mixed > 0 ? 1 : -1];
}));

const firstRecordableOptionId = (options: readonly { id: string; record?: boolean }[]): string =>
  options.find((option) => option.record !== false)?.id ?? "no-view";

const directAnswersFor = (overrides: Readonly<Record<string, string>> = {}): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_DIRECT_ITEMS.map((item) => [item.id, overrides[item.id] ?? firstRecordableOptionId(item.options)]),
);

const relationalAnswersFor = (overrides: Readonly<Record<string, string>> = {}): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, overrides[followUp.id] ?? firstRecordableOptionId(followUp.options)]),
);

const affinityTraceFor = (result: ReturnType<typeof calculateResults>) => result.primary.morphology.candidates
  .map((candidate) => [candidate.anchorId, candidate.fit, candidate.coverage, candidate.basis] as const);

const constructSignalFor = (result: ReturnType<typeof calculateResults>, constructId: string): number | undefined =>
  result.primary.profile.constructs.find((construct) => construct.id === constructId)?.signal;

const candidateRowFor = (configuration: IdeologyConfiguration) => {
  const result = calculateResults(answersTowardConfiguration(configuration));
  const rank = result.primary.morphology.candidates.findIndex((candidate) => candidate.anchorId === configuration.targetId);
  const candidate = rank >= 0 ? result.primary.morphology.candidates[rank] : undefined;
  const directionalBasis = candidate?.basis.filter((basis) => basis.expectedDirection !== "indeterminate") ?? [];
  const constructSignals = new Map(result.primary.profile.constructs.map((construct) => [construct.id, construct.signal]));
  const directionalFitUsesConstructSignal = directionalBasis.length > 0
    && directionalBasis.every((basis) => basis.observedSignal === constructSignals.get(basis.constructId)
      && basis.calculationSource !== "facet-proxy");
  return {
    syntheticProfileId: `source-backed-configuration:${configuration.targetId}`,
    syntheticProfileKind: "source-backed-configuration-projection" as const,
    anchorId: configuration.targetId,
    profileSourceRefs: configuration.sourceRefs,
    profileLayers: [...new Set(configuration.commitments.map((commitment) => commitment.layer))].sort(),
    profileCommitmentCount: configuration.commitments.length,
    targetCandidateRank: rank < 0 ? null : rank + 1,
    targetCandidateStatus: candidate?.status ?? null,
    morphologyStatus: result.primary.morphology.status,
    targetCoverage: candidate?.coverage ?? null,
    targetFit: candidate?.fit ?? null,
    directionalFitUsesConstructSignal,
    facetContextRecordCount: candidate?.basis.filter((basis) => basis.facetProxySignal !== undefined).length ?? 0,
  };
};

const canonicalAnchors = scoringAnchorsFor(DATASET);
const canonicalConfigurations = ideologyConfigurationsFor(DATASET).filter((configuration) => configuration.placement === "canonical");
const validationErrors = [
  ...validateDataset(DATASET),
  ...validateBeliefModel(DATASET),
  ...validateBeliefValidationLedger(DATASET),
];
const roundTripRows = canonicalConfigurations.map(candidateRowFor);
const firstConfiguration = canonicalConfigurations[0];
const secondConfiguration = canonicalConfigurations[1];
const firstConfigurationAnswers = firstConfiguration ? answersTowardConfiguration(firstConfiguration) : {};
const secondConfigurationAnswers = secondConfiguration ? answersTowardConfiguration(secondConfiguration) : {};
const neutralResult = calculateResults(Object.fromEntries(DATASET.questions.map((question) => [question.id, 0])));
const emptyResult = calculateResults({});
const underDeterminedResult = calculateResults(Object.fromEntries(DATASET.questions.map((question) => [
  question.id,
  question.layer === "prescriptive" ? 1 : 0,
])));
const hybridResult = firstConfiguration && secondConfiguration
  ? calculateResults(mixAnswerMaps(firstConfigurationAnswers, secondConfigurationAnswers))
  : undefined;
const causalOnlyProfile = firstConfiguration
  ? calculateBeliefProfile(answersWithLayerFromConfiguration(firstConfiguration, "descriptive"), DATASET)
  : undefined;
const sameValuesDifferentCausalBeliefAnswers = (causalValue: Answer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [
  question.id,
  question.layer === "descriptive" && question.domain === "Economy" ? causalValue : 1,
]));
const sameValuesDifferentCausalBeliefFirst = calculateResults(sameValuesDifferentCausalBeliefAnswers(2));
const sameValuesDifferentCausalBeliefSecond = calculateResults(sameValuesDifferentCausalBeliefAnswers(-2));
const sameValuesDifferentCausalBeliefsVisible = JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.normative)
  === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.normative)
  && JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.prescriptive)
    === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.prescriptive)
  && constructSignalFor(sameValuesDifferentCausalBeliefFirst, "diagnosis-causal-account")
    !== constructSignalFor(sameValuesDifferentCausalBeliefSecond, "diagnosis-causal-account");
const metadataChangedDataset = {
  ...DATASET,
  questions: DATASET.questions.map((question, index) => ({ ...question, targetNodeIds: [`synthetic-metadata-${index}`] })),
};
const metadataBaseline = firstConfiguration ? calculateBeliefProfile(firstConfigurationAnswers, DATASET) : undefined;
const metadataChanged = firstConfiguration ? calculateBeliefProfile(firstConfigurationAnswers, metadataChangedDataset) : undefined;

const firstDirectResult = calculateResults(
  firstConfigurationAnswers,
  DATASET,
  [],
  directEvidenceForAnswers(directAnswersFor()),
);
const alternativeDirectResult = calculateResults(
  firstConfigurationAnswers,
  DATASET,
  [],
  directEvidenceForAnswers(directAnswersFor({
    "conception-of-freedom": "non-domination",
    "causal-account-of-inequality": "institutional-feedback",
    "distributive-reason": "need",
  })),
);
const weakDirectionalResult = calculateResults(Object.fromEntries(DATASET.questions.map((question) => [question.id, 1])));
const firstRelationalResult = calculateResults(
  firstConfigurationAnswers,
  DATASET,
  relationalEvidenceForAnswers(relationalAnswersFor()),
);
const alternativeRelationalResult = calculateResults(
  firstConfigurationAnswers,
  DATASET,
  relationalEvidenceForAnswers(relationalAnswersFor({
    "priority-liberty-equality": "equality-first",
    "conditional-reform-deep-change": "withhold-foreclosing-reform",
  })),
);
const contradictionResult = calculateResults(
  firstConfigurationAnswers,
  DATASET,
  relationalEvidenceForAnswers(relationalAnswersFor({ "contradiction-goal-route": "unresolved-conflict" })),
);
const relationalEvidenceAttachedToConstruct = firstRelationalResult.primary.profile.relationalEvidence.length === BELIEF_RELATIONAL_FOLLOWUPS.length
  && firstRelationalResult.primary.profile.relationalEvidence.every((evidence) => evidence.constructIds.includes(RELATIONAL_CONSTRUCT_FOR_KIND[evidence.kind]))
  && firstRelationalResult.primary.profile.constructs.every((construct) => construct.relationalEvidenceIds.every((evidenceId) =>
    firstRelationalResult.primary.profile.relationalEvidence.some((evidence) => evidence.id === evidenceId && evidence.constructIds.includes(construct.id))));

const adversarialChecks = {
  neighboringConfigurationsRoundTrip: roundTripRows.every((row) => row.targetCandidateRank !== null),
  morphologyFitUsesConstructProfile: roundTripRows.every((row) => row.directionalFitUsesConstructSignal),
  betweenCanonicalProfilesRemainVisible: hybridResult?.primary.morphology.status === "provisional-candidates"
    && (hybridResult.primary.morphology.candidates.length ?? 0) > 0,
  weakProfileWithholdsMorphology: emptyResult.primary.morphology.status === "insufficient-information"
    && emptyResult.primary.morphology.candidates.length === 0,
  allMixedProfileDoesNotNameMorphology: neutralResult.primary.morphology.status === "not-derived"
    && neutralResult.primary.morphology.candidates.length === 0
    && neutralResult.primary.morphology.underDeterminedCandidates.length > 0,
  underDeterminedRecordsAreSeparated: underDeterminedResult.primary.morphology.status === "provisional-candidates"
    && underDeterminedResult.primary.morphology.candidates.length > 0
    && underDeterminedResult.primary.morphology.candidates.every((candidate) => candidate.status === "provisional-candidate")
    && underDeterminedResult.primary.morphology.underDeterminedCandidates.length > 0
    && underDeterminedResult.primary.morphology.underDeterminedCandidates.every((candidate) => candidate.status === "under-determined")
    && underDeterminedResult.primary.morphology.underDeterminedCandidates.every((candidate) =>
      !underDeterminedResult.primary.morphology.candidates.some((provisional) => provisional.anchorId === candidate.anchorId)),
  mixedResponsesRemainNonDirectional: neutralResult.primary.profile.observations
    .filter((observation) => observation.state === "mixed")
    .every((observation) => observation.value === undefined)
    && neutralResult.primary.profile.facets.every((facet) => facet.signal === undefined)
    && neutralResult.primary.profile.constructs.every((construct) => construct.signal === undefined)
    && neutralResult.primary.morphology.candidates.every((candidate) => candidate.basis
      .every((basis) => basis.agreement === undefined && basis.evidenceQuestionIds.length === 0))
    && neutralResult.primary.morphology.underDeterminedCandidates.length > 0
    && neutralResult.primary.morphology.underDeterminedCandidates.every((candidate) => candidate.basis
      .every((basis) => basis.agreement === undefined && basis.evidenceQuestionIds.length === 0)),
  sameValuesDifferentCausalBeliefsVisible,
  samePolicyDifferentPrincipleVisible: firstDirectResult.primary.profile.directEvidence.find((item) => item.kind === "distributive-reason")?.statement
    !== alternativeDirectResult.primary.profile.directEvidence.find((item) => item.kind === "distributive-reason")?.statement,
  neighboringConceptionsVisible: firstDirectResult.primary.profile.directEvidence.find((item) => item.kind === "conception")?.statement
    !== alternativeDirectResult.primary.profile.directEvidence.find((item) => item.kind === "conception")?.statement,
  samePolicyDifferentPrincipleDoesNotChangeAffinity: JSON.stringify(affinityTraceFor(firstDirectResult)) === JSON.stringify(affinityTraceFor(alternativeDirectResult)),
  neighboringConceptionsDoNotChangeAffinity: JSON.stringify(affinityTraceFor(firstDirectResult)) === JSON.stringify(affinityTraceFor(alternativeDirectResult)),
  alternativePriorityRulesVisible: firstRelationalResult.primary.profile.relationalEvidence.find((item) => item.kind === "priority")?.rule
    !== alternativeRelationalResult.primary.profile.relationalEvidence.find((item) => item.kind === "priority")?.rule,
  alternativeConditionalRulesVisible: firstRelationalResult.primary.profile.relationalEvidence.find((item) => item.kind === "conditional")?.condition
    !== alternativeRelationalResult.primary.profile.relationalEvidence.find((item) => item.kind === "conditional")?.condition,
  relationalEvidenceAttachedToConstruct,
  relationalRulesDoNotChangeAffinity: JSON.stringify(affinityTraceFor(firstRelationalResult)) === JSON.stringify(affinityTraceFor(alternativeRelationalResult)),
  unresolvedContradictionVisible: contradictionResult.primary.profile.relationalSummary.unresolvedContradictions === 1
    && contradictionResult.primary.profile.relationalEvidence.some((item) => item.kind === "contradiction" && !item.resolution?.trim()),
  contradictionDoesNotChangeAffinity: JSON.stringify(affinityTraceFor(contradictionResult)) === JSON.stringify(affinityTraceFor(calculateResults(firstConfigurationAnswers))),
  weakDirectionalProfileRemainsProvisional: weakDirectionalResult.primary.profile.status === "partial"
    && weakDirectionalResult.primary.morphology.status === "provisional-candidates"
    && weakDirectionalResult.primary.morphology.candidates.length > 0
    && weakDirectionalResult.primary.profile.constructs
      .filter((construct) => construct.signal !== undefined)
      .every((construct) => Math.abs(construct.signal ?? 0) <= 0.5),
};

const adversarialFailureLayers: Readonly<Record<keyof typeof adversarialChecks, string>> = {
  neighboringConfigurationsRoundTrip: "ideological-mapping",
  morphologyFitUsesConstructProfile: "ideological-mapping",
  betweenCanonicalProfilesRemainVisible: "ideological-mapping",
  weakProfileWithholdsMorphology: "question",
  allMixedProfileDoesNotNameMorphology: "question",
  underDeterminedRecordsAreSeparated: "ideological-mapping",
  mixedResponsesRemainNonDirectional: "question",
  sameValuesDifferentCausalBeliefsVisible: "causal-belief",
  samePolicyDifferentPrincipleVisible: "conception",
  neighboringConceptionsVisible: "conception",
  samePolicyDifferentPrincipleDoesNotChangeAffinity: "weighting",
  neighboringConceptionsDoNotChangeAffinity: "weighting",
  alternativePriorityRulesVisible: "priority-conflict-rule",
  alternativeConditionalRulesVisible: "priority-conflict-rule",
  relationalEvidenceAttachedToConstruct: "relationship",
  relationalRulesDoNotChangeAffinity: "weighting",
  unresolvedContradictionVisible: "relationship",
  contradictionDoesNotChangeAffinity: "weighting",
  weakDirectionalProfileRemainsProvisional: "ideological-mapping",
};

const failures = [
  ...validationErrors,
  ...canonicalConfigurations.filter((configuration) => configuration.evidencePosture !== "source-backed-projection").map((configuration) => `${configuration.targetId} lacks a source-backed canonical configuration`),
  ...canonicalConfigurations.filter((configuration) => !configuration.conceptions.some((conception) => conception.evidencePosture === "source-backed")).map((configuration) => `${configuration.targetId} lacks a source-backed conception record`),
  ...roundTripRows.filter((row) => row.targetCandidateRank === null).map((row) => `${row.anchorId} is absent from its canonical morphology candidate set`),
  ...(neutralResult.beliefMorphology.status !== "not-derived" ? ["all-mixed synthetic profile derived a named morphology"] : []),
  ...Object.entries(adversarialChecks)
    .filter(([, passed]) => !passed)
    .map(([name]) => `adversarial check failed at ${adversarialFailureLayers[name as keyof typeof adversarialFailureLayers]} layer: ${name}`),
  ...(metadataBaseline && metadataChanged && JSON.stringify(metadataBaseline.observations) !== JSON.stringify(metadataChanged.observations)
    ? ["branch target metadata changed belief observations"]
    : []),
  ...(metadataBaseline && metadataChanged && JSON.stringify(metadataBaseline.constructs) !== JSON.stringify(metadataChanged.constructs)
    ? ["branch target metadata changed construct results"]
    : []),
];

const report = {
  generatedAt: new Date().toISOString(),
  fixture: "finite synthetic commitment-configuration audit",
  interpretation: "Structural and adversarial diagnostics only. Round-trip presence, neutral fail-closed behavior, hybrid visibility, same-values/different-causal-belief separation, causal-only separation, and metadata isolation do not establish respondent, cognitive, psychometric, invariance, population, or empirical validity.",
  validationLedger: {
    gates: BELIEF_VALIDATION_GATES,
    openRequiredGateIds: openBeliefValidationGates().map((gate) => gate.id),
    completionEligible: openBeliefValidationGates().length === 0,
  },
  canonicalAnchors: canonicalAnchors.length,
  configurationCoverage: {
    canonical: canonicalConfigurations.length,
    sourceBacked: canonicalConfigurations.filter((configuration) => configuration.evidencePosture === "source-backed-projection").length,
    anchorOnly: canonicalConfigurations.filter((configuration) => configuration.evidencePosture === "anchor-only-projection").length,
    allHaveCommitments: canonicalConfigurations.every((configuration) => configuration.commitments.length > 0),
    allHaveConceptualCommitments: canonicalConfigurations.every((configuration) => configuration.conceptualCommitments.length > 0),
    allHaveSourceBackedConceptualRepresentation: canonicalConfigurations.every((configuration) => configuration.conceptions.some((conception) => conception.evidencePosture === "source-backed")),
    allHaveClassifiedConceptions: canonicalConfigurations.every((configuration) => configuration.conceptions.every((conception) =>
      conception.representation === "explicit-research-conception" ? conception.facetId === undefined : conception.facetId !== undefined)),
    explicitResearchConceptionCount: canonicalConfigurations.reduce((total, configuration) => total + configuration.conceptions.filter((conception) => conception.representation === "explicit-research-conception").length, 0),
    canonicalConfigurationsWithExplicitResearchConceptions: canonicalConfigurations.filter((configuration) => configuration.conceptions.some((conception) => conception.representation === "explicit-research-conception")).map((configuration) => configuration.targetId),
    canonicalConfigurationsWithoutExplicitResearchConceptions: canonicalConfigurations.filter((configuration) => !configuration.conceptions.some((conception) => conception.representation === "explicit-research-conception")).map((configuration) => configuration.targetId),
    withoutConceptualCommitments: canonicalConfigurations.filter((configuration) => configuration.conceptualCommitments.length === 0).map((configuration) => configuration.targetId),
    allHaveNormativeCommitments: canonicalConfigurations.every((configuration) => configuration.normativeCommitments.length > 0),
    allHaveDescriptiveAssumptions: canonicalConfigurations.every((configuration) => configuration.descriptiveAssumptions.length > 0),
    allHaveInstitutionalImplications: canonicalConfigurations.every((configuration) => configuration.institutionalImplications.length > 0),
    researchedRelationshipCount: canonicalConfigurations.reduce((total, configuration) => total + configuration.researchedRelationships.length, 0),
    sourceBackedRelationshipCount: canonicalConfigurations.reduce((total, configuration) => total + configuration.researchedRelationships.filter((relationship) => relationship.evidencePosture.startsWith("source-backed")).length, 0),
    contestedRelationshipCount: canonicalConfigurations.reduce((total, configuration) => total + configuration.researchedRelationships.filter((relationship) => relationship.evidencePosture === "source-backed-contested").length, 0),
    canonicalConfigurationsWithResearchedRelationships: canonicalConfigurations.filter((configuration) => configuration.researchedRelationships.length > 0).map((configuration) => configuration.targetId),
    canonicalConfigurationsWithoutResearchedRelationships: canonicalConfigurations.filter((configuration) => configuration.researchedRelationships.length === 0).map((configuration) => configuration.targetId),
    allResearchedRelationshipParticipantsResolved: canonicalConfigurations.every((configuration) => configuration.researchedRelationships.every((relationship) => relationship.participants.every((participant) => participant.commitmentIds.length > 0))),
    allHaveRelationalConstraintGaps: canonicalConfigurations.every((configuration) => configuration.relationalConstraints.length === 5),
  },
  roundTrip: {
    syntheticProfileCount: roundTripRows.length,
    sourceBackedSyntheticProfileCount: roundTripRows.filter((row) => row.syntheticProfileKind === "source-backed-configuration-projection").length,
    targetPresent: roundTripRows.filter((row) => row.targetCandidateRank !== null).length,
    targetProvisional: roundTripRows.filter((row) => row.targetCandidateStatus === "provisional-candidate").length,
    targetUnderDetermined: roundTripRows.filter((row) => row.targetCandidateStatus === "under-determined").length,
    worstTargetRank: Math.max(...roundTripRows.map((row) => row.targetCandidateRank ?? 0)),
  },
  adversarial: {
    neutralMorphologyStatus: neutralResult.primary.morphology.status,
    neutralCandidateCount: neutralResult.primary.morphology.candidates.length,
    neutralUnderDeterminedCandidateCount: neutralResult.primary.morphology.underDeterminedCandidates.length,
    underDeterminedMorphologyStatus: underDeterminedResult.primary.morphology.status,
    underDeterminedCandidateCount: underDeterminedResult.primary.morphology.candidates.length,
    underDeterminedDiagnosticCount: underDeterminedResult.primary.morphology.underDeterminedCandidates.length,
    mixedResponsesRemainNonDirectional: adversarialChecks.mixedResponsesRemainNonDirectional,
    hybridMorphologyStatus: hybridResult?.primary.morphology.status ?? null,
    hybridCandidateCount: hybridResult?.primary.morphology.candidates.length ?? 0,
    causalOnlyProfileStatus: causalOnlyProfile?.status ?? null,
    causalOnlyUnmeasuredConstructs: causalOnlyProfile?.measurementSummary.uncoveredConstructIds ?? [],
    sameValuesDifferentCausalBeliefs: {
      normativeSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.normative)
        === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.normative),
      prescriptiveSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.prescriptive)
        === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.prescriptive),
      firstDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefFirst, "diagnosis-causal-account") ?? null,
      secondDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefSecond, "diagnosis-causal-account") ?? null,
      visible: sameValuesDifferentCausalBeliefsVisible,
    },
    metadataIsolated: metadataBaseline && metadataChanged
      ? JSON.stringify(metadataBaseline.observations) === JSON.stringify(metadataChanged.observations)
        && JSON.stringify(metadataBaseline.constructs) === JSON.stringify(metadataChanged.constructs)
      : null,
    adversarialChecks,
    adversarialFailureLayers,
  },
  validationErrors,
  failures,
  rows: roundTripRows,
};

const output = process.argv.includes("--summary")
  ? {
      generatedAt: report.generatedAt,
      canonicalAnchors: report.canonicalAnchors,
      configurationCoverage: report.configurationCoverage,
      roundTrip: report.roundTrip,
      adversarial: report.adversarial,
      validationErrorCount: report.validationErrors.length,
      failureCount: report.failures.length,
    }
  : report;

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (failures.length > 0) process.exitCode = 1;
