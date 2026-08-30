import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers, validateBeliefDirectEvidence, validateBeliefDirectItems } from "../src/belief-direct-items";
import { BELIEF_GAP_CANDIDATES, validateBeliefGapCandidates } from "../src/belief-gap-candidates";
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
import { calculateResults, scoringAnchorsFor, validateDataset } from "../src/scoring";
import type { Answer, AnswerMap, IdeologyConfiguration } from "../src/types";

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

const affinityTraceFor = (result: ReturnType<typeof calculateResults>) => result.beliefMorphology.candidates
  .map((candidate) => [candidate.anchorId, candidate.fit, candidate.coverage, candidate.basis] as const);

const constructSignalFor = (result: ReturnType<typeof calculateResults>, constructId: string): number | undefined =>
  result.beliefProfile.constructs.find((construct) => construct.id === constructId)?.signal;

const canonicalConfigurations = ideologyConfigurationsFor(DATASET).filter((configuration) => configuration.placement === "canonical");
const canonicalNodeIds = new Set(DATASET.ideologyNodes.filter((node) => node.placement === "canonical").map((node) => node.id));
const validationErrors = [
  ...validateDataset(DATASET),
  ...validateBeliefModel(DATASET),
  ...validateBeliefGapCandidates(DATASET),
  ...validateBeliefDirectItems(DATASET),
  ...validateBeliefValidationLedger(DATASET),
];
const audits = auditBeliefMeasurement(DATASET);
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
  normativeSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.layers.normative)
    === JSON.stringify(sameValuesDifferentCausalBeliefSecond.layers.normative),
  prescriptiveSame: JSON.stringify(sameValuesDifferentCausalBeliefFirst.layers.prescriptive)
    === JSON.stringify(sameValuesDifferentCausalBeliefSecond.layers.prescriptive),
  firstDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefFirst, "diagnosis-causal-account") ?? null,
  secondDiagnosisSignal: constructSignalFor(sameValuesDifferentCausalBeliefSecond, "diagnosis-causal-account") ?? null,
};
const directEvidence = directEvidenceForAnswers(firstDirectAnswers());
const relationalEvidence = relationalEvidenceForAnswers(firstRelationalAnswers());
const directResult = calculateResults(baseAnswers, DATASET, [], directEvidence);
const relationalResult = calculateResults(baseAnswers, DATASET, relationalEvidence);
const relationalEvidenceAttachedToConstruct = relationalEvidence.length === BELIEF_RELATIONAL_FOLLOWUPS.length
  && relationalEvidence.every((evidence) => evidence.constructIds.includes(RELATIONAL_CONSTRUCT_FOR_KIND[evidence.kind]))
  && relationalResult.beliefProfile.constructs.every((construct) => construct.relationalEvidenceIds.every((evidenceId) =>
    relationalResult.beliefProfile.relationalEvidence.some((evidence) => evidence.id === evidenceId && evidence.constructIds.includes(construct.id))));

const syntheticProfiles = canonicalConfigurations.map((configuration) => {
  const result = calculateResults(answersTowardConfiguration(configuration), DATASET);
  const candidate = result.beliefMorphology.candidates.find((item) => item.anchorId === configuration.targetId);
  return {
    id: `source-backed-configuration:${configuration.targetId}`,
    kind: "source-backed-configuration-projection" as const,
    expectedAnchorId: configuration.targetId,
    sourceRefs: configuration.sourceRefs,
    commitmentCount: configuration.commitments.length,
    commitmentLayers: [...new Set(configuration.commitments.map((commitment) => commitment.layer))].sort(),
    profileStatus: result.beliefProfile.status,
    morphologyStatus: result.beliefMorphology.status,
    candidateFound: candidate !== undefined,
    candidateStatus: candidate?.status ?? null,
    candidateCoverage: candidate?.coverage ?? null,
    candidateFit: candidate?.fit ?? null,
    evidenceQuestionCount: new Set(candidate?.basis.flatMap((basis) => basis.evidenceQuestionIds) ?? []).size,
  };
});

const structuralChecks = {
  responseToProfileToMorphologyTrace: baseResult.beliefProfile.observations.length > 0
    && baseResult.beliefProfile.constructs.length === BELIEF_CONSTRUCT_DEFINITIONS.length
    && baseResult.beliefMorphology.candidates.some((candidate) => candidate.basis.length > 0 && candidate.basis.some((basis) => basis.evidenceQuestionIds.length > 0)),
  fixedCanonicalOntologyProjection: canonicalConfigurations.length === scoringAnchorsFor(DATASET).length
    && canonicalConfigurations.every((configuration) => canonicalNodeIds.has(configuration.ontologyNodeId))
    && baseResult.beliefMorphology.candidates.every((candidate) => canonicalNodeIds.has(candidate.ontologyNodeId)),
  completeProductionItemAudit: audits.length === DATASET.questions.length
    && audits.every((audit) => audit.constructIds.length > 0 && audit.sourceRefs.length > 0),
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
  sourceBackedSyntheticProfileRoundTrip: syntheticProfiles.length === canonicalConfigurations.length
    && syntheticProfiles.every((profile) => profile.sourceRefs.length > 0 && profile.candidateFound && profile.evidenceQuestionCount > 0),
  directEvidenceIsolated: directResult.beliefProfile.directEvidence.length === directEvidence.length
    && JSON.stringify(directResult.layers) === JSON.stringify(baseResult.layers)
    && JSON.stringify(directResult.combined) === JSON.stringify(baseResult.combined)
    && JSON.stringify(affinityTraceFor(directResult)) === JSON.stringify(affinityTraceFor(baseResult)),
  relationalEvidenceIsolated: relationalResult.beliefProfile.relationalEvidence.length === relationalEvidence.length
    && JSON.stringify(relationalResult.layers) === JSON.stringify(baseResult.layers)
    && JSON.stringify(relationalResult.combined) === JSON.stringify(baseResult.combined)
    && JSON.stringify(affinityTraceFor(relationalResult)) === JSON.stringify(affinityTraceFor(baseResult)),
  relationalEvidenceAttachedToConstruct,
  sameValuesDifferentCausalBeliefsRemainDistinct: sameValuesDifferentCausalBeliefsEvidence.normativeSame
    && sameValuesDifferentCausalBeliefsEvidence.prescriptiveSame
    && sameValuesDifferentCausalBeliefsEvidence.firstDiagnosisSignal !== sameValuesDifferentCausalBeliefsEvidence.secondDiagnosisSignal,
  weakAndMixedProfilesFailClosed: noViewResult.beliefMorphology.status === "insufficient-information"
    && noViewResult.beliefMorphology.candidates.length === 0
    && mixedResult.beliefMorphology.status === "not-derived",
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
    canonicalConfigurations: canonicalConfigurations.length,
    sourceBackedCanonicalConfigurations: canonicalConfigurations.filter((configuration) => configuration.evidencePosture === "source-backed-projection").length,
    gapCandidates: BELIEF_GAP_CANDIDATES.length,
    directPilotItems: BELIEF_DIRECT_ITEMS.length,
    relationalFollowUps: BELIEF_RELATIONAL_FOLLOWUPS.length,
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
