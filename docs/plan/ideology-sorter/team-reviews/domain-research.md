# Domain Research Review — Ideology Layer Sorter

## Review scope

The planning materials define this product as a client-side, non-scientific interpretive tool for civic reflection. Its central contribution is not a more authoritative ideology label; it is the separation of three kinds of political reasoning that are commonly compressed into one result. The review therefore treats the proposed questions, facet effects, and ideology anchors as editorial measurement aids with explicit limits, not as a validated scale or a method for diagnosing political identity.

## 1. Descriptive, normative, and prescriptive claims

The three layers are analytically useful because political statements often move between different kinds of claim without announcing the change.

- **Descriptive claims** concern what a respondent believes is true: how institutions operate, what causes an outcome, which groups or mechanisms matter, or how a system is likely to behave. They are claims about diagnosis and explanation. A descriptive response can be uncertain, conditional, or mistaken without that uncertainty determining the respondent's values or preferred action.
- **Normative claims** concern what is valuable, legitimate, desirable, fair, or worth protecting. They include ends, rights, obligations, and standards for judging social arrangements. Normative agreement does not establish agreement about the facts, causal model, or means for achieving the valued end.
- **Prescriptive claims** concern what should be done: which institutions, policies, rules, or strategies should be used. A prescription may depend on both a diagnosis and a value commitment, but it is not logically determined by either one alone. Constraints, trade-offs, risk tolerance, institutional trust, and expectations about implementation can produce different prescriptions from similar diagnoses and values.

These categories are not a claim that real political language is naturally cleanly partitioned. A single sentence can contain an empirical premise, a value judgment, and a recommendation. For the MVP, the practical rule should be to classify each item by its primary task and keep that task visible. Items should avoid combining an asserted fact with an evaluative conclusion or a policy demand when the intended signal is only one of those things. If a compound claim is essential, its components should be represented as separate items or explicitly documented as a limitation.

The three-layer distinction has the following product consequences:

1. Keep the layer label in the question flow and repeat the distinction in the results view.
2. Aggregate item effects into facets within a layer before comparing a profile with an anchor. Do not use a single global axis to hide layer differences.
3. Treat `Mixed / depends` as a substantive response value and `No view yet` as missing information. They must not share the same scoring path.
4. Describe cross-layer divergence as a pull or tension, not as inconsistency, contradiction, or a failed identity test.
5. Keep the result language at the level of an internal fit within this dataset. A calculated similarity is not a probability that the respondent belongs to an ideology and is not evidence that a prescription follows from a diagnosis.

## 2. Limits of ideology labels

Ideology labels are useful shorthand for traditions, families, arguments, or recurring bundles of commitments. They are not natural kinds with a single agreed boundary. A label can vary by country, period, movement, author, organization, and intended audience; traditions can contain internal disagreements; and one respondent can reasonably recognize parts of several traditions at once. A label can also be applied differently to a diagnosis, a value commitment, and a preferred institutional arrangement.

Accordingly, the anchor table should be understood as a set of editorial interpretive neighbors. It is an explicit model of how the project authors describe a tradition on the selected facets, not an objective census of that tradition and not a diagnosis of the person taking the quiz. The anchor's family and summary are part of the interpretation and should remain inspectable beside its fit language.

The principal risks are false precision and taxonomy bias:

- A nearest anchor can appear definitive even when several anchors are close, the observed facets are sparse, or the taxonomy omits a relevant tradition.
- A large or densely subdivided family can win a global nearest-neighbor list simply by having more opportunities to be close.
- A label may sound like an endorsement or recommendation even when the calculated relationship is only descriptive of the dataset.
- The same answer pattern can support different readings when item wording, facet selection, or anchor construction changes.
- A low-coverage profile can be made to look certain if missing answers are treated as zero or if a normalized percentage is presented without context.

The proposed mitigations are appropriate for the MVP: facet-first scoring, layer-specific profiles, a 50% answered-coverage threshold, family-balanced display, tie-aware language, visible family metadata, and repeated framing that the output is interpretive rather than scientific. These controls reduce misleading presentation; they do not validate the labels or make the taxonomy complete. The UI should therefore use language such as “interpretive neighbor” and “internal fit,” and avoid “ideology score,” “identity,” “probability,” “neutral,” “scientific result,” and “recommendation.”

The tool should not imply that a respondent's layers ought to converge. A person may hold one diagnosis, a different value ordering, and a third view about feasible institutions. That pattern is a result to explain, not a contradiction to repair. Conversely, agreement across layers should not be treated as stronger evidence of identity; it is only greater proximity to the selected anchor vectors under the current item set.

## 3. Source provenance and editorial accountability

The source projects named in the planning materials—8values-style projects, LeftValues, PolitiScales, and IdeoSorter—can inform architecture, granularity, adaptive-question ideas, and taxonomy review. They must not silently become an unmarked question bank or an authority for the project's labels. The current source posture is inspiration for structure and method, with original MVP wording and explicit source records.

Each question and anchor should retain the provenance fields required by the spec: `sourceType`, `sourceRefs`, `version`, and an inspectable note. In practice, a provenance record should make it possible to answer all of these questions:

