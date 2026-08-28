# Architecture Review — Ideology Layer Sorter

## Review basis and disposition

This review uses `docs/plan/ideology-sorter/spec.md`, `docs/plan/ideology-sorter/design-system.md`, `docs/plan/ideology-sorter/interview.md`, and `docs/domain-dictionary.md` as the authority for the MVP. The product is explicitly a fixed-length, client-only React + TypeScript + Vite application with no API, database, authentication, analytics, or remote answer collection (`spec.md:L38-L40`; `interview.md:L22-L24`). The repository is described as empty of application code, so the findings below are an implementation baseline rather than a claim about existing source behavior.

The architecture is a good fit for the scope if the scoring engine, content validation, and share decoding remain framework-independent. The following items are required before implementation is considered contract-complete:

| ID | Severity | Finding | Required architectural response |
|---|---|---|---|
| AR-01 | Critical | Scoring policy and result states are not fully represented as typed, versioned contracts. | Introduce a pure scoring boundary with an explicit policy version and a discriminated `covered`/`insufficient-information` result. |
| AR-02 | Critical | URL-hash state is an untrusted input boundary, even though the app is local-only. | Use a bounded, versioned envelope, strict schema validation, and fail-closed recovery before answers enter React state. |
| AR-03 | Important | `Layer`, facet IDs, question IDs, and provenance are currently stringly typed or implicit in the contract examples. | Define closed unions or branded IDs, validate the bundled dataset at build/test time, and reject incompatible records. |
| AR-04 | Important | Family balancing, tie handling, numeric normalization, and fit-language thresholds need a canonical deterministic policy. | Freeze sort keys, threshold boundaries, and rounding rules; cover them with golden fixtures and property tests. |
| AR-05 | Important | Browser behavior, pure calculations, and static-data integrity have different test boundaries. | Keep unit tests DOM-free, reserve Playwright for browser contracts, and assert that answer storage never crosses a remote boundary. |
| AR-06 | Important | A scoring or content change could silently reinterpret an old share link. | Version app, dataset, and scoring policy independently; retain immutable static artifacts and refuse silent reinterpretation. |

## React module boundaries

Use one composition root and a small number of explicit boundaries. The MVP does not justify a global state framework, a router, or a service layer beyond the browser adapters needed for sharing and clipboard behavior.

```text
src/
  app/                 Composition root and screen-state orchestration
  features/
    intro/             Framing and start action
    quiz/              Current question, answer selection, progress, back/next
    results/           Layer result presentation and restart/share actions
    methodology/       Formula, layer definitions, provenance/source posture
  domain/
    contracts.ts       Closed data, answer, policy, and result types
    datasetValidation.ts
    scoring/           Profile aggregation, distance, neighbors, pulls
    share/             Pure envelope encode/decode and validation
  content/
    questions.ts       Immutable question records
    anchors.ts         Immutable anchor records
    sources.ts         Resolvable source-reference records
    manifest.ts        Dataset and scoring-policy versions
  platform/
    browserShare.ts    URL hash and Clipboard API adapters
  ui/                  Presentational controls and design-system primitives
```

The dependency direction should be one-way:

| Boundary | May depend on | Must not depend on |
|---|---|---|
| `domain/` | Types and pure utilities | React, `window`, `navigator`, URL state, clipboard, CSS, network, time, randomness, locale-sensitive formatting |
| `content/` | `domain/contracts.ts` | Feature components, browser APIs, scoring side effects |
| `features/` | Domain functions, content, `ui/` | Direct mutation of content records or ad hoc scoring formulas |
| `platform/` | Domain share contracts and browser APIs | React rendering decisions or scoring implementation |
| `app/` | Features and platform adapters | Duplicated domain rules |
| `ui/` | Props and design tokens | Reading URL/hash state or deciding coverage/fit semantics |

`quiz` owns the incomplete `AnswerMap` and navigation state. `results` receives a computed domain result and renders it; it should not derive neighbors in a component. The composition root invokes the pure calculation after answer changes and chooses between the quiz and result views. `methodology` should render the same policy and provenance records consumed by the engine so the explanatory copy cannot drift from the implementation.

The editorial research-notebook direction belongs in `ui/` and styles, not in domain modules. Keep the layer label, border treatment, focus states, responsive container behavior, and `prefers-reduced-motion` handling in the presentation boundary (`design-system.md:L39-L54`). A component may receive a `Layer` and render the appropriate label; it must not infer a layer from a color or a question position.

