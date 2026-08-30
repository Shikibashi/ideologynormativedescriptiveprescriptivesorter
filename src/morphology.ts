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
  BeliefStructureDimension,
  MorphologyBasis,
  MorphologyDirectBasis,
  MorphologyRelationalBasis,
  IdeologicalMorphologyResolution,
} from "./types";

export const MORPHOLOGY_MODEL_ID = "configuration-projection" as const;
export const MORPHOLOGY_MODEL_VERSION = 5;

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

const profileDimensionIdsFor = (
  constructId: BeliefConstructResult["id"],
  structure: readonly BeliefStructureDimension[],
): readonly BeliefStructureDimension["id"][] => structure
  .filter((dimension) => dimension.constructIds.includes(constructId))
  .map((dimension) => dimension.id);

const profileDimensionIdsForConstructs = (
  constructIds: readonly BeliefConstructResult["id"][],
  structure: readonly BeliefStructureDimension[],
): readonly BeliefStructureDimension["id"][] => [...new Set(constructIds.flatMap((constructId) => profileDimensionIdsFor(constructId, structure)))];

const commitmentLabel = (commitment: BeliefCommitment): string => `${commitment.label} (${commitment.layer})`;

const relationalBasisFor = (
  evidence: readonly BeliefRelationalEvidence[],
  structure: readonly BeliefStructureDimension[],
): readonly MorphologyRelationalBasis[] => evidence.map((item) => ({
  evidenceId: item.id,
  optionId: item.optionId,
  layer: item.layer,
  kind: item.kind,
  statement: item.statement,
  constructIds: item.constructIds,
  profileDimensionIds: profileDimensionIdsForConstructs(item.constructIds, structure),
  ...(item.rule ? { rule: item.rule } : {}),
  ...(item.condition ? { condition: item.condition } : {}),
  ...(item.resolution ? { resolution: item.resolution } : {}),
  ...(item.confidence ? { confidence: item.confidence } : {}),
  sourceRefs: item.sourceRefs,
  evidenceQuestionIds: item.evidenceQuestionIds,
}));

const directBasisFor = (
  evidence: readonly BeliefDirectEvidence[],
  structure: readonly BeliefStructureDimension[],
): readonly MorphologyDirectBasis[] => evidence.map((item) => ({
  evidenceId: item.id,
  layer: item.layer,
  kind: item.kind,
  optionLabel: item.optionLabel,
  statement: item.statement,
  constructIds: item.constructIds,
  profileDimensionIds: profileDimensionIdsForConstructs(item.constructIds, structure),
  sourceRefs: item.sourceRefs,
  evidenceQuestionIds: item.evidenceQuestionIds,
}));

type MorphologyCandidateDraft = Omit<IdeologicalMorphologyCandidate, "margin" | "separation">;

/**
 * Fit margins make coarse candidate neighborhoods inspectable. The existing
 * policy bands are display safeguards shared with the compatibility path;
 * they are not calibrated confidence, validity evidence, or a reason to tune
 * coefficients from synthetic profiles.
 */
const morphologySeparationFor = (
  candidate: MorphologyCandidateDraft,
  candidates: readonly MorphologyCandidateDraft[],
  dataset: Dataset,
): Pick<IdeologicalMorphologyCandidate, "margin" | "separation"> => {
  const margin = candidates
    .filter((other) => other.anchorId !== candidate.anchorId)
    .reduce((smallest, other) => Math.min(smallest, Math.abs(other.fit - candidate.fit)), Number.POSITIVE_INFINITY);
  const safeMargin = Number.isFinite(margin) ? margin : 1;
  const separation = safeMargin <= dataset.policy.separationThreshold
    ? "low"
    : safeMargin <= dataset.policy.clearSeparationThreshold
      ? "moderate"
      : "high";
  return { margin: safeMargin, separation };
};

const decoratedCandidatesFor = (
  drafts: readonly MorphologyCandidateDraft[],
  comparisonDrafts: readonly MorphologyCandidateDraft[],
  dataset: Dataset,
): readonly IdeologicalMorphologyCandidate[] => drafts
  .map((candidate) => ({
    ...candidate,
    ...morphologySeparationFor(candidate, comparisonDrafts, dataset),
  }))
  .sort((left, right) => right.fit - left.fit || right.coverage - left.coverage || left.label.localeCompare(right.label) || left.anchorId.localeCompare(right.anchorId));

