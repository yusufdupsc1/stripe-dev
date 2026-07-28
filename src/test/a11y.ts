import { chromium } from 'playwright';

async function main() {
  const url = process.env.A11Y_URL || 'http://localhost:4173';
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.12.1/axe.min.js' });
  await page.waitForTimeout(500);

  const results = await page.evaluate(() => {
    return (window as any).axe.run(document, undefined).catch((err: Error) => ({ error: err.message }));
  });

  await context.close();
  await browser.close();

  if ((results as any).error) {
    console.error(`\n  axe error: ${(results as any).error}\n`);
    process.exit(1);
  }

  const { violations = [], passes = [] } = results;

  if (violations.length > 0) {
    console.error(`\n  axe found ${violations.length} violation(s):\n`);
    for (const v of violations) {
      console.error(`  [${v.id}] ${v.impact} impact - ${v.description}`);
      console.error(`  help: ${v.helpUrl}`);
      for (const n of v.nodes.slice(0, 3)) {
        console.error(`  - ${n.target.join(' > ')}`);
      }
      if (v.nodes.length > 3) console.error(`  ...and ${v.nodes.length - 3} more node(s)`);
    }
    console.error(`\n`);
    process.exit(1);
  }

  console.log(`  axe passed — ${passes.length} check(s) OK, 0 violations\n`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
