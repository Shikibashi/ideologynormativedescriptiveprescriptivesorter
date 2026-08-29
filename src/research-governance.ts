import { DATASET } from "./data";
import { buildResearchTargets } from "./research";
import type {
  Dataset,
  IdeologyNodePlacement,
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
    ["source-ucp-khomeinism", "source-cambridge-islamism"],
    "Scholarship treats Khomeinism as a historically specific Islamist political formation with a distinct relationship among clerical guardianship, anti-imperial independence, mass grievance, and revolutionary state formation.",
    "This promotion establishes a canonical catalog target only. It does not create a production anchor, a score, or a claim that Khomeinism represents Islamism as a whole.",
    ["Khomeinism may be treated as a manifestation or variant of Islamism rather than a separate canonical node.", "Its internal historical and theological variation remains contested."],
    "canonical",
    "catalog-only",
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
    ["source-cambridge-qutb-march", "source-cambridge-qutb-vahdat", "source-cambridge-islamism"],
    "Political-theory scholarship reconstructs Qutb's concepts of divine sovereignty, jahiliyya, comprehensive moral order, and disciplined transformation as a distinct intellectual current within modern Islamism.",
    "This promotion establishes a canonical catalog target only. It does not equate Qutbism with every Islamist or militant current and does not create a production anchor.",
    ["Qutbism may be retained as a historical school or variant within Islamism rather than a canonical node.", "Later movements appropriated Qutb selectively and cannot be treated as identical to his theory."],
    "canonical",
    "catalog-only",
  ),
  decision(
    "taxonomy-deep-ecology-associated",
    "deep-ecology",
    "demote-to-associated",
    "source-backed-contested",
    ["source-sep-environmental-ethics", "source-cambridge-ecologism"],
    "Environmental-ethics scholarship treats Deep Ecology primarily as a philosophical platform or associated ecological tradition that can support multiple political programmes.",
    "Keep it queryable and researchable, but do not force it into the political-ideology hierarchy or infer a political identity from ecological philosophy alone.",
    ["Some ecological movements treat Deep Ecology as a political ideology.", "Its philosophical commitments have multiple political translations."],
    "registry-only",
    "not-scored",
  ),
  decision(
    "taxonomy-bioregionalism-associated",
    "bioregionalism",
    "demote-to-associated",
    "source-backed-contested",
    ["source-sep-environmental-ethics", "source-cambridge-ecologism"],
    "Bioregionalism has mixed planning, cultural, territorial, and ecological uses; the current source base does not justify treating every use as an independent political-ideology node.",
    "Retain the doctrine as associated ecological context and require an explicit political programme before any canonical promotion.",
    ["Some bioregional projects have strong political and institutional content.", "Place-based meanings vary across jurisdictions and movements."],
    "registry-only",
    "not-scored",
  ),
];

const targetById = (dataset: Dataset): ReadonlyMap<string, ResearchTarget> =>
  new Map(buildResearchTargets(dataset).map((target) => [target.id, target]));

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

export const RESEARCH_TAXONOMY_DECISIONS: readonly ResearchTaxonomyDecision[] = (() => {
  const explicitByTarget = new Map(EXPLICIT_TAXONOMY_DECISIONS.map((item) => [item.targetId, item]));
  return buildResearchTargets(DATASET).map((target) => explicitByTarget.get(target.id) ?? defaultDecisionFor(target));
})();

export const researchTaxonomyDecisionForTarget = (targetId: string, dataset: Dataset = DATASET): ResearchTaxonomyDecision | undefined => {
  if (dataset === DATASET) return RESEARCH_TAXONOMY_DECISIONS.find((item) => item.targetId === targetId);
  const target = targetById(dataset).get(targetId);
  return target ? defaultDecisionFor(target) : undefined;
};

export const validateResearchTaxonomyDecisions = (dataset: Dataset = DATASET): readonly string[] => {
  const errors: string[] = [];
  const targets = targetById(dataset);
  const sources = new Map(dataset.sources.map((source) => [source.id, source]));
  const decisions = dataset === DATASET ? RESEARCH_TAXONOMY_DECISIONS : buildResearchTargets(dataset).map(defaultDecisionFor);

  if (new Set(decisions.map((item) => item.id)).size !== decisions.length) errors.push("taxonomy decision IDs must be unique");
  if (new Set(decisions.map((item) => item.targetId)).size !== decisions.length) errors.push("taxonomy decisions must have one decision per target");

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
    if (item.sourceIds.some((sourceId) => sources.get(sourceId)?.role !== "ideology-research")) errors.push(`taxonomy decision ${item.id} needs only ideology-research sources`);
    if (!item.rationale.trim() || !item.boundary.trim()) errors.push(`taxonomy decision ${item.id} needs rationale and boundary text`);
    if (item.reviewStatus !== "research_decision") errors.push(`taxonomy decision ${item.id} has an invalid review status`);
    if (item.disposition === "promote-to-canonical" && (target.targetKind !== "ideology-node" || item.resultingPlacement !== "canonical")) errors.push(`taxonomy decision ${item.id} promotes a non-node or non-canonical result`);
    if (item.disposition === "demote-to-associated" && item.resultingPlacement !== "registry-only") errors.push(`taxonomy decision ${item.id} must result in registry-only placement`);
    if (item.disposition === "hold-catalog-only" && (target.targetKind !== "ideology-node" || item.resultingPlacement !== "canonical" || item.resultingScoringStatus !== "catalog-only")) errors.push(`taxonomy decision ${item.id} must hold a canonical node as catalog-only`);
    if (item.evidenceStatus === "insufficient-source-boundary" && item.resultingScoringStatus === "scored-provisional") errors.push(`taxonomy decision ${item.id} cannot mark insufficient evidence as scored-provisional`);
  }

  return errors;
};
