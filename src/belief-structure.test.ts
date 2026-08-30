import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateCountsFor, validateBeliefGapCandidates } from "./belief-gap-candidates";
import {
  BELIEF_CONSTRUCT_DEFINITIONS,
  BELIEF_CONSTRUCTS,
  BELIEF_MODEL_ID,
  BELIEF_MODEL_VERSION,
  auditBeliefMeasurement,
  beliefObservationsFor,
  calculateBeliefProfile,
  ideologyConfigurationsFor,
  interpretiveBasisFor,
  validateIdeologyConfigurations,
  validateBeliefRelationalEvidence,
  validateBeliefModel,
} from "./beliefs";
import { deriveIdeologicalMorphology } from "./morphology";
import { BELIEF_VALIDATION_GATES, beliefCompletionEligible, openBeliefValidationGates, validateBeliefValidationLedger } from "./belief-validation";
import { calculateResults } from "./scoring";
import type { Answer, AnswerMap, BeliefRelationalEvidence, Layer } from "./types";

const allAnswers = (value: Answer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, value]));

const answersWhere = (predicate: (question: typeof DATASET.questions[number]) => boolean, selected: Answer, fallback: Answer = 1): AnswerMap =>
  Object.fromEntries(DATASET.questions.map((question) => [question.id, predicate(question) ? selected : fallback]));

const answersForFacet = (facetId: string, selected: Answer): AnswerMap =>
  Object.fromEntries(DATASET.questions.map((question) => [question.id, Object.prototype.hasOwnProperty.call(question.effects, facetId) ? selected : 0]));

const constructSignalFor = (profile: ReturnType<typeof calculateBeliefProfile>, constructId: string): number | undefined =>
  profile.constructs.find((construct) => construct.id === constructId)?.signal;

