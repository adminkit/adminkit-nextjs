// Serves the static export in out/ like Vercel does with cleanUrls: /ui-buttons serves
// out/ui-buttons.html, unknown paths get out/404.html.
//
//   node scripts/serve.mjs [port]   (default 3000; PORT works too)
//
// BASE_PATH builds keep their base path: /admin/ui-buttons serves the same file.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../out");
const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);
const basePath = process.env.BASE_PATH ?? "";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const isFile = (file) => existsSync(file) && statSync(file).isFile();

const find = (pathname) => {
  const path = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    ""
  );
  const file = join(root, path);
  if (!file.startsWith(root)) {
    return null;
  }
  for (const candidate of [file, `${file}.html`, join(file, "index.html")]) {
    if (isFile(candidate)) {
      return candidate;
    }
  }
  // Prefetches ask for __next.<segment>.<segment>.__PAGE__.txt; on Windows, next build
  // writes that file as __next.<segment>/<segment>/__PAGE__.txt
  const name = path.split(/[/\\]/).at(-1) ?? "";
  if (name.startsWith("__next.") && name.endsWith(".txt")) {
    const [first, ...rest] = name
      .slice("__next.".length, -".txt".length)
      .split(".");
    const nested = join(file, "..", `__next.${first}`, ...rest) + ".txt";
    if (isFile(nested)) {
      return nested;
    }
  }
  return null;
};

if (!existsSync(root)) {
  console.error("out/ does not exist; run npm run build first");
  process.exit(1);
}

createServer((request, response) => {
  let { pathname } = new URL(request.url ?? "/", "http://localhost");
  if (basePath && pathname.startsWith(basePath)) {
    pathname = pathname.slice(basePath.length) || "/";
  }
  const file = find(pathname);
  const status = file ? 200 : 404;
  const served = file ?? join(root, "404.html");

  response.writeHead(status, {
    "Content-Type": types[extname(served)] ?? "application/octet-stream",
  });
  createReadStream(served).pipe(response);
}).listen(port, () => {
  console.log(`Serving out/ on http://localhost:${port}${basePath}/`);
});
