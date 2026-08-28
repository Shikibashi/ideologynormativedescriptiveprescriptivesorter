# Section 03: Quiz Flow

## Current implementation continuation — 2026-08-26

The live flow contains 408 original prompts, 136 in each of the descriptive, normative, and prescriptive layers. Earlier 48-item, 204-item, 252-item, and 348-item counts in this section describe historical baselines; the current manifest remains the source of truth for progress and transition boundaries. The v8 source-backed blocks remain provisional, and no cognitive review, respondent evidence, substitute simulation, or psychometric validation was run.

## Background

This section implements the user-facing path from the introduction through the fixed 408-item questionnaire. It solves two problems from the feature brief:

- It keeps descriptive, normative, and prescriptive reasoning visibly separate instead of presenting one undifferentiated ideological label.
- It makes a long questionnaire readable, navigable, keyboard-friendly, and honest about unanswered views.

The flow is client-side only. Temporary answers live in React state and are passed to the results/scoring boundary when the final item is completed. This section does not add an API, account, analytics event, remote answer store, adaptive questioning, or political actor matching.

The current questionnaire contains 136 items in each layer, in the order descriptive, normative, prescriptive:

1. Descriptive: what the user thinks is true about social and political systems.
2. Normative: what the user regards as good, just, valuable, or worth protecting.
3. Prescriptive: which institutions, policies, or strategies the user prefers.

The result must remain an interpretive calculation, not a scientific test, diagnosis, recommendation, or claim that the user belongs to a political tradition.

## Requirements

### Intro

- Render an introductory view before any question is shown.
- Explain the three layers in plain language using the same definitions as the rest of the product.
- State that the tool is non-scientific and interpretive, and that the result keeps diagnosis, values, and preferred means distinct.
- State that the flow contains 408 items and that the user may select No view yet when a statement does not apply or they do not have a considered view.
- Make the methodology/source destination visible before starting. The link may target the methodology section in the same page; it must not require a remote service.
- Provide one primary Start the 408-item flow action.
- Keep the introduction recoverable if a valid in-memory answer map already exists. Starting again must not silently transmit or persist answers.

### Question state

- Render exactly one question at a time from the validated static question manifest.
- Show the current layer label, the question domain, the prompt, optional context, and a stable progress indicator.
- Preserve the answer for the current question when moving forward, moving backward, or changing it.
- Do not advance when the current question has no selected response.
- Clear a stale validation message as soon as a valid response is selected.
- Treat an explicitly selected response as complete even when its value is No view yet.
- Keep the answer map keyed by question ID so reordering or rendering changes cannot associate an answer with the wrong question.
- Pass an immutable snapshot of the completed answer map to the application/results boundary only after the final item has a valid response.
- Do not compute ideological fit, fetch data, or write answer data to a server in this section.
- If the application receives a validated answer map from the share/data boundary, use only the validated map; this section must not trust or decode a raw URL fragment.

### The six response states

The six choices are mutually exclusive radio options. The labels and stored values are part of the user-facing contract and must not be changed casually.

| Response label | Stored value | Navigation behavior | Interpretation handoff |
|---|---:|---|---|
| Strongly disagree | -2 | Completes the item and permits Next | Directional response |
| Disagree | -1 | Completes the item and permits Next | Directional response |
| Mixed / depends | 0 | Completes the item and permits Next | Explicit midpoint; it is not missing |
| Agree | +1 | Completes the item and permits Next | Directional response |
| Strongly agree | +2 | Completes the item and permits Next | Directional response |
| No view yet | no-view | Completes the item and permits Next | Missing information; never coerce it to 0 |

The initial unselected state is not a seventh response. It is an incomplete UI state that must block forward navigation. No view yet counts toward navigation progress because the item has been intentionally answered, but it is excluded from the coverage numerator and facet denominators by the scoring contract. Mixed / depends counts as answered coverage and is stored as the midpoint value 0.

### Progress

