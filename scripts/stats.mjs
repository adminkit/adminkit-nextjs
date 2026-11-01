// Counts what this template ships and writes src/data/stats.json, the single source for
// every page, plugin and icon count in the app and the README.
//
//   node scripts/stats.mjs                 write src/data/stats.json and the README block
//   node scripts/stats.mjs --check         fail when either is stale or the data is invalid
//   node scripts/stats.mjs --sync --pro <checkout>
//                                          copy <checkout>/src/data/stats.json to
//                                          src/data/editions/pro.json, then write as above
//
// It reads only this repository: AdminKit PRO's numbers come from its committed snapshot in
// src/data/editions/, refreshed with --sync from a checkout of AdminKit PRO for Next.js.
//
// Sources:
// - pages: src/data/pages.json (`path`, `title`, `description`, `category`: dashboard),
//   which must list exactly the routes that have a page.tsx in src/app. A description can
//   hold counts as {icons.lucide} or {editions.pro.pages.count}.
// - plugins: src/data/plugins.json; every dependency is a listed plugin or in `notPlugins`
// - icons: src/data/icons-lucide.json, and src/data/icons-fa-*.json where a Font Awesome
//   icons page uses them
// - color modes and schemes: src/data/appearance.json
// - comparison: src/data/comparison.json, this edition's column; the snapshots add theirs
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import {
  basename,
  dirname,
  extname,
  join,
  relative,
  resolve,
  sep,
} from "node:path";
import * as prettier from "prettier";

const root = resolve(import.meta.dirname, "..");
const data = join(root, "src/data");
const files = {
  stats: join(data, "stats.json"),
  pages: join(data, "pages.json"),
  plugins: join(data, "plugins.json"),
  appearance: join(data, "appearance.json"),
  comparison: join(data, "comparison.json"),
  editions: join(data, "editions"),
  readme: join(root, "README.md"),
};
const markers = ["<!-- stats:start -->", "<!-- stats:end -->"];
const categories = ["dashboard"];

const display = (file) => relative(root, file).split(sep).join("/");
const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const number = (value) => value.toLocaleString("en-US");
const list = (items) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

const format = async (source, file) =>
  prettier.format(source, {
    ...(await prettier.resolveConfig(file)),
    filepath: file,
  });

const resolveStat = (stats, path) =>
  path.split(".").reduce((value, key) => value?.[key], stats);

// The routes of src/app: every directory with a page.tsx, without route groups ((auth))
const readRoutes = async () => {
  const app = join(root, "src/app");
  const entries = await readdir(app, { recursive: true });
  return entries
    .map((entry) => entry.split(sep).join("/"))
    .filter((entry) => entry === "page.tsx" || entry.endsWith("/page.tsx"))
    .map(
      (entry) =>
        "/" +
        entry
          .split("/")
          .slice(0, -1)
          .filter((segment) => !/^\(.+\)$/.test(segment))
          .join("/")
    )
    .sort();
};

const readPages = async (routes, errors) => {
  const pages = await readJson(files.pages);
  const listed = new Set(pages.map((page) => page.path));

  for (const page of pages) {
    if (!page.title) {
      errors.push(`src/data/pages.json: ${page.path} has no title`);
    }
    if (!page.description) {
      errors.push(`src/data/pages.json: ${page.path} has no description`);
    }
    for (const name of page.category ?? []) {
      if (!categories.includes(name)) {
        errors.push(
          `src/data/pages.json: ${page.path} has an unknown category "${name}" (use ${categories.join(" or ")})`
        );
      }
    }
    if (!routes.includes(page.path)) {
      errors.push(
        `src/data/pages.json: ${page.path} has no page.tsx in src/app`
      );
    }
  }
  for (const route of routes) {
    if (!listed.has(route)) {
      errors.push(`src/app: add the ${route} page to src/data/pages.json`);
    }
  }

  return pages;
};

// Counts in descriptions ({icons.lucide}) must resolve to a number
const checkDescriptions = (pages, stats, editions, errors) => {
  const source = { ...stats, editions };
  for (const { path, description = "" } of pages) {
    for (const [, stat] of description.matchAll(/\{([\w.]+)\}/g)) {
      if (typeof resolveStat(source, stat) !== "number") {
        errors.push(
          `src/data/pages.json: the description of ${path} reads {${stat}}, which is not a number in the stats`
        );
      }
    }
  }
};

