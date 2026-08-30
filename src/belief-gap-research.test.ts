import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateCountsFor, validateBeliefGapCandidates } from "./belief-gap-candidates";

const sourceIds = new Set(DATASET.sources.map((source) => source.id));

describe("belief measurement-gap research tranche", () => {
  it("keeps the three uncovered constructs source-linked and evenly represented", () => {
    expect(validateBeliefGapCandidates(DATASET)).toEqual([]);
    expect(beliefGapCandidateCountsFor()).toEqual({
      "concept-conception": 0,
      "social-order-moral-scope": 0,
      "diagnosis-causal-account": 0,
      "legitimacy-authority": 0,
      "distributive-principle": 0,
      "institutional-mechanism": 0,
      "political-economy": 0,
      "change-strategy": 0,
      "priority-conflict": 5,
      "epistemic-stance": 5,
      "heterodoxy-contestation": 5,
    });
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => candidate.sourceRefs.every((sourceRef) => sourceIds.has(sourceRef)))).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((candidate) => candidate.sourceRefs.includes("source-sagiv-schwartz-values-review"))).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((candidate) => candidate.sourceRefs.includes("source-elkjaer-wlezien-dont-know"))).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.some((candidate) => candidate.sourceRefs.includes("source-freeden-steers-morphology"))).toBe(true);
  });

  it("keeps every gap candidate out of the production and scoring surface", () => {
    const productionQuestionIds = new Set(DATASET.questions.map((question) => question.id));
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => candidate.reviewStatus === "research_candidate")).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => !productionQuestionIds.has(candidate.id))).toBe(true);
    expect(BELIEF_GAP_CANDIDATES.every((candidate) => candidate.responseOptions.length >= 3 && candidate.scholarlyRationale.length > 0)).toBe(true);
  });
});
