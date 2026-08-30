import { readFileSync } from "node:fs";
import { BELIEF_DIRECT_ITEMS } from "../src/belief-direct-items";
import { BELIEF_GAP_CANDIDATES } from "../src/belief-gap-candidates";
import { BELIEF_RELATIONAL_FOLLOWUPS } from "../src/belief-followups";
import {
  BELIEF_CONSTRUCT_DEFINITIONS,
  BELIEF_MODEL_ID,
  BELIEF_MODEL_VERSION,
  auditBeliefMeasurement,
} from "../src/beliefs";
import {
  BELIEF_REVIEW_ALLOWED_DISPOSITIONS,
  BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS,
  BELIEF_REVIEW_PACKET_VERSION,
  BELIEF_REVIEW_REQUIRED_FIELDS,
} from "../src/belief-review";
import { BELIEF_VALIDATION_GATES } from "../src/belief-validation";
import { answerOptions, DATASET } from "../src/data";
import { MORPHOLOGY_MODEL_ID, MORPHOLOGY_MODEL_VERSION } from "../src/morphology";

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord => typeof value === "object" && value !== null && !Array.isArray(value);
const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const asRecords = (value: unknown): readonly JsonRecord[] => Array.isArray(value) ? value.filter(isRecord) : [];

const summaryMode = process.argv.includes("--summary");
const inputArgumentIndex = process.argv.indexOf("--input");
const inputArgument = inputArgumentIndex >= 0 ? process.argv[inputArgumentIndex + 1] : undefined;
const inputEqualsArgument = process.argv.find((argument) => argument.startsWith("--input="));
const reviewPacketInputEqualsArgument = process.argv.find((argument) => argument.startsWith("--review-packet-input="));
const inputPath = process.env.BELIEF_REVIEW_PACKET_INPUT
  ?? inputArgument
  ?? inputEqualsArgument?.slice("--input=".length)
  ?? reviewPacketInputEqualsArgument?.slice("--review-packet-input=".length);

const currentExternalGateIds = BELIEF_VALIDATION_GATES
  .filter((gate) => gate.scope === "external-study" && gate.requiredForCompletion)
  .map((gate) => gate.id);
const currentExternalGateIdSet = new Set(currentExternalGateIds);
const currentGateStatus = Object.fromEntries(currentExternalGateIds.map((gateId) => [
  gateId,
  BELIEF_VALIDATION_GATES.find((gate) => gate.id === gateId)?.status ?? "NOT RUN",
]));
const currentProductionAudits = auditBeliefMeasurement(DATASET);
const currentQuestionById = new Map(DATASET.questions.map((question) => [question.id, question]));
const currentResponseScale = answerOptions.map((option) => ({
  value: option.value,
  label: option.label,
  hint: option.hint,
}));
const currentBlindFirstPassItemFor = (audit: (typeof currentProductionAudits)[number], index: number) => ({
  reviewItemId: `production-${String(index + 1).padStart(4, "0")}`,
  kind: "production-question",
  layer: audit.layer,
  domain: audit.domain,
  prompt: audit.prompt,
  ...(audit.context ? { context: audit.context } : {}),
});
const currentProductionAdjudicationItemFor = (audit: (typeof currentProductionAudits)[number], index: number) => {
  const question = currentQuestionById.get(audit.questionId);
  return {
    reviewItemId: `production-${String(index + 1).padStart(4, "0")}`,
    ...audit,
    ...(question?.version === undefined ? {} : { questionVersion: question.version }),
    ...(question?.sourceType === undefined ? {} : { sourceType: question.sourceType }),
    responseScale: currentResponseScale,
  };
};
const currentReviewQueueIndex = [
  ...currentProductionAudits.map((audit, index) => ({
    reviewItemId: `production-${String(index + 1).padStart(4, "0")}`,
    queue: "production-question",
    itemId: audit.questionId,
    layer: audit.layer,
  })),
  ...BELIEF_GAP_CANDIDATES.map((candidate) => ({
    reviewItemId: `gap-${candidate.id}`,
    queue: "gap-candidate",
    itemId: candidate.id,
    layer: candidate.layer,
  })),
  ...BELIEF_DIRECT_ITEMS.map((item) => ({
    reviewItemId: `direct-${item.id}`,
    queue: "direct-categorical",
    itemId: item.id,
    layer: item.layer,
  })),
  ...BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => ({
    reviewItemId: `relational-${followUp.id}`,
    queue: "relational-follow-up",
    itemId: followUp.id,
    layer: followUp.layer,
  })),
];
const currentReviewItemIds = currentReviewQueueIndex.map((item) => item.reviewItemId);
const currentReviewQueueById = new Map(currentReviewQueueIndex.map((item) => [item.reviewItemId, item]));
const currentReviewItemIdSet = new Set(currentReviewItemIds);
const allowedStatuses = new Set(["PASS", "FAIL", "NOT RUN", "NOT ESTIMABLE", "INCONCLUSIVE"]);
const allowedRoles = new Set(["reviewer", "adjudicator"]);
const allowedDispositions = new Set<string>(BELIEF_REVIEW_ALLOWED_DISPOSITIONS);

