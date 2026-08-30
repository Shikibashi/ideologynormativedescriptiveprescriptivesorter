import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers, validateBeliefDirectEvidence, validateBeliefDirectItems } from "../src/belief-direct-items";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateOptionIdFor, gapEvidenceForAnswers, validateBeliefGapCandidates } from "../src/belief-gap-candidates";
import { BELIEF_RELATIONAL_FOLLOWUPS, relationalEvidenceForAnswers } from "../src/belief-followups";
import { DATASET } from "../src/data";
import {
  BELIEF_CONSTRUCT_DEFINITIONS,
  BELIEF_CONSTRUCTS,
  RELATIONAL_CONSTRUCT_FOR_KIND,
  auditBeliefMeasurement,
  ideologyConfigurationsFor,
  validateBeliefModel,
} from "../src/beliefs";
import { BELIEF_VALIDATION_GATES, openBeliefValidationGates, validateBeliefValidationLedger } from "../src/belief-validation";
import { auditIdeologyQuestionCoverage } from "../src/ideology-question-coverage";
import { researchAnchorProfiles, validateCuratedResearchMetadata } from "../src/research";
import { calculateResults, scoringAnchorsFor, validateDataset } from "../src/scoring";
import { LAYERS, type Answer, type AnswerMap, type IdeologyConfiguration } from "../src/types";

const allAnswers = (value: Answer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, value]));

const commitmentDirectionFor = (configuration: IdeologyConfiguration, layer: IdeologyConfiguration["commitments"][number]["layer"], facetId: string): number => configuration.commitments
  .filter((commitment) => commitment.layer === layer && commitment.facetId === facetId && commitment.expectedDirection !== "indeterminate")
  .reduce((sum, commitment) => sum + (commitment.expectedDirection === "positive" ? 1 : -1) * (commitment.centrality === "defining" ? 2 : commitment.centrality === "characteristic" ? 1 : 0.5), 0);

const answersTowardConfiguration = (configuration: IdeologyConfiguration): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => {
  const alignment = Object.entries(question.effects).reduce(
    (sum, [facetId, weight]) => sum + Math.abs(weight) * Math.sign(weight) * commitmentDirectionFor(configuration, question.layer, facetId),
    0,
  );
  return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
}));

const firstRecordedOptionId = (options: readonly { id: string; record?: boolean }[]): string =>
  options.find((option) => option.record !== false)?.id ?? "no-view";

const firstDirectAnswers = (): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_DIRECT_ITEMS.map((item) => [item.id, firstRecordedOptionId(item.options)]),
);

const firstRelationalAnswers = (): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, firstRecordedOptionId(followUp.options)]),
);

const firstGapAnswers = (): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_GAP_CANDIDATES.map((candidate) => [candidate.id, beliefGapCandidateOptionIdFor(candidate, 0)]),
);

const affinityTraceFor = (result: ReturnType<typeof calculateResults>) => result.primary.morphology.candidates
  .map((candidate) => [candidate.anchorId, candidate.fit, candidate.coverage, candidate.basis] as const);

const constructSignalFor = (result: ReturnType<typeof calculateResults>, constructId: string): number | undefined =>
  result.primary.profile.constructs.find((construct) => construct.id === constructId)?.signal;

const canonicalConfigurations = ideologyConfigurationsFor(DATASET).filter((configuration) => configuration.placement === "canonical");
const canonicalNodeIds = new Set(DATASET.ideologyNodes.filter((node) => node.placement === "canonical").map((node) => node.id));
const contestedRouteVariantCounts = new Map<string, number>([
  ["populism", 2],
  ["islamism", 2],
  ["religious-nationalism", 2],
  ["deep-ecology", 4],
]);
const expectedContestedRouteVariantCount = [...contestedRouteVariantCounts.values()].reduce((sum, count) => sum + count, 0);
const contestedRouteVariantProfiles = [...contestedRouteVariantCounts.keys()].map((targetId) => researchAnchorProfiles.find((profile) => profile.targetId === targetId));
const contestedRouteVariants = contestedRouteVariantProfiles.flatMap((profile) => profile?.routeVariants ?? []);
const productionQuestionIds = new Set(DATASET.questions.map((question) => question.id));
const productionAnchorIds = new Set(scoringAnchorsFor(DATASET).map((anchor) => anchor.id));
const researchMetadataValidationErrors = validateCuratedResearchMetadata(DATASET);
const validationErrors = [
  ...validateDataset(DATASET),
  ...validateBeliefModel(DATASET),
  ...validateBeliefGapCandidates(DATASET),
  ...validateBeliefDirectItems(DATASET),
  ...validateBeliefValidationLedger(DATASET),
  ...researchMetadataValidationErrors,
];
const audits = auditBeliefMeasurement(DATASET);
const productionCoveredConstructIds = new Set(audits.flatMap((audit) => audit.constructIds));
const productionUnmeasuredConstructIds = BELIEF_CONSTRUCT_DEFINITIONS
  .filter((definition) => !productionCoveredConstructIds.has(definition.id))
  .map((definition) => definition.id);
