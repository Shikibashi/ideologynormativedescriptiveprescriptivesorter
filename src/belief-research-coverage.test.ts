import { describe, expect, it } from "vitest";
import { BELIEF_GAP_CANDIDATES } from "./belief-gap-candidates";
import { BELIEF_CONSTRUCT_DEFINITIONS, researchCandidateCoverageFor } from "./beliefs";
import { DATASET } from "./data";

describe("belief research coverage", () => {
  it("keeps every declared construct-layer cell visible across production and candidate coverage", () => {
    const coverage = researchCandidateCoverageFor(DATASET);
    const expectedCellCount = BELIEF_CONSTRUCT_DEFINITIONS.reduce((count, definition) => count + definition.layers.length, 0);
    const keys = coverage.map((item) => `${item.constructId}:${item.layer}`);

    expect(coverage).toHaveLength(expectedCellCount);
    expect(new Set(keys).size).toBe(expectedCellCount);
    expect(coverage.every((item) => item.status !== "unrepresented")).toBe(true);
    expect(coverage.filter((item) => item.status === "production-covered")).toHaveLength(15);
    expect(coverage.filter((item) => item.status === "candidate-only")).toHaveLength(10);
  });

  it("binds every quarantined candidate to its candidate-only construct-layer cell", () => {
    const coverage = researchCandidateCoverageFor(DATASET);
    const coverageByKey = new Map(coverage.map((item) => [`${item.constructId}:${item.layer}`, item]));

    for (const candidate of BELIEF_GAP_CANDIDATES) {
      const item = coverageByKey.get(`${candidate.constructId}:${candidate.layer}`);
      expect(item?.status).toBe("candidate-only");
      expect(item?.productionItemCount).toBe(0);
      expect(item?.researchCandidateIds).toContain(candidate.id);
    }

    expect(coverage.reduce((count, item) => count + item.researchCandidateCount, 0)).toBe(BELIEF_GAP_CANDIDATES.length);
  });
});
