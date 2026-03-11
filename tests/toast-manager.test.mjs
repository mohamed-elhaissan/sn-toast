import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const managerSource = readFileSync(new URL('../src/lib/toast-manager.ts', import.meta.url), 'utf8');

// --- Subscription ---

test('ToastManager: _subscribe returns an unsubscribe function', () => {
  assert.match(managerSource, /_subscribe\(listener: ToastListener\)/);
  assert.match(managerSource, /this\.listeners\.add\(listener\)/);
  assert.match(managerSource, /return \(\) => \{/);
  assert.match(managerSource, /this\.listeners\.delete\(listener\)/);
});

// --- Emit generates unique IDs ---

test('ToastManager: emit generates a UUID for each toast', () => {
  assert.match(managerSource, /const id = crypto\.randomUUID\(\)/);
  assert.match(managerSource, /listener\(\{ \.\.\.toast, id \}\)/);
});

// --- All toast types call emit with correct type ---

for (const type of ['success', 'error', 'warning', 'info', 'normal']) {
  test(`ToastManager: ${type}() emits a toast with type "${type}"`, () => {
    const pattern = new RegExp(`${type}\\(message: string\\)\\s*\\{\\s*this\\.emit\\(\\{\\s*type:\\s*"${type}",\\s*message\\s*\\}\\)`);
    assert.match(managerSource, pattern);
  });
}

// --- Singleton export ---

test('ToastManager: exports a singleton instance', () => {
  assert.match(managerSource, /export const toast = new ToastManager\(\)/);
});

// --- Listeners is a Set (not array) to prevent duplicates ---

test('ToastManager: uses Set for listeners to prevent duplicates', () => {
  assert.match(managerSource, /private listeners = new Set<ToastListener>\(\)/);
});
