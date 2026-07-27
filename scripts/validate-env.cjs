#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REQUIRED = [
  { key: 'STRIPE_SECRET_KEY', desc: 'Stripe secret key for payment processing (starts with sk_test_ or sk_live_)', optional: true },
  { key: 'VITE_APP_URL', desc: 'Your deployed application URL (no trailing slash)', optional: false },
  { key: 'GITHUB_TOKEN', desc: 'GitHub personal access token to avoid unauthenticated API rate limits', optional: true },
];

const EXAMPLE = path.join(__dirname, '..', '.env.example');
const ENV_LOCAL = path.join(__dirname, '..', '.env.local');

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    vars[key] = value;
  }
  return vars;
}

function main() {
  const exampleVars = loadEnv(EXAMPLE);
  const localVars = loadEnv(ENV_LOCAL);
  const merged = { ...exampleVars, ...localVars };

  const missing = [];
  const placeholder = [];

  for (const { key, desc, optional } of REQUIRED) {
    const value = merged[key];
    if (!value) {
      if (!optional) {
        missing.push({ key, desc });
      }
      continue;
    }
    if (value.includes('YOUR_') || value.includes('YOUR_KEY') || value.includes('YOUR_TOKEN')) {
      placeholder.push({ key, desc });
    }
  }

  if (placeholder.length > 0) {
    console.warn('\n⚠️  The following variables are set to placeholder values — replace them before deploying:');
    for (const { key, desc } of placeholder) {
      console.warn(`  ${key}: ${desc}`);
    }
  }

  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    for (const { key, desc } of missing) {
      console.error(`  ${key}: ${desc}`);
    }
    console.error('\nCopy .env.example to .env.local and fill in the values.');
    process.exit(1);
  }

  console.log('✅ All required environment variables are present.');
}

main();