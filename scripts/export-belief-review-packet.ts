import { BELIEF_DIRECT_ITEMS } from "../src/belief-direct-items";
import { BELIEF_GAP_CANDIDATES } from "../src/belief-gap-candidates";
import { BELIEF_RELATIONAL_FOLLOWUPS } from "../src/belief-followups";
import {
  BELIEF_CONSTRUCT_DEFINITIONS,
  BELIEF_MODEL_ID,
  BELIEF_MODEL_PROVENANCE,
  BELIEF_MODEL_VERSION,
  auditBeliefMeasurement,
  researchCandidateCoverageFor,
  validateBeliefModel,
} from "../src/beliefs";
import { BELIEF_VALIDATION_GATES, validateBeliefValidationLedger } from "../src/belief-validation";
import { answerOptions, DATASET } from "../src/data";
import {
  BELIEF_REVIEW_ALLOWED_DISPOSITIONS,
  BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS,
  BELIEF_REVIEW_PACKET_VERSION,
  BELIEF_REVIEW_REQUIRED_FIELDS,
} from "../src/belief-review";
import { MORPHOLOGY_MODEL_ID, MORPHOLOGY_MODEL_VERSION } from "../src/morphology";
import type { BeliefMeasurementAudit } from "../src/types";

const generatedAt = new Date().toISOString();

const EXTERNAL_GATE_IDS = BELIEF_VALIDATION_GATES
  .filter((gate) => gate.scope === "external-study" && gate.requiredForCompletion)
  .map((gate) => gate.id);

const productionAudits = auditBeliefMeasurement(DATASET);
const researchCandidateCoverage = researchCandidateCoverageFor(DATASET);
const questionById = new Map(DATASET.questions.map((question) => [question.id, question]));
const reviewItemIdFor = (index: number): string => `production-${String(index + 1).padStart(4, "0")}`;

const productionResponseScale = answerOptions.map((option) => ({
  value: option.value,
  label: option.label,
  hint: option.hint,
}));

/**
 * The blind view deliberately omits question ids, source refs, effects,
 * construct bridges, target metadata, flags, disposition, and audit rationale.
 * Question ids in this project can contain ideology labels, so the stable
 * review item id is the only identifier exposed in the first pass.
 */
const blindFirstPassItemFor = (audit: BeliefMeasurementAudit, index: number) => ({
  reviewItemId: reviewItemIdFor(index),
  kind: "production-question" as const,
  layer: audit.layer,
  domain: audit.domain,
  prompt: audit.prompt,
  ...(audit.context ? { context: audit.context } : {}),
});

const productionAdjudicationItemFor = (audit: BeliefMeasurementAudit, index: number) => {
  const question = questionById.get(audit.questionId);
  return {
    reviewItemId: reviewItemIdFor(index),
    ...audit,
    questionVersion: question?.version,
    sourceType: question?.sourceType,
    responseScale: productionResponseScale,
  };
};

const reviewQueueIndex = [
  ...productionAudits.map((audit, index) => ({
    reviewItemId: reviewItemIdFor(index),
    queue: "production-question" as const,
    itemId: audit.questionId,
    layer: audit.layer,
  })),
  ...BELIEF_GAP_CANDIDATES.map((candidate) => ({
    reviewItemId: `gap-${candidate.id}`,
    queue: "gap-candidate" as const,
    itemId: candidate.id,
    layer: candidate.layer,
  })),
  ...BELIEF_DIRECT_ITEMS.map((item) => ({
    reviewItemId: `direct-${item.id}`,
    queue: "direct-categorical" as const,
    itemId: item.id,
    layer: item.layer,
  })),
  ...BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => ({
    reviewItemId: `relational-${followUp.id}`,
    queue: "relational-follow-up" as const,
    itemId: followUp.id,
    layer: followUp.layer,
  })),
];

