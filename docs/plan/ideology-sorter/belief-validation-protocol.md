# Belief-model validation protocol

## Status and boundary

This is the execution protocol for validating the deeper belief model. It is a planning and evidence-ledger artifact, not evidence that any study has been completed. The existing macro, meso, micro, and hybrid ontology remains fixed under this protocol; a validation result may expose a bad item, mapping, relationship, weighting rule, or implementation, but it does not by itself authorize adding or reorganizing an ideology.

As of 2026-08-30, the following gates are explicitly `NOT RUN`:

- respondent cognitive or response-process interviews;
- independent expert content adjudication of the production audit queue;
- respondent empirical data collection;
- reliability or internal-structure analysis;
- relations-to-other-variables analysis;
- invariance or differential-item-functioning analysis;
- consequence, population, or cross-context validation.

The local audits, tests, source records, and synthetic profiles are structural evidence only. They must not be reported as respondent, psychometric, population, or empirical validation.

The current gate statuses are also recorded as a typed ledger in [`src/belief-validation.ts`](../../../src/belief-validation.ts). `npm run belief:completion-audit` checks the repository contracts and emits the open required gates; it exits nonzero while any required external-study gate remains open. A green local structural check therefore cannot accidentally authorize marking this objective complete.

## 1. Intended claims and units

The validation argument separates claims that are often incorrectly collapsed into one “ideology score.” The unit of analysis must be named in every record:

| Unit | Claim under review | Current implementation boundary |
|---|---|---|
| Production question and answer option | The wording elicits the declared belief, value, conception, descriptive/causal account, prescription, institution, or strategy without silently asking for a named ideology. | The 1,500 production items are currently `facet-proxy` observations; the item audit is a review queue, not validity evidence. |
| Direct categorical item | A respondent can select among explicitly stated conceptions or accounts and the selected option has the declared meaning. | Eight optional direct pilot items are effect-free and excluded from affinity calculation. |
| Relational follow-up | A respondent can state a priority, condition, conflict rule, uncertainty, contradiction, or contestation relationship. | Six optional follow-up kinds are carried as explicit evidence only; no relationship is inferred from answer order, co-occurrence, or “mixed.” |
| Construct profile | The observed item evidence supports a bounded construct interpretation with explicit missingness and uncertainty. | Eleven constructs are registered; priority/conflict, epistemic stance, and heterodoxy/contestation remain unmeasured scalar gaps. |
| Configuration projection | A profile resembles a source-backed configuration of concepts and commitments, with visible support, missing commitments, tensions, and provenance. | Every canonical configuration now exposes at least one source-backed conceptual representation, explicitly classified as a researched conception or a facet proxy; morphology remains a provisional configuration projection over canonical ontology paths, not a latent trait, identity, diagnosis, or recommendation. |

The intended inference direction is therefore:

```text
responses
  -> item-level belief observations and explicitly stated relationships
  -> construct and conception profile
  -> integrated political-philosophical configuration
  -> provisional ideological morphology
  -> macro / meso / micro / hybrid interpretation
```

The last arrow is an interpretation layer. A weak, mixed, contradictory, or novel configuration may remain more informative than a named ideological candidate.

## 2. Evidence argument and promotion statuses

The protocol uses `PASS`, `FAIL`, `NOT RUN`, `NOT APPLICABLE`, and `INCONCLUSIVE`. A missing study or an underpowered study is never converted to `PASS`.

