import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const toasterSource = readFileSync(new URL('../src/lib/Toaster.tsx', import.meta.url), 'utf8');

// --- Timeout cleanup on unmount ---

test('Toaster: tracks timeout IDs with useRef', () => {
  assert.match(toasterSource, /useRef<Map<string, ReturnType<typeof setTimeout>>>/);
});

test('Toaster: clears all timeouts on unmount', () => {
  assert.match(toasterSource, /timeoutIds\.current\.forEach\(\(id\) => clearTimeout\(id\)\)/);
  assert.match(toasterSource, /timeoutIds\.current\.clear\(\)/);
});

test('Toaster: stores timeout ID when toast is added', () => {
  assert.match(toasterSource, /timeoutIds\.current\.set\(newToast\.id, timeoutId\)/);
});

test('Toaster: removes timeout ID after toast auto-dismisses', () => {
  assert.match(toasterSource, /timeoutIds\.current\.delete\(newToast\.id\)/);
});

// --- Manual dismiss ---

test('Toaster: dismissToast clears the timeout and removes the toast', () => {
  assert.match(toasterSource, /const dismissToast = \(id: string\)/);
  assert.match(toasterSource, /clearTimeout\(timeoutId\)/);
  assert.match(toasterSource, /timeoutIds\.current\.delete\(id\)/);
});

test('Toaster: passes onClose to each Toast', () => {
  assert.match(toasterSource, /onClose=\{t\.id \? \(\) => dismissToast\(t\.id!\) : undefined\}/);
});

// --- Animation memoization ---

test('Toaster: memoizes animation values with useMemo', () => {
  assert.match(toasterSource, /useMemo\(\s*\(\) => getToastAnimation\(position\)/);
});

// --- SSR guard ---

test('Toaster: defers portal target until after mount', () => {
  assert.match(
    toasterSource,
    /const \[portalTarget, setPortalTarget\] = useState<HTMLElement \| null>\(null\)/
  );
  assert.match(toasterSource, /setPortalTarget\(document\.body\)/);
  assert.match(toasterSource, /if \(!portalTarget\) \{\s*return null;\s*\}/s);
});

test('Toaster: uses portalTarget (not document.body) in createPortal', () => {
  assert.doesNotMatch(toasterSource, /createPortal\([\s\S]*document\.body\s*\)/);
  assert.match(toasterSource, /createPortal\([\s\S]*portalTarget\s*\)/);
});

// --- Unsubscribe on unmount ---

test('Toaster: unsubscribes from toast manager on unmount', () => {
  assert.match(toasterSource, /const unsubscribe = toast\._subscribe/);
  assert.match(toasterSource, /unsubscribe\(\)/);
});

// --- Position class applied directly ---

test('Toaster: applies position as CSS class directly (no getPosition)', () => {
  assert.match(toasterSource, /className=\{`toast-container \$\{position\}`\}/);
  assert.doesNotMatch(toasterSource, /getPosition/);
});

// --- No Tailwind classes in library code ---

test('Toaster: does not use Tailwind utility classes', () => {
  assert.doesNotMatch(toasterSource, /sm:w-/);
  assert.doesNotMatch(toasterSource, /xl:w-/);
  assert.doesNotMatch(toasterSource, /2xl:w-/);
});

// --- Style injection ---

test('Toaster: calls injectStyles on mount', () => {
  assert.match(toasterSource, /injectStyles\(\)/);
});
