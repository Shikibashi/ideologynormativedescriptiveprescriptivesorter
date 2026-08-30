# Unknowns and Inferred Decisions

## Known knowns

- The user wants a descriptive/normative/prescriptive ideology sorter.
- The user explicitly says it is not scientific.
- The product should draw structural inspiration from other ideological sorters and expose its methodology.
- The attached brief calls for intermediate facets, separate profiles, coverage, no-view handling, family balancing, cross-layer tensions, and an inspectable dataset.

## Known unknowns resolved automatically

| Question | `[ZEUS-AUTO]` answer | Reversal path |
|---|---|---|
| Is a server required? | No. Use a local client-only MVP. | Add a versioned API later. |
| How many questions? | 408 total: 136 per layer, including 28 provisional dedicated-scored target blocks. | Add another versioned content batch; scoring remains item-ID based. |
| Are answers saved remotely? | No. Keep them in memory and an optional share fragment. | Add consented persistence later. |
| Should ideology names appear in item text? | No. Items describe claims, values, and institutional choices in plain language. | Revise content only; UI contracts remain stable. |
| How should no-view score? | Missing; exclude from layer and domain denominators. | Change the response policy in one scoring module. |
| Should the MVP use machine learning? | No. Use deterministic weighted distance. | Add a separately versioned model only after explicit model review. |

## Unknown knowns

- Users may want to understand why an item affected a result; the UI should make item effects inspectable without requiring a theory background.
- Users may interpret similarity as endorsement; the result page must repeat the interpretive/non-scientific disclaimer.
- Users may expect a single identity; the result should foreground three layer profiles and allow ties/insufficient information.

## Unknown unknowns and mitigations

- **Editorial bias in anchors:** store notes and source posture; invite review; never present anchors as discovered facts.
- **Taxonomy density bias:** compare within family and show family coverage.
- **Response fatigue:** the current 408-item bank is still provisional; show progress, support back navigation, and retain the burden and wording review notes. No cognitive review was run in this continuation.

## Current v8 status — 2026-08-26

- The live bank contains 408 prompts, 136 per layer, 33 editorial anchors, and 28 canonical scoring anchors. Five existing canonical meso branches—Communism, Historical Republicanism, Individualist Anarchism, Neoliberalism, and Socialist / Marxist Feminism—received source-backed direct blocks.
- Nine canonical meso branches remain catalog-only: Conservative Nationalism, Islamism, Mutualism, National Socialism, Neo-Fascism, Populism, Radical Conservatism, Reactionary Conservatism, and Religious Nationalism. The holds preserve unresolved host/jurisdictional, label-boundary, or high-risk historical questions without demoting the ontology nodes.
- The 1,428 effect-free candidates remain quarantined across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run; the next promotion gate remains fail-closed.
- **Ambiguous wording:** use one claim per item, short context, and documented wording review.
- **Political sensitivity:** exclude current actors, persuasion copy, and targeted recommendations.

## Architecture-changing questions

1. Whether answers require remote accounts — inferred no.
2. Whether current party/candidate matching is required — inferred no and deferred.
3. Whether a scientific validation claim is required — explicitly no.
4. Whether the data must be editable by non-developers — deferred; JSON/TypeScript data is sufficient for MVP.

## Historical v9 status — 2026-08-26

- The live bank contains 432 prompts, 144 per layer, 35 editorial anchors, and 30 canonical scoring anchors. Populism and Mutualism received source-backed direct blocks; seven canonical meso branches remain catalog-only.
- Full-production structural fixtures expose coarse top-three overlap (50% layer hit rate and 70% combined hit rate; worst ranks 27 and 23) even though all 30 anchors route in isolation. This is retained as a measurement-design backlog item; no uncalibrated scoring adjustment was made.
- The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.

## Historical v10 status — 2026-08-26

- The live bank contains 456 prompts, 152 per layer, 37 editorial anchors, and 32 canonical scoring anchors. Radical Conservatism and Reactionary Conservatism received source-backed direct blocks; Conservative Nationalism, Islamism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only holds.
- Full-production structural fixtures now report 53.125% layer top-three hit rate and 71.875% combined top-three hit rate, with worst full-competition ranks 29 and 25. All 32 anchors route in isolation. This remains a measurement-design warning, not respondent evidence, and no uncalibrated scoring adjustment was made.
- The 1,428 candidates remain effect-free and quarantined. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.

## Historical v11 status — 2026-08-26

- The live bank contains 468 prompts, 156 per layer, 38 editorial anchors, and 33 canonical scoring anchors. Islamism received source-backed 4/4/4 direct blocks; Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only.
- Islamism is a deliberately broad and contested public-project construct. The bank distinguishes political organization from private faith, Muslim identity, ordinary conservatism, nationalism, and militant subtype, but no local item or anchor has empirical validity evidence.
- The 1,428 candidates remain quarantined and effect-free across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.

## Current v16 status — 2026-08-27

- The live bank contains 528 prompts, 176 per layer, 43 editorial anchors, and 38 canonical scoring anchors. National Socialism received a source-backed provisional 4/4/4 direct block over its existing canonical meso node; its historical scope is German National Socialism, especially the interwar movement and the 1933–1945 regime.
- The v16 block remains high-risk editorial measurement. Open boundaries include historical period and national variation, coded-language and false-positive risk, the distinction between National Socialism and broader Fascism or generic authoritarianism, and later respondent/empirical validation. Neo-Fascism remains catalog-only because post-1945 continuity and adaptation are not closed for one production block.
- The structural fixture closes National Socialism in isolation, while full-production ranks and top-three overlap remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning. The 1,428 candidates remain effect-free and quarantined.
- No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run. Promotion remains provisional and fail-closed at the later review and empirical-validation gates.

## Current v15 status — 2026-08-27

- The live bank contains 516 prompts, 172 per layer, 42 editorial anchors, and 37 canonical scoring anchors. Conservative Nationalism received a source-backed 4/4/4 direct block over its existing parentless canonical meso hybrid; its National Conservatism micro child remains distinct.
- Conservative Nationalism is bounded by inherited national continuity, bounded civic solidarity, sovereignty and self-government, institutional stewardship, and accountable gradual change. The block is intended to distinguish the joint synthesis from generic patriotism, generic Conservatism, generic Nationalism, ancestry-only solidarity, and one contemporary movement; the shared facet geometry remains an editorial approximation.
- National Socialism and Neo-Fascism remain catalog-only because historically specific, high-risk, and postwar-continuity boundaries are not closed for a generic production block. The structural fixture closes Conservative Nationalism in isolation, with full-production ranks 5/20/1 by layer and 2 combined; these are design diagnostics, not respondent evidence or a basis for arbitrary retuning.
- The complete v15 share fragment measures 33,459 characters and now fits under the explicit finite 36,864-character guard. This accommodates payload growth while preserving answer-only serialization and fail-closed stale/malformed/oversized handling; it does not provide privacy or URL-size assurance.
- The 1,428 candidates remain quarantined and effect-free across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.

## Current v17 unknowns — 2026-08-27

- Civic Nationalism is now dedicated-scored only as a provisional, context-sensitive civic-membership field over the existing `Nationalism → Civic Nationalism` path. Remaining measurement gaps include civic versus liberal-national boundaries, jurisdiction-specific citizenship and exclusion, historical variation, and later respondent/empirical validation.
- The source pass supports civic political identity, citizenship-mediated membership, self-government, and contestable institutional belonging, while warning against a universal civic–ethnic ideal-type binary. Civic language must not be treated as proof of liberalism, inclusion, or any one constitutional design.
- The isolated Civic Nationalism fixture closes all three layers. The full-production diagnostic reports 10/6/7 layer ranks and 6 combined for Civic Nationalism; aggregate overlap and worst ranks remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning.
- Neo-Fascism remains catalog-only because postwar continuity, adaptation, and organizational boundaries are not closed for a single production block. The 1,428 candidates remain effect-free and quarantined across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run; later promotion gates remain fail-closed.

## Current v18 unknowns — 2026-08-27

- Black Nationalism is now dedicated-scored only as a provisional, historically varied liberation-national field over the existing `Nationalism → Black Nationalism` path. Remaining measurement gaps include the boundaries among Black Nationalism, Pan-Africanism, Anti-Colonial Nationalism, separatism, and Black Feminism; historical, diasporic, and jurisdictional variation; intersectional and gendered variation; and later respondent/empirical validation.
- The source pass supports racial consciousness, linked fate, collective action, autonomy, self-determination, and varied institutional strategies, while warning against treating one historical organization, one state-seeking route, or one separatist reading as the whole field. The provisional vector remains an editorial approximation and does not validate respondent classification.
- The isolated Black Nationalism fixture closes all three layers. The full-production diagnostic reports 3/15/7 layer ranks and 4 combined for Black Nationalism; aggregate overlap and worst ranks 37/33 remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning.
- Materialist Feminism and Anti-Colonial Nationalism remain catalog-only alternatives, and Neo-Fascism remains catalog-only because postwar continuity, adaptation, and organizational boundaries are not closed for one production block. The 1,428 candidates remain effect-free and quarantined; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run; later promotion gates remain fail-closed.

## Current v19 unknowns — 2026-08-27

- Materialist Feminism is now dedicated-scored only as a provisional plural materialist-feminist field over the existing `Socialist / Marxist Feminism → Materialist Feminism` path. Remaining measurement gaps include the boundaries among materialist, Marxist, socialist, radical, Black, and ecofeminist traditions; differences between historical-materialist and new-materialist accounts; variation in care, embodiment, labor, and institutional mechanisms; and later respondent/empirical validation.
- The source pass supports production/reproduction, social reproduction, labor, embodiment, resource access, structural power, historical specificity, and theoretical variation, while warning against collapsing materialist feminism into one Marxist theory, socialist programme, ownership regime, or account of gender. The provisional vector remains an editorial approximation and does not validate respondent classification.
- The isolated Materialist Feminism fixture closes all three layers. The full-production diagnostic reports 2/7/5 layer ranks and 4 combined; normative and prescriptive misses, aggregate overlap, and worst ranks 38/34 remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning.
- Marxist Feminism and Socialist Feminism remain distinct catalog branches, Anti-Colonial Nationalism remains a researched but unactivated alternative, and Neo-Fascism remains a high-risk catalog-only hold. The 1,428 candidates remain effect-free and quarantined; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run; later promotion gates remain fail-closed.

