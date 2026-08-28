import { DATASET, layerFacetMap } from "./data";
import { LAYERS, type Answer, type AnswerMap, type CalculationResult, type Dataset, type FacetSignal, type IdeologyPathNode, type InterpretiveNeighbor, type Layer, type LayerResult } from "./types";

const ANSWER_VALUES = new Set<Answer>([-2, -1, 0, 1, 2, "no-view"]);

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const isFiniteNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

const isAnswer = (value: unknown): value is Answer => ANSWER_VALUES.has(value as Answer);

const facetIdsForLayer = (dataset: Dataset, layer: Layer): Set<string> =>
  new Set(dataset.facets.filter((facet) => facet.layer === layer).map((facet) => facet.id));

/**
 * Contextual anchors stay available to the research workbench and ontology,
 * but only anchors attached to canonical nodes are production scoring inputs.
 */
export const scoringAnchorsFor = (dataset: Dataset = DATASET): readonly Dataset["anchors"][number][] => {
  const canonicalNodeIds = new Set(dataset.ideologyNodes.filter((node) => node.placement === "canonical").map((node) => node.id));
  return dataset.anchors.filter((anchor) => canonicalNodeIds.has(anchor.ontologyNodeId));
};

const ideologyPathFor = (nodeId: string, dataset: Dataset): readonly IdeologyPathNode[] => {
  const nodes = new Map(dataset.ideologyNodes.map((node) => [node.id, node]));
  const path: IdeologyPathNode[] = [];
  const seen = new Set<string>();
  let current = nodes.get(nodeId);

  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    path.push({ id: current.id, label: current.label, level: current.level });
    current = current.canonicalParentId ? nodes.get(current.canonicalParentId) : undefined;
  }

  return path.reverse();
};

/**
 * Checks the versioned content contract before it is used by the scorer.
 * A non-empty result is a hard data error, not a user-answer condition.
 */