const normalizedJson = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(normalizedJson);
  if (isRecord(value)) return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalizedJson(value[key])]));
  return value;
};
const jsonMatches = (actual: unknown, expected: unknown): boolean => JSON.stringify(normalizedJson(actual)) === JSON.stringify(normalizedJson(expected));

const readInput = async (): Promise<{ raw: string; label: string }> => {
  if (inputPath) return { raw: readFileSync(inputPath, "utf8"), label: inputPath };
  if (!process.stdin.isTTY) {
    const chunks: string[] = [];
    for await (const chunk of process.stdin) chunks.push(chunk.toString());
    const raw = chunks.join("");
    if (!raw.trim()) throw new Error("stdin was empty; provide a full review packet JSON document");
    return { raw, label: "stdin" };
  }
  throw new Error("provide --input PATH or pipe a full review packet JSON document to stdin");
};

const stringFieldErrors = (record: JsonRecord, fields: readonly string[], prefix: string): string[] => fields.flatMap((field) =>
  isNonEmptyString(record[field]) ? [] : [`${prefix} is missing non-empty field ${field}`],
);

const snapshotErrorsFor = (root: JsonRecord): string[] => {
  const errors: string[] = [];
  const packet = isRecord(root.packet) ? root.packet : {};
  const snapshot = isRecord(root.snapshot) ? root.snapshot : {};
  const beliefModel = isRecord(snapshot.beliefModel) ? snapshot.beliefModel : {};
  const morphologyModel = isRecord(snapshot.morphologyModel) ? snapshot.morphologyModel : {};
  if (packet.packetVersion !== BELIEF_REVIEW_PACKET_VERSION) errors.push(`packet version does not match current version ${BELIEF_REVIEW_PACKET_VERSION}`);
  if (snapshot.datasetId !== DATASET.manifest.datasetId) errors.push("packet dataset id does not match the current dataset");
  if (snapshot.contentVersion !== DATASET.manifest.contentVersion) errors.push("packet content version is stale or does not match the current dataset");
  if (snapshot.scoringPolicyVersion !== DATASET.manifest.scoringPolicyVersion) errors.push("packet scoring-policy version does not match the current dataset");
  if (beliefModel.id !== BELIEF_MODEL_ID || beliefModel.version !== BELIEF_MODEL_VERSION) errors.push("packet belief-model snapshot does not match the current model");
  if (morphologyModel.id !== MORPHOLOGY_MODEL_ID || morphologyModel.version !== MORPHOLOGY_MODEL_VERSION) errors.push("packet morphology-model snapshot does not match the current model");

  const currentQuestionIds = DATASET.questions.map((question) => question.id);
  const packetQuestionIds = Array.isArray(snapshot.questionIds) ? snapshot.questionIds : [];
  if (snapshot.questionCount !== DATASET.questions.length) errors.push("packet question count does not match the current dataset");
  if (JSON.stringify(packetQuestionIds) !== JSON.stringify(currentQuestionIds)) errors.push("packet question-id snapshot does not match the current dataset");
  const packetQuestionCountsByLayer = isRecord(snapshot.questionCountsByLayer) ? snapshot.questionCountsByLayer : {};
  for (const layer of ["descriptive", "normative", "prescriptive"] as const) {
    const expectedCount = DATASET.questions.filter((question) => question.layer === layer).length;
    if (packetQuestionCountsByLayer[layer] !== expectedCount) errors.push(`packet question count for ${layer} does not match the current dataset`);
  }

  const fixedOntology = isRecord(snapshot.fixedOntology) ? snapshot.fixedOntology : {};
  const packetOntologyNodes = asRecords(fixedOntology.nodes);
  const currentOntologyNodes = DATASET.ideologyNodes.map((node) => ({
    id: node.id,
    label: node.label,
    level: node.level,
    placement: node.placement,
    status: node.status,
  }));
  if (fixedOntology.nodeCount !== DATASET.ideologyNodes.length) errors.push("packet fixed-ontology node count does not match the current dataset");
  if (JSON.stringify(packetOntologyNodes) !== JSON.stringify(currentOntologyNodes)) errors.push("packet fixed-ontology snapshot does not match the current dataset");

  const validation = isRecord(root.validation) ? root.validation : {};
  const gateSnapshot = asRecords(validation.gateSnapshot);
  for (const gateId of currentExternalGateIds) {
    const snapshotGate = gateSnapshot.find((gate) => gate.id === gateId);
    if (!snapshotGate || snapshotGate.status !== currentGateStatus[gateId]) errors.push(`packet gate snapshot is stale or altered for ${gateId}`);
  }
  const promotion = isRecord(root.promotion) ? root.promotion : {};
  if (promotion.eligibleForPromotion !== false) errors.push("review packet must remain ineligible for promotion");
  if (promotion.packetContainsExternalEvidence !== false) errors.push("review packet must not claim to contain external evidence");
  return errors;
};

