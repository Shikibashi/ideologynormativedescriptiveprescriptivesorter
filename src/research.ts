import { DATASET, layerFacetMap } from "./data";
import {
  RESEARCH_ANCHOR_PROFILES,
  RESEARCH_CANDIDATES,
  RESEARCH_COVERAGE_SUMMARIES,
  RESEARCH_FALSE_POSITIVE_AUDITS,
  RESEARCH_NEIGHBOR_DISCRIMINANTS,
  RESEARCH_PRIORITY_TARGET_IDS,
} from "./research-bank";
import {
  LAYERS,
  type Dataset,
  type IdeologyLevel,
  type IdeologyNode,
  type IdeologyPathNode,
  type IdeologyRelation,
  type IdeologyRelationType,
  type IdeologyRegistryEntry,
  type Layer,
  type ResearchAnchorProfile,
  type ResearchConfidence,
  type ResearchCoverageStatus,
  type ResearchExpectedDirection,
  type ResearchItemFunction,
  type ResearchQuestionCandidate,
  type ResearchPromotionReview,
  type ResearchPromotionReviewState,
  type ResearchResponseFormat,
  type ResearchTarget,
  type ResearchTargetKind,
  type ResearchTheoryContext,
} from "./types";

/**
 * A branch needs a small item block in every claim layer before it can be
 * treated as dedicated coverage. This is a research triage threshold, not a
 * psychometric calibration or a production scoring rule.
 */
export const RESEARCH_REQUIRED_ITEMS_PER_LAYER = 4;

export const researchCoverageLabels: Readonly<Record<ResearchCoverageStatus, string>> = {
  "dedicated-scored": "dedicated and scored",
  "partial-dedicated": "partially dedicated",
  "scored-indirect": "scored, but indirect",
  "contextual-only": "contextual, not scored",
  "catalog-only": "catalog only",
  "registry-only": "secondary context",
};

export const researchCoverageDescriptions: Readonly<Record<ResearchCoverageStatus, string>> = {
  "dedicated-scored": "A linked anchor and a complete four-item-per-layer branch block are present. Review is still required before this is treated as validated.",
  "partial-dedicated": "Some questions name this branch as a target, but the branch block is incomplete across the three claim layers.",
  "scored-indirect": "An editorial anchor exists, but the current bank only reaches it through shared constructs or broad questions.",
  "contextual-only": "A source-backed contextual anchor remains visible for interpretation and research, but its broad or bridge meaning is intentionally excluded from production neighbor scoring.",
  "catalog-only": "The ontology records this branch, but it has no production anchor and no dedicated respondent-facing item block.",
  "registry-only": "The audit keeps this entry as contextual, historical, or associated material rather than a production-scored node.",
};

export const researchItemFunctionOptions: readonly Readonly<{ value: ResearchItemFunction; label: string; description: string }>[] = [
  { value: "defining-indicator", label: "Defining indicator", description: "Tests a commitment that is central to the target when scholarship supports that strength." },
  { value: "characteristic-indicator", label: "Characteristic indicator", description: "Tests a recurring but non-exclusive commitment." },
  { value: "discriminant", label: "Neighbor discriminant", description: "Tests a distinction between the target and a confusable alternative." },
  { value: "boundary-indicator", label: "Boundary indicator", description: "Tests a plausible boundary without assuming every case shares it." },
  { value: "contradiction-check", label: "Contradiction check", description: "Checks for a commitment that would make the target interpretation unstable." },
  { value: "descriptive-mechanism", label: "Descriptive mechanism", description: "Tests how the target explains political, social, or economic outcomes." },
  { value: "prescriptive-route", label: "Prescriptive route", description: "Tests the institutional route implied by a commitment." },
];

export const researchTheoryContextOptions: readonly Readonly<{ value: ResearchTheoryContext; label: string }>[] = [
  { value: "ideal", label: "Ideal theory" },
  { value: "nonideal", label: "Nonideal / applied" },
  { value: "mixed", label: "Mixed or unspecified" },
];

