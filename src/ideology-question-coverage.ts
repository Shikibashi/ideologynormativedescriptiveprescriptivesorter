import { DATASET } from "./data";
import { ideologyConfigurationsFor } from "./beliefs";
import { calculateResults, scoringAnchorsFor, validateDataset } from "./scoring";
import type {
  AnswerMap,
  BeliefCommitmentCentrality,
  BeliefCommitmentDirection,
  Dataset,
  IdeologyConfiguration,
  Layer,
  Question,
} from "./types";

const LAYERS = ["descriptive", "normative", "prescriptive"] as const satisfies readonly Layer[];

export type IdeologyQuestionAlignment = "aligned" | "opposed" | "mixed" | "unmapped";

export type IdeologyQuestionAlignmentRecord = Readonly<{
  questionId: string;
  layer: Layer;
  alignment: IdeologyQuestionAlignment;
  alignmentScore: number;
  supportWeight: number;
  oppositionWeight: number;
  matchedFacetIds: readonly string[];
  unmappedEffectFacetIds: readonly string[];
}>;

export type IdeologyQuestionLayerCoverage = Readonly<{
  layer: Layer;
  questionIds: readonly string[];
  questionCount: number;
  directionalCommitmentCount: number;
  directionalCommitmentFacetIds: readonly string[];
  coveredDirectionalFacetIds: readonly string[];
  uncoveredDirectionalFacetIds: readonly string[];
  uncoveredDefiningFacetIds: readonly string[];
  directionalItemCount: number;
  alignmentCounts: Readonly<Record<IdeologyQuestionAlignment, number>>;
  questionAlignments: readonly IdeologyQuestionAlignmentRecord[];
  status: "pass" | "gap" | "not-established";
}>;

export type IdeologyQuestionCoverageRow = Readonly<{
  targetId: string;
  label: string;
  ontologyNodeId: string;
  layers: Readonly<Record<Layer, IdeologyQuestionLayerCoverage>>;
  allLayersPass: boolean;
  targetCandidatePresent: boolean;
  targetCandidateStatus: "provisional-candidate" | "under-determined" | null;
  morphologyStatus: "provisional-candidates" | "insufficient-information" | "not-derived";
}>;

export type IdeologyQuestionCoverageReport = Readonly<{
  generatedAt: string;
  interpretation: string;
  canonicalTargetCount: number;
  rows: readonly IdeologyQuestionCoverageRow[];
  validationErrors: readonly string[];
  failures: readonly string[];
  openGaps: readonly string[];
  structuralChecks: Readonly<{
    allCanonicalTargetsHaveFourQuestionsPerLayer: boolean;
    allCanonicalLayersHaveSourceBackedTrace: boolean;
    allCanonicalTargetsReachPrimaryMorphology: boolean;
    allPrimaryMorphologyCandidatesAreProvisional: boolean;
  }>;
}>;

const centralityWeight = (centrality: BeliefCommitmentCentrality): number => {
  if (centrality === "defining") return 2;
  if (centrality === "characteristic") return 1;
  return 0.5;
};

const directionSign = (direction: BeliefCommitmentDirection): number => {
  if (direction === "positive") return 1;
  if (direction === "negative") return -1;
  return 0;
};

const directionalCommitmentWeightsFor = (
  configuration: IdeologyConfiguration,
  layer: Layer,
): ReadonlyMap<string, number> => {
  const weights = new Map<string, number>();
  for (const commitment of configuration.commitments) {
    if (commitment.layer !== layer || !commitment.facetId) continue;
    const direction = directionSign(commitment.expectedDirection);
    if (direction === 0) continue;
    weights.set(
      commitment.facetId,
      (weights.get(commitment.facetId) ?? 0) + direction * centralityWeight(commitment.centrality),
    );
  }
  return weights;
};

