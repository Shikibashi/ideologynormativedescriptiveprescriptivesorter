import { beforeAll, describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { auditIdeologyQuestionCoverage, type IdeologyQuestionCoverageReport } from "./ideology-question-coverage";

describe("ideology question coverage", () => {
  let report: IdeologyQuestionCoverageReport;

  beforeAll(() => {
    report = auditIdeologyQuestionCoverage(DATASET);
  });

  it("traces every canonical 4/4/4 target block to its configuration and primary morphology path", () => {

    expect(report.validationErrors).toEqual([]);
    expect(report.canonicalTargetCount).toBe(119);
    expect(report.failures).toEqual([]);
    expect(report.openGaps).toEqual([
      "populism prescriptive has no determinate source-backed commitment direction; this layer remains contested or not established",
      "islamism prescriptive has no determinate source-backed commitment direction; this layer remains contested or not established",
      "religious-nationalism prescriptive has no determinate source-backed commitment direction; this layer remains contested or not established",
      "deep-ecology prescriptive has no determinate source-backed commitment direction; this layer remains contested or not established",
    ]);
    expect(report.structuralChecks).toEqual({
      allCanonicalTargetsHaveFourQuestionsPerLayer: true,
      allCanonicalLayersHaveSourceBackedTrace: false,
      allCanonicalTargetsReachPrimaryMorphology: true,
      allPrimaryMorphologyCandidatesAreProvisional: true,
    });
  }, 30_000);

  it("maps the Islamism normative social-justice item to its characteristic profile commitment", () => {
    const islamism = report.rows.find((row) => row.targetId === "islamism");

    expect(islamism?.layers.normative).toMatchObject({
      status: "pass",
      coveredDirectionalFacetIds: expect.arrayContaining(["equality"]),
    });
    expect(islamism?.layers.normative.questionAlignments.find((item) => item.questionId === "n-islamism-02"))
      .toMatchObject({ alignment: "aligned", matchedFacetIds: ["equality"] });
  });

  it("keeps each layer's coverage detail available for review without treating it as respondent evidence", () => {
    const firstRow = report.rows[0];

    expect(firstRow).toBeDefined();
    if (!firstRow) return;
    for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
      const coverage = firstRow.layers[layer];
      expect(coverage.questionIds).toHaveLength(4);
      expect(coverage.questionAlignments).toHaveLength(4);
      expect(coverage.directionalItemCount).toBeGreaterThan(0);
      expect(coverage.status).toBe("pass");
    }
    expect(report.interpretation).toContain("does not establish respondent comprehension");
  });
});
