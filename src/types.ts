export const LAYERS = ["descriptive", "normative", "prescriptive"] as const;
export type Layer = (typeof LAYERS)[number];

export const LAYER_LABELS: Record<Layer, { short: string; long: string; question: string }> = {
  descriptive: { short: "Descriptive", long: "Diagnosis / what is true", question: "What do you think is happening?" },
  normative: { short: "Normative", long: "Values / what is good", question: "What do you think matters?" },
  prescriptive: { short: "Prescriptive", long: "Practice / what to do", question: "What would you choose?" },
};

export type DirectionalAnswer = -2 | -1 | 0 | 1 | 2;
export type Answer = DirectionalAnswer | "no-view";
export type AnswerMap = Partial<Record<string, Answer>>;

export type SourceType = "original" | "inspired_by" | "editorial";

export type SourceRole = "design-inspiration" | "ideology-research" | "survey-methodology" | "comparative-data";

export type SourceReference = Readonly<{
  id: string;
  label: string;
  url: string;
  retrievalDate: string;
  posture: "inspiration" | "reference" | "future-data";
  role: SourceRole;
  citation: string;
  supports: string;
}>;

export type IdeologyLevel = "macro" | "meso" | "micro";

export type IdeologyRelationType =
  | "hybrid-of"
  | "historically-derived-from"
  | "overlaps-with"
  | "movement-expression"
  | "analytical-framework"
  | "compatible-with"
  | "variant-of"
  | "subvariant-of"
  | "successor-of"
  | "subcurrent-of"
  | "historical-variant-of"
  | "historically-related-to"
  | "historically-influenced-by"
  | "historical-tradition-of"
  | "manifestation-of"
  | "contested-manifestation-of"
  | "contextual-cluster-of"
  | "related-to"
  | "hosted-by"
  | "combined-with"
  | "critical-of"
  | "alternative-to"
  | "associated-with"
  | "alias-of";

export type IdeologyNodePlacement = "canonical" | "contextual" | "associated" | "historical";

export type IdeologyRegistryKind = "contextual-formation" | "historical-variant" | "historical-manifestation" | "associated-tradition";

export type IdeologyRelation = Readonly<{
  type: IdeologyRelationType;
  targetId: string;
  note: string;
}>;

export type IdeologyNode = Readonly<{
  id: string;
  label: string;
  level: IdeologyLevel;
  summary: string;
  canonicalParentId?: string;
  anchorId?: string;
  status: "scored" | "catalog-only";
  placement: IdeologyNodePlacement;
  confidence: "high" | "moderate" | "provisional";
  aliases: readonly string[];
  sourceRefs: readonly string[];
  relations: readonly IdeologyRelation[];
}>;

export type IdeologyPathNode = Readonly<Pick<IdeologyNode, "id" | "label" | "level">>;

export type IdeologyRegistryEntry = Readonly<{
  id: string;
  label: string;
  kind: IdeologyRegistryKind;
  summary: string;
  aliases: readonly string[];
  sourceRefs: readonly string[];
  relations: readonly IdeologyRelation[];
}>;

export type Facet = Readonly<{
  id: string;
  layer: Layer;
  label: string;
  description: string;
}>;

export type Question = Readonly<{
  id: string;
  layer: Layer;
  domain: string;
  prompt: string;
  context?: string;
  effects: Readonly<Record<string, number>>;
  sourceType: SourceType;
  sourceRefs: readonly string[];
  /** Optional explicit branch coverage; absent means the item is broad/shared. */
  targetNodeIds?: readonly string[];
  version: number;
}>;

export type ResearchTargetKind = "ideology-node" | "registry-entry";

export type ResearchCoverageStatus =
  | "dedicated-scored"
  | "partial-dedicated"
  | "scored-indirect"
  | "contextual-only"
  | "catalog-only"
  | "registry-only";

export type ResearchItemFunction =
  | "defining-indicator"
  | "characteristic-indicator"
  | "discriminant"
  | "boundary-indicator"
  | "contradiction-check"
  | "descriptive-mechanism"
  | "prescriptive-route";

export type ResearchTheoryContext = "ideal" | "nonideal" | "mixed";

export type ResearchExpectedDirection = "positive" | "negative" | "indeterminate";

export type ResearchConfidence = "high" | "moderate" | "low";

export type ResearchReviewStatus = "research_candidate";

export type ResearchPromotionReviewState = "pending" | "passed" | "failed" | "not-applicable" | "not-run";

