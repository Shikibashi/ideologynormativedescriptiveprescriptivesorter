import { BELIEF_CONSTRUCTS, LAYERS, type BeliefCandidateResponseFormat, type BeliefConstructId, type BeliefGapCandidate, type BeliefGapEvidence, type Dataset } from "./types";

const directionalOptions = [
  "Strongly disagree",
  "Disagree",
  "Mixed / depends",
  "Agree",
  "Strongly agree",
  "No view yet",
] as const;

const candidate = (
  id: string,
  constructId: BeliefConstructId,
  layer: BeliefGapCandidate["layer"],
  prompt: string,
  context: string,
  responseFormat: BeliefCandidateResponseFormat,
  responseOptions: readonly string[],
  scholarlyRationale: string,
  gapAddressed: string,
  sameAnswerDifferentReasonRisk: string,
  sourceRefs: readonly string[],
): BeliefGapCandidate => ({
  id,
  constructId,
  layer,
  prompt,
  context,
  responseFormat,
  responseOptions,
  scholarlyRationale,
  gapAddressed,
  sameAnswerDifferentReasonRisk,
  reviewStatus: "research_candidate",
  sourceRefs,
});

/**
 * Source-attributed candidates for constructs that the production bank does
 * not yet measure. These are deliberately effect-free and are not part of the
 * production quiz or the legacy scorer; the app may expose them only through
 * the explicitly labeled, quarantined research-candidate pilot.
 */
