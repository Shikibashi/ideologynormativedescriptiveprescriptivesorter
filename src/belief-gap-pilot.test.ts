import { describe, expect, it } from "vitest";
import {
  BELIEF_GAP_CANDIDATES,
  beliefGapCandidateOptionIdFor,
  gapEvidenceForAnswers,
  validateBeliefGapEvidence,
} from "./belief-gap-candidates";
import { DATASET } from "./data";
import { calculateResults } from "./scoring";
import type { Answer, AnswerMap } from "./types";

const allAnswers = (value: Answer): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, value]));

const firstGapAnswers = (): Readonly<Record<string, string>> => Object.fromEntries(
  BELIEF_GAP_CANDIDATES.map((candidate) => [candidate.id, beliefGapCandidateOptionIdFor(candidate, 0)]),
);

describe("belief gap candidate response seam", () => {
  it("assigns stable option ids without turning candidates into production questions", () => {
    const productionQuestionIds = new Set(DATASET.questions.map((question) => question.id));
    const optionIds = BELIEF_GAP_CANDIDATES.flatMap((candidate) => candidate.responseOptions.map((_, index) => beliefGapCandidateOptionIdFor(candidate, index)));

    expect(new Set(optionIds).size).toBe(optionIds.length);
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => !productionQuestionIds.has(candidate.id))).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => candidate.responseOptions.every((_, index) => beliefGapCandidateOptionIdFor(candidate, index).startsWith(`${candidate.id}:`)))).toBe(true);
  });

  it("records substantive candidate selections while retaining no-view as missing information", () => {
    const [first, second] = BELIEF_GAP_CANDIDATES;
    const answers = {
      [first.id]: beliefGapCandidateOptionIdFor(first, 0),
      [second.id]: beliefGapCandidateOptionIdFor(second, second.responseOptions.length - 1),
    };
    const evidence = gapEvidenceForAnswers(answers);

    expect(evidence).toHaveLength(1);
    expect(evidence[0]).toMatchObject({
      candidateId: first.id,
      optionId: beliefGapCandidateOptionIdFor(first, 0),
      optionText: first.responseOptions[0],
      constructId: first.constructId,
      layer: first.layer,
      responseFormat: first.responseFormat,
      evidenceQuestionIds: [first.id],
      reviewStatus: "research_candidate",
    });
    expect(validateBeliefGapEvidence(evidence, DATASET)).toEqual([]);
  });

  it("rejects altered candidate evidence at the profile boundary", () => {
    const evidence = gapEvidenceForAnswers(firstGapAnswers());
    const altered = [{ ...evidence[0], optionText: "A fabricated option" }];

    expect(validateBeliefGapEvidence(altered, DATASET).some((error) => error.includes("mismatched option text"))).toBe(true);
    expect(calculateResults(allAnswers(2), DATASET, [], [], altered).primary.profile.gapEvidence).toEqual([]);
    expect(calculateResults(allAnswers(2), DATASET, [], [], altered).primary.profile.evidenceValidationErrors.length).toBeGreaterThan(0);
  });

  it("keeps candidate evidence visible while isolating all scored outputs", () => {
    const answers = allAnswers(2);
    const gapEvidence = gapEvidenceForAnswers(firstGapAnswers());
    const base = calculateResults(answers, DATASET);
    const pilot = calculateResults(answers, DATASET, [], [], gapEvidence);
    const candidateByConstruct = new Map(BELIEF_GAP_CANDIDATES.map((candidate) => [candidate.constructId, candidate]));

    expect(pilot.primary.profile.gapEvidence).toHaveLength(BELIEF_GAP_CANDIDATES.length);
    expect(pilot.primary.profile.gapEvidence.every((evidence) => evidence.reviewStatus === "research_candidate")).toBe(true);
    expect(pilot.primary.profile.structure.filter((dimension) => dimension.gapEvidenceIds.length > 0)).toHaveLength(6);
    expect(pilot.primary.profile.structure.find((dimension) => dimension.id === "concepts-and-conceptions")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(pilot.primary.profile.structure.find((dimension) => dimension.id === "political-economy")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(pilot.primary.profile.structure.find((dimension) => dimension.id === "political-change")).toMatchObject({ evidencePosture: "mixed-provisional" });
    expect(pilot.primary.profile.structure.filter((dimension) => ["priorities-and-conflicts", "epistemic-stance", "heterodoxy-and-contestation"].includes(dimension.id)).every((dimension) => dimension.evidencePosture === "candidate-pilot")).toBe(true);
    expect(pilot.primary.profile.constructs.filter((construct) => ["priority-conflict", "epistemic-stance", "heterodoxy-contestation"].includes(construct.id)).every((construct) => construct.status === "not-yet-measured" && construct.signal === undefined)).toBe(true);
    expect(pilot.primary.profile.constructs.filter((construct) => ["concept-conception", "political-economy", "change-strategy"].includes(construct.id)).every((construct) => construct.signal === base.primary.profile.constructs.find((candidate) => candidate.id === construct.id)?.signal)).toBe(true);
    expect(pilot.primary.profile.constructs.filter((construct) => construct.gapEvidenceCount > 0).every((construct) => candidateByConstruct.has(construct.id))).toBe(true);
    expect(pilot.primary.profile.diagnostics.some((diagnostic) => diagnostic.id === "gap-evidence-candidate-pilot" && diagnostic.status === "validation-gap")).toBe(true);
    expect(pilot.primary.profile.gaps.some((gap) => gap.includes("Selected research-candidate responses"))).toBe(true);
    expect(pilot.primary.profile.evidenceValidationErrors).toEqual([]);
    expect(JSON.stringify(pilot.primary.morphology)).toBe(JSON.stringify(base.primary.morphology));
    expect(JSON.stringify(pilot.legacy.layers)).toBe(JSON.stringify(base.legacy.layers));
    expect(JSON.stringify(pilot.legacy.combined)).toBe(JSON.stringify(base.legacy.combined));
  });
});
