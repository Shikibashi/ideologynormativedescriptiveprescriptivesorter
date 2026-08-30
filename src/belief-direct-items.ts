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
  {
    id: "priority-conflict-rule",
    layer: "normative",
    kind: "priority-rule",
    constructIds: ["priority-conflict"],
    prompt: "When two important political commitments cannot both be fully realized, which priority rule is closest to your view?",
    context: "This asks how competing commitments should be ordered after a conflict is identified. It records a rule rather than the strength of either commitment and does not assume that one hierarchy applies in every context.",
    options: [
      {
        id: "protect-basic-floor",
        label: "Protect a basic floor first",
        statement: "When commitments conflict, protect basic rights or urgent needs before pursuing competing gains.",
        sourceRefs: ["source-rawls", "source-sen"],
      },
      {
        id: "principled-balance",
        label: "Seek a principled balance",
        statement: "When commitments conflict, seek a publicly justifiable balance rather than treating one commitment as permanently prior.",
        sourceRefs: ["source-sagiv-schwartz-values-review", "source-freeden-morphology"],
      },
      {
        id: "context-specific-priority",
        label: "Use a context-specific rule",
        statement: "Priority should depend on the context, including the scale, affected parties, reversibility, and kind of harm at stake.",
        sourceRefs: ["source-sagiv-schwartz-values-review", "source-freeden-steers-morphology"],
      },
      {
        id: "stable-priority-hierarchy",
        label: "Follow a stable hierarchy",
        statement: "A political framework should establish an ordering of commitments in advance and apply it consistently when conflicts arise.",
        sourceRefs: ["source-rawls", "source-schwartz"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-sagiv-schwartz-values-review", "source-freeden-morphology", "source-rawls", "source-aapor"],
  },
  {
    id: "epistemic-stance-pilot",
    layer: "descriptive",
    kind: "epistemic-stance",
    constructIds: ["epistemic-stance"],
    prompt: "When evidence for a political claim is incomplete or conflicting, which stance is closest to your view?",
    context: "This records how a person relates a claim to uncertainty. It does not determine factual accuracy, information level, or willingness to act in every context.",
    options: [
      {
        id: "withhold-judgment",
        label: "Withhold judgment until evidence improves",
        statement: "When evidence is incomplete or conflicting, suspend the claim or action until stronger evidence is available.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
      },
      {
        id: "provisional-revision",
        label: "Act provisionally and revise",
        statement: "Treat the claim as provisional, act cautiously when necessary, and revise it as relevant evidence changes.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
      },
      {
        id: "retain-multiple-accounts",
        label: "Keep multiple accounts open",
        statement: "When evidence underdetermines one explanation, retain multiple plausible accounts rather than forcing a single conclusion.",
        sourceRefs: ["source-adcock-collier", "source-treier-hillygus"],
      },
      {
        id: "separate-principles-from-claims",
        label: "Separate principles from empirical claims",
        statement: "Maintain a normative commitment while marking its empirical assumptions as revisable when evidence conflicts.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-adcock-collier", "source-aera-testing-standards", "source-treier-hillygus", "source-aapor"],
  },
  {
    id: "heterodoxy-contestation-pilot",
    layer: "prescriptive",
    kind: "contestation-response",
    constructIds: ["heterodoxy-contestation"],
    prompt: "When a member challenges a movement's central interpretation while accepting its broader purpose, which response is closest to your view?",
    context: "This asks how a tradition or movement should handle internal disagreement. It does not decide whether the dissenting interpretation is correct or identify current membership.",
    options: [
      {
        id: "protect-good-faith-dissent",
        label: "Protect good-faith dissent",
        statement: "A movement should protect good-faith dissent so members can challenge an interpretation without automatic exclusion.",
        sourceRefs: ["source-dahl", "source-freeden-steers-morphology"],
      },
      {
        id: "reopen-interpretation",
        label: "Reopen the interpretation",
        statement: "A movement should revisit its central interpretation through accountable internal discussion and revision.",
        sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology"],
      },
      {
        id: "maintain-defining-boundary",
        label: "Maintain a stated boundary",
        statement: "A movement should retain a clear boundary when a challenge rejects a purpose it treats as defining.",
        sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology"],
      },
      {
        id: "use-explicit-contestation-process",
        label: "Use a stated contestation process",
        statement: "A movement should publish conditions for membership, dissent, consequence, and revision, then apply them consistently.",
        sourceRefs: ["source-dahl", "source-freeden-steers-morphology"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology", "source-dahl", "source-aapor"],
  },
  {
    id: "conception-liberty-institution-pilot",
    layer: "prescriptive",
    kind: "conception",
    constructIds: ["concept-conception"],
    prompt: "When a public institution is designed to protect liberty, which interpretation should guide its rules?",
    context: "This records a preferred meaning for an institutional rule. It does not assess institutional performance or classify a respondent by ideology.",
    options: [
      {
        id: "prevent-direct-interference",
        label: "Prevent direct interference",
        statement: "A liberty-protecting institution should primarily prevent public or private power from directly interfering with people's choices.",
        sourceRefs: ["source-sep-liberalism"],
      },
      {
        id: "secure-effective-capabilities",
        label: "Secure effective capabilities",
        statement: "A liberty-protecting institution should secure the real capabilities people need to act on choices they have reason to value.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "prevent-arbitrary-dependence",
        label: "Prevent arbitrary dependence",
        statement: "A liberty-protecting institution should prevent people from becoming dependent on anyone who can control their options without accountability.",
        sourceRefs: ["source-sep-republicanism"],
      },
      {
        id: "share-rule-making",
        label: "Share in making the rules",
        statement: "A liberty-protecting institution should let the people affected share in making, contesting, and revising its rules.",
        sourceRefs: ["source-dahl"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-dahl", "source-rawls", "source-sep-republicanism", "source-aapor"],
  },
  {
    id: "political-economy-justice-pilot",
    layer: "normative",
    kind: "political-economy",
    constructIds: ["political-economy"],
    prompt: "What should make an economic order just?",
    context: "This records the primary normative standard used to judge an economic order. It is not a description of how a particular economy works or a recommendation for a current policy.",
    options: [
      {
        id: "equal-basic-standing",
        label: "Equal basic standing",
        statement: "An economic order is just when it secures equal basic standing and fair terms of cooperation.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "real-capabilities",
        label: "Real capabilities",
        statement: "An economic order is just when people have substantive capabilities to pursue lives they have reason to value.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "limit-economic-domination",
        label: "Limit economic domination",
        statement: "An economic order is just when concentrated economic power cannot place people under arbitrary domination.",
        sourceRefs: ["source-sep-republicanism"],
      },
      {
        id: "secure-ownership-and-exchange",
        label: "Secure ownership and exchange",
        statement: "An economic order is just when it protects secure ownership and voluntary exchange under general rules.",
        sourceRefs: ["source-sep-liberalism"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-rawls", "source-sen", "source-sep-republicanism", "source-sep-liberalism", "source-aapor"],
  },
  {
    id: "change-mechanism-pilot",
    layer: "descriptive",
    kind: "change-mechanism",
    constructIds: ["change-strategy"],
    prompt: "When major political change succeeds, which mechanism usually matters most?",
    context: "This asks for an explanatory account of how change tends to occur. It does not ask which route the respondent prefers or whether a particular historical case proves the mechanism.",
    options: [
      {
        id: "institutional-inheritance",
        label: "Institutional inheritance",
        statement: "Successful political change often depends on existing institutions and organizations carrying new arrangements into practice.",
        sourceRefs: ["source-north", "source-pierson"],
      },
      {
        id: "crisis-and-conflict-opportunity",
        label: "Crisis and conflict opportunities",
        statement: "Successful political change often becomes possible when crisis or conflict opens opportunities unavailable in ordinary politics.",
        sourceRefs: ["source-tilly", "source-pierson"],
      },
      {
        id: "organized-coalition-learning",
        label: "Organized coalition and learning",
        statement: "Successful political change often depends on organized groups building coalitions, learning, and adapting their strategy.",
        sourceRefs: ["source-tilly"],
      },
      {
        id: "conceptual-legitimation",
        label: "Conceptual legitimation",
        statement: "Successful political change often depends on a new interpretation of political ideas making the change legitimate.",
        sourceRefs: ["source-freeden-morphology"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-pierson", "source-north", "source-tilly", "source-freeden-morphology", "source-aapor"],
  },
  {
    id: "change-transition-standard-pilot",
    layer: "normative",
    kind: "transition-standard",
    constructIds: ["change-strategy"],
    prompt: "When an incremental reform improves conditions but leaves a serious injustice in place, what should determine whether it is acceptable?",
    context: "This records a standard for judging a transition rather than a general reform-or-rupture identity. It does not estimate the reform's likely success or consequences.",
    options: [
      {
        id: "present-harm-reduction",
        label: "Reduce present serious harm",
        statement: "Accept an incremental reform when reducing present serious harm is decisive, even if deeper injustice remains.",
        sourceRefs: ["source-sen"],
      },
      {
        id: "reject-unresolved-injustice",
        label: "Reject unresolved injustice",
        statement: "Reject an incremental reform when leaving serious injustice in place is unacceptable.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "preserve-route-to-deeper-change",
        label: "Preserve a route to deeper change",
        statement: "Accept an incremental reform only when it protects a credible route to deeper change.",
        sourceRefs: ["source-pierson", "source-rawls"],
      },
      {
        id: "affected-can-contest-and-revise",
        label: "Keep the arrangement contestable",
        statement: "Judge an incremental reform by whether the people affected can contest and revise the arrangement.",
        sourceRefs: ["source-dahl"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-pierson", "source-rawls", "source-dahl", "source-sen", "source-aapor"],
  },
  {
    id: "priority-rights-local-autonomy-pilot",
    layer: "prescriptive",
    kind: "priority-rule",
    constructIds: ["priority-conflict"],
    prompt: "When local self-government conflicts with uniform protection of basic rights, which should take priority?",
    context: "This asks how a jurisdiction-neutral institutional conflict should be resolved. It records a priority rule without assuming a particular country, level of government, or constitutional arrangement.",
    options: [
      {
        id: "uniform-rights-floor",
        label: "Uniform rights floor",
        statement: "Apply a uniform floor of basic rights even when local rules differ.",
        sourceRefs: ["source-rawls"],
      },
      {
        id: "local-self-government-first",
        label: "Local self-government first",
        statement: "Give local self-government priority when locally adopted rules conflict with uniform standards.",
        sourceRefs: ["source-ostrom", "source-dahl"],
      },
      {
        id: "minimum-floor-local-discretion",
        label: "Rights floor with local discretion",
        statement: "Set a minimum rights floor and leave decisions above that floor to local self-government.",
        sourceRefs: ["source-rawls", "source-ostrom"],
      },
      {
        id: "contextual-public-balance",
        label: "Contextual public balance",
        statement: "Decide case by case after considering affected parties, scale, reversibility, and the kinds of harm at stake.",
        sourceRefs: ["source-dahl", "source-ostrom", "source-sagiv-schwartz-values-review"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-dahl", "source-rawls", "source-ostrom", "source-sagiv-schwartz-values-review", "source-aapor"],
  },
  {
    id: "epistemic-fact-value-distinction-pilot",
    layer: "normative",
    kind: "epistemic-stance",
    constructIds: ["epistemic-stance"],
    prompt: "When a political disagreement involves both values and factual claims, which approach is closest to your view?",
    context: "This records a norm for treating factual uncertainty and value disagreement. It does not determine factual accuracy, information level, or whether one political value is correct.",
    options: [
      {
        id: "separate-then-address",
        label: "Separate, then address each",
        statement: "Separate factual uncertainty from value disagreement, then address each with the appropriate kind of reasoning.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
      },
      {
        id: "evidence-constrains-claims",
        label: "Let evidence constrain claims",
        statement: "Treat empirical claims as open to evidence and revision while keeping the values that guide judgment open to public disagreement.",
        sourceRefs: ["source-adcock-collier", "source-aera-testing-standards"],
      },
      {
        id: "values-frame-relevance",
        label: "Let values frame relevance",
        statement: "Let values help determine which facts and consequences matter while keeping factual claims revisable.",
        sourceRefs: ["source-sagiv-schwartz-values-review", "source-aera-testing-standards"],
      },
      {
        id: "integrate-without-reduction",
        label: "Integrate without reducing either",
        statement: "Consider facts and values together without reducing values to facts or facts to preferences.",
        sourceRefs: ["source-adcock-collier", "source-sagiv-schwartz-values-review"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-adcock-collier", "source-aera-testing-standards", "source-sagiv-schwartz-values-review", "source-aapor"],
  },
  {
    id: "heterodoxy-revision-pilot",
    layer: "normative",
    kind: "contestation-response",
    constructIds: ["heterodoxy-contestation"],
    prompt: "A political tradition can remain recognizably the same while revising one of its central concepts. Which rule is closest to your view?",
    context: "This asks how a tradition or movement should treat conceptual revision and continuity. It does not identify current membership or decide which interpretation is historically correct.",
    options: [
      {
        id: "revision-can-preserve-continuity",
        label: "Revision can preserve continuity",
        statement: "Allow revision of a central concept while treating a movement as continuous when its broader purpose and relationships remain recognizable.",
        sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology"],
      },
      {
        id: "core-change-requires-new-boundary",
        label: "Core change requires a new boundary",
        statement: "Treat revision of a central concept as a new tradition when it changes the commitments that define the movement.",
        sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology"],
      },
      {
        id: "continuity-should-remain-contested",
        label: "Keep continuity contested",
        statement: "Leave continuity open to contestation among interpreters rather than giving one authority final control over the boundary.",
        sourceRefs: ["source-freeden-morphology", "source-dahl"],
      },
      {
        id: "trace-history-and-practice",
        label: "Trace history and practice",
        statement: "Judge continuity by the historical and institutional practices through which concepts are used and revised.",
        sourceRefs: ["source-freeden-steers-morphology", "source-dahl"],
      },
      noViewOption(),
    ],
    sourceRefs: ["source-freeden-morphology", "source-freeden-steers-morphology", "source-dahl", "source-aapor"],
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