export const researchExpectedDirectionOptions: readonly Readonly<{ value: ResearchExpectedDirection; label: string }>[] = [
  { value: "positive", label: "Expected positive" },
  { value: "negative", label: "Expected negative" },
  { value: "indeterminate", label: "Indeterminate" },
];

export const researchConfidenceOptions: readonly Readonly<{ value: ResearchConfidence; label: string }>[] = [
  { value: "high", label: "High" },
  { value: "moderate", label: "Moderate" },
  { value: "low", label: "Low / exploratory" },
];

export const researchResponseFormatOptions: readonly Readonly<{ value: ResearchResponseFormat; label: string }>[] = [
  { value: "five-point-directional", label: "Five-point directional + no view" },
];

export const promotionReviewStateLabels: Readonly<Record<ResearchPromotionReviewState, string>> = {
  pending: "not completed",
  passed: "passed",
  failed: "failed",
  "not-applicable": "recorded as not applicable",
  "not-run": "not completed",
};

const relationTypesThatCanHelpFindNeighbors = new Set<IdeologyRelationType>([
  "hybrid-of",
  "overlaps-with",
  "variant-of",
  "subvariant-of",
  "related-to",
  "hosted-by",
  "contextual-cluster-of",
  "manifestation-of",
  "contested-manifestation-of",
  "historically-related-to",
  "associated-with",
  "combined-with",
  "critical-of",
  "alternative-to",
]);

const unique = (values: readonly string[]): readonly string[] => [...new Set(values)];

const axisIdForFacet = (facetId: string): string => `facet:${facetId}`;

const facetIdsForLayer = (dataset: Dataset, layer: Layer): readonly string[] =>
  dataset.facets.filter((facet) => facet.layer === layer).map((facet) => facet.id);

const pathForNode = (nodeId: string, nodes: readonly IdeologyNode[]): readonly IdeologyPathNode[] => {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const path: IdeologyPathNode[] = [];
  const seen = new Set<string>();
  let current = byId.get(nodeId);

  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    path.push({ id: current.id, label: current.label, level: current.level });
    current = current.canonicalParentId ? byId.get(current.canonicalParentId) : undefined;
  }

  return path.reverse();
};

const allTargetLabels = (nodes: readonly IdeologyNode[], registry: readonly IdeologyRegistryEntry[]): Map<string, string> =>
  new Map([
    ...nodes.map((node) => [node.id, node.label] as const),
    ...registry.map((entry) => [entry.id, entry.label] as const),
  ]);

const targetRelations = (target: IdeologyNode | IdeologyRegistryEntry): readonly IdeologyRelation[] => target.relations;

const targetSources = (target: IdeologyNode | IdeologyRegistryEntry): readonly string[] => target.sourceRefs;

const targetAliases = (target: IdeologyNode | IdeologyRegistryEntry): readonly string[] => target.aliases;

const targetIsNode = (target: IdeologyNode | IdeologyRegistryEntry): target is IdeologyNode => "level" in target;

const directQuestionIdsForTarget = (targetId: string, dataset: Dataset): readonly string[] =>
  dataset.questions
    .filter((question) => question.targetNodeIds?.includes(targetId))
    .map((question) => question.id);

const relevantQuestionIdsForTarget = (targetId: string, sourceRefs: readonly string[], dataset: Dataset): readonly string[] =>
  dataset.questions
    .filter((question) => question.targetNodeIds?.includes(targetId) || question.sourceRefs.some((sourceRef) => sourceRefs.includes(sourceRef)))
    .map((question) => question.id);

const questionCountsForTarget = (questionIds: readonly string[], dataset: Dataset): Readonly<Record<Layer, number>> =>
  Object.fromEntries(LAYERS.map((layer) => [layer, questionIds.filter((questionId) => dataset.questions.find((question) => question.id === questionId)?.layer === layer).length])) as Record<Layer, number>;