const queueIndexErrorsFor = (root: JsonRecord): string[] => {
  const errors: string[] = [];
  const queueIndex = asRecords(root.reviewQueueIndex);
  const ids = queueIndex.map((item) => item.reviewItemId).filter(isNonEmptyString);
  if (queueIndex.length !== currentReviewItemIds.length) {
    errors.push(`review queue index count ${queueIndex.length} does not match current count ${currentReviewItemIds.length}`);
  }
  if (new Set(ids).size !== ids.length) errors.push("review queue index contains duplicate review item ids");
  for (const reviewItemId of currentReviewItemIds) {
    if (!ids.includes(reviewItemId)) errors.push(`review queue index is missing ${reviewItemId}`);
  }
  for (const reviewItemId of ids) {
    if (!currentReviewItemIdSet.has(reviewItemId)) errors.push(`review queue index contains unknown review item ${reviewItemId}`);
  }
  for (const [index, item] of queueIndex.entries()) {
    const reviewItemId = item.reviewItemId;
    if (!isNonEmptyString(reviewItemId)) {
      errors.push(`review queue index item ${index} is missing a reviewItemId`);
      continue;
    }
    const expected = currentReviewQueueById.get(reviewItemId);
    if (!expected) continue;
    for (const field of ["queue", "itemId", "layer"] as const) {
      if (item[field] !== expected[field]) errors.push(`review queue item ${reviewItemId} has mismatched ${field}`);
    }
  }
  return errors;
};