## Current v20 unknowns — 2026-08-27

- Anti-Colonial Nationalism is now dedicated-scored only as a provisional, historically varied anti-imperial/self-rule field over the existing `Nationalism → Anti-Colonial Nationalism` path. Remaining measurement gaps include boundaries among anti-colonial, Pan-African, Black, Arab, civic, and ethnocultural nationalisms; statehood versus open-ended self-determination; postcolonial institutional inheritance; historical and jurisdictional variation; and later respondent/empirical validation.
- The source pass supports colonial and external domination, collective self-rule, self-determination, peoplehood, international nondomination, solidarity, and varied postcolonial claims, while warning against reducing the field to formal independence, one state, one armed strategy, or one theoretical host. The provisional vector remains an editorial approximation and does not validate respondent classification.
- The isolated Anti-Colonial Nationalism fixture closes all three layers. The full-production diagnostic reports 6/9/7 layer ranks and 5 combined; aggregate overlap and worst ranks 39/35 remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning.
- Arab Nationalism and Maoism remain catalog-only alternatives requiring separate source and boundary passes; Neo-Fascism remains a high-risk catalog-only hold. The 1,428 candidates remain effect-free and quarantined; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run; later promotion gates remain fail-closed.

## Historical v12 status — 2026-08-26

- The live bank contains 480 prompts, 160 per layer, 39 editorial anchors, and 34 canonical scoring anchors. Ordoliberalism received a source-backed 4/4/4 direct block over its existing canonical micro node under Liberalism.
- Ordoliberalism is historically specific and internally contested. The current block distinguishes competition as institutional order, capable rule-bound authority against private concentration, and a limited social-market floor from Classical Liberalism, Neoliberalism, Social Democracy, Mutualism, and generic market preference, but the shared facet geometry remains an editorial approximation.
- Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism remain catalog-only. Pan-Africanism and Black Nationalism remain research-only alternatives pending sharper scope and cross-cutting boundary work.
- The 1,428 candidates remain quarantined and effect-free across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.

## Historical v13 status — 2026-08-26

- The live bank contains 492 prompts, 164 per layer, 40 editorial anchors, and 35 canonical scoring anchors. Pan-Africanism received a source-backed 4/4/4 direct block over its existing canonical micro node under Nationalism.
- Pan-Africanism is explicitly multi-layered and internally varied in the research record. The current block distinguishes African and diasporic solidarity, continuing colonial/racial power, collective self-determination, and cross-border cooperation from cultural pride, state nationalism, Black separatism, and state-bounded Anti-Colonial Nationalism. Its shared facet geometry remains an editorial approximation.
- The four remaining canonical meso holds—Conservative Nationalism, National Socialism, Neo-Fascism, and Religious Nationalism—remain catalog-only. The structural fixture closes Pan-Africanism in isolation but ranks it 7/6/7 by layer and 6 combined in full competition; this is a design diagnostic, not respondent evidence and not a basis for arbitrary retuning.
- The 1,428 candidates remain quarantined and effect-free across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.

## Current v14 status — 2026-08-27

- The live bank contains 504 prompts, 168 per layer, 41 editorial anchors, and 36 canonical scoring anchors. Religious Nationalism received a source-backed 4/4/4 direct block over its existing canonical meso hybrid node without invented parentage.
- Religious Nationalism is bounded by public religious–national fusion, sacred history or authority, jointly constituted membership, accountable self-government, and comparative institutional variation. The current block distinguishes it from private religiosity, cultural identity, generic Nationalism, Conservative Nationalism, and religion-specific variants; its shared facet geometry remains an editorial approximation.
- Conservative Nationalism, National Socialism, and Neo-Fascism remain catalog-only. The structural fixture closes Religious Nationalism in isolation, with full-production ranks 6/19/11 by layer and 10 combined; this remains a design diagnostic, not respondent evidence or a basis for arbitrary retuning.
- The 1,428 candidates remain quarantined and effect-free across 119 targets. No cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, or population evidence was run.
## Current v21 unknowns — 2026-08-27

- Dawisha's Arabism/political-nationalism distinction, McDougall's pan-national/territorial framing, Dawn's interwar historical ambiguity, and Ghazal's translocal religious/territorial layering support authoring, but do not establish a universal Arab Nationalism definition or validate this local block.
- Territorial Arab nationalism, Pan-Arabism, secular and religious strands, socialist/liberal hosts, and regime-centered claims may not separate cleanly under the shared 20-facet geometry. Arab Nationalism's full-production ranks 10/9/13 by layer and 9 combined are structural diagnostics, not grounds for uncalibrated retuning.
- Arabic language, cultural familiarity, private faith, ordinary patriotism, generic sovereignty, and one historical regime remain false-positive risks. No cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, population evidence, or empirical validation was run.
- Maoism remains a high-source-strength catalog-only alternative requiring separate doctrine-versus-regime, party-versus-mass-line, and historical-context boundary work; Neo-Fascism remains a high-risk hold.

## Current v22 unknowns — 2026-08-27

- Maoism is now dedicated-scored only as a provisional, historically bounded and internally contested current over the existing `Socialism → Communism → Maoism` path. Remaining gaps include doctrine versus regime history, Chinese versus international Maoist adaptations, agrarian/colonial context transfer, party authority versus mass-line participation, social classifications and institutional hierarchy, and later respondent/empirical validation.
- The source pass supports Sinification of Marxism-Leninism, revolutionary practice, contradiction, rectification, mass mobilization, anti-bureaucratic critique, equality claims, public/collective ownership, and the gap between egalitarian aspiration and institutional hierarchy. It does not validate the local wording, effects, provisional vector, or respondent classification.
- The isolated Maoism fixture closes all three layers. The full-production diagnostic reports 2/14/1 layer ranks and 1 combined for Maoism; global top-three rates of 43.1818% by layer and 50.0000% combined and worst ranks 41/37 remain design diagnostics rather than respondent evidence or a basis for arbitrary scorer retuning.
- Maoism must remain distinct from generic Communism, Marxism-Leninism, Trotskyism, Anti-Colonial Nationalism, peasant identity, authoritarianism, one Mao-era regime outcome, and contemporary actor inference. Neo-Fascism remains a high-risk catalog-only hold. The 1,428 candidates remain effect-free and quarantined; no cognitive review, respondent evidence, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run; later promotion gates remain fail-closed.

## Current v23 unknowns — 2026-08-27

- The council-democracy literature distinguishes Leninist, interwar council-communist, and later radical-democratic conceptions; the selected block is therefore a bounded editorial construct, not a universal definition of Council Communism. Historical terminology, representation, scale, and party/council relations remain open.
- Council Communism may remain difficult to separate from Guild Socialism, Anarcho-Syndicalism, Libertarian Socialism, Autonomist Marxism, Marxism-Leninism, and generic workplace democracy under the shared 20-facet geometry. Its full-production ranks 12/3/1 by layer and 1 combined are structural diagnostics, not grounds for uncalibrated retuning.
- Common ownership, direct democracy, worker voice, decentralization, anti-party language, or union support alone are false-positive risks. The block requires their council-constitutive combination, but no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.
- The 1,428 candidates remain effect-free and quarantined. Guild Socialism, Trotskyism, and Marxism-Leninism remain catalog-only alternatives; Neo-Fascism remains a high-risk hold; later promotion gates remain fail-closed.

## Current v24 unknowns — 2026-08-27

- Guild Socialism is a historically bounded and internally varied current, not a universal label. The early twentieth-century Cole-associated tradition, later uses of guild language, and transnational adaptations differ in their treatment of markets, legal autonomy, state coordination, representation, and gender.
- Guild Socialism may remain difficult to separate from Council Communism, Anarcho-Syndicalism, Libertarian Socialism, Democratic Socialism, and cooperative or union traditions under the shared 20-facet geometry. Its full-production ranks 12/5/5 by layer and 5 combined are structural diagnostics, not grounds for uncalibrated retuning.
- Worker control, public ownership, industrial democracy, decentralization, or association language alone are false-positive risks. The block requires their plural guild-institutional combination, but no cognitive review, respondent study, substitute simulation, psychometric calibration, reliability/validity estimate, invariance study, empirical validation, or population evidence was run.
- The 1,428 candidates remain effect-free and quarantined. Trotskyism and Marxism-Leninism remain catalog-only alternatives; Neo-Fascism remains a high-risk hold; later promotion gates remain fail-closed.
## Current v25 unknowns — 2026-08-27

- Trotskyism remains a provisional historically organized and internally varied Marxist-current construct. Open boundaries include variation across Fourth International and later organizations, interpretations of permanent revolution, national transfer, and the relationship between workers' democracy and revolutionary party coordination.
- The Cambridge sources support historical scope, uneven development, internationalism, Permanent Revolution, worker democracy, organizational variation, and anti-bureaucratic critique for authoring and provenance. They do not justify inference from permanent revolution alone, generic anti-Stalinism, anti-authoritarianism, globalism, socialism, or opposition to one regime.
- The isolated fixture closes all three Trotskyism layers; full-production ranks are 9/2/1 and combined rank 1. Aggregate top-three rates are 38.2979% by layer and 48.9362% combined, with worst ranks 44 and 41. These remain structural diagnostics, not respondent or psychometric evidence.
- The readable v1 full-answer representation exceeds the finite share guard, so v2 compact index encoding is active for the complete v25 payload while v1 decoding remains supported. No privacy assurance is implied by the URL-hash mechanism. Marxism-Leninism remains catalog-only and Neo-Fascism remains a high-risk hold. No cognitive review, respondent study, substitute simulation, calibration, reliability/validity, invariance, empirical, or population evidence was run.

## Current v26 unknowns — Marxism-Leninism — 2026-08-27

- Marxism-Leninism remains a provisional doctrine-level construct. Open boundaries include variation among Leninist traditions, the relationship between party leadership and class self-emancipation, democratic centralism in practice, state transformation, planned coordination, and the distinction between doctrine and historical regime.
- The Cambridge and Oxford sources support vanguard-party organization, democratic centralism, revolutionary strategy, Marxist democratic models, historical variation, and adjacent Communist/Marx context for authoring and provenance. They do not justify inference from generic Marxism, Communism, public ownership, state intervention, authoritarianism, Maoism, Trotskyism, Council Communism, or one regime.
- Isolated routing closes all three Marxism-Leninism layers; full-production ranks are 10/27/1 and combined rank 1. Aggregate top-three rates are 39.5833% by layer and 50.0000% combined, with worst ranks 45 and 41. These remain structural diagnostics, not respondent or psychometric evidence.
- The readable v1 full-answer representation remains above the finite share guard, so v2 compact index encoding is active at 6,966 characters while v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined; Neo-Fascism remains a high-risk hold. No cognitive review, respondent study, substitute simulation, calibration, reliability/validity, invariance, empirical, or population evidence was run.

