import {
  BELIEF_CONSTRUCTS,
  type BeliefConstructId,
  type BeliefDirectEvidence,
  type BeliefDirectEvidenceKind,
  type Dataset,
  type Layer,
} from "./types";

export type BeliefDirectItemOption = Readonly<{
  id: string;
  label: string;
  statement: string;
  /** Sources for the substantive account represented by this option. */
  sourceRefs: readonly string[];
  record?: boolean;
}>;

export type BeliefDirectItem = Readonly<{
  id: string;
  layer: Layer;
  kind: BeliefDirectEvidenceKind;
  constructIds: readonly BeliefConstructId[];
  prompt: string;
  context: string;
  options: readonly BeliefDirectItemOption[];
  sourceRefs: readonly string[];
}>;

export type BeliefDirectAnswerMap = Readonly<Partial<Record<string, string>>>;

const noViewOption = (): BeliefDirectItemOption => ({
  id: "no-view",
  label: "No view yet",
  statement: "The respondent does not yet have a view on this account.",
  sourceRefs: [],
  record: false,
});

export const BELIEF_DIRECT_ITEMS: readonly BeliefDirectItem[] = [
  {
    id: "conception-of-freedom",
    layer: "normative",
    kind: "conception",
    constructIds: ["concept-conception", "legitimacy-authority"],
    prompt: "Which meaning of political freedom is closest to your view?",
    context: "The options describe different conceptions of a shared political concept. Selecting one does not classify you by an ideology or establish that the conception is correct.",
    options: [
      {
        id: "non-interference",
        label: "Freedom from interference",
        statement: "Political freedom primarily means being protected from intentional interference with one's choices.",
        sourceRefs: ["source-sep-liberalism"],
      },
      {
        id: "non-domination",
        label: "Freedom from arbitrary power",
        statement: "Political freedom primarily means not living under another person's or institution's uncontrolled power, even when no interference is occurring.",
        sourceRefs: ["source-sep-republicanism"],
      },
      {
        id: "effective-capability",
        label: "Effective ability to act",
        statement: "Political freedom primarily means having the real capabilities and conditions needed to pursue one's choices.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "plural-conception",
        label: "A plural or context-dependent meaning",
        statement: "Political freedom has several legitimate meanings whose relative importance depends on the context.",
        sourceRefs: ["source-freeden-morphology"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-rawls", "source-aapor"],
  },
  {
    id: "moral-scope-of-obligation",
    layer: "normative",
    kind: "moral-scope",
    constructIds: ["social-order-moral-scope", "distributive-principle"],
    prompt: "Which scope of political obligation is closest to your view?",
    context: "This asks who or what should count in political reasoning. It is not a question about personal identity, ancestry, or membership in a current group.",
    options: [
      {
        id: "universal-scope",
        label: "Equal concern for everyone affected",
        statement: "Political obligations should extend equally to all people affected by a decision, regardless of formal membership.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "community-priority",
        label: "Special duties within a political community",
        statement: "Political communities may owe special duties to their members while recognizing general duties to outsiders.",
        sourceRefs: ["source-anderson"],
      },
      {
        id: "reciprocal-scope",
        label: "Scope shaped by reciprocity",
        statement: "The scope of political obligation should be shaped substantially by reciprocal relationships and shared institutions.",
        sourceRefs: ["source-ostrom"],
      },
      {
        id: "expanded-scope",
        label: "Include future and nonhuman interests",
        statement: "Political reasoning should include future generations and, where relevant, nonhuman interests alongside present human interests.",
        sourceRefs: ["source-gardiner", "source-sep-environmental-ethics"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-schwartz", "source-anderson", "source-aapor"],
  },
  {
    id: "causal-account-of-inequality",
    layer: "descriptive",
    kind: "causal-account",
    constructIds: ["diagnosis-causal-account", "legitimacy-authority"],
    prompt: "When unequal outcomes persist, which causal account is closest to your view?",
    context: "This records a respondent-stated explanatory emphasis. It is not a test of which explanation is empirically true and does not rule out multiple causes.",
    options: [
      {
        id: "unequal-resources",
        label: "Unequal resources and bargaining power",
        statement: "Unequal outcomes persist mainly because resources and bargaining power are distributed unevenly across social positions.",
        sourceRefs: ["source-gilens-page"],
      },
      {
        id: "institutional-feedback",
        label: "Institutional rules and feedback",
        statement: "Unequal outcomes persist mainly because institutions create feedback effects that reproduce advantage and disadvantage over time.",
        sourceRefs: ["source-north", "source-pierson"],
      },
      {
        id: "norms-and-culture",
        label: "Norms and cultural expectations",
        statement: "Unequal outcomes persist mainly because norms, expectations, and cultural practices shape opportunities and behavior.",
        sourceRefs: ["source-schwartz", "source-anderson"],
      },
      {
        id: "multiple-or-uncertain-causes",
        label: "Multiple or uncertain causes",
        statement: "Unequal outcomes usually have multiple interacting causes, and the dominant mechanism cannot be identified without context-specific evidence.",
        sourceRefs: ["source-adcock-collier", "source-treier-hillygus"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-north", "source-pierson", "source-adcock-collier", "source-aapor"],
  },
  {
    id: "legitimacy-basis",
    layer: "normative",
    kind: "legitimacy-basis",
    constructIds: ["legitimacy-authority", "concept-conception"],
    prompt: "What most fundamentally makes public authority legitimate?",
    context: "The options distinguish reasons for legitimacy from the practical effectiveness of an institution. A selection records emphasis, not a complete theory of authority.",
    options: [
      {
        id: "consent-and-participation",
        label: "Consent and participation",
        statement: "Public authority is legitimate when people can participate in authorizing, contesting, and revising the rules that govern them.",
        sourceRefs: ["source-dahl"],
      },
      {
        id: "rights-and-general-rules",
        label: "Rights and general rules",
        statement: "Public authority is legitimate when it is constrained by rights and general rules that apply to officeholders and citizens alike.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "public-outcomes",
        label: "Securing public outcomes",
        statement: "Public authority is legitimate chiefly when it reliably secures important public goods and protects people from serious harm.",
        sourceRefs: ["source-fukuyama"],
      },
      {
        id: "contestable-basis",
        label: "A contestable combination",
        statement: "Legitimacy depends on a combination of participation, rights, and outcomes whose relative importance must remain open to public contestation.",
        sourceRefs: ["source-dahl", "source-rawls"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-dahl", "source-rawls", "source-aapor"],
  },
  {
    id: "distributive-reason",
    layer: "normative",
    kind: "distributive-reason",
    constructIds: ["distributive-principle", "social-order-moral-scope"],
    prompt: "When supporting a shared social floor, which reason is closest to your view?",
    context: "This separates reasons that can support the same policy. It does not imply that one distributive principle is universally applicable or factually achieved by a particular program.",
    options: [
      {
        id: "equal-standing",
        label: "Equal standing",
        statement: "A shared social floor is justified because each person should have equal standing as a member of the political community.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "need",
        label: "Meeting urgent need",
        statement: "A shared social floor is justified because people facing serious deprivation should receive what they need for a minimally decent life.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "capability",
        label: "Securing real capabilities",
        statement: "A shared social floor is justified because people need substantive capabilities to pursue lives they have reason to value.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "reciprocity-and-common-claim",
        label: "Reciprocity and common claim",
        statement: "A shared social floor is justified because social cooperation creates reciprocal claims among people who contribute to and depend on common institutions.",
        sourceRefs: ["source-rawls", "source-ostrom"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-rawls", "source-sen", "source-schwartz", "source-aapor"],
  },
  {
    id: "institutional-route",
    layer: "prescriptive",
    kind: "institutional-route",
    constructIds: ["institutional-mechanism", "legitimacy-authority"],
    prompt: "Which institutional route is closest to how you expect a public goal to be achieved?",
    context: "This asks about the mechanism a respondent expects to connect an institution to an outcome. It does not test whether that mechanism works or identify a preferred ideology.",
    options: [
      {
        id: "general-rules-and-rights",
        label: "General rules and enforceable rights",
        statement: "A public goal is best achieved by establishing general rules and enforceable rights that constrain arbitrary action.",
        sourceRefs: ["source-north", "source-rawls"],
      },
      {
        id: "public-capacity-and-provision",
        label: "Public capacity and provision",
        statement: "A public goal is best achieved by building capable institutions that provide or coordinate essential goods and services.",
        sourceRefs: ["source-north", "source-fukuyama"],
      },
      {
        id: "local-association-and-experiment",
        label: "Local association and experimentation",
        statement: "A public goal is best achieved by giving affected communities room to organize, experiment, and revise arrangements locally.",
        sourceRefs: ["source-ostrom"],
      },
      {
        id: "plural-route",
        label: "A plural route chosen by context",
        statement: "No single institutional route is generally best; the appropriate mechanism depends on scale, knowledge, power, and the stakes of the goal.",
        sourceRefs: ["source-ostrom", "source-dahl", "source-north"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-north", "source-ostrom", "source-dahl", "source-aapor"],
  },
  {
    id: "political-economy-mechanism",
    layer: "descriptive",
    kind: "political-economy",
    constructIds: ["political-economy", "diagnosis-causal-account"],
    prompt: "Which account is closest to your view of how economic coordination and power relate?",
    context: "This records an explanatory emphasis about markets, ownership, and power. It is not a prediction about a particular economy or a recommendation for a current policy.",
    options: [
      {
        id: "exchange-and-dispersed-knowledge",
        label: "Exchange and dispersed knowledge",
        statement: "Decentralized exchange can coordinate activity because information and practical knowledge are distributed across participants.",
        sourceRefs: ["source-hayek"],
      },
      {
        id: "ownership-and-power",
        label: "Ownership and bargaining power",
        statement: "Economic outcomes are shaped substantially by ownership and bargaining power, not only by voluntary exchange.",
        sourceRefs: ["source-bakker-jolly-polk", "source-gilens-page"],
      },
      {
        id: "public-and-common-institutions",
        label: "Public and common institutions",
        statement: "Economic coordination depends substantially on public and common institutions that organize shared goods and limit destabilizing power.",
        sourceRefs: ["source-ostrom", "source-warwick"],
      },
      {
        id: "mixed-and-contextual-account",
        label: "A mixed or context-dependent account",
        statement: "Markets, ownership, public institutions, and social norms interact, so no single account explains economic coordination across contexts.",
        sourceRefs: ["source-warwick", "source-ostrom"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-hayek", "source-bakker-jolly-polk", "source-warwick", "source-aapor"],
  },
  {
    id: "change-path",
    layer: "prescriptive",
    kind: "change-path",
    constructIds: ["change-strategy", "institutional-mechanism"],
    prompt: "Which path of political change is closest to your view?",
    context: "This records a preferred change strategy as a categorical commitment. It does not estimate the costs or likely success of any path.",
    options: [
      {
        id: "incremental-reform",
        label: "Incremental reform",
        statement: "Political change should usually proceed through cumulative reforms that can be tested, revised, and made durable.",
        sourceRefs: ["source-pierson"],
      },
      {
        id: "transformative-change",
        label: "Transformative change",
        statement: "Political change should address the underlying structure of power even when doing so requires a substantial institutional transformation.",
        sourceRefs: ["source-pierson", "source-rawls"],
      },
      {
        id: "restoration-and-continuity",
        label: "Restoration and continuity",
        statement: "Political change should generally preserve or restore institutions and practices that have proven capable of sustaining social continuity.",
        sourceRefs: ["source-jost"],
      },
      {
        id: "experimental-sequencing",
        label: "Experimental sequencing",
        statement: "Political change should proceed through reversible experiments and sequencing, with the path revised as consequences become clearer.",
        sourceRefs: ["source-pierson", "source-ostrom"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-pierson", "source-rawls", "source-aapor"],
  },
] as const;

const directItemById = new Map(BELIEF_DIRECT_ITEMS.map((item) => [item.id, item]));

const sameIdSet = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((id) => right.includes(id));

export const hasBeliefDirectQuestionId = (questionId: string): boolean => directItemById.has(questionId);

export const directEvidenceForAnswers = (
  answers: BeliefDirectAnswerMap,
): readonly BeliefDirectEvidence[] => BELIEF_DIRECT_ITEMS.flatMap((item) => {
  const optionId = answers[item.id];
  const option = item.options.find((candidate) => candidate.id === optionId);
  if (!option || option.record === false) return [];
  return [{
    id: `direct:${item.id}:${option.id}`,
    questionId: item.id,
    layer: item.layer,
    kind: item.kind,
    constructIds: item.constructIds,
    optionId: option.id,
    optionLabel: option.label,
    statement: option.statement,
    evidenceQuestionIds: [item.id],
    sourceRefs: option.sourceRefs,
  }];
});

export const validateBeliefDirectItems = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const constructIds = new Set<BeliefConstructId>(BELIEF_CONSTRUCTS);
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const itemIds = new Set<string>();
  for (const item of BELIEF_DIRECT_ITEMS) {
    if (itemIds.has(item.id)) errors.push(`duplicate direct belief item id ${item.id}`);
    itemIds.add(item.id);
    if (item.constructIds.length === 0) errors.push(`direct belief item ${item.id} has no construct links`);
    for (const constructId of item.constructIds) {
      if (!constructIds.has(constructId)) errors.push(`direct belief item ${item.id} references unknown construct ${constructId}`);
    }
    if (item.options.length < 2) errors.push(`direct belief item ${item.id} has too few options`);
    const optionIds = new Set<string>();
    for (const option of item.options) {
      if (optionIds.has(option.id)) errors.push(`direct belief item ${item.id} has duplicate option ${option.id}`);
      optionIds.add(option.id);
      if (!option.label.trim() || !option.statement.trim()) errors.push(`direct belief item ${item.id} has an incomplete option ${option.id}`);
      if (option.record !== false && option.sourceRefs.length === 0) {
        errors.push(`direct belief item ${item.id} option ${option.id} has no substantive source links`);
      }
      for (const sourceRef of option.sourceRefs) {
        if (!sourceIds.has(sourceRef)) errors.push(`direct belief item ${item.id} option ${option.id} references missing source ${sourceRef}`);
      }
    }
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`direct belief item ${item.id} references missing source ${sourceRef}`);
    }
    if (item.sourceRefs.length === 0) errors.push(`direct belief item ${item.id} has no source links`);
  }
  return errors;
};

export const validateBeliefDirectEvidence = (
  evidence: readonly BeliefDirectEvidence[],
  dataset: Dataset,
): readonly string[] => {
  const errors: string[] = [];
  const constructIds = new Set<BeliefConstructId>(BELIEF_CONSTRUCTS);
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  const evidenceIds = new Set<string>();
  for (const item of evidence) {
    if (evidenceIds.has(item.id)) errors.push(`duplicate direct belief evidence id ${item.id}`);
    evidenceIds.add(item.id);
    const directItem = directItemById.get(item.questionId);
    if (!directItem) errors.push(`direct belief evidence ${item.id} references missing direct item ${item.questionId}`);
    if (directItem && directItem.layer !== item.layer) errors.push(`direct belief evidence ${item.id} has a mismatched layer`);
    if (directItem && directItem.kind !== item.kind) errors.push(`direct belief evidence ${item.id} has a mismatched kind`);
    if (directItem && !sameIdSet(item.constructIds, directItem.constructIds)) errors.push(`direct belief evidence ${item.id} has mismatched construct links`);
    const option = directItem?.options.find((candidate) => candidate.id === item.optionId);
    if (directItem && (!option || option.record === false)) errors.push(`direct belief evidence ${item.id} references an unavailable option`);
    if (option && option.record !== false) {
      if (item.optionLabel !== option.label) errors.push(`direct belief evidence ${item.id} has mismatched option text`);
      if (item.statement !== option.statement) errors.push(`direct belief evidence ${item.id} has mismatched option statement`);
    }
    if (item.constructIds.length === 0) errors.push(`direct belief evidence ${item.id} has no construct links`);
    for (const constructId of item.constructIds) {
      if (!constructIds.has(constructId)) errors.push(`direct belief evidence ${item.id} references unknown construct ${constructId}`);
    }
    if (!item.statement.trim() || !item.optionLabel.trim()) errors.push(`direct belief evidence ${item.id} is missing option text`);
    if (item.evidenceQuestionIds.length !== 1 || item.evidenceQuestionIds[0] !== item.questionId) {
      errors.push(`direct belief evidence ${item.id} must point to its direct item question`);
    }
    if (item.sourceRefs.length === 0) errors.push(`direct belief evidence ${item.id} has no source links`);
    if (option && option.record !== false && directItem && !sameIdSet(item.sourceRefs, option.sourceRefs)) {
      errors.push(`direct belief evidence ${item.id} has mismatched option source links`);
    }
    for (const questionId of item.evidenceQuestionIds) {
      if (!directItemById.has(questionId)) errors.push(`direct belief evidence ${item.id} references missing evidence question ${questionId}`);
    }
    for (const sourceRef of item.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`direct belief evidence ${item.id} references missing source ${sourceRef}`);
    }
  }
  return errors;
};
