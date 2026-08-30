import { RESEARCH_ANCHOR_PROFILES } from "./research-bank";
import { beliefGapCandidateCountsFor, validateBeliefGapCandidates, validateBeliefGapEvidence } from "./belief-gap-candidates";
import { BELIEF_RELATIONAL_FOLLOWUPS, validateBeliefRelationalFollowUps } from "./belief-followups";
import { validateBeliefDirectEvidence, validateBeliefDirectItems } from "./belief-direct-items";
import {
  BELIEF_CONSTRUCTS,
  LAYERS,
  type Answer,
  type AnswerMap,
  type BeliefCommitment,
  type BeliefCommitmentCentrality,
  type BeliefCommitmentDirection,
  type BeliefCandidateResponseFormat,
  type BeliefConception,
  type BeliefConstructDefinition,
  type BeliefConstructLayerCoverage,
  type BeliefConstructId,
  type BeliefDiagnostic,
  type BeliefDiagnosticLayer,
  type BeliefDirectEvidence,
  type BeliefDirectEvidenceKind,
  type BeliefConstructResult,
  type BeliefFacetResult,
  type BeliefGapEvidence,
  type BeliefItemDisposition,
  type BeliefMeasurementAudit,
  type BeliefMeasurementAuditFlag,
  type BeliefMeasurementMode,
  type BeliefMeasurementSummary,
  type BeliefMeasurementStatus,
  type BeliefObservation,
  type BeliefObservationState,
  type BeliefProfile,
  type BeliefRelationalEvidence,
  type BeliefRelationalEvidenceKind,
  type BeliefRelationalSummary,
  type BeliefResponseSummary,
  type BeliefStructureDimension,
  type BeliefStructureDimensionId,
  type BeliefStructureEvidencePosture,
  type BeliefTension,
  type CrossLayerPull,
  type Dataset,
  type IdeologyConfiguration,
  type IdeologyNodePlacement,
  type IdeologyRelationType,
  type InterpretiveBasis,
  type Layer,
  type ResearchAnchorConception,
} from "./types";

export { BELIEF_CONSTRUCTS };

export const BELIEF_MODEL_ID = "stated-political-commitment-configuration" as const;
export const BELIEF_MODEL_VERSION = 2;

export const BELIEF_MODEL_PROVENANCE = [
  "source-freeden-morphology",
  "source-adcock-collier",
  "source-morucci-irt",
  "source-aera-testing-standards",
] as const;

/**
 * This is an explicit bridge from the existing facet bank to a richer
 * conceptual vocabulary. It is deliberately separate from Question.effects:
 * changing this bridge must not silently change legacy anchor distance.
 */
export const BELIEF_FACET_CONSTRUCTS: Readonly<Record<string, readonly BeliefConstructId[]>> = {
  "structural-power": ["diagnosis-causal-account", "legitimacy-authority"],
  "market-coordination": ["political-economy", "diagnosis-causal-account"],
  "elite-autonomy": ["diagnosis-causal-account", "legitimacy-authority"],
  "cultural-causation": ["social-order-moral-scope", "concept-conception"],
  institutionalism: ["institutional-mechanism", "legitimacy-authority"],
  "ecological-limits": ["social-order-moral-scope", "diagnosis-causal-account"],
  liberty: ["concept-conception", "legitimacy-authority"],
  equality: ["distributive-principle", "concept-conception"],
  solidarity: ["social-order-moral-scope", "distributive-principle"],
  "order-tradition": ["concept-conception", "social-order-moral-scope"],
  democracy: ["legitimacy-authority"],
  universalism: ["social-order-moral-scope", "legitimacy-authority"],
  "ecological-priority": ["social-order-moral-scope"],
  "market-allocation": ["political-economy", "institutional-mechanism"],
  "public-provision": ["distributive-principle", "institutional-mechanism"],
  "public-ownership": ["political-economy", "institutional-mechanism"],
  decentralization: ["institutional-mechanism", "legitimacy-authority"],
  "state-capacity": ["institutional-mechanism", "legitimacy-authority"],
  reformism: ["change-strategy", "institutional-mechanism"],
  internationalism: ["social-order-moral-scope", "legitimacy-authority"],
};

const definition = (
  id: BeliefConstructId,
  label: string,
  description: string,
  layers: readonly Layer[],
  sourceRefs: readonly string[],
  measurementStatus: BeliefMeasurementStatus,
  measurementNote: string,
): BeliefConstructDefinition => ({ id, label, description, layers, sourceRefs, measurementStatus, measurementNote });

export const BELIEF_CONSTRUCT_DEFINITIONS: readonly BeliefConstructDefinition[] = [
  definition(
    "concept-conception",
    "Concepts and conceptions",
    "Which political idea is being invoked, and what interpretation gives it practical meaning? A shared word such as liberty or equality does not establish a shared conception.",
    ["normative", "prescriptive"],
    ["source-freeden-morphology", "source-rawls"],
    "partial",
    "The existing bank observes broad value and institutional language, but it does not directly elicit a respondent's conception of each concept.",
  ),
  definition(
    "social-order-moral-scope",
    "Social order and moral scope",
    "Who or what counts in the relevant community of obligation, membership, solidarity, or political concern, without treating moral scope as personal identity.",
    ["descriptive", "normative", "prescriptive"],
    ["source-schwartz", "source-anderson"],
    "partial",
    "Culture, nation, universalism, solidarity, and ecology items provide proxies, but layered obligations and scope conditions are not separately elicited.",
  ),
  definition(
    "diagnosis-causal-account",
    "Diagnosis and causal account",
    "What is believed to be wrong, and what mechanism is believed to cause or reproduce it? A respondent's causal belief is recorded as a claim, not as an established causal finding.",
    ["descriptive"],
    ["source-treier-hillygus", "source-north", "source-pierson"],
    "partial",
    "Descriptive items cover several mechanisms, but the current Question contract does not separately code diagnosis, mechanism, confidence, or alternative causes.",
  ),
  definition(
    "legitimacy-authority",
    "Legitimacy and authority",
    "Who may exercise power, why rule is justified or accepted, why compliance is owed, and which limits or resistance claims apply.",
    ["descriptive", "normative", "prescriptive"],
    ["source-dahl", "source-rawls", "source-jost"],
    "partial",
    "Power, democracy, institutional, and state-capacity items create a bridge, but effective, accepted, justified, and obligatory authority are not distinct response targets.",
  ),
  definition(
    "distributive-principle",
    "Distributive principle",
    "What is allocated, to whom, by which principle, and with what priority: for example equal standing, need, desert, capability, reciprocity, or common claim.",
    ["normative", "prescriptive"],
    ["source-rawls", "source-sen", "source-schwartz"],
    "partial",
    "Equality, solidarity, and provision items provide directional proxies, but the current bank does not ask respondents to distinguish competing reasons for the same policy.",
  ),
  definition(
    "institutional-mechanism",
    "Institutional mechanism",
    "Which institutions, ownership forms, decision procedures, and social arrangements are expected to realize a commitment, and through what mechanism.",
    ["descriptive", "prescriptive"],
    ["source-north", "source-ostrom", "source-dahl"],
    "partial",
    "Institutionalism, decentralization, state capacity, and provision items cover routes, but the causal link from a chosen institution to an intended outcome is not separately elicited.",
  ),
  definition(
    "political-economy",
    "Political economy",
    "How markets, ownership, labor, public goods, rent, exchange, and economic power are understood and institutionally related.",
    ["descriptive", "normative", "prescriptive"],
    ["source-bakker-jolly-polk", "source-warwick", "source-hayek"],
    "observed",
    "Economy-domain items and market, ownership, allocation, provision, and power facets provide a cross-layer proxy; it is not an empirically validated latent scale.",
  ),
  definition(
    "change-strategy",
    "Change strategy",
    "How political change should proceed: reform, transformation, restoration, gradualism, rupture, experimentation, or preservation under stated conditions.",
    ["descriptive", "normative", "prescriptive"],
    ["source-pierson", "source-rawls"],
    "observed",
    "Change-domain items and reformism provide a cross-layer proxy, but the bank does not separately capture transition sequence or acceptable cost.",
  ),
  definition(
    "priority-conflict",
    "Priority and conflict rules",
    "What happens when valued goods, groups, principles, or institutional goals conflict, including priority order, tradeoffs, exceptions, and conflict-resolution rules.",
    ["normative", "prescriptive"],
    ["source-schwartz", "source-rawls"],
    "not-yet-measured",
    "The current mixed response is not a priority rule. No item asks a respondent to order principles or choose a resolution when commitments conflict.",
  ),
  definition(
    "epistemic-stance",
    "Epistemic stance",
    "How a claim is held: confidence, uncertainty, information limits, revisability, and the difference between not knowing and holding a mixed substantive view.",
    ["descriptive", "normative"],
    ["source-aapor", "source-jost"],
    "not-yet-measured",
    "No-view and mixed are preserved as response states, but the bank does not collect confidence, reasons for uncertainty, or evidence standards.",
  ),
  definition(
    "heterodoxy-contestation",
    "Heterodoxy and contestation",
    "How internal variation, dissent, revision, opposition, and disagreement over contested political concepts are treated.",
    ["normative", "prescriptive"],
    ["source-freeden-morphology", "source-dahl"],
    "not-yet-measured",
    "Democracy and pluralism items are not a separate measure of internal revision, legitimate dissent, scholarly contestation, or opposition rights.",
  ),
];

const definitionsById = new Map(BELIEF_CONSTRUCT_DEFINITIONS.map((item) => [item.id, item]));

const unique = <T,>(items: readonly T[]): readonly T[] => [...new Set(items)];

const isNumericAnswer = (answer: Answer | undefined): answer is Exclude<Answer, "no-view"> => typeof answer === "number" && Number.isFinite(answer);

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const questionConstructIds = (question: Dataset["questions"][number]): readonly BeliefConstructId[] =>
  question.beliefConstructIds
    ? unique(question.beliefConstructIds)
    : unique(Object.keys(question.effects).flatMap((facetId) => BELIEF_FACET_CONSTRUCTS[facetId] ?? []));

/**
 * High-confidence first-pass signal for coordinated predicates or clauses.
 * Coordinated nouns and adjectives are intentionally left to the cross-
 * construct and expert-review signals instead of being called compound here.
 */
