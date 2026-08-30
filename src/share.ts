import { BELIEF_RELATIONAL_FOLLOWUPS, type BeliefRelationalAnswerMap } from "./belief-followups";
import { BELIEF_DIRECT_ITEMS, type BeliefDirectAnswerMap } from "./belief-direct-items";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateOptionIdFor, type BeliefGapAnswerMap } from "./belief-gap-candidates";
import type { Answer, AnswerMap, Dataset, DirectShareAnswer, GapShareAnswer, RelationalShareAnswer, ShareEnvelope, ShareEnvelopeV1, ShareEnvelopeV2 } from "./types";

const SHARE_PREFIX = "#s=";
// Share fragments are bounded because URL fragments can be exposed through
// history, clipboard contents, screenshots, and shared devices. Version 2
// uses question indexes when the more readable v1 envelope would exceed the
// bound, while v1 remains supported for existing links.
const MAX_FRAGMENT_LENGTH = 40_960;
const COMPACT_NO_VIEW = 3 as const;

const isAnswer = (value: unknown): value is Answer => value === -2 || value === -1 || value === 0 || value === 1 || value === 2 || value === "no-view";

const isCompactAnswer = (value: unknown): value is ShareEnvelopeV2["answers"][number][1] => value === -2 || value === -1 || value === 0 || value === 1 || value === 2 || value === COMPACT_NO_VIEW;

const compactAnswer = (value: Answer): ShareEnvelopeV2["answers"][number][1] => value === "no-view" ? COMPACT_NO_VIEW : value;

const expandCompactAnswer = (value: ShareEnvelopeV2["answers"][number][1]): Answer => value === COMPACT_NO_VIEW ? "no-view" : value;

const bytesToBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
};

const base64UrlToBytes = (encoded: string): Uint8Array => {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (encoded.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

const encodeEnvelope = (envelope: ShareEnvelope): string => {
  const encoded = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(envelope)));
  return `${SHARE_PREFIX}${encoded}`;
};

const relationalAnswersForShare = (answers: BeliefRelationalAnswerMap): readonly RelationalShareAnswer[] => BELIEF_RELATIONAL_FOLLOWUPS.flatMap((followUp) => {
  const optionId = answers[followUp.id];
  if (!optionId || !followUp.options.some((option) => option.id === optionId)) return [];
  return [[followUp.id, optionId] as const];
});

const directAnswersForShare = (answers: BeliefDirectAnswerMap): readonly DirectShareAnswer[] => BELIEF_DIRECT_ITEMS.flatMap((item) => {
  const optionId = answers[item.id];
  if (!optionId || !item.options.some((option) => option.id === optionId)) return [];
  return [[item.id, optionId] as const];
});

const gapAnswersForShare = (answers: BeliefGapAnswerMap): readonly GapShareAnswer[] => BELIEF_GAP_CANDIDATES.flatMap((candidate) => {
  const optionId = answers[candidate.id];
  if (!optionId || !candidate.responseOptions.some((_, optionIndex) => beliefGapCandidateOptionIdFor(candidate, optionIndex) === optionId)) return [];
  return [[candidate.id, optionId] as const];
});

export const encodeShareFragment = (
  answers: AnswerMap,
  dataset: Dataset,
  relationalAnswers: BeliefRelationalAnswerMap = {},
  directAnswers: BeliefDirectAnswerMap = {},
  gapAnswers: BeliefGapAnswerMap = {},
): string => {
  const encodedRelationalAnswers = relationalAnswersForShare(relationalAnswers);
  const encodedDirectAnswers = directAnswersForShare(directAnswers);
  const encodedGapAnswers = gapAnswersForShare(gapAnswers);
  const optionalPayload = {
    ...(encodedRelationalAnswers.length > 0 ? { relationalAnswers: encodedRelationalAnswers } : {}),
    ...(encodedDirectAnswers.length > 0 ? { directAnswers: encodedDirectAnswers } : {}),
    ...(encodedGapAnswers.length > 0 ? { gapAnswers: encodedGapAnswers } : {}),
  };
  const readableEnvelope: ShareEnvelopeV1 = {
    schema: "ideology-layer-sorter/share",
    envelopeVersion: 1,
    datasetId: dataset.manifest.datasetId,
    contentVersion: dataset.manifest.contentVersion,
    scoringPolicyVersion: dataset.manifest.scoringPolicyVersion,
    answers: dataset.questions
      .map((question) => ({ questionId: question.id, value: answers[question.id] }))
      .filter((item): item is { questionId: string; value: Answer } => isAnswer(item.value)),
    ...optionalPayload,
  };
  const readableFragment = encodeEnvelope(readableEnvelope);
  if (readableFragment.length <= MAX_FRAGMENT_LENGTH) return readableFragment;

  const compactEnvelope: ShareEnvelopeV2 = {
    schema: "ideology-layer-sorter/share",
    envelopeVersion: 2,
    datasetId: dataset.manifest.datasetId,
    contentVersion: dataset.manifest.contentVersion,
    scoringPolicyVersion: dataset.manifest.scoringPolicyVersion,
    answers: dataset.questions.flatMap((question, questionIndex) => {
      const value = answers[question.id];
      return isAnswer(value) ? [[questionIndex, compactAnswer(value)] as const] : [];
    }),
    ...optionalPayload,
  };
  return encodeEnvelope(compactEnvelope);
};

