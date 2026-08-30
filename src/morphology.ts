import { BELIEF_MODEL_PROVENANCE, configurationForAnchor } from "./beliefs";
import type {
  BeliefCommitment,
  BeliefCommitmentDirection,
  BeliefConstructResult,
  BeliefDirectEvidence,
  BeliefFacetResult,
  BeliefProfile,
  BeliefRelationalEvidence,
  Dataset,
  IdeologicalMorphology,
  IdeologicalMorphologyCandidate,
  IdeologyConfiguration,
  MorphologyBasis,
  MorphologyDirectBasis,
  MorphologyRelationalBasis,
} from "./types";

export const MORPHOLOGY_MODEL_ID = "configuration-projection" as const;
export const MORPHOLOGY_MODEL_VERSION = 1;

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const centralityWeight = (centrality: BeliefCommitment["centrality"]): number => {
  if (centrality === "defining") return 2;
  if (centrality === "characteristic") return 1;
  return 0.5;
};

// A neutral or near-neutral proxy is not sufficient to count as an observed
// defining commitment. This is a display safeguard against turning "mixed" or
// weak directional noise into a named morphology; it is not a validated
// psychometric cutoff.
const MIN_DEFINING_SUPPORT = 0.2;

const directionSign = (direction: BeliefCommitmentDirection): number | undefined => {
  if (direction === "positive") return 1;
  if (direction === "negative") return -1;
  return undefined;
};

const canonicalConfigurationsFor = (dataset: Dataset): readonly IdeologyConfiguration[] => dataset.anchors
  .filter((anchor) => dataset.ideologyNodes.find((node) => node.id === anchor.ontologyNodeId)?.placement === "canonical")
  .map((anchor) => configurationForAnchor(anchor, dataset));

const constructMapFor = (profile: BeliefProfile): ReadonlyMap<string, BeliefConstructResult> =>
  new Map(profile.constructs.map((construct) => [construct.id, construct]));

const facetMapFor = (profile: BeliefProfile): ReadonlyMap<string, BeliefFacetResult> =>
  new Map(profile.facets.map((facet) => [`${facet.layer}:${facet.facetId}`, facet]));

const commitmentLabel = (commitment: BeliefCommitment): string => `${commitment.label} (${commitment.layer})`;

const relationalBasisFor = (evidence: readonly BeliefRelationalEvidence[]): readonly MorphologyRelationalBasis[] => evidence.map((item) => ({
  evidenceId: item.id,
  optionId: item.optionId,
  kind: item.kind,
  statement: item.statement,
  constructIds: item.constructIds,
  ...(item.rule ? { rule: item.rule } : {}),
  ...(item.condition ? { condition: item.condition } : {}),
  ...(item.resolution ? { resolution: item.resolution } : {}),
  ...(item.confidence ? { confidence: item.confidence } : {}),
  sourceRefs: item.sourceRefs,
  evidenceQuestionIds: item.evidenceQuestionIds,
}));

const directBasisFor = (evidence: readonly BeliefDirectEvidence[]): readonly MorphologyDirectBasis[] => evidence.map((item) => ({
  evidenceId: item.id,
  kind: item.kind,
  optionLabel: item.optionLabel,
  statement: item.statement,
  constructIds: item.constructIds,
  sourceRefs: item.sourceRefs,
  evidenceQuestionIds: item.evidenceQuestionIds,
}));