const compoundWordingPattern = /\b(?:and|or)\s+(?:(?:also|still|then|not)\s+)?(?:to\s+)?(?:is|are|was|were|be|being|been|can|could|should|would|will|may|might|must|do|does|did|have|has|had|remain|become|create|leave|protect|preserve|reduce|increase|limit|support|require|allow|make|keep|provide|shape|form|treat|recognize|include|exclude|coordinate|constrain|produce|prevent|justify|determine|govern|change|expand|abolish|direct|maintain|accept|reject|connect|separate|exist|matter|count|apply|hold|choose|prefer|avoid|challenge|influence|depend|differ|disagree|follow|give|take|share|organize|distribute|allocate|own|control|regulate|compete|mediate|resolve|revise|question|contest|resist|adapt|transform|replace|retain|establish|defend|oppose|permit|enable|expose|shift|transfer|achieve|succeed|fail|threaten|reproduce|combine|balance|weigh|prioritize|order|rank|decide|learn|know|understand|believe|expect|assume|claim|regard|view|seem|tend|open)\b/i;

/**
 * Condition and contrast wording is not automatically a double-barrelled
 * item, but it changes the response process and must remain reviewable.
 */
const conditionalWordingPattern = /\b(?:unless|when|only if|provided that|as long as|even if|even when|whenever|whereas|while|rather than)\b/i;

/**
 * A wording flag must concern what the respondent is asked, not the hidden
 * branch used to author or research a question. This conservative pattern
 * catches explicit requests for a named ideology or self-identification while
 * leaving ordinary political-tradition claims available for content review.
 */
const ideologyCodedWordingPattern = /\b(?:which|what)\s+(?:political\s+)?(?:ideology|tradition|movement|label)\b|\b(?:do|would)\s+you\s+(?:identify|align|belong|associate)\b|\b(?:identify|align|belong|associate)\s+(?:yourself\s+)?(?:with|as)\b/i;

const normalizedPromptFor = (prompt: string): string => prompt.trim().toLocaleLowerCase().replace(/\s+/g, " ");

const beliefItemDispositionFor = (
  flags: readonly string[],
  constructIds: readonly BeliefConstructId[],
): BeliefItemDisposition => {
  if (constructIds.length === 0) return "construct-gap";
  if (flags.includes("duplicate-wording")) return "redundant";
  if (flags.includes("compound-wording") && flags.includes("cross-construct")) return "split";
  if (flags.includes("compound-wording")) return "rewrite";
  if (flags.includes("ideology-coded-wording")) return "remap";
  return "preserve";
};

const beliefItemRationaleFor = (disposition: BeliefItemDisposition, flags: readonly string[]): string => {
  if (disposition === "construct-gap") return "The legacy effect map does not identify an underlying construct; this item cannot be used by the belief bridge until it is reviewed.";
  if (disposition === "redundant") return "The normalized wording duplicates another production item; retain only after a content review confirms that the duplicate is intentional.";
  if (disposition === "split") return "The item combines multiple bridged constructs and uses compound wording; split into single-claim items before treating it as direct construct evidence.";
  if (disposition === "rewrite") return "The item contains compound or conditional wording; rewrite it around one claim before treating it as direct construct evidence.";
  if (disposition === "remap") return "The respondent-facing wording asks for a named ideology or self-identification; remap it to an underlying belief claim before using it as construct evidence.";
  if (flags.includes("conditional-wording")) return "The item uses condition or contrast wording; preserve it as a review signal until response-process review confirms that its scope and exception are interpreted consistently.";
  if (flags.includes("cross-construct")) return "The item is retained as a legacy facet proxy spanning more than one construct; no construct-specific validity is claimed.";
  return "The item is retained as a single-bridge legacy facet proxy pending response-process and construct-validity review.";
};

/**
 * Audits every production question without silently rewriting it. A flag is a
 * review signal for future cognitive/item review, not evidence that an item is
 * unusable. targetNodeIds are intentionally reported as editorial metadata and
 * never used as respondent evidence by the profile calculation.
 */
export const auditBeliefMeasurement = (dataset: Dataset): readonly BeliefMeasurementAudit[] => {
  const promptCounts = new Map<string, number>();
  for (const question of dataset.questions) {
    const key = normalizedPromptFor(question.prompt);
    promptCounts.set(key, (promptCounts.get(key) ?? 0) + 1);
  }
  return dataset.questions.map((question) => {
  const facetIds = Object.keys(question.effects);
  const constructIds = questionConstructIds(question);
    const flags: BeliefMeasurementAuditFlag[] = [];
    if (question.targetNodeIds && question.targetNodeIds.length > 0) flags.push("branch-target-metadata");
    if (ideologyCodedWordingPattern.test(question.prompt)) flags.push("ideology-coded-wording");
    if (compoundWordingPattern.test(question.prompt)) flags.push("compound-wording");
    if (conditionalWordingPattern.test(question.prompt)) flags.push("conditional-wording");
    if (constructIds.length > 1) flags.push("cross-construct");
  if ((promptCounts.get(normalizedPromptFor(question.prompt)) ?? 0) > 1) flags.push("duplicate-wording");
  const disposition = beliefItemDispositionFor(flags, constructIds);
  return {
    questionId: question.id,
    layer: question.layer,
    prompt: question.prompt,
    ...(question.context ? { context: question.context } : {}),
    domain: question.domain,
    facetIds,
    legacyEffects: question.effects,
    editorialTargetNodeIds: question.targetNodeIds ?? [],
    constructIds,
    flags,
    disposition,
    measurementMode: question.beliefMeasurementMode ?? "facet-proxy",
    rationale: beliefItemRationaleFor(disposition, flags),
    sourceRefs: question.sourceRefs,
  };
  });
};

export const validateBeliefModel = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const definitionIds = new Set(BELIEF_CONSTRUCT_DEFINITIONS.map((item) => item.id));

  errors.push(...validateBeliefGapCandidates(dataset));

  if (BELIEF_CONSTRUCT_DEFINITIONS.length !== BELIEF_CONSTRUCTS.length) {
    errors.push("belief construct definitions do not cover the declared construct registry");
  }
  for (const sourceRef of BELIEF_MODEL_PROVENANCE) {
    if (!sourceIds.has(sourceRef)) errors.push(`belief model references missing source ${sourceRef}`);
  }
  for (const item of BELIEF_CONSTRUCT_DEFINITIONS) {
    if (!definitionIds.has(item.id)) errors.push(`belief construct ${item.id} is not registered`);
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief construct ${item.id} references missing source ${sourceRef}`);
    }
  }
  for (const facet of dataset.facets) {
    if (!(facet.id in BELIEF_FACET_CONSTRUCTS)) errors.push(`facet ${facet.id} has no belief construct bridge`);
  }
  const audits = auditBeliefMeasurement(dataset);
  const auditIds = new Set<string>();
  for (const audit of audits) {
    if (auditIds.has(audit.questionId)) errors.push(`duplicate belief audit question id ${audit.questionId}`);
    auditIds.add(audit.questionId);
    if (audit.constructIds.length === 0) errors.push(`question ${audit.questionId} has no belief construct bridge`);
    for (const constructId of audit.constructIds) {
      if (!definitionIds.has(constructId)) errors.push(`question ${audit.questionId} references unknown belief construct ${constructId}`);
    }
    const question = dataset.questions.find((candidate) => candidate.id === audit.questionId);
    if (audit.measurementMode === "direct-item" && !question?.beliefConstructIds) {
      errors.push(`direct belief item ${audit.questionId} is missing an explicit construct declaration`);
    }
    if (question?.beliefMeasurementMode === "direct-item" && question.beliefConstructIds?.length === 0) {
      errors.push(`direct belief item ${audit.questionId} declares no constructs`);
    }
    for (const sourceRef of audit.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief audit ${audit.questionId} references missing source ${sourceRef}`);
    }
  }
  if (auditIds.size !== dataset.questions.length) errors.push("belief measurement audit does not cover every production question");
  errors.push(...validateIdeologyConfigurations(dataset));
  errors.push(...validateBeliefDirectItems(dataset));
  errors.push(...validateBeliefRelationalFollowUps(dataset));
  return errors;
};

const BELIEF_RELATIONAL_EVIDENCE_KINDS: readonly BeliefRelationalEvidenceKind[] = [
  "priority",
  "conditional",
  "conflict-resolution",
  "uncertainty",
  "contradiction",
  "contestation",
];

export const RELATIONAL_CONSTRUCT_FOR_KIND: Readonly<Record<BeliefRelationalEvidenceKind, BeliefConstructId>> = {
  priority: "priority-conflict",
  conditional: "priority-conflict",
  "conflict-resolution": "priority-conflict",
  uncertainty: "epistemic-stance",
  contradiction: "priority-conflict",
  contestation: "heterodoxy-contestation",
};

const sameIdSet = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((id) => right.includes(id));

/**
 * Validates explicit relational evidence at the boundary where future direct
 * items or synthetic fixtures enter the profile. A scalar answer may not be
 * promoted into one of these records implicitly.
 */
