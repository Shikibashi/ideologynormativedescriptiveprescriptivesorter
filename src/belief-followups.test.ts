import { describe, expect, it } from "vitest";
import {
  BELIEF_DIRECT_ITEMS,
  type BeliefDirectAnswerMap,
  directEvidenceForAnswers,
  validateBeliefDirectEvidence,
} from "./belief-direct-items";
import {
  BELIEF_RELATIONAL_FOLLOWUPS,
  type BeliefRelationalAnswerMap,
  relationalEvidenceForAnswers,
} from "./belief-followups";
import { calculateBeliefProfile, validateBeliefRelationalEvidence } from "./beliefs";
import { DATASET } from "./data";
import { calculateResults } from "./scoring";
import type { AnswerMap } from "./types";

const allQuizAnswers = (): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, 2]));

const firstRecordedAnswers = (): BeliefRelationalAnswerMap => Object.fromEntries(
  BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => {
    const option = followUp.options.find((candidate) => candidate.record !== false);
    if (!option) throw new Error(`follow-up ${followUp.id} has no recording option`);
    return [followUp.id, option.id];
  }),
);

const firstDirectAnswers = (): BeliefDirectAnswerMap => Object.fromEntries(
  BELIEF_DIRECT_ITEMS.map((item) => {
    const option = item.options.find((candidate) => candidate.record !== false);
    if (!option) throw new Error(`direct item ${item.id} has no recording option`);
    return [item.id, option.id];
  }),
);

