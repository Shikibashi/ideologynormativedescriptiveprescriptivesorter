import {
  BELIEF_CONSTRUCTS,
  type BeliefConfidenceLevel,
  type BeliefConstructId,
  type BeliefRelationalEvidence,
  type BeliefRelationalEvidenceKind,
  type Dataset,
  type Layer,
} from "./types";

export type BeliefRelationalFollowUpOption = Readonly<{
  id: string;
  label: string;
  statement: string;
  /** Sources for the substantive relationship represented by this option. */
  sourceRefs: readonly string[];
  rule?: string;
  condition?: string;
  resolution?: string;
  confidence?: BeliefConfidenceLevel;
  record?: boolean;
}>;

export type BeliefRelationalFollowUp = Readonly<{
  id: string;
  layer: Layer;
  kind: BeliefRelationalEvidenceKind;
  constructIds: readonly BeliefConstructId[];
  prompt: string;
  context: string;
  options: readonly BeliefRelationalFollowUpOption[];
  sourceRefs: readonly string[];
}>;

export type BeliefRelationalAnswerMap = Readonly<Partial<Record<string, string>>>;

const noViewOption = (): BeliefRelationalFollowUpOption => ({
  id: "no-view",
  label: "No view yet",
  statement: "The respondent does not yet have a view on this relationship.",
  sourceRefs: [],
  record: false,
});