## Current v27 unknowns — Autonomist Marxism — 2026-08-27

- Autonomist Marxism remains a provisional, historically varied construct. Open boundaries include Italian and later autonomist traditions, class-composition terminology across settings, movement composition, and the relationship between social autonomy and durable institutions.
- The Antipode source supports class composition, social reproduction, organizational differentiation, and women-led urban movement context for authoring; it does not justify inference from horizontal style, workplace democracy, anti-authoritarianism, generic anti-capitalism, or one contemporary movement.
- The isolated fixture closes all three Autonomist Marxism layers; full-production ranks are 10/8/2 and combined rank 1. Aggregate top-three rates are 37.4140% by layer and 51.0204% combined, with worst ranks 46 and 43. These remain structural diagnostics, not respondent or psychometric evidence.
- The readable v1 full-answer representation is 42,915 characters, so compact v2 is active at 7,094 characters while v1 remains decodable and no privacy assurance is implied. Anarcho-Pacifism and Materialist / Socialist Ecofeminism remain deferred; Neo-Fascism remains a high-risk hold. No cognitive review, respondent study, substitute simulation, calibration, reliability/validity, invariance, empirical, or population evidence was run.

## Current v28 unknowns — Anarcho-Pacifism — 2026-08-27

- The construct remains provisional. Open boundaries include principled versus pragmatic pacifism, pacifism versus nonviolence, self-defense and contested violence definitions, religious and secular traditions, radical versus reformist routes, historical/geopolitical variation, and translation across anarchist currents.
- The Oxford and SAGE sources support terminology, overlap and distinction, anti-domination, militarism, structural violence, nonviolent action, self-defense debates, historical variation, and boundary writing for authoring only. They do not justify inference from personal nonviolence, opposition to one war, anti-state language, strategic nonviolence, generic anarchism, or one historical movement; they do not validate local wording, effects, vectors, or respondent classification.
- Isolated routing closes all three layers; full-production ranks are 12/5/2 and combined rank 1, while aggregate top-three rates are 37.3333% by layer and 52.0000% combined with worst ranks 47 and 44. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- The readable v1 complete-answer representation is above the finite share guard, so compact v2 is active at 7,222 characters while v1 remains decodable and no privacy assurance is implied. Social Ecology, Austromarxism, and Materialist / Socialist Ecofeminism remain deferred, Neo-Fascism remains high-risk, the 1,428 candidates remain quarantined, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v29 unknowns — Social Ecology — 2026-08-27

- Social Ecology remains a provisional, historically varied construct. Open boundaries include Bookchin's communalist formulation versus contemporary municipalist strategies, the relation between ecological integrity and future generations, scale and coordination across federations, state capacity, ownership, anthropocentric versus ecocentric reasoning, and the feasibility and limits of historical examples.
- The sources support the coupled social-hierarchy/ecological-domination mechanism, ecological freedom, democratic municipalism, common provision, comparative variation, and false-positive controls for authoring only. They do not justify inference from environmental concern, localism, decentralization, anti-authoritarianism, progressive city policy, Deep Ecology, Green Anarchism, Ecosocialism, Rojava, or Bookchin identification alone; they do not validate local wording, effects, vectors, or respondent classification.
- Isolated routing closes all three layers; full-production ranks are 3/6/4 and combined rank 2, while aggregate top-three rates are 36.6013% by layer and 52.9412% combined with worst ranks 48 and 45. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- Readable v1 exceeds the finite share guard, so v2 is active at 7,350 characters while v1 remains decodable and no privacy assurance is implied. Womanism is next in the comparison queue; Classical-Liberal Feminism and Anarcho-Communism / Collectivist Anarchism remain catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v30 unknowns — Womanism — 2026-08-27

- Womanism remains provisional and internally varied. Open boundaries include Walker-derived womanism versus womanist theology, secular and queer strands, Africana Womanism, Black Feminism's relation to Womanism, diasporic variation, men and family, spiritual versus non-spiritual commitments, and state, reformist, abolitionist, or community-led routes.
- The sources support interlocking domination, Black women's knowledge and self-definition, survival and communal wholeness, naming debates, and false-positive controls for authoring only. They do not justify inference from Black identity, religion, family care, intersectionality, social justice, or support for Black women alone; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 43/43/43 and combined rank 43, while aggregate top-three rates are 35.2564% by layer and 51.9231% combined with worst ranks 49 and 46. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 7,478 characters because readable v1 measures 45,107; v1 remains decodable and no privacy assurance is implied. Classical-Liberal Feminism and Anarcho-Communism / Collectivist Anarchism remain catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains high-risk, the 1,428 candidates remain quarantined, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v31 unknowns — Classical-Liberal Feminism — 2026-08-27

- Classical-Liberal Feminism remains a provisional and contested family boundary rather than a universal standalone school. Open issues include multiple-label usage, the relation between classical liberalism and libertarian feminism, whether patriarchal culture as well as law is constitutive, formal rights versus enabling conditions, market and public-action variation, and the distinction from egalitarian liberal feminism.
- The SEP Liberal Feminism, Baehr, and SEP Libertarianism sources support equal rights, autonomy, noncoercion, constitutional democracy, limited public power, internal variation, and adjacent boundaries for authoring only. They do not justify inference from feminism, liberalism, market support, formal equality, libertarianism, or private-choice language alone; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 45/48/4 and combined rank 45, while aggregate top-three rates are 36.4780% by layer and 50.9434% combined with worst ranks 50 and 46. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 7,606 characters; v1 remains decodable and no privacy assurance is implied. Anarcho-Communism / Collectivist Anarchism is next in the comparison queue, Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains high-risk, the 1,428 candidates remain quarantined, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v32 unknowns — Anarcho-Communism — 2026-08-27

- Anarcho-Communism remains a provisional and historically varied branch. Open boundaries include the relationship to Collectivist Anarchism's labor-contribution and remuneration debates, Social Anarchism's wider economic range, Anarcho-Syndicalism's worker-organizational route, Mutualism and market exchange, communal scale, free association, revolutionary versus reformist strategy, and self-defense.
- The SEP, Cambridge, Edinburgh, Cornell, and Ostrom records support anti-hierarchical organization, common ownership, need-oriented provision, free association, federated self-management, historical variation, and false-positive controls for authoring only. They do not justify inference from anti-government sentiment, equality, communal cooperation, generic public ownership, or one historical author; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 11/3/1 and combined rank 1, while aggregate top-three rates are 35.8025% by layer and 51.8519% combined with worst ranks 51 and 47. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 7,734 characters; v1 remains decodable and no privacy assurance is implied. Collectivist Anarchism remains catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains high-risk, the 1,428 candidates remain quarantined, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v33 unknowns — Collectivist Anarchism — 2026-08-27

- Collectivist Anarchism remains provisional and historically bounded. Open issues include variation among Bakunin-era and later uses, the relationship to Anarcho-Communism, labor-contribution and remuneration arrangements, ownership and exchange, federation and scale, transition strategy, worker organization, and international or gendered scope.
- Franks, Ward, Bakunin, Kropotkin, SEP, Cambridge, and Ostrom sources support historical terminology, anti-capital and anti-state boundaries, federal coordination, distribution debates, and false-positive controls for authoring only. They do not justify inference from collective ownership, public ownership, cooperation, worker control, anti-government sentiment, or Anarcho-Communism alone; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 9/5/1 and combined rank 1, while aggregate top-three rates are 33.3333% by layer and 49.0909% combined with worst ranks 52 and 48. These are structural diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 7,862 characters; v1 remains decodable and no privacy assurance is implied. Anarcho-Syndicalism remains catalog-only, Materialist / Socialist Ecofeminism remains terminology-confounded, Neo-Fascism remains high-risk, the 1,428 candidates remain quarantined, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v34 unknowns — Anarchism macro family — 2026-08-27

- The Anarchism family anchor remains provisional and intentionally broad. Open issues include variation among individualist, social, mutualist, communist, feminist, ecological, religious, and historical currents; the relation between authority and coordination; market and non-market organization; institutional scale; violence, reform, and revolutionary strategy; and cross-context translation.
- SEP, Oxford Ward, Cambridge History of Socialism, and Ostrom sources support terminology, historical variation, federalism, institutional context, and false-positive controls for authoring only. They do not justify inference from anti-government sentiment, localism, personal independence, Libertarianism, Social Anarchism, or any single economic or historical branch; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 45/45/45 and combined rank 45, while aggregate top-three rates are 32.7381% by layer and 48.2143% combined with worst ranks 53 and 47. The broad-family overlap is a design diagnostic only and is not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 7,990 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 46 targets remain catalog-only, Neo-Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v35 unknowns — Conservatism macro family — 2026-08-27

- The Conservatism family anchor remains provisional and intentionally broad. Open issues include the boundaries among moderate, reactionary, radical, national, religious, liberal, and New Right formations; tradition versus exclusion; authority, hierarchy, democracy, markets, welfare, local association, state capacity, and cross-context translation.
- The current SEP entry, Oxford Handbook chapter, and Cambridge multiple-traditions chapter support terminology, historical variation, prudence, institutional knowledge, and false-positive controls for authoring only. They do not justify inference from generic caution, age, status-quo preference, one religion, nationalism, anti-government sentiment, or one conservative school; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 38/46/4 and combined rank 18, while aggregate top-three rates are 33.3333% by layer and 49.1228% combined with worst ranks 53 and 47. These are design diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 8,118 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 45 targets remain catalog-only, Neo-Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## Current v36 unknowns — Ecologism / Green Ideology macro family — 2026-08-27

