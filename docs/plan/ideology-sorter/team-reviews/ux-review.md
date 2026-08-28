# UX / Domain Review — Ideology Layer Sorter

## Review position

The product framing is coherent for a client-side interpretive reflection tool. The primary UX risk is scan-reading: a user may notice an ideological label or fit signal before understanding which claim layer produced it, how much of that layer was answered, and what the result does not claim. The interface should therefore make layer, coverage, and interpretive status visible before presenting any neighbor or fit language.

The design-system direction supports this well: the research-notebook treatment can create a quiet reading surface, while the layer rail and annotation rules can carry orientation without turning the experience into a gamified compass or scientific dashboard.

## Reading flow

1. **Orient before asking.** The intro should state the purpose in plain language, introduce the three claim layers, identify the tool as an interpretive calculation rather than a scientific test or recommendation, and show that there are 48 items split into 16 descriptive, 16 normative, and 16 prescriptive items. The methodology/source link must be available before the first response.

2. **Use paired labels throughout.** Do not rely on `Descriptive`, `Normative`, or `Prescriptive` alone. Keep the dictionary's human-readable pairs visible wherever the layer changes: `Diagnosis / what is true`, `Values / what is good`, and `Practice / what to do`. The first term should never appear as an isolated identity label; the second phrase should explain what kind of claim the user is answering.

3. **Make one question the reading unit.** Each item should present its layer label, domain, one short prompt, optional context, and the six response states in a stable order. The response group should be visually subordinate to the prompt but easy to scan. `Mixed / depends` needs to be a real answer state, not an explanatory footnote or a midpoint silently inferred from skipped input.

4. **Give progress two coordinates.** Show both overall progress and current-layer progress, for example `24 of 48 overall` and `8 of 16 in Values / what is good`. A single global percentage would hide the fact that a user may have strong coverage in one layer and sparse coverage in another. Preserve answers on back navigation and make it clear that changing an answer changes the eventual calculation.

5. **Use deliberate layer transitions.** Before descriptive questions change to normative questions, and before normative questions change to prescriptive questions, show a short transition notice naming the next layer and its plain-language meaning. The notice should remind the user that the next items ask a different kind of question, not that the previous answers were correct or should be carried forward.

6. **Keep the result-reading order conservative.** On the results view, introduce the non-scientific framing first, then show each layer's coverage and answered/available counts, then the interpretation. Coverage warnings must precede interpretive neighbors. A methodology panel, source posture, and item/anchor notes should remain reachable from results, not be hidden behind a first-use-only explanation.

7. **Disclose share-link handling.** Because the share action uses a URL fragment, explain that the link represents the local answer state and may be copied, stored in browser history, or shared with others. Keep the no-remote-storage promise explicit and provide a visible manual-copy fallback when the Clipboard API is unavailable.

## Accessibility

- Use one main landmark with a clear page heading, headings for the three layer sections, and a `fieldset`/`legend` for every question's response group. Native radio inputs are preferable to custom controls because the six states form one mutually exclusive answer set.
- Make the current layer, item position, answer requirement, and coverage status available to assistive technology as text, not only through the vermilion accent, rail, or border treatment. A polite status region can announce item advancement and layer transitions without repeatedly reading the entire page.
- Keep a visible focus indicator on every actionable control. After a valid answer advances the flow, move focus predictably to the next question or its legend; after back navigation, restore focus to the prior question's response group. If next is unavailable before an answer, the reason must be conveyed in text and not only by a disabled visual appearance.
- Ensure the complete flow works with keyboard input: start, methodology, all six response choices, back, next, restart, copy-link, and any source/item disclosure controls. Do not require drag, hover, color recognition, or a pointer-only gesture.
- Preserve readability at narrow widths. The asymmetric two-column layout should collapse to one column without horizontal scrolling; prompts, labels, focus rings, and error text must remain readable at mobile widths and at increased text size. Response targets should have a generous touch area and should not depend on a hairline rule for separation.
- Check paper/ink, muted text, rule, and signal combinations for sufficient contrast in their actual states. The signal accent may mark emphasis, but a label, heading, icon with accessible name, or border must carry the semantic distinction as well.
- Respect `prefers-reduced-motion`; the single entrance transition must not be required to understand progress, answer selection, or results. Error, empty, malformed-link, and insufficient-information states should say what happened and how to recover.

## Result comprehension

Each result section should read as an independent answer to a different question:

- **Descriptive — Diagnosis / what is true:** describe the user's observed or believed system explanations. Avoid wording that sounds like the application diagnosed the person.
- **Normative — Values / what is good:** describe valued ends, rights, or social conditions. Do not imply that a value profile validates a political identity.
- **Prescriptive — Practice / what to do:** describe preferred institutions, policies, or strategies. This is an interpretive description, not advice or a recommendation for political action.