## Typed data contracts

The contract examples in the spec are a useful starting point, but several types need to be closed before data is authored. In particular, `IdeologyAnchor.profiles` refers to `Layer` without defining it, while `domain`, `effects`, `family`, and source references are open strings (`spec.md:L112-L151`). Use the dictionary's exact identifiers (`descriptive`, `normative`, `prescriptive`, `facet`, `anchor`, `family`, `internal-fit`, `no-view`, and `tension`) rather than introducing alternate UI or code vocabulary (`docs/domain-dictionary.md:L7-L80`).

At minimum, the domain contract should have this shape:

```ts
type Layer = "descriptive" | "normative" | "prescriptive";
type DirectionalAnswer = -2 | -1 | 0 | 1 | 2;
type Answer = DirectionalAnswer | "no-view";

type QuestionId = string & { readonly __brand: "QuestionId" };
type FacetId = string & { readonly __brand: "FacetId" };
type AnchorId = string & { readonly __brand: "AnchorId" };
type FamilyId = string & { readonly __brand: "FamilyId" };
type SourceRefId = string & { readonly __brand: "SourceRefId" };

type Question = Readonly<{
  id: QuestionId;
  layer: Layer;
  domain: FacetId;
  prompt: string;
  context?: string;
  effects: Readonly<Record<FacetId, number>>;
  sourceType: "original" | "inspired_by";
  sourceRefs: readonly SourceRefId[];
  version: number;
}>;

type LayerResult =
  | {
      kind: "insufficient-information";
      layer: Layer;
      answered: number;
      total: number;
      coverage: number;
    }
  | {
      kind: "covered";
      layer: Layer;
      answered: number;
      total: number;
      coverage: number;
      profile: Readonly<Record<FacetId, number>>;
      neighbors: readonly InterpretiveNeighbor[];
    };
```

The implementation should add a `ScoringPolicy` and a `DatasetManifest` rather than burying constants in functions:

- `ScoringPolicy` owns the answer map, coverage threshold, coefficient normalization, facet weights, distance bounds, family-balancing limit, tie ordering, fit-language bands, and cross-layer-pull thresholds.
- `DatasetManifest` owns the dataset ID, content version, scoring-policy version, question count, per-layer expected counts, and supported share-envelope versions.
- `SourceReference` should be a structured, bundled record keyed by `SourceRefId`; an arbitrary URL in a question or anchor record must not become executable or unreviewed UI content.
- `QuestionId`, `FacetId`, `AnchorId`, `FamilyId`, and `SourceRefId` should be created by a runtime parser/validator at the content boundary. Branded types alone do not protect JSON or future generated data.

Validate the static dataset before the app is built and again in focused tests. The validator should reject duplicate IDs, unknown layers, empty prompts, unresolved source references, invalid version numbers, non-finite coefficients, coefficients outside the documented range, missing required anchor layers, incomplete facet vectors, empty families, and a question count other than 48 with 16 items per layer. Use TypeScript `satisfies` for authoring ergonomics, but do not treat compilation as a substitute for runtime validation.

Keep incomplete state and calculated state distinct. `AnswerMap = Partial<Record<QuestionId, Answer>>` is appropriate while navigating; a normalized calculation input should contain only validated question IDs and values. `undefined` must never be serialized as an answer. `0` is the answered `Mixed / depends` response, while `"no-view"` is missing information and must stay a separate union member (`spec.md:L79-L95`; `docs/domain-dictionary.md:L42-L50`).

## Deterministic scoring boundary

Implement scoring as a pure function with no React or browser imports:

```ts
calculateResults(
  dataset: ValidatedDataset,
  answers: Readonly<AnswerMap>,
  policy: ScoringPolicy,
): CalculationResult
```

The function should follow the documented semantics exactly:

1. Partition questions by `Layer`; use the dataset order only for presentation, never as an implicit scoring rule.
2. Count directional and mixed responses as answered. Count `"no-view"` in the layer total but exclude it from the coverage numerator and every facet mean denominator.
3. Compute `coverage = answered / total`. Because the requirement says “less than 50%,” exactly 50% is covered; this boundary must have a fixture.
4. For each observed facet, aggregate the signed question effect against the answer value using a documented denominator. If effects are signed coefficients, the denominator should use the sum of absolute coefficients so a negative loading cannot invert the normalization. A zero-weight facet is omitted from the observed set, not represented as a zero opinion.
5. Calculate weighted squared distance only over the same observed facet set. Anchor vectors must either be complete for that set or be rejected by dataset validation; missing anchor data must not silently become zero.
6. Normalize the distance against a policy-defined maximum for that observed set and expose the result as `internal fit`, never as a probability or identity claim (`spec.md:L153-L157`; `docs/domain-dictionary.md:L62-L65`).
7. Select up to three interpretive neighbors by first selecting the nearest anchor from each family, then filling remaining slots from the global candidates. Define the stable order as distance ascending, then family ID, then anchor ID. Do not let object-key order or sort stability differ across engines.
8. Derive cross-layer pulls in a separate pure function with explicit thresholds. The output must use `tension`/`cross-layer pull` language and must not create a consistency or contradiction result (`spec.md:L97-L104`; `docs/domain-dictionary.md:L77-L80`).

Do not round profiles or distances before comparison. Compare full-precision numbers, then round only in the view model. Fit-language thresholds, exact tie wording, and the behavior when multiple anchors have identical distances belong in `ScoringPolicy`, with a policy version displayed in the methodology panel. If a layer has no observed facet after validation, return a typed insufficient-information state rather than manufacturing a result.

The minimum deterministic fixture set should include:

- all `no-view` answers and a mix of directional/mixed answers;
- coverage at 7/16, exactly 8/16, and 9/16;
- a zero-weight or unobserved facet;
- negative and positive effect coefficients;
- equal-distance anchors and equal-distance anchors within one family;
- fewer than three families, more than three families, and a family whose nearest candidate is not globally nearest;
- permutation of answer-record order producing byte-equivalent normalized results;
- a policy-version change proving that the version is visible and old fixtures do not silently change;
- cross-layer pulls without any consistency label.

## Share-fragment safety

The URL hash is a trust boundary. It is not a database and it must not be treated as a trusted serialization of the current in-memory state. Sharing should happen only after an explicit user action (`spec.md:L97-L104`), not on every answer change.

Use a versioned envelope with a canonical encoding, for example:

```ts
type ShareEnvelopeV1 = Readonly<{
  schema: "ideology-layer-sorter/share";
  envelopeVersion: 1;
  datasetId: string;
  contentVersion: number;
  scoringPolicyVersion: number;
  answers: readonly Readonly<{ questionId: QuestionId; value: Answer }>[];
}>;
```

The encoder should sort answer pairs by canonical question order, omit no fields that are required for validation, and encode only question IDs, answer values, and version metadata. Do not place prompts, anchor labels, source URLs, generated prose, or arbitrary user text in the fragment. A checksum can detect accidental corruption, but it is not authentication and must not be described as such.

The decoder must:

- cap the raw fragment and decoded payload size before parsing;
- decode only the supported base64url/UTF-8 representation and parse JSON without `eval`, dynamic code, or HTML insertion;
- require the exact schema marker, supported envelope version, dataset ID, and compatible content/scoring versions;
- reject duplicate or unknown question IDs, invalid answer values, missing required fields, extra structural ambiguity, and non-finite values;
- reject the whole envelope on validation failure instead of restoring a partial answer set;
- return a typed `MalformedShare`/`UnsupportedShareVersion` error to the app, which returns to the intro safely and explains recovery without echoing untrusted fragment text.

Answers are not sent to an answer-storage endpoint, but they can still be sensitive in browser history, copied links, screenshots, clipboard managers, extensions, and classroom or facilitator workflows. The share action should warn that the link contains response state, show the generated link for manual selection if Clipboard API permission is unavailable, and report copy failure accurately. The browser adapter may use `navigator.clipboard`; the domain encoder must not.

On load, parse the hash once before selecting the initial screen. On a valid envelope, restore answers only after the complete validation sequence succeeds. On an invalid or unsupported envelope, clear the hash or replace it with a safe empty state without reprocessing it in a loop. React renders validated bundled labels and records, never strings from the fragment. `window.location` and `navigator` access belong exclusively in `platform/browserShare.ts`, with the pure decoder tested independently.

## Build and test boundaries

The build should remain fully static: questions, anchors, source references, manifest, and scoring policy are imported TypeScript data. There should be no runtime `fetch` for answer state, no API client, no database adapter, and no analytics side effect. The design system's Google Fonts choice is a presentation dependency; keep its declared fallbacks and make CI/render tests independent of live font availability (`design-system.md:L30-L37`).