const readPlugins = async (errors) => {
  const pkg = await readJson(join(root, "package.json"));
  const dependencies = Object.keys(pkg.dependencies ?? {});
  const { plugins, notPlugins } = await readJson(files.plugins);
  const listed = new Set(plugins.map((plugin) => plugin.package));

  for (const plugin of plugins) {
    if (!dependencies.includes(plugin.package)) {
      errors.push(
        `src/data/plugins.json: ${plugin.name} (${plugin.package}) is not in dependencies`
      );
      continue;
    }
    const installed = await readJson(
      join(root, "node_modules", plugin.package, "package.json")
    );
    if (installed.license !== plugin.license) {
      errors.push(
        `src/data/plugins.json: ${plugin.package} is licensed "${installed.license}", not "${plugin.license}"`
      );
    }
  }
  for (const dependency of dependencies) {
    if (!listed.has(dependency) && !(dependency in notPlugins)) {
      errors.push(
        `src/data/plugins.json: add the ${dependency} dependency to plugins, or to notPlugins with the reason it is not a plugin`
      );
    }
  }
  for (const dependency of Object.keys(notPlugins)) {
    if (!dependencies.includes(dependency)) {
      errors.push(
        `src/data/plugins.json: notPlugins lists ${dependency}, which is not a dependency`
      );
    }
  }

  return plugins.map(({ name, package: packageName, url, license }) => ({
    name,
    package: packageName,
    url,
    license,
  }));
};

const readIcons = async (routes) => {
  const lucide = (await readJson(join(data, "icons-lucide.json"))).length;
  const icons = { total: lucide, lucide };

  // Font Awesome counts only where a page shows the icons
  if (routes.includes("/icons-font-awesome")) {
    const count = async (style) =>
      (await readJson(join(data, `icons-fa-${style}.json`))).length;
    const fontAwesome = {
      solid: await count("solid"),
      regular: await count("regular"),
      brands: await count("brand"),
    };
    fontAwesome.total =
      fontAwesome.solid + fontAwesome.regular + fontAwesome.brands;
    icons.fontAwesome = fontAwesome;
    icons.total += fontAwesome.total;
  }

  return icons;
};

export const readEditions = async () => {
  if (!existsSync(files.editions)) {
    return {};
  }
  const names = (await readdir(files.editions))
    .filter((file) => extname(file) === ".json")
    .sort();
  return Object.fromEntries(
    await Promise.all(
      names.map(async (file) => [
        basename(file, ".json"),
        await readJson(join(files.editions, file)),
      ])
    )
  );
};

// comparison.json holds this edition's column: per row a stat path
// ({ "stat": "pages.count" }) or a literal. The other editions' columns come from their
// snapshots, matched by row id.
const readComparison = async (own, editions, errors) => {
  const rows = await readJson(files.comparison);
  const ids = new Set(rows.map((row) => row.id));

  const comparison = rows.map(({ id, label, value }) => {
    const row = { id, label };
    if (value === undefined) {
      errors.push(`src/data/comparison.json: ${id} has no value`);
    } else if (value !== null && typeof value === "object") {
      row[own.edition] = resolveStat(own, value.stat);
      if (typeof row[own.edition] !== "number") {
        errors.push(
          `src/data/comparison.json: ${id} reads ${value.stat}, which is not a number in the stats`
        );
      }
    } else {
      row[own.edition] = value;
    }

    for (const [edition, snapshot] of Object.entries(editions)) {
      const theirs = snapshot.comparison?.find((other) => other.id === id);
      if (theirs === undefined || !(edition in theirs)) {
        errors.push(
          `src/data/editions/${edition}.json has no ${id} comparison row; add it to the ${edition} src/data/comparison.json, then run node scripts/stats.mjs --sync --pro <checkout>`
        );
        continue;
      }
      row[edition] = theirs[edition];
    }
    return row;
  });

  for (const [edition, snapshot] of Object.entries(editions)) {
    for (const { id } of snapshot.comparison ?? []) {
      if (!ids.has(id)) {
        errors.push(
          `src/data/editions/${edition}.json has a ${id} comparison row that src/data/comparison.json lacks`
        );
      }
    }
  }
  return comparison;
};

