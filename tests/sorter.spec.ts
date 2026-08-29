import { test, expect, type Page } from "@playwright/test";
import { DATASET } from "../src/data";

const choose = async (page: Page, optionIndex: number): Promise<void> => {
  await page.locator("label.answer-option").nth(optionIndex).click();
};

const advance = async (page: Page, last: boolean): Promise<void> => {
  await page.getByRole("button", { name: last ? /Read the result/ : /Next/ }).click();
};

test("starts with an inspectable brief and requires an answer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Three views/ })).toBeVisible();
  await page.getByRole("button", { name: /Begin the reading/ }).click();
  await expect(page.getByRole("button", { name: /Next/ })).toBeDisabled();
  await choose(page, 3);
  await expect(page.getByRole("button", { name: /Next/ })).toBeEnabled();
  await page.getByRole("button", { name: /Next/ }).click();
  await page.getByRole("button", { name: /Back/ }).click();
  await expect(page.locator('input[type="radio"]').nth(3)).toBeChecked();
});

test("exposes the audited ontology inventory and distinguishes scored branches from contextual registry entries", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /How this experiment works/ }).click();
  await expect(page.getByText(/9 canonical macro families, 38 canonical meso traditions, and 69 canonical micro branches/)).toBeVisible();
  await expect(page.getByText(/Secondary registry\./)).toBeVisible();
  await page.getByText("Browse the canonical meso and micro catalog").click();
  await expect(page.getByText("Right-Libertarianism")).toBeVisible();
  await expect(page.getByText("scored anchor").first()).toBeVisible();
  await expect(page.getByText(/contextual, historical, or associated entries remain queryable as provenance context/)).toBeVisible();
});

