# Open-source Sorter Research

> Retrieval date: 2026-08-25. These are methodology and architecture references only; the MVP uses original content.

## 8values

Source: [8values repository](https://github.com/8values/8values.github.io)

- The project is a client-side political quiz with question effects and ideology definitions stored as data.
- Its README names eight values: Equality, Markets, Nation, Globe, Liberty, Authority, Progress, and Tradition.
- Its useful implementation precedent is the separation between item effects, axis/profile data, and result rendering.
- Its single-space closest-match model is intentionally not adopted as the product's only interpretation. This project instead keeps descriptive, normative, and prescriptive layers separate.
- The repository advertises an MIT license. The MVP does not copy its questions, images, code, or labels.

## LeftValues

Source: [LeftValues](https://leftvalues.github.io/)

- LeftValues explicitly presents itself as inspired by 8values and exposes seven paired axes within a narrower ideological scope: Revolution/Reform, Scientific/Utopian, Central/Decentral, International/National, Party/Union, Production/Nature, and Conservative/Progressive.
- Its useful precedent is that a single broad family can contain meaningful internal disagreements such as reform/revolution, party/union, and production/nature.
- The MVP uses this as a reason to model facets independently rather than collapse all answers into a single left/right axis.

## PolitiScales

Source: [PolitiScales clone repository](https://github.com/ketsapiwiq/Politiscales-dbhq)

- The repository is a public MIT-licensed clone of a multi-axis values quiz, itself described as inspired by 8values.
- Its useful precedent is a larger collection of paired and specialized dimensions, which supports a facet crosswalk rather than a single compass.
- The MVP takes the dimensional idea and writes original item wording and anchors.

## PoliticalTests directory

Source: [politicaltests.github.io project directory](https://politicaltests.github.io/)

- The directory catalogs multiple forms, including 8values-style axes, Ideosorter’s flowchart model, DozenValues’ six axes (Ownership, Market, Power, Autonomy, Identity, and Progress), and foundation-based tests.
- The MVP uses these as inspiration for a future adaptive follow-up mode and for family-balanced result display.
- No code or content from either project is included in the MVP.

## Design decisions drawn from the comparison

1. Keep three layers explicit: descriptive diagnosis, normative ends/standards, and prescriptive means/institutions.
2. Keep facets between responses and ideology anchors so editorial changes do not require rewriting the whole scorer.
3. Preserve `no-view` as missing data, not as a neutral political answer.
4. Show coverage and provenance next to any result.
5. Prefer family-balanced neighbors over a single globally dense taxonomy.