- Show the current position as Item N of 408.
- Show layer progress as completed items in the current layer out of 136.
- Count all six explicit responses, including No view yet, as completed for navigation progress.
- Do not describe No view yet as neutral, answered midpoint, or zero in progress/help text.
- At a layer boundary, keep the completed count at 136 or 272 until the next question is displayed; then show the next item and layer.
- The progress display must be derived from the question manifest and answer map rather than duplicated counters.
- The final item must be Item 408 of 408 before completion is handed off.

### Back and Next

- Render Back and Next controls with native button semantics.
- Next is enabled only as an action that validates the current response; an unselected question remains visible and receives a clear required-response message.
- Back from any question after the first moves to the preceding question and restores its selected answer.
- A restored answer can be replaced with any of the six response states before continuing.
- Back from the first question returns to the intro without deleting the in-memory answer map.
- On a layer-transition notice, Back returns to the last question of the completed layer and preserves its answer; Continue moves to the first question of the next layer.
- On the final item, Next hands the completed answer map to the results boundary rather than rendering a nonexistent Item 49.
- Back and Next must work with keyboard activation and must not depend on pointer-only events.

### Layer transitions

- Detect a transition from the current question's layer to the next question's layer from the validated manifest.
- Show an explicit orientation notice after item 16 and after item 32, before rendering the first item of the next layer.
- The notice must name both the completed and incoming layers and repeat the incoming layer's plain-language purpose.
- The notice must state that the next items are a different kind of claim, not a correction or continuation of the previous score.
- Provide an explicit Continue to [layer] action and a Back action.
- Move focus to the transition heading or notice region when the notice appears.
- After Continue, move focus to the next question heading/prompt, not to an unrelated page element.
- Do not show a transition notice at the beginning or after the final item.
- If the static manifest does not preserve the expected layer order or 16-item boundaries, fail closed with a recoverable application error instead of silently labeling the wrong layer.

### Focus and accessibility

- Use a main landmark for the flow and a programmatic heading for each view.
- Render response choices inside a fieldset with a legend containing the question prompt or an equivalent accessible name.
- Use native radio inputs and labels, or an equally accessible control with one selected value and one tab stop for the group.
- Expose the current layer and progress in text; never use vermilion, border style, or position as the only layer signal.
- Give the question region an accessible name and a stable programmatic focus target with tabIndex -1.
- After Start, Next, Back, Continue, or a question change, move focus to the new question heading/prompt once the view has rendered.
- When Next is attempted with no response, render an inline error associated with the fieldset, announce it through an appropriate live/status relationship, and move focus to the error or first response control without creating a focus trap.
- Preserve visible focus rings using the design-system tokens.
- Keep keyboard order logical: heading/context, response group, Back, Next.
- Do not auto-submit when a radio option is selected; selection and navigation are separate actions.
- Respect prefers-reduced-motion. Any entrance or transition animation must be optional opacity/translate motion and must not be required to understand state.
- Do not use a timer, hover state, or color-only cue to communicate a required response or layer change.

### Responsive behavior

- Use the editorial research-notebook direction from design-system.md: warm paper surface, serif display, calm sans body, vermilion signal accent, rules, and restrained motion.
- On wide screens, use the quiz reading field: metadata/progress at the top, a readable prompt column, and a bordered answer list with enough whitespace for careful reading.
- On narrow screens, collapse to one column, keep the prompt and response labels within the viewport, and avoid horizontal scrolling.
- Make response rows and navigation controls large enough for touch use while preserving visible focus and clear text wrapping.
- Keep the layer label, question prompt, response group, validation message, and navigation controls in a stable reading order.
- Prefer container-query behavior for reusable question blocks and page-level media queries only for outer gutters/navigation as described by the design system.
- Check at small mobile widths, a typical tablet width, and a wide desktop width. No layout state may hide the current question or the selected response.

## Dependencies

- Requires section-01-foundation: React + TypeScript + Vite shell, strict domain contracts, static layout tokens, and test harness.
- Requires section-02-data-methodology: validated 48-item question manifest, layer/domain metadata, Answer and AnswerMap types, response/scoring policy, and methodology copy.
- Consumes the question ordering and layer definitions from the static dataset; it must not maintain a second question list or layer taxonomy.
- Hands the final immutable AnswerMap to section-04-results for coverage-aware interpretation, facet signals, tensions, restart, and share actions.
- Blocks section-04-results because results cannot render a trustworthy completed profile until this flow guarantees a valid response for every navigated item.
- No API endpoint, database migration, authentication dependency, or new remote service is permitted.

