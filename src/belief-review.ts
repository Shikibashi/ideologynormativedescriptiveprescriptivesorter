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