const directPilotCoversProductionGaps = productionUnmeasuredConstructIds.every((constructId) =>
  BELIEF_DIRECT_ITEMS.some((item) => item.constructIds.includes(constructId)),
);
const questionCoverage = auditIdeologyQuestionCoverage(DATASET);
const expectedConstructLayerItemCounts: Record<string, Record<string, number>> = Object.fromEntries(
  BELIEF_CONSTRUCTS.map((constructId) => [constructId, Object.fromEntries(LAYERS.map((layer) => [layer, 0]))]),
);
for (const audit of audits) {
  for (const constructId of audit.constructIds) expectedConstructLayerItemCounts[constructId][audit.layer] += 1;
}
const expectedUncoveredConstructLayerPairs = BELIEF_CONSTRUCT_DEFINITIONS.flatMap((definition) => definition.layers
  .filter((layer) => expectedConstructLayerItemCounts[definition.id][layer] === 0)
  .map((layer) => `${definition.id}:${layer}`));
const baseAnswers = allAnswers(2);
const baseResult = calculateResults(baseAnswers, DATASET);
const noViewResult = calculateResults(allAnswers("no-view"), DATASET);
const mixedResult = calculateResults(allAnswers(0), DATASET);
const sameValuesDifferentCausalBeliefAnswers = (causalValue: Answer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [
  question.id,
  question.layer === "descriptive" && question.domain === "Economy" ? causalValue : 1,
]));
const sameValuesDifferentCausalBeliefFirst = calculateResults(sameValuesDifferentCausalBeliefAnswers(2), DATASET);
const sameValuesDifferentCausalBeliefSecond = calculateResults(sameValuesDifferentCausalBeliefAnswers(-2), DATASET);
const sameValuesDifferentCausalBeliefsEvidence = {
  normativeSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.normative)
    === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.normative),
  prescriptiveSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.legacy.layers.prescriptive)
    === JSON.stringify(sameValuesDifferentCausalBeliefSecond.legacy.layers.prescriptive),
  firstDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefFirst, "diagnosis-causal-account") ?? null,
  secondDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefSecond, "diagnosis-causal-account") ?? null,
};
const directEvidence = directEvidenceForAnswers(firstDirectAnswers());
const relationalEvidence = relationalEvidenceForAnswers(firstRelationalAnswers());
const gapEvidence = gapEvidenceForAnswers(firstGapAnswers());
const directResult = calculateResults(baseAnswers, DATASET, [], directEvidence);
const relationalResult = calculateResults(baseAnswers, DATASET, relationalEvidence);
const gapResult = calculateResults(baseAnswers, DATASET, [], [], gapEvidence);
const relationalEvidenceAttachedToConstruct = relationalEvidence.length === BELIEF_RELATIONAL_FOLLOWUPS.length
  && relationalEvidence.every((evidence) => evidence.constructIds.includes(RELATIONAL_CONSTRUCT_FOR_KIND[evidence.kind]))
  && relationalResult.primary.profile.constructs.every((construct) => construct.relationalEvidenceIds.every((evidenceId) =>
    relationalResult.primary.profile.relationalEvidence.some((evidence) => evidence.id === evidenceId && evidence.constructIds.includes(construct.id))));
const directEvidenceAttachedToStructure = directEvidence.every((evidence) => evidence.constructIds.every((constructId) =>
  directResult.primary.profile.structure.some((dimension) => dimension.constructIds.includes(constructId) && dimension.directEvidenceIds.includes(evidence.id))));
const relationalEvidenceAttachedToStructure = relationalEvidence.every((evidence) => evidence.constructIds.every((constructId) =>
  relationalResult.primary.profile.structure.some((dimension) => dimension.constructIds.includes(constructId) && dimension.relationalEvidenceIds.includes(evidence.id))));