export const validateBeliefRelationalEvidence = (
  evidence: readonly BeliefRelationalEvidence[],
  dataset: Dataset,
): readonly string[] => {
  const errors: string[] = [];
  const constructIds = new Set<BeliefConstructId>(BELIEF_CONSTRUCTS);
  const questionIds = new Set([
    ...dataset.questions.map((question) => question.id),
    ...BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => followUp.id),
  ]);
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const evidenceIds = new Set<string>();
  const followUpById = new Map(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, followUp]));
  for (const item of evidence) {
    if (evidenceIds.has(item.id)) errors.push(`duplicate belief relational evidence id ${item.id}`);
    evidenceIds.add(item.id);
    if (!BELIEF_RELATIONAL_EVIDENCE_KINDS.includes(item.kind)) errors.push(`belief relational evidence ${item.id} has unknown kind ${item.kind}`);
    if (item.constructIds.length === 0) errors.push(`belief relational evidence ${item.id} has no construct links`);
    const relationalConstruct = RELATIONAL_CONSTRUCT_FOR_KIND[item.kind];
    if (relationalConstruct && !item.constructIds.includes(relationalConstruct)) {
      errors.push(`belief relational evidence ${item.id} must link its ${item.kind} record to ${relationalConstruct}`);
    }
    for (const constructId of item.constructIds) {
      if (!constructIds.has(constructId)) errors.push(`belief relational evidence ${item.id} references unknown construct ${constructId}`);
    }
    if (!item.statement.trim()) errors.push(`belief relational evidence ${item.id} is missing a statement`);
    if (item.kind === "priority" && item.constructIds.length < 2) errors.push(`priority evidence ${item.id} must link competing constructs`);
    if (item.kind === "conditional" && !item.condition?.trim()) errors.push(`conditional evidence ${item.id} is missing a stated condition`);
    if (typeof item.optionId !== "string" || !item.optionId.trim()) errors.push(`belief relational evidence ${item.id} is missing an option id`);
    const referencedFollowUpIds = item.evidenceQuestionIds.filter((questionId) => followUpById.has(questionId));
    if (referencedFollowUpIds.length > 1) errors.push(`belief relational evidence ${item.id} references multiple follow-up questions`);
    const followUp = referencedFollowUpIds.length === 1 ? followUpById.get(referencedFollowUpIds[0]) : undefined;
    if (followUp) {
      if (followUp.layer !== item.layer) errors.push(`belief relational evidence ${item.id} has a mismatched follow-up layer`);
      if (followUp.kind !== item.kind) errors.push(`belief relational evidence ${item.id} has a mismatched follow-up kind`);
      if (item.evidenceQuestionIds.length !== 1 || item.evidenceQuestionIds[0] !== followUp.id) errors.push(`belief relational evidence ${item.id} must point only to its follow-up question`);
      if (!sameIdSet(item.constructIds, followUp.constructIds)) errors.push(`belief relational evidence ${item.id} has mismatched follow-up construct links`);
      const option = followUp.options.find((candidate) => candidate.id === item.optionId);
      if (!option || option.record === false) errors.push(`belief relational evidence ${item.id} references an unavailable follow-up option`);
      if (option && option.record !== false) {
        if (item.statement !== option.statement) errors.push(`belief relational evidence ${item.id} has mismatched follow-up statement`);
        if (item.rule !== option.rule) errors.push(`belief relational evidence ${item.id} has mismatched follow-up rule`);
        if (item.condition !== option.condition) errors.push(`belief relational evidence ${item.id} has mismatched follow-up condition`);
        if (item.resolution !== option.resolution) errors.push(`belief relational evidence ${item.id} has mismatched follow-up resolution`);
        if (item.confidence !== option.confidence) errors.push(`belief relational evidence ${item.id} has mismatched follow-up confidence`);
        if (!sameIdSet(item.sourceRefs, option.sourceRefs)) errors.push(`belief relational evidence ${item.id} has mismatched option source links`);
      }
      if (item.sourceRefs.length === 0) errors.push(`belief relational evidence ${item.id} has no source links`);
    }
    for (const questionId of item.evidenceQuestionIds) {
      if (!questionIds.has(questionId)) errors.push(`belief relational evidence ${item.id} references missing question ${questionId}`);
    }
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief relational evidence ${item.id} references missing source ${sourceRef}`);
    }
  }
  return errors;
};

const responseSummaryFor = (questionIds: readonly string[], answers: AnswerMap): BeliefResponseSummary => {
  let directional = 0;
  let mixed = 0;
  let noView = 0;
  let unanswered = 0;
  for (const questionId of questionIds) {
    const answer = answers[questionId];
    if (answer === undefined) unanswered += 1;
    else if (answer === "no-view") noView += 1;
    else if (answer === 0) mixed += 1;
    else if (isNumericAnswer(answer)) directional += 1;
    else unanswered += 1;
  }
  return { total: questionIds.length, directional, mixed, noView, unanswered };
};

const layerCoverageFor = (questionIds: readonly string[], answers: AnswerMap, dataset: Dataset): Readonly<Record<Layer, number>> =>
  Object.fromEntries(LAYERS.map((layer) => {
    const layerQuestionIds = new Set(dataset.questions.filter((question) => question.layer === layer && questionIds.includes(question.id)).map((question) => question.id));
    const answered = [...layerQuestionIds].filter((questionId) => isNumericAnswer(answers[questionId])).length;
    return [layer, layerQuestionIds.size === 0 ? 0 : answered / layerQuestionIds.size];
  })) as Record<Layer, number>;

const observationStateFor = (answer: Answer | undefined): BeliefObservationState => {
  if (answer === undefined) return "unanswered";
  if (answer === "no-view") return "no-view";
  if (answer === 0) return "mixed";
  return "directional";
};

const observationValueFor = (answer: Answer | undefined): number | undefined =>
  isNumericAnswer(answer) && answer !== 0 ? answer / 2 : undefined;

const facetSignalFor = (facetId: string, observations: readonly BeliefObservation[]): number | undefined => {
  let numerator = 0;
  let denominator = 0;
  for (const observation of observations) {
    // A mixed response is an explicit ambiguity/ambivalence state, not a
    // directional zero. Keep it in the response summary, but do not let it
    // dilute or manufacture a directional facet signal.
    if (observation.facetId !== facetId || observation.state !== "directional" || observation.value === undefined) continue;
    numerator += observation.value * observation.effect;
    denominator += observation.weight;
  }
  return denominator === 0 ? undefined : clamp(numerator / denominator, -1, 1);
};

export const beliefObservationsFor = (
  answers: AnswerMap,
  dataset: Dataset,
  audits: readonly BeliefMeasurementAudit[] = auditBeliefMeasurement(dataset),
): readonly BeliefObservation[] => {
  const questionsById = new Map(dataset.questions.map((question) => [question.id, question]));
  return audits.flatMap((audit) => {
    const question = questionsById.get(audit.questionId);
    if (!question) return [];
    const answer = answers[question.id];
    const state = observationStateFor(answer);
    const value = observationValueFor(answer);
    if (audit.measurementMode === "direct-item") {
      // Direct items are construct observations, not facet observations. They
      // may retain an empty or legacy effects map for the old scorer, but that
      // map must not duplicate or redirect the explicitly declared evidence.
      return audit.constructIds.map((constructId) => ({
        id: `${question.id}:direct:${constructId}`,
        questionId: question.id,
        layer: question.layer,
        constructId,
        state,
        ...(value === undefined ? {} : { value }),
        effect: 1,
        weight: 1,
        measurementMode: audit.measurementMode,
        sourceRefs: audit.sourceRefs,
      }));
    }
    return Object.entries(question.effects).flatMap(([facetId, effect]) => {
      if (!Number.isFinite(effect) || effect === 0) return [];
      const constructIds = BELIEF_FACET_CONSTRUCTS[facetId] ?? [];
      return constructIds.map((constructId) => ({
        id: `${question.id}:${facetId}:${constructId}`,
        questionId: question.id,
        layer: question.layer,
        constructId,
        facetId,
        state,
        ...(value === undefined ? {} : { value }),
        effect,
        weight: Math.abs(effect),
        measurementMode: audit.measurementMode,
        sourceRefs: audit.sourceRefs,
      }));
    });
  });
};

const facetResultFor = (
  facet: Dataset["facets"][number],
  answers: AnswerMap,
  dataset: Dataset,
  observations: readonly BeliefObservation[],
  audits: readonly BeliefMeasurementAudit[],
): BeliefFacetResult => {
  const questionIds = dataset.questions
    .filter((question) => question.layer === facet.layer && Number.isFinite(question.effects[facet.id]) && question.effects[facet.id] !== 0)
    .map((question) => question.id);
  const response = responseSummaryFor(questionIds, answers);
  const answered = response.directional + response.mixed;
  const facetAudits = audits.filter((audit) => audit.questionId !== "" && questionIds.includes(audit.questionId));
  const measurementMode: BeliefMeasurementMode = facetAudits.some((audit) => audit.measurementMode === "direct-item") ? "direct-item" : "facet-proxy";
  const evidenceQuestionIds = unique(observations
    .filter((observation) => observation.facetId === facet.id && (observation.state === "directional" || observation.state === "mixed"))
    .map((observation) => observation.questionId));
  const directionalEvidenceQuestionIds = unique(observations
    .filter((observation) => observation.facetId === facet.id && observation.state === "directional" && observation.value !== undefined)
    .map((observation) => observation.questionId));
  const mixedQuestionIds = unique(observations
    .filter((observation) => observation.facetId === facet.id && observation.state === "mixed")
    .map((observation) => observation.questionId));
  const signal = facetSignalFor(facet.id, observations);
  return {
    facetId: facet.id,
    layer: facet.layer,
    label: facet.label,
    constructIds: BELIEF_FACET_CONSTRUCTS[facet.id] ?? [],
    response,
    coverage: response.total === 0 ? 0 : answered / response.total,
    directionalCoverage: response.total === 0 ? 0 : response.directional / response.total,
    mixedRate: response.total === 0 ? 0 : response.mixed / response.total,
    measurementMode,
    ...(signal === undefined ? {} : { signal }),
    evidenceQuestionIds,
    directionalEvidenceQuestionIds,
    mixedQuestionIds,
  };
};

const constructSignalFor = (constructId: BeliefConstructId, observations: readonly BeliefObservation[]): number | undefined => {
  let numerator = 0;
  let denominator = 0;
  for (const observation of observations) {
    if (observation.constructId !== constructId || observation.state !== "directional" || observation.value === undefined) continue;
    const constructIds = observation.measurementMode === "direct-item"
      ? [observation.constructId]
      : observation.facetId ? BELIEF_FACET_CONSTRUCTS[observation.facetId] ?? [] : [];
    const share = constructIds.length > 0 ? 1 / constructIds.length : 1;
    numerator += observation.value * observation.effect * share;
    denominator += observation.weight * share;
  }
  return denominator === 0 ? undefined : clamp(numerator / denominator, -1, 1);
};

const constructResultFor = (
  definition: BeliefConstructDefinition,
  answers: AnswerMap,
  dataset: Dataset,
  observations: readonly BeliefObservation[],
  audits: readonly BeliefMeasurementAudit[],
  directEvidence: readonly BeliefDirectEvidence[],
  gapEvidence: readonly BeliefGapEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): BeliefConstructResult => {
  const questionIds = audits.filter((audit) => audit.constructIds.includes(definition.id)).map((audit) => audit.questionId);
  const response = responseSummaryFor(questionIds, answers);
  const answered = response.directional + response.mixed;
  const coverage = response.total === 0 ? 0 : answered / response.total;
  const constructObservations = observations.filter((observation) => observation.constructId === definition.id);
  const constructDirectEvidence = directEvidence.filter((evidence) => evidence.constructIds.includes(definition.id));
  const constructGapEvidence = gapEvidence.filter((evidence) => evidence.constructId === definition.id);
  const constructRelationalEvidence = relationalEvidence.filter((evidence) => evidence.constructIds.includes(definition.id));
  const directObservationCount = constructObservations.filter((observation) => observation.measurementMode === "direct-item").length;
  const proxyObservationCount = constructObservations.filter((observation) => observation.measurementMode === "facet-proxy").length;
  const status: BeliefMeasurementStatus = definition.measurementStatus === "not-yet-measured"
    ? directObservationCount > 0 ? "partial" : "not-yet-measured"
      : answered === 0
        ? "partial"
      : definition.measurementStatus === "partial" || coverage < 1 || response.mixed > 0
        ? "partial"
        : "observed";
  const evidenceQuestionIds = unique(constructObservations
    .filter((observation) => observation.state === "directional" || observation.state === "mixed")
    .map((observation) => observation.questionId));
  const directionalEvidenceQuestionIds = unique(constructObservations
    .filter((observation) => observation.state === "directional" && observation.value !== undefined)
    .map((observation) => observation.questionId));
  const mixedQuestionIds = unique(constructObservations
    .filter((observation) => observation.state === "mixed")
    .map((observation) => observation.questionId));
  const observedFacetIds = unique(constructObservations
    .filter((observation) => observation.value !== undefined)
    .map((observation) => observation.facetId)
    .filter((facetId): facetId is string => facetId !== undefined));
  const signal = constructSignalFor(definition.id, constructObservations);
  return {
    id: definition.id,
    label: definition.label,
    description: definition.description,
    status,
    measurementMode: directObservationCount > 0 ? "direct-item" : "facet-proxy",
    statusNote: definition.measurementNote,
    response,
    coverage,
    directionalCoverage: response.total === 0 ? 0 : response.directional / response.total,
    mixedRate: response.total === 0 ? 0 : response.mixed / response.total,
    layerCoverage: layerCoverageFor(questionIds, answers, dataset),
    ...(signal === undefined ? {} : { signal }),
    observationCount: constructObservations.length,
    directObservationCount,
    proxyObservationCount,
    directEvidenceCount: constructDirectEvidence.length,
    directEvidenceIds: constructDirectEvidence.map((evidence) => evidence.id),
    directEvidenceQuestionIds: unique(constructDirectEvidence.flatMap((evidence) => evidence.evidenceQuestionIds)),
    gapEvidenceCount: constructGapEvidence.length,
    gapEvidenceIds: constructGapEvidence.map((evidence) => evidence.id),
    gapResponseFormats: unique(constructGapEvidence.map((evidence) => evidence.responseFormat)),
    relationalEvidenceCount: constructRelationalEvidence.length,
    relationalEvidenceIds: constructRelationalEvidence.map((evidence) => evidence.id),
    observedFacetIds,
    evidenceQuestionIds,
    directionalEvidenceQuestionIds,
    mixedQuestionIds,
    sourceRefs: unique([...definition.sourceRefs, ...constructGapEvidence.flatMap((evidence) => evidence.sourceRefs)]),
  };
};

const emptyDispositionCounts = (): Record<BeliefItemDisposition, number> => ({
  preserve: 0,
  remap: 0,
  rewrite: 0,
  split: 0,
  redundant: 0,
  "construct-gap": 0,
});

const measurementSummaryFor = (
  audits: readonly BeliefMeasurementAudit[],
): BeliefMeasurementSummary => {
  const dispositionCounts = emptyDispositionCounts();
  const constructItemCounts = Object.fromEntries(BELIEF_CONSTRUCTS.map((constructId) => [constructId, 0])) as Record<BeliefConstructId, number>;
  const constructLayerItemCounts = Object.fromEntries(BELIEF_CONSTRUCTS.map((constructId) => [
    constructId,
    Object.fromEntries(LAYERS.map((layer) => [layer, 0])) as Record<Layer, number>,
  ])) as Record<BeliefConstructId, Record<Layer, number>>;
  const duplicateQuestionIds: string[] = [];
  const compoundQuestionIds: string[] = [];
  const conditionalQuestionIds: string[] = [];
  const branchMetadataQuestionIds: string[] = [];
  const ideologyCodedQuestionIds: string[] = [];
  let proxyItems = 0;
  let directItems = 0;
  for (const audit of audits) {
    dispositionCounts[audit.disposition] += 1;
    if (audit.measurementMode === "facet-proxy") proxyItems += 1;
    else directItems += 1;
    for (const constructId of audit.constructIds) {
      constructItemCounts[constructId] += 1;
      constructLayerItemCounts[constructId][audit.layer] += 1;
    }
    if (audit.flags.includes("duplicate-wording")) duplicateQuestionIds.push(audit.questionId);
    if (audit.flags.includes("compound-wording")) compoundQuestionIds.push(audit.questionId);
    if (audit.flags.includes("conditional-wording")) conditionalQuestionIds.push(audit.questionId);
    if (audit.flags.includes("branch-target-metadata")) branchMetadataQuestionIds.push(audit.questionId);
    if (audit.flags.includes("ideology-coded-wording")) ideologyCodedQuestionIds.push(audit.questionId);
  }
  return {
    totalItems: audits.length,
    proxyItems,
    directItems,
    researchCandidateCounts: beliefGapCandidateCountsFor(),
    dispositionCounts,
    constructItemCounts,
    constructLayerItemCounts,
    uncoveredConstructLayerPairs: BELIEF_CONSTRUCT_DEFINITIONS.flatMap((definition): readonly BeliefConstructLayerCoverage[] => definition.layers
      .filter((layer) => constructLayerItemCounts[definition.id][layer] === 0)
      .map((layer) => ({ constructId: definition.id, layer }))),
    uncoveredConstructIds: BELIEF_CONSTRUCTS.filter((constructId) => constructItemCounts[constructId] === 0),
    duplicateQuestionIds,
    compoundQuestionIds,
    conditionalQuestionIds,
    branchMetadataQuestionIds,
    ideologyCodedQuestionIds,
  };
};

const relationalSummaryFor = (evidence: readonly BeliefRelationalEvidence[]): BeliefRelationalSummary => ({
  priorityRules: evidence.filter((item) => item.kind === "priority").length,
  conditionalRules: evidence.filter((item) => item.kind === "conditional").length,
  conflictResolutionRules: evidence.filter((item) => item.kind === "conflict-resolution").length,
  uncertaintyStatements: evidence.filter((item) => item.kind === "uncertainty").length,
  contradictions: evidence.filter((item) => item.kind === "contradiction").length,
  contestationStatements: evidence.filter((item) => item.kind === "contestation").length,
  unresolvedContradictions: evidence.filter((item) => item.kind === "contradiction" && !item.resolution?.trim()).length,
});

type BeliefStructureDimensionDefinition = Readonly<Pick<BeliefStructureDimension, "id" | "label" | "description" | "constructIds">>;

/**
 * The integrated profile has explicit slots for the distinctions required by
 * the objective. These slots organize evidence already present in the
 * profile; they do not create a new score or infer a relationship from
 * co-occurrence.
 */
const BELIEF_STRUCTURE_DIMENSIONS: readonly BeliefStructureDimensionDefinition[] = [
  {
    id: "values-and-moral-scope",
    label: "Normative commitments and moral scope",
    description: "What goods, duties, membership, solidarity, and scope of concern the respondent treats as politically important.",
    constructIds: ["social-order-moral-scope"],
  },
  {
    id: "concepts-and-conceptions",
    label: "Concepts and competing conceptions",
    description: "Which political concepts are being invoked and which interpretation gives a shared term its practical meaning.",
    constructIds: ["concept-conception"],
  },
  {
    id: "descriptive-causal-beliefs",
    label: "Descriptive and causal beliefs",
    description: "What the respondent believes is happening, what mechanisms reproduce it, and which explanatory alternatives remain open.",
    constructIds: ["diagnosis-causal-account"],
  },
  {
    id: "legitimacy-and-authority",
    label: "Legitimacy and authority",
    description: "Who may exercise power, why rule is justified or accepted, and which limits or resistance claims apply.",
    constructIds: ["legitimacy-authority"],
  },
  {
    id: "distributive-principles",
    label: "Distributive principles",
    description: "What should be allocated, to whom, and whether need, equal standing, capability, reciprocity, or another reason is doing the work.",
    constructIds: ["distributive-principle"],
  },
  {
    id: "institutional-commitments",
    label: "Institutional commitments",
    description: "Which institutions, ownership forms, decision procedures, and accountability routes are expected to realize a commitment.",
    constructIds: ["institutional-mechanism"],
  },
  {
    id: "political-economy",
    label: "Political-economic commitments",
    description: "How markets, ownership, labor, public goods, exchange, and economic power are understood and related institutionally.",
    constructIds: ["political-economy"],
  },
  {
    id: "political-change",
    label: "Theories of political change",
    description: "Whether change should proceed through reform, transformation, restoration, gradualism, rupture, experimentation, or preservation.",
    constructIds: ["change-strategy"],
  },
  {
    id: "priorities-and-conflicts",
    label: "Priorities and conflict rules",
    description: "What should happen when valued goods, groups, principles, or institutional goals conflict, including exceptions and tradeoffs.",
    constructIds: ["priority-conflict"],
  },
  {
    id: "epistemic-stance",
    label: "Epistemic assumptions and uncertainty",
    description: "How claims are held, revised, qualified, or acted on when information is incomplete; this is separate from agreement and accuracy.",
    constructIds: ["epistemic-stance"],
  },
  {
    id: "heterodoxy-and-contestation",
    label: "Heterodoxy and contestation",
    description: "How internal variation, dissent, opposition, revision, and disagreement over contested concepts are treated.",
    constructIds: ["heterodoxy-contestation"],
  },
];

const structurePostureFor = (
  observedObservations: readonly BeliefObservation[],
  directEvidence: readonly BeliefDirectEvidence[],
  gapEvidence: readonly BeliefGapEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): BeliefStructureEvidencePosture => {
  const hasFacetProxy = observedObservations.some((observation) => observation.measurementMode === "facet-proxy");
  const hasDirectItem = observedObservations.some((observation) => observation.measurementMode === "direct-item");
  const hasCategoricalPilot = directEvidence.length > 0;
  const hasCandidatePilot = gapEvidence.length > 0;
  const hasExplicitRelational = relationalEvidence.length > 0;
  const evidenceForms = [hasFacetProxy, hasDirectItem, hasCategoricalPilot, hasCandidatePilot, hasExplicitRelational].filter(Boolean).length;
  if (evidenceForms === 0) return "unmeasured";
  if (evidenceForms > 1) return "mixed-provisional";
  if (hasFacetProxy) return "facet-proxy";
  if (hasDirectItem) return "direct-item";
  if (hasCategoricalPilot) return "categorical-pilot";
  if (hasCandidatePilot) return "candidate-pilot";
  return "explicit-relational";
};

const structureGapFor = (
  posture: BeliefStructureEvidencePosture,
  constructs: readonly BeliefConstructResult[],
): string => {
  if (posture === "unmeasured") {
    return constructs.length > 0 && constructs.every((construct) => construct.status === "not-yet-measured")
      ? "No production item or explicit evidence currently measures this dimension."
      : "No answered directional or mixed response and no explicit direct or relational evidence is available for this dimension.";
  }
  if (posture === "facet-proxy") return "The available evidence is inherited from facet proxies; it does not by itself establish the corresponding conception, mechanism, or rule.";
  if (posture === "direct-item") return "A direct construct item is visible in the evidence trace; its content and construct validity still require review.";
  if (posture === "categorical-pilot") return "A selected categorical pilot account is visible; it is not a scalar measure, accuracy finding, or validated inference.";
  if (posture === "candidate-pilot") return "A selected research-candidate response is visible; it remains quarantined and does not establish a validated scalar construct.";
  if (posture === "explicit-relational") return "An explicit relational statement is visible; no hidden scalar priority, confidence, contradiction, or contestation weight is inferred.";
  return "Multiple evidence forms are visible and remain separate; research candidates stay quarantined, and none is upgraded into a validated latent measure or hidden weight.";
};

const observationCountsByLayerFor = (observations: readonly BeliefObservation[]): Readonly<Record<Layer, number>> =>
  Object.fromEntries(LAYERS.map((layer) => [layer, observations.filter((observation) => observation.layer === layer).length])) as Record<Layer, number>;

const dimensionIdsForConstructs = (
  constructIds: readonly BeliefConstructId[],
): readonly BeliefStructureDimensionId[] => BELIEF_STRUCTURE_DIMENSIONS
  .filter((dimension) => dimension.constructIds.some((constructId) => constructIds.includes(constructId)))
  .map((dimension) => dimension.id);

const beliefStructureFor = (
  constructs: readonly BeliefConstructResult[],
  observations: readonly BeliefObservation[],
  directEvidence: readonly BeliefDirectEvidence[],
  gapEvidence: readonly BeliefGapEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): readonly BeliefStructureDimension[] => BELIEF_STRUCTURE_DIMENSIONS.map((definition) => {
  const dimensionConstructs = constructs.filter((construct) => definition.constructIds.includes(construct.id));
  const dimensionObservations = observations.filter((observation) => definition.constructIds.includes(observation.constructId));
  const observedObservations = dimensionObservations.filter((observation) => observation.state === "directional" || observation.state === "mixed");
  const directionalObservations = observedObservations.filter((observation) => observation.state === "directional");
  const primaryConstruct = dimensionConstructs.length === 1 ? dimensionConstructs[0] : undefined;
  // A direct or relational record can intentionally participate in more than
  // one dimension. Its explicit construct links, not its display kind, are
  // the source of that fan-out; this preserves relationships such as a
  // freedom/equality priority across both the priority and substantive rows
  // without creating a scalar signal or a second score.
  const dimensionDirectEvidence = directEvidence.filter((evidence) => evidence.constructIds.some((constructId) => definition.constructIds.includes(constructId)));
  const dimensionGapEvidence = gapEvidence.filter((evidence) => definition.constructIds.includes(evidence.constructId));
  const dimensionRelationalEvidence = relationalEvidence.filter((evidence) => evidence.constructIds.some((constructId) => definition.constructIds.includes(constructId)));
  const relatedDimensionIds = unique(dimensionRelationalEvidence
    .flatMap((evidence) => dimensionIdsForConstructs(evidence.constructIds))
    .filter((dimensionId) => dimensionId !== definition.id));
  const evidencePosture = structurePostureFor(observedObservations, dimensionDirectEvidence, dimensionGapEvidence, dimensionRelationalEvidence);
  return {
    id: definition.id,
    label: definition.label,
    description: definition.description,
    constructIds: definition.constructIds,
    evidencePosture,
    observedObservationCount: observedObservations.length,
    directionalObservationCount: directionalObservations.length,
    observedObservationCountsByLayer: observationCountsByLayerFor(observedObservations),
    directionalObservationCountsByLayer: observationCountsByLayerFor(directionalObservations),
    ...(primaryConstruct?.signal === undefined ? {} : { observedSignal: primaryConstruct.signal }),
    observedSignalEvidenceQuestionIds: primaryConstruct?.directionalEvidenceQuestionIds ?? [],
    mixedObservationCount: observedObservations.filter((observation) => observation.state === "mixed").length,
    facetProxyObservationCount: observedObservations.filter((observation) => observation.measurementMode === "facet-proxy").length,
    directItemObservationCount: observedObservations.filter((observation) => observation.measurementMode === "direct-item").length,
    directEvidenceIds: dimensionDirectEvidence.map((evidence) => evidence.id),
    directEvidenceKinds: unique(dimensionDirectEvidence.map((evidence) => evidence.kind)),
    gapEvidenceIds: dimensionGapEvidence.map((evidence) => evidence.id),
    gapResponseFormats: unique(dimensionGapEvidence.map((evidence) => evidence.responseFormat)),
    relationalEvidenceIds: dimensionRelationalEvidence.map((evidence) => evidence.id),
    relationalEvidenceKinds: unique(dimensionRelationalEvidence.map((evidence) => evidence.kind)),
    relatedDimensionIds,
    evidenceQuestionIds: unique([
      ...observedObservations.map((observation) => observation.questionId),
      ...dimensionDirectEvidence.flatMap((evidence) => evidence.evidenceQuestionIds),
      ...dimensionRelationalEvidence.flatMap((evidence) => evidence.evidenceQuestionIds),
    ]),
    gap: structureGapFor(evidencePosture, dimensionConstructs),
    sourceRefs: unique([
      ...dimensionConstructs.flatMap((construct) => construct.sourceRefs),
      ...dimensionDirectEvidence.flatMap((evidence) => evidence.sourceRefs),
      ...dimensionRelationalEvidence.flatMap((evidence) => evidence.sourceRefs),
    ]),
  };
});

/**
 * Derive cross-layer tensions from the primary belief-profile signals. This
 * deliberately lives beside profile construction so the legacy anchor scorer
 * cannot become an upstream dependency of the belief representation.
 */
const crossLayerPullsForProfile = (
  facets: readonly BeliefFacetResult[],
  layerCoverage: Readonly<Record<Layer, number>>,
  coverageThreshold: number,
): readonly CrossLayerPull[] => {
  const covered = (layer: Layer): boolean => layerCoverage[layer] >= coverageThreshold;
  if (!covered("normative") || !covered("prescriptive")) return [];

  const value = (layer: Layer, facetId: string): number => facets.find((facet) => facet.layer === layer && facet.facetId === facetId)?.signal ?? 0;
  const pulls: CrossLayerPull[] = [];
  if (value("normative", "liberty") > 0.55 && value("prescriptive", "state-capacity") > 0.55) {
    pulls.push({ id: "autonomy-administration", title: "Autonomy meets administration", body: "Your values emphasize room for self-direction while your preferred practice puts weight on capable public implementation. The two can coexist, but their boundary is a live design question.", layers: ["normative", "prescriptive"] });
  }
  if (value("normative", "ecological-priority") > 0.55 && value("prescriptive", "market-allocation") > 0.55) {
    pulls.push({ id: "ecological-market", title: "Ecological ends, market means", body: "You place high value on ecological protection while also favoring market coordination in practice. That combination makes enforcement, pricing, and distribution choices especially important.", layers: ["normative", "prescriptive"] });
  }
  if (value("normative", "order-tradition") > 0.55 && value("prescriptive", "reformism") > 0.55) {
    pulls.push({ id: "continuity-change", title: "Continuity meets change", body: "You give moral weight to inherited order while preferring gradual institutional change. The practical question is which inheritances deserve continuity and which reforms can preserve trust.", layers: ["normative", "prescriptive"] });
  }
  if (covered("descriptive") && value("descriptive", "elite-autonomy") > 0.55 && value("prescriptive", "state-capacity") > 0.55) {
    pulls.push({ id: "diagnosis-implementation", title: "Diagnosis meets implementation", body: "You see organized elites as influential and also want institutions with enough capacity to act. Accountability design matters because implementation power can either constrain or reproduce that influence.", layers: ["descriptive", "prescriptive"] });
  }
  return pulls;
};

const tensionConstructs: Readonly<Record<string, readonly BeliefConstructId[]>> = {
  "autonomy-administration": ["concept-conception", "legitimacy-authority", "institutional-mechanism"],
  "ecological-market": ["social-order-moral-scope", "political-economy", "priority-conflict"],
  "continuity-change": ["concept-conception", "social-order-moral-scope", "change-strategy"],
  "diagnosis-implementation": ["diagnosis-causal-account", "legitimacy-authority", "institutional-mechanism"],
};

const notEstablishedTensions: readonly BeliefTension[] = [
  {
    id: "priority-order-not-established",
    title: "Priority order is not established",
    body: "The profile records value and practice signals, but the current questions do not ask which commitment takes precedence when commitments conflict.",
    layers: ["normative", "prescriptive"],
    constructIds: ["priority-conflict"],
    status: "not-established",
  },
  {
    id: "conditional-rules-not-established",
    title: "Conditional rules are not separately recorded",
    body: "Mixed / depends is retained as a response state. It does not reveal the condition, exception, threshold, or conflict rule that would make a commitment conditional.",
    layers: ["normative", "prescriptive"],
    constructIds: ["priority-conflict", "epistemic-stance"],
    status: "not-established",
  },
  {
    id: "conflict-resolution-not-established",
    title: "Conflict-resolution rules are not separately recorded",
    body: "The current item bank can show support for different principles or institutions, but it does not ask how a respondent would resolve a direct conflict between them.",
    layers: ["normative", "prescriptive"],
    constructIds: ["priority-conflict", "institutional-mechanism"],
    status: "not-established",
  },
  {
    id: "epistemic-confidence-not-established",
    title: "Confidence and evidence standards are not established",
    body: "No view yet is missing information and mixed / depends is substantive ambiguity or conditionality as selected by the respondent; neither supplies confidence or an evidence standard.",
    layers: ["descriptive", "normative"],
    constructIds: ["epistemic-stance"],
    status: "not-established",
  },
  {
    id: "contestation-not-established",
    title: "Heterodoxy and legitimate dissent are not established",
    body: "The current bank contains pluralism-related items, but it does not separately record how internal revision, opposition, or disagreement over a concept should be handled.",
    layers: ["normative", "prescriptive"],
    constructIds: ["heterodoxy-contestation"],
    status: "not-established",
  },
];

const relationalEvidenceKindsForTension: Readonly<Record<string, readonly BeliefRelationalEvidenceKind[]>> = {
  "priority-order-not-established": ["priority"],
  "conditional-rules-not-established": ["conditional"],
  "conflict-resolution-not-established": ["conflict-resolution"],
  "epistemic-confidence-not-established": ["uncertainty"],
  "contestation-not-established": ["contestation"],
};

const tensionsFor = (
  pulls: readonly CrossLayerPull[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
): readonly BeliefTension[] => [
  ...pulls.map((pull) => ({
    id: pull.id,
    title: pull.title,
    body: pull.body,
    layers: pull.layers,
    constructIds: tensionConstructs[pull.id] ?? [],
    status: "observed-pull" as const,
  })),
  ...notEstablishedTensions.filter((tension) => {
    const evidenceKinds = relationalEvidenceKindsForTension[tension.id] ?? [];
    return !evidenceKinds.some((kind) => relationalEvidence.some((evidence) => evidence.kind === kind));
  }),
];

const diagnosticFor = (
  id: string,
  layer: BeliefDiagnosticLayer,
  status: BeliefDiagnostic["status"],
  title: string,
  detail: string,
  constructIds: readonly BeliefConstructId[] = [],
  evidenceQuestionIds: readonly string[] = [],
  sourceRefs: readonly string[] = [],
): BeliefDiagnostic => ({
  id,
  layer,
  status,
  title,
  detail,
  constructIds: unique(constructIds),
  evidenceQuestionIds: unique(evidenceQuestionIds),
  sourceRefs: unique(sourceRefs),
});

const directEvidenceDiagnosticLayerFor = (kind: BeliefDirectEvidence["kind"]): BeliefDiagnosticLayer => {
  if (kind === "conception") return "conception";
  if (kind === "causal-account") return "causal-belief";
  if (kind === "institutional-route") return "institutional-inference";
  return "construct";
};

const relationalEvidenceDiagnosticLayerFor = (kind: BeliefRelationalEvidenceKind): BeliefDiagnosticLayer =>
  kind === "priority" || kind === "conditional" || kind === "conflict-resolution"
    ? "priority-conflict-rule"
    : "relationship";

const beliefDiagnosticsFor = (
  layerCoverage: Readonly<Record<Layer, number>>,
  allLayersCovered: boolean,
  constructs: readonly BeliefConstructResult[],
  directEvidence: readonly BeliefDirectEvidence[],
  gapEvidence: readonly BeliefGapEvidence[],
  relationalEvidence: readonly BeliefRelationalEvidence[],
  directEvidenceValidationErrors: readonly string[],
  gapEvidenceValidationErrors: readonly string[],
  relationalEvidenceValidationErrors: readonly string[],
): readonly BeliefDiagnostic[] => {
  const diagnostics: BeliefDiagnostic[] = [];
  if (!allLayersCovered) {
    const coverageText = LAYERS.map((layer) => `${layer}: ${Math.round((layerCoverage[layer] ?? 0) * 100)}%`).join(", ");
    diagnostics.push(diagnosticFor(
      "question-layer-coverage",
      "question",
      "coverage-gap",
      "Question coverage is below the inference threshold",
      `The three-layer threshold is not met (${coverageText}); morphology must remain withheld until enough item evidence is available.`,
      [],
      [],
      ["source-aapor"],
    ));
  }

  const proxyConstructs = constructs.filter((construct) => construct.proxyObservationCount > 0);
  if (proxyConstructs.length > 0) {
    diagnostics.push(diagnosticFor(
      "construct-facet-proxy-bridge",
      "construct",
      "validation-gap",
      "The construct bridge is still a facet proxy",
      "Observed construct signals are mapped from the inherited facet item bank; they are not direct, fitted, or respondent-validated construct measures.",
      proxyConstructs.map((construct) => construct.id),
      [],
      BELIEF_MODEL_PROVENANCE,
    ));
  }

  const constructDiagnosticLayers: Readonly<Partial<Record<BeliefConstructId, BeliefDiagnosticLayer>>> = {
    "concept-conception": "conception",
    "distributive-principle": "conception",
    "diagnosis-causal-account": "causal-belief",
    "institutional-mechanism": "institutional-inference",
  };
  const constructDiagnosticCopy: Readonly<Partial<Record<BeliefConstructId, Readonly<{ title: string; detail: string }>>>> = {
    "concept-conception": {
      title: "Concept meanings remain proxy evidence",
      detail: "The current facet associations can show broad value or institutional signals, but they do not establish which competing conception of liberty, equality, authority, or another political concept the respondent intended.",
    },
    "distributive-principle": {
      title: "Reasons behind distribution remain proxy evidence",
      detail: "Directional distribution items do not establish whether equal standing, need, capability, desert, reciprocity, or another principle motivates a shared policy position.",
    },
    "diagnosis-causal-account": {
      title: "Causal beliefs remain descriptive proxies",
      detail: "The current responses associate item signals with candidate mechanisms, but they do not establish whether a respondent endorses or distinguishes the causal alternatives, or whether a causal claim is true.",
    },
    "institutional-mechanism": {
      title: "Institutional inference remains a proxy",
      detail: "Institutional and route responses are associated with candidate mechanisms, but they do not establish the sequence, causal sufficiency, accountability conditions, or intended institutional meaning.",
    },
  };
  for (const construct of proxyConstructs) {
    const layer = constructDiagnosticLayers[construct.id];
    const copy = constructDiagnosticCopy[construct.id];
    if (!layer || !copy) continue;
    diagnostics.push(diagnosticFor(
      `construct-layer-${construct.id}`,
      layer,
      "validation-gap",
      copy.title,
      copy.detail,
      [construct.id],
      construct.evidenceQuestionIds,
      construct.sourceRefs,
    ));
  }

  for (const construct of constructs.filter((item) => item.status === "not-yet-measured")) {
    diagnostics.push(diagnosticFor(
      `construct-${construct.id}`,
      "construct",
      "unmeasured",
      `${construct.label} is not directly measured`,
      construct.statusNote,
      [construct.id],
      construct.evidenceQuestionIds,
      construct.sourceRefs,
    ));
  }

  if (directEvidenceValidationErrors.length > 0 || gapEvidenceValidationErrors.length > 0 || relationalEvidenceValidationErrors.length > 0) {
    diagnostics.push(diagnosticFor(
      "optional-evidence-contract",
      "question",
      "validation-error",
      "Optional evidence failed its input contract",
      "One or more direct, relational, or research-candidate records were rejected before profile or morphology use; inspect the contract errors rather than interpreting partial evidence.",
      [],
      [],
      ["source-aapor"],
    ));
  }

  const directGroups = new Map<BeliefDiagnosticLayer, BeliefDirectEvidence[]>();
  for (const evidence of directEvidence) {
    const layer = directEvidenceDiagnosticLayerFor(evidence.kind);
    const group = directGroups.get(layer) ?? [];
    group.push(evidence);
    directGroups.set(layer, group);
  }
  for (const [layer, evidence] of directGroups) {
    diagnostics.push(diagnosticFor(
      `direct-evidence-${layer}`,
      layer,
      "validation-gap",
      "Direct categorical interpretation remains provisional",
      `${evidence.length} selected direct categorical record${evidence.length === 1 ? " is" : "s are"} visible, but respondent interpretation and construct validity remain unverified.`,
      evidence.flatMap((item) => item.constructIds),
      evidence.flatMap((item) => item.evidenceQuestionIds),
      evidence.flatMap((item) => item.sourceRefs),
    ));
  }

  if (gapEvidence.length > 0) {
    diagnostics.push(diagnosticFor(
      "gap-evidence-candidate-pilot",
      "construct",
      "validation-gap",
      "Research-candidate responses remain quarantined",
      `${gapEvidence.length} selected research-candidate response${gapEvidence.length === 1 ? " is" : "s are"} visible for currently uncovered constructs, but the candidate wording, response process, neighbor distinctness, and empirical measurement remain unvalidated. These records do not change scalar construct status or morphology affinity.`,
      gapEvidence.map((item) => item.constructId),
      gapEvidence.flatMap((item) => item.evidenceQuestionIds),
      gapEvidence.flatMap((item) => item.sourceRefs),
    ));
  }

  const relationalGroups = new Map<BeliefDiagnosticLayer, BeliefRelationalEvidence[]>();
  for (const evidence of relationalEvidence) {
    const layer = relationalEvidenceDiagnosticLayerFor(evidence.kind);
    const group = relationalGroups.get(layer) ?? [];
    group.push(evidence);
    relationalGroups.set(layer, group);
  }
  for (const [layer, evidence] of relationalGroups) {
    const kinds = unique(evidence.map((item) => item.kind)).join(", ");
    diagnostics.push(diagnosticFor(
      `relational-evidence-${layer}`,
      layer,
      "validation-gap",
      "Relational evidence remains provisional",
      `${evidence.length} explicit ${kinds} record${evidence.length === 1 ? " is" : "s are"} visible as stated structure, but the response process and coding rule are not validated and no hidden weight is inferred.`,
      evidence.flatMap((item) => item.constructIds),
      evidence.flatMap((item) => item.evidenceQuestionIds),
      evidence.flatMap((item) => item.sourceRefs),
    ));
  }

  return diagnostics;
};

const globalResponseSummaryFor = (answers: AnswerMap, dataset: Dataset): BeliefResponseSummary => responseSummaryFor(dataset.questions.map((question) => question.id), answers);

export const calculateBeliefProfile = (
  answers: AnswerMap,
  dataset: Dataset,
  /** Retained for positional compatibility; primary profile construction ignores legacy pulls. */
  _legacyPulls: readonly CrossLayerPull[] = [],
  relationalEvidence: readonly BeliefRelationalEvidence[] = [],
  directEvidence: readonly BeliefDirectEvidence[] = [],
  gapEvidence: readonly BeliefGapEvidence[] = [],
): BeliefProfile => {
  const relationalEvidenceValidationErrors = validateBeliefRelationalEvidence(relationalEvidence, dataset);
  const directEvidenceValidationErrors = validateBeliefDirectEvidence(directEvidence, dataset);
  const gapEvidenceValidationErrors = validateBeliefGapEvidence(gapEvidence, dataset);
  const evidenceValidationErrors = [
    ...relationalEvidenceValidationErrors.map((error) => `relational evidence: ${error}`),
    ...directEvidenceValidationErrors.map((error) => `direct evidence: ${error}`),
    ...gapEvidenceValidationErrors.map((error) => `gap evidence: ${error}`),
  ];
  // Optional evidence is an external seam even though the current UI creates
  // it from typed option maps. Reject the whole optional collection when any
  // record fails its contract so one malformed record cannot partially shape
  // the profile, tension notices, or morphology trace.
  const acceptedRelationalEvidence = relationalEvidenceValidationErrors.length === 0 ? relationalEvidence : [];
  const acceptedDirectEvidence = directEvidenceValidationErrors.length === 0 ? directEvidence : [];
  const acceptedGapEvidence = gapEvidenceValidationErrors.length === 0 ? gapEvidence : [];
  const measurementAudit = auditBeliefMeasurement(dataset);
  const observations = beliefObservationsFor(answers, dataset, measurementAudit);
  const measurementSummary = measurementSummaryFor(measurementAudit);
  const facets = dataset.facets.map((facet) => facetResultFor(facet, answers, dataset, observations, measurementAudit));
  const constructs = BELIEF_CONSTRUCT_DEFINITIONS.map((item) => constructResultFor(item, answers, dataset, observations, measurementAudit, acceptedDirectEvidence, acceptedGapEvidence, acceptedRelationalEvidence));
  const structure = beliefStructureFor(constructs, observations, acceptedDirectEvidence, acceptedGapEvidence, acceptedRelationalEvidence);
  const response = globalResponseSummaryFor(answers, dataset);
  const layerCoverage = Object.fromEntries(LAYERS.map((layer) => {
    const questions = dataset.questions.filter((question) => question.layer === layer);
    const answered = questions.filter((question) => isNumericAnswer(answers[question.id])).length;
    return [layer, questions.length === 0 ? 0 : answered / questions.length];
  })) as Record<Layer, number>;
  const allLayersCovered = LAYERS.every((layer) => layerCoverage[layer] >= dataset.policy.coverageThreshold);
  const hasUnmeasuredConstruct = constructs.some((item) => item.status === "not-yet-measured");
  const status: BeliefProfile["status"] = !allLayersCovered ? "insufficient-information" : hasUnmeasuredConstruct ? "partial" : "observed";
  const crossLayerPulls = crossLayerPullsForProfile(facets, layerCoverage, dataset.policy.coverageThreshold);
  const diagnostics = beliefDiagnosticsFor(
    layerCoverage,
    allLayersCovered,
    constructs,
    acceptedDirectEvidence,
    acceptedGapEvidence,
    acceptedRelationalEvidence,
    directEvidenceValidationErrors,
    gapEvidenceValidationErrors,
    relationalEvidenceValidationErrors,
  );
  const unmeasuredConstructLabels = measurementSummary.uncoveredConstructIds
    .map((constructId) => constructLabelFor(constructId));
  const hasRelationalKind = (kind: BeliefRelationalEvidenceKind): boolean => acceptedRelationalEvidence.some((evidence) => evidence.kind === kind);
  const gaps = [
    "The facet-to-construct bridge is an explicit editorial proxy, not a fitted or validated latent-variable model.",
    acceptedDirectEvidence.length > 0
      ? "Selected categorical direct-belief responses are visible for conceptions, causal accounts, legitimacy, distribution, institutional routes, political economy, or change; they are not validated latent measures."
      : "Conceptions, causal mechanisms, and reasons for institutional choices are not directly elicited at item level.",
    hasRelationalKind("priority")
      ? "A priority rule is recorded as explicit respondent-stated evidence; the underlying construct is not a validated scalar measure."
      : "Priority order is not directly elicited.",
    hasRelationalKind("conditional")
      ? "A conditional rule is recorded as explicit respondent-stated evidence; the underlying construct is not a validated scalar measure."
      : "Conditional exceptions are not directly elicited.",
    hasRelationalKind("conflict-resolution")
      ? "A conflict-resolution rule is recorded as explicit respondent-stated evidence; the underlying construct is not a validated scalar measure."
      : "Conflict-resolution rules are not directly elicited.",
    hasRelationalKind("uncertainty")
      ? "An uncertainty statement is recorded separately from agreement; it is not a claim about accuracy or a validated epistemic scale."
      : "Confidence, uncertainty, response style, ambivalence, and epistemic standards are not separately measured.",
    hasRelationalKind("contestation")
      ? "A response to internal contestation is recorded as explicit respondent-stated evidence; heterodoxy is not a validated scalar measure."
      : "Heterodoxy, legitimate dissent, and internal revision are not separately measured.",
    "Identical policy answers can arise from different principles; the current answer map cannot identify the reason.",
    "No cognitive, cross-context, psychometric, invariance, or population validation is claimed by this calculation.",
    acceptedRelationalEvidence.length > 0
      ? "Explicit relational evidence is reported as respondent-stated or fixture-stated structure; it is not inferred from scalar co-occurrence and does not resolve missing measurement validation."
      : "No priority, condition, conflict-resolution, uncertainty, contradiction, or contestation rule is inferred from scalar answers.",
    acceptedGapEvidence.length > 0
      ? "Selected research-candidate responses are visible as quarantined pilot evidence for currently uncovered constructs; they do not establish a validated scalar measure or affect morphology affinity."
      : "Research-candidate prompts remain outside the production quiz until response-process, content, cross-context, and empirical review is complete.",
    ...(directEvidenceValidationErrors.length > 0 || relationalEvidenceValidationErrors.length > 0 ? ["Optional relational or direct evidence was rejected as a whole because one or more records failed the source, option, construct, or provenance contract."] : []),
    ...(gapEvidenceValidationErrors.length > 0 ? ["Optional research-candidate evidence was rejected as a whole because one or more records failed the source, option, construct, or provenance contract."] : []),
    ...(unmeasuredConstructLabels.length > 0 ? [`No production scalar item is currently mapped to: ${unmeasuredConstructLabels.join(", ")}. Explicit relational records, when present above, are kept as non-scalar evidence and do not change this measurement gap.`] : []),
  ];
  const provenance = unique([
    ...BELIEF_CONSTRUCT_DEFINITIONS.flatMap((item) => item.sourceRefs),
    ...BELIEF_MODEL_PROVENANCE,
    ...acceptedDirectEvidence.flatMap((item) => item.sourceRefs),
    "source-aapor",
  ]);
  return {
    modelId: BELIEF_MODEL_ID,
    modelVersion: BELIEF_MODEL_VERSION,
    status,
    response,
    structure,
    facets,
    constructs,
    observations,
    directEvidence: acceptedDirectEvidence,
    gapEvidence: acceptedGapEvidence,
    relationalEvidence: acceptedRelationalEvidence,
    evidenceValidationErrors,
    relationalSummary: relationalSummaryFor(acceptedRelationalEvidence),
    measurementAudit,
    measurementSummary,
    crossLayerPulls,
    tensions: tensionsFor(crossLayerPulls, acceptedRelationalEvidence),
    diagnostics,
    gaps,
    provenance,
  };
};

const facetLabelFor = (facetId: string, dataset: Dataset): string => dataset.facets.find((facet) => facet.id === facetId)?.label ?? facetId;

/**
 * Returns the observed inputs that were available to the existing anchor
 * distance calculation, annotated with the conceptual constructs they proxy.
 * This is an evidence trail, not a claim that the target ideology caused the
 * response or that the construct is a validated psychological dimension.
 */
export const interpretiveBasisFor = (
  profiles: Readonly<Partial<Record<Layer, Readonly<Record<string, number>>>>>,
  dataset: Dataset,
): readonly InterpretiveBasis[] => LAYERS.flatMap((layer) => Object.entries(profiles[layer] ?? {})
  .filter(([, value]) => Number.isFinite(value))
  .sort(([leftId, left], [rightId, right]) => Math.abs(right) - Math.abs(left) || leftId.localeCompare(rightId))
  .map(([facetId, value]) => ({
    layer,
    facetId,
    facetLabel: facetLabelFor(facetId, dataset),
    constructIds: BELIEF_FACET_CONSTRUCTS[facetId] ?? [],
    value,
    direction: value >= 0 ? "toward" as const : "away" as const,
  })));

const directionFor = (value: string): BeliefCommitmentDirection => {
  if (value.includes("negative")) return "negative";
  if (value.includes("positive")) return "positive";
  return "indeterminate";
};

const centralityFor = (value: string): BeliefCommitmentCentrality => {
  if (value === "defining") return "defining";
  if (value === "characteristic") return "characteristic";
  return "optional-or-contested";
};

const commitmentForDimension = (anchorId: string, dimension: {
  facetId: string;
  layer: Layer;
  expectedDirection: string;
  centrality: string;
  rationale: string;
  sourceIds: readonly string[];
}, dataset: Dataset): BeliefCommitment | undefined => {
  const constructIds = BELIEF_FACET_CONSTRUCTS[dimension.facetId] ?? [];
  if (constructIds.length === 0) return undefined;
  return {
    id: `${anchorId}:${dimension.layer}:${dimension.facetId}`,
    constructIds,
    layer: dimension.layer,
    facetId: dimension.facetId,
    label: facetLabelFor(dimension.facetId, dataset),
    expectedDirection: directionFor(dimension.expectedDirection),
    centrality: centralityFor(dimension.centrality),
    rationale: dimension.rationale,
    sourceRefs: dimension.sourceIds,
  };
};

const commitmentForConception = (anchorId: string, conception: ResearchAnchorConception): BeliefCommitment => ({
  id: `${anchorId}:concept:${conception.conceptId}`,
  constructIds: ["concept-conception"],
  layer: conception.layer,
  conceptId: conception.conceptId,
  label: conception.label,
  expectedDirection: "indeterminate",
  centrality: centralityFor(conception.centrality),
  rationale: conception.interpretation,
  sourceRefs: conception.sourceIds,
});

const fallbackCommitmentsFor = (anchor: Dataset["anchors"][number], dataset: Dataset): readonly BeliefCommitment[] => LAYERS.flatMap((layer) => Object.entries(anchor.profiles[layer])
  .filter(([, value]) => Number.isFinite(value) && value !== 0)
  .flatMap(([facetId, value]) => {
    const constructIds = BELIEF_FACET_CONSTRUCTS[facetId] ?? [];
    return constructIds.length === 0 ? [] : [{
      id: `${anchor.id}:${layer}:${facetId}`,
      constructIds,
      layer,
      facetId,
      label: facetLabelFor(facetId, dataset),
      expectedDirection: value > 0 ? "positive" as const : "negative" as const,
      centrality: "optional-or-contested" as const,
      rationale: "Projection of the existing editorial anchor vector; no source-backed commitment record is available for this dimension.",
      sourceRefs: anchor.sourceRefs,
    }];
  }));

const nodePlacementFor = (value: string | undefined): IdeologyNodePlacement => value === "canonical" || value === "contextual" || value === "associated" || value === "historical" ? value : "canonical";

const relationTargetLabelFor = (targetId: string, dataset: Dataset): string =>
  dataset.ideologyNodes.find((item) => item.id === targetId)?.label
  ?? dataset.ideologyRegistry.find((item) => item.id === targetId)?.label
  ?? targetId;

const relationalConstraintRecords = (): IdeologyConfiguration["relationalConstraints"] => [
  {
    kind: "priority",
    status: "not-established",
    note: "The source-backed anchor profile identifies commitments and centrality but does not establish an ordering for resolving conflicts among them.",
  },
  {
    kind: "conditionality",
    status: "not-established",
    note: "The anchor boundary may describe variants or conditions, but no respondent-facing condition, threshold, or exception is treated as a configuration rule.",
  },
  {
    kind: "conflict-resolution",
    status: "not-established",
    note: "Cross-layer tensions are retained as interpretive possibilities; the current configuration does not invent a rule for resolving them.",
  },
  {
    kind: "epistemic",
    status: "not-established",
    note: "Source references support the substantive account, not a claim about how adherents hold, revise, or justify the account under uncertainty.",
  },
  {
    kind: "contestation",
    status: "not-established",
    note: "Variants and boundaries preserve internal disagreement, but the current configuration does not infer a single stance toward dissent or heterodoxy.",
  },
];

const conceptionsFor = (
  commitments: readonly BeliefCommitment[],
  evidencePosture: IdeologyConfiguration["evidencePosture"],
): readonly BeliefConception[] => commitments
  .filter((commitment) => (commitment.conceptId || commitment.facetId) && commitment.constructIds.includes("concept-conception"))
  .map((commitment) => ({
    id: `${commitment.id}:conception`,
    conceptId: commitment.conceptId ?? commitment.facetId ?? commitment.constructIds[0],
    ...(commitment.facetId ? { facetId: commitment.facetId } : {}),
    label: commitment.label,
    interpretation: commitment.rationale,
    centrality: commitment.centrality,
    sourceRefs: commitment.sourceRefs,
    representation: commitment.conceptId ? "explicit-research-conception" as const : "facet-proxy" as const,
    evidencePosture: evidencePosture === "source-backed-projection" ? "source-backed" : "anchor-projection",
  }));

export const configurationForAnchor = (anchor: Dataset["anchors"][number], dataset: Dataset): IdeologyConfiguration => {
  const node = dataset.ideologyNodes.find((item) => item.id === anchor.ontologyNodeId);
  const researchProfile = RESEARCH_ANCHOR_PROFILES.find((item) => item.targetId === anchor.ontologyNodeId) ?? RESEARCH_ANCHOR_PROFILES.find((item) => item.targetId === anchor.id);
  const dimensionCommitments = researchProfile
    ? researchProfile.dimensions.flatMap((dimension) => {
      const commitment = commitmentForDimension(anchor.id, dimension, dataset);
      return commitment ? [commitment] : [];
    })
    : fallbackCommitmentsFor(anchor, dataset);
  const conceptionCommitments = researchProfile?.conceptions.map((conception) => commitmentForConception(anchor.id, conception)) ?? [];
  const commitments = [...dimensionCommitments, ...conceptionCommitments];
  const optionalOrContestedCommitments = commitments.filter((commitment) => commitment.centrality === "optional-or-contested");
  const sourceRefs = unique([...anchor.sourceRefs, ...(researchProfile?.sourceIds ?? [])]);
  const variants = researchProfile?.variants ?? [];
  const neighbors = researchProfile?.neighbors ?? [];
  const compatibility = [
    ...neighbors.map((targetId) => ({ targetId, relation: "neighbor" as const, note: "The research profile identifies this as a nearby tradition requiring explicit distinction." })),
    ...(node?.relations ?? []).map((relation) => ({ targetId: relation.targetId, relation: relation.type as IdeologyRelationType, note: relation.note })),
  ];
  const uniqueCompatibility = [...new Map(compatibility.map((item) => [`${item.relation}:${item.targetId}:${item.note}`, item])).values()];
  const contestedDimensions = commitments.filter((commitment) => commitment.centrality === "optional-or-contested").map((commitment) => commitment.label);
  const relationTensions = (node?.relations ?? [])
    .filter((relation) => ["critical-of", "alternative-to", "overlaps-with", "contested-manifestation-of"].includes(relation.type))
    .map((relation) => `${relationTargetLabelFor(relation.targetId, dataset)}: ${relation.note}`);
  return {
    targetId: anchor.id,
    label: anchor.label,
    family: anchor.family,
    ontologyNodeId: anchor.ontologyNodeId,
    ontologyLevel: node?.level ?? "meso",
    placement: nodePlacementFor(node?.placement),
    definition: researchProfile?.definition ?? anchor.summary,
    boundary: researchProfile?.boundary ?? "This configuration is an anchor-only projection. It must not be read as a complete or validated account of the tradition.",
    variants,
    conceptions: conceptionsFor(commitments, researchProfile ? "source-backed-projection" : "anchor-only-projection"),
    commitments,
    conceptualCommitments: commitments.filter((commitment) => commitment.constructIds.includes("concept-conception")),
    normativeCommitments: commitments.filter((commitment) => commitment.layer === "normative"),
    descriptiveAssumptions: commitments.filter((commitment) => commitment.layer === "descriptive"),
    causalAssumptions: commitments.filter((commitment) => commitment.layer === "descriptive" && commitment.constructIds.includes("diagnosis-causal-account")),
    institutionalImplications: commitments.filter((commitment) => commitment.layer === "prescriptive"),
    optionalOrContestedCommitments,
    priorities: {
      status: "not-established",
      note: "The current anchor and research profile do not establish a priority ordering among commitments.",
    },
    compatibility: uniqueCompatibility,
    relationalConstraints: relationalConstraintRecords(),
    tensions: [
      ...(contestedDimensions.length > 0 ? [`Optional or contested commitments retained: ${contestedDimensions.join(", ")}.`] : []),
      ...relationTensions,
      "Cross-layer tradeoffs are explanatory possibilities, not respondent contradictions.",
    ],
    sourceRefs,
    evidencePosture: researchProfile ? "source-backed-projection" : "anchor-only-projection",
  };
};

export const ideologyConfigurationsFor = (dataset: Dataset): readonly IdeologyConfiguration[] => dataset.anchors.map((anchor) => configurationForAnchor(anchor, dataset));

export const configurationMapFor = (dataset: Dataset): ReadonlyMap<string, IdeologyConfiguration> => new Map(ideologyConfigurationsFor(dataset).map((configuration) => [configuration.targetId, configuration]));

export function validateIdeologyConfigurations(dataset: Dataset): readonly string[] {
  const errors: string[] = [];
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const facetById = new Map(dataset.facets.map((facet) => [facet.id, facet]));
  const ideologyIds = new Set([...dataset.ideologyNodes.map((node) => node.id), ...dataset.ideologyRegistry.map((entry) => entry.id)]);
  const configurations = ideologyConfigurationsFor(dataset);
  const configurationIds = new Set<string>();
  const requiredConstraintKinds = ["priority", "conditionality", "conflict-resolution", "epistemic", "contestation"] as const;
  if (configurations.length !== dataset.anchors.length) errors.push("ideology configuration count does not cover every anchor");
  for (const configuration of configurations) {
    if (configurationIds.has(configuration.targetId)) errors.push(`duplicate ideology configuration ${configuration.targetId}`);
    configurationIds.add(configuration.targetId);
    if (configuration.commitments.length === 0) errors.push(`ideology configuration ${configuration.targetId} has no commitments`);
    if (configuration.placement === "canonical" && configuration.evidencePosture !== "source-backed-projection") {
      errors.push(`canonical ideology configuration ${configuration.targetId} lacks a source-backed research profile`);
    }
    if (configuration.placement === "canonical" && configuration.conceptualCommitments.length === 0) {
      errors.push(`canonical ideology configuration ${configuration.targetId} lacks a source-backed conceptual commitment`);
    }
    if (!ideologyIds.has(configuration.ontologyNodeId)) errors.push(`ideology configuration ${configuration.targetId} references missing ontology node ${configuration.ontologyNodeId}`);
    for (const sourceRef of configuration.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`ideology configuration ${configuration.targetId} references missing source ${sourceRef}`);
    }
    for (const commitment of configuration.commitments) {
      if (commitment.constructIds.length === 0) errors.push(`ideology configuration ${configuration.targetId} commitment ${commitment.id} has no construct`);
      if (commitment.conceptId !== undefined && !commitment.conceptId.trim()) errors.push(`ideology configuration ${configuration.targetId} commitment ${commitment.id} has an empty concept id`);
      if (commitment.facetId) {
        const facet = facetById.get(commitment.facetId);
        if (!facet) errors.push(`ideology configuration ${configuration.targetId} commitment ${commitment.id} references missing facet ${commitment.facetId}`);
        else if (facet.layer !== commitment.layer) errors.push(`ideology configuration ${configuration.targetId} commitment ${commitment.id} layer does not match facet ${commitment.facetId}`);
      }
      for (const sourceRef of commitment.sourceRefs) {
        if (!sourceIds.has(sourceRef)) errors.push(`ideology configuration ${configuration.targetId} commitment ${commitment.id} references missing source ${sourceRef}`);
      }
    }
    for (const conception of configuration.conceptions) {
      if (!conception.conceptId.trim()) errors.push(`ideology configuration ${configuration.targetId} has an empty conception id`);
      if (!conception.interpretation.trim()) errors.push(`ideology configuration ${configuration.targetId} has an empty conception interpretation`);
      if (conception.representation === "explicit-research-conception" && conception.facetId) {
        errors.push(`ideology configuration ${configuration.targetId} explicit conception ${conception.conceptId} must not use a facet proxy`);
      }
      if (conception.representation === "facet-proxy" && !conception.facetId) {
        errors.push(`ideology configuration ${configuration.targetId} facet conception ${conception.conceptId} must identify its facet proxy`);
      }
      if (conception.facetId && !facetById.has(conception.facetId)) errors.push(`ideology configuration ${configuration.targetId} conception references missing facet proxy ${conception.facetId}`);
      for (const sourceRef of conception.sourceRefs) {
        if (!sourceIds.has(sourceRef)) errors.push(`ideology configuration ${configuration.targetId} conception references missing source ${sourceRef}`);
      }
    }
    for (const relation of configuration.compatibility) {
      if (!ideologyIds.has(relation.targetId)) errors.push(`ideology configuration ${configuration.targetId} references missing compatibility target ${relation.targetId}`);
    }
    const constraintKinds = configuration.relationalConstraints.map((constraint) => constraint.kind);
    if (constraintKinds.length !== requiredConstraintKinds.length || requiredConstraintKinds.some((kind) => !constraintKinds.includes(kind))) {
      errors.push(`ideology configuration ${configuration.targetId} does not expose all relational constraint gaps`);
    }
  }
  return errors;
}

export const constructLabelFor = (constructId: BeliefConstructId): string => definitionsById.get(constructId)?.label ?? constructId;
