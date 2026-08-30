import type { BeliefItemDisposition } from "./types";

export const BELIEF_REVIEW_PACKET_VERSION = 1 as const;

export const BELIEF_REVIEW_ALLOWED_DISPOSITIONS = [
  "preserve",
  "remap",
  "rewrite",
  "split",
  "redundant",
  "construct-gap",
] as const satisfies readonly BeliefItemDisposition[];

/**
 * Evidence rows must declare the kind of external study or adjudication that
 * produced them. This is a typed declaration of scope, not authentication of
 * the study or its result.
 */
export const BELIEF_REVIEW_EVIDENCE_KINDS = [
  "response-process-study",
  "expert-content-adjudication",
  "respondent-empirical-study",
  "invariance-dif-study",
  "population-consequence-review",
  "held-out-morphology-study",
] as const;

export type BeliefReviewEvidenceKind = (typeof BELIEF_REVIEW_EVIDENCE_KINDS)[number];

export const BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE: Readonly<Record<string, BeliefReviewEvidenceKind>> = {
  "cognitive-response-process": "response-process-study",
  "expert-content-adjudication": "expert-content-adjudication",
  "empirical-reliability-validity": "respondent-empirical-study",
  "invariance-dif-cross-context": "invariance-dif-study",
  "population-consequence-review": "population-consequence-review",
  "held-out-respondent-morphology": "held-out-morphology-study",
};

/**
 * Checks the declared evidence type against the external gates listed on one
 * ledger row. The caller remains responsible for authenticating the source,
 * method, result, and provenance; this helper only enforces the local type
 * and gate-to-study-kind contract.
 */
export const validateBeliefReviewEvidenceKinds = (
  evidenceKindsValue: unknown,
  gateIds: readonly string[],
): readonly string[] => {
  const errors: string[] = [];
  if (!Array.isArray(evidenceKindsValue) || evidenceKindsValue.length === 0) {
    return ["evidenceKinds must list one or more evidence kinds"];
  }
  const evidenceKinds = evidenceKindsValue.filter((kind): kind is string => typeof kind === "string");
  if (evidenceKinds.length !== evidenceKindsValue.length || evidenceKinds.some((kind) => !kind.trim())) {
    errors.push("evidenceKinds must contain only non-empty strings");
  }
  if (new Set(evidenceKinds).size !== evidenceKinds.length) errors.push("evidenceKinds contains duplicate kinds");
  for (const evidenceKind of evidenceKinds) {
    if (!(BELIEF_REVIEW_EVIDENCE_KINDS as readonly string[]).includes(evidenceKind)) {
      errors.push(`unknown evidence kind ${evidenceKind}`);
    }
  }
  for (const gateId of gateIds) {
    const expectedKind = BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE[gateId];
    if (expectedKind && !evidenceKinds.includes(expectedKind)) {
      errors.push(`evidence kind ${expectedKind} is required for gate ${gateId}`);
    }
  }
  for (const evidenceKind of evidenceKinds) {
    if (!gateIds.some((gateId) => BELIEF_REVIEW_EVIDENCE_KIND_BY_GATE[gateId] === evidenceKind)) {
      errors.push(`evidence kind ${evidenceKind} is not linked to a listed gate`);
    }
  }
  return errors;
};

export const BELIEF_REVIEW_REQUIRED_FIELDS = [
  {
    id: "single-claim-and-layer",
    label: "Single respondent-facing claim and layer",
    description: "State the one claim the item asks a respondent to consider and identify its descriptive, normative, or prescriptive layer.",
  },
  {
    id: "elicited-construct-or-relation",
    label: "Construct, facet, conception, or relationship actually elicited",
    description: "Record the measured unit without assuming that a legacy facet or target ideology is the respondent's belief.",
  },
  {
    id: "multiple-claims-and-hidden-premises",
    label: "Multiple claims, hidden premises, labels, and scope",
    description: "Identify compound wording, hidden premises, ideological labels, undefined actors, and unbounded temporal or jurisdictional scope.",
  },
  {
    id: "expected-response-process",
    label: "Expected response process and plausible alternatives",
    description: "Describe comprehension, retrieval, judgment, and response-selection expectations, plus plausible alternative interpretations.",
  },
  {
    id: "missingness-and-uncertainty",
    label: "Missingness, mixed, uncertainty, and refusal semantics",
    description: "Assess whether no-view, mixed/depends, confidence, uncertainty, or refusal is meaningfully distinct for this item.",
  },
  {
    id: "provenance-and-sources",
    label: "Provenance and source support",
    description: "Record the construct, wording, directional-effect, option, and relationship source boundaries separately.",
  },
  {
    id: "neighboring-distinctions",
    label: "Neighboring constructs and ideological distinctions",
    description: "Name the nearest neighbors and the distinction the item is intended to protect, without using the target label as evidence.",
  },
  {
    id: "risk-review",
    label: "Temporal, jurisdictional, linguistic, social-desirability, and false-positive risks",
    description: "Record context and use risks that could change interpretation or create an unwarranted label.",
  },
  {
    id: "disposition-and-rationale",
    label: "Disposition and decision rationale",
    description: "Choose preserve, remap, rewrite, split, redundant, or construct-gap and explain the decision.",
  },
  {
    id: "reviewer-disagreement-adjudication",
    label: "Reviewer ids, disagreement, adjudication, and version",
    description: "Retain independent reviewer identifiers, disagreement notes, named adjudicator decision, dates, and the reviewed packet/model version.",
  },
] as const;

export const BELIEF_REVIEW_EVIDENCE_LEDGER_FIELDS = [
  "evidenceId",
  "evidenceKinds",
  "claimAndUnit",
  "intendedUse",
  "sourceOrStudy",
  "populationAndContext",
  "method",
  "preregisteredHypothesis",
  "result",
  "limitations",
  "decision",
  "reviewAndProvenance",
  "gateIds",
  "status",
] as const;

export type BeliefReviewRequiredFieldId = (typeof BELIEF_REVIEW_REQUIRED_FIELDS)[number]["id"];
