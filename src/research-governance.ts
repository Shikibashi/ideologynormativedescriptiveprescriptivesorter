import { DATASET } from "./data";
import {
  buildResearchTargets,
  curatedResearchCandidates,
  researchFalsePositiveAudits,
  researchNeighborDiscriminants,
} from "./research";
import type {
  Dataset,
  IdeologyNodePlacement,
  ResearchFalsePositiveAudit,
  ResearchNeighborDiscriminant,
  ResearchTaxonomyDecision,
  ResearchTaxonomyDisposition,
  ResearchTaxonomyEvidenceStatus,
  ResearchTarget,
} from "./types";

export const researchTaxonomyDispositionLabels: Readonly<Record<ResearchTaxonomyDisposition, string>> = {
  "promote-to-canonical": "promote to canonical ontology",
  "retain-canonical": "retain in canonical ontology",
  "demote-to-contextual": "demote to contextual registry",
  "demote-to-associated": "demote to associated registry",
  "retain-contextual": "retain as contextual registry context",
  "retain-registry-only": "retain as registry-only context",
  "hold-catalog-only": "hold as catalog-only pending evidence",
};

const decision = (
  id: string,
  targetId: string,
  disposition: ResearchTaxonomyDisposition,
  evidenceStatus: ResearchTaxonomyEvidenceStatus,
  sourceIds: readonly string[],
  rationale: string,
  boundary: string,
  competingInterpretations: readonly string[],
  resultingPlacement: IdeologyNodePlacement | "registry-only",
  resultingScoringStatus: ResearchTaxonomyDecision["resultingScoringStatus"],
  decidedAt = "2026-08-26",
): ResearchTaxonomyDecision => ({
  id,
  targetId,
  disposition,
  evidenceStatus,
  sourceIds,
  rationale,
  boundary,
  competingInterpretations,
  resultingPlacement,
  resultingScoringStatus,
  decidedAt,
  reviewStatus: "research_decision",
});

/**
 * Explicit decisions that change or clarify ontology placement. These are
 * research decisions, not respondent classifications and not scoring rules.
 */
