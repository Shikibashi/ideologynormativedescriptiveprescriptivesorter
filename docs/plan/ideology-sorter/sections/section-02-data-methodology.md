# Section 02 — Data and Methodology

## Historical implementation continuation — v13 — 2026-08-26

The live manifest is content version 13 with 492 original questions, 164 in each of the descriptive, normative, and prescriptive layers. It retains the same response semantics, closed facet vocabulary, approximate editorial anchors, and inclusive 50% coverage threshold. Thirty-five canonical anchored targets now have direct four-question-per-layer blocks, while five broad contextual anchors remain visible as research context but are excluded from production neighbor scoring. The v13 Pan-Africanism block is source-backed and provisional, and no cognitive review, respondent evidence, substitute simulation, psychometric calibration, or scientific validity claim is implied. Earlier counts in this section describe historical versioned baselines and do not override the current manifest.

## Current implementation continuation — v14 — 2026-08-27

The live manifest is content version 14 with 504 original questions, 168 in each of the descriptive, normative, and prescriptive layers. It retains the same response semantics, closed facet vocabulary, approximate editorial anchors, and inclusive 50% coverage threshold. Thirty-six canonical anchored targets now have direct four-question-per-layer blocks, while five broad contextual anchors remain visible as research context but are excluded from production neighbor scoring. The v14 Religious Nationalism block is source-backed and provisional, uses the existing parentless hybrid boundary, and does not add an ontology node or change scorer policy. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, or scientific validity claim is implied. Earlier counts in this section describe historical versioned baselines and do not override the current manifest.

## Current implementation continuation — v15 — 2026-08-27

The live manifest is content version 15 with 516 original questions, 172 in each of the descriptive, normative, and prescriptive layers. It retains the same response semantics, closed facet vocabulary, approximate editorial anchors, and inclusive 50% coverage threshold. Thirty-seven canonical anchored targets now have direct four-question-per-layer blocks, while five broad contextual anchors remain visible as research context but are excluded from production neighbor scoring. The v15 Conservative Nationalism block is source-backed and provisional, uses the existing parentless hybrid boundary, and keeps the National Conservatism micro child distinct. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, or scientific validity claim is implied. Earlier counts in this section describe historical versioned baselines and do not override the current manifest.

## Background

This section establishes the framework-independent domain core for the Ideology Layer Sorter. It supplies the fixed content manifest, the facet and anchor registries, the validator, deterministic scoring functions, the versioned share codec, provenance records, and the methodology text consumed by the React shell. The implementation is client-only: answers remain in in-process state unless the user explicitly creates a URL hash share fragment.

The sorter separates three claim types rather than collapsing them into one political label:

- **Descriptive:** what the respondent thinks is true about systems, causes, or outcomes.
- **Normative:** what the respondent regards as valuable, legitimate, desirable, or worth protecting.
- **Prescriptive:** what institutions, policies, or strategies the respondent prefers.

The live MVP contains 600 original questions, 200 in each layer, distributed across eight registered domains. Questions signal 20 registered facets. The static anchor set contains 49 manually authored interpretive anchors; 44 canonical-placement anchors enter production neighbor selection and five contextual anchors remain editorial/research context. Family cardinalities are not treated as equal evidence, and family balancing is a display constraint. Anchors are editorial comparison vectors for this dataset; they are not diagnoses, identity claims, recommendations, scientific results, or claims about current political actors.

The domain dictionary is authoritative for terminology. In particular, `no-view` is missing information rather than neutrality, `mixed / depends` is answered data represented by the midpoint `0`, `internal fit` is a within-dataset similarity signal rather than a probability, and a cross-layer `tension` is explanatory context rather than a contradiction or consistency failure. Political responses and derived profiles are sensitive political data even though the MVP does not send them to a server.

## Requirements

### R-01: Versioned static dataset

Create one immutable, statically bundled manifest containing:

- 600 questions, exactly 200 for each of `descriptive`, `normative`, and `prescriptive`.
- Eight registered domain identifiers and 20 registered facet identifiers.
- 49 editorial anchors across the current source-backed families; 44 canonical-placement anchors are eligible for production scoring and five contextual anchors remain editorial-only. Family cardinality is not treated as a measurement claim.
- A dataset version and a scoring-policy version.
- Stable IDs for every question, facet, anchor, family, domain, and source reference.
- No current party, candidate, manifesto, policy-matching, persuasion, or remote-import data in the MVP.

Content changes must be explicit data changes. The scoring code must not infer political meaning from labels, prompt text, array order, or object-key order.

### R-02: Question contract and response semantics

Each question must satisfy the project contract:

```ts
type Layer = "descriptive" | "normative" | "prescriptive";
type DirectionalAnswer = -2 | -1 | 0 | 1 | 2;
type Answer = DirectionalAnswer | "no-view";

type Question = {
  id: string;
  layer: Layer;
  domain: string;
  prompt: string;
  context?: string;
  effects: Record<string, number>;
  sourceType: "original" | "inspired_by";
  sourceRefs: string[];
  version: number;
};
```

The response labels map as follows:

| Response | Stored value | Information state | Coverage effect |
|---|---:|---|---|
| Strongly disagree | `-2` | directional | answered |
| Disagree | `-1` | directional | answered |
| Mixed / depends | `0` | conditional but answered | answered |
| Agree | `1` | directional | answered |
| Strongly agree | `2` | directional | answered |
| No view yet | `"no-view"` | missing | excluded from facet means; retained in total |

`undefined` is an internal incomplete-state value only. It is never interpreted as `0`, `"no-view"`, or a political position. The question flow prevents advancing without a response, while scoring remains defensive for partial maps.

Each question affects one or two facets. A positive effect preserves the answer direction for that facet; a negative effect reverses it. Effect weights are finite, non-zero values bounded by the active scoring policy. A question's effect map is the inspectable link between the prompt and the layer-specific profile; it is not hidden classifier logic.

### R-03: Facet and anchor contracts

The facet registry is the closed vocabulary used by questions, profiles, anchors, and tension rules. A facet may participate in one or more layers, but every participation rule must be explicit. Unknown facet IDs are validation errors, not dynamically created dimensions.

Each anchor must satisfy the project contract:

```ts
type IdeologyAnchor = {
  id: string;
  label: string;
  family: string;
  summary: string;
  profiles: Record<Layer, Record<string, number>>;
  sourceType: "editorial" | "inspired_by";
  sourceRefs: string[];
  note: string;
  version: number;
};
```

An anchor must provide a finite profile value for every registered facet in every participating layer, using the same bounded profile domain as the scoring policy. The visible label, summary, family, and note must make clear that the record is an approximate interpretive neighbor. No anchor may be presented as a recommendation, endorsement, or discovered identity.

### R-04: Fail-closed dataset validation

Implement `validateDataset` as a pure validator returning structured errors and `assertValidDataset` as the integration guard. Validation must reject, at minimum:

1. Duplicate or empty IDs, invalid layer values, invalid source types, or non-positive versions.
2. Counts that do not equal 540 questions, 180 questions per layer, 20 facets, or 44 anchors.
3. Unregistered domains, facets, families, question effect keys, or source references.
4. Questions with an empty prompt, more than two effect facets, no effect facets, non-finite weights, or out-of-policy weights.
5. Anchors with missing layer/facet profile entries, non-finite values, out-of-policy values, empty notes, or unresolved source references.
6. Missing or empty anchor families. The current data has non-empty source-backed families; it does not require equal family cardinality.
7. Missing dataset/policy versions or methodology content that does not describe the active policy.

The validator must report all discoverable errors in a deterministic order. A development/build/test path must fail when the manifest is invalid. A runtime consumer must not render a layer result from an invalid manifest; it should expose a safe recovery state instead. Validation must not silently repair, coerce, reorder, or invent data.

### R-05: Coverage-aware layer scoring

For each layer, coverage is:

```text
coverage = count(numeric answers for layer) / count(all questions for layer)
```

The eligibility threshold is `0.5`, inclusive. Thus 68 of 136 answered items is eligible, while 67 of 136 is insufficient. `Mixed / depends` contributes one answered item and a numeric midpoint. `No view yet` remains in the layer total but contributes neither to facet numerators nor facet denominators.

For each observed facet, aggregate only answered questions that affect that facet:

```text
facetProfile[f] =
  sum(answerValue(q) * effect(q, f)) /
  (2 * sum(abs(effect(q, f))))
```

If the denominator is zero, the facet is unobserved and must remain absent from the observed profile. It must not be filled with zero. A layer below the threshold returns an `insufficient information` result with coverage counts and no anchor comparison.

### R-06: Deterministic interpretive comparison

For an eligible layer, compare the observed facet vector with each anchor using weighted squared distance over observed facets only. Facets with no answered signal are excluded from both the numerator and normalization denominator. The maximum-distance normalization uses the active policy and the same observed facet set. The resulting display value is an `internal fit` signal rounded only at the presentation boundary; it is never a probability, confidence claim, identity score, or scientific measurement.

Neighbor selection must be deterministic and family-aware:

1. Compute each eligible anchor's distance from the same observed facet set.
2. Select at most one nearest anchor from each family, with ties resolved by stable family ID and anchor ID order.
3. Fill remaining slots from the globally ordered remaining anchors without duplicates.
4. Return no more than three visible interpretive neighbors.

Family balancing limits display concentration; it does not prove that the underlying taxonomy is balanced. The result must expose the family and anchor note needed to interpret that limitation.

### R-07: Cross-layer pulls without a consistency judgment

Implement only explicit, versioned, rule-based cross-layer pull rules. A rule may require observed facet signals in two or more layers, compare them against declared thresholds, and return neutral explanatory copy. A missing or insufficient layer suppresses rules that depend on it. The output uses `cross-layer pull` or `tension` language and never produces a global consistency score, contradiction label, or diagnosis.

### R-08: Inspectable provenance and methodology

Every question and anchor must expose source posture and source references. `original` means the wording is authored for this product; `inspired_by` means the source informed structure or concepts without copying external text or code. Anchor records use `editorial` or `inspired_by`. Source references resolve to a local registry containing enough metadata for a reviewer to understand what informed the record and what reuse boundary applies.

The methodology surface must explain, in plain language and with the active version:

- The three claim layers and their limits.
- The response mapping, including the difference between `mixed / depends` and `no-view`.
- Coverage, the 50% threshold, and why insufficient layers do not receive a forced neighbor.
- Facet aggregation and observed-facet-only distance.
- Family balancing, tie order, and the meaning of `internal fit`.
- Cross-layer pulls as context rather than contradiction.
- Source posture, editorial anchor limitations, and the absence of current-actor data.
- The production-promotion gate: substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical validation, alongside documented provenance.

The same methodology content must be available before the user starts and from the results/methodology surface. Automated checks and source citations do not activate canonical content by themselves.

### R-09: Safe, versioned share codec

The share fragment contains only the validated answer state and the versions needed to interpret it. It must not contain derived profiles, anchor distances, fit language, source text, or arbitrary user-controlled HTML. A proposed envelope is:

```ts
type ShareEnvelope = {
  schemaVersion: number;
  datasetVersion: number;
  policyVersion: number;
  answers: Array<{
    questionId: string;
    value: Answer;
  }>;
};
```

Encoding must normalize entries into stable question-ID order, serialize deterministically, encode UTF-8 as base64url, and place the payload in the documented URL hash key. The codec enforces the implementation constant `MAX_FRAGMENT_LENGTH = 36864` and rejects rather than truncates oversized data; the bound covers the measured complete v15 answer payload of 33,459 characters while retaining a finite denial-of-service guard.

Decoding must be strict and exception-safe. It must reject malformed base64url, invalid JSON, unsupported schema/data/policy versions, wrong value types, and structurally invalid envelopes. Unknown question IDs and invalid individual entries may be discarded only after the envelope is structurally valid; if no valid entries remain, recovery returns to the intro. A stale or malformed hash must never produce a partial political result. The application recomputes all profiles from the current validated manifest.

The hash is not private, authenticated, or encrypted. It may reveal political responses through browser history, clipboard contents, screenshots, referrer behavior, or shared devices. The methodology and share UI must say so. Clipboard handling is a consumer concern for section 04; the codec itself has no network or storage side effect.

### R-10: Preserve the MVP boundary

This section does not add accounts, analytics, answer persistence, an API, a database, adaptive questioning, machine-learning classification, multilingual content, live party/manifesto imports, or scientific validity claims. Any future imported political data requires a separately approved geography/time/provenance policy and a separately versioned dataset.

## Dependencies

### Upstream dependencies

| Dependency | Contract used | Failure behavior |
|---|---|---|
| `section-01-foundation` | React + TypeScript + Vite shell, strict compiler settings, shared type boundary, test scripts | Do not duplicate a second domain layer; stop implementation at the section boundary until the contracts exist. |
| `src/types.ts` | Closed layer, answer, question, facet, anchor, result, policy, and share types | Type errors block the build. |
| `docs/domain-dictionary.md` v3 | Canonical labels such as `no-view`, `internal fit`, `family balancing`, and `fail closed` | Do not introduce competing UI or code vocabulary. |
| `plan.md` and `spec.md` | Counts, scoring policy, scope, and acceptance requirements | A semantic change requires a versioned plan/policy update. |

### Downstream consumers

| Consumer | Uses | Contract |
|---|---|---|
| `section-03-quiz-flow` | Question ordering, response labels, layer/domain metadata, methodology text | Can render the fixed 408-item flow without knowing scoring internals. |
| `section-04-results` | Layer results, coverage, observed facets, neighbors, pulls, restart/share state | Must render `insufficient information` and provenance without substituting its own calculations. |
| Browser URL/Clipboard APIs | Optional local share link | The browser boundary is explicit; failure falls back to selectable text. |

There is no API, database, authentication service, remote answer endpoint, analytics collector, or runtime data fetch. The core functions must be usable in Vitest without a DOM or network.

## Reference Libraries

The core should use the smallest available dependency surface:

| Library or platform API | Use | Boundary |
|---|---|---|
| TypeScript in strict mode | Closed contracts, discriminated results, validator types, and exhaustive layer/answer handling | Required build-time dependency; no runtime political logic is inferred from TypeScript types. |
| React | Consumer of data, methodology, scoring, and share contracts | `src/scoring.ts` and `src/share.ts` remain framework-independent. |
| Vitest | Deterministic validator, scoring, provenance, and codec fixtures | Unit tests must not require a running browser. |
| Playwright | End-to-end verification of the real shell and share recovery | Browser coverage complements, rather than replaces, pure tests. |
| `URL` and `URLSearchParams` | Hash construction and parsing at the browser boundary | The codec receives/returns strings so tests can run without a window. |
| `TextEncoder`/`TextDecoder`, `btoa`/`atob` or a small local UTF-8 base64url adapter | Deterministic share encoding | Reject malformed input; do not add a serializer or compression dependency for the MVP. |

No external political taxonomy, classifier, party database, or remote content library is a runtime dependency. Planning references are the checked-in `plan.md`, `spec.md`, domain analyses, flow-diagram index, and domain dictionary; their terminology must remain aligned with the implementation.

## Implementation

### 1. Define the contracts and policy constants

Extend the section-01 type boundary only where needed. Keep the following concepts distinct:

- `Answer` value and epistemic state.
- `Question` effect map and computed facet signal.
- `FacetProfile` and anchor profile.
- `CoveredLayerResult` and `InsufficientLayerResult`.
- `CombinedResult` and its all-layer `covered`/`insufficient-information` states.
- `DatasetValidationError` and runtime recovery state.
- `ShareEnvelope` and derived result data.

Represent the scoring policy as versioned data rather than scattered literals. It should hold the coverage threshold, effect/profile bounds, distance normalization policy, stable tie order, maximum visible neighbors, cross-layer pull rules, fit-language labels, and the rule that a combined pattern requires all three covered layers and gives them equal weight. The code may use named constants, but each semantic constant must have one owner and be included in the methodology content.

### 2. Author the manifest and provenance registry

In `src/data.ts`, export immutable collections for:

1. `facets`: 20 registry entries with stable IDs, labels, descriptions, and layer participation.
2. `questions`: 540 original prompts, 180 per layer, each linked to one or two facet effects.
3. `anchors`: 44 editorial/inspired-by vectors; 39 canonical-placement records enter production scoring and five contextual records remain outside scoring.
4. `sourceReferences`: local records resolving every `sourceRefs` entry.
5. `scoringPolicy`: the active versioned rules.
6. `methodologyContent`: the inspectable method and limitation copy.
7. `datasetManifest`: the single object passed to validation and scoring.

Keep authored wording separate from computation. Do not derive IDs from labels at runtime, mutate arrays while sorting, or depend on object insertion order. If a question or anchor is revised, increment its content version and update the dataset version according to the release procedure.

The source registry should record, at minimum, a stable reference ID, human-readable title/description, source posture, author or publisher where applicable, URL or local inspiration note, retrieval date when an external reference exists, and the permitted-use note. The registry is provenance context, not a license to copy source wording. Source records must not include live party or candidate data for this MVP.

### 3. Validate before exposing domain functions

Implement a pure validation pipeline with stable error codes, for example:

```ts
type ValidationReport = {
  valid: boolean;
  errors: Array<{
    code: string;
    path: string;
    message: string;
  }>;
};

function validateDataset(manifest: DatasetManifest): ValidationReport;
function assertValidDataset(manifest: DatasetManifest): void;
```

Run `assertValidDataset(datasetManifest)` at the domain-module boundary in development/test builds. The application should receive a typed invalid-manifest state rather than displaying invented or partially validated results in production-like builds. Tests should exercise the report directly so a failure identifies the field and invariant rather than only producing a module-load exception.

Validation must be deterministic: sort errors by path and code, use closed registries, and never apply defaults to malformed records. A valid manifest is a precondition for all scoring and share operations.

### 4. Implement pure layer scoring

`src/scoring.ts` should expose small pure functions with explicit inputs and outputs:

```ts
function getLayerQuestions(
  questions: readonly Question[],
  layer: Layer,
): readonly Question[];

function calculateCoverage(
  questions: readonly Question[],
  answers: AnswerMap,
): Coverage;

function buildFacetProfile(
  questions: readonly Question[],
  answers: AnswerMap,
  policy: ScoringPolicy,
): FacetProfile;

function calculateLayerResult(
  layer: Layer,
  questions: readonly Question[],
  anchors: readonly IdeologyAnchor[],
  answers: AnswerMap,
  policy: ScoringPolicy,
): LayerResult;

function detectCrossLayerPulls(
  profiles: LayerProfiles,
  coverage: LayerCoverage,
  rules: readonly CrossLayerPullRule[],
): readonly CrossLayerPull[];
```

The result calculation order mirrors `scoring-flow.mmd`:

```text
partition questions by layer
  -> count coverage
  -> apply inclusive threshold
  -> aggregate observed facet signals
  -> calculate observed-facet-only distances
  -> normalize internal fit at the display boundary
  -> select family-balanced neighbors
  -> evaluate eligible cross-layer pull rules
```

Do not round intermediate facet values or distances. Do not use an unobserved facet as a zero vector. Do not calculate a neighbor for a layer that fails coverage. Keep the answer map immutable and return new objects so repeated calculation is deterministic.

### 5. Implement the share codec as a narrow serialization boundary

`src/share.ts` should export `encodeShare` and `decodeShare` plus typed success/failure results. The encoder receives a validated answer map and current dataset/policy metadata; it does not receive or serialize a computed result. It must:

1. Omit `undefined` entries and retain explicit `"no-view"` entries.
2. Keep only question IDs known to the current manifest.
3. Sort entries by question ID and serialize the same envelope shape every time.
4. Encode UTF-8 JSON as strict base64url and attach the documented hash key.
5. Reject the result if the bounded length is exceeded.

The decoder must check the length before decoding, validate the envelope version fields, validate every value against the closed answer union, and return a structured `invalid`, `stale`, or `valid` result. It must never execute decoded content or use decoded strings as HTML. The consumer may ignore unknown question IDs after the envelope passes structural validation, which permits a safe additive content change within an explicitly compatible dataset version. It must reject unsupported dataset/policy versions rather than guessing how old answers map to new semantics.

On a valid envelope, return only a normalized `AnswerMap`; the application recomputes coverage, profiles, neighbors, and pulls from current code and data. On malformed or stale input, return a safe recovery result that the shell can use to show the intro and a concise explanation. The codec does not write local storage, send telemetry, or call the network.

