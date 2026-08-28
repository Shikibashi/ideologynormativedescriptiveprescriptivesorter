# Section 04: Results

## Current content continuation — v14 — 2026-08-27

The results contract now runs over 504 prompts, 168 per layer. Thirty-six canonical-placement anchors participate in production neighbor selection, while five broad contextual anchors remain visible as research/provenance context only. Direct branch coverage now includes 35 additional existing source-backed anchors beyond the original Right-Libertarianism block while preserving the same result framing: layer-specific outputs remain interpretive neighbors, the combined pattern is gated by layer coverage, and no result is a political recommendation, identity verdict, or validated classification.

## Historical content continuation — v16 — 2026-08-27

The historical v16 results contract runs over 528 prompts, 176 per layer. Thirty-eight canonical-placement anchors participate in production neighbor selection, while five broad contextual anchors remain visible as research/provenance context only. National Socialism is the historically bounded provisional direct-coverage block; its canonical meso placement remains visible in the ontology, and Neo-Fascism remains catalog-only. The results remain interpretive neighbors, not a political recommendation, identity verdict, or validated classification.

## Current content continuation — v17 — 2026-08-27

The results contract now runs over 540 prompts, 180 per layer. Thirty-nine canonical-placement anchors participate in production neighbor selection, while five broad contextual anchors remain visible as research/provenance context only. Civic Nationalism is a context-sensitive provisional direct-coverage block over the existing canonical micro node under Nationalism; its civic–ethnic distinction is not treated as a universal ideal-type binary, and Neo-Fascism remains catalog-only. The results remain interpretive neighbors, not a political recommendation, identity verdict, or validated classification.

## Background

This section implements the presentation boundary after the fixed 540-item flow. It turns a validated answer map and the framework-independent scoring output into a coverage-first, layered reading experience. The result must help a respondent distinguish what they think is true, what they value, and what means they prefer without collapsing those layers into one identity label.

The results surface is interpretive and non-scientific. It does not diagnose the respondent, recommend a political tradition, select a current party or candidate, match the respondent to live policy data, or claim that an anchor is an objective classification. An anchor is an editorial comparison record within the versioned dataset, and an `internal fit` value is a similarity signal over the observed facets only.

Results are calculated from the existing pure scoring contract. The view does not reimplement coverage, facet aggregation, anchor distance, family balancing, tie detection, cross-layer rules, or share decoding. It renders all three layers in the fixed order `descriptive`, `normative`, `prescriptive`, including an explicit `insufficient information` state when a layer has less than 50% answered coverage. `Mixed / depends` remains answered midpoint data, while `No view yet` remains missing information.

### Current continuation note — combined pattern

The current result contract also exposes a `combined` discriminated result. It is emitted only when all three layers are covered, averages the three layer-specific anchor fits equally, and carries the three component fits on each combined neighbor. The view renders this as an inspectable pattern before the separate layer sections; it is not an overall winner, identity label, recommendation, or substitute for the layer results. If any layer is insufficient, the combined result is withheld while covered layer sections remain available.

The MVP is client-only. Answers exist in React memory until the user explicitly creates a share fragment. A share fragment is not private, encrypted, authenticated, or durable storage; the result surface must warn about URL exposure and provide a safe manual-copy fallback when the Clipboard API is unavailable.

## Requirements

### R-01: Results entry and layer separation

- Accept only a validated, immutable `AnswerMap` or a typed result bundle produced by the composition root and `src/scoring.ts`.
- Render three distinct result sections in the dataset layer order: descriptive, normative, and prescriptive.
- Give each section a visible layer name, a one-sentence layer definition, and a short statement that the section describes a different kind of claim than the other two.
- Do not render an overall winner, a single ideology label, a global fit value, a consistency score, a contradiction verdict, a recommendation, or a probability.
- Keep the result language interpretive: use `layer result`, `interpretive neighbor`, `internal fit`, `facet signal`, and `cross-layer pull` or `tension`.
- If the result bundle is missing, invalid, or internally inconsistent, render the existing recoverable application-error state rather than an empty or invented profile.

### R-02: Coverage-first layer states

For every layer, show coverage before any interpretation:

- Display `Answered N of M items` where `M` is the validated question count for that layer. The `available` total is the complete validated layer total, not the number of questions with a numeric answer.
- Display the count of explicit `No view yet` responses separately so missing information cannot look like neutrality.
- Use the inclusive coverage rule `answered numeric responses / all questions in the layer`.
- Treat exactly 68 of 136 answered items as eligible and 67 of 136 as insufficient.
- Count `Mixed / depends` as answered coverage and retain its numeric midpoint value `0`.
- Exclude `No view yet` and incomplete entries from facet means and the answered numerator; never replace either with numeric zero.
- For an eligible layer, show its facet signals, interpretive neighbors, fit language, anchor note, and any applicable cross-layer pulls.
- For an ineligible layer, show `Insufficient information` with the counts and a plain-language explanation. Do not show neighbors, fit, directional facet signals, or cross-layer pulls that require that layer.
- When `combined.kind === "covered"`, show its taxonomy path and one contribution value for each layer. When it is insufficient, explain which layer coverage is missing and keep the individual layer sections visible.
- If the view can receive a partial but structurally valid answer map from share restoration, apply the same state rules instead of assuming that the quiz was completed.

The result must make the distinction explicit in text. A covered layer with a near-zero profile is not the same state as a layer with no observed responses, and neither state is evidence of a political identity.

### R-03: Interpretive neighbors, family balance, and ties

- Consume the preselected neighbor list from the scoring contract; do not sort anchors or recompute distances in the React view.
- Render no more than three neighbors for an eligible layer, with the family, label, short summary, source posture, content version, and anchor note available in the same reading context.
- Label the group `Interpretive neighbors`, not `Matches`, `Recommendations`, `Rankings`, or `Identity result`.
- Present the stable selection order returned by scoring. The order is a deterministic display order, not a claim that the first visible record is a better political choice.
- Explain that family balancing selects at most one nearest anchor per family before filling remaining slots, and that this limits display concentration without proving that the taxonomy itself is balanced.
- When scoring exposes an exact tie group, disclose that the tied neighbors have indistinguishable distance on the observed facets under the active policy. State that the visible order follows the stable family/anchor-ID tie rule.
- Never infer a tie from rounded display text. Tie metadata must come from the exact pre-rounding scoring result.
- If a family-balanced selection has no tie metadata, do not add speculative tie copy. If a tie group has more members than the visible limit, disclose that only the selected members are visible and the stable rule controls selection.
- Show a compact `internal fit` signal only as the versioned presentation output returned by scoring. Do not relabel it as confidence, likelihood, probability, accuracy, or belonging.
- Keep anchor summaries descriptive and source-aware. Do not turn an anchor note into persuasion, endorsement, or advice.

### R-04: Facet signals

- Render the strongest observed facet signals for each eligible layer using the facet labels and descriptions from the closed registry.
- Prefer a small, stable list of up to three signals per layer so the result remains readable. The limit must be a named presentation-policy constant, not an unexplained slice in a component.
- Select signals from the exact observed profile returned by scoring and order them by absolute signal magnitude with the policy’s stable facet-ID tie rule.
- Show the facet label, whether the signal is positive, negative, or near the midpoint, and a concise plain-language description. Pair direction with text and a visual rule; never rely on color alone.
- Do not call a facet signal causal, diagnostic, or a measure of the respondent’s personality. It is the strongest observed directional contribution under this dataset’s declared effects.
- Do not display an unobserved facet as a neutral zero. If a covered layer has no directional signal after answered items, say that the observed answers produce no strong directional signal rather than fabricating a facet.
- Keep `Mixed / depends` visible through the layer methodology/coverage explanation where relevant; do not imply that its midpoint is the same as `No view yet`.
- Provide a link or disclosure target to the facet/effect methodology so a reviewer can inspect how the signal was derived.

### R-05: Cross-layer pulls and tensions

- Consume only the explicit, versioned `crossLayerPulls` or `tensions` returned by the scoring contract.
- Render these after the relevant layer results, under a heading such as `Across the layers` or `Cross-layer pulls`.
- Use neutral explanatory language that names the layer relationship and, where available, the observed facets or rule description that caused the pull.
- State that a pull is context for reading the profile, not a contradiction, error, inconsistency score, or judgment about the respondent.
- Suppress a rule when a required layer is missing, below the coverage threshold, or lacks the required observed facet signals. Do not infer a pull from visible labels alone.
- Do not show an empty tension card for a suppressed rule. A short methodology note may explain that cross-layer pulls are shown only when their evidence and coverage requirements are met.
- Keep the list deterministic and free of duplicate rules. The result view must not reorder, merge, or assign severity to pulls.

### R-06: Methodology and provenance disclosure

