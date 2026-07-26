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

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance(r, g, b) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
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

const TOKENS = {
  "--c-neutral-950":   "#020617",
  "--c-neutral-900":   "#0f172a",
  "--c-neutral-800":   "#1e293b",
  "--c-neutral-400":   "#94a3b8",
  "--c-neutral-300":   "#cbd5e1",
  "--c-neutral-50":    "#f8fafc",
  "--c-violet-600":    "#7c3aed",
  "--c-violet-400":    "#a78bfa",
  "--c-cyan-700":      "#0e7490",
  "--c-cyan-500":      "#06b6d4",
  "--c-text":          "#eaeaf8",
  "--c-text-muted":    "#94a3b8",
  "--c-bg":            "#020617",
  "--c-surface":       "#0f172a",
  "--c-accent":        "#7c3aed",
  "--c-accent2":       "#0e7490",
  "--c-proof":         "#22c55e",
  "--c-warning":       "#f59e0b",
  "--c-error":         "#ef4444",
  "--c-white":         "#ffffff",
};

const LIGHT_TOKENS = {
  "--c-bg":            "#f3f4f6",
  "--c-surface":       "#ffffff",
  "--c-text":          "#111827",
  "--c-text-muted":    "#4b5563",
};

const PAIRS = [
  { fg: "--c-text", bg: "--c-bg", label: "body text on bg (dark)", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-text", bg: "--c-surface", label: "body text on surface (dark)", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-text-muted", bg: "--c-bg", label: "muted text on bg (dark)", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-text-muted", bg: "--c-surface", label: "muted text on surface (dark)", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-white", bg: "--c-accent", label: "white text on accent button", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-white", bg: "--c-accent2", label: "white text on accent2 button", min: 4.5, type: "normal", theme: "dark" },
  { fg: "--c-text", bg: "--c-accent", label: "body text on accent bg (dark)", min: 3, type: "large", theme: "dark" },
  { fg: "--c-proof", bg: "--c-bg", label: "proof on bg (dark)", min: 3, type: "large", theme: "dark" },
  { fg: "--c-warning", bg: "--c-bg", label: "warning on bg (dark)", min: 3, type: "large", theme: "dark" },
  { fg: "--c-error", bg: "--c-bg", label: "error on bg (dark)", min: 3, type: "large", theme: "dark" },
  { fg: "--c-text", bg: "--c-bg", label: "body text on bg (light)", min: 4.5, type: "normal", theme: "light" },
  { fg: "--c-text", bg: "--c-surface", label: "body text on surface (light)", min: 4.5, type: "normal", theme: "light" },
  { fg: "--c-text-muted", bg: "--c-bg", label: "muted text on bg (light)", min: 4.5, type: "normal", theme: "light" },
  { fg: "--c-text-muted", bg: "--c-surface", label: "muted text on surface (light)", min: 4.5, type: "normal", theme: "light" },
];

function checkTheme(name, tokenMap) {
  const merged = { ...TOKENS, ...tokenMap };
  console.log(`\n=== ${name} ===`);
  let failed = 0;
  let passed = 0;
  for (const pair of PAIRS) {
    if (pair.theme && pair.theme !== name.toLowerCase().replace(" theme", "").trim()) continue;
    const fg = merged[pair.fg];
    const bg = merged[pair.bg];
    if (!fg || !bg) {
      console.error(`Missing token for pair ${pair.label}`);
      failed++;
      continue;
    }
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);
    const ratio = contrastRatio(fgRgb, bgRgb);
    const pass = ratio >= pair.min;
    if (pass) passed++; else failed++;
    console.log(`  ${pair.label}: ${ratio.toFixed(2)}:1 (need >=${pair.min}:1 ${pair.type}) ${pass ? "PASS" : "FAIL"}`);
  }
  return { passed, failed };
}

const dark = checkTheme("Dark theme", {});
const light = checkTheme("Light theme", LIGHT_TOKENS);

console.log("\n=== Summary ===");
const total = dark.failed + light.failed;
if (total > 0) {
  console.error(`FAIL: ${total} contrast pairing(s) below threshold.`);
  process.exit(1);
} else {
  console.log(`PASS: all ${dark.passed + light.passed} checked pairings meet the stated thresholds.`);
  process.exit(0);
}