# Feature Spec — Macro/Meso/Micro Ideology Taxonomy

## Purpose

The existing sorter has a flat list of interpretive anchors. That is adequate for displaying approximate neighbors, but it is too coarse for showing how a result relates to a wider ideological family. This feature adds an auditable taxonomy layer without treating a political tradition as a single, uncontested tree.

## Contract

Each ideology node has:

- a stable ID, label, summary, level (`macro`, `meso`, or `micro`), confidence, and source references;
- at most one `canonicalParentId`, used only to create a readable breadcrumb;
- zero or more typed relations for hybrids, historical derivation, overlap, movement expression, or analytical frameworks; and
- a placement (`canonical`, `contextual`, `associated`, or `historical`); and
- a status of `scored` or `catalog-only`.

The dataset also has a separate secondary ideology registry. Registry entries preserve contextual formations, historical variants, historical manifestations, and associated doctrines that should remain searchable and sourced without inflating the strict canonical graph.

The existing facet scorer remains the calculation engine. A scored node must point to an existing anchor. Catalog-only nodes are source-backed context and are not eligible for a result until dedicated anchor/question coverage is added.

## Required distinctions

1. The strict canonical graph contains exactly 9 macro families, 33 meso traditions, and 58 micro branches. The count excludes contextual anchors and the secondary registry.
2. Libertarianism is represented as a meso tradition within Liberalism, with right-libertarianism, minarchism, anarcho-capitalism, and left-libertarianism as finer branches. Right-Libertarianism has dedicated provisional coverage; additional labels remain catalog-only until dedicated item coverage exists.
3. Hybrid traditions are not duplicated into multiple canonical trees. Ecosocialism, Liberal Feminism, Socialist / Marxist Feminism, Ecofeminism, Anarcha-Feminism, Green Anarchism, Libertarian Socialism, Liberal Nationalism, Conservative Nationalism, and Religious Nationalism remain parentless canonical hybrids with typed relations.
4. The Republicanism split distinguishes Historical Republicanism from Contemporary Neo-Republicanism; civic republicanism remains a related term rather than an unconditional exact alias.
5. Ecologism is distinct from movement expressions and associated ecological doctrines. Green politics is a contextual movement anchor, Social Ecology is under Green Anarchism, and Deep Ecology/Bioregionalism remain in the secondary registry.
6. Fascism is represented as a contested macro family with National Socialism and Neo-Fascism as meso traditions. National cases are historical registry entries unless the audit explicitly bounded them as direct micro nodes; authoritarianism, totalitarianism, corporatism, and ultranationalism remain properties or related concepts.
7. National Conservatism appears exactly once as a micro node under Conservative Nationalism. Conservative New Right is a contextual formation, not an exclusive parent of Neoconservatism or Paleoconservatism.
8. Intersectionality and related analytical frameworks are not silently treated as complete ideology families.

## Evidence boundary

Academic sources support construct distinctions, terminology, and the rationale for keeping internal variation visible. They do not validate the hand-authored anchor vectors, establish a respondent's identity, or turn a taxonomy label into a scientific classification.

## Acceptance criteria

- Every current anchor resolves to one scored ontology node.
- Every scored node resolves to a canonical path and at least one ideology-research source.
- The strict graph counts are 9 macro, 33 meso, and 58 micro nodes; contextual anchors do not change those counts.
- Secondary registry entries resolve to source-backed relation targets without becoming scored neighbors.
- The results UI shows the path and typed relation context without presenting catalog-only nodes as calculated results.
- Dataset validation rejects missing parents, relation targets, sources, anchor-node pairings, non-canonical parents, registry collisions, and unsupported registry targets.
- Unit, build, and browser checks remain green.
