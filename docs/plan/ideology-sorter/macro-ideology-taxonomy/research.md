# Research Note — Macro/Meso/Micro Ideology Taxonomy

> Retrieval date: 2026-08-26. The references below are used as terminology and construct context. They do not validate local scoring vectors or classify respondents.

## Source-backed decisions

| Decision | Rationale | Primary source |
|---|---|---|
| Keep Liberalism as a macro family and Libertarianism as a meso family with internal branches. | The Stanford Encyclopedia of Philosophy presents liberalism as a family of related and competing views; its libertarianism entry presents libertarianism as a family of views with internal left/right variation. | [Liberalism](https://plato.stanford.edu/entries/liberalism/); [Libertarianism](https://plato.stanford.edu/entries/libertarianism/) |
| Keep Fascism as a contested macro family with historically specific traditions. | Oxford scholarship treats fascism as a syncretic postwar ideology with recurring themes and substantial variation, rather than a single flat checklist. | [Eatwell, “Fascism”](https://academic.oup.com/edited-volume/34324/chapter-abstract/291337436); [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510) |
| Keep Ecologism distinct from Green politics and preserve multiple green traditions. | Cambridge material describes green political thought through ecological limits, human–nature relations, decentralization, democracy, justice, and nonviolence, while green politics is an umbrella for several traditions. | [Carter, “Green Political Thought”](https://www.cambridge.org/core/books/politics-of-the-environment/green-political-thought/BA5EB7C4D160DD1D16ECF39BF55C2047); [“What is Green Political?”](https://www.cambridge.org/core/books/abs/global-green-politics/what-is-green-political/0A3CA24B396B071E231CA472B171B0D9) |
| Keep Feminism as a macro family with multiple meso traditions and do not collapse intersectionality into one exclusive branch. | Oxford feminist scholarship addresses critiques of patriarchal power, biological determinism, and choice-centered accounts, while feminist theory spans multiple analytical traditions. | [Chambers, “Feminism”](https://academic.oup.com/edited-volume/34324/chapter-abstract/291339254); [Oxford Handbook of Feminist Theory](https://academic.oup.com/edited-volume/34617) |

## Audit reconciliations

| Audit issue | Implemented resolution | Evidence boundary |
|---|---|---|
| The 66/67 micro-node contradiction and duplicated National Conservatism label. | The strict graph uses one `national-conservatism` micro node under `conservative-nationalism`; the dataset test asserts exactly 58 canonical micro nodes. | The count is a project curation invariant derived from the supplied audit, not a scholarly measurement. |
| Conservative New Right used as an exclusive parent. | `conservative-new-right` is a `contextual-formation` registry entry; Neoconservatism and Paleoconservatism remain direct Conservatism children. | Historical and comparative scholarship is heterogeneous; the registry preserves the relation without claiming a settled tree. |
| Historical and contemporary Republicanism labels were conflated. | `historical-republicanism` and `contemporary-neo-republicanism` are separate meso nodes, with a typed overlap relation and explicit aliases. | [SEP Republicanism](https://plato.stanford.edu/entries/republicanism/) informs the distinction between historical and contemporary traditions. |
| Hybrids were being forced into one family. | Ecosocialism and the other cross-family formations use one parentless canonical node plus typed `hybrid-of`, `overlaps-with`, or `related-to` relations. | The graph expresses editorial ontology policy; the sources support construct context, not the chosen vectors. |
| Ecological philosophies and historical national cases were treated as ordinary ideology branches. | Deep Ecology and Bioregionalism are associated registry entries; Italian, British, French, Flemish/Belgian, and Japanese Fascism are historical registry entries; bounded Fascist currents remain direct nodes. | [SEP Environmental Ethics](https://plato.stanford.edu/entries/ethics-environmental/) and the [Oxford Handbook of Fascism](https://academic.oup.com/edited-volume/34510) support retaining these distinctions as contested/contextual. |
| Populism, Islamism, and religious-national formations were over-compressed. | Populism and Islamism are parentless meso nodes with host/related relations; Left-Wing Populism and Right-Wing Populism are variants under Populism, while Wasatiyya and Revolutionary Islamism are bounded currents. | [Cambridge on Populism](https://www.cambridge.org/core/books/populism-in-europe-and-the-americas/populism-and-liberal-democracy/47EB2D2E30E67A9285537B68E122F94D) and [Cambridge on Islamism](https://www.cambridge.org/core/books/limits-of-islamism/islamism-and-ideology-philosophical-issues-and-analytical-categories/E2663B0987FDB1C3C1577B37014453AE) provide terminology context only. |

## Canonical inventory

The implementation now exposes 9 canonical macro families, 33 canonical meso traditions, and 58 canonical micro branches. Five existing broad MVP anchors remain contextual placements so the expanded audit graph does not manufacture a false exclusive parent for them. The secondary registry currently holds contextual formations, historical variants, historical manifestations, and associated doctrines; registry entries are sourced and queryable but cannot appear as scored neighbors.

## Taxonomy posture

The data uses one canonical parent only for display stability. A typed relation captures a second dimension when the scholarship or the user-supplied taxonomy calls for it. This prevents hybrids from being counted twice while still making their connections visible. It also prevents properties such as authoritarianism or ecological concern from being treated as sufficient definitions of a family.

The current anchor set is intentionally narrower than the canonical catalog. A node becomes a scored neighbor only when it has a dedicated anchor profile and item coverage. Right-Libertarianism now meets that local coverage gate through a provisional anchor and four items in each claim layer; the remaining catalog-only branches do not. The expanded canonical catalog is therefore a research inventory and display ontology, not a claim that all 58 micro branches are already measured by the 84-prompt bank.

## Open research gates

- The current question bank does not separately identify every catalog node.
- Historical labels such as “Strasserism,” “Third Position,” and “Legionary / spiritual fascism” need specialist review before activation as scored nodes.
- The secondary registry still needs specialist review for national fascist manifestations, Agrarian Populism, National-Syndicalism, and revisionist social democracy before any promotion into scored content; any candidate must also pass the substantive promotion-review gate.
- Feminist, ecological, libertarian, and fascist subtraditions require wording and construct review, neighbor-distinctness review, applicable cross-cultural/jurisdictional review, and later empirical validation before any new item set is treated as canonical.
- A source reference is provenance evidence for a node description, not evidence that a respondent belongs to that node.
