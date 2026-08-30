import { describe, expect, it } from "vitest";
import { BELIEF_GAP_CANDIDATES, beliefGapCandidateOptionIdFor } from "./belief-gap-candidates";
import { DATASET } from "./data";
import { decodeShareFragment, encodeShareFragment } from "./share";

const fragmentFor = (answers: readonly Readonly<{ questionId: string; value: -2 | -1 | 0 | 1 | 2 | "no-view" }>[], relationalAnswers: readonly (readonly [string, string])[] = [], directAnswers: readonly (readonly [string, string])[] = [], gapAnswers: readonly (readonly [string, string])[] = []): string => {
  const payload = JSON.stringify({
    schema: "ideology-layer-sorter/share",
    envelopeVersion: 1,
    datasetId: DATASET.manifest.datasetId,
    contentVersion: DATASET.manifest.contentVersion,
    scoringPolicyVersion: DATASET.manifest.scoringPolicyVersion,
    answers,
    ...(relationalAnswers.length > 0 ? { relationalAnswers } : {}),
    ...(directAnswers.length > 0 ? { directAnswers } : {}),
    ...(gapAnswers.length > 0 ? { gapAnswers } : {}),
  });
  let binary = "";
  for (const byte of new TextEncoder().encode(payload)) binary += String.fromCharCode(byte);
  return `#s=${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "")}`;
};

describe("share fragments", () => {
  it("round-trips only versioned, known answers in dataset order", () => {
    const answers = {
      [DATASET.questions[3].id]: 2 as const,
      [DATASET.questions[0].id]: "no-view" as const,
    };
    const fragment = encodeShareFragment(answers, DATASET);
    const decoded = decodeShareFragment(fragment, DATASET);
    expect(decoded).toEqual({ ok: true, answers });
  });

  it("round-trips a complete production answer set within the bounded fragment", () => {
    const answers = Object.fromEntries(DATASET.questions.map((question) => [question.id, 2 as const]));
    const fragment = encodeShareFragment(answers, DATASET);

    expect(fragment.length).toBeGreaterThan(0);
    expect(fragment.length).toBeLessThanOrEqual(40_960);
    const encodedPayload = fragment.slice(3);
    const encoded = encodedPayload.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (encodedPayload.length % 4)) % 4);
    const payload = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0)))) as { envelopeVersion: number };
    expect(payload.envelopeVersion).toBe(2);
    expect(decodeShareFragment(fragment, DATASET)).toEqual({ ok: true, answers });
  });

  it("continues to decode readable version 1 payloads", () => {
    const fragment = fragmentFor([{ questionId: DATASET.questions[0].id, value: "no-view" }]);
    expect(decodeShareFragment(fragment, DATASET)).toEqual({ ok: true, answers: { [DATASET.questions[0].id]: "no-view" } });
  });

  it("round-trips validated relational follow-up selections without changing scalar answers", () => {
    const answers = { [DATASET.questions[0].id]: 1 as const };
    const relationalAnswers = {
      "priority-liberty-equality": "freedom-first",
      "contradiction-goal-route": "no-tension",
    };
    const directAnswers = {
      "conception-of-freedom": "non-domination",
      "causal-account-of-inequality": "institutional-feedback",
    };
    const gapAnswers = {
      [BELIEF_GAP_CANDIDATES[0].id]: beliefGapCandidateOptionIdFor(BELIEF_GAP_CANDIDATES[0], 0),
      [BELIEF_GAP_CANDIDATES[1].id]: beliefGapCandidateOptionIdFor(BELIEF_GAP_CANDIDATES[1], BELIEF_GAP_CANDIDATES[1].responseOptions.length - 1),
    };
    const decoded = decodeShareFragment(encodeShareFragment(answers, DATASET, relationalAnswers, directAnswers, gapAnswers), DATASET);
    expect(decoded).toEqual({ ok: true, answers, relationalAnswers, directAnswers, gapAnswers });
  });

  it("rejects malformed or unrecognized fragments without guessing", () => {
    expect(decodeShareFragment("#not-a-share", DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment("#s=!!!", DATASET)).toMatchObject({ ok: false });
  });

  it("rejects stale, unknown, duplicate, and oversized payloads as a whole", () => {
    const staleDataset = { ...DATASET, manifest: { ...DATASET.manifest, contentVersion: DATASET.manifest.contentVersion + 1 } };
    const stalePolicyDataset = { ...DATASET, manifest: { ...DATASET.manifest, scoringPolicyVersion: DATASET.manifest.scoringPolicyVersion + 1 } };
    const valid = encodeShareFragment({ [DATASET.questions[0].id]: 1 }, DATASET);
    expect(decodeShareFragment(valid, staleDataset)).toMatchObject({ ok: false });
    expect(decodeShareFragment(valid, stalePolicyDataset)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([{ questionId: "unknown", value: 1 }]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([{ questionId: DATASET.questions[0].id, value: 1 }, { questionId: DATASET.questions[0].id, value: -1 }]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [["unknown-follow-up", "unknown-option"]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [["priority-liberty-equality", "freedom-first"], ["priority-liberty-equality", "equality-first"]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [], [["unknown-direct-item", "unknown-option"]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [], [["conception-of-freedom", "non-interference"], ["conception-of-freedom", "non-domination"]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [], [], [["unknown-candidate", "unknown-option"]]), DATASET)).toMatchObject({ ok: false });
    const firstCandidate = BELIEF_GAP_CANDIDATES[0];
    const firstOptionId = beliefGapCandidateOptionIdFor(firstCandidate, 0);
    expect(decodeShareFragment(fragmentFor([], [], [], [[firstCandidate.id, "unknown-option"]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(fragmentFor([], [], [], [[firstCandidate.id, firstOptionId], [firstCandidate.id, firstOptionId]]), DATASET)).toMatchObject({ ok: false });
    expect(decodeShareFragment(`#s=${"a".repeat(40_958)}`, DATASET)).toMatchObject({ ok: false });
  });
});