const morphologyResolutionFor = (
  status: IdeologicalMorphology["status"],
  candidates: readonly IdeologicalMorphologyCandidate[],
  underDeterminedCandidates: readonly IdeologicalMorphologyCandidate[],
): IdeologicalMorphologyResolution => {
  if (status === "insufficient-information") {
    return {
      status: "insufficient-information",
      candidateIds: [],
      rationale: "The three-layer coverage threshold is not met, so no configuration neighborhood is derived.",
    };
  }
  if (candidates.length === 0) {
    return {
      status: "not-derived",
      candidateIds: [],
      rationale: underDeterminedCandidates.length > 0
        ? "No configuration has enough defining support for provisional comparison; retain the under-determined diagnostics and gather more discriminating evidence."
        : "No configuration has enough observed defining support for a provisional neighborhood.",
    };
  }
  const leading = candidates[0];
  const candidateIds = candidates.slice(0, 5).map((candidate) => candidate.anchorId);
  if (leading.separation === "low") {
    return {
      status: "coarse-neighborhood",
      candidateIds,
      rationale: "The leading provisional configurations are close on the current internal-fit grid. Keep the neighborhood visible and add a source-backed discriminating research candidate before considering any scorer change; no unique ideology label is selected.",
    };
  }
  return {
    status: "provisional-neighborhood",
    candidateIds,
    rationale: "The leading provisional configuration is inspectable, but this research-backed projection does not select a unique ideology label. Keep the nearby candidates and defining-evidence coverage visible until the open validation gates are addressed.",
  };
};

const basisForCommitment = (
  commitment: BeliefCommitment,
  constructId: BeliefConstructResult["id"],
  constructs: ReadonlyMap<string, BeliefConstructResult>,
  facets: ReadonlyMap<string, BeliefFacetResult>,
  structure: readonly BeliefStructureDimension[],
  constructCount: number,
): MorphologyBasis => {
  const construct = constructs.get(constructId);
  const facet = commitment.facetId ? facets.get(`${commitment.layer}:${commitment.facetId}`) : undefined;
  const sign = directionSign(commitment.expectedDirection);
  // The primary morphology fit is now calculated from the construct signal
  // held by the integrated profile. A facet-linked commitment retains its
  // narrower facet signal for provenance, but that signal is not the fit
  // input; otherwise morphology would remain a second direct facet scorer.
  const facetProxySignal = commitment.facetId ? facet?.signal : undefined;
  const hasDirectionalEvidence = (construct?.response.directional ?? 0) > 0;
  const observedSignal = hasDirectionalEvidence ? construct?.signal : undefined;
  const profileDimensionIds = profileDimensionIdsFor(constructId, structure);
  const constructCalculationSource = construct?.directObservationCount && construct.proxyObservationCount
    ? "mixed-provisional" as const
    : construct?.measurementMode === "direct-item"
      ? "direct-item" as const
      : "construct-proxy" as const;
  const calculationSource = sign === undefined || observedSignal === undefined
    ? "none" as const
    : constructCalculationSource;
  const evidenceQuestionIds = construct?.directionalEvidenceQuestionIds ?? [];
  const facetProxyEvidenceQuestionIds = facet?.directionalEvidenceQuestionIds ?? [];
  const weight = centralityWeight(commitment.centrality) / Math.max(constructCount, 1);
  if (sign === undefined || observedSignal === undefined || (!commitment.facetId && construct?.status === "not-yet-measured")) {
    return {
      commitmentId: commitment.id,
      commitmentLabel: commitmentLabel(commitment),
      constructId,
      profileDimensionIds,
      calculationSource,
      ...(commitment.facetId ? { facetId: commitment.facetId } : {}),
      expectedDirection: commitment.expectedDirection,
      centrality: commitment.centrality,
      weight,
      ...(observedSignal === undefined ? {} : { observedSignal }),
      ...(facetProxySignal === undefined ? {} : { facetProxySignal }),
      evidenceQuestionIds,
      ...(facetProxyEvidenceQuestionIds.length === 0 ? {} : { facetProxyEvidenceQuestionIds }),
    };
  }
  const support = clamp(sign * observedSignal, -1, 1);
  const agreement = clamp((support + 1) / 2, 0, 1);
  return {
    commitmentId: commitment.id,
    commitmentLabel: commitmentLabel(commitment),
    constructId,
    profileDimensionIds,
    calculationSource,
    ...(commitment.facetId ? { facetId: commitment.facetId } : {}),
    expectedDirection: commitment.expectedDirection,
    centrality: commitment.centrality,
    weight,
    observedSignal,
    ...(facetProxySignal === undefined ? {} : { facetProxySignal }),
    agreement,
    contribution: agreement * weight,
    evidenceQuestionIds,
    ...(facetProxyEvidenceQuestionIds.length === 0 ? {} : { facetProxyEvidenceQuestionIds }),
  };
};

