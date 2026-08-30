import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { answerOptions, DATASET, sourceMap } from "./data";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateOptionIdFor, gapEvidenceForAnswers } from "./belief-gap-candidates";
import type { BeliefGapAnswerMap } from "./belief-gap-candidates";
import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers } from "./belief-direct-items";
import type { BeliefDirectAnswerMap } from "./belief-direct-items";
import { BELIEF_RELATIONAL_FOLLOWUPS, relationalEvidenceForAnswers } from "./belief-followups";
import type { BeliefRelationalAnswerMap } from "./belief-followups";
import { auditBeliefMeasurement, constructLabelFor } from "./beliefs";
import {
  buildResearchTargets,
  createResearchCandidate,
  curatedResearchCandidates,
  researchCandidateWarnings,
  researchConfidenceOptions,
  researchCoverageSummaries,
  researchCoverageDescriptions,
  researchCoverageLabels,
  researchExpectedDirectionOptions,
  researchFalsePositiveAudits,
  researchItemFunctionOptions,
  researchAnchorProfiles,
  researchNeighborDiscriminants,
  promotionReviewStateLabels,
  researchResponseFormatOptions,
  researchTheoryContextOptions,
  validateResearchCandidate,
} from "./research";
import { calculateResults, formatFit } from "./scoring";
import { researchTaxonomyDecisionForTarget, researchTaxonomyDispositionLabels } from "./research-governance";
import { decodeShareFragment, encodeShareFragment } from "./share";
import { LAYER_LABELS, LAYERS, type Answer, type AnswerMap, type BeliefDiagnosticLayer, type BeliefItemDisposition, type BeliefMeasurementAudit, type BeliefMeasurementAuditFlag, type BeliefMeasurementStatus, type BeliefProfile, type BeliefStructureEvidencePosture, type CombinedResult, type IdeologicalMorphology, type IdeologyConfiguration, type IdeologyLevel, type InterpretiveBasis, type Layer, type LayerResult, type MorphologyCalculationSource, type ResearchQuestionCandidate, type ResearchTarget, type SourceRole } from "./types";

type PrimaryView = "intro" | "quiz" | "results";
type View = PrimaryView | "research";

type SessionState = Readonly<{
  answers: AnswerMap;
  directAnswers: BeliefDirectAnswerMap;
  gapAnswers: BeliefGapAnswerMap;
  relationalAnswers: BeliefRelationalAnswerMap;
  view: View;
  questionIndex: number;
  returnView?: PrimaryView;
  restoredNotice?: string;
}>;

const sourceRoleLabels: Record<SourceRole, string> = {
  "design-inspiration": "design inspiration",
  "ideology-research": "ideology research",
  "survey-methodology": "survey methodology",
  "comparative-data": "comparative data",
};

const taxonomyLevelLabels: Record<IdeologyLevel, string> = {
  macro: "macro family",
  meso: "meso tradition",
  micro: "micro branch",
};

const canonicalTaxonomyNodes = DATASET.ideologyNodes.filter((node) => node.placement === "canonical");
const canonicalTaxonomyCounts = {
  macro: canonicalTaxonomyNodes.filter((node) => node.level === "macro").length,
  meso: canonicalTaxonomyNodes.filter((node) => node.level === "meso").length,
  micro: canonicalTaxonomyNodes.filter((node) => node.level === "micro").length,
};

const projectInspirationSources = [
  "source-8values",
  "source-leftvalues",
  "source-politiscales",
  "source-ideo-directory",
  "source-manifesto-future",
].map((sourceId) => sourceMap.get(sourceId)).filter((source) => source !== undefined);

const researchTargets = buildResearchTargets(DATASET);
const researchCandidateTargetCount = new Set(curatedResearchCandidates.map((candidate) => candidate.targetId)).size;
const productionMeasurementAudits = auditBeliefMeasurement(DATASET);

type MeasurementAuditFilter = "open-disposition" | "all-flagged" | "compound-wording" | "conditional-wording" | "branch-target-metadata" | "all-items";

const measurementAuditFilters: readonly MeasurementAuditFilter[] = [
  "open-disposition",
  "all-flagged",
  "compound-wording",
  "conditional-wording",
  "branch-target-metadata",
  "all-items",
];

const measurementAuditFilterLabels: Record<MeasurementAuditFilter, string> = {
  "open-disposition": "Open disposition review",
  "all-flagged": "All flagged items",
  "compound-wording": "Compound wording",
  "conditional-wording": "Condition / contrast wording",
  "branch-target-metadata": "Branch metadata",
  "all-items": "All production items",
};

const measurementAuditMatchesFilter = (audit: BeliefMeasurementAudit, filter: MeasurementAuditFilter): boolean => {
  if (filter === "open-disposition") return audit.disposition !== "preserve";
  if (filter === "all-flagged") return audit.flags.length > 0;
  if (filter === "all-items") return true;
  return audit.flags.includes(filter);
};

const measurementAuditCountForFilter = (filter: MeasurementAuditFilter): number => productionMeasurementAudits.filter((audit) => measurementAuditMatchesFilter(audit, filter)).length;

const measurementAuditFlagLabelFor = (flag: BeliefMeasurementAuditFlag): string => flag.replaceAll("-", " ");

const measurementAuditDispositionLabelFor = (disposition: BeliefItemDisposition): string => disposition.replaceAll("-", " ");

const measurementAuditLegacyEffectsFor = (audit: BeliefMeasurementAudit): string => {
  const effects = Object.entries(audit.legacyEffects).map(([facetId, effect]) => {
    const facetLabel = DATASET.facets.find((facet) => facet.id === facetId)?.label ?? facetId;
    return `${facetLabel} ${effect >= 0 ? "+" : ""}${effect}`;
  });
  return effects.join(" · ") || "No legacy facet effect";
};

const researchLabelFor = (targetId: string): string =>
  researchTargets.find((target) => target.id === targetId)?.label
  ?? DATASET.ideologyNodes.find((node) => node.id === targetId)?.label
  ?? DATASET.ideologyRegistry.find((entry) => entry.id === targetId)?.label
  ?? targetId;

const hasAnswer = (answers: AnswerMap, questionId: string): boolean => answers[questionId] !== undefined;

const beliefStatusLabels: Record<BeliefMeasurementStatus, string> = {
  observed: "observed item association",
  partial: "partial proxy",
  "not-yet-measured": "not yet measured",
};

const beliefStructurePostureLabels: Record<BeliefStructureEvidencePosture, string> = {
  unmeasured: "no profile evidence",
  "facet-proxy": "facet proxy",
  "direct-item": "direct item",
  "categorical-pilot": "categorical pilot",
  "candidate-pilot": "research candidate",
  "explicit-relational": "explicit relation",
  "mixed-provisional": "mixed provisional evidence",
};

const beliefDiagnosticLayerLabels: Record<BeliefDiagnosticLayer, string> = {
  question: "question",
  construct: "construct",
  conception: "conception",
  relationship: "relationship",
  weighting: "weighting",
  "causal-belief": "causal belief",
  "priority-conflict-rule": "priority/conflict rule",
  "institutional-inference": "institutional inference",
  "ideological-mapping": "ideological mapping",
};

const formatSignedSignal = (value: number): string => `${value >= 0 ? "+" : ""}${Math.round(value * 100)}%`;

type BeliefStructureDimensionRecord = BeliefProfile["structure"][number];

const beliefStructureEvidenceSummaryFor = (dimension: BeliefStructureDimensionRecord): string => {
  const parts = [
    dimension.directionalObservationCount > 0 ? `${dimension.directionalObservationCount} directional observation record${dimension.directionalObservationCount === 1 ? "" : "s"}` : "",
    dimension.mixedObservationCount > 0 ? `${dimension.mixedObservationCount} mixed response record${dimension.mixedObservationCount === 1 ? "" : "s"}` : "",
    dimension.directEvidenceIds.length > 0 ? `${dimension.directEvidenceIds.length} categorical pilot record${dimension.directEvidenceIds.length === 1 ? "" : "s"}` : "",
    dimension.gapEvidenceIds.length > 0 ? `${dimension.gapEvidenceIds.length} research-candidate record${dimension.gapEvidenceIds.length === 1 ? "" : "s"}` : "",
    dimension.relationalEvidenceIds.length > 0 ? `${dimension.relationalEvidenceIds.length} relational record${dimension.relationalEvidenceIds.length === 1 ? "" : "s"}` : "",
  ].filter((part) => part.length > 0);
  return parts.length > 0 ? parts.join(" · ") : "No answered or explicit evidence record";
};

const beliefStructureClaimLayerSummaryFor = (dimension: BeliefStructureDimensionRecord): string => LAYERS
  .map((layer) => `${LAYER_LABELS[layer].short} ${dimension.observedObservationCountsByLayer[layer]}`)
  .join(" · ");

const beliefStructureSignalSummaryFor = (dimension: BeliefStructureDimensionRecord): string => {
  if (dimension.observedSignal === undefined) {
    return "No directional construct signal is available; mixed, no-view, and unanswered responses remain non-directional.";
  }
  const questionCount = dimension.observedSignalEvidenceQuestionIds.length;
  return `Provisional construct signal ${formatSignedSignal(dimension.observedSignal)} from ${questionCount} directional item record${questionCount === 1 ? "" : "s"}.`;
};

const constructLayerGapSummaryFor = (profile: BeliefProfile): string => profile.measurementSummary.uncoveredConstructLayerPairs
  .map((pair) => `${constructLabelFor(pair.constructId)} / ${LAYER_LABELS[pair.layer].short}`)
  .join(" · ") || "No declared construct/layer coverage gaps";

const beliefStructureRelatedDimensionLabelsFor = (dimension: BeliefStructureDimensionRecord, profile: BeliefProfile): string => dimension.relatedDimensionIds
  .map((dimensionId) => profile.structure.find((candidate) => candidate.id === dimensionId)?.label ?? dimensionId)
  .join(" · ") || "No explicit cross-dimension relationship is recorded";

const basisSummaryFor = (basis: readonly InterpretiveBasis[]): string => basis
  .slice(0, 4)
  .map((item) => `${item.facetLabel} (${item.direction}; ${item.constructIds.map(constructLabelFor).join(", ")})`)
  .join("; ");

const configurationSummaryFor = (configuration: IdeologyConfiguration): string => {
  const defining = configuration.commitments.filter((commitment) => commitment.centrality === "defining").slice(0, 3).map((commitment) => commitment.label);
  const optional = configuration.optionalOrContestedCommitments.slice(0, 2).map((commitment) => commitment.label);
  const definingText = defining.length > 0 ? defining.join(", ") : "none established";
  const optionalText = optional.length > 0 ? optional.join(", ") : "none recorded";
  return `Defining commitments: ${definingText}. Optional or contested: ${optionalText}. Priority: ${configuration.priorities.note}`;
};

const configurationCommitmentTextFor = (commitments: IdeologyConfiguration["commitments"]): string => {
  const text = commitments
    .filter((commitment) => commitment.expectedDirection !== "indeterminate")
    .slice(0, 3)
    .map((commitment) => `${commitment.label}: ${commitment.rationale}`)
    .join(" ");
  return text || "No directional commitment is established in this configuration.";
};

const configurationConceptionPostureTextFor = (configuration: IdeologyConfiguration): string => {
  const explicitCount = configuration.conceptions.filter((conception) => conception.representation === "explicit-research-conception").length;
  const facetProxyCount = configuration.conceptions.filter((conception) => conception.representation === "facet-proxy").length;
  return `${explicitCount} explicit researched conception record${explicitCount === 1 ? "" : "s"} and ${facetProxyCount} facet-proxy conception mapping${facetProxyCount === 1 ? "" : "s"}; neither is a direct respondent conception measure.`;
};

const morphologyResolutionLabels: Readonly<Record<IdeologicalMorphology["resolution"]["status"], string>> = {
  "insufficient-information": "insufficient information",
  "not-derived": "not derived",
  "coarse-neighborhood": "coarse candidate neighborhood",
  "provisional-neighborhood": "provisional candidate neighborhood",
};

const configurationRelationshipParticipantsTextFor = (relationship: IdeologyConfiguration["researchedRelationships"][number], configuration: IdeologyConfiguration): string => relationship.participants
  .map((participant) => {
    const labels = participant.commitmentIds
      .map((commitmentId) => configuration.commitments.find((commitment) => commitment.id === commitmentId)?.label)
      .filter((label): label is string => label !== undefined);
    return labels.length > 0 ? labels.join(" / ") : participant.id;
  })
  .join(" ↔ ");

const sourceLinksFor = (sourceRefs: readonly string[]): ReactNode => sourceRefs.map((sourceRef, index) => {
  const source = sourceMap.get(sourceRef);
  return source ? <span key={`${sourceRef}-${index}`}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null;
});

type MorphologyBasisRecord = IdeologicalMorphology["candidates"][number]["basis"][number];
type MorphologyDirectBasisRecord = IdeologicalMorphology["candidates"][number]["directBasis"][number];
type MorphologyRelationalBasisRecord = IdeologicalMorphology["candidates"][number]["relationalBasis"][number];

const morphologyCalculationSourceLabels: Record<MorphologyCalculationSource, string> = {
  "construct-proxy": "construct proxy",
  "facet-proxy": "facet proxy",
  "direct-item": "direct item",
  "mixed-provisional": "mixed provisional",
  none: "not used for fit",
};

