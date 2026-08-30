import { DATASET } from "../src/data";
import { BELIEF_GAP_CANDIDATES } from "../src/belief-gap-candidates";
import {
  BELIEF_CONSTRUCT_DEFINITIONS,
  auditBeliefMeasurement,
  calculateBeliefProfile,
  validateBeliefModel,
} from "../src/beliefs";
import { scoringAnchorsFor } from "../src/scoring";
import type { AnswerMap } from "../src/types";

const audits = auditBeliefMeasurement(DATASET);
const answers: AnswerMap = Object.fromEntries(DATASET.questions.map((question) => [question.id, 2]));
const profile = calculateBeliefProfile(answers, DATASET);
const mixedAnswers: AnswerMap = Object.fromEntries(DATASET.questions.map((question) => [question.id, 0]));
const mixedProfile = calculateBeliefProfile(mixedAnswers, DATASET);
const mixedStateIsolation = {
  allMappedResponsesRemainMixed: mixedProfile.response.mixed === DATASET.questions.length,
  noFacetDirectionalSignals: mixedProfile.facets.every((facet) => facet.signal === undefined),
  noConstructDirectionalSignals: mixedProfile.constructs.every((construct) => construct.signal === undefined),
  noDirectionalFacetEvidenceIds: mixedProfile.facets.every((facet) => facet.directionalEvidenceQuestionIds.length === 0),
  noDirectionalConstructEvidenceIds: mixedProfile.constructs.every((construct) => construct.directionalEvidenceQuestionIds.length === 0),
  mixedQuestionIdsRetained: mixedProfile.facets.some((facet) => facet.mixedQuestionIds.length > 0)
    && mixedProfile.constructs.some((construct) => construct.mixedQuestionIds.length > 0),
  mixedConstructsRemainPartial: mixedProfile.constructs.filter((construct) => construct.response.mixed > 0).every((construct) => construct.status === "partial"),
};
const mixedStateIsolationPassed = Object.values(mixedStateIsolation).every(Boolean);
const countBy = (values: readonly string[]): Record<string, number> => values.reduce<Record<string, number>>((counts, value) => {
  counts[value] = (counts[value] ?? 0) + 1;
  return counts;
}, {});

const report = {
  generatedAt: new Date().toISOString(),
  dataset: {
    id: DATASET.manifest.datasetId,
    contentVersion: DATASET.manifest.contentVersion,
    questions: DATASET.questions.length,
    questionCountsByLayer: Object.fromEntries(["descriptive", "normative", "prescriptive"].map((layer) => [layer, DATASET.questions.filter((question) => question.layer === layer).length])),
    canonicalAnchors: scoringAnchorsFor(DATASET).length,
  },
  model: {
    constructCount: BELIEF_CONSTRUCT_DEFINITIONS.length,
    auditCount: audits.length,
    auditCoverageComplete: audits.length === DATASET.questions.length,
    measurementModes: countBy(audits.map((audit) => audit.measurementMode)),
    dispositions: profile.measurementSummary.dispositionCounts,
    flags: {
      branchMetadata: profile.measurementSummary.branchMetadataQuestionIds.length,
      ideologyCoded: profile.measurementSummary.ideologyCodedQuestionIds.length,
      compound: profile.measurementSummary.compoundQuestionIds.length,
      conditional: profile.measurementSummary.conditionalQuestionIds.length,
      duplicate: profile.measurementSummary.duplicateQuestionIds.length,
    },
    constructItemCounts: profile.measurementSummary.constructItemCounts,
    constructLayerItemCounts: profile.measurementSummary.constructLayerItemCounts,
    uncoveredConstructLayerPairs: profile.measurementSummary.uncoveredConstructLayerPairs,
    uncoveredConstructIds: profile.measurementSummary.uncoveredConstructIds,
    researchCandidateCoverage: profile.measurementSummary.researchCandidateCoverage,
    researchCandidateOnlyPairs: profile.measurementSummary.researchCandidateCoverage
      .filter((coverage) => coverage.status === "candidate-only")
      .map((coverage) => `${coverage.constructId}:${coverage.layer}`),
    unrepresentedConstructLayerPairs: profile.measurementSummary.researchCandidateCoverage
      .filter((coverage) => coverage.status === "unrepresented")
      .map((coverage) => `${coverage.constructId}:${coverage.layer}`),
    researchCandidateCounts: profile.measurementSummary.researchCandidateCounts,
    researchCandidateCount: BELIEF_GAP_CANDIDATES.length,
    researchCandidateResponseFormats: countBy(BELIEF_GAP_CANDIDATES.map((candidate) => candidate.responseFormat)),
    profileStatus: profile.status,
    responseStateSemantics: mixedStateIsolation,
  },
  itemAudits: audits,
  validationErrors: validateBeliefModel(DATASET),
  interpretation: "This is an item-audit and production-vs-research coverage report. Research-candidate presence does not establish measurement, and the report is not cognitive, psychometric, invariance, population, or empirical validation.",
};

const output = process.argv.includes("--summary")
  ? {
      generatedAt: report.generatedAt,
      dataset: report.dataset,
      model: report.model,
      itemAuditCount: report.itemAudits.length,
      validationErrorCount: report.validationErrors.length,
      interpretation: report.interpretation,
    }
  : report;

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (report.validationErrors.length > 0 || !report.model.auditCoverageComplete || !mixedStateIsolationPassed) process.exitCode = 1;
