---
name: generate-tests
description: Generate or update Vitest unit tests for Vue components and Pinia stores. Use when the user asks to create tests, write tests, generate tests, add test coverage, update existing tests, or supplement a test file.
---

# Generate / Update Unit Tests

Conventions for component and store tests are defined in `.cursor/rules/component-testing.mdc` and `.cursor/rules/pinia-store-testing.mdc`. Follow them strictly.

## Workflow

1. **Read the source file** to understand its API (props, emits, store actions/getters, dependencies)
2. **Determine target type**: component (`.vue`) → component test rules; Pinia store (`defineStore`) → store test rules
3. **Check for existing tests**: look for `tests/` folder next to the source
   - **Exists** → read it, identify uncovered branches/actions, add new `it()`/`describe()` blocks. Don't rewrite passing tests unless behavior changed.
   - **Missing** → generate full test file from scratch
4. **Check for fixtures**: look in nearby `api/.../fixtures/` or `__fixtures__/` folders. Use them instead of inline mocks when available.
5. **Write the test** following the corresponding rule file conventions
6. **Run the test**:
   ```bash
   npx vitest --environment jsdom --root src/ --run <path-to-test>
   ```
7. **Fix failures** until the test passes

## File placement

```
ComponentName/
├── ComponentName.vue
└── tests/
    └── ComponentName.test.ts

store/
├── storeName.ts
└── tests/
    └── actionName.test.ts     # one file per action
```

## What to test

### Components
- Conditional rendering based on props/store state
- User interactions → emitted events / store calls
- Prop passing to child components
- Edge cases (empty data, error states, loading states)

### Pinia stores
- Each action: success path, error path (API rejection), missing prerequisite data
- Loading state transitions (`isFetching` / `isLoading` flags)
- Getters with different state configurations
- Side effects (Logger.error, router.push, etc.)

## Updating existing tests

1. Read test + source files
2. Diff what changed: new props, removed branches, added actions
3. Add/update only affected `it()` blocks
4. Remove tests for deleted behavior
5. Run and fix
