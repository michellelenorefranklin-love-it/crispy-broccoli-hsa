const { chromium } = require('playwright');
const path = require('node:path');
(async () => {
const [,, htmlPath, pdfPath, mode] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const foot = `<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5pt;color:#6a6a6a;padding:0 0.7in;display:flex;justify-content:space-between;-webkit-print-color-adjust:exact"><span>The Agentic Board of Change Advisors · Operating Playbook</span><span class="pageNumber"></span></div>`;
await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: mode !== 'nofooter', headerTemplate: '<span></span>', footerTemplate: foot });
await browser.close();
})();
