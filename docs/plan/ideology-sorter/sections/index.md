<!-- SECTION_MANIFEST
section-01-foundation
section-02-data-methodology
section-03-quiz-flow
section-04-results
END_MANIFEST -->

# Implementation Sections Index

## Dependency Graph

| Section | Depends on | Blocks | Parallelizable |
|---|---|---|---|
| section-01-foundation | - | 02, 03, 04 | Yes |
| section-02-data-methodology | 01 | 03, 04 | Yes after 01 |
| section-03-quiz-flow | 01, 02 | 04 | No |
| section-04-results | 01, 02, 03 | - | No |

## Execution order

1. `section-01-foundation` establishes the app shell, types, data manifest, styles, and test scripts.
2. `section-02-data-methodology` establishes the question/anchor dataset, pure scoring, share codec, and methodology surface.
3. `section-03-quiz-flow` wires intro, layer-aware navigation, answer state, back/next, and transitions.
4. `section-04-results` wires coverage-aware results, interpretive neighbors, pulls, restart, and share actions.

## Flow diagram mapping

| Section | Flow diagram | Nodes |
|---|---|---|
| section-01-foundation | - | App shell, contracts, design tokens, test harness |
| section-02-data-methodology | `scoring-flow.mmd`, `share-flow.mmd` | Partition → Coverage → Threshold → Aggregate → Distance → Balance; Decode → Validate → Restore; Encode → Clipboard |
| section-03-quiz-flow | `quiz-flow.mmd` | Intro → Begin → Question → Answer → More → Transition |
| section-04-results | `quiz-flow.mmd`, `scoring-flow.mmd`, `share-flow.mmd` | Calculate → Results; Covered/Insufficient → results view; share action |

## Section summaries

### section-01-foundation

Create the React + TypeScript + Vite project, strict types, static shell, design tokens, and test configuration. Preserve a framework-independent domain boundary.

### section-02-data-methodology

Create the versioned original dataset, facet and anchor records, scoring policy, validation, pure scoring functions, safe share envelope, and methodology content.

### section-03-quiz-flow

Implement the intro and fixed question flow with paired layer labels, progress, response controls, back navigation, validation, and layer transition notices.

### section-04-results

Implement coverage-first results, interpretive neighbors, facets, cross-layer pulls, restart, and explicit local share-link behavior.

## Ecosystem Coverage

| System | Covered by | Status |
|---|---|---|
| Browser local state | `section-03-quiz-flow` | Covered |
| Static dataset | `section-02-data-methodology` | Covered |
| Optional clipboard | `section-04-results` | Covered |
