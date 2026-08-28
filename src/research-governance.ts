import { DATASET } from "./data";
import { buildResearchTargets } from "./research";
import type {
  Dataset,
  IdeologyNodePlacement,
  ResearchTaxonomyDecision,
  ResearchTaxonomyDisposition,
  ResearchTaxonomyEvidenceStatus,
  ResearchTarget,
} from "./types";

export const researchTaxonomyDispositionLabels: Readonly<Record<ResearchTaxonomyDisposition, string>> = {
  "promote-to-canonical": "promote to canonical ontology",
  "retain-canonical": "retain in canonical ontology",
  "demote-to-contextual": "demote to contextual registry",
  "demote-to-associated": "demote to associated registry",
  "retain-contextual": "retain as contextual registry context",
  "retain-registry-only": "retain as registry-only context",
  "hold-catalog-only": "hold as catalog-only pending evidence",
};

const decision = (
  id: string,
  targetId: string,
  disposition: ResearchTaxonomyDisposition,
  evidenceStatus: ResearchTaxonomyEvidenceStatus,
  sourceIds: readonly string[],
  rationale: string,
  boundary: string,
  competingInterpretations: readonly string[],
  resultingPlacement: IdeologyNodePlacement | "registry-only",
  resultingScoringStatus: ResearchTaxonomyDecision["resultingScoringStatus"],
): ResearchTaxonomyDecision => ({
  id,
  targetId,
  disposition,
  evidenceStatus,
  sourceIds,
  rationale,
  boundary,
  competingInterpretations,
  resultingPlacement,
  resultingScoringStatus,
  decidedAt: "2026-08-26",
  reviewStatus: "research_decision",
});

/**
 * Explicit decisions that change or clarify ontology placement. These are
 * research decisions, not respondent classifications and not scoring rules.
 */
const EXPLICIT_TAXONOMY_DECISIONS: readonly ResearchTaxonomyDecision[] = [
  decision(
    "taxonomy-khomeinism-promote",
    "khomeinism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-ucp-khomeinism", "source-cambridge-islamism"],
    "Scholarship treats Khomeinism as a historically specific Islamist political formation with a distinct relationship among clerical guardianship, anti-imperial independence, mass grievance, and revolutionary state formation.",
    "This promotion establishes a canonical catalog target only. It does not create a production anchor, a score, or a claim that Khomeinism represents Islamism as a whole.",
    ["Khomeinism may be treated as a manifestation or variant of Islamism rather than a separate canonical node.", "Its internal historical and theological variation remains contested."],
    "canonical",
    "catalog-only",
  ),
  decision(
    "taxonomy-qutbism-promote",
    "qutbism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-qutb-march", "source-cambridge-qutb-vahdat", "source-cambridge-islamism"],
    "Political-theory scholarship reconstructs Qutb's concepts of divine sovereignty, jahiliyya, comprehensive moral order, and disciplined transformation as a distinct intellectual current within modern Islamism.",
    "This promotion establishes a canonical catalog target only. It does not equate Qutbism with every Islamist or militant current and does not create a production anchor.",
    ["Qutbism may be retained as a historical school or variant within Islamism rather than a canonical node.", "Later movements appropriated Qutb selectively and cannot be treated as identical to his theory."],
    "canonical",
    "catalog-only",
  ),
  decision(
    "taxonomy-deep-ecology-associated",
    "deep-ecology",
    "demote-to-associated",
    "source-backed-contested",
    ["source-sep-environmental-ethics", "source-cambridge-ecologism"],
    "Environmental-ethics scholarship treats Deep Ecology primarily as a philosophical platform or associated ecological tradition that can support multiple political programmes.",
    "Keep it queryable and researchable, but do not force it into the political-ideology hierarchy or infer a political identity from ecological philosophy alone.",
    ["Some ecological movements treat Deep Ecology as a political ideology.", "Its philosophical commitments have multiple political translations."],
    "registry-only",
    "not-scored",
  ),
  decision(
    "taxonomy-bioregionalism-associated",
    "bioregionalism",
    "demote-to-associated",
    "source-backed-contested",
    ["source-sep-environmental-ethics", "source-cambridge-ecologism"],
    "Bioregionalism has mixed planning, cultural, territorial, and ecological uses; the current source base does not justify treating every use as an independent political-ideology node.",
    "Retain the doctrine as associated ecological context and require an explicit political programme before any canonical promotion.",
    ["Some bioregional projects have strong political and institutional content.", "Place-based meanings vary across jurisdictions and movements."],
    "registry-only",
    "not-scored",
  ),
];

const targetById = (dataset: Dataset): ReadonlyMap<string, ResearchTarget> =>
  new Map(buildResearchTargets(dataset).map((target) => [target.id, target]));

