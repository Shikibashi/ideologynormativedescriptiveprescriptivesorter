import { BELIEF_CONSTRUCTS, LAYERS, type BeliefCandidateResponseFormat, type BeliefConstructId, type BeliefGapCandidate, type Dataset } from "./types";

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
 * respondent-facing quiz or the legacy scorer.
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
    ["source-schwartz", "source-rawls", "source-aapor"],
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
    ["source-schwartz", "source-rockstrom", "source-aapor"],
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
    ["source-schwartz", "source-rawls", "source-anderson"],
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
    ["source-pierson", "source-schwartz", "source-aapor"],
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
    ["source-adcock-collier", "source-borsboom-validity", "source-aapor"],
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
    ["source-aapor", "source-adcock-collier", "source-borsboom-validity"],
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
    ["source-aera-testing-standards", "source-borsboom-validity", "source-aapor"],
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
    ["source-freeden-morphology", "source-aapor"],
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
    ["source-dahl", "source-freeden-morphology", "source-aapor"],
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
    ["source-dahl", "source-freeden-morphology", "source-aapor"],
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
    ["source-freeden-morphology", "source-dahl", "source-aapor"],
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
    ["source-freeden-morphology", "source-dahl", "source-aapor"],
  ),
];

export const beliefGapCandidateCountsFor = (): Readonly<Record<BeliefConstructId, number>> => {
  const counts = Object.fromEntries(BELIEF_CONSTRUCTS.map((constructId) => [constructId, 0])) as Record<BeliefConstructId, number>;
  for (const item of BELIEF_GAP_CANDIDATES) counts[item.constructId] += 1;
  return counts;
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