### 6. Publish methodology and provenance to consumers

Export structured methodology sections rather than forcing UI components to duplicate policy prose:

```ts
type MethodologySection = {
  id: string;
  title: string;
  body: string;
  bullets?: readonly string[];
};
```

The content should include the active dataset/policy versions, response table, formula summary, coverage policy, combined-pattern gate and equal-layer rule, family-balance limitation, source posture, share privacy warning, and editorial-review posture. Question and anchor detail views should resolve `sourceRefs` through the registry and display the record's version and note. If provenance is incomplete, the record is withheld by validation rather than shown with an implied source.

### 7. Integrate without duplicating domain decisions

The quiz flow owns navigation and answer collection. The results view owns layout, labels, and copy-link behavior. Neither owns facet arithmetic, anchor distances, family selection, tension detection, or share parsing. The composition root passes validated data and pure-function results into those views.

The UI must preserve the distinction between:

- `No view yet` and a numeric midpoint.
- `Insufficient information` and a covered result.
- `Internal fit` and probability or identity.
- `Combined pattern` and an overall winner or identity verdict.
- `Interpretive neighbor` and recommendation.
- `Cross-layer pull` and contradiction.

## Test Scenarios

All scenarios are deterministic and should be represented in Vitest unless they require the real browser shell, in which case the corresponding Playwright case is noted.

| ID | Area | Setup | Expected result |
|---|---|---|---|
| DM-01 | Manifest counts | Load the canonical manifest. | Validator passes exactly 540 questions, 180 per layer, 20 facets, 44 editorial anchors, 39 canonical scoring anchors, and the current non-empty anchor families. |
| DM-02 | Duplicate IDs | Add duplicate question, facet, anchor, or source IDs. | Validator returns stable duplicate-ID errors and no result can be calculated. |
| DM-03 | Question shape | Remove a prompt, use an unknown layer/domain/facet, or provide zero/three effects. | Validator rejects the exact path and does not coerce the record. |
| DM-04 | Weight bounds | Use `NaN`, infinity, zero, or an out-of-policy effect weight. | Validator rejects the weight; scoring is not invoked. |
| DM-05 | Anchor completeness | Remove one layer/facet profile entry or use a non-finite/out-of-policy value. | Validator rejects the anchor and reports the missing/invalid path. |
| DM-06 | Provenance closure | Use an unresolved `sourceRefs` entry or an unsupported source type. | Validator fails closed; no source note is rendered for the invalid record. |
| DM-07 | Layer partition | Provide answers for all three layers. | The question sets remain disjoint and contain exactly 168 items each; input order does not change partitioning. |
| DM-08 | Coverage boundary | Answer 83, then 84 of 168 items with numeric values. | The first layer is insufficient; the second is eligible exactly at `0.5`. |
| DM-09 | No-view semantics | Mark every unanswered item as `"no-view"`. | Coverage is zero, facet denominators remain zero, and no profile or neighbor is returned. |
| DM-10 | Mixed semantics | Answer a layer with `0` values labelled `Mixed / depends`. | Each `0` counts as answered, contributes zero directional signal, and remains distinguishable in method/coverage metadata. |
| DM-11 | Partial map | Omit an answer key in a direct scoring call. | The item is treated as incomplete/missing for safe calculation; it never becomes zero or a political response. |
| DM-12 | Facet aggregation | Use two questions with opposite effects on one facet. | The weighted signed average matches the declared formula and uses only answered contributing items. |
| DM-13 | Unobserved facet | Answer items that do not affect a particular registered facet. | That facet is absent from the observed vector; it is not inserted as zero before distance calculation. |
| DM-14 | Distance normalization | Compare the same answer profile with anchors while changing only the set of observed facets. | Distance and internal fit use the same observed facet set and policy normalization; no hidden missing-facet penalty appears. |
| DM-15 | Family balancing | Create tied anchor distances within and across families. | At most one nearest anchor per family is selected first, ties follow stable family/ID order, and the final list has no duplicates and at most three entries. |
| DM-16 | Tension rules | Provide eligible profiles that meet one cross-layer pull rule, then remove a required layer signal. | The first case emits neutral explanatory pull text; the second suppresses the rule without a contradiction or consistency score. |
| DM-17 | Methodology contract | Change a policy constant without changing methodology content. | A policy/content consistency test fails and identifies the missing explanation. |
| DM-18 | Share round trip | Encode a normalized answer map, decode it, and compare maps. | The result is deterministic and round-trips numeric and explicit `"no-view"` values without serializing derived results. |
| DM-19 | Share determinism | Encode the same map with different insertion order. | The hash payload is byte-for-byte identical because entries are sorted by question ID. |
| DM-20 | Share malformed input | Supply an empty, oversized, invalid-base64url, invalid-JSON, or wrong-schema hash. | Decoder returns a typed invalid result, never throws, never evaluates content, and the app recovers to intro. |
| DM-21 | Share staleness | Use unsupported schema, dataset, or policy versions. | Decoder returns `stale`; the app does not partially restore or calculate a result from the old semantics. |
| DM-22 | Share unknown IDs | Add an unknown question ID to an otherwise valid envelope. | The unknown entry is ignored after structural validation; known valid entries restore, and an envelope with no known entries recovers safely. |
| DM-23 | Share invalid entries | Mix valid entries with wrong answer types or out-of-range numbers. | Invalid entries are discarded without coercion; no invalid value reaches scoring. |
| DM-24 | Privacy boundary | Run the full flow while monitoring browser requests and storage APIs. | No answer-storage network request, analytics request, or implicit local-storage write occurs. |
| DM-25 | Browser recovery | Open a valid, stale, and malformed hash in Playwright. | Valid state resumes/recomputes; stale/malformed state shows safe recovery and no broken results page. |
| DM-26 | Recalculation | Calculate results twice from the same immutable map and manifest. | Results are deeply equivalent and no input collection is mutated. |

## Implementation Strategy

Use the section dependency order and keep each step reviewable:

1. **Contract alignment:** confirm section-01 types, the dictionary v3 terms, the manifest counts, and the `scoring-flow.mmd`/`share-flow.mmd` node order. Do not introduce a parallel type or data layer.
2. **Manifest first:** add the registry and authored records with stable versions and source references. Run the validator before adding UI consumers.
3. **Validator second:** make malformed data fail at the manifest boundary and add fixture factories only in tests. Test errors by code/path, not only by snapshot text.
4. **Scoring third:** implement coverage, profile aggregation, distance, family balance, and pull rules as pure functions. Keep rounding and user-facing wording at the boundary.
5. **Share fourth:** implement deterministic encode/decode and stale/malformed recovery without adding storage or network behavior.
6. **Methodology fifth:** export the same active policy and provenance data that scoring uses so the UI cannot drift from the computation.
7. **Consumer integration:** expose stable functions/results to the quiz and results sections. UI work may add presentation copy, but it must not reimplement domain decisions.
8. **Verification:** run unit fixtures, strict build, browser flow tests, static security checks, and a manual provenance/methodology review. Any failed gate keeps the section incomplete.

Changes to question wording, effects, anchor profiles, source posture, policy thresholds, or share schema are semantic changes. Record them in the relevant version fields, add regression fixtures, and review the methodology text before treating the new dataset as canonical. Future production promotion requires documented provenance, substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical validation; automated probes are design aids only.

## Quality Gate

The section passes only when all of the following are true:

- `validateDataset` returns zero errors for the canonical manifest and detects every intentionally malformed fixture.
- The manifest counts and family structure match the plan: 540 questions, 180 per layer, 20 facets, 44 editorial anchors with 39 canonical scoring anchors, and non-empty source-backed anchor families. Equal family cardinality is not treated as a measurement claim.
- Coverage is inclusive at 50%; `no-view` is missing, while `mixed / depends` is answered zero.
- Facet aggregation, observed-facet-only distance, internal-fit normalization, family balancing, stable ties, and pull rules have deterministic unit evidence.
- Insufficient layers never receive an anchor comparison, and no invalid/partial manifest reaches a result renderer.
- Source references close to the local provenance registry; each record exposes source posture, version, and note; no copied external text/code or current political actor data is introduced.
- Share encoding is deterministic, bounded, schema/data/policy-versioned, strict, exception-safe, and limited to validated answer state.
- Malformed, stale, unknown, and invalid share entries recover safely without evaluating or rendering decoded HTML.
- The methodology text explains every active scoring rule, its limitation, the share privacy warning, and the editorial-review posture.
- `npm run build` and `npm test -- --run` pass after this section is integrated.
- Playwright confirms valid restore, malformed/stale recovery, and no answer-storage network request.
- Static inspection finds no `eval`, dynamic HTML injection, remote answer endpoint, analytics collector, or local-storage write in the domain core.

## Risk & Rollback

| Risk | Consequence | Mitigation | Rollback trigger |
|---|---|---|---|
| Editorial anchor bias | The visible neighbor set may reflect the taxonomy or author more than the respondent's answers. | Keep anchors inspectable, expose family/source notes, use family balancing only as a display constraint, and require substantive neighbor-distinctness plus applicable cross-cultural/jurisdictional review before production promotion. | Any review finds an anchor represented as objective truth, recommendation, or diagnosis. |
| Ambiguous or double-barreled wording | Effects become uninterpretable and layer separation weakens. | Keep one claim per item, retain original wording, require provenance, and hold future revisions for documented wording review. | A review cannot state the intended layer, actor, scope, or response frame unambiguously. |
| Missing data treated as neutrality | Results overstate certainty and misdescribe respondents with no view. | Use a closed `"no-view"` value, explicit coverage counts, no zero imputation, and threshold tests. | Any code path turns missing/undefined into numeric zero. |
| Taxonomy density or correlated effects | A family or facet can dominate display independent of the answer set. | Version the registry, expose counts, compare observed facets only, and document family balancing's limits. | Anchor selection changes solely because an unobserved facet was filled or a family is overrepresented. |
| Dataset/policy drift | Old answers could be interpreted under new semantics. | Include dataset and policy versions in the envelope and reject unsupported combinations. | A semantic content/policy change is made without a version bump or fixture update. |
| Malformed or hostile share hash | The app could throw, show stale output, or execute untrusted content. | Bound before decode, strict-parse, validate closed values, recompute results, and fail closed. | Any malformed hash reaches scoring, DOM injection, or an uncaught exception. |
| Share privacy exposure | A user may mistake a URL hash for private storage. | Use no server, warn that hashes can reveal answers, offer explicit share action, and provide recovery without persistence. | UI calls the hash private/secure or silently stores answers elsewhere. |
| Provenance/licensing confusion | Source-inspired content may be mistaken for copied or endorsed material. | Local source registry, source posture, usage notes, original wording, and a manual review gate. | A record cannot identify its inspiration boundary or includes copied source material. |
| Over-strict validator blocks a safe additive change | Content iteration becomes unnecessarily brittle. | Keep error codes actionable, permit unknown IDs only inside a structurally valid compatible share envelope, and review policy changes explicitly. | A valid record is silently dropped or a validator default changes semantics. |

