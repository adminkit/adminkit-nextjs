import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import pages from "../src/data/pages.json" with { type: "json" };

// Every page loads without errors and has no serious or critical WCAG 2.2 AA violations,
// in light and dark mode

const colorModes = ["light", "dark"] as const;

// Google's own map controls are the one known exception
const exclude: Record<string, string[]> = {
  "/maps-google": ["iframe"],
};

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  return errors;
};

for (const { path, title } of pages) {
  for (const mode of colorModes) {
    test(`${path} (${mode})`, async ({ page }) => {
      const errors = collectErrors(page);

      // The stored color mode
      await page.addInitScript((colorMode) => {
        localStorage.setItem("adminkit_config_colorMode", colorMode);
      }, mode);

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("data-bs-theme", mode);
      await expect(page.locator("h1").first()).toBeVisible();
      if (path !== "/") {
        await expect(page).toHaveTitle(new RegExp(`^${title}`));
      }

      // Let the plugins draw, and show the cards that only fade in once they are scrolled
      // into view, which axe would otherwise measure half transparent
      await page.waitForLoadState("networkidle");
      await page.evaluate(() =>
        document.documentElement.classList.remove("js-reveal")
      );
      await page.waitForTimeout(1000);

      let axe = new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
      ]);
      for (const selector of exclude[path] ?? []) {
        axe = axe.exclude(selector);
      }
      const { violations } = await axe.analyze();
      const serious = violations
        .filter(({ impact }) => impact === "serious" || impact === "critical")
        .map(
          ({ id, help, nodes }) =>
            `${id}: ${help} (${nodes.map((node) => node.target.join(" ")).join(", ")})`
        );

      expect(serious, "serious or critical axe violations").toEqual([]);
      expect(errors, "console errors").toEqual([]);
    });
  }
}