export const BELIEF_GAP_CANDIDATES: readonly BeliefGapCandidate[] = [
  candidate(
    "bc-priority-liberty-equality",
    "priority-conflict",
    "normative",
    "When protecting individual freedom conflicts with reducing material inequality, which principle should take priority?",
    "Use a forced choice so a respondent states a priority rather than selecting a midpoint on two separate value items.",
    "paired-priority-choice",
    ["Protect individual freedom, even if material inequality remains.", "Reduce material inequality, even if some individual choices are constrained.", "It depends on the situation.", "No view yet."],
    "Schwartz treats values as structured and potentially competing, while Rawls supplies a prominent example of ordering political principles rather than treating each value as an isolated score.",
    "The current bank records liberty and equality proxies but never asks which one governs a conflict.",
    "The same priority can be selected for different reasons, including rights, welfare, equal standing, or distrust of coercion; collect a brief reason in response-process review.",
    ["source-schwartz", "source-sagiv-schwartz-values-review", "source-rawls", "source-aapor"],
  ),
  candidate(
    "bc-priority-ecology-growth",
    "priority-conflict",
    "normative",
    "When ecological limits conflict with increasing material production, which should take priority?",
    "Present the conflict as a bounded scenario and retain an explicit conditional option.",
    "paired-priority-choice",
    ["Respect ecological limits, even if production grows more slowly.", "Increase material production, even if ecological limits are approached sooner.", "It depends on the situation.", "No view yet."],
    "Value-structure research supports modeling competing goods, and the ecological-limit literature in the existing source registry supports treating ecological constraint as a distinct political concern rather than a generic preference.",
    "The current ecological and economic items provide separate proxies but no rule for resolving a growth-versus-limit conflict.",
    "A choice may reflect factual beliefs about technology or scarcity rather than a priority rule, so the follow-up should separate reasons from the forced choice.",
    ["source-schwartz", "source-sagiv-schwartz-values-review", "source-rockstrom", "source-aapor"],
  ),
  candidate(
    "bc-priority-scope-members-outsiders",
    "priority-conflict",
    "normative",
    "When obligations to members of a political community conflict with obligations to people outside it, which should take priority?",
    "Keep membership, universal scope, and conditionality visible as separate response options.",
    "paired-priority-choice",
    ["Prioritize members of the political community.", "Give equal consideration to people outside the community.", "Give priority to whoever faces the greater need or risk.", "It depends on the situation.", "No view yet."],
    "The existing social-scope bridge draws on competing particularist and universalist traditions; the item tests an explicit ordering rule rather than treating universalism as a single scalar value.",
    "The current bank measures universalism and solidarity as broad value proxies but does not ask how scope conflicts are resolved.",
    "The same option may be justified by reciprocity, equal worth, emergency need, or institutional duty; ask for the respondent's reason before interpreting the response.",
    ["source-schwartz", "source-sagiv-schwartz-values-review", "source-rawls", "source-anderson"],
  ),
  candidate(
    "bc-priority-rights-local-autonomy",
    "priority-conflict",
    "prescriptive",
    "When local self-government conflicts with uniform protection of basic rights, which should take priority?",
    "Use a jurisdiction-neutral institutional scenario and do not assume that local or national authority is always the answer.",
    "paired-priority-choice",
    ["Protect basic rights uniformly, even if local discretion is reduced.", "Protect local self-government, even if rights protections vary by place.", "Set a minimum rights floor and leave other matters local.", "It depends on the situation.", "No view yet."],
    "Dahl's work makes participation and contestation institutional questions, while the project uses Rawls as a source for basic-liberty language; together they motivate testing the relationship rather than inferring it from decentralization or democracy alone.",
    "The current prescriptive bank measures decentralization, democracy, and state capacity separately but does not record a rights-versus-autonomy rule.",
    "A rights-floor answer may reflect a conception of legitimacy, a factual concern about enforcement, or a priority rule; those interpretations must remain separate in review.",
    ["source-dahl", "source-rawls", "source-aapor"],
  ),
  candidate(
    "bc-priority-reform-deep-change",
    "priority-conflict",
    "prescriptive",
    "A reform would improve people's lives now but make a deeper institutional change harder later. What should determine your support?",
    "This conditional vignette is intended to elicit a transition rule, not a general reformism score.",
    "conditional-vignette",
    ["Support the reform because its immediate benefit is decisive.", "Reject the reform because it makes deeper change harder.", "Support it only with safeguards that preserve a path to deeper change.", "I would need more information about the consequences.", "No view yet."],
    "The existing Pierson source supports attention to path dependence, while the current bank explicitly distinguishes change strategy from a full theory of acceptable transition costs.",
    "The current reformism items do not identify when a respondent accepts, rejects, or conditions a reform.",
    "The scenario answer depends on beliefs about consequences as well as values; collect the assumed causal mechanism separately from the selected rule.",
    ["source-pierson", "source-schwartz", "source-sagiv-schwartz-values-review", "source-aapor"],
  ),
  candidate(
    "bc-epistemic-confidence",
    "epistemic-stance",
    "descriptive",
    "How confident are you in your answer to this descriptive political claim when the available evidence is incomplete?",
    "Administer as a follow-up to a specific descriptive claim. Do not treat agreement with the claim as confidence in it.",
    "confidence-rating",
    ["Not at all confident", "Slightly confident", "Moderately confident", "Very confident", "Completely confident", "I do not have enough basis to rate this"],
    "A measurement-validity argument requires the intended response process to be specified; confidence should therefore be elicited separately from substantive agreement and missingness.",
    "The current no-view and mixed states distinguish two answer states but do not record confidence in a directional answer.",
    "Respondents may interpret confidence as knowledge, importance, or willingness to defend a view; cognitive review must test those interpretations.",
    ["source-adcock-collier", "source-borsboom-validity", "source-aapor", "source-elkjaer-wlezien-dont-know"],
  ),
  candidate(
    "bc-epistemic-revision",
    "epistemic-stance",
    "descriptive",
    "I would revise a political belief when credible evidence repeatedly conflicts with it.",
    "Keep this separate from whether the respondent believes a particular claim is true.",
    "five-point-directional",
    directionalOptions,
    "The project treats evidence and response process as distinct from the anchor label; this item is a candidate indicator of revisability, not a measure of intelligence or good faith.",
    "The current bank has no direct item about revisability or how a respondent holds a causal claim.",
    "Agreement may express an ideal self-description rather than actual revision behavior; use response-process probing and avoid interpreting it as a stable personality trait.",
    ["source-aapor", "source-borsboom-validity", "source-jost"],
  ),
  candidate(
    "bc-epistemic-uncertainty",
    "epistemic-stance",
    "descriptive",
    "When I do not know enough about a political fact, I prefer to withhold a firm judgment.",
    "The item distinguishes uncertainty from disagreement and should be paired with a claim-specific confidence follow-up.",
    "five-point-directional",
    directionalOptions,
    "Clear missingness and response-state distinctions are a survey-design requirement; this item tests a stated uncertainty practice rather than scoring no-view as a political position.",
    "The current answer format records no-view but cannot distinguish principled withholding from low salience or uncertainty about the response options.",
    "Agreement can be normatively desirable without describing actual behavior; do not use it as a proxy for accuracy or epistemic virtue.",
    ["source-aapor", "source-adcock-collier", "source-borsboom-validity", "source-elkjaer-wlezien-dont-know"],
  ),
  candidate(
    "bc-epistemic-fact-value-distinction",
    "epistemic-stance",
    "normative",
    "I distinguish disagreement about political values from uncertainty about political facts.",
    "Use neutral examples during cognitive review so respondents do not have to adopt a particular ideology to answer.",
    "five-point-directional",
    directionalOptions,
    "Separating conceptualization from measurement supports asking whether respondents distinguish kinds of disagreement before interpreting an answer as a single ideological signal.",
    "The current three-layer model separates descriptive and normative prompts but does not ask whether respondents themselves distinguish those reasons.",
    "Respondents may agree while still applying different distinctions across topics; this requires repeated, claim-specific response-process testing.",
    ["source-adcock-collier", "source-aera-testing-standards", "source-aapor"],
  ),
  candidate(
    "bc-epistemic-evidence-change",
    "epistemic-stance",
    "descriptive",
    "What kind of evidence would change your view on this claim?",
    "Use an open response or structured multi-select follow-up after a claim-specific answer; do not reduce the reason to the agreement scale.",
    "open-reason",
    ["New data or observation", "A credible source or testimony", "A coherent argument", "A changed circumstance", "I cannot say yet"],
    "Response-process and validity frameworks require attention to how an answer is produced, not only its numerical association with another item.",
    "The current bank has no field for reasons, evidence standards, or claim-specific conditions for revision.",
    "The selected evidence type is not itself evidence that the respondent's political claim is true; code it as a stated epistemic condition only.",
    ["source-aera-testing-standards", "source-borsboom-validity", "source-aapor", "source-elkjaer-wlezien-dont-know"],
  ),
  candidate(
    "bc-heterodoxy-revision",
    "heterodoxy-contestation",
    "normative",
    "A political tradition can remain recognizably the same while revising one of its central concepts.",
    "This asks about internal conceptual change without naming a tradition or requiring an identity claim.",
    "five-point-directional",
    directionalOptions,
    "Morphological ideology research treats concepts as historically and contextually recombinable; the candidate tests whether revision is considered compatible with continuity.",
    "The current bank has no direct measure of whether a respondent permits internal conceptual revision.",
    "Agreement may mean openness to change in general rather than a view about tradition and conceptual identity; use examples in review.",
    ["source-freeden-morphology", "source-freeden-steers-morphology", "source-aapor"],
  ),
  candidate(
    "bc-heterodoxy-dissent",
    "heterodoxy-contestation",
    "normative",
    "Members of a political movement should be able to challenge its central commitments without being treated as disloyal.",
    "Keep membership in the movement hypothetical and distinguish disagreement from sabotage or coercion during review.",
    "five-point-directional",
    directionalOptions,
    "Dahl's account of contestation supports treating opposition and dissent as distinct institutional concerns; morphology research supports avoiding one official interpretation of a tradition.",
    "The current democracy and pluralism proxies do not specifically record internal dissent rights.",
    "A respondent may support dissent for democratic, epistemic, strategic, or liberal reasons; those reasons should not be collapsed into one construct score.",
    ["source-dahl", "source-freeden-morphology", "source-freeden-steers-morphology", "source-aapor"],
  ),
  candidate(
    "bc-heterodoxy-opposition",
    "heterodoxy-contestation",
    "prescriptive",
    "A political order should protect organized opposition even when it challenges the order's founding principles.",
    "Use a non-country-specific institutional scenario and separately ask about limits involving violence, coercion, or rights.",
    "five-point-directional",
    directionalOptions,
    "Participation and opposition are central to Dahl's democratic account, while the morphology framework cautions against treating one contested tradition as internally uniform.",
    "The current prescriptive items measure democracy and authority but do not directly test protection for organized heterodox opposition.",
    "The item can be interpreted as an absolute free-speech claim or as a rule for constitutional opposition; later review must distinguish those readings.",
    ["source-dahl", "source-freeden-morphology", "source-freeden-steers-morphology", "source-aapor"],
  ),
  candidate(
    "bc-heterodoxy-internal-disagreement",
    "heterodoxy-contestation",
    "normative",
    "A description of a political tradition should report serious internal disagreement instead of presenting one official interpretation.",
    "This is a measurement and interpretation item, not an invitation to identify with a particular label.",
    "five-point-directional",
    directionalOptions,
    "Morphological analysis emphasizes flexible, contested concept combinations; the candidate tests whether internal variation should remain visible in interpretation.",
    "The current anchor configurations record variants and contested commitments, but the respondent-facing bank does not measure a view about heterodoxy itself.",
    "Agreement may reflect a general preference for pluralism rather than a specific theory of ideological interpretation; preserve that ambiguity.",
    ["source-freeden-morphology", "source-freeden-steers-morphology", "source-dahl", "source-aapor"],
  ),
  candidate(
    "bc-heterodoxy-minority-response",
    "heterodoxy-contestation",
    "prescriptive",
    "A minority within a political movement rejects one core policy but accepts the movement's broader purpose. What response best fits your view?",
    "Use a conditional vignette to distinguish expulsion, tolerated dissent, revision, and context-dependent responses.",
    "conditional-vignette",
    ["The minority should leave or be excluded.", "The minority should remain and openly dissent.", "The movement should revise its policy if the criticism is persuasive.", "It depends on the issue and the consequences.", "No view yet."],
    "Internal contestation is a relationship among commitment, membership, authority, and revision; a scenario is more informative than inferring it from a general democracy score.",
    "The current bank does not observe how a respondent resolves the relationship between movement continuity and internal dissent.",
    "The answer may depend on the policy's consequences or on the meaning of membership; collect the stated condition before interpreting the response.",
    ["source-freeden-morphology", "source-freeden-steers-morphology", "source-dahl", "source-aapor"],
  ),
  candidate(
    "bc-conception-liberty-institution",
    "concept-conception",
    "prescriptive",
    "When a public institution is designed to protect liberty, which interpretation should guide its rules?",
    "Present competing interpretations without naming a tradition. The choice is about the meaning a public rule should enact, not about which institution is most efficient.",
    "open-reason",
    ["Prevent direct interference by public or private power.", "Secure the effective capabilities people need to act freely.", "Prevent arbitrary dependence on anyone who can control one's options.", "Let the people affected share in making and revising the rules.", "No view yet."],
    "Freeden's morphological approach treats political concepts as contested and differently organized, while Rawls, Dahl, and republican theory provide distinct normative routes through liberty, participation, and non-domination. The candidate therefore tests a prescriptive conception rather than assuming that the shared word has one meaning.",
    "The production bank reaches concepts and conceptions through descriptive and normative proxies but has no prescriptive item that asks which meaning a public institution should enact.",
    "A selected interpretation may actually be a preferred institution, expected outcome, or general freedom value; expert and response-process review must separate those readings before promotion.",
    ["source-freeden-morphology", "source-dahl", "source-rawls", "source-sep-republicanism", "source-aapor"],
  ),
  candidate(
    "bc-political-economy-justice",
    "political-economy",
    "normative",
    "What should make an economic order just?",
    "Ask for the primary reason rather than a preferred policy instrument. The options are competing normative standards, not mutually exclusive empirical descriptions.",
    "open-reason",
    ["Equal basic standing and fair terms of cooperation.", "People's real capabilities to pursue lives they have reason to value.", "Protection against arbitrary domination by concentrated economic power.", "Secure ownership and voluntary exchange under general rules.", "It depends on the circumstances.", "No view yet."],
    "Rawls and Sen articulate different ways of specifying what equality or justice concerns, while republican and liberal traditions supply distinct accounts of economic freedom and domination. The candidate keeps those reasons separate from the descriptive question of how markets coordinate or the prescriptive question of which policy to adopt.",
    "The current bank observes economic mechanisms and policy preferences but has no normative political-economy item that asks which standard makes an arrangement just.",
    "Respondents may select the same standard while meaning security, efficiency, equal status, or anti-domination; the option labels require cognitive probing and do not establish a validated economic-justice construct.",
    ["source-rawls", "source-sen", "source-sep-republicanism", "source-sep-liberalism", "source-aapor"],
  ),
  candidate(
    "bc-change-mechanism",
    "change-strategy",
    "descriptive",
    "When major political change succeeds, which mechanism usually matters most?",
    "Keep the prompt descriptive: ask how change tends to occur, not which route the respondent prefers or whether a specific historical case proves the mechanism.",
    "open-reason",
    ["Existing institutions and organizations carry the change into practice.", "Crisis and conflict open opportunities that ordinary politics does not.", "Organized groups build coalitions, learn, and adapt their strategy.", "A new interpretation of political ideas makes the change legitimate.", "It depends on the case.", "No view yet."],
    "Pierson and North motivate attention to path dependence and institutional capacity, Tilly supplies an organizational and conflict-centered route, and Freeden's morphology makes conceptual change a distinct interpretive possibility. The candidate separates a descriptive theory of change from a prescriptive reform preference.",
    "The production bank has descriptive questions about institutions, crisis, and causal mechanisms, but none is declared as a direct theory-of-change response about which mechanism explains successful political change.",
    "The options mix mechanisms that may co-occur and may be interpreted as historical knowledge, personal strategy, or a normative preference; later review must test whether the item elicits one descriptive account.",
    ["source-pierson", "source-north", "source-tilly", "source-freeden-morphology", "source-aapor"],
  ),
  candidate(
    "bc-change-transition-standard",
    "change-strategy",
    "normative",
    "When an incremental reform improves conditions but leaves a serious injustice in place, what should determine whether it is acceptable?",
    "Use a bounded transition dilemma so the response expresses a standard for judging change, not a general left/right or reform/rupture identity.",
    "conditional-vignette",
    ["Accept it because reducing present harm is decisive.", "Reject it because preserving the injustice is unacceptable.", "Accept it only if it protects a credible route to deeper change.", "Judge it by whether affected people can revise or contest the arrangement.", "It depends on the consequences and available alternatives.", "No view yet."],
    "Pierson's account of path dependence informs the transition problem without deciding its value, while Rawls and Dahl provide distinct normative concerns about justice and public contestation. The candidate asks for the rule used to judge a transition rather than treating reformism as a single directional trait.",
    "The production bank measures reformism as a prescriptive proxy but does not ask which normative standard makes an incremental transition acceptable or unacceptable.",
    "A response may be driven by expected consequences, legitimacy, strategic feasibility, or a priority rule; those reasons cannot be identified from this option choice alone and must remain separate in review.",
    ["source-pierson", "source-rawls", "source-dahl", "source-schwartz", "source-aapor"],
  ),
];