const packetContractErrors = (): readonly string[] => {
  const errors: string[] = [];
  const reviewItemIds = new Set<string>();
  const auditQuestionIds = new Set<string>();
  const productionQuestionIds = new Set(DATASET.questions.map((question) => question.id));

  if (productionAudits.length !== DATASET.questions.length) {
    errors.push(`review packet audit count ${productionAudits.length} does not match production question count ${DATASET.questions.length}`);
  }
  for (const [index, audit] of productionAudits.entries()) {
    const reviewItemId = reviewItemIdFor(index);
    if (reviewItemIds.has(reviewItemId)) errors.push(`duplicate review item id ${reviewItemId}`);
    reviewItemIds.add(reviewItemId);
    if (auditQuestionIds.has(audit.questionId)) errors.push(`duplicate production audit question id ${audit.questionId}`);
    auditQuestionIds.add(audit.questionId);
    if (!productionQuestionIds.has(audit.questionId)) errors.push(`review packet audit references missing production question ${audit.questionId}`);
    if (!questionById.has(audit.questionId)) errors.push(`review packet cannot resolve question metadata for ${audit.questionId}`);
  }

  const queueIds = [
    ...BELIEF_GAP_CANDIDATES.map((candidate) => candidate.id),
    ...BELIEF_DIRECT_ITEMS.map((item) => item.id),
    ...BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => followUp.id),
  ];
  for (const queueId of queueIds) {
    if (productionQuestionIds.has(queueId)) errors.push(`research queue item overlaps production question ${queueId}`);
  }
  if (new Set(queueIds).size !== queueIds.length) errors.push("research review queues contain duplicate ids");
  if (BELIEF_REVIEW_REQUIRED_FIELDS.some((field) => !field.id.trim() || !field.label.trim() || !field.description.trim())) {
    errors.push("review packet has an incomplete required review field");
  }
  if (EXTERNAL_GATE_IDS.length === 0) errors.push("review packet has no required external validation gates");
  return errors;
};

const validationErrors = [
  ...validateBeliefModel(DATASET),
  ...validateBeliefValidationLedger(DATASET),
  ...packetContractErrors(),
];

const productionItemAudits = productionAudits.map(productionAdjudicationItemFor);
const openDispositionItems = productionItemAudits.filter((item) => item.disposition !== "preserve");
const externalGateStatus = Object.fromEntries(EXTERNAL_GATE_IDS.map((gateId) => {
  const gate = BELIEF_VALIDATION_GATES.find((candidate) => candidate.id === gateId);
  return [gateId, gate?.status ?? "NOT RUN"];
}));