## Flow Diagram Nodes

- Diagram: flow-diagrams/quiz-flow.mmd
- Nodes owned by this section:
  - Start: render the Intro view.
  - Begin: start the fixed 48-item flow.
  - Question: render the current layer, prompt, response group, progress, and navigation.
  - Answer: validate whether a response is selected.
  - Stay: keep the current question and explain that a response is required.
  - Last: branch between advancing and completing.
  - More: advance while preserving the selected answer.
  - Transition: detect a layer boundary.
  - Notice: orient the user to the incoming layer before the next question.
  - Calculate handoff: provide the completed answer map to the results/scoring boundary.
- Branches:
  - Answer = No: remain on the same question and show the required-response message.
  - Answer = Yes and Last = No: advance to the next question or transition notice.
  - Answer = Yes and Last = Yes: complete the quiz and hand off the answer snapshot.
  - Transition = Yes: show the layer orientation notice.
  - Transition = No: render the next question directly.
- The Results node is implemented by section-04-results; this section owns the handoff into it.

## Reference Libraries

Use the versions pinned by section-01-foundation in package.json. Do not add a library merely to render a radio group or manage this finite state machine.

| Library or platform | Version policy | Use |
|---|---|---|
| React and React DOM | Pinned by foundation | Compose Intro, Question, and Transition views and manage the local reducer/state boundary. |
| TypeScript | Strict version pinned by foundation | Enforce Layer, Answer, AnswerMap, question, and reducer action contracts. |
| Vite | Pinned by foundation | Build the static browser application. |
| Vitest | Pinned by foundation | Test deterministic quiz state transitions and response storage where the configured harness permits. |
| Playwright | Pinned by foundation | Verify the complete keyboard/pointer flow, transitions, focus targets, and responsive rendering. |
| Native browser controls and CSS | Browser baseline defined by foundation | Accessible radio groups, buttons, focus behavior, container-query layout, and reduced-motion behavior. |

No form-management, UI-component, animation, analytics, or state-persistence package is required for this section.

## Implementation

### State boundary

Keep the quiz state machine inside the existing application composition root unless section-01-foundation establishes a dedicated internal file. Do not create a parallel state layer.

Use a discriminated view state so invalid combinations are difficult to represent:

- Intro view: no current item is rendered; preserve any in-memory answers if the user navigates back.
- Question view: current question index, answer map, and optional validation message.
- Transition view: completed layer, incoming layer, next question index, answer map, and optional navigation message.

The answer map is the source of truth. Derive the current question, layer progress, and completion counts from the validated questions array and this map. Do not increment a separate counter that can drift when the user goes Back or changes a response.

A reducer-style transition boundary is preferred for deterministic behavior. Actions should cover Start, SelectAnswer, Next, Back, ContinueTransition, and ClearError. The reducer must reject out-of-range indices and invalid answer values rather than rendering an arbitrary record.

### Intro rendering

Build the intro as a quiet reading surface consistent with the editorial notebook contract:

- Product title and concise framing statement.
- Three layer explanations in a labeled rail or stacked reading block.
- Non-scientific/interpretive disclaimer near the primary action, not hidden in methodology.
- 48-item estimate and No view yet explanation.
- Methodology/source link visible before Start.
- Primary Start the 48-item flow button.

The intro should not display a political identity, preview a winner, or imply that completion produces a recommendation. The button starts at the first validated question and clears only transient validation/transition state; it must not call a network endpoint.

### Question rendering

For the current question:

1. Resolve the question by index from the static manifest.
2. Render the layer label and domain metadata.
3. Render the question prompt and optional context in the prompt column.
4. Render the six response options in a fieldset/legend group.
5. Mark the stored option as selected when an answer exists.
6. Render current-position and layer-completion progress.
7. Render any validation message adjacent to the response group.
8. Render Back and Next in a predictable order.

