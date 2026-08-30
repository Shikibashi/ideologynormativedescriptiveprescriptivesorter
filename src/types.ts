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
  /** Optional direct construct declaration for a future reviewed gap item. */
  beliefConstructIds?: readonly BeliefConstructId[];
  /** Direct items must declare their construct explicitly; legacy items default to facet proxies. */
  beliefMeasurementMode?: BeliefMeasurementMode;
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

/**
 * A source-backed alternative institutional route for an anchor profile.
 * Route variants preserve branch-level prescriptive plurality without
 * rewriting an indeterminate base dimension into a universal commitment.
 * They are qualitative research context only and never enter scoring.
 */
export type ResearchAnchorRouteVariant = Readonly<{
  id: string;
  label: string;
  statement: string;
  dimensions: readonly ResearchAnchorDimension[];
  evidencePosture: "source-backed" | "source-backed-contested";
  sourceIds: readonly string[];
}>;

export type ResearchAnchorConception = Readonly<{
  conceptId: string;
  layer: Exclude<Layer, "descriptive">;
  label: string;
  interpretation: string;
  centrality: ResearchAnchorCentrality;
  sourceIds: readonly string[];
}>;

export type ResearchAnchorRelationKind = "priority" | "conditionality" | "conflict-resolution" | "epistemic" | "contestation";

export type ResearchAnchorRelationParticipant = Readonly<{
  kind: "facet" | "concept";
  id: string;
}>;

/**
 * A source-backed relationship hypothesis about an ideological configuration.
 * It is theoretical configuration evidence, not a respondent observation and
 * never enters scalar affinity calculation.
 */
