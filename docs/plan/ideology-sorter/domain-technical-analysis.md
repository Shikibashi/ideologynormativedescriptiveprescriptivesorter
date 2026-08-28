# Domain Technical Analysis

## Recommended boundary

Use a static React application with four source responsibilities:

1. `src/types.ts` — contracts for layers, questions, answers, facets, anchors, and results.
2. `src/data.ts` — versioned original questions, facet definitions, anchors, and source references.
3. `src/scoring.ts` — pure functions for answer aggregation, coverage, family balancing, ties, and tensions.
4. `src/App.tsx` plus `src/styles.css` — stateful flow and presentation only.

## Runtime state

- `view`: intro, quiz, or results.
- `questionIndex`: current item.
- `answers`: `Record<questionId, Answer>`.
- `shareStatus`: idle, copied, or fallback.
- `methodologyOpen`: disclosure state.

No server state exists. Hash parsing is defensive and schema-versioned. A malformed fragment is ignored and the intro is shown.

## Verification boundaries

- Pure scoring tests can run without a browser.
- Build/typecheck catches data-contract mismatches.
- Playwright verifies the actual question flow and results render.
- Static security review checks that the app makes no remote answer request and does not inject answer-derived HTML.

## Failure behavior

- Missing answer before next: keep the user on the current question and announce the required action.
- Unknown question ID in a share fragment: ignore the fragment.
- Invalid answer value: ignore the invalid entry.
- Low coverage: show insufficiency, not a nearest anchor.
- Clipboard failure: display a selectable text link.