type DecodeResult =
  | Readonly<{ ok: true; answers: AnswerMap; relationalAnswers?: BeliefRelationalAnswerMap; directAnswers?: BeliefDirectAnswerMap; gapAnswers?: BeliefGapAnswerMap }>
  | Readonly<{ ok: false; reason: string }>;

const relationalAnswersFromPayload = (value: unknown): { ok: true; answers: Record<string, string> } | { ok: false; reason: string } => {
  if (value === undefined) return { ok: true, answers: {} };
  if (!Array.isArray(value) || value.length > BELIEF_RELATIONAL_FOLLOWUPS.length) return { ok: false, reason: "This share payload has an invalid relational answer list." };
  const followUps = new Map(BELIEF_RELATIONAL_FOLLOWUPS.map((followUp) => [followUp.id, followUp]));
  const answers: Record<string, string> = {};
  for (const item of value) {
    if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== "string" || typeof item[1] !== "string") return { ok: false, reason: "This share payload contains an unknown relational answer." };
    const followUp = followUps.get(item[0]);
    if (!followUp || !followUp.options.some((option) => option.id === item[1])) return { ok: false, reason: "This share payload contains an unknown relational answer." };
    if (item[0] in answers) return { ok: false, reason: "This share payload contains a duplicate relational answer." };
    answers[item[0]] = item[1];
  }
  return { ok: true, answers };
};

const directAnswersFromPayload = (value: unknown): { ok: true; answers: Record<string, string> } | { ok: false; reason: string } => {
  if (value === undefined) return { ok: true, answers: {} };
  if (!Array.isArray(value) || value.length > BELIEF_DIRECT_ITEMS.length) return { ok: false, reason: "This share payload has an invalid direct-belief answer list." };
  const directItems = new Map(BELIEF_DIRECT_ITEMS.map((item) => [item.id, item]));
  const answers: Record<string, string> = {};
  for (const item of value) {
    if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== "string" || typeof item[1] !== "string") return { ok: false, reason: "This share payload contains an unknown direct-belief answer." };
    const directItem = directItems.get(item[0]);
    if (!directItem || !directItem.options.some((option) => option.id === item[1])) return { ok: false, reason: "This share payload contains an unknown direct-belief answer." };
    if (item[0] in answers) return { ok: false, reason: "This share payload contains a duplicate direct-belief answer." };
    answers[item[0]] = item[1];
  }
  return { ok: true, answers };
};

const gapAnswersFromPayload = (value: unknown): { ok: true; answers: Record<string, string> } | { ok: false; reason: string } => {
  if (value === undefined) return { ok: true, answers: {} };
  if (!Array.isArray(value) || value.length > BELIEF_GAP_CANDIDATES.length) return { ok: false, reason: "This share payload has an invalid research-candidate answer list." };
  const candidates = new Map(BELIEF_GAP_CANDIDATES.map((candidate) => [candidate.id, candidate]));
  const answers: Record<string, string> = {};
  for (const item of value) {
    if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== "string" || typeof item[1] !== "string") return { ok: false, reason: "This share payload contains an unknown research-candidate answer." };
    const candidate = candidates.get(item[0]);
    if (!candidate || !candidate.responseOptions.some((_, optionIndex) => beliefGapCandidateOptionIdFor(candidate, optionIndex) === item[1])) return { ok: false, reason: "This share payload contains an unknown research-candidate answer." };
    if (item[0] in answers) return { ok: false, reason: "This share payload contains a duplicate research-candidate answer." };
    answers[item[0]] = item[1];
  }
  return { ok: true, answers };
};

