const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["free", "pro", "docs", "web", "build", "deps"],
    ],
  },
};

export default config;