- Keep the non-scientific, interpretive disclaimer visible near the results heading and repeat the essential limitation in each layer or in the results introduction.
- Provide an expanded methodology disclosure from the results page, using the same versioned content shown before the quiz.
- Explain all user-visible result semantics: the three layers, response mapping, `Mixed / depends`, `No view yet`, coverage and the inclusive 50% threshold, observed-facet-only distance, family balancing, exact tie handling, `internal fit`, and cross-layer pulls.
- Show the active dataset and scoring-policy versions so a reviewer can relate the result to the share envelope and content release.
- For each visible neighbor, make its source posture, source references or source note, family, and content version inspectable without requiring a remote request.
- State that `original` wording is authored for this product and `inspired_by` records inform structure or concepts without copying external text or code. State that editorial anchors are approximate vectors for this dataset.
- State that the MVP contains no current party, candidate, manifesto, live policy, persuasion, or remote answer-collection data.
- State that future wording or anchor revisions require provenance, substantive neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical validation before production canonicalization. Automated interpretation probes are design aids, not substitutes for those checks.
- Keep disclosure copy in the data/methodology contract where possible. The view may arrange it and shorten it for reading, but it must not create a competing definition or silently omit a limitation.

### R-07: Restart behavior

- Provide a clearly named `Start over` or `Restart` action from the results surface.
- On activation, clear the in-memory answer map, derived result bundle, transient share/recovery notices, and quiz navigation state, then return to the intro.
- Restore focus to the intro heading or primary start control after the reset so keyboard and screen-reader users understand the new state.
- If the current URL contains the application’s share hash, remove only the application-owned fragment with `history.replaceState` or the existing URL boundary; preserve the path and unrelated query data.
- Do not make a network request, write local storage, delete clipboard contents, or silently create a new share fragment during restart.
- Do not discard a link that the user has already copied outside the page; restart only resets this page’s in-memory interpretation state.
- If the reset operation fails because of an invalid app state, show the recoverable application-error path rather than leaving stale results visible.

### R-08: Share-link creation, warning, and fallback

- Offer an explicit `Copy local share link` action after results are available. Do not generate or copy a link merely because the user completed the quiz or opened the results page.
- Call `encodeShare` with the validated answer state and current schema, dataset, and policy versions. Do not serialize profiles, neighbor labels, fit values, source text, HTML, or arbitrary UI state.
- Warn before or immediately beside the action that the hash is not private, encrypted, or authenticated and may reveal political responses through browser history, screenshots, clipboard contents, referrer behavior, or shared devices.
- If the Clipboard API is available and succeeds, announce a concise success status through an accessible live region without claiming that the link is secure.
- If the API is missing, denied, unavailable outside a secure context, or throws, keep the generated link in a readonly text control with a visible `Select link to copy manually` instruction. Do not treat a failed clipboard call as a failed result calculation.
- The fallback control must expose the full link, wrap or scroll safely on narrow screens, support keyboard selection, and avoid using `innerHTML` or unsanitized decoded data.
- If encoding is rejected because the payload is oversized or the state is invalid, do not copy a truncated or partial link. Show a recoverable message and retain the current results; the user may restart.
- Do not call a server, analytics endpoint, remote political-data source, or storage API as part of share creation.

### R-09: Malformed and stale share recovery

- The results view must never decode a raw hash. `src/share.ts` owns strict decoding and returns a typed `valid`, `stale`, or `invalid` outcome.
- A malformed, oversized, unsupported-version, or structurally invalid hash must not render a partial result, execute decoded content, or throw an uncaught exception.
- For a stale or malformed hash, return the user to the intro or existing safe recovery state with a concise explanation that the link cannot be used with the current dataset. Do not echo the payload.
- A valid envelope with known entries must be normalized into an `AnswerMap`, after which the application recomputes current results from the validated manifest. It must not trust derived data from the URL.
- An envelope with no valid known entries returns to the intro. Unknown IDs may be ignored only after structural validation, as required by the share contract.
- The recovery notice must be accessible, must not reveal political answers, and must provide a visible path to start a new local session.

### R-10: Responsive and accessible results

- Use the editorial research-notebook direction: warm paper surfaces, serif layer headings, calm sans body/control text, ink rules, and a vermilion signal accent with HEX fallbacks from the design system.
- Render results as three stacked layer sections with a narrow accent rail, not as an identical three-card dashboard.
- On wide screens, use an asymmetric reading field with layer content and a methodology/annotation rail where the existing shell permits. On narrow screens, collapse to one column without hiding coverage, neighbors, facet signals, pulls, or actions.
- Use page-level media queries only for outer gutters/navigation and container queries for reusable result blocks, as required by the design system.
- Prevent horizontal overflow from long anchor labels, source URLs, share links, tie notes, or methodology copy. Long text must wrap or use an explicitly labelled scroll region.
- Use a main landmark, a programmatic results heading, named sections for each layer, and a predictable heading hierarchy. A screen reader must be able to identify the layer, coverage state, neighbor list, facet signals, cross-layer pulls, methodology, share controls, and restart action without color or layout position.
- Use semantic lists for neighbors and pulls, definition lists or equivalent labelled values for coverage, and real buttons/details controls for actions and disclosures.
- Move focus to the results heading after final completion or valid share restoration, and to the intro heading after restart or safe share recovery.
- Announce only meaningful state changes such as results ready, share copied, share fallback shown, or recovery required. Do not flood a live region with every facet or neighbor.
- Keep visible focus rings, logical keyboard order, adequate touch targets, clear disabled/error states, and text labels for all controls.
- Respect `prefers-reduced-motion`; no animation may be required to understand layer, coverage, tie, error, or recovery state.
- Set `color-scheme: light` and preserve explicit option/text colors from the design system even though this section does not add a theme toggle.

### R-11: Preserve the product boundary

This section must not add accounts, persistence, analytics, moderation, API calls, databases, adaptive questions, machine-learning classification, multilingual content, current political actor data, persuasion, or scientific-validity claims. Any future party, candidate, manifesto, or policy comparison requires a separately approved dataset, provenance, geography, time, and user-safety design.

## Dependencies

### Upstream dependencies

| Dependency | Contract consumed | Failure behavior |
|---|---|---|
| `section-01-foundation` | React + TypeScript + Vite shell, strict compiler/test setup, design tokens, focus and responsive foundations | Do not add a parallel shell or palette; stop at the results boundary until the foundation contracts are available. |
| `section-02-data-methodology` | Validated manifest, `LayerResult` union, coverage, facet profile/signals, neighbor selection, tie metadata, pull rules, methodology content, provenance registry, and share codec | Type or validation failure blocks result rendering; the view must show the existing recoverable error state. |
| `section-03-quiz-flow` | Immutable completed `AnswerMap`, completion handoff, fixed layer order, and focus-safe transition into results | Do not reconstruct answers from DOM controls or assume the final item without the handoff contract. |
| `src/types.ts` | Closed layer, answer, coverage, result, neighbor, facet, pull, methodology, and share contracts | Missing or widened unions are implementation blockers, not reasons to coerce values. |
| `src/data.ts` | Static labels, layer definitions, anchor metadata, facet registry, versions, and methodology/source content | Never create fallback political labels or source notes in the component. |
| `src/scoring.ts` | Pure calculation and exact pre-rounding result metadata | Results consumes outputs; it does not recalculate distance, coverage, ties, or signals. |
| `src/share.ts` | Strict bounded encode/decode and typed invalid/stale recovery | Raw URL fragments never enter React result state. |

### Downstream and external boundaries

- The browser History and Clipboard APIs are optional local boundaries. They must be feature-detected and must not become answer-storage dependencies.
- There is no API, database, authentication service, analytics collector, remote endpoint, or runtime political-data fetch.
- No section after this one is blocked by a new runtime dependency; later operation/QA documents consume the visible behavior and acceptance criteria.

## Flow Diagram Nodes

This section owns the results and share-action nodes already mapped in `sections/index.md`:

- `flow-diagrams/quiz-flow.mmd`
  - `Calculate` — receive the completed answer snapshot and current validated manifest.
  - `Results` — render the three coverage-first layer sections, facet signals, neighbors, pulls, methodology, restart, and share actions.
- `flow-diagrams/scoring-flow.mmd`
  - `Covered` — render the eligible layer result returned by scoring.
  - `Insufficient` — render coverage counts and recovery-oriented explanation without a forced neighbor.
  - `Neighbors` — render the family-balanced list, exact tie disclosure, and anchor notes returned by scoring.
  - `Facet signals` — render observed signals without zero-filling unobserved facets.
  - `Pulls` — render eligible cross-layer context without a contradiction judgment.
- `flow-diagrams/share-flow.mmd`
  - `Encode` — request a bounded versioned share fragment only after explicit user action.
  - `Clipboard` — use the Clipboard API when available and fall back to selectable text.
  - `Decode` / `Validate` / `Restore` — consume only the typed result from `src/share.ts`; invalid or stale outcomes return to safe recovery.

