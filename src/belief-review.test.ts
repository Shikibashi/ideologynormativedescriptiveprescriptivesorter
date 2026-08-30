import { describe, expect, it } from "vitest";
import {
  BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE,
  BELIEF_REVIEW_EVIDENCE_KINDS,
  BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS,
  validateBeliefReviewEvidenceKinds,
} from "./belief-review";

const externalGateIds = [
  "cognitive-response-process",
  "expert-content-adjudication",
  "empirical-reliability-validity",
  "invariance-dif-cross-context",
  "population-consequence-review",
  "held-out-respondent-morphology",
] as const;

describe("external evidence ledger contract", () => {
  it("maps every required external gate to a declared evidence kind", () => {
    expect(Object.keys(BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE).sort()).toEqual([...externalGateIds].sort());
    expect(new Set(Object.values(BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE))).toEqual(new Set(BELIEF_REVIEW_EVIDENCE_KINDS));
    expect(BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS).toContain("evidenceKinds");
  });

  it("accepts evidence kinds that cover exactly the listed gates", () => {
    expect(validateBeliefReviewEvidenceKinds(
      ["response-process-study", "expert-content-adjudication"],
      ["cognitive-response-process", "expert-content-adjudication"],
    )).toEqual([]);
  });

  it("rejects missing, unknown, duplicate, and gate-mismatched declarations", () => {
    expect(validateBeliefReviewEvidenceKinds(undefined, ["cognitive-response-process"])).toContain("evidenceKinds must list one or more evidence kinds");
    expect(validateBeliefReviewEvidenceKinds(["unverified-citation"], ["cognitive-response-process"])).toEqual(expect.arrayContaining([
      "unknown evidence kind unverified-citation",
      "evidence kind response-process-study is required for gate cognitive-response-process",
      "evidence kind unverified-citation is not linked to a listed gate",
    ]));
    expect(validateBeliefReviewEvidenceKinds(["response-process-study", "response-process-study"], ["cognitive-response-process"])).toContain("evidenceKinds contains duplicate kinds");
    expect(validateBeliefReviewEvidenceKinds(["response-process-study"], ["expert-content-adjudication"])).toContain("evidence kind expert-content-adjudication is required for gate expert-content-adjudication");
  });
});
