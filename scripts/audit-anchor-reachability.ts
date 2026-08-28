import { DATASET } from "../src/data";
import { calculateResults, scoringAnchorsFor, validateDataset } from "../src/scoring";

const answersTowardAnchor = (anchor: typeof DATASET.anchors[number]): Record<string, 2 | -2 | 0> =>
  Object.fromEntries(DATASET.questions.map((question) => {
    const alignment = Object.entries(question.effects).reduce((sum, [facetId, weight]) => sum + weight * (anchor.profiles[question.layer][facetId] ?? 0), 0);
    return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
  }));

const layers = ["descriptive", "normative", "prescriptive"] as const;
const validationErrors = validateDataset(DATASET);
const fullCompetitionDataset = {
  ...DATASET,
  policy: {
    ...DATASET.policy,
    maxNeighbors: scoringAnchorsFor(DATASET).length,
  },
};
const rows = scoringAnchorsFor(DATASET).map((anchor) => {
  const answers = answersTowardAnchor(anchor);
  const productionResult = calculateResults(answers);
  const fullCompetitionResult = calculateResults(answers, fullCompetitionDataset);
  const isolatedResult = calculateResults(answers, { ...DATASET, anchors: [anchor] });
  const neighborsFor = (result: ReturnType<typeof calculateResults>, layer: typeof layers[number]): readonly string[] =>
    result.layers[layer].kind === "covered"
      ? result.layers[layer].neighbors.map((neighbor) => neighbor.anchorId)
      : [];
  const layerNeighbors = Object.fromEntries(layers.map((layer) => [
    layer,
    neighborsFor(productionResult, layer),
  ]));
  const fullLayerRanks = Object.fromEntries(layers.map((layer) => [
    layer,
    (() => {
      const rank = neighborsFor(fullCompetitionResult, layer).indexOf(anchor.id);
      return rank < 0 ? null : rank + 1;
    })(),
  ]));
  const isolatedLayerReachable = Object.fromEntries(layers.map((layer) => [layer, neighborsFor(isolatedResult, layer).includes(anchor.id)]));
  const combinedNeighbors = productionResult.combined.kind === "covered"
    ? productionResult.combined.neighbors.map((neighbor) => neighbor.anchorId)
    : [];
  const fullCombinedNeighbors = fullCompetitionResult.combined.kind === "covered"
    ? fullCompetitionResult.combined.neighbors.map((neighbor) => neighbor.anchorId)
    : [];
  const fullCombinedIndex = fullCombinedNeighbors.indexOf(anchor.id);
  const fullCombinedRank = fullCombinedIndex < 0 ? null : fullCombinedIndex + 1;
  const missingLayers = layers.filter((layer) => !layerNeighbors[layer].includes(anchor.id));
  const combinedReachable = combinedNeighbors.includes(anchor.id);
  const isolatedMissingLayers = layers.filter((layer) => !isolatedLayerReachable[layer]);
  const targetQuestionCounts = Object.fromEntries(layers.map((layer) => [
    layer,
    DATASET.questions.filter((question) => question.layer === layer && question.targetNodeIds?.includes(anchor.ontologyNodeId)).length,
  ]));
  return {
    anchorId: anchor.id,
    targetQuestionCounts,
    isolatedLayerReachable,
    isolatedMissingLayers,
    layerNeighbors,
    combinedNeighbors,
    missingLayers,
    combinedReachable,
    fullCompetitionLayerRanks: fullLayerRanks,
    fullCompetitionCombinedRank: fullCombinedRank,
  };
});

const failures = rows.flatMap((row) => [
  ...row.isolatedMissingLayers.map((layer) => `${row.anchorId} is not reachable in isolated ${layer} scoring`),
  ...layers.filter((layer) => row.targetQuestionCounts[layer] !== 4).map((layer) => `${row.anchorId} has ${row.targetQuestionCounts[layer]} target questions in ${layer}, expected 4`),
]);

const topThreeLayerHits = rows.reduce((sum, row) => sum + layers.filter((layer) => row.layerNeighbors[layer].includes(row.anchorId)).length, 0);
const topThreeCombinedHits = rows.filter((row) => row.combinedReachable).length;
const fullLayerRanks = rows.flatMap((row) => layers.map((layer) => row.fullCompetitionLayerRanks[layer]).filter((rank): rank is number => rank !== null));
const fullCombinedRanks = rows.map((row) => row.fullCompetitionCombinedRank).filter((rank): rank is number => rank !== null);

const report = {
  generatedAt: new Date().toISOString(),
  fixture: "answer each item toward the production anchor profile",
  interpretation: "Structural reachability only. Isolated-anchor routing is the pass criterion; production top-three misses and full-competition ranks diagnose overlap. This is not respondent, cognitive, psychometric, or empirical validation.",
  productionAnchors: rows.length,
  productionTopThreeLayerHitRate: topThreeLayerHits / (rows.length * layers.length),
  productionTopThreeCombinedHitRate: topThreeCombinedHits / rows.length,
  fullCompetitionWorstLayerRank: Math.max(...fullLayerRanks),
  fullCompetitionWorstCombinedRank: Math.max(...fullCombinedRanks),
  validationErrors,
  failures,
  rows,
};

process.stdout.write(JSON.stringify(report, null, 2) + "\n");
if (validationErrors.length > 0 || failures.length > 0) process.exitCode = 1;
