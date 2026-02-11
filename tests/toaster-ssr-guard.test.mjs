import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const toasterSource = readFileSync(new URL('../src/lib/Toaster.tsx', import.meta.url), 'utf8');

test('Toaster defers portal target assignment until after mount', () => {
  assert.match(
    toasterSource,
    /const \[portalTarget, setPortalTarget\] = useState<HTMLElement \| null>\(null\);/
  );
  assert.match(toasterSource, /setPortalTarget\(document\.body\);/);
  assert.match(toasterSource, /if \(!portalTarget\) \{\s*return null;\s*\}/s);
});

test('Toaster does not pass document.body directly to createPortal', () => {
  assert.doesNotMatch(toasterSource, /createPortal\([\s\S]*document\.body\s*\)/);
  assert.match(toasterSource, /createPortal\([\s\S]*portalTarget\s*\)/);
});