describe("stated political commitment configuration", () => {
  it("has a source-linked construct registry and a mapping for every production item", () => {
    expect(BELIEF_CONSTRUCT_DEFINITIONS).toHaveLength(BELIEF_CONSTRUCTS.length);
    expect(validateBeliefModel(DATASET)).toEqual([]);
    const audits = auditBeliefMeasurement(DATASET);
    expect(audits).toHaveLength(DATASET.questions.length);
    expect(audits.every((item) => item.constructIds.length > 0)).toBe(true);
    expect(audits.every((item) => item.measurementMode === "facet-proxy")).toBe(true);
    expect(audits.every((item) => item.rationale.length > 0 && item.sourceRefs.length > 0)).toBe(true);
  });

  it("makes the item-level audit and unmeasured construct gaps explicit", () => {
    const profile = calculateBeliefProfile(allAnswers(2), DATASET);
    const summary = profile.measurementSummary;
    const dispositionTotal = Object.values(summary.dispositionCounts).reduce((sum, count) => sum + count, 0);
    expect(summary.totalItems).toBe(DATASET.questions.length);
    expect(summary.proxyItems + summary.directItems).toBe(summary.totalItems);
    expect(dispositionTotal).toBe(summary.totalItems);
    expect(summary.proxyItems).toBe(summary.totalItems);
    expect(summary.directItems).toBe(0);
    expect(summary.constructItemCounts["priority-conflict"]).toBe(0);
    expect(summary.constructItemCounts["epistemic-stance"]).toBe(0);
    expect(summary.constructItemCounts["heterodoxy-contestation"]).toBe(0);
    expect(summary.uncoveredConstructIds).toEqual(expect.arrayContaining(["priority-conflict", "epistemic-stance", "heterodoxy-contestation"]));
    expect(summary.ideologyCodedQuestionIds.length).toBeGreaterThan(0);
    expect(summary.compoundQuestionIds.length).toBeGreaterThan(0);
    expect(summary.conditionalQuestionIds.length).toBeGreaterThan(0);
    expect(summary.dispositionCounts.remap + summary.dispositionCounts.split + summary.dispositionCounts.rewrite).toBeGreaterThan(0);
  });

  it("separates coordinated predicates from single conditional or contrastive claims", () => {
    const audits = new Map(auditBeliefMeasurement(DATASET).map((audit) => [audit.questionId, audit]));
    const coordinatedNounItem = audits.get("d-culture-02");
    const conditionalItem = audits.get("d-nation-01");
    const coordinatedPredicateItem = audits.get("p-libertarianism-03");

    expect(coordinatedNounItem?.flags).not.toContain("compound-wording");
    expect(conditionalItem?.flags).toEqual(expect.arrayContaining(["conditional-wording"]));
    expect(conditionalItem?.flags).not.toContain("compound-wording");
    expect(coordinatedPredicateItem?.flags).toContain("compound-wording");
  });

  it("keeps researched gap items explicit, format-specific, and quarantined", () => {
    expect(validateBeliefGapCandidates(DATASET)).toEqual([]);
    expect(BELIEF_GAP_CANDIDATES.length).toBeGreaterThanOrEqual(12);
    const counts = beliefGapCandidateCountsFor();
    expect(counts["priority-conflict"]).toBeGreaterThan(0);
    expect(counts["epistemic-stance"]).toBeGreaterThan(0);
    expect(counts["heterodoxy-contestation"]).toBeGreaterThan(0);
    expect(BELIEF_GAP_CANDIDATES.every((item) => item.reviewStatus === "research_candidate")).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((item) => item.responseFormat === "paired-priority-choice")).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((item) => item.responseFormat === "conditional-vignette")).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((item) => item.responseFormat === "confidence-rating")).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.every((item) => item.sourceRefs.length > 0 && item.responseOptions.length >= 3)).toBe(true);
    const profile = calculateBeliefProfile(allAnswers(2), DATASET);
    expect(profile.measurementSummary.researchCandidateCounts).toEqual(counts);
  });

  it("keeps mixed, no-view, and unanswered states distinct", () => {
    const firstQuestions = DATASET.questions.slice(0, 3);
    const answers: AnswerMap = {
      [firstQuestions[0].id]: 0,
      [firstQuestions[1].id]: "no-view",
    };
    const profile = calculateBeliefProfile(answers, DATASET);
    expect(profile.response).toMatchObject({ total: DATASET.questions.length, mixed: 1, noView: 1, unanswered: DATASET.questions.length - 2, directional: 0 });
    expect(profile.status).toBe("insufficient-information");
    expect(profile.gaps.some((gap) => gap.includes("Priority"))).toBe(true);
    expect(profile.gaps.some((gap) => gap.includes("Identical policy answers"))).toBe(true);
    const observations = beliefObservationsFor(answers, DATASET);
    expect(observations.some((observation) => observation.state === "mixed")).toBe(true);
    expect(observations.some((observation) => observation.state === "no-view")).toBe(true);
    expect(observations.some((observation) => observation.state === "unanswered")).toBe(true);
    expect(observations.filter((observation) => observation.value === undefined).every((observation) => observation.state !== "directional")).toBe(true);
  });

  it("does not treat mixed responses as directional zeroes", () => {
    const allMixed = calculateBeliefProfile(allAnswers(0), DATASET);
    const politicalEconomyMixed = allMixed.constructs.find((construct) => construct.id === "political-economy");
    const libertyFacetMixed = allMixed.facets.find((facet) => facet.facetId === "liberty");
    expect(politicalEconomyMixed).toMatchObject({
      status: "partial",
      coverage: 1,
      directionalCoverage: 0,
      mixedRate: 1,
    });
    expect(politicalEconomyMixed?.signal).toBeUndefined();
    expect(politicalEconomyMixed?.directionalEvidenceQuestionIds).toEqual([]);
    expect(politicalEconomyMixed?.mixedQuestionIds.length).toBeGreaterThan(0);
    expect(allMixed.observations.filter((observation) => observation.state === "mixed").every((observation) => observation.value === undefined)).toBe(true);
    expect(libertyFacetMixed).toMatchObject({ directionalCoverage: 0, mixedRate: 1 });
    expect(libertyFacetMixed?.signal).toBeUndefined();

    const libertyQuestions = DATASET.questions.filter((question) => Object.prototype.hasOwnProperty.call(question.effects, "liberty"));
    expect(libertyQuestions.length).toBeGreaterThan(1);
    const allDirectional = calculateBeliefProfile(answersForFacet("liberty", 2), DATASET);
    const oneMixed = calculateBeliefProfile({
      ...answersForFacet("liberty", 2),
      [libertyQuestions[0].id]: 0,
    }, DATASET);
    const oneNoView = calculateBeliefProfile({
      ...answersForFacet("liberty", 2),
      [libertyQuestions[0].id]: "no-view",
    }, DATASET);
    const directionalFacet = allDirectional.facets.find((facet) => facet.facetId === "liberty");
    const mixedFacet = oneMixed.facets.find((facet) => facet.facetId === "liberty");
    const noViewFacet = oneNoView.facets.find((facet) => facet.facetId === "liberty");
    expect(directionalFacet?.signal).toBeDefined();
    expect(mixedFacet?.signal).toBe(noViewFacet?.signal);
    expect(mixedFacet?.directionalEvidenceQuestionIds).not.toContain(libertyQuestions[0].id);
    expect(mixedFacet?.mixedQuestionIds).toContain(libertyQuestions[0].id);
    expect(noViewFacet?.directionalEvidenceQuestionIds).not.toContain(libertyQuestions[0].id);
    expect(noViewFacet?.mixedQuestionIds).not.toContain(libertyQuestions[0].id);
  });

  it("identifies the lowest evidence layer without turning diagnostics into respondent judgments", () => {
    const incomplete = calculateBeliefProfile({}, DATASET);
    expect(incomplete.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "question-layer-coverage", layer: "question", status: "coverage-gap" }),
    ]));

    const complete = calculateBeliefProfile(allAnswers(2), DATASET);
    expect(complete.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "construct-facet-proxy-bridge", layer: "construct", status: "validation-gap" }),
      expect.objectContaining({ id: "construct-layer-concept-conception", layer: "conception", status: "validation-gap" }),
      expect.objectContaining({ id: "construct-layer-distributive-principle", layer: "conception", status: "validation-gap" }),
      expect.objectContaining({ id: "construct-layer-diagnosis-causal-account", layer: "causal-belief", status: "validation-gap" }),
      expect.objectContaining({ id: "construct-layer-institutional-mechanism", layer: "institutional-inference", status: "validation-gap" }),
      expect.objectContaining({ id: "construct-priority-conflict", layer: "construct", status: "unmeasured" }),
      expect.objectContaining({ id: "construct-epistemic-stance", layer: "construct", status: "unmeasured" }),
      expect.objectContaining({ id: "construct-heterodoxy-contestation", layer: "construct", status: "unmeasured" }),
    ]));
    expect(complete.diagnostics.every((diagnostic) => diagnostic.title.length > 0 && diagnostic.detail.length > 0)).toBe(true);
    expect(complete.diagnostics.every((diagnostic) => diagnostic.sourceRefs.length > 0)).toBe(true);
  });

  it("keeps objective completion fail-closed while study gates remain open", () => {
    expect(validateBeliefValidationLedger(DATASET)).toEqual([]);
    expect(BELIEF_VALIDATION_GATES.filter((gate) => gate.status === "PASS")).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "production-item-audit", scope: "local-structural" }),
      expect.objectContaining({ id: "adversarial-synthetic-suite", scope: "local-structural" }),
    ]));
    expect(openBeliefValidationGates().map((gate) => gate.id)).toEqual(expect.arrayContaining([
      "cognitive-response-process",
      "expert-content-adjudication",
      "empirical-reliability-validity",
      "invariance-dif-cross-context",
      "population-consequence-review",
      "held-out-respondent-morphology",
    ]));
    expect(beliefCompletionEligible()).toBe(false);
  });

  it("reports observed proxies without upgrading them into validated latent traits", () => {
    const profile = calculateBeliefProfile(allAnswers(2), DATASET);
    expect(profile).toMatchObject({ modelId: BELIEF_MODEL_ID, modelVersion: BELIEF_MODEL_VERSION, status: "partial" });
    expect(profile.constructs.find((item) => item.id === "political-economy")).toMatchObject({ status: "observed", coverage: 1, response: { directional: expect.any(Number), mixed: 0, noView: 0, unanswered: 0 } });
    expect(profile.constructs.find((item) => item.id === "concept-conception")).toMatchObject({ status: "partial", coverage: 1 });
    expect(profile.constructs.find((item) => item.id === "priority-conflict")).toMatchObject({ status: "not-yet-measured", coverage: 0 });
    expect(profile.constructs.find((item) => item.id === "priority-conflict")?.signal).toBeUndefined();
    expect(profile.constructs.find((item) => item.id === "epistemic-stance")).toMatchObject({ status: "not-yet-measured", coverage: 0 });
    expect(profile.constructs.find((item) => item.id === "heterodoxy-contestation")).toMatchObject({ status: "not-yet-measured", coverage: 0 });
    expect(profile.gaps.some((gap) => gap.includes("not a fitted or validated latent-variable model"))).toBe(true);
    expect(profile.gaps.some((gap) => gap.toLowerCase().includes("confidence"))).toBe(true);
    expect(profile.gaps.some((gap) => gap.includes("Heterodoxy"))).toBe(true);
    expect(profile.observations.length).toBeGreaterThan(0);
    expect(profile.observations.every((observation) => observation.measurementMode === "facet-proxy")).toBe(true);
    expect(profile.observations.every((observation) => !Object.prototype.hasOwnProperty.call(observation, "targetNodeIds"))).toBe(true);
    expect(profile.measurementAudit).toHaveLength(DATASET.questions.length);
  });

  it("retains facet-level concept and mechanism evidence for morphology matching", () => {
    const libertyProfile = calculateBeliefProfile(answersForFacet("liberty", 2), DATASET);
    const equalityProfile = calculateBeliefProfile(answersForFacet("equality", 2), DATASET);
    const libertyFacet = libertyProfile.facets.find((facet) => facet.facetId === "liberty");
    const equalityFacet = equalityProfile.facets.find((facet) => facet.facetId === "equality");
    expect(libertyFacet).toMatchObject({ facetId: "liberty", coverage: 1 });
    expect(libertyFacet?.signal).toBeGreaterThan(0.5);
    expect(equalityFacet).toMatchObject({ facetId: "equality", coverage: 1 });
    expect(equalityFacet?.signal).toBeGreaterThan(0.5);

    const libertyCandidate = deriveIdeologicalMorphology(libertyProfile, DATASET).candidates.find((candidate) => candidate.anchorId === "classical-liberalism");
    const equalityCandidate = deriveIdeologicalMorphology(equalityProfile, DATASET).candidates.find((candidate) => candidate.anchorId === "classical-liberalism");
    expect(libertyCandidate).toBeDefined();
    expect(equalityCandidate).toBeDefined();
    expect(libertyCandidate?.basis.find((item) => item.facetId === "liberty")).toMatchObject({ observedSignal: libertyFacet?.signal, evidenceQuestionIds: expect.any(Array) });
    expect(equalityCandidate?.basis.find((item) => item.facetId === "liberty")?.observedSignal).not.toBe(libertyFacet?.signal);
    expect(libertyCandidate?.fit).not.toBe(equalityCandidate?.fit);
  });

  it("supports an explicit direct-item seam without treating one item as validated evidence", () => {
    const directItemDataset = {
      ...DATASET,
      questions: DATASET.questions.map((question, index) => index === 0
        ? { ...question, effects: {}, beliefConstructIds: ["priority-conflict" as const], beliefMeasurementMode: "direct-item" as const }
        : question),
    };
    expect(validateBeliefModel(directItemDataset)).toEqual([]);
    const profile = calculateBeliefProfile(allAnswers(2), directItemDataset);
    const priority = profile.constructs.find((construct) => construct.id === "priority-conflict");
    expect(profile.measurementSummary.directItems).toBe(1);
    expect(profile.measurementSummary.proxyItems).toBe(DATASET.questions.length - 1);
    expect(profile.measurementSummary.uncoveredConstructIds).not.toContain("priority-conflict");
    expect(priority).toMatchObject({ status: "partial", measurementMode: "direct-item", directObservationCount: 1, proxyObservationCount: 0 });
    expect(priority?.signal).toBeDefined();
    expect(priority?.statusNote).toContain("No item asks a respondent to order principles");
    expect(profile.observations.filter((observation) => observation.questionId === DATASET.questions[0].id)).toHaveLength(1);
    expect(profile.observations.find((observation) => observation.measurementMode === "direct-item")?.facetId).toBeUndefined();
  });

  it("keeps descriptive causal beliefs distinct from unchanged normative and prescriptive answers", () => {
    const first = calculateResults(answersWhere((question) => question.layer === "descriptive" && question.domain === "Economy", 2));
    const second = calculateResults(answersWhere((question) => question.layer === "descriptive" && question.domain === "Economy", -2));
    expect(first.layers.normative).toEqual(second.layers.normative);
    expect(first.layers.prescriptive).toEqual(second.layers.prescriptive);
    expect(constructSignalFor(first.beliefProfile, "diagnosis-causal-account")).not.toBe(constructSignalFor(second.beliefProfile, "diagnosis-causal-account"));
    expect(first.beliefProfile.gaps).toEqual(expect.arrayContaining([expect.stringContaining("causal mechanisms")]));
  });

  it("keeps shared policy answers from identifying the different principles behind them", () => {
    const first = calculateResults(answersWhere((question) => question.layer === "normative" && question.domain === "Economy", 2));
    const second = calculateResults(answersWhere((question) => question.layer === "normative" && question.domain === "Economy", -2));
    expect(first.layers.prescriptive).toEqual(second.layers.prescriptive);
    expect(constructSignalFor(first.beliefProfile, "distributive-principle")).not.toBe(constructSignalFor(second.beliefProfile, "distributive-principle"));
    expect(first.beliefProfile.tensions.find((tension) => tension.id === "priority-order-not-established")).toMatchObject({ status: "not-established" });
    expect(second.beliefProfile.tensions.find((tension) => tension.id === "priority-order-not-established")).toMatchObject({ status: "not-established" });
  });

  it("does not infer priorities, conditions, or reasons from the answer map", () => {
    const answers = allAnswers(2);
    const reordered = Object.fromEntries(Object.entries(answers).reverse());
    const first = calculateBeliefProfile(answers, DATASET);
    const second = calculateBeliefProfile(reordered, DATASET);
    expect(second).toEqual(first);
    expect(first.tensions.find((tension) => tension.id === "priority-order-not-established")).toMatchObject({ status: "not-established", constructIds: ["priority-conflict"] });
    expect(first.tensions.find((tension) => tension.id === "conditional-rules-not-established")).toMatchObject({ status: "not-established" });
    expect(first.gaps).toEqual(expect.arrayContaining([expect.stringContaining("different principles")]));
  });

  it("keeps explicit relational evidence separate and traceable through morphology", () => {
    const relationalEvidence: readonly BeliefRelationalEvidence[] = [
      {
        id: "synthetic-priority",
        optionId: "synthetic-priority",
        kind: "priority",
        constructIds: ["priority-conflict", "concept-conception", "distributive-principle"],
        statement: "Equal standing takes priority over unrestricted choice in this conflict.",
        rule: "Choose equal standing when the two cannot both be protected.",
        confidence: "moderate",
        evidenceQuestionIds: [DATASET.questions[0].id],
        sourceRefs: [],
      },
      {
        id: "synthetic-condition",
        optionId: "synthetic-condition",
        kind: "conditional",
        constructIds: ["priority-conflict", "institutional-mechanism", "legitimacy-authority"],
        statement: "Public authority is acceptable only when it remains contestable.",
        condition: "The institution must permit meaningful public challenge.",
        resolution: "Withhold support when contestation is unavailable.",
        confidence: "high",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
      {
        id: "synthetic-conflict-rule",
        optionId: "synthetic-conflict-rule",
        kind: "conflict-resolution",
        constructIds: ["priority-conflict", "change-strategy", "social-order-moral-scope"],
        statement: "Immediate harm reduction governs the sequence of institutional change.",
        rule: "Prefer the reversible route when expected harm is otherwise comparable.",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
      {
        id: "synthetic-uncertainty",
        optionId: "synthetic-uncertainty",
        kind: "uncertainty",
        constructIds: ["epistemic-stance", "diagnosis-causal-account"],
        statement: "The causal claim is held with low confidence and should be revised with credible contrary evidence.",
        resolution: "Seek more evidence before choosing an irreversible intervention.",
        confidence: "low",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
      {
        id: "synthetic-contradiction",
        optionId: "synthetic-contradiction",
        kind: "contradiction",
        constructIds: ["priority-conflict", "legitimacy-authority", "institutional-mechanism"],
        statement: "The stated autonomy goal conflicts with the preferred administrative route.",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
      {
        id: "synthetic-contestation",
        optionId: "synthetic-contestation",
        kind: "contestation",
        constructIds: ["heterodoxy-contestation"],
        statement: "Internal dissent should remain legitimate when it challenges a central policy.",
        resolution: "Retain dissent and revise the commitment if the criticism is persuasive.",
        confidence: "moderate",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
    ];
    expect(validateBeliefRelationalEvidence(relationalEvidence, DATASET)).toEqual([]);
    const result = calculateResults(allAnswers(2), DATASET, relationalEvidence);
    expect(result.beliefProfile.relationalEvidence).toEqual(relationalEvidence);
    expect(result.beliefProfile.relationalSummary).toEqual({
      priorityRules: 1,
      conditionalRules: 1,
      conflictResolutionRules: 1,
      uncertaintyStatements: 1,
      contradictions: 1,
      contestationStatements: 1,
      unresolvedContradictions: 1,
    });
    const candidate = result.beliefMorphology.candidates[0];
    expect(candidate.relationalBasis).toHaveLength(relationalEvidence.length);
    expect(candidate.relationalBasis.find((item) => item.evidenceId === "synthetic-condition")).toMatchObject({ condition: "The institution must permit meaningful public challenge." });
    expect(candidate.explanation).toContain("explicit relational observation");
  });

  it("keeps a cross-layer pull explanatory rather than punitive", () => {
    const result = calculateResults(allAnswers(2));
    expect(result.beliefProfile.tensions.some((tension) => tension.id === "autonomy-administration" && tension.status === "observed-pull")).toBe(true);
    expect(result.beliefProfile.tensions.every((tension) => !tension.title.toLowerCase().includes("inconsistent"))).toBe(true);
    expect(result.beliefProfile.tensions.some((tension) => tension.id === "priority-order-not-established")).toBe(true);
  });

  it("reconstructs every existing anchor as an explicit, provenance-bearing configuration", () => {
    const configurations = ideologyConfigurationsFor(DATASET);
    const sourceIds = new Set(DATASET.sources.map((source) => source.id));
    const canonicalConfigurations = configurations.filter((configuration) => configuration.placement === "canonical");
    expect(configurations).toHaveLength(DATASET.anchors.length);
    expect(new Set(configurations.map((configuration) => configuration.targetId)).size).toBe(DATASET.anchors.length);
    expect(configurations.every((configuration) => configuration.commitments.length > 0)).toBe(true);
    expect(canonicalConfigurations).toHaveLength(DATASET.anchors.filter((anchor) => DATASET.ideologyNodes.find((node) => node.id === anchor.ontologyNodeId)?.placement === "canonical").length);
    expect(canonicalConfigurations.every((configuration) => configuration.evidencePosture === "source-backed-projection")).toBe(true);
    expect(configurations.every((configuration) => configuration.priorities.status === "not-established")).toBe(true);
    expect(configurations.every((configuration) => configuration.relationalConstraints.length > 0)).toBe(true);
    expect(configurations.every((configuration) => configuration.relationalConstraints.length === 5)).toBe(true);
    expect(validateIdeologyConfigurations(DATASET)).toEqual([]);
    expect(canonicalConfigurations.every((configuration) => configuration.conceptualCommitments.length > 0)).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptions.some((conception) => conception.conceptId === "self-management-freedom" && !conception.facetId && conception.evidencePosture === "source-backed"))).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptions.length > 0)).toBe(true);
    expect(configurations.every((configuration) => configuration.conceptions.every((conception) => conception.interpretation.length > 0 && conception.sourceRefs.every((sourceRef) => sourceIds.has(sourceRef))))).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptualCommitments.length > 0)).toBe(true);
    expect(configurations.some((configuration) => configuration.causalAssumptions.length > 0)).toBe(true);
    expect(configurations.some((configuration) => configuration.compatibility.some((relation) => relation.relation === "critical-of" || relation.relation === "alternative-to"))).toBe(true);
    expect(configurations.every((configuration) => configuration.sourceRefs.every((sourceRef) => sourceIds.has(sourceRef)))).toBe(true);
    expect(configurations.find((configuration) => configuration.targetId === "georgism")).toMatchObject({ evidencePosture: "source-backed-projection", ontologyLevel: "meso", placement: "canonical" });
    expect(configurations.find((configuration) => configuration.targetId === "georgism")?.commitments).toEqual(expect.arrayContaining([
      expect.objectContaining({ centrality: "defining", layer: "normative" }),
    ]));
  });

  it("keeps explicit source-backed conceptions visible without turning them into affinity weights", () => {
    const result = calculateResults(allAnswers(2));
    const candidate = result.beliefMorphology.candidates.find((item) => item.anchorId === "libertarian-socialism");
    const explicitConceptBasis = candidate?.basis.filter((item) => item.commitmentId === "libertarian-socialism:concept:self-management-freedom");
    expect(explicitConceptBasis).toHaveLength(1);
    expect(explicitConceptBasis?.[0]).toMatchObject({ expectedDirection: "indeterminate" });
    expect(explicitConceptBasis?.[0]?.agreement).toBeUndefined();
    expect(explicitConceptBasis?.[0]?.contribution).toBeUndefined();
  });

  it("projects only canonical configurations and keeps morphology provisional", () => {
    const result = calculateResults(allAnswers(2));
    const canonicalNodeIds = new Set(DATASET.ideologyNodes.filter((node) => node.placement === "canonical").map((node) => node.id));
    expect(result.beliefMorphology.status).toBe("provisional-candidates");
    expect(result.beliefMorphology.candidates.length).toBeGreaterThan(0);
    expect(result.beliefMorphology.compatibility).toEqual({ legacyAnchorScorerPreserved: true, legacyScorerRemainsPrimaryForRegression: true });
    expect(result.beliefMorphology.candidates.every((candidate) => canonicalNodeIds.has(candidate.ontologyNodeId))).toBe(true);
    expect(result.beliefMorphology.candidates.every((candidate) => candidate.configuration.priorities.status === "not-established")).toBe(true);
    expect(result.beliefMorphology.gaps).toEqual(expect.arrayContaining([expect.stringContaining("not validated latent traits")]));
  });

  it("does not use branch target metadata as respondent evidence", () => {
    const answers = allAnswers(1);
    const baseline = calculateBeliefProfile(answers, DATASET);
    const metadataChanged = {
      ...DATASET,
      questions: DATASET.questions.map((question, index) => ({ ...question, targetNodeIds: [`synthetic-target-${index}`] })),
    };
    const changed = calculateBeliefProfile(answers, metadataChanged);
    expect(changed.observations).toEqual(baseline.observations);
    expect(changed.constructs).toEqual(baseline.constructs);
    expect(changed.response).toEqual(baseline.response);
    expect(changed.measurementSummary.ideologyCodedQuestionIds).toHaveLength(DATASET.questions.length);
  });

  it("fails closed before morphology when the three-layer evidence threshold is not met", () => {
    const result = calculateResults(allAnswers("no-view"));
    expect(result.beliefProfile.status).toBe("insufficient-information");
    expect(result.beliefMorphology).toMatchObject({ status: "insufficient-information", candidates: [] });
    expect(result.beliefMorphology.gaps[0]).toContain("no ideological morphology candidate is derived");
  });

  it("does not name a morphology from exclusively mixed responses", () => {
    const result = calculateResults(allAnswers(0));
    expect(result.beliefProfile.status).toBe("partial");
    expect(result.beliefMorphology.status).toBe("not-derived");
    expect(result.beliefMorphology.candidates.every((candidate) => candidate.status === "under-determined")).toBe(true);
  });

  it("traces observed facet inputs without treating target IDs as respondent evidence", () => {
    const profiles: Partial<Record<Layer, Readonly<Record<string, number>>>> = {
      normative: { liberty: 0.8, equality: -0.4 },
      prescriptive: { "state-capacity": 0.7 },
    };
    const basis = interpretiveBasisFor(profiles, DATASET);
    expect(basis.map((item) => item.facetId)).toEqual(["liberty", "equality", "state-capacity"]);
    expect(basis.find((item) => item.facetId === "liberty")?.constructIds).toEqual(expect.arrayContaining(["concept-conception", "legitimacy-authority"]));
    const result = calculateResults(allAnswers(2));
    const covered = result.layers.normative;
    expect(covered.kind).toBe("covered");
    if (covered.kind === "covered") {
      expect(covered.neighbors[0].basis.length).toBeGreaterThan(0);
      expect(covered.neighbors[0].configuration.priorities.status).toBe("not-established");
      expect(covered.neighbors[0].basis.every((item) => !item.constructIds.includes("priority-conflict"))).toBe(true);
    }
  });
});