const decodedResultFor = (answers: AnswerMap, relationalValue: unknown, directValue: unknown, gapValue: unknown): DecodeResult => {
  const relational = relationalAnswersFromPayload(relationalValue);
  if (!relational.ok) return relational;
  const direct = directAnswersFromPayload(directValue);
  if (!direct.ok) return direct;
  const gap = gapAnswersFromPayload(gapValue);
  if (!gap.ok) return gap;
  return Object.keys(relational.answers).length > 0 || Object.keys(direct.answers).length > 0 || Object.keys(gap.answers).length > 0
    ? {
      ok: true,
      answers,
      ...(Object.keys(relational.answers).length > 0 ? { relationalAnswers: relational.answers } : {}),
      ...(Object.keys(direct.answers).length > 0 ? { directAnswers: direct.answers } : {}),
      ...(Object.keys(gap.answers).length > 0 ? { gapAnswers: gap.answers } : {}),
    }
    : { ok: true, answers };
};

export const decodeShareFragment = (fragment: string, dataset: Dataset): DecodeResult => {
  if (!fragment || fragment.length > MAX_FRAGMENT_LENGTH) return { ok: false, reason: "This share link is empty or too large." };
  const normalized = fragment.startsWith("#") ? fragment.slice(1) : fragment;
  if (!normalized.startsWith("s=")) return { ok: false, reason: "This share link does not contain a recognized result payload." };
  const encoded = normalized.slice(2);
  if (!encoded || !/^[A-Za-z0-9_-]+$/u.test(encoded)) return { ok: false, reason: "This share link contains invalid characters." };

  try {
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encoded))) as unknown;
    if (!isRecord(decoded)) return { ok: false, reason: "This share payload is not an object." };
    if (decoded.schema !== "ideology-layer-sorter/share" || (decoded.envelopeVersion !== 1 && decoded.envelopeVersion !== 2)) return { ok: false, reason: "This share payload uses an unsupported format." };
    if (decoded.datasetId !== dataset.manifest.datasetId || decoded.contentVersion !== dataset.manifest.contentVersion || decoded.scoringPolicyVersion !== dataset.manifest.scoringPolicyVersion) {
      return { ok: false, reason: "This share payload was created from a different dataset version." };
    }
    if (!Array.isArray(decoded.answers) || decoded.answers.length > dataset.questions.length) return { ok: false, reason: "This share payload has an invalid answer list." };

    const answers: AnswerMap = {};
    if (decoded.envelopeVersion === 1) {
      const knownQuestionIds = new Set(dataset.questions.map((question) => question.id));
      for (const item of decoded.answers) {
        if (!isRecord(item) || typeof item.questionId !== "string" || !knownQuestionIds.has(item.questionId) || !isAnswer(item.value)) {
          return { ok: false, reason: "This share payload contains an unknown question or answer." };
        }
        if (item.questionId in answers) return { ok: false, reason: "This share payload contains a duplicate answer." };
        answers[item.questionId] = item.value;
      }
      return decodedResultFor(answers, decoded.relationalAnswers, decoded.directAnswers, decoded.gapAnswers);
    }

    for (const item of decoded.answers) {
      if (!Array.isArray(item) || item.length !== 2 || !Number.isInteger(item[0]) || item[0] < 0 || item[0] >= dataset.questions.length || !isCompactAnswer(item[1])) {
        return { ok: false, reason: "This share payload contains an unknown question or answer." };
      }
      const questionId = dataset.questions[item[0]].id;
      if (questionId in answers) return { ok: false, reason: "This share payload contains a duplicate answer." };
      answers[questionId] = expandCompactAnswer(item[1]);
    }
    return decodedResultFor(answers, decoded.relationalAnswers, decoded.directAnswers, decoded.gapAnswers);
  } catch {
    return { ok: false, reason: "This share payload could not be decoded." };
  }
};
