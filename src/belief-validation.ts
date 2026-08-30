import type { BeliefValidationGate, Dataset } from "./types";

/**
 * Objective-level evidence ledger. The first four rows are repository-local
 * structural claims. The remaining rows deliberately stay open until the
 * corresponding human, respondent, or comparison study produces an evidence
 * record; source citations alone cannot change their status.
 */
export const BELIEF_VALIDATION_GATES: readonly BeliefValidationGate[] = [
  {
    id: "source-backed-model-rationale",
    label: "Source-backed construct and configuration rationale",
    status: "PASS",
    scope: "local-structural",
    requiredForCompletion: true,
    boundary: "Source references and provenance are present for the model registry and canonical configuration projections; this does not validate respondent interpretation.",
    sourceRefs: ["source-freeden-morphology", "source-adcock-collier", "source-aera-testing-standards"],
  },
  {
    id: "production-item-audit",
    label: "Production item audit",
    status: "PASS",
    scope: "local-structural",
    requiredForCompletion: true,
    boundary: "Every production question is mechanically classified and bridged to the construct registry; dispositions remain a human review queue.",
    sourceRefs: ["source-aapor", "source-aera-testing-standards"],
  },
  {
    id: "direct-relational-isolation",
    label: "Direct and relational effect isolation",
    status: "PASS",
    scope: "local-structural",
    requiredForCompletion: true,
    boundary: "Optional categorical and relational records are retained and traceable without changing legacy affinity calculations; this does not validate their interpretation.",
    sourceRefs: ["source-aapor", "source-borsboom-validity"],
  },
  {
    id: "adversarial-synthetic-suite",
    label: "Adversarial synthetic profile suite",
    status: "PASS",
    scope: "local-structural",
    requiredForCompletion: true,
    boundary: "Source-attributed configuration round trips, weak and mixed profiles, explicit response-state separation, relationship visibility, and affinity isolation pass deterministic fixtures; synthetic output is not respondent evidence.",
    sourceRefs: ["source-freeden-morphology", "source-aera-testing-standards"],
  },
  {
    id: "cognitive-response-process",
    label: "Cognitive and response-process review",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "No participant study has established comprehension, retrieval, judgment, response selection, option interpretation, or missingness interpretation for the production and pilot items.",
    sourceRefs: ["source-aera-testing-standards", "source-aapor"],
  },
  {
    id: "expert-content-adjudication",
    label: "Independent expert content adjudication",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "No independent reviewer and adjudicator record has resolved the item-audit queue, construct boundaries, conception distinctions, or canonical configuration decisions for the intended use.",
    sourceRefs: ["source-aera-testing-standards", "source-adcock-collier"],
  },
  {
    id: "empirical-reliability-validity",
    label: "Empirical reliability and validity",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "No respondent dataset or predeclared construct-appropriate analysis has tested reliability, internal structure, external relations, categorical interpretation, or relational coding.",
    sourceRefs: ["source-morucci-irt", "source-borsboom-validity", "source-adcock-collier"],
  },
  {
    id: "invariance-dif-cross-context",
    label: "Invariance, DIF, and cross-context comparison",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "No intended language, jurisdiction, period, or comparison-group sample has been analyzed for invariance, DIF, translation, institutional-context, or contextual comparability.",
    sourceRefs: ["source-bauer-invariance", "source-aapor-comparative-quality"],
  },
  {
    id: "population-consequence-review",
    label: "Population coverage and consequence review",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "No intended-population, burden, privacy, false-precision, label-effect, exclusion, or use-consequence review has been completed.",
    sourceRefs: ["source-aera-testing-standards", "source-aapor-comparative-quality"],
  },
  {
    id: "held-out-respondent-morphology",
    label: "Held-out respondent evidence for morphology mapping",
    status: "NOT RUN",
    scope: "external-study",
    requiredForCompletion: true,
    boundary: "The configuration-to-morphology projection has no held-out respondent evidence showing that the mapping reflects the intended interpretive use beyond deterministic fixtures.",
    sourceRefs: ["source-freeden-morphology", "source-aera-testing-standards", "source-borsboom-validity"],
  },
] as const;

export const openBeliefValidationGates = (): readonly BeliefValidationGate[] =>
  BELIEF_VALIDATION_GATES.filter((gate) => gate.requiredForCompletion && gate.status !== "PASS");

export const beliefCompletionEligible = (): boolean => openBeliefValidationGates().length === 0;

export const validateBeliefValidationLedger = (dataset: Dataset): readonly string[] => {
  const errors: string[] = [];
  const gateIds = new Set<string>();
  const sourceIds = new Set(dataset.sources.map((source) => source.id));
  for (const gate of BELIEF_VALIDATION_GATES) {
    if (gateIds.has(gate.id)) errors.push(`duplicate belief validation gate id ${gate.id}`);
    gateIds.add(gate.id);
    if (!gate.label.trim()) errors.push(`belief validation gate ${gate.id} is missing a label`);
    if (!gate.boundary.trim()) errors.push(`belief validation gate ${gate.id} is missing a boundary`);
    if (gate.sourceRefs.length === 0) errors.push(`belief validation gate ${gate.id} has no source references`);
    for (const sourceRef of gate.sourceRefs) {
      if (!sourceIds.has(sourceRef)) errors.push(`belief validation gate ${gate.id} references missing source ${sourceRef}`);
    }
  }
  return errors;
};