Use stable question IDs for input IDs and label associations. The selected value is controlled by the answer map. A question with no entry in the map has no selected radio; a question with no-view has the No view yet radio selected.

When an answer is selected, update only that question ID, preserve all other entries, and clear the current validation message. The selection event must not advance the flow.

### Navigation and validation

Next performs the following deterministic sequence:

1. Read the answer for the current question ID.
2. If it is undefined, keep the current Question view, set a plain-language required-response message, and move focus to the error or response group.
3. If it is a valid response and another question exists, preserve the answer.
4. If the next question has a different layer, enter Transition view with the next index.
5. Otherwise enter Question view for the next index.
6. If no question remains, emit the immutable completed AnswerMap to the results boundary.

Back performs the following sequence:

1. From Transition view, return to the last question of the completed layer.
2. From Question view with index greater than zero, decrement the index and preserve answers.
3. From Question view at index zero, return to Intro and preserve the in-memory answer map.
4. After rendering the destination, move focus to its heading/prompt.

Do not erase a previous answer when going Back. If the user changes it, the new value replaces the old value under the same question ID and is the value handed to scoring.

### Progress derivation

Use separate derived values to prevent missing information from being mistaken for a neutral answer:

- completedOverall: count of answer-map entries with one of the six explicit response values.
- completedInLayer: the same count restricted to the current layer.
- currentPosition: current index plus one, displayed from 1 through 48.
- totalItems: validated question-manifest length, asserted to be 48 by section-02 validation.
- coverage inputs: left to scoring; No view yet is not converted to numeric zero and is not counted as answered coverage.

Progress text should say Completed N of 48 or equivalent, not Answered N of 48 when No view yet is included. A supplementary note may state that No view yet records missing information for the final interpretation.

### Layer transition notice

Derive the boundary from adjacent question records. The expected boundaries are after descriptive item 16 and normative item 32, but the implementation should validate the full manifest and fail closed if a boundary moves without a corresponding valid layer sequence.

The notice should include:

- Completed layer label and its one-sentence definition.
- Incoming layer label and its one-sentence definition.
- A sentence explaining that the kind of claim is changing.
- Current completed progress, such as 16 of 48.
- Back and Continue to [incoming layer] actions.

Use a heading with a stable focus target and a live/status relationship only for the concise transition announcement. Do not repeatedly announce the entire question or duplicate the notice on every rerender. Continue moves to the next question and updates the layer progress.

### Completion handoff

When the last response is valid, create a new answer-map object containing the latest selection and pass it to the existing app-level results transition. The handoff must occur after the state update is incorporated; it must not use a stale closure that omits the final answer.

Section 03 does not decide whether a layer is sufficiently covered or select anchors. Section 04/section-02 scoring owns that interpretation. The flow's responsibility ends at a complete, validated response map and a stable transition to results.

### Styling and responsive behavior

Apply the design-system tokens rather than inventing a second palette or typography system:

- Warm paper and paper-deep surfaces.
- Ink and muted-ink text with ink rules.
- Vermilion signal for active annotation/focus-adjacent emphasis, paired with text and borders.
- Newsreader for display headings and DM Sans for controls/body, using only loaded weights.
- Bordered answer list with clear selected and focus states.
- One readable prompt column rather than a repeated dashboard card grid.
- min-height: 100dvh for the page shell and no fixed-height question container.
- Container-query rules for the question block; page media queries only for outer layout changes.
- Reduced-motion fallback that leaves all content immediately readable.

Test long prompts, optional context, selected labels, validation text, and transition copy with wrapping. Avoid absolute positioning that can overlap the response list or navigation at narrow widths.

### Defensive failure behavior

If the question manifest is invalid, empty, out of order, or does not satisfy the expected three-layer sequence, do not render a misleading quiz. Show a recoverable application error with a route back to the intro or methodology surface, and record the failure through the existing development/test diagnostics. Do not silently substitute a fallback question list in the UI.

## Test Scenarios

### Intro and question entry