const packetSectionErrorsFor = (root: JsonRecord): string[] => {
  const errors: string[] = [];
  const productionReview = isRecord(root.productionReview) ? root.productionReview : {};
  const researchQueues = isRecord(root.researchQueues) ? root.researchQueues : {};
  const registries = isRecord(root.registries) ? root.registries : {};
  const reviewDesign = isRecord(root.reviewDesign) ? root.reviewDesign : {};
  const evidenceLedger = isRecord(root.evidenceLedger) ? root.evidenceLedger : {};
  const expectedProductionCount = auditBeliefMeasurement(DATASET).length;
  const expectedOpenDispositionCount = auditBeliefMeasurement(DATASET).filter((audit) => audit.disposition !== "preserve").length;
  const expectedReviewFieldIds = BELIEF_REVIEW_REQUIRED_FIELDS.map((field) => field.id);
  const expectedEvidenceFieldIds = [...BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS];

  const sections: readonly [string, unknown, number][] = [
    ["productionReview.blindFirstPassItems", productionReview.blindFirstPassItems, expectedProductionCount],
    ["productionReview.productionItemAudits", productionReview.productionItemAudits, expectedProductionCount],
    ["productionReview.openDispositionItems", productionReview.openDispositionItems, expectedOpenDispositionCount],
    ["productionReview.openDispositionQuestionIds", productionReview.openDispositionQuestionIds, expectedOpenDispositionCount],
    ["researchQueues.gapCandidates", researchQueues.gapCandidates, BELIEF_GAP_CANDIDATES.length],
    ["researchQueues.directCategoricalItems", researchQueues.directCategoricalItems, BELIEF_DIRECT_ITEMS.length],
    ["researchQueues.relationalFollowUps", researchQueues.relationalFollowUps, BELIEF_RELATIONAL_FOLLOWUPS.length],
    ["registries.constructs", registries.constructs, BELIEF_CONSTRUCT_DEFINITIONS.length],
    ["registries.sources", registries.sources, DATASET.sources.length],
  ];
  for (const [path, value, expectedLength] of sections) {
    if (!Array.isArray(value)) errors.push(`packet is missing ${path} array`);
    else if (value.length !== expectedLength) errors.push(`${path} count ${value.length} does not match current count ${expectedLength}`);
  }

  const blindItems = productionReview.blindFirstPassItems;
  if (Array.isArray(blindItems) && blindItems.length === expectedProductionCount) {
    currentProductionAudits.forEach((audit, index) => {
      if (!jsonMatches(blindItems[index], currentBlindFirstPassItemFor(audit, index))) errors.push(`productionReview.blindFirstPassItems[${index}] does not match the current production item`);
    });
  }
  const productionItemAudits = productionReview.productionItemAudits;
  if (Array.isArray(productionItemAudits) && productionItemAudits.length === expectedProductionCount) {
    currentProductionAudits.forEach((audit, index) => {
      if (!jsonMatches(productionItemAudits[index], currentProductionAdjudicationItemFor(audit, index))) errors.push(`productionReview.productionItemAudits[${index}] does not match the current production audit`);
    });
  }
  const currentOpenDispositionItems = currentProductionAudits
    .map(currentProductionAdjudicationItemFor)
    .filter((item) => item.disposition !== "preserve");
  const openDispositionItems = productionReview.openDispositionItems;
  if (Array.isArray(openDispositionItems) && openDispositionItems.length === currentOpenDispositionItems.length) {
    currentOpenDispositionItems.forEach((item, index) => {
      if (!jsonMatches(openDispositionItems[index], item)) errors.push(`productionReview.openDispositionItems[${index}] does not match the current production audit`);
    });
  }
  const currentOpenDispositionQuestionIds = currentProductionAudits
    .filter((audit) => audit.disposition !== "preserve")
    .map((audit) => audit.questionId);
  if (!jsonMatches(productionReview.openDispositionQuestionIds, currentOpenDispositionQuestionIds)) errors.push("productionReview.openDispositionQuestionIds does not match the current production audit");

  const reviewFields = asRecords(reviewDesign.requiredRecordFields);
  const actualReviewFieldIds = reviewFields.map((field) => field.id).filter(isNonEmptyString);
  if (JSON.stringify(actualReviewFieldIds) !== JSON.stringify(expectedReviewFieldIds)) errors.push("packet reviewDesign.requiredRecordFields does not match the current review contract");
  const actualEvidenceFieldIds = Array.isArray(evidenceLedger.requiredFields)
    ? evidenceLedger.requiredFields.filter(isNonEmptyString)
    : [];
  if (JSON.stringify(actualEvidenceFieldIds) !== JSON.stringify(expectedEvidenceFieldIds)) errors.push("packet evidenceLedger.requiredFields does not match the current review contract");
  return errors;
};

