#!/usr/bin/env node

/**
 * WCAG 2.x relative luminance and contrast ratio checker.
 *
 * Formula:
 *   sRGB channel -> linear:
 *     if c <= 0.03928: c / 12.92
 *     else: ((c + 0.055) / 1.055) ^ 2.4
 *   L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 *   ratio = (L_lighter + 0.05) / (L_darker + 0.05)
 *
 * Requirements:
 *   Normal text / UI components: >= 4.5:1
 *   Large text / UI components: >= 3:1
 */

const fs = require('fs');
const path = require('path');

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance(r, g, b) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function contrastRatio(a, b) {
  const aL = luminance(a.r, a.g, a.b);
  const bL = luminance(b.r, b.g, b.b);
  const lighter = Math.max(aL, bL);
  const darker = Math.min(aL, bL);
  return (lighter + 0.05) / (darker + 0.05);
}

// Token definitions from src/index.css (as built)
const TOKENS = {
  '--c-neutral-950':   '#020617',
  '--c-neutral-900':   '#0f172a',
  '--c-neutral-800':   '#1e293b',
  '--c-neutral-400':   '#94a3b8',
  '--c-neutral-300':   '#cbd5e1',
  '--c-neutral-50':    '#f8fafc',
  '--c-violet-600':    '#7c3aed',
  '--c-cyan-500':      '#06b6d4',
  '--c-text':          '#e4e4f0',
  '--c-text-muted':    '#94a3b8',
  '--c-bg':            '#020617',
  '--c-surface':       '#0f172a',
  '--c-accent':        '#7c3aed',
  '--c-accent2':       '#06b6d4',
  '--c-proof':         '#22c55e',
  '--c-warning':       '#f59e0b',
  '--c-error':         '#ef4444',
  '--c-border':        'rgba(255,255,255,0.07)', // handled below
};

function expandRgba(rgba) {
  const m = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] };
}

function colorToRgb(name) {
  const val = TOKENS[name];
  if (!val) {
    console.error(`Missing token: ${name}`);
    process.exit(1);
  }
  if (val.startsWith('#')) return hexToRgb(val);
  const rgba = expandRgba(val);
  if (!rgba) {
    console.error(`Unsupported token format: ${name} = ${val}`);
    process.exit(1);
  }
  // For contrast, alpha-blended borders are usually not text foregrounds.
  // We still include them as a diagnostic but skip them from pass/fail.
  return { r: rgba.r, g: rgba.g, b: rgba.b, alpha: rgba.a, note: 'rgba' };
}

// Real pairings used in the app
const PAIRS = [
  // Normal text
  { fg: '--c-text', bg: '--c-bg', label: 'body text on bg', min: 4.5 },
  { fg: '--c-text', bg: '--c-surface', label: 'body text on surface', min: 4.5 },
  { fg: '--c-text-muted', bg: '--c-bg', label: 'muted text on bg', min: 4.5 },
  { fg: '--c-text-muted', bg: '--c-surface', label: 'muted text on surface', min: 4.5 },
  // Accent on surfaces
  { fg: '--c-accent', bg: '--c-bg', label: 'accent on bg', min: 3 },
  { fg: '--c-accent2', bg: '--c-bg', label: 'accent2 on bg', min: 3 },
  // Success/warning/error on surfaces
  { fg: '--c-proof', bg: '--c-bg', label: 'proof on bg', min: 3 },
  { fg: '--c-warning', bg: '--c-bg', label: 'warning on bg', min: 3 },
  { fg: '--c-error', bg: '--c-bg', label: 'error on bg', min: 3 },
  // Practical button/UI checks
  { fg: '--c-text', bg: '--c-accent', label: 'text on accent button', min: 3 },
];

// Light theme overrides for check
const LIGHT_TOKENS = {
  '--c-bg': '#f3f4f6',
  '--c-surface': '#ffffff',
  '--c-text': '#111827',
  '--c-text-muted': '#6b7280',
};

function checkTheme(name, tokenMap) {
  const merged = { ...TOKENS, ...tokenMap };
  console.log(`\n=== ${name} ===`);
  let failed = 0;
  for (const pair of PAIRS) {
    const fg = merged[pair.fg];
    const bg = merged[pair.bg];
    if (!fg || !bg) {
      console.error(`Missing token for pair ${pair.label}`);
      failed++;
      continue;
    }
    const fgRgb = colorToRgb(pair.fg);
    const bgRgb = colorToRgb(pair.bg);
    if (fgRgb.note === 'rgba' || bgRgb.note === 'rgba') {
      console.log(`  ${pair.label}: skipped (border/rgba token)`);
      continue;
    }
    const ratio = contrastRatio(fgRgb, bgRgb);
    const pass = ratio >= pair.min;
    if (!pass) failed++;
    console.log(`  ${pair.label}: ${ratio.toFixed(2)}:1 (need >=${pair.min}:1) ${pass ? 'PASS' : 'FAIL'}`);
  }
  return failed;
}

// Scan index.css for raw hex/rgba outside :root blocks
function scanRawValues(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const lines = css.split('\n');
  let raw = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*:\s*root\s*\{/.test(line) || /^\s*\[data-theme="light"\]\s*\{/.test(line)) {
      // skip token blocks
      continue;
    }
    const hex = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    const rgba = line.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)/g);
    if (hex) raw.push({ line: i + 1, hex });
    if (rgba) raw.push({ line: i + 1, rgba });
  }
  return raw;
}

const darkFail = checkTheme('Dark theme', {});
const lightFail = checkTheme('Light theme', LIGHT_TOKENS);

console.log('\n=== Raw value scan in index.css (outside :root blocks) ===');
const raw = scanRawValues(path.join(__dirname, '..', 'src', 'index.css'));
if (raw.length === 0) {
  console.log('No raw hex/rgba found outside token blocks.');
} else {
  for (const item of raw) {
    if (item.hex) console.log(`  line ${item.line}: ${item.hex}`);
    if (item.rgba) console.log(`  line ${item.line}: ${item.rgba}`);
  }
}

console.log('\n=== Summary ===');
const total = darkFail + lightFail;
if (total > 0) {
  console.error(`FAIL: ${total} contrast pairing(s) below threshold.`);
  process.exit(1);
} else {
  console.log('PASS: all checked pairings meet the stated thresholds.');
  process.exit(0);
}