const basisForCommitment = (
  commitment: BeliefCommitment,
  constructId: BeliefConstructResult["id"],
  constructs: ReadonlyMap<string, BeliefConstructResult>,
  facets: ReadonlyMap<string, BeliefFacetResult>,
  constructCount: number,
): MorphologyBasis => {
  const construct = constructs.get(constructId);
  const facet = commitment.facetId ? facets.get(`${commitment.layer}:${commitment.facetId}`) : undefined;
  const sign = directionSign(commitment.expectedDirection);
  // A source-backed commitment is attached to a specific facet whenever the
  // research profile supplies one. Do not fall back to an aggregate construct
  // signal: doing so would let an unrelated conception or mechanism satisfy a
  // commitment merely because both share a broad construct label.
  const hasDirectionalEvidence = commitment.facetId
    ? (facet?.response.directional ?? 0) > 0
    : (construct?.response.directional ?? 0) > 0;
  const observedSignal = hasDirectionalEvidence
    ? commitment.facetId ? facet?.signal : construct?.signal
    : undefined;
  const weight = centralityWeight(commitment.centrality) / Math.max(constructCount, 1);
  if (sign === undefined || observedSignal === undefined || (!commitment.facetId && construct?.status === "not-yet-measured")) {
    return {
      commitmentId: commitment.id,
      commitmentLabel: commitmentLabel(commitment),
      constructId,
      ...(commitment.facetId ? { facetId: commitment.facetId } : {}),
      expectedDirection: commitment.expectedDirection,
      centrality: commitment.centrality,
      weight,
      ...(observedSignal === undefined ? {} : { observedSignal }),
      evidenceQuestionIds: commitment.facetId
        ? facet?.directionalEvidenceQuestionIds ?? []
        : construct?.directionalEvidenceQuestionIds ?? [],
    };
  }
  const support = clamp(sign * observedSignal, -1, 1);
  const agreement = clamp((support + 1) / 2, 0, 1);
  return {
    commitmentId: commitment.id,
    commitmentLabel: commitmentLabel(commitment),
    constructId,
    ...(commitment.facetId ? { facetId: commitment.facetId } : {}),
    expectedDirection: commitment.expectedDirection,
    centrality: commitment.centrality,
    weight,
    observedSignal,
    agreement,
    contribution: agreement * weight,
    evidenceQuestionIds: commitment.facetId
      ? facet?.directionalEvidenceQuestionIds ?? []
      : construct?.directionalEvidenceQuestionIds ?? [],
  };
};

const candidateForConfiguration = (
  configuration: IdeologyConfiguration,
  constructs: ReadonlyMap<string, BeliefConstructResult>,
  facets: ReadonlyMap<string, BeliefFacetResult>,
  directEvidence: readonly BeliefDirectEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): IdeologicalMorphologyCandidate | undefined => {
  const basis = configuration.commitments.flatMap((commitment) => commitment.constructIds
    .map((constructId) => basisForCommitment(commitment, constructId, constructs, facets, commitment.constructIds.length)));
  const directionalBasis = basis.filter((item) => item.expectedDirection !== "indeterminate");
  if (directionalBasis.length === 0) return undefined;

  const totalWeight = directionalBasis.reduce((sum, item) => sum + item.weight, 0);
  const observedBasis = directionalBasis.filter((item) => item.agreement !== undefined);
  const observedWeight = observedBasis.reduce((sum, item) => sum + item.weight, 0);
  const fit = observedWeight === 0
    ? 0
    : clamp(observedBasis.reduce((sum, item) => sum + (item.contribution ?? 0), 0) / observedWeight, 0, 1);
  const coverage = totalWeight === 0 ? 0 : observedWeight / totalWeight;

  const definingCommitmentsObserved = new Set<string>();
  const missingDefiningCommitments = new Set<string>();
  const conflictingCommitments = new Set<string>();
  for (const commitment of configuration.commitments.filter((item) => item.centrality === "defining")) {
    const commitmentBasis = basis.filter((item) => item.commitmentId === commitment.id);
    const missing = commitmentBasis.every((item) => item.agreement === undefined)
      || !commitmentBasis.some((item) => {
        if (item.agreement === undefined) return false;
        const support = directionSign(item.expectedDirection);
        return support !== undefined && support * (item.observedSignal ?? 0) >= MIN_DEFINING_SUPPORT;
      });
    const conflict = commitmentBasis.some((item) => item.agreement !== undefined && (item.agreement ?? 0.5) < 0.375);
    const label = commitmentLabel(commitment);
    if (missing) missingDefiningCommitments.add(label);
    else if (conflict) conflictingCommitments.add(label);
    else definingCommitmentsObserved.add(label);
  }

  const status: IdeologicalMorphologyCandidate["status"] = definingCommitmentsObserved.size > 0 && coverage >= 0.25
    ? "provisional-candidate"
    : "under-determined";
  const observedText = [...definingCommitmentsObserved].slice(0, 3).join(", ");
  const missingText = [...missingDefiningCommitments].slice(0, 3).join(", ");
  const conflictText = [...conflictingCommitments].slice(0, 3).join(", ");
  const directBasis = directBasisFor(directEvidence);
  const relationalBasis = relationalBasisFor(relationalEvidence);
  const explanationParts = [
    observedText.length > 0 ? `Observed support includes ${observedText}.` : "No defining commitment is sufficiently observed.",
    missingText.length > 0 ? `Still unmeasured or unavailable: ${missingText}.` : "No defining commitment is missing from the current proxy coverage.",
    conflictText.length > 0 ? `Potential counter-signal: ${conflictText}.` : "No strong counter-signal is established by this proxy pass.",
    directBasis.length > 0
      ? `The profile also contains ${directBasis.length} direct categorical pilot observation${directBasis.length === 1 ? "" : "s"}; these remain outside affinity calculation pending measurement review.`
      : "No direct categorical pilot observation is available for this projection.",
    relationalBasis.length > 0
      ? `The profile also contains ${relationalBasis.length} explicit relational observation${relationalBasis.length === 1 ? "" : "s"}; these are reported as stated rules or tensions and do not override missing configuration evidence.`
      : "No explicit priority, condition, uncertainty, contradiction, or contestation rule is available for this projection.",
  ];

  return {
    anchorId: configuration.targetId,
    label: configuration.label,
    family: configuration.family,
    ontologyNodeId: configuration.ontologyNodeId,
    ontologyLevel: configuration.ontologyLevel,
    status,
    fit,
    coverage,
    definingCommitmentsObserved: [...definingCommitmentsObserved],
    missingDefiningCommitments: [...missingDefiningCommitments],
    conflictingCommitments: [...conflictingCommitments],
    basis,
    directBasis,
    relationalBasis,
    configuration,
    explanation: explanationParts.join(" "),
    sourceRefs: configuration.sourceRefs,
  };
};