- The Ecologism family anchor remains provisional and intentionally plural. Open issues include ecological limits versus human discretion, anthropocentric versus ecocentric value, ecological law, democratic participation, decentralization, state capacity, market and ownership variation, social justice, nonviolence, planetary coordination, and translation across jurisdictions and political traditions.
- Humphrey, Carter, SEP Environmental Ethics, Rockström, Gardiner, and existing Ecologism sources support terminology, historical variation, ecological-value context, planetary limits, intergenerational ethics, and false-positive controls for authoring only. They do not justify inference from generic environmental concern, conservation, Deep Ecology, bioregionalism, Green Politics, Social Ecology, Ecosocialism, one policy, or one tradition; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 21/48/3 and combined rank 8, while aggregate top-three rates are 33.3333% by layer and 48.2759% combined with worst ranks 54 and 48. These are design diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 8,246 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 44 targets remain catalog-only, Neo-Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.
## Current v37 unknowns — Liberalism macro family — 2026-08-27

- The Liberalism family anchor remains provisional and intentionally plural. Open issues include negative, positive, and republican liberty; classical and new liberalism; rights and property; markets and welfare; constitutionalism; universalism and particularism; state capacity; international reach; and boundaries with Republicanism, Conservatism, Social Liberalism, Libertarianism, and Neoliberalism.
- The current SEP, Oxford Handbook, and Cambridge Companion sources support terminology, historical variation, authority justification, liberty, pluralism, and false-positive controls for authoring only. They do not justify inference from generic individual preference, market support, constitutionalism alone, one party, one state size, or one liberal school; local wording, effects, vectors, respondent comprehension, and classification remain unvalidated.
- Isolated routing closes all three layers; full-production ranks are 10/24/11 and combined rank 9, while aggregate top-three rates are 33.3333% by layer and 47.4576% combined with worst ranks 55 and 48. These are design diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 8,374 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 43 targets remain catalog-only, Neo-Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.
## v38 open questions — Socialism macro family

- [ ] Later respondent data must test whether the broad Socialism block is distinguishable from Social Democracy, Democratic Socialism, Marxism, Communism, anarchist-socialist, and socialist-feminist profiles.
- [ ] Later content review must inspect market-socialist, centralized/decentralized, reformist/revolutionary, ecological, and cross-cultural interpretations of the wording.
- [ ] The full-production Socialism rank overlap (18/6/48; 7 combined) is a structural diagnostic only; no coefficient or picker retuning should be inferred from it.
- [ ] No empirical evidence currently supports treating the provisional anchor as a validated respondent classifier.

The v38 source comparison does not resolve these questions and intentionally leaves them as research holds.

## v39 open questions — Nationalism macro family

- [ ] Later respondent data must test whether the broad Nationalism block separates civic, liberal, ethnocultural, anti-colonial, religious, conservative, Arab, Pan-African, and other nationalist routes without collapsing into patriotism, ancestry, or ordinary citizenship.
- [ ] Later content review must inspect how national membership, self-determination, bounded solidarity, political partiality, continuity, sovereignty, and international cooperation are interpreted across jurisdictions and traditions.
- [ ] Republicanism's historical-tradition and contemporary non-domination senses require a separate comparison; Fascism remains a high-risk hold and Feminism requires plural-family boundary work.
- [ ] The full-production Nationalism ranks (28/32/14; 19 combined) and top-three rates are deterministic design diagnostics only; no scorer or picker retuning is authorized from them.
- [ ] No evidence currently supports treating the provisional anchor as a validated respondent classifier or population-level measure.

The v39 source comparison does not resolve these questions and intentionally leaves them as research holds.

## v40 open questions — Republicanism macro family

- [ ] Later respondent data must test whether the broad Republicanism block separates historical civic republicanism, contemporary neo-republicanism, Civic Republicanism, Liberalism, and patriotism without collapsing the two principal senses.
- [ ] Later content review must inspect civic virtue, participation, mixed government, rule of law, non-domination, private power, common goods, sovereignty, and cross-border interpretations across jurisdictions and traditions.
- [ ] The full-production Republicanism ranks (7/1/49; 4 combined) and top-three rates are deterministic design diagnostics only; no scorer or picker retuning is authorized from them.
- [ ] No evidence currently supports treating the provisional anchor as a validated respondent classifier or population-level measure.

The v40 source comparison does not resolve these questions and intentionally leaves them as research holds.

## v41 open questions — Feminism macro family

- [ ] Later respondent data must test whether the broad Feminism block separates liberal, radical, socialist/Marxist/materialist, Black, intersectional, ecological, queer, transnational, decolonial, Indigenous, religious, secular, and democratic routes without collapsing them into identity, formal equality, care preference, or one account of patriarchy.
- [ ] Later content review must inspect gendered structural power, public/private institutions, autonomy, equality, solidarity, democracy, care, social reproduction, embodiment, identity, institutional voice, public provision, decentralization, and reform across jurisdictions and traditions.
- [ ] The Oxford and Cambridge Fascism comparison remains unresolved for a single broad production block; Fascism stays high-risk and catalog-only until a narrower historical and false-positive boundary is closed.
- [ ] The full-production Feminism ranks (1/2/46; 1 combined) and top-three rates are deterministic design diagnostics only; no scorer or picker retuning is authorized from them.
- [ ] No evidence currently supports treating the provisional anchor as a validated respondent classifier or population-level measure.

The v41 source comparison does not resolve these questions and intentionally leaves them as research holds.

## v42 open questions — Anarcho-Syndicalism micro branch

- [ ] Later respondent data must test whether the worker-led workplace, union-organization, direct-action, federated self-management, and anti-permanent-command bundle separates Anarcho-Syndicalism from Social Anarchism, Libertarian Socialism, Guild Socialism, Anarcho-Communism, Collectivist Anarchism, and National-Syndicalism.
- [ ] Later content review must inspect historical and transnational variation in syndicalist organization, the relationship between anarchist principles and union practice, direct action's contested meanings, and whether the wording separates worker democracy from co-determination or ordinary union support.
- [ ] The full-production Anarcho-Syndicalism ranks (15/8/1; 1 combined) and top-three rates are deterministic design diagnostics only; no scorer or picker retuning is authorized from them.
- [ ] Compact v2 is active at 9,014 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 38 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

The v42 source comparison does not resolve these questions and intentionally leaves them as research holds.

## v43 precision unknowns — Anarcho-Capitalism micro branch

- The Anarcho-Capitalism anchor remains provisional and conceptually contested. Open issues include the relation between anarchism and libertarianism, Rothbardian versus other market-anarchist arguments, property acquisition and legitimacy, inequality, contract and consent, legal/security/infrastructure provision, exit, coercion, institutional feasibility, and historical or cross-jurisdictional variation.
- The Cambridge sources support terminology, debate context, provenance, and false-positive controls for authoring only. They do not justify inference from libertarian identity, low-tax or small-government preferences, anti-state sentiment, private provision, property support, voluntary exchange, respondent comprehension, or classification.
- Isolated routing closes all three layers; full-production ranks are 12/1/1 and combined rank 1, while aggregate top-three rates are 32.8205% by layer and 49.2308% combined with worst ranks 61 and 52. These are deterministic design diagnostics only and are not grounds for uncalibrated scorer retuning.
- Compact v2 is active at 9,142 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 37 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v44 precision unknowns — Anarcho-Primitivism micro branch

- The Anarcho-Primitivism anchor remains provisional and contested. Open issues include anti-civilization versus primitivist terminology, whether the construct requires rejection of civilization or only industrial scale, appropriate or guarded technology, agriculture and domestication, scale and federation, tactics, community, and the relation to Green Anarchism, Social Ecology, Deep Ecology, Neo-Luddism, and degrowth.
- The fresh sources support terminology, critical debate, variation, provenance, and false-positive controls for authoring only. They do not justify inference from environmentalism, localism, survivalism, generic anti-technology sentiment, romanticized Indigenous identity, one theorist, respondent comprehension, local vectors, or classification. Indigenous and decolonial critiques require particular care against appropriation and essentialization.
- Isolated routing closes all three layers and combined calculation; full-production ranks are 9/33/1 and combined rank 1, while aggregate top-three rates are 32.3232% by layer and 48.4848% combined with worst ranks 62 and 53. These are deterministic design diagnostics only and are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,270 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 36 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v45 precision unknowns — Austromarxism micro branch

- The Austromarxism anchor remains provisional and historically varied. Open issues include the relation among Bauer, Renner, Adler, Hilferding, and Neurath; Austrian Social Democracy and Marxist theory; reform and revolution; parliamentary, municipal, and associational routes; and historical versus contemporary transfer.
- The national-autonomy boundary requires care: personal or non-territorial cultural self-government, territorial federation, common political authority, minority protection, and their limits must remain distinct from generic nationalism, multiculturalism, separatism, or autonomy alone. The sources do not authorize one canonical route.
- The fresh sources support terminology, historical variation, provenance, and false-positive controls for authoring only. They do not justify inference from generic Marxism, Social Democracy, Austrian identity, parliamentary reform, Marxism-Leninism, Communism, one regime, one theorist, respondent comprehension, local vectors, or classification.
- Isolated routing closes all three layers and combined calculation; full-production ranks are 8/5/2 and combined rank 2, while aggregate top-three rates are 31.3433% by layer and 49.2537% combined with worst ranks 63 and 54. These are deterministic design diagnostics only and are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,398 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 35 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v46 precision unknowns — Egalitarian-Liberal Feminism micro branch

- The Egalitarian-Liberal Feminism anchor remains provisional and internally varied. Open issues include substantive versus formal equality, individual versus relational autonomy, family and care institutions, welfare and affirmative-action routes, public reason, anti-stereotyping, and the limits of state action.
- The branch must remain distinct from Classical-Liberal Feminism's stronger noninterference/formal-rights route, generic Social Liberalism, feminism or equality language alone, public provision or anti-discrimination alone, Socialist / Marxist / Materialist Feminism's constitutive production and social-reproduction theory, and Radical Feminism's structural-sexual domination account.
- The fresh sources support terminology, conceptual variation, provenance, and false-positive controls for authoring only. They do not justify inference from generic liberalism, formal rights, public benefits, anti-discrimination, one author, respondent comprehension, local vectors, or classification.
- Isolated routing closes all three layers and the combined calculation; full-production ranks are 54/57/2 and combined rank 53, while aggregate top-three rates are 31.8627% by layer and 48.5294% combined with worst ranks 64 and 55. These are deterministic design diagnostics only and are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,526 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 34 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v47 precision unknowns — Buddhist Nationalism micro branch