const relationalDimensionGraphIsComplete = relationalResult.primary.profile.structure.every((dimension) => {
  const expectedRelatedDimensionIds = new Set(relationalEvidence
    .filter((evidence) => evidence.constructIds.some((constructId) => dimension.constructIds.includes(constructId)))
    .flatMap((evidence) => relationalResult.primary.profile.structure
      .filter((candidate) => candidate.id !== dimension.id && evidence.constructIds.some((constructId) => candidate.constructIds.includes(constructId)))
      .map((candidate) => candidate.id)));
  return expectedRelatedDimensionIds.size === dimension.relatedDimensionIds.length
    && dimension.relatedDimensionIds.every((dimensionId) => expectedRelatedDimensionIds.has(dimensionId));
});
const gapEvidenceAttachedToStructure = gapEvidence.every((evidence) => evidence.constructId !== undefined
  && gapResult.primary.profile.structure.some((dimension) => dimension.constructIds.includes(evidence.constructId) && dimension.gapEvidenceIds.includes(evidence.id)));
const gapEvidenceRemainsQuarantined = gapResult.primary.profile.gapEvidence.length === gapEvidence.length
  && gapResult.primary.profile.gapEvidence.every((evidence) => evidence.reviewStatus === "research_candidate")
  && gapResult.primary.profile.constructs
    .filter((construct) => ["priority-conflict", "epistemic-stance", "heterodoxy-contestation"].includes(construct.id))
    .every((construct) => construct.status === "not-yet-measured" && construct.signal === undefined)
  && gapResult.primary.profile.constructs
    .filter((construct) => !["priority-conflict", "epistemic-stance", "heterodoxy-contestation"].includes(construct.id))
    .every((construct) => construct.signal === baseResult.primary.profile.constructs.find((baseline) => baseline.id === construct.id)?.signal);

const syntheticProfiles = canonicalConfigurations.map((configuration) => {
  const result = calculateResults(answersTowardConfiguration(configuration), DATASET);
  const candidate = result.primary.morphology.candidates.find((item) => item.anchorId === configuration.targetId);
  return {
    id: `source-backed-configuration:${configuration.targetId}`,
    kind: "source-backed-configuration-projection" as const,
    expectedAnchorId: configuration.targetId,
    sourceRefs: configuration.sourceRefs,
    commitmentCount: configuration.commitments.length,
    commitmentLayers: [...new Set(configuration.commitments.map((commitment) => commitment.layer))].sort(),
    profileStatus: result.primary.profile.status,
    morphologyStatus: result.primary.morphology.status,
    candidateFound: candidate !== undefined,
    candidateStatus: candidate?.status ?? null,
    candidateCoverage: candidate?.coverage ?? null,
    candidateFit: candidate?.fit ?? null,
    evidenceQuestionCount: new Set(candidate?.basis.flatMap((basis) => basis.evidenceQuestionIds) ?? []).size,
  };
});
const baseConstructSignals = new Map(baseResult.primary.profile.constructs.map((construct) => [construct.id, construct.signal]));

