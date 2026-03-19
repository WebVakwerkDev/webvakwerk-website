import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const port = Number(process.env.PORT || 8080);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

async function serveStaticFile(req, res, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(distDir, normalizedPath);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    let finalPath = filePath;
    let fileStats = await stat(finalPath);

    if (fileStats.isDirectory()) {
      finalPath = path.join(finalPath, "index.html");
      fileStats = await stat(finalPath);
    }

    const baseName = path.basename(finalPath).toLowerCase();
    const isFaviconAsset =
      baseName === "favicon.ico" ||
      baseName.startsWith("favicon-") ||
      baseName === "apple-touch-icon.png";

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(finalPath)] || "application/octet-stream",
      "Content-Length": fileStats.size,
      ...(isFaviconAsset ? { "Cache-Control": "no-cache, must-revalidate" } : {}),
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    createReadStream(finalPath).pipe(res);
  } catch {
    const hasExtension = path.extname(normalizedPath) !== "";
    const fallbackPath = path.join(distDir, "index.html");

    if (!hasExtension && existsSync(fallbackPath)) {
      const html = await readFile(fallbackPath);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
      });
      res.end(req.method === "HEAD" ? "" : html);
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" || req.method === "HEAD") {
    if (!existsSync(distDir)) {
      res.writeHead(404);
      res.end("Frontend build not found.");
      return;
    }

    return serveStaticFile(req, res, url.pathname);
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});