- The Buddhist Nationalism anchor remains provisional and internally varied. Open issues include the relation among Buddhist doctrine, lay and monastic authority, state patronage, national identity, public order, minority membership, anti-colonial and defensive narratives, democratic contestation, and transnational or global pressures across jurisdictions.
- The branch must remain distinct from private Buddhism, cultural familiarity, ordinary patriotism, generic Religious Nationalism, nationalism without Buddhist-national translation, Hindu or Christian Nationalism, one country, one monk, one minority conflict, one constitutional model, or one party. Equal civic standing and pluralist contestation remain explicit boundary controls rather than assumptions about every historical form.
- The fresh sources support terminology, comparative and historical variation, provenance, and false-positive controls for authoring only. They do not justify inference from private faith, cultural familiarity, generic nationalism, respondent comprehension, local vectors, or classification.
- Isolated routing closes all three layers and the combined calculation; full-production ranks are 18/43/17 and combined rank 22, while aggregate top-three rates are 30.9179% by layer and 47.8261% combined with worst ranks 65 and 56. These are deterministic design diagnostics only and are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,654 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 33 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v48 continuation unknowns — Cultural / Spiritual Ecofeminism micro branch

- The branch remains a provisional editorial construct inside a plural Ecofeminist field. Open issues include the boundary among cultural, spiritual, religious, relational, material, socialist, queer, decolonial, and secular ecofeminisms and the degree to which any one label is used consistently across traditions and periods.
- Anti-essentialist wording is a hard boundary. The branch must not be inferred from women–nature association, spirituality, gender identity, environmental concern, care language, one goddess or theological tradition, or cultural identity without a linked analysis of domination, interdependence, and political remedy.
- The sources support terminology, internal debate, contextual variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-cultural measurement invariance, or empirical classification.
- Isolated routing closes all three layers; the full-production fixture ranks the branch 13/10/8 and combined rank 6, while aggregate top-three rates are 29.5238% by layer and 45.7143% combined with worst ranks 66 and 57. These deterministic diagnostics record overlap with Ecofeminism, Feminism, and Socialist / Marxist Feminism; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,782 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 32 ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v49 continuation unknowns — Materialist / Socialist Ecofeminism micro branch

- The branch remains a provisional editorial construct inside a plural ecofeminist and feminist-environmental field. Open issues include the relation among materialist and Marxist ecofeminism, feminist political ecology, social-reproduction analysis, anti-capitalist ecology, and the boundaries between reformist, transformative, state, municipal, cooperative, and autonomous routes.
- The production boundary must require a linked capitalist/patriarchal material mechanism across paid and unpaid labor, social reproduction, resource control, and ecological degradation. It must not infer the branch from green policy, feminism, socialism, welfare support, public ownership, care language, social-reproduction language, one country, one theorist, or one institutional model.
- The fresh sources support terminology, plural and situated variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-cultural measurement invariance, or empirical classification.
- Isolated routing closes all three layers and the combined calculation; the full-production fixture ranks the branch 2/1/2 and combined rank 1, while aggregate top-three rates are 27.2300% by layer and 45.0704% combined with worst ranks 67 and 59. These deterministic diagnostics record overlap with Ecofeminism, Socialist / Marxist Feminism, Materialist Feminism, and adjacent branches; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 9,910 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 31 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v50 continuation unknowns — Christian Nationalism micro branch

- The Christian Nationalism anchor remains a provisional editorial construct inside a heterogeneous Christian-national field. Open issues include the boundaries among Christian Nationalism, Religious Nationalism, Christian Democracy, civic religion, Christian patriotism, church establishment, integralism, dominionism, religious conservatism, and particular national histories.
- The production boundary must require a linked Christianized national-membership mechanism and public institutional authority or political action. It must not infer the branch from private faith, patriotism, ceremonial religion, Christian social concern, Christian Democracy, generic Religious Nationalism, one party, one actor, one country, or one policy. Theological, constitutional, democratic, authoritarian, racialized/non-racialized, and jurisdictional variation remains explicit.
- The fresh Cambridge/Oxford sources support terminology, plural variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers and the combined calculation; full-production ranks are 8/47/1 and combined rank 2, while aggregate top-three rates are 26.8519% by layer and 45.8333% combined with worst ranks 68 and 60. These deterministic diagnostics record overlap with Religious Nationalism, Nationalism, Christian Democracy, and adjacent religion-specific branches; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,038 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 30 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v52 continuation unknowns — Cultural Feminism micro branch

- The Cultural Feminism anchor remains a provisional editorial construct in a contested field spanning difference-feminist, essentialist, anti-essentialist, relational, intersectional, postcolonial, and care-oriented readings. Open issues include how cultural valuation, embodiment, care, relationship, and institutional power interact without collapsing the branch into a fixed account of women or into Radical, Materialist, Lesbian, or Ecofeminist mechanisms.
- The production boundary must require convergent evidence that gendered or cultural norms shape power, care/relational/embodied practices can carry political value without naturalizing women, and feminist transformation changes cultural or institutional valuation while remaining open to contestation. Gender identity, care preference/work, feminist identity, one anti-essentialist statement, generic feminism, one community, one author, or one policy is insufficient.
- The fresh Signs, Oxford, Hypatia, and Social Politics sources support terminology, interpretive variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers at 4/4/4; full-production ranks are 12/32/16 and combined rank 11, while aggregate top-three rates are 26.1261% by layer and 45.9459% combined with worst ranks 70 and 62. These deterministic diagnostics record overlap with Feminism, Radical Feminism, Materialist Feminism, Black Feminism, and care-oriented neighbors; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,294 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 28 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v51 continuation unknowns — Egoist Anarchism micro branch

- The Egoist Anarchism anchor remains a provisional editorial construct inside a contested Stirnerian and individualist-anarchist field. Open issues include psychological versus ethical or self-relational readings of egoism, the meanings of ownness and self-rule, property and exchange, sociality and spontaneous cooperation, historical reception, tactical politics, and jurisdictional variation.
- The production boundary must require convergent self-rule or ownness, resistance to imposed identity and compulsory authority, and voluntary association without a fixed collective sovereign. It must not infer the branch from nonconformity, privacy, personal self-interest, market libertarianism, anti-state sentiment alone, generic Anarchism, Nietzscheanism, Anarcho-Capitalism, or one reading of Stirner.
- The fresh SEP, Wiley, Cambridge, and Oxford sources support terminology, historical placement, interpretive variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers and the combined calculation; full-production ranks are 27/6/1 and combined rank 1, while aggregate top-three rates are 26.9406% by layer and 46.5753% combined with worst ranks 69 and 61. These deterministic diagnostics record overlap with Individualist Anarchism, Anarcho-Capitalism, Collectivist Anarchism, Libertarianism, and broad Anarchism; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,166 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 29 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v53 continuation unknowns — Cultural Nationalism micro branch

- The Cultural Nationalism anchor remains a provisional editorial construct in a contested field spanning cultural, civic, ethnocultural, religious, anti-colonial, regional/minority, pluralist, state, non-state, historical, and postcolonial projects. Open issues include the relation among language, memory, arts, education, symbols, heritage, associations, national membership, and direct versus indirect state control.
- The production boundary must require convergent national translation, cultural mechanism, and public or collective project. It must not infer the branch from cultural pride, language use, ancestry, patriotism, citizenship, civic institutions alone, ethnocultural inherited membership, religious nationalism, anti-colonial domination, one state/party/heritage policy, fixed cultural homogeneity, or one author.
- The fresh Taylor & Francis, Oxford, Taylor & Francis, and Croatian Journal of Education sources support terminology, variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers at 4/4/4; full-production ranks are 16/38/17 and combined rank 19, while aggregate top-three rates are 25.7778% by layer and 45.3333% combined with worst ranks 71 and 63. These deterministic diagnostics record overlap with Nationalism, Civic Nationalism, Ethnocultural Nationalism, Religious Nationalism, and broad cultural branches; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,422 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 27 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v54 continuation unknowns — Ethnocultural Nationalism micro branch

- The Ethnocultural Nationalism anchor remains a provisional editorial construct in a contested field. Open issues include the relation among shared descent, inherited culture, language, customs, territorial memory, national membership, cultural nationalism, civic nationalism, religious nationalism, racialization, minority pluralism, and state/non-state mobilization.
- The production boundary must require convergent national translation, a constitutive inherited-membership rule, and an institutional or political implication. It must not infer the branch from cultural pride, language use, ancestry identity, patriotism, immigration concern, religious identity, racial hierarchy alone, citizenship law alone, one policy/state/author, or generic Nationalism.
- The fresh Annual Review, Oxford, International Affairs, Nations and Nationalism, and International Journal of Constitutional Law sources support terminology, variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers at 4/4/4; full-production ranks are 15/28/1 and combined rank 3, while aggregate top-three rates are 26.3158% by layer and 46.0526% combined with worst ranks 72 and 64. The full-competition missing-layer fields are overlap diagnostics, not direct-coverage failures or grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,550 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 26 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v55 continuation unknowns — Lesbian Feminism micro branch

- The Lesbian Feminism anchor remains a provisional editorial construct in a contested feminist field. Open issues include how compulsory heterosexuality, gendered sexuality institutions, lesbian autonomy, self-definition, community formation, separatism, coalition, trans inclusion, race, class, disability, religion, and historical change should relate across contexts.
- The production boundary must require convergent structural sexuality critique, feminist or lesbian autonomy/self-definition, and a collective, institutional, or alternative-community implication. It must not infer the branch from identity, orientation, relationship status, feminist identity, sexuality-rights support, anti-men sentiment, generic feminist strands, one separatist formation, one author, or one policy.
- The fresh Signs, Wiley, Oxford, and California Scholarship Online sources support terminology, historical variation, provenance, and false-positive controls for authoring only. They do not justify respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing closes all three layers at 4/4/4; full-production ranks are 3/16/10 and combined rank 4, while aggregate top-three rates are 26.8398% by layer and 44.1558% combined with worst ranks 73 and 65. These deterministic diagnostics record overlap with Feminism, Radical/Cultural/Black Feminism, Anarcho-Communism, and ecological/care neighbors; they are not grounds for uncalibrated scorer or picker retuning.
- Compact v2 is active at 10,678 characters; v1 remains decodable and no privacy assurance is implied. The 1,428 candidates remain quarantined, 25 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v56 continuation unknowns — One-Nation Conservatism micro branch

