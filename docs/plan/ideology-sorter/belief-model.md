# Belief structure and ideological morphology contract

## Status

This document records the first implementation seam for the deeper belief-structure objective. It is an editorial and engineering contract, not a psychometric validation report. The current model is `stated-political-commitment-configuration` version 2, and the current morphology projection is `configuration-projection` version 2.

The existing descriptive, normative, and prescriptive ontology, including its macro, meso, micro, and hybrid relations, remains unchanged. The new layer is additive: it makes the respondent-facing belief representation explicit and leaves the legacy facet-distance scorer available as the compatibility regression baseline. Objective-level gate status is kept separately in [`src/belief-validation.ts`](../../../src/belief-validation.ts), and `npm run belief:completion-audit` fails closed when structural checks pass but required external validation is still open.

## Research boundaries

The research supports the shape of the model, not the validity of this implementation or any respondent-level conclusion.

| Source | What the source supports | What this project infers, and what it does not infer |
|---|---|---|
| [Freeden, *Ideologies and Political Theory*](https://academic.oup.com/book/3196) and [“The Morphological Analysis of Ideology”](https://doi.org/10.1093/oxfordhb/9780199585977.013.0034) | Ideologies can be studied as structured combinations of political concepts whose relationships, relative weights, and meanings vary by context. | A named tradition is represented as a source-backed configuration of commitments and concepts. This does not make a respondent's proximity to a configuration a discovered identity or a truth judgment. |
| [Adcock and Collier, “Measurement Validity”](https://doi.org/10.1017/S0003055401003100) | Conceptualization and measurement are distinct, and validity is tied to the intended use and context. | Every item receives an explicit construct audit before it is used in the belief bridge. The audit is not itself validity evidence. |
| [Morucci et al., “Measurement That Matches Theory”](https://doi.org/10.1017/S000305542400039X) | Theory-driven item-to-dimension identification should precede estimation when dimensions may be related. | Construct mappings are explicit data, and correlated concepts are retained rather than collapsed into one axis. The current facet bridge is still a proxy and no latent model is fitted. |
| [AERA/APA/NCME, *Standards for Educational and Psychological Testing*](https://www.apa.org/science/programs/testing/standards) | Validity arguments require evidence from content, response processes, internal structure, relations to other variables, and consequences. | The implementation reports its evidence gaps and does not call source review, unit tests, or synthetic fixtures empirical validation. |
| [Borsboom, Mellenbergh, and van Heerden, “The Concept of Validity”](https://doi.org/10.1037/0033-295X.111.4.1061) | A validity argument needs a defensible account of how the intended attribute would produce observed responses; association or model fit alone is insufficient. | `Question.effects`, anchor vectors, and the construct bridge are treated as editorial measurement assumptions, not as proof that a latent political attribute caused an answer. |
| [Bauer, “Measurement Invariance and Differential Item Functioning”](https://doi.org/10.1037/met0000077) | Group and context comparability require explicit invariance or differential-item-functioning checks. | Cross-context, jurisdictional, language, and group comparability remain future gates. No such claim is made by the current calculation. |
| [AAPOR survey best practices](https://aapor.org/standards-and-ethics/best-practices/) | Clear wording, one concept per item, explicit missingness, and transparent reporting are useful survey-design safeguards. | Compound wording and missingness are surfaced for review; the heuristic flags do not decide that an item is unusable. |

## Model pipeline

```text
answer map
  -> item-level observations
  -> facet/conception signals, construct signals, and response states
  -> explicit relational evidence where a reviewed direct item or fixture supplies it
  -> stated political-philosophical profile
  -> source-backed ideological configurations
  -> provisional morphology candidates on existing canonical ontology paths
```

The implementation boundary is deliberately one-way. `targetNodeIds` are branch-coverage metadata used by the content and research workbench; they never enter `beliefObservationsFor` or construct aggregation. A respondent answer therefore cannot receive extra evidence merely because a question was authored for a particular ideology branch.

## Construct registry

The registry is intentionally broader than the existing facet list. It distinguishes descriptive claims, normative commitments, and prescriptive or institutional routes while preserving cross-layer relationships.

| Construct | Current status | Current evidence | Explicit gap |
|---|---|---|---|
| Concepts and conceptions | partial | Value, culture, liberty, and institutional proxies | The bank does not ask which conception of a shared concept a respondent endorses. |
| Social order and moral scope | partial | Culture, nation, universalism, solidarity, and ecology proxies | Membership, obligation, and scope conditions are not separately elicited. |
| Diagnosis and causal account | partial | Descriptive power, market, institution, culture, and ecology proxies | Diagnosis, mechanism, confidence, and alternative causes are not separately coded. |
| Legitimacy and authority | partial | Power, democracy, institution, and state-capacity proxies | Effective, accepted, justified, and obligatory authority remain conflated. |
| Distributive principle | partial | Equality, solidarity, and public-provision proxies | The same policy can be chosen for different reasons such as need, desert, reciprocity, capability, or equal standing. |
| Institutional mechanism | partial | Institutionalism, decentralization, provision, ownership, and capacity proxies | The causal route from institution to intended outcome is not separately elicited. |
| Political economy | observed proxy | Market, ownership, allocation, provision, power, and labor-related items | “Observed” means a directional proxy is available, not that a latent scale is validated. |
| Change strategy | observed proxy | Change-domain items and reformism | Transition sequence, acceptable cost, and conditions for rupture or preservation are not separately captured. |
| Priority and conflict rules | not yet measured | No scalar item; explicit relational follow-ups can attach priority, conditionality, conflict-resolution, and contradiction records | No validated scalar measure orders principles or estimates a general conflict rule. |
| Epistemic stance | not yet measured | No-view and mixed states are preserved but are not confidence measures | Confidence, uncertainty reasons, evidence standards, and revisability are absent. |
| Heterodoxy and contestation | not yet measured | Some pluralism-related items remain proxies only | Internal variation, dissent, opposition, and legitimate revision are not separately measured. |

The status vocabulary is intentionally conservative. `observed` and `partial` describe the availability of mapped item signal in this implementation; they do not mean that the construct has passed content, response-process, structural, invariance, or consequential validity review.

## Existing-question audit

`auditBeliefMeasurement(dataset)` covers every production question and returns:

- the question's layer and legacy facet effects;
- the bridged construct ids;
- review flags for ideology-coded branch metadata, coordinated compound wording, conditional or contrastive wording, cross-construct coverage, and duplicate normalized wording;
- a disposition of `preserve`, `remap`, `rewrite`, `split`, `redundant`, or `construct-gap`;
- the current measurement mode and source references.

The audit is non-destructive. A `rewrite`, `split`, or `remap` disposition is a review queue, not a silent content edit. The current production questions are all `facet-proxy` observations. No question is currently declared a direct construct item, and the uncovered construct list is expected to include priority/conflict, epistemic stance, and heterodoxy/contestation until separately researched items are authored and reviewed.

The wording flags are deliberately mechanical first-pass signals. The compound flag is restricted to coordinated predicates or clauses; condition and contrast wording is reported separately because a conditional claim is not automatically double-barrelled. Neither flag is a cognitive interview, expert adjudication, or a claim that an item is invalid. Coordinated noun or adjective phrases can still require cross-construct or expert review. The next content tranche must use the research workbench's source-backed candidate contract, add one respondent-facing claim at a time, and remain quarantined until substantive review and later empirical gates pass.

The profile retains the original facet resolution alongside the broader construct signal. A morphology commitment attached to a researched facet is matched to that facet and layer first; it is not allowed to fall back to an unrelated aggregate construct signal. This preserves distinctions such as liberty versus equality, or ecological limits versus market coordination, until a later reviewed model has evidence for combining them.

### Quarantined gap candidates

The first gap tranche is recorded in `src/belief-gap-candidates.ts` as 15 source-attributed, effect-free candidates. It is deliberately separate from `Question`: these items are not in the production quiz, do not change legacy anchor distance, and cannot raise a construct's production status. They are a research shelf for the next content and response-process review.

| Gap construct | Candidates | Candidate formats | Intended information |
|---|---:|---|---|
| Priority and conflict rules | 5 | Paired priority choice; conditional vignette | Explicit ordering, rights-versus-autonomy tradeoffs, and reform conditions |
| Epistemic stance | 5 | Confidence rating; directional item; open reason | Confidence, revisability, uncertainty practice, and evidence conditions |
| Heterodoxy and contestation | 5 | Directional item; conditional vignette | Conceptual revision, internal dissent, opposition, and movement membership rules |

The options and prompts are hypotheses for cognitive review, not validated scales. A forced choice can expose a stated priority, but it does not explain the reason for that choice; a confidence rating can expose self-reported certainty, but it does not establish accuracy; and an open reason requires a documented coding and adjudication protocol. Promotion to production therefore remains blocked by the same response-process, neighbor-distinctness, cross-context, and empirical gates as ideology-specific candidates.

### Respondent-facing relational supplement

The results page now offers six optional, structured follow-ups in `src/belief-followups.ts`: one each for priority, conditionality, conflict resolution, uncertainty, contradiction, and contestation. Each option has an explicit statement and, where applicable, a rule, condition, resolution, or confidence level. `relationalEvidenceForAnswers` converts only selected recording options into `BeliefRelationalEvidence`; “No view yet” and “no tension” remain missing rather than becoming neutral evidence.

This supplement is deliberately separate from the 1,488-item production bank and from legacy facet-distance scoring. Its construct links include the substantive constructs in the scenario plus `priority-conflict` for priority, conditionality, conflict-resolution, and contradiction records, so the primary profile can show which relational construct is being addressed without changing scalar coverage or signal. It makes a respondent-stated relationship visible in the primary profile and morphology trace, but it does not promote any uncovered scalar construct to measured status, infer accuracy from confidence, or turn a contradiction into a penalty. The wording and missingness boundary follows the project’s survey-method sources and the cautions in [Alvarez and Franklin on respondent uncertainty](https://doi.org/10.2307/2132187), [Luskin and Bullock on preserving “don’t know” responses](https://doi.org/10.1017/S0022381611000132), [Lee and Matsuo on confidence as distinct from knowledge accuracy](https://doi.org/10.1016/j.electstud.2017.11.005), and [vignette placement and order-effect research](https://pmc.ncbi.nlm.nih.gov/articles/PMC4729309/). These are design inputs, not local validation evidence; the fixed presentation order and scenario framing remain response-process risks for later review. The versioned share envelope serializes selected follow-up options as validated pairs alongside the base answer map, while older base-only links remain readable.

### Direct categorical pilot

The results page also offers eight optional direct-belief pilot items in `src/belief-direct-items.ts`. They ask the respondent to select the closest account of a concept, moral scope, causal mechanism, legitimacy basis, distributive reason, institutional route, political economy, or change path. A selection becomes `BeliefDirectEvidence` with the chosen option text, construct links, layer, and source references; it is not converted into a numeric observation. The pilot therefore makes a reason or conception visible without silently changing the legacy scorer or claiming that categorical options constitute a latent scale.

The pilot uses a separate answer map, preserves “No view yet” as missing, validates item and option ids before profile or share use, and serializes selected pairs in the versioned share envelope. Its current output is explicitly provisional and is excluded from morphology calculation pending cognitive review, expert adjudication, response-process evidence, cross-context checks, and empirical validation. This is an implementation seam for the next research loop, not a claim that the eight prompts have passed those gates.

The executable `npm run belief:direct-pilot-audit` checks the pilot’s source and construct links, recordable and no-view options, separation from the production question ids, synthetic evidence validation, profile/morphology trace retention, per-record source provenance, and effect isolation. The current structural result is eight items, four recordable options plus one no-view option per item, 14 distinct source references, no production overlap, eight validated synthetic evidence records, and unchanged legacy layer, combined, and morphology-affinity outputs. Linked constructs expose direct-pilot record ids separately from scalar coverage, signal, and production observation counts, while morphology trace records retain each selected record’s source references. Its report remains explicitly non-cognitive, non-psychometric, non-invariance, non-population, and non-empirical evidence.

### Current audit snapshot

The executable `npm run belief:measurement-audit` report for the current content version 96 records 1,488 production items, evenly distributed as 496 descriptive, 496 normative, and 496 prescriptive items. All 1,488 are facet proxies and zero are direct construct items. The disposition counts and mechanical flags are regenerated by the command because source-backed tranche additions can change them; the current uncovered constructs remain `priority-conflict`, `epistemic-stance`, and `heterodoxy-contestation`.

These counts are a review snapshot, not a quality score. Compound and condition/contrast flags are deliberately mechanical and require human content review before any question is rewritten or removed. The command must be rerun when the dataset changes.

The gap shelf currently contains 15 research candidates: five for each uncovered construct. Their response formats are intentionally heterogeneous because agreement, priority, conditionality, confidence, and reasons are different information requests; no candidate is yet a production observation.

The executable `npm run belief:morphology-audit` also round-trips all 118 current canonical configurations through finite synthetic answer maps directed by each configuration's source-backed commitments. All 118 canonical configurations are source-backed, with zero anchor-only fallbacks; each has commitments, an explicit conceptual commitment, and the five explicit relational-constraint gaps. Every target configuration is present in its candidate set, while rank is retained as a coarse overlap diagnostic rather than a coefficient-tuning objective. The same audit exercises all-mixed, hybrid, weak, and descriptive-only profiles; same-values/different-causal-belief profiles; same-policy/different-principle profiles; alternative priority and conditional rules; unresolved contradiction visibility; direct and relational affinity isolation; and branch-metadata isolation. These fixtures are structural and adversarial diagnostics; they are not respondent, cognitive, psychometric, invariance, population, or empirical validation.

The executable `npm run belief:completion-audit` performs the objective-level reconciliation over the same current dataset. It reports source-attributed synthetic configuration profiles with their commitment layers and evidence traces, checks the response-to-profile-to-morphology path, and exposes the six required external gates that remain `NOT RUN`. Its nonzero exit status is intentional until a study-specific evidence record changes those statuses; it is not a failed implementation test.

## Response and missingness semantics

- Numeric answers preserve the existing `-2..2` scale and are normalized only inside the existing aggregation convention.
- `0` is retained as `mixed` or `depends`; it counts as answered for the existing coverage threshold but is excluded from directional aggregation, directional evidence ids, and morphology support. It is never treated as a directional zero.
- `no-view` produces an explicit `no-view` observation state and no directional value.
- An absent answer produces an explicit `unanswered` observation state and no directional value.
- No missingness state is converted into confidence, ambivalence, contradiction, or a priority rule.

This distinction is important because “I do not know,” “I depend on the circumstances,” and “I endorse a midpoint” require different response-process interpretations. The current answer format records only the first-order state selected by the respondent; it cannot infer the reason.

### Relational evidence boundary

`BeliefRelationalEvidence` is an explicit input contract for information that scalar answers cannot provide. Its closed kinds are `priority`, `conditional`, `conflict-resolution`, `uncertainty`, `contradiction`, and `contestation`. Each record carries the linked substantive and, where applicable, relational constructs, a respondent- or fixture-stated statement, optional rule/condition/resolution/confidence fields, and evidence question ids. The resulting construct records expose `relationalEvidenceCount` and `relationalEvidenceIds` as a non-scalar trace; those fields do not contribute to coverage, signal, weighting, or morphology affinity. `validateBeliefRelationalEvidence` rejects unknown constructs, missing priority competitors, conditional records without a condition, duplicate ids, and references to missing questions or sources.

The calculation never manufactures these records from answer order, co-occurrence, a mixed response, an anchor label, or a target-node tag. When supplied, they are carried into the profile summary and morphology basis as explicit stated relationships. An unresolved contradiction remains visible and does not become an inconsistency penalty or an identity judgment.

The direct-item seam is also independent of the legacy facet effect map: a reviewed direct item produces one construct observation per explicitly declared construct, even when its `effects` map is empty. Any retained legacy effects are not reused to duplicate or redirect that direct evidence.

## Configuration and morphology rules

`configurationForAnchor` reconstructs every existing anchor as an explicit configuration containing:

- definition, boundary, family, ontology placement, variants, neighboring relations, and source references;
- source-backed conceptual commitments and conceptions, descriptive assumptions, causal assumptions, normative commitments, and institutional implications;
- defining, characteristic, and optional-or-contested centrality;
- construct ids for every bridged facet rather than a single hidden “primary” construct;
- full ontology compatibility relations, explicit tension notes, and five `not-established` relational constraints covering priority, conditionality, conflict resolution, epistemic posture, and contestation;
- a `not-established` priority record rather than an invented ordering of commitments.

The resulting configuration has a separate `BeliefConception` record for each represented concept meaning. When a meaning cannot be represented faithfully as a broad facet, the research profile supplies a `ResearchAnchorConception` record whose id belongs to the concept vocabulary, not the facet vocabulary; an optional facet link is available only when a broad proxy is genuinely useful. These explicit records become `indeterminate` concept-conception commitments with source provenance, so they explain a tradition's meaning without becoming directional observations or affinity weights. All 118 canonical configurations now expose source-backed conceptual coverage; the number requiring a separate research-profile record is intentionally left to the executable audit because source-backed tranche additions can change it.

`deriveIdeologicalMorphology` then:

1. stops before named morphology when the existing three-layer coverage threshold is not met;
2. considers only anchors attached to canonical ontology nodes;
3. compares a commitment to its exact observed facet and layer when available, using an aggregate construct proxy only when the configuration has no facet-specific commitment; mixed responses remain visible as ambiguity but cannot dilute or create directional support;
4. counts a multi-construct commitment once while retaining its construct-level evidence trace, so broad bridges cannot silently overweight it;
5. records the evidence question ids, missing defining commitments, counter-signals, and explicit relational evidence behind each provisional candidate;
6. retains the macro/meso/micro placement and existing hybrid relations rather than inventing new taxonomy nodes;
7. states that the result is a configuration projection, not a validated trait, diagnosis, identity, recommendation, or empirical classification.

`BeliefProfile.diagnostics` makes the same boundary machine-readable. It identifies whether the current evidence stops at question coverage, construct coverage, a conception or causal interpretation, a relational rule, or an optional-evidence contract. Each diagnostic carries a status, the affected constructs, any attached evidence question ids, and provenance. These are internal debugging and measurement-review records; they are not respondent judgments and do not claim that the named layer is valid.

The legacy facet scorer remains in `calculateResults` and is covered by its existing tests. The new profile and morphology objects are additional explanatory outputs; they do not silently rewrite the old answer-to-anchor behavior.

## Validation status and next gates

The execution plan and evidence ledger for the remaining gates is [Belief-model validation protocol](belief-validation-protocol.md). It preserves the distinction between local structural evidence and respondent, cognitive, psychometric, invariance, population, and consequence evidence.

### Contextual conception bridge

Contextual or registry-only research profiles may carry source-backed conceptions even when their facet dimensions are intentionally empty. These records preserve meanings that the production facet vocabulary cannot represent faithfully; they remain qualitative research context and do not create respondent observations, scoring weights, morphology candidates, or production activation. V101 adds this bridge for Gandhian Political Thought with ethical self-rule, means–ends nonviolence, constructive self-government, and contested trusteeship/economic duty. The research metadata validator checks conception ids, labels, interpretations, ideology-research provenance, and duplicate prevention.

The current deterministic evidence covers:

- registry and source-reference validation;
- complete item-audit coverage;
- explicit response-state preservation;
- no use of branch target metadata as respondent evidence;
- causal-belief versus unchanged normative/prescriptive fixture separation;
- same-policy/different-principle non-identification;
- canonical-only morphology projection;
- source-attributed, effect-free gap candidates with explicit response-format requirements;
- facet-level commitment matching and single-count weighting for multi-construct bridges;
- explicit relational-evidence validation and traceability through the morphology basis;
- construct-level relational evidence counts and ids, kept separate from scalar observations and affinity;
- structured lowest-responsible-layer diagnostics for coverage, construct gaps, provisional direct/relational evidence, and rejected optional evidence;
- fail-closed behavior below the three-layer coverage threshold;
- legacy unit-test regression coverage.

This is not empirical validation. Before any construct status is promoted beyond a proxy, the project still needs researched direct items, cognitive or response-process review, expert adjudication of the audit queue, held-out adversarial profiles, structural and reliability analysis where appropriate, invariance/DIF analysis across intended contexts, and consequence review. Attractive synthetic output, source citations, or a passing build cannot substitute for those gates.

`src/research.ts` remains the authoring and quarantine boundary for new ideology-specific candidates. A missing belief construct is a measurement gap, not a reason to add another ideology label or to retune an existing anchor until it appears to fit.
