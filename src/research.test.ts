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
    expect(targets.find((target) => target.id === "deep-ecology")).toMatchObject({ targetKind: "ideology-node", level: "micro", placement: "canonical", anchorId: "deep-ecology", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "civic-republicanism")).toMatchObject({ targetKind: "registry-entry", measurementStatus: "registry-only" });
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
    expect(targets.find((target) => target.id === "fascism")).toMatchObject({ targetKind: "ideology-node", level: "macro", placement: "canonical", anchorId: "fascism", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
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
    expect(targets.find((target) => target.id === "georgism")).toMatchObject({ targetKind: "ideology-node", level: "meso", placement: "canonical", anchorId: "georgism", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "ujamaa")).toMatchObject({ targetKind: "ideology-node", level: "meso", placement: "canonical", anchorId: "ujamaa", measurementStatus: "dedicated-scored", questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 } });
    expect(targets.find((target) => target.id === "gandhian-political-thought")).toMatchObject({ targetKind: "ideology-node", level: "meso", placement: "contextual", measurementStatus: "contextual-only", questionCounts: { descriptive: 0, normative: 0, prescriptive: 0 } });
  });

  it("integrates Labor Zionism as a source-backed canonical micro branch with convergent research safeguards", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "labor-zionism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      measurementStatus: "dedicated-scored",
      anchorId: "labor-zionism",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "labor-zionism", label: "Labor Zionism", level: "micro" },
      ],
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "labor-zionism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "labor-zionism", placement: "canonical", status: "scored" });

    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("labor-zionism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Labor Zionism as a historically situated"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-ucp-shafir-land-labor"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-yona-labour-zionism"))).toBe(true);

    const candidates = researchCandidatesForTarget("labor-zionism");
    expect(candidates).toHaveLength(12);
    expect(candidates.filter((candidate) => candidate.layer === "descriptive")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "normative")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "prescriptive")).toHaveLength(4);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "labor-zionism")?.dimensions).toHaveLength(17);
    expect(researchNeighborDiscriminants.filter((item) => item.targetId === "labor-zionism")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((item) => item.targetId === "labor-zionism")?.guardItemIds).toEqual(expect.arrayContaining(["rc-labor-zionism-d-01", "rc-labor-zionism-n-03", "rc-labor-zionism-p-02", "rc-labor-zionism-p-04"]));
    expect(researchCoverageSummaries.find((item) => item.targetId === "labor-zionism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12, sourceStrength: "high" });
    expect(researchTaxonomyDecisionForTarget("labor-zionism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-30" });
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "labor-zionism")).toBe(true);
  });

  it("integrates Islamic Feminism as a source-backed canonical micro branch with interpretive and institutional safeguards", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "islamic-feminism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      measurementStatus: "dedicated-scored",
      anchorId: "islamic-feminism",
      canonicalPath: [
        { id: "feminism", label: "Feminism", level: "macro" },
        { id: "islamic-feminism", label: "Islamic Feminism", level: "micro" },
      ],
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "islamic-feminism")).toMatchObject({ canonicalParentId: "feminism", anchorId: "islamic-feminism", placement: "canonical", status: "scored" });

    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("islamic-feminism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Islamic Feminism as a plural contemporary"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-islamic-feminism-schroter"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-musawah-vision-family"))).toBe(true);

    const candidates = researchCandidatesForTarget("islamic-feminism");
    expect(candidates).toHaveLength(12);
    expect(candidates.filter((candidate) => candidate.layer === "descriptive")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "normative")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "prescriptive")).toHaveLength(4);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "islamic-feminism")?.dimensions).toHaveLength(17);
    expect(researchNeighborDiscriminants.filter((item) => item.targetId === "islamic-feminism")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((item) => item.targetId === "islamic-feminism")?.guardItemIds).toEqual(expect.arrayContaining(["rc-islamic-feminism-d-01", "rc-islamic-feminism-d-02", "rc-islamic-feminism-n-02", "rc-islamic-feminism-p-01", "rc-islamic-feminism-p-04"]));
    expect(researchCoverageSummaries.find((item) => item.targetId === "islamic-feminism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12, sourceStrength: "high" });
    expect(researchTaxonomyDecisionForTarget("islamic-feminism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-30" });
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "islamic-feminism")).toBe(true);
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
    expect(curatedResearchCandidates).toHaveLength(1524);
    expect(new Set(curatedResearchCandidates.map((candidate) => candidate.id)).size).toBe(1524);
    expect(validateCuratedResearchBank(DATASET)).toEqual([]);
    expect(validateCuratedResearchMetadata(DATASET)).toEqual([]);
    expect(curatedResearchCandidates.every((candidate) => candidate.reviewStatus === "research_candidate" && !("effects" in candidate))).toBe(true);
    expect(DATASET.questions).toHaveLength(1500);
    expect(DATASET.manifest.questionCount).toBe(1500);
  }, 60_000);

  it("gives every covered branch a three-layer starter block and review metadata", () => {
    const targetIds = [...new Set(curatedResearchCandidates.map((candidate) => candidate.targetId))];
    expect(targetIds).toHaveLength(127);
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
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)?.currentStatus).toBe(["anarchism", "conservatism", "ecologism", "fascism", "feminism", "liberalism", "nationalism", "republicanism", "socialism"].includes(targetId) ? "dedicated-scored" : "catalog-only");
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
    expect(DATASET.ideologyNodes.find((node) => node.id === "fascism")).toMatchObject({ status: "scored", anchorId: "fascism", placement: "canonical" });
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("fascism")).every((question) => question.context?.startsWith("Analytical scope: Fascism as a contested family"))).toBe(true);
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

  it("activates Fascism as a source-backed macro family with explicit historical boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "macro",
      placement: "canonical",
      canonicalPath: [{ id: "fascism", label: "Fascism", level: "macro" }],
      anchorId: "fascism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "fascism")).toMatchObject({ anchorId: "fascism", status: "scored", placement: "canonical" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Fascism as a contested family"))).toBe(true);
    for (const sourceId of ["source-routledge-griffin-nature-fascism", "source-penguinrandomhouse-paxton-anatomy-fascism", "source-uwpress-payne-history-fascism", "source-cambridge-mann-fascists"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "fascism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "fascism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "fascism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "fascism")).toBe(true);
  });

  it("activates White Nationalism as a source-backed high-risk racial-national boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "white-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "white-nationalism", label: "White Nationalism", level: "micro" },
      ],
      anchorId: "white-nationalism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "white-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "white-nationalism", status: "scored", placement: "canonical" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("white-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: White Nationalism as a high-risk"))).toBe(true);
    for (const sourceId of ["source-cambridge-geary-global-white-nationalism", "source-cambridge-buzas-racial-nationalism", "source-oup-nieli-white-identity", "source-cambridge-rosenberg-white-supremacist-discourse"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "white-nationalism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "white-nationalism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "white-nationalism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "white-nationalism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "white-nationalism")).toBe(true);
  });

  it("activates Neo-Nazism as a source-backed high-risk postwar continuity boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "neo-nazism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "national-socialism", label: "National Socialism (Nazism)", level: "meso" },
        { id: "neo-nazism", label: "Neo-Nazism", level: "micro" },
      ],
      anchorId: "neo-nazism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "neo-nazism")).toMatchObject({ canonicalParentId: "national-socialism", anchorId: "neo-nazism", status: "scored", placement: "canonical" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("neo-nazism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Neo-Nazism as a high-risk"))).toBe(true);
    for (const sourceId of ["source-bloomsbury-jackson-colin-jordan-neo-nazi", "source-nyup-goodrick-clarke-black-sun", "source-tandf-kahn-german-neo-nazism", "source-wiley-simi-neo-nazi-movements"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "neo-nazism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "neo-nazism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "neo-nazism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "neo-nazism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neo-nazism")).toBe(true);
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

  it("activates Salafi-Jihadism with a high-risk doctrinal and non-operational boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "salafi-jihadism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "islamism", label: "Islamism", level: "meso" }, { id: "salafi-jihadism", label: "Salafi-Jihadism", level: "micro" }],
      anchorId: "salafi-jihadism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "salafi-jihadism")).toMatchObject({ canonicalParentId: "islamism", anchorId: "salafi-jihadism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("salafi-jihadism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Salafi-Jihadism as a historically situated"))).toBe(true);
    for (const sourceId of ["source-oup-meijer-global-salafism", "source-oup-wehrey-boukhars-salafism-currents", "source-cambridge-wagemakers-quietist-jihadi", "source-cambridge-lav-salafi-jihadi-theonomy"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "salafi-jihadism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "salafi-jihadism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "salafi-jihadism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "salafi-jihadism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "salafi-jihadism")).toBe(true);
    expect(directQuestions.some((question) => /tactics|targets|recruitment/i.test(question.prompt))).toBe(false);

    expect(researchCandidatesForTarget("right-libertarianism")).toHaveLength(12);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "right-libertarianism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchCandidatesForTarget("green-politics")).toHaveLength(12);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "green-politics")).toMatchObject({ currentStatus: "contextual-only", newCandidateItems: 12 });
  });

  it("records Salafi-Jihadism as canonical but only provisionally scored", () => {
    expect(researchTaxonomyDecisionForTarget("salafi-jihadism")).toMatchObject({
      disposition: "retain-canonical",
      evidenceStatus: "source-backed-contested",
      resultingPlacement: "canonical",
      resultingScoringStatus: "scored-provisional",
    });
    expect(researchTaxonomyDecisionForTarget("salafi-jihadism")?.sourceIds).toEqual(expect.arrayContaining([
      "source-oup-meijer-global-salafism",
      "source-cambridge-lav-salafi-jihadi-theonomy",
    ]));
  });

  it("activates Revolutionary Islamism with cross-case public-order and transformation boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "revolutionary-islamism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [{ id: "islamism", label: "Islamism", level: "meso" }, { id: "revolutionary-islamism", label: "Revolutionary Islamism", level: "micro" }],
      anchorId: "revolutionary-islamism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "revolutionary-islamism")).toMatchObject({ canonicalParentId: "islamism", anchorId: "revolutionary-islamism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("revolutionary-islamism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Revolutionary Islamism as a historically situated and cross-context Islamist branch"))).toBe(true);
    for (const sourceId of ["source-cambridge-chalcraft-islamism-revolution", "source-cambridge-sadeghi-boroujerdi-revolutionary-islam", "source-cambridge-maidul-islam-islamism-ideology", "source-oup-nasr-islamic-leviathan"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "revolutionary-islamism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "revolutionary-islamism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "revolutionary-islamism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "revolutionary-islamism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "revolutionary-islamism")).toBe(true);
  });

  it("activates Third Positionism with postwar far-right and term-disambiguation boundaries", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "third-positionism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "neo-fascism", label: "Neo-Fascism", level: "meso" },
        { id: "third-positionism", label: "Third Positionism", level: "micro" },
      ],
      anchorId: "third-positionism",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "third-positionism")).toMatchObject({ canonicalParentId: "neo-fascism", anchorId: "third-positionism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("third-positionism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Third Positionism as a historically situated and contested postwar far-right"))).toBe(true);
    for (const sourceId of ["source-aup-wolff-terza-posizione", "source-oup-griffin-third-positionism", "source-cambridge-taiana-third-position", "source-cambridge-kressel-argentine-franco"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "third-positionism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "third-positionism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "third-positionism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "third-positionism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "third-positionism")).toBe(true);
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

  it("activates Georgism with a land-rent and labor-improvement boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "georgism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "georgism", label: "Georgism", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "georgism")).toMatchObject({ anchorId: "georgism", status: "scored", placement: "canonical" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("georgism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Georgism / Georgist political economy"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-helsinki-obeng-odoom-georgist-political-economy"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-mclean-land-value-taxation"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oll-george-progress-poverty"))).toBe(true);
    expect(researchCandidatesForTarget("georgism")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "georgism")?.dimensions.length).toBeGreaterThanOrEqual(8);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "georgism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "georgism")).toMatchObject({ preferredOutcome: expect.stringContaining("convergent") });
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "georgism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchTaxonomyDecisionForTarget("georgism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("activates Degrowth with a growth-critical, justice, and institutional-route boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "degrowth");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "degrowth", label: "Degrowth", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "degrowth")).toMatchObject({ anchorId: "degrowth", status: "scored", placement: "canonical" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "degrowth")?.canonicalParentId).toBeUndefined();
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("degrowth"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Degrowth as a plural ecological-economic and political project"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cup-kallis-degrowth"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-sage-savini-degrowth-ideology"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-manchester-buch-hansen-degrowth-transformations"))).toBe(true);
    expect(researchCandidatesForTarget("degrowth")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "degrowth")?.dimensions.length).toBeGreaterThanOrEqual(8);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "degrowth")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "degrowth")).toMatchObject({ preferredOutcome: expect.stringContaining("convergent") });
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "degrowth")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchTaxonomyDecisionForTarget("degrowth")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("activates Distributism with a wide-ownership, associational, and subsidiarity boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "distributism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "distributism", label: "Distributism", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "distributism")).toMatchObject({ anchorId: "distributism", status: "scored", placement: "canonical" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "distributism")?.canonicalParentId).toBeUndefined();
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("distributism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Distributism as a historically rooted and internally varied political-economic tradition"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-jstor-salter-distributism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-boyd-distributism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cauriensia-utrera-distributism"))).toBe(true);
    expect(researchCandidatesForTarget("distributism")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "distributism")?.dimensions.length).toBeGreaterThanOrEqual(8);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "distributism")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "distributism")).toMatchObject({ preferredOutcome: expect.stringContaining("convergent") });
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "distributism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchTaxonomyDecisionForTarget("distributism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("activates Christian Socialism with a Christian-socialist structural-transformation boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "christian-socialism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "christian-socialism", label: "Christian Socialism", level: "meso" }],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "christian-socialism")).toMatchObject({ anchorId: "christian-socialism", status: "scored", placement: "canonical" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "christian-socialism")?.canonicalParentId).toBeUndefined();
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("christian-socialism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Christian Socialism as a plural and historically varied political tradition"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-bloomsbury-williams-christian-socialism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-drake-gospel-church"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-sage-hogan-christian-socialism"))).toBe(true);
    expect(researchCandidatesForTarget("christian-socialism")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "christian-socialism")?.dimensions.length).toBeGreaterThanOrEqual(8);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "christian-socialism")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "christian-socialism")).toMatchObject({ preferredOutcome: expect.stringContaining("convergent") });
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "christian-socialism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchTaxonomyDecisionForTarget("christian-socialism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("activates Ujamaa with a bounded African-Socialist and postcolonial development boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "ujamaa");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "canonical",
      canonicalPath: [{ id: "ujamaa", label: "Ujamaa (African Socialism)", level: "meso" }],
      anchorId: "ujamaa",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "ujamaa")).toMatchObject({ anchorId: "ujamaa", status: "scored", placement: "canonical" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "ujamaa")?.canonicalParentId).toBeUndefined();
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("ujamaa"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Ujamaa / Nyererean African Socialism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-jennings-ujamaa"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-lal-self-reliance-ujamaa"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-nyerere-arusha-declaration-1967"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "ujamaa")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "ujamaa")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "ujamaa")).toMatchObject({ preferredOutcome: expect.stringContaining("convergent") });
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "ujamaa")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(researchTaxonomyDecisionForTarget("ujamaa")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
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

  it("activates Falangism with a historically bounded Spanish national-syndicalist boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "falangism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "falangism", label: "Falangism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "falangism")).toMatchObject({ canonicalParentId: "fascism", anchorId: "falangism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("falangism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Falangism as a historically situated Spanish fascist and national-syndicalist current"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-falangism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-wiley-colas-falangism"))).toBe(true);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "falangism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "falangism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "falangism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "falangism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "falangism")).toBe(true);
  });

  it("activates Brazilian Integralism with a source-repaired transnational and historical boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "brazilian-integralism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "brazilian-integralism", label: "Brazilian Integralism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "brazilian-integralism")).toMatchObject({ canonicalParentId: "fascism", anchorId: "brazilian-integralism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("brazilian-integralism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Brazilian Integralism as a historically situated Brazilian integralist current"))).toBe(true);
    for (const sourceId of ["source-scielo-bianchi-integralism", "source-tandf-goncalves-brazil-integralism", "source-ufjf-calil-integralism", "source-unesp-perez-brazil-integralism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "brazilian-integralism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "brazilian-integralism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "brazilian-integralism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "brazilian-integralism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "brazilian-integralism")).toBe(true);
  });

  it("activates Integral Nationalism with a source-backed cross-case historical boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "integral-nationalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "nationalism", label: "Nationalism", level: "macro" },
        { id: "integral-nationalism", label: "Integral Nationalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "integral-nationalism")).toMatchObject({ canonicalParentId: "nationalism", anchorId: "integral-nationalism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("integral-nationalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Integral Nationalism as a contested historical term"))).toBe(true);
    for (const sourceId of ["source-cambridge-integral-nationalism", "source-ucpress-zaitsev-integral-nationalism", "source-uvr-zajtsev-integral-nationalism", "source-psage-matsaberidze-georgian-integral-nationalism", "source-sage-spektorowski-integral-nationalism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "integral-nationalism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "integral-nationalism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "integral-nationalism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "integral-nationalism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "integral-nationalism")).toBe(true);
  });

  it("activates Legionary Fascism with a source-backed Romanian historical boundary", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "legionary-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "legionary-fascism", label: "Legionary Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "legionary-fascism")).toMatchObject({ canonicalParentId: "fascism", anchorId: "legionary-fascism", status: "scored" });
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("legionary-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Legionary Fascism as a historically situated Romanian fascist current"))).toBe(true);
    for (const sourceId of ["source-tandf-ioanid-legionary-sacralised-politics", "source-tandf-iordachi-legionary-faith", "source-cambridge-cercel-legionary-sovereignty", "source-jstor-clark-holy-legionary-youth"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "legionary-fascism")).toMatchObject({ currentStatus: "dedicated-scored", newCandidateItems: 12 });
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "legionary-fascism")).toHaveLength(2);
    expect(researchFalsePositiveAudits.some((audit) => audit.targetId === "legionary-fascism")).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "legionary-fascism")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "legionary-fascism")).toBe(true);
  });

  it("keeps contextual and registry-only coverage separate from canonical scoring", () => {
    const contextIds = [
      "anarchism-context",
      "green-communitarianism",
      "green-politics",
      "liberal-conservatism-context",
      "market-socialism-context",
    ];
    const targets = buildResearchTargets(DATASET);

    for (const targetId of contextIds) {
      expect(researchCandidatesForTarget(targetId)).toHaveLength(12);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ currentStatus: "contextual-only", newCandidateItems: 12 });
      expect(researchAnchorProfiles.some((profile) => profile.targetId === targetId)).toBe(true);
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
      expect(targets.find((target) => target.id === targetId)?.measurementStatus).toBe("contextual-only");
    }

    expect(DATASET.questions.some((question) => question.targetNodeIds?.some((targetId) => contextIds.includes(targetId)))).toBe(false);
  });

  it("keeps Gandhian Political Thought as a source-backed contextual research target without production scoring", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "gandhian-political-thought");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "contextual",
      canonicalPath: [],
      measurementStatus: "contextual-only",
      questionCounts: { descriptive: 0, normative: 0, prescriptive: 0 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "gandhian-political-thought")).toMatchObject({ placement: "contextual", status: "catalog-only" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "gandhian-political-thought")?.anchorId).toBeUndefined();
    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes("gandhian-political-thought"))).toBe(false);
    const candidates = researchCandidatesForTarget("gandhian-political-thought");
    expect(candidates).toHaveLength(12);
    expect(candidates.filter((candidate) => candidate.layer === "descriptive")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "normative")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "prescriptive")).toHaveLength(4);
    expect(candidates.every((candidate) => candidate.sourceIds.includes("source-oup-parel-pax-gandhiana"))).toBe(true);
    expect(candidates.every((candidate) => candidate.sourceIds.includes("source-gandhi-heritage-portal-key-texts"))).toBe(true);
    expect(researchCoverageSummaries.find((summary) => summary.targetId === "gandhian-political-thought")).toMatchObject({ currentStatus: "contextual-only", newCandidateItems: 12 });
    const gandhianProfile = researchAnchorProfiles.find((profile) => profile.targetId === "gandhian-political-thought");
    expect(gandhianProfile?.dimensions).toHaveLength(0);
    expect(gandhianProfile?.conceptions.map((conception) => conception.conceptId)).toEqual([
      "ethical-self-rule",
      "means-ends-nonviolence",
      "constructive-self-government",
      "trusteeship-economic-duty",
    ]);
    expect(gandhianProfile?.conceptions).toEqual(expect.arrayContaining([
      expect.objectContaining({ conceptId: "ethical-self-rule", layer: "normative", centrality: "defining" }),
      expect.objectContaining({ conceptId: "means-ends-nonviolence", layer: "normative", centrality: "defining" }),
      expect.objectContaining({ conceptId: "constructive-self-government", layer: "prescriptive", centrality: "characteristic" }),
      expect.objectContaining({ conceptId: "trusteeship-economic-duty", layer: "prescriptive", centrality: "contested" }),
    ]));
    expect(gandhianProfile?.conceptions.every((conception) => conception.sourceIds.length > 0 && conception.sourceIds.every((sourceId) => DATASET.sources.some((source) => source.id === sourceId)))).toBe(true);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "gandhian-political-thought")).toHaveLength(6);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "gandhian-political-thought")?.preferredOutcome).toContain("do not activate");
    expect(researchTaxonomyDecisionForTarget("gandhian-political-thought")).toMatchObject({ disposition: "retain-contextual", resultingPlacement: "contextual", resultingScoringStatus: "not-scored", decidedAt: "2026-08-29" });
  });

  it("keeps Market Socialism contextual while recording source-backed economic conceptions", () => {
    const target = buildResearchTargets(DATASET).find((item) => item.id === "market-socialism-context");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "meso",
      placement: "contextual",
      canonicalPath: [],
      measurementStatus: "contextual-only",
      questionCounts: { descriptive: 0, normative: 0, prescriptive: 0 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "market-socialism-context")).toMatchObject({ placement: "contextual", status: "catalog-only" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "market-socialism-context")?.sourceRefs).toEqual(expect.arrayContaining([
      "source-sep-socialism",
      "source-oup-miller-market-socialism",
      "source-tandf-neuhauser-market-socialism",
    ]));
    const candidates = researchCandidatesForTarget("market-socialism-context");
    expect(candidates).toHaveLength(12);
    expect(candidates.filter((candidate) => candidate.layer === "descriptive")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "normative")).toHaveLength(4);
    expect(candidates.filter((candidate) => candidate.layer === "prescriptive")).toHaveLength(4);
    expect(candidates.every((candidate) => candidate.sourceIds.includes("source-oup-miller-market-socialism"))).toBe(true);
    expect(candidates.every((candidate) => candidate.sourceIds.includes("source-tandf-neuhauser-market-socialism"))).toBe(true);
    const marketProfile = researchAnchorProfiles.find((profile) => profile.targetId === "market-socialism-context");
    expect(marketProfile?.conceptions.map((conception) => conception.conceptId)).toEqual([
      "social-control-with-market-coordination",
      "democratic-investment-and-workplace-control",
    ]);
    expect(marketProfile?.conceptions).toEqual(expect.arrayContaining([
      expect.objectContaining({ conceptId: "social-control-with-market-coordination", layer: "normative", centrality: "defining" }),
      expect.objectContaining({ conceptId: "democratic-investment-and-workplace-control", layer: "prescriptive", centrality: "characteristic" }),
    ]));
    expect(marketProfile?.conceptions.every((conception) => conception.sourceIds.length > 0 && conception.sourceIds.every((sourceId) => DATASET.sources.some((source) => source.id === sourceId)))).toBe(true);
    expect(researchTaxonomyDecisionForTarget("market-socialism-context")).toMatchObject({ disposition: "retain-contextual", resultingPlacement: "contextual", resultingScoringStatus: "not-scored", decidedAt: "2026-08-30" });
    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes("market-socialism-context"))).toBe(false);
  });

  it("promotes Bernsteinian revision as a narrow historical microtype with full source-backed coverage", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "revisionist-bernsteinian-social-democracy");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "socialism", label: "Socialism", level: "macro" },
        { id: "social-democracy", label: "Social Democracy", level: "meso" },
        { id: "revisionist-bernsteinian-social-democracy", label: "Revisionist / Bernsteinian Social Democracy", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "revisionist-bernsteinian-social-democracy")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("revisionist-bernsteinian-social-democracy"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Revisionist / Bernsteinian Social Democracy as a historically situated"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-ostrowski-bernstein-reform-revolution"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-fletcher-bernstein-foreign-policy"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-oup-constitutionalism-bernstein-revisionism"))).toBe(true);
    expect(directQuestions.every((question) => question.sourceRefs.includes("source-cambridge-steger-evolutionary-socialism"))).toBe(true);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "revisionist-bernsteinian-social-democracy")?.dimensions.length).toBeGreaterThanOrEqual(15);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "revisionist-bernsteinian-social-democracy")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "revisionist-bernsteinian-social-democracy")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("revisionist-bernsteinian-social-democracy")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes National-Syndicalism as a bounded historical microtype with explicit neighboring boundaries", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "national-syndicalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "national-syndicalism", label: "National-Syndicalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "national-syndicalism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("national-syndicalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: National-Syndicalism as a historically bounded"))).toBe(true);
    for (const sourceId of ["source-cambridge-ganapini-national-syndicalism", "source-pucminas-national-syndicalism", "source-cambridge-abse-syndicalism-fascism", "source-kci-shin-cercle-proudhon"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "national-syndicalism")?.dimensions.length).toBeGreaterThanOrEqual(10);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "national-syndicalism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "national-syndicalism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("national-syndicalism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes British Fascism as a bounded historical microtype with national and organizational variation", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "british-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "british-fascism", label: "British Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "british-fascism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("british-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: British Fascism as a historically bounded"))).toBe(true);
    for (const sourceId of ["source-cambridge-jackson-british-fascism", "source-oup-liburd-british-fascisti-empire", "source-cambridge-douglas-british-irish-fascism", "source-cambridge-loughlin-british-fascism-northern-ireland"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "british-fascism")?.dimensions.length).toBeGreaterThanOrEqual(12);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "british-fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "british-fascism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("british-fascism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes French Fascism as a bounded and contested historical microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "french-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "french-fascism", label: "French Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "french-fascism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("french-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: French Fascism as a historically bounded"))).toBe(true);
    for (const sourceId of ["source-cambridge-passmore-french-fascism", "source-oup-passmore-right-france-vichy", "source-oup-millington-french-veterans-fascism", "source-oup-paxton-french-peasant-fascism", "source-cambridge-desan-french-fascism-conversion"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "french-fascism")?.dimensions.length).toBeGreaterThanOrEqual(12);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "french-fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "french-fascism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("french-fascism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes Italian Fascism as a bounded historical movement-and-regime microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "italian-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "italian-fascism", label: "Italian Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "italian-fascism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("italian-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Italian Fascism as a historically bounded"))).toBe(true);
    for (const sourceId of ["source-cambridge-cerasi-italian-corporative-populism", "source-oup-morgan-italian-corporatism", "source-oup-corner-fascist-party-popular-opinion", "source-cambridge-whittam-fascist-italy-transition", "source-cambridge-forlenza-fascism-form"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "italian-fascism")?.dimensions.length).toBeGreaterThanOrEqual(12);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "italian-fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "italian-fascism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("italian-fascism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes Japanese Fascism as a contested and bounded historical microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "japanese-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "japanese-fascism", label: "Japanese Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "japanese-fascism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("japanese-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Japanese Fascism as a contested"))).toBe(true);
    for (const sourceId of ["source-cambridge-fletcher-japanese-fascism", "source-oup-hofmann-fascist-effect-japan-italy", "source-cambridge-young-japanese-fascism-empire", "source-oup-mimura-japanese-military-fascism", "source-oup-tsuzuki-japanese-fascism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "japanese-fascism")?.dimensions.length).toBeGreaterThanOrEqual(17);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "japanese-fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "japanese-fascism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("japanese-fascism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes Flemish / Belgian Fascism as a contested and bounded historical microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "flemish-belgian-fascism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "fascism", label: "Fascism", level: "macro" },
        { id: "flemish-belgian-fascism", label: "Flemish / Belgian Fascism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "flemish-belgian-fascism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("flemish-belgian-fascism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Flemish/Belgian Fascism as a contested"))).toBe(true);
    for (const sourceId of ["source-oup-de-wever-belgium-fascism", "source-tandf-de-wever-catholicism-belgium-fascism", "source-jstor-conway-rexism", "source-cambridge-van-de-maele-belgian-technocratic-fascism", "source-cambridge-dalle-mulle-flemish-nationality", "source-sage-kunkeler-flemish-fascism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "flemish-belgian-fascism")?.dimensions.length).toBeGreaterThanOrEqual(17);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "flemish-belgian-fascism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "flemish-belgian-fascism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("flemish-belgian-fascism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-28" });
  });

  it("promotes Agrarian Populism as a contested and bounded historical microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "agrarian-populism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "populism", label: "Populism", level: "meso" },
        { id: "agrarian-populism", label: "Agrarian Populism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "agrarian-populism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("agrarian-populism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Agrarian Populism as a historically varied"))).toBe(true);
    for (const sourceId of ["source-wiley-arter-agrarian-populism", "source-wiley-hajdu-agrarian-populism", "source-wiley-borras-agrarian-populism", "source-wiley-pattenden-agrarian-populism", "source-wiley-mamonova-rural-populism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "agrarian-populism")?.dimensions.length).toBeGreaterThanOrEqual(17);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "agrarian-populism")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "agrarian-populism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("agrarian-populism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("promotes Bioregionalism as a contested and bounded ecological microtype", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "bioregionalism");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      canonicalPath: [
        { id: "ecologism", label: "Ecologism / Green Ideology", level: "macro" },
        { id: "bioregionalism", label: "Bioregionalism", level: "micro" },
      ],
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "bioregionalism")).toBe(false);
    const directQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes("bioregionalism"));
    expect(directQuestions).toHaveLength(12);
    expect(directQuestions.filter((question) => question.layer === "descriptive")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "normative")).toHaveLength(4);
    expect(directQuestions.filter((question) => question.layer === "prescriptive")).toHaveLength(4);
    expect(directQuestions.every((question) => question.context?.startsWith("Analytical scope: Bioregionalism as a historically varied"))).toBe(true);
    for (const sourceId of ["source-wiley-mctaggart-bioregionalism", "source-wiley-hubbard-bioregionalism", "source-wiley-wearne-bioregionalism", "source-tandf-waldenberger-bioregionalism"]) {
      expect(directQuestions.every((question) => question.sourceRefs.includes(sourceId))).toBe(true);
    }
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "bioregionalism")?.dimensions.length).toBeGreaterThanOrEqual(7);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "bioregionalism")).toHaveLength(3);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "bioregionalism")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("bioregionalism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-29" });
  });

  it("retains Conservative New Right as a source-backed contextual formation", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "conservative-new-right");
    expect(target).toMatchObject({
      targetKind: "registry-entry",
      registryKind: "contextual-formation",
      placement: undefined,
      measurementStatus: "registry-only",
      questionCounts: { descriptive: 0, normative: 0, prescriptive: 0 },
    });
    expect(DATASET.ideologyNodes.some((node) => node.id === "conservative-new-right")).toBe(false);
    expect(DATASET.ideologyRegistry.find((entry) => entry.id === "conservative-new-right")?.sourceRefs).toEqual(expect.arrayContaining([
      "source-oup-freeden-conservative-revival",
      "source-tandf-williams-new-right",
      "source-oup-jackson-new-right-neoliberalism",
      "source-aup-bures-european-new-right",
      "source-sage-drolet-williams-european-new-right",
      "source-sage-gianoncelli-new-right",
      "source-springer-schilk-new-right-metapolitics",
    ]));
    expect(researchCandidatesForTarget("conservative-new-right")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "conservative-new-right")?.dimensions.length).toBeGreaterThanOrEqual(7);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "conservative-new-right")).toHaveLength(3);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "conservative-new-right")?.preferredOutcome).toContain("contextual formation");
    expect(researchTaxonomyDecisionForTarget("conservative-new-right")).toMatchObject({ disposition: "retain-registry-only", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored", decidedAt: "2026-08-30" });
    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes("conservative-new-right"))).toBe(false);
  });

  it("promotes Deep Ecology as a source-backed canonical ecological branch", () => {
    const target = buildResearchTargets(DATASET).find((candidate) => candidate.id === "deep-ecology");
    expect(target).toMatchObject({
      targetKind: "ideology-node",
      level: "micro",
      placement: "canonical",
      anchorId: "deep-ecology",
      measurementStatus: "dedicated-scored",
      questionCounts: { descriptive: 4, normative: 4, prescriptive: 4 },
    });
    expect(DATASET.ideologyNodes.find((node) => node.id === "deep-ecology")).toMatchObject({ canonicalParentId: "ecologism", anchorId: "deep-ecology", status: "scored", placement: "canonical" });
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "deep-ecology")).toBe(false);
    expect(DATASET.ideologyNodes.find((node) => node.id === "deep-ecology")?.sourceRefs).toEqual(expect.arrayContaining([
      "source-naess-deep-ecology",
      "source-oup-dobson-environmental-politics",
      "source-oup-attfield-environmental-movements",
      "source-trumpeter-drengson-devall-deep-ecology",
      "source-mit-katz-light-rothenberg-deep-ecology",
      "source-wiley-grey-deep-ecology-critique",
      "source-cambridge-dizerega-deep-ecology-liberalism",
      "source-uksw-bombik-deep-ecology-methodology",
      "source-sage-luke-deep-ecology",
    ]));
    expect(researchCandidatesForTarget("deep-ecology")).toHaveLength(12);
    expect(researchAnchorProfiles.find((profile) => profile.targetId === "deep-ecology")?.dimensions.length).toBeGreaterThanOrEqual(8);
    expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === "deep-ecology")).toHaveLength(4);
    expect(researchFalsePositiveAudits.find((audit) => audit.targetId === "deep-ecology")?.preferredOutcome).toContain("provisional dedicated-scored");
    expect(researchTaxonomyDecisionForTarget("deep-ecology")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional", decidedAt: "2026-08-30" });
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "deep-ecology")).toBe(true);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("deep-ecology"))).toHaveLength(12);
  });

  it("closes the completion tranche with the research-backed Bernsteinian promotion explicit", () => {
    const completionIds = [
      "agrarian-populism",
      "bioregionalism",
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
      expect(researchNeighborDiscriminants.filter((discriminant) => discriminant.targetId === targetId)).toHaveLength(["agrarian-populism", "bioregionalism", "british-fascism", "conservative-new-right", "deep-ecology", "flemish-belgian-fascism", "french-fascism", "italian-fascism", "japanese-fascism", "national-syndicalism", "revisionist-bernsteinian-social-democracy"].includes(targetId) ? ["bioregionalism", "conservative-new-right"].includes(targetId) ? 3 : 4 : 2);
      expect(researchFalsePositiveAudits.some((audit) => audit.targetId === targetId)).toBe(true);
      expect(researchCoverageSummaries.find((summary) => summary.targetId === targetId)).toMatchObject({ newCandidateItems: 12 });
      expect(targets.find((target) => target.id === targetId)?.questionCounts).toEqual(["agrarian-populism", "bioregionalism", "british-fascism", "deep-ecology", "flemish-belgian-fascism", "french-fascism", "italian-fascism", "japanese-fascism", "national-syndicalism", "right-libertarianism", "revisionist-bernsteinian-social-democracy"].includes(targetId) ? { descriptive: 4, normative: 4, prescriptive: 4 } : { descriptive: 0, normative: 0, prescriptive: 0 });
    }

    expect(DATASET.questions.some((question) => question.targetNodeIds?.some((targetId) => registryIds.includes(targetId)))).toBe(false);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("right-libertarianism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("revisionist-bernsteinian-social-democracy"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("national-syndicalism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("british-fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("french-fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("italian-fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("japanese-fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("flemish-belgian-fascism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("agrarian-populism"))).toHaveLength(12);
    expect(DATASET.questions.filter((question) => question.targetNodeIds?.includes("bioregionalism"))).toHaveLength(12);
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
    expect(DATASET.questions).toHaveLength(1500);
    expect(DATASET.manifest.questionCount).toBe(1500);
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
    expect(researchTaxonomyDecisionForTarget("fascism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("neo-fascism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("brazilian-integralism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("integral-nationalism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("legionary-fascism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("white-nationalism")).toMatchObject({ disposition: "retain-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("deep-ecology")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("bioregionalism")).toMatchObject({ disposition: "promote-to-canonical", resultingPlacement: "canonical", resultingScoringStatus: "scored-provisional" });
    expect(researchTaxonomyDecisionForTarget("civic-republicanism")).toMatchObject({ disposition: "retain-registry-only", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored", decidedAt: "2026-08-30" });
    expect(researchTaxonomyDecisionForTarget("conservative-new-right")).toMatchObject({ disposition: "retain-registry-only", resultingPlacement: "registry-only", resultingScoringStatus: "not-scored", decidedAt: "2026-08-30" });
    expect(DATASET.ideologyNodes.some((node) => node.id === "civic-republicanism")).toBe(false);
    expect(DATASET.ideologyNodes.some((node) => node.id === "conservative-new-right")).toBe(false);
    expect(DATASET.ideologyRegistry.find((entry) => entry.id === "civic-republicanism")?.sourceRefs).toEqual(expect.arrayContaining(["source-cambridge-civic-republicanism", "source-oup-gallagher-civic-virtue", "source-springer-toth-civic-republicanism", "source-oup-well-ordered-republic"]));
    expect(DATASET.ideologyRegistry.find((entry) => entry.id === "conservative-new-right")?.sourceRefs).toEqual(expect.arrayContaining(["source-aup-bures-european-new-right", "source-sage-drolet-williams-european-new-right", "source-springer-schilk-new-right-metapolitics"]));
    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes("civic-republicanism"))).toBe(false);
    expect(DATASET.questions.some((question) => question.targetNodeIds?.includes("conservative-new-right"))).toBe(false);
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
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "fascism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "neo-fascism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "legionary-fascism")).toBe(true);
    expect(DATASET.anchors.some((anchor) => anchor.ontologyNodeId === "white-nationalism")).toBe(true);
  });
});