- The One-Nation Conservatism anchor remains provisional in a historically changing and internally varied field. Open issues include how national translation, cross-class cohesion, inherited institutions, social stewardship, markets, welfare, state capacity, constitutional democracy, sovereignty, immigration, social liberalism, and cosmopolitanism combine across Disraelian, interwar, postwar, and contemporary usages.
- The production boundary requires the joint national, cross-class, institutional, and constructive-reform bundle. Patriotism, welfare support, tradition, party affiliation, one leader, one policy, generic Conservatism, National Conservatism, or Social Democracy cannot activate it alone.
- The EHR/OUP, Contemporary British History, Policy Press, and Political Quarterly sources support terminology, variation, provenance, and false-positive controls for authoring only. They do not establish respondent comprehension, local vector validity, cross-context measurement invariance, or empirical classification.
- Isolated routing is complete at 4/4/4; full-production ranks are 15/30/1 and combined rank 5, with aggregate top-three rates of 26.9231% and 43.5897% and worst ranks 74 and 67. The combined two-layer miss is an overlap diagnostic only and does not justify scorer or picker retuning.
- Compact v2 is active at 10,817 characters; v1 remains decodable. The 1,428 candidates remain quarantined, 24 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.

## v57 continuation unknowns — Zionism micro branch

- The Zionism anchor remains provisional in a historically situated and internally varied field. Open issues include the relation among Jewish national identity, political self-determination, cultural revival, political community, diaspora, sovereignty, multinational or autonomy arrangements, equal citizenship, and the divergent secular, religious, socialist, revisionist, cultural, and post-state interpretations documented by the sources.
- The production boundary must require convergent Jewish collective self-determination, political or cultural institution-building, and explicit attention to equal civic standing and plural constitutional routes. It must not infer the branch from Jewish identity, private faith, generic nationalism, patriotism, current government or conflict opinion, antisemitism or anti-Palestinian sentiment alone, one territorial programme, or one historical leader.
- The Boix, Shumsky, Mann, Cambridge, and Oxford sources support terminology, historical and institutional variation, provenance, and false-positive controls for authoring only. They do not establish respondent comprehension, local vector validity, cross-context invariance, or empirical classification.
- Isolated routing closes all three layers at 4/4/4. Full-production ranks are 27/25/19 and combined rank 19; aggregate top-three rates are 26.5823% by layer and 43.0380% combined, with worst ranks 75 and 68. These deterministic overlap diagnostics do not justify scorer or picker retuning.
- Compact v2 is active at 10,961 characters; v1 remains decodable. The 1,428 candidates remain quarantined, 23 canonical ontology targets remain catalog-only, Fascism remains high-risk, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.
+
## v58 continuation unknowns — Khomeinism micro branch

- The Khomeinism anchor remains provisional in a historically situated and internally contested Iranian Shi'i Islamist field. Open issues include jurist guardianship, modern sovereignty, clerical/state relations, anti-imperial independence, oppressed-centered mobilization, constitutional participation, national/transnational scope, pre/post-revolutionary theory and practice, and disagreement within Shi'i thought.
- The production boundary requires the joint guardianship, modern state-form, independence, and oppressed-mobilization bundle. Shi'i identity, private faith, generic Islamism, anti-imperialism, social-justice concern, opposition to monarchy, present Iranian policy opinion, one leader, or operational militancy cannot activate it alone.
- The Abrahamian, Arjomand, Namazi, Hossainzadeh/Travers, Ghobadzadeh, and adjacent Cambridge sources support authoring and false-positive controls only; they do not establish respondent comprehension, local vector validity, cross-context invariance, or empirical classification.
- Isolated routing is complete at 4/4/4; full-production ranks are 4/31/1 and combined rank 1, with aggregate top-three rates of 26.2500% by layer and 43.7500% combined and worst ranks 76 and 69. The descriptive/normative misses and normative rank 31 are overlap diagnostics only and do not justify scorer or picker retuning.
- Compact v2 is active at 11,105 characters; v1 remains decodable. The 1,428 candidates remain quarantined, 22 canonical ontology targets remain catalog-only, Fascism remains high-risk, the next queue target is Qutbism, and no cognitive, respondent, simulation, psychometric, empirical, reliability/validity, invariance, or population evidence was run.


## v59 open questions — Qutbism

- [ ] Cognitive review and respondent evidence remain required before wording, effects, or labels can be treated as validated measurement; explicitly not run here.
- [ ] Deterministic ranks 3/48/3 and 10 combined show current normative overlap; they do not authorize coefficient or picker retuning.
- [ ] Qutb's periods, `hakimiyyah`, `jahiliyya`, authority, pluralism, and revolutionary/reformist reception remain contested and may require future source review.
- [ ] Governance promote-to-canonical/catalog-only and live dedicated-scored measurement are intentionally separate and require explicit reconciliation if policy changes.
- [ ] Comprehensive coverage remains open; Fascism and Neo-Fascism are high-risk catalog-only holds and other targets remain queued.

## v60 open questions — Radical Republicanism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 10/8/6 and 4 combined, aggregate rates 25.2033% and 41.4634%, and worst ranks 78 and 72 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] Historical radical republican variants, material versus procedural non-domination, popular constitutionalism, labour and socialist readings, and direct versus representative routes remain contested.
- [ ] The boundary with Historical Republicanism, Contemporary Neo-Republicanism, Civic Republicanism, Marxist readings, patriotism, and generic majoritarianism requires future source review; the branch must not be inferred from civic participation or anti-corruption sentiment alone.
- [ ] Twenty canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.

## v61 open questions — Marxist Feminism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 3/15/2 and 1 combined, aggregate rates 25.3012% and 42.1687%, and worst ranks 79 and 73 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] Historical-materialist, dual-systems, unitary, social-reproduction, autonomist, Wages for Housework, intersectional, Black, queer, trans, decolonial, reformist, revolutionary, public, cooperative, union, household, and autonomous variations remain internally contested.
- [ ] The boundary with Socialist / Marxist Feminism, Materialist Feminism, Socialist Feminism, generic Feminism, Marxism, welfare, public ownership, and autonomous routes requires future source and boundary review.
- [ ] Nineteen canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.

## V62 open questions — Socialist Feminism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 2/70/65 and 1 combined, aggregate rates 24.2063% and 41.6667%, and worst ranks 80 and 73 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] Socialist Feminism's boundary with Marxist Feminism, Materialist Feminism, generic Feminism, generic Socialism, welfare, public provision, and autonomous feminist politics remains plural and requires future source and boundary review.
- [ ] Semi-autonomous sex-gender relations, race and sexuality, and public, cooperative, union, household, reformist, and revolutionary routes require later cross-context scrutiny.
- [ ] Eighteen canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.

## V63 open questions — Left-Wing Populism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 9/27/16 and 10 combined, aggregate rates 23.1373% and 41.1765%, and worst ranks 81 and 74 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] The boundary between the thin Populist core, Left-Wing Populism, Right-Wing Populism, Socialism, Democratic Socialism, Nationalism, and generic anti-elite dissatisfaction remains host- and context-sensitive.
- [ ] Inclusionary versus exclusionary identity construction, class and multisectoral people-construction, leadership, movement organization, reform/transformative strategy, and domestic/international routes require later cross-context source review.
- [ ] Seventeen canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.

## V64 open questions — Neoconservatism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 27/28/5 and 7 combined, aggregate rates 23.2558% and 40.6977%, and worst ranks 82 and 75 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] The boundary among Neoconservatism, Conservatism, Neoliberalism, National Conservatism, Paleoconservatism, and liberalism remains historically and internally varied.
- [ ] Moral-order critique, republican-democratic common purpose, public authority, national interest, international engagement, realism/idealism, multilateralism, and domestic economic routes require later cross-context source and boundary review.
- [ ] Sixteen canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.
## V65 open questions — Paleoconservatism

- [ ] Cognitive/respondent evidence remains required before wording, effects, anchor vectors, or labels become validated measurement; explicitly not run here.
- [ ] Full-competition ranks 12/48/1 and 6 combined, aggregate rates 23.7548% and 40.2299%, and worst ranks 83 and 76 are deterministic overlap diagnostics, not grounds for coefficient or picker changes.
- [ ] The boundary among Paleoconservatism, Conservatism, National Conservatism, Neoconservatism, Right-Wing Populism, the alt-right, and White Nationalism remains historically and internally varied.
- [ ] Post-war New Right formation, inherited culture, sovereignty, local authority, paleolibertarian alliance, pluralist versus exclusionary variants, and domestic versus foreign-policy routes require later cross-context source and boundary review.
- [ ] Fifteen canonical ontology targets remain catalog-only; Fascism and Neo-Fascism remain high-risk holds and the comprehensive coverage goal remains open.
- [ ] Paleoconservatism is isolated-reachable in all three layers, while the full-competition combined diagnostic reports combinedReachable false with descriptive and normative missing fields; this is structural geometry evidence only, not respondent evidence or a reason for uncalibrated retuning.

## V66 open questions — Wasatiyya

- [ ] Wasatiyya's boundary with Islamism, Revolutionary Islamism, Qutbism, Khomeinism, Religious Nationalism, and state-sponsored moderate-Islam branding remains historically and internally contested.
- [ ] Equal citizenship, coexistence, consultation, participation, theological exclusivism, and resistance to secular pluralism vary across thinkers, movements, periods, states, and jurisdictional settings; the local block does not resolve those disputes.
- [ ] Wasatiyya is isolated-reachable in all three layers, while the full-competition diagnostic reports combinedReachable false and full ranks 26/30/32 by layer and 28 combined; these are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Fourteen canonical ontology targets remain catalog-only; Fascism, Neo-Fascism, and other high-risk or under-specified branches remain held, and the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V80 open questions — Salafi-Jihadism high-risk doctrinal boundary

- [ ] The boundary among Salafi quietist, political, and jihadi trajectories remains historically and internally contested; national, regional, organizational, intellectual, movement, and period differences may not share one uniform construct.
- [ ] Salafi-Jihadism must remain distinct from generic Salafism, Islamism, Revolutionary Islamism, Qutbism, Khomeinism, Wasatiyya, religious conservatism, generic sharia support, anti-Western sentiment, authoritarianism, and anti-state anger; deterministic separation is not evidence that the distinctions are valid for respondents.
- [ ] The high-risk branch contains doctrinal and political references that require continued non-operational handling; it must not be used to infer Muslim identity, private faith, current actors, membership, recruitment, tactics, targets, or intent.
- [ ] Salafi-Jihadism is isolated-reachable in all three layers and combined, while full-competition ranks 13/1/2 by layer and 1 combined; aggregate rates and worst ranks 96/89 are deterministic geometry diagnostics only, not grounds for uncalibrated retuning.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V79 open questions — Third Positionism postwar far-right boundary