export const validateDataset = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const questionIds = new Set<string>();
  const anchorIds = new Set<string>();
  const sourceIds = new Set(dataset.sources.map((source) => source.id));

  for (const source of dataset.sources) {
    if (!source.label.trim()) errors.push(`source ${source.id} is missing a label`);
    if (!source.citation.trim()) errors.push(`source ${source.id} is missing a citation`);
    if (!source.supports.trim()) errors.push(`source ${source.id} is missing a support boundary`);
  }

  if (dataset.manifest.questionCount !== dataset.questions.length) {
    errors.push(`manifest questionCount ${dataset.manifest.questionCount} does not match ${dataset.questions.length}`);
  }

  for (const layer of LAYERS) {
    const count = dataset.questions.filter((question) => question.layer === layer).length;
    if (count !== dataset.manifest.questionsPerLayer[layer]) {
      errors.push(`${layer} question count ${count} does not match ${dataset.manifest.questionsPerLayer[layer]}`);
    }
  }

  for (const question of dataset.questions) {
    if (questionIds.has(question.id)) errors.push(`duplicate question id ${question.id}`);
    questionIds.add(question.id);
    const allowedFacetIds = facetIdsForLayer(dataset, question.layer);
    for (const [facetId, weight] of Object.entries(question.effects)) {
      if (!allowedFacetIds.has(facetId)) errors.push(`question ${question.id} uses ${facetId} outside ${question.layer}`);
      if (!isFiniteNumber(weight)) errors.push(`question ${question.id} has non-finite weight for ${facetId}`);
    }
    for (const sourceRef of question.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`question ${question.id} references missing source ${sourceRef}`);
    }
    if (!question.sourceRefs.some((sourceRef) => dataset.sources.find((source) => source.id === sourceRef)?.role === "ideology-research")) {
      errors.push(`question ${question.id} has no ideology-research source reference`);
    }
  }

  for (const anchor of dataset.anchors) {
    if (anchorIds.has(anchor.id)) errors.push(`duplicate anchor id ${anchor.id}`);
    anchorIds.add(anchor.id);
    for (const layer of LAYERS) {
      const allowedFacetIds = facetIdsForLayer(dataset, layer);
      for (const facetId of allowedFacetIds) {
        const value = anchor.profiles[layer][facetId];
        if (!isFiniteNumber(value) || value < -1 || value > 1) {
          errors.push(`anchor ${anchor.id} has invalid ${layer}.${facetId}`);
        }
      }
    }
    for (const sourceRef of anchor.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`anchor ${anchor.id} references missing source ${sourceRef}`);
    }
    if (!anchor.sourceRefs.some((sourceRef) => dataset.sources.find((source) => source.id === sourceRef)?.role === "ideology-research")) {
      errors.push(`anchor ${anchor.id} has no ideology-research source reference`);
    }
  }

  const ideologyNodeIds = new Set<string>();
  const ideologyNodesById = new Map(dataset.ideologyNodes.map((node) => [node.id, node]));
  const ideologyRegistryIds = new Set<string>();
  const ideologyRegistryById = new Map(dataset.ideologyRegistry.map((entry) => [entry.id, entry]));
  const allIdeologyIds = new Set([...ideologyNodesById.keys(), ...ideologyRegistryById.keys()]);

  for (const entry of dataset.ideologyRegistry) {
    if (ideologyRegistryIds.has(entry.id)) errors.push(`duplicate ideology registry id ${entry.id}`);
    ideologyRegistryIds.add(entry.id);
    if (ideologyNodesById.has(entry.id)) errors.push(`ideology registry id ${entry.id} collides with ideology node id`);
    if (!entry.label.trim()) errors.push(`ideology registry entry ${entry.id} is missing a label`);
    for (const sourceRef of entry.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`ideology registry entry ${entry.id} references missing source ${sourceRef}`);
    }
    if (!entry.sourceRefs.some((sourceRef) => dataset.sources.find((source) => source.id === sourceRef)?.role === "ideology-research")) {
      errors.push(`ideology registry entry ${entry.id} has no ideology-research source reference`);
    }
    for (const relatedNode of entry.relations) {
      if (!allIdeologyIds.has(relatedNode.targetId)) errors.push(`ideology registry entry ${entry.id} references missing relation target ${relatedNode.targetId}`);
    }
  }

  for (const node of dataset.ideologyNodes) {
    if (ideologyNodeIds.has(node.id)) errors.push(`duplicate ideology node id ${node.id}`);
    ideologyNodeIds.add(node.id);
    if (!node.label.trim()) errors.push(`ideology node ${node.id} is missing a label`);
    if (node.placement !== "canonical" && node.canonicalParentId) errors.push(`ideology node ${node.id} has a canonical parent despite ${node.placement} placement`);
    if (node.canonicalParentId) {
      const parent = ideologyNodesById.get(node.canonicalParentId);
      if (!parent) errors.push(`ideology node ${node.id} references missing parent ${node.canonicalParentId}`);
      else if (parent.placement !== "canonical") errors.push(`ideology node ${node.id} references non-canonical parent ${node.canonicalParentId}`);
    }
    if (node.anchorId && !anchorIds.has(node.anchorId)) errors.push(`ideology node ${node.id} references missing anchor ${node.anchorId}`);
    const ancestry = new Set<string>([node.id]);
    let parentId = node.canonicalParentId;
    while (parentId) {
      if (ancestry.has(parentId)) {
        errors.push(`ideology node ${node.id} has a canonical-parent cycle`);
        break;
      }
      ancestry.add(parentId);
      parentId = ideologyNodesById.get(parentId)?.canonicalParentId;
    }
    for (const sourceRef of node.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`ideology node ${node.id} references missing source ${sourceRef}`);
    }
    if (!node.sourceRefs.some((sourceRef) => dataset.sources.find((source) => source.id === sourceRef)?.role === "ideology-research")) {
      errors.push(`ideology node ${node.id} has no ideology-research source reference`);
    }
    for (const relatedNode of node.relations) {
      if (!allIdeologyIds.has(relatedNode.targetId)) errors.push(`ideology node ${node.id} references missing relation target ${relatedNode.targetId}`);
    }
  }

  for (const question of dataset.questions) {
    for (const targetNodeId of question.targetNodeIds ?? []) {
      if (!ideologyNodeIds.has(targetNodeId)) errors.push(`question ${question.id} references missing target ideology node ${targetNodeId}`);
    }
  }

  for (const anchor of dataset.anchors) {
    const node = ideologyNodesById.get(anchor.ontologyNodeId);
    if (!node) errors.push(`anchor ${anchor.id} references missing ideology node ${anchor.ontologyNodeId}`);
    else if (node.anchorId !== anchor.id) errors.push(`anchor ${anchor.id} does not match ideology node ${anchor.ontologyNodeId}`);
  }

  for (const node of dataset.ideologyNodes.filter((candidate) => candidate.status === "scored")) {
    if (!node.anchorId) errors.push(`scored ideology node ${node.id} is missing an anchor reference`);
  }

  return errors;
};