const morphologyBasisStatusFor = (basis: MorphologyBasisRecord): string => {
  const calculationSource = morphologyCalculationSourceLabels[basis.calculationSource];
  if (basis.expectedDirection === "indeterminate") return `Configuration context only; no directional fit is calculated. Fit source: ${calculationSource}.`;
  if (basis.observedSignal === undefined || basis.agreement === undefined) return `No directional evidence observed for this commitment. Fit source: ${calculationSource}.`;
  const contribution = basis.contribution === undefined ? "not included" : basis.contribution.toFixed(3);
  const facetContext = basis.facetProxySignal === undefined
    ? ""
    : ` Facet context ${formatSignedSignal(basis.facetProxySignal)} is retained for provenance only.`;
  return `Observed construct signal ${formatSignedSignal(basis.observedSignal)}; ${Math.round(basis.agreement * 100)}% directional agreement; weight ${basis.weight.toFixed(3)}; weighted contribution ${contribution}. Fit source: ${calculationSource}.${facetContext}`;
};

const morphologyProfileDimensionLabelsFor = (basis: MorphologyBasisRecord, profile: BeliefProfile): string => basis.profileDimensionIds
  .map((dimensionId) => profile.structure.find((dimension) => dimension.id === dimensionId)?.label ?? dimensionId)
  .join(", ") || "No primary profile dimension recorded.";

const morphologyContextDimensionLabelsFor = (
  basis: MorphologyDirectBasisRecord | MorphologyRelationalBasisRecord,
  profile: BeliefProfile,
): string => basis.profileDimensionIds
  .map((dimensionId) => profile.structure.find((dimension) => dimension.id === dimensionId)?.label ?? dimensionId)
  .join(", ") || "No primary profile dimension recorded.";

const morphologyDirectEvidenceSummaryFor = (basis: MorphologyDirectBasisRecord, profile: BeliefProfile): string =>
  `${LAYER_LABELS[basis.layer].short} · ${basis.kind}: ${basis.optionLabel} (linked profile dimensions: ${morphologyContextDimensionLabelsFor(basis, profile)})`;

const morphologyRelationalEvidenceSummaryFor = (basis: MorphologyRelationalBasisRecord, profile: BeliefProfile): string =>
  `${LAYER_LABELS[basis.layer].short} · ${basis.kind}: ${basis.statement} (linked profile dimensions: ${morphologyContextDimensionLabelsFor(basis, profile)})`;

const morphologyEvidenceQuestionSummaryFor = (questionIds: readonly string[]): string => {
  if (questionIds.length === 0) return "No answered item evidence is attached.";
  const preview = questionIds.slice(0, 3).join(", ");
  return `${questionIds.length} answered item${questionIds.length === 1 ? "" : "s"} attached (${preview}${questionIds.length > 3 ? ", …" : ""}).`;
};

const firstUnansweredQuestion = (answers: AnswerMap): number => {
  const index = DATASET.questions.findIndex((question) => !hasAnswer(answers, question.id));
  return index < 0 ? DATASET.questions.length - 1 : index;
};

const initialSession = (): SessionState => {
  if (typeof window === "undefined" || !window.location.hash) return { answers: {}, directAnswers: {}, gapAnswers: {}, relationalAnswers: {}, view: "intro", questionIndex: 0 };
  const decoded = decodeShareFragment(window.location.hash, DATASET);
  if (!decoded.ok) return { answers: {}, directAnswers: {}, gapAnswers: {}, relationalAnswers: {}, view: "intro", questionIndex: 0, restoredNotice: decoded.reason };
  const questionIndex = firstUnansweredQuestion(decoded.answers);
  return {
    answers: decoded.answers,
    directAnswers: decoded.directAnswers ?? {},
    gapAnswers: decoded.gapAnswers ?? {},
    relationalAnswers: decoded.relationalAnswers ?? {},
    view: questionIndex === DATASET.questions.length - 1 && hasAnswer(decoded.answers, DATASET.questions[questionIndex].id) ? "results" : "quiz",
    questionIndex,
    restoredNotice: "A versioned result snapshot was restored from this link. Nothing was sent to a server.",
  };
};

const LayerRail = ({ active }: { active?: Layer }): ReactNode => (
  <div className="layer-rail" aria-label="Three layers">
    {LAYERS.map((layer, index) => (
      <div className={`layer-rail-item${active === layer ? " is-active" : ""}`} key={layer}>
        <span className="layer-rail-index">0{index + 1}</span>
        <h2 className="layer-rail-title">{LAYER_LABELS[layer].short}</h2>
        <p className="layer-rail-copy">{LAYER_LABELS[layer].long}</p>
      </div>
    ))}
  </div>
);

