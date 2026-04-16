import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const svgContent = readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8');
const svgBase64 = Buffer.from(svgContent).toString('base64');

const browser = await chromium.launch();
const page = await browser.newPage();

async function renderSvgAt(size, outputPath) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; }
  body { width: ${size}px; height: ${size}px; overflow: hidden; }
  img { display: block; width: ${size}px; height: ${size}px; }
</style></head>
<body><img src="data:image/svg+xml;base64,${svgBase64}" /></body></html>`);
  await page.screenshot({
    path: outputPath,
    clip: { x: 0, y: 0, width: size, height: size },
    omitBackground: true,
  });
  console.log('Generated', path.basename(outputPath));
}

await renderSvgAt(32, path.join(publicDir, 'favicon-32x32.png'));
await renderSvgAt(48, path.join(publicDir, 'favicon-48x48.png'));
await renderSvgAt(180, path.join(publicDir, 'apple-touch-icon.png'));

// OG image 1200x630
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #f8f4ef;
    display: flex; align-items: center; justify-content: center;
    font-family: system-ui, sans-serif;
  }
  .card { text-align: center; }
  h1 { font-size: 80px; font-weight: 900; color: #1a1005; letter-spacing: -3px; line-height: 1; margin: 28px 0 16px; }
  p { font-size: 30px; color: #e76c36; font-weight: 700; }
</style></head>
<body>
  <div class="card">
    <svg viewBox="0 0 64 64" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="13" fill="#e76c36"/>
      <polyline points="12,18 22,46 32,28 42,46 52,18" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1>Webvakwerk</h1>
    <p>Website laten maken op maat</p>
  </div>
</body></html>`);
await page.screenshot({
  path: path.join(publicDir, 'og-image.png'),
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
console.log('Generated og-image.png');

await browser.close();
console.log('All done!');