const structuralChecks = {
  primaryBeliefPathIsExplicit: baseResult.primary.profile === baseResult.beliefProfile
    && baseResult.primary.morphology === baseResult.beliefMorphology
    && baseResult.primary.pulls === baseResult.primary.profile.crossLayerPulls
    && baseResult.legacy.layers === baseResult.layers
    && baseResult.legacy.combined === baseResult.combined,
  integratedBeliefStructureTrace: baseResult.primary.profile.structure.length === 11
    && new Set(baseResult.primary.profile.structure.map((dimension) => dimension.id)).size === baseResult.primary.profile.structure.length
    && new Set(baseResult.primary.profile.structure.flatMap((dimension) => dimension.constructIds)).size === BELIEF_CONSTRUCTS.length
    && baseResult.primary.profile.structure.every((dimension) => {
      const observedByLayer = LAYERS.reduce((sum, layer) => sum + dimension.observedObservationCountsByLayer[layer], 0);
      const directionalByLayer = LAYERS.reduce((sum, layer) => sum + dimension.directionalObservationCountsByLayer[layer], 0);
      return dimension.constructIds.length > 0
        && dimension.label.length > 0
        && dimension.description.length > 0
        && dimension.gap.length > 0
        && dimension.sourceRefs.length > 0
        && observedByLayer === dimension.observedObservationCount
        && directionalByLayer === dimension.directionalObservationCount
        && LAYERS.every((layer) => dimension.directionalObservationCountsByLayer[layer] <= dimension.observedObservationCountsByLayer[layer]);
    }),
  structureSignalUsesConstructProfile: baseResult.primary.profile.structure.every((dimension) => {
    if (dimension.constructIds.length !== 1) return false;
    const construct = baseResult.primary.profile.constructs.find((candidate) => candidate.id === dimension.constructIds[0]);
    return construct !== undefined
      && dimension.observedSignal === construct.signal
      && JSON.stringify(dimension.observedSignalEvidenceQuestionIds) === JSON.stringify(construct.directionalEvidenceQuestionIds);
  }),
  responseToProfileToMorphologyTrace: baseResult.primary.profile.observations.length > 0
    && baseResult.primary.profile.constructs.length === BELIEF_CONSTRUCT_DEFINITIONS.length
    && baseResult.primary.profile.structure.length > 0
    && baseResult.primary.morphology.candidates.some((candidate) => candidate.basis.length > 0
      && candidate.basis.every((basis) => basis.profileDimensionIds.length > 0
        && basis.profileDimensionIds.every((dimensionId) => baseResult.primary.profile.structure.some((dimension) => dimension.id === dimensionId)))
      && candidate.basis.some((basis) => basis.evidenceQuestionIds.length > 0)),
  morphologyFitUsesConstructProfile: baseResult.primary.morphology.candidates.length > 0
    && baseResult.primary.morphology.candidates.every((candidate) => candidate.basis
      .filter((basis) => basis.expectedDirection !== "indeterminate")
      .every((basis) => basis.observedSignal === baseConstructSignals.get(basis.constructId)
        && basis.calculationSource !== "facet-proxy")),
  fixedCanonicalOntologyProjection: canonicalConfigurations.length === scoringAnchorsFor(DATASET).length
    && canonicalConfigurations.every((configuration) => canonicalNodeIds.has(configuration.ontologyNodeId))
    && baseResult.primary.morphology.candidates.every((candidate) => canonicalNodeIds.has(candidate.ontologyNodeId)),
  completeProductionItemAudit: audits.length === DATASET.questions.length
    && audits.every((audit) => audit.constructIds.length > 0 && audit.sourceRefs.length > 0),
  researchMetadataHasNoValidationErrors: researchMetadataValidationErrors.length === 0,
  contestedRouteVariantCoverage: contestedRouteVariantProfiles.length === contestedRouteVariantCounts.size
    && contestedRouteVariantProfiles.every((profile) => profile !== undefined
      && profile.routeVariants.length === contestedRouteVariantCounts.get(profile.targetId)),
  contestedRouteVariantsRemainNonScoring: contestedRouteVariants.length === expectedContestedRouteVariantCount
    && contestedRouteVariants.every((route) => route.evidencePosture === "source-backed-contested"
      && route.dimensions.length > 0
      && route.dimensions.every((dimension) => dimension.layer === "prescriptive")
      && route.dimensions.some((dimension) => dimension.expectedDirection !== "indeterminate")
      && !productionQuestionIds.has(route.id)
      && !productionAnchorIds.has(route.id)),
  questionCoverageHasNoValidationErrors: questionCoverage.validationErrors.length === 0,
  questionCoverageHasNoUnexpectedFailures: questionCoverage.failures.length === 0,
  questionCoverageHasCompleteTargetBlocks: questionCoverage.structuralChecks.allCanonicalTargetsHaveFourQuestionsPerLayer,
  questionCoverageMorphologyIsProvisional: questionCoverage.structuralChecks.allPrimaryMorphologyCandidatesAreProvisional,
  constructLayerCoverageIsExplicit: BELIEF_CONSTRUCT_DEFINITIONS.every((definition) => LAYERS.every((layer) =>
    baseResult.primary.profile.measurementSummary.constructLayerItemCounts[definition.id][layer] === expectedConstructLayerItemCounts[definition.id][layer],
  ))
    && JSON.stringify(baseResult.primary.profile.measurementSummary.uncoveredConstructLayerPairs.map((pair) => `${pair.constructId}:${pair.layer}`))
      === JSON.stringify(expectedUncoveredConstructLayerPairs),
  declaredLayerGapsRemainNonObserved: BELIEF_CONSTRUCT_DEFINITIONS.every((definition) => {
    const construct = baseResult.primary.profile.constructs.find((candidate) => candidate.id === definition.id);
    const hasDeclaredLayerGap = definition.layers.some((layer) => expectedConstructLayerItemCounts[definition.id][layer] === 0);
    return construct !== undefined && (!hasDeclaredLayerGap || construct.status !== "observed");
  }),
  layerGapCandidatesAreTracked: baseResult.primary.profile.measurementSummary.uncoveredConstructLayerPairs.every((pair) =>
    BELIEF_GAP_CANDIDATES.some((candidate) => candidate.constructId === pair.constructId && candidate.layer === pair.layer),
  ),
  completeConstructRegistry: BELIEF_CONSTRUCT_DEFINITIONS.length === BELIEF_CONSTRUCTS.length
    && BELIEF_CONSTRUCT_DEFINITIONS.every((definition) => definition.sourceRefs.length > 0),
  canonicalConfigurationsHaveSourceBackedStructure: canonicalConfigurations.every((configuration) =>
    configuration.evidencePosture === "source-backed-projection"
      && configuration.conceptualCommitments.length > 0
      && configuration.normativeCommitments.length > 0
      && configuration.descriptiveAssumptions.length > 0
      && configuration.institutionalImplications.length > 0
      && configuration.relationalConstraints.length === 5
      && configuration.sourceRefs.length > 0),
  researchedConfigurationRelationshipsAreTraceable: canonicalConfigurations.every((configuration) =>
    configuration.researchedRelationships.every((relationship) => relationship.statement.trim().length > 0
      && relationship.participants.length >= 2
      && relationship.sourceRefs.length > 0
      && relationship.sourceRefs.every((sourceRef) => configuration.sourceRefs.includes(sourceRef))
      && relationship.participants.every((participant) => participant.commitmentIds.length > 0
        && participant.commitmentIds.every((commitmentId) => configuration.commitments.some((commitment) => commitment.id === commitmentId))))),
  configurationConceptionRepresentationIsClassified: canonicalConfigurations.every((configuration) =>
    configuration.conceptions.every((conception) =>
      conception.representation === "explicit-research-conception" ? conception.facetId === undefined : conception.facetId !== undefined)),
  sourceBackedSyntheticProfileRoundTrip: syntheticProfiles.length === canonicalConfigurations.length
    && syntheticProfiles.every((profile) => profile.sourceRefs.length > 0 && profile.candidateFound && profile.evidenceQuestionCount > 0),
  directEvidenceIsolated: directResult.primary.profile.directEvidence.length === directEvidence.length
    && JSON.stringify(directResult.legacy.layers) === JSON.stringify(baseResult.legacy.layers)
    && JSON.stringify(directResult.legacy.combined) === JSON.stringify(baseResult.legacy.combined)
    && JSON.stringify(affinityTraceFor(directResult)) === JSON.stringify(affinityTraceFor(baseResult)),
  directPilotCoversProductionGaps,
  directEvidenceAttachedToStructure,
  relationalEvidenceIsolated: relationalResult.primary.profile.relationalEvidence.length === relationalEvidence.length
    && JSON.stringify(relationalResult.legacy.layers) === JSON.stringify(baseResult.legacy.layers)
    && JSON.stringify(relationalResult.legacy.combined) === JSON.stringify(baseResult.legacy.combined)
    && JSON.stringify(affinityTraceFor(relationalResult)) === JSON.stringify(affinityTraceFor(baseResult)),
  relationalEvidenceAttachedToConstruct,
  relationalEvidenceAttachedToStructure,
  relationalDimensionGraphIsComplete,
  gapEvidenceIsolated: gapResult.primary.profile.gapEvidence.length === gapEvidence.length
    && gapResult.primary.profile.evidenceValidationErrors.length === 0
    && JSON.stringify(gapResult.primary.morphology) === JSON.stringify(baseResult.primary.morphology)
    && JSON.stringify(gapResult.legacy.layers) === JSON.stringify(baseResult.legacy.layers)
    && JSON.stringify(gapResult.legacy.combined) === JSON.stringify(baseResult.legacy.combined),
  gapEvidenceAttachedToStructure,
  gapEvidenceRemainsQuarantined,
  sameValuesDifferentCausalBeliefsRemainDistinct: sameValuesDifferentCausalBeliefsEvidence.normativeSame
    && sameValuesDifferentCausalBeliefsEvidence.prescriptiveSame
    && sameValuesDifferentCausalBeliefsEvidence.firstDiagnosisSignal !== sameValuesDifferentCausalBeliefsEvidence.secondDiagnosisSignal,
  weakAndMixedProfilesFailClosed: noViewResult.primary.morphology.status === "insufficient-information"
    && noViewResult.primary.morphology.candidates.length === 0
    && noViewResult.primary.morphology.underDeterminedCandidates.length === 0
    && mixedResult.primary.morphology.status === "not-derived"
    && mixedResult.primary.morphology.candidates.length === 0
    && mixedResult.primary.morphology.underDeterminedCandidates.length > 0
    && mixedResult.primary.morphology.underDeterminedCandidates.every((candidate) => candidate.status === "under-determined"),
};