For every covered layer, show the layer heading, answered/available count, coverage, a short explanation of `Internal fit` as a normalized signal within this dataset, selected interpretive neighbors with family metadata, and the facet signals that most influenced the interpretation. Present neighbors as interpretive context rather than a ranked leaderboard; use tie language where distances are close. Never substitute `score`, `probability`, `identity`, or `recommendation` for the approved terms.

Cross-layer findings should name both layers and use `Cross-layer pull` or `tension`. Explain that different answers across descriptive, normative, and prescriptive layers can be informative and are not a consistency failure. Do not add a single overall score or contradiction label that collapses the product's central distinction.

When a layer is below the 50% answered-coverage threshold, replace the neighbor section with an explicit `Insufficient information` state. Show the answered and total counts, explain that `No view yet` responses were excluded from facet means but counted in coverage, and tell the user that they can restart or revisit the questions. Do not show a partial neighbor list that could be mistaken for a result.

## No-view language

`No view yet` is a deliberate, valid response and should be visually distinct from directional agreement while remaining as easy and non-judgmental to choose as the other options. Use the exact label from the dictionary and pair it with a short explanation such as:

> **No view yet** — I do not have a current view or enough information to answer this.

The explanation should be available at first use and from the methodology panel. Avoid `neutral`, `undecided`, `skip`, `not applicable`, or `no opinion` unless a future data contract explicitly distinguishes those states. A no-view response is missing information, not a zero, midpoint, disagreement, or evidence of neutrality.

Coverage copy should make the arithmetic inspectable: `7 of 16 answered · 44% coverage` is preferable to a qualitative badge alone. With 16 items per layer, seven or fewer directional/mixed answers must produce the insufficient-information state; eight or more meet the stated threshold, subject to the scoring contract. Do not describe a low-coverage layer as a weak ideology, an inconsistent layer, or a failed completion.

## UX/domain acceptance criteria

1. **Layer orientation:** Before the first item and at both layer transitions, the page exposes the three paired labels, the current layer, the 48-item/16-per-layer structure, the interpretive/non-scientific framing, and a methodology/source link. The current layer is conveyed in text and structure, not color alone.
2. **Accessible question flow:** Every item has a named `fieldset`/`legend` and six keyboard-operable, individually labeled response controls. Back navigation preserves and permits changing the answer; next cannot advance without a response; focus remains visible and moves predictably; the collapsed mobile layout has no horizontal overflow.
3. **No-view semantics:** Selecting `No view yet` stores the literal `no-view` state, never maps it to `0`, and updates coverage as `answered / total`. For a 16-item layer, seven answered items show `Insufficient information` with counts and recovery guidance rather than interpretive neighbors.
4. **Result language and structure:** Each layer has its own accessible heading, paired human-readable label, coverage counts, and interpretation. Covered results use `Internal fit`, `Interpretive neighbor`, `Family`, `Facet`, and `Cross-layer pull` consistently; the rendered result contains no user-facing `ideology score`, `probability`, `identity score`, `scientific result`, `recommendation`, `neutral for unanswered`, or `contradiction` shorthand.
5. **Trust and recovery:** Results expose the non-scientific framing, methodology/source notes, restart, and copy-link actions. Copy failure provides a selectable/manual link fallback; malformed answer fragments return safely to the intro; the UI states that answers remain client-side and explains what sharing the URL fragment does.

## Dictionary Updates

### Proposed additions

- **Layer transition** — An explicit orientation notice that marks movement from one claim layer to the next and states the next layer's plain-language meaning. Suggested UI wording: `Next: Values / what is good`.
- **Coverage warning** — The result state shown when answered coverage is below 50% for a layer. Suggested UI wording: `Insufficient information` with answered/total counts.
- **Facet signal** — A displayed explanation of which named facets most influenced a layer's interpretation. Suggested UI wording: `Signals that influenced this layer`.

### Wording clarifications

- Keep `No view yet` as the canonical UI label and define the explanatory sentence as missing information, not neutrality or a skipped answer.
- Use `Diagnosis / what is true` only as a paired layer label. Do not use `Diagnosis` alone in result prose, where it could be read as a diagnosis of the respondent.
- Keep `Internal fit` qualified as a within-dataset signal and present `Interpretive neighbor` without ordinal ranking language.
- Keep `Cross-layer pull` as the default user-facing wording for `Tension`; do not expose `contradiction`, `consistency score`, or `recommendation` as alternate labels.
