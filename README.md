## sn-toast

A beautiful, animated toast notification library for React with Tailwind CSS.

## Run tests

From the project root (`sn-toast`), run:

```bash
npm test
```

This executes:

```bash
node --test tests/*.test.mjs
```

### If you see `Missing script: "test"`

- Make sure you're inside this repository root before running the command.
- Run `npm run` to verify the `test` script is listed.
- If you're running from another project (for example a Next.js app that installed `sn-toast` as a dependency), note that this package does **not** publish its internal `tests/` files to npm, so run tests from this repository clone.
