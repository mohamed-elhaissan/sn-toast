import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const toastSource = readFileSync(new URL('../src/lib/Toast.tsx', import.meta.url), 'utf8');

// --- Close button ---

test('Toast: renders a close button when onClose is provided', () => {
  assert.match(toastSource, /\{onClose && \(/);
  assert.match(toastSource, /<button className="toast-close"/);
});

test('Toast: close button has accessible aria-label', () => {
  assert.match(toastSource, /aria-label="Close"/);
});

test('Toast: close button fires onClose on click', () => {
  assert.match(toastSource, /onClick=\{onClose\}/);
});

// --- Layout animation ---

test('Toast: uses framer-motion layout animation', () => {
  assert.match(toastSource, /<motion\.div/);
  assert.match(toastSource, /layout/);
});

// --- Props ---

test('Toast: accepts initial, animate, exit animation props', () => {
  assert.match(toastSource, /initial:\s*TargetAndTransition/);
  assert.match(toastSource, /animate:\s*TargetAndTransition/);
  assert.match(toastSource, /exit:\s*TargetAndTransition/);
});

test('Toast: richColor defaults to false', () => {
  assert.match(toastSource, /richColor = false/);
});

// --- Rendering ---

test('Toast: renders icon from getType', () => {
  assert.match(toastSource, /const icon = getType\(type\)/);
  assert.match(toastSource, /\{icon\}/);
});

test('Toast: renders message in a span', () => {
  assert.match(toastSource, /<span>\{message\}<\/span>/);
});
