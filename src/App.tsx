import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { answerOptions, DATASET, sourceMap } from "./data";
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
import { LAYER_LABELS, LAYERS, type Answer, type AnswerMap, type CombinedResult, type IdeologyLevel, type Layer, type LayerResult, type ResearchQuestionCandidate, type ResearchTarget, type SourceRole } from "./types";

type PrimaryView = "intro" | "quiz" | "results";
type View = PrimaryView | "research";

type SessionState = Readonly<{
  answers: AnswerMap;
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

const researchLabelFor = (targetId: string): string =>
  researchTargets.find((target) => target.id === targetId)?.label
  ?? DATASET.ideologyNodes.find((node) => node.id === targetId)?.label
  ?? DATASET.ideologyRegistry.find((entry) => entry.id === targetId)?.label
  ?? targetId;

const hasAnswer = (answers: AnswerMap, questionId: string): boolean => answers[questionId] !== undefined;

const firstUnansweredQuestion = (answers: AnswerMap): number => {
  const index = DATASET.questions.findIndex((question) => !hasAnswer(answers, question.id));
  return index < 0 ? DATASET.questions.length - 1 : index;
};

const initialSession = (): SessionState => {
  if (typeof window === "undefined" || !window.location.hash) return { answers: {}, view: "intro", questionIndex: 0 };
  const decoded = decodeShareFragment(window.location.hash, DATASET);
  if (!decoded.ok) return { answers: {}, view: "intro", questionIndex: 0, restoredNotice: decoded.reason };
  const questionIndex = firstUnansweredQuestion(decoded.answers);
  return {
    answers: decoded.answers,
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
        <p><strong>Formula.</strong> For each observed facet, signed answers are averaged using the item effect as a weight. Anchor distance is the weighted mean of squared differences across observed facets. Neighbors are ordered by that distance; when the leading candidates are close, the interface says “low separation” instead of presenting a precise-looking percentage. When all three layers are covered, the combined reading averages their three layer-specific fits equally so one layer cannot dominate just because it has more answered items.</p>
        <dl className="methodology-list">
          <div><dt>Response scale</dt><dd>Five directional positions, plus a separate “No view yet” state.</dd></div>
          <div><dt>Missing information</dt><dd>A layer needs half of its prompts answered before it produces an interpretive result.</dd></div>
          <div><dt>Combined pattern</dt><dd>The cross-layer reading is withheld until descriptive, normative, and prescriptive layers are all covered. It is a transparent proximity signal, not an identity assignment or recommendation.</dd></div>
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

const CoveredLayer = ({ result }: { result: Extract<LayerResult, { kind: "covered" }> }): ReactNode => (
  <>
    <div className="fit-chip">Neighbors are ranked by observed facet distance; low separation means the item set does not distinguish them strongly.</div>
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
        <p className="eyebrow">Across the three views</p>
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
        <p className="combined-explanation">This is an inspectable composition of the three layer-specific readings. Each layer contributes one equally weighted anchor fit; the label remains an editorial neighbor, not a discovered identity or a recommendation.</p>
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

const ResultsView = ({ answers, onRestart, methodologyOpen, onToggleMethodology }: { answers: AnswerMap; onRestart: () => void; methodologyOpen: boolean; onToggleMethodology: () => void }): ReactNode => {
  const result = useMemo(() => calculateResults(answers, DATASET), [answers]);
  const [shareLink, setShareLink] = useState("");
  const [shareFeedback, setShareFeedback] = useState("");

  const copyShareLink = async (): Promise<void> => {
    const fragment = encodeShareFragment(answers, DATASET);
    const link = `${window.location.origin}${window.location.pathname}${fragment}`;
    setShareLink(link);
    try {
      if (!navigator.clipboard?.writeText) {
        setShareFeedback("The share link is ready below. Copy it manually if your browser does not expose clipboard access.");
        return;
      }
      await navigator.clipboard.writeText(link);
      setShareFeedback("Share link copied. It contains only versioned answers in the URL fragment.");
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

      <CombinedReading result={result.combined} />

      <div className="results-stack">
        {LAYERS.map((layer, index) => {
          const layerResult = result.layers[layer];
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
        {result.pulls.length > 0 ? <div className="pulls-grid">{result.pulls.map((pull) => <article className="pull-card" key={pull.id}><h3>{pull.title}</h3><p>{pull.body}</p><small>{pull.layers.map((layer) => LAYER_LABELS[layer].short).join(" + ")}</small></article>)}</div> : <p className="share-note">No automatic tension card was triggered by the covered layers. That is not a claim of consistency; it means this small set did not cross one of its editorial thresholds.</p>}
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
  const next = (): void => setSession((current) => current.questionIndex >= DATASET.questions.length - 1 ? { ...current, view: "results" } : { ...current, questionIndex: current.questionIndex + 1 });
  const back = (): void => setSession((current) => current.questionIndex === 0 ? { ...current, view: "intro" } : { ...current, questionIndex: current.questionIndex - 1 });
  const toggleResearch = (): void => setSession((current) => current.view === "research"
    ? { ...current, view: current.returnView ?? "intro", returnView: undefined }
    : { ...current, view: "research", returnView: current.view });
  const restart = (): void => {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setSession({ answers: {}, view: "intro", questionIndex: 0 });
    setMethodologyOpen(false);
  };

  return (
    <div className="app-shell">
      <Header onMethodology={() => setMethodologyOpen((open) => !open)} onResearch={toggleResearch} researchActive={session.view === "research"} />
      <main className="main-shell">
        {session.view === "intro" ? <IntroView onStart={start} onResearch={toggleResearch} methodologyOpen={methodologyOpen} onToggleMethodology={() => setMethodologyOpen((open) => !open)} restoredNotice={session.restoredNotice} /> : null}
        {session.view === "quiz" ? <QuizView questionIndex={session.questionIndex} answers={session.answers} onAnswer={answer} onNext={next} onBack={back} /> : null}
        {session.view === "results" ? <ResultsView answers={session.answers} onRestart={restart} methodologyOpen={methodologyOpen} onToggleMethodology={() => setMethodologyOpen((open) => !open)} /> : null}
        {session.view === "research" ? <ResearchWorkbench onClose={toggleResearch} /> : null}
      </main>
      <footer className="footer-note">An original, client-only experiment. No account, remote answer storage, scientific validation, or political recommendation is implied.</footer>
    </div>
  );
}