const fitLabel = (fit: number, separation: "low" | "moderate" | "high", dataset: Dataset): string => {
  if (separation === "low") return "low separation";
  if (fit >= dataset.policy.fitBands.strong) return "strong internal fit";
  if (fit >= dataset.policy.fitBands.moderate) return "moderate internal fit";
  if (fit >= dataset.policy.fitBands.loose) return "loose internal fit";
  return "distant internal fit";
};

export const formatFit = (fit: number): string => `${Math.round(clamp(fit, 0, 1) * 100)}%`;

const calculateProfile = (answers: AnswerMap, questions: readonly Dataset["questions"][number][], layer: Layer): Readonly<{ profile: Readonly<Record<string, number>>; facetWeights: Readonly<Record<string, number>> }> => {
  const numerator = new Map<string, number>();
  const denominator = new Map<string, number>();

  for (const question of questions) {
    const answer = answers[question.id];
    if (!isAnswer(answer) || answer === "no-view") continue;
    for (const [facetId, weight] of Object.entries(question.effects)) {
      if (!Number.isFinite(weight) || weight === 0) continue;
      numerator.set(facetId, (numerator.get(facetId) ?? 0) + answer * weight);
      denominator.set(facetId, (denominator.get(facetId) ?? 0) + Math.abs(weight));
    }
  }

  const observed = Object.fromEntries(
    layerFacetMap[layer]
      .flatMap((facet) => {
        const divisor = denominator.get(facet.id) ?? 0;
        return divisor === 0 ? [] : [[facet.id, clamp((numerator.get(facet.id) ?? 0) / (divisor * 2), -1, 1)] as const];
      })
  );
  return { profile: observed, facetWeights: Object.fromEntries(Object.entries(observed).map(([facetId]) => [facetId, denominator.get(facetId) ?? 0])) };
};

const calculateSignals = (profile: Readonly<Record<string, number>>, layer: Layer, dataset: Dataset): readonly FacetSignal[] => {
  const facetLabel = new Map(dataset.facets.filter((facet) => facet.layer === layer).map((facet) => [facet.id, facet.label]));
  return Object.entries(profile)
    .filter(([, value]) => Math.abs(value) >= 0.05)
    .sort(([leftId, left], [rightId, right]) => Math.abs(right) - Math.abs(left) || leftId.localeCompare(rightId))
    .slice(0, dataset.policy.maxFacetSignalCount)
    .map(([facetId, value]) => ({
      facetId,
      label: facetLabel.get(facetId) ?? facetId,
      value,
      direction: value >= 0 ? "toward" : "away",
    }));
};

type AnchorCandidate = Readonly<{
  anchor: Dataset["anchors"][number];
  fit: number;
}>;

type CombinedAnchorCandidate = AnchorCandidate & Readonly<{
  layerFits: Readonly<Record<Layer, number>>;
}>;

const fitForDistance = (weightedSquaredDistance: number): number => clamp(1 - weightedSquaredDistance / 4, 0, 1);

const weightedSquaredDistanceFor = (
  profile: Readonly<Record<string, number>>,
  facetWeights: Readonly<Record<string, number>>,
  layer: Layer,
  anchor: Dataset["anchors"][number],
): number | undefined => {
  const observedFacetIds = Object.keys(profile);
  if (observedFacetIds.length === 0) return undefined;
  const totalWeight = observedFacetIds.reduce((sum, facetId) => sum + (facetWeights[facetId] ?? 1), 0);
  if (totalWeight <= 0) return undefined;

  return observedFacetIds.reduce(
    (sum, facetId) => {
      const difference = (profile[facetId] ?? 0) - (anchor.profiles[layer][facetId] ?? 0);
      return sum + (facetWeights[facetId] ?? 1) * difference * difference;
    },
    0,
  ) / totalWeight;
};

const anchorCandidatesFor = (
  profile: Readonly<Record<string, number>>,
  facetWeights: Readonly<Record<string, number>>,
  layer: Layer,
  dataset: Dataset,
): readonly AnchorCandidate[] => scoringAnchorsFor(dataset).flatMap((anchor) => {
  const distance = weightedSquaredDistanceFor(profile, facetWeights, layer, anchor);
  return distance === undefined ? [] : [{ anchor, fit: fitForDistance(distance) }];
});

