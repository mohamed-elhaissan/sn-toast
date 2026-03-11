import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const styleSource = readFileSync(new URL('../src/lib/inject-style.ts', import.meta.url), 'utf8');

// --- SSR safety ---

test('injectStyles: guards against SSR (no document)', () => {
  assert.match(styleSource, /typeof document === ['"]undefined['"]/);
});

// --- Idempotent injection ---

test('injectStyles: prevents duplicate style injection', () => {
  assert.match(styleSource, /document\.getElementById\(styleID\)/);
  assert.match(styleSource, /const styleID = "buzzly-toast-inject-styles"/);
});

// --- No external font CDN ---

test('injectStyles: does not load fonts from external CDN', () => {
  assert.doesNotMatch(styleSource, /@import\s+url\(/);
  assert.doesNotMatch(styleSource, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(styleSource, /fonts\.googleapis\.com/);
});

// --- Contains all required CSS classes ---

test('injectStyles: contains toast-container with fixed positioning', () => {
  assert.match(styleSource, /\.toast-container\s*\{/);
  assert.match(styleSource, /position:\s*fixed/);
  assert.match(styleSource, /z-index:\s*9999/);
});

test('injectStyles: uses fixed width with responsive max-width', () => {
  assert.match(styleSource, /width:\s*360px/);
  assert.match(styleSource, /max-width:\s*calc\(100vw\s*-\s*2rem\)/);
});

test('injectStyles: contains all position classes', () => {
  for (const pos of ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center']) {
    assert.match(styleSource, new RegExp(`\\.${pos}\\s*\\{`), `Missing position class ".${pos}"`);
  }
});

test('injectStyles: contains all toast type classes', () => {
  for (const type of ['success-toast', 'error-toast', 'warning-toast', 'info-toast', 'default-toast']) {
    assert.match(styleSource, new RegExp(`\\.${type}\\s*\\{`), `Missing toast class ".${type}"`);
  }
});

// --- Close button styles ---

test('injectStyles: contains close button styles', () => {
  assert.match(styleSource, /\.toast-close\s*\{/);
  assert.match(styleSource, /\.toast-close:hover\s*\{/);
  assert.match(styleSource, /cursor:\s*pointer/);
});

// --- CSS variables ---

test('injectStyles: defines CSS variables for all toast types', () => {
  for (const prefix of ['success', 'warning', 'error', 'info']) {
    assert.match(styleSource, new RegExp(`--${prefix}-background:`), `Missing CSS var --${prefix}-background`);
    assert.match(styleSource, new RegExp(`--${prefix}-border-color:`), `Missing CSS var --${prefix}-border-color`);
    assert.match(styleSource, new RegExp(`--${prefix}-text-color:`), `Missing CSS var --${prefix}-text-color`);
  }
});