describe("respondent-facing relational follow-ups", () => {
  it("defines six source-linked structured prompts without changing the production question bank", () => {
    expect(BELIEF_RELATIONAL_FOLLOWUPS).toHaveLength(6);
    expect(new Set(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => followUp.id)).size).toBe(6);
    expect(BELIEF_RELATIONAL_FOLLOWUPS.every((followUp) => followUp.options.length >= 4 && followUp.sourceRefs.length >= 2)).toBe(true);
    expect(BELIEF_RELATIONAL_FOLLOWUPS.every((followUp) => followUp.options.some((option) => option.id === "no-view" && option.record === false))).toBe(true);
    expect(BELIEF_RELATIONAL_FOLLOWUPS.find((followUp) => followUp.kind === "conditional")?.options
      .filter((option) => option.record !== false)
      .every((option) => option.condition?.trim())).toBe(true);
    expect(BELIEF_RELATIONAL_FOLLOWUPS
      .filter((followUp) => ["priority", "conditional", "conflict-resolution", "contradiction"].includes(followUp.kind))
      .every((followUp) => followUp.constructIds.includes("priority-conflict"))).toBe(true);
    expect(DATASET.questions).toHaveLength(DATASET.manifest.questionCount);
  });

  it("converts recorded selections into validated explicit evidence and preserves no-view as missing", () => {
    const evidence = relationalEvidenceForAnswers(firstRecordedAnswers());
    expect(evidence).toHaveLength(6);
    expect(new Set(evidence.map((item) => item.kind))).toEqual(new Set([
      "priority",
      "conditional",
      "conflict-resolution",
      "uncertainty",
      "contradiction",
      "contestation",
    ]));
    expect(validateBeliefRelationalEvidence(evidence, DATASET)).toEqual([]);

    const priorityEvidence = evidence.find((item) => item.kind === "priority");
    if (!priorityEvidence) throw new Error("expected a generated priority evidence record");
    const detachedPriorityEvidence = [{
      ...priorityEvidence,
      id: "detached-priority",
      constructIds: priorityEvidence.constructIds.filter((constructId) => constructId !== "priority-conflict"),
    }];
    expect(validateBeliefRelationalEvidence(detachedPriorityEvidence, DATASET)).toEqual(expect.arrayContaining([
      expect.stringContaining("must link its priority record to priority-conflict"),
    ]));

    const noViewAnswers = Object.fromEntries(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, "no-view"]));
    expect(relationalEvidenceForAnswers(noViewAnswers)).toEqual([]);
  });

  it("keeps the direct-belief pilot categorical, source-linked, and separate from scalar observations", () => {
    expect(BELIEF_DIRECT_ITEMS).toHaveLength(8);
    expect(new Set(BELIEF_DIRECT_ITEMS.map((item) => item.id)).size).toBe(8);
    expect(BELIEF_DIRECT_ITEMS.every((item) => item.options.length >= 4 && item.sourceRefs.length >= 2)).toBe(true);
    expect(BELIEF_DIRECT_ITEMS.every((item) => item.options.some((option) => option.id === "no-view" && option.record === false))).toBe(true);

    const evidence = directEvidenceForAnswers(firstDirectAnswers());
    expect(evidence).toHaveLength(8);
    expect(validateBeliefDirectEvidence(evidence, DATASET)).toEqual([]);

    const noViewAnswers = Object.fromEntries(BELIEF_DIRECT_ITEMS.map((item) => [item.id, "no-view"]));
    expect(directEvidenceForAnswers(noViewAnswers)).toEqual([]);
  });

  it("records an unresolved contradiction without treating it as a scalar construct score", () => {
    const answers = firstRecordedAnswers();
    const unresolvedAnswers = { ...answers, "contradiction-goal-route": "unresolved-conflict" };
    const evidence = relationalEvidenceForAnswers(unresolvedAnswers);
    const profile = calculateBeliefProfile(allQuizAnswers(), DATASET, [], evidence);

    expect(profile.relationalSummary).toMatchObject({ contradictions: 1, unresolvedContradictions: 1 });
    const contradiction = profile.relationalEvidence.find((item) => item.kind === "contradiction");
    expect(contradiction).toBeDefined();
    expect(contradiction).not.toHaveProperty("resolution");
    expect(profile.constructs.find((construct) => construct.id === "priority-conflict")).toMatchObject({ status: "not-yet-measured" });
  });

  it("lets explicit relationship evidence narrow the open-gap notices while legacy scoring stays identical", () => {
    const answers = allQuizAnswers();
    const base = calculateResults(answers, DATASET);
    const evidence = relationalEvidenceForAnswers(firstRecordedAnswers());
    const enriched = calculateResults(answers, DATASET, evidence);

    expect(enriched.layers).toEqual(base.layers);
    expect(enriched.combined).toEqual(base.combined);
    expect(enriched.beliefProfile.relationalEvidence).toHaveLength(6);
    expect(enriched.beliefProfile.tensions.some((tension) => tension.id === "priority-order-not-established")).toBe(false);
    expect(enriched.beliefProfile.tensions.some((tension) => tension.id === "conditional-rules-not-established")).toBe(false);
    expect(enriched.beliefProfile.tensions.some((tension) => tension.id === "conflict-resolution-not-established")).toBe(false);
    expect(enriched.beliefProfile.tensions.some((tension) => tension.id === "epistemic-confidence-not-established")).toBe(false);
    expect(enriched.beliefProfile.tensions.some((tension) => tension.id === "contestation-not-established")).toBe(false);
    expect(enriched.beliefProfile.gaps).toEqual(expect.arrayContaining([
      expect.stringContaining("A priority rule is recorded"),
      expect.stringContaining("A conditional rule is recorded"),
      expect.stringContaining("A conflict-resolution rule is recorded"),
      expect.stringContaining("An uncertainty statement is recorded"),
      expect.stringContaining("A response to internal contestation is recorded"),
    ]));
    expect(enriched.beliefProfile.gaps).toEqual(expect.arrayContaining([
      expect.stringContaining("not a claim about accuracy"),
      expect.stringContaining("not a validated scalar measure"),
    ]));
    expect(enriched.beliefProfile.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "relational-evidence-priority-conflict-rule", layer: "priority-conflict-rule", status: "validation-gap" }),
      expect.objectContaining({ id: "relational-evidence-relationship", layer: "relationship", status: "validation-gap" }),
    ]));
    expect(enriched.beliefProfile.constructs.find((construct) => construct.id === "priority-conflict")).toMatchObject({
      relationalEvidenceCount: 4,
      relationalEvidenceIds: expect.arrayContaining([
        expect.stringContaining("priority-liberty-equality"),
        expect.stringContaining("conditional-reform-deep-change"),
        expect.stringContaining("conflict-rights-local-autonomy"),
        expect.stringContaining("contradiction-goal-route"),
      ]),
    });
    expect(enriched.beliefProfile.constructs.find((construct) => construct.id === "epistemic-stance")).toMatchObject({
      relationalEvidenceCount: 1,
      relationalEvidenceIds: [expect.stringContaining("uncertainty-descriptive-claim")],
    });
    expect(enriched.beliefProfile.constructs.find((construct) => construct.id === "epistemic-stance")?.signal).toBeUndefined();
    expect(enriched.beliefProfile.constructs.find((construct) => construct.id === "heterodoxy-contestation")).toMatchObject({
      relationalEvidenceCount: 1,
      relationalEvidenceIds: [expect.stringContaining("contestation-minority-response")],
    });
    expect(enriched.beliefProfile.constructs.find((construct) => construct.id === "heterodoxy-contestation")?.signal).toBeUndefined();
    expect(enriched.beliefMorphology.candidates[0]?.relationalBasis).toHaveLength(6);
  });

  it("keeps different priority and conditional rules visible without changing scalar affinity", () => {
    const firstAnswers = {
      ...firstRecordedAnswers(),
      "priority-liberty-equality": "freedom-first",
      "conditional-reform-deep-change": "support-immediate-benefit",
    };
    const secondAnswers = {
      ...firstRecordedAnswers(),
      "priority-liberty-equality": "equality-first",
      "conditional-reform-deep-change": "withhold-foreclosing-reform",
    };
    const first = calculateResults(allQuizAnswers(), DATASET, relationalEvidenceForAnswers(firstAnswers));
    const second = calculateResults(allQuizAnswers(), DATASET, relationalEvidenceForAnswers(secondAnswers));

    expect(first.beliefProfile.relationalEvidence).not.toEqual(second.beliefProfile.relationalEvidence);
    expect(first.beliefProfile.relationalEvidence.find((item) => item.kind === "priority")?.rule)
      .not.toBe(second.beliefProfile.relationalEvidence.find((item) => item.kind === "priority")?.rule);
    expect(first.beliefProfile.relationalEvidence.find((item) => item.kind === "conditional")?.condition)
      .not.toBe(second.beliefProfile.relationalEvidence.find((item) => item.kind === "conditional")?.condition);
    const scalarConstructProjection = (result: ReturnType<typeof calculateResults>) => result.beliefProfile.constructs.map((construct) => {
      const { relationalEvidenceCount: _relationalEvidenceCount, relationalEvidenceIds: _relationalEvidenceIds, ...scalarFields } = construct;
      return scalarFields;
    });
    expect(scalarConstructProjection(first)).toEqual(scalarConstructProjection(second));
    expect(first.beliefProfile.constructs.find((construct) => construct.id === "priority-conflict")?.relationalEvidenceIds)
      .not.toEqual(second.beliefProfile.constructs.find((construct) => construct.id === "priority-conflict")?.relationalEvidenceIds);
    expect(first.layers).toEqual(second.layers);
    expect(first.combined).toEqual(second.combined);
    expect(first.beliefMorphology.candidates.map((candidate) => [candidate.anchorId, candidate.fit, candidate.coverage, candidate.basis]))
      .toEqual(second.beliefMorphology.candidates.map((candidate) => [candidate.anchorId, candidate.fit, candidate.coverage, candidate.basis]));
    expect(first.beliefMorphology.candidates[0]?.relationalBasis)
      .not.toEqual(second.beliefMorphology.candidates[0]?.relationalBasis);
  });

  it("keeps direct pilot selections out of legacy scoring and records their option text in the profile", () => {
    const answers = allQuizAnswers();
    const base = calculateResults(answers, DATASET);
    const directEvidence = directEvidenceForAnswers(firstDirectAnswers());
    const enriched = calculateResults(answers, DATASET, [], directEvidence);

    expect(enriched.layers).toEqual(base.layers);
    expect(enriched.combined).toEqual(base.combined);
    expect(enriched.beliefProfile.directEvidence).toEqual(directEvidence);
    expect(enriched.beliefProfile.directEvidence.every((item) => item.optionLabel.length > 0 && item.statement.length > 0)).toBe(true);
    expect(enriched.beliefProfile.constructs.some((construct) => construct.directEvidenceCount > 0)).toBe(true);
    expect(enriched.beliefProfile.constructs
      .filter((construct) => construct.directEvidenceCount > 0)
      .every((construct) => construct.directEvidenceIds.length === construct.directEvidenceCount)).toBe(true);
    expect(enriched.beliefProfile.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "direct-evidence-conception", layer: "conception", status: "validation-gap" }),
      expect.objectContaining({ id: "direct-evidence-causal-belief", layer: "causal-belief", status: "validation-gap" }),
      expect.objectContaining({ id: "direct-evidence-institutional-inference", layer: "institutional-inference", status: "validation-gap" }),
    ]));
    expect(enriched.beliefProfile.gaps).toEqual(expect.arrayContaining([
      expect.stringContaining("Selected categorical direct-belief responses are visible"),
    ]));
    expect(enriched.beliefMorphology.candidates[0]?.directBasis).toHaveLength(8);
    expect(enriched.beliefMorphology.candidates[0]?.directBasis.every((item) => item.sourceRefs.length > 0)).toBe(true);
    expect(enriched.beliefMorphology.candidates[0]?.fit).toBe(base.beliefMorphology.candidates[0]?.fit);
    expect(enriched.beliefMorphology.candidates[0]?.basis).toEqual(base.beliefMorphology.candidates[0]?.basis);
  });

  it("keeps distinct conceptions and causal accounts visible without converting them into affinity signals", () => {
    const firstEvidence = directEvidenceForAnswers({
      ...firstDirectAnswers(),
      "conception-of-freedom": "non-interference",
      "causal-account-of-inequality": "unequal-resources",
    });
    const secondEvidence = directEvidenceForAnswers({
      ...firstDirectAnswers(),
      "conception-of-freedom": "non-domination",
      "causal-account-of-inequality": "institutional-feedback",
    });
    const first = calculateResults(allQuizAnswers(), DATASET, [], firstEvidence);
    const second = calculateResults(allQuizAnswers(), DATASET, [], secondEvidence);

    expect(first.beliefProfile.directEvidence.find((item) => item.questionId === "conception-of-freedom")?.statement)
      .not.toBe(second.beliefProfile.directEvidence.find((item) => item.questionId === "conception-of-freedom")?.statement);
    expect(first.beliefProfile.directEvidence.find((item) => item.questionId === "causal-account-of-inequality")?.statement)
      .not.toBe(second.beliefProfile.directEvidence.find((item) => item.questionId === "causal-account-of-inequality")?.statement);
    expect(first.layers).toEqual(second.layers);
    expect(first.combined).toEqual(second.combined);
    expect(first.beliefMorphology.candidates.map((candidate) => [candidate.anchorId, candidate.fit, candidate.basis]))
      .toEqual(second.beliefMorphology.candidates.map((candidate) => [candidate.anchorId, candidate.fit, candidate.basis]));
    expect(first.beliefProfile.constructs.find((construct) => construct.id === "concept-conception"))
      .toMatchObject({ directObservationCount: 0, directEvidenceCount: expect.any(Number) });
  });

  it("keeps a weak base profile fail-closed even when optional categorical evidence is supplied", () => {
    const result = calculateResults({}, DATASET, [], directEvidenceForAnswers(firstDirectAnswers()));

    expect(result.beliefProfile.status).toBe("insufficient-information");
    expect(result.beliefProfile.directEvidence).toHaveLength(BELIEF_DIRECT_ITEMS.length);
    expect(result.beliefMorphology.status).toBe("insufficient-information");
    expect(result.beliefMorphology.candidates).toEqual([]);
  });

  it("rejects malformed optional evidence as a whole before it can shape the profile", () => {
    const validDirectEvidence = directEvidenceForAnswers(firstDirectAnswers());
    const invalidDirectEvidence = [{ ...validDirectEvidence[0], optionId: "tampered-option" }];
    const invalidRelationalEvidence = [{ ...relationalEvidenceForAnswers(firstRecordedAnswers())[0], statement: "tampered statement" }];

    const directProfile = calculateBeliefProfile(allQuizAnswers(), DATASET, [], [], invalidDirectEvidence);
    const relationalProfile = calculateBeliefProfile(allQuizAnswers(), DATASET, [], invalidRelationalEvidence);

    expect(directProfile.directEvidence).toEqual([]);
    expect(directProfile.evidenceValidationErrors).toEqual(expect.arrayContaining([
      expect.stringContaining("direct evidence: direct belief evidence"),
    ]));
    expect(directProfile.diagnostics).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "optional-evidence-contract", layer: "question", status: "validation-error" }),
    ]));
    expect(directProfile.gaps).toEqual(expect.arrayContaining([
      expect.stringContaining("Optional relational or direct evidence was rejected"),
    ]));
    expect(relationalProfile.relationalEvidence).toEqual([]);
    expect(relationalProfile.relationalSummary.priorityRules).toBe(0);
    expect(relationalProfile.evidenceValidationErrors).toEqual(expect.arrayContaining([
      expect.stringContaining("relational evidence: belief relational evidence"),
    ]));
  });
});