const orderedAnchorCandidates = <T extends AnchorCandidate>(candidates: readonly T[], dataset: Dataset): readonly T[] => {
  const ordered = [...candidates].sort((left, right) => right.fit - left.fit || left.anchor.family.localeCompare(right.anchor.family) || left.anchor.id.localeCompare(right.anchor.id));
  const selected: T[] = [];
  const selectedIds = new Set<string>();
  const selectedFamilies = new Set<string>();
  for (const candidate of ordered) {
    if (selected.length >= dataset.policy.maxNeighbors) break;
    if (!selectedFamilies.has(candidate.anchor.family)) {
      selected.push(candidate);
      selectedIds.add(candidate.anchor.id);
      selectedFamilies.add(candidate.anchor.family);
    }
  }
  for (const candidate of ordered) {
    if (selected.length >= dataset.policy.maxNeighbors) break;
    if (!selectedIds.has(candidate.anchor.id)) {
      selected.push(candidate);
      selectedIds.add(candidate.anchor.id);
    }
  }
  return selected;
};

const separationFor = (candidates: readonly AnchorCandidate[], anchorId: string, fit: number, dataset: Dataset): { margin: number; separation: "low" | "moderate" | "high" } => {
  const margin = candidates
    .filter((candidate) => candidate.anchor.id !== anchorId)
    .reduce((smallest, candidate) => Math.min(smallest, Math.abs(candidate.fit - fit)), Number.POSITIVE_INFINITY);
  const safeMargin = Number.isFinite(margin) ? margin : 1;
  const separation = safeMargin <= dataset.policy.separationThreshold
    ? "low"
    : safeMargin <= dataset.policy.clearSeparationThreshold
      ? "moderate"
      : "high";
  return { margin: safeMargin, separation };
};

const interpretiveNeighborFor = (candidate: AnchorCandidate, candidates: readonly AnchorCandidate[], dataset: Dataset): InterpretiveNeighbor => {
  const { anchor, fit } = candidate;
  const ontologyNode = dataset.ideologyNodes.find((node) => node.id === anchor.ontologyNodeId);
  const { margin, separation } = separationFor(candidates, anchor.id, fit, dataset);
  return {
    anchorId: anchor.id,
    ontologyNodeId: anchor.ontologyNodeId,
    ontologyLevel: ontologyNode?.level ?? "meso",
    taxonomyPath: ideologyPathFor(anchor.ontologyNodeId, dataset),
    taxonomyRelations: ontologyNode?.relations ?? [],
    label: anchor.label,
    family: anchor.family,
    summary: anchor.summary,
    note: anchor.note,
    sourceRefs: anchor.sourceRefs,
    fit,
    fitLabel: fitLabel(fit, separation, dataset),
    tied: margin <= dataset.policy.tieTolerance,
    separation,
    margin,
  };
};

const calculateNeighbors = (profile: Readonly<Record<string, number>>, facetWeights: Readonly<Record<string, number>>, layer: Layer, dataset: Dataset): readonly InterpretiveNeighbor[] => {
  const candidates = anchorCandidatesFor(profile, facetWeights, layer, dataset);
  return orderedAnchorCandidates(candidates, dataset).map((candidate) => interpretiveNeighborFor(candidate, candidates, dataset));
};

const isCovered = (result: LayerResult): result is Extract<LayerResult, { kind: "covered" }> => result.kind === "covered";

const combinedResultFor = (layers: Readonly<Record<Layer, LayerResult>>, dataset: Dataset): CalculationResult["combined"] => {
  const coveredLayers = LAYERS.filter((layer) => isCovered(layers[layer]));
  if (coveredLayers.length !== LAYERS.length) {
    return { kind: "insufficient-information", coveredLayers, requiredLayers: LAYERS };
  }

  const candidates: readonly CombinedAnchorCandidate[] = scoringAnchorsFor(dataset).flatMap((anchor) => {
    const layerFits = {} as Record<Layer, number>;
    for (const layer of LAYERS) {
      const layerResult = layers[layer];
      if (!isCovered(layerResult)) return [];
      const distance = weightedSquaredDistanceFor(layerResult.profile, layerResult.facetWeights, layer, anchor);
      if (distance === undefined) return [];
      layerFits[layer] = fitForDistance(distance);
    }
    const fit = LAYERS.reduce((sum, layer) => sum + layerFits[layer], 0) / LAYERS.length;
    return [{ anchor, fit, layerFits }];
  });

  if (candidates.length === 0) {
    return { kind: "insufficient-information", coveredLayers, requiredLayers: LAYERS };
  }

  const selected = orderedAnchorCandidates(candidates, dataset);
  return {
    kind: "covered",
    coveredLayers: LAYERS,
    coverage: LAYERS.reduce((sum, layer) => sum + (isCovered(layers[layer]) ? layers[layer].coverage : 0), 0) / LAYERS.length,
    neighbors: selected.map((candidate) => ({
      ...interpretiveNeighborFor(candidate, candidates, dataset),
      layerFits: candidate.layerFits,
    })),
  };
};