Branches owned by this section:

- `Covered = yes`: show facet signals, interpretive neighbors, fit language, and eligible pulls.
- `Covered = no`: show insufficient information and suppress layer-dependent interpretation.
- `Tie metadata = present`: disclose the exact tie and stable display-order rule.
- `Clipboard = unavailable or denied`: show the full link in a readonly selectable control.
- `Share decode = invalid or stale`: do not render results; show recovery and restart path.

## Reference Libraries

Use the versions pinned by section 01. Do not add a new library solely for cards, tooltips, clipboard handling, or result state.

| Library or platform API | Version policy | Use | Boundary |
|---|---|---|---|
| React and React DOM | Pinned by foundation | Compose layer result sections, disclosures, restart, and share controls | UI only; no scoring or URL decoding in components. |
| TypeScript | Strict version pinned by foundation | Exhaustive result-state handling and closed discriminated unions | Invalid values remain errors; no coercion to neutral defaults. |
| Vitest | Pinned by foundation | Deterministic result-view model, reset, fallback, and accessibility-state fixtures | Pure contract tests must not require a network or live browser. |
| Playwright | Pinned by foundation | End-to-end completion, result presentation, share behavior, recovery, keyboard, and responsive checks | Browser tests complement pure scoring/share tests. |
| Native `Clipboard` API | Browser feature detection | Explicit copy action for a generated local share link | Failure is expected and must use the manual-copy fallback. |
| Native `URL` and History APIs | Browser baseline | Build/replace the app-owned share fragment and return safely to intro | Preserve unrelated URL state and never treat the hash as private storage. |
| Native HTML/CSS | Browser baseline and design-system tokens | Landmarks, headings, lists, definition values, details disclosure, focus, container queries, and reduced motion | Do not add a component library or animation dependency for this section. |

## Implementation

### 1. Establish the result composition boundary

Keep the results orchestration in the existing `src/App.tsx` composition root unless section 01 already provides a separate internal view file. The composition root should:

1. Receive the immutable answer snapshot from section 03 or a normalized answer map from a valid share restore.
2. Invoke the existing pure all-layer scoring function once with the validated manifest and active scoring policy, or consume the already computed typed bundle if the application state machine owns that call.
3. Store the result bundle as derived state, never as an independent source of truth.
4. Render the combined result when eligible, then render the three layers in fixed manifest order and branch on each discriminated covered/insufficient result state.
5. Expose restart and explicit share actions without changing the derived result semantics or serializing them into the share envelope.

The result view must not call `calculateCoverage`, `buildFacetProfile`, distance functions, tie sorting, or pull-rule evaluation directly from event handlers. If the current section-02 contract does not expose a needed presentation field, extend that contract in section 02 and add pure tests there; do not duplicate the calculation in this section.

A useful result boundary is structurally equivalent to:

```ts
type ResultsState =
  | { kind: "ready"; answerMap: AnswerMap; combined: CombinedResult; layers: readonly LayerResult[]; pulls: readonly CrossLayerPull[] }
  | { kind: "recoverable-error"; message: string };
```

The exact project type names may differ, but the view must preserve the distinction between invalid state, insufficient coverage, and a covered layer.

### 2. Render a coverage-first layer section

For each layer, render in this order:

1. Layer heading and plain-language definition.
2. Coverage block with answered/total, percentage, and explicit no-view count.
3. Covered or insufficient status explanation.
4. Facet-signal block when eligible.
5. Interpretive-neighbor block when eligible.
6. Layer-specific methodology/anchor note.

Use text labels such as `Covered at 50%` or `Insufficient information`, not color-only badges. Keep percentage rounding at the presentation boundary and do not display a rounded percentage that changes the eligibility meaning. At the threshold, the copy must state that the layer is eligible exactly at 50%.

For insufficient layers, keep the structure readable but omit misleading empty placeholders. A concise block can say that the tool does not calculate a neighbor because too much of the layer is `No view yet` or incomplete. It must not imply that the respondent is neutral, undecided, or closest to an anchor.

### 3. Render interpretive neighbors and exact tie metadata

Consume the stable neighbor records returned by scoring. Each neighbor entry should contain:

- Visible anchor label and family.
- Short summary and editorial/source note.
- Version and source posture, with a local disclosure target if references are available.
- The returned `internal fit` presentation value and its plain-language legend.
- Tie-group information when supplied by exact scoring.

Render a tie note at the group level rather than repeating it on every record. The note should explain that the tied entries are equally distant on the observed facets under the active policy and that the order is a stable technical ordering. Do not call the order a ranking or recommend one entry.

If a tie is only visible after display rounding but exact distances differ, render no tie note. If exact distances tie but only one member survives the family-balanced visible limit, disclose the selection rule only when the scoring contract provides the relevant metadata; otherwise keep the output to the returned list and general family-balance methodology.

The anchor note must remain inspectable without leaving the static application. Long source references may wrap or move to an explicitly labelled detail region; they must not overflow the viewport.

### 4. Render observed facet signals

Use a presentation helper or typed scoring output such as:

```ts
type FacetSignal = {
  facetId: string;
  label: string;
  direction: "positive" | "negative" | "near-midpoint";
  magnitude: number;
  description: string;
};
```

The helper belongs to the domain/scoring owner when it involves arithmetic or tie order. The results view receives an already ordered, bounded list. It can format direction and magnitude, but it must not select facets by object order or create a signal from an unobserved facet.

For a covered layer with only near-midpoint observed signals, render a plain explanation such as `The observed answers do not produce a strong directional facet signal.` For a layer with no eligible observed result, render the coverage explanation instead. Do not add a synthetic `neutrality` facet.

### 5. Render cross-layer pulls after layer results

Render pull copy only from the typed list returned by `detectCrossLayerPulls`. Each entry should expose, where the contract provides it:

- The participating layers.
- The rule or pull label.
- The neutral explanatory text.
- The observed facet or threshold context needed to inspect the rule.

Use a short introductory note: `These are descriptive relationships across your layer results, not contradiction or consistency judgments.` If no eligible pull exists, do not manufacture one from the three visible labels. A methodology disclosure can state that pulls are conditional and may be absent because a required layer is insufficient or its signal is unobserved.

### 6. Provide methodology and source disclosure

Place a results-level methodology disclosure near the start of the results reading flow and keep a shorter reminder near the share action. Use the same structured sections from `methodologyContent` so changes to the policy cannot drift from the calculation. At minimum, the disclosure includes:

- What each layer means and what the tool does not claim.
- How the six response states affect coverage and facet aggregation.
- Why `No view yet` is missing and `Mixed / depends` is answered midpoint data.
- Why a layer below 50% receives no forced neighbor.
- How observed facets, weighted distance, family balancing, and ties work.
- How the combined pattern gates on all three covered layers and gives each layer equal contribution without replacing the separate readings.
- Why `internal fit` is not probability or identity.
- Why cross-layer pulls are context rather than contradiction.
- How original/inspired-by source posture and editorial anchors work.
- The dataset/policy version and editorial-review posture.
- The absence of current actor data and the share-fragment privacy warning.

Use a semantic `details`/`summary` control or an equivalent accessible disclosure. Do not hide the non-scientific limitation in a tooltip or require the user to open a remote source.

### 7. Implement restart without persistence

The restart handler should dispatch the application’s existing reset transition, clear the answer/result state, remove the app-owned share fragment with the History API, and focus the intro heading. It must be idempotent: activating it twice must not throw or reintroduce old results. Preserve unrelated URL components and do not call `localStorage`, `sessionStorage`, a network endpoint, or the Clipboard API.

If the state was restored from a valid share link, restart removes the app’s active interpretation state but does not claim to revoke or delete copies of the link elsewhere. The warning should remain available from the intro methodology surface so the user understands the boundary.

### 8. Implement explicit share and manual-copy fallback

The share handler should:

1. Confirm that the current answer map is validated and that the result state is ready.
2. Call `encodeShare` with the current versions and answer map only.
3. Construct the app-owned share URL using the existing hash key and current origin/path.
4. Present the privacy warning before or beside the action.
5. Feature-detect `navigator.clipboard.writeText` and call it only after explicit activation.
6. Announce success only after the promise resolves.
7. On unsupported, denied, or failed clipboard access, reveal the readonly fallback control, select or focus it, and provide manual-copy instructions.

Do not place raw prompt text, source references, computed neighbor labels, or derived profiles in the envelope. Do not display a copied-success state when encoding or clipboard writing failed. Keep the URL available for manual copying even if the clipboard permission is denied.

### 9. Handle recovery and defensive rendering

The composition root should map share outcomes to safe user states before results render:

- `valid`: normalize answers and recompute current results.
- `stale`: return to intro with a version/recovery explanation and a restart path.
- `invalid`: return to intro with a concise malformed-link explanation and no payload echo.
- `empty valid envelope`: return to intro without a partial result.

