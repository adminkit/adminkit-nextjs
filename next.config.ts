import path from "node:path";
import type { NextConfig } from "next";

// BASE_PATH serves the app from a sub-path, such as /admin
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML in out/, one file per page, no server needed
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    loadPaths: [path.join(import.meta.dirname, "node_modules")],
    // Our own SCSS only triggers "import"; the rest comes from Bootstrap 5.3
    silenceDeprecations: [
      // @import: Bootstrap 5.3 has no @use entry point, so the whole tree still uses it
      "import",
      // red(), green(), blue() in Bootstrap's color-contrast()
      "color-functions",
      // mix(), map-get() and friends without a sass: module prefix in Bootstrap
      "global-builtin",
      // Sass if() in Bootstrap's mixins
      "if-function",
    ],
  },
};

export default nextConfig;
