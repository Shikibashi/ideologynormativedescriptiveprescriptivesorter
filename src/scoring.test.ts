import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { calculateResults, scoringAnchorsFor, validateDataset } from "./scoring";
import type { Answer, AnswerMap, Layer } from "./types";

const answersForLayer = (layer: Layer, value: Answer, count = Number.POSITIVE_INFINITY): AnswerMap =>
  Object.fromEntries(DATASET.questions.filter((question) => question.layer === layer).slice(0, count).map((question) => [question.id, value]));

const answersTowardAnchor = (anchor: typeof DATASET.anchors[number]): AnswerMap =>
  Object.fromEntries(DATASET.questions.map((question) => {
    const alignment = Object.entries(question.effects).reduce((sum, [facetId, weight]) => sum + weight * (anchor.profiles[question.layer][facetId] ?? 0), 0);
    return [question.id, alignment === 0 ? 0 : alignment > 0 ? 2 : -2];
  }));

const minimumCoveredAnswers = (layer: Layer): number => Math.ceil(DATASET.manifest.questionsPerLayer[layer] * DATASET.policy.coverageThreshold);

describe("dataset contract", () => {
  it("accepts the versioned dataset", () => {
    expect(validateDataset(DATASET)).toEqual([]);
    expect(DATASET.manifest.questionCount).toBe(1500);
    expect(DATASET.manifest.questionsPerLayer).toEqual({ descriptive: 500, normative: 500, prescriptive: 500 });
    expect(DATASET.questions.every((question) => question.sourceRefs.some((sourceRef) => DATASET.sources.find((source) => source.id === sourceRef)?.role === "ideology-research"))).toBe(true);
    expect(DATASET.anchors.every((anchor) => anchor.sourceRefs.some((sourceRef) => DATASET.sources.find((source) => source.id === sourceRef)?.role === "ideology-research"))).toBe(true);
    const canonicalNodes = DATASET.ideologyNodes.filter((node) => node.placement === "canonical");
    expect(canonicalNodes.filter((node) => node.level === "macro")).toHaveLength(9);
    expect(canonicalNodes.filter((node) => node.level === "meso")).toHaveLength(38);
    expect(canonicalNodes.filter((node) => node.level === "micro")).toHaveLength(72);
    expect(canonicalNodes.filter((node) => node.level === "macro").map((node) => node.id)).toEqual(expect.arrayContaining(["liberalism", "ecologism", "feminism", "fascism"]));
    expect(DATASET.anchors.every((anchor) => DATASET.ideologyNodes.some((node) => node.anchorId === anchor.id))).toBe(true);
    expect(DATASET.ideologyRegistry.length).toBeGreaterThan(0);
    expect(DATASET.ideologyRegistry.some((entry) => entry.id === "deep-ecology")).toBe(false);
    expect(DATASET.ideologyNodes.find((node) => node.id === "deep-ecology")).toMatchObject({ status: "scored", anchorId: "deep-ecology", placement: "canonical", canonicalParentId: "ecologism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "national-conservatism")).toMatchObject({ canonicalParentId: "conservative-nationalism", placement: "canonical" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "ordoliberalism")).toMatchObject({ status: "scored", anchorId: "ordoliberalism", placement: "canonical", canonicalParentId: "liberalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "pan-africanism")).toMatchObject({ status: "scored", anchorId: "pan-africanism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "national-socialism")).toMatchObject({ status: "scored", anchorId: "national-socialism", placement: "canonical", canonicalParentId: "fascism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "neo-fascism")).toMatchObject({ status: "scored", anchorId: "neo-fascism", placement: "canonical", canonicalParentId: "fascism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "falangism")).toMatchObject({ status: "scored", anchorId: "falangism", placement: "canonical", canonicalParentId: "fascism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "national-syndicalism")).toMatchObject({ status: "scored", anchorId: "national-syndicalism", placement: "canonical", canonicalParentId: "fascism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "british-fascism")).toMatchObject({ status: "scored", anchorId: "british-fascism", placement: "canonical", canonicalParentId: "fascism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "japanese-fascism")).toMatchObject({ status: "scored", anchorId: "japanese-fascism", placement: "canonical", canonicalParentId: "fascism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "flemish-belgian-fascism")).toMatchObject({ status: "scored", anchorId: "flemish-belgian-fascism", placement: "canonical", canonicalParentId: "fascism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "brazilian-integralism")).toMatchObject({ status: "scored", anchorId: "brazilian-integralism", placement: "canonical", canonicalParentId: "fascism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "integral-nationalism")).toMatchObject({ status: "scored", anchorId: "integral-nationalism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "legionary-fascism")).toMatchObject({ status: "scored", anchorId: "legionary-fascism", placement: "canonical", canonicalParentId: "fascism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "civic-nationalism")).toMatchObject({ status: "scored", anchorId: "civic-nationalism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "black-nationalism")).toMatchObject({ status: "scored", anchorId: "black-nationalism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "materialist-feminism")).toMatchObject({ status: "scored", anchorId: "materialist-feminism", placement: "canonical", canonicalParentId: "socialist-marxist-feminism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "anti-colonial-nationalism")).toMatchObject({ status: "scored", anchorId: "anti-colonial-nationalism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "arab-nationalism")).toMatchObject({ status: "scored", anchorId: "arab-nationalism", placement: "canonical", canonicalParentId: "nationalism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "maoism")).toMatchObject({ status: "scored", anchorId: "maoism", placement: "canonical", canonicalParentId: "communism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "council-communism")).toMatchObject({ status: "scored", anchorId: "council-communism", placement: "canonical", canonicalParentId: "communism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "guild-socialism")).toMatchObject({ status: "scored", anchorId: "guild-socialism", placement: "canonical", canonicalParentId: "socialism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "trotskyism")).toMatchObject({ status: "scored", anchorId: "trotskyism", placement: "canonical", canonicalParentId: "communism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "marxism-leninism")).toMatchObject({ status: "scored", anchorId: "marxism-leninism", placement: "canonical", canonicalParentId: "communism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "right-libertarianism")).toMatchObject({ status: "scored", anchorId: "right-libertarianism", placement: "canonical", canonicalParentId: "libertarianism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "classical-liberal-feminism")).toMatchObject({ status: "scored", anchorId: "classical-liberal-feminism", placement: "canonical", canonicalParentId: "liberal-feminism" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "khomeinism")).toMatchObject({ status: "scored", anchorId: "khomeinism", placement: "canonical", canonicalParentId: "islamism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "qutbism")).toMatchObject({ status: "scored", anchorId: "qutbism", placement: "canonical", canonicalParentId: "islamism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "radical-republicanism")).toMatchObject({ status: "scored", anchorId: "radical-republicanism", placement: "canonical", canonicalParentId: "historical-republicanism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "marxist-feminism")).toMatchObject({ status: "scored", anchorId: "marxist-feminism", placement: "canonical", canonicalParentId: "socialist-marxist-feminism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "socialist-feminism")).toMatchObject({ status: "scored", anchorId: "socialist-feminism", placement: "canonical", canonicalParentId: "socialist-marxist-feminism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "left-wing-populism")).toMatchObject({ status: "scored", anchorId: "left-wing-populism", placement: "canonical", canonicalParentId: "populism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "right-wing-populism")).toMatchObject({ status: "scored", anchorId: "right-wing-populism", placement: "canonical", canonicalParentId: "populism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "agrarian-populism")).toMatchObject({ status: "scored", anchorId: "agrarian-populism", placement: "canonical", canonicalParentId: "populism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "bioregionalism")).toMatchObject({ status: "scored", anchorId: "bioregionalism", placement: "canonical", canonicalParentId: "ecologism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "wasatiyya")).toMatchObject({ status: "scored", anchorId: "wasatiyya", placement: "canonical", canonicalParentId: "islamism", level: "micro" });
    expect(DATASET.ideologyNodes.find((node) => node.id === "religious-zionism")).toMatchObject({ status: "scored", anchorId: "religious-zionism", placement: "canonical", canonicalParentId: "religious-nationalism", level: "micro" });
    expect(DATASET.questions.filter((question) => /^d-libertarian-\d{2}$/.test(question.id)).length).toBe(4);
    expect(DATASET.questions.filter((question) => /^n-libertarian-\d{2}$/.test(question.id)).length).toBe(4);
    expect(DATASET.questions.filter((question) => /^p-libertarian-\d{2}$/.test(question.id)).length).toBe(4);
    expect(DATASET.ideologyRegistry.find((entry) => entry.id === "conservative-new-right")).toBeDefined();
  });

  it("keeps the named project inspirations visible without making Manifesto data live scoring input", () => {
    const sourceById = new Map(DATASET.sources.map((source) => [source.id, source]));
    expect(["source-8values", "source-leftvalues", "source-politiscales", "source-ideo-directory", "source-manifesto-future"].every((id) => sourceById.has(id))).toBe(true);
    expect(sourceById.get("source-manifesto-future")?.posture).toBe("future-data");
    expect(DATASET.questions.every((question) => !question.sourceRefs.includes("source-manifesto-future"))).toBe(true);
    expect(DATASET.anchors.every((anchor) => !anchor.sourceRefs.includes("source-manifesto-future"))).toBe(true);
  });

  it("reports duplicate IDs instead of accepting ambiguous content", () => {
    const broken = { ...DATASET, questions: [...DATASET.questions, DATASET.questions[0]] };
    expect(validateDataset(broken).some((error) => error.includes("duplicate question id"))).toBe(true);
  });

  it("validates secondary registry links without treating registry entries as scored nodes", () => {
    const registry = DATASET.ideologyRegistry.find((entry) => entry.id === "civic-republicanism");
    expect(registry?.relations.some((relation) => relation.targetId === "historical-republicanism")).toBe(true);
    const broken = {
      ...DATASET,
      ideologyRegistry: DATASET.ideologyRegistry.map((entry) => entry.id === "civic-republicanism"
        ? { ...entry, relations: [...entry.relations, { type: "related-to" as const, targetId: "missing-node", note: "fixture" }] }
        : entry),
    };
    expect(validateDataset(broken).some((error) => error.includes("ideology registry entry civic-republicanism references missing relation target missing-node"))).toBe(true);
  });
});

describe("layer scoring", () => {
  it("keeps no-view separate and fails closed below the coverage threshold", () => {
    const result = calculateResults({});
    expect(result.layers.descriptive).toMatchObject({ kind: "insufficient-information", answered: 0, total: 500, coverage: 0 });
    expect(result.layers.normative).toMatchObject({ kind: "insufficient-information", answered: 0, total: 500 });
    expect(result.combined).toMatchObject({ kind: "insufficient-information", coveredLayers: [], requiredLayers: ["descriptive", "normative", "prescriptive"] });
    expect(result.pulls).toEqual([]);
  });

  it("counts mixed responses as answered while preserving the mixed count", () => {
    const minimum = minimumCoveredAnswers("descriptive");
    const result = calculateResults(answersForLayer("descriptive", 0, minimum));
    expect(result.layers.descriptive).toMatchObject({ kind: "covered", answered: minimum, total: 500, coverage: 0.5, mixed: minimum });
  });

  it("uses the exact half threshold and distinguishes it from the answer immediately below it", () => {
    const minimum = minimumCoveredAnswers("descriptive");
    expect(calculateResults(answersForLayer("descriptive", 1, minimum - 1)).layers.descriptive.kind).toBe("insufficient-information");
    expect(calculateResults(answersForLayer("descriptive", 1, minimum)).layers.descriptive.kind).toBe("covered");
  });

  it("keeps signed effects visible in the normalized facet profile", () => {
    const answers: AnswerMap = Object.fromEntries(DATASET.questions.filter((question) => question.layer === "descriptive").slice(0, minimumCoveredAnswers("descriptive")).map((question) => [question.id, 0]));
    answers["d-economy-01"] = 2;
    answers["d-economy-02"] = -2;
    const layer = calculateResults(answers).layers.descriptive;
    expect(layer.kind).toBe("covered");
    if (layer.kind === "covered") {
      expect(layer.profile["market-coordination"]).toBeLessThan(0);
      expect(layer.profile["structural-power"]).toBeGreaterThan(0);
      expect(layer.facetWeights["structural-power"]).toBeGreaterThan(0);
    }
  });

  it("produces deterministic, family-balanced interpretive neighbors", () => {
    const answers: AnswerMap = {
      ...answersForLayer("descriptive", 2),
      ...answersForLayer("normative", -1),
      ...answersForLayer("prescriptive", 1),
    };
    const first = calculateResults(answers);
    const second = calculateResults(answers);
    expect(first).toEqual(second);
    for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
      const layerResult = first.layers[layer];
      expect(layerResult.kind).toBe("covered");
      if (layerResult.kind === "covered") {
        expect(layerResult.neighbors).toHaveLength(3);
        expect(new Set(layerResult.neighbors.map((neighbor) => neighbor.family)).size).toBe(3);
      }
    }
  });

  it("withholds the combined pattern when one claim layer is missing", () => {
    const result = calculateResults({
      ...answersForLayer("descriptive", 1, minimumCoveredAnswers("descriptive")),
      ...answersForLayer("normative", -1, minimumCoveredAnswers("normative")),
    });
    expect(result.layers.descriptive.kind).toBe("covered");
    expect(result.layers.normative.kind).toBe("covered");
    expect(result.layers.prescriptive.kind).toBe("insufficient-information");
    expect(result.combined).toEqual({
      kind: "insufficient-information",
      coveredLayers: ["descriptive", "normative"],
      requiredLayers: ["descriptive", "normative", "prescriptive"],
    });
  });

  it("averages the three layer fits equally in the combined pattern", () => {
    const anchor = DATASET.anchors[0];
    const singleAnchorDataset = { ...DATASET, anchors: [anchor] };
    const result = calculateResults({
      ...answersForLayer("descriptive", 2),
      ...answersForLayer("normative", -1),
      ...answersForLayer("prescriptive", 1),
    }, singleAnchorDataset);
    expect(result.combined.kind).toBe("covered");
    if (result.combined.kind === "covered") {
      const neighbor = result.combined.neighbors[0];
      expect(neighbor).toBeDefined();
      const layerFits = ["descriptive", "normative", "prescriptive"].map((layer) => {
        const layerResult = result.layers[layer as Layer];
        expect(layerResult.kind).toBe("covered");
        return layerResult.kind === "covered" ? layerResult.neighbors[0].fit : 0;
      });
      expect(neighbor.layerFits).toEqual({ descriptive: layerFits[0], normative: layerFits[1], prescriptive: layerFits[2] });
      expect(neighbor.fit).toBeCloseTo(layerFits.reduce((sum, fit) => sum + fit, 0) / 3, 12);
    }
  });

  it("surfaces a cross-layer pull only when both relevant layers are covered", () => {
    const covered: AnswerMap = {
      ...answersForLayer("normative", 2),
      ...answersForLayer("prescriptive", 2),
    };
    for (const question of DATASET.questions.filter((candidate) => candidate.layer === "prescriptive" && (candidate.id.startsWith("p-libertarian-") || candidate.id.startsWith("p-anarcho-capitalism-") || candidate.id.startsWith("p-anarcho-primitivism-")))) {
      covered[question.id] = "no-view";
    }
    const result = calculateResults(covered);
    expect(result.pulls.some((pull) => pull.id === "autonomy-administration")).toBe(true);
    expect(result.layers.descriptive.kind).toBe("insufficient-information");
  });

  it("marks stable tie language when two editorial anchors share a profile", () => {
    const first = DATASET.anchors[0];
    const tiedDataset = {
      ...DATASET,
      anchors: [
        { ...first, id: "test-anchor-a", family: "Test A" },
        { ...first, id: "test-anchor-b", family: "Test B" },
        ...DATASET.anchors.slice(2),
      ],
    };
    const result = calculateResults(answersForLayer("descriptive", 1, minimumCoveredAnswers("descriptive")), tiedDataset);
    expect(result.layers.descriptive.kind).toBe("covered");
    if (result.layers.descriptive.kind === "covered") {
      expect(result.layers.descriptive.neighbors.some((neighbor) => neighbor.tied)).toBe(true);
      expect(result.layers.descriptive.neighbors.some((neighbor) => neighbor.separation === "low" && neighbor.fitLabel === "low separation")).toBe(true);
    }
  });

  it("carries a canonical macro-to-micro path for scored neighbors", () => {
    const minarchism = DATASET.anchors.find((anchor) => anchor.id === "minarchism");
    expect(minarchism).toBeDefined();
    const result = calculateResults(answersForLayer("descriptive", 1, minimumCoveredAnswers("descriptive")), { ...DATASET, anchors: [minarchism!] });
    const layer = result.layers.descriptive;
    expect(layer.kind).toBe("covered");
    if (layer.kind === "covered") {
      expect(layer.neighbors[0].ontologyLevel).toBe("micro");
      expect(layer.neighbors[0].taxonomyPath.map((node) => node.label)).toEqual(["Liberalism", "Libertarianism", "Minarchism"]);
    }
  });

  it("can surface Right-Libertarianism from its dedicated branch-sensitive item block", () => {
    const rightAnchor = DATASET.anchors.find((anchor) => anchor.id === "right-libertarianism");
    expect(rightAnchor).toBeDefined();
    if (!rightAnchor) return;
    const answers: AnswerMap = answersTowardAnchor(rightAnchor);

    const result = calculateResults(answers);
    for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
      const layerResult = result.layers[layer];
      expect(layerResult.kind).toBe("covered");
      if (layerResult.kind === "covered") {
        const rightNeighbor = layerResult.neighbors.find((neighbor) => neighbor.anchorId === "right-libertarianism");
        expect(rightNeighbor).toBeDefined();
        expect(rightNeighbor?.taxonomyPath.map((node) => node.label)).toEqual(["Liberalism", "Libertarianism", "Right-Libertarianism"]);
      }
    }
  });

  it("routes every newly activated direct branch through all three covered layers", () => {
    const directBranches = [
      ["classical-liberalism", "classical-liberalism"],
      ["social-liberalism", "social-liberalism"],
      ["moderate-conservatism", "traditional-conservatism"],
      ["social-democracy", "social-democracy"],
      ["democratic-socialism", "democratic-socialism"],
      ["minarchism", "minarchism"],
      ["ecosocialism", "eco-socialism"],
      ["left-libertarianism", "left-libertarianism"],
      ["libertarian-socialism", "libertarian-socialism"],
      ["national-conservatism", "national-conservatism"],
      ["libertarianism", "libertarianism"],
      ["marxism", "marxism"],
      ["social-anarchism", "social-anarchism"],
      ["liberal-feminism", "liberal-feminism"],
      ["christian-democracy", "christian-democracy"],
      ["contemporary-neo-republicanism", "contemporary-neo-republicanism"],
      ["black-feminism", "black-feminism"],
      ["ecofeminism", "ecofeminism"],
      ["green-anarchism", "green-anarchism"],
      ["anarcha-feminism", "anarcha-feminism"],
      ["liberal-nationalism", "liberal-nationalism"],
      ["radical-feminism", "radical-feminism"],
      ["communism", "communism"],
      ["historical-republicanism", "historical-republicanism"],
      ["radical-republicanism", "radical-republicanism"],
      ["individualist-anarchism", "individualist-anarchism"],
      ["neoliberalism", "neoliberalism"],
      ["socialist-marxist-feminism", "socialist-marxist-feminism"],
      ["socialist-feminism", "socialist-feminism"],
      ["left-wing-populism", "left-wing-populism"],
      ["right-wing-populism", "right-wing-populism"],
      ["neoconservatism", "neoconservatism"],
      ["paleoconservatism", "paleoconservatism"],
      ["populism", "populism"],
      ["mutualism", "mutualism"],
      ["radical-conservatism", "radical-conservatism"],
      ["reactionary-conservatism", "reactionary-conservatism"],
      ["conservatism", "conservatism-family"],
      ["ecologism", "ecologism-family"],
      ["liberalism", "liberalism-family"],
      ["socialism", "socialism-family"],
      ["nationalism", "nationalism-family"],
      ["republicanism", "republicanism-family"],
      ["feminism", "feminism-family"],
      ["islamism", "islamism"],
      ["wasatiyya", "wasatiyya"],
      ["ordoliberalism", "ordoliberalism"],
      ["pan-africanism", "pan-africanism"],
      ["religious-nationalism", "religious-nationalism"],
      ["religious-zionism", "religious-zionism"],
      ["fascism", "fascism"],
      ["neo-fascism", "neo-fascism"],
      ["falangism", "falangism"],
      ["brazilian-integralism", "brazilian-integralism"],
      ["conservative-nationalism", "conservative-nationalism"],
      ["black-nationalism", "black-nationalism"],
      ["materialist-feminism", "materialist-feminism"],
      ["anti-colonial-nationalism", "anti-colonial-nationalism"],
      ["arab-nationalism", "arab-nationalism"],
      ["ethnocultural-nationalism", "ethnocultural-nationalism"],
      ["lesbian-feminism", "lesbian-feminism"],
      ["maoism", "maoism"],
      ["council-communism", "council-communism"],
      ["guild-socialism", "guild-socialism"],
      ["marxism-leninism", "marxism-leninism"],
      ["autonomist-marxism", "autonomist-marxism"],
      ["anarcho-pacifism", "anarcho-pacifism"],
      ["social-ecology", "social-ecology"],
      ["womanism", "womanism"],
      ["classical-liberal-feminism", "classical-liberal-feminism"],
      ["anarcho-communism", "anarcho-communism"],
      ["anarcho-syndicalism", "anarcho-syndicalism"],
      ["anarcho-capitalism", "anarcho-capitalism"],
      ["collectivist-anarchism", "collectivist-anarchism"],
      ["anarchism", "anarchism-family"],
      ["trotskyism", "trotskyism"],
      ["integral-nationalism", "integral-nationalism"],
      ["legionary-fascism", "legionary-fascism"],
      ["white-nationalism", "white-nationalism"],
      ["neo-nazism", "neo-nazism"],
      ["revolutionary-islamism", "revolutionary-islamism"],
    ];

    for (const [targetId, anchorId] of directBranches) {
      const anchor = DATASET.anchors.find((candidate) => candidate.id === anchorId);
      const targetQuestions = DATASET.questions.filter((question) => question.targetNodeIds?.includes(targetId));
      expect(anchor).toBeDefined();
      expect(targetQuestions).toHaveLength(12);
      expect(new Set(targetQuestions.map((question) => question.layer))).toEqual(new Set(["descriptive", "normative", "prescriptive"]));

      const result = calculateResults(answersTowardAnchor(anchor!), { ...DATASET, anchors: [anchor!] });
      for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
        const layerResult = result.layers[layer];
        expect(layerResult.kind).toBe("covered");
        if (layerResult.kind === "covered") {
          expect(layerResult.answered).toBe(DATASET.manifest.questionsPerLayer[layer]);
          expect(layerResult.neighbors[0]?.anchorId).toBe(anchorId);
        }
      }
      expect(result.combined.kind).toBe("covered");
    }
  });

  it("routes every production anchor through all three layers in a structural reachability fixture", () => {
    for (const anchor of scoringAnchorsFor(DATASET)) {
      const result = calculateResults(answersTowardAnchor(anchor), { ...DATASET, anchors: [anchor] });
      for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
        const layerResult = result.layers[layer];
        expect(layerResult.kind).toBe("covered");
        if (layerResult.kind === "covered") {
          expect(layerResult.answered).toBe(DATASET.manifest.questionsPerLayer[layer]);
          expect(layerResult.neighbors[0]?.anchorId).toBe(anchor.id);
          expect(layerResult.neighbors[0]?.taxonomyPath.at(-1)?.id).toBe(anchor.ontologyNodeId);
        }
      }
      expect(result.combined.kind).toBe("covered");
      if (result.combined.kind === "covered") {
        expect(result.combined.coveredLayers).toEqual(["descriptive", "normative", "prescriptive"]);
        expect(result.combined.neighbors[0]?.anchorId).toBe(anchor.id);
        expect(Object.keys(result.combined.neighbors[0]?.layerFits ?? {})).toEqual(["descriptive", "normative", "prescriptive"]);
      }
    }
  });

  it("keeps contextual bridge anchors inspectable without including them in production scoring", () => {
    expect(DATASET.anchors).toHaveLength(124);
    expect(scoringAnchorsFor(DATASET)).toHaveLength(119);
    expect(scoringAnchorsFor(DATASET).map((anchor) => anchor.id)).toEqual(expect.arrayContaining(["anarchism-family", "feminism-family", "liberalism-family", "nationalism-family", "republicanism-family", "socialism-family"]));
    expect(scoringAnchorsFor(DATASET).map((anchor) => anchor.id)).not.toEqual(expect.arrayContaining([
      "anarchism",
      "green-communitarianism",
      "green-politics",
      "liberal-conservatism",
      "market-socialism",
    ]));

    const result = calculateResults({
      ...answersForLayer("descriptive", 2),
      ...answersForLayer("normative", 2),
      ...answersForLayer("prescriptive", 2),
    });
    const allNeighbors = [
      ...Object.values(result.layers).flatMap((layer) => layer.kind === "covered" ? layer.neighbors : []),
      ...(result.combined.kind === "covered" ? result.combined.neighbors : []),
    ];
    expect(allNeighbors.map((neighbor) => neighbor.anchorId)).not.toEqual(expect.arrayContaining([
      "anarchism",
      "green-communitarianism",
      "green-politics",
      "liberal-conservatism",
      "market-socialism",
    ]));
  });

  it("keeps hybrid ideology relations separate from canonical parentage", () => {
    const ecoSocialism = DATASET.ideologyNodes.find((node) => node.id === "ecosocialism");
    expect(ecoSocialism?.canonicalParentId).toBeUndefined();
    expect(ecoSocialism?.relations).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: "hybrid-of", targetId: "socialism" }),
      expect.objectContaining({ type: "hybrid-of", targetId: "ecologism" }),
    ]));
  });
});