Rollback is static and versioned because the MVP has no server state or migration system:

1. Stop the release if the quality gate fails; do not publish a partially validated manifest.
2. Revert the content/policy/scoring change as one compatible unit to the last validated static artifact.
3. Restore the previous dataset and policy versions together. Never keep new semantics with old labels or old share interpretation.
4. Reject share fragments whose versions are no longer supported rather than guessing or migrating silently; show safe recovery and let the user restart.
5. If a backward-compatible decoder is later approved, add an explicit migration function and fixtures before accepting old versions. It must never be an implicit fallback.

## Acceptance Criteria

- [ ] The section is self-contained and its domain boundary is clear: static data, validation, scoring, provenance, methodology, and share codec.
- [ ] The implementation uses the existing React + TypeScript + Vite plan and keeps core calculations framework-independent.
- [ ] The canonical manifest contains 540 original questions with exactly 180 per layer, eight domains, 20 facets, and 44 editorial anchors; 39 canonical-placement anchors enter production scoring and five contextual anchors remain outside scoring.
- [ ] All question and anchor records use closed layer/source contracts, stable versions, one or two explicit question facet effects, and resolvable source references.
- [ ] The validator fails closed on count, registry, shape, weight, profile, family, version, and provenance errors and reports deterministic paths/codes.
- [ ] Directional values map to `-2..2`; `mixed / depends` is answered `0`; `no-view` is missing and never zero-imputed.
- [ ] Coverage is `answered / layer total`, with an inclusive 50% eligibility threshold and an explicit insufficient-information result below it.
- [ ] Facet profiles use signed effect-weighted averages over answered items and omit unobserved facets rather than filling them with zero.
- [ ] Anchor comparison uses observed-facet-only weighted squared distance, versioned normalization, stable ties, and family-balanced selection of no more than three interpretive neighbors.
- [ ] The combined result is withheld below all-layer coverage, and when covered it averages three full-precision layer fits equally while preserving the separate layer results.
- [ ] Cross-layer output consists only of explicit, coverage-aware descriptive pulls/tensions; there is no contradiction or consistency score.
- [ ] Methodology content and provenance records are inspectable before the quiz and from results, including source posture, limitations, and the editorial-review posture.
- [ ] The share codec serializes only validated answer state plus schema/dataset/policy versions, is deterministic and bounded, and never serializes derived political interpretations.
- [ ] Malformed, stale, invalid, oversized, and unknown share inputs recover safely without exceptions, DOM injection, network calls, or silent semantic migration.
- [ ] Unit tests cover DM-01 through DM-24 or equivalent evidence, and browser tests cover DM-25 plus the end-to-end flow consumers require.
- [ ] Strict build, unit tests, static security checks, and browser checks pass before section completion is reported.
- [ ] The implementation adds no API, database, accounts, analytics, live political data, adaptive logic, machine-learning classifier, or scientific-validity claim.

## Previous v7 verification boundary — 2026-08-26

The active data contract is content version 7: 348 original questions, 116 per layer, 20 facets, 28 editorial anchors, 23 canonical scoring anchors, and five contextual-only bridge anchors. The complete share fragment was measured at 22,274 characters, so `MAX_FRAGMENT_LENGTH = 32768` remains finite and rejects oversize payloads without truncation. The coverage audit reports 107 ontology nodes plus 12 registry entries, 23 dedicated-scored targets, 79 catalog-only targets, five contextual-only anchors, 12 registry-only entries, and 1,428 effect-free candidates. The eight new target blocks remain provisional source-backed editorial content; no cognitive review, respondent evidence, substitute simulation, or psychometric/validity evidence is claimed.

## Current v9 data boundary — 2026-08-26

The active data contract is content version 9: 432 original questions, 144 per layer, 20 facets, 35 editorial anchors, and 30 canonical scoring anchors. Populism and Mutualism add source-backed 4/4/4 target-tagged blocks over existing canonical meso nodes; seven canonical meso holds remain catalog-only, and five contextual bridge anchors remain outside production scoring. The scoring policy remains version 3. The 1,428 research candidates remain effect-free and quarantined. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## Current v8 verification boundary — 2026-08-26

The active data contract is content version 8: 408 original questions, 136 per layer, 20 facets, 33 editorial anchors, 28 canonical scoring anchors, and five contextual-only bridge anchors. The complete v8 answer fragment round-trips under the finite `MAX_FRAGMENT_LENGTH = 32768` guard; oversized input remains rejected without truncation. The coverage audit reports 107 ontology nodes plus 12 registry entries, 28 dedicated-scored targets, 74 catalog-only targets, five contextual-only targets, 12 registry-only targets, and 1,428 effect-free candidates. The five new target blocks remain provisional source-backed editorial content; no cognitive review, respondent evidence, substitute simulation, or psychometric/validity evidence is claimed.

## Current v10 data boundary — 2026-08-26

The active data contract is content version 10: 456 original questions, 152 per layer, 20 facets, 37 editorial anchors, and 32 canonical scoring anchors. Radical Conservatism and Reactionary Conservatism add source-backed 4/4/4 target-tagged blocks over existing canonical meso nodes; five canonical meso holds remain catalog-only, and five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## Current v11 data boundary — 2026-08-26

The active data contract is content version 11: 468 original questions, 156 per layer, 20 facets, 38 editorial anchors, and 33 canonical scoring anchors. Islamism adds a source-backed 4/4/4 target-tagged block over the existing canonical meso node and receives a provisional anchor. The four remaining canonical meso holds—Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only; five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## Current v12 data boundary — historical — 2026-08-26

The active data contract is content version 12: 480 original questions, 160 per layer, 20 facets, 39 editorial anchors, and 34 canonical scoring anchors. Ordoliberalism adds a source-backed 4/4/4 target-tagged block over the existing canonical micro node under Liberalism and receives a provisional anchor. The four remaining canonical meso holds—Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only; five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The Ordoliberalism boundary is competition as an institutional order, a capable rule-bound state that prevents private concentration, and a limited social-market floor. The Oxford Handbook, Hayek, and SEP Liberalism references support construct terminology and item-authoring rationale only. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## Files

| File | Responsibility | Change owner |
|---|---|---|
| `src/types.ts` | Closed contracts for layers, questions, answers, facets, anchors, policies, layer results, provenance, and share envelopes. | Section 01 contract; extend only when this section exposes a missing contract. |
| `src/data.ts` | Versioned 600-question manifest, 20-facet registry, 49 editorial anchors, source registry, scoring policy, methodology content, and manifest validation entry point. | Section 02. |
| `src/scoring.ts` | Pure coverage, facet aggregation, distance, internal-fit normalization, family balance, layer results, and cross-layer pull functions. | Section 02. |
| `src/share.ts` | Strict bounded versioned share encode/decode and typed recovery results. | Section 02. |
| `src/scoring.test.ts` | Validator and deterministic scoring fixtures, including coverage, no-view, mixed, ties, family balancing, observed facets, and pulls. | Section 02. |
| `src/share.test.ts` | Share round-trip, determinism, malformed/stale/unknown-entry, bounds, and privacy-boundary fixtures if the repository keeps codec tests separate. | Section 02; otherwise these cases may live in `src/scoring.test.ts`. |
| `src/App.tsx` | Consumer boundary for methodology display, validated data, results, and share recovery; no duplicate scoring. | Sections 03/04. |
| `tests/sorter.spec.ts` | Browser verification of valid restore, safe malformed/stale recovery, and no remote answer storage. | Sections 03/04. |
| `docs/plan/ideology-sorter/flow-diagrams/scoring-flow.mmd` | Implementation order for partition, coverage, threshold, aggregation, distance, family balance, and pulls. | Read-only planning reference. |
| `docs/plan/ideology-sorter/flow-diagrams/share-flow.mmd` | Implementation order for decode/validate/restore and encode/clipboard boundaries. | Read-only planning reference. |
| `docs/domain-dictionary.md` | Canonical domain vocabulary and disallowed shorthand. | Read-only planning reference; do not duplicate or edit in this section task. |

## Historical v13 data boundary — 2026-08-26

The active data contract is content version 13: 492 original questions, 164 per layer, 20 facets, 40 editorial anchors, and 35 canonical scoring anchors. Pan-Africanism adds a source-backed 4/4/4 target-tagged block over the existing canonical micro node under Nationalism and receives a provisional anchor. The four remaining canonical meso holds—Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only; five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

## Current v14 data boundary — 2026-08-27

The active data contract is content version 14: 504 original questions, 168 per layer, 20 facets, 41 editorial anchors, and 36 canonical scoring anchors. Religious Nationalism adds a source-backed 4/4/4 target-tagged block over its existing canonical meso hybrid node and receives a provisional anchor without inventing a canonical parent. The three remaining canonical meso holds—Conservative Nationalism, National Socialism, and Neo-Fascism—remain catalog-only; five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined. The Religious Nationalism source records support public religion–nation fusion, comparative variation, and boundary wording only; they do not validate the local vector or respondent classification.

The Pan-Africanism boundary is transnational African and diasporic solidarity, continuing colonial/racial power, collective self-determination, and cross-border cooperation without requiring one continental-state design. The Oxford and Cambridge references support construct terminology, internal variation, neighbor boundaries, and item-authoring rationale only. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## Current v15 data boundary — 2026-08-27

