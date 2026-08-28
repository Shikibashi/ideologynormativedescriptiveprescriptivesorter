import { DATASET } from "../src/data";
import {
  buildResearchTargets,
  curatedResearchCandidates,
  researchAnchorProfiles,
  researchFalsePositiveAudits,
  researchNeighborDiscriminants,
  validateCuratedResearchBank,
  validateCuratedResearchMetadata,
} from "../src/research";
import { scoringAnchorsFor } from "../src/scoring";
import type { Layer } from "../src/types";

const layers: readonly Layer[] = ["descriptive", "normative", "prescriptive"];
const targets = buildResearchTargets(DATASET);
const candidateCounts = new Map<string, Record<Layer, number>>();

for (const candidate of curatedResearchCandidates) {
  const counts = candidateCounts.get(candidate.targetId) ?? { descriptive: 0, normative: 0, prescriptive: 0 };
  counts[candidate.layer] += 1;
  candidateCounts.set(candidate.targetId, counts);
}

const targetRows = targets.map((target) => ({
  id: target.id,
  label: target.label,
  kind: target.targetKind,
  level: target.level ?? null,
  placement: target.placement ?? null,
  measurementStatus: target.measurementStatus,
  directQuestions: target.dedicatedQuestionIds.length,
  directQuestionCounts: target.questionCounts,
  curatedCandidateCounts: candidateCounts.get(target.id) ?? { descriptive: 0, normative: 0, prescriptive: 0 },
  hasAnchorProfile: researchAnchorProfiles.some((profile) => profile.targetId === target.id),
  neighborDiscriminantCount: researchNeighborDiscriminants.filter((item) => item.targetId === target.id).length,
  falsePositiveAudit: researchFalsePositiveAudits.some((item) => item.targetId === target.id),
  sourceRefs: target.sourceRefs,
}));

const countBy = (values: readonly string[]): Record<string, number> =>
  values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});

const report = {
  generatedAt: new Date().toISOString(),
  production: {
    questions: DATASET.questions.length,
    anchors: scoringAnchorsFor(DATASET).length,
    editorialAnchors: DATASET.anchors.length,
    questionCountsByLayer: Object.fromEntries(layers.map((layer) => [layer, DATASET.questions.filter((question) => question.layer === layer).length])),
  },
  ontology: {
    nodes: DATASET.ideologyNodes.length,
    registryEntries: DATASET.ideologyRegistry.length,
    nodeLevels: countBy(DATASET.ideologyNodes.map((node) => node.level)),
    nodePlacements: countBy(DATASET.ideologyNodes.map((node) => node.placement)),
    nodeStatuses: countBy(DATASET.ideologyNodes.map((node) => node.status)),
    targetMeasurementStatuses: countBy(targetRows.map((target) => target.measurementStatus)),
  },
  researchBank: {
    candidates: curatedResearchCandidates.length,
    targets: new Set(curatedResearchCandidates.map((candidate) => candidate.targetId)).size,
    targetRowsWithProfiles: targetRows.filter((target) => target.hasAnchorProfile).length,
    targetRowsWithFalsePositiveAudits: targetRows.filter((target) => target.falsePositiveAudit).length,
    validationErrors: [...validateCuratedResearchBank(DATASET), ...validateCuratedResearchMetadata(DATASET)],
  },
  targets: targetRows,
};

process.stdout.write(JSON.stringify(report, null, 2) + "\n");