const packet = {
  packet: {
    packetVersion: BELIEF_REVIEW_PACKET_VERSION,
    generatedAt,
    purpose: "Study-ready instrument-development packet for independent content review, response-process study, and later evidence-ledger work.",
    interpretationBoundary: "This packet is a reproducible review instrument and source snapshot. It is not respondent evidence, psychometric validation, population validation, or an ideological classification result.",
  },
  snapshot: {
    datasetId: DATASET.manifest.datasetId,
    contentVersion: DATASET.manifest.contentVersion,
    scoringPolicyVersion: DATASET.manifest.scoringPolicyVersion,
    beliefModel: {
      id: BELIEF_MODEL_ID,
      version: BELIEF_MODEL_VERSION,
      provenance: BELIEF_MODEL_PROVENANCE,
    },
    morphologyModel: {
      id: MORPHOLOGY_MODEL_ID,
      version: MORPHOLOGY_MODEL_VERSION,
    },
    questionIds: DATASET.questions.map((question) => question.id),
    questionCount: DATASET.questions.length,
    questionCountsByLayer: Object.fromEntries(["descriptive", "normative", "prescriptive"].map((layer) => [
      layer,
      DATASET.questions.filter((question) => question.layer === layer).length,
    ])),
    measurementCoverage: {
      constructLayer: researchCandidateCoverage,
    },
    fixedOntology: {
      nodeCount: DATASET.ideologyNodes.length,
      nodes: DATASET.ideologyNodes.map((node) => ({
        id: node.id,
        label: node.label,
        level: node.level,
        placement: node.placement,
        status: node.status,
      })),
    },
  },
  reviewDesign: {
    defaultMinimumIndependentReviewers: 2,
    namedAdjudicatorRequired: true,
    blindFirstPass: {
      recommended: true,
      rationale: "Judge the respondent-facing claim before exposure to the intended construct, ideology branch, source rationale, or legacy effect.",
      omittedFromBlindItems: [
        "questionId",
        "sourceRefs",
        "legacyEffects",
        "facetIds",
        "constructIds",
        "editorialTargetNodeIds",
        "flags",
        "disposition",
        "rationale",
        "ideology labels and branch metadata",
      ],
    },
    requiredRecordFields: BELIEF_REVIEW_REQUIRED_FIELDS,
    allowedDispositions: BELIEF_REVIEW_ALLOWED_DISPOSITIONS,
    reviewerRecordSchema: {
      reviewItemId: "stable packet review id",
      reviewerId: "independent reviewer identifier",
      reviewerRole: "reviewer or adjudicator",
      packetVersion: "packet.packetVersion",
      contentVersion: "snapshot.contentVersion",
      modelVersion: "snapshot.beliefModel.version and snapshot.morphologyModel.version",
      fieldResponses: "object keyed by reviewDesign.requiredRecordFields[].id",
      disagreement: "written disagreement or none recorded",
      adjudication: "named adjudicator decision and rationale, or pending",
      disposition: "one of reviewDesign.allowedDispositions",
      decisionRationale: "written rationale for the disposition",
      reviewedAt: "ISO timestamp",
    },
  },
  reviewQueueIndex,
  reviewRecords: [],
  productionReview: {
    responseScale: productionResponseScale,
    blindFirstPassItems: productionAudits.map(blindFirstPassItemFor),
    productionItemAudits,
    openDispositionItems,
    openDispositionQuestionIds: openDispositionItems.map((item) => item.questionId),
  },
  researchQueues: {
    gapCandidates: BELIEF_GAP_CANDIDATES,
    directCategoricalItems: BELIEF_DIRECT_ITEMS,
    relationalFollowUps: BELIEF_RELATIONAL_FOLLOWUPS,
    counts: {
      gapCandidates: BELIEF_GAP_CANDIDATES.length,
      directCategoricalItems: BELIEF_DIRECT_ITEMS.length,
      relationalFollowUps: BELIEF_RELATIONAL_FOLLOWUPS.length,
    },
  },
  registries: {
    constructs: BELIEF_CONSTRUCT_DEFINITIONS,
    sources: DATASET.sources,
  },
  validation: {
    localContractErrors: validationErrors,
    localContractErrorCount: validationErrors.length,
    gateSnapshot: BELIEF_VALIDATION_GATES,
    externalGateStatus,
  },
  evidenceLedger: {
    records: [],
    requiredFields: BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS,
    interpretation: "No external review, respondent, coding, comparison, or consequence records are included in this export.",
  },
  promotion: {
    eligibleForPromotion: false,
    packetContainsExternalEvidence: false,
    blockingGateIds: EXTERNAL_GATE_IDS,
    boundary: "Exporting a complete review queue does not close any external validation gate and cannot change the typed validation ledger or completion audit.",
  },
};

const summary = {
  packetVersion: packet.packet.packetVersion,
  generatedAt: packet.packet.generatedAt,
  datasetId: packet.snapshot.datasetId,
  contentVersion: packet.snapshot.contentVersion,
  scoringPolicyVersion: packet.snapshot.scoringPolicyVersion,
  beliefModelVersion: packet.snapshot.beliefModel.version,
  morphologyModelVersion: packet.snapshot.morphologyModel.version,
  productionAuditCount: packet.productionReview.productionItemAudits.length,
  blindFirstPassCount: packet.productionReview.blindFirstPassItems.length,
  openDispositionCount: packet.productionReview.openDispositionItems.length,
  gapCandidateCount: packet.researchQueues.counts.gapCandidates,
  directPilotCount: packet.researchQueues.counts.directCategoricalItems,
  relationalFollowUpCount: packet.researchQueues.counts.relationalFollowUps,
  reviewQueueItemCount: packet.reviewQueueIndex.length,
  reviewRecordCount: packet.reviewRecords.length,
  sourceCount: packet.registries.sources.length,
  constructCount: packet.registries.constructs.length,
  validationErrorCount: packet.validation.localContractErrorCount,
  externalGateStatus: packet.validation.externalGateStatus,
  eligibleForPromotion: packet.promotion.eligibleForPromotion,
  evidenceLedgerRecordCount: packet.evidenceLedger.records.length,
};

const output = process.argv.includes("--summary") ? summary : packet;
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (validationErrors.length > 0) process.exitCode = 1;
