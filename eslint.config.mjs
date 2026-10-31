import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Static export: images are plain <img> elements with width and height, as in the
      // HTML template (next/image needs an image server or a loader)
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "public/**",
    "test-results/**",
    "playwright-report/**",
    "next-env.d.ts",
  ]),
]);