const structuralFailures = Object.entries(structuralChecks)
  .filter(([, passed]) => !passed)
  .map(([name]) => `structural completion check failed: ${name}`);
const openGates = openBeliefValidationGates();
const failures = [
  ...validationErrors,
  ...structuralFailures,
  ...openGates.map((gate) => `required completion gate remains ${gate.status}: ${gate.id}`),
];

const report = {
  generatedAt: new Date().toISOString(),
  objective: "responses -> beliefs and commitments -> integrated political-philosophical profile -> ideological morphology -> fixed ontology affinities",
  interpretation: "This audit is a fail-closed completion check. Structural PASS rows prove only repository contracts and deterministic fixtures. The goal remains incomplete while any required external-study gate is NOT RUN, NOT ESTIMABLE, INCONCLUSIVE, or FAIL.",
  completion: {
    structuralChecks,
    structuralEligible: Object.values(structuralChecks).every(Boolean) && validationErrors.length === 0,
    requiredGateCount: BELIEF_VALIDATION_GATES.filter((gate) => gate.requiredForCompletion).length,
    openRequiredGateIds: openGates.map((gate) => gate.id),
    eligible: failures.length === 0,
    status: failures.length === 0 ? "eligible" : "incomplete",
  },
  validationLedger: {
    gates: BELIEF_VALIDATION_GATES,
    openRequiredGates: openGates,
  },
  adversarial: {
    sameValuesDifferentCausalBeliefs: sameValuesDifferentCausalBeliefsEvidence,
  },
  coverage: {
    productionQuestions: DATASET.questions.length,
    auditedQuestions: audits.length,
    constructs: BELIEF_CONSTRUCT_DEFINITIONS.length,
    integratedStructureDimensions: baseResult.primary.profile.structure.length,
    unmeasuredStructureDimensions: baseResult.primary.profile.structure.filter((dimension) => dimension.evidencePosture === "unmeasured").map((dimension) => dimension.id),
    canonicalConfigurations: canonicalConfigurations.length,
    sourceBackedCanonicalConfigurations: canonicalConfigurations.filter((configuration) => configuration.evidencePosture === "source-backed-projection").length,
    explicitResearchConceptions: canonicalConfigurations.reduce((total, configuration) => total + configuration.conceptions.filter((conception) => conception.representation === "explicit-research-conception").length, 0),
    canonicalConfigurationsWithExplicitResearchConceptions: canonicalConfigurations.filter((configuration) => configuration.conceptions.some((conception) => conception.representation === "explicit-research-conception")).length,
    gapCandidates: BELIEF_GAP_CANDIDATES.length,
    gapPilotEvidence: gapEvidence.length,
    directPilotItems: BELIEF_DIRECT_ITEMS.length,
    productionUnmeasuredConstructIds,
    directPilotCoversProductionGaps,
    relationalFollowUps: BELIEF_RELATIONAL_FOLLOWUPS.length,
    contestedRouteVariantTargets: contestedRouteVariantProfiles.filter((profile) => profile !== undefined).length,
    contestedRouteVariants: contestedRouteVariants.length,
    mixedProfileUnderDeterminedDiagnostics: mixedResult.primary.morphology.underDeterminedCandidates.length,
    ideologyQuestionCoverage: {
      canonicalTargets: questionCoverage.canonicalTargetCount,
      failures: questionCoverage.failures,
      openGaps: questionCoverage.openGaps,
      structuralChecks: questionCoverage.structuralChecks,
    },
  },
  syntheticProfiles,
  validationErrors,
  failures,
};

const output = process.argv.includes("--summary")
  ? {
      generatedAt: report.generatedAt,
      completion: report.completion,
      requiredOpenGates: report.validationLedger.openRequiredGates.map((gate) => ({ id: gate.id, status: gate.status, scope: gate.scope })),
      coverage: report.coverage,
      validationErrorCount: report.validationErrors.length,
      failureCount: report.failures.length,
    }
  : report;

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (failures.length > 0) process.exitCode = 1;