const alignmentForQuestion = (
  question: Question,
  commitmentWeights: ReadonlyMap<string, number>,
): IdeologyQuestionAlignmentRecord => {
  let supportWeight = 0;
  let oppositionWeight = 0;
  const matchedFacetIds: string[] = [];
  const unmappedEffectFacetIds: string[] = [];

  for (const [facetId, effect] of Object.entries(question.effects)) {
    const commitmentWeight = commitmentWeights.get(facetId);
    if (!commitmentWeight || !Number.isFinite(effect) || effect === 0) {
      unmappedEffectFacetIds.push(facetId);
      continue;
    }
    matchedFacetIds.push(facetId);
    const contribution = Math.sign(effect) * commitmentWeight * Math.abs(effect);
    if (contribution > 0) supportWeight += contribution;
    if (contribution < 0) oppositionWeight += Math.abs(contribution);
  }

  const alignmentScore = supportWeight - oppositionWeight;
  const alignment: IdeologyQuestionAlignment = supportWeight > 0 && oppositionWeight > 0
    ? "mixed"
    : supportWeight > 0
      ? "aligned"
      : oppositionWeight > 0
        ? "opposed"
        : "unmapped";

  return {
    questionId: question.id,
    layer: question.layer,
    alignment,
    alignmentScore,
    supportWeight,
    oppositionWeight,
    matchedFacetIds: [...new Set(matchedFacetIds)].sort(),
    unmappedEffectFacetIds: [...new Set(unmappedEffectFacetIds)].sort(),
  };
};

const emptyAlignmentCounts = (): Record<IdeologyQuestionAlignment, number> => ({
  aligned: 0,
  opposed: 0,
  mixed: 0,
  unmapped: 0,
});

const layerCoverageFor = (
  configuration: IdeologyConfiguration,
  layer: Layer,
  questions: readonly Question[],
): IdeologyQuestionLayerCoverage => {
  const layerQuestions = questions.filter((question) => question.layer === layer);
  const commitmentWeights = directionalCommitmentWeightsFor(configuration, layer);
  const directionalCommitments = configuration.commitments.filter((commitment) =>
    commitment.layer === layer
    && commitment.facetId
    && commitment.expectedDirection !== "indeterminate"
    && (directionSign(commitment.expectedDirection) !== 0)
  );
  const directionalCommitmentFacetIds = [...new Set(directionalCommitments
    .map((commitment) => commitment.facetId)
    .filter((facetId): facetId is string => facetId !== undefined))].sort();
  const questionAlignments = layerQuestions.map((question) => alignmentForQuestion(question, commitmentWeights));
  const coveredDirectionalFacetIds = directionalCommitmentFacetIds.filter((facetId) =>
    questionAlignments.some((alignment) => alignment.matchedFacetIds.includes(facetId))
  );
  const uncoveredDirectionalFacetIds = directionalCommitmentFacetIds.filter((facetId) => !coveredDirectionalFacetIds.includes(facetId));
  const uncoveredDefiningFacetIds = [...new Set(directionalCommitments
    .filter((commitment) => commitment.centrality === "defining" && commitment.facetId && uncoveredDirectionalFacetIds.includes(commitment.facetId))
    .map((commitment) => commitment.facetId as string))].sort();
  const alignmentCounts = emptyAlignmentCounts();
  for (const alignment of questionAlignments) alignmentCounts[alignment.alignment] += 1;

  return {
    layer,
    questionIds: layerQuestions.map((question) => question.id),
    questionCount: layerQuestions.length,
    directionalCommitmentCount: directionalCommitments.length,
    directionalCommitmentFacetIds,
    coveredDirectionalFacetIds,
    uncoveredDirectionalFacetIds,
    uncoveredDefiningFacetIds,
    directionalItemCount: questionAlignments.filter((alignment) => alignment.matchedFacetIds.length > 0).length,
    alignmentCounts,
    questionAlignments,
    // Four target items and at least one item mapped to a determinate
    // source-backed commitment are the local content-traceability gate. A
    // matched item may be opposed or mixed when it records a boundary or
    // contested route; this is not a respondent or validity threshold.
    status: layerQuestions.length !== 4
      ? "gap"
      : commitmentWeights.size === 0
        ? "not-established"
        : questionAlignments.some((alignment) => alignment.matchedFacetIds.length > 0)
          ? "pass"
          : "gap",
  };
};

/**
 * Builds a deterministic, non-respondent fixture that answers each question
 * in the direction of the configuration's source-backed facet commitments.
 * It is used only to exercise the existing profile-to-morphology seam.
 */