| Claim | Required evidence | Current status | Effect of a missing gate |
|---|---|---|---|
| Construct meaning and item content | Source-backed construct definition, one-claim item review, boundary and false-positive review, and adjudicated disposition. | Local source and mechanical audit: `PASS` for coverage; substantive adjudication: `NOT RUN`. | Item remains provisional; no direct-measurement promotion. |
| Intended response process | Cognitive interviews or another predeclared response-process study covering comprehension, retrieval, judgment, and response selection. | `NOT RUN`. | Wording, options, missingness, confidence, and conditional interpretation remain unverified. |
| Direct categorical interpretation | Response-process evidence plus option-level stability/interpretation evidence; no automatic conversion to a scalar. | Structural wiring: `PASS`; respondent interpretation: `NOT RUN`. | Pilot remains effect-free and explanatory only. |
| Relational interpretation | Response-process evidence and a predeclared coding/adjudication rule for stated relationships. | Schema validation: `PASS`; respondent interpretation and coding study: `NOT RUN`. | Relationships may be displayed as explicitly stated records only; they cannot be inferred or used as hidden weights. |
| Internal structure | A construct-appropriate analysis selected before looking at results, with missingness, local dependence, cross-loading, and alternative structure reported. | `NOT RUN`. | No construct status is upgraded and no coefficient is tuned from synthetic fit. |
| Relations to other variables | Predeclared, non-circular external measures or theoretically justified behavioral/attitudinal relations. | `NOT RUN`. | Morphology remains a source-backed interpretation, not an empirically validated classification. |
| Comparability | Invariance/DIF or an explicit not-estimable conclusion across every intended language, jurisdiction, and comparison group. | `NOT RUN`. | No cross-context or group-comparability claim. |
| Consequences and population use | Review of false precision, label effects, exclusion, burden, privacy, and intended-population coverage. | `NOT RUN`. | No production or public-validity claim. |
| Configuration-to-morphology mapping | Held-out adversarial profiles, configuration traceability, and empirical evidence that the mapping reflects the intended use. | Structural synthetic diagnostics: `PASS`; held-out respondent evidence: `NOT RUN`. | Morphology remains provisional; neither it nor the retained legacy scorer is a validated respondent measure. |