const crossLayerPulls = (layers: Readonly<Record<Layer, LayerResult>>): readonly CalculationResult["pulls"][number][] => {
  const descriptive = layers.descriptive;
  const normative = layers.normative;
  const prescriptive = layers.prescriptive;
  if (!isCovered(normative) || !isCovered(prescriptive)) return [];

  const value = (layer: Extract<LayerResult, { kind: "covered" }>, facetId: string): number => layer.profile[facetId] ?? 0;
  const pulls: CalculationResult["pulls"][number][] = [];
  if (value(normative, "liberty") > 0.55 && value(prescriptive, "state-capacity") > 0.55) {
    pulls.push({ id: "autonomy-administration", title: "Autonomy meets administration", body: "Your values emphasize room for self-direction while your preferred practice puts weight on capable public implementation. The two can coexist, but their boundary is a live design question.", layers: ["normative", "prescriptive"] });
  }
  if (value(normative, "ecological-priority") > 0.55 && value(prescriptive, "market-allocation") > 0.55) {
    pulls.push({ id: "ecological-market", title: "Ecological ends, market means", body: "You place high value on ecological protection while also favoring market coordination in practice. That combination makes enforcement, pricing, and distribution choices especially important.", layers: ["normative", "prescriptive"] });
  }
  if (value(normative, "order-tradition") > 0.55 && value(prescriptive, "reformism") > 0.55) {
    pulls.push({ id: "continuity-change", title: "Continuity meets change", body: "You give moral weight to inherited order while preferring gradual institutional change. The practical question is which inheritances deserve continuity and which reforms can preserve trust.", layers: ["normative", "prescriptive"] });
  }
  if (isCovered(descriptive) && value(descriptive, "elite-autonomy") > 0.55 && value(prescriptive, "state-capacity") > 0.55) {
    pulls.push({ id: "diagnosis-implementation", title: "Diagnosis meets implementation", body: "You see organized elites as influential and also want institutions with enough capacity to act. Accountability design matters because implementation power can either constrain or reproduce that influence.", layers: ["descriptive", "prescriptive"] });
  }
  return pulls;
};

export const calculateResults = (answers: AnswerMap, dataset: Dataset = DATASET): CalculationResult => {
  const layers = {} as Record<Layer, LayerResult>;

  for (const layer of LAYERS) {
    const questions = dataset.questions.filter((question) => question.layer === layer);
    const answered = questions.filter((question) => {
      const answer = answers[question.id];
      return isAnswer(answer) && answer !== "no-view";
    }).length;
    const mixed = questions.filter((question) => answers[question.id] === 0).length;
    const coverage = questions.length === 0 ? 0 : answered / questions.length;
    if (coverage < dataset.policy.coverageThreshold) {
      layers[layer] = { kind: "insufficient-information", layer, answered, total: questions.length, coverage, mixed };
      continue;
    }

    const { profile, facetWeights } = calculateProfile(answers, questions, layer);
    layers[layer] = {
      kind: "covered",
      layer,
      answered,
      total: questions.length,
      coverage,
      mixed,
      profile,
      facetWeights,
      neighbors: calculateNeighbors(profile, facetWeights, layer, dataset),
      signals: calculateSignals(profile, layer, dataset),
    };
  }

  return {
    layers,
    combined: combinedResultFor(layers, dataset),
    pulls: crossLayerPulls(layers),
    datasetId: dataset.manifest.datasetId,
    contentVersion: dataset.manifest.contentVersion,
    scoringPolicyVersion: dataset.manifest.scoringPolicyVersion,
  };
};