test("opens the research workbench and saves a quarantined candidate item", async ({ page }) => {
  test.setTimeout(Math.max(120_000, DATASET.questions.length * 150));
  await page.goto("/");
  await page.getByRole("button", { name: /^Research$/ }).click();
  await expect(page.getByRole("heading", { name: /Make the next question earn its place/ })).toBeVisible();
  await expect(page.locator(".research-count")).toContainText(/1488 quarantined candidates across 124 targets/);
  await expect(page.locator(".research-promotion-gate")).toContainText(/neighbor distinctness: not completed/i);
  await expect(page.locator(".research-promotion-gate")).toContainText(/cross-cultural \/ jurisdictional: not completed/i);
  await expect(page.locator(".research-promotion-gate")).toContainText(/empirical validation: not completed/i);
  await page.locator("#research-target").selectOption("anarcho-capitalism");
  await expect(page.locator(".research-bank")).toContainText(/12 source-backed items/i);
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("anarcho-primitivism");
  await expect(page.getByRole("heading", { name: "Anarcho-Primitivism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("austromarxism");
  await expect(page.getByRole("heading", { name: "Austromarxism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("egalitarian-liberal-feminism");
  await expect(page.getByRole("heading", { name: "Egalitarian-Liberal Feminism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("cultural-spiritual-ecofeminism");
  await expect(page.getByRole("heading", { name: "Cultural / Spiritual Ecofeminism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("materialist-socialist-ecofeminism");
  await expect(page.getByRole("heading", { name: "Materialist / Socialist Ecofeminism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("buddhist-nationalism");
  await expect(page.getByRole("heading", { name: "Buddhist Nationalism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("khomeinism");
  await expect(page.getByRole("heading", { name: "Khomeinism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("qutbism");
  await expect(page.getByRole("heading", { name: "Qutbism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("revolutionary-islamism");
  await expect(page.getByRole("heading", { name: "Revolutionary Islamism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("salafi-jihadism");
  await expect(page.getByRole("heading", { name: "Salafi-Jihadism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("radical-republicanism");
  await expect(page.getByRole("heading", { name: "Radical Republicanism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("christian-nationalism");
  await expect(page.getByRole("heading", { name: "Christian Nationalism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("wasatiyya");
  await expect(page.getByRole("heading", { name: "Wasatiyya" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("right-wing-populism");
  await expect(page.getByRole("heading", { name: "Right-Wing Populism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("agrarian-populism");
  await expect(page.getByRole("heading", { name: "Agrarian Populism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("georgism");
  await expect(page.getByRole("heading", { name: "Georgism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("hindutva");
  await expect(page.getByRole("heading", { name: "Hindutva (Hindu Nationalism)" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("religious-zionism");
  await expect(page.getByRole("heading", { name: "Religious Zionism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("fascism");
  await expect(page.getByRole("heading", { name: "Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("french-fascism");
  await expect(page.getByRole("heading", { name: "French Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("italian-fascism");
  await expect(page.getByRole("heading", { name: "Italian Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("flemish-belgian-fascism");
  await expect(page.getByRole("heading", { name: "Flemish / Belgian Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("japanese-fascism");
  await expect(page.getByRole("heading", { name: "Japanese Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("neo-fascism");
  await expect(page.getByRole("heading", { name: "Neo-Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("third-positionism");
  await expect(page.getByRole("heading", { name: "Third Positionism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("neo-nazism");
  await expect(page.getByRole("heading", { name: "Neo-Nazism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("falangism");
  await expect(page.getByRole("heading", { name: "Falangism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("brazilian-integralism");
  await expect(page.getByRole("heading", { name: "Brazilian Integralism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("integral-nationalism");
  await expect(page.getByRole("heading", { name: "Integral Nationalism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("legionary-fascism");
  await expect(page.getByRole("heading", { name: "Legionary Fascism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("one-nation-conservatism");
  await expect(page.getByRole("heading", { name: "One-Nation Conservatism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("zionism");
  await expect(page.getByRole("heading", { name: "Zionism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("bioregionalism");
  await expect(page.getByRole("heading", { name: "Bioregionalism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("white-nationalism");
  await expect(page.getByRole("heading", { name: "White Nationalism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("deep-ecology");
  await expect(page.getByRole("heading", { name: "Deep Ecology" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("secondary context");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  await page.locator("#research-target").selectOption("right-libertarianism");
  await expect(page.getByRole("heading", { name: "Right-Libertarianism" })).toBeVisible();
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await expect(page.locator(".research-bank-item")).toHaveCount(12);
  for (const [targetId, label] of [
    ["classical-liberalism", "Classical Liberalism"],
    ["social-liberalism", "Social Liberalism"],
    ["moderate-conservatism", "Moderate Conservatism"],
    ["social-democracy", "Social Democracy"],
    ["revisionist-bernsteinian-social-democracy", "Revisionist / Bernsteinian Social Democracy"],
    ["democratic-socialism", "Democratic Socialism"],
    ["minarchism", "Minarchism"],
    ["ecosocialism", "Ecosocialism"],
    ["left-libertarianism", "Left-Libertarianism"],
    ["libertarian-socialism", "Libertarian Socialism"],
    ["national-conservatism", "National Conservatism"],
    ["libertarianism", "Libertarianism"],
    ["marxism", "Marxism"],
    ["social-anarchism", "Social Anarchism"],
    ["anarcho-pacifism", "Anarcho-Pacifism"],
    ["anarcho-primitivism", "Anarcho-Primitivism"],
    ["liberal-feminism", "Liberal Feminism"],
    ["christian-democracy", "Christian Democracy"],
    ["contemporary-neo-republicanism", "Contemporary Neo-Republicanism"],
    ["black-feminism", "Black Feminism"],
    ["ecofeminism", "Ecofeminism"],
    ["green-anarchism", "Green Anarchism"],
    ["social-ecology", "Social Ecology"],
    ["bioregionalism", "Bioregionalism"],
    ["anarcha-feminism", "Anarcha-Feminism"],
    ["liberal-nationalism", "Liberal Nationalism"],
    ["radical-feminism", "Radical Feminism"],
    ["classical-liberal-feminism", "Classical-Liberal Feminism"],
    ["communism", "Communism"],
    ["historical-republicanism", "Historical Republicanism"],
    ["individualist-anarchism", "Individualist Anarchism"],
    ["egoist-anarchism", "Egoist Anarchism"],
    ["neoliberalism", "Neoliberalism"],
    ["socialist-marxist-feminism", "Socialist / Marxist Feminism"],
    ["marxist-feminism", "Marxist Feminism"],
    ["socialist-feminism", "Socialist Feminism"],
    ["left-wing-populism", "Left-Wing Populism"],
    ["right-wing-populism", "Right-Wing Populism"],
    ["agrarian-populism", "Agrarian Populism"],
    ["hindutva", "Hindutva (Hindu Nationalism)"],
    ["religious-zionism", "Religious Zionism"],
    ["fascism", "Fascism"],
    ["italian-fascism", "Italian Fascism"],
    ["flemish-belgian-fascism", "Flemish / Belgian Fascism"],
    ["japanese-fascism", "Japanese Fascism"],
    ["british-fascism", "British Fascism"],
    ["french-fascism", "French Fascism"],
    ["neo-fascism", "Neo-Fascism"],
    ["third-positionism", "Third Positionism"],
    ["national-syndicalism", "National-Syndicalism"],
    ["neo-nazism", "Neo-Nazism"],
    ["falangism", "Falangism"],
    ["brazilian-integralism", "Brazilian Integralism"],
    ["integral-nationalism", "Integral Nationalism"],
    ["legionary-fascism", "Legionary Fascism"],
    ["white-nationalism", "White Nationalism"],
    ["neoconservatism", "Neoconservatism"],
    ["paleoconservatism", "Paleoconservatism"],
    ["populism", "Populism"],
    ["mutualism", "Mutualism"],
    ["radical-conservatism", "Radical Conservatism"],
    ["reactionary-conservatism", "Reactionary Conservatism"],
    ["islamism", "Islamism"],
    ["wasatiyya", "Wasatiyya"],
    ["revolutionary-islamism", "Revolutionary Islamism"],
    ["salafi-jihadism", "Salafi-Jihadism"],
    ["ordoliberalism", "Ordoliberalism"],
    ["pan-africanism", "Pan-Africanism"],
    ["religious-nationalism", "Religious Nationalism"],
    ["conservative-nationalism", "Conservative Nationalism"],
    ["national-socialism", "National Socialism (Nazism)"],
    ["civic-nationalism", "Civic Nationalism"],
    ["black-nationalism", "Black Nationalism"],
    ["materialist-feminism", "Materialist Feminism"],
    ["anti-colonial-nationalism", "Anti-Colonial Nationalism"],
    ["arab-nationalism", "Arab Nationalism"],
    ["maoism", "Maoism"],
    ["council-communism", "Council Communism"],
    ["guild-socialism", "Guild Socialism"],
    ["marxism-leninism", "Marxism-Leninism"],
    ["autonomist-marxism", "Autonomist Marxism"],
    ["austromarxism", "Austromarxism"],
    ["egalitarian-liberal-feminism", "Egalitarian-Liberal Feminism"],
    ["cultural-spiritual-ecofeminism", "Cultural / Spiritual Ecofeminism"],
    ["materialist-socialist-ecofeminism", "Materialist / Socialist Ecofeminism"],
    ["buddhist-nationalism", "Buddhist Nationalism"],
    ["christian-nationalism", "Christian Nationalism"],
    ["cultural-feminism", "Cultural Feminism"],
    ["cultural-nationalism", "Cultural Nationalism"],
    ["ethnocultural-nationalism", "Ethnocultural Nationalism"],
    ["lesbian-feminism", "Lesbian Feminism"],
    ["trotskyism", "Trotskyism"],
    ["womanism", "Womanism"],
    ["christian-socialism", "Christian Socialism"],
    ["ujamaa", "Ujamaa (African Socialism)"],
  ] as const) {
    await page.locator("#research-target").selectOption(targetId);
    await expect(page.getByRole("heading", { name: label })).toBeVisible();
    await expect(page.locator(".research-status")).toContainText("dedicated and scored");
    await expect(page.locator(".research-bank-item")).toHaveCount(12);
  }
  await page.locator("#research-target").selectOption("anarcho-capitalism");
  await page.locator("summary", { hasText: "Review risks and promotion evidence" }).click();
  await expect(page.locator("#candidate-neighbor-review")).toBeVisible();
  await expect(page.locator("#candidate-cross-context-review")).toBeVisible();
  await expect(page.locator("#candidate-empirical-validation")).toBeVisible();
  await page.locator("#research-target").selectOption("anarcho-capitalism");
  await expect(page.locator(".research-status")).toContainText("dedicated and scored");
  await page.locator("#candidate-justification").fill("This branch warrants review because its proposed relationship between markets and authority is distinct from nearby socialist and state-centered traditions.");
  await page.locator("#candidate-wording").fill("Voluntary providers should be allowed to coordinate essential services without a single compulsory authority.");
  await page.getByRole("button", { name: /Save research candidate/ }).click();
  await expect(page.getByText(/Saved research-anarcho-capitalism-normative/)).toBeVisible();
  await expect(page.getByText("research_candidate").first()).toBeVisible();
  await page.getByRole("button", { name: /Return to reading/ }).first().click();
  await expect(page.getByRole("heading", { name: /Three views/ })).toBeVisible();
});

test("shows research-backed taxonomy promotion and demotion decisions separately from scoring", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Research$/ }).click();
  await page.locator("#research-target").selectOption("qutbism");
  await expect(page.locator(".research-governance-note")).toContainText(/promote to canonical ontology/i);
  await expect(page.locator(".research-governance-note")).toContainText(/catalog-only/i);
  await page.locator("#research-target").selectOption("deep-ecology");
  await expect(page.locator(".research-governance-note")).toContainText(/demote to associated registry/i);
  await expect(page.locator(".research-governance-note")).toContainText(/not-scored/i);
});

test.describe("responsive workbench", () => {
  test.use({ viewport: { width: 320, height: 720 } });

  test("keeps the research surface within a narrow viewport", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open research workbench" }).click();
    const layout = await page.evaluate(() => {
      const grid = document.querySelector<HTMLElement>(".research-grid");
      const header = document.querySelector<HTMLElement>(".research-header");
      return {
        bodyScrollWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        gridColumnCount: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0,
        headerDirection: header ? getComputedStyle(header).flexDirection : "",
      };
    });
    expect(layout.bodyScrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.gridColumnCount).toBe(1);
    expect(layout.headerDirection).toBe("column");
  });
});

test("can complete all layers and create a versioned share link", async ({ page, context }) => {
  test.setTimeout(Math.max(60_000, DATASET.questions.length * 150));
  await page.goto("/");
  await page.getByRole("button", { name: /Begin the reading/ }).click();
  for (let index = 0; index < DATASET.questions.length; index += 1) {
    await choose(page, 3);
    await advance(page, index === DATASET.questions.length - 1);
  }
  await expect(page.getByRole("heading", { name: "Your answers have more than one shape." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A combined pattern" })).toBeVisible();
  await expect(page.locator(".combined-neighbor-list")).toBeVisible();
  await expect(page.locator(".combined-layer-fits").first()).toContainText(/Descriptive/);
  await expect(page.getByText(/low separation/i).first()).toBeVisible();
  await page.getByRole("button", { name: /Create share link/ }).click();
  const shareLink = await page.locator("#share-link").inputValue();
  expect(shareLink).toContain("#s=");

  const restored = await context.newPage();
  await restored.goto(shareLink);
  await expect(restored.getByRole("heading", { name: "Your answers have more than one shape." })).toBeVisible();
  await restored.close();
  await page.getByRole("button", { name: /Start again/ }).click();
  await expect(page.getByRole("heading", { name: /Three views/ })).toBeVisible();
});

test("shows missing information instead of inventing a layer result", async ({ page }) => {
  test.setTimeout(Math.max(60_000, DATASET.questions.length * 200));
  await page.goto("/");
  await page.getByRole("button", { name: /Begin the reading/ }).click();
  const firstLayerCount = DATASET.manifest.questionsPerLayer.descriptive;
  for (let index = 0; index < firstLayerCount; index += 1) {
    await choose(page, 5);
    await advance(page, false);
  }
  for (let index = firstLayerCount; index < DATASET.questions.length; index += 1) {
    await choose(page, 3);
    await advance(page, index === DATASET.questions.length - 1);
  }
  await expect(page.getByRole("heading", { name: "Keep this layer open" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keep the combined reading open" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "All three layers are needed." })).toBeVisible();
  await expect(page.locator(".coverage-row").first()).toContainText(`0 of ${firstLayerCount} prompts answered`);
  await expect(page.getByText(/No view yet/).first()).toBeVisible();
});

test("announces layer transitions at the dataset boundaries", async ({ page }) => {
  test.setTimeout(Math.max(60_000, DATASET.questions.length * 250));
  await page.goto("/");
  await page.getByRole("button", { name: /Begin the reading/ }).click();
  const firstBoundary = DATASET.manifest.questionsPerLayer.descriptive;
  const secondBoundary = firstBoundary + DATASET.manifest.questionsPerLayer.normative;
  for (let index = 0; index < firstBoundary; index += 1) {
    await choose(page, 3);
    await advance(page, false);
  }
  await expect(page.getByRole("note")).toContainText(/diagnosis into values/i);
  for (let index = firstBoundary; index < secondBoundary; index += 1) {
    await choose(page, 3);
    await advance(page, false);
  }
  await expect(page.getByRole("note")).toContainText(/values into practice/i);
});

test("ignores a malformed share hash and keeps the app usable", async ({ page }) => {
  await page.goto("/#s=!!!");
  await expect(page.getByRole("heading", { name: /Three views/ })).toBeVisible();
  await expect(page.getByRole("status")).toContainText(/invalid characters|could not be decoded/i);
});
