---
name: test-all
description: Run project test suite via scripts/run-tests.sh, parse failures, read failing test and source files, and fix both tests and source code. Use when the user asks to run tests, fix failing tests, or mentions test-all / run-tests.
---

# Test All — Run & Fix Failing Tests

## Overview

This skill runs the Uplify test suite and automatically fixes failing tests. It fixes **both** test files and source code when needed.

- **Test runner**: `scripts/run-tests.sh` (wraps `npm run test:unit`)
- **Framework**: Vitest + @vue/test-utils + @pinia/testing
- **Test files**: `*.test.ts` in `tests/` directories

## Workflow

Copy this checklist and track progress:

```
Test-Fix Progress:
- [ ] Step 1: Run the full test suite
- [ ] Step 2: Identify failing directories and files
- [ ] Step 3: For each failure — diagnose root cause
- [ ] Step 4: Fix source code or test files
- [ ] Step 5: Re-run failed directories to verify
- [ ] Step 6: Run full suite again to confirm no regressions
```

### Step 1: Run the test suite

Run in the project root:

```bash
bash scripts/run-tests.sh
```

For a single directory:

```bash
bash scripts/run-tests.sh src/modules/Partner/views/FormAdset
```

Or directly via npm:

```bash
npm run test:unit -- src/modules/Partner/views/FormAdset
```

Set `block_until_ms` high enough (~120000+) — the full suite can take minutes. If the command backgrounds, poll the terminal file for the `exit_code` footer.

### Step 2: Parse failures

The script prints a `SUMMARY` section at the end with:
- `Failed test directories:` — list of directory paths
- Vitest output above contains the actual error messages, assertion diffs, and stack traces

Read the **full terminal output** to extract:
1. Which test files failed
2. The exact error message / assertion diff for each failure
3. The stack trace pointing to the failing line

### Step 3: Diagnose each failure

For each failing test:

1. **Read the failing test file** to understand what it asserts.
2. **Read the source component/module** the test exercises.
3. Classify the failure:

| Failure type | Typical fix |
|---|---|
| **Selector not found** (`data-test` missing) | Add `data-test` attribute to the component template |
| **Assertion mismatch** (expected vs received) | Either the test expectation is stale or the source logic changed — update whichever is wrong |
| **Mock not set up** (undefined / not a function) | Add or update `vi.mock()` / `vi.mocked()` setup |
| **Store shape changed** | Update `initialState` in `createTestingPinia` or the store mock |
| **Import error** | Fix the import path in the test or source |
| **Type error in test** | Fix types — often caused by renamed props/interfaces |
| **Async timing** | Add missing `await nextTick()` or `await flushPromises()` |

### Step 4: Fix

- **Prefer fixing source code** when the test correctly describes expected behavior but the source diverges.
- **Fix the test** when source code is intentionally changed and the test is stale.
- Follow the project's `component-testing.mdc` cursor rule for test conventions (factory pattern, `data-test` selectors, mock patterns).
- Keep changes minimal — don't refactor unrelated code.

### Step 5: Re-run failed directories

After fixing, re-run **only the previously failing directories** to verify:

```bash
bash scripts/run-tests.sh <directory-path>
```

If still failing, go back to Step 3 for that directory.

### Step 6: Full regression check

Once all individual fixes pass, run the full suite one more time:

```bash
bash scripts/run-tests.sh
```

Confirm `🎉 All tests passed!` in the output.

## Key Project Conventions

- Test command: `npm run test:unit -- <path>` (Vitest, jsdom, `--run` flag)
- Config: `vitest.config.ts` — single worker, 30s timeout, setup in `test-setup.ts`
- Alias: `@/` → `src/`
- Selectors: always `[data-test="..."]`, never classes/IDs
- Mocks: `vi.mock()` at file top for API modules; `createTestingPinia` for stores
- Fixtures: reuse from `api/.../fixtures/` directories when available

## Common Pitfalls

- **Forgetting `await nextTick()`** after store mutations → DOM not updated yet
- **Mock not cleared** — always have `beforeEach(() => { vi.clearAllMocks() })`
- **Wrong store ID** in `initialState` — check the store's `defineStore('id', ...)` call
- **Component stubs missing** — child components that make API calls need stubs
