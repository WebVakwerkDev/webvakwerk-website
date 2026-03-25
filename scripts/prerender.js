import { chromium } from "@playwright/test";
import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

const routes = ["/", "/aanvraag", "/voorwaarden", "/privacy"];

async function prerender() {
  console.log("[prerender] Starting Vite preview server...");

  const server = await createServer({
    root: path.resolve(__dirname, ".."),
    server: { port: 4567 },
    preview: { port: 4567 },
  });

  await server.listen();
  const baseUrl = "http://localhost:4567";

  // Use preview server for built files
  const { createServer: createStaticServer } = await import("http");
  const express = (await import("express")).default;
  const app = express();
  app.use(express.static(distDir, { index: false }));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  const staticServer = createStaticServer(app);
  await new Promise((resolve) => staticServer.listen(4568, resolve));

  console.log("[prerender] Launching browser...");
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const route of routes) {
    console.log(`[prerender] Rendering ${route}...`);
    const page = await context.newPage();
    await page.goto(`http://localhost:4568${route}`, {
      waitUntil: "networkidle",
    });

    // Wait for React to render
    await page.waitForSelector("#root > *", { timeout: 10000 });

    const html = await page.content();

    // Determine output path
    const filePath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.slice(1), "index.html");

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html, "utf-8");
    console.log(`[prerender] Saved ${filePath}`);
    await page.close();
  }

  await browser.close();
  staticServer.close();
  await server.close();
  console.log("[prerender] Done!");
}

prerender().catch((error) => {
  console.error("[prerender] Failed:", error);
  process.exit(1);
});