- [ ] The boundary among Third Positionism, Fascism, Neo-Fascism, National Socialism, National-Syndicalism, National Conservatism, and broader third-way language remains contested and historically variable.
- [ ] Italian Terza Posizione, British/Strasserite, other national or transnational, intellectual, movement, party, corporative, occupational, sovereign, constitutional, democratic, and authoritarian uses differ; the local block is a bounded analytical construct and does not resolve those disputes.
- [ ] Peronist and Cold War non-alignment uses of “Third Position,” Argentine authoritarian-corporatist uses, generic mixed-economy positions, and anti-capitalism/anti-communism without the convergent historical bundle remain explicit false-positive risks.
- [ ] Third Positionism is isolated-reachable in all three layers, while full-competition ranks 13/2/1 by layer and 2 combined; top-three rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Salafi-Jihadism is the sole remaining canonical catalog-only target; cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement.

## V78 open questions — Revolutionary Islamism

- [ ] Compare additional Sunni, Shi'a, national, transnational, constitutional, democratic, authoritarian, movement-led, and state-mediated historical cases before treating the cross-case branch as settled.
- [ ] Refine the boundary with broad Islamism, Qutbism, Khomeinism, Wasatiyya, and Salafi-Jihadism without importing operationally adjacent content.
- [ ] Assess religious-identity, social-conservatism, anti-imperialism, anti-elite, and current-policy false positives.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.


## V77 open questions — Neo-Nazism postwar continuity and adaptation

- [ ] The boundary among Neo-Nazism, historical National Socialism, Neo-Fascism, White Nationalism, wider Fascism, Third Positionism, and generic radical-right or nationalist formations remains historically and internally contested across periods and national settings.
- [ ] British, American, German, European, transnational, party, network, cultural, esoteric, religious, imitation, and direct-continuity forms differ; the local block is a bounded analytical construct and does not resolve those scholarly disputes.
- [ ] Neo-Nazism is isolated-reachable in all three layers, while full-competition ranks are 6/1/4 by layer and 1 combined; aggregate rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Three canonical ontology targets remain catalog-only: Revolutionary Islamism, Salafi-Jihadism, and Third Positionism; the comprehensive coverage goal remains open.
- [ ] Coded-language, identity-inference, affiliation, symbol, slogan, current-actor, period, and continuity-versus-imitation false-positive controls need later source and boundary review; operational content remains excluded.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V76 open questions — White Nationalism high-risk racial-national boundary

- [ ] The boundary among White Nationalism, Ethnocultural Nationalism, Nationalism, Fascism, Neo-Nazism, White Christian Nationalism, and adjacent racialized or civic formations remains historically and internally contested.
- [ ] Settler-colonial and postcolonial histories, national and transnational formations, racialized citizenship, religious and secular idioms, conservative/liberal/populist/fascist-adjacent routes, and changing or coded discourse vary; the local block does not resolve those disputes.
- [ ] White Nationalism is isolated-reachable in all three layers, while full-competition ranks 29/5/3 by layer and 2 combined; aggregate rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Four canonical ontology targets remain catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, and Third Positionism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V75 open questions — Fascism macro family

- [ ] The boundary among Fascism, National Socialism, Neo-Fascism, Legionary Fascism, Radical Conservatism, Nationalism, Third Positionism, and generic authoritarianism remains contested across scholarship and national cases.
- [ ] Italian, German, Romanian, Spanish, Brazilian, and other formations differ over race, religion, economic coordination, movement/state relations, democracy, violence, war, social base, and institutionalization; the macro block preserves that variation but does not resolve it.
- [ ] Fascism is isolated-reachable in all three layers, while full-competition ranks 3/1/1 by layer and 1 combined; aggregate rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Five canonical ontology targets remain catalog-only: Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## Current v74 open questions — Legionary Fascism

- [ ] The boundary among Legionary Fascism, wider Fascism, Religious Nationalism, National Socialism, Neo-Fascism, Integral Nationalism, and Romanian historical nationalism remains historically and internally contested.
- [ ] Political faith, Orthodox institutional relationship, law and sovereignty, movement/state relations, social and gender roles, generations, organization, period, and diaspora/transnational relations vary across sources; the local block does not resolve those disputes.
- [ ] Legionary Fascism is isolated-reachable in all three layers, while full-competition ranks 1/1/2 by layer and 1 combined; aggregate top-three rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Six canonical ontology targets remain catalog-only: Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V71 open questions — Falangism

- [ ] The boundary among Falangism, wider Fascism, National-Syndicalism, Francoism, National Socialism, Neo-Fascism, and Third Positionism remains historically and internally contested.
- [ ] Early Falange and later FET y de las JONS, movement and state relations, Catholicism as a national attribute, rural and urban bases, democracy, membership, sovereignty, corporative coordination, and economic ownership vary across periods and interpretations; the local block does not resolve those disputes.
- [ ] Falangism is isolated-reachable in all three layers, while full-competition ranks 2/1/1 by layer and 1 combined; aggregate top-three rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Nine canonical ontology targets remain catalog-only: Brazilian Integralism, Fascism, Integral Nationalism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V70 open questions — Neo-Fascism

- [ ] The boundary among Fascism, National Socialism, Neo-Nazism, Neo-Fascism, National Conservatism, Third Positionism, post-fascist parties, and new radical-right formations remains historically and internally contested.
- [ ] Continuity, imitation, adaptation, revival, democracy, corporatism, anti-communism, national sovereignty, movement/party organization, country, generation, and transnational form vary across the post-1945 field; the local block does not resolve those disputes.
- [ ] Neo-Fascism is isolated-reachable in all three layers, while full-competition ranks 3/1/1 by layer and 1 combined; aggregate rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Ten canonical ontology targets remain catalog-only, including Fascism and Neo-Nazism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.


## V69 open measurement boundaries — Religious Zionism

- [ ] Religious Zionism is isolated-reachable in all three layers, while the full-competition diagnostic reports ranks 74/84/17 by layer and 24 combined, aggregate top-three rates 22.3443% and 39.5604%, and worst ranks 86 and 79; these are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Eleven canonical ontology targets remain catalog-only; Fascism, Neo-Fascism, and other high-risk or under-specified branches remain held, and the comprehensive coverage goal remains open.
- [ ] Denominational, historical, constitutional, territorial, diaspora, and religion-state variation remain measurement gaps; later respondent cognitive and empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement and were explicitly not run here.

## V67 open questions — Right-Wing Populism

- [ ] The boundary among the thin Populist core, Right-Wing Populism, Left-Wing Populism, Nationalism, Conservatism, National Conservatism, Ethnocultural Nationalism, and generic anti-elite dissatisfaction remains host- and context-sensitive.
- [ ] Nativism, authoritarianism, cultural conservatism, economic grievance, institutional antagonism, national sovereignty, democratic majoritarianism, and anti-pluralist routes can combine differently across parties, movements, countries, periods, and transnational networks; the local block does not resolve those disputes.
- [ ] Right-Wing Populism is isolated-reachable in all three layers, while the full-competition diagnostic reports descriptive and normative missing fields and full ranks 8/21/3 by layer and 4 combined; these are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Thirteen canonical ontology targets remain catalog-only; Fascism, Neo-Fascism, and other high-risk or under-specified branches remain held, and the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.
## V68 open questions — Hindutva

- [ ] The boundary among Hindutva, Religious Nationalism, Nationalism, Ethnocultural Nationalism, Conservative Nationalism, Hindu cultural identity, Indian patriotism, and current political actors remains historically and internally contested.
- [ ] Hindu Rashtra, Hindu Rajya, national culture, equal civic standing, majority/minority membership, caste, pluralism, institutional authority, and secularized versus religiously thick routes vary across thinkers, movements, parties, states, periods, and diasporas; the local block does not resolve those disputes.
- [ ] Hindutva is isolated-reachable in all three layers, while the full-competition diagnostic reports descriptive and normative missing fields and full ranks 10/81/3 by layer and 6 combined; these are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Twelve canonical ontology targets remain catalog-only; Fascism, Neo-Fascism, and other high-risk or under-specified branches remain held, and the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V72 open questions — Brazilian Integralism

- [ ] The boundary among Brazilian Integralism, wider Fascism, Integral Nationalism, Religious Nationalism, Christian Democracy, Falangism, National-Syndicalism, and generic Brazilian nationalism remains historically and internally contested.
- [ ] AIB organization, religious-cultural language, corporative mediation, movement/state relations, democracy, rights, race and membership, regional setting, and Plínio Salgado's postwar reinterpretation vary across periods and sources; the local block does not resolve those disputes.
- [ ] Brazilian Integralism is isolated-reachable in all three layers, while full-competition ranks 3/2/1 by layer and 1 combined; aggregate top-three rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Eight canonical ontology targets remain catalog-only: Fascism, Integral Nationalism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.

## V73 open questions — Integral Nationalism cross-case historical category

- [ ] The boundary among Integral Nationalism, wider Fascism, National Conservatism, Cultural Nationalism, Brazilian Integralism, Nationalism, and ordinary patriotism remains historically and internally contested.
- [ ] French/Maurrasian, Egyptian, Ukrainian, Georgian, fascist-adjacent, liberationist, monarchist, religious, corporative, democratic, authoritarian, regional, minority, and period applications differ; the local block is a cross-case analytical category and does not resolve those disputes.
- [ ] Integral Nationalism is isolated-reachable in all three layers, while full-competition ranks 9/2/1 by layer and 1 combined; aggregate rates and worst ranks are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Seven canonical ontology targets remain catalog-only: Fascism, Legionary Fascism, Neo-Nazism, Revolutionary Islamism, Salafi-Jihadism, Third Positionism, and White Nationalism; the comprehensive coverage goal remains open.
- [ ] Cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement; explicitly not run here.
## V81 open questions — Revisionist / Bernsteinian Social Democracy historical microtype

- [ ] The boundary among Bernsteinian revision, the heterogeneous historical label revisionism, Social Democracy, Democratic Socialism, Marxism, Market Socialism, Guild Socialism, and later reformist party traditions remains historically and internally contested.
- [ ] Reform versus revolution, class analysis, ownership, cooperative and regulated coordination, party and trade-union practice, constitutional routes, internationalism, historical period, and later reinterpretation require continued comparative source review; the local microtype does not settle those disputes.
- [ ] Revisionist / Bernsteinian Social Democracy is isolated-reachable in all three layers and combined, while full-competition ranks 21/82/3 by layer and 3 combined; aggregate rates and worst ranks 97/90 are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Five contextual anchors and 11 registry-only targets remain outside production scoring; cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement.


