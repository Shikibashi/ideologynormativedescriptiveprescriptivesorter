# Prescriptive route variants

Date: 2026-08-30

Status: source-backed research context; not a production measurement change

## Purpose

The current sorter has four broad canonical families whose prescriptive profile
does not support one universal source-backed direction: Populism, Islamism,
Religious Nationalism, and Deep Ecology. Their base profile dimensions remain
`contested` or `indeterminate` where the literature does not justify a common
commitment. This tranche adds explicit qualitative route variants so the
research workbench can represent alternative institutional translations without
collapsing a heterogeneous family into one policy programme.

A route variant is a source-backed authoring record, not a new ideology node. It
is restricted to prescriptive dimensions, carries its own sources, and has at
least one determinate qualitative direction so that the route is inspectable.
The route's `source-backed-contested` posture means that the evidence supports
the route as a plausible branch or translation, while not establishing that it
is universal to the parent family.

## Route inventory

| Target | Recorded route variants | Interpretive boundary |
|---|---|---|
| Populism | Majoritarian popular-sovereignty; direct-democratic renewal | Popular sovereignty and institutional translation can take different forms; a route observed in a host formation is not a definition of Populism as a whole. |
| Islamism | State-mediated public order; inclusive constitutional participation | Modern Islamist currents differ in their relations among religious authority, state power, constitutionalism, and participation; political Islam is not treated as a homogeneous programme. |
| Religious Nationalism | Integrated religious state; civic religious accommodation | Religious and national identities can be fused through different state and civic arrangements; the family is not reduced to one institutional settlement. |
| Deep Ecology | Decentralized ecological community; public ecological guardrails; liberal self-organization; transboundary ecological coordination | Deep Ecology contains philosophical, movement, and political translations; ecological priority does not determine one state, market, democratic, or international route. |

The labels above are local analytical labels for the workbench. They do not
claim that the scholarship uses these exact four-way typologies, and they do not
rank the routes or recommend any of them.

## Evidence synthesis

### Populism

The Oxford and Cambridge materials in the source register treat Populism as a
thin-centred or host-dependent formation whose relation to liberal-democratic
institutions varies by context. Research on populism as a constitutional
project also describes popular sovereignty, majority rule, and institutional
translation as features that can be assembled differently in concrete
projects. That supports recording more than one possible institutional route,
while the case-sensitive literature does not support assigning either route as
the universal prescriptive profile of Populism.

- [Oxford Handbook of Political Ideologies: Populism](https://academic.oup.com/edited-volume/34324)
- [Populism and liberal democracy, Cambridge University Press](https://www.cambridge.org/core/books/populism-in-europe-and-the-americas/populism-and-liberal-democracy/47EB2D2E30E67A9285537B68E122F94D)
- [Populism as a constitutional project, International Journal of Constitutional Law](https://academic.oup.com/icon/article/17/2/536/5523745)

### Islamism

The registered Cambridge and Oxford sources describe modern Islamism as a
heterogeneous political field with revolutionary, transnational, moderate,
post-Islamist, state-mediated, and more inclusive or centrist currents. The
Islamism route records therefore separate state-mediated public ordering from
an inclusive constitutional-participation translation. This is a representation
of branch-level variation, not a claim that either route is representative of
all Islamist traditions or that a religious identity alone establishes the
category.

- [Islamism and ideology: philosophical issues and analytical categories, Cambridge University Press](https://www.cambridge.org/core/books/limits-of-islamism/islamism-and-ideology-philosophical-issues-and-analytical-categories/E2663B0987FDB1C3C1577B37014453AE)
- [Islamic Political Ideologies, Oxford University Press](https://academic.oup.com/edited-volume/34324)
- [More inclusive Islamism: the Wasatiyya trend, Cambridge University Press](https://www.cambridge.org/core/books/political-ideology-in-the-arab-world/more-inclusive-islamism-the-wasatiyya-trend/41EE0EE3D602AA3ED9E90525DF61DB47)
- [The Islamic Leviathan: Islam and the Making of State Power, Oxford University Press](https://academic.oup.com/book/6278)

### Religious Nationalism

Recent scholarship treats religious nationalism as a comparative and contested
concept involving the interaction of religious and national identities, rather
than as one fixed institutional package. Research on state-religion relations
also cautions against a simple general relationship between religion, state
institutions, and democratic outcomes. The two route records consequently make
different institutional translations visible while leaving the parent
profile's universal prescriptive direction unresolved.

- [Religious Nationalism and Religious Influence, Oxford Research Encyclopedia](https://academic.oup.com/edited-volume/62239/chapter-abstract/550810397)
- [Religious Nationalism in the 21st Century, Sociology of Religion](https://doi.org/10.1093/socrel/sraf015)
- [Holding the Sacred Accountable: The Dynamics of the State–Religion Relationship and Media Freedom, Global Studies Quarterly](https://academic.oup.com/isagsq/article/2/3/ksac043/6717716)

### Deep Ecology

The environmental-ethics and environmental-political-theory literature
distinguishes Deep Ecology from neighboring threads such as Social Ecology,
ecofeminism, environmental justice, and Green politics. It also contains
debates over how ecological commitments relate to liberalism, democracy,
self-organization, institutions, and movement practice. The route records make
those possible translations inspectable without treating a philosophical
tradition, a movement, and a single political programme as interchangeable.

- [Social and political movements, Environmental Ethics: A Very Short Introduction, Oxford University Press](https://academic.oup.com/book/980/chapter-abstract/137838792)
- [Deep Ecology and Liberalism, The Review of Politics](https://www.cambridge.org/core/journals/review-of-politics/article/abs/deep-ecology-and-liberalism-the-greener-implications-of-evolutionary-liberal-theory/7CEA973D2C7871B527CBF2C7044B199B)
- [Reimagining Radical Environmentalism, Oxford Handbook of Environmental Political Theory](https://academic.oup.com/edited-volume/28363/chapter-abstract/215240208)

## Implementation boundary

Route variants are attached to `ResearchAnchorProfile` and validated by
`validateResearchAnchorRouteVariants`. The validator requires:

- a non-empty, unique route id, label, and statement;
- source ids that resolve to ideology-research sources attached to the parent
  profile;
- non-empty dimensions with known facets and no duplicate facet in one route;
- prescriptive-layer dimensions only; and
- at least one determinate qualitative direction per route.

The route records are deliberately not connected to:

- `Question.effects` or production question ids;
- scalar anchor vectors, respondent answers, affinity, or morphology;
- the 19 quarantined candidate items;
- the four open universal-direction gaps; or
- any cognitive, psychometric, empirical, invariance, population, or
  consequence-validity claim.

The Research Workbench labels this boundary in the UI. The research-coverage
audit reports route-variant counts and ids, while the existing belief
measurement and question-layer audits remain the authorities for production
coverage. Adding a route therefore improves traceability and representation of
contested institutional pathways without silently promoting a candidate or
changing the sorter’s scoring semantics.

## Verification and next gate

The local structural acceptance surface is:

1. route source and layer validation returns no errors;
2. the four target profiles expose 10 route variants in total;
3. all existing production question, measurement, morphology, and completion
   boundaries remain unchanged; and
4. browser rendering exposes the route records as research context.

These checks are repository and interface checks only. The six external gates
in `docs/plan/ideology-sorter/belief-validation-protocol.md` remain
`NOT RUN`, and the completion audit must remain fail-closed until those gates
are independently supplied with appropriate evidence.
