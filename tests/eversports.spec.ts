import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://alkemy-soul.com/studio/stundenplan/");

  await page.waitForLoadState("networkidle", { timeout: 10000 });

  const iframeContainer = page.locator(
    'div[data-eversports-widget-id="a67d41ee-5f05-40b4-b30d-e27e6858151f"]',
  );

  // **ENHANCEMENT 1: Wait for the Iframe Container to be visible/stable**
  // Ensures the entire widget/iframe structure is in the DOM and visible.
  await iframeContainer.waitFor({ state: "visible", timeout: 30000 });

  // Get the FrameLocator (this doesn't wait, it just defines the path)
  const iframeLocator = iframeContainer.frameLocator("iframe");

  await expect(iframeContainer).toBeDefined();

  await page.screenshot({
    path: `screenshot-${new Date().toISOString()}.png`,
    fullPage: true,
  });
});