const statusForTarget = (target: IdeologyNode | IdeologyRegistryEntry, counts: Readonly<Record<Layer, number>>, dedicatedCount: number): ResearchCoverageStatus => {
  if (!targetIsNode(target)) return "registry-only";
  if (target.placement === "contextual") return "contextual-only";
  if (target.status === "scored" && LAYERS.every((layer) => counts[layer] >= RESEARCH_REQUIRED_ITEMS_PER_LAYER)) return "dedicated-scored";
  if (target.status === "scored" && dedicatedCount > 0) return "partial-dedicated";
  if (target.status === "scored") return "scored-indirect";
  return "catalog-only";
};

const gapReasonsForTarget = (target: IdeologyNode | IdeologyRegistryEntry, status: ResearchCoverageStatus, counts: Readonly<Record<Layer, number>>): readonly string[] => {
  if (status === "registry-only") {
    return [
      "This entry is intentionally outside the canonical production hierarchy.",
      "It has no respondent-facing anchor and must remain contextual, historical, or associated until its status is separately reviewed.",
      "Any candidate item should preserve the distinction between a historical case, a philosophical framework, and a political ideology.",
    ];
  }
  if (status === "catalog-only") {
    return [
      "The ontology records the branch without a production anchor.",
      "No question explicitly targets this branch across the current bank.",
      "Shared facet responses cannot establish the branch's distinctive rationale or boundary against nearby traditions.",
    ];
  }
  if (status === "scored-indirect") {
    return [
      "An editorial anchor exists, but no current question explicitly targets this branch.",
      "The branch is reached through broad shared constructs rather than branch-specific reasons or mechanisms.",
      "A close result should remain an interpretive neighbor until dedicated items are reviewed.",
    ];
  }
  if (status === "contextual-only") {
    return [
      "A contextual anchor is retained for provenance and cross-family interpretation, but it is not a production-scored ideology branch.",
      "The label is broad or bridge-like, so a single proximity result would overstate taxonomic and measurement certainty.",
      "Use the dedicated canonical branches and their convergent mechanisms before interpreting a respondent-facing result.",
    ];
  }
  if (status === "partial-dedicated") {
    const countsText = LAYERS.map((layer) => `${layer} ${counts[layer]}/${RESEARCH_REQUIRED_ITEMS_PER_LAYER}`).join(", ");
    return [
      `The explicit item block is incomplete (${countsText}).`,
      "At least one claim layer still lacks enough branch-specific evidence for the research gate.",
      "Do not promote the branch or infer a stable anchor from the partial block.",
    ];
  }
  return [
    "The current block meets the local item-count gate, but it remains provisional until wording and response interpretation are reviewed.",
    "Neighbor separation, false positives, and cross-context interpretation still need evidence.",
  ];
};

const neighborIdsForTarget = (target: IdeologyNode | IdeologyRegistryEntry, nodes: readonly IdeologyNode[], registry: readonly IdeologyRegistryEntry[]): readonly string[] => {
  const ids = targetRelations(target)
    .filter((relation) => relationTypesThatCanHelpFindNeighbors.has(relation.type))
    .map((relation) => relation.targetId);

  if (targetIsNode(target) && target.canonicalParentId) {
    ids.push(...nodes.filter((node) => node.id !== target.id && node.canonicalParentId === target.canonicalParentId).map((node) => node.id));
  }

  const knownIds = new Set([...nodes.map((node) => node.id), ...registry.map((entry) => entry.id)]);
  return unique(ids.filter((id) => id !== target.id && knownIds.has(id)));
};

const constructIdsForQuestions = (questionIds: readonly string[], dataset: Dataset): readonly string[] =>
  unique(questionIds.flatMap((questionId) => Object.keys(dataset.questions.find((question) => question.id === questionId)?.effects ?? {})));

