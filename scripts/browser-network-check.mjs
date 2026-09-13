import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const playwrightPath = process.env.PLAYWRIGHT_PATH;
const chromiumPath = process.env.CHROMIUM_PATH;
if (!playwrightPath || !chromiumPath) {
  throw new Error('Set PLAYWRIGHT_PATH and CHROMIUM_PATH to run this optional release gate.');
}

const { chromium } = await import(pathToFileURL(resolve(playwrightPath)).href);
const port = 41739;
const server = spawn('python3', ['-m', 'http.server', String(port), '--directory', 'dist'], {
  stdio: ['ignore', 'ignore', 'inherit'],
});

const delay = ms => new Promise(resolveDelay => setTimeout(resolveDelay, ms));
let browser;
try {
  await delay(500);
  browser = await chromium.launch({ executablePath: chromiumPath, headless: true });
  const page = await browser.newPage({ acceptDownloads: true });
  const unexpectedRequests = [];
  let loaded = false;
  page.on('request', request => {
    if (!loaded) return;
    const url = new URL(request.url());
    const allowedWorkerAsset = url.origin === `http://127.0.0.1:${port}`
      && request.method() === 'GET'
      && ['/worker.js', '/core.js'].includes(url.pathname);
    if (!allowedWorkerAsset) unexpectedRequests.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
  loaded = true;
  await page.setInputFiles('#files', ['tests/fixtures/gsc.csv', 'tests/fixtures/bing.csv']);
  await page.click('#run');
  await page.waitForFunction(() => document.querySelector('#status')?.textContent.startsWith('Done:'), null, { timeout: 60_000 });
  for (const selector of ['#export-csv', '#export-json', '#export-md']) {
    const download = page.waitForEvent('download');
    await page.click(selector);
    await download;
  }
  await delay(1_200);

  if (unexpectedRequests.length) {
    throw new Error(`Unexpected post-load requests:\n${unexpectedRequests.join('\n')}`);
  }
  console.log('Browser privacy gate: PASS (0 external or unapproved requests during import, analysis, and exports).');
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