All visible labels, summaries, source notes, and tie messages come from validated static data or fixed UI copy. Do not use decoded strings as markup, CSS, DOM selectors, or error HTML. Error and recovery states must keep the same focus, color, contrast, and responsive rules as the ready state.

### 10. Apply responsive and accessibility behavior

Use semantic structure similar to:

```text
main
  h1 Results
  methodology disclosure
  section Descriptive
    coverage definition list
    facet signal list
    interpretive neighbor list
  section Normative
  section Prescriptive
  section Across the layers
  share controls
  restart control
```

Use `aria-describedby` for coverage explanations and privacy warnings where appropriate, `aria-live="polite"` for copy/recovery status, and stable focus targets for results and intro headings. Keep live announcements short. Ensure that headings and lists remain meaningful when CSS columns collapse on mobile.

### 11. Verify the static boundary

After implementation, inspect the browser network and storage surfaces during completion, results, restart, share success, share fallback, and malformed/stale recovery. The expected behavior is no answer-storage request and no implicit storage write. Static checks must also confirm no dynamic HTML injection, no `eval`, no current political actor data, and no unplanned dependency.

## Test Scenarios

The following cases should be represented in Vitest where they concern typed view models or handlers and in Playwright where they require the rendered browser. All expected results are deterministic and use the current manifest/policy versions.

### Layer assembly and coverage

| ID | Input/action | Expected result |
|---|---|---|
| RS-01 | Complete all 408 items with directional responses. | Results render exactly three layer sections in descriptive, normative, prescriptive order; no overall winner or identity label appears. |
| RS-02 | Provide 68 numeric answers and 68 `No view yet` values in one 136-item layer. | The layer is eligible at exactly 50%; coverage reads 68 of 136, no-view is shown separately, and neighbors may render. |
| RS-03 | Provide 67 numeric answers and 69 `No view yet` values in one layer. | The layer shows `Insufficient information`, no fit, no neighbors, no directional facet signals, and no pull requiring that layer. |
| RS-04 | Use `Mixed / depends` for several items. | Those items count as answered coverage and midpoint data; the result never calls them no-view or neutral answers. |
| RS-05 | Supply a valid partial answer map from a compatible share envelope. | Each layer uses its actual coverage; incomplete layers show the same safe insufficient state rather than assuming completion. |
| RS-06 | Make all responses in one layer `No view yet` or leave all entries absent. | Coverage is zero, no facet is fabricated, and the UI explains why interpretation is unavailable. |

### Neighbors, ties, and facet signals

| ID | Input/action | Expected result |
|---|---|---|
| RS-07 | Provide a covered layer with three family-balanced neighbors. | At most three interpretive neighbors render with family, summary, source note, version, and internal-fit legend. |
| RS-08 | Return exact equal distances for two selected neighbors. | The result shows a tie disclosure from scoring metadata and explains stable family/anchor-ID ordering; it does not infer a preference from rounded text. |
| RS-09 | Return unequal exact distances that round to the same display value. | No tie disclosure is shown; the view preserves the scoring order and does not invent precision. |
| RS-10 | Return more than one close anchor from a family. | The family-balanced list follows the scoring contract; the UI explains family balancing without claiming the taxonomy is objectively balanced. |
| RS-11 | Return three strongest observed facet signals with a magnitude tie. | Signals use the policy’s stable facet-ID order and show direction in text plus visual treatment. |
| RS-12 | Leave a registered facet unobserved while the layer is otherwise eligible. | The facet is absent from the signal list; it is not rendered as zero or called neutral. |
| RS-13 | Return only near-midpoint observed facet signals. | The layer says that no strong directional facet signal was observed instead of adding a synthetic neutrality facet. |

### Cross-layer pulls and methodology

| ID | Input/action | Expected result |
|---|---|---|
| RS-14 | Provide eligible profiles that satisfy one declared cross-layer rule. | One deterministic, neutral pull renders with participating layers/rule context; no contradiction or consistency score appears. |
| RS-15 | Make a required layer insufficient or remove a required observed facet. | The pull is suppressed and no replacement pull is inferred from labels or rounded values. |
| RS-16 | Open methodology before and after results. | The same active versioned content explains layers, responses, coverage, missing data, distance, family balance, ties, pulls, source posture, and the substantive promotion-review boundary. |
| RS-17 | Open a visible neighbor’s source note. | The family, source posture, version, and local provenance note are inspectable without a network request or copied source text. |

### Restart and share behavior

| ID | Input/action | Expected result |
|---|---|---|
| RS-18 | Activate Restart from ready results. | Answer map, results, and transient notices clear; the intro renders, app-owned hash is removed with no network/storage call, and focus moves to the intro heading. |
| RS-19 | Activate Restart twice. | The operation remains idempotent; no stale result or exception appears. |
| RS-20 | Activate Copy local share link with Clipboard API success. | A bounded versioned URL is created from answers only, copy success is announced, and the privacy warning remains visible. |
| RS-21 | Deny or omit Clipboard API. | The full URL appears in a readonly selectable control with manual-copy instructions; the result remains intact. |
| RS-22 | Make share encoding oversized or invalid. | No truncated link is copied; a concise recovery message appears and current results remain visible. |
| RS-23 | Inspect the generated fragment. | It contains only normalized answer state and schema/dataset/policy versions; it contains no profiles, anchor labels, source text, HTML, or analytics fields. |

### Malformed and stale recovery

| ID | Input/action | Expected result |
|---|---|---|
| RS-24 | Open a valid current share link. | The app restores known answers, recomputes results from current validated data, and focuses the results heading. |
| RS-25 | Open malformed base64url, invalid JSON, wrong schema, or oversized hash. | The app does not throw or render partial results; it shows safe intro recovery without echoing the payload. |
| RS-26 | Open a stale dataset or policy version. | The app rejects the state as stale, explains that the current dataset cannot interpret it, and offers a new local session. |
| RS-27 | Open a structurally valid envelope with unknown IDs and some valid known entries. | Unknown entries are ignored only after validation; known entries restore and results use current scoring. |
| RS-28 | Open a structurally valid envelope with no known entries. | The app returns to intro and does not render a partial political result. |

### Accessibility, responsive behavior, and security boundary

| ID | Input/action | Expected result |
|---|---|---|
| RS-29 | Complete the quiz using keyboard only. | Results heading, three layer sections, methodology, share action, fallback control, and restart are reachable in logical order. |
| RS-30 | Complete all three layers. | A combined pattern appears before the layer sections with descriptive, normative, and prescriptive contribution values; no overall winner or identity diagnosis appears. |
| RS-31 | Leave one layer below the coverage threshold. | The combined pattern is withheld with missing-layer guidance while every covered layer remains inspectable. |
| RS-30 | Trigger copy success, clipboard fallback, restart, and malformed recovery. | Each meaningful state is announced once through an appropriate live region and focus lands on the new state’s heading/control. |
| RS-31 | Render at small mobile, tablet, and wide desktop widths. | No horizontal overflow or clipped coverage, tie, source, share, or action content appears; the stacked reading order remains intact. |
| RS-32 | Enable `prefers-reduced-motion`. | Results, recovery, and reset remain immediately understandable without required animation. |
| RS-33 | Inspect with a screen reader and without color. | Layer, coverage, fit, tie, facet, pull, privacy, error, and action meanings are conveyed by text/structure, not color or position alone. |
| RS-34 | Monitor requests and storage APIs through completion, results, restart, share, and recovery. | No answer-storage network call, analytics call, implicit local-storage write, dynamic HTML injection, or `eval` occurs. |

## Implementation Strategy

### Phase 1: Red: lock the result contract first

- Confirm the section-02 result union exposes covered and insufficient layer states, coverage counts, observed facet signals, neighbor metadata, exact tie metadata, pull results, methodology versions, and provenance records.
- If a field is missing, add it to the section-02 domain contract and its pure fixtures before writing presentation code. Do not add a second result model inside React.
- Add deterministic view/handler tests for coverage boundaries, no-view/mixed semantics, tie disclosure, unobserved facets, pull suppression, restart idempotence, share success/fallback, and stale/malformed recovery.
- Add Playwright cases for result entry, keyboard focus, methodology disclosure, restart, clipboard fallback, mobile wrapping, and no-network behavior.
- Verify that the new tests fail before implementing the result surface.

### Phase 2: Green: implement the smallest consumer

- Add the ready/recoverable result branch to the existing application state machine.
- Render the gated combined pattern and three layer sections from the validated result bundle, using explicit covered/insufficient branching.
- Add coverage, facet, neighbor, tie, pull, source-note, and methodology presentation without duplicating domain arithmetic.
- Add restart and explicit share actions with History/Clipboard feature detection and the manual-copy fallback.
- Apply the existing editorial tokens, semantic structure, focus targets, live status, container queries, and reduced-motion rules.

