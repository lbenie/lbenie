/**
 * Generates CV PDFs from the built resume pages using Puppeteer.
 * Run after `astro build`. Saves PDFs to dist/cv/.
 */

import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(DIST, 'cv');
const PORT = 4322;
const BASE_URL = `http://localhost:${PORT}`;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const CVS = [
  { url: `${BASE_URL}/en/resume/`, filename: 'Lucien-Benie-CV-EN.pdf' },
  { url: `${BASE_URL}/fr/resume/`, filename: 'Lucien-Benie-CV-FR.pdf' },
];

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath.endsWith('/')) urlPath += 'index.html';

      const filePath = join(DIST, urlPath);

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const mime = MIME[extname(filePath)] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function generatePDFs() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log('Starting static file server...');
  const server = await startServer();
  console.log(`Server running on port ${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const { url, filename } of CVS) {
      console.log(`Generating ${filename}...`);
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: join(OUT_DIR, filename),
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      });
      await page.close();
      console.log(`  ✓ ${filename}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('PDFs saved to dist/cv/');
}

generatePDFs().catch((err) => {
  console.error('Failed to generate CVs:', err);
  process.exit(1);
});