export type ResearchAnchorRelation = Readonly<{
  id: string;
  kind: ResearchAnchorRelationKind;
  statement: string;
  participants: readonly ResearchAnchorRelationParticipant[];
  evidencePosture: "source-backed" | "source-backed-contested";
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
  routeVariants: readonly ResearchAnchorRouteVariant[];
  conceptions: readonly ResearchAnchorConception[];
  relationships: readonly ResearchAnchorRelation[];
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

export const BELIEF_CONSTRUCTS = [
  "concept-conception",
  "social-order-moral-scope",
  "diagnosis-causal-account",
  "legitimacy-authority",
  "distributive-principle",
  "institutional-mechanism",
  "political-economy",
  "change-strategy",
  "priority-conflict",
  "epistemic-stance",
  "heterodoxy-contestation",
] as const;

export type BeliefConstructId = (typeof BELIEF_CONSTRUCTS)[number];

export type BeliefMeasurementStatus = "observed" | "partial" | "not-yet-measured";

export type BeliefMeasurementMode = "facet-proxy" | "direct-item";

export type BeliefObservationState = "directional" | "mixed" | "no-view" | "unanswered";

export type BeliefRelationalEvidenceKind = "priority" | "conditional" | "conflict-resolution" | "uncertainty" | "contradiction" | "contestation";

export type BeliefDirectEvidenceKind = "conception" | "moral-scope" | "causal-account" | "legitimacy-basis" | "distributive-reason" | "institutional-route" | "political-economy" | "change-path";

export type BeliefConfidenceLevel = "low" | "moderate" | "high" | "not-stated";

export type BeliefItemDisposition = "preserve" | "remap" | "rewrite" | "split" | "redundant" | "construct-gap";

export type BeliefMeasurementAuditFlag = "branch-target-metadata" | "ideology-coded-wording" | "compound-wording" | "conditional-wording" | "cross-construct" | "duplicate-wording";

export type BeliefCandidateResponseFormat =
  | "five-point-directional"
  | "paired-priority-choice"
  | "conditional-vignette"
  | "confidence-rating"
  | "open-reason";

export type BeliefConstructDefinition = Readonly<{
  id: BeliefConstructId;
  label: string;
  description: string;
  layers: readonly Layer[];
  sourceRefs: readonly string[];
  measurementStatus: BeliefMeasurementStatus;
  measurementNote: string;
}>;

export type BeliefResponseSummary = Readonly<{
  total: number;
  directional: number;
  mixed: number;
  noView: number;
  unanswered: number;
}>;

/**
 * A compact, non-scoring view of the substantive dimensions in the primary
 * belief profile. The posture describes the kind of evidence available for a
 * respondent's profile; it is not a validity or reliability result.
 */
export type BeliefStructureDimensionId =
  | "values-and-moral-scope"
  | "concepts-and-conceptions"
  | "descriptive-causal-beliefs"
  | "legitimacy-and-authority"
  | "distributive-principles"
  | "institutional-commitments"
  | "political-economy"
  | "political-change"
  | "priorities-and-conflicts"
  | "epistemic-stance"
  | "heterodoxy-and-contestation";

export type BeliefStructureEvidencePosture =
  | "unmeasured"
  | "facet-proxy"
  | "direct-item"
  | "categorical-pilot"
  | "candidate-pilot"
  | "explicit-relational"
  | "mixed-provisional";

export type BeliefStructureDimension = Readonly<{
  id: BeliefStructureDimensionId;
  label: string;
  description: string;
  constructIds: readonly BeliefConstructId[];
  evidencePosture: BeliefStructureEvidencePosture;
  /** Answered directional or mixed observations, not unanswered records. */
  observedObservationCount: number;
  directionalObservationCount: number;
  /** Observed item-level records grouped by descriptive/normative/prescriptive claim layer. */
  observedObservationCountsByLayer: Readonly<Record<Layer, number>>;
  /** Directional subset of the claim-layer counts above. */
  directionalObservationCountsByLayer: Readonly<Record<Layer, number>>;
  /**
   * Primary directional signal from the linked construct when this dimension
   * has one construct; this is provisional profile evidence, not a validated
   * latent-trait score.
   */
  observedSignal?: number;
  /** Directional question records supporting the primary construct signal. */
  observedSignalEvidenceQuestionIds: readonly string[];
  mixedObservationCount: number;
  facetProxyObservationCount: number;
  directItemObservationCount: number;
  directEvidenceIds: readonly string[];
  directEvidenceKinds: readonly BeliefDirectEvidenceKind[];
  /** Selected research-candidate responses; they remain quarantined and non-scoring. */
  gapEvidenceIds: readonly string[];
  gapResponseFormats: readonly BeliefCandidateResponseFormat[];
  relationalEvidenceIds: readonly string[];
  relationalEvidenceKinds: readonly BeliefRelationalEvidenceKind[];
  /** Other profile dimensions connected by this dimension's explicit relational records. */
  relatedDimensionIds: readonly BeliefStructureDimensionId[];
  evidenceQuestionIds: readonly string[];
  /** Explains what the current evidence does and does not establish. */
  gap: string;
  sourceRefs: readonly string[];
}>;

/**
 * Internal debugging layers for locating where an interpretation stops being
 * supported. These are not respondent traits or validity claims.
 */
export type BeliefDiagnosticLayer =
  | "question"
  | "construct"
  | "conception"
  | "relationship"
  | "weighting"
  | "causal-belief"
  | "priority-conflict-rule"
  | "institutional-inference"
  | "ideological-mapping";

export type BeliefDiagnosticStatus = "coverage-gap" | "unmeasured" | "validation-gap" | "validation-error";

export type BeliefDiagnostic = Readonly<{
  id: string;
  layer: BeliefDiagnosticLayer;
  status: BeliefDiagnosticStatus;
  title: string;
  detail: string;
  constructIds: readonly BeliefConstructId[];
  evidenceQuestionIds: readonly string[];
  sourceRefs: readonly string[];
}>;

/**
 * Evidence status for the objective-level validation ledger. A PASS status is
 * scoped to the evidence kind declared by the gate; local structural PASS is
 * never a substitute for an external respondent or study result.
 */
export type BeliefValidationGateStatus = "PASS" | "FAIL" | "NOT RUN" | "NOT ESTIMABLE" | "INCONCLUSIVE";

export type BeliefValidationGateScope = "local-structural" | "external-study";

export type BeliefValidationGate = Readonly<{
  id: string;
  label: string;
  status: BeliefValidationGateStatus;
  scope: BeliefValidationGateScope;
  requiredForCompletion: boolean;
  boundary: string;
  sourceRefs: readonly string[];
}>;

/**
 * A facet-level observation retained inside the richer profile. Facets are
 * still editorial proxies, but retaining them prevents two different
 * conceptions or mechanisms from being collapsed into one construct scalar
 * before the morphology pass can compare them.
 */
export type BeliefFacetResult = Readonly<{
  facetId: string;
  layer: Layer;
  label: string;
  constructIds: readonly BeliefConstructId[];
  response: BeliefResponseSummary;
  coverage: number;
  /** Share of all mapped items that produced directional evidence. */
  directionalCoverage: number;
  /** Share of all mapped items explicitly marked mixed/ambivalent. */
  mixedRate: number;
  measurementMode: BeliefMeasurementMode;
  signal?: number;
  /** All mapped answered items, including mixed responses, but not no-view or unanswered items. */
  evidenceQuestionIds: readonly string[];
  /** Only items that support a directional construct signal. */
  directionalEvidenceQuestionIds: readonly string[];
  /** Items that were answered as mixed rather than directional. */
  mixedQuestionIds: readonly string[];
}>;

/**
 * Explicit relational evidence is kept separate from scalar item signals.
 * These records can describe a stated priority, condition, uncertainty rule,
 * contradiction, or contestation response without pretending that the
 * relationship was inferred from co-occurring answers.
 */
export type BeliefRelationalEvidence = Readonly<{
  id: string;
  optionId: string;
  layer: Layer;
  kind: BeliefRelationalEvidenceKind;
  constructIds: readonly BeliefConstructId[];
  statement: string;
  rule?: string;
  condition?: string;
  resolution?: string;
  confidence?: BeliefConfidenceLevel;
  evidenceQuestionIds: readonly string[];
  /** Sources for the selected relationship option, not the broader prompt design. */
  sourceRefs: readonly string[];
}>;

/**
 * A selected option from the direct-belief pilot. It is intentionally a
 * categorical response record rather than a scalar score, so the pilot can
 * expose a conception or reason without pretending that its options form a
 * validated latent scale.
 */
export type BeliefDirectEvidence = Readonly<{
  id: string;
  questionId: string;
  layer: Layer;
  kind: BeliefDirectEvidenceKind;
  constructIds: readonly BeliefConstructId[];
  optionId: string;
  optionLabel: string;
  statement: string;
  evidenceQuestionIds: readonly string[];
  /** Sources for the selected categorical option, not the broader prompt design. */
  sourceRefs: readonly string[];
}>;

export type BeliefRelationalSummary = Readonly<{
  priorityRules: number;
  conditionalRules: number;
  conflictResolutionRules: number;
  uncertaintyStatements: number;
  contradictions: number;
  contestationStatements: number;
  unresolvedContradictions: number;
}>;

export type BeliefConstructResult = Readonly<{
  id: BeliefConstructId;
  label: string;
  description: string;
  status: BeliefMeasurementStatus;
  measurementMode: BeliefMeasurementMode;
  statusNote: string;
  response: BeliefResponseSummary;
  coverage: number;
  /** Share of mapped items that produced directional evidence. */
  directionalCoverage: number;
  /** Share of mapped items explicitly marked mixed/ambivalent. */
  mixedRate: number;
  layerCoverage: Readonly<Record<Layer, number>>;
  signal?: number;
  observationCount: number;
  directObservationCount: number;
  proxyObservationCount: number;
  /** Selected categorical pilot records; these do not contribute to coverage or signal. */
  directEvidenceCount: number;
  directEvidenceIds: readonly string[];
  directEvidenceQuestionIds: readonly string[];
  /** Selected research-candidate records; these do not contribute to coverage or signal. */
  gapEvidenceCount: number;
  gapEvidenceIds: readonly string[];
  gapResponseFormats: readonly BeliefCandidateResponseFormat[];
  /** Explicit relational records attached to this construct; these do not contribute to coverage or signal. */
  relationalEvidenceCount: number;
  relationalEvidenceIds: readonly string[];
  observedFacetIds: readonly string[];
  evidenceQuestionIds: readonly string[];
  directionalEvidenceQuestionIds: readonly string[];
  mixedQuestionIds: readonly string[];
  sourceRefs: readonly string[];
}>;

export type BeliefTension = Readonly<{
  id: string;
  title: string;
  body: string;
  layers: readonly Layer[];
  constructIds: readonly BeliefConstructId[];
  status: "observed-pull" | "not-established";
}>;

export type BeliefProfile = Readonly<{
  modelId: "stated-political-commitment-configuration";
  modelVersion: number;
  status: "observed" | "partial" | "insufficient-information";
  response: BeliefResponseSummary;
  /**
   * Integrated, non-scoring view of the respondent's substantive belief
   * structure. Ideological morphology is derived after this profile.
   */
  structure: readonly BeliefStructureDimension[];
  facets: readonly BeliefFacetResult[];
  constructs: readonly BeliefConstructResult[];
  observations: readonly BeliefObservation[];
  directEvidence: readonly BeliefDirectEvidence[];
  /** Selected quarantined research candidates; never used as scalar or morphology evidence. */
  gapEvidence: readonly BeliefGapEvidence[];
  relationalEvidence: readonly BeliefRelationalEvidence[];
  /** Invalid optional evidence is rejected before it can affect the profile. */
  evidenceValidationErrors: readonly string[];
  relationalSummary: BeliefRelationalSummary;
  measurementAudit: readonly BeliefMeasurementAudit[];
  measurementSummary: BeliefMeasurementSummary;
  /**
   * Cross-layer relationships derived from the belief profile's observed
   * facet signals. This is primary explanatory evidence, not legacy anchor
   * scoring output.
   */
  crossLayerPulls: readonly CrossLayerPull[];
  tensions: readonly BeliefTension[];
  diagnostics: readonly BeliefDiagnostic[];
  gaps: readonly string[];
  provenance: readonly string[];
}>;

export type BeliefCommitmentCentrality = "defining" | "characteristic" | "optional-or-contested";

export type BeliefCommitmentDirection = "positive" | "negative" | "indeterminate";

export type BeliefConception = Readonly<{
  id: string;
  conceptId: string;
  /** Optional link to a broad facet proxy; the concept vocabulary is not a facet vocabulary. */
  facetId?: string;
  label: string;
  interpretation: string;
  centrality: BeliefCommitmentCentrality;
  sourceRefs: readonly string[];
  /** Distinguishes a researched conception record from a broad facet proxy. */
  representation: "explicit-research-conception" | "facet-proxy";
  evidencePosture: "source-backed" | "anchor-projection";
}>;

export type BeliefCommitment = Readonly<{
  id: string;
  constructIds: readonly BeliefConstructId[];
  layer: Layer;
  /** Present for explicit concept/conception records; absent for ordinary facet commitments. */
  conceptId?: string;
  facetId?: string;
  label: string;
  expectedDirection: BeliefCommitmentDirection;
  centrality: BeliefCommitmentCentrality;
  rationale: string;
  sourceRefs: readonly string[];
}>;

export type IdeologyConfiguration = Readonly<{
  targetId: string;
  label: string;
  family: string;
  ontologyNodeId: string;
  ontologyLevel: IdeologyLevel;
  placement: IdeologyNodePlacement;
  definition: string;
  boundary: string;
  variants: readonly string[];
  conceptions: readonly BeliefConception[];
  commitments: readonly BeliefCommitment[];
  conceptualCommitments: readonly BeliefCommitment[];
  normativeCommitments: readonly BeliefCommitment[];
  descriptiveAssumptions: readonly BeliefCommitment[];
  causalAssumptions: readonly BeliefCommitment[];
  institutionalImplications: readonly BeliefCommitment[];
  optionalOrContestedCommitments: readonly BeliefCommitment[];
  /** Source-backed theory of how this configuration relates its commitments; never respondent evidence or affinity input. */
  researchedRelationships: readonly IdeologyConfigurationRelationship[];
  priorities: Readonly<{
    status: "not-established";
    note: string;
  }>;
  compatibility: readonly Readonly<{
    targetId: string;
    relation: IdeologyRelationType | "neighbor" | "variant";
    note: string;
  }>[];
  relationalConstraints: readonly Readonly<{
    kind: "priority" | "conditionality" | "conflict-resolution" | "epistemic" | "contestation";
    status: "not-established";
    note: string;
  }>[];
  tensions: readonly string[];
  sourceRefs: readonly string[];
  evidencePosture: "source-backed-projection" | "anchor-only-projection";
}>;

export type IdeologyConfigurationRelationshipParticipant = Readonly<{
  kind: "facet" | "concept";
  id: string;
  /** Exact configuration commitments resolved from the research participant reference. */
  commitmentIds: readonly string[];
}>;

export type IdeologyConfigurationRelationship = Readonly<{
  id: string;
  kind: ResearchAnchorRelationKind;
  statement: string;
  participants: readonly IdeologyConfigurationRelationshipParticipant[];
  evidencePosture: "source-backed" | "source-backed-contested";
  sourceRefs: readonly string[];
}>;

export type BeliefMeasurementAudit = Readonly<{
  questionId: string;
  layer: Layer;
  prompt: string;
  context?: string;
  domain: string;
  facetIds: readonly string[];
  /** The effect map inherited from the compatibility scorer. */
  legacyEffects: Readonly<Record<string, number>>;
  /** Editorial branch coverage metadata; never respondent evidence. */
  editorialTargetNodeIds: readonly string[];
  constructIds: readonly BeliefConstructId[];
  flags: readonly BeliefMeasurementAuditFlag[];
  disposition: BeliefItemDisposition;
  measurementMode: BeliefMeasurementMode;
  rationale: string;
  sourceRefs: readonly string[];
}>;

export type BeliefConstructLayerCoverage = Readonly<{
  constructId: BeliefConstructId;
  layer: Layer;
}>;

export type BeliefResearchCoverageStatus = "production-covered" | "candidate-only" | "production-and-candidate" | "unrepresented";

/**
 * Separates live production coverage from the quarantined authoring shelf for
 * one declared construct/claim-layer cell. Candidate presence is a research
 * input, not evidence that the cell is measured or fit for scoring.
 */
export type BeliefConstructLayerResearchCoverage = Readonly<{
  constructId: BeliefConstructId;
  layer: Layer;
  productionItemCount: number;
  researchCandidateIds: readonly string[];
  researchCandidateCount: number;
  status: BeliefResearchCoverageStatus;
}>;

export type BeliefMeasurementSummary = Readonly<{
  totalItems: number;
  proxyItems: number;
  directItems: number;
  researchCandidateCounts: Readonly<Record<BeliefConstructId, number>>;
  dispositionCounts: Readonly<Record<BeliefItemDisposition, number>>;
  constructItemCounts: Readonly<Record<BeliefConstructId, number>>;
  /** Production item counts by declared construct and respondent-facing claim layer. */
  constructLayerItemCounts: Readonly<Record<BeliefConstructId, Readonly<Record<Layer, number>>>>;
  /** Declared construct/layer cells with no production item coverage. */
  uncoveredConstructLayerPairs: readonly BeliefConstructLayerCoverage[];
  uncoveredConstructIds: readonly BeliefConstructId[];
  /** Every declared cell, including the separate quarantined research shelf. */
  researchCandidateCoverage: readonly BeliefConstructLayerResearchCoverage[];
  duplicateQuestionIds: readonly string[];
  compoundQuestionIds: readonly string[];
  conditionalQuestionIds: readonly string[];
  /** Editorial branch tags are not respondent-facing ideology evidence. */
  branchMetadataQuestionIds: readonly string[];
  /** Explicit requests for a named ideology remain a separate wording risk. */
  ideologyCodedQuestionIds: readonly string[];
}>;

export type BeliefGapCandidate = Readonly<{
  id: string;
  constructId: BeliefConstructId;
  layer: Layer;
  prompt: string;
  context: string;
  responseFormat: BeliefCandidateResponseFormat;
  responseOptions: readonly string[];
  scholarlyRationale: string;
  gapAddressed: string;
  sameAnswerDifferentReasonRisk: string;
  reviewStatus: "research_candidate";
  sourceRefs: readonly string[];
}>;

/**
 * A selected response to a research-candidate gap item. This remains separate
 * from production observations and direct categorical evidence so a pilot
 * response can be traced without being treated as a validated measure.
 */
export type BeliefGapEvidence = Readonly<{
  id: string;
  candidateId: string;
  optionId: string;
  optionText: string;
  constructId: BeliefConstructId;
  layer: Layer;
  responseFormat: BeliefCandidateResponseFormat;
  evidenceQuestionIds: readonly string[];
  reviewStatus: "research_candidate";
  /** Candidate design and interpretation sources, not selected-option truth. */
  sourceRefs: readonly string[];
}>;

export type BeliefObservation = Readonly<{
  id: string;
  questionId: string;
  layer: Layer;
  constructId: BeliefConstructId;
  /** Present for facet proxies; direct construct items need not name a facet. */
  facetId?: string;
  state: BeliefObservationState;
  /** Present only for directional responses; mixed is not encoded as numeric zero. */
  value?: number;
  effect: number;
  weight: number;
  measurementMode: BeliefMeasurementMode;
  sourceRefs: readonly string[];
}>;

/** `facet-proxy` is retained only as a legacy-regression sentinel; current directional fit uses the construct profile. */
export type MorphologyCalculationSource = "construct-proxy" | "facet-proxy" | "direct-item" | "mixed-provisional" | "none";

export type MorphologyBasis = Readonly<{
  commitmentId: string;
  commitmentLabel: string;
  constructId: BeliefConstructId;
  /** Primary profile dimensions that contextualize this configuration commitment. */
  profileDimensionIds: readonly BeliefStructureDimensionId[];
  /** Evidence form actually used for fit; categorical and relational evidence never appears here. */
  calculationSource: MorphologyCalculationSource;
  facetId?: string;
  expectedDirection: BeliefCommitmentDirection;
  centrality: BeliefCommitmentCentrality;
  weight: number;
  /** Primary construct-level signal used for provisional configuration fit. */
  observedSignal?: number;
  /** Narrow facet-proxy signal retained as context; it is not used for fit. */
  facetProxySignal?: number;
  agreement?: number;
  contribution?: number;
  /** Directional item ids supporting the primary construct-level signal. */
  evidenceQuestionIds: readonly string[];
  /** Directional item ids supporting the retained facet context, when present. */
  facetProxyEvidenceQuestionIds?: readonly string[];
}>;

export type MorphologyRelationalBasis = Readonly<{
  evidenceId: string;
  optionId: string;
  layer: Layer;
  kind: BeliefRelationalEvidenceKind;
  statement: string;
  constructIds: readonly BeliefConstructId[];
  /** Primary profile dimensions linked through the record's explicit constructs. */
  profileDimensionIds: readonly BeliefStructureDimensionId[];
  rule?: string;
  condition?: string;
  resolution?: string;
  confidence?: BeliefConfidenceLevel;
  sourceRefs: readonly string[];
  evidenceQuestionIds: readonly string[];
}>;

export type MorphologyDirectBasis = Readonly<{
  evidenceId: string;
  layer: Layer;
  kind: BeliefDirectEvidenceKind;
  optionLabel: string;
  statement: string;
  constructIds: readonly BeliefConstructId[];
  /** Primary profile dimensions linked through the record's explicit constructs. */
  profileDimensionIds: readonly BeliefStructureDimensionId[];
  sourceRefs: readonly string[];
  evidenceQuestionIds: readonly string[];
}>;

export type IdeologicalMorphologyCandidate = Readonly<{
  anchorId: string;
  label: string;
  family: string;
  ontologyNodeId: string;
  ontologyLevel: IdeologyLevel;
  status: "provisional-candidate" | "under-determined";
  fit: number;
  coverage: number;
  /** Share of defining commitments with sufficient directional support. */
  definingCoverage: number;
  /** Number of defining commitments with sufficient directional support. */
  observedDefiningCommitmentCount: number;
  /** Total defining commitments in the source-backed configuration. */
  definingCommitmentCount: number;
  /** Difference between this candidate's internal fit and its closest competitor. */
  margin: number;
  /** A display band from the predeclared policy, not calibrated confidence. */
  separation: "low" | "moderate" | "high";
  definingCommitmentsObserved: readonly string[];
  missingDefiningCommitments: readonly string[];
  conflictingCommitments: readonly string[];
  basis: readonly MorphologyBasis[];
  directBasis: readonly MorphologyDirectBasis[];
  relationalBasis: readonly MorphologyRelationalBasis[];
  configuration: IdeologyConfiguration;
  explanation: string;
  sourceRefs: readonly string[];
}>;

export type IdeologicalMorphologyResolutionStatus =
  | "insufficient-information"
  | "not-derived"
  | "coarse-neighborhood"
  | "provisional-neighborhood";

/**
 * Explicitly describes what the current candidate grid can support. This is
 * an abstention/shortlist diagnostic, not a selected ideology, confidence
 * score, or empirical validity result.
 */
export type IdeologicalMorphologyResolution = Readonly<{
  status: IdeologicalMorphologyResolutionStatus;
  candidateIds: readonly string[];
  rationale: string;
}>;

export type IdeologicalMorphology = Readonly<{
  modelId: "configuration-projection";
  modelVersion: number;
  status: "provisional-candidates" | "insufficient-information" | "not-derived";
  candidates: readonly IdeologicalMorphologyCandidate[];
  /** Source-backed configuration projections retained as diagnostics because defining evidence is insufficient; never included in candidate ordering. */
  underDeterminedCandidates: readonly IdeologicalMorphologyCandidate[];
  /** Explicit shortlist/abstention posture; never a unique ideology selection. */
  resolution: IdeologicalMorphologyResolution;
  gaps: readonly string[];
  provenance: readonly string[];
  compatibility: Readonly<{
    legacyAnchorScorerPreserved: true;
    legacyScorerRemainsPrimaryForRegression: true;
    primaryInference: "belief-profile";
    legacyScorerRole: "compatibility-regression";
  }>;
}>;

export type InterpretiveBasis = Readonly<{
  layer: Layer;
  facetId: string;
  facetLabel: string;
  constructIds: readonly BeliefConstructId[];
  value: number;
  direction: "toward" | "away";
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
  configuration: IdeologyConfiguration;
  basis: readonly InterpretiveBasis[];
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

export type BeliefInterpretation = Readonly<{
  /** The primary respondent representation. */
  profile: BeliefProfile;
  /** Ideology is projected from the profile as a higher-order interpretation. */
  morphology: IdeologicalMorphology;
  pulls: readonly CrossLayerPull[];
}>;

export type LegacyCalculation = Readonly<{
  /** Compatibility layer retained from the original facet-distance scorer. */
  layers: Readonly<Record<Layer, LayerResult>>;
  combined: CombinedResult;
}>;

export type CalculationResult = Readonly<{
  /**
   * The production interpretation path. Consumers should use this object for
   * the respondent reading and ideological morphology.
   */
  primary: BeliefInterpretation;
  /**
   * The old anchor-distance path, retained for regression and transparent
   * compatibility inspection rather than primary inference.
   */
  legacy: LegacyCalculation;

  /** @deprecated Use primary.profile. Kept for share/test compatibility. */
  beliefProfile: BeliefProfile;
  /** @deprecated Use primary.morphology. Kept for share/test compatibility. */
  beliefMorphology: IdeologicalMorphology;
  /** @deprecated Use legacy.layers. Kept for compatibility. */
  layers: Readonly<Record<Layer, LayerResult>>;
  /** @deprecated Use legacy.combined. Kept for compatibility. */
  combined: CombinedResult;
  /** @deprecated Use primary.pulls. Kept for compatibility. */
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
  relationalAnswers?: readonly RelationalShareAnswer[];
  directAnswers?: readonly DirectShareAnswer[];
  gapAnswers?: readonly GapShareAnswer[];
}>;

export type CompactShareAnswer = readonly [questionIndex: number, value: -2 | -1 | 0 | 1 | 2 | 3];

export type RelationalShareAnswer = readonly [followUpId: string, optionId: string];

export type DirectShareAnswer = readonly [questionId: string, optionId: string];

export type GapShareAnswer = readonly [candidateId: string, optionId: string];

export type ShareEnvelopeV2 = Readonly<{
  schema: "ideology-layer-sorter/share";
  envelopeVersion: 2;
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
  answers: readonly CompactShareAnswer[];
  relationalAnswers?: readonly RelationalShareAnswer[];
  directAnswers?: readonly DirectShareAnswer[];
  gapAnswers?: readonly GapShareAnswer[];
}>;

export type ShareEnvelope = ShareEnvelopeV1 | ShareEnvelopeV2;