- What external work, if any, informed this record?
- Was the influence structural, conceptual, taxonomic, or textual?
- Was any wording, code, data, or visual asset copied? The MVP answer should be no unless a separately reviewed license permits it.
- Who authored the local wording or anchor vector, and what editorial rationale supports the facet effects?
- Which version of the local record was reviewed, and what changed between versions?
- What license, attribution, retrieval date, and source URL apply to any external material that is retained?

“Inspired by” is not a substitute for a source citation, and a URL alone is not a rationale. A source note should distinguish the external observation from the project's own editorial decision. For example, a source may motivate separating a domain into multiple facets, while the wording, direction, weights, family assignment, and anchor vector remain local decisions that require their own justification.

The methodology view should expose enough provenance for a reviewer to trace a question or anchor without suggesting that the source endorses the result. Provenance should also be immutable enough to support reproducible builds: use stable record IDs, version changes, and preserve retired records rather than silently rewriting historical results. The current client-only architecture is compatible with this because the data is bundled locally, but inspectability is only useful if the records are maintained with the same care as the scoring code.

## 4. Documented editorial review is distinct from scientific validation

The MVP's wording, response scales, layer assignments, and anchor explanations are editorial records. Before a candidate is promoted into the production bank, the project must complete a substantive neighbor-distinctness review, complete cross-cultural and jurisdictional review where the item context makes it relevant (or record why it is not applicable), and preserve a later empirical-validation result. The review record should also preserve a versioned wording decision, target-specific rationale, source-to-construct traceability, unresolved ambiguity notes, and the scope of the approval. This is a production gate, not a claim that the current instrument has already passed it.

Academic citations, automated checks, and synthetic probes can support construct framing, identify obvious inconsistencies, and exercise the scoring path. They do not establish respondent comprehension, response-process validity, reliability, population representativeness, or the truth of the ideology taxonomy. The release boundary should therefore remain explicit: provisional wording may be used in this labeled prototype, while no source citation or test result should be presented as population evidence or canonical authority.

## 5. Current-party data remains deferred

Current party, candidate, and live manifesto matching is explicitly outside the MVP. This is a substantive boundary, not an empty data slot to fill opportunistically. Party and candidate positions change over time, differ by jurisdiction and office, may be expressed at different levels of specificity, and may not map cleanly onto the project's descriptive, normative, and prescriptive layers. A live match would add freshness, jurisdiction, election-cycle, source-quality, licensing, and interpretation problems, while increasing the risk that an interpretive reflection tool is read as political advice or endorsement.

No current-party records should therefore be added to the v1 anchor table, and no result should imply that an ideology neighbor is a party recommendation. If this scope is later reconsidered, it should be a separate, approved integration with at least:

- jurisdiction, office, and election-cycle metadata;
- source URLs, publisher identity, retrieval dates, and an update or staleness policy;
- a versioned record of whether the source is a manifesto, platform, official statement, voting record, or editorial summary;
- an explicit mapping method that distinguishes the source's own claims from project-authored interpretation;
- a way to represent omissions, ambiguity, and disagreement rather than forcing a position;
- review for licensing, accessibility, neutrality of presentation, and stale-data warnings; and
- a clear separation between descriptive comparison and any recommendation or persuasion behavior.

Until those conditions are separately approved and evidenced, live party data belongs in the deferred-work ledger. The MVP can remain useful without it because the product's purpose is to make the respondent's reasoning layers visible, not to tell the respondent which political actor to support.

## Review disposition

The domain model is suitable for the stated MVP if its non-scientific posture is maintained in the data model, methodology copy, and results language. The three claim layers and facet-first architecture are an appropriate separation of concerns; the ideology anchors should remain explicitly editorial and approximate. Candidate wording and anchor explanations remain provisional until documented provenance and substantive promotion review are complete; production promotion additionally requires later empirical validation. Current-party data remains deferred and must not be smuggled into the initial taxonomy through unnamed source imports.

## Dictionary Updates

Add or clarify the following terms in the domain dictionary:

| Term | Proposed definition | UI or policy wording |
|---|---|---|
| Claim type | The primary function of a political statement: descriptive, normative, or prescriptive. Real statements may combine types; an MVP item should have one primary type. | Claim type |
| Mixed / depends | A substantive response indicating conditional, qualified, or divided agreement; it is scored as a directional midpoint and is not missing data. | Mixed / depends |
| Epistemic state | The response-information state used by the tool: directional answer, mixed/depends, or no-view/missing. | Response state |
| Ideology label | A contested shorthand for an interpretive tradition or family, not a diagnosis, identity assignment, probability, or endorsement. | Interpretive label |
| Source reference | A traceable pointer to the source material and retrieval/license context that informed a question or anchor; it does not imply source endorsement. | Source reference |
| Editorial review | A documented content-governance step that records wording, construct, provenance, target-distinctness, and unresolved-risk decisions before a provisional record becomes canonical. It is not scientific validation. | Editorial review |
| Promotion review | The production gate requiring neighbor-distinctness review, applicable cross-cultural/jurisdictional review or a not-applicable rationale, and later empirical validation before a candidate is promoted. | Production promotion gate |
| Canonical activation | The release decision that promotes a provisional question or anchor into the production bank after documented provenance, substantive promotion review, and explicit approval are complete. | Reviewed / canonical |
| Current-party data | Time-sensitive external information about parties, candidates, platforms, or manifestos; deferred from the MVP and subject to a separate provenance and freshness contract. | Deferred current-party data |
