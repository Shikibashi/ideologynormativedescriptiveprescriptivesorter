import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "test-results/explorer";
const ROUTES = [{ name: "intro", url: "/" }];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const route of ROUTES) {
  test(`explore ${route.name}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: { url: string; status: number }[] = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) failedRequests.push({ url: response.url(), status: response.status() }); });

    await page.goto(route.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const screenshot = path.join(OUT_DIR, `${route.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    const accessibilityApi = (page as Page & { accessibility?: { snapshot: () => Promise<unknown> } }).accessibility;
    const snapshot = accessibilityApi ? await accessibilityApi.snapshot() : null;
    fs.writeFileSync(path.join(OUT_DIR, `${route.name}.snapshot.json`), JSON.stringify(snapshot, null, 2));
    fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify([{ name: route.name, url: route.url, consoleErrors, pageErrors, failedRequests, screenshot }], null, 2));

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
    await expect(page.getByRole("heading", { name: /Three views/ })).toBeVisible();
  });
}