export const beliefGapCandidateCountsFor = (): Readonly<Record<BeliefConstructId, number>> => {
  const counts = Object.fromEntries(BELIEF_CONSTRUCTS.map((constructId) => [constructId, 0])) as Record<BeliefConstructId, number>;
  for (const item of BELIEF_GAP_CANDIDATES) counts[item.constructId] += 1;
  return counts;
};

export const beliefGapCandidateOptionIdFor = (candidate: BeliefGapCandidate, optionIndex: number): string => `${candidate.id}:option-${optionIndex + 1}`;

export const beliefGapEvidenceIdFor = (candidate: BeliefGapCandidate, optionId: string): string => `${candidate.id}:${optionId}`;

export type BeliefGapAnswerMap = Readonly<Partial<Record<string, string>>>;

const sameIdSet = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length
    && new Set(left).size === left.length
    && new Set(right).size === right.length
    && left.every((id) => right.includes(id));

const candidateOptionIndexFor = (candidate: BeliefGapCandidate, optionId: string): number =>
  candidate.responseOptions.findIndex((_, index) => beliefGapCandidateOptionIdFor(candidate, index) === optionId);

const isRecordableGapOption = (optionText: string): boolean => optionText.trim().toLowerCase().replace(/[.!?]+$/u, "") !== "no view yet";