const reviewRecordErrorsFor = (root: JsonRecord): { errors: readonly string[]; completenessIssues: readonly string[]; completedItemCount: number; reviewerCount: number } => {
  const errors: string[] = [];
  const records = Array.isArray(root.reviewRecords) ? root.reviewRecords : [];
  if (!Array.isArray(root.reviewRecords)) errors.push("review packet is missing reviewRecords array");
  const recordKeys = new Set<string>();
  const recordsByItem = new Map<string, JsonRecord[]>();
  const currentSnapshot = {
    packetVersion: BELIEF_REVIEW_PACKET_VERSION,
    contentVersion: DATASET.manifest.contentVersion,
    beliefModelVersion: BELIEF_MODEL_VERSION,
    morphologyModelVersion: MORPHOLOGY_MODEL_VERSION,
  };
  const requiredRecordKeys = [
    "reviewItemId",
    "reviewerId",
    "reviewerRole",
    "packetVersion",
    "contentVersion",
    "beliefModelVersion",
    "morphologyModelVersion",
    "fieldResponses",
    "disagreement",
    "adjudication",
    "disposition",
    "decisionRationale",
    "reviewedAt",
  ] as const;

  for (const [index, recordValue] of records.entries()) {
    if (!isRecord(recordValue)) {
      errors.push(`review record ${index} is not an object`);
      continue;
    }
    const prefix = `review record ${index}`;
    const hasField = (field: string): boolean => field in recordValue;
    for (const key of requiredRecordKeys) {
      if (!(key in recordValue)) errors.push(`${prefix} is missing ${key}`);
    }
    const reviewItemId = recordValue.reviewItemId;
    const reviewerId = recordValue.reviewerId;
    const reviewerRole = recordValue.reviewerRole;
    if (hasField("reviewItemId") && (!isNonEmptyString(reviewItemId) || !currentReviewItemIdSet.has(reviewItemId))) {
      errors.push(`${prefix} has an unknown reviewItemId`);
    }
    if (hasField("reviewerId") && !isNonEmptyString(reviewerId)) errors.push(`${prefix} is missing a reviewerId`);
    if (hasField("reviewerRole") && (!isNonEmptyString(reviewerRole) || !allowedRoles.has(reviewerRole))) {
      errors.push(`${prefix} has an invalid reviewerRole`);
    }
    for (const [key, expected] of Object.entries(currentSnapshot)) {
      if (hasField(key) && recordValue[key] !== expected) errors.push(`${prefix} has a stale or mismatched ${key}`);
    }
    const fieldResponses = recordValue.fieldResponses;
    if (!isRecord(fieldResponses)) {
      if (hasField("fieldResponses")) errors.push(`${prefix} fieldResponses is not an object`);
    } else {
      for (const field of BELIEF_REVIEW_REQUIRED_FIELDS) {
        if (!isNonEmptyString(fieldResponses[field.id])) errors.push(`${prefix} is missing response for ${field.id}`);
      }
    }
    if (hasField("disposition") && !allowedDispositions.has(String(recordValue.disposition))) {
      errors.push(`${prefix} has an invalid disposition`);
    }
    for (const field of ["disagreement", "adjudication", "decisionRationale"] as const) {
      if (hasField(field) && !isNonEmptyString(recordValue[field])) errors.push(`${prefix} is missing non-empty ${field}`);
    }
    if (hasField("reviewedAt") && (!isNonEmptyString(recordValue.reviewedAt) || Number.isNaN(Date.parse(recordValue.reviewedAt)))) {
      errors.push(`${prefix} has an invalid reviewedAt timestamp`);
    }
    if (isNonEmptyString(reviewItemId) && isNonEmptyString(reviewerId) && isNonEmptyString(reviewerRole)) {
      const key = `${reviewItemId}:${reviewerRole}:${reviewerId}`;
      if (recordKeys.has(key)) errors.push(`duplicate review record ${key}`);
      recordKeys.add(key);
      const itemRecords = recordsByItem.get(reviewItemId) ?? [];
      itemRecords.push(recordValue);
      recordsByItem.set(reviewItemId, itemRecords);
    }
  }

  const completenessIssues: string[] = [];
  let completedItemCount = 0;
  const reviewerIds = new Set<string>();
  for (const reviewItemId of currentReviewItemIds) {
    const itemRecords = recordsByItem.get(reviewItemId) ?? [];
    const reviewerRecords = itemRecords.filter((record) => record.reviewerRole === "reviewer");
    const distinctReviewerIds = new Set(reviewerRecords.map((record) => record.reviewerId).filter(isNonEmptyString));
    distinctReviewerIds.forEach((reviewerId) => reviewerIds.add(reviewerId));
    if (distinctReviewerIds.size < 2) {
      completenessIssues.push(`${reviewItemId} has ${distinctReviewerIds.size} independent reviewer(s); minimum is 2`);
    }
    const dispositions = new Set(reviewerRecords.map((record) => record.disposition).filter(isNonEmptyString));
    const hasAdjudicator = itemRecords.some((record) => record.reviewerRole === "adjudicator");
    if (dispositions.size > 1 && !hasAdjudicator) completenessIssues.push(`${reviewItemId} has reviewer disposition disagreement without an adjudicator record`);
    if (distinctReviewerIds.size >= 2 && (dispositions.size <= 1 || hasAdjudicator)) completedItemCount += 1;
  }
  return { errors, completenessIssues, completedItemCount, reviewerCount: reviewerIds.size };
};