const buildTarget = (target: IdeologyNode | IdeologyRegistryEntry, dataset: Dataset, labels: Map<string, string>): ResearchTarget => {
  const sourceRefs = targetSources(target);
  const dedicatedQuestionIds = directQuestionIdsForTarget(target.id, dataset);
  const existingQuestionIds = relevantQuestionIdsForTarget(target.id, sourceRefs, dataset);
  const questionCounts = questionCountsForTarget(dedicatedQuestionIds, dataset);
  const measurementStatus = statusForTarget(target, questionCounts, dedicatedQuestionIds.length);
  const existingConstructIds = constructIdsForQuestions(existingQuestionIds, dataset);
  const neighbors = neighborIdsForTarget(target, dataset.ideologyNodes, dataset.ideologyRegistry);
  const node = targetIsNode(target) ? target : undefined;

  return {
    id: target.id,
    label: target.label,
    targetKind: node ? "ideology-node" : "registry-entry",
    level: node?.level,
    placement: node?.placement,
    registryKind: targetIsNode(target) ? undefined : target.kind,
    aliases: targetAliases(target),
    summary: target.summary,
    canonicalPath: node?.placement === "canonical" ? pathForNode(node.id, dataset.ideologyNodes) : [],
    anchorId: node?.anchorId,
    measurementStatus,
    dedicatedQuestionIds,
    questionCounts,
    existingQuestionIds,
    existingConstructIds,
    existingAxisIds: existingConstructIds.map(axisIdForFacet),
    neighborIds: neighbors,
    neighborLabels: neighbors.map((id) => labels.get(id) ?? id),
    gapReasons: gapReasonsForTarget(target, measurementStatus, questionCounts),
    sourceRefs,
    relations: targetRelations(target),
  };
};

const statusSortOrder: Readonly<Record<ResearchCoverageStatus, number>> = {
  "catalog-only": 0,
  "registry-only": 1,
  "contextual-only": 2,
  "scored-indirect": 3,
  "partial-dedicated": 4,
  "dedicated-scored": 5,
};

/** Derives the workbench inventory from the current ontology and registry. */
export const buildResearchTargets = (dataset: Dataset = DATASET): readonly ResearchTarget[] => {
  const labels = allTargetLabels(dataset.ideologyNodes, dataset.ideologyRegistry);
  return [
    ...dataset.ideologyNodes.map((node) => buildTarget(node, dataset, labels)),
    ...dataset.ideologyRegistry.map((entry) => buildTarget(entry, dataset, labels)),
  ].sort((left, right) => statusSortOrder[left.measurementStatus] - statusSortOrder[right.measurementStatus] || left.label.localeCompare(right.label));
};

export const researchTargetMap = (dataset: Dataset = DATASET): ReadonlyMap<string, ResearchTarget> =>
  new Map(buildResearchTargets(dataset).map((target) => [target.id, target]));

const firstFacetForLayer = (target: ResearchTarget, dataset: Dataset, layer: Layer) => {
  const layerFacetIds = new Set(facetIdsForLayer(dataset, layer));
  const preferredId = target.existingConstructIds.find((constructId) => layerFacetIds.has(constructId));
  return layerFacetMap[layer].find((facet) => facet.id === preferredId) ?? layerFacetMap[layer][0];
};

const domainForFacet = (facetId: string, layer: Layer, dataset: Dataset): string =>
  dataset.questions.find((question) => question.layer === layer && Object.hasOwn(question.effects, facetId))?.domain
    ?? dataset.questions.find((question) => question.layer === layer)?.domain
    ?? "Needs authoring";

const sourceIdsForTarget = (target: ResearchTarget, dataset: Dataset): readonly string[] =>
  target.sourceRefs.filter((sourceRef) => dataset.sources.find((source) => source.id === sourceRef)?.role === "ideology-research");