const MethodologyDisclosure = ({ open, onToggle }: { open: boolean; onToggle: () => void }): ReactNode => (
  <section className="methodology-disclosure" aria-labelledby="methodology-title">
    <button className="disclosure-button" type="button" aria-expanded={open} onClick={onToggle}>
      <span id="methodology-title">How this experiment works</span>
      <span className="disclosure-icon" aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    {open ? (
      <div className="methodology-panel">
        <p><strong>Three different claims.</strong> Descriptive items ask what you think is happening. Normative items ask what deserves value. Prescriptive items ask what institutions should do. Keeping the layers apart makes disagreement easier to inspect.</p>
        <p><strong>Interpretive, not scientific.</strong> Answers are aggregated into facet signals and compared with approximate editorial anchors. An internal fit is a transparent calculation over this provisional item set, not a measure of a person, a diagnosis, or a recommendation.</p>
        <p><strong>Commitment configuration.</strong> The result now starts with a stated political commitment configuration: a source-linked, cross-layer description of observed claims and response states. It is not a hidden-essence detector. Existing ideology labels remain downstream interpretive neighbors whose anchor comparisons are explained by the observed basis and the source-backed configuration lens.</p>
        <p><strong>Measurement audit.</strong> Every production prompt is audited for its bridged construct, coordinated compound wording, condition or contrast wording, cross-construct coverage, duplicate wording, and branch-coverage metadata. The current bank produces facet-proxy observations only; audit dispositions are review signals and do not silently rewrite the question bank.</p>
        <p><strong>Formula.</strong> For each observed facet, signed answers are averaged using the item effect as a weight. Anchor distance is the weighted mean of squared differences across observed facets. Neighbors are ordered by that distance; when the leading candidates are close, the interface says “low separation” instead of presenting a precise-looking percentage. When all three layers are covered, the combined reading averages their three layer-specific fits equally so one layer cannot dominate just because it has more answered items.</p>
        <dl className="methodology-list">
          <div><dt>Response scale</dt><dd>Five directional positions, plus a separate “No view yet” state.</dd></div>
          <div><dt>Missing information</dt><dd>A layer needs half of its prompts answered before it produces an interpretive result.</dd></div>
          <div><dt>Combined pattern</dt><dd>The cross-layer reading is withheld until descriptive, normative, and prescriptive layers are all covered. It is a transparent proximity signal, not an identity assignment or recommendation.</dd></div>
          <div><dt>Primary representation</dt><dd>Concepts, social scope, diagnosis, authority, distribution, institutions, political economy, and change are shown as configured item associations. Priority rules, conditions, confidence, and dissent handling remain explicit gaps.</dd></div>
          <div><dt>Data posture</dt><dd>Questions and anchors are original editorial content. Every item and anchor resolves to at least one ideology-research context source. Academic sources support construct and survey-method choices; they do not validate this project's anchor vectors or classify a respondent.</dd></div>
          <div><dt>Review posture</dt><dd>This expanded bank remains provisional. Any future candidate promotion is blocked until neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation are documented; source citations and automated checks do not establish those checks by themselves.</dd></div>
        </dl>
        <div className="taxonomy-summary">
          <p><strong>Macro, meso, and micro.</strong> The audited graph contains {canonicalTaxonomyCounts.macro} canonical macro families, {canonicalTaxonomyCounts.meso} canonical meso traditions, and {canonicalTaxonomyCounts.micro} canonical micro branches. It keeps one canonical breadcrumb for each scored neighbor while preserving hybrids, historical cases, and associated doctrines separately. Catalog-only nodes need dedicated, source-backed item coverage before scoring, while contextual bridge anchors remain visible for research but are excluded from production neighbor scoring.</p>
          <p><strong>Secondary registry.</strong> {DATASET.ideologyRegistry.length} contextual, historical, or associated entries remain queryable as provenance context without becoming scored branches: {DATASET.ideologyRegistry.map((entry) => entry.label).join(", ")}.</p>
          <p className="taxonomy-summary-label">Current macro catalog</p>
          <ul className="taxonomy-macro-list">
            {DATASET.ideologyNodes.filter((node) => node.level === "macro" && node.placement === "canonical").map((node) => (
              <li key={node.id}><span>{node.label}</span><small>{node.status === "scored" ? "scored" : "catalog context"}</small></li>
            ))}
          </ul>
          <details className="taxonomy-catalog">
            <summary>Browse the canonical meso and micro catalog</summary>
            <div className="taxonomy-catalog-grid">
              {(["meso", "micro"] as const).map((level) => (
                <div key={level}>
                  <p className="taxonomy-summary-label">{taxonomyLevelLabels[level]} · {canonicalTaxonomyCounts[level]} entries</p>
                  <ul className="taxonomy-node-list">
                    {canonicalTaxonomyNodes.filter((node) => node.level === level).map((node) => (
                      <li key={node.id}><span>{node.label}</span><small>{node.status === "scored" ? "scored anchor" : "catalog only"}</small></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
        <p className="source-list"><strong>Project inspirations.</strong> {projectInspirationSources.map((source, index) => <span key={source.id}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}. These projects inform the facet coverage, inspectability, and provenance design; this app uses original wording and does not copy their question banks or labels. The Manifesto Project record remains future-data only and is not used to calculate the current result.</p>
        <p className="source-list"><strong>Full source registry.</strong> {DATASET.sources.map((source, index) => <span key={source.id}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a> ({sourceRoleLabels[source.role]})</span>)}. CHES and Manifesto Project records are comparative-data references only and are not used to calculate the current result.</p>
      </div>
    ) : null}
  </section>
);

const ResearchWorkbench = ({ onClose }: { onClose: () => void }): ReactNode => {
  const [selectedTargetId, setSelectedTargetId] = useState(researchTargets[0]?.id ?? "");
  const [layer, setLayer] = useState<Layer>("normative");
  const [draft, setDraft] = useState<ResearchQuestionCandidate | null>(() => researchTargets[0] ? createResearchCandidate(researchTargets[0], "normative", DATASET) : null);
  const [savedCandidates, setSavedCandidates] = useState<readonly ResearchQuestionCandidate[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [auditFilter, setAuditFilter] = useState<MeasurementAuditFilter>("open-disposition");
  const [auditQuery, setAuditQuery] = useState("");

  const selectedTarget = researchTargets.find((target) => target.id === selectedTargetId);
  const curatedCandidates = curatedResearchCandidates.filter((candidate) => candidate.targetId === selectedTargetId);
  const selectedAnchorProfile = researchAnchorProfiles.find((profile) => profile.targetId === selectedTargetId);
  const selectedNeighborDiscriminants = researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === selectedTargetId);
  const selectedFalsePositiveAudits = researchFalsePositiveAudits.filter((audit) => audit.targetId === selectedTargetId);
  const selectedCoverageSummary = researchCoverageSummaries.find((summary) => summary.targetId === selectedTargetId);
  const selectedTaxonomyDecision = researchTaxonomyDecisionForTarget(selectedTargetId);
  const layerFacets = DATASET.facets.filter((facet) => facet.layer === layer);
  const domainOptions = [...new Set(DATASET.questions.filter((question) => question.layer === layer).map((question) => question.domain))];
  const sourceOptions = DATASET.sources.filter((source) => source.role === "ideology-research");
  const candidateErrors = draft ? validateResearchCandidate(draft, DATASET) : [];
  const candidateWarnings = draft ? researchCandidateWarnings(draft, selectedTarget) : [];
  const normalizedAuditQuery = auditQuery.trim().toLowerCase();
  const filteredMeasurementAudits = productionMeasurementAudits.filter((audit) => {
    if (!measurementAuditMatchesFilter(audit, auditFilter)) return false;
    if (!normalizedAuditQuery) return true;
    const searchableText = [
      audit.questionId,
      audit.prompt,
      audit.context ?? "",
      audit.domain,
      ...audit.constructIds,
      ...audit.editorialTargetNodeIds,
      ...audit.flags,
    ].join(" ").toLowerCase();
    return searchableText.includes(normalizedAuditQuery);
  });
  const displayedMeasurementAudits = filteredMeasurementAudits.slice(0, 80);

  useEffect(() => {
    if (!selectedTarget) {
      setDraft(null);
      return;
    }
    setDraft(createResearchCandidate(selectedTarget, layer, DATASET));
    setStatusMessage("");
  }, [selectedTargetId, layer]);

  const updateCandidate = <K extends keyof ResearchQuestionCandidate>(field: K, value: ResearchQuestionCandidate[K]): void => {
    setDraft((current) => current ? { ...current, [field]: value } : current);
  };

  const saveCandidate = (): void => {
    if (!draft || candidateErrors.length > 0) {
      setStatusMessage("Finish the required wording, facet, and source fields before saving this research candidate.");
      return;
    }
    const duplicate = savedCandidates.some((candidate) => candidate.id === draft.id);
    const candidate = duplicate ? { ...draft, id: `${draft.id}-${savedCandidates.length + 1}` } : draft;
    setSavedCandidates((current) => [...current, candidate]);
    setDraft(candidate);
    setStatusMessage(`Saved ${candidate.id} to this local research shelf. It is not part of production scoring.`);
  };

  const copyCandidate = async (candidate: ResearchQuestionCandidate): Promise<void> => {
    const payload = JSON.stringify(candidate, null, 2);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(payload);
      setStatusMessage(`Copied ${candidate.id} as JSON. The candidate remains research_candidate.`);
    } catch {
      setStatusMessage("Clipboard access is unavailable. Save the candidate locally or copy its JSON from the research shelf.");
    }
  };

  const selectedSourceIds = new Set(draft?.sourceIds ?? []);

  return (
    <section className="research-workbench fade-in" aria-labelledby="research-title">
      <div className="research-header">
        <div>
          <p className="eyebrow">Research workbench</p>
          <h1 id="research-title">Make the next question earn its place.</h1>
          <p className="research-lede">Use the audited ideology graph to find under-measured branches, inspect the academic context already attached to them, and draft respondent-facing research candidates. Nothing saved here changes the live quiz or its anchors.</p>
        </div>
        <div className="research-header-actions">
          <span className="research-count">{researchTargets.length} targets · {curatedResearchCandidates.length} quarantined candidates across {researchCandidateTargetCount} targets</span>
          <button className="secondary-button" type="button" onClick={onClose}>Return to reading</button>
        </div>
      </div>

      <div className="research-grid">
        <aside className="research-targets" aria-label="Under-measured ideology targets">
          <div className="research-section-label">1 / Choose a target</div>
          <label className="research-field" htmlFor="research-target">
            <span>Ideology, branch, or registry entry</span>
            <select id="research-target" value={selectedTargetId} onChange={(event) => setSelectedTargetId(event.target.value)}>
              {researchTargets.map((target) => <option key={target.id} value={target.id}>{target.label} — {researchCoverageLabels[target.measurementStatus]}</option>)}
            </select>
          </label>
          <p className="research-help">The list is derived from the current ontology and secondary registry. Status is measurement metadata, not a judgment about the ideology.</p>
          <div className="research-legend">
            {Object.entries(researchCoverageLabels).map(([status, label]) => <span key={status}><i className={`legend-dot legend-${status}`} aria-hidden="true" />{label}</span>)}
          </div>
          <div className="research-target-list" aria-label="Target status overview">
            {researchTargets.slice(0, 12).map((target) => <button className={`research-target-row${target.id === selectedTargetId ? " is-selected" : ""}`} type="button" key={target.id} onClick={() => setSelectedTargetId(target.id)}><span>{target.label}</span><small>{researchCoverageLabels[target.measurementStatus]}</small></button>)}
            {researchTargets.length > 12 ? <p className="research-help">Use the selector above to browse the remaining {researchTargets.length - 12} targets.</p> : null}
          </div>
        </aside>

        <div className="research-main">
          <section className="research-audit" aria-labelledby="measurement-audit-title">
            <div className="research-audit-header">
              <div>
                <div className="research-section-label" id="measurement-audit-title">0 / Production item review queue</div>
                <h2>Review the item before changing the model.</h2>
                <p className="research-audit-lede">This queue exposes the current production-bank audit at item level so a content reviewer can inspect the exact claim, construct bridge, legacy effect, editorial metadata, and source trail. It is read-only and editorial: these mechanical signals are not respondent evidence, expert adjudication, psychometric validation, or a reason to rewrite items automatically.</p>
              </div>
              <span className="research-audit-open-count">{measurementAuditCountForFilter("open-disposition")} open disposition signals</span>
            </div>
            <div className="research-audit-metrics" aria-label="Production item audit totals">
              <div><strong>{productionMeasurementAudits.length}</strong><span>production items audited</span></div>
              <div><strong>{measurementAuditCountForFilter("open-disposition")}</strong><span>open dispositions</span></div>
              <div><strong>{measurementAuditCountForFilter("compound-wording")}</strong><span>compound signals</span></div>
              <div><strong>{measurementAuditCountForFilter("conditional-wording")}</strong><span>condition / contrast signals</span></div>
            </div>
            <div className="research-audit-controls">
              <label className="research-field" htmlFor="measurement-audit-filter"><span>Review signal</span><select id="measurement-audit-filter" value={auditFilter} onChange={(event) => setAuditFilter(event.target.value as MeasurementAuditFilter)}>{measurementAuditFilters.map((filter) => <option key={filter} value={filter}>{measurementAuditFilterLabels[filter]} · {measurementAuditCountForFilter(filter)}</option>)}</select><small>Open disposition is the current human-review queue. Other filters expose machine flags without changing their disposition.</small></label>
              <label className="research-field" htmlFor="measurement-audit-query"><span>Find by item, construct, branch, or wording</span><input id="measurement-audit-query" type="search" value={auditQuery} onChange={(event) => setAuditQuery(event.target.value)} placeholder="For example: collectivist, democracy, or n-..." /></label>
            </div>
            <p className="research-audit-result-count" role="status">{filteredMeasurementAudits.length === 0 ? "No audit records match this filter and search." : `Showing ${displayedMeasurementAudits.length} of ${filteredMeasurementAudits.length} matching audit record${filteredMeasurementAudits.length === 1 ? "" : "s"}.`}{filteredMeasurementAudits.length > displayedMeasurementAudits.length ? " Search to narrow the queue; the complete machine-readable audit remains available through the validation script." : ""}</p>
            <div className="research-audit-list" aria-label="Production item audit records">
              {displayedMeasurementAudits.map((audit) => (
                <details className="research-audit-item" key={audit.questionId}>
                  <summary><span>{audit.questionId} · {LAYER_LABELS[audit.layer].short} · {measurementAuditDispositionLabelFor(audit.disposition)}</span><strong>{audit.prompt}</strong></summary>
                  <div className="research-audit-item-body">
                    <p><strong>Construct bridge:</strong> {audit.constructIds.map(constructLabelFor).join(" · ") || "No construct bridge recorded."}</p>
                    <p><strong>Domain:</strong> {audit.domain} · <strong>Measurement:</strong> {audit.measurementMode.replaceAll("-", " ")}</p>
                    <p><strong>Review signals:</strong> {audit.flags.length > 0 ? audit.flags.map(measurementAuditFlagLabelFor).join(" · ") : "none"}</p>
                    <p><strong>Audit rationale:</strong> {audit.rationale}</p>
                    {audit.context ? <p><strong>Context:</strong> {audit.context}</p> : null}
                    <p><strong>Legacy facet effects retained:</strong> {measurementAuditLegacyEffectsFor(audit)}</p>
                    <p><strong>Editorial target metadata:</strong> {audit.editorialTargetNodeIds.length > 0 ? audit.editorialTargetNodeIds.map(researchLabelFor).join(" · ") : "none"}</p>
                    <p><strong>Sources:</strong> {sourceLinksFor(audit.sourceRefs)}</p>
                    <p className="research-audit-boundary"><strong>Review status:</strong> mechanical signal only — independent expert adjudication has not run. Record one-claim interpretation, construct/conception, expected response process, missingness semantics, neighboring distinctions, reviewer IDs, disagreement, and adjudication outside this read-only surface before changing production measurement.</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          <section className="belief-gap-shelf" aria-labelledby="belief-gap-shelf-title">
            <div className="research-section-label" id="belief-gap-shelf-title">Underlying belief gaps</div>
            <p className="research-form-note">These {BELIEF_GAP_CANDIDATES.length} source-attributed candidates target constructs the production bank does not yet measure. They are effect-free research material: no candidate changes the quiz, anchor vectors, or morphology output.</p>
            <div className="belief-gap-candidate-list">
              {BELIEF_GAP_CANDIDATES.map((candidate) => (
                <details className="belief-gap-candidate" key={candidate.id}>
                  <summary><span>{constructLabelFor(candidate.constructId)} · {candidate.layer} · {candidate.responseFormat}</span><strong>{candidate.prompt}</strong></summary>
                  <div className="belief-gap-candidate-body">
                    <p>{candidate.context}</p>
                    <p><strong>Response options:</strong> {candidate.responseOptions.join("; ")}</p>
                    <p><strong>Gap addressed:</strong> {candidate.gapAddressed}</p>
                    <p><strong>Research rationale:</strong> {candidate.scholarlyRationale}</p>
                    <p><strong>Same-answer / different-reason risk:</strong> {candidate.sameAnswerDifferentReasonRisk}</p>
                    <p><strong>Sources:</strong> {candidate.sourceRefs.map((sourceRef) => sourceMap.get(sourceRef)?.label ?? sourceRef).join("; ")}</p>
                    <p className="belief-gap-candidate-status">Status: <code>{candidate.reviewStatus.replace("_", " ")}</code>; not ready for production deployment.</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          {selectedTarget ? (
            <>
              <article className="research-brief">
                <div className="research-brief-topline"><span className={`research-status status-${selectedTarget.measurementStatus}`}>{researchCoverageLabels[selectedTarget.measurementStatus]}</span><span>{selectedTarget.targetKind === "ideology-node" ? `${selectedTarget.level} ideology node` : "secondary registry entry"}</span></div>
                <h2>{selectedTarget.label}</h2>
                {selectedTarget.canonicalPath.length > 0 ? <p className="research-breadcrumb"><strong>Canonical path:</strong> {selectedTarget.canonicalPath.map((node) => node.label).join(" → ")}</p> : <p className="research-breadcrumb"><strong>Canonical path:</strong> none; retain the typed relation or registry status.</p>}
                <p className="research-summary">{selectedTarget.summary}</p>
                <p className="research-status-copy">{researchCoverageDescriptions[selectedTarget.measurementStatus]}</p>
                {selectedTaxonomyDecision ? (
                  <div className="research-governance-note">
                    <h3>Research taxonomy decision</h3>
                    <p><strong>{researchTaxonomyDispositionLabels[selectedTaxonomyDecision.disposition]}</strong> · {selectedTaxonomyDecision.evidenceStatus}</p>
                    <p>{selectedTaxonomyDecision.rationale}</p>
                    <p><strong>Boundary:</strong> {selectedTaxonomyDecision.boundary}</p>
                    <p><strong>Scoring consequence:</strong> {selectedTaxonomyDecision.resultingScoringStatus}. This decision does not classify respondents.</p>
                  </div>
                ) : null}
                <div className="research-metrics">
                  {LAYERS.map((researchLayer) => <div key={researchLayer}><strong>{selectedTarget.questionCounts[researchLayer]}</strong><span>dedicated {researchLayer}</span></div>)}
                  <div><strong>{selectedTarget.existingQuestionIds.length}</strong><span>linked-context items</span></div>
                </div>
                <div className="research-brief-columns">
                  <div><h3>Why coverage is insufficient</h3><ul>{selectedTarget.gapReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
                  <div><h3>Constructs in linked material</h3><p>{selectedTarget.existingConstructIds.length > 0 ? selectedTarget.existingConstructIds.map((id) => DATASET.facets.find((facet) => facet.id === id)?.label ?? id).join(", ") : "None are directly documented for this target."}</p><h3>Nearest recorded alternatives</h3><p>{selectedTarget.neighborLabels.length > 0 ? selectedTarget.neighborLabels.join(", ") : "No typed neighbor is recorded yet."}</p></div>
                </div>
                <details className="research-details">
                  <summary>Inspect questions, relations, and source register</summary>
                  <div className="research-detail-grid">
                    <div><h3>Explicit or source-linked question IDs</h3><p>{selectedTarget.existingQuestionIds.length > 0 ? selectedTarget.existingQuestionIds.join(", ") : "None found by explicit target or source-linked context."}</p></div>
                    <div><h3>Typed relations</h3><p>{selectedTarget.relations.length > 0 ? selectedTarget.relations.map((relation) => `${relation.type} ${researchTargets.find((target) => target.id === relation.targetId)?.label ?? relation.targetId}`).join("; ") : "None recorded."}</p></div>
                    <div><h3>Academic source context</h3><p>{selectedTarget.sourceRefs.map((sourceRef) => { const source = sourceMap.get(sourceRef); return source ? <a key={sourceRef} href={source.url} target="_blank" rel="noreferrer">{source.label}</a> : null; }).filter(Boolean).reduce<ReactNode[]>((items, item, index) => { if (item) items.push(index > 0 ? <span key={`separator-${index}`}>; </span> : null, item); return items; }, [])}</p></div>
                  </div>
                </details>
                <section className="research-bank" aria-labelledby="research-bank-title">
                  <div className="research-section-label" id="research-bank-title">2 / Curated research pool</div>
                  <p className="research-form-note">{curatedCandidates.length > 0 ? `These ${curatedCandidates.length} source-backed items are a quarantined authoring pool for this target. They have no scoring effects, no numeric anchor, and no respondent-facing quiz path.` : "No curated candidate block has been authored for this target yet; use the draft form below to start one."}</p>
                  {selectedAnchorProfile ? (
                    <div className="research-bank-overview">
                      <div>
                        <h3>Qualitative anchor profile</h3>
                        <p>{selectedAnchorProfile.definition}</p>
                        <p><strong>Boundary:</strong> {selectedAnchorProfile.boundary}</p>
                        <p><strong>Variants to preserve:</strong> {selectedAnchorProfile.variants.join("; ")}</p>
                      </div>
                      <div>
                        <h3>Review posture</h3>
                        <p>{selectedCoverageSummary?.contentReviewReadiness === "ready-for-expert-content-review" ? "Ready for expert content review; not ready for respondent deployment." : "Needs additional source or boundary review before any future content decision."}</p>
                        <p><strong>Remaining gaps:</strong> {selectedCoverageSummary?.remainingMeasurementGaps.join("; ") ?? "Not recorded."}</p>
                        <p><strong>Source strength:</strong> {selectedCoverageSummary?.sourceStrength ?? "not recorded"}</p>
                      </div>
                    </div>
                  ) : <p className="research-help">No qualitative profile has been recorded for this target.</p>}
                  {selectedAnchorProfile?.conceptions.length ? (
                    <div className="research-bank-columns research-profile-conceptions">
                      <div>
                        <h3>Source-backed conceptions</h3>
                        <p>These records preserve meanings that broad facets cannot represent faithfully. They are qualitative research context, not respondent observations, anchor weights, or production scores.</p>
                        <ul>
                          {selectedAnchorProfile.conceptions.map((conception) => (
                            <li key={conception.conceptId}>
                              <strong>{conception.label}</strong>
                              <small>{conception.layer} · {conception.centrality} · source-backed, non-scored</small>
                              <p>{conception.interpretation}</p>
                              <small>Sources: {sourceLinksFor(conception.sourceIds)}</small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  <div className="research-bank-list">
                    {curatedCandidates.map((candidate) => (
                      <details className="research-bank-item" key={candidate.id}>
                        <summary><span>{candidate.id} · {candidate.layer}</span><strong>{candidate.exactWording}</strong></summary>
                        <div className="research-bank-item-body">
                          <p><strong>Facet:</strong> {DATASET.facets.find((facet) => facet.id === candidate.facetId)?.label ?? candidate.facetId} · <strong>Function:</strong> {candidate.itemFunction} · <strong>Expected direction:</strong> {candidate.expectedDirection} · <strong>Confidence:</strong> {candidate.confidence}</p>
                          <p><strong>Why needed:</strong> {candidate.whyItemIsNeeded}</p>
                          <p><strong>Scholarly rationale:</strong> {candidate.scholarlyRationale}</p>
                          <p><strong>Same answer / different reason risk:</strong> {candidate.sameAnswerDifferentReasonRisk}</p>
                          <p><strong>Sources:</strong> {candidate.sourceIds.map((sourceId) => sourceMap.get(sourceId)?.label ?? sourceId).join("; ")}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="research-bank-columns">
                    <div>
                      <h3>Neighbor discriminants</h3>
                      {selectedNeighborDiscriminants.length > 0 ? <ul>{selectedNeighborDiscriminants.map((discriminant) => <li key={discriminant.targetId + "-" + discriminant.neighborId}><strong>{researchLabelFor(discriminant.neighborId)}:</strong> {discriminant.distinction} <small>Remaining ambiguity: {discriminant.remainingAmbiguity}</small></li>)}</ul> : <p>No target-specific neighbor matrix is recorded.</p>}
                    </div>
                    <div>
                      <h3>False-positive audit</h3>
                      {selectedFalsePositiveAudits.length > 0 ? <ul>{selectedFalsePositiveAudits.map((audit) => <li key={audit.profile}><strong>{audit.profile}:</strong> {audit.risk} <small>Preferred outcome: {audit.preferredOutcome}</small></li>)}</ul> : <p>No target-specific false-positive audit is recorded.</p>}
                    </div>
                  </div>
                </section>
              </article>

              <form className="research-form" onSubmit={(event) => { event.preventDefault(); saveCandidate(); }}>
                <div className="research-section-label">3 / Draft one candidate item</div>
                <p className="research-form-note">This editor follows the supplied research schema. It deliberately produces a quarantined <code>research_candidate</code>; effects, weights, anchors, and production IDs are not generated here.</p>
                <div className="research-promotion-gate" role="note" aria-labelledby="research-promotion-title"><strong id="research-promotion-title">Production promotion is blocked</strong><p>Saving or copying keeps this record in the research shelf. A future production path must pass all of these checks:</p><ul><li><strong>Neighbor distinctness:</strong> {promotionReviewStateLabels[draft?.promotionReview.neighborDistinctness ?? "pending"]}.</li><li><strong>Cross-cultural / jurisdictional:</strong> {promotionReviewStateLabels[draft?.promotionReview.crossCulturalJurisdictional ?? "pending"]}; record an explicit not-applicable decision when context does not affect interpretation.</li><li><strong>Empirical validation:</strong> {promotionReviewStateLabels[draft?.promotionReview.empiricalValidation ?? "not-run"]}; required before production promotion.</li></ul></div>
                {draft ? (
                  <>
                    <div className="research-field-grid">
                      <label className="research-field research-field-wide" htmlFor="candidate-justification"><span>Why this branch warrants separate measurement</span><textarea id="candidate-justification" rows={3} value={draft.targetJustification} onChange={(event) => updateCandidate("targetJustification", event.target.value)} placeholder="Document the substantive distinction, nearest alternative, and why shared constructs are not enough." /></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-wording"><span>Exact respondent-facing wording</span><textarea id="candidate-wording" rows={4} value={draft.exactWording} onChange={(event) => updateCandidate("exactWording", event.target.value)} placeholder="Write one neutral proposition. Do not name the ideology or a political actor." /></label>
                      <label className="research-field" htmlFor="candidate-layer"><span>Claim layer</span><select id="candidate-layer" value={draft.layer} onChange={(event) => setLayer(event.target.value as Layer)}>{LAYERS.map((candidateLayer) => <option key={candidateLayer} value={candidateLayer}>{candidateLayer} — {LAYER_LABELS[candidateLayer].long}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-domain"><span>Domain</span><select id="candidate-domain" value={draft.domain} onChange={(event) => updateCandidate("domain", event.target.value)}>{domainOptions.map((domain) => <option key={domain} value={domain}>{domain}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-facet"><span>Construct / facet</span><select id="candidate-facet" value={draft.facetId} onChange={(event) => { updateCandidate("facetId", event.target.value); updateCandidate("constructId", event.target.value); updateCandidate("axisId", `facet:${event.target.value}`); }}>{layerFacets.map((facet) => <option key={facet.id} value={facet.id}>{facet.label}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-function"><span>Item function</span><select id="candidate-function" value={draft.itemFunction} onChange={(event) => updateCandidate("itemFunction", event.target.value as ResearchQuestionCandidate["itemFunction"])}>{researchItemFunctionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-theory"><span>Theory context</span><select id="candidate-theory" value={draft.theoryContext} onChange={(event) => updateCandidate("theoryContext", event.target.value as ResearchQuestionCandidate["theoryContext"])}>{researchTheoryContextOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-direction"><span>Expected direction</span><select id="candidate-direction" value={draft.expectedDirection} onChange={(event) => updateCandidate("expectedDirection", event.target.value as ResearchQuestionCandidate["expectedDirection"])}>{researchExpectedDirectionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-confidence"><span>Confidence</span><select id="candidate-confidence" value={draft.confidence} onChange={(event) => updateCandidate("confidence", event.target.value as ResearchQuestionCandidate["confidence"])}>{researchConfidenceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                      <label className="research-field" htmlFor="candidate-format"><span>Response format</span><select id="candidate-format" value={draft.recommendedResponseFormat} onChange={(event) => updateCandidate("recommendedResponseFormat", event.target.value as ResearchQuestionCandidate["recommendedResponseFormat"])}>{researchResponseFormatOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-neighbors"><span>Neighbors this item should differentiate</span><textarea id="candidate-neighbors" rows={2} value={draft.neighborsDifferentiated.join(", ")} onChange={(event) => updateCandidate("neighborsDifferentiated", event.target.value.split(",").map((value) => value.trim()).filter(Boolean))} placeholder="Separate labels with commas" /></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-rationale"><span>Scholarly rationale</span><textarea id="candidate-rationale" rows={3} value={draft.scholarlyRationale} onChange={(event) => updateCandidate("scholarlyRationale", event.target.value)} /></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-need"><span>Why this item is needed</span><textarea id="candidate-need" rows={3} value={draft.whyItemIsNeeded} onChange={(event) => updateCandidate("whyItemIsNeeded", event.target.value)} /></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-same-reason"><span>Same-answer / different-reason risk</span><textarea id="candidate-same-reason" rows={3} value={draft.sameAnswerDifferentReasonRisk} onChange={(event) => updateCandidate("sameAnswerDifferentReasonRisk", event.target.value)} /></label>
                      <label className="research-field research-field-wide" htmlFor="candidate-sources"><span>Ideology-research sources</span><select id="candidate-sources" multiple size={Math.min(6, Math.max(3, sourceOptions.length))} value={[...selectedSourceIds]} onChange={(event) => updateCandidate("sourceIds", Array.from(event.target.selectedOptions, (option) => option.value))}>{sourceOptions.map((source) => <option key={source.id} value={source.id}>{source.label}</option>)}</select><small>Use Ctrl/Cmd-click to select more than one source. Survey-methodology sources can be added to the schema later, but at least one ideology-research source is required here.</small></label>
                    </div>
                    <details className="research-details research-risk-details"><summary>Review risks and promotion evidence</summary><div className="research-field-grid"><label className="research-field research-field-wide" htmlFor="candidate-ambiguity"><span>Potential ambiguity</span><textarea id="candidate-ambiguity" rows={2} value={draft.potentialAmbiguity} onChange={(event) => updateCandidate("potentialAmbiguity", event.target.value)} /></label><label className="research-field" htmlFor="candidate-social-risk"><span>Social desirability risk</span><textarea id="candidate-social-risk" rows={2} value={draft.socialDesirabilityRisk} onChange={(event) => updateCandidate("socialDesirabilityRisk", event.target.value)} /></label><label className="research-field" htmlFor="candidate-cultural-risk"><span>Jurisdiction / cultural risk</span><textarea id="candidate-cultural-risk" rows={2} value={draft.jurisdictionOrCulturalRisk} onChange={(event) => updateCandidate("jurisdictionOrCulturalRisk", event.target.value)} /></label><label className="research-field" htmlFor="candidate-temporal-risk"><span>Temporal stability risk</span><textarea id="candidate-temporal-risk" rows={2} value={draft.temporalStabilityRisk} onChange={(event) => updateCandidate("temporalStabilityRisk", event.target.value)} /></label><label className="research-field research-field-wide" htmlFor="candidate-neighbor-review"><span>Neighbor-distinctness review record</span><textarea id="candidate-neighbor-review" rows={3} value={draft.promotionReview.neighborDistinctnessEvidence} onChange={(event) => updateCandidate("promotionReview", { ...draft.promotionReview, neighborDistinctnessEvidence: event.target.value })} placeholder="Record the named alternatives compared, the substantive difference, and the conclusion. This does not pass the gate by itself." /></label><label className="research-field research-field-wide" htmlFor="candidate-cross-context-review"><span>Cross-cultural / jurisdictional review record</span><textarea id="candidate-cross-context-review" rows={3} value={draft.promotionReview.crossCulturalJurisdictionalEvidence} onChange={(event) => updateCandidate("promotionReview", { ...draft.promotionReview, crossCulturalJurisdictionalEvidence: event.target.value })} placeholder="Record applicable contexts, translation or jurisdiction concerns, or why this review is not applicable." /></label><label className="research-field research-field-wide" htmlFor="candidate-empirical-validation"><span>Empirical-validation record</span><textarea id="candidate-empirical-validation" rows={3} value={draft.promotionReview.empiricalValidationEvidence} onChange={(event) => updateCandidate("promotionReview", { ...draft.promotionReview, empiricalValidationEvidence: event.target.value })} placeholder="Link or summarize the later empirical validation record. This remains pending in the workbench." /></label></div></details>
                    {candidateErrors.length > 0 ? <div className="research-validation" role="alert"><strong>Required before saving</strong><ul>{candidateErrors.map((error) => <li key={error}>{error}</li>)}</ul></div> : null}
                    {candidateWarnings.length > 0 ? <div className="research-warning" role="note"><strong>Review warnings</strong><ul>{candidateWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></div> : null}
                    <div className="research-form-actions"><button className="primary-button" type="submit" disabled={candidateErrors.length > 0}>Save research candidate <span className="button-arrow" aria-hidden="true">→</span></button><button className="secondary-button" type="button" disabled={candidateErrors.length > 0} onClick={() => copyCandidate(draft)}>Copy candidate JSON</button><span className="research-lock">Status: <code>{draft.reviewStatus}</code></span></div>
                  </>
                ) : <p className="research-help">Choose a target to start a candidate.</p>}
                {statusMessage ? <p className="status-line" role="status">{statusMessage}</p> : null}
              </form>

              {savedCandidates.length > 0 ? <section className="research-shelf" aria-labelledby="research-shelf-title"><div className="research-section-label" id="research-shelf-title">4 / Local draft shelf</div>{savedCandidates.map((candidate) => <article className="research-shelf-item" key={candidate.id}><div><strong>{candidate.id}</strong><span>{candidate.layer} · {candidate.targetLabel} · {candidate.reviewStatus}</span><p>{candidate.exactWording}</p></div><div className="research-shelf-actions"><button className="secondary-button" type="button" onClick={() => copyCandidate(candidate)}>Copy JSON</button><button className="text-button" type="button" onClick={() => setSavedCandidates((current) => current.filter((item) => item.id !== candidate.id))}>Remove</button></div></article>)}</section> : null}
            </>
          ) : <p className="research-help">No research target is available in the current dataset.</p>}
        </div>
      </div>
    </section>
  );
};

const Header = ({ onMethodology, onResearch, researchActive }: { onMethodology: () => void; onResearch: () => void; researchActive: boolean }): ReactNode => (
  <header className="topbar">
    <a className="brand-lockup" href="." aria-label="Ideology layer sorter home">
      <span className="brand-mark" aria-hidden="true">IL</span>
      <span className="brand-name">Ideology / layers</span>
    </a>
    <span className="topbar-note">A small inspectable experiment</span>
    <div className="topbar-actions"><button className="topbar-action" type="button" onClick={onResearch}>{researchActive ? "Return to reading" : "Research"}</button><button className="topbar-action" type="button" onClick={onMethodology}>Methodology</button></div>
  </header>
);

const IntroView = ({ onStart, onResearch, methodologyOpen, onToggleMethodology, restoredNotice }: { onStart: () => void; onResearch: () => void; methodologyOpen: boolean; onToggleMethodology: () => void; restoredNotice?: string }): ReactNode => (
  <section className="fade-in">
    <div className="intro-grid">
      <div>
        <p className="eyebrow">A political self-reflection tool</p>
        <h1 className="display-title">Three views.<br /><em>One</em> political self.</h1>
        <p className="intro-lede">Separate what you think is true, what you think is good, and what you think should be done. The result keeps those answers in conversation without pretending they are the same thing.</p>
        <div className="intro-actions">
          <button className="primary-button" type="button" onClick={onStart}>Begin the reading <span className="button-arrow" aria-hidden="true">→</span></button>
          <span className="topbar-note">{DATASET.manifest.questionCount} prompts · {DATASET.manifest.questionsPerLayer.descriptive} per view</span>
        </div>
        {restoredNotice ? <p className="status-line" role="status">{restoredNotice}</p> : null}
      </div>
      <LayerRail active="descriptive" />
    </div>
    <section className="research-callout" aria-labelledby="research-callout-title"><div><p className="eyebrow">For item authors</p><h2 id="research-callout-title">The catalog can now tell you what it cannot measure yet.</h2><p>Open the research workbench to inspect catalog-only branches, source-linked gaps, neighbor boundaries, and draft a neutral candidate item without changing the live result.</p></div><button className="secondary-button" type="button" onClick={onResearch}>Open research workbench <span className="button-arrow" aria-hidden="true">↗</span></button></section>
    <MethodologyDisclosure open={methodologyOpen} onToggle={onToggleMethodology} />
  </section>
);

const QuizView = ({ questionIndex, answers, onAnswer, onNext, onBack }: { questionIndex: number; answers: AnswerMap; onAnswer: (value: Answer) => void; onNext: () => void; onBack: () => void }): ReactNode => {
  const question = DATASET.questions[questionIndex];
  const layerPosition = LAYERS.indexOf(question.layer);
  const currentAnswer = answers[question.id];
  const isLast = questionIndex === DATASET.questions.length - 1;
  const firstLayerBoundary = DATASET.manifest.questionsPerLayer.descriptive;
  const secondLayerBoundary = firstLayerBoundary + DATASET.manifest.questionsPerLayer.normative;
  const transitionNotice = questionIndex === firstLayerBoundary ? "You are moving from diagnosis into values. The next answers are not claims about what is true; they are about what deserves weight." : questionIndex === secondLayerBoundary ? "You are moving from values into practice. The next answers ask about institutional choices, not only about what matters." : null;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [questionIndex]);

  return (
    <section className="fade-in">
      <div className="quiz-header">
        <h1 tabIndex={-1} ref={headingRef}>{LAYER_LABELS[question.layer].question}</h1>
        <div className="progress-copy" aria-label={`Question ${questionIndex + 1} of ${DATASET.questions.length}`}>
          <strong>{LAYER_LABELS[question.layer].short} / {questionIndex + 1}</strong>
          Question {questionIndex + 1} of {DATASET.questions.length}
          <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${((questionIndex + 1) / DATASET.questions.length) * 100}%` }} /></div>
        </div>
      </div>
      <div className="quiz-grid">
        <aside className="quiz-sidebar">
          <LayerRail active={question.layer} />
          <p className="share-note">Layer {layerPosition + 1} of 3. Your answers remain in this page until you choose to create a share link.</p>
        </aside>
        <div>
          <div className="question-meta"><span className="question-domain">{question.domain}</span><span>Prompt {String(questionIndex + 1).padStart(2, "0")}</span></div>
          <h2 className="question-heading">{question.prompt}</h2>
          <p className="question-context">{question.context}</p>
          <p className="source-note">Item posture: {question.sourceType}. Sources: {question.sourceRefs.map((sourceRef, index) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}</p>
          <fieldset className="answer-fieldset">
            <legend className="sr-only">Choose how much this statement reflects your view</legend>
            <div className="answer-list">
              {answerOptions.map((option) => {
                const inputId = `answer-${question.id}-${String(option.value)}`;
                return (
                  <label className="answer-option" htmlFor={inputId} key={String(option.value)}>
                    <input className="answer-input" id={inputId} name={`answer-${question.id}`} type="radio" value={String(option.value)} checked={currentAnswer === option.value} onChange={() => onAnswer(option.value)} />
                    <span className="answer-card"><span className="answer-dot" aria-hidden="true" /><span className="answer-copy"><span className="answer-label">{option.label}</span><span className="answer-hint">{option.hint}</span></span></span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {transitionNotice ? <p className="layer-transition" role="note">{transitionNotice}</p> : null}
          <div className="quiz-footer">
            <button className="nav-button secondary" type="button" onClick={onBack}>{questionIndex === 0 ? "Leave quiz" : "Back"}</button>
            <span className="nav-status" role="status">{currentAnswer === undefined ? "Choose a response to continue." : "Response recorded for this page."}</span>
            <button className="nav-button" type="button" disabled={currentAnswer === undefined} onClick={onNext}>{isLast ? "Read the result" : "Next"} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Coverage = ({ result }: { result: LayerResult }): ReactNode => (
  <div className="coverage-row">
    <span><strong>{result.answered}</strong> of {result.total} prompts answered</span>
    <span>{Math.round(result.coverage * 100)}% coverage · <strong>{result.mixed}</strong> mixed</span>
  </div>
);

const BeliefProfileView = ({ profile }: { profile: BeliefProfile }): ReactNode => {
  const notEstablishedTensions = profile.tensions.filter((tension) => tension.status === "not-established");
  return (
    <section className="belief-profile" aria-labelledby="belief-profile-title">
      <div className="belief-profile-header">
        <div>
          <p className="eyebrow">Primary representation</p>
          <h2 id="belief-profile-title">Stated commitment configuration</h2>
          <p className="belief-profile-lede">This is a structured reading of the claims and response states expressed in this item set. It keeps concepts, causal beliefs, values, institutions, uncertainty, and unresolved gaps visible before any named ideology is shown.</p>
        </div>
        <span className="belief-profile-status">{profile.status === "insufficient-information" ? "incomplete evidence" : "provisional model · " + profile.status}</span>
      </div>
      <div className="belief-response-grid" aria-label="Response state summary">
        <div><strong>{profile.response.directional}</strong><span>directional responses</span></div>
        <div><strong>{profile.response.mixed}</strong><span>mixed / depends</span></div>
        <div><strong>{profile.response.noView}</strong><span>no view yet</span></div>
        <div><strong>{profile.response.unanswered}</strong><span>unanswered</span></div>
      </div>
      <div className="belief-audit-summary" aria-label="Measurement audit summary">
        <div><strong>{profile.measurementSummary.totalItems}</strong><span>items audited</span></div>
        <div><strong>{profile.measurementSummary.proxyItems}</strong><span>facet proxies</span></div>
        <div><strong>{profile.measurementSummary.directItems}</strong><span>direct items</span></div>
        <div><strong>{profile.measurementSummary.branchMetadataQuestionIds.length}</strong><span>branch metadata flags</span></div>
        <div><strong>{profile.measurementSummary.compoundQuestionIds.length}</strong><span>compound wording flags</span></div>
        <div><strong>{profile.measurementSummary.conditionalQuestionIds.length}</strong><span>condition / contrast flags</span></div>
        <div><strong>{Object.values(profile.measurementSummary.researchCandidateCounts).reduce((sum, count) => sum + count, 0)}</strong><span>quarantined gap candidates</span></div>
        <div><strong>{profile.gapEvidence.length}</strong><span>selected candidate responses</span></div>
      </div>
      <p className="belief-profile-note belief-audit-note">Disposition ledger: {profile.measurementSummary.dispositionCounts.preserve} preserve · {profile.measurementSummary.dispositionCounts.remap} remap · {profile.measurementSummary.dispositionCounts.rewrite} rewrite · {profile.measurementSummary.dispositionCounts.split} split · {profile.measurementSummary.dispositionCounts.redundant} redundant · {profile.measurementSummary.dispositionCounts["construct-gap"]} construct gap. These are editorial review signals, not respondent judgments.</p>
      <p className="belief-profile-note belief-audit-note">Declared construct/layer gaps: {constructLayerGapSummaryFor(profile)}. These cells identify where the production bank has no item in the construct&apos;s declared claim layer; they are coverage diagnostics, not evidence that the construct is absent from political life.</p>
      <div className="belief-structure-trace">
        <div className="belief-structure-header">
          <div>
            <h3>Integrated belief-structure trace</h3>
            <p>These dimensions keep values, concept meanings, causal beliefs, institutions, political economy, change, priorities, uncertainty, and contestation separate before morphology is derived.</p>
          </div>
          <span>{profile.structure.length} dimensions</span>
        </div>
        <div className="belief-structure-list" aria-label="Integrated belief structure dimensions">
          {profile.structure.map((dimension) => (
            <article className="belief-structure-row" key={dimension.id}>
              <div>
                <div className="belief-structure-row-topline"><h4>{dimension.label}</h4><span>{beliefStructurePostureLabels[dimension.evidencePosture]}</span></div>
                <p className="belief-structure-description">{dimension.description}</p>
                <p className="belief-structure-constructs"><strong>Construct bridge:</strong> {dimension.constructIds.map(constructLabelFor).join(" · ")}</p>
                <p className="belief-structure-signal"><strong>Profile signal:</strong> {beliefStructureSignalSummaryFor(dimension)}</p>
              </div>
              <div className="belief-structure-evidence">
                <p><strong>Evidence trace:</strong> {beliefStructureEvidenceSummaryFor(dimension)}</p>
                <p><strong>Claim layers:</strong> {beliefStructureClaimLayerSummaryFor(dimension)} observed records</p>
                <p>{dimension.evidenceQuestionIds.length} attached question record{dimension.evidenceQuestionIds.length === 1 ? "" : "s"}</p>
                {dimension.gapEvidenceIds.length > 0 ? <p><strong>Candidate formats:</strong> {dimension.gapResponseFormats.join(" · ")}</p> : null}
                <p><strong>Explicit relationship links:</strong> {beliefStructureRelatedDimensionLabelsFor(dimension, profile)}</p>
                <p className="belief-structure-gap">{dimension.gap}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="belief-profile-note">The evidence posture describes what this response set makes visible; it is not a claim that the dimension is a validated latent trait or that a relationship has been inferred from answer co-occurrence.</p>
      </div>
      <div className="belief-relational-summary" aria-label="Explicit relational evidence summary">
        {Object.entries(profile.relationalSummary).map(([key, count]) => (
          <div key={key}><strong>{count}</strong><span>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span></div>
        ))}
      </div>
      {profile.directEvidence.length > 0 ? (
        <div className="belief-direct-evidence">
          <h3>Direct categorical pilot observations</h3>
          <ul className="belief-gap-list">{profile.directEvidence.map((evidence) => <li key={evidence.id}><strong>{LAYER_LABELS[evidence.layer].short} · {evidence.kind} · {evidence.optionLabel}.</strong> {evidence.statement}<br /><small>Selected account sources: {sourceLinksFor(evidence.sourceRefs)}</small></li>)}</ul>
          <p className="belief-profile-note">These selected accounts are respondent-stated categorical evidence. The linked sources support the selected account, while the prompt&apos;s question-design basis is shown separately above. Direct evidence remains separate from scalar construct signals and is not used to change ideology affinities until measurement review is complete.</p>
        </div>
      ) : null}
      {profile.relationalEvidence.length > 0 ? (
        <div className="belief-relational-evidence">
          <h3>Explicit relational observations</h3>
          <ul className="belief-gap-list">{profile.relationalEvidence.map((evidence) => <li key={evidence.id}><strong>{LAYER_LABELS[evidence.layer].short} · {evidence.kind}.</strong> {evidence.statement}{evidence.condition ? ` Condition: ${evidence.condition}` : ""}{evidence.resolution ? ` Resolution: ${evidence.resolution}` : ""}<br /><small>Selected relationship sources: {sourceLinksFor(evidence.sourceRefs)}</small></li>)}</ul>
          <p className="belief-profile-note">These observations are carried as stated rules or tensions. The linked sources support the selected relationship, while the follow-up&apos;s question-design basis is shown separately above. They are not inferred from scalar co-occurrence and do not override missing measurement evidence.</p>
        </div>
      ) : null}
      {profile.gapEvidence.length > 0 ? (
        <div className="belief-gap-evidence">
          <h3>Research-candidate responses (quarantined)</h3>
          <ul className="belief-gap-list">{profile.gapEvidence.map((evidence) => {
            const candidate = BELIEF_GAP_CANDIDATES.find((item) => item.id === evidence.candidateId);
            return <li key={evidence.id}><strong>{LAYER_LABELS[evidence.layer].short} · {candidate?.responseFormat ?? evidence.responseFormat}.</strong> {candidate?.prompt ?? evidence.candidateId}<br /><span>Selected response: {evidence.optionText}</span><br /><small>Candidate design sources: {sourceLinksFor(evidence.sourceRefs)}</small></li>;
          })}</ul>
          <p className="belief-profile-note">These selections make the currently uncovered response seam inspectable, but they remain research-candidate evidence. They are not production questions, validated measures, selected-option truth, morphology inputs, affinity contributions, or a classification.</p>
        </div>
      ) : null}
      {profile.evidenceValidationErrors.length > 0 ? (
        <div className="belief-evidence-warning" role="alert">
          <h3>Optional evidence withheld</h3>
          <p>{profile.evidenceValidationErrors.length} optional evidence contract issue{profile.evidenceValidationErrors.length === 1 ? "" : "s"} caused the optional records to be withheld from this profile. The base quiz remains available.</p>
        </div>
      ) : null}
      {profile.diagnostics.length > 0 ? (
        <div className="belief-diagnostics" aria-label="Lowest responsible layer diagnostics">
          <div className="belief-diagnostics-header">
            <div>
              <h3>Where the evidence currently stops</h3>
              <p>These are internal measurement and inference diagnostics. They identify the lowest layer that needs more evidence or review; they are not judgments about the respondent.</p>
            </div>
            <span>{profile.diagnostics.length} diagnostic{profile.diagnostics.length === 1 ? "" : "s"}</span>
          </div>
          <ul className="belief-diagnostic-list">
            {profile.diagnostics.map((diagnostic) => (
              <li className="belief-diagnostic" key={diagnostic.id}>
                <div className="belief-diagnostic-topline"><span>{beliefDiagnosticLayerLabels[diagnostic.layer]}</span><span>{diagnostic.status.replaceAll("-", " ")}</span></div>
                <p><strong>{diagnostic.title}.</strong> {diagnostic.detail}</p>
                {diagnostic.evidenceQuestionIds.length > 0 ? <small>{diagnostic.evidenceQuestionIds.length} evidence question record{diagnostic.evidenceQuestionIds.length === 1 ? "" : "s"} attached.</small> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="belief-facet-section">
        <div className="belief-facet-header">
          <div>
            <h3>Facet evidence retained in this profile</h3>
            <p>These narrower signals remain visible beneath each broader construct. They are legacy facet proxies, not direct conceptions or validated latent scales.</p>
          </div>
          <span>{profile.facets.length} facets retained</span>
        </div>
        <div className="belief-facet-grid">
          {profile.facets.map((facet) => (
            <article className="belief-facet" key={`${facet.layer}:${facet.facetId}`}>
              <div className="belief-facet-topline"><span>{LAYER_LABELS[facet.layer].short}</span><span>{facet.measurementMode === "direct-item" ? "direct item" : "facet proxy"}</span></div>
              <h4>{facet.label}</h4>
              <p className="belief-facet-constructs">{facet.constructIds.map(constructLabelFor).join(" · ")}</p>
              {facet.signal === undefined ? <p className="belief-facet-signal belief-facet-no-signal">No directional signal</p> : (
                <div className="belief-facet-signal"><span>{formatSignedSignal(facet.signal)}</span><span className="belief-facet-meter"><span style={{ width: `${Math.round(Math.abs(facet.signal) * 100)}%` }} /></span></div>
              )}
              <p className="belief-facet-meta">{facet.response.directional + facet.response.mixed} answered · {Math.round(facet.directionalCoverage * 100)}% directional · {Math.round(facet.mixedRate * 100)}% mixed · {facet.response.noView} no view · {facet.response.unanswered} unanswered · {facet.evidenceQuestionIds.length} evidence items</p>
            </article>
          ))}
        </div>
      </div>
      <div className="belief-construct-grid">
        {profile.constructs.map((construct) => (
          <article className="belief-construct" key={construct.id}>
            <div className="belief-construct-topline"><span className={`belief-construct-status status-${construct.status}`}>{beliefStatusLabels[construct.status]}</span><span>{Math.round(construct.coverage * 100)}% mapped · {Math.round(construct.directionalCoverage * 100)}% directional</span></div>
            <h3>{construct.label}</h3>
            <p>{construct.description}</p>
            {construct.signal === undefined ? <p className="belief-construct-signal">No directional item signal is available.</p> : (
              <div className="belief-signal">
                <div><span>Observed item signal</span><strong>{formatSignedSignal(construct.signal)}</strong></div>
                <span className="belief-signal-track"><span className="belief-signal-fill" style={{ width: `${Math.round(Math.abs(construct.signal) * 100)}%` }} /></span>
              </div>
            )}
            <p className="belief-construct-meta">{construct.response.directional + construct.response.mixed} mapped responses · {Math.round(construct.mixedRate * 100)}% mixed · {construct.response.noView} no view · {construct.response.unanswered} unanswered</p>
            {construct.directEvidenceCount > 0 ? <p className="belief-construct-direct"><strong>{construct.directEvidenceCount} direct categorical pilot record{construct.directEvidenceCount === 1 ? "" : "s"} retained separately from this construct&apos;s scalar signal.</strong></p> : null}
            {construct.gapEvidenceCount > 0 ? <p className="belief-construct-direct"><strong>{construct.gapEvidenceCount} research-candidate response{construct.gapEvidenceCount === 1 ? "" : "s"} attached to this construct; the response remains quarantined and does not change its scalar signal or measurement status.</strong></p> : null}
            {construct.relationalEvidenceCount > 0 ? <p className="belief-construct-direct"><strong>{construct.relationalEvidenceCount} explicit relational record{construct.relationalEvidenceCount === 1 ? "" : "s"} attached to this construct; the record remains explanatory and does not change its scalar signal.</strong></p> : null}
            <p className="belief-construct-note">{construct.statusNote}</p>
          </article>
        ))}
      </div>
      <div className="belief-profile-columns">
        <div>
          <h3>What remains unmeasured or partial</h3>
          <ul className="belief-gap-list">{profile.gaps.map((gap) => <li key={gap}>{gap}</li>)}</ul>
        </div>
        <div>
          <h3>Conflict and uncertainty handling</h3>
          <ul className="belief-gap-list">{notEstablishedTensions.map((tension) => <li key={tension.id}><strong>{tension.title}.</strong> {tension.body}</li>)}</ul>
          <p className="belief-profile-note">Observed cross-layer pulls remain explanatory tensions below. They do not become contradiction, coherence, legitimacy, or identity judgments.</p>
        </div>
      </div>
      <p className="belief-provenance"><strong>Model provenance:</strong> {profile.provenance.map((sourceRef, index) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}. These sources support conceptual and survey-method choices; they do not validate this respondent reading.</p>
    </section>
  );
};

const BeliefDirectPilotView = ({ answers, onAnswer }: { answers: BeliefDirectAnswerMap; onAnswer: (questionId: string, optionId: string) => void }): ReactNode => {
  const answeredCount = BELIEF_DIRECT_ITEMS.filter((item) => answers[item.id] !== undefined).length;
  return (
    <section className="belief-direct-pilot" aria-labelledby="belief-direct-pilot-title">
      <div className="belief-direct-pilot-header">
        <div>
          <p className="eyebrow">Optional belief-structure pilot</p>
          <h2 id="belief-direct-pilot-title">Make the underlying account explicit</h2>
          <p className="belief-direct-pilot-lede">These eight categorical choices ask which conception, causal account, legitimacy basis, distributive reason, institutional route, economic explanation, or change path is closest to your view. They expose direct evidence without converting a category into a numerical ideology score.</p>
        </div>
        <span className="belief-profile-status">{answeredCount} of {BELIEF_DIRECT_ITEMS.length} answered</span>
      </div>
      <p className="belief-direct-pilot-note">Choose “No view yet” when none of the accounts fits or you do not have a view. The options are provisional measurement hypotheses for later cognitive, expert, cross-context, and empirical review; selecting one does not establish its truth, accuracy, or ideological meaning. Selected choices are included in a share link.</p>
      <div className="belief-direct-item-list">
        {BELIEF_DIRECT_ITEMS.map((item) => (
          <fieldset className="belief-direct-item" key={item.id}>
            <legend>{item.prompt}</legend>
            <p className="belief-direct-item-context">{item.context}</p>
            <div className="belief-direct-item-options">
              {item.options.map((option) => {
                const optionId = `${item.id}-${option.id}`;
                return (
                  <label className="belief-direct-item-option" htmlFor={optionId} key={option.id}>
                    <input id={optionId} name={item.id} type="radio" checked={answers[item.id] === option.id} onChange={() => onAnswer(item.id, option.id)} />
                    <span><strong>{option.label}</strong><small>{option.statement}</small></span>
                  </label>
                );
              })}
            </div>
            <p className="belief-direct-item-source">Question-design basis: {item.sourceRefs.map((sourceRef, index) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}</p>
          </fieldset>
        ))}
      </div>
    </section>
  );
};

const BeliefGapCandidatePilotView = ({ answers, onAnswer }: { answers: BeliefGapAnswerMap; onAnswer: (candidateId: string, optionId: string) => void }): ReactNode => {
  const answeredCount = BELIEF_GAP_CANDIDATES.filter((candidate) => answers[candidate.id] !== undefined).length;
  return (
    <section className="belief-gap-pilot" aria-labelledby="belief-gap-pilot-title">
      <div className="belief-gap-pilot-header">
        <div>
          <p className="eyebrow">Research-candidate response seam</p>
          <h2 id="belief-gap-pilot-title">Make the remaining gaps inspectable</h2>
          <p className="belief-gap-pilot-lede">These {BELIEF_GAP_CANDIDATES.length} source-attributed candidates target priority and conflict rules, epistemic stance, and heterodoxy or contestation. They expose a response path for review without adding production questions or a hidden score.</p>
        </div>
        <span className="belief-profile-status">{answeredCount} of {BELIEF_GAP_CANDIDATES.length} answered</span>
      </div>
      <p className="belief-gap-pilot-note">This is a quarantined research-candidate pilot, not a validated scale. Selected responses remain separate from production observations, scalar construct status, morphology fit, ontology affinities, and classification. Choose “No view yet” when appropriate; it is restored in a share link but is not recorded as substantive evidence.</p>
      <details className="belief-gap-pilot-disclosure" open={answeredCount > 0}>
        <summary>Open the {BELIEF_GAP_CANDIDATES.length} research-candidate prompts</summary>
        <div className="belief-gap-item-list">
          {BELIEF_GAP_CANDIDATES.map((candidate) => (
            <fieldset className="belief-gap-item" key={candidate.id}>
              <legend>{candidate.prompt}</legend>
              <p className="belief-gap-item-context">{candidate.context}</p>
              <div className="belief-gap-item-meta"><span>{constructLabelFor(candidate.constructId)}</span><span>{candidate.layer}</span><span>{candidate.responseFormat}</span></div>
              <div className="belief-gap-item-options">
                {candidate.responseOptions.map((option, optionIndex) => {
                  const optionId = beliefGapCandidateOptionIdFor(candidate, optionIndex);
                  const inputId = `gap-${candidate.id}-${optionIndex + 1}`;
                  return (
                    <label className="belief-gap-item-option" htmlFor={inputId} key={optionId}>
                      <input id={inputId} name={candidate.id} type="radio" checked={answers[candidate.id] === optionId} onChange={() => onAnswer(candidate.id, optionId)} />
                      <span><strong>{option}</strong></span>
                    </label>
                  );
                })}
              </div>
              <details className="belief-gap-item-research">
                <summary>Inspect candidate rationale and interpretation risks</summary>
                <div className="belief-gap-item-research-copy">
                  <p><strong>Gap addressed:</strong> {candidate.gapAddressed}</p>
                  <p><strong>Scholarly rationale:</strong> {candidate.scholarlyRationale}</p>
                  <p><strong>Same-answer / different-reason risk:</strong> {candidate.sameAnswerDifferentReasonRisk}</p>
                </div>
              </details>
              <p className="belief-gap-item-source">Candidate design basis: {sourceLinksFor(candidate.sourceRefs)}</p>
            </fieldset>
          ))}
        </div>
      </details>
    </section>
  );
};

const BeliefRelationalFollowUpView = ({ answers, onAnswer }: { answers: BeliefRelationalAnswerMap; onAnswer: (followUpId: string, optionId: string) => void }): ReactNode => {
  const answeredCount = BELIEF_RELATIONAL_FOLLOWUPS.filter((followUp) => answers[followUp.id] !== undefined).length;
  return (
    <section className="belief-followups" aria-labelledby="belief-followups-title">
      <div className="belief-followups-header">
        <div>
          <p className="eyebrow">Optional profile refinement</p>
          <h2 id="belief-followups-title">Clarify how your commitments relate</h2>
          <p className="belief-followups-lede">These six structured choices record explicit priority, conditionality, conflict-resolution, uncertainty, contradiction, and contestation evidence. They are kept separate from scalar facet scores and do not assign an identity.</p>
        </div>
        <span className="belief-profile-status">{answeredCount} of {BELIEF_RELATIONAL_FOLLOWUPS.length} answered</span>
      </div>
      <p className="belief-followups-note">Choose “No view yet” when the scenario does not describe your view. The sources below support question design and interpretation boundaries; they do not validate your response or establish that a selected rule is factually correct. Selected relationship choices are included in a share link alongside the base quiz answers.</p>
      <div className="belief-followup-list">
        {BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => (
          <fieldset className="belief-followup" key={followUp.id}>
            <legend>{followUp.prompt}</legend>
            <p className="belief-followup-context">{followUp.context}</p>
            <div className="belief-followup-options">
              {followUp.options.map((option) => {
                const optionId = `${followUp.id}-${option.id}`;
                return (
                  <label className="belief-followup-option" htmlFor={optionId} key={option.id}>
                    <input id={optionId} name={followUp.id} type="radio" checked={answers[followUp.id] === option.id} onChange={() => onAnswer(followUp.id, option.id)} />
                    <span><strong>{option.label}</strong><small>{option.statement}</small></span>
                  </label>
                );
              })}
            </div>
            <p className="belief-followup-source">Question-design basis: {followUp.sourceRefs.map((sourceRef, index) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{index > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}</p>
          </fieldset>
        ))}
      </div>
    </section>
  );
};

const IdeologicalMorphologyView = ({ morphology, profile }: { morphology: IdeologicalMorphology; profile: BeliefProfile }): ReactNode => {
  const candidates = morphology.candidates.slice(0, 5);
  const underDeterminedCandidates = morphology.underDeterminedCandidates.slice(0, 5);
  const underDeterminedCandidateCount = morphology.underDeterminedCandidates.length;
  const resolutionCandidates = morphology.resolution.candidateIds
    .map((candidateId) => morphology.candidates.find((candidate) => candidate.anchorId === candidateId)?.label)
    .filter((label): label is string => label !== undefined);
  return (
    <section className="belief-morphology" aria-labelledby="belief-morphology-title">
      <div className="belief-morphology-header">
        <div>
          <p className="eyebrow">Higher-order interpretation</p>
          <h2 id="belief-morphology-title">Ideological morphology candidates</h2>
          <p className="belief-morphology-lede">These candidates compare observed construct-level profile signals with source-backed configurations of existing traditions. They explain resemblance; they do not assign an identity or replace the underlying belief profile.</p>
        </div>
        <span className="belief-profile-status">{morphology.status === "provisional-candidates" ? `${morphology.candidates.length} provisional candidates` : "not derived"}</span>
      </div>
      <div className="morphology-resolution" role="note">
        <strong>Selection posture: {morphologyResolutionLabels[morphology.resolution.status]}</strong>
        <p>{morphology.resolution.rationale}</p>
        {resolutionCandidates.length > 0 ? <p><strong>Inspectable neighborhood:</strong> {resolutionCandidates.join("; ")}</p> : null}
      </div>
      {morphology.status === "insufficient-information" ? (
        <div className="belief-morphology-empty"><h3>No named morphology yet.</h3><p>{morphology.gaps[0]}</p></div>
      ) : morphology.status === "not-derived" || candidates.length === 0 ? (
        <div className="belief-morphology-empty"><h3>{underDeterminedCandidateCount > 0 ? "No provisional candidate yet." : "No configuration candidate yet."}</h3><p>{underDeterminedCandidateCount > 0 ? "The current construct evidence is retained as under-determined diagnostics, but it does not support a source-backed comparison in the provisional candidate ordering." : "The current construct evidence does not support a source-backed comparison."}</p></div>
      ) : (
        <div className="morphology-candidate-list" aria-label="Ideological morphology candidates">
          {candidates.map((candidate, index) => (
            <article className="morphology-candidate" key={candidate.anchorId}>
              <div className="morphology-candidate-rank" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
              <div className="morphology-candidate-body">
                <div className="morphology-candidate-topline"><h3>{candidate.label}</h3><span>provisional candidate</span></div>
                <p className="morphology-candidate-meta">{candidate.family} family · {Math.round(candidate.coverage * 100)}% configuration coverage · {candidate.observedDefiningCommitmentCount}/{candidate.definingCommitmentCount} defining commitments supported · {Math.round(candidate.fit * 100)}% directional agreement</p>
                <p>{candidate.explanation}</p>
                {candidate.definingCommitmentsObserved.length > 0 ? <p className="morphology-candidate-detail"><strong>Observed defining commitments:</strong> {candidate.definingCommitmentsObserved.join(", ")}</p> : null}
                {candidate.missingDefiningCommitments.length > 0 ? <p className="morphology-candidate-detail"><strong>Missing defining commitments:</strong> {candidate.missingDefiningCommitments.join(", ")}</p> : null}
                {candidate.conflictingCommitments.length > 0 ? <p className="morphology-candidate-detail"><strong>Potential counter-signals:</strong> {candidate.conflictingCommitments.join(", ")}</p> : null}
                {candidate.configuration.conceptions.length > 0 ? <p className="morphology-candidate-detail"><strong>Conceptual configuration:</strong> {configurationCommitmentTextFor(candidate.configuration.conceptualCommitments)}</p> : null}
                {candidate.configuration.conceptions.length > 0 ? <p className="morphology-candidate-detail"><strong>Conceptual evidence posture:</strong> {configurationConceptionPostureTextFor(candidate.configuration)}</p> : null}
                {candidate.configuration.causalAssumptions.length > 0 ? <p className="morphology-candidate-detail"><strong>Causal assumptions:</strong> {configurationCommitmentTextFor(candidate.configuration.causalAssumptions)}</p> : null}
                {candidate.configuration.institutionalImplications.length > 0 ? <p className="morphology-candidate-detail"><strong>Institutional implications:</strong> {configurationCommitmentTextFor(candidate.configuration.institutionalImplications)}</p> : null}
                <p className="morphology-candidate-detail"><strong>Configuration evidence:</strong> {candidate.configuration.evidencePosture.replaceAll("-", " ")}; priority and conflict rules remain {candidate.configuration.priorities.status}.</p>
                {candidate.configuration.researchedRelationships.length > 0 ? (
                  <details className="morphology-configuration-relationships">
                    <summary>Inspect researched configuration relationships ({candidate.configuration.researchedRelationships.length})</summary>
                    <div className="morphology-configuration-relationship-list">
                      {candidate.configuration.researchedRelationships.map((relationship) => (
                        <div className="morphology-configuration-relationship" key={relationship.id}>
                          <p><strong>{relationship.kind.replaceAll("-", " ")}</strong> · {configurationRelationshipParticipantsTextFor(relationship, candidate.configuration)}</p>
                          <p>{relationship.statement}</p>
                          <p className="morphology-configuration-relationship-meta">Evidence posture: {relationship.evidencePosture.replaceAll("-", " ")}. Source basis: {sourceLinksFor(relationship.sourceRefs)}</p>
                        </div>
                      ))}
                    </div>
                    <p className="morphology-configuration-relationship-note">These are sourced theoretical configuration claims, not respondent observations, calibrated priorities, or affinity weights. Profiles without an explicit relation retain a separate <code>not-established</code> gap.</p>
                  </details>
                ) : null}
                <p className="morphology-candidate-detail"><strong>Fit provenance:</strong> Each directional commitment below identifies the primary profile dimension and construct-level evidence form used for its provisional fit. A linked facet proxy is retained as context only. Direct categorical and relational records remain contextual and are excluded from affinity calculation.</p>
                <details className="morphology-evidence-details">
                  <summary>Inspect evidence trail ({candidate.basis.length} commitment records)</summary>
                  <div className="morphology-evidence-list">
                    {candidate.basis.map((basis) => (
                      <div className="morphology-evidence-row" key={`${basis.commitmentId}:${basis.constructId}`}>
                        <div className="morphology-evidence-row-head"><strong>{basis.commitmentLabel}</strong><span>{constructLabelFor(basis.constructId)} · expected {basis.expectedDirection} · {morphologyCalculationSourceLabels[basis.calculationSource]}</span></div>
                        <p>{morphologyBasisStatusFor(basis)}</p>
                        <p className="morphology-evidence-dimensions"><strong>Primary profile dimensions:</strong> {morphologyProfileDimensionLabelsFor(basis, profile)}</p>
                        <p className="morphology-evidence-questions">{morphologyEvidenceQuestionSummaryFor(basis.evidenceQuestionIds)}</p>
                        {basis.facetProxyEvidenceQuestionIds && basis.facetProxyEvidenceQuestionIds.length > 0 ? <p className="morphology-evidence-questions">Facet-context questions: {morphologyEvidenceQuestionSummaryFor(basis.facetProxyEvidenceQuestionIds)}</p> : null}
                      </div>
                    ))}
                  </div>
                  {candidate.directBasis.length > 0 ? <div className="morphology-evidence-secondary"><strong>Direct categorical pilot evidence:</strong> {candidate.directBasis.map((basis) => morphologyDirectEvidenceSummaryFor(basis, profile)).join("; ")}. It is retained for transparency and excluded from affinity calculation.</div> : null}
                  {candidate.relationalBasis.length > 0 ? <div className="morphology-evidence-secondary"><strong>Relational evidence:</strong> {candidate.relationalBasis.map((basis) => morphologyRelationalEvidenceSummaryFor(basis, profile)).join(" ")}</div> : null}
                  <p className="morphology-evidence-sources"><strong>Configuration sources:</strong> {sourceLinksFor(candidate.sourceRefs)}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
      )}
      {underDeterminedCandidateCount > 0 ? (
        <details className="morphology-underdetermined">
          <summary>{underDeterminedCandidateCount} under-determined configuration{underDeterminedCandidateCount === 1 ? "" : "s"} withheld from candidate ordering</summary>
          <div className="morphology-underdetermined-copy">
            <p>These source-backed configuration projections remain visible because the current profile does not provide enough defining evidence for provisional comparison. They are diagnostics, not ranked candidates, selected ideologies, or identity assignments.</p>
            <ul className="morphology-underdetermined-list">
              {underDeterminedCandidates.map((candidate) => {
                const missing = candidate.missingDefiningCommitments.length > 0
                  ? `Missing defining evidence: ${candidate.missingDefiningCommitments.join(", ")}.`
                  : "Defining support or total configuration coverage is insufficient for provisional ordering.";
                return <li key={candidate.anchorId}><strong>{candidate.label}</strong><span>{Math.round(candidate.coverage * 100)}% configuration coverage. {missing}</span></li>;
              })}
            </ul>
            {underDeterminedCandidateCount > underDeterminedCandidates.length ? <p className="morphology-underdetermined-more">Showing {underDeterminedCandidates.length} of {underDeterminedCandidateCount}; the complete diagnostic collection remains available in the result data.</p> : null}
          </div>
        </details>
      ) : null}
      <ul className="belief-gap-list morphology-gap-list">{morphology.gaps.map((gap) => <li key={gap}>{gap}</li>)}</ul>
    </section>
  );
};

const CoveredLayer = ({ result }: { result: Extract<LayerResult, { kind: "covered" }> }): ReactNode => (
  <>
    <div className="fit-chip">Compatibility trace: these neighbors are retained from the original observed-facet distance scorer. The belief profile and morphology above are the primary interpretation; low separation means this legacy item set does not distinguish candidates strongly.</div>
    <div className="neighbor-list" aria-label="Interpretive neighbors">
      {result.neighbors.map((neighbor, index) => (
        <article className="neighbor-item" key={neighbor.anchorId}>
          <span className="neighbor-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="neighbor-title">{neighbor.label}</h3>
            <span className="neighbor-meta">{taxonomyLevelLabels[neighbor.ontologyLevel]} · {neighbor.family} family · editorial anchor</span>
            <p className="taxonomy-path"><strong>Taxonomy:</strong> {neighbor.taxonomyPath.map((node) => node.label).join(" → ")}</p>
            {neighbor.taxonomyRelations.filter((relation) => relation.type === "hybrid-of").map((relation) => {
              const target = DATASET.ideologyNodes.find((node) => node.id === relation.targetId);
              return <p className="taxonomy-relation" key={`${relation.type}-${relation.targetId}`}><strong>Hybrid relation:</strong> {target?.label ?? relation.targetId}</p>;
            })}
            <p className="neighbor-summary">{neighbor.summary}</p>
            <p className="neighbor-note">Anchor note: {neighbor.note}</p>
            <p className="neighbor-basis"><strong>Observed inputs considered:</strong> {basisSummaryFor(neighbor.basis)}</p>
            <p className="neighbor-configuration"><strong>Configuration lens:</strong> {configurationSummaryFor(neighbor.configuration)}</p>
            <p className="neighbor-source">Evidence basis: {neighbor.sourceRefs.map((sourceRef, sourceIndex) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{sourceIndex > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}</p>
            {neighbor.separation === "low" || neighbor.tied ? <p className="tie-note">This neighbor is close to another anchor. Read the nearby possibilities together; the current items do not establish a unique label.</p> : null}
          </div>
          <span className="neighbor-fit"><strong>{neighbor.separation === "low" ? "Close" : formatFit(neighbor.fit)}</strong>{neighbor.fitLabel}</span>
        </article>
      ))}
    </div>
    <h3 className="subsection-label">Strongest facet signals</h3>
    {result.signals.length > 0 ? (
      <div className="facet-list">
        {result.signals.map((signal) => {
          const meterStyle = { width: `${Math.round(Math.abs(signal.value) * 100)}%` } as CSSProperties;
          return <div className="facet-item" key={signal.facetId}><span className="facet-name">{signal.label} <small>({signal.direction})</small></span><span className="facet-meter"><span className="facet-meter-fill" style={meterStyle} /></span><span className="facet-value">{formatFit(Math.abs(signal.value))}</span></div>;
        })}
      </div>
    ) : <p className="share-note">The answered prompts do not produce a strong directional signal in this layer.</p>}
  </>
);

const CombinedReading = ({ result }: { result: CombinedResult }): ReactNode => (
  <section className="combined-reading" aria-labelledby="combined-reading-title">
    <div className="combined-reading-header">
      <div>
        <p className="eyebrow">Compatibility baseline · across the three views</p>
        <h2 id="combined-reading-title">{result.kind === "covered" ? "A combined pattern" : "Keep the combined reading open"}</h2>
      </div>
      {result.kind === "covered" ? <span className="combined-coverage">{Math.round(result.coverage * 100)}% average layer coverage</span> : null}
    </div>
    {result.kind === "insufficient-information" ? (
      <div className="combined-insufficient">
        <h3>All three layers are needed.</h3>
        <p>The individual layer readings remain available below. This combined pattern waits until each claim type has enough answered prompts, so missing information is not silently treated as a middle position.</p>
        <p className="combined-status">Covered so far: {result.coveredLayers.length} of {result.requiredLayers.length} layers.</p>
      </div>
    ) : (
      <>
        <p className="combined-explanation">This is the retained legacy facet-distance composition of the three layer-specific readings. Each layer contributes one equally weighted anchor fit. It is shown for compatibility regression beneath the primary belief-model morphology; the label remains an editorial neighbor, not a discovered identity or a recommendation.</p>
        <div className="combined-neighbor-list" aria-label="Combined interpretive neighbors">
          {result.neighbors.map((neighbor, index) => (
            <article className="combined-neighbor-item" key={neighbor.anchorId}>
              <span className="neighbor-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="neighbor-title">{neighbor.label}</h3>
                <span className="neighbor-meta">{taxonomyLevelLabels[neighbor.ontologyLevel]} · {neighbor.family} family · combined editorial anchor</span>
                <p className="taxonomy-path"><strong>Taxonomy:</strong> {neighbor.taxonomyPath.map((node) => node.label).join(" → ")}</p>
                <div className="combined-layer-fits" aria-label={`${neighbor.label} layer contributions`}>
                  {LAYERS.map((layer) => <span key={layer}><strong>{LAYER_LABELS[layer].short}</strong><span>{formatFit(neighbor.layerFits[layer])}</span></span>)}
                </div>
                <p className="neighbor-summary">{neighbor.summary}</p>
                <p className="neighbor-basis"><strong>Observed inputs considered:</strong> {basisSummaryFor(neighbor.basis)}</p>
                <p className="neighbor-configuration"><strong>Configuration lens:</strong> {configurationSummaryFor(neighbor.configuration)}</p>
                <p className="neighbor-source">Evidence basis: {neighbor.sourceRefs.map((sourceRef, sourceIndex) => { const source = sourceMap.get(sourceRef); return source ? <span key={sourceRef}>{sourceIndex > 0 ? "; " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span> : null; })}</p>
                {neighbor.separation === "low" || neighbor.tied ? <p className="tie-note">This combined neighbor is close to another anchor. Read nearby possibilities together; the current items do not establish a unique label.</p> : null}
              </div>
              <span className="neighbor-fit"><strong>{neighbor.separation === "low" ? "Close" : formatFit(neighbor.fit)}</strong>{neighbor.fitLabel}</span>
            </article>
          ))}
        </div>
      </>
    )}
  </section>
);

const ResultsView = ({ answers, directAnswers, gapAnswers, relationalAnswers, onDirectAnswer, onGapAnswer, onRelationalAnswer, onRestart, methodologyOpen, onToggleMethodology }: { answers: AnswerMap; directAnswers: BeliefDirectAnswerMap; gapAnswers: BeliefGapAnswerMap; relationalAnswers: BeliefRelationalAnswerMap; onDirectAnswer: (questionId: string, optionId: string) => void; onGapAnswer: (candidateId: string, optionId: string) => void; onRelationalAnswer: (followUpId: string, optionId: string) => void; onRestart: () => void; methodologyOpen: boolean; onToggleMethodology: () => void }): ReactNode => {
  const directEvidence = useMemo(() => directEvidenceForAnswers(directAnswers), [directAnswers]);
  const gapEvidence = useMemo(() => gapEvidenceForAnswers(gapAnswers), [gapAnswers]);
  const relationalEvidence = useMemo(() => relationalEvidenceForAnswers(relationalAnswers), [relationalAnswers]);
  const result = useMemo(() => calculateResults(answers, DATASET, relationalEvidence, directEvidence, gapEvidence), [answers, directEvidence, gapEvidence, relationalEvidence]);
  const [shareLink, setShareLink] = useState("");
  const [shareFeedback, setShareFeedback] = useState("");

  const copyShareLink = async (): Promise<void> => {
    const fragment = encodeShareFragment(answers, DATASET, relationalAnswers, directAnswers, gapAnswers);
    const link = `${window.location.origin}${window.location.pathname}${fragment}`;
    setShareLink(link);
    try {
      if (!navigator.clipboard?.writeText) {
        setShareFeedback("The share link is ready below. Copy it manually if your browser does not expose clipboard access.");
        return;
      }
      await navigator.clipboard.writeText(link);
      setShareFeedback(relationalEvidence.length > 0 || directEvidence.length > 0 || gapEvidence.length > 0
        ? "Share link copied. It contains versioned base-quiz answers and the selected belief-structure evidence, including any quarantined research candidates."
        : "Share link copied. It contains only versioned base-quiz answers in the URL fragment.");
    } catch {
      setShareFeedback("The share link is ready below. Copy it manually if your browser blocked clipboard access.");
    }
  };

  return (
    <section className="fade-in">
      <div className="results-intro">
        <p className="eyebrow">A layered reading</p>
        <h1>Your answers have more than one shape.</h1>
        <p>This is a map of the small question set you answered, not a verdict. A close anchor means the response vector is near an editorial reference profile on the observed facets. It does not mean you belong to a label.</p>
        <div className="results-actions">
          <button className="primary-button" type="button" onClick={copyShareLink}>Create share link <span className="button-arrow" aria-hidden="true">↗</span></button>
          <button className="secondary-button" type="button" onClick={onRestart}>Start again</button>
        </div>
        {shareFeedback ? <p className="status-line" role="status">{shareFeedback}</p> : null}
        {shareLink ? <label className="share-note" htmlFor="share-link">Versioned share link<input id="share-link" value={shareLink} readOnly /></label> : null}
      </div>

      <BeliefProfileView profile={result.primary.profile} />

      <BeliefDirectPilotView answers={directAnswers} onAnswer={onDirectAnswer} />

      <BeliefGapCandidatePilotView answers={gapAnswers} onAnswer={onGapAnswer} />

      <BeliefRelationalFollowUpView answers={relationalAnswers} onAnswer={onRelationalAnswer} />

      <IdeologicalMorphologyView morphology={result.primary.morphology} profile={result.primary.profile} />

      <CombinedReading result={result.legacy.combined} />

      <div className="results-stack">
        {LAYERS.map((layer, index) => {
          const layerResult = result.legacy.layers[layer];
          return (
            <section className="result-section" key={layer} aria-labelledby={`${layer}-result-title`}>
              <div><span className="result-index">0{index + 1} / {LAYER_LABELS[layer].short}</span><p className="result-kicker">{LAYER_LABELS[layer].long}</p></div>
              <div>
                <h2 className="result-heading" id={`${layer}-result-title`}>{layerResult.kind === "covered" ? "A readable signal" : "Keep this layer open"}</h2>
                <Coverage result={layerResult} />
                {layerResult.kind === "insufficient-information" ? (
                  <div className="insufficient-state"><h3>Not enough answered here.</h3><p>“No view yet” is preserved as missing information. Answer at least half of this layer's prompts if you want its internal facets and interpretive neighbors to appear.</p></div>
                ) : <CoveredLayer result={layerResult} />}
              </div>
            </section>
          );
        })}
      </div>

      <section className="pulls-section" aria-labelledby="pulls-title">
        <h2 id="pulls-title">Where the layers pull</h2>
        {result.primary.pulls.length > 0 ? <div className="pulls-grid">{result.primary.pulls.map((pull) => <article className="pull-card" key={pull.id}><h3>{pull.title}</h3><p>{pull.body}</p><small>{pull.layers.map((layer) => LAYER_LABELS[layer].short).join(" + ")}</small></article>)}</div> : <p className="share-note">No automatic tension card was triggered by the covered layers. That is not a claim of consistency; it means this small set did not cross one of its editorial thresholds.</p>}
      </section>

      <div className="results-methodology"><MethodologyDisclosure open={methodologyOpen} onToggle={onToggleMethodology} /></div>
    </section>
  );
};

export default function App(): ReactNode {
  const [session, setSession] = useState<SessionState>(initialSession);
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  const start = (): void => setSession((current) => ({ ...current, view: "quiz", questionIndex: firstUnansweredQuestion(current.answers), restoredNotice: undefined }));
  const answer = (value: Answer): void => {
    const questionId = DATASET.questions[session.questionIndex].id;
    setSession((current) => ({ ...current, answers: { ...current.answers, [questionId]: value } }));
  };
  const directAnswer = (questionId: string, optionId: string): void => {
    setSession((current) => ({ ...current, directAnswers: { ...current.directAnswers, [questionId]: optionId } }));
  };
  const gapAnswer = (candidateId: string, optionId: string): void => {
    setSession((current) => ({ ...current, gapAnswers: { ...current.gapAnswers, [candidateId]: optionId } }));
  };
  const relationalAnswer = (followUpId: string, optionId: string): void => {
    setSession((current) => ({ ...current, relationalAnswers: { ...current.relationalAnswers, [followUpId]: optionId } }));
  };
  const next = (): void => setSession((current) => current.questionIndex >= DATASET.questions.length - 1 ? { ...current, view: "results" } : { ...current, questionIndex: current.questionIndex + 1 });
  const back = (): void => setSession((current) => current.questionIndex === 0 ? { ...current, view: "intro" } : { ...current, questionIndex: current.questionIndex - 1 });
  const toggleResearch = (): void => setSession((current) => current.view === "research"
    ? { ...current, view: current.returnView ?? "intro", returnView: undefined }
    : { ...current, view: "research", returnView: current.view });
  const restart = (): void => {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setSession({ answers: {}, directAnswers: {}, gapAnswers: {}, relationalAnswers: {}, view: "intro", questionIndex: 0 });
    setMethodologyOpen(false);
  };

  return (
    <div className="app-shell">
      <Header onMethodology={() => setMethodologyOpen((open) => !open)} onResearch={toggleResearch} researchActive={session.view === "research"} />
      <main className="main-shell">
        {session.view === "intro" ? <IntroView onStart={start} onResearch={toggleResearch} methodologyOpen={methodologyOpen} onToggleMethodology={() => setMethodologyOpen((open) => !open)} restoredNotice={session.restoredNotice} /> : null}
        {session.view === "quiz" ? <QuizView questionIndex={session.questionIndex} answers={session.answers} onAnswer={answer} onNext={next} onBack={back} /> : null}
        {session.view === "results" ? <ResultsView answers={session.answers} directAnswers={session.directAnswers} gapAnswers={session.gapAnswers} relationalAnswers={session.relationalAnswers} onDirectAnswer={directAnswer} onGapAnswer={gapAnswer} onRelationalAnswer={relationalAnswer} onRestart={restart} methodologyOpen={methodologyOpen} onToggleMethodology={() => setMethodologyOpen((open) => !open)} /> : null}
        {session.view === "research" ? <ResearchWorkbench onClose={toggleResearch} /> : null}
      </main>
      <footer className="footer-note">An original, client-only experiment. No account, remote answer storage, scientific validation, or political recommendation is implied.</footer>
    </div>
  );
}
