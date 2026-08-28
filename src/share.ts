import type { Answer, AnswerMap, Dataset, ShareEnvelope, ShareEnvelopeV1, ShareEnvelopeV2 } from "./types";

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

export const encodeShareFragment = (answers: AnswerMap, dataset: Dataset): string => {
  const readableEnvelope: ShareEnvelopeV1 = {
    schema: "ideology-layer-sorter/share",
    envelopeVersion: 1,
    datasetId: dataset.manifest.datasetId,
    contentVersion: dataset.manifest.contentVersion,
    scoringPolicyVersion: dataset.manifest.scoringPolicyVersion,
    answers: dataset.questions
      .map((question) => ({ questionId: question.id, value: answers[question.id] }))
      .filter((item): item is { questionId: string; value: Answer } => isAnswer(item.value)),
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
  };
  return encodeEnvelope(compactEnvelope);
};

type DecodeResult =
  | Readonly<{ ok: true; answers: AnswerMap }>
  | Readonly<{ ok: false; reason: string }>;

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
      return { ok: true, answers };
    }

    for (const item of decoded.answers) {
      if (!Array.isArray(item) || item.length !== 2 || !Number.isInteger(item[0]) || item[0] < 0 || item[0] >= dataset.questions.length || !isCompactAnswer(item[1])) {
        return { ok: false, reason: "This share payload contains an unknown question or answer." };
      }
      const questionId = dataset.questions[item[0]].id;
      if (questionId in answers) return { ok: false, reason: "This share payload contains a duplicate answer." };
      answers[questionId] = expandCompactAnswer(item[1]);
    }
    return { ok: true, answers };
  } catch {
    return { ok: false, reason: "This share payload could not be decoded." };
  }
};