/** Creates a blank, fully attributed research candidate with no scoring effects. */
export const createResearchCandidate = (target: ResearchTarget, layer: Layer, dataset: Dataset = DATASET): ResearchQuestionCandidate => {
  const facet = firstFacetForLayer(target, dataset, layer);
  const itemFunction: ResearchItemFunction = layer === "descriptive" ? "descriptive-mechanism" : layer === "prescriptive" ? "prescriptive-route" : "discriminant";
  const sourceIds = sourceIdsForTarget(target, dataset);
  return {
    id: `research-${target.id}-${layer}`,
    targetId: target.id,
    targetLabel: target.label,
    layer,
    targetJustification: "",
    exactWording: "",
    domain: domainForFacet(facet.id, layer, dataset),
    constructId: facet.id,
    facetId: facet.id,
    axisId: axisIdForFacet(facet.id),
    theoryContext: "mixed",
    itemFunction,
    expectedDirection: "indeterminate",
    neighborsDifferentiated: target.neighborLabels,
    scholarlyRationale: `Begin with the source-backed description: ${target.summary}`,
    sourceIds,
    whyItemIsNeeded: target.gapReasons[0] ?? "The current dataset does not yet document why this item is needed.",
    sameAnswerDifferentReasonRisk: "A neighboring tradition may give the same surface answer for a different reason. Ask about the mechanism, principle, or institutional logic.",
    potentialAmbiguity: "Needs documented wording review for interpretation before promotion.",
    socialDesirabilityRisk: "Use neutral wording and make disagreement socially acceptable.",
    jurisdictionOrCulturalRisk: "Check whether the item changes meaning across political systems and cultural settings.",
    temporalStabilityRisk: "Prefer a durable principle over a current party, politician, controversy, or policy event.",
    recommendedResponseFormat: "five-point-directional",
    confidence: "low",
    reviewStatus: "research_candidate",
    promotionReview: {
      neighborDistinctness: "pending",
      neighborDistinctnessEvidence: "",
      crossCulturalJurisdictional: "pending",
      crossCulturalJurisdictionalEvidence: "",
      empiricalValidation: "not-run",
      empiricalValidationEvidence: "",
    },
  };
};

/** Structural checks for a candidate before it is placed in the local draft shelf. */
const validateResearchCandidateWithTargets = (
  candidate: ResearchQuestionCandidate,
  dataset: Dataset,
  targets: ReadonlyMap<string, ResearchTarget>,
): readonly string[] => {
  const errors: string[] = [];
  const target = targets.get(candidate.targetId);
  const facet = dataset.facets.find((item) => item.id === candidate.facetId);
  const sources = candidate.sourceIds.map((sourceId) => dataset.sources.find((source) => source.id === sourceId));

  if (!target) errors.push(`candidate ${candidate.id} references missing target ${candidate.targetId}`);
  if (!candidate.targetJustification.trim()) errors.push(`candidate ${candidate.id} is missing a substantive-distinctness justification`);
  if (!candidate.exactWording.trim()) errors.push(`candidate ${candidate.id} is missing exact wording`);
  if (!facet) errors.push(`candidate ${candidate.id} references missing facet ${candidate.facetId}`);
  else if (facet.layer !== candidate.layer) errors.push(`candidate ${candidate.id} uses ${facet.id} outside ${candidate.layer}`);
  if (candidate.axisId !== axisIdForFacet(candidate.facetId)) errors.push(`candidate ${candidate.id} axis ${candidate.axisId} does not match its local facet axis`);
  if (candidate.sourceIds.length === 0) errors.push(`candidate ${candidate.id} needs at least one source`);
  if (sources.some((source) => !source)) errors.push(`candidate ${candidate.id} references a missing source`);
  if (!sources.some((source) => source?.role === "ideology-research")) errors.push(`candidate ${candidate.id} needs an ideology-research source`);
  if (candidate.reviewStatus !== "research_candidate") errors.push(`candidate ${candidate.id} is not marked research_candidate`);
  if (target && candidate.targetLabel !== target.label) errors.push(`candidate ${candidate.id} target label does not match ${candidate.targetId}`);
  return errors;
};

export const validateResearchCandidate = (candidate: ResearchQuestionCandidate, dataset: Dataset = DATASET): readonly string[] =>
  validateResearchCandidateWithTargets(candidate, dataset, researchTargetMap(dataset));

/**
 * Future production-promotion gate. The current application has no promotion
 * path; any future path must call this after the structural candidate checks.
 */