### Phase 3: Refactor and verify

- Remove any accidental UI sorting, percentage-based tie inference, duplicate scoring, or local copies of layer definitions.
- Consolidate shared result labels and disclosure copy with the versioned methodology content.
- Verify that insufficient layers cannot receive neighbors or dependent pulls and that no-view never reaches a numeric display path.
- Check valid, malformed, stale, oversized, and unknown-entry share flows in both pure tests and the browser.
- Inspect long source notes and share URLs at mobile widths, and check focus after every state transition.
- Run strict build, unit tests, Playwright, static security inspection, and network/storage inspection before handing the section to later QA.

## Quality Gate

The section is complete only when all of the following are true:

- [ ] Results render the three layers separately in descriptive, normative, prescriptive order with no overall winner, recommendation, probability, or identity diagnosis.
- [ ] A covered result renders the equal-layer combined pattern with all three contributions; an insufficient combined result does not manufacture a label.
- [ ] Coverage appears before interpretation; exactly 50% is eligible and below 50% is `Insufficient information`.
- [ ] Answered/total and explicit no-view counts are visible, and mixed/midpoint is not confused with no-view/missing.
- [ ] Insufficient layers have no forced neighbor, internal fit, directional facet list, or dependent cross-layer pull.
- [ ] Covered layers render the bounded family-balanced neighbor list from scoring, with anchor family, summary, source posture, version, note, and fit legend.
- [ ] Exact tie metadata is disclosed only when supplied by pre-rounding scoring; rounded display values never create ties.
- [ ] Facet signals use observed facets only, have stable ordering, and never fabricate an unobserved zero or neutrality facet.
- [ ] Cross-layer pulls are conditional, neutral, deterministic, and never presented as contradiction, error, or consistency scoring.
- [ ] Methodology and provenance are available before/within results, use the active versions, and include the substantive promotion-review posture and absence of current-actor data.
- [ ] Restart clears in-memory state, removes the app-owned hash safely, restores focus, and performs no network or storage write.
- [ ] Share creation is explicit, bounded, versioned, answer-only, privacy-warned, and has a selectable manual-copy fallback for Clipboard failure.
- [ ] Malformed, stale, oversized, and empty/unknown share states recover without exception, partial interpretation, decoded HTML, or payload echo.
- [ ] Keyboard, screen-reader, focus, reduced-motion, contrast, and color-independent semantics are verified.
- [ ] Wide, tablet, and narrow layouts have no horizontal overflow or clipped neighbor, tie, source, methodology, share, or action content.
- [ ] Vitest, strict build, Playwright, static security checks, and network/storage checks pass; existing tests remain green.
- [ ] No API, database, account, analytics, live political data, adaptive logic, machine-learning classifier, or unplanned dependency was added.

## Risk & Rollback

| Risk | Impact | Mitigation | Rollback trigger and action |
|---|---|---|---|
| Insufficient coverage is rendered as a neutral or forced neighbor | High | Discriminated result union, visible counts, no-view tests, and an explicit no-neighbor branch | If an ineligible layer receives fit/neighbors, revert the result-branch change to the last validated covered/insufficient renderer and repair the domain boundary before re-enabling it. |
| Rounded fit values create false ties or false precision | High | Consume exact tie metadata from scoring, round only at display, and use limitation copy | If the UI infers ties or describes fit as probability, remove the presentation shortcut and return to the exact scoring metadata contract. |
| Facet signals duplicate or override scoring semantics | Medium | Domain-owned signal selection, stable policy order, no UI arithmetic, and unobserved-facet tests | If signal order or meaning changes when UI object order changes, remove the component-side selector and restore the scoring-owned list. |
| Family balancing looks like an objective taxonomy | High | Show family/source notes and its display-only limitation; avoid ranking/recommendation language | If copy implies that the taxonomy is complete or authoritative, roll back the copy and neighbor presentation until the methodology disclosure is corrected. |
| Cross-layer pull becomes a contradiction or consistency judgment | High | Render only typed rule output and neutral copy; suppress missing-layer rules | If a pull labels the respondent inconsistent or assigns severity, disable the pull block and restore the last neutral renderer while the rule contract is reviewed. |
| Share link is mistaken for private storage | High | Prominent non-private warning, explicit action, no auto-copy, and manual fallback | If the UI calls a hash private, secure, or encrypted, roll back share copy/action exposure and keep results local until the warning is fixed. |
| Clipboard permission or API behavior breaks the result page | Low | Feature detection, exception-safe promise handling, readonly fallback, and browser tests | If copy failure hides the link or results, remove the Clipboard call while retaining generated selectable text and retry after browser verification. |
| Restart leaves stale hash or answer state | Medium | Idempotent reset test, app-owned hash removal, focus assertion, and no storage boundary | If old results reappear after restart, roll back the reset/History integration and restore the last state-machine transition that clears derived results. |
| Malformed/stale hash reaches a renderer | High | Strict codec ownership, typed recovery, no payload echo, and Playwright hostile-input cases | If any hostile hash produces partial results, stop the release, restore intro recovery, and repair `src/share.ts` before accepting results state. |
| Responsive or assistive technology users cannot inspect a result | High | Semantic headings/lists, focus targets, no color-only meaning, wrapping tests, and reduced-motion checks | If a layer, warning, tie, or action is hidden or inaccessible, revert the layout change to the foundation reading field and repair incrementally. |
| Results expands into current political matching or persuasion | High | Preserve the explicit MVP boundary and scope gate; keep current actor data excluded | Hold the expansion and leave it deferred. Any future comparison feature requires a separate approved plan and data/provenance review. |

Rollback remains static and reversible because there is no server-side answer state:

1. Stop release if a quality-gate or privacy/accessibility check fails.
2. Revert results presentation, share UI, and policy-copy changes as one compatible static unit when their semantics changed together.
3. Restore the last validated dataset/policy/result contract versions as a compatible set; do not keep new labels with old share interpretation.
4. Reject unsupported share versions rather than silently migrating them, and route users to safe restart/recovery.
5. If a backward-compatible migration is later approved, implement it in the share/domain boundary with explicit fixtures before changing the results consumer.

## Acceptance Criteria

- [ ] A completed or validly restored answer map produces three distinct, coverage-first layer sections in the fixed layer order.
- [ ] Each layer shows answered/total coverage and explicit no-view counts; 50% is eligible, below 50% is insufficient, and no-view is never numeric zero.
- [ ] An insufficient layer renders a clear recovery-oriented explanation without neighbors, fit, directional facet signals, or dependent pulls.
- [ ] An eligible layer renders no more than three scoring-selected interpretive neighbors with family, summary, source posture, version, note, and internal-fit limitation.
- [ ] Exact scoring ties are disclosed with the stable family/anchor-ID order, while rounded display values never create tie text.
- [ ] Facet signals come from observed scoring output, have stable ordering, explain direction in text, and omit unobserved facets rather than calling them neutral.
- [ ] Cross-layer pulls are coverage-aware, rule-backed, neutral, and described as context rather than contradiction or consistency judgment.
- [ ] Results methodology repeats the three-layer definitions, response semantics, coverage rule, distance/family/tie policy, pull limitation, source posture, active versions, substantive promotion-review posture, and absence of current-actor data.
- [ ] Anchor/provenance notes are inspectable locally without remote data or copied source content.
- [ ] Restart clears in-memory answers and derived results, safely removes the app-owned hash, restores intro focus, and performs no persistence or network operation.
- [ ] Share creation occurs only after explicit activation, serializes answer state plus versions only, displays the non-private hash warning, and succeeds with either Clipboard or a selectable manual fallback.
- [ ] Malformed, stale, oversized, structurally empty, and unknown-entry share states fail closed, do not echo or execute payloads, and return to safe recovery when no known answers remain.
- [ ] Results and recovery are keyboard-operable, screen-reader-structured, focus-safe, color-independent, reduced-motion compatible, and responsive without horizontal overflow.
- [ ] The implementation remains within the existing React + TypeScript + Vite architecture and adds no API, database, account, analytics, live political data, adaptive logic, machine-learning classifier, or unapproved dependency.
- [ ] All RS-01 through RS-34 cases or equivalent evidence pass, along with the strict build and existing unit/browser suites.

## Previous v7 results boundary — 2026-08-26

The result surface consumes the v7 manifest and its 23 canonical scoring anchors. It remains coverage-first over 116-item layers, with eligibility at 58 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. The additional anchor profiles are source-backed editorial comparison records; the combined pattern and layer neighbors remain interpretive outputs, not political recommendations, identity assignments, or validated measurements. The v7 share bound is 32,768 characters and the complete measured answer fragment is 22,274 characters.

## Current v8 results boundary — 2026-08-26

