import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { calculateResults } from "./scoring";
import type { AnswerMap } from "./types";

const allDirectionalAnswers = (): AnswerMap => Object.fromEntries(DATASET.questions.map((question) => [question.id, 2]));

const displaySeparationFor = (margin: number): "low" | "moderate" | "high" => margin <= DATASET.policy.separationThreshold
  ? "low"
  : margin <= DATASET.policy.clearSeparationThreshold
    ? "moderate"
    : "high";

describe("configuration morphology separation", () => {
  it("records a finite competing-candidate margin without changing the provisional neighborhood", () => {
    const morphology = calculateResults(allDirectionalAnswers()).beliefMorphology;

    expect(morphology.modelVersion).toBe(3);
    expect(morphology.candidates.length).toBeGreaterThan(1);
    expect(morphology.candidates.every((candidate) => Number.isFinite(candidate.margin))).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.margin >= 0 && candidate.margin <= 1)).toBe(true);
    expect(morphology.candidates.every((candidate) => candidate.separation === displaySeparationFor(candidate.margin))).toBe(true);
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
    expect(morphology.gaps).toEqual(expect.arrayContaining([expect.stringContaining("no unique ideology label is selected")]));
  });
});