export const validateResearchPromotion = (candidate: ResearchQuestionCandidate, dataset: Dataset = DATASET): readonly string[] => {
  const errors = [...validateResearchCandidate(candidate, dataset)];
  if (candidate.promotionReview.neighborDistinctness !== "passed") {
    errors.push(`candidate ${candidate.id} needs a passed neighbor-distinctness review before production promotion`);
  } else if (!candidate.promotionReview.neighborDistinctnessEvidence.trim()) {
    errors.push(`candidate ${candidate.id} needs neighbor-distinctness review evidence before production promotion`);
  }
  if (!["passed", "not-applicable"].includes(candidate.promotionReview.crossCulturalJurisdictional)) {
    errors.push(`candidate ${candidate.id} needs an applicable cross-cultural/jurisdictional review before production promotion`);
  } else if (!candidate.promotionReview.crossCulturalJurisdictionalEvidence.trim()) {
    errors.push(`candidate ${candidate.id} needs cross-cultural/jurisdictional review evidence or a not-applicable rationale before production promotion`);
  }
  if (candidate.promotionReview.empiricalValidation !== "passed") {
    errors.push(`candidate ${candidate.id} needs later empirical validation before production promotion`);
  } else if (!candidate.promotionReview.empiricalValidationEvidence.trim()) {
    errors.push(`candidate ${candidate.id} needs empirical-validation evidence before production promotion`);
  }
  return errors;
};

/** Non-blocking wording warnings for the authoring UI. */
export const researchCandidateWarnings = (candidate: ResearchQuestionCandidate, target: ResearchTarget | undefined): readonly string[] => {
  if (!target || !candidate.exactWording.trim()) return [];
  const normalizedWording = candidate.exactWording.toLocaleLowerCase();
  const targetLabels = [target.label, ...target.aliases].map((label) => label.toLocaleLowerCase()).filter((label) => label.length > 3);
  const warnings: string[] = [];
  if (targetLabels.some((label) => normalizedWording.includes(label))) warnings.push("The wording names the target or an alias; remove the label from respondent-facing text.");
  if (/\band\b|\bor\b/.test(normalizedWording)) warnings.push("The wording may contain more than one proposition; check it with the same-answer/different-reason test.");
  if (candidate.itemFunction === "discriminant" && candidate.neighborsDifferentiated.length === 0) warnings.push("This is marked as a discriminant but has no recorded neighbor alternative.");
  return warnings;
};

export {
  RESEARCH_ANCHOR_PROFILES as researchAnchorProfiles,
  RESEARCH_CANDIDATES as curatedResearchCandidates,
  RESEARCH_COVERAGE_SUMMARIES as researchCoverageSummaries,
  RESEARCH_FALSE_POSITIVE_AUDITS as researchFalsePositiveAudits,
  RESEARCH_NEIGHBOR_DISCRIMINANTS as researchNeighborDiscriminants,
  RESEARCH_PRIORITY_TARGET_IDS as researchPriorityTargetIds,
};

export const researchCandidatesForTarget = (targetId: string): readonly ResearchQuestionCandidate[] =>
  RESEARCH_CANDIDATES.filter((candidate) => candidate.targetId === targetId);

export const researchAnchorProfileForTarget = (targetId: string) =>
  RESEARCH_ANCHOR_PROFILES.find((profile) => profile.targetId === targetId);

export const validateCuratedResearchBank = (dataset: Dataset = DATASET): readonly string[] => {
  const targets = researchTargetMap(dataset);
  return RESEARCH_CANDIDATES.flatMap((candidate) => validateResearchCandidateWithTargets(candidate, dataset, targets));
};

/**
 * Validates the structured route alternatives attached to one qualitative
 * profile. Route dimensions are intentionally restricted to the prescriptive
 * layer and must include at least one determinate direction, while the
 * profile's base dimensions can remain indeterminate for a broad or contested
 * tradition.
 */