/**
 * Converts a selected candidate option into an explicit, non-scoring record.
 * No-view is retained in the answer map for restoration but is omitted from
 * evidence because it is missing information rather than a substantive rule.
 */
export const gapEvidenceForAnswers = (answers: BeliefGapAnswerMap): readonly BeliefGapEvidence[] => BELIEF_GAP_CANDIDATES.flatMap((candidate) => {
  const optionId = answers[candidate.id];
  if (!optionId) return [];
  const optionIndex = candidateOptionIndexFor(candidate, optionId);
  const optionText = optionIndex >= 0 ? candidate.responseOptions[optionIndex] : undefined;
  if (optionText === undefined || !isRecordableGapOption(optionText)) return [];
  return [{
    id: beliefGapEvidenceIdFor(candidate, optionId),
    candidateId: candidate.id,
    optionId,
    optionText,
    constructId: candidate.constructId,
    layer: candidate.layer,
    responseFormat: candidate.responseFormat,
    evidenceQuestionIds: [candidate.id],
    reviewStatus: candidate.reviewStatus,
    sourceRefs: candidate.sourceRefs,
  }];
});

/**
 * Validates the boundary used by the profile calculator and by future
 * research fixtures. Candidate responses must match the registered prompt,
 * stable option id, construct, layer, and quarantine state exactly.
 */
