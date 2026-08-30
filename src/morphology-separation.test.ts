import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { calculateResults } from "./scoring";
import type { AnswerMap } from "./types";

const allDirectionalAnswers = (): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, 2]));

const prescriptiveOnlyAnswers = (): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [
  question.id,
  question.layer === "prescriptive" ? 1 : 0,
]));

const displaySeparationFor = (margin: number): "low" | "moderate" | "high" => margin <= DATASET.policy.separationThreshold
  ? "low"
  : margin <= DATASET.policy.clearSeparationThreshold
    ? "moderate"
    : "high";

describe("configuration morphology separation", () => {
  it("records a finite competing-candidate margin without changing the provisional neighborhood", () => {
    const morphology = calculateResults(allDirectionalAnswers()).beliefMorphology;

    expect(morphology.modelVersion).toBe(6);
    expect(morphology.candidates.length).toBeGreaterThan(1);
    expect(morphology.underDeterminedCandidates).toEqual([]);
    expect(morphology.candidates.every((candidate) => Number.isFinite(candidate.margin))).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.margin >= 0 && candidate.margin <= 1)).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.definingCoverage >= 0 && candidate.definingCoverage <= 1)).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.observedDefiningCommitmentCount <= candidate.definingCommitmentCount)).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.separation === displaySeparationFor(candidate.margin))).toBe(true);
    expect(morphology.candidates.every((candidate) => Object.keys(candidate.layerSupport).join(",") === "descriptive,normative,prescriptive")).toBe(true);
    expect(morphology.candidates.every((candidate) => Object.values(candidate.layerSupport).every((support) => {
      const agreementIsBounded = support.directionalAgreement === undefined
        || (support.directionalAgreement >= 0 && support.directionalAgreement <= 1);
      return agreementIsBounded
        && support.coverage >= 0
        && support.coverage <= 1
        && support.observedCommitmentCount >= 0
        && support.observedCommitmentCount <= support.commitmentCount;
    }))).toBe(true);
    const hybrid = morphology.candidates.find((candidate) => candidate.interpretationKind === "hybrid-formation");
    expect(hybrid).toBeDefined();
    expect(hybrid?.hybridOfIds.length).toBeGreaterThan(0);
    expect(morphology.resolution.status).toBe("coarse-neighborhood");
    expect(morphology.resolution.candidateIds).toEqual(morphology.candidates.slice(0, 5).map((candidate) => candidate.anchorId));
    expect(morphology.resolution.rationale).toContain("no unique ideology label is selected");
    expect(morphology.gaps.some((gap) => gap.includes("internal-fit margin"))).toBe(true);
  });

  it("marks identical configuration profiles as low separation and does not select a unique label", () => {
    const firstAnchor = DATASET.anchors[0];
    const duplicateAnchor = { ...firstAnchor, id: "test-duplicate-classical-liberalism" };
    const tiedDataset = {
      ...DATASET,
      anchors: [firstAnchor, duplicateAnchor, ...DATASET.anchors.slice(1)],
    };
    const morphology = calculateResults(allDirectionalAnswers(), tiedDataset).beliefMorphology;
    const first = morphology.candidates.find((candidate) => candidate.anchorId === firstAnchor.id);
    const duplicate = morphology.candidates.find((candidate) => candidate.anchorId === duplicateAnchor.id);

    expect(first).toBeDefined();
    expect(duplicate).toBeDefined();
    expect(duplicate?.fit).toBeCloseTo(first?.fit ?? Number.NaN, 12);
    expect(duplicate).toMatchObject({ margin: 0, separation: "low" });
    expect(morphology.resolution.status).toBe("coarse-neighborhood");
    expect(morphology.gaps).toEqual(expect.arrayContaining([expect.stringContaining("no unique ideology label is selected")]));
  });

  it("withholds under-determined configurations from provisional candidate ordering", () => {
    const morphology = calculateResults(prescriptiveOnlyAnswers()).beliefMorphology;
    const provisionalIds = new Set(morphology.candidates.map((candidate) => candidate.anchorId));
    const classicalLiberalism = morphology.candidates.find((candidate) => candidate.anchorId === "classical-liberalism");

    expect(morphology.status).toBe("provisional-candidates");
    expect(morphology.candidates.length).toBeGreaterThan(0);
    expect(morphology.candidates.every((candidate) => candidate.status === "provisional-candidate")).toBe(true);
    expect(morphology.underDeterminedCandidates.length).toBeGreaterThan(0);
    expect(morphology.underDeterminedCandidates.every((candidate) => candidate.status === "under-determined")).toBe(true);
    expect(morphology.underDeterminedCandidates.every((candidate) => !provisionalIds.has(candidate.anchorId))).toBe(true);
    expect(morphology.resolution.candidateIds).toEqual(morphology.candidates.slice(0, 5).map((candidate) => candidate.anchorId));
    expect(morphology.gaps).toEqual(expect.arrayContaining([expect.stringContaining("withheld from provisional candidate ordering")]));
    expect(classicalLiberalism).toBeDefined();
    expect(classicalLiberalism?.layerSupport.descriptive).toMatchObject({ coverage: 0, observedCommitmentCount: 0 });
    expect(classicalLiberalism?.layerSupport.descriptive.directionalAgreement).toBeUndefined();
    expect(classicalLiberalism?.layerSupport.normative).toMatchObject({ coverage: 0, observedCommitmentCount: 0 });
    expect(classicalLiberalism?.layerSupport.normative.directionalAgreement).toBeUndefined();
    expect(classicalLiberalism?.layerSupport.prescriptive.directionalAgreement).toBeDefined();
  });
});