export const validateResearchAnchorRouteVariants = (
  profile: ResearchAnchorProfile,
  dataset: Dataset = DATASET,
): readonly string[] => {
  const errors: string[] = [];
  const knownSources = new Map(dataset.sources.map((source) => [source.id, source]));
  const knownFacets = new Map(dataset.facets.map((facet) => [facet.id, facet]));
  const profileSourceIds = new Set(profile.sourceIds);
  const routeIds = new Set<string>();

  for (const route of profile.routeVariants) {
    const prefix = `research profile ${profile.targetId} route variant ${route.id}`;
    if (routeIds.has(route.id)) errors.push(`research profile ${profile.targetId} has duplicate route variant ${route.id}`);
    routeIds.add(route.id);
    if (!route.id.trim()) errors.push(`research profile ${profile.targetId} has an empty route variant id`);
    if (!route.label.trim()) errors.push(`${prefix} is missing a label`);
    if (!route.statement.trim()) errors.push(`${prefix} is missing a statement`);
    if (route.evidencePosture !== "source-backed" && route.evidencePosture !== "source-backed-contested") {
      errors.push(`${prefix} has an invalid evidence posture`);
    }
    if (route.sourceIds.length === 0) errors.push(`${prefix} has no source`);
    if (new Set(route.sourceIds).size !== route.sourceIds.length) errors.push(`${prefix} has duplicate source evidence`);
    for (const sourceId of route.sourceIds) {
      const source = knownSources.get(sourceId);
      if (!source) errors.push(`${prefix} references missing source ${sourceId}`);
      else if (source.role !== "ideology-research") errors.push(`${prefix} source ${sourceId} is not ideology research`);
      if (!profileSourceIds.has(sourceId)) errors.push(`${prefix} cites a source not attached to profile ${profile.targetId}`);
    }

    if (route.dimensions.length === 0) errors.push(`${prefix} needs at least one prescriptive dimension`);
    const dimensionKeys = new Set<string>();
    let hasDeterminateDirection = false;
    for (const dimension of route.dimensions) {
      const dimensionKey = `${dimension.layer}:${dimension.facetId}`;
      if (dimensionKeys.has(dimensionKey)) errors.push(`${prefix} has duplicate dimension ${dimensionKey}`);
      dimensionKeys.add(dimensionKey);
      const facet = knownFacets.get(dimension.facetId);
      if (!facet) errors.push(`${prefix} references missing facet ${dimension.facetId}`);
      else if (facet.layer !== dimension.layer) errors.push(`${prefix} dimension ${dimension.facetId} is outside ${dimension.layer}`);
      if (dimension.layer !== "prescriptive") errors.push(`${prefix} dimension ${dimension.facetId} must be prescriptive`);
      if (dimension.expectedDirection !== "indeterminate") hasDeterminateDirection = true;
      if (dimension.sourceIds.length === 0) errors.push(`${prefix} dimension ${dimension.facetId} has no source`);
      for (const sourceId of dimension.sourceIds) {
        const source = knownSources.get(sourceId);
        if (!source) errors.push(`${prefix} dimension references missing source ${sourceId}`);
        else if (source.role !== "ideology-research") errors.push(`${prefix} dimension source ${sourceId} is not ideology research`);
        if (!route.sourceIds.includes(sourceId)) errors.push(`${prefix} dimension cites a source not attached to the route`);
      }
    }
    if (!hasDeterminateDirection) errors.push(`${prefix} needs at least one determinate route direction`);
  }

  return errors;
};