The result surface consumes the v8 manifest and its 28 canonical scoring anchors. It remains coverage-first over 136-item layers, with eligibility at 68 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. The five v8 anchor profiles are source-backed editorial comparison records; the combined pattern and layer neighbors remain interpretive outputs, not political recommendations, identity assignments, or validated measurements. The finite share bound remains 32,768 characters, and the complete v8 answer round trip passes without truncation.

## Current v9 results boundary — 2026-08-26

The result surface consumes the v9 manifest and its 30 canonical scoring anchors. It remains coverage-first over 144-item layers, with eligibility at 72 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Populism and Mutualism are provisional editorial anchors, not validated measurements or identity assignments. The structural reachability audit verifies isolated routing for all production anchors and reports full-production top-three overlap as a diagnostic; it does not alter neighbor selection or claim respondent evidence.

## Current v10 results boundary — 2026-08-26

The result surface consumes the v10 manifest and its 32 canonical scoring anchors. It remains coverage-first over 152-item layers, with eligibility at 76 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Radical Conservatism and Reactionary Conservatism are provisional editorial anchors, not validated measurements or identity assignments. The structural reachability audit verifies isolated routing for all 32 production anchors and reports full-production top-three overlap as a diagnostic; it does not alter neighbor selection or claim respondent evidence.

## Current v11 results boundary — 2026-08-26

The result surface consumes the v11 manifest and its 33 canonical scoring anchors. It remains coverage-first over 156-item layers, with eligibility at 78 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Islamism is a provisional editorial anchor, not a validated measurement or identity assignment. The structural reachability audit verifies isolated routing for all 33 production anchors and reports full-production top-three overlap as a diagnostic; it does not alter neighbor selection or claim respondent evidence.

## Current v12 results boundary — historical — 2026-08-26

The result surface consumes the v12 manifest and its 34 canonical scoring anchors. It remains coverage-first over 160-item layers, with eligibility at 80 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Ordoliberalism is a provisional editorial anchor, not a validated measurement or identity assignment. The structural reachability audit verifies isolated routing for all 34 production anchors and reports full-production top-three overlap as a diagnostic; it does not alter neighbor selection or claim respondent evidence. The content version and finite share contract remain fail-closed for stale or incompatible answer fragments.

## Historical v13 results boundary — 2026-08-26

The result surface consumes the v13 manifest and its 35 canonical scoring anchors. It remains coverage-first over 164-item layers, with eligibility at 82 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Pan-Africanism is a provisional editorial anchor, not a validated measurement or identity assignment. Its isolated target-tagged 4/4/4 block routes through all three layers; the full-competition ranks 7, 6, and 7 by layer and 6 combined are retained as an overlap diagnostic. The content version and finite share contract remain fail-closed for stale or incompatible answer fragments.

## Current v14 results boundary — 2026-08-27

The result surface consumes the v14 manifest and its 36 canonical scoring anchors. It remains coverage-first over 168-item layers, with eligibility at 84 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Religious Nationalism is a provisional editorial anchor, not a validated measurement or identity assignment. Its isolated target-tagged 4/4/4 block routes through all three layers; the full-competition ranks 6, 19, and 11 by layer and 10 combined are retained as an overlap diagnostic. The content version and finite share contract remain fail-closed for stale or incompatible answer fragments.

## Current v15 results boundary — 2026-08-27

The result surface consumes the v15 manifest and its 37 canonical scoring anchors. It remains coverage-first over 172-item layers, with eligibility at 86 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Conservative Nationalism is a provisional editorial anchor, not a validated measurement or identity assignment. Its isolated target-tagged 4/4/4 block routes through all three layers; the full-competition ranks 5, 20, and 1 by layer and 2 combined are retained as overlap diagnostics. The complete share payload measures 33,459 characters under the finite 36,864-character guard; stale or incompatible fragments remain fail-closed.

## Files

| File | Responsibility | Change owner |
|---|---|---|
| `src/App.tsx` | Compose ready/recoverable result states; render layer sections, coverage, neighbors, ties, facet signals, pulls, methodology, restart, share warning, clipboard status, and manual-copy fallback; own focus and live-region behavior. | Section 04, using existing composition-root boundaries. |
| `src/styles.css` | Apply the editorial results reading field, stacked layer sections, accent rail, coverage/neighbor/facet/pull states, disclosures, focus/error states, container-query behavior, wrapping, and reduced-motion rules. | Section 04, using foundation/design-system tokens. |
| `src/types.ts` | Supply existing closed result contracts. Extend only if section 02 has not yet exposed typed covered/insufficient states, tie metadata, facet signals, or pull metadata; do not create parallel unions. | Section 02 contract owner; Section 04 may request a narrow contract extension. |
| `src/scoring.ts` | Supply pure combined and layer results, observed facet signals, family-balanced neighbors, exact tie metadata, coverage states, and cross-layer pulls. Section 04 consumes this file and must not duplicate its calculations. | Section 02; read-only consumer for this section. |
| `src/share.ts` | Supply strict versioned answer-only encoding and typed stale/invalid decoding. Section 04 owns the browser action/fallback, not the codec semantics. | Section 02; read-only consumer for this section. |
| `src/data.ts` | Supply validated layer/facet/anchor labels, methodology content, source registry, and active dataset/policy versions. | Section 02; read-only consumer for this section. |
| `src/results.test.ts` | Optional focused Vitest coverage for result-state projection, restart idempotence, tie disclosure, pull suppression, and clipboard fallback handlers if the foundation test harness supports it without a new UI library. | Section 04. |
| `tests/sorter.spec.ts` | Playwright coverage for result entry, coverage branches, neighbor/tie/facet/pull rendering, methodology, restart, valid/stale/malformed share recovery, Clipboard fallback, keyboard/focus, responsive layout, and no-network/storage behavior. | Sections 03/04. |
| `docs/plan/ideology-sorter/flow-diagrams/quiz-flow.mmd` | Read-only mapping for Calculate → Results. | Planning reference. |
| `docs/plan/ideology-sorter/flow-diagrams/scoring-flow.mmd` | Read-only mapping for Covered/Insufficient, facets, neighbors, ties, and pulls. | Planning reference. |
| `docs/plan/ideology-sorter/flow-diagrams/share-flow.mmd` | Read-only mapping for versioned encode/decode, validation, restore, Clipboard, and manual fallback. | Planning reference. |
| `docs/domain-dictionary.md` | Canonical vocabulary for no-view, internal fit, family balance, fail-closed recovery, provenance, and editorial review. | Read-only planning reference; do not edit in this section task. |

## Current v16 results boundary — 2026-08-27

The result surface consumes the v16 manifest and its 38 canonical scoring anchors. It remains coverage-first over 176-item layers, with eligibility at 88 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. National Socialism is a provisional historical analytical anchor, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 46.4912% layer top-three hit rate, a 63.1579% combined top-three hit rate, worst layer rank 35, and worst combined rank 31; National Socialism ranks 1/1/1 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The complete share payload measures 34,275 characters under the finite 36,864-character guard; stale or incompatible fragments remain fail-closed.

## Current v17 results boundary — 2026-08-27

The result surface consumes the v17 manifest and its 39 canonical scoring anchors. It remains coverage-first over 180-item layers, with eligibility at 90 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Civic Nationalism is a provisional context-sensitive anchor over the canonical `Nationalism → Civic Nationalism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 45.2991% layer top-three hit rate, a 61.5385% combined top-three hit rate, worst layer rank 36, and worst combined rank 32; Civic Nationalism ranks 10/6/7 by layer and 6 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The complete share payload measures 35,075 characters under the finite 36,864-character guard; stale or incompatible fragments remain fail-closed.

## Current v18 results boundary — 2026-08-27

The result surface consumes the v18 manifest and its 40 canonical scoring anchors. It remains coverage-first over 184-item layers, with eligibility at 92 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Black Nationalism is a provisional anchor over the canonical `Nationalism → Black Nationalism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 45.0000% layer top-three hit rate, a 60.0000% combined top-three hit rate, worst layer rank 37, and worst combined rank 33; Black Nationalism ranks 3/15/7 by layer and 4 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The complete share payload measures 35,875 characters under the finite 36,864-character guard; stale or incompatible fragments remain fail-closed.

## Current v29 results boundary — 2026-08-27

The result surface consumes the v29 manifest and its 51 canonical scoring anchors. It remains coverage-first over 228-item layers, with eligibility at 114 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Social Ecology is a provisional anchor over the existing typed hybrid `Green Anarchism → Social Ecology` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 36.6013% layer top-three hit rate, a 52.9412% combined top-three hit rate, worst layer rank 48, and worst combined rank 45; Social Ecology ranks 3/6/4 by layer and 2 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation measures 44,451 characters above the finite 40,960-character guard, so compact v2 at 7,350 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v30 results boundary — 2026-08-27

