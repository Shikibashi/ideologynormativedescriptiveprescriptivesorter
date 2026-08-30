import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateCountsFor, validateBeliefGapCandidates } from "./belief-gap-candidates";
import { BELIEF_DIRECT_ITEMS, directEvidenceForAnswers } from "./belief-direct-items";
import { BELIEF_RELATIONAL_FOLLOWUPS, relationalEvidenceForAnswers } from "./belief-followups";
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
    expect(audits.every((item) => item.prompt.length > 0 && item.domain.length > 0)).toBe(true);
    expect(audits.every((item) => Object.keys(item.legacyEffects).length > 0)).toBe(true);
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
    expect(summary.constructLayerItemCounts["political-economy"]).toEqual({ descriptive: 68, normative: 0, prescriptive: 100 });
    expect(summary.constructLayerItemCounts["change-strategy"]).toEqual({ descriptive: 0, normative: 0, prescriptive: 190 });
    expect(summary.uncoveredConstructLayerPairs).toEqual([
      { constructId: "concept-conception", layer: "prescriptive" },
      { constructId: "political-economy", layer: "normative" },
      { constructId: "change-strategy", layer: "descriptive" },
      { constructId: "change-strategy", layer: "normative" },
      { constructId: "priority-conflict", layer: "normative" },
      { constructId: "priority-conflict", layer: "prescriptive" },
      { constructId: "epistemic-stance", layer: "descriptive" },
      { constructId: "epistemic-stance", layer: "normative" },
      { constructId: "heterodoxy-contestation", layer: "normative" },
      { constructId: "heterodoxy-contestation", layer: "prescriptive" },
    ]);
    expect(summary.uncoveredConstructIds).toEqual(expect.arrayContaining(["priority-conflict", "epistemic-stance", "heterodoxy-contestation"]));
    expect(summary.researchCandidateCoverage).toHaveLength(25);
    expect(summary.researchCandidateCoverage.filter((coverage) => coverage.status === "candidate-only")).toHaveLength(summary.uncoveredConstructLayerPairs.length);
    expect(summary.researchCandidateCoverage.filter((coverage) => coverage.status === "production-covered")).toHaveLength(15);
    expect(summary.researchCandidateCoverage.filter((coverage) => coverage.status === "production-and-candidate")).toEqual([]);
    expect(summary.researchCandidateCoverage.filter((coverage) => coverage.status === "unrepresented")).toEqual([]);
    expect(summary.researchCandidateCoverage.filter((coverage) => coverage.status === "candidate-only").every((coverage) => coverage.productionItemCount === 0 && coverage.researchCandidateCount > 0)).toBe(true);
    expect(summary.researchCandidateCoverage.flatMap((coverage) => coverage.researchCandidateIds)).toHaveLength(BELIEF_GAP_CANDIDATES.length);
    expect(summary.branchMetadataQuestionIds.length).toBeGreaterThan(0);
    expect(summary.ideologyCodedQuestionIds).toHaveLength(0);
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

  it("separates editorial branch metadata from ideology-coded respondent wording", () => {
    const syntheticDataset = {
      ...DATASET,
      questions: DATASET.questions.map((question, index) => index === 0
        ? { ...question, prompt: "Which political ideology is closest to your view?", targetNodeIds: ["synthetic-branch"] }
        : question),
    };
    const audit = auditBeliefMeasurement(syntheticDataset)[0];
    expect(audit.flags).toEqual(expect.arrayContaining(["branch-target-metadata", "ideology-coded-wording"]));
    expect(audit.disposition).toBe("remap");
    expect(audit.editorialTargetNodeIds).toEqual(["synthetic-branch"]);
    expect(audit.legacyEffects).toEqual(DATASET.questions[0].effects);
    const baseline = auditBeliefMeasurement(DATASET)[0];
    expect(baseline.flags).not.toContain("branch-target-metadata");
    expect(baseline.flags).not.toContain("ideology-coded-wording");
  });

  it("removes exact duplicate production wording at the question layer without changing legacy effects", () => {
    const audits = auditBeliefMeasurement(DATASET);
    expect(audits.filter((audit) => audit.flags.includes("duplicate-wording"))).toEqual([]);
    expect(audits.filter((audit) => audit.disposition === "redundant")).toEqual([]);
    const questionById = new Map(DATASET.questions.map((question) => [question.id, question]));
    const rewrittenIds = [
      "n-liberal-feminism-02",
      "n-french-fascism-01",
      "p-french-fascism-01",
      "n-british-fascism-01",
      "p-british-fascism-01",
    ];
    for (const questionId of rewrittenIds) {
      const question = questionById.get(questionId);
      const audit = audits.find((item) => item.questionId === questionId);
      expect(question?.prompt).toBeTruthy();
      expect(audit?.flags).not.toContain("duplicate-wording");
      expect(audit?.sourceRefs.length).toBeGreaterThan(0);
    }
    expect(questionById.get("n-liberal-feminism-02")?.effects).toEqual({ equality: 0.9 });
    expect(questionById.get("n-french-fascism-01")?.effects).toEqual({ "order-tradition": 0.9, solidarity: 0.75, democracy: -0.6 });
    expect(questionById.get("p-french-fascism-01")?.effects).toEqual({ "state-capacity": 0.95, decentralization: -0.55 });
    expect(questionById.get("n-british-fascism-01")?.effects).toEqual({ "order-tradition": 0.9, solidarity: 0.75, democracy: -0.6 });
    expect(questionById.get("p-british-fascism-01")?.effects).toEqual({ "state-capacity": 0.95, decentralization: -0.55 });
  });

  it("rewrites the remaining single-item compound signal without changing its legacy effect", () => {
    const audit = auditBeliefMeasurement(DATASET).find((item) => item.questionId === "n-collectivist-anarchism-04");
    const question = DATASET.questions.find((item) => item.id === "n-collectivist-anarchism-04");
    expect(question?.prompt).toBe("People who perform common work should participate as equals in the rules governing it.");
    expect(audit?.flags).not.toContain("compound-wording");
    expect(audit?.disposition).toBe("preserve");
    expect(audit?.sourceRefs.length).toBeGreaterThan(0);
    expect(question?.effects).toEqual({ democracy: 0.95 });
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
    expect(allMixed.structure.every((dimension) => dimension.observedSignal === undefined && dimension.observedSignalEvidenceQuestionIds.length === 0)).toBe(true);
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
    expect(profile.constructs.find((item) => item.id === "political-economy")).toMatchObject({
      status: "partial",
      coverage: 1,
      layerCoverage: { descriptive: 1, normative: 0, prescriptive: 1 },
      response: { directional: expect.any(Number), mixed: 0, noView: 0, unanswered: 0 },
    });
    expect(profile.constructs.find((item) => item.id === "change-strategy")).toMatchObject({
      status: "partial",
      coverage: 1,
      layerCoverage: { descriptive: 0, normative: 0, prescriptive: 1 },
      response: { directional: expect.any(Number), mixed: 0, noView: 0, unanswered: 0 },
    });
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

  it("exposes an integrated structure trace without collapsing evidence forms", () => {
    const profile = calculateBeliefProfile(allAnswers(2), DATASET);
    const structure = new Map(profile.structure.map((dimension) => [dimension.id, dimension]));

    expect(profile.structure).toHaveLength(11);
    expect(new Set(profile.structure.map((dimension) => dimension.id)).size).toBe(profile.structure.length);
    expect(structure.get("values-and-moral-scope")).toMatchObject({ evidencePosture: "facet-proxy", facetProxyObservationCount: expect.any(Number), directEvidenceIds: [], relationalEvidenceIds: [], relatedDimensionIds: [] });
    expect(structure.get("descriptive-causal-beliefs")).toMatchObject({ evidencePosture: "facet-proxy", directionalObservationCount: expect.any(Number) });
    const causalStructure = structure.get("descriptive-causal-beliefs");
    expect(causalStructure?.observedObservationCountsByLayer).toEqual(expect.objectContaining({ descriptive: expect.any(Number), normative: expect.any(Number), prescriptive: expect.any(Number) }));
    expect(Object.values(causalStructure?.observedObservationCountsByLayer ?? {}).reduce((sum, count) => sum + count, 0)).toBe(causalStructure?.observedObservationCount);
    expect(Object.values(causalStructure?.directionalObservationCountsByLayer ?? {}).reduce((sum, count) => sum + count, 0)).toBe(causalStructure?.directionalObservationCount);
    for (const dimension of profile.structure) {
      const construct = profile.constructs.find((candidate) => candidate.id === dimension.constructIds[0]);
      expect(construct).toBeDefined();
      expect(dimension.observedSignal).toBe(construct?.signal);
      expect(dimension.observedSignalEvidenceQuestionIds).toEqual(construct?.directionalEvidenceQuestionIds ?? []);
    }
    expect(structure.get("priorities-and-conflicts")).toMatchObject({ evidencePosture: "unmeasured", observedObservationCount: 0, directEvidenceIds: [], relationalEvidenceIds: [] });
    expect(structure.get("epistemic-stance")?.gap).toContain("No production item or explicit evidence");
    expect(profile.structure.every((dimension) => dimension.constructIds.length > 0 && dimension.sourceRefs.length > 0 && dimension.gap.length > 0)).toBe(true);

    const directAnswers = Object.fromEntries(BELIEF_DIRECT_ITEMS.map((item) => [item.id, item.options.find((option) => option.record !== false)?.id ?? "no-view"]));
    const relationalAnswers = Object.fromEntries(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, followUp.options.find((option) => option.record !== false)?.id ?? "no-view"]));
    const enriched = calculateBeliefProfile(
      allAnswers(2),
      DATASET,
      [],
      relationalEvidenceForAnswers(relationalAnswers),
      directEvidenceForAnswers(directAnswers),
    );
    const enrichedStructure = new Map(enriched.structure.map((dimension) => [dimension.id, dimension]));
    expect(enrichedStructure.get("concepts-and-conceptions")).toMatchObject({ evidencePosture: "mixed-provisional", facetProxyObservationCount: expect.any(Number) });
    expect(enrichedStructure.get("concepts-and-conceptions")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("conception-of-freedom")]));
    expect(enrichedStructure.get("legitimacy-and-authority")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("conception-of-freedom"), expect.stringContaining("legitimacy-basis")]));
    expect(enrichedStructure.get("values-and-moral-scope")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("moral-scope-of-obligation")]));
    expect(enrichedStructure.get("distributive-principles")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("moral-scope-of-obligation"), expect.stringContaining("distributive-reason")]));
    expect(enrichedStructure.get("priorities-and-conflicts")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(enrichedStructure.get("priorities-and-conflicts")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("priority-liberty-equality")]));
    expect(enrichedStructure.get("priorities-and-conflicts")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("priority-conflict-rule")]));
    expect(enrichedStructure.get("priorities-and-conflicts")?.relatedDimensionIds).toEqual(expect.arrayContaining([
      "concepts-and-conceptions",
      "distributive-principles",
      "political-change",
      "institutional-commitments",
      "legitimacy-and-authority",
    ]));
    expect(enrichedStructure.get("concepts-and-conceptions")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("priority-liberty-equality")]));
    expect(enrichedStructure.get("distributive-principles")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("priority-liberty-equality")]));
    expect(enrichedStructure.get("institutional-commitments")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("conditional-reform-deep-change"), expect.stringContaining("conflict-rights-local-autonomy")]));
    expect(enrichedStructure.get("political-change")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("conditional-reform-deep-change")]));
    expect(enrichedStructure.get("descriptive-causal-beliefs")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("uncertainty-descriptive-claim")]));
    expect(enrichedStructure.get("epistemic-stance")?.relatedDimensionIds).toEqual(["descriptive-causal-beliefs"]);
    expect(enrichedStructure.get("legitimacy-and-authority")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("conflict-rights-local-autonomy"), expect.stringContaining("contradiction-goal-route"), expect.stringContaining("contestation-minority-response")]));
    expect(enrichedStructure.get("epistemic-stance")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(enrichedStructure.get("epistemic-stance")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("uncertainty-descriptive-claim")]));
    expect(enrichedStructure.get("epistemic-stance")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("epistemic-stance-pilot")]));
    expect(enrichedStructure.get("heterodoxy-and-contestation")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(enrichedStructure.get("heterodoxy-and-contestation")?.relationalEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("contestation-minority-response")]));
    expect(enrichedStructure.get("heterodoxy-and-contestation")?.directEvidenceIds).toEqual(expect.arrayContaining([expect.stringContaining("heterodoxy-contestation-pilot")]));
    expect(enrichedStructure.get("heterodoxy-and-contestation")?.relatedDimensionIds).toEqual(["legitimacy-and-authority"]);
    expect(enriched.structure.find((dimension) => dimension.id === "priorities-and-conflicts")?.evidenceQuestionIds).toContain("priority-liberty-equality");
  });

  it("uses construct-level profile evidence and retains facet provenance for morphology matching", () => {
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
    const libertyBasis = libertyCandidate?.basis.filter((item) => item.facetId === "liberty") ?? [];
    expect(libertyBasis).toEqual(expect.arrayContaining([
      expect.objectContaining({ calculationSource: "construct-proxy", facetProxySignal: libertyFacet?.signal, facetProxyEvidenceQuestionIds: expect.any(Array), profileDimensionIds: expect.any(Array), evidenceQuestionIds: expect.any(Array) }),
    ]));
    const libertyConstructSignals = new Map(libertyProfile.constructs.map((construct) => [construct.id, construct.signal]));
    const libertyConstructEvidence = new Map(libertyProfile.constructs.map((construct) => [construct.id, construct.directionalEvidenceQuestionIds]));
    expect(libertyBasis.every((item) => item.observedSignal === libertyConstructSignals.get(item.constructId)
      && item.evidenceQuestionIds === libertyConstructEvidence.get(item.constructId))).toBe(true);
    expect(libertyBasis.flatMap((item) => item.profileDimensionIds)).toEqual(expect.arrayContaining(["concepts-and-conceptions", "legitimacy-and-authority"]));
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
        layer: "normative",
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
        layer: "prescriptive",
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
        layer: "prescriptive",
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
        layer: "descriptive",
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
        layer: "prescriptive",
        kind: "contradiction",
        constructIds: ["priority-conflict", "legitimacy-authority", "institutional-mechanism"],
        statement: "The stated autonomy goal conflicts with the preferred administrative route.",
        evidenceQuestionIds: [],
        sourceRefs: [],
      },
      {
        id: "synthetic-contestation",
        optionId: "synthetic-contestation",
        layer: "prescriptive",
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
    const researchedConfigurations = canonicalConfigurations.filter((configuration) => configuration.researchedRelationships.length > 0);
    const researchedRelationships = researchedConfigurations.flatMap((configuration) => configuration.researchedRelationships);
    expect(researchedConfigurations).toHaveLength(119);
    expect(researchedRelationships).toHaveLength(238);
    expect(researchedConfigurations.map((configuration) => configuration.targetId)).toEqual(expect.arrayContaining([
      "liberalism-family",
      "socialism-family",
      "anarchism-family",
      "nationalism-family",
      "republicanism-family",
      "fascism",
      "ecologism-family",
      "feminism-family",
      "right-libertarianism",
      "libertarianism",
      "anarcho-syndicalism",
      "anarcho-primitivism",
      "autonomist-marxism",
      "marxism-leninism",
      "egalitarian-liberal-feminism",
      "cultural-spiritual-ecofeminism",
      "materialist-socialist-ecofeminism",
      "classical-liberal-feminism",
      "austromarxism",
      "anarcho-pacifism",
      "anarcho-communism",
      "collectivist-anarchism",
      "social-ecology",
      "womanism",
      "social-anarchism",
      "liberal-feminism",
      "contemporary-neo-republicanism",
      "black-feminism",
      "revisionist-bernsteinian-social-democracy",
      "christian-nationalism",
      "buddhist-nationalism",
      "bioregionalism",
      "anarcha-feminism",
      "liberal-nationalism",
      "radical-feminism",
      "historical-republicanism",
      "individualist-anarchism",
      "egoist-anarchism",
      "conservative-nationalism",
      "mutualism",
      "national-socialism",
      "neo-fascism",
      "neoliberalism",
      "radical-conservatism",
      "reactionary-conservatism",
      "religious-nationalism",
      "socialist-marxist-feminism",
      "anti-colonial-nationalism",
      "arab-nationalism",
      "civic-nationalism",
      "ethnocultural-nationalism",
      "hindutva",
      "marxist-feminism",
      "neo-nazism",
      "revolutionary-islamism",
      "council-communism",
      "guild-socialism",
      "maoism",
      "cultural-feminism",
      "cultural-nationalism",
      "lesbian-feminism",
      "one-nation-conservatism",
      "radical-republicanism",
      "left-wing-populism",
      "neoconservatism",
      "paleoconservatism",
      "wasatiyya",
      "right-wing-populism",
      "agrarian-populism",
      "religious-zionism",
      "socialist-feminism",
      "third-positionism",
      "national-syndicalism",
      "italian-fascism",
      "flemish-belgian-fascism",
      "japanese-fascism",
      "british-fascism",
      "french-fascism",
      "falangism",
      "brazilian-integralism",
      "integral-nationalism",
      "legionary-fascism",
      "white-nationalism",
      "salafi-jihadism",
      "materialist-feminism",
      "trotskyism",
      "georgism",
      "degrowth",
      "distributism",
      "christian-socialism",
      "ujamaa",
      "labor-zionism",
      "islamic-feminism",
      "deep-ecology",
      "classical-liberalism",
      "social-liberalism",
      "traditional-conservatism",
      "national-conservatism",
      "social-democracy",
      "democratic-socialism",
      "left-libertarianism",
      "minarchism",
      "libertarian-socialism",
      "eco-socialism",
      "marxism",
      "communism",
    ]));
    expect(new Set(researchedRelationships.map((relationship) => relationship.id)).size).toBe(researchedRelationships.length);
    expect(researchedRelationships.every((relationship) => relationship.evidencePosture === "source-backed-contested")).toBe(true);
    expect(researchedRelationships.some((relationship) => relationship.kind === "epistemic")).toBe(true);
    expect(researchedConfigurations.every((configuration) => configuration.researchedRelationships.every((relationship) => relationship.statement.length > 0
      && relationship.sourceRefs.length > 0
      && relationship.participants.length >= 2
      && relationship.participants.every((participant) => participant.commitmentIds.length > 0
        && participant.commitmentIds.every((commitmentId) => configuration.commitments.some((commitment) => commitment.id === commitmentId)))))).toBe(true);
    expect(researchedConfigurations.find((configuration) => configuration.targetId === "christian-democracy")?.researchedRelationships
      .some((relationship) => relationship.participants.some((participant) => participant.id === "solidarity"))).toBe(true);
    expect(validateIdeologyConfigurations(DATASET)).toEqual([]);
    expect(canonicalConfigurations.every((configuration) => configuration.conceptualCommitments.length > 0)).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptions.some((conception) => conception.conceptId === "self-management-freedom" && !conception.facetId && conception.representation === "explicit-research-conception" && conception.evidencePosture === "source-backed"))).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptions.some((conception) => conception.representation === "facet-proxy" && conception.facetId !== undefined))).toBe(true);
    expect(configurations.every((configuration) => configuration.conceptions.every((conception) => conception.representation === "explicit-research-conception" ? conception.facetId === undefined : conception.facetId !== undefined))).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptions.length > 0)).toBe(true);
    expect(configurations.every((configuration) => configuration.conceptions.every((conception) => conception.interpretation.length > 0 && conception.sourceRefs.every((sourceRef) => sourceIds.has(sourceRef))))).toBe(true);
    expect(configurations.some((configuration) => configuration.conceptualCommitments.length > 0)).toBe(true);
    const newlyResearchedAnchorIds = [
      "classical-liberalism",
      "social-liberalism",
      "traditional-conservatism",
      "national-conservatism",
      "left-libertarianism",
      "right-libertarianism",
      "minarchism",
      "marxism",
      "anarchism-family",
      "conservatism-family",
      "liberalism-family",
      "socialism-family",
      "nationalism-family",
      "republicanism-family",
      "feminism-family",
      "libertarianism",
      "neoliberalism",
      "marxism-leninism",
      "populism",
      "anarcho-capitalism",
      "revisionist-bernsteinian-social-democracy",
      "autonomist-marxism",
      "austromarxism",
      "egalitarian-liberal-feminism",
      "cultural-spiritual-ecofeminism",
      "materialist-socialist-ecofeminism",
      "christian-nationalism",
      "buddhist-nationalism",
      "anarcho-pacifism",
      "classical-liberal-feminism",
      "liberal-feminism",
      "contemporary-neo-republicanism",
      "green-anarchism",
      "anarcha-feminism",
      "liberal-nationalism",
      "radical-feminism",
      "individualist-anarchism",
      "egoist-anarchism",
      "cultural-feminism",
      "cultural-nationalism",
      "ethnocultural-nationalism",
      "lesbian-feminism",
      "one-nation-conservatism",
      "zionism",
      "socialist-marxist-feminism",
      "mutualism",
      "radical-conservatism",
      "reactionary-conservatism",
      "islamism",
      "khomeinism",
      "qutbism",
      "radical-republicanism",
      "left-wing-populism",
      "neoconservatism",
      "paleoconservatism",
      "wasatiyya",
      "right-wing-populism",
      "agrarian-populism",
      "hindutva",
      "religious-zionism",
      "marxist-feminism",
      "socialist-feminism",
      "ordoliberalism",
      "religious-nationalism",
      "conservative-nationalism",
      "neo-fascism",
      "third-positionism",
      "national-syndicalism",
      "italian-fascism",
      "flemish-belgian-fascism",
      "japanese-fascism",
      "british-fascism",
      "french-fascism",
      "falangism",
      "brazilian-integralism",
      "integral-nationalism",
      "legionary-fascism",
      "fascism",
      "white-nationalism",
      "neo-nazism",
      "revolutionary-islamism",
      "salafi-jihadism",
      "black-nationalism",
      "materialist-feminism",
      "arab-nationalism",
      "maoism",
      "georgism",
      "degrowth",
      "distributism",
      "christian-socialism",
      "ujamaa",
      "labor-zionism",
      "deep-ecology",
    ];
    expect(newlyResearchedAnchorIds.every((targetId) => configurations
      .find((configuration) => configuration.targetId === targetId)
      ?.conceptions.some((conception) => conception.representation === "explicit-research-conception" && conception.sourceRefs.length > 0))).toBe(true);
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
    expect(explicitConceptBasis?.[0]).toMatchObject({ expectedDirection: "indeterminate", calculationSource: "none", profileDimensionIds: ["concepts-and-conceptions"] });
    expect(explicitConceptBasis?.[0]?.agreement).toBeUndefined();
    expect(explicitConceptBasis?.[0]?.contribution).toBeUndefined();
  });

  it("projects only canonical configurations and keeps morphology provisional", () => {
    const result = calculateResults(allAnswers(2));
    const canonicalNodeIds = new Set(DATASET.ideologyNodes.filter((node) => node.placement === "canonical").map((node) => node.id));
    expect(result.beliefMorphology.status).toBe("provisional-candidates");
    expect(result.beliefMorphology.candidates.length).toBeGreaterThan(0);
    expect(result.beliefMorphology.compatibility).toEqual({
      legacyAnchorScorerPreserved: true,
      legacyScorerRemainsPrimaryForRegression: true,
      primaryInference: "belief-profile",
      legacyScorerRole: "compatibility-regression",
    });
    expect(result.beliefMorphology.candidates.every((candidate) => canonicalNodeIds.has(candidate.ontologyNodeId))).toBe(true);
    expect(result.beliefMorphology.candidates.every((candidate) => candidate.configuration.priorities.status === "not-established")).toBe(true);
    expect(result.beliefMorphology.gaps).toEqual(expect.arrayContaining([expect.stringContaining("not validated latent traits")]));
  });

  it("names the belief interpretation as primary and keeps legacy scoring downstream", () => {
    const result = calculateResults(allAnswers(2));
    expect(result.primary.profile).toBe(result.beliefProfile);
    expect(result.primary.morphology).toBe(result.beliefMorphology);
    expect(result.primary.pulls).toBe(result.primary.profile.crossLayerPulls);
    expect(result.primary.pulls).toBe(result.pulls);
    expect(result.legacy.layers).toBe(result.layers);
    expect(result.legacy.combined).toBe(result.combined);

    const injectedLegacyPull = {
      id: "legacy-injected-pull",
      title: "Injected legacy pull",
      body: "This must not become primary belief evidence.",
      layers: ["descriptive", "prescriptive"] as const,
    };
    const profile = calculateBeliefProfile(allAnswers(2), DATASET, [injectedLegacyPull]);
    expect(profile.crossLayerPulls).not.toContainEqual(injectedLegacyPull);
    expect(profile.tensions).not.toContainEqual(expect.objectContaining({ id: injectedLegacyPull.id }));
  });

  it("derives profile tensions from directional belief evidence instead of legacy mixed-response dilution", () => {
    const answers = allAnswers(0);
    for (const [layer, facetId] of [["normative", "liberty"], ["prescriptive", "state-capacity"]] as const) {
      const questions = DATASET.questions.filter((question) => question.layer === layer && question.effects[facetId] !== undefined && question.effects[facetId] !== 0);
      const totalWeight = questions.reduce((sum, question) => sum + Math.abs(question.effects[facetId] ?? 0), 0);
      const selectedQuestion = questions.find((question) => Math.abs(question.effects[facetId] ?? 0) < totalWeight * 0.5);
      expect(selectedQuestion).toBeDefined();
      if (!selectedQuestion) throw new Error(`no low-weight ${layer}/${facetId} fixture question`);
      answers[selectedQuestion.id] = (selectedQuestion.effects[facetId] ?? 0) > 0 ? 2 : -2;
    }

    const result = calculateResults(answers);
    expect(result.primary.profile.facets.find((facet) => facet.layer === "normative" && facet.facetId === "liberty")?.signal).toBe(1);
    expect(result.primary.profile.facets.find((facet) => facet.layer === "prescriptive" && facet.facetId === "state-capacity")?.signal).toBe(1);
    expect(result.legacy.layers.normative.kind).toBe("covered");
    expect(result.legacy.layers.prescriptive.kind).toBe("covered");
    if (result.legacy.layers.normative.kind === "covered" && result.legacy.layers.prescriptive.kind === "covered") {
      expect(result.legacy.layers.normative.profile.liberty).toBeLessThan(0.55);
      expect(result.legacy.layers.prescriptive.profile["state-capacity"]).toBeLessThan(0.55);
    }
    expect(result.primary.pulls).toEqual(expect.arrayContaining([expect.objectContaining({ id: "autonomy-administration" })]));
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
    expect(changed.measurementSummary.branchMetadataQuestionIds).toHaveLength(DATASET.questions.length);
    expect(changed.measurementSummary.ideologyCodedQuestionIds).toHaveLength(0);
  });

  it("fails closed before morphology when the three-layer evidence threshold is not met", () => {
    const result = calculateResults(allAnswers("no-view"));
    expect(result.beliefProfile.status).toBe("insufficient-information");
    expect(result.beliefMorphology).toMatchObject({
      status: "insufficient-information",
      candidates: [],
      underDeterminedCandidates: [],
      resolution: { status: "insufficient-information", candidateIds: [] },
    });
    expect(result.beliefMorphology.gaps[0]).toContain("no ideological morphology candidate is derived");
  });

  it("does not name a morphology from exclusively mixed responses", () => {
    const result = calculateResults(allAnswers(0));
    expect(result.beliefProfile.status).toBe("partial");
    expect(result.beliefMorphology.status).toBe("not-derived");
    expect(result.beliefMorphology.candidates).toEqual([]);
    expect(result.beliefMorphology.underDeterminedCandidates.length).toBeGreaterThan(0);
    expect(result.beliefMorphology.underDeterminedCandidates.every((candidate) => candidate.status === "under-determined")).toBe(true);
    expect(result.beliefMorphology.resolution).toMatchObject({ status: "not-derived", candidateIds: [] });
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