export const validateCuratedResearchMetadata = (dataset: Dataset = DATASET): readonly string[] => {
  const errors: string[] = [];
  const knownTargets = new Set([...dataset.ideologyNodes.map((node) => node.id), ...dataset.ideologyRegistry.map((entry) => entry.id)]);
  const knownSources = new Map(dataset.sources.map((source) => [source.id, source]));
  const knownFacets = new Map(dataset.facets.map((facet) => [facet.id, facet]));

  for (const profile of RESEARCH_ANCHOR_PROFILES) {
    if (!knownTargets.has(profile.targetId)) errors.push("research profile " + profile.targetId + " references a missing target");
    for (const sourceId of profile.sourceIds) {
      if (!knownSources.has(sourceId)) errors.push("research profile " + profile.targetId + " references missing source " + sourceId);
      else if (knownSources.get(sourceId)?.role !== "ideology-research") errors.push("research profile " + profile.targetId + " source " + sourceId + " is not ideology research");
    }
    for (const dimension of profile.dimensions) {
      const facet = knownFacets.get(dimension.facetId);
      if (!facet) errors.push("research profile " + profile.targetId + " references missing facet " + dimension.facetId);
      else if (facet.layer !== dimension.layer) errors.push("research profile " + profile.targetId + " dimension " + dimension.facetId + " is outside " + dimension.layer);
      for (const sourceId of dimension.sourceIds) {
        if (!knownSources.has(sourceId)) errors.push("research profile " + profile.targetId + " dimension references missing source " + sourceId);
      }
    }
    errors.push(...validateResearchAnchorRouteVariants(profile, dataset));
    const conceptionIds = new Set<string>();
    for (const conception of profile.conceptions) {
      if (conceptionIds.has(conception.conceptId)) errors.push("research profile " + profile.targetId + " has duplicate conception " + conception.conceptId);
      conceptionIds.add(conception.conceptId);
      if (!conception.conceptId.trim()) errors.push("research profile " + profile.targetId + " has an empty conception id");
      if (!conception.label.trim()) errors.push("research profile " + profile.targetId + " conception " + conception.conceptId + " is missing a label");
      if (!conception.interpretation.trim()) errors.push("research profile " + profile.targetId + " conception " + conception.conceptId + " is missing an interpretation");
      if (!conception.sourceIds.length) errors.push("research profile " + profile.targetId + " conception " + conception.conceptId + " has no source");
      for (const sourceId of conception.sourceIds) {
        if (!knownSources.has(sourceId)) errors.push("research profile " + profile.targetId + " conception references missing source " + sourceId);
        else if (knownSources.get(sourceId)?.role !== "ideology-research") errors.push("research profile " + profile.targetId + " conception source " + sourceId + " is not ideology research");
      }
    }
    for (const neighborId of profile.neighbors) {
      if (!knownTargets.has(neighborId)) errors.push("research profile " + profile.targetId + " references missing neighbor " + neighborId);
    }
  }

  for (const discriminant of RESEARCH_NEIGHBOR_DISCRIMINANTS) {
    if (!knownTargets.has(discriminant.targetId)) errors.push("research discriminant references missing target " + discriminant.targetId);
    if (!knownTargets.has(discriminant.neighborId)) errors.push("research discriminant " + discriminant.targetId + " references missing neighbor " + discriminant.neighborId);
    for (const itemId of discriminant.itemIds) {
      if (!RESEARCH_CANDIDATES.some((candidate) => candidate.id === itemId)) errors.push("research discriminant " + discriminant.targetId + " references missing candidate " + itemId);
    }
  }

  for (const audit of RESEARCH_FALSE_POSITIVE_AUDITS) {
    if (!knownTargets.has(audit.targetId)) errors.push("research false-positive audit references missing target " + audit.targetId);
    for (const itemId of audit.guardItemIds) {
      if (!RESEARCH_CANDIDATES.some((candidate) => candidate.id === itemId)) errors.push("research false-positive audit " + audit.targetId + " references missing candidate " + itemId);
    }
  }

  for (const summary of RESEARCH_COVERAGE_SUMMARIES) {
    if (!knownTargets.has(summary.targetId)) errors.push("research coverage summary references missing target " + summary.targetId);
    if (summary.newCandidateItems !== researchCandidatesForTarget(summary.targetId).length) {
      errors.push("research coverage summary " + summary.targetId + " item count does not match the curated bank");
    }
  }

  for (const targetId of RESEARCH_PRIORITY_TARGET_IDS) {
    const candidates = researchCandidatesForTarget(targetId);
    for (const layer of LAYERS) {
      if (candidates.filter((candidate) => candidate.layer === layer).length !== RESEARCH_REQUIRED_ITEMS_PER_LAYER) {
        errors.push("research target " + targetId + " does not have four curated candidates in " + layer);
      }
    }
  }

  return errors;
};
