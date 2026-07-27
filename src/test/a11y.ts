import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

async function main() {
  const url = process.env.A11Y_URL || 'http://localhost:4173';
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  const results = await new AxeBuilder({ page }).analyze();

  if (results.violations.length > 0) {
    console.error(`\n  axe found ${results.violations.length} violation(s):\n`);
    for (const v of results.violations) {
      console.error(`  [${v.id}] ${v.impact} impact - ${v.description}`);
      console.error(`  help: ${v.helpUrl}`);
      for (const n of v.nodes.slice(0, 3)) {
        console.error(`  - ${n.target.join(' > ')}  ${n.failureSummary?.split('\n')[0] ?? ''}`);
      }
      if (v.nodes.length > 3) console.error(`  ...and ${v.nodes.length - 3} more node(s)`);
    }
    console.error(`\n`);
    await browser.close();
    process.exit(1);
  }

  console.log(`  axe passed — ${results.passes.length} check(s) OK, 0 violations\n`);
  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