| Case | Input/action | Expected result |
|---|---|---|
| Initial load | Open the app with no answer map | Intro renders with three layer definitions, interpretive disclaimer, methodology link, and Start action. |
| Start | Activate Start the 48-item flow | Question 1 of 48 renders; the descriptive layer label and first prompt are visible; focus moves to the question heading/prompt. |
| Start with prior in-memory answers | Return to intro, then activate Start | The flow begins at the first validated question without network activity; the behavior for prior answers is deterministic and does not silently upload them. |
| Question metadata | Render a normal item with context | Layer, domain, prompt, optional context, six controls, progress, Back, and Next are present in a logical reading order. |

### Response and navigation behavior

| Case | Input/action | Expected result |
|---|---|---|
| Six response states | Select each of Strongly disagree, Disagree, Mixed / depends, Agree, Strongly agree, and No view yet on separate runs | The matching stored value is used; each selection permits Next; no selection is coerced to another state. |
| Missing response | Activate Next with no radio selected | The same question remains visible, no answer-map entry is created, a required-response message appears, and focus moves to the error or response group. |
| Directional response | Select Agree and activate Next | The current question ID stores +1 and the next item renders with progress advanced by one. |
| Mixed response | Select Mixed / depends and activate Next | The current question ID stores 0 and the answer remains distinguishable from no-view. |
| No-view response | Select No view yet and activate Next | The current question ID stores no-view, progress advances, and no-view is not stored as 0 or described as neutral. |
| Back preservation | Answer a question, activate Next, then Back | The prior question renders with the selected response still checked. |
| Change after Back | Return to an answered question and select a different response | The same question ID is replaced with the new value; later navigation uses the replacement. |
| First-question Back | Activate Back on Question 1 | Intro renders, the in-memory answer map is retained, and no remote request occurs. |

### Layer boundaries and completion

| Case | Input/action | Expected result |
|---|---|---|
| Descriptive boundary | Complete item 16 and activate Next | Transition notice identifies descriptive as completed and normative as incoming; item 17 is not skipped; focus moves to the notice heading. |
| Transition Continue | Activate Continue to normative | Question 17 renders with normative label and definition; focus moves to its question heading/prompt. |
| Transition Back | Activate Back on the descriptive-to-normative notice | Question 16 renders with its answer preserved. |
| Normative boundary | Complete item 32 and activate Next | Transition notice identifies normative as completed and prescriptive as incoming; item 33 is next after Continue. |
| Final item | Complete item 48 and activate Next | Results boundary receives an immutable map containing the item-48 response; no item 49 appears and no premature result is emitted. |
| Incomplete layer | Complete fewer than half of a layer using directional responses and no-view choices | The flow still permits completion when every item has an explicit response; the scoring/results boundary, not the navigation layer, reports insufficient coverage. |

### Accessibility and responsive behavior

| Case | Input/action | Expected result |
|---|---|---|
| Keyboard-only completion | Use Tab, arrow keys, Enter, and Space without a pointer | Intro, radio group, Back, Next, transition Continue, and results handoff are reachable and operable. |
| Focus after navigation | Activate Next, Back, or transition Continue | Focus lands on the destination heading/prompt and is not lost at document top. |
| Validation announcement | Activate Next without a response | The error is programmatically associated with the fieldset and announced without trapping focus. |
| Reduced motion | Enable prefers-reduced-motion | The flow remains readable and usable with no required animation. |
| Narrow viewport | Render at a small mobile width | No horizontal overflow; prompt, six response rows, validation text, progress, and navigation remain visible and tappable. |
| Long content | Render a long prompt/context and a wrapped response label | Content wraps without overlap, clipping, or reordered controls. |
| Layer identification | Inspect each layer visually and with a screen reader | Layer meaning is available through text/structure and does not depend on color alone. |

### Defensive data behavior

| Case | Input/action | Expected result |
|---|---|---|
| Invalid index | Force an out-of-range navigation action in the reducer/test harness | No arbitrary question renders; the state enters the existing recoverable application-error path. |
| Invalid response value | Dispatch an answer outside the Answer union in the test harness | The answer map is unchanged and the invalid action is rejected. |
| Invalid layer sequence | Supply a manifest that violates the expected three-layer order or boundaries | The quiz does not mislabel a question; a recoverable error is shown and the failure is test-visible. |