export const generateStats = async () => {
  const errors = [];
  const pkg = await readJson(join(root, "package.json"));
  const routes = await readRoutes();
  const pages = await readPages(routes, errors);
  const plugins = await readPlugins(errors);
  const appearance = await readJson(files.appearance);
  const pageList = (filter) => {
    const matching = pages
      .filter(filter)
      .map(({ path, title }) => ({ path, title }));
    return { count: matching.length, list: matching };
  };

  const stats = {
    edition: pkg.adminkit.edition,
    framework: pkg.adminkit.framework,
    version: pkg.version,
    pages: pageList(() => true),
    dashboards: pageList((page) => page.category?.includes("dashboard")),
    plugins: { count: plugins.length, list: plugins },
    icons: await readIcons(routes),
    colorModes: {
      count: appearance.colorModes.length,
      list: appearance.colorModes,
    },
    colorSchemes: {
      count: appearance.colorSchemes.length,
      list: appearance.colorSchemes,
    },
  };

  const editions = await readEditions();
  for (const [edition, snapshot] of Object.entries(editions)) {
    if (snapshot.edition !== edition) {
      errors.push(
        `src/data/editions/${edition}.json holds the stats of "${snapshot.edition}"`
      );
    }
    if (snapshot.framework !== stats.framework) {
      errors.push(
        `src/data/editions/${edition}.json holds the stats of the ${snapshot.framework ?? "HTML"} edition, not ${stats.framework}`
      );
    }
  }
  stats.comparison = await readComparison(stats, editions, errors);
  checkDescriptions(pages, stats, editions, errors);

  return { stats, errors };
};

// The README block: the edition comparison where another edition's snapshot adds a column,
// a summary otherwise
const editionNames = { free: "AdminKit", pro: "AdminKit PRO" };
const editionLinks = { pro: "https://adminkit.io/pricing/" };

const renderValue = (value) => {
  if (typeof value === "number") return number(value);
  if (typeof value === "boolean") return value ? "✔" : "";
  return value;
};

const comparisonEditions = (stats) =>
  Object.keys(stats.comparison?.[0] ?? {}).filter((key) => key in editionNames);

const renderComparison = (stats) => {
  const editions = comparisonEditions(stats);
  const heading = editions.map((edition) =>
    editionLinks[edition]
      ? `[${editionNames[edition]}](${editionLinks[edition]})`
      : editionNames[edition]
  );
  return [
    `| | ${heading.join(" | ")} |`,
    `| - | ${editions.map(() => "-").join(" | ")} |`,
    ...stats.comparison.map(
      (row) =>
        `| ${row.label} | ${editions.map((edition) => renderValue(row[edition])).join(" | ")} |`
    ),
  ].join("\n");
};

const renderSummary = (stats) => {
  const titles = (pages) => list(pages.list.map((page) => page.title));
  const { icons } = stats;
  const iconSets = [`${number(icons.lucide)} Lucide`];
  if (icons.fontAwesome) {
    const fa = icons.fontAwesome;
    iconSets.push(
      `${number(fa.total)} Font Awesome (${number(fa.solid)} solid, ${number(fa.regular)} regular, ${number(fa.brands)} brands)`
    );
  }
  return [
    `- ${stats.pages.count} pages, ${stats.dashboards.count === 1 ? "one of them a dashboard" : `${stats.dashboards.count} of them dashboards`}: ${titles(stats.dashboards)}`,
    `- ${stats.plugins.count} plugins: ${list(stats.plugins.list.map((plugin) => `[${plugin.name}](${plugin.url})`))}`,
    `- ${number(icons.total)} icons: ${list(iconSets)}`,
    `- ${stats.colorModes.count} color modes: ${list(stats.colorModes.list)}, picked by hand or following the system, and ${stats.colorSchemes.count} sidebar color ${stats.colorSchemes.count === 1 ? "scheme" : "schemes"}`,
  ].join("\n");
};