The result surface consumes the v30 manifest and its 52 canonical scoring anchors. It remains coverage-first over 232-item layers, with eligibility at 116 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Womanism is a provisional anchor over the existing canonical `Feminism → Womanism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 35.2564% layer top-three hit rate, a 51.9231% combined top-three hit rate, worst layer rank 49, and worst combined rank 46; Womanism ranks 43/43/43 by layer and 43 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation measures 45,107 characters above the finite 40,960-character guard, so compact v2 at 7,478 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v32 results boundary — 2026-08-27

The result surface consumes the v32 manifest and its 54 canonical scoring anchors. It remains coverage-first over 240-item layers, with eligibility at 120 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Anarcho-Communism is a provisional anchor over the existing canonical `Anarchism → Social Anarchism → Anarcho-Communism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 35.8025% layer top-three hit rate, a 51.8519% combined top-three hit rate, worst layer rank 51, and worst combined rank 47; Anarcho-Communism ranks 11/3/1 by layer and 1 combined in that fixture. The full-competition descriptive missing-layer field is a competition diagnostic, not a direct-coverage failure: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 7,734 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v33 results boundary — 2026-08-27

The result surface consumes the v33 manifest and its 55 canonical scoring anchors. It remains coverage-first over 244-item layers, with eligibility at 122 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Collectivist Anarchism is a provisional anchor over the existing canonical `Anarchism → Social Anarchism → Collectivist Anarchism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 33.3333% layer top-three hit rate, a 49.0909% combined top-three hit rate, worst layer rank 52, and worst combined rank 48; Collectivist Anarchism ranks 9/5/1 by layer and 1 combined in that fixture. The full-competition overlap and rank fields are competition diagnostics, not direct-coverage failures: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 7,862 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v34 results boundary — 2026-08-27

The result surface consumes the v34 manifest and its 56 canonical scoring anchors. It remains coverage-first over 248-item layers, with eligibility at 124 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Anarchism is a provisional family anchor over the existing canonical `Anarchism` macro, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 32.7381% layer top-three hit rate, a 48.2143% combined top-three hit rate, worst layer rank 53, and worst combined rank 47; Anarchism ranks 45/45/45 by layer and 45 combined in that fixture. The macro-family overlap and rank fields are competition diagnostics, not direct-coverage failures: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 7,990 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v35 results boundary — 2026-08-27

The result surface consumes the v35 manifest and its 57 canonical scoring anchors. It remains coverage-first over 252-item layers, with eligibility at 126 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Conservatism is a provisional family anchor over the existing canonical `Conservatism` macro, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 33.3333% layer top-three hit rate, a 49.1228% combined top-three hit rate, worst layer rank 53, and worst combined rank 47; Conservatism ranks 38/46/4 by layer and 18 combined in that fixture. The macro-family overlap and rank fields are competition diagnostics, not direct-coverage failures: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 8,118 characters is emitted; stale or incompatible fragments remain fail-closed.

## Current v36 results boundary — 2026-08-27

The result surface consumes the v36 manifest and its 58 canonical scoring anchors. It remains coverage-first over 256-item layers, with eligibility at 128 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Ecologism / Green Ideology is a provisional family anchor over the existing canonical `Ecologism` macro, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 33.3333% layer top-three hit rate, a 48.2759% combined top-three hit rate, worst layer rank 54, and worst combined rank 48; Ecologism ranks 21/48/3 by layer and 8 combined in that fixture. The macro-family overlap and rank fields are competition diagnostics, not direct-coverage failures: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 8,246 characters is emitted; stale or incompatible fragments remain fail-closed.
## Current v37 results boundary — 2026-08-27

The result surface consumes the v37 manifest and its 59 canonical scoring anchors. It remains coverage-first over 260-item layers, with eligibility at 130 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Liberalism is a provisional family anchor over the existing canonical `Liberalism` macro, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 33.3333% layer top-three hit rate, a 47.4576% combined top-three hit rate, worst layer rank 55, and worst combined rank 48; Liberalism ranks 10/24/11 by layer and 9 combined in that fixture. The macro-family overlap and rank fields are competition diagnostics, not direct-coverage failures: isolated routing is complete in all three layers. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The readable v1 complete-answer representation remains above the finite 40,960-character guard, so compact v2 at 8,374 characters is emitted; stale or incompatible fragments remain fail-closed.
## v38 results continuation — Socialism macro family

The v38 result surface consumes 60 canonical scoring anchors across 264-item layers, with coverage eligibility at 132 answered items per layer. Socialism's isolated target fixture reaches the intended anchor in all three layers and in the combined calculation. In full production competition it ranks 18/6/48 by layer and 7 combined; aggregate top-three rates are 32.7778% by layer and 45.0000% combined, with worst ranks 56 and 47. These are deterministic design diagnostics, not respondent evidence or identity assignments. The compact v2 complete-answer share fragment is 8,502 characters and remains within the finite guard.

## v39 results continuation — Nationalism macro family

The v39 result surface consumes 61 canonical scoring anchors across 268-item layers, with coverage eligibility at 134 answered items per layer. Nationalism's isolated target fixture reaches the intended anchor in all three layers and in the combined calculation. In full production competition it ranks 28/32/14 by layer and 19 combined; aggregate top-three rates are 31.6940% by layer and 45.9016% combined, with worst ranks 57 and 48. These are deterministic design diagnostics, not respondent evidence or identity assignments. The compact v2 complete-answer share fragment is 8,630 characters and remains within the finite guard.

## v40 results continuation — Republicanism macro family

The v40 result surface consumes 62 canonical scoring anchors across 272-item layers, with coverage eligibility at 136 answered items per layer. Republicanism's isolated target fixture reaches the intended anchor in all three layers and in the combined calculation. In full production competition it ranks 7/1/49 by layer and 4 combined; aggregate top-three rates are 29.5699% by layer and 46.7742% combined, with worst ranks 58 and 50. These are deterministic design diagnostics, not respondent evidence or identity assignments. The compact v2 complete-answer share fragment is 8,758 characters and remains within the finite guard.

## Current v41 results boundary — 2026-08-27

The result surface consumes the v41 manifest and its 63 canonical scoring anchors. It remains coverage-first over 276-item layers, with eligibility at 138 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Feminism is a provisional family anchor over the existing canonical `Feminism` macro, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers in the isolated structural fixture. The full-production diagnostic reports a 30.6878% layer top-three hit rate, a 46.0317% combined top-three hit rate, worst layer rank 59, and worst combined rank 50; Feminism ranks 1/2/46 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 8,886 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v42 results boundary — 2026-08-27

The result surface consumes the v42 manifest and its 64 canonical scoring anchors. It remains coverage-first over 280-item layers, with eligibility at 140 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Anarcho-Syndicalism is a provisional micro-branch anchor under Social Anarchism, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 31.25% layer top-three hit rate, a 46.875% combined top-three hit rate, worst layer rank 60, and worst combined rank 51; Anarcho-Syndicalism ranks 15/8/1 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,014 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v43 results boundary — 2026-08-27

The result surface consumes the v43 manifest and its 65 canonical scoring anchors. It remains coverage-first over 284-item layers, with eligibility at 142 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Anarcho-Capitalism is a provisional micro-branch anchor under Libertarianism, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 32.8205% layer top-three hit rate, a 49.2308% combined top-three hit rate, worst layer rank 61, and worst combined rank 52; Anarcho-Capitalism ranks 12/1/1 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,142 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v44 results boundary — 2026-08-27

The result surface consumes the v44 manifest and its 66 canonical scoring anchors. It remains coverage-first over 288-item layers, with eligibility at 144 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Anarcho-Primitivism is a provisional micro-branch anchor in the existing Green Anarchism relation, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 32.3232% layer top-three hit rate, a 48.4848% combined top-three hit rate, worst layer rank 62, and worst combined rank 53; Anarcho-Primitivism ranks 9/33/1 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,270 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v45 results boundary — 2026-08-27

The result surface consumes the v45 manifest and its 67 canonical scoring anchors. It remains coverage-first over 292-item layers, with eligibility at 146 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Austromarxism is a provisional micro-branch anchor on the existing `Socialism → Marxism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 31.3433% layer top-three hit rate, a 49.2537% combined top-three hit rate, worst layer rank 63, and worst combined rank 54; Austromarxism ranks 8/5/2 by layer and 2 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,398 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v46 results boundary — 2026-08-27

The result surface consumes the v46 manifest and its 68 canonical scoring anchors. It remains coverage-first over 296-item layers, with eligibility at 148 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Egalitarian-Liberal Feminism is a provisional micro-branch anchor on the existing `Liberal Feminism` meso-root path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 31.8627% layer top-three hit rate, a 48.5294% combined top-three hit rate, worst layer rank 64, and worst combined rank 55; Egalitarian-Liberal Feminism ranks 54/57/2 by layer and 53 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,526 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v47 results boundary — 2026-08-27