const evidenceRecordErrorsFor = (root: JsonRecord): { errors: readonly string[]; gateIdsCovered: readonly string[]; recordCount: number } => {
  const evidenceLedger = isRecord(root.evidenceLedger) ? root.evidenceLedger : {};
  const records = Array.isArray(evidenceLedger.records) ? evidenceLedger.records : [];
  const errors: string[] = [];
  const evidenceIds = new Set<string>();
  const gateIdsCovered = new Set<string>();
  if (!Array.isArray(evidenceLedger.records)) errors.push("review packet is missing evidenceLedger.records array");
  for (const [index, recordValue] of records.entries()) {
    if (!isRecord(recordValue)) {
      errors.push(`evidence record ${index} is not an object`);
      continue;
    }
    const prefix = `evidence record ${index}`;
    errors.push(...stringFieldErrors(recordValue, BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS.filter((field) => field !== "gateIds" && field !== "status"), prefix));
    const evidenceId = recordValue.evidenceId;
    if (isNonEmptyString(evidenceId)) {
      if (evidenceIds.has(evidenceId)) errors.push(`duplicate evidence id ${evidenceId}`);
      evidenceIds.add(evidenceId);
    }
    const gateIds = recordValue.gateIds;
    if (!Array.isArray(gateIds) || gateIds.length === 0 || gateIds.some((gateId) => !isNonEmptyString(gateId))) {
      errors.push(`${prefix} must list one or more gateIds`);
    } else {
      for (const gateId of gateIds) {
        if (!currentExternalGateIdSet.has(gateId)) errors.push(`${prefix} references unknown external gate ${gateId}`);
        else gateIdsCovered.add(gateId);
      }
    }
    if (!isNonEmptyString(recordValue.status) || !allowedStatuses.has(recordValue.status)) errors.push(`${prefix} has an invalid status`);
  }
  return { errors, gateIdsCovered: [...gateIdsCovered].sort(), recordCount: records.length };
};

const run = async (): Promise<void> => {
  let input: { raw: string; label: string };
  try {
    input = await readInput();
  } catch (error) {
    const message = error instanceof Error ? error.message : "unable to read review packet input";
    process.stdout.write(JSON.stringify({ status: "NOT RUN", validationErrorCount: 1, validationErrors: [message], eligibleForPromotion: false }, null, 2) + "\n");
    process.exitCode = 1;
    return;
  }

  let root: JsonRecord;
  try {
    const parsed: unknown = JSON.parse(input.raw);
    if (!isRecord(parsed)) throw new Error("top-level JSON value is not an object");
    root = parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : "invalid JSON";
    process.stdout.write(JSON.stringify({ input: input.label, status: "INVALID", validationErrorCount: 1, validationErrors: [`could not parse review packet: ${message}`], eligibleForPromotion: false }, null, 2) + "\n");
    process.exitCode = 1;
    return;
  }

  const reviewRecords = reviewRecordErrorsFor(root);
  const evidenceRecords = evidenceRecordErrorsFor(root);
  const validationErrors = [
    ...snapshotErrorsFor(root),
    ...queueIndexErrorsFor(root),
    ...packetSectionErrorsFor(root),
    ...reviewRecords.errors,
    ...evidenceRecords.errors,
  ];
  const status = validationErrors.length > 0
    ? "INVALID"
    : reviewRecords.completenessIssues.length > 0
      ? "INCOMPLETE"
      : "READY_FOR_REVIEW_EVIDENCE";
  const output = {
    input: input.label,
    status,
    reviewQueueItemCount: currentReviewItemIds.length,
    reviewRecordCount: Array.isArray(root.reviewRecords) ? root.reviewRecords.length : 0,
    completedReviewItemCount: reviewRecords.completedItemCount,
    independentReviewerCount: reviewRecords.reviewerCount,
    completenessIssueCount: reviewRecords.completenessIssues.length,
    evidenceLedgerRecordCount: evidenceRecords.recordCount,
    evidenceGateIdsCovered: evidenceRecords.gateIdsCovered,
    externalGateStatus: currentGateStatus,
    validationErrorCount: validationErrors.length,
    validationErrors,
    completenessIssues: summaryMode ? undefined : reviewRecords.completenessIssues,
    completenessIssuePreview: reviewRecords.completenessIssues.slice(0, 5),
    eligibleForPromotion: false,
    interpretation: "This validator checks packet freshness, record structure, review completeness, and gate linkage. It cannot authenticate an external study, change BELIEF_VALIDATION_GATES, or promote the model.",
  };
  process.stdout.write(JSON.stringify(output, null, 2) + "\n");
  if (validationErrors.length > 0 || reviewRecords.completenessIssues.length > 0 || status !== "READY_FOR_REVIEW_EVIDENCE") process.exitCode = 1;
};

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "unexpected review packet validation error";
  process.stdout.write(JSON.stringify({ status: "INVALID", validationErrorCount: 1, validationErrors: [message], eligibleForPromotion: false }, null, 2) + "\n");
  process.exitCode = 1;
});