const EXPLICIT_TAXONOMY_DECISIONS: readonly ResearchTaxonomyDecision[] = [
  decision(
    "taxonomy-khomeinism-promote",
    "khomeinism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-ucp-khomeinism", "source-cambridge-arjomand-khomeini-order", "source-cambridge-namazi-khomeini-sovereign-state", "source-tandf-khomeini-democratic-constitutionalism", "source-oup-ghobadzadeh-governmental-shiism", "source-cambridge-islamism"],
    "The source set supports Khomeinism as a historically specific and internally contested Iranian Shi'i Islamist formation joining jurist guardianship, modern sovereignty and Islamic state formation, anti-imperial independence, appeal to the oppressed, and revolutionary mobilization. The sources also preserve changes across Khomeini's political phases and disagreement over constitutional, participatory, clerical, and state translations.",
    "This promotion establishes a canonical micro target and a provisional dedicated-scored measurement target only. It does not create empirical validation, classify respondents, or make Khomeinism representative of Islamism or Shi'i political thought as a whole.",
    ["Khomeinism may be treated as a historically specific manifestation or variant within Islamism rather than a separate canonical node.", "Its internal theological, constitutional, institutional, and post-revolutionary variation remains contested; present Iranian policy or one reading of Khomeini does not define the target."],
    "canonical",
    "scored-provisional",
    "2026-08-30",
  ),
  decision(
    "taxonomy-revisionist-bernsteinian-social-democracy-promote",
    "revisionist-bernsteinian-social-democracy",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-oup-ostrowski-bernstein-reform-revolution", "source-cambridge-fletcher-bernstein-foreign-policy", "source-oup-constitutionalism-bernstein-revisionism", "source-cambridge-steger-evolutionary-socialism", "source-oup-bernstein-revisionism"],
    "Oxford and Cambridge scholarship supports treating Bernsteinian revision as a historically situated socialist and social-democratic current with a distinct relationship among empirical revision of inherited strategy, democratic ends, gradual reform, social provision, and regulated economic coordination.",
    "The promotion establishes a canonical micro node and a provisional dedicated-scored measurement target only. It does not make the heterogeneous period label revisionism uniform, equate Bernsteinian revision with all contemporary Social Democracy, or validate the local anchor or respondent classification.",
    ["Bernsteinian revision may be retained as a historical variant within Social Democracy rather than as a separate micro node.", "The period label revisionism covered divergent right-wing SPD, trade-union, cooperative, ethical-socialist, and nationalist positions, so the node must remain narrow and historically bounded."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-national-syndicalism-promote",
    "national-syndicalism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-ganapini-national-syndicalism", "source-pucminas-national-syndicalism", "source-cambridge-abse-syndicalism-fascism", "source-kci-shin-cercle-proudhon", "source-persee-national-syndicalism"],
    "Comparative and national-case scholarship supports treating National-Syndicalism as a historically bounded and internally varied nationalist-occupational current with a distinct relationship among labor organization, national solidarity, corporative mediation, and transformed public authority.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not make National-Syndicalism synonymous with Fascism, Falangism, or Anarcho-Syndicalism; it does not classify current actors or respondents and provides no operational content.",
    ["National-Syndicalism may be retained as associated historical context because the label spans pre-fascist, fascist, and national-movement uses.", "Occupational organization and national solidarity also appear in neighboring traditions, so the target requires convergent national-occupational and corporative evidence rather than a single labor or economic preference."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-british-fascism-promote",
    "british-fascism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-jackson-british-fascism", "source-oup-liburd-british-fascisti-empire", "source-cambridge-douglas-british-irish-fascism", "source-cambridge-loughlin-british-fascism-northern-ireland", "source-cambridge-british-fascism"],
    "Historical scholarship supports treating British Fascism as a bounded national field of competing movements and organizations with a distinct relationship among British political-cultural roots, imperial and regional settings, national regeneration, anti-parliamentary diagnosis, and disciplined social integration.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not make British Fascism a uniform doctrine, equate it with Fascism as a whole, National-Syndicalism, National Socialism, or White Nationalism, classify contemporary actors or respondents, or add operational content.",
    ["British Fascism may be retained as a historical manifestation of Fascism rather than a separate canonical micro node.", "The field varies across organizations, regions, periods, and relationships to empire, race, constitutional politics, and social organization; anti-Irish or other racialized claims are not universal criteria."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-french-fascism-promote",
    "french-fascism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-passmore-french-fascism", "source-oup-passmore-right-france-vichy", "source-oup-millington-french-veterans-fascism", "source-oup-paxton-french-peasant-fascism", "source-cambridge-desan-french-fascism-conversion"],
    "Historical scholarship supports treating French Fascism as a bounded and contested national field of movements and organizations with a distinct relationship among French political-cultural roots, crisis of parliamentary conservatism, leagues, veterans, agrarian mobilization, national regeneration, anti-parliamentary transformation, and varied occupation or state routes.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not make French Fascism a uniform doctrine, equate it with Fascism as a whole, National Socialism, National-Syndicalism, Integral Nationalism, or conservatism, classify contemporary actors or respondents, or add operational content.",
    ["French Fascism may be retained as a historical manifestation of Fascism rather than a separate canonical micro node.", "The classification is contested; organization, region, social base, period, democratic or authoritarian route, and the relationship to Vichy, collaboration, Catholicism, agrarianism, and empire vary; neo-socialism is not automatically fascism and conversion must not be inferred from shared rhetoric."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-italian-fascism-promote",
    "italian-fascism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-cerasi-italian-corporative-populism", "source-oup-morgan-italian-corporatism", "source-oup-corner-fascist-party-popular-opinion", "source-cambridge-whittam-fascist-italy-transition", "source-cambridge-italian-fascism"],
    "Historical scholarship supports treating Italian Fascism as a bounded and internally varied Italian movement-and-regime formation with a distinct relationship among national rebirth, mass political mobilization, leader-centered authority, corporative integration, anti-parliamentary transformation, and the uneven realization of a fascist project across periods and local settings.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not make Italian Fascism synonymous with Fascism as a whole, National-Syndicalism, Falangism, Legionary Fascism, National Conservatism, Italian identity, or generic corporatism; it does not classify contemporary actors or respondents and adds no operational content.",
    ["Italian Fascism may be retained as the foundational Italian historical manifestation of Fascism rather than as a universal or contemporary label.", "The case varies across movement, coalition, dictatorship, local experience, war, race, empire, and the relationship between ideological project and regime realization; those differences remain explicit.", "National unity, order, corporative language, Italian identity, or one leader alone do not establish the historical movement-and-regime bundle."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-japanese-fascism-promote",
    "japanese-fascism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-fletcher-japanese-fascism", "source-oup-hofmann-fascist-effect-japan-italy", "source-cambridge-young-japanese-fascism-empire", "source-oup-mimura-japanese-military-fascism", "source-oup-tsuzuki-japanese-fascism"],
    "Historical scholarship supports treating Japanese Fascism as a narrow and contested field of interwar and early-Shōwa intellectual, military, bureaucratic, associational, New Order, wartime, and imperial formations, with institutional pathways that cannot be reduced to a single party seizure or a uniform national regime.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not classify Japan or Japanese identity, equate the field with generic militarism, imperialism, authoritarianism, National Socialism, or Italian Fascism, resolve the scholarly classification dispute, classify contemporary actors or respondents, or add operational content.",
    ["Japanese Fascism may be retained as a contested historical manifestation of Fascism with period and institution-specific boundaries.", "Scholarship disagrees about whether the label applies to Japan as a whole and distinguishes movements or transformations such as the 1940 New Order Movement from undifferentiated 1930s or wartime national classifications.", "National tradition, cultural identity, security concern, militarism, imperial nostalgia, or one institution alone do not establish the historical fascist field."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-flemish-belgian-fascism-promote",
    "flemish-belgian-fascism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-oup-de-wever-belgium-fascism", "source-tandf-de-wever-catholicism-belgium-fascism", "source-jstor-conway-rexism", "source-cambridge-van-de-maele-belgian-technocratic-fascism", "source-cambridge-dalle-mulle-flemish-nationality", "source-sage-kunkeler-flemish-fascism"],
    "Historical scholarship supports treating Flemish / Belgian Fascism as a bounded and contested regional and national field spanning VNV, Verdinaso, Rex, and related Catholic, corporative, technocratic, New Order, occupation, and collaboration pathways, while preserving differences among Flemish, Francophone, Belgian, regional, organizational, and period cases.",
    "The promotion establishes a canonical historical micro target and a provisional dedicated-scored measurement target only. It does not classify Flemish or Belgian identity, language politics, regional autonomy, Catholicism, corporatism, authoritarianism, anti-parliamentary dissatisfaction, collaboration, present actors, or respondents, and it does not resolve the scholarly debate over the fascist label.",
    ["Flemish / Belgian Fascism may be retained as a historically bounded manifestation of Fascism rather than a uniform national doctrine.", "VNV, Verdinaso, Rex, and related formations differ by language region, organization, period, Catholic or secular idiom, relationship to the Belgian state, and occupation context.", "Regional identity, national continuity, corporative language, Catholic social thought, or collaboration alone do not establish the historical fascist field."],
    "canonical",
    "scored-provisional",
    "2026-08-28",
  ),
  decision(
    "taxonomy-agrarian-populism-promote",
    "agrarian-populism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-wiley-arter-agrarian-populism", "source-wiley-hajdu-agrarian-populism", "source-wiley-borras-agrarian-populism", "source-wiley-pattenden-agrarian-populism", "source-wiley-mamonova-rural-populism", "source-wiley-agrarian-populism", "source-oup-populism", "source-cambridge-populism"],
    "Comparative agrarian and populism scholarship supports treating Agrarian Populism as a historically varied micro-branch when a rural or land-based people–elite articulation is joined to land, food, agricultural production, or rural political-power concerns; the evidence distinguishes agrarian-populist from agrarian-class formations and preserves progressive, reactionary, cooperative, market, socialist, nationalist, and cross-class routes.",
    "This promotion establishes a canonical micro target and a provisional dedicated-scored measurement target only. It remains historical and host-dependent; it does not classify rural residents, farmers, current actors, movements, parties, or respondents and does not make rural identity, farming status, food policy, tariffs, anti-elite sentiment, or one left or right host sufficient evidence.",
    ["Agrarian Populism may be retained as a historical variant or registry entry because the label is heterogeneous and porous with Left-Wing Populism, Right-Wing Populism, rural movements, and food-sovereignty politics.", "Class composition, rural–urban relations, country, period, democratic route, and market, cooperative, ownership, or state route vary; require convergent evidence for both the agrarian power mechanism and the people–elite articulation."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-qutbism-promote",
    "qutbism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cambridge-qutb-march", "source-cambridge-qutb-vahdat", "source-oup-toth-qutb", "source-tandf-khatab-qutb-hakimiyya", "source-tandf-faradj-qutb-authority", "source-oup-wagemakers-qutb-legacy", "source-cambridge-islamism"],
    "The source set supports Qutbism as a historically situated and internally contested Egyptian Islamist intellectual and political current associated with divine sovereignty (hakimiyya), jahiliyya and moral alienation, comprehensive Islamic moral order, disciplined transformative community, and varied revolutionary or reformist reconstitution. The sources distinguish Qutb's concepts from later selective receptions and from any single militant or organizational interpretation.",
    "This promotion establishes a canonical micro target and a provisional dedicated-scored measurement target only. It does not create empirical validation, classify respondents, or equate Qutbism with every Islamist, revolutionary, or militant current.",
    ["Qutbism may be treated as a historically situated school or variant within Islamism rather than a separate canonical node.", "Qutb's periods, authority and pluralism readings, and later receptions remain contested; Muslim identity, current policy, organization, or operational militancy does not define the target."],
    "canonical",
    "scored-provisional",
    "2026-08-30",
  ),
  decision(
    "taxonomy-deep-ecology-promote",
    "deep-ecology",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-naess-deep-ecology", "source-oup-dobson-environmental-politics", "source-oup-attfield-environmental-movements", "source-sep-environmental-ethics", "source-cambridge-ecologism", "source-trumpeter-drengson-devall-deep-ecology", "source-mit-katz-light-rothenberg-deep-ecology", "source-wiley-grey-deep-ecology-critique", "source-cambridge-dizerega-deep-ecology-liberalism", "source-uksw-bombik-deep-ecology-methodology", "source-sage-luke-deep-ecology"],
    "The source set supports Deep Ecology as a distinct but plural ecocentric ecological philosophy and movement-derived current organized around intrinsic value, ecological limits, expanded ecological selfhood, and layered translations from worldview through platform principles to political or institutional action.",
    "Promote it to a canonical micro node under Ecologism with a provisional dedicated-scored measurement branch. Preserve the distinction among personal ecosophy, platform, movement, policy, and political translation; this does not validate the local anchor, infer a respondent identity, or make one institutional route constitutive.",
    ["Deep Ecology may remain a philosophical framework or be treated as a current within Ecologism rather than a separate canonical node.", "Critical scholarship disputes its paradigm, science, technology, humanism, and political translations, so the canonical node must retain contestation and plural route language.", "Environmental concern, conservation, wilderness preference, localism, decentralization, anti-technology sentiment, or one policy do not establish the Deep Ecology boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-30",
  ),
  decision(
    "taxonomy-bioregionalism-canonical",
    "bioregionalism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-wiley-mctaggart-bioregionalism", "source-wiley-hubbard-bioregionalism", "source-wiley-wearne-bioregionalism", "source-tandf-waldenberger-bioregionalism", "source-sep-environmental-ethics", "source-cambridge-ecologism"],
    "Peer-reviewed geography, sustainability, and planning research treats Bioregionalism as an action-oriented ecological movement or ecophilosophy with distinct place, scale, and governance vocabulary; recent work also documents internal plurality and environmental-determinism and localism critiques.",
    "Promote it to a provisional canonical micro node under Ecologism with a dedicated scored branch, while preserving variant, jurisdiction, and human/more-than-human boundaries; do not infer it from local identity, environmentalism, or decentralization alone.",
    ["Bioregionalism may be treated as a forum, ecophilosophy, or planning approach rather than a uniform ideology.", "Bioregional boundaries and political translation vary by place, scale, and institutional context."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-civic-republicanism-retain-registry",
    "civic-republicanism",
    "retain-registry-only",
    "source-backed-contested",
    ["source-oup-civic-republicanism", "source-sep-republicanism", "source-oup-republicanism", "source-cambridge-civic-republicanism", "source-oup-gallagher-civic-virtue", "source-springer-toth-civic-republicanism", "source-oup-well-ordered-republic"],
    "The source set uses Civic Republicanism as an interpretation or bridge label across historical civic-virtue and participation arguments and contemporary non-domination theory. Lovett's framework makes non-domination, rule-bound public power, and popular control explicit, while scholarship continues to vary over virtue, scale, community, state, and institutional routes.",
    "Retain Civic Republicanism as associated registry context because the current canonical graph already separates Historical Republicanism, Contemporary Neo-Republicanism, and Radical Republicanism; do not create duplicate ancestry, a scored anchor, production questions, or a respondent-facing identity label. The current source refresh strengthens the boundary record without activating the quarantined candidate block.",
    ["Civic Republicanism may be used as a distinct contemporary political doctrine in some scholarship.", "The label may instead denote an instrumental reading of civic virtue within the historical republican tradition or a broad family resemblance across republican theories.", "Civic virtue, participation, patriotism, anti-corruption, or non-domination alone do not resolve the historical/contemporary boundary."],
    "registry-only",
    "not-scored",
    "2026-08-30",
  ),
  decision(
    "taxonomy-conservative-new-right-retain-registry",
    "conservative-new-right",
    "retain-registry-only",
    "source-backed-contested",
    ["source-oup-conservatism", "source-ia-national-conservatism", "source-oup-paleoconservatism", "source-oup-freeden-conservative-revival", "source-tandf-williams-new-right", "source-oup-jackson-new-right-neoliberalism", "source-aup-bures-european-new-right", "source-sage-drolet-williams-european-new-right", "source-sage-gianoncelli-new-right", "source-springer-schilk-new-right-metapolitics"],
    "The source set confirms that New Right is a historically and geographically plural label: Anglo-American conservative or neoliberal formations and the European New Right's radical-conservative intellectual network share some family resemblance but do not form one uniform doctrine or one stable political constituency. Schilk's discourse analysis further distinguishes metapolitical narrative work from political actors and documents divergent Continental European and Anglo-American applications.",
    "Retain Conservative New Right as contextual registry-only context, keep its aliases as lookup labels rather than equivalence claims, and do not create duplicate canonical ancestry, a scored anchor, production questions, or a current-party or respondent identity label. The current source refresh strengthens the heterogeneity guard without activating the quarantined candidate block.",
    ["The label may be split into separate historical or geographic contextual entries if a future source review establishes a useful non-duplicative boundary.", "The European New Right may be treated as a distinct intellectual movement rather than as a synonym for the Anglo-American conservative New Right.", "Cultural continuity, market preference, national or civilizational language, metapolitical activity, or anti-elite rhetoric alone do not establish one New Right construct."],
    "registry-only",
    "not-scored",
    "2026-08-30",
  ),
  decision(
    "taxonomy-georgism-promote",
    "georgism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-helsinki-obeng-odoom-georgist-political-economy", "source-jhu-england-land-liberty", "source-oup-odonnell-george-inequality", "source-oup-mclean-land-value-taxation", "source-sage-williams-georgist-political-ecology", "source-wiley-mccann-georgist-social-philosophy", "source-wiley-hudson-george-critics", "source-oll-george-progress-poverty"],
    "The source set supports Georgism as a distinct, historically rooted political-economic school and movement centered on land, land value, rent, unequal access to natural opportunity, and the separation of socially created location value from privately created labor and improvements. Its liberal, egalitarian, republican, democratic, and market-compatible dimensions are sufficiently coherent for a bounded parentless meso node.",
    "This promotion establishes a canonical meso target and a provisional dedicated measurement branch only. It does not make Georgism synonymous with Liberalism, Left-Libertarianism, Socialism, Agrarian Populism, land-value-tax support, environmentalism, rural identity, one single-tax design, or a current policy position; the current shared schema lacks a dedicated land/rent facet and later validation remains required.",
    ["Georgism may be treated as a liberal, left-libertarian, republican, socialist-adjacent, or policy tradition rather than a separate meso node.", "Historical Georgist movements and later geoliberal, land-value-tax, civic-dividend, resource-rent, urban, ecological, and international interpretations vary.", "Land taxation, property rights, public infrastructure, agrarian identity, or generic egalitarianism alone do not establish the Georgist land-rent mechanism."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-degrowth-promote",
    "degrowth",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-cup-kallis-degrowth", "source-tandf-akbulut-degrowth", "source-elsevier-alisa-kallis-degrowth-state", "source-elsevier-asara-degrowth-democracy", "source-cambridge-durrant-cohen-degrowth", "source-sage-savini-degrowth-ideology", "source-elsevier-degrowth-movement-2025", "source-manchester-buch-hansen-degrowth-transformations"],
    "The source set supports Degrowth as a plural ecological-economic field, social-movement frame, and political project centered on growth imperatives, material and energy throughput, sufficiency, wellbeing, differentiated justice, and democratic or institutionally varied transformation.",
    "This promotion establishes a parentless canonical meso target and a provisional dedicated measurement branch only. It does not make Degrowth synonymous with Ecologism, Ecosocialism, Social Ecology, Bioregionalism, Georgism, Social Democracy, recession, austerity, environmentalism, anti-capitalism, localism, anti-technology, a wellbeing-economy label, one policy, one movement, or a current political identity; later validation remains required.",
    ["Degrowth may be treated as an ecological-economic framework, movement, post-growth discourse, or variant within broader ecological or socialist traditions rather than a separate canonical node.", "The field varies across anarchist, systemic, pragmatic, limitarian, commons, cooperative, public, state, civil-society, business, local, national, and transnational routes; the label is not one uniform institutional programme.", "Environmental concern, personal frugality, reduced consumption, recession, austerity, anti-capitalism, public provision, localism, or one climate or work-time policy alone do not establish the growth-critical mechanism."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-distributism-promote",
    "distributism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-jstor-salter-distributism", "source-cambridge-boyd-distributism", "source-cambridge-mathews-distributism", "source-oup-pierson-distributism", "source-sage-quilley-distributism", "source-cauriensia-utrera-distributism", "source-cambridge-kelly-distributism-work", "source-cambridge-chesterton-distributism-primary"],
    "The source set supports Distributism as a historically rooted and internally varied political-economic tradition centered on widely dispersed productive property, material independence through work or ownership, common-good obligations, intermediate associations, and subsidiarity. Its Catholic social roots, agrarian and urban forms, worker or guild routes, market participation, public regulation, and later ecological interpretations are sufficiently coherent for a bounded parentless meso node while remaining contested in scope and translation.",
    "This promotion establishes a parentless canonical meso target and a provisional dedicated measurement branch only. It does not make Distributism synonymous with Christian Democracy, Conservatism, Socialism, Guild Socialism, Georgism, Agrarian Populism, Catholic identity, family traditionalism, small business support, localism, cooperative support, generic private-property defense, anti-capitalism, anti-monopoly policy, one ownership design, or a current political identity; later validation remains required.",
    ["Distributism may be treated as a Catholic social, Christian democratic, conservative, agrarian, cooperative, guild, or socialist-adjacent tradition rather than a separate meso node.", "The tradition varies across early twentieth-century movement history, later scholarly reconstructions, agrarian and urban applications, private small-property and worker-control routes, market and regulatory designs, and ecological or localist interpretations.", "Religious identity, family values, small firms, rural life, anti-monopoly rules, cooperative support, worker ownership, or generic anti-concentration sentiment alone do not establish the full Distributist boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-christian-socialism-promote",
    "christian-socialism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-bloomsbury-williams-christian-socialism", "source-liverpool-williams-christian-socialism-thesis", "source-oup-drake-gospel-church", "source-oup-stauffer-listening-spirit", "source-cambridge-jashari-christians-socialism", "source-oup-lockley-christian-socialism", "source-taylor-johnson-labour-church", "source-sage-hogan-christian-socialism"],
    "The source set supports Christian Socialism as a plural and historically varied political tradition joining Christian moral or theological commitments to socialist critique of economic domination, solidarity, and collective transformation. Its Anglican, Catholic, Protestant, Social Gospel, liberationist, labor, cooperative, democratic, reformist, revolutionary, public, and autonomous routes are sufficiently coherent for a bounded parentless meso node while remaining contested in scope, theological grounding, and institutional translation.",
    "This promotion establishes a parentless canonical meso target and a provisional dedicated measurement branch only. It does not make Christian Socialism synonymous with Christian Democracy, Distributism, Socialism, Democratic Socialism, Social Democracy, Christian Nationalism, private Christian identity, piety, charitable relief, generic social concern, liberation theology as a broader field, one denomination, one movement, one author, one policy, or a current political identity; later validation remains required.",
    ["Christian Socialism may be treated as a religious-socialist discourse, Social Gospel current, Christian left, theological socialism, liberationist formation, or socialist-adjacent tradition rather than a separate meso node.", "The tradition varies across Anglican, Catholic, Protestant, ecumenical, labor, historical, global, liberationist, democratic, reformist, revolutionary, church-linked, lay, and autonomous contexts; no one route or doctrine is universal.", "Christian identity, charitable service, social justice language, welfare support, worker support, democratic socialism, Christian public action, or one historical movement alone do not establish the full Christian-socialist boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-ujamaa-promote",
    "ujamaa",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-oup-jennings-ujamaa", "source-cambridge-lal-self-reliance-ujamaa", "source-cambridge-lal-african-socialism-ujamaa", "source-cambridge-hunter-african-socialism", "source-cambridge-aminzade-african-socialism", "source-ahr-maddox-lal-african-socialism", "source-oup-nyerere-ujamaa-1962", "source-nyerere-arusha-declaration-1967"],
    "The source set supports Ujamaa as a historically bounded and internally varied Nyererean form of African Socialism with a distinct relationship among familyhood, egalitarian social relations, anti-exploitation, postcolonial self-reliance, participatory nation-building, and communal or public development.",
    "This promotion establishes a parentless canonical meso target and a provisional dedicated measurement branch only. It does not make Ujamaa synonymous with the heterogeneous African Socialism umbrella, Socialism, Pan-Africanism, Anti-Colonial Nationalism, Agrarian Populism, Christian Socialism, ruralism, nationalism, public ownership, self-reliance, Tanzania or Nyerere identity, the Arusha Declaration, one villagization policy, one state implementation, or a current political identity; later validation remains required.",
    ["Ujamaa may be treated as a historically specific micro tradition under Socialism or as a variant within African Socialism rather than a separate parentless meso node.", "The tradition varies across political articulation, official development discourse, rural and local experience, state direction, national and wider African scope, and interpretations of participation and coercion.", "African identity, communal language, anti-colonial sovereignty, public services, rural preference, equality, self-reliance, or one historical policy alone do not establish the full Ujamaa boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-29",
  ),
  decision(
    "taxonomy-labor-zionism-promote",
    "labor-zionism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-ucp-shafir-land-labor", "source-cambridge-beinin-socialism-zionism", "source-oup-halpern-reinharz-zionism-left", "source-cambridge-yona-labour-zionism", "source-cambridge-kelemen-labour-zionism", "source-suny-gorny-zionist-labor", "source-jstor-origins-israel-labor", "source-oup-zionism-bibliography"],
    "The source set supports Labor Zionism as a historically situated and internally varied Zionist-socialist current joining Jewish collective self-determination and nation-building with worker organization, labor-centered social transformation, cooperative or collective settlement, and institution-building across diaspora and territorial settings.",
    "This promotion establishes a canonical micro target and a provisional dedicated-scored measurement branch only. It does not make Labor Zionism synonymous with Zionism generally, Socialism, Social Democracy, Religious Zionism, the Bund, Anti-Colonial Nationalism, Cultural Nationalism, Jewish identity, union membership, cooperative preference, Israeli citizenship, one party or settlement, a current conflict position, or one territorial or ownership programme; later wording, cross-context, and empirical validation remain required.",
    ["Labor Zionism may be treated as a historically specific variant within Zionism or as a socialist-national current rather than a separate canonical micro node.", "The current varied across Poale Zion and related organizations, periods, diaspora and Palestine/Eretz Israel relations, class and peoplehood interpretations, democratic and pluralist commitments, and state-building or cooperative routes.", "Worker solidarity, national self-determination, Hebrew cultural revival, land or settlement policy, social provision, or one historical movement alone do not establish the full Labor Zionist boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-30",
  ),
  decision(
    "taxonomy-islamic-feminism-promote",
    "islamic-feminism",
    "promote-to-canonical",
    "source-backed-contested",
    ["source-oup-islamic-feminism-schroter", "source-oup-islamic-feminism-al-sharmani", "source-oup-afsaruddin-quran-gender", "source-oup-sharify-funk-islamic-feminism", "source-cambridge-islamic-feminists-approaches", "source-utexas-barlas-believing-women", "source-musawah-vision-family", "source-ziba-mirhosseini-gender-justice", "source-cambridge-wadud-social-justice"],
    "The source set supports Islamic Feminism as a plural contemporary feminist current joining gender justice to critical engagement with the Qur'an, Islamic interpretive traditions, and gendered institutions across scholarly, legal, ethical, activist, and reformist routes.",
    "This promotion establishes a canonical micro target and a provisional dedicated-scored measurement branch only. It does not make Islamic Feminism synonymous with Muslim identity, private piety, religious observance, generic feminism or women's rights, Islamism, Religious Nationalism, Womanism, Liberal Feminism, Socialist Feminism, one interpreter, legal school, organization, jurisdiction, or current policy; later wording, cross-context, and empirical validation remain required.",
    ["Islamic Feminism may be retained as contextual feminist-religious scholarship rather than a separate canonical micro branch.", "The current varies across theological and secular positioning, Sunni and Shi'a and other Muslim contexts, national and transnational settings, interpretive methods, family-law and public-law questions, religious authority, and grassroots or scholarly activism.", "Muslim identity, piety, gender equality, Qur'anic reference, women's rights, legal reform, or one historical or current organization alone do not establish the full Islamic Feminist boundary."],
    "canonical",
    "scored-provisional",
    "2026-08-30",
  ),
  decision(
    "taxonomy-gandhian-political-thought-retain-contextual",
    "gandhian-political-thought",
    "retain-contextual",
    "source-backed-contested",
    ["source-oup-parel-pax-gandhiana", "source-cambridge-parel-gandhi-state", "source-cambridge-mantena-gandhi-state", "source-cambridge-mantena-gandhian-nonviolence", "source-sage-parasher-gandhian-democracy", "source-oup-gandhi-hind-swaraj-law", "source-cambridge-rolnick-gandhian-trusteeship", "source-gandhi-heritage-portal-key-texts"],
    "The source set supports Gandhian Political Thought as a historically situated and internally varied political-ethical tradition organized around ethical and political self-rule, nonviolent political action, constructive work, pluralism, trusteeship, and decentralized community self-government.",
    "Retain this as a contextual meso research target with a quarantined 4/4/4 candidate block. The current facet registry does not directly represent swaraj, satyagraha, means–ends integrity, constructive programme, or trusteeship, so contextual placement does not create a production anchor, respondent-facing score, or claim that one historical or later interpretation defines the tradition.",
    ["Gandhian thought may be treated as an ethical-political philosophy, anti-colonial tradition, pacifist current, decentralist or agrarian programme, or socialist-adjacent current rather than a separate meso node.", "The tradition varies across Gandhi's periods and contexts, religious and secular readings, state and antistatist interpretations, property and economic routes, caste and gender debates, industrialization, and later global receptions.", "Nonviolence, localism, self-reliance, religious ethics, trusteeship, village institutions, anti-imperialism, Indian identity, or one historical campaign alone do not establish the full Gandhian Political Thought boundary."],
    "contextual",
    "not-scored",
    "2026-08-29",
  ),
  decision(
    "taxonomy-market-socialism-context-retain-contextual",
    "market-socialism-context",
    "retain-contextual",
    "source-backed-contested",
    ["source-sep-socialism", "source-oup-socialism-vsi", "source-oup-miller-market-socialism", "source-tandf-neuhauser-market-socialism", "source-oup-democratic-socialist-planning", "source-ostrom", "source-sen"],
    "The source set supports Market Socialism as a family of models joining social or collective control of capital with market coordination, while differing over workplace control, investment, public institutions, and the boundary with property-owning democracy or state socialism.",
    "Retain this as a contextual meso research target because the literature supports a family of economic and political models rather than one exclusive canonical ancestry in the current graph. The source refresh adds qualitative conceptions but does not create production questions, an anchor vector, a score contribution, or a respondent-facing identity label.",
    ["Market Socialism may be treated as a socialist economic model, a political-economic theory, or a variant within Democratic Socialism and Libertarian Socialism rather than a separate canonical node.", "Worker self-management, collective ownership, public investment, market coordination, and democratic control can be combined in different institutional designs and should not be collapsed into one model.", "Market support, public ownership, cooperative preference, workplace democracy, or opposition to capitalism alone do not establish the full contextual boundary."],
    "contextual",
    "not-scored",
    "2026-08-30",
  ),
  decision(
    "taxonomy-green-communitarianism-retain-contextual",
    "green-communitarianism",
    "retain-contextual",
    "source-backed-contested",
    ["source-cambridge-ecologism", "source-cambridge-eckersley-communitarianism", "source-repec-pelletier-ecological-communitarianism", "source-ostrom", "source-sep-environmental-ethics"],
    "The source set supports Green Communitarianism as a contextual ecological-community bridge joining ecological limits, relational or shared stewardship, and community responsibility while preserving substantial variation in moral foundation, scale, and institutional route.",
    "Retain this as a contextual meso research target with twelve quarantined candidates. The literature does not justify exclusive canonical ancestry, a production anchor, or a respondent-facing label; ecological concern, localism, community identity, or decentralization alone remains insufficient.",
    ["Green Communitarianism may be treated as a bridge within green political theory, environmental ethics, ecological economics, or communitarian political thought rather than a separate ideology node.", "Community and place can support stewardship but can also conceal exclusion, unequal power, or scale problems; local or common governance is not a universal requirement.", "The ecological-community claim overlaps Green Politics, Ecologism, Social Ecology, and Bioregionalism and should not be collapsed into any one of them."],
    "contextual",
    "not-scored",
    "2026-08-30",
  ),
  decision(
    "taxonomy-liberal-conservatism-context-retain-contextual",
    "liberal-conservatism-context",
    "retain-contextual",
    "source-backed-contested",
    ["source-sep-liberalism", "source-oup-conservatism", "source-sciencedirect-klein-conservative-liberalism", "source-oup-political-ideologies"],
    "The source set supports Liberal Conservatism as a contextual overlap vocabulary joining liberal concern for liberty or rights with conservative concern for historically developed institutions, practical knowledge, continuity, and bounded reform, while preserving disagreement over the label and its economic and constitutional routes.",
    "Retain this as a contextual meso research target with twelve quarantined candidates. The literature supports a family resemblance or historical overlap, not one exclusive canonical ancestry, production anchor, or respondent-facing identity label.",
    ["The overlap may be treated as a conservative form of liberalism, a liberalized conservatism, a historical synthesis, or a host-specific label rather than a distinct ideology node.", "The liberal and conservative commitments can conflict over abstract rights, authority, markets, welfare, democracy, and the meaning of reform; one liberal or conservative response cannot resolve the combination.", "Liberal Conservatism overlaps Liberalism, Conservatism, One-Nation Conservatism, Neoconservatism, Christian Democracy, and other host traditions."],
    "contextual",
    "not-scored",
    "2026-08-30",
  ),
];

const targetById = (dataset: Dataset): ReadonlyMap<string, ResearchTarget> =>
  new Map(buildResearchTargets(dataset).map((target) => [target.id, target]));

export const MIN_NEIGHBOR_DISCRIMINANTS_PER_TARGET = 2;

export type ResearchTaxonomyEvidenceSet = Readonly<{
  neighborDiscriminants: readonly ResearchNeighborDiscriminant[];
  falsePositiveAudits: readonly ResearchFalsePositiveAudit[];
}>;

export const RESEARCH_TAXONOMY_EVIDENCE: ResearchTaxonomyEvidenceSet = {
  neighborDiscriminants: researchNeighborDiscriminants,
  falsePositiveAudits: researchFalsePositiveAudits,
};

const EMPTY_RESEARCH_TAXONOMY_EVIDENCE: ResearchTaxonomyEvidenceSet = {
  neighborDiscriminants: [],
  falsePositiveAudits: [],
};

const researchEvidenceCoverageFor = (
  decisions: readonly ResearchTaxonomyDecision[],
  evidence: ResearchTaxonomyEvidenceSet,
) => {
  const targetIds = decisions.map((item) => item.targetId);
  const neighborDiscriminantsByTarget = new Map<string, ResearchNeighborDiscriminant[]>();
  for (const discriminant of evidence.neighborDiscriminants) {
    const existing = neighborDiscriminantsByTarget.get(discriminant.targetId) ?? [];
    existing.push(discriminant);
    neighborDiscriminantsByTarget.set(discriminant.targetId, existing);
  }
  const falsePositiveAuditsByTarget = new Map<string, ResearchFalsePositiveAudit[]>();
  for (const audit of evidence.falsePositiveAudits) {
    const existing = falsePositiveAuditsByTarget.get(audit.targetId) ?? [];
    existing.push(audit);
    falsePositiveAuditsByTarget.set(audit.targetId, existing);
  }

  const targetNeighborDiscriminantCounts = Object.fromEntries(targetIds.map((targetId) => [
    targetId,
    neighborDiscriminantsByTarget.get(targetId)?.length ?? 0,
  ]));
  const targetFalsePositiveAuditCounts = Object.fromEntries(targetIds.map((targetId) => [
    targetId,
    falsePositiveAuditsByTarget.get(targetId)?.length ?? 0,
  ]));

  return {
    minimumNeighborDiscriminantsPerTarget: MIN_NEIGHBOR_DISCRIMINANTS_PER_TARGET,
    targetsWithMinimumNeighborDiscriminants: targetIds.filter((targetId) => {
      const discriminants = neighborDiscriminantsByTarget.get(targetId) ?? [];
      return new Set(discriminants.map((item) => item.neighborId)).size >= MIN_NEIGHBOR_DISCRIMINANTS_PER_TARGET;
    }).length,
    targetsWithFalsePositiveAudits: targetIds.filter((targetId) => (falsePositiveAuditsByTarget.get(targetId)?.length ?? 0) > 0).length,
    targetNeighborDiscriminantCounts,
    targetFalsePositiveAuditCounts,
  };
};

const defaultDecisionFor = (target: ResearchTarget): ResearchTaxonomyDecision => {
  if (target.targetKind === "registry-entry") {
    return decision(
      `taxonomy-${target.id}-retain-registry`,
      target.id,
      "retain-registry-only",
      "source-backed-contested",
      target.sourceRefs,
      "The entry is retained as source-backed context because its current registry kind captures historical, associated, or host-dependent meaning without asserting a canonical political-ideology node.",
      "Registry retention does not create ancestry, a scored neighbor, or a respondent-facing identity label.",
      ["Future source review may support a different placement or a bounded canonical node."],
      "registry-only",
      "not-scored",
    );
  }

  if (target.placement === "contextual") {
    return decision(
      `taxonomy-${target.id}-retain-contextual`,
      target.id,
      "retain-contextual",
      "source-backed-contested",
      target.sourceRefs,
      "The node is a broad or bridge anchor with source-backed relevance but insufficient basis for exclusive canonical ancestry.",
      "Contextual placement keeps the bridge visible without creating a canonical political-ideology branch or a production score.",
      ["A future source and boundary review could justify canonical promotion."],
      "contextual",
      "not-scored",
    );
  }

  if (target.measurementStatus === "catalog-only") {
    return decision(
      `taxonomy-${target.id}-hold-catalog`,
      target.id,
      "hold-catalog-only",
      "insufficient-source-boundary",
      target.sourceRefs,
      "The label is retained in the canonical catalog because the current ontology records it, but the present evidence and item coverage do not justify a production anchor or a promotion claim.",
      "Catalog presence is not a respondent classification and does not imply that the branch is empirically separable.",
      ["The branch may later receive a source-backed candidate block, remain catalog-only, or be demoted if boundary review finds it too broad or historically dependent."],
      "canonical",
      "catalog-only",
    );
  }

  return decision(
    `taxonomy-${target.id}-retain-canonical`,
    target.id,
    "retain-canonical",
    "source-backed-contested",
    target.sourceRefs,
    "The node remains in the canonical graph because its current source-backed placement is useful for taxonomy and measurement review.",
    "Retention does not validate the local anchor or imply that a respondent belongs to the ideology; production measurement remains separately gated.",
    ["Dedicated wording, cross-context review, and empirical evidence may later support promotion, demotion, or anchor revision."],
    "canonical",
    target.anchorId ? "scored-provisional" : "catalog-only",
  );
};

const expectedPlacementForDisposition: Readonly<Record<ResearchTaxonomyDisposition, IdeologyNodePlacement | "registry-only">> = {
  "promote-to-canonical": "canonical",
  "retain-canonical": "canonical",
  "demote-to-contextual": "contextual",
  "demote-to-associated": "registry-only",
  "retain-contextual": "contextual",
  "retain-registry-only": "registry-only",
  "hold-catalog-only": "canonical",
};

const liveMeasurementCanRepresentGovernanceStatus = (
  decisionResult: ResearchTaxonomyDecision["resultingScoringStatus"],
  liveMeasurementStatus: ResearchTarget["measurementStatus"],
): boolean => {
  if (decisionResult === "catalog-only") return liveMeasurementStatus === "catalog-only";
  if (decisionResult === "not-scored") return ["contextual-only", "registry-only", "catalog-only"].includes(liveMeasurementStatus);
  return ["dedicated-scored", "partial-dedicated", "scored-indirect"].includes(liveMeasurementStatus);
};

export type ResearchTaxonomyMeasurementReconciliation = Readonly<{
  id: string;
  decisionId: string;
  targetId: string;
  kind: "separate-measurement-activation";
  liveMeasurementStatus: ResearchTarget["measurementStatus"];
  rationale: string;
  recordedAt: string;
}>;

/**
 * Current taxonomy and live measurement statuses align. Keep the typed seam
 * for future exceptions so any later mismatch must be recorded explicitly and
 * cannot be silently treated as a successful promotion.
 */
export const RESEARCH_TAXONOMY_MEASUREMENT_RECONCILIATIONS: readonly ResearchTaxonomyMeasurementReconciliation[] = [];

export const RESEARCH_TAXONOMY_DECISIONS: readonly ResearchTaxonomyDecision[] = (() => {
  const explicitByTarget = new Map(EXPLICIT_TAXONOMY_DECISIONS.map((item) => [item.targetId, item]));
  return buildResearchTargets(DATASET).map((target) => explicitByTarget.get(target.id) ?? defaultDecisionFor(target));
})();

/**
 * Summarizes the research ledger without treating its intended disposition as
 * a mutation of the live scoring inventory. Any future mismatch between a
 * research decision and live measurement remains explicit and fail-closed.
 */
export const researchTaxonomyGovernanceSummary = (dataset: Dataset = DATASET) => {
  const targets = targetById(dataset);
  const decisions = dataset === DATASET ? RESEARCH_TAXONOMY_DECISIONS : buildResearchTargets(dataset).map(defaultDecisionFor);
  const reconciliations = dataset === DATASET ? RESEARCH_TAXONOMY_MEASUREMENT_RECONCILIATIONS : [];
  const evidence = dataset === DATASET ? RESEARCH_TAXONOMY_EVIDENCE : EMPTY_RESEARCH_TAXONOMY_EVIDENCE;
  const countBy = (values: readonly string[]): Readonly<Record<string, number>> => values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
  const measurementStatusExceptions = decisions.flatMap((item) => {
    const target = targets.get(item.targetId);
    if (!target || liveMeasurementCanRepresentGovernanceStatus(item.resultingScoringStatus, target.measurementStatus)) return [];
    const reconciliation = reconciliations.find((candidate) => candidate.targetId === item.targetId);
    return [{
      targetId: item.targetId,
      label: target.label,
      governanceScoringStatus: item.resultingScoringStatus,
      liveMeasurementStatus: target.measurementStatus,
      reconciliationId: reconciliation?.id ?? null,
      reconciliationKind: reconciliation?.kind ?? "unclassified",
      interpretation: reconciliation?.rationale ?? "unclassified measurement/governance mismatch",
    }];
  });

  const unclassifiedMeasurementMismatches = measurementStatusExceptions.filter((item) => item.reconciliationId === null).map((item) => item.targetId);

  return {
    decisionCount: decisions.length,
    dispositionCounts: countBy(decisions.map((item) => item.disposition)),
    evidenceStatusCounts: countBy(decisions.map((item) => item.evidenceStatus)),
    resultingPlacementCounts: countBy(decisions.map((item) => item.resultingPlacement)),
    resultingScoringStatusCounts: countBy(decisions.map((item) => item.resultingScoringStatus)),
    researchEvidenceCoverage: researchEvidenceCoverageFor(decisions, evidence),
    measurementReconciliations: reconciliations,
    measurementStatusExceptions,
    unclassifiedMeasurementMismatches,
    validationErrors: validateResearchTaxonomyDecisionSet(dataset, decisions, reconciliations, evidence),
  };
};

export const researchTaxonomyDecisionForTarget = (targetId: string, dataset: Dataset = DATASET): ResearchTaxonomyDecision | undefined => {
  if (dataset === DATASET) return RESEARCH_TAXONOMY_DECISIONS.find((item) => item.targetId === targetId);
  const target = targetById(dataset).get(targetId);
  return target ? defaultDecisionFor(target) : undefined;
};

export const validateResearchTaxonomyDecisionSet = (
  dataset: Dataset,
  decisions: readonly ResearchTaxonomyDecision[],
  reconciliations: readonly ResearchTaxonomyMeasurementReconciliation[] = [],
  evidence: ResearchTaxonomyEvidenceSet = RESEARCH_TAXONOMY_EVIDENCE,
): readonly string[] => {
  const errors: string[] = [];
  const targets = targetById(dataset);
  const sources = new Map(dataset.sources.map((source) => [source.id, source]));
  const candidates = new Map(curatedResearchCandidates.map((candidate) => [candidate.id, candidate]));

  if (new Set(decisions.map((item) => item.id)).size !== decisions.length) errors.push("taxonomy decision IDs must be unique");
  if (new Set(decisions.map((item) => item.targetId)).size !== decisions.length) errors.push("taxonomy decisions must have one decision per target");
  if (new Set(reconciliations.map((item) => item.id)).size !== reconciliations.length) errors.push("measurement reconciliation IDs must be unique");

  for (const target of targets.values()) {
    if (!decisions.some((item) => item.targetId === target.id)) errors.push(`missing taxonomy decision for ${target.id}`);
  }

  for (const item of decisions) {
    const target = targets.get(item.targetId);
    if (!target) {
      errors.push(`taxonomy decision ${item.id} references missing target ${item.targetId}`);
      continue;
    }
    if (item.sourceIds.length === 0) errors.push(`taxonomy decision ${item.id} needs source evidence`);
    if (new Set(item.sourceIds).size !== item.sourceIds.length) errors.push(`taxonomy decision ${item.id} has duplicate source evidence`);
    if (item.sourceIds.some((sourceId) => sources.get(sourceId)?.role !== "ideology-research")) errors.push(`taxonomy decision ${item.id} needs only ideology-research sources`);
    if (item.sourceIds.some((sourceId) => !target.sourceRefs.includes(sourceId))) errors.push(`taxonomy decision ${item.id} cites a source not attached to target ${target.id}`);
    if (!item.rationale.trim() || !item.boundary.trim()) errors.push(`taxonomy decision ${item.id} needs rationale and boundary text`);
    if (item.competingInterpretations.length === 0 || item.competingInterpretations.some((interpretation) => !interpretation.trim())) errors.push(`taxonomy decision ${item.id} needs competing interpretations`);
    if (item.reviewStatus !== "research_decision") errors.push(`taxonomy decision ${item.id} has an invalid review status`);
    if (item.resultingPlacement !== expectedPlacementForDisposition[item.disposition]) errors.push(`taxonomy decision ${item.id} has a placement inconsistent with ${item.disposition}`);
    if (target.targetKind === "registry-entry" && item.disposition !== "retain-registry-only") errors.push(`taxonomy decision ${item.id} changes a registry entry outside registry-only retention`);
    if (target.targetKind === "ideology-node" && item.disposition === "retain-registry-only") errors.push(`taxonomy decision ${item.id} retains an ideology node as registry-only without an associated demotion`);
    if (item.disposition === "hold-catalog-only" && (target.targetKind !== "ideology-node" || item.resultingScoringStatus !== "catalog-only")) errors.push(`taxonomy decision ${item.id} must hold a canonical node as catalog-only`);
    if (item.resultingPlacement !== "canonical" && item.resultingScoringStatus !== "not-scored") errors.push(`taxonomy decision ${item.id} gives a non-canonical result a scoring status`);
    if (item.resultingScoringStatus === "scored-provisional" && item.resultingPlacement !== "canonical") errors.push(`taxonomy decision ${item.id} marks a non-canonical result as scored-provisional`);
    if (item.evidenceStatus === "insufficient-source-boundary" && item.resultingScoringStatus === "scored-provisional") errors.push(`taxonomy decision ${item.id} cannot mark insufficient evidence as scored-provisional`);

    const targetDiscriminants = evidence.neighborDiscriminants.filter((discriminant) => discriminant.targetId === item.targetId);
    if (new Set(targetDiscriminants.map((discriminant) => discriminant.neighborId)).size < MIN_NEIGHBOR_DISCRIMINANTS_PER_TARGET) {
      errors.push(`taxonomy decision ${item.id} needs at least ${MIN_NEIGHBOR_DISCRIMINANTS_PER_TARGET} distinct neighbor discriminants`);
    }
    if (!evidence.falsePositiveAudits.some((audit) => audit.targetId === item.targetId)) {
      errors.push(`taxonomy decision ${item.id} needs a false-positive audit`);
    }

    const liveMeasurementStatus = target.measurementStatus;
    if (!liveMeasurementCanRepresentGovernanceStatus(item.resultingScoringStatus, liveMeasurementStatus)) {
      const reconciliation = reconciliations.find((candidate) => candidate.targetId === item.targetId);
      if (!reconciliation) errors.push(`taxonomy decision ${item.id} has an unclassified measurement/governance mismatch`);
      else if (reconciliation.decisionId !== item.id) errors.push(`measurement reconciliation ${reconciliation.id} references the wrong taxonomy decision`);
      else if (reconciliation.liveMeasurementStatus !== liveMeasurementStatus) errors.push(`measurement reconciliation ${reconciliation.id} has a stale live measurement status`);
    }
  }

  for (const reconciliation of reconciliations) {
    const target = targets.get(reconciliation.targetId);
    const decision = decisions.find((item) => item.id === reconciliation.decisionId);
    if (!target) errors.push(`measurement reconciliation ${reconciliation.id} references missing target ${reconciliation.targetId}`);
    if (!decision) errors.push(`measurement reconciliation ${reconciliation.id} references missing decision ${reconciliation.decisionId}`);
    if (decision && decision.targetId !== reconciliation.targetId) errors.push(`measurement reconciliation ${reconciliation.id} target does not match its decision`);
    if (target && reconciliation.liveMeasurementStatus !== target.measurementStatus) errors.push(`measurement reconciliation ${reconciliation.id} does not match live target coverage`);
    if (!reconciliation.rationale.trim()) errors.push(`measurement reconciliation ${reconciliation.id} needs rationale text`);
  }

  const discriminantKeys = new Set<string>();
  for (const discriminant of evidence.neighborDiscriminants) {
    const key = `${discriminant.targetId}:${discriminant.neighborId}`;
    if (discriminantKeys.has(key)) errors.push(`duplicate neighbor discriminant ${key}`);
    discriminantKeys.add(key);
    if (!targets.has(discriminant.targetId)) errors.push(`neighbor discriminant references missing target ${discriminant.targetId}`);
    if (!targets.has(discriminant.neighborId)) errors.push(`neighbor discriminant ${key} references missing neighbor ${discriminant.neighborId}`);
    if (discriminant.targetId === discriminant.neighborId) errors.push(`neighbor discriminant ${key} cannot compare a target with itself`);
    if (discriminant.itemIds.length === 0) errors.push(`neighbor discriminant ${key} needs candidate items`);
    if (!discriminant.sharedCommitments.trim() || !discriminant.distinction.trim() || !discriminant.remainingAmbiguity.trim()) {
      errors.push(`neighbor discriminant ${key} needs commitment, distinction, and ambiguity text`);
    }
    for (const itemId of discriminant.itemIds) {
      const candidate = candidates.get(itemId);
      if (!candidate) errors.push(`neighbor discriminant ${key} references missing candidate ${itemId}`);
    }
  }

  const falsePositiveKeys = new Set<string>();
  for (const audit of evidence.falsePositiveAudits) {
    if (falsePositiveKeys.has(audit.targetId)) errors.push(`duplicate false-positive audit ${audit.targetId}`);
    falsePositiveKeys.add(audit.targetId);
    if (!targets.has(audit.targetId)) errors.push(`false-positive audit references missing target ${audit.targetId}`);
    if (!audit.profile.trim() || !audit.risk.trim() || !audit.preferredOutcome.trim()) errors.push(`false-positive audit ${audit.targetId} needs profile, risk, and preferred outcome text`);
    if (audit.guardItemIds.length === 0) errors.push(`false-positive audit ${audit.targetId} needs guard candidate items`);
    for (const itemId of audit.guardItemIds) {
      const candidate = candidates.get(itemId);
      if (!candidate) errors.push(`false-positive audit ${audit.targetId} references missing candidate ${itemId}`);
      else if (candidate.targetId !== audit.targetId) errors.push(`false-positive audit ${audit.targetId} references candidate ${itemId} for another target`);
    }
  }

  return errors;
};

export const validateResearchTaxonomyDecisions = (dataset: Dataset = DATASET): readonly string[] => {
  const decisions = dataset === DATASET ? RESEARCH_TAXONOMY_DECISIONS : buildResearchTargets(dataset).map(defaultDecisionFor);
  const reconciliations = dataset === DATASET ? RESEARCH_TAXONOMY_MEASUREMENT_RECONCILIATIONS : [];
  const evidence = dataset === DATASET ? RESEARCH_TAXONOMY_EVIDENCE : EMPTY_RESEARCH_TAXONOMY_EVIDENCE;
  return validateResearchTaxonomyDecisionSet(dataset, decisions, reconciliations, evidence);
};