export const BELIEF_RELATIONAL_FOLLOWUPS: readonly BeliefRelationalFollowUp[] = [
  {
    id: "priority-liberty-equality",
    layer: "normative",
    kind: "priority",
    constructIds: ["priority-conflict", "concept-conception", "distributive-principle"],
    prompt: "When protecting individual freedom conflicts with reducing material inequality, which principle should take priority?",
    context: "This records an explicit ordering rule. It does not identify the reason for the choice or imply that either outcome is factually established.",
    options: [
      {
        id: "freedom-first",
        label: "Protect individual freedom first",
        statement: "When the two cannot both be protected, individual freedom should take priority even if material inequality remains.",
        sourceRefs: ["source-sep-liberalism"],
        rule: "Give priority to individual freedom when the principles directly conflict.",
      },
      {
        id: "equality-first",
        label: "Reduce material inequality first",
        statement: "When the two cannot both be protected, reducing material inequality should take priority even if some choices are constrained.",
        sourceRefs: ["source-rawls", "source-sen"],
        rule: "Give priority to reducing material inequality when the principles directly conflict.",
      },
      {
        id: "contextual-priority",
        label: "Use a stated context rule",
        statement: "The priority between individual freedom and material equality should depend on the severity and context of the conflict.",
        sourceRefs: ["source-freeden-morphology", "source-rawls"],
        rule: "Apply a context-specific priority rule rather than treating either principle as absolute.",
      },
      noViewOption(),
    ],
    sourceRefs: ["source-schwartz", "source-rawls", "source-aapor"],
  },
  {
    id: "conditional-reform-deep-change",
    layer: "prescriptive",
    kind: "conditional",
    constructIds: ["priority-conflict", "change-strategy", "institutional-mechanism"],
    prompt: "A reform improves people's lives now but makes a deeper institutional change harder later. What should determine your support?",
    context: "This records a condition attached to a change strategy. It does not predict whether a reform will actually produce the described effects.",
    options: [
      {
        id: "support-immediate-benefit",
        label: "Support the immediate benefit",
        statement: "A reform should be supported when its immediate benefit is large enough to justify narrowing the later path to deeper change.",
        sourceRefs: ["source-pierson"],
        condition: "The immediate benefit is large enough to justify the loss of future flexibility.",
        resolution: "Support the reform under that condition.",
      },
      {
        id: "protect-deeper-path",
        label: "Protect the deeper path",
        statement: "A reform should be supported only when a credible route to deeper institutional change can be protected.",
        sourceRefs: ["source-pierson"],
        condition: "Safeguards preserve a credible route to the deeper change.",
        resolution: "Support the reform with those safeguards.",
      },
      {
        id: "withhold-foreclosing-reform",
        label: "Withhold support if it forecloses change",
        statement: "A reform should not be supported when it materially forecloses a deeper institutional change, even if it brings a short-term improvement.",
        sourceRefs: ["source-pierson"],
        condition: "The reform materially forecloses the deeper change.",
        resolution: "Withhold support under that condition.",
      },
      {
        id: "need-more-information",
        label: "Need more information first",
        statement: "Support should remain conditional until the likely immediate effects and later institutional consequences can be examined.",
        sourceRefs: ["source-pierson", "source-adcock-collier"],
        condition: "The consequences cannot yet be estimated with enough confidence.",
        resolution: "Defer the decision pending relevant information.",
      },
      noViewOption(),
    ],
    sourceRefs: ["source-pierson", "source-schwartz", "source-aapor"],
  },
  {
    id: "conflict-rights-local-autonomy",
    layer: "prescriptive",
    kind: "conflict-resolution",
    constructIds: ["priority-conflict", "institutional-mechanism", "legitimacy-authority"],
    prompt: "When local self-government conflicts with uniform protection of basic rights, how should the conflict be resolved?",
    context: "This records a preferred institutional resolution. It does not establish which institutional design would be most effective in practice.",
    options: [
      {
        id: "rights-floor",
        label: "Set a uniform rights floor",
        statement: "A uniform basic-rights floor should be enforced while leaving other matters to local self-government.",
        sourceRefs: ["source-rawls"],
        resolution: "Protect basic rights uniformly and preserve local discretion above that floor.",
      },
      {
        id: "local-autonomy-default",
        label: "Protect local autonomy by default",
        statement: "Local self-government should be protected unless a clearly specified and serious rights violation occurs.",
        sourceRefs: ["source-ostrom"],
        resolution: "Preserve local authority unless the stated rights threshold is crossed.",
      },
      {
        id: "publicly-contestable-floor",
        label: "Use a contestable minimum",
        statement: "A publicly contestable process should define a minimum rights floor while leaving room for local institutional variation.",
        sourceRefs: ["source-dahl", "source-rawls"],
        resolution: "Use transparent review to set the floor and revise it through accountable procedures.",
      },
      noViewOption(),
    ],
    sourceRefs: ["source-dahl", "source-rawls", "source-aapor"],
  },
  {
    id: "uncertainty-descriptive-claim",
    layer: "descriptive",
    kind: "uncertainty",
    constructIds: ["epistemic-stance", "diagnosis-causal-account"],
    prompt: "How should confidence in a descriptive political claim affect how you act on it when evidence is incomplete?",
    context: "Confidence is recorded separately from agreement. A confidence selection is not a finding about accuracy, truth, or the quality of the underlying evidence.",
    options: [
      {
        id: "cautious-low-confidence",
        label: "Act cautiously at low confidence",
        statement: "When confidence in a descriptive claim is low, action should remain cautious and open to revision.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
        confidence: "low",
      },
      {
        id: "provisional-moderate-confidence",
        label: "Act provisionally at moderate confidence",
        statement: "When confidence in a descriptive claim is moderate, action may proceed provisionally while relevant evidence is gathered.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
        confidence: "moderate",
      },
      {
        id: "confident-high-confidence",
        label: "Act on a high-confidence claim",
        statement: "When confidence in a descriptive claim is high, it may guide action while remaining revisable if strong contrary evidence appears.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
        confidence: "high",
      },
      {
        id: "confidence-not-stated",
        label: "Do not rate confidence yet",
        statement: "There is not enough basis to rate confidence in the descriptive claim yet.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
        confidence: "not-stated",
      },
      noViewOption(),
    ],
    sourceRefs: ["source-adcock-collier", "source-borsboom-validity", "source-aapor"],
  },
  {
    id: "contradiction-goal-route",
    layer: "prescriptive",
    kind: "contradiction",
    constructIds: ["priority-conflict", "legitimacy-authority", "institutional-mechanism"],
    prompt: "If a stated political goal conflicts with the institutional route you prefer, which description best fits your view?",
    context: "This makes a possible contradiction visible without deciding whether the goal or route is correct. It distinguishes a resolved trade-off from a conflict that remains open.",
    options: [
      {
        id: "no-tension",
        label: "The goal and route do not conflict",
        statement: "The stated political goal and the preferred institutional route are compatible in this case.",
        sourceRefs: [],
        record: false,
      },
      {
        id: "explicit-tradeoff",
        label: "Make the trade-off explicit",
        statement: "The goal and route create a trade-off that should be made explicit and resolved with safeguards.",
        sourceRefs: ["source-freeden-morphology"],
        resolution: "Name the trade-off and adopt safeguards before proceeding.",
      },
      {
        id: "revise-route",
        label: "Revise the preferred route",
        statement: "The conflict means that the preferred institutional route should be revised to better serve the stated goal.",
        sourceRefs: ["source-freeden-morphology"],
        resolution: "Revise the route and reassess whether it serves the goal.",
      },
      {
        id: "unresolved-conflict",
        label: "Leave the conflict unresolved",
        statement: "The conflict between the goal and route remains unresolved and should be reported rather than hidden.",
        sourceRefs: ["source-freeden-morphology"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-aapor"],
  },
  {
    id: "contestation-minority-response",
    layer: "prescriptive",
    kind: "contestation",
    constructIds: ["heterodoxy-contestation", "legitimacy-authority"],
    prompt: "A minority within a political movement rejects one central policy but accepts the broader purpose. What response best fits your view?",
    context: "This records a response to internal dissent. It does not classify a respondent's identity or decide which side of a dispute is correct.",
    options: [
      {
        id: "exclude-dissent",
        label: "Exclude the dissenting position",
        statement: "A movement may exclude a minority position when rejecting the central policy is incompatible with the movement's defined purpose.",
        sourceRefs: ["source-freeden-morphology"],
        resolution: "Use a publicly stated membership boundary.",
      },
      {
        id: "protect-dissent",
        label: "Protect internal dissent",
        statement: "A movement should protect internal dissent when the minority accepts the broader purpose and participates in good faith.",
        sourceRefs: ["source-dahl"],
        resolution: "Keep the disagreement inside the movement's contestable discussion.",
      },
      {
        id: "revise-purpose",
        label: "Reconsider the central policy",
        statement: "A principled internal rejection should prompt the movement to reconsider whether its central policy expresses the broader purpose.",
        sourceRefs: ["source-freeden-morphology", "source-dahl"],
        resolution: "Reopen the policy through an accountable revision process.",
      },
      {
        id: "contextual-contestation",
        label: "Decide by stated conditions",
        statement: "The response to internal dissent should depend on the policy's consequences, the movement's purpose, and the quality of the disagreement.",
        sourceRefs: ["source-freeden-morphology", "source-dahl"],
        condition: "The response depends on the issue's consequences and the meaning of membership.",
        resolution: "Apply a transparent contestation rule to the specific dispute.",
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-dahl", "source-aapor"],
  },
] as const;

/**
 * Validates the respondent-facing relational definitions before they can
 * produce explicit evidence. Item-level sources explain question design;
 * recordable option sources explain the selected relationship itself.
 */
export const validateBeliefRelationalFollowUps = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const constructIds = new Set<BeliefConstructId>(BELIEF_CONSTRUCTS);
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const followUpIds = new Set<string>();
  for (const followUp of BELIEF_RELATIONAL_FOLLOWUPS) {
    if (followUpIds.has(followUp.id)) errors.push(`duplicate relational follow-up id ${followUp.id}`);
    followUpIds.add(followUp.id);
    if (followUp.constructIds.length === 0) errors.push(`relational follow-up ${followUp.id} has no construct links`);
    for (const constructId of followUp.constructIds) {
      if (!constructIds.has(constructId)) errors.push(`relational follow-up ${followUp.id} references unknown construct ${constructId}`);
    }
    if (followUp.options.length < 4) errors.push(`relational follow-up ${followUp.id} has too few options`);
    const optionIds = new Set<string>();
    for (const option of followUp.options) {
      if (optionIds.has(option.id)) errors.push(`relational follow-up ${followUp.id} has duplicate option ${option.id}`);
      optionIds.add(option.id);
      if (!option.label.trim() || !option.statement.trim()) errors.push(`relational follow-up ${followUp.id} has an incomplete option ${option.id}`);
      if (option.record !== false && option.sourceRefs.length === 0) {
        errors.push(`relational follow-up ${followUp.id} option ${option.id} has no substantive source links`);
      }
      if (followUp.kind === "conditional" && option.record !== false && !option.condition?.trim()) {
        errors.push(`conditional relational follow-up ${followUp.id} option ${option.id} has no stated condition`);
      }
      for (const sourceRef of option.sourceRefs) {
        if (!sourceIds.has(sourceRef)) errors.push(`relational follow-up ${followUp.id} option ${option.id} references missing source ${sourceRef}`);
      }
    }
    if (!followUp.options.some((option) => option.id === "no-view" && option.record === false)) {
      errors.push(`relational follow-up ${followUp.id} has no explicit no-view option`);
    }
    for (const sourceRef of followUp.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`relational follow-up ${followUp.id} references missing source ${sourceRef}`);
    }
    if (followUp.sourceRefs.length === 0) errors.push(`relational follow-up ${followUp.id} has no question-design source links`);
  }
  return errors;
};

const followUpById = new Map(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, followUp]));

export const hasBeliefRelationalFollowUpQuestionId = (questionId: string): boolean => followUpById.has(questionId);

export const relationalEvidenceForAnswers = (
  answers: BeliefRelationalAnswerMap,
): readonly BeliefRelationalEvidence[] => BELIEF_RELATIONAL_FOLLOWUPS.flatMap((followUp) => {
  const optionId = answers[followUp.id];
  const option = followUp.options.find((candidate) => candidate.id === optionId);
  if (!option || option.record === false) return [];
  return [{
    id: `followup:${followUp.id}:${option.id}`,
    optionId: option.id,
    layer: followUp.layer,
    kind: followUp.kind,
    constructIds: followUp.constructIds,
    statement: option.statement,
    ...(option.rule ? { rule: option.rule } : {}),
    ...(option.condition ? { condition: option.condition } : {}),
    ...(option.resolution ? { resolution: option.resolution } : {}),
    ...(option.confidence ? { confidence: option.confidence } : {}),
    evidenceQuestionIds: [followUp.id],
    sourceRefs: option.sourceRefs,
  }];
});