## Implementation Strategy

### Phase 1: Red (tests first)

- Add deterministic reducer/transition tests for Intro, Question, Transition, Start, SelectAnswer, Next, Back, ContinueTransition, and final completion.
- Add browser scenarios for the intro, each response state, required-response validation, progress, back/change behavior, both layer boundaries, keyboard focus, and narrow viewport.
- Add an assertion that selecting No view yet stores the literal no-view value and never becomes numeric 0.
- Add a browser/network assertion that answering and navigating do not make a remote answer-storage request.
- Confirm the new tests fail before wiring the flow.

### Phase 2: Green (minimum implementation)

- Implement the discriminated quiz view state in the existing composition root.
- Read questions from the validated data module and render one question at a time.
- Implement the six-option radio group, answer-map updates, required-response validation, progress derivation, Back/Next handlers, and final handoff.
- Add the two explicit layer-transition notices with focus management.
- Add the minimum design-system styles for readable desktop and mobile layouts.
- Keep scoring, anchor selection, share encoding, and result presentation at their existing section boundaries.

### Phase 3: Refactor and verify

- Remove duplicated counters and derive all progress from the manifest and answer map.
- Verify that the reducer cannot produce an invalid index/view combination.
- Consolidate repeated layer/response metadata with the existing types/data contracts.
- Check focus restoration after every navigation path and remove any animation that interferes with reduced-motion behavior.
- Run unit tests, build, and Playwright; inspect mobile and desktop renders.
- Confirm the diff adds no endpoint, persistence mechanism, current political actor data, or unplanned dependency.

## Quality Gate

Before marking this section complete:

- [ ] Intro framing, three layer definitions, 48-item estimate, methodology link, and non-scientific disclaimer are visible before Start.
- [ ] Exactly six response options are rendered with the specified labels and stored values.
- [ ] Unselected questions cannot advance and show an accessible required-response message.
- [ ] Mixed / depends remains numeric 0; No view yet remains literal no-view and is never treated as zero.
- [ ] Progress correctly distinguishes explicit completion from coverage/scoring semantics and remains correct after Back/change navigation.
- [ ] Back preserves and can replace prior answers; first-question Back returns to Intro without clearing in-memory answers.
- [ ] Notices appear only at the two layer boundaries, identify the incoming layer, and provide working Back/Continue actions.
- [ ] The final answer is included in the completion handoff and no Item 49 can render.
- [ ] All flow-diagram nodes and branches assigned to this section have corresponding implementation and tests.
- [ ] Focus moves predictably after Start, Next, Back, validation, and transition Continue; visible focus rings remain present.
- [ ] Keyboard-only operation, screen-reader structure, reduced-motion behavior, and color-independent layer identification are verified.
- [ ] Wide, tablet, and narrow layouts have no horizontal overflow or clipped controls.
- [ ] The section's unit/browser tests pass, the strict build passes, and existing tests remain green.
- [ ] Browser inspection confirms no remote answer-storage request and no dynamic HTML injection.
- [ ] Dependencies from sections 01 and 02 are complete before this section is marked complete.

## Risk & Rollback

| Risk | Impact | Mitigation | Rollback |
|---|---|---|---|
| No view yet is accidentally coerced to numeric 0 | High | Closed Answer union, explicit response table, reducer tests, and a no-view browser assertion | Revert the navigation/state change to the last tested flow while retaining the data/scoring contract; repair the value boundary before re-enabling completion. |
| Progress counter drifts after Back or answer changes | Medium | Derive counts from the manifest and answer map; test forward/back/change sequences | Remove the duplicated counter implementation and restore derived progress from the last passing commit. |
| Layer boundary is hard-coded incorrectly | High | Derive adjacent-layer boundaries, validate the three-layer order, and test items 16/17 and 32/33 | Disable transition notices and return to the last known correct question order while preserving the validated dataset; re-enable after manifest/order tests pass. |
| Focus is lost or trapped after navigation/validation | High | Stable focus targets, native controls, focused browser tests, and reduced-motion checks | Roll back only the focus-management effect and retain visible static content; restore focus behavior with a narrower effect after reproducing the failure. |
| Responsive answer labels overlap or become untappable | Medium | Wrapped labels, no fixed-height question panels, container-query layout, and mobile viewport tests | Revert quiz-specific CSS to the foundation layout tokens; keep semantic markup and reapply responsive rules incrementally. |
| Final response is omitted from the results handoff | High | Build the final map before emitting completion and test the item-48 answer explicitly | Revert the completion callback change to the prior results transition and add a fixture that includes the final question before retrying. |
| The flow grows into an API, adaptive quiz, or current-politics integration | High | Keep the section client-only and apply the existing scope gate to unplanned work | Hold the expansion; ship the fixed flow and open a separately approved design for any new data or policy boundary. |

