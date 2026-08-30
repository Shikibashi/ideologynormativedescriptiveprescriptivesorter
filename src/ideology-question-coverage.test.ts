import { beforeAll, describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { auditIdeologyQuestionCoverage, type IdeologyQuestionCoverageReport } from "./ideology-question-coverage";
import type { Dataset } from "./types";

describe("ideology question coverage", () => {
  let report: IdeologyQuestionCoverageReport;

  beforeAll(() => {
    report = auditIdeologyQuestionCoverage(DATASET);
  }, 30_000);

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
      allCanonicalTargetsReachDirectionalPrimaryProfileEvidence: false,
      allCanonicalTargetsReachTargetMorphologyEvidence: false,
      allResearchRouteVariantsHaveQuestionTrace: true,
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

  it("traces every source-backed route variant to the existing contested family block", () => {
    const expectedRouteCounts = new Map([
      ["populism", 2],
      ["islamism", 2],
      ["religious-nationalism", 2],
      ["deep-ecology", 4],
    ]);
    const routeRows = report.rows.filter((row) => row.routeVariantCoverage.length > 0);
    const routeCoverages = routeRows.flatMap((row) => row.routeVariantCoverage);

    expect(routeRows.map((row) => row.targetId)).toEqual([...expectedRouteCounts.keys()]);
    expect(routeCoverages).toHaveLength(10);
    expect(report.structuralChecks.allResearchRouteVariantsHaveQuestionTrace).toBe(true);
    for (const [targetId, routeCount] of expectedRouteCounts) {
      const row = report.rows.find((candidate) => candidate.targetId === targetId);

      expect(row?.routeVariantCoverage).toHaveLength(routeCount);
      expect(row?.routeVariantCoverage.every((route) => route.status === "pass")).toBe(true);
      for (const route of row?.routeVariantCoverage ?? []) {
        expect(route.layer).toBe("prescriptive");
        expect(route.questionCount).toBe(4);
        expect(route.sourceIds.length).toBeGreaterThan(0);
        expect(route.directionalCommitmentFacetIds.length).toBeGreaterThan(0);
        expect(route.coveredDirectionalFacetIds.length).toBeGreaterThan(0);
        expect(route.directionalItemCount).toBeGreaterThan(0);
      }
    }
  });

  it("keeps route traces non-scoring and fails closed when a route loses its target effects", () => {
    const brokenDataset: Dataset = {
      ...DATASET,
      questions: DATASET.questions.map((question) => question.id.startsWith("p-populism-")
        ? { ...question, effects: {} }
        : question),
    };
    const brokenReport = auditIdeologyQuestionCoverage(brokenDataset);
    const populism = brokenReport.rows.find((row) => row.targetId === "populism");

    expect(populism?.layers.prescriptive.representationPosture).toBe("contested-indeterminate");
    expect(populism?.routeVariantCoverage.every((route) => route.status === "gap")).toBe(true);
    expect(brokenReport.structuralChecks.allResearchRouteVariantsHaveQuestionTrace).toBe(false);
    expect(brokenReport.openGaps).toContain(
      "populism prescriptive has no determinate source-backed commitment direction; this layer remains contested or not established",
    );
    expect(brokenReport.failures).toContain(
      "populism populism:majoritarian-popular-sovereignty route does not reach a four-item target question trace",
    );
  }, 30_000);

  it("distinguishes directional, contested, and unrepresented layer postures", () => {
    const classicalLiberalism = report.rows.find((row) => row.targetId === "classical-liberalism");
    const populism = report.rows.find((row) => row.targetId === "populism");

    expect(classicalLiberalism?.layers.descriptive.representationPosture).toBe("directional");
    expect(classicalLiberalism?.layers.normative.representationPosture).toBe("directional");
    expect(classicalLiberalism?.layers.prescriptive.representationPosture).toBe("directional");
    expect(populism?.layers.prescriptive.representationPosture).toBe("contested-indeterminate");

    const detachedDataset: Dataset = {
      ...DATASET,
      questions: DATASET.questions.map((question) => question.targetNodeIds?.includes("classical-liberalism")
        ? { ...question, targetNodeIds: [] }
        : question),
    };
    const detachedReport = auditIdeologyQuestionCoverage(detachedDataset);
    const detached = detachedReport.rows.find((row) => row.targetId === "classical-liberalism");

    expect(detached?.layers.descriptive.representationPosture).toBe("unrepresented");
    expect(detached?.layers.normative.representationPosture).toBe("unrepresented");
    expect(detached?.layers.prescriptive.representationPosture).toBe("unrepresented");
  }, 30_000);

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
    expect(row.evidenceTrace.allTargetQuestionsReachDirectionalPrimaryProfile).toBe(false);
    expect(row.evidenceTrace.allTargetLayersReachDirectionalPrimaryProfile).toBe(true);
    expect(row.evidenceTrace.allLayersReachTargetMorphology).toBe(true);
    for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
      const trace = row.evidenceTrace.layers[layer];
      expect(trace).toMatchObject({ status: "pass" });
      expect(trace.targetQuestionIds).toHaveLength(4);
      expect(trace.primaryProfileEvidenceQuestionIds).toEqual(trace.targetQuestionIds);
      expect(trace.primaryProfileDirectionalEvidenceQuestionIds).toEqual(trace.directionalTargetQuestionIds);
      expect(trace.morphologyEvidenceQuestionIds.length).toBeGreaterThan(0);
    }
  });

  it("does not manufacture direction for unmatched items or indeterminate layers", () => {
    const classical = report.rows.find((candidate) => candidate.targetId === "classical-liberalism");
    const populism = report.rows.find((candidate) => candidate.targetId === "populism");

    expect(classical?.evidenceTrace.layers.descriptive.representationPosture).toBe("directional");
    expect(classical?.evidenceTrace.layers.descriptive.directionalTargetQuestionIds.length).toBeLessThan(4);
    expect(classical?.evidenceTrace.layers.descriptive.primaryProfileEvidenceQuestionIds).toHaveLength(4);
    expect(classical?.evidenceTrace.layers.descriptive.primaryProfileDirectionalEvidenceQuestionIds)
      .toEqual(classical?.evidenceTrace.layers.descriptive.directionalTargetQuestionIds);

    expect(populism?.layers.prescriptive.representationPosture).toBe("contested-indeterminate");
    expect(populism?.evidenceTrace.layers.prescriptive.representationPosture).toBe("contested-indeterminate");
    expect(populism?.evidenceTrace.layers.prescriptive.directionalTargetQuestionIds).toEqual([]);
    expect(populism?.evidenceTrace.layers.prescriptive.status).toBe("not-established");
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