export const answersTowardConfiguration = (
  configuration: IdeologyConfiguration,
  dataset: Dataset = DATASET,
): AnswerMap => Object.fromEntries(dataset.questions.map((question) => {
  const commitmentWeights = directionalCommitmentWeightsFor(configuration, question.layer);
  const alignment = alignmentForQuestion(question, commitmentWeights).alignmentScore;
  return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
}));

const canonicalConfigurationsFor = (dataset: Dataset): readonly IdeologyConfiguration[] => {
  const canonicalAnchorIds = new Set(scoringAnchorsFor(dataset).map((anchor) => anchor.id));
  return ideologyConfigurationsFor(dataset).filter((configuration) => canonicalAnchorIds.has(configuration.targetId));
};

const rowFor = (configuration: IdeologyConfiguration, dataset: Dataset): IdeologyQuestionCoverageRow => {
  const targetQuestions = dataset.questions.filter((question) => question.targetNodeIds?.includes(configuration.ontologyNodeId));
  const layers = Object.fromEntries(LAYERS.map((layer) => [
    layer,
    layerCoverageFor(configuration, layer, targetQuestions),
  ])) as Record<Layer, IdeologyQuestionLayerCoverage>;
  const result = calculateResults(answersTowardConfiguration(configuration, dataset), dataset);
  const targetCandidate = result.primary.morphology.candidates.find((candidate) => candidate.anchorId === configuration.targetId);
  return {
    targetId: configuration.targetId,
    label: configuration.label,
    ontologyNodeId: configuration.ontologyNodeId,
    layers,
    allLayersPass: LAYERS.every((layer) => layers[layer].status === "pass"),
    targetCandidatePresent: targetCandidate !== undefined,
    targetCandidateStatus: targetCandidate?.status ?? null,
    morphologyStatus: result.primary.morphology.status,
  };
};

/**
 * Audits every canonical target without changing scoring, target metadata, or
 * public morphology behavior. The report makes detached target blocks and
 * missing end-to-end configuration paths visible as local failures.
 */
export const auditIdeologyQuestionCoverage = (dataset: Dataset = DATASET): IdeologyQuestionCoverageReport => {
  const rows = canonicalConfigurationsFor(dataset).map((configuration) => rowFor(configuration, dataset));
  const failures = rows.flatMap((row) => [
    ...LAYERS
      .filter((layer) => row.layers[layer].status === "gap")
      .map((layer) => `${row.targetId} ${layer} target block lacks four items or a mapped directional commitment`),
    ...(!row.targetCandidatePresent ? [`${row.targetId} does not reach a primary morphology candidate`] : []),
    ...(row.targetCandidateStatus !== null && row.targetCandidateStatus !== "provisional-candidate"
      ? [`${row.targetId} reaches a non-provisional primary morphology candidate`]
      : []),
  ]);
  const openGaps = rows.flatMap((row) => LAYERS.flatMap((layer) => {
    const coverage = row.layers[layer];
    if (coverage.status === "gap") {
      return [`${row.targetId} ${layer} target block has no question effect mapped to a determinate source-backed commitment`];
    }
    if (coverage.status === "not-established") {
      return [`${row.targetId} ${layer} has no determinate source-backed commitment direction; this layer remains contested or not established`];
    }
    return [];
  }));
  const structuralChecks = {
    allCanonicalTargetsHaveFourQuestionsPerLayer: rows.every((row) => LAYERS.every((layer) => row.layers[layer].questionCount === 4)),
    allCanonicalLayersHaveSourceBackedTrace: rows.every((row) => row.allLayersPass),
    allCanonicalTargetsReachPrimaryMorphology: rows.every((row) => row.targetCandidatePresent),
    allPrimaryMorphologyCandidatesAreProvisional: rows.every((row) => row.targetCandidateStatus === "provisional-candidate"),
  };
  return {
    generatedAt: new Date().toISOString(),
    interpretation: "Local structural content-traceability and synthetic configuration-path audit only. It does not establish respondent comprehension, reliability, validity, invariance, population consequences, or a political identity.",
    canonicalTargetCount: rows.length,
    rows,
    validationErrors: validateDataset(dataset),
    failures,
    openGaps,
    structuralChecks,
  };
};
