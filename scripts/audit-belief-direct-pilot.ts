import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers, validateBeliefDirectEvidence, validateBeliefDirectItems, type BeliefDirectAnswerMap } from "../src/belief-direct-items";
import { BELIEF_CONSTRUCT_DEFINITIONS, validateBeliefModel } from "../src/beliefs";
import { DATASET } from "../src/data";
import { calculateResults } from "../src/scoring";
import type { AnswerMap } from "../src/types";

const firstRecordedAnswers = (): BeliefDirectAnswerMap => Object.fromEntries(
  BELIEF_DIRECT_ITEMS.map((item) => {
    const option = item.options.find((candidate) => candidate.record !== false);
    if (!option) throw new Error(`direct item ${item.id} has no recordable option`);
    return [item.id, option.id];
  }),
);

const countBy = (values: readonly string[]): Record<string, number> => values.reduce<Record<string, number>>((counts, value) => {
  counts[value] = (counts[value] ?? 0) + 1;
  return counts;
}, {});

const productionQuestionIds = new Set(DATASET.questions.map((question) => question.id));
const directAnswers = firstRecordedAnswers();
const directEvidence = directEvidenceForAnswers(directAnswers);
const allQuizAnswers: AnswerMap = Object.fromEntries(DATASET.questions.map((question) => [question.id, 2]));
const baseline = calculateResults(allQuizAnswers, DATASET);
const enriched = calculateResults(allQuizAnswers, DATASET, [], directEvidence);
const sameLegacyScoring = JSON.stringify(baseline.legacy.layers) === JSON.stringify(enriched.legacy.layers)
  && JSON.stringify(baseline.legacy.combined) === JSON.stringify(enriched.legacy.combined);
const sameAffinityBasis = JSON.stringify(baseline.primary.morphology.candidates.map((candidate) => ({
  anchorId: candidate.anchorId,
  fit: candidate.fit,
  basis: candidate.basis,
}))) === JSON.stringify(enriched.primary.morphology.candidates.map((candidate) => ({
  anchorId: candidate.anchorId,
  fit: candidate.fit,
  basis: candidate.basis,
})));
const directEvidenceLinkedToConstructs = directEvidence.every((evidence) =>
  evidence.constructIds.every((constructId) => enriched.primary.profile.constructs
    .find((construct) => construct.id === constructId)
    ?.directEvidenceIds.includes(evidence.id) ?? false),
);

const directItemErrors = validateBeliefDirectItems(DATASET);
const directEvidenceErrors = validateBeliefDirectEvidence(directEvidence, DATASET);
const validationErrors = [
  ...directItemErrors,
  ...directEvidenceErrors,
  ...validateBeliefModel(DATASET),
];
const directItemsInProduction = BELIEF_DIRECT_ITEMS
  .filter((item) => productionQuestionIds.has(item.id))
  .map((item) => item.id);
const allConstructIds = new Set(BELIEF_CONSTRUCT_DEFINITIONS.map((definition) => definition.id));
const uncoveredDirectConstructIds = [...allConstructIds].filter((constructId) =>
  !BELIEF_DIRECT_ITEMS.some((item) => item.constructIds.includes(constructId)),
);

const report = {
  generatedAt: new Date().toISOString(),
  dataset: {
    id: DATASET.manifest.datasetId,
    contentVersion: DATASET.manifest.contentVersion,
    productionQuestionCount: DATASET.questions.length,
  },
  pilot: {
    itemCount: BELIEF_DIRECT_ITEMS.length,
    itemIds: BELIEF_DIRECT_ITEMS.map((item) => item.id),
    itemCountsByLayer: countBy(BELIEF_DIRECT_ITEMS.map((item) => item.layer)),
    itemCountsByKind: countBy(BELIEF_DIRECT_ITEMS.map((item) => item.kind)),
    optionCounts: BELIEF_DIRECT_ITEMS.map((item) => ({
      itemId: item.id,
      total: item.options.length,
      recordable: item.options.filter((option) => option.record !== false).length,
      noView: item.options.filter((option) => option.record === false).length,
      questionDesignSourceRefs: item.sourceRefs,
      recordableOptionSourceRefs: item.options
        .filter((option) => option.record !== false)
        .map((option) => ({ optionId: option.id, sourceRefs: option.sourceRefs })),
      constructIds: item.constructIds,
    })),
    questionDesignSourceRefCount: new Set(BELIEF_DIRECT_ITEMS.flatMap((item) => item.sourceRefs)).size,
    recordableOptionSourceRefCount: new Set(BELIEF_DIRECT_ITEMS
      .flatMap((item) => item.options)
      .filter((option) => option.record !== false)
      .flatMap((option) => option.sourceRefs)).size,
    uncoveredConstructIds: uncoveredDirectConstructIds,
    directItemsInProduction,
  },
  syntheticEvidence: {
    selectedItemCount: directEvidence.length,
    selectedEvidenceIds: directEvidence.map((item) => item.id),
    validationErrors: directEvidenceErrors,
  },
  isolation: {
    sameLegacyScoring,
    sameAffinityBasis,
    directEvidenceVisibleInProfile: enriched.primary.profile.directEvidence.length === directEvidence.length,
    directEvidenceLinkedToConstructs,
    directBasisVisibleInMorphology: enriched.primary.morphology.candidates.every((candidate) => candidate.directBasis.length === directEvidence.length),
  },
  validationErrors,
  interpretation: "This is a structural audit of an effect-free, categorical direct-belief pilot. It is not cognitive, psychometric, invariance, population, or empirical validation, and the pilot is not production scoring.",
};

const failures = [
  ...validationErrors,
  ...(directEvidence.length !== BELIEF_DIRECT_ITEMS.length ? ["not every direct pilot item produced synthetic evidence"] : []),
  ...(directItemsInProduction.length > 0 ? [`direct pilot items overlap production questions: ${directItemsInProduction.join(", ")}`] : []),
  ...(!sameLegacyScoring ? ["direct pilot evidence changed legacy layer or combined scoring"] : []),
  ...(!sameAffinityBasis ? ["direct pilot evidence changed morphology affinity fit or basis"] : []),
  ...(!enriched.primary.profile.directEvidence.length ? ["direct pilot evidence was not retained in the belief profile"] : []),
  ...(!directEvidenceLinkedToConstructs ? ["direct pilot evidence was not linked back to every declared construct"] : []),
  ...(!enriched.primary.morphology.candidates.every((candidate) => candidate.directBasis.length === directEvidence.length)
    ? ["direct pilot evidence was not retained in morphology trace metadata"]
    : []),
];

const finalReport = { ...report, failures };
process.stdout.write(JSON.stringify(finalReport, null, 2) + "\n");
if (failures.length > 0) process.exitCode = 1;