## V83 open questions — British Fascism historical microtype

- [ ] The boundary among British Fascism, wider Fascism, National Socialism, Neo-Fascism, National-Syndicalism, Falangism, White Nationalism, Integral Nationalism, National Conservatism, and British imperial or patriotic conservatism remains historically and internally contested.
- [ ] Organization, region, empire, race, Irish/Northern Irish context, constitutional orientation, social organization, period, and movement/regime translation require further comparative source review; the local microtype does not settle those disputes.
- [ ] British Fascism is isolated-reachable in all three layers and combined, while full-competition ranks are 13/2/3 by layer and 2 combined; aggregate rates and worst ranks 99/92 are deterministic geometry diagnostics only, not respondent evidence or grounds for uncalibrated retuning.
- [ ] Five contextual anchors and 9 registry-only targets remain outside production scoring; cognitive/respondent evidence, empirical reliability/validity, invariance, and population evidence remain required before any wording, effects, anchor vector, or label can be treated as validated measurement.
## V84 open boundaries — French Fascism

The promotion leaves open the empirical boundary among French Fascism, wider Fascism, National-Syndicalism, Integral Nationalism, National Conservatism, authoritarian conservatism, neo-socialist conversion, Vichy-era formations, and regional or agrarian cases. Organization, social base, period, jurisdiction, constitutional route, collaboration relationship, Catholic or rural context, and imperial orientation must not be collapsed into one universal French label.

The new production anchor and prompts are editorial research artifacts. Their isolated reachability proves only wiring and deterministic structural routing; the combined rank 5 and descriptive full-competition rank 18 do not establish respondent comprehension, reliability, validity, invariance, or population generalization. The next evidence gates remain substantive item review, later respondent research, and empirical validation, subject to the standing no-cognitive-review constraint for this workstream.

## V87 open boundaries — Flemish / Belgian Fascism

- How should the historically contested Flemish / Belgian fascist field be separated from the wider Fascism family, French Fascism, Integral Nationalism, National-Syndicalism, Flemish nationalism, Belgian nationalism, and regional autonomy without collapsing organizational and period variation?
- Which differences among VNV, Verdinaso, Rex, Catholic/secular registers, technocratic/corporative projects, Flemish/Francophone settings, occupation, and collaboration should remain explicit rather than being treated as one uniform case?
- How should project-versus-realization, identity-versus-ideology, and collaboration-versus-fascist commitment be represented without turning language, autonomy, Catholicism, corporatism, authoritarianism, or anti-parliamentary dissatisfaction into sufficient evidence?
- The deterministic audit reaches Flemish / Belgian Fascism in all three isolated layers and in the combined view; full-production ranks 7/8/4 and 2 combined, aggregate rates 29.0520%/54.1284%, and worst ranks 103/96 remain geometry diagnostics only.
- Five contextual placements and five registry-only targets remain outside production scoring. Respondent comprehension, psychometric reliability/validity, invariance, empirical classification, and population generalization remain untested by explicit constraint.

## V86 open boundaries — Japanese Fascism

The promotion leaves open the boundary among Japanese Fascism, wider Fascism, Italian Fascism, National Socialism, National-Syndicalism, Integral Nationalism, National Conservatism, generic militarism, authoritarianism, imperialism, Japanese identity, and security preference. The 1940 New Order Movement, party-government breakdown, military-bureaucratic continuity, wartime mobilization, and Manchurian imperial setting must remain historically and institutionally specific rather than collapsed into one national stereotype.

The new production anchor and prompts are editorial research artifacts. Isolated reachability proves only wiring and deterministic structural routing; full ranks, top-three rates, and aggregate overlap do not establish respondent comprehension, reliability, validity, invariance, or population generalization. Five contextual anchors and six registry-only targets remain outside production scoring. No cognitive review, respondent study, substitute simulation, psychometric validation, or empirical classification was run or implied.

## V85 open boundaries — Italian Fascism

The promotion leaves open the empirical and historical boundary among Italian Fascism, wider Fascism, National-Syndicalism, Falangism, Legionary Fascism, National Conservatism, generic authoritarianism, nationalism, corporatism, Italian identity, and one-leader or order preferences. Movement, party, coalition, dictatorship, local, industrial, agrarian, Catholic, secular, wartime, racial, imperial, and project-versus-realization distinctions must not be collapsed into one universal Italian label.

The new production anchor and prompts are editorial research artifacts. Isolated reachability proves only wiring and deterministic structural routing; Italian Fascism's full ranks 6/1/4 by layer and 1 combined, aggregate top-three rates 28.0374%/52.3364%, and worst ranks 101/94 do not establish respondent comprehension, reliability, validity, invariance, or population generalization. The production top-three missing fields are overlap diagnostics, not isolated routing failures. No cognitive review, respondent study, substitute simulation, psychometric validation, or empirical classification was run or implied.

- [ ] Five contextual anchors and seven registry-only targets remain outside production scoring; the comprehensive coverage goal remains open.
- [ ] Future evidence must distinguish project from realization, repression from consensus, and corporative integration from generic corporatism, order preference, national identity, or one-leader support.

## V88 open boundaries — Agrarian Populism

- How should Agrarian Populism be separated from thin-core Populism, Left-Wing Populism, Right-Wing Populism, Market Socialism, agrarian-class parties, rural conservatism, and food-sovereignty movements across country and period?
- Which combinations of rural or land-based people–elite construction, land/food/agricultural power, rural–urban antagonism, and class composition are necessary without treating rural residence, farmer status, localism, policy, tariffs, or generic anti-elite sentiment as sufficient evidence?
- How should smallholder, farm-worker, peasant, cooperative, cross-class, progressive, reactionary, socialist, nationalist, market, and democratic variants remain visible without turning one historical case into a universal current label?
- The deterministic audit reaches Agrarian Populism in all three isolated layers; its combined top-three diagnostic omits normative and prescriptive layers, and full-competition output remains geometry diagnostics only.
- Four registry-only targets and five contextual placements remain outside production scoring. Respondent comprehension, psychometric reliability/validity, invariance, empirical classification, population generalization, and current-actor inference remain untested by explicit constraint.

## V89 open boundaries — Bioregionalism ecological microtype

- How should Bioregionalism be separated from Ecologism, Green Politics, Deep Ecology, Social Ecology, Green Anarchism, generic environmentalism, localism, watershed planning, and decentralization when the literature treats it as a plural and processual field rather than one fixed doctrine?
- Which combinations of ecological place or scale, biophysical and inhabiting relations, networked interdependence, more-than-human responsibility, and accountable governance are necessary without treating local identity, environmental concern, land-use preference, or one planning tool as sufficient evidence?
- How should environmental-determinism critiques, urban–other power relations, jurisdictional variation, and local/regional/interregional scale be represented without converting bioregional boundaries into naturalized or exclusionary membership rules?
- The deterministic audit reaches Bioregionalism in all three isolated layers. Its full-competition combined top-three diagnostic omits all three layers and remains geometry evidence only; it is not a respondent, cognitive, psychometric, or empirical result.
- Three registry-only targets and five contextual placements remain outside production scoring. Respondent comprehension, reliability/validity, invariance, empirical classification, population generalization, and current-actor inference remain untested by explicit constraint.

## V98 — Gandhian Political Thought open questions

- Which direct constructs can validly distinguish swaraj, satyagraha, means-ends integrity, constructive programme, trusteeship, and decentralized self-government from the existing liberty, solidarity, equality, universalism, decentralization, public-provision, and public-ownership proxies without creating a false-positive score?
- How should variation across Gandhi's periods, state and anti-statist interpretations, property, industrialization, caste, gender, religion, and later reception be represented without collapsing a contested tradition into one authorial or national identity label?
- Can a future facet or measurement design represent ethical discipline and political means as a distinct construct while preserving the separation between descriptive, normative, and prescriptive layers and avoiding double counting?
- V98 adds six contextual placements in total and leaves Gandhian Political Thought outside production scoring. No cognitive, respondent, psychometric, substitute-simulation, empirical, reliability/validity, invariance, or population evidence answers these questions.

## V104 — Market Socialism open boundaries

- How should Market Socialism be separated from Socialism, Democratic Socialism, Mutualism, Libertarian Socialism, Property-Owning Democracy, State Socialism, and mixed-economy arrangements when the literature treats it as a family of models rather than one fixed constitution?
- Which combination of social or collective control of capital and market coordination is necessary without treating market support, public ownership, cooperative preference, workplace democracy, opposition to capitalism, or equality preference as sufficient evidence?
- How should variation over worker self-management, public or cooperative ownership, democratic investment, credit institutions, commons, property distribution, constitutional limits, and state authority remain visible without double-counting existing socialism or decentralization facets?
- Market Socialism remains a contextual-only, not-scored target with no production anchor or direct questions; the two qualitative conceptions are source-backed editorial context, not respondent measurements or score effects.
- No cognitive review, respondent study, psychometric validation, reliability/validity estimate, invariance study, substitute simulation, empirical classification, population generalization, or current-actor inference answers these boundaries.

## V105 — Civic Republicanism open boundaries

- How should Civic Republicanism be separated from Historical Republicanism, Contemporary Neo-Republicanism, Radical Republicanism, Liberalism, Communitarianism, and generic democracy when the label is used for both a historical civic-virtue interpretation and a contemporary non-domination programme?
- Is civic virtue and active participation treated as intrinsically valuable, instrumentally necessary for sustaining freedom, or historically variable across republican accounts, and can the sorter preserve those readings without collapsing them into one prescriptive route?
- How should rule-bound public power, popular control, equal civic standing, private as well as public domination, civic education, vigilance, and contestation be represented without treating patriotism, participation, anti-corruption, constitutional checks, or non-domination alone as sufficient evidence?
- Civic Republicanism remains registry-only and not-scored with two qualitative conceptions and twelve quarantined candidates; the conceptions are editorial context rather than respondent measurements, anchor weights, or score effects.
- No cognitive review, respondent study, psychometric validation, reliability/validity estimate, invariance study, substitute simulation, empirical classification, population generalization, or current-actor inference answers these boundaries.