The result surface consumes the v47 manifest and its 69 canonical scoring anchors. It remains coverage-first over 300-item layers, with eligibility at 150 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Buddhist Nationalism is a provisional micro-branch anchor on the existing `Religious Nationalism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 30.9179% layer top-three hit rate, a 47.8261% combined top-three hit rate, worst layer rank 65, and worst combined rank 56; Buddhist Nationalism ranks 18/43/17 by layer and 22 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,654 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v48 results boundary — 2026-08-27

The result surface consumes the v48 manifest and its 70 canonical scoring anchors. It remains coverage-first over 304-item layers, with eligibility at 152 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Cultural / Spiritual Ecofeminism is a provisional micro-branch anchor on the existing `Ecofeminism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers. The full-production diagnostic reports a 29.5238% layer top-three hit rate, a 45.7143% combined top-three hit rate, worst layer rank 66, and worst combined rank 57; Cultural / Spiritual Ecofeminism ranks 13/10/8 by layer and 6 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,782 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v49 results boundary — 2026-08-27

The result surface consumes the v49 manifest and its 71 canonical scoring anchors. It remains coverage-first over 308-item layers, with eligibility at 154 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Materialist / Socialist Ecofeminism is a provisional micro-branch anchor on the existing `Ecofeminism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers and the combined calculation. The full-production diagnostic reports a 27.2300% layer top-three hit rate, a 45.0704% combined top-three hit rate, worst layer rank 67, and worst combined rank 59; Materialist / Socialist Ecofeminism ranks 2/1/2 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 9,910 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v50 results boundary — 2026-08-27

The result surface consumes the v50 manifest and its 72 canonical scoring anchors. It remains coverage-first over 312-item layers, with eligibility at 156 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Christian Nationalism is a provisional micro-branch anchor on the existing `Religious Nationalism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 26.8519% layer top-three hit rate, a 45.8333% combined top-three hit rate, worst layer rank 68, and worst combined rank 60; Christian Nationalism ranks 8/47/1 by layer and 2 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 10,038 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v52 results boundary — 2026-08-27

## Current v53 results boundary — 2026-08-28

The result surface consumes the v53 manifest and its 75 canonical scoring anchors. It remains coverage-first over 324-item layers, with eligibility at 162 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Cultural Nationalism is a provisional micro-branch anchor on the existing Nationalism → Cultural Nationalism path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers. The full-production diagnostic reports a 25.7778% layer top-three hit rate, a 45.3333% combined top-three hit rate, worst layer rank 71, and worst combined rank 63; Cultural Nationalism ranks 16/38/17 by layer and 19 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 10,422 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

The result surface consumes the v52 manifest and its 74 canonical scoring anchors. It remains coverage-first over 320-item layers, with eligibility at 160 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Cultural Feminism is a provisional micro-branch anchor on the existing `Feminism → Radical Feminism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers. The full-production diagnostic reports a 26.1261% layer top-three hit rate, a 45.9459% combined top-three hit rate, worst layer rank 70, and worst combined rank 62; Cultural Feminism ranks 12/32/16 by layer and 11 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 10,294 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v51 results boundary — 2026-08-27

The result surface consumes the v51 manifest and its 73 canonical scoring anchors. It remains coverage-first over 316-item layers, with eligibility at 158 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Egoist Anarchism is a provisional micro-branch anchor on the existing `Anarchism → Individualist Anarchism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers and the combined calculation in the isolated structural fixture. The full-production diagnostic reports a 26.9406% layer top-three hit rate, a 46.5753% combined top-three hit rate, worst layer rank 69, and worst combined rank 61; Egoist Anarchism ranks 27/6/1 by layer and 1 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary scorer retuning. The compact v2 complete-answer share fragment is 10,166 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

## Current v54 results boundary — 2026-08-28

The result surface consumes the v54 manifest and its 76 canonical scoring anchors. It remains coverage-first over 328-item layers, with eligibility at 164 answered items, and retains five contextual-only anchors for provenance without admitting them as production neighbors. Ethnocultural Nationalism is a provisional micro-branch anchor on the existing `Nationalism → Ethnocultural Nationalism` path, not a validated measurement or identity assignment; its 4/4/4 target-tagged block routes through all three isolated layers. The full-production diagnostic reports a 26.3158% layer top-three hit rate, a 46.0526% combined top-three hit rate, worst layer rank 72, and worst combined rank 64; Ethnocultural Nationalism ranks 15/28/1 by layer and 3 combined in that fixture. These are design diagnostics, not respondent evidence and not grounds for arbitrary retuning. The compact v2 complete-answer share fragment is 10,550 characters and remains within the finite guard; stale or incompatible fragments remain fail-closed.

The v54 browser, container, and structural checks confirm delivery behavior only. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## Current v55 results boundary — 2026-08-28

The result surface consumes content version 55 with 996 prompts and 77 canonical production anchors. The existing `Feminism → Lesbian Feminism` path now has twelve target-tagged questions, four per claim layer, and a provisional anchor. Lesbian Feminism passes isolated structural routing in all three layers; its full-production ranks are 3/16/10 by layer and 4 combined. Aggregate top-three rates are 26.8398% by layer and 44.1558% combined, with worst ranks 73 and 65. These values are deterministic overlap diagnostics, not respondent evidence, psychometric evidence, or grounds for uncalibrated scorer or picker retuning.

The compact v2 share payload measures 10,678 characters and stale or malformed fragments remain fail-closed. The 1,428 research candidates remain effect-free and quarantined; 25 canonical ontology targets remain catalog-only, five contextual bridge anchors remain excluded from production scoring, and Fascism remains a high-risk catalog-only hold. Local and Docker-backed browser QA both pass 10/10, with the first container health probe requiring a bounded startup retry. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## Current v56 results boundary — 2026-08-28

The result surface consumes content version 56 with 1,008 prompts and 78 canonical production anchors. The existing `Conservatism → Moderate Conservatism → One-Nation Conservatism` path now has twelve target-tagged questions, four per claim layer, and a provisional anchor. One-Nation Conservatism passes isolated structural routing in all three layers; its full-production ranks are 15/30/1 by layer and 5 combined. Aggregate top-three rates are 26.9231% by layer and 43.5897% combined, with worst ranks 74 and 67. These values are deterministic overlap diagnostics, not respondent evidence, psychometric evidence, or grounds for uncalibrated scorer or picker retuning.

The compact v2 share payload measures 10,817 characters and stale or malformed fragments remain fail-closed. The 1,428 research candidates remain effect-free and quarantined; 24 canonical ontology targets remain catalog-only, five contextual bridge anchors remain excluded from production scoring, and Fascism remains a high-risk catalog-only hold. Local and Docker-backed browser QA both pass 10/10; the initial local run exposed a stale catalog-only assertion for the newly scored target, which was repaired before the green rerun. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## Current v57 results boundary — 2026-08-28

The result surface consumes content version 57 with 1,020 prompts and 79 canonical production anchors. The existing `Nationalism → Zionism` path now has twelve target-tagged questions, four per claim layer, and a provisional anchor. Zionism passes isolated structural routing in all three layers; its full-production ranks are 27/25/19 by layer and 19 combined. Aggregate top-three rates are 26.5823% by layer and 43.0380% combined, with worst ranks 75 and 68. These values are deterministic overlap diagnostics, not respondent evidence, psychometric evidence, or grounds for uncalibrated scorer or picker retuning.

The compact v2 share payload measures 10,961 characters and stale or malformed fragments remain fail-closed. The 1,428 research candidates remain effect-free and quarantined; 23 canonical ontology targets remain catalog-only, five contextual bridge anchors remain excluded from production scoring, and Fascism remains a high-risk catalog-only hold. Local and Docker-backed browser QA both pass 10/10. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.

## Current v58 results boundary — 2026-08-28

The result surface consumes content version 58 with 1,032 prompts and 80 canonical production anchors. The existing `Islamism → Khomeinism` path now has twelve target-tagged questions, four per claim layer, and a provisional anchor. Khomeinism passes isolated structural routing in all three layers; its full-production ranks are 4/31/1 by layer and 1 combined. Aggregate top-three rates are 26.2500% by layer and 43.7500% combined, with worst ranks 76 and 69. These values are deterministic overlap diagnostics, not respondent evidence, psychometric evidence, or grounds for uncalibrated scorer or picker retuning.

The compact v2 share payload measures 11,105 characters and stale or malformed fragments remain fail-closed. The 1,428 research candidates remain effect-free and quarantined; 22 canonical ontology targets remain catalog-only, five contextual bridge anchors remain excluded from production scoring, and Fascism remains a high-risk catalog-only hold. Local and Docker-backed browser QA both pass 10/10. No cognitive review, respondent testing, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. No commit or push was performed; the repository remains uncommitted on `master`.