export const deriveIdeologicalMorphology = (profile: BeliefProfile, dataset: Dataset): IdeologicalMorphology => {
  if (profile.status === "insufficient-information") {
    return {
      modelId: MORPHOLOGY_MODEL_ID,
      modelVersion: MORPHOLOGY_MODEL_VERSION,
      status: "insufficient-information",
      candidates: [],
      gaps: [
        "The profile does not meet the existing layer coverage threshold, so no ideological morphology candidate is derived.",
        "This model uses provisional facet-to-construct proxies and cannot infer an ideology from incomplete responses.",
      ],
      provenance: [...BELIEF_MODEL_PROVENANCE],
      compatibility: {
        legacyAnchorScorerPreserved: true,
        legacyScorerRemainsPrimaryForRegression: true,
      },
    };
  }

  const constructs = constructMapFor(profile);
  const facets = facetMapFor(profile);
  const candidates = canonicalConfigurationsFor(dataset)
    .map((configuration) => candidateForConfiguration(configuration, constructs, facets, profile.directEvidence, profile.relationalEvidence))
    .filter((candidate): candidate is IdeologicalMorphologyCandidate => candidate !== undefined)
    .sort((left, right) => right.fit - left.fit || right.coverage - left.coverage || left.label.localeCompare(right.label) || left.anchorId.localeCompare(right.anchorId));
  const unmeasured = profile.constructs.filter((construct) => construct.status === "not-yet-measured").map((construct) => construct.label);
  return {
    modelId: MORPHOLOGY_MODEL_ID,
    modelVersion: MORPHOLOGY_MODEL_VERSION,
    status: candidates.some((candidate) => candidate.status === "provisional-candidate") ? "provisional-candidates" : "not-derived",
    candidates,
    gaps: [
      "These are configuration-projection candidates, not validated latent traits, diagnoses, identities, or recommendations.",
      "The legacy facet-distance scorer remains available as a compatibility regression baseline and is not silently replaced by this pass.",
      ...(profile.directEvidence.length > 0 ? ["Direct categorical pilot evidence is carried for transparency but excluded from morphology calculation until response-process and empirical review are complete."] : []),
      "Unmeasured priority, conditionality, epistemic-confidence, and heterodoxy constructs are not filled in by morphology matching.",
      ...(unmeasured.length > 0 ? [`The following constructs remain unmeasured: ${unmeasured.join(", ")}.`] : []),
    ],
    provenance: [...new Set([...profile.provenance, ...BELIEF_MODEL_PROVENANCE])],
    compatibility: {
      legacyAnchorScorerPreserved: true,
      legacyScorerRemainsPrimaryForRegression: true,
    },
  };
};