This separation follows the validity-argument distinction in the [AERA/APA/NCME Standards](https://www.apa.org/science/programs/testing/standards), the conceptualization-versus-measurement distinction in [Adcock and Collier](https://doi.org/10.1017/S0003055401003100), and the requirement for a defensible response-generating account in [Borsboom, Mellenbergh, and van Heerden](https://doi.org/10.1037/0033-295X.111.4.1061).

## 3. Stage 0: freeze the intended use before data collection

Before recruiting respondents or changing production effects, create a versioned study record containing:

1. the content version, policy version, morphology model version, source-registry snapshot, and question ids;
2. the intended population, languages, jurisdictions, contexts, and exclusions;
3. the construct-level hypotheses and the reason each item or follow-up is expected to provide evidence;
4. the distinction between reflective, formative, categorical, and relational information for each construct;
5. missingness handling, “No view yet,” “mixed/depends,” confidence, and refusal rules;
6. the primary and secondary analyses, comparison groups, stopping rules, and treatment of deviations;
7. privacy, consent, retention, and separation of research data from the client-side answer/share envelope.

Do not select a new weight, threshold, factor structure, label, or target-block blend after seeing an attractive synthetic or respondent result unless the change is recorded as a new model version with a new validation plan.

## 4. Stage 1: content and expert adjudication

### Review queue

The first queue contains the full production-item audit, 19 quarantined construct-gap and construct/layer-gap candidates, eight direct categorical pilot items, and six relational follow-up definitions. The queue is not a request to rewrite all flagged items automatically. The `split`, `rewrite`, `remap`, `redundant`, `branch-target-metadata`, and `ideology-coded-wording` flags are review signals that require a human decision. Branch-target metadata is editorial coverage information, not a respondent-facing ideology claim.

### Proposed review procedure

Use two independent content reviewers as the default minimum, with a named adjudicator for disagreements. If the project uses another design, record why. The first pass should hide `targetNodeIds` and ideology labels where that is possible, so reviewers judge the respondent-facing claim before being anchored by the intended branch. The adjudication view may then expose the source rationale, legacy effects, target metadata, and neighboring distinctions.

For each item, record:

- the single respondent-facing claim and its layer;
- the construct, facet, conception, or relationship actually elicited;
- whether the wording contains multiple claims, hidden premises, ideological labels, or an unbounded scope;
- the expected response process and plausible alternative interpretations;
- whether “No view yet,” “mixed/depends,” uncertainty, or refusal is meaningfully distinct;
- the source and provenance for the construct and any directional effect;
- the nearest neighboring constructs or ideologies and the exact distinction the item is meant to protect;
- temporal, jurisdictional, linguistic, social-desirability, and false-positive risks;
- disposition: preserve, remap, rewrite, split, redundant, or construct-gap;
- the decision rationale, reviewer ids, disagreement, adjudication, and version.

Agreement statistics may summarize categorical coding when their assumptions fit the design, but a single agreement coefficient is not a substitute for the written disagreement record. Reviewers must not infer that an item is valid merely because it has a source citation or a stable legacy effect.

## 5. Stage 2: cognitive and response-process study

This stage tests how respondents produce answers, not whether a researcher likes the answer or whether the answer matches an anchor.

### Design

Predeclare a purposive participant plan covering the intended language, jurisdiction, literacy/access conditions, and belief heterogeneity. Use at least two rounds: an exploratory round to identify interpretation problems and a revised-item round to check whether those problems were repaired. Define the stopping rule before recruitment rather than declaring saturation after the fact.

Use one-on-one think-aloud and retrospective probing, with neutral prompts such as:

- “What does this question mean to you?”
- “What were you considering when you chose that option?”
- “Which words or assumptions were difficult to interpret?”
- “Did you answer about an ideal, a current institution, a causal explanation, or a personal experience?”
- “What would make another option more appropriate?”
- “What does ‘no view,’ ‘depends,’ or the confidence choice mean to you?”

For direct items, test whether options are mutually understandable and whether respondents treat them as conceptions, causes, values, or labels. For relational follow-ups, test whether priority, condition, resolution, confidence, contradiction, and contestation fields are interpreted as intended rather than as importance, factual knowledge, indecision, or a demand for ideological consistency.

Counterbalance item and follow-up order in the study where order is a possible source of interpretation. The production UI’s current fixed presentation order is an explicit response-process risk until such evidence exists. Record comprehension, retrieval, judgment, and response-selection problems separately, along with social desirability, acquiescence, satisficing, fatigue, and option-visibility problems.

### Outputs

The study must produce an item-level issue log, coded excerpts or structured summaries, revision decisions, unresolved ambiguity, and a before/after version map. It must state which findings support the intended response process, which findings contradict it, and which questions remain untested. Research data must be kept outside the public answer/share payload and minimized to the approved study purpose.

The Eurostat [Handbook of Recommended Practices for Questionnaire Development and Testing Methods](https://ec.europa.eu/eurostat/documents/64157/4374310/13-Handbook-recommended-practices-questionnaire-development-and-testing-methods-2005.pdf) and [AAPOR best-practice guidance](https://aapor.org/standards-and-ethics/best-practices/) are procedural references for this stage. They do not supply local respondent evidence.

## 6. Stage 3: empirical and psychometric validation

The analysis must be construct- and format-specific. The project should not force heterogeneous political commitments into one reflective scale merely because a reliability coefficient is convenient.

### Scalar or directional proxy sets

For a set intended to represent a common construct, preregister:

- the hypothesized dimensional structure and plausible alternatives;
- item-level missingness and response-category use;
- local dependence, cross-loading, wording-direction, and branch-metadata effects;
- reliability or information analysis appropriate to the response format;
- test-retest or longitudinal stability only when stability is part of the intended claim;
- relations to independent theoretically relevant variables;
- consequences of thresholding, labels, and low coverage.

Reliability is not validity. A coherent response pattern can still measure the wrong construct, and a heterogeneous but substantively meaningful configuration need not have one high internal-consistency coefficient. The [Morucci et al. theory-driven measurement paper](https://doi.org/10.1017/S000305542400039X) is the local rationale for specifying item-to-dimension links before estimation.

### Direct categorical items

Evaluate option comprehension, option distinctness, response stability where relevant, relationships to independently measured conceptions or beliefs, and whether respondents select the option for the intended reason. Do not average category labels into a latent ideology score without a separate theory and validation argument. A categorical choice may remain a visible conception record even when it is not a scale indicator.

### Relational evidence

Validate the coding rule for stated relationships, including whether respondents distinguish priority from importance, conditionality from uncertainty, conflict resolution from compromise, and contradiction from simple mixed preference. Use independent coding or adjudication for any open reason field. A relational record may explain a profile without being a scalar predictor of ideology.

### Relations, invariance, and DIF

Use non-circular external variables selected before analysis. Do not use the sorter’s own ideology label, an anchor generated from the same answer map, or a contemporary party/candidate match as the sole criterion for validating the sorter.

Predeclare every intended comparison group and context. Test invariance or differential item functioning only when the design and sample support it; otherwise record `NOT ESTIMABLE` with the reason. Differences may reflect translation, institutional context, historical period, familiarity, or actual belief structure. They must not be collapsed into a universal respondent trait without evidence. The [Bauer review of measurement invariance and DIF](https://doi.org/10.1037/met0000077) is the methodological reference for this boundary.

### Held-out and adversarial evaluation

Keep synthetic fixtures separate from respondent evidence. The held-out structural suite should include:

- neighboring configurations with shared commitments but different conceptions;
- identical policy positions reached through different normative or causal reasons;
- different priority orderings over the same commitments;
- conditional and exception-bearing profiles;
- descriptive-only, normative-only, prescriptive-only, and institutional profiles;
- hybrids, contradictions, weakly ideological profiles, and profiles between canonical categories;
- branch metadata changed while answers remain constant;
- incomplete, all-mixed, no-view, malformed, and stale payloads.

For every failure, identify the lowest responsible layer—question, construct, conception, relationship, weighting, causal belief, priority/conflict rule, institutional inference, or ideological mapping—before editing the scorer. The current morphology audit records that ownership for each adversarial check and includes it in a failure message; this is a debugging contract, not evidence that any layer is valid in respondents. Synthetic reachability, rank, or overlap cannot be used as empirical validation or as a reason for an uncalibrated coefficient.

## 7. Promotion matrix

The following defaults keep the current implementation fail-closed:

| Artifact | May be visible in research UI | May affect production scoring or morphology | Required evidence before promotion |
|---|---:|---:|---|
| Existing facet proxy | Yes, with provisional wording | Only under the existing compatibility contract | Content review for the intended use; later validity evidence remains required for scientific claims. |
| Rewritten or split item | After review as a candidate | No | Adjudicated one-claim wording, response-process evidence, source/provenance, and any construct-specific empirical gate. |
| Direct categorical pilot | Yes | No | Content/adjudication and response-process evidence; empirical evidence appropriate to categorical interpretation. Never silently converted to a scalar. |
| Relational follow-up | Yes as an explicit stated record | No hidden weight or inferred rule | Response-process evidence and reproducible coding/adjudication. Any scoring use needs a new predeclared model and validation study. |
| Construct status `observed` | Yes if the evidence ledger supports it | Not automatically | Construct-specific content, response-process, internal-structure/relations evidence where applicable, and intended-context review. |
| Morphology candidate | Yes as a provisional configuration explanation | No validated identity claim | Source-backed configuration, traceable commitment evidence, held-out logic checks, and empirical evidence for the intended use. |
| New or reorganized ideology node | Research shelf only | No | Strong academic evidence of a substantive ontology error plus a separate ontology decision and validation record. |

Passing a local gate never waives a missing external gate. A failed or inconclusive gate blocks the affected promotion and should identify the lowest layer for repair.

## 8. Evidence ledger template

Every completed study or adjudication should add one row per substantive claim:

| Field | Required content |
|---|---|
| Evidence id | Stable id and version. |
| Claim and unit | Exact item, construct, relationship, configuration, or morphology claim. |
| Intended use | Explanatory profile, research display, scoring, morphology, or other use. |
| Source or study | Citation, protocol, dataset, instrument, or review record. |
| Population/context | Language, jurisdiction, period, recruitment, exclusions, and sample description. |
| Method | Content review, cognitive interview, experiment, survey, longitudinal study, model, or coding study. |
| Preregistered hypothesis | Direction, distinction, stability, relation, or consequence expected before results. |
| Result | Concise result with uncertainty and missing-data treatment. |
| Limitations | Sampling, context, power, measurement, response-process, or generalization limits. |
| Decision | Preserve, remap, rewrite, split, quarantine, promote, or reject. |
| Review and provenance | Reviewer/adjudicator, date, content/policy/model versions, linked implementation/tests, question-design sources, and the substantive source links for the selected option or relationship. |
| Status | `PASS`, `FAIL`, `NOT RUN`, `NOT ESTIMABLE`, or `INCONCLUSIVE`. |

## 9. Local reproducibility commands

These commands provide deterministic repository evidence and do not close the external gates:

```bash
npm run belief:measurement-audit
npm run belief:direct-pilot-audit
npm run belief:morphology-audit
npm run belief:question-coverage
npm run belief:completion-audit
npm run research:coverage
npm run research:anchor-reachability
npm run test:run -- --reporter=dot
npm run build
git diff --check
```

For fixed-artifact browser verification, start the preview server and run the configured suite with a bounded single worker:

```bash
npm run preview -- --host 127.0.0.1 --port 4174
E2E_BASE_URL=http://127.0.0.1:4174 npm run qa -- --workers=1
```

The command results should be recorded with the content, policy, and morphology versions. A build or browser pass proves wiring and runtime behavior for that fixture; it does not prove comprehension, reliability, invariance, population coverage, or empirical classification.

The completion audit is intentionally different from the component audits: it reports `structuralEligible` separately from overall `eligible`. On the current ledger the structural checks pass, while the required cognitive, expert, empirical, invariance, population/consequence, and held-out respondent morphology gates remain `NOT RUN`; the command therefore returns a nonzero exit status and the goal remains incomplete.

## 10. Current evidence ledger snapshot

The current local workstream has executable structural checks for the construct registry, item-audit coverage, canonical target question coverage, direct-item isolation, relational validation, canonical configuration provenance, explicit conceptual coverage, morphology traceability, lowest-responsible-layer diagnostics, belief-first result composition, legacy-scoring preservation, malformed-input rejection, fixed-artifact browser behavior, and objective-level fail-closed completion eligibility. The result contract exposes the primary profile/morphology path separately from the legacy compatibility path; the application and current belief audits use the primary namespace. Those checks are local `PASS` evidence for the contracts they actually exercise.

The following remain the authoritative external status for this objective:

| Gate | Status on 2026-08-30 | Boundary |
|---|---|---|
| Source-backed construct and configuration rationale | `PASS` as provenance/documentation | Supports model shape and terminology, not respondent validity. |
| Production item audit | `PASS` as mechanical coverage | Flags are review signals, not expert adjudication. |
| Direct and relational effect isolation | `PASS` structurally | Evidence is visible and traceable but does not change affinity. |
| Adversarial synthetic profile suite | `PASS` structurally | Tests implementation invariants, not human response behavior. |
| Cognitive/response-process review | `NOT RUN` | No respondent comprehension or interpretation evidence. |
| Expert content adjudication | `NOT RUN` | No independent review decision has been completed for the queue. |
| Empirical reliability/validity | `NOT RUN` | No respondent dataset or preregistered analysis. |
| Invariance/DIF and cross-context comparison | `NOT RUN` | No comparison sample or study. |
| Consequence and population validation | `NOT RUN` | No intended-population or use-consequence evidence. |
| Objective completion eligibility | `INCOMPLETE` | Structural checks pass, but six required external-study gates remain `NOT RUN`; the completion audit exits nonzero. |

Until the `NOT RUN` rows are replaced by study-specific evidence, the belief profile and morphology outputs must retain provisional language, and the goal must not be marked complete.

## 11. Research-candidate response seam

The 19 gap candidates have an optional response seam for inspecting the missing distinctions without treating them as promoted items. The seam uses stable candidate-option ids and a separate `BeliefGapEvidence` record. It is valid to inspect or share a selected response, but the record remains `research_candidate` evidence and is not a production `Question`, `BeliefObservation`, scalar construct measure, morphology fit input, or ontology-affinity contribution. Four candidates exist specifically because the measurement audit now reports declared construct/layer cells that have no production item; this is an explicit design inventory, not a claim that every cell must eventually become a separate scale.

The candidate pilot must be evaluated as an instrument-development artifact. A selected option is not treated as true merely because its design rationale cites scholarship; candidate-level sources describe the proposed wording and interpretation boundary. No-view is preserved for share restoration but is excluded from substantive candidate evidence. Any malformed, duplicate, stale, or source-mismatched candidate record is rejected as a whole before profile construction.

Before any candidate can be promoted into the production bank, retain the current candidate status and complete the evidence ledger for its intended construct and context. At minimum, the review must address response-process interpretation, independent expert content adjudication, neighbor distinctness, cross-context or jurisdictional behavior, empirical reliability/validity where applicable, and consequences for the intended population. A local green build, browser interaction, synthetic fixture, or source-linked option does not close any of those gates.