| Boundary | Test location | Required assertions |
|---|---|---|
| Domain scoring and result unions | Vitest, DOM-free | Coverage, facet aggregation, distance normalization, family balancing, stable ties, fit language, pulls, and no forced result below threshold. |
| Dataset and policy validation | Vitest plus build-time validation | 48 items/16 per layer, unique IDs, valid effects/profiles, resolvable provenance, version compatibility, and finite numeric inputs. |
| Share encode/decode | Vitest, DOM-free | Canonical round trip, `no-view`, malformed/oversized/unknown/duplicate input, unsupported versions, and fail-closed behavior. |
| Quiz state and rendering | Component-level tests where available | Start, answer, back/change, required response before next, layer transition notice, restart, and state preservation. |
| Browser integration | Playwright | Intro, full completion, insufficient-information output, refresh from a valid share link, malformed-hash recovery, clipboard fallback, keyboard-only navigation, focus visibility, mobile width, and no answer-storage network request. |
| Release artifact | `npm run build` and `npm test -- --run` | Clean, reproducible build and deterministic unit suite; the acceptance commands must exit successfully (`spec.md:L186-L193`). |

Keep browser-only behavior out of unit tests by injecting a small platform interface for hash and clipboard operations. Playwright should observe network requests and fail if the answer flow calls a remote storage endpoint; it should not confuse optional font requests with answer/data persistence. Use fixed content and policy fixtures so browser assertions do not depend on current time, random IDs, locale, or network ordering.

## Rollback and release safety

Because the MVP has no server-side answer store, rollback is an immutable static-artifact operation rather than a database migration. Each release should publish a manifest containing at least:

- `appVersion` for the executable/UI artifact;
- `contentVersion` for questions, anchors, families, facet registry, and source records;
- `scoringPolicyVersion` for answer mapping, aggregation, distance, family balancing, tie order, fit-language bands, and pull thresholds;
- supported share-envelope versions and compatible dataset/policy pairs.

Changing question wording, IDs, anchors, family membership, facet vectors, source metadata that affects display, or scoring constants requires a content or policy version bump and a regenerated golden-fixture report. A UI-only change may keep the content and policy versions unchanged. Never let a new build silently recalculate an old link under a different policy while presenting it as the same interpretive result.

The compatibility rule should be explicit:

1. A current build may restore a share envelope only when its schema, dataset, and scoring-policy versions are supported.
2. If historical data and policy are intentionally bundled, calculate with the referenced versions and label the result accordingly.
3. If the referenced version is unavailable, show a safe unsupported-link message and return to the intro; do not partially restore or silently reinterpret the answers.
4. Retain the last-known-good static artifact and its manifest so the hosting layer can atomically point back to it. Hashed assets should be deployed as one release to avoid mixing UI and data versions.
5. Before promotion, run the build, unit/golden fixtures, malformed-hash tests, and a Playwright smoke path against the candidate. After promotion, keep the previous artifact available for immediate re-pointing.

There is deliberately no remote kill switch in this MVP. If a scoring or share defect is discovered, the safe mitigation is to redeploy the last-known-good artifact or ship a narrowly scoped code change that disables the affected action, then bump the appropriate version and rerun the fixture matrix. Local in-progress answers are recoverable only when their IDs and versions remain compatible; this limitation should be stated in the release runbook.

## Dictionary Updates

| Action | Term | Definition (proposal) | Rationale |
|---|---|---|---|
| ADD | Scoring policy | A versioned set of answer mapping, coverage, aggregation, distance, neighbor-selection, tie, fit-language, and cross-layer-pull rules used to calculate an interpretive result. | Makes deterministic behavior inspectable and prevents policy changes from being hidden in implementation code. |
| ADD | Share fragment | A bounded, versioned URL-hash envelope containing validated answer state plus dataset and scoring-policy metadata. | Names the browser serialization boundary and its compatibility requirements. |
| ADD | Layer result | A typed result for one layer that is either `covered` with an internal fit/profile or `insufficient-information` with coverage counts. | Gives the coverage gate a stable contract and prevents forced results. |
| ADD | Facet registry | The versioned set of valid facet identifiers and their layer-specific participation rules. | Prevents open string keys from creating mismatched question effects and anchor profiles. |
