# Domain Process Analysis

## Core process

The product has one primary process: a person responds to a fixed set of claim prompts, the client aggregates those answers into three layer-specific facet profiles, and the client renders interpretable neighbors with coverage and provenance context.

```text
frame the three claim types
  -> answer one original item at a time
  -> keep directional and no-view states distinct
  -> aggregate by layer and facet
  -> compare against approximate anchors within family-balanced groups
  -> explain coverage, fit, and cross-layer pulls
  -> allow restart or local sharing
```

## Domain invariants

1. Descriptive, normative, and prescriptive are separate fields in every question and result.
2. No-view never becomes a zero-valued political response.
3. Anchor labels are interpretive traditions, not diagnoses.
4. The same answer set can produce different neighbors in different layers.
5. A low-coverage layer must not produce a forced result.
6. Source posture is visible and original wording is preferred.
7. A tension is explanatory context, not a consistency failure.

## Later process, explicitly deferred

- Documented wording and construct review by the item authors.
- Versioned anchor review by multiple editors.
- Adaptive follow-ups selected by information gain.
- Optional linkage to party/manifesto data with country and time metadata.
