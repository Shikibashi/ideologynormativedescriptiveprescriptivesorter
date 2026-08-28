import { describe, expect, it } from "vitest";
import { DATASET } from "./data";
import { decodeShareFragment, encodeShareFragment } from "./share";

const fragmentFor = (answers: readonly Readonly<{ questionId: string; value: -2 | -1 | 0 | 1 | 2 | "no-view" }>[]): string => {
  const payload = JSON.stringify({
    schema: "ideology-layer-sorter/share",
    envelopeVersion: 1,
    datasetId: DATASET.manifest.datasetId,
    contentVersion: DATASET.manifest.contentVersion,
    scoringPolicyVersion: DATASET.manifest.scoringPolicyVersion,
    answers,
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

    expect(fragment.length).toBe(12_833);
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
    expect(decodeShareFragment(`#s=${"a".repeat(40_958)}`, DATASET)).toMatchObject({ ok: false });
  });
});