The active data contract is content version 15: 516 original questions, 172 per layer, 20 facets, 42 editorial anchors, and 37 canonical scoring anchors. Conservative Nationalism adds a source-backed 4/4/4 target-tagged block over its existing parentless canonical meso hybrid node and receives a provisional anchor. Its National Conservatism micro child remains distinct. National Socialism and Neo-Fascism remain catalog-only; five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The source records support a contested conservative-national formation, inherited continuity, bounded civic solidarity, sovereignty, institutional stewardship, and comparative caution; they support terminology and item-authoring only. The complete v15 share fragment measures 33,459 characters and is accepted under the finite `MAX_FRAGMENT_LENGTH = 36864` guard. No local vector, respondent interpretation, cognitive evidence, empirical validity, or population generalization is claimed.

## Current v16 data boundary — 2026-08-27

The active data contract is content version 16: 528 original questions, 176 per layer, 20 facets, 43 editorial anchors, and 38 canonical scoring anchors. National Socialism adds a source-linked 4/4/4 target-tagged block over its existing canonical meso node and receives a provisional anchor. The prompts are explicitly scoped to German National Socialism, especially the interwar movement and the 1933–1945 regime; generic nationalism, generic authoritarianism, and current-actor inference are outside the target boundary. Neo-Fascism remains catalog-only, and five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The [Oxford Handbook of the Weimar Republic chapter on National Socialism](https://academic.oup.com/edited-volume/40697/chapter-abstract/348423596), the [Oxford Handbook of Political Ideologies chapter on Fascism](https://academic.oup.com/edited-volume/34324/chapter-abstract/291337436), and the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510) support historical terminology, construct boundaries, provenance, and original item-authoring rationale only. The complete v16 share fragment measures 34,275 characters and remains under the finite `MAX_FRAGMENT_LENGTH = 36864` guard. No local vector, respondent interpretation, cognitive evidence, empirical validity, or population generalization is claimed.

## Current v17 data boundary — 2026-08-27

The active data contract is content version 17: 540 original questions, 180 per layer, 20 facets, 44 editorial anchors, and 39 canonical scoring anchors. Civic Nationalism adds a source-linked 4/4/4 target-tagged block over its existing canonical micro node under Nationalism and receives a provisional anchor. The block treats civic membership as context-sensitive and does not use civic and ethnic nationalism as a universal binary; jurisdictional, historical, and institutional variation remains explicit. Neo-Fascism remains catalog-only, and five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The [Oxford Research Encyclopedia treatment of Nationalism](https://academic.oup.com/edited-volume/62239/chapter-abstract/550750941), [Pehrson's chapter on argumentative contexts of national identity](https://doi.org/10.1093/oso/9780198842545.003.0008), and [Laborde's account of civic patriotism](https://www.cambridge.org/core/journals/british-journal-of-political-science/article/abs/from-constitutional-to-civic-patriotism/9C7723CE5D8DE5AF316783A224D1BB16) support terminology, context-sensitive boundaries, provenance, and original item-authoring rationale only. The complete v17 share fragment measures 35,075 characters and remains under the finite `MAX_FRAGMENT_LENGTH = 36864` guard. No local vector, respondent interpretation, cognitive evidence, empirical validity, or population generalization is claimed.

## Current v18 data boundary — 2026-08-27

The active data contract is content version 18: 552 original questions, 184 per layer, 20 facets, 45 editorial anchors, and 40 canonical scoring anchors. Black Nationalism adds a source-linked 4/4/4 target-tagged block over its existing canonical micro node under Nationalism and receives a provisional anchor. The block requires a joint Black collective dignity or linked-fate claim, anti-Black institutional/material power analysis, collective autonomy or self-determination, and self-directed institutions while preserving state-seeking, community-national, cultural, economic, diasporic, reformist, and revolutionary variation. Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives, Neo-Fascism remains a high-risk hold, and five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The [Cambridge Guide to African American History chapter on Black Nationalism](https://www.cambridge.org/core/books/abs/cambridge-guide-to-african-american-history/black-nationalism/13C0A82189B4F1086339C2E84BACB6A3), [Avilez's Oxford Research Encyclopedia treatment](https://academic.oup.com/edited-volume/61883/chapter-abstract/547804714), [Jagmohan's Political Theory article](https://doi.org/10.1177/0090591719897569), and [Spence, Shaw, and Brown's Du Bois Review distinction](https://www.cambridge.org/core/journals/du-bois-review-social-science-research-on-race/article/abs/true-to-our-native-land-distinguishing-attitudinal-support-for-panafricanism-from-black-separatism/2378116FD1172FA43A339603DCB11) support terminology, historical variation, boundary writing, provenance, and original item authoring only. The complete v18 share fragment measures 35,875 characters and remains under the finite `MAX_FRAGMENT_LENGTH = 36864` guard. No local vector, respondent interpretation, cognitive evidence, empirical validity, or population generalization is claimed.

## Current v20 data boundary — 2026-08-27

The active data contract is content version 20: 576 original questions, 192 per layer, 20 facets, 47 editorial anchors, and 42 canonical scoring anchors. Anti-Colonial Nationalism adds a source-linked 4/4/4 target-tagged block over its existing canonical micro node under Nationalism and receives a provisional anchor. The block jointly tests colonial or externally imposed domination, collective self-rule, open-ended self-determination, solidarity, accountable institution-building, and anti-imperial transformation while preserving historical variation. Arab Nationalism and Maoism remain catalog-only alternatives, Neo-Fascism remains a high-risk hold, and five contextual bridge anchors remain outside production scoring. The ontology remains 107 nodes plus 12 registry entries, with 9 macro, 38 meso placements including five contextual, and 60 micro nodes; the canonical inventory remains 9/33/60. The scoring policy remains version 3, and the 1,428 research candidates remain effect-free and quarantined.

The [Getachew chapter](https://academic.oup.com/princeton-scholarship-online/book/14344/chapter-abstract/168273047), [Go and Watson comparative study](https://www.cambridge.org/core/journals/european-journal-of-sociology-archives-europeennes-de-sociologie/article/abs/anticolonial-nationalism-from-imagined-communities-to-colonial-conflict/A612DBBD02197ACF4612497676202CFD), [Simpson chapter](https://academic.oup.com/edited-volume/28076/chapter-abstract/212122667), [Sultan article](https://www.cambridge.org/core/journals/american-political-science-review/article/abs/selfrule-and-the-problem-of-peoplehood-in-colonial-india/9677B7E1E995EE5F118C75FE76FDC45D), and [Walker article](https://academic.oup.com/past/article/242/1/227/5298765) support historical terminology, construct boundaries, provenance, and original item-authoring rationale only. The complete v20 share fragment measures 37,651 characters and is accepted under the finite `MAX_FRAGMENT_LENGTH = 40960` guard. No local vector, respondent interpretation, cognitive evidence, empirical validity, or population generalization is claimed.
## v21 continuation note

The v21 Arab Nationalism tranche extends the same three-layer method to an existing canonical micro node without changing the facet geometry or scoring policy. Its 12 prompts separate descriptive mechanisms of Arab political-community formation and colonial/post-Ottoman/state-making mediation, normative solidarity, self-government, and equal standing, and prescriptive cross-border cooperation, accountable public development, and revisable institutions. The sources are historical and theoretical provenance for terminology and authoring rationale only. The active bank now contains 588 prompts (196 per layer), 48 editorial anchors, and 43 canonical scoring anchors; the 1,428 effect-free research candidates remain quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v22 continuation — Maoism

The v22 Maoism tranche extends the same three-layer method to the existing canonical `Socialism → Communism → Maoism` path without changing facet geometry or scoring policy. Its 12 original target-tagged prompts separate descriptive mechanisms of Sinification, agrarian and colonial conditions, practice, contradiction, rectification, mass mobilization, and institutional hierarchy; normative equality, solidarity, collective emancipation, criticism, and anti-bureaucratic standing; and prescriptive mass-line organization, collective/public ownership, state capacity, rectification, local adaptation, and social provision. The Oxford and Cambridge sources are provenance for terminology, historical scope, variation, and authoring rationale only. The active bank contains 600 prompts (200 per layer), 49 editorial anchors, and 44 canonical scoring anchors; the 1,428 effect-free research candidates remain quarantined. Maoism is provisional editorial measurement, not a regime judgment, operational guide, respondent classifier, or validated scale. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation is claimed.

## Current v23 continuation — Council Communism

The v23 Council Communism tranche extends the same three-layer method to the existing canonical `Socialism → Communism → Council Communism` path without changing facet geometry or scoring policy. Its 12 original target-tagged prompts separate descriptive mechanisms of worker-council authority, institutional substitution, elite autonomy, and market-mediated class dependence; normative direct democracy, equality, solidarity, liberty, and common control; and prescriptive decentralization, public ownership, reduced state autonomy, and non-reformist transformation. The [Popp-Madsen and Kets Polity article](https://www.journals.uchicago.edu/doi/abs/10.1086/711750) and [Popp-Madsen's council-democracy theory](https://academic.oup.com/edinburgh-scholarship-online/book/37811/chapter-abstract/332278027?login=false) are provenance for terminology, historical variation, and authoring rationale only. The active bank contains 612 prompts (204 per layer), 50 editorial anchors, and 45 canonical scoring anchors; the 1,428 effect-free research candidates remain quarantined. Council Communism is provisional editorial measurement, not a validated scale or respondent classifier. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v24 continuation — Guild Socialism

The v24 Guild Socialism tranche extends the same three-layer method to the existing canonical `Socialism → Guild Socialism` path without changing facet geometry or scoring policy. Its 12 original target-tagged prompts separate descriptive mechanisms of industrial authority, plural association, market and administrative dependence, and elite insulation; normative equal standing, economic democracy, solidarity, liberty, and institutional self-government; and prescriptive social ownership, associational coordination, bounded market use, and public guarantees that preserve self-government. The [Hodgson article on the institutional impossibility of Guild Socialism](https://academic.oup.com/cje/article/47/1/21/6775929), [Madden and Persky's Oxford chapter](https://academic.oup.com/book/56397/chapter-abstract/448370103), and existing Cambridge Guild Socialist scholarship are provenance for terminology, historical variation, limitations, and authoring rationale only. The active bank contains 624 prompts (208 per layer), 51 editorial anchors, and 46 canonical scoring anchors; the 1,428 effect-free research candidates remain quarantined. Guild Socialism is provisional editorial measurement, not a validated scale or respondent classifier. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v26 data boundary — Marxism-Leninism

The v26 data boundary adds a source-linked 4/4/4 Marxism-Leninism block over the existing canonical `Socialism → Communism → Marxism-Leninism` path. The construct is a historically bounded and internally varied communist current associated with vanguard-party leadership, democratic centralism, state transformation, social or public ownership, planned coordination, class and capital analysis, and revolutionary internationalism. The Cambridge and Oxford source records support terminology, historical scope, variation, provenance, and original item authoring only; they do not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 26 with 648 prompts, 216 per layer, 53 editorial anchors, and 48 canonical scoring anchors. The readable v1 full-answer representation remains above the finite 40,960-character guard, so compact index-based v2 is emitted for the complete payload while strict v1 decoding remains supported. The v26 addition is provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.
## Current v25 data boundary — Trotskyism

The v25 data boundary adds a source-linked 4/4/4 Trotskyism block over the existing canonical `Socialism → Communism` path. The construct is historically organized and internally varied, associated with permanent revolution, internationalism, workers' democracy, organized revolutionary politics, and critique of bureaucratic degeneration. The source record supports terminology, historical scope, variation, provenance, and original item authoring only; it does not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 25 with 636 prompts, 212 per layer, 52 editorial anchors, and 47 canonical scoring anchors. A complete readable v1 share representation would exceed the finite 40,960-character guard, so the implementation emits compact index-based v2 for the expanded payload while retaining strict v1 decoding. The v25 addition is provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v27 data boundary — Autonomist Marxism

The v27 data boundary adds a source-linked 4/4/4 Autonomist Marxism block over the existing canonical `Socialism → Marxism → Autonomist Marxism` path. The construct is a historically varied Marxist current centered on worker and social autonomy, self-activity, class composition, expanded social reproduction, anti-vanguard movement organization, principled decentralization, and practical control over time and collective activity. The SAGE and peer-reviewed Antipode source records support terminology, historical scope, variation, provenance, and original item authoring only; they do not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 27 with 660 prompts, 220 per layer, 54 editorial anchors, and 49 canonical scoring anchors. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no topology or measurement-policy change was made. The addition remains provisional editorial measurement, and no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v29 data boundary — Social Ecology

The v29 data boundary adds a source-linked 4/4/4 Social Ecology block over the existing typed hybrid `Green Anarchism → Social Ecology` path. The construct links ecological domination to social hierarchy and gives normative weight to ecological integrity and future generations, with democratic municipal or federated self-government and accountable common provision as a central route. The Best, Shelley, Roth/Russell/Thompson, Hammy/Miley, Oxford, and SEP records support terminology, variation, provenance, false-positive controls, and original item authoring only; they do not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 29 with 684 prompts, 228 per layer, 56 editorial anchors, and 51 canonical scoring anchors. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no macro ancestry, ontology topology, or measurement-policy change was made. The readable v1 complete-answer representation measures 44,451 characters and compact v2 measures 7,350 characters under the finite share guard. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v30 data boundary — Womanism

The v30 data boundary adds a source-linked 4/4/4 Womanism block over the existing canonical `Feminism → Womanism` path. The construct treats Womanism as a historically varied Black women-centered intellectual, ethical, theological, and political current concerned with interlocking racialized gender, class, sexual, and embodied domination; Black women's knowledge and self-definition; communal survival and wholeness; and material and spiritual transformation. The Oxford, Cambridge, Frontiers, and Journal of Black Studies records support terminology, variation, provenance, and false-positive controls for original item authoring only; they do not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 30 with 696 prompts, 232 per layer, 57 editorial anchors, and 52 canonical scoring anchors. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no topology, macro ancestry, or measurement-policy change was made. Readable v1 measures 45,107 characters and compact v2 measures 7,478 characters under the finite share guard. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v31 data boundary — Classical-Liberal Feminism

The v31 data boundary adds a source-linked 4/4/4 Classical-Liberal Feminism block over the existing canonical `Feminism → Liberal Feminism → Classical-Liberal Feminism` path. The construct is a contested, branch-sensitive liberal-feminist family concerned with gendered legal and institutional barriers, equal individual rights, autonomy, freedom from coercive interference, constitutional democracy, and generally limited or non-paternal public power. The SEP Liberal Feminism, Baehr, SEP Libertarianism, and adjacent feminist-philosophy records support terminology, variation, provenance, and false-positive controls for original item authoring only; they do not validate local effects, vectors, respondent comprehension, or classification.

The production bank is content version 31 with 708 prompts, 236 per layer, 58 editorial anchors, and 53 canonical scoring anchors. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no topology, macro ancestry, or measurement-policy change was made. Compact v2 complete-answer output measures 7,606 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v32 data boundary — Anarcho-Communism — 2026-08-27

The v32 data boundary adds a source-linked 4/4/4 Anarcho-Communism block over the existing canonical `Anarchism → Social Anarchism → Anarcho-Communism` path. The [Stanford Encyclopedia of Philosophy entry on Anarchism](https://plato.stanford.edu/entries/anarchism/), [Cahm's Cambridge chapter on anarchist communism](https://doi.org/10.1017/CBO9780511521294.004), [Vincent's Cambridge chapter on stateless-society visions](https://doi.org/10.1017/CHOL9780521430562.016), [Eckhardt's Cambridge chapter on Bakunin and social anarchism](https://doi.org/10.1017/9781108611022.014), [Kinna's chapter on Kropotkin and anarchist tradition](https://doi.org/10.3366/edinburgh/9780748642298.003.0010), [Bray's chapter on propaganda by the deed and anarchist communism](https://doi.org/10.7591/cornell/9781501761928.003.0003), and Ostrom's institutional work support terminology, historical variation, provenance, and false-positive controls for original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct joins anti-hierarchical and anti-state organization with common ownership, need-oriented provision, free association, and federated self-management. It preserves variation over communal scale, revolutionary and reformist strategy, voluntary association, and self-defense. `Collectivist Anarchism` remains catalog-only rather than being collapsed into this branch because its historically bounded labor-contribution and remuneration debates require a separate source pass. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no ontology topology, macro ancestry, or measurement-policy change was made.

The production bank is content version 32 with 720 prompts, 240 per layer, 59 editorial anchors, and 54 canonical scoring anchors. Compact v2 complete-answer output measures 7,734 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v33 data boundary — Collectivist Anarchism — 2026-08-27

The v33 data boundary adds a source-linked 4/4/4 Collectivist Anarchism block over the existing canonical `Anarchism → Social Anarchism → Collectivist Anarchism` path. [Franks's Oxford Handbook chapter on Anarchism](https://doi.org/10.1093/oxfordhb/9780199585977.013.0001) supports a branch-sensitive distinction between social and individualist anarchisms and the insufficiency of anti-statism alone. [Ward's account of the federalist agenda](https://doi.org/10.1093/actrade/9780192804778.003.0009) supports coordination through federated arrangements without uniformity or permanent bureaucracy. [Kropotkin's Cambridge text on the collectivist wages system](https://doi.org/10.1017/CBO9781139170734.017) and [Bakunin's *Statism and Anarchy*](https://doi.org/10.1017/CBO9781139168083) provide historically situated primary context for labor-linked remuneration debates and anti-state social revolution; existing SEP, Cambridge, and Ostrom records provide adjacent context. These sources support terminology, historical variation, provenance, false-positive controls, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct joins collective ownership and equal economic self-government to opposition to both private-capital and separate state domination, free association, federated coordination, and a historically associated but internally debated labor-contribution/remuneration route. It remains distinct from Anarcho-Communism's more constitutive need-oriented communist route, Social Anarchism's wider economic range, Anarcho-Syndicalism's union/direct-action route, Mutualism, and state-centered socialism. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no ontology topology, macro ancestry, coefficient, threshold, or measurement-policy change was made.

The production bank is content version 33 with 732 prompts, 244 per layer, 60 editorial anchors, and 55 canonical scoring anchors. Compact v2 complete-answer output measures 7,862 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v34 data boundary — Anarchism macro family — 2026-08-27

The v34 data boundary adds a source-linked 4/4/4 Anarchism family block over the existing canonical `Anarchism` macro. The [SEP Anarchism entry](https://plato.stanford.edu/entries/anarchism/) supports a plural family united by critique of centralized, hierarchical, or unjustified authority while varying across individualist, social, feminist, ecological, religious, and other currents. [Ward's Oxford introduction](https://academic.oup.com/book/427) supports historical and theoretical variation over organization, federalism, freedom, and political effectiveness; the [Cambridge History of Socialism](https://www.cambridge.org/core/books/cambridge-history-of-socialism/394F1B6C4287374FCF45731C33BD4954) supports the plurality of anarchist currents and organizational forms. Existing Ostrom material remains institutional context for self-governance. These sources support terminology, historical variation, provenance, false-positive controls, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct requires a convergent descriptive critique of imposed hierarchy and concentrated authority, normative commitments to autonomy, equal standing, and mutual aid, and a prescriptive preference for voluntary, self-organized, federated, revocable, or otherwise non-permanent command arrangements. It preserves variation over markets, ownership, communal provision, scale, violence, reform, revolution, and historical or applied context. The existing contextual `anarchism` bridge remains separate from the new `anarchism-family` production anchor, and no ontology node was added or reparented.

The production bank is content version 34 with 744 prompts, 248 per layer, 61 editorial anchors, and 56 canonical scoring anchors. Compact v2 complete-answer output measures 7,990 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v35 data boundary — Conservatism macro family — 2026-08-27

The v35 data boundary adds a source-linked 4/4/4 Conservatism family block over the existing canonical `Conservatism` macro. The current [SEP Conservatism entry](https://plato.stanford.edu/entries/conservatism/) supports the contested distinction between broad social caution and self-conscious political conservatism, historically situated practical knowledge, living tradition, authority, human fallibility, and cautious reform. [O'Sullivan's Oxford Handbook chapter](https://academic.oup.com/edited-volume/34324/chapter/291333309) supplies the moderate, reactionary, radical, and New Right school boundary, while [Blakely's Cambridge chapter](https://www.cambridge.org/core/books/abs/lost-in-ideology/in-the-name-of-the-past-conservatisms-multiple-traditions/73533F4CF4C72057615234CA725A4BF3) supports recurring themes and plurality. These sources support terminology, historical variation, provenance, false-positive controls, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct requires a convergent descriptive account of historically situated institutional knowledge, social traditions, human fallibility, and the risks of abstract redesign; normative weight on continuity, stewardship, concrete obligation, and prudence; and a prescriptive preference for tested, incremental, corrigible reform using local knowledge without fixing one economic or state programme. It preserves variation across conservative schools and distinguishes the family from generic caution, age, status-quo preference, nationalism, anti-government sentiment, and one historical author or current party.

The production bank is content version 35 with 756 prompts, 252 per layer, 62 editorial anchors, and 57 canonical scoring anchors. Compact v2 complete-answer output measures 8,118 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## Current v36 data boundary — Ecologism / Green Ideology macro family — 2026-08-27

The v36 data boundary adds a source-linked 4/4/4 Ecologism family block over the existing canonical `Ecologism` macro. [Humphrey's Oxford Handbook chapter on Green Ideology](https://doi.org/10.1093/oxfordhb/9780199585977.013.0011) supports the proposed commitments of ecological restructuring, radical democratization, ecological law, and non-violence while preserving debate over the conceptual breadth of green ideology. [Carter's third-edition Cambridge treatment](https://www.cambridge.org/core/books/abs/politics-of-the-environment/green-political-thought/BA5EB7C4D160DD1D16ECF39BF55C2047) supports ecological limits, reassessment of human–nature relations, sustainable society, grassroots democracy, decentralization, social justice, and nonviolence. Existing Ecologism, SEP Environmental Ethics, Rockström, and Gardiner records provide adjacent context. These sources support terminology, historical variation, provenance, false-positive controls, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct requires ecological limits, human–nature relations and interdependence, ecological justice, and social or institutional transformation, while preserving variation over anthropocentric/ecocentric value, ecological law, democracy, decentralization, nonviolence, markets, ownership, state capacity, and scale. Generic environmental concern, conservation, Deep Ecology, bioregionalism, Green Politics, Social Ecology, Ecosocialism, one policy, or one tradition is insufficient evidence. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no ontology topology, macro ancestry, coefficient, threshold, or measurement-policy change was made.

The production bank is content version 36 with 768 prompts, 256 per layer, 63 editorial anchors, and 58 canonical scoring anchors. Compact v2 complete-answer output measures 8,246 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.
## v37 data boundary — Liberalism macro family

The v37 data boundary adds a source-linked 4/4/4 Liberalism family block over the existing canonical `Liberalism` macro. The current [Stanford Encyclopedia of Philosophy entry on Liberalism](https://plato.stanford.edu/entries/liberalism/) supports competing accounts of liberty, old and new liberalism, political versus comprehensive doctrine, and disagreement over liberal obligations. [Freeden and Stears's Oxford Handbook chapter](https://academic.oup.com/edited-volume/34324/chapter-abstract/291334349) supports variation across liberty, individualism, autonomy, constitutionalism, markets, welfare, universalism, particularism, entrepreneurship, individual development, and cultural pluralism. [The Cambridge Companion to Liberalism](https://www.cambridge.org/core/books/cambridge-companion-to-liberalism/D73F918F7A3C4A26664C90B946C1B06C) supplies broad historical and normative context. These sources support terminology, historical variation, provenance, false-positive controls, and original item authoring only; they do not validate local wording, effects, vectors, respondent comprehension, or classification.

The source-bounded construct requires publicly justified political authority, liberty, rights, equal standing, pluralism, and contestable limits on arbitrary power, while preserving variation over negative/positive/republican liberty, classical/new liberalism, markets, welfare, constitutionalism, state capacity, and international reach. Generic individual preference, market support, constitutionalism alone, one party, one state size, or one Classical, Social, Libertarian, or Neoliberal formulation is insufficient evidence. The new questions use the existing descriptive, normative, and prescriptive facets and scorer; no ontology topology, macro ancestry, coefficient, threshold, or measurement-policy change was made.

The production bank is content version 37 with 780 prompts, 260 per layer, 64 editorial anchors, and 59 canonical scoring anchors. Compact v2 complete-answer output measures 8,374 characters under the finite share guard, while v1 remains decodable. The addition remains provisional editorial measurement; no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.
## v38 methodology continuation — Socialism macro family

The v38 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the Socialism family without treating a historical regime, one ownership policy, or statism as sufficient. The family anchor is an editorial vector assembled from source-bounded concepts; it is not a validated scale or respondent label.

The resulting manifest contains 792 prompts (264 descriptive, 264 normative, 264 prescriptive), 65 editorial anchors, and 60 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields are reported only as deterministic geometry diagnostics. No cognitive review or empirical measurement study is claimed.

## v39 methodology continuation — Nationalism macro family

The v39 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the Nationalism family without treating patriotism, ancestry, ordinary citizenship, one membership rule, or one historical movement as sufficient. The `nationalism-family` anchor is an editorial vector assembled from source-bounded concepts—national membership and identity, self-determination, bounded solidarity, political partiality, continuity, and institutional self-government—and is not a validated scale or respondent label.

The resulting manifest contains 804 prompts (268 descriptive, 268 normative, 268 prescriptive), 66 editorial anchors, and 61 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v40 methodology continuation — Republicanism macro family

The v40 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the Republicanism family without treating patriotism, generic anti-corruption, majoritarianism, constitutionalism alone, the contemporary Republican Party, or one historical republic as sufficient. The `republicanism-family` anchor is an editorial vector assembled from source-bounded concepts—civic self-government, freedom from arbitrary power, equal civic standing, accountable institutions, common goods, and resistance to corruption—and is not a validated scale or respondent label.

The resulting manifest contains 816 prompts (272 descriptive, 272 normative, 272 prescriptive), 67 editorial anchors, and 62 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v41 methodology continuation — Feminism macro family

The v41 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the Feminism family without treating formal equality alone, identity alone, one account of patriarchy, one policy, one branch, or one historical movement as sufficient. The `feminism-family` anchor is an editorial vector assembled from source-bounded concepts—gendered structural power, equality, autonomy, solidarity, democracy, institutional transformation, care/social reproduction, and institutional voice—and is not a validated scale or respondent label.

The resulting manifest contains 828 prompts (276 descriptive, 276 normative, 276 prescriptive), 68 editorial anchors, and 63 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v42 methodology continuation — Anarcho-Syndicalism micro branch

The v42 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Anarcho-Syndicalism micro branch without treating union membership, labor solidarity, anti-state sentiment, co-determination, one strike preference, or direct action as violence as sufficient. The `anarcho-syndicalism` anchor is an editorial vector assembled from source-bounded concepts—worker power, workplace democracy, solidarity, direct action, federated self-management, accountable delegation, and opposition to permanent managerial or state command—and is not a validated scale or respondent label.

The resulting manifest contains 840 prompts (280 descriptive, 280 normative, 280 prescriptive), 69 editorial anchors, and 64 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v43 methodology continuation — Anarcho-Capitalism micro branch

The v43 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Anarcho-Capitalism micro branch without treating generic libertarianism, small-government preference, anti-state sentiment, private provision, property support, or voluntary exchange alone as sufficient. The `anarcho-capitalism` anchor is an editorial vector assembled from source-bounded concepts—territorial-monopoly rejection, market coordination, private property and contract, consent and exit, polycentric institutions, and opposition to permanent public monopoly—and is not a validated scale or respondent label. The contested relation between Anarcho-Capitalism and anarchism is preserved rather than resolved.

The resulting manifest contains 852 prompts (284 descriptive, 284 normative, 284 prescriptive), 70 editorial anchors, and 65 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v44 methodology continuation — Anarcho-Primitivism micro branch

The v44 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Anarcho-Primitivism micro branch without treating environmentalism, broad Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, degrowth, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, or one theorist's programme as sufficient. The `anarcho-primitivism` anchor is an editorial vector assembled from source-bounded concepts—civilization and industrial-scale critique, technical dependence, ecological limits, ecological priority, autonomy, solidarity, radical decentralization, and state-capacity/reform opposition—and is not a validated scale or respondent label. Appropriate-technology, agriculture/domestication, Indigenous/decolonial, and anti-civilization-versus-primitivist variation remain explicit caveats.

The resulting manifest contains 864 prompts (288 descriptive, 288 normative, 288 prescriptive), 71 editorial anchors, and 66 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v45 methodology continuation — Austromarxism micro branch

The v45 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Austromarxism micro branch through historically situated Austrian Marxist and Social Democratic analysis, class transformation, worker-movement unity, democratic institutional strategy, and personal or non-territorial national autonomy within multinational conditions. The block preserves variation among Bauer, Renner, Adler, Hilferding, and Neurath and over reform, revolution, parliamentary, municipal, associational, territorial, and cultural routes. Generic Marxism, Social Democracy, Austrian identity, nationalism, multiculturalism, national autonomy alone, generic parliamentary reform, Marxism-Leninism, Communism, one historical regime, one theorist, or a single contemporary programme is insufficient. The `austromarxism` anchor is an editorial vector assembled from source-bounded concepts—class and structural power, cultural-historical causation, institutional strategy, equality, solidarity, democratic participation, material liberty, social ownership, public provision, state capacity, decentralization, reform, and internationalism—and is not a validated scale or respondent label.

The resulting manifest contains 876 prompts (292 descriptive, 292 normative, 292 prescriptive), 72 editorial anchors, and 67 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v46 methodology continuation — Egalitarian-Liberal Feminism micro branch

The v46 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Egalitarian-Liberal Feminism micro branch through personal and political autonomy, gendered institutional starting conditions, substantive equality and opportunity, democratic inclusion, and accountable public action that enables meaningful choice. The block preserves variation over formal versus substantive equality, individual versus relational autonomy, family and care, public reason, anti-stereotyping, welfare and affirmative action, and the limits of state power. Generic liberalism, formal rights, equality, public provision, anti-discrimination, feminism, one policy, or one author is insufficient. The `egalitarian-liberal-feminism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 888 prompts (296 descriptive, 296 normative, 296 prescriptive), 73 editorial anchors, and 68 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v47 methodology continuation — Buddhist Nationalism micro branch

The v47 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Buddhist Nationalism micro branch through public religion–nation translation: Buddhist histories, institutions, symbols, or moral claims shaping national identity, public order, membership, or self-determination. The block preserves variation across jurisdictions and histories, monastic and lay authority, anti-colonial and defensive narratives, state patronage, minority boundaries, democratic contestation, and transnational pressures. Private faith, cultural familiarity, ordinary patriotism, generic Religious Nationalism, nationalism without Buddhist-national translation, one country, one monk, one minority conflict, one constitutional model, or one party is insufficient. The `buddhist-nationalism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 900 prompts (300 descriptive, 300 normative, 300 prescriptive), 74 editorial anchors, and 69 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v49 methodology continuation — Materialist / Socialist Ecofeminism micro branch

The v49 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Materialist / Socialist Ecofeminism micro branch through the linked material mechanism among capitalist and patriarchal political economy, paid and unpaid labor, social reproduction, resource control, and ecological degradation, with collective/democratic transformation routes. Green policy, feminism, socialism, welfare, public ownership, social-reproduction language, generic Eco-socialism, Materialist Feminism without ecology, Cultural / Spiritual Ecofeminism's cultural/spiritual mechanism, or one institutional model is insufficient. The `materialist-socialist-ecofeminism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 924 prompts (308 descriptive, 308 normative, 308 prescriptive), 76 editorial anchors, and 71 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v50 methodology continuation — Christian Nationalism micro branch

The v50 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Christian Nationalism micro branch through the joint mechanism of Christian identity, narratives, institutions, or authority claims helping constitute national membership and public institutional power or political action. The block preserves variation among Christian-nationalist theological and constitutional routes, democratic and authoritarian formations, racialized and non-racialized boundary claims, jurisdictions, Christian Democracy, civic religion, Christian patriotism, church establishment, integralism, and dominionism. Private Christian faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, generic Religious Nationalism, one party, one actor, one country, or one policy is insufficient. The `christian-nationalism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 936 prompts (312 descriptive, 312 normative, 312 prescriptive), 77 editorial anchors, and 72 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v52 methodology continuation — Cultural Feminism micro branch

The v52 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Cultural Feminism micro branch through the convergent mechanism of cultural or gendered norms shaping power, care/relational/embodied practices carrying political value without a fixed female essence, and feminist transformation changing cultural or institutional valuation while remaining contestable. The block preserves difference-feminist, essentialist, anti-essentialist, relational, intersectional, postcolonial, and care-oriented variation, and keeps gender identity, care preference/work, feminist identity, generic feminism, Radical, Materialist, Lesbian, and Ecofeminist mechanisms distinct. The `cultural-feminism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 960 prompts (320 descriptive, 320 normative, 320 prescriptive), 79 editorial anchors, and 74 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v51 methodology continuation — Egoist Anarchism micro branch

The v51 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Egoist Anarchism micro branch through the convergent mechanism of Stirnerian self-rule or ownness, resistance to imposed identity and compulsory authority, and voluntary association without a fixed collective sovereign. The block preserves psychological, ethical, self-relational, property, exchange, sociality, historical, and tactical variation, and keeps nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, and one interpretation of Stirner distinct. The `egoist-anarchism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 948 prompts (316 descriptive, 316 normative, 316 prescriptive), 78 editorial anchors, and 73 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence is claimed.

## v48 methodology continuation — Cultural / Spiritual Ecofeminism micro branch

## Current implementation continuation — v53 — 2026-08-28

The live manifest is content version 53 with 972 original questions, 324 in each of the descriptive, normative, and prescriptive layers. It retains the same response semantics, closed facet vocabulary, approximate editorial anchors, coverage threshold, scoring policy version 3, combined-layer calculation, contextual-only exclusion, and compact-share contract. Seventy-five canonical anchored targets now have direct four-question-per-layer blocks, while five broad contextual anchors remain visible as research context but are excluded from production neighbor scoring. The v53 Cultural Nationalism block is source-backed and provisional on the existing Nationalism → Cultural Nationalism path; its boundary requires national translation, a cultural mechanism, and a public or collective project, while preserving civic, ethnocultural, religious, anti-colonial, regional/minority, pluralist, state, non-state, historical, and postcolonial variation. Cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, inherited membership, one heritage policy, fixed cultural homogeneity, or one author is insufficient. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, or scientific validity claim is implied.

The v53 anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label. The curated research bank remains 1,428 effect-free candidates across 119 targets; 27 canonical ontology targets remain catalog-only, 12 registry-only targets remain outside production scoring, and five contextual placements remain contextual-only. Full-production rank and top-three fields remain deterministic geometry diagnostics only.
The v48 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Cultural / Spiritual Ecofeminism micro branch through the linked mechanism between gendered domination and ecological interdependence, cultural and hierarchical-dualism analysis, relational ecological selves, religious/secular variation, anti-essentialist pluralism, ecological justice, shared care and restoration, community co-design, and institutional reform. Private spirituality, gender identity, environmental concern, woman–nature essentialism, one religion or goddess tradition, cultural nostalgia, generic Ecofeminism, Cultural Feminism, Materialist / Socialist Ecofeminism, Deep Ecology, anti-technology sentiment, or one policy is insufficient. The `cultural-spiritual-ecofeminism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 912 prompts (304 descriptive, 304 normative, 304 prescriptive), 75 editorial anchors, and 70 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## v54 methodology continuation — Ethnocultural Nationalism micro branch

The v54 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments as separate claim layers. Four items per layer describe the existing Ethnocultural Nationalism micro branch through the linked mechanism of national translation, constitutive shared-descent or inherited-cultural membership, and institutional or political consequence. The block preserves non-racial and racialized variation, mixed civic/ethnocultural forms, religious and anti-colonial distinctions, regional/minority pluralism, state and non-state projects, and historical/postcolonial contexts. Cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, or generic Nationalism is insufficient. The `ethnocultural-nationalism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 984 prompts (328 descriptive, 328 normative, 328 prescriptive), 81 editorial anchors, and 76 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; the ontology-level totals remain 9/38/60. Full-production rank and top-three fields remain deterministic geometry diagnostics only. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## v55 methodology continuation — Lesbian Feminism micro branch

The v55 extension treats Lesbian Feminism as a source-bounded content domain rather than an identity proxy. Rich and Schippers support the descriptive construct of compulsory heterosexuality as institutional and cultural power; Lee and Atchison support historically varied separatist/community forms; Hobson supports collective defense, alliances, anti-repression work, and internal coalition tensions; and the existing SEP source preserves adjacent radical-feminist and self-definition disputes. Each new item is authored in one claim layer and maps only to facets already defined for that layer.

The resulting manifest contains 996 prompts (332 descriptive, 332 normative, 332 prescriptive), 82 editorial anchors, and 77 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; ontology-level totals remain 9/38/60. Lesbian Feminism has twelve direct target-tagged items and isolated 4/4/4 routing. Full-production rank and top-three fields remain deterministic geometry diagnostics only; the 1,428 candidate records remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## v56 methodology continuation — One-Nation Conservatism micro branch

The v56 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments separate. The EHR/OUP, Walsha, Page, and Webb comparison supports a historically situated and internally varied One-Nation Conservatism boundary around national translation, cross-class social cohesion, responsible inherited institutions, and constructive or gradual reform. The items preserve variation over paternalist/libertarian welfare routes, markets, state capacity, constitutional democracy, sovereignty, immigration, nationhood, social liberalism, and cosmopolitanism; patriotism, tradition, party affiliation, one leader, one policy, generic Conservatism, National Conservatism, or Social Democracy is insufficient. The `one-nation-conservatism` anchor is an editorial vector assembled from source-bounded concepts and is not a validated scale or respondent label.

The resulting manifest contains 1,008 prompts (336 descriptive, 336 normative, 336 prescriptive), 83 editorial anchors, and 78 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; ontology-level totals remain 9/38/60. One-Nation Conservatism has twelve direct target-tagged items and isolated 4/4/4 routing. Full-production rank and top-three fields remain deterministic geometry diagnostics only; the 1,428 candidate records remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## v57 methodology continuation — Zionism micro branch

The v57 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments separate while adding a source-bounded Zionism block to the existing `Nationalism → Zionism` path. Boix supports contextual variation in Jewish national identification and Zionist diffusion; Shumsky preserves multinational, autonomy, and non-state routes; Mann supplies the equal-rights and institutional-consequence boundary. The twelve prompts therefore cover historical and institutional mechanisms, self-determination and cultural revival values, durable institution-building, diaspora relations, plural constitutional routes, and equal civic standing without treating Jewish identity, private religion, current conflict opinion, or one territorial programme as an ideology measure.

The resulting manifest contains 1,020 prompts (340 descriptive, 340 normative, 340 prescriptive), 84 editorial anchors, and 79 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; ontology-level totals remain 9/38/60. Zionism has twelve direct target-tagged items and isolated 4/4/4 routing. Full-production rank and top-three fields remain deterministic geometry diagnostics only; the 1,428 candidate records remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.

## v58 methodology continuation — Khomeinism micro branch

The v58 content expansion keeps descriptive beliefs, normative commitments, and prescriptive commitments separate while adding a source-bounded Khomeinism block to the existing `Islamism → Khomeinism` path. Abrahamian, Arjomand, Namazi, Hossainzadeh and Travers, and Ghobadzadeh support the distinction among Shi'i authority, modern sovereignty, clerical/state relations, independence, oppressed-centered mobilization, and constitutional ambiguity. The twelve prompts therefore cover revolutionary and institutional mechanisms, jurist guardianship and public authority values, independence and social-grievance commitments, and constitutional state-building without treating Shi'i identity, private faith, generic Islamism, current policy opinion, or operational militancy as sufficient evidence.

The resulting manifest contains 1,032 prompts (344 descriptive, 344 normative, 344 prescriptive), 85 editorial anchors, and 80 production anchors. The canonical ontology remains 9 macro, 33 canonical meso, and 60 canonical micro nodes, with five contextual placements and 12 registry entries outside production scoring; ontology-level totals remain 9/38/60. Khomeinism has twelve direct target-tagged items and isolated 4/4/4 routing. Full-production rank and top-three fields remain deterministic geometry diagnostics only; the 1,428 candidate records remain effect-free and quarantined. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence is claimed.