The MVP has no server-side answer state, so reverting the quiz shell does not require a data migration or deletion workflow. A rollback must still avoid exposing any stale answer map through a share or URL path; share decoding/encoding remains governed by section-02 and section-04 contracts.

## Acceptance Criteria

- [ ] A user can read the intro, understand all three layers, inspect the methodology link, and start the fixed 408-item flow.
- [ ] The flow renders one validated question at a time with layer, domain, prompt/context, progress, six response controls, Back, and Next.
- [ ] All six response states are selectable, persist by question ID, and have the exact stored semantics specified above.
- [ ] Next without a response keeps the user on the same question and provides an accessible recovery message.
- [ ] Back restores previous answers and permits changing them without losing unrelated answers.
- [ ] Progress counts explicit responses, including no-view, for navigation while leaving coverage semantics to scoring.
- [ ] Descriptive-to-normative and normative-to-prescriptive notices appear at the correct boundaries and have working, focus-safe Back/Continue actions.
- [ ] The final response reaches the results boundary in the immutable answer snapshot and no extra question renders.
- [ ] Keyboard-only, screen-reader, reduced-motion, and mobile-width scenarios pass without horizontal overflow or focus loss.
- [ ] Invalid manifest/index/response states fail closed through a recoverable error path.
- [ ] Unit/browser tests and the strict production build pass, with no remote answer-storage request.
- [ ] The implementation remains within the existing React + TypeScript + Vite architecture and adds no unapproved backend, analytics, adaptive logic, or current political data.

## Previous v7 flow boundary — 2026-08-26

The manifest-derived flow now terminates at Item 348 of 348, with layer transitions after Items 116 and 232 and 116 questions in each claim layer. The v7 additions do not change response semantics, navigation, the inclusive 50% coverage rule, or the no-view/mixed distinction. The added branch blocks are source-backed and provisional; the browser flow demonstrates implementation behavior only and supplies no cognitive or respondent validation.

## Current v8 flow boundary — 2026-08-26

The manifest-derived flow now terminates at Item 408 of 408, with layer transitions after Items 136 and 272 and 136 questions in each claim layer. The v8 additions preserve response semantics, navigation, the inclusive 50% coverage rule, and the no-view/mixed distinction. The browser flow and full-answer fixture demonstrate implementation behavior only; they supply no cognitive, respondent, psychometric, or empirical validation.

## Files

- src/App.tsx — implement the Intro, Question, and Transition views; local quiz reducer/state; six response controls; progress derivation; Back/Next/Continue handling; focus management; and final AnswerMap handoff.
- src/styles.css — apply the quiz reading field, response list, selected/focus/error/transition states, responsive container behavior, and reduced-motion rules using the existing design tokens.
- src/quiz-flow.test.ts — add deterministic reducer/state tests if the foundation test harness permits a focused unit module; otherwise place the equivalent assertions in the configured Vitest test file without adding a runtime dependency.
- tests/sorter.spec.ts — cover intro/start, all response states, validation, progress, Back/change, both layer transitions, final completion, keyboard flow, and narrow viewport behavior.
- src/types.ts — only if required to expose an existing quiz view/action contract; do not create a duplicate Answer or Layer union.
- src/data.ts — only if the foundation/data section exposes missing layer metadata needed by this flow; do not duplicate the question manifest or alter editorial content in this section.