const candidateForConfiguration = (
  configuration: IdeologyConfiguration,
  constructs: ReadonlyMap<string, BeliefConstructResult>,
  facets: ReadonlyMap<string, BeliefFacetResult>,
  structure: readonly BeliefStructureDimension[],
  directEvidence: readonly BeliefDirectEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): MorphologyCandidateDraft | undefined => {
  const basis = configuration.commitments.flatMap((commitment) => commitment.constructIds
    .map((constructId) => basisForCommitment(commitment, constructId, constructs, facets, structure, commitment.constructIds.length)));
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
  const definingCommitments = configuration.commitments.filter((item) => item.centrality === "defining");
  for (const commitment of definingCommitments) {
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
  const directBasis = directBasisFor(directEvidence, structure);
  const relationalBasis = relationalBasisFor(relationalEvidence, structure);
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
    definingCoverage: definingCommitments.length === 0 ? 0 : definingCommitmentsObserved.size / definingCommitments.length,
    observedDefiningCommitmentCount: definingCommitmentsObserved.size,
    definingCommitmentCount: definingCommitments.length,
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
      underDeterminedCandidates: [],
      resolution: morphologyResolutionFor("insufficient-information", [], []),
      gaps: [
        "The profile does not meet the existing layer coverage threshold, so no ideological morphology candidate is derived.",
        "This model uses construct-level profile signals built from provisional facet-to-construct proxies and cannot infer an ideology from incomplete responses.",
      ],
      provenance: [...BELIEF_MODEL_PROVENANCE],
      compatibility: {
        legacyAnchorScorerPreserved: true,
        legacyScorerRemainsPrimaryForRegression: true,
        primaryInference: "belief-profile",
        legacyScorerRole: "compatibility-regression",
      },
    };
  }

  const constructs = constructMapFor(profile);
  const facets = facetMapFor(profile);
  const candidateDrafts = canonicalConfigurationsFor(dataset)
    .map((configuration) => candidateForConfiguration(configuration, constructs, facets, profile.structure, profile.directEvidence, profile.relationalEvidence))
    .filter((candidate): candidate is MorphologyCandidateDraft => candidate !== undefined);
  const provisionalDrafts = candidateDrafts.filter((candidate) => candidate.status === "provisional-candidate");
  const underDeterminedDrafts = candidateDrafts.filter((candidate) => candidate.status === "under-determined");
  // Only provisional records participate in the public candidate ordering.
  // Under-determined configurations remain available as diagnostics so that
  // missing defining evidence is visible without making it comparable to a
  // supported candidate.
  const candidates = decoratedCandidatesFor(provisionalDrafts, provisionalDrafts, dataset);
  const underDeterminedCandidates = decoratedCandidatesFor(underDeterminedDrafts, candidateDrafts, dataset);
  const unmeasured = profile.constructs.filter((construct) => construct.status === "not-yet-measured").map((construct) => construct.label);
  const leadingCandidates = candidates.slice(0, 2);
  const separationGap = leadingCandidates.length > 1
    ? `The two leading configuration candidates are ${leadingCandidates[0].separation} separated by a ${Math.round(leadingCandidates[0].margin * 100)} percentage-point internal-fit margin. This is a diagnostic of the current item/configuration grid, not confidence or empirical validation; no unique ideology label is selected.`
    : "The current candidate set has fewer than two configuration candidates, so a competing-candidate margin is not estimable.";
  const underDeterminedGap = underDeterminedCandidates.length > 0
    ? `${underDeterminedCandidates.length} source-backed configuration projection${underDeterminedCandidates.length === 1 ? "" : "s"} remain under-determined and are withheld from provisional candidate ordering.`
    : undefined;
  const status: IdeologicalMorphology["status"] = candidates.length > 0 ? "provisional-candidates" : "not-derived";
  return {
    modelId: MORPHOLOGY_MODEL_ID,
    modelVersion: MORPHOLOGY_MODEL_VERSION,
    status,
    candidates,
    underDeterminedCandidates,
    resolution: morphologyResolutionFor(status, candidates, underDeterminedCandidates),
    gaps: [
      "These are configuration-projection candidates, not validated latent traits, diagnoses, identities, or recommendations.",
      "The legacy facet-distance scorer remains available as a compatibility regression baseline and is not silently replaced by this pass.",
      separationGap,
      ...(profile.directEvidence.length > 0 ? ["Direct categorical pilot evidence is carried for transparency but excluded from morphology calculation until response-process and empirical review are complete."] : []),
      "Unmeasured priority, conditionality, epistemic-confidence, and heterodoxy constructs are not filled in by morphology matching.",
      ...(unmeasured.length > 0 ? [`The following constructs remain unmeasured: ${unmeasured.join(", ")}.`] : []),
      ...(underDeterminedGap === undefined ? [] : [underDeterminedGap]),
    ],
    provenance: [...new Set([...profile.provenance, ...BELIEF_MODEL_PROVENANCE])],
    compatibility: {
      legacyAnchorScorerPreserved: true,
      legacyScorerRemainsPrimaryForRegression: true,
      primaryInference: "belief-profile",
      legacyScorerRole: "compatibility-regression",
    },
  };
};