export type ResearchPromotionReview = Readonly<{
  neighborDistinctness: "pending" | "passed" | "failed";
  neighborDistinctnessEvidence: string;
  crossCulturalJurisdictional: "pending" | "passed" | "failed" | "not-applicable";
  crossCulturalJurisdictionalEvidence: string;
  empiricalValidation: "not-run" | "passed" | "failed";
  empiricalValidationEvidence: string;
}>;

export type ResearchResponseFormat = "five-point-directional";

export type ResearchTarget = Readonly<{
  id: string;
  label: string;
  targetKind: ResearchTargetKind;
  level?: IdeologyLevel;
  placement?: IdeologyNodePlacement;
  registryKind?: IdeologyRegistryKind;
  aliases: readonly string[];
  summary: string;
  canonicalPath: readonly IdeologyPathNode[];
  anchorId?: string;
  measurementStatus: ResearchCoverageStatus;
  dedicatedQuestionIds: readonly string[];
  questionCounts: Readonly<Record<Layer, number>>;
  existingQuestionIds: readonly string[];
  existingConstructIds: readonly string[];
  existingAxisIds: readonly string[];
  neighborIds: readonly string[];
  neighborLabels: readonly string[];
  gapReasons: readonly string[];
  sourceRefs: readonly string[];
  relations: readonly IdeologyRelation[];
}>;

export type ResearchQuestionCandidate = Readonly<{
  id: string;
  targetId: string;
  targetLabel: string;
  layer: Layer;
  targetJustification: string;
  exactWording: string;
  domain: string;
  constructId: string;
  facetId: string;
  axisId: string;
  theoryContext: ResearchTheoryContext;
  itemFunction: ResearchItemFunction;
  expectedDirection: ResearchExpectedDirection;
  neighborsDifferentiated: readonly string[];
  scholarlyRationale: string;
  sourceIds: readonly string[];
  whyItemIsNeeded: string;
  sameAnswerDifferentReasonRisk: string;
  potentialAmbiguity: string;
  socialDesirabilityRisk: string;
  jurisdictionOrCulturalRisk: string;
  temporalStabilityRisk: string;
  recommendedResponseFormat: ResearchResponseFormat;
  confidence: ResearchConfidence;
  reviewStatus: ResearchReviewStatus;
  promotionReview: ResearchPromotionReview;
}>;

export type ResearchQualitativeDirection =
  | "defining-positive"
  | "strong-positive"
  | "moderate-positive"
  | "characteristic-positive"
  | "indeterminate"
  | "moderate-negative"
  | "strong-negative"
  | "defining-negative";

export type ResearchAnchorCentrality = "defining" | "characteristic" | "contested";

export type ResearchAnchorDimension = Readonly<{
  facetId: string;
  layer: Layer;
  expectedDirection: ResearchQualitativeDirection;
  centrality: ResearchAnchorCentrality;
  rationale: string;
  sourceIds: readonly string[];
}>;

export type ResearchAnchorProfile = Readonly<{
  targetId: string;
  targetLabel: string;
  definition: string;
  boundary: string;
  variants: readonly string[];
  neighbors: readonly string[];
  dimensions: readonly ResearchAnchorDimension[];
  sourceIds: readonly string[];
  status: "research_candidate";
}>;

export type ResearchNeighborDiscriminant = Readonly<{
  targetId: string;
  neighborId: string;
  sharedCommitments: string;
  distinction: string;
  itemIds: readonly string[];
  remainingAmbiguity: string;
}>;

export type ResearchFalsePositiveAudit = Readonly<{
  targetId: string;
  profile: string;
  risk: string;
  guardItemIds: readonly string[];
  preferredOutcome: string;
}>;

export type ResearchCoverageSummary = Readonly<{
  targetId: string;
  currentStatus: ResearchCoverageStatus;
  newCandidateItems: number;
  layersCovered: readonly Layer[];
  definingCommitmentsCovered: readonly string[];
  remainingMeasurementGaps: readonly string[];
  sourceStrength: "high" | "moderate" | "mixed";
  contentReviewReadiness: "ready-for-expert-content-review" | "needs-source-or-boundary-review";
}>;

export type ResearchTaxonomyDisposition =
  | "promote-to-canonical"
  | "retain-canonical"
  | "demote-to-contextual"
  | "demote-to-associated"
  | "retain-contextual"
  | "retain-registry-only"
  | "hold-catalog-only";

export type ResearchTaxonomyEvidenceStatus = "source-backed" | "source-backed-contested" | "insufficient-source-boundary";

