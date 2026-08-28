import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import {
  buildResearchTargets,
  createResearchCandidate,
  curatedResearchCandidates,
  researchAnchorProfiles,
  researchCandidateWarnings,
  researchCandidatesForTarget,
  researchCoverageSummaries,
  researchFalsePositiveAudits,
  researchNeighborDiscriminants,
  validateCuratedResearchBank,
  validateCuratedResearchMetadata,
  validateResearchCandidate,
  validateResearchPromotion,
} from "./research";
import {
  RESEARCH_TAXONOMY_DECISIONS,
  researchTaxonomyDecisionForTarget,
  validateResearchTaxonomyDecisions,
} from "./research-governance";

describe("research workbench contracts", () => {
  it("derives the target inventory from both ontology arrays", () => {
    const targets = buildResearchTargets(DATASET);
    expect(targets).toHaveLength(DATASET.ideologyNodes.length + DATASET.ideologyRegistry.length);
    expect(targets.find((target) => target.id === "anarcho-capitalism")).toMatchObject({ targetKind: "ideology-node", measurementStatus: "dedicated-scored", level: "micro", placement: "canonical", anchorId: "anarcho-capitalism", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "deep-ecology")).toMatchObject({ targetKind: "registry-entry", measurementStatus: "registry-only" });
    expect(targets.find((target) => target.id === "conservatism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "conservatism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "anarchism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "anarchism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "anarcho-syndicalism")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "anarcho-syndicalism", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "anarcho-primitivism")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "anarcho-primitivism", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "ecologism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "ecologism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "liberalism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "liberalism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "socialism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "socialism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "nationalism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "nationalism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "republicanism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "republicanism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "feminism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "feminism-family", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "right-libertarianism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "populism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "mutualism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "islamism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "wasatiyya")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "wasatiyya", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "right-wing-populism")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "right-wing-populism", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "hindutva")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "hindutva", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "ordoliberalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "pan-africanism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "religious-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "conservative-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "national-socialism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "civic-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "black-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "materialist-feminism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "anti-colonial-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "arab-nationalism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "classical-liberal-feminism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "collectivist-anarchism")).toMatchObject({ measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
  });

  it("activates Khomeinism, Qutbism, Radical Republicanism, Marxist Feminism, Socialist Feminism, Left-Wing Populism, Neoconservatism, and Paleoconservatism with source-backed boundaries", () => {
    const targets = buildResearchTargets(DATASET);
    expect(targets.find((target) => target.id === "khomeinism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      canonicalPath: [{ id: "islamism", label: "Islamism", level: "meso" }, { id: "khomeinism", label: "Khomeinism", level: "micro" }],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "khomeinism")).toMatchObject({ canonicalParentId: "islamism", anchorId: "khomeinism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("khomeinism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Khomeinism as a historically situated"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-arjomand-khomeini-order"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-namazi-khomeini-sovereign-state"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-khomeini-democratic-constitutionalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-ghobadzadeh-governmental-shiism"))).toBe(true);
    expect(targets.find((target) => target.id === "qutbism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [{ id: "islamism", label: "Islamism", level: "meso" }, { id: "qutbism", label: "Qutbism", level: "micro" }],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "qutbism")).toMatchObject({ canonicalParentId: "islamism", anchorId: "qutbism", status: "scored" });
    const qutbismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("qutbism"));
    expect(qutbismQuestions).toHaveLength(12);
    expect(qutbismQuestions.every((question) => question.context?.startsWith("Analytical scope: Qutbism as a historically situated"))).toBe(true);
    expect(qutbismQuestions.every((question) => question.sourceRefs.includes("source-oup-toth-qutb"))).toBe(true);
    expect(qutbismQuestions.every((question) => question.sourceRefs.includes("source-tandf-khatab-qutb-hakimiyya"))).toBe(true);
    expect(qutbismQuestions.every((question) => question.sourceRefs.includes("source-tandf-faradj-qutb-authority"))).toBe(true);
    expect(qutbismQuestions.every((question) => question.sourceRefs.includes("source-oup-wagemakers-qutb-legacy"))).toBe(true);
    expect(targets.find((target) => target.id === "radical-republicanism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "republicanism", label: "Republicanism", level: "macro" },
        { id: "historical-republicanism", label: "Historical Republicanism", level: "meso" },
        { id: "radical-republicanism", label: "Radical Republicanism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "radical-republicanism")).toMatchObject({ canonicalParentId: "historical-republicanism", anchorId: "radical-republicanism", status: "scored" });
    const radicalRepublicanismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("radical-republicanism"));
    expect(radicalRepublicanismQuestions).toHaveLength(12);
    expect(radicalRepublicanismQuestions.every((question) => question.context?.startsWith("Analytical scope: Radical Republicanism as a plural historical"))).toBe(true);
    expect(radicalRepublicanismQuestions.every((question) => question.sourceRefs.includes("source-oup-radical-republicanism"))).toBe(true);
    expect(radicalRepublicanismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-pettit-non-domination"))).toBe(true);
    expect(radicalRepublicanismQuestions.every((question) => question.sourceRefs.includes("source-apsr-urbinati-republican-democracy"))).toBe(true);
    expect(radicalRepublicanismQuestions.every((question) => question.sourceRefs.includes("source-tandf-thompson-radical-republicanism"))).toBe(true);
    expect(targets.find((target) => target.id === "marxist-feminism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "socialist-marxist-feminism", label: "Socialist / Marxist Feminism", level: "meso" },
        { id: "marxist-feminism", label: "Marxist Feminism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "marxist-feminism")).toMatchObject({ canonicalParentId: "socialist-marxist-feminism", anchorId: "marxist-feminism", status: "scored" });
    const marxistFeminismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("marxist-feminism"));
    expect(marxistFeminismQuestions).toHaveLength(12);
    expect(marxistFeminismQuestions.every((question) => question.context?.startsWith("Analytical scope: Marxist Feminism as a plural feminist current"))).toBe(true);
    expect(marxistFeminismQuestions.every((question) => question.sourceRefs.includes("source-guilford-arruzza-social-reproduction"))).toBe(true);
    expect(marxistFeminismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-household-capitalism"))).toBe(true);
    expect(marxistFeminismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-ideology-work-reproduction"))).toBe(true);
    expect(marxistFeminismQuestions.every((question) => question.sourceRefs.includes("source-goldsmiths-social-reproduction-feminisms"))).toBe(true);
    expect(targets.find((target) => target.id === "socialist-feminism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "socialist-marxist-feminism", label: "Socialist / Marxist Feminism", level: "meso" },
        { id: "socialist-feminism", label: "Socialist Feminism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "socialist-feminism")).toMatchObject({ canonicalParentId: "socialist-marxist-feminism", anchorId: "socialist-feminism", status: "scored" });
    const socialistFeminismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("socialist-feminism"));
    expect(socialistFeminismQuestions).toHaveLength(12);
    expect(socialistFeminismQuestions.every((question) => question.context?.startsWith("Analytical scope: Socialist Feminism as a plural feminist-socialist current"))).toBe(true);
    expect(socialistFeminismQuestions.every((question) => question.sourceRefs.includes("source-sage-hennessy-socialist-feminism"))).toBe(true);
    expect(socialistFeminismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-cantillon-social-reproduction"))).toBe(true);
    expect(socialistFeminismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-dean-feministization"))).toBe(true);
    expect(socialistFeminismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-household-capitalism"))).toBe(true);
    expect(targets.find((target) => target.id === "left-wing-populism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "populism", label: "Populism", level: "meso" },
        { id: "left-wing-populism", label: "Left-Wing Populism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "left-wing-populism")).toMatchObject({ canonicalParentId: "populism", anchorId: "left-wing-populism", status: "scored" });
    const leftWingPopulismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("left-wing-populism"));
    expect(leftWingPopulismQuestions).toHaveLength(12);
    expect(leftWingPopulismQuestions.every((question) => question.context?.startsWith("Analytical scope: Left-Wing Populism as a contested populist variant"))).toBe(true);
    expect(leftWingPopulismQuestions.every((question) => question.sourceRefs.includes("source-oup-left-populism"))).toBe(true);
    expect(leftWingPopulismQuestions.every((question) => question.sourceRefs.includes("source-cambridge-saalfeld-left-populism"))).toBe(true);
    expect(leftWingPopulismQuestions.every((question) => question.sourceRefs.includes("source-wiley-venizelos-left-populism"))).toBe(true);
    expect(targets.find((target) => target.id === "neoconservatism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "conservatism", label: "Conservatism", level: "macro" },
        { id: "neoconservatism", label: "Neoconservatism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "neoconservatism")).toMatchObject({ canonicalParentId: "conservatism", anchorId: "neoconservatism", status: "scored" });
    const neoconservatismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("neoconservatism"));
    expect(neoconservatismQuestions).toHaveLength(12);
    expect(neoconservatismQuestions.every((question) => question.context?.startsWith("Analytical scope: Neoconservatism as a historically situated"))).toBe(true);
    expect(neoconservatismQuestions.every((question) => question.sourceRefs.includes("source-oup-neoconservatism"))).toBe(true);
    expect(neoconservatismQuestions.every((question) => question.sourceRefs.includes("source-oup-hull-neoconservatism"))).toBe(true);
    expect(neoconservatismQuestions.every((question) => question.sourceRefs.includes("source-sage-williams-neoconservatism"))).toBe(true);
    expect(targets.find((target) => target.id === "paleoconservatism")).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      canonicalPath: [
        { id: "conservatism", label: "Conservatism", level: "macro" },
        { id: "paleoconservatism", label: "Paleoconservatism", level: "micro" },
      ],
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "paleoconservatism")).toMatchObject({ canonicalParentId: "conservatism", anchorId: "paleoconservatism", status: "scored" });
    const paleoconservatismQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("paleoconservatism"));
    expect(paleoconservatismQuestions).toHaveLength(12);
    expect(paleoconservatismQuestions.every((question) => question.context?.startsWith("Analytical scope: Paleoconservatism as a historically situated"))).toBe(true);
    expect(paleoconservatismQuestions.every((question) => question.sourceRefs.includes("source-oup-paleoconservatism"))).toBe(true);
    expect(paleoconservatismQuestions.every((question) => question.sourceRefs.includes("source-oup-bartee-paleoconservatism"))).toBe(true);
    expect(paleoconservatismQuestions.every((question) => question.sourceRefs.includes("source-oup-kolozi-paleoconservatism"))).toBe(true);
    expect(paleoconservatismQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(paleoconservatismQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(paleoconservatismQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "khomeinism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "qutbism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "radical-republicanism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "marxist-feminism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "socialist-feminism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neoconservatism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "paleoconservatism")).toBe(true);
  });

  it("validates the curated research bank without mutating candidate records", () => {
    expect(curatedResearchCandidates).toHaveLength(1428);
    expect(new Set(curatedResearchCandidates.map((candidate) => candidate.id)).size).toBe(1428);
    expect(validateCuratedResearchBank(DATASET)).toEqual([]);
    expect(validateCuratedResearchMetadata(DATASET)).toEqual([]);
    expect(curatedResearchCandidates.every((candidate) => candidate.reviewStatus === "research_candidate" && !("effects" in candidate))).toBe(true);
    expect(DATASET.questions).toHaveLength(1176);
    expect(DATASET.manifest.questionCount).toBe(1176);
  }, 60_000);

  it("gives every covered branch a three-layer starter block and review metadata", () => {
    const targetIds = [...new Set(curatedResearchCandidates.map((candidate) => candidate.targetId))];
    expect(targetIds).toHaveLength(119);
    for (const targetId of targetIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId).length).toBeGreaterThanOrEqual(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)?.layersCovered).toEqual(["descriptive", "normative", "prescriptive"]);
    }
  });

  it("keeps the nine macro families source-bounded while covering all three claim layers", () => {
    const macroIds = DATASET.ideologyNodes.filter((node) => node.level === "macro").map((node) => node.id);
    expect(macroIds).toEqual([
      "liberalism",
      "conservatism",
      "socialism",
      "anarchism",
      "nationalism",
      "republicanism",
      "fascism",
      "ecologism",
      "feminism",
    ]);

    for (const targetId of macroIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)?.currentStatus).toBe(["anarchism", "conservatism", "ecologism", "feminism", "liberalism", "nationalism", "republicanism", "socialism"].includes(targetId) ? "dedicated-scored" : "catalog-only");
    }
    expect(DATASET.ideologyNodes.find((node) => node.id === "conservatism")).toMatchObject({ status: "scored", anchorId: "conservatism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("conservatism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("conservatism")).every((question) => question.context?.startsWith("Analytical scope: Conservatism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "ecologism")).toMatchObject({ status: "scored", anchorId: "ecologism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("ecologism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("ecologism")).every((question) => question.context?.startsWith("Analytical scope: Ecologism / Green Ideology as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "liberalism")).toMatchObject({ status: "scored", anchorId: "liberalism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("liberalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("liberalism")).every((question) => question.context?.startsWith("Analytical scope: Liberalism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "socialism")).toMatchObject({ status: "scored", anchorId: "socialism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("socialism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("socialism")).every((question) => question.context?.startsWith("Analytical scope: Socialism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "nationalism")).toMatchObject({ status: "scored", anchorId: "nationalism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("nationalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("nationalism")).every((question) => question.context?.startsWith("Analytical scope: Nationalism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "republicanism")).toMatchObject({ status: "scored", anchorId: "republicanism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("republicanism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("republicanism")).every((question) => question.context?.startsWith("Analytical scope: Republicanism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "feminism")).toMatchObject({ status: "scored", anchorId: "feminism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("feminism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("feminism")).every((question) => question.context?.startsWith("Analytical scope: Feminism as a plural political family"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-syndicalism")).toMatchObject({ status: "scored", anchorId: "anarcho-syndicalism", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-syndicalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-syndicalism")).every((question) => question.context?.startsWith("Analytical scope: Anarcho-Syndicalism as a historically varied social-anarchist and syndicalist current"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-capitalism")).toMatchObject({ status: "scored", anchorId: "anarcho-capitalism", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-capitalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-capitalism")).every((question) => question.context?.startsWith("Analytical scope: Anarcho-Capitalism as a contested market-anarchist current"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-primitivism")).toMatchObject({ status: "scored", anchorId: "anarcho-primitivism", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-primitivism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-primitivism")).every((question) => question.context?.startsWith("Analytical scope: Anarcho-Primitivism as a contested anti-civilization current"))).toBe(true);
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarchism")).toMatchObject({ status: "scored", anchorId: "anarchism-family", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarchism"))).toHaveLength(12);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "fascism")?.preferredOutcome).toMatch(/production/i);
  });

  it("activates the remaining canonical meso target with explicit historical boundaries", () => {
    const mesoIds = [
      "neo-fascism",
    ];

    for (const targetId of mesoIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
    }

    expect(researchCandidatesForTarget("anarchism-context")).toHaveLength(12);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "anarchism-context")).toMatchObject({ currentStatus: "contextual-only", newCandidateItems: 12 });
  });

  it("activates source-backed canonical meso blocks across all claim layers", () => {
    const activatedIds = [
      "libertarianism",
      "marxism",
      "social-anarchism",
      "anarcho-pacifism",
      "liberal-feminism",
      "christian-democracy",
      "contemporary-neo-republicanism",
      "black-feminism",
      "ecofeminism",
      "green-anarchism",
      "anarcha-feminism",
      "liberal-nationalism",
      "radical-feminism",
      "anarcho-syndicalism",
      "anarcho-capitalism",
      "communism",
      "historical-republicanism",
      "individualist-anarchism",
      "neoliberalism",
      "socialist-marxist-feminism",
      "socialist-feminism",
      "populism",
      "mutualism",
      "radical-conservatism",
      "reactionary-conservatism",
      "islamism",
      "ordoliberalism",
      "pan-africanism",
      "religious-nationalism",
      "conservative-nationalism",
      "national-socialism",
      "civic-nationalism",
      "black-nationalism",
      "materialist-feminism",
      "anti-colonial-nationalism",
      "arab-nationalism",
      "maoism",
      "council-communism",
      "guild-socialism",
      "marxism-leninism",
      "autonomist-marxism",
      "trotskyism",
      "social-ecology",
      "womanism",
      "classical-liberal-feminism",
    ];
    const targets = buildResearchTargets(DATASET);

    for (const targetId of activatedIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(targets.find((target) => target.id === targetId)).toMatchObject({
        targetKind: "ideology-node",
        placement: "canonical",
        measurementStatus: "dedicated-scored",
        questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      });
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
    }
  });

  it("activates the source-backed ordoliberalism micro block without changing ontology ancestry", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "ordoliberalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "liberalism", label: "Liberalism", level: "macro" }, { id: "ordoliberalism", label: "Ordoliberalism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "ordoliberalism")).toMatchObject({ canonicalParentId: "liberalism", anchorId: "ordoliberalism" });
  });

  it("activates the source-backed Pan-Africanism micro block without changing ontology ancestry", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "pan-africanism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "nationalism", label: "Nationalism", level: "macro" }, { id: "pan-africanism", label: "Pan-Africanism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "pan-africanism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "pan-africanism" });
  });

  it("activates the source-backed Religious Nationalism meso block without inventing canonical parentage", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "religious-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "religious-nationalism", label: "Religious Nationalism", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "religious-nationalism")).toMatchObject({ anchorId: "religious-nationalism", canonicalParentId: undefined });
  });

  it("activates the source-backed Conservative Nationalism hybrid without collapsing its National Conservatism child", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "conservative-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "conservative-nationalism", label: "Conservative Nationalism", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "conservative-nationalism")).toMatchObject({ anchorId: "conservative-nationalism", canonicalParentId: undefined });
    expect(DATASET.ideologyNodes.find((node) => node.id === "national-conservatism")).toMatchObject({ canonicalParentId: "conservative-nationalism", anchorId: "national-conservatism" });
  });

  it("activates National Socialism as a historically bounded canonical meso target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "national-socialism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "fascism", label: "Fascism", level: "macro" }, { id: "national-socialism", label: "National Socialism (Nazism)", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "national-socialism")).toMatchObject({ canonicalParentId: "fascism", anchorId: "national-socialism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("national-socialism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("national-socialism")).every((question) => question.context?.startsWith("Historical analytical scope: German National Socialism"))).toBe(true);
  });

  it("activates Civic Nationalism as a context-sensitive canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "civic-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "nationalism", label: "Nationalism", level: "macro" }, { id: "civic-nationalism", label: "Civic Nationalism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "civic-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "civic-nationalism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("civic-nationalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("civic-nationalism")).every((question) => question.context?.startsWith("Analytical scope: Civic Nationalism as a context-sensitive civic-membership formation"))).toBe(true);
  });

  it("activates Black Nationalism as a varied canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "black-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "nationalism", label: "Nationalism", level: "macro" }, { id: "black-nationalism", label: "Black Nationalism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "black-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "black-nationalism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("black-nationalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("black-nationalism")).every((question) => question.context?.startsWith("Analytical scope: Black Nationalism as a historically varied liberation-national field"))).toBe(true);
  });

  it("activates Materialist Feminism as a plural materialist canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "materialist-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialist-marxist-feminism", label: "Socialist / Marxist Feminism", level: "meso" }, { id: "materialist-feminism", label: "Materialist Feminism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "materialist-feminism")).toMatchObject({ canonicalParentId: "socialist-marxist-feminism", anchorId: "materialist-feminism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("materialist-feminism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("materialist-feminism")).every((question) => question.context?.startsWith("Analytical scope: Materialist Feminism as a plural feminist materialist tradition"))).toBe(true);
  });

  it("activates Anti-Colonial Nationalism as a historically varied canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "anti-colonial-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "nationalism", label: "Nationalism", level: "macro" }, { id: "anti-colonial-nationalism", label: "Anti-Colonial Nationalism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "anti-colonial-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "anti-colonial-nationalism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anti-colonial-nationalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anti-colonial-nationalism")).every((question) => question.context?.startsWith("Analytical scope: Anti-Colonial Nationalism as a historically varied national-liberation tradition"))).toBe(true);
  });

  it("activates Arab Nationalism as a historically formed canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "arab-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "nationalism", label: "Nationalism", level: "macro" }, { id: "arab-nationalism", label: "Arab Nationalism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "arab-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "arab-nationalism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("arab-nationalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("arab-nationalism")).every((question) => question.context?.startsWith("Analytical scope: Arab Nationalism as a historically formed political field"))).toBe(true);
  });

  it("activates Maoism as a historically bounded canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "maoism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "communism", label: "Communism", level: "meso" }, { id: "maoism", label: "Maoism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "maoism")).toMatchObject({ canonicalParentId: "communism", anchorId: "maoism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("maoism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("maoism")).every((question) => question.context?.startsWith("Analytical scope: Maoism as a historically bounded revolutionary current"))).toBe(true);
  });

  it("activates Council Communism as a historically specific canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "council-communism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "communism", label: "Communism", level: "meso" }, { id: "council-communism", label: "Council Communism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "council-communism")).toMatchObject({ canonicalParentId: "communism", anchorId: "council-communism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("council-communism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("council-communism")).every((question) => question.context?.startsWith("Analytical scope: Council Communism as a historically specific communist current"))).toBe(true);
  });

  it("activates Guild Socialism as a historically situated canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "guild-socialism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "guild-socialism", label: "Guild Socialism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "guild-socialism")).toMatchObject({ canonicalParentId: "socialism", anchorId: "guild-socialism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("guild-socialism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("guild-socialism")).every((question) => question.context?.startsWith("Analytical scope: Guild Socialism as a historically situated socialist current"))).toBe(true);
  });

  it("activates Marxism-Leninism as a historically bounded canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "marxism-leninism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "communism", label: "Communism", level: "meso" }, { id: "marxism-leninism", label: "Marxism-Leninism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "marxism-leninism")).toMatchObject({ canonicalParentId: "communism", anchorId: "marxism-leninism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("marxism-leninism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("marxism-leninism")).every((question) => question.context?.startsWith("Analytical scope: Marxism-Leninism as a historically bounded"))).toBe(true);
  });

  it("activates Autonomist Marxism as a historically varied canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "autonomist-marxism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "marxism", label: "Marxism", level: "meso" }, { id: "autonomist-marxism", label: "Autonomist Marxism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "autonomist-marxism")).toMatchObject({ canonicalParentId: "marxism", anchorId: "autonomist-marxism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("autonomist-marxism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("autonomist-marxism")).every((question) => question.context?.startsWith("Analytical scope: Autonomist Marxism as a historically varied"))).toBe(true);
  });

  it("activates Anarcho-Pacifism as a historically varied canonical micro target", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "anarcho-pacifism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "anarchism", label: "Anarchism", level: "macro" }, { id: "social-anarchism", label: "Social Anarchism", level: "meso" }, { id: "anarcho-pacifism", label: "Anarcho-Pacifism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-pacifism")).toMatchObject({ canonicalParentId: "social-anarchism", anchorId: "anarcho-pacifism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-pacifism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-pacifism")).every((question) => question.context?.startsWith("Analytical scope: Anarcho-Pacifism as a historically varied"))).toBe(true);
  });

  it("activates Social Ecology on its existing hybrid path", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "social-ecology");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "green-anarchism", label: "Green Anarchism", level: "meso" }, { id: "social-ecology", label: "Social Ecology", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "social-ecology")).toMatchObject({ canonicalParentId: "green-anarchism", anchorId: "social-ecology", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("social-ecology"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("social-ecology")).every((question) => question.context?.startsWith("Analytical scope: Social Ecology as a historically varied"))).toBe(true);
  });

  it("activates Womanism on its canonical feminist path with explicit variation boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "womanism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "feminism", label: "Feminism", level: "macro" }, { id: "womanism", label: "Womanism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "womanism")).toMatchObject({ canonicalParentId: "feminism", anchorId: "womanism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("womanism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("womanism")).every((question) => question.context?.startsWith("Analytical scope: Womanism as a historically varied"))).toBe(true);
  });

  it("activates Classical-Liberal Feminism under Liberal Feminism with an explicit branch boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "classical-liberal-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "liberal-feminism", label: "Liberal Feminism", level: "meso" }, { id: "classical-liberal-feminism", label: "Classical-Liberal Feminism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "classical-liberal-feminism")).toMatchObject({ canonicalParentId: "liberal-feminism", anchorId: "classical-liberal-feminism", status: "scored" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("classical-liberal-feminism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("classical-liberal-feminism")).every((question) => question.context?.startsWith("Analytical scope: Classical-Liberal Feminism as a contested"))).toBe(true);
  });

  it("activates Anarcho-Communism under Social Anarchism with a historical branch boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "anarcho-communism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "anarchism", label: "Anarchism", level: "macro" }, { id: "social-anarchism", label: "Social Anarchism", level: "meso" }, { id: "anarcho-communism", label: "Anarcho-Communism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-communism")).toMatchObject({ canonicalParentId: "social-anarchism", anchorId: "anarcho-communism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-communism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Anarcho-Communism as a historically varied"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-cahm-anarchist-communism"))).toBe(true);
  });

  it("activates Collectivist Anarchism under Social Anarchism with a labor-linked historical boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "collectivist-anarchism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "anarchism", label: "Anarchism", level: "macro" }, { id: "social-anarchism", label: "Social Anarchism", level: "meso" }, { id: "collectivist-anarchism", label: "Collectivist Anarchism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "collectivist-anarchism")).toMatchObject({ canonicalParentId: "social-anarchism", anchorId: "collectivist-anarchism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("collectivist-anarchism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Collectivist Anarchism as a historically bounded"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-bakunin-statism-anarchy"))).toBe(true);
  });

  it("keeps the remaining selected micro tranche catalog-only with explicit boundaries", () => {
    const microIds = [
      "neo-nazism",
      "revolutionary-islamism",
    ];

    for (const targetId of microIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "catalog-only", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
    }

    expect(researchCandidatesForTarget("right-libertarianism")).toHaveLength(12);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "right-libertarianism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchCandidatesForTarget("green-politics")).toHaveLength(12);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "green-politics")).toMatchObject({ currentStatus: "contextual-only", newCandidateItems: 12 });
  });

  it("activates Anarcho-Primitivism with an anti-civilization and technology boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "anarcho-primitivism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "green-anarchism", label: "Green Anarchism", level: "meso" }, { id: "anarcho-primitivism", label: "Anarcho-Primitivism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "anarcho-primitivism")).toMatchObject({ canonicalParentId: "green-anarchism", anchorId: "anarcho-primitivism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("anarcho-primitivism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Anarcho-Primitivism as a contested anti-civilization current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-el-ojeili-taylor-anarchoprimitivism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-dunlap-anarchist-civilization"))).toBe(true);
  });

  it("activates Austromarxism with historical, institutional, and national-autonomy boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "austromarxism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "socialism", label: "Socialism", level: "macro" }, { id: "marxism", label: "Marxism", level: "meso" }, { id: "austromarxism", label: "Austromarxism", level: "micro" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "austromarxism")).toMatchObject({ canonicalParentId: "marxism", anchorId: "austromarxism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("austromarxism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Austromarxism as a historically specific and internally varied Austrian Marxist and Social Democratic current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-historicalmaterialism-austromarxism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-jstage-renner-national-autonomy"))).toBe(true);
  });

  it("activates Egalitarian-Liberal Feminism with autonomy, equality, and enabling-condition boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "egalitarian-liberal-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "liberal-feminism", label: "Liberal Feminism", level: "meso" },
        { id: "egalitarian-liberal-feminism", label: "Egalitarian-Liberal Feminism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "egalitarian-liberal-feminism")).toMatchObject({ canonicalParentId: "liberal-feminism", anchorId: "egalitarian-liberal-feminism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("egalitarian-liberal-feminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Egalitarian-Liberal Feminism as a family within liberal feminism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-equal-citizenship-feminist-liberalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-friedman-autonomy-gender-politics"))).toBe(true);
  });

  it("activates Cultural / Spiritual Ecofeminism with anti-essentialist and cross-context boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "cultural-spiritual-ecofeminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "ecofeminism", label: "Ecofeminism", level: "meso" },
        { id: "cultural-spiritual-ecofeminism", label: "Cultural / Spiritual Ecofeminism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "cultural-spiritual-ecofeminism")).toMatchObject({ canonicalParentId: "ecofeminism", anchorId: "cultural-spiritual-ecofeminism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("cultural-spiritual-ecofeminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Cultural / Spiritual Ecofeminism as a plural ecofeminist strand"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-sep-feminist-environmental-philosophy"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-ecofeminist-universal-particular"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-feminist-theology-creation"))).toBe(true);
  });

  it("activates Materialist / Socialist Ecofeminism with material production-reproduction-ecology boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "materialist-socialist-ecofeminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "ecofeminism", label: "Ecofeminism", level: "meso" },
        { id: "materialist-socialist-ecofeminism", label: "Materialist / Socialist Ecofeminism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "materialist-socialist-ecofeminism")).toMatchObject({ canonicalParentId: "ecofeminism", anchorId: "materialist-socialist-ecofeminism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("materialist-socialist-ecofeminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Materialist / Socialist Ecofeminism as a plural ecofeminist branch"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-oksala-materialist-ecofeminism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-materialist-feminist-perspectives-environment"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-feminist-political-ecology-sundberg"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-eco-feminist-socialist-just-transition"))).toBe(true);
  });

  it("activates Buddhist Nationalism with public religion-nation and jurisdictional boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "buddhist-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "religious-nationalism", label: "Religious Nationalism", level: "meso" },
        { id: "buddhist-nationalism", label: "Buddhist Nationalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "buddhist-nationalism")).toMatchObject({ canonicalParentId: "religious-nationalism", anchorId: "buddhist-nationalism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("buddhist-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Buddhist Nationalism as a variable religious-national political project"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-buddhist-nationalism-obo"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-religious-nationalism-south-asia"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-buddhist-nationalism-berkwitz"))).toBe(true);
  });

  it("activates Christian Nationalism with Christianized membership and public-authority boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "christian-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "religious-nationalism", label: "Religious Nationalism", level: "meso" },
        { id: "christian-nationalism", label: "Christian Nationalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "christian-nationalism")).toMatchObject({ canonicalParentId: "religious-nationalism", anchorId: "christian-nationalism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("christian-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Christian Nationalism as a heterogeneous religious-national political project"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-christian-nationalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-christian-nationalism-democracy-africa"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-defining-christian-nationalism"))).toBe(true);
  });

  it("activates Egoist Anarchism with Stirnerian self-rule and anti-imposition boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "egoist-anarchism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "anarchism", label: "Anarchism", level: "macro" },
        { id: "individualist-anarchism", label: "Individualist Anarchism", level: "meso" },
        { id: "egoist-anarchism", label: "Egoist Anarchism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "egoist-anarchism")).toMatchObject({ canonicalParentId: "individualist-anarchism", anchorId: "egoist-anarchism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("egoist-anarchism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Egoist Anarchism as a contested individualist-anarchist current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-sep-stirner"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-stirner-egoism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-stirner-anarchism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-individualist-anarchism"))).toBe(true);
  });

  it("activates Cultural Feminism with cultural, care, and anti-essentialist boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "cultural-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "feminism", label: "Feminism", level: "macro" },
        { id: "radical-feminism", label: "Radical Feminism", level: "meso" },
        { id: "cultural-feminism", label: "Cultural Feminism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "cultural-feminism")).toMatchObject({ canonicalParentId: "radical-feminism", anchorId: "cultural-feminism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("cultural-feminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Cultural Feminism as a contested feminist strand"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-signs-alcoff-cultural-feminism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-alcoff-identity-crisis"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-narayan-cultural-essentialism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-kotiswaran-universal-care"))).toBe(true);
  });

  it("activates Cultural Nationalism with cultural-community and pluralist boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "cultural-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "cultural-nationalism", label: "Cultural Nationalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "cultural-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "cultural-nationalism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("cultural-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Cultural Nationalism as a contested nationalist project"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-cultural-nationalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-spencer-cultural-political-nationalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-hutchinson-memorialization-national-communities"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-giudici-grizelj-language-curricula"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cje-trohler-national-minded-citizens"))).toBe(true);
  });

  it("activates Ethnocultural Nationalism with a contested membership-rule boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "ethnocultural-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "ethnocultural-nationalism", label: "Ethnocultural Nationalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "ethnocultural-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "ethnocultural-nationalism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("ethnocultural-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Ethnocultural Nationalism as a contested nationalist conception"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-annualreviews-tamir-ethnic-civic"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-smith-ethnic-nationalism-minorities"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-smith-culture-community-territory"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-piwoni-ethnic-civic-distinction"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-national-membership-ethnic-model"))).toBe(true);
  });

  it("activates Lesbian Feminism with a compulsory-heterosexuality and autonomy boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "lesbian-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "feminism", label: "Feminism", level: "macro" },
        { id: "lesbian-feminism", label: "Lesbian Feminism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "lesbian-feminism")).toMatchObject({ canonicalParentId: "feminism", anchorId: "lesbian-feminism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("lesbian-feminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Lesbian Feminism as a contested feminist current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-uchicago-rich-compulsory-heterosexuality"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-schippers-compulsory-heterosexuality"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-lee-atchison-lesbian-separatism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-hobson-lesbian-feminism-defense"))).toBe(true);
  });

  it("activates One-Nation Conservatism with a cross-class stewardship boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "one-nation-conservatism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "conservatism", label: "Conservatism", level: "macro" },
        { id: "moderate-conservatism", label: "Moderate Conservatism", level: "meso" },
        { id: "one-nation-conservatism", label: "One-Nation Conservatism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "one-nation-conservatism")).toMatchObject({ canonicalParentId: "moderate-conservatism", anchorId: "one-nation-conservatism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("one-nation-conservatism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: One-Nation Conservatism as a historically situated"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-one-nation-conservatism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-walsha-one-nation"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-policy-press-page-one-nation-welfare"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-webb-one-nation-tradition"))).toBe(true);
  });

  it("activates Zionism with historically varied self-determination and equal-citizenship boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "zionism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "zionism", label: "Zionism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "zionism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "zionism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("zionism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Zionism as a historically situated"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cup-boix-jewish-national-identity"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-yale-shumsky-zionist-political-imagination"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-mann-zionism-human-rights"))).toBe(true);
  });

  it("activates Wasatiyya with a contested middle-way Islamist boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "wasatiyya");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "islamism", label: "Islamism", level: "meso" },
        { id: "wasatiyya", label: "Wasatiyya", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "wasatiyya")).toMatchObject({ canonicalParentId: "islamism", anchorId: "wasatiyya", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("wasatiyya"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Wasatiyya as a contested Islamist current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-wasatiyya"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-kazmi-wasatiyya"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-mej-sakthivel-wasatiyya"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-teitelbaum-wasatiyya"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "wasatiyya")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "wasatiyya")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "wasatiyya")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "wasatiyya")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "wasatiyya")).toBe(true);
  });

  it("activates Right-Wing Populism with a joint people-elite and right-host boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "right-wing-populism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "populism", label: "Populism", level: "meso" },
        { id: "right-wing-populism", label: "Right-Wing Populism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "right-wing-populism")).toMatchObject({ canonicalParentId: "populism", anchorId: "right-wing-populism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("right-wing-populism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Right-Wing Populism as a contested populist variant"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-right-populism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-meijers-right-populism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-praet-right-populism"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "right-wing-populism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "right-wing-populism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "right-wing-populism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "right-wing-populism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "right-wing-populism")).toBe(true);
  });

  it("activates Hindutva with a historically specific Hindu-national political boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "hindutva");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "religious-nationalism", label: "Religious Nationalism", level: "meso" },
        { id: "hindutva", label: "Hindutva (Hindu Nationalism)", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "hindutva")).toMatchObject({ canonicalParentId: "religious-nationalism", anchorId: "hindutva", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("hindutva"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Hindutva as a historically specific and internally contested Hindu-national political formulation"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-hindutva"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-sage-mehta-hindu-nationalism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-sarkar-hindu-nationalism-india"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-brass-hindu-nationalism"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "hindutva")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "hindutva")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "hindutva")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "hindutva")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "hindutva")).toBe(true);
  });

  it("activates Religious Zionism with a historically situated Jewish religious-national boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "religious-zionism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "religious-nationalism", label: "Religious Nationalism", level: "meso" },
        { id: "religious-zionism", label: "Religious Zionism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "religious-zionism")).toMatchObject({ canonicalParentId: "religious-nationalism", anchorId: "religious-zionism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("religious-zionism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Religious Zionism as a historically situated and internally plural Jewish religious-national current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-jstor-schwartz-religious-zionism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-yadgar-hadad-religious-zionism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-novak-zionism-judaism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-tandf-rubin-religious-zionism"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "religious-zionism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "religious-zionism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "religious-zionism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "religious-zionism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "religious-zionism")).toBe(true);
  });

  it("activates Neo-Fascism with a historically bounded postwar continuity boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "neo-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "neo-fascism", label: "Neo-Fascism", level: "meso" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "neo-fascism")).toMatchObject({ canonicalParentId: "fascism", anchorId: "neo-fascism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("neo-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Neo-Fascism as a historically situated post-1945 field"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-bull-neo-fascism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-wolff-neo-fascism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-routledge-albanese-neofascism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-forlenza-fascism-form"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "neo-fascism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "neo-fascism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "neo-fascism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "neo-fascism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neo-fascism")).toBe(true);
  });

  it("keeps the remaining fourth selected micro tranche catalog-only with explicit boundaries", () => {
    const microIds = [
      "brazilian-integralism",
      "falangism",
      "integral-nationalism",
      "legionary-fascism",
      "salafi-jihadism",
      "third-positionism",
    ];

    for (const targetId of microIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "catalog-only", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
    }

    expect(DATASET.anchors.some((anchor) => microIds.includes(anchor.ontologyNodeId ?? ""))).toBe(false);
  });

  it("keeps contextual and registry-only coverage separate from canonical scoring", () => {
    const contextIds = [
      "anarchism-context",
      "green-communitarianism",
      "green-politics",
      "liberal-conservatism-context",
      "market-socialism-context",
      "bioregionalism",
    ];
    const targets = buildResearchTargets(DATASET);

    for (const targetId of contextIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: targetId === "bioregionalism" ? "registry-only" : "contextual-only", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
      expect(targets.find((target) => target.id === targetId)?.measurementStatus).toBe(targetId === "bioregionalism" ? "registry-only" : "contextual-only");
    }

    expect(DATASET.questions.some((question) => question.targetNodeIds?.some((targetId) => contextIds.includes(targetId)))).toBe(false);
  });

  it("closes the completion tranche without promoting registry entries or changing production targeting", () => {
    const completionIds = [
      "white-nationalism",
      "agrarian-populism",
      "british-fascism",
      "civic-republicanism",
      "conservative-new-right",
      "deep-ecology",
      "flemish-belgian-fascism",
      "french-fascism",
      "italian-fascism",
      "japanese-fascism",
      "national-syndicalism",
      "revisionist-bernsteinian-social-democracy",
      "right-libertarianism",
    ];
    const registryIds = completionIds.filter((targetId) => DATASET.ideologyRegistry.some((entry) => entry.id === targetId));
    const targets = buildResearchTargets(DATASET);

    expect(completionIds).toHaveLength(13);
    for (const targetId of completionIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ newCandidateItems: 12 });
      expect(targets.find((target) => target.id === targetId)?.questionCounts).toEqual(targetId === "right-libertarianism" ? { descriptive: 4, normative: 4, prescriptive: 4 } : { descriptive: 0, normative: 0, prescriptive: 0 });
    }

    expect(DATASET.questions.some((question) => question.targetNodeIds?.some((targetId) => registryIds.includes(targetId)))).toBe(false);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("right-libertarianism"))).toHaveLength(12);
  });

  it("gives the next source-backed branch tranche direct three-layer coverage while keeping it provisional", () => {
    const directIds = [
      "classical-liberalism",
      "social-liberalism",
      "moderate-conservatism",
      "social-democracy",
      "democratic-socialism",
      "minarchism",
      "ecosocialism",
      "left-libertarianism",
      "libertarian-socialism",
      "national-conservatism",
      "christian-democracy",
      "contemporary-neo-republicanism",
      "black-feminism",
      "ecofeminism",
      "green-anarchism",
      "anarcha-feminism",
      "liberal-nationalism",
      "radical-feminism",
    ];
    const targets = buildResearchTargets(DATASET);

    for (const targetId of directIds) {
      expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes(targetId))).toHaveLength(12);
      expect(targets.find((target) => target.id === targetId)).toMatchObject({
        measurementStatus: "dedicated-scored",
        questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
      });
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
      expect(researchCandidatesForTarget(targetId).every((candidate) => candidate.reviewStatus === "research_candidate")).toBe(true);
    }

    expect(DATASET.questions.some((question) => question.targetNodeIds?.some((targetId) => DATASET.ideologyRegistry.some((entry) => entry.id === targetId)))).toBe(false);
  });

  it("does not require a hard-coded target list", () => {
    const extraNode = {
      ...DATASET.ideologyNodes[0],
      id: "test-research-node",
      label: "Test research node",
      anchorId: undefined,
      status: "catalog-only" as const,
    };
    const fixture = { ...DATASET, ideologyNodes: [...DATASET.ideologyNodes, extraNode] };
    expect(buildResearchTargets(fixture).some((target) => target.id === "test-research-node")).toBe(true);
  });

  it("creates and validates a source-backed candidate without production effects", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "anarcho-capitalism");
    expect(target).toBeDefined();
    if (!target) return;

    const scaffold = createResearchCandidate(target, "normative", DATASET);
    expect(scaffold.reviewStatus).toBe("research_candidate");
    expect("effects" in scaffold).toBe(false);
    expect(validateResearchCandidate(scaffold, DATASET)).toContain(`candidate ${scaffold.id} is missing exact wording`);

    const completed = { ...scaffold, targetJustification: "This branch needs a separate item because its theory of authority differs from nearby traditions.", exactWording: "People should be free to coordinate peaceful associations without a compulsory central authority." };
    expect(validateResearchCandidate(completed, DATASET)).toEqual([]);
    expect(DATASET.questions).toHaveLength(1176);
    expect(DATASET.manifest.questionCount).toBe(1176);
  });

  it("keeps production promotion blocked until substantive review and validation pass", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "anarcho-capitalism");
    expect(target).toBeDefined();
    if (!target) return;

    const candidate = createResearchCandidate(target, "normative", DATASET);
    const blocked = validateResearchPromotion({
      ...candidate,
      targetJustification: "This branch warrants a separate item because its authority principle differs from nearby traditions.",
      exactWording: "Peaceful associations should be free to coordinate without a compulsory central authority.",
    }, DATASET);
    expect(blocked).toEqual(expect.arrayContaining([
      expect.stringContaining("neighbor-distinctness review"),
      expect.stringContaining("cross-cultural/jurisdictional review"),
      expect.stringContaining("empirical validation"),
    ]));

    const reviewed = {
      ...candidate,
      targetJustification: "This branch warrants a separate item because its authority principle differs from nearby traditions.",
      exactWording: "Peaceful associations should be free to coordinate without a compulsory central authority.",
      promotionReview: {
        neighborDistinctness: "passed" as const,
        neighborDistinctnessEvidence: "Compared the proposed mechanism with each named neighboring branch and recorded the remaining overlap.",
        crossCulturalJurisdictional: "not-applicable" as const,
        crossCulturalJurisdictionalEvidence: "The item asks about a general institutional principle and records no jurisdiction-specific terminology.",
        empiricalValidation: "passed" as const,
        empiricalValidationEvidence: "Versioned empirical validation report attached to the candidate review record.",
      },
    };
    expect(validateResearchPromotion(reviewed, DATASET)).toEqual([]);
    expect(reviewed.reviewStatus).toBe("research_candidate");
  });

  it("reports respondent-wording risks without silently rewriting the item", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "anarcho-capitalism");
    expect(target).toBeDefined();
    if (!target) return;

    const candidate = { ...createResearchCandidate(target, "descriptive", DATASET), exactWording: "Anarcho-Capitalism and voluntary exchange always produce better outcomes." };
    const warnings = researchCandidateWarnings(candidate, target);
    expect(warnings.some((warning) => /names the target/i.test(warning))).toBe(true);
    expect(warnings.some((warning) => /more than one proposition/i.test(warning))).toBe(true);
  });

  it("keeps taxonomy promotion and demotion explicit, source-backed, and separate from scoring", () => {
    expect(RESEARCH_TAXONOMY_DECISIONS).toHaveLength(DATASET.ideologyNodes.length + DATASET.ideologyRegistry.length);
    expect(validateResearchTaxonomyDecisions(DATASET)).toEqual([]);
    expect(researchTaxonomyDecisionForTarget("khomeinism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "catalog-only" });
    expect(researchTaxonomyDecisionForTarget("qutbism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "catalog-only" });
    expect(researchTaxonomyDecisionForTarget("radical-republicanism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("marxist-feminism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("socialist-feminism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("left-wing-populism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("neoconservatism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("paleoconservatism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("wasatiyya")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("right-wing-populism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("hindutva")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("religious-zionism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("neo-fascism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("deep-ecology")).toMatchObject({ disposition: "demote-to-associated", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored" });
    expect(researchTaxonomyDecisionForTarget("bioregionalism")).toMatchObject({ disposition: "demote-to-associated", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored" });
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "qutbism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "radical-republicanism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "marxist-feminism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "socialist-feminism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "left-wing-populism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neoconservatism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "paleoconservatism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "wasatiyya")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "right-wing-populism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "hindutva")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "religious-zionism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neo-fascism")).toBe(true);
  });
});
