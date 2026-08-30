import { beforeAll, describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { auditIdeologyQuestionCoverage, type IdeologyQuestionCoverageReport } from "./ideology-question-coverage";
import type { Dataset } from "./types";

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
      allCanonicalTargetsReachPrimaryProfileEvidence: true,
      allCanonicalTargetsReachDirectionalPrimaryProfileEvidence: true,
      allCanonicalTargetsReachTargetMorphologyEvidence: true,
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

  it("traces target-tagged item ids through the primary profile and target morphology basis", () => {
    const row = report.rows.find((candidate) => candidate.targetId === "classical-liberalism");

    expect(row).toBeDefined();
    if (!row) return;

    expect(row.evidenceTrace.allTargetQuestionsReachPrimaryProfile).toBe(true);
    expect(row.evidenceTrace.allTargetQuestionsReachDirectionalPrimaryProfile).toBe(true);
    expect(row.evidenceTrace.allLayersReachTargetMorphology).toBe(true);
    for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
      const trace = row.evidenceTrace.layers[layer];
      expect(trace).toMatchObject({ status: "pass" });
      expect(trace.targetQuestionIds).toHaveLength(4);
      expect(trace.directionalTargetQuestionIds).toEqual(trace.targetQuestionIds);
      expect(trace.primaryProfileEvidenceQuestionIds).toEqual(trace.targetQuestionIds);
      expect(trace.primaryProfileDirectionalEvidenceQuestionIds).toEqual(trace.targetQuestionIds);
      expect(trace.morphologyEvidenceQuestionIds.length).toBeGreaterThan(0);
    }
  });

  it("fails closed when a target item is detached from the primary profile evidence path", () => {
    const detachedQuestionId = "n-classical-liberalism-01";
    const brokenDataset: Dataset = {
      ...DATASET,
      questions: DATASET.questions.map((question) => question.id === detachedQuestionId
        ? { ...question, effects: {} }
        : question),
    };
    const brokenReport = auditIdeologyQuestionCoverage(brokenDataset);
    const row = brokenReport.rows.find((candidate) => candidate.targetId === "classical-liberalism");

    expect(row?.evidenceTrace.layers.normative.status).toBe("gap");
    expect(row?.evidenceTrace.layers.normative.primaryProfileDirectionalEvidenceQuestionIds)
      .not.toContain(detachedQuestionId);
    expect(brokenReport.structuralChecks.allCanonicalTargetsReachPrimaryProfileEvidence).toBe(false);
    expect(brokenReport.structuralChecks.allCanonicalTargetsReachDirectionalPrimaryProfileEvidence).toBe(false);
    expect(brokenReport.failures).toContain(
      "classical-liberalism normative target questions do not all reach directional primary-profile evidence in the structural fixture",
    );
  }, 30_000);
});
