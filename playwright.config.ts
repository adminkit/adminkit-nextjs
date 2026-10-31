import { defineConfig, devices } from "@playwright/test";

// Tests the static export in out/: run npm run build first
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3988",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "node scripts/serve.mjs 3988",
    url: "http://localhost:3988",
    reuseExistingServer: !process.env.CI,
  },
});
