import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import {
  buildResearchTargets,
  researchCandidatesForTarget,
  researchCoverageSummaries,
  researchFalsePositiveAudits,
  researchNeighborDiscriminants,
} from "./research";
import { researchTaxonomyDecisionForTarget, validateResearchTaxonomyDecisions } from "./research-governance";

describe("Confucian Political Thought research boundary", () => {
  it("keeps the source-backed associated tradition registry-only and unscored", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "confucian-political-thought");
    expect(target).toMatchObject({
      targetKind: "registry-entry",
      registryKind: "associated-tradition",
      placement: undefined,
      measurementStatus: "registry-only",
      questionCounts: { descriptive: 0, normative: 0, prescriptive: 0 },
    });
    if (!target) return;

    const sourceIds = [
      "source-oup-wong-confucian-political-philosophy",
      "source-oup-amine-classical-confucian-political-thought",
      "source-cambridge-kim-confucian-virtue-politics",
      "source-sep-modern-confucianism",
      "source-oup-chan-confucian-perfectionism",
      "source-oup-chan-confucian-republicanism",
    ];
    expect(DATASET.ideologyRegistry.find((entry) => entry.id === target.id)?.sourceRefs).toEqual(expect.arrayContaining(sourceIds));

    const candidates = researchCandidatesForTarget(target.id);
    expect(candidates).toHaveLength(12);
    expect(candidates.filter((candidate) => candidate.layer === "descriptive")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "normative")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "prescriptive")).toHaveLength(4);
    expect(candidates.every((candidate) => candidate.reviewStatus === "research_candidate" && !("effects" in candidate))).toBe(true);
    expect(candidates.every((candidate) => sourceIds.every((sourceId) => candidate.sourceIds.includes(sourceId)))).toBe(true);

    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes(target.id))).toBe(false);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === target.id)).toBe(false);
    expect(researchCandidatesForTarget(target.id).every((candidate) => candidate.targetJustification.includes("registry-only"))).toBe(true);

    const discriminants = researchNeighborDiscriminants.filter((item) => item.targetId === target.id);
    expect(discriminants).toHaveLength(3);
    const candidateIds = new Set(candidates.map((candidate) => candidate.id));
    expect(discriminants.every((item) => item.itemIds.every((itemId) => candidateIds.has(itemId)))).toBe(true);
    expect(researchFalsePositiveAudits.find((item) => item.targetId === target.id)?.guardItemIds).toEqual(expect.arrayContaining([
      "rc-confucian-political-thought-d-01",
      "rc-confucian-political-thought-n-02",
      "rc-confucian-political-thought-p-04",
    ]));
    expect(researchCoverageSummaries.find((summary) => summary.targetId === target.id)).toMatchObject({ currentStatus: "registry-only", newCandidateItems: 12 });
    expect(researchTaxonomyDecisionForTarget(target.id)).toMatchObject({ disposition: "retain-registry-only", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored" });
    expect(validateResearchTaxonomyDecisions(DATASET)).toEqual([]);
  });
});