const renderReadme = async (readme, stats, errors) => {
  const start = readme.indexOf(markers[0]);
  const end = readme.indexOf(markers[1]);
  if (start < 0 || end < start) {
    errors.push(`README.md: add the ${markers.join(" and ")} markers`);
    return readme;
  }
  const block =
    comparisonEditions(stats).length > 1
      ? renderComparison(stats)
      : renderSummary(stats);
  return format(
    `${readme.slice(0, start + markers[0].length)}\n\n${block}\n\n${readme.slice(end)}`,
    files.readme
  );
};

const render = async () => {
  const { stats, errors } = await generateStats();
  const json = await format(JSON.stringify(stats), files.stats);
  const readme = await renderReadme(
    await readFile(files.readme, "utf8"),
    stats,
    errors
  );
  return { stats, json, readme, errors };
};

const writeIfChanged = async (file, content) => {
  const current = existsSync(file) ? await readFile(file, "utf8") : null;
  if (current !== content) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, content);
    return true;
  }
  return false;
};

// --sync --<edition> <checkout>: snapshot another edition's committed stats
const sync = async (args) => {
  const pairs = [];
  for (let i = 0; i < args.length; i++) {
    const edition = args[i].match(/^--([a-z]+)$/)?.[1];
    if (edition && args[i + 1]) {
      pairs.push([edition, resolve(args[++i])]);
    }
  }
  if (!pairs.length) {
    throw new Error(
      "Name the checkout to read: node scripts/stats.mjs --sync --pro <checkout>"
    );
  }

  const { framework } = (await readJson(join(root, "package.json"))).adminkit;
  for (const [edition, checkout] of pairs) {
    const source = join(checkout, "src/data/stats.json");
    if (!existsSync(source)) {
      throw new Error(
        `${source} does not exist; is ${checkout} an AdminKit checkout with npm run stats?`
      );
    }
    const snapshot = await readJson(source);
    if (snapshot.edition !== edition) {
      throw new Error(
        `${source} holds the ${snapshot.edition} stats, not ${edition}`
      );
    }
    if (snapshot.framework !== framework) {
      throw new Error(
        `${source} holds the stats of the ${snapshot.framework ?? "HTML"} edition, not ${framework}`
      );
    }
    const pages = (await readJson(join(checkout, "src/data/pages.json")))
      .length;
    if (pages !== snapshot.pages.count) {
      throw new Error(
        `${source} counts ${snapshot.pages.count} pages but ${checkout} has ${pages}; run npm run stats there first`
      );
    }
    const target = join(files.editions, `${edition}.json`);
    const changed = await writeIfChanged(
      target,
      await format(JSON.stringify(snapshot), target)
    );
    console.log(
      `${display(target)} ${changed ? "updated" : "unchanged"} (${edition} ${snapshot.version})`
    );
  }
};

if (import.meta.main) {
  const args = process.argv.slice(2);
  try {
    if (args.includes("--sync")) {
      await sync(args.filter((arg) => arg !== "--sync"));
    }

    const { stats, json, readme, errors } = await render();
    if (errors.length) {
      console.error(errors.join("\n"));
      process.exit(1);
    }

    if (args.includes("--check")) {
      const stale = [];
      if (
        !existsSync(files.stats) ||
        (await readFile(files.stats, "utf8")) !== json
      ) {
        stale.push(display(files.stats));
      }
      if ((await readFile(files.readme, "utf8")) !== readme) {
        stale.push(`the ${markers[0]} block in README.md`);
      }
      if (stale.length) {
        console.error(`${stale.join(" and ")} out of date; run npm run stats`);
        process.exit(1);
      }
      console.log(
        `stats: ${stats.pages.count} pages, ${stats.plugins.count} plugins, ${number(stats.icons.total)} icons, up to date`
      );
    } else {
      for (const [file, content] of [
        [files.stats, json],
        [files.readme, readme],
      ]) {
        const changed = await writeIfChanged(file, content);
        console.log(`${display(file)} ${changed ? "updated" : "unchanged"}`);
      }
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