const defaultDecisionFor = (target: ResearchTarget): ResearchTaxonomyDecision => {
  if (target.targetKind === "registry-entry") {
    return decision(
      `taxonomy-${target.id}-retain-registry`,
      target.id,
      "retain-registry-only",
      "source-backed-contested",
      target.sourceRefs,
      "The entry is retained as source-backed context because its current registry kind captures historical, associated, or host-dependent meaning without asserting a canonical political-ideology node.",
      "Registry retention does not create ancestry, a scored neighbor, or a respondent-facing identity label.",
      ["Future source review may support a different placement or a bounded canonical node."],
      "registry-only",
      "not-scored",
    );
  }

  if (target.placement === "contextual") {
    return decision(
      `taxonomy-${target.id}-retain-contextual`,
      target.id,
      "retain-contextual",
      "source-backed-contested",
      target.sourceRefs,
      "The node is a broad or bridge anchor with source-backed relevance but insufficient basis for exclusive canonical ancestry.",
      "Contextual placement keeps the bridge visible without creating a canonical political-ideology branch or a production score.",
      ["A future source and boundary review could justify canonical promotion."],
      "contextual",
      "not-scored",
    );
  }

  if (target.measurementStatus === "catalog-only") {
    return decision(
      `taxonomy-${target.id}-hold-catalog`,
      target.id,
      "hold-catalog-only",
      "insufficient-source-boundary",
      target.sourceRefs,
      "The label is retained in the canonical catalog because the current ontology records it, but the present evidence and item coverage do not justify a production anchor or a promotion claim.",
      "Catalog presence is not a respondent classification and does not imply that the branch is empirically separable.",
      ["The branch may later receive a source-backed candidate block, remain catalog-only, or be demoted if boundary review finds it too broad or historically dependent."],
      "canonical",
      "catalog-only",
    );
  }

  return decision(
    `taxonomy-${target.id}-retain-canonical`,
    target.id,
    "retain-canonical",
    "source-backed-contested",
    target.sourceRefs,
    "The node remains in the canonical graph because its current source-backed placement is useful for taxonomy and measurement review.",
    "Retention does not validate the local anchor or imply that a respondent belongs to the ideology; production measurement remains separately gated.",
    ["Dedicated wording, cross-context review, and empirical evidence may later support promotion, demotion, or anchor revision."],
    "canonical",
    target.anchorId ? "scored-provisional" : "catalog-only",
  );
};

export const RESEARCH_TAXONOMY_DECISIONS: readonly ResearchTaxonomyDecision[] = (() => {
  const explicitByTarget = new Map(EXPLICIT_TAXONOMY_DECISIONS.map((item) => [item.targetId, item]));
  return buildResearchTargets(DATASET).map((target) => explicitByTarget.get(target.id) ?? defaultDecisionFor(target));
})();

export const researchTaxonomyDecisionForTarget = (targetId: string, dataset: Dataset = DATASET): ResearchTaxonomyDecision | undefined => {
  if (dataset === DATASET) return RESEARCH_TAXONOMY_DECISIONS.find((item) => item.targetId === targetId);
  const target = targetById(dataset).get(targetId);
  return target ? defaultDecisionFor(target) : undefined;
};

export const validateResearchTaxonomyDecisions = (dataset: Dataset = DATASET): readonly string[] => {
  const errors: string[] = [];
  const targets = targetById(dataset);
  const sources = new Map(dataset.sources.map((source) => [source.id, source]));
  const decisions = dataset === DATASET ? RESEARCH_TAXONOMY_DECISIONS : buildResearchTargets(dataset).map(defaultDecisionFor);

  if (new Set(decisions.map((item) => item.id)).size !== decisions.length) errors.push("taxonomy decision IDs must be unique");
  if (new Set(decisions.map((item) => item.targetId)).size !== decisions.length) errors.push("taxonomy decisions must have one decision per target");

  for (const target of targets.values()) {
    if (!decisions.some((item) => item.targetId === target.id)) errors.push(`missing taxonomy decision for ${target.id}`);
  }

  for (const item of decisions) {
    const target = targets.get(item.targetId);
    if (!target) {
      errors.push(`taxonomy decision ${item.id} references missing target ${item.targetId}`);
      continue;
    }
    if (item.sourceIds.length === 0) errors.push(`taxonomy decision ${item.id} needs source evidence`);
    if (item.sourceIds.some((sourceId) => sources.get(sourceId)?.role !== "ideology-research")) errors.push(`taxonomy decision ${item.id} needs only ideology-research sources`);
    if (!item.rationale.trim() || !item.boundary.trim()) errors.push(`taxonomy decision ${item.id} needs rationale and boundary text`);
    if (item.reviewStatus !== "research_decision") errors.push(`taxonomy decision ${item.id} has an invalid review status`);
    if (item.disposition === "promote-to-canonical" && (target.targetKind !== "ideology-node" || item.resultingPlacement !== "canonical")) errors.push(`taxonomy decision ${item.id} promotes a non-node or non-canonical result`);
    if (item.disposition === "demote-to-associated" && item.resultingPlacement !== "registry-only") errors.push(`taxonomy decision ${item.id} must result in registry-only placement`);
    if (item.disposition === "hold-catalog-only" && (target.targetKind !== "ideology-node" || item.resultingPlacement !== "canonical" || item.resultingScoringStatus !== "catalog-only")) errors.push(`taxonomy decision ${item.id} must hold a canonical node as catalog-only`);
    if (item.evidenceStatus === "insufficient-source-boundary" && item.resultingScoringStatus === "scored-provisional") errors.push(`taxonomy decision ${item.id} cannot mark insufficient evidence as scored-provisional`);
  }

  return errors;
};