export const validateBeliefGapEvidence = (
  evidence: readonly BeliefGapEvidence[],
  dataset: Dataset,
): readonly string[] => {
  const errors: string[] = [];
  const candidatesById = new Map(BELIEF_GAP_CANDIDATES.map((candidate) => [candidate.id, candidate]));
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const evidenceIds = new Set<string>();
  const candidateIds = new Set<string>();
  for (const item of evidence) {
    if (evidenceIds.has(item.id)) errors.push(`duplicate belief gap evidence id ${item.id}`);
    evidenceIds.add(item.id);
    if (candidateIds.has(item.candidateId)) errors.push(`duplicate belief gap evidence candidate ${item.candidateId}`);
    candidateIds.add(item.candidateId);
    const candidate = candidatesById.get(item.candidateId);
    if (!candidate) {
      errors.push(`belief gap evidence ${item.id} references unknown candidate ${item.candidateId}`);
      continue;
    }
    if (item.id !== beliefGapEvidenceIdFor(candidate, item.optionId)) errors.push(`belief gap evidence ${item.id} has an unexpected evidence id`);
    if (item.constructId !== candidate.constructId) errors.push(`belief gap evidence ${item.id} has a mismatched construct`);
    if (item.layer !== candidate.layer) errors.push(`belief gap evidence ${item.id} has a mismatched layer`);
    if (item.responseFormat !== candidate.responseFormat) errors.push(`belief gap evidence ${item.id} has a mismatched response format`);
    if (item.reviewStatus !== candidate.reviewStatus) errors.push(`belief gap evidence ${item.id} is not quarantined with its candidate`);
    const optionIndex = candidateOptionIndexFor(candidate, item.optionId);
    if (optionIndex < 0) errors.push(`belief gap evidence ${item.id} references an unavailable candidate option`);
    else {
      const expectedOptionText = candidate.responseOptions[optionIndex];
      if (item.optionText !== expectedOptionText) errors.push(`belief gap evidence ${item.id} has mismatched option text`);
      if (!isRecordableGapOption(expectedOptionText)) errors.push(`belief gap evidence ${item.id} records a no-view option`);
    }
    if (item.evidenceQuestionIds.length !== 1 || item.evidenceQuestionIds[0] !== candidate.id) {
      errors.push(`belief gap evidence ${item.id} must point only to its candidate question record`);
    }
    if (!sameIdSet(item.sourceRefs, candidate.sourceRefs)) errors.push(`belief gap evidence ${item.id} has mismatched candidate source links`);
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief gap evidence ${item.id} references missing source ${sourceRef}`);
    }
  }
  return errors;
};

export const validateBeliefGapCandidates = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const candidateIds = new Set<string>();
  for (const item of BELIEF_GAP_CANDIDATES) {
    if (candidateIds.has(item.id)) errors.push(`duplicate belief gap candidate id ${item.id}`);
    candidateIds.add(item.id);
    if (!BELIEF_CONSTRUCTS.includes(item.constructId)) errors.push(`belief gap candidate ${item.id} references unknown construct ${item.constructId}`);
    if (!LAYERS.includes(item.layer)) errors.push(`belief gap candidate ${item.id} references unknown layer ${item.layer}`);
    if (!item.prompt.trim()) errors.push(`belief gap candidate ${item.id} is missing a prompt`);
    if (!item.context.trim()) errors.push(`belief gap candidate ${item.id} is missing context`);
    if (item.responseOptions.length < 3) errors.push(`belief gap candidate ${item.id} needs at least three response options`);
    if (item.responseOptions.some((option) => !option.trim())) errors.push(`belief gap candidate ${item.id} has an empty response option`);
    if (new Set(item.responseOptions).size !== item.responseOptions.length) errors.push(`belief gap candidate ${item.id} has duplicate response options`);
    if (!item.scholarlyRationale.trim() || !item.gapAddressed.trim() || !item.sameAnswerDifferentReasonRisk.trim()) {
      errors.push(`belief gap candidate ${item.id} is missing research rationale or ambiguity risk`);
    }
    if (item.reviewStatus !== "research_candidate") errors.push(`belief gap candidate ${item.id} is not quarantined`);
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief gap candidate ${item.id} references missing source ${sourceRef}`);
    }
  }
  return errors;
};
