import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const indexSource = readFileSync(new URL('../src/lib/index.ts', import.meta.url), 'utf8');
const pkgJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

// --- Public API ---

test('index: re-exports toast-manager', () => {
  assert.match(indexSource, /export \* from ['"]\.\/toast-manager['"]/);
});

test('index: re-exports Toaster', () => {
  assert.match(indexSource, /export \* from ['"]\.\/Toaster['"]/);
});

test('index: re-exports types', () => {
  assert.match(indexSource, /export \* from ['"]\.\/type['"]/);
});

test('index: does not re-export internal Toast component', () => {
  assert.doesNotMatch(indexSource, /export \* from ['"]\.\/Toast['"]/);
});

test('index: imports inject-style as side-effect', () => {
  assert.match(indexSource, /import ['"]\.\/inject-style['"]/);
});

// --- package.json ---

test('package.json: does not include react-icons in dependencies', () => {
  assert.equal(pkgJson.dependencies?.['react-icons'], undefined);
});

test('package.json: does not include react-router-dom in dependencies', () => {
  assert.equal(pkgJson.dependencies?.['react-router-dom'], undefined);
});

test('package.json: framer-motion is a dependency', () => {
  assert.ok(pkgJson.dependencies?.['framer-motion']);
});

test('package.json: react and react-dom are peer dependencies', () => {
  assert.ok(pkgJson.peerDependencies?.react);
  assert.ok(pkgJson.peerDependencies?.['react-dom']);
});

test('package.json: exports field has types, require, and import', () => {
  const root = pkgJson.exports['.'];
  assert.ok(root.types);
  assert.ok(root.require);
  assert.ok(root.import);
});