export type ResearchTaxonomyDecision = Readonly<{
  id: string;
  targetId: string;
  disposition: ResearchTaxonomyDisposition;
  evidenceStatus: ResearchTaxonomyEvidenceStatus;
  sourceIds: readonly string[];
  rationale: string;
  boundary: string;
  competingInterpretations: readonly string[];
  resultingPlacement: IdeologyNodePlacement | "registry-only";
  resultingScoringStatus: "not-scored" | "catalog-only" | "scored-provisional";
  decidedAt: string;
  reviewStatus: "research_decision";
}>;

export type IdeologyAnchor = Readonly<{
  id: string;
  label: string;
  family: string;
  ontologyNodeId: string;
  summary: string;
  profiles: Readonly<Record<Layer, Readonly<Record<string, number>>>>;
  sourceType: SourceType;
  sourceRefs: readonly string[];
  note: string;
  version: number;
}>;

export type ScoringPolicy = Readonly<{
  version: number;
  coverageThreshold: number;
  maxNeighbors: number;
  maxFacetSignalCount: number;
  tieTolerance: number;
  separationThreshold: number;
  clearSeparationThreshold: number;
  fitBands: Readonly<{ strong: number; moderate: number; loose: number }>;
}>;

export type DatasetManifest = Readonly<{
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
  questionCount: number;
  questionsPerLayer: Readonly<Record<Layer, number>>;
  supportedShareVersions: readonly number[];
}>;

export type Dataset = Readonly<{
  manifest: DatasetManifest;
  policy: ScoringPolicy;
  facets: readonly Facet[];
  questions: readonly Question[];
  anchors: readonly IdeologyAnchor[];
  ideologyNodes: readonly IdeologyNode[];
  ideologyRegistry: readonly IdeologyRegistryEntry[];
  sources: readonly SourceReference[];
}>;

export type InterpretiveNeighbor = Readonly<{
  anchorId: string;
  ontologyNodeId: string;
  ontologyLevel: IdeologyLevel;
  taxonomyPath: readonly IdeologyPathNode[];
  taxonomyRelations: readonly IdeologyRelation[];
  label: string;
  family: string;
  summary: string;
  note: string;
  sourceRefs: readonly string[];
  fit: number;
  fitLabel: string;
  tied: boolean;
  separation: "low" | "moderate" | "high";
  margin: number;
}>;

export type FacetSignal = Readonly<{
  facetId: string;
  label: string;
  value: number;
  direction: "toward" | "away";
}>;

export type LayerResult =
  | Readonly<{
      kind: "insufficient-information";
      layer: Layer;
      answered: number;
      total: number;
      coverage: number;
      mixed: number;
    }>
  | Readonly<{
      kind: "covered";
      layer: Layer;
      answered: number;
      total: number;
      coverage: number;
      mixed: number;
      profile: Readonly<Record<string, number>>;
      facetWeights: Readonly<Record<string, number>>;
      neighbors: readonly InterpretiveNeighbor[];
      signals: readonly FacetSignal[];
    }>;

export type CombinedNeighbor = Readonly<InterpretiveNeighbor & {
  layerFits: Readonly<Record<Layer, number>>;
}>;

export type CombinedResult =
  | Readonly<{
      kind: "insufficient-information";
      coveredLayers: readonly Layer[];
      requiredLayers: readonly Layer[];
    }>
  | Readonly<{
      kind: "covered";
      coveredLayers: readonly Layer[];
      coverage: number;
      neighbors: readonly CombinedNeighbor[];
    }>;

export type CrossLayerPull = Readonly<{
  id: string;
  title: string;
  body: string;
  layers: readonly [Layer, Layer];
}>;

export type CalculationResult = Readonly<{
  layers: Readonly<Record<Layer, LayerResult>>;
  combined: CombinedResult;
  pulls: readonly CrossLayerPull[];
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
}>;

export type ShareEnvelopeV1 = Readonly<{
  schema: "ideology-layer-sorter/share";
  envelopeVersion: 1;
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
  answers: readonly Readonly<{ questionId: string; value: Answer }>[];
}>;

export type CompactShareAnswer = readonly [questionIndex: number, value: -2 | -1 | 0 | 1 | 2 | 3];

export type ShareEnvelopeV2 = Readonly<{
  schema: "ideology-layer-sorter/share";
  envelopeVersion: 2;
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
  answers: readonly CompactShareAnswer[];
}>;

export type ShareEnvelope = ShareEnvelopeV1 | ShareEnvelopeV2;
