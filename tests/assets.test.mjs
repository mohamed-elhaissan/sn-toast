import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const assetsSource = readFileSync(new URL('../src/lib/assets.tsx', import.meta.url), 'utf8');

// --- getType returns correct icons ---

test('getType: returns an icon for success, warning, error, info', () => {
  for (const type of ['success', 'warning', 'error', 'info']) {
    const pattern = new RegExp(`case "${type}":\\s*return ${type}Icon;`);
    assert.match(assetsSource, pattern, `Missing icon return for type "${type}"`);
  }
});

test('getType: returns null for unknown/normal type', () => {
  assert.match(assetsSource, /default:\s*return null;/);
});

// --- getBackgroundColor ---

test('getBackgroundColor: returns rich color class when richColor is true', () => {
  for (const [type, cls] of [
    ['success', 'success-toast'],
    ['warning', 'warning-toast'],
    ['error', 'error-toast'],
    ['info', 'info-toast'],
  ]) {
    const pattern = new RegExp(`case "${type}":\\s*return "${cls}";`);
    assert.match(assetsSource, pattern, `Missing rich color class for "${type}"`);
  }
});

test('getBackgroundColor: returns "default-toast" when richColor is false', () => {
  // The function should return "default-toast" at the end when richColor is falsy
  assert.match(assetsSource, /return "default-toast";\s*\};/);
});

test('getBackgroundColor: returns "default-toast" for unknown type even with richColor', () => {
  // Inside the richColor switch, default case returns "default-toast"
  assert.match(assetsSource, /if \(richColor\) \{[\s\S]*?default:\s*return "default-toast";/);
});

// --- getToastAnimation ---

test('getToastAnimation: uses negative y for top positions', () => {
  assert.match(assetsSource, /position\.startsWith\("top"\) \? -50 : 50/);
});

test('getToastAnimation: returns initial, animate, and exit keys', () => {
  assert.match(assetsSource, /initial:\s*\{\s*opacity:\s*0,\s*y\s*\}/);
  assert.match(assetsSource, /animate:\s*\{\s*opacity:\s*1,\s*y:\s*0\s*\}/);
  assert.match(assetsSource, /exit:\s*\{\s*opacity:\s*0,\s*y\s*\}/);
});

// --- Icons use inline SVG (no external dependency) ---

test('Icons: all icons are inline SVGs, not imported from react-icons', () => {
  assert.doesNotMatch(assetsSource, /from ['"]react-icons/);
  assert.match(assetsSource, /const successIcon = \(/);
  assert.match(assetsSource, /const warningIcon = \(/);
  assert.match(assetsSource, /const infoIcon = \(/);
  assert.match(assetsSource, /const errorIcon = \(/);
});

// --- No dead code ---

test('No unused exports: itemsVariants and framerToastVaraints are removed', () => {
  assert.doesNotMatch(assetsSource, /itemsVariants/);
  assert.doesNotMatch(assetsSource, /framerToastVaraints/);
});

test('No unused export: getPosition is removed', () => {
  assert.doesNotMatch(assetsSource, /getPosition/);
});
