# Section 01: Foundation

## Background

This section establishes the smallest runnable shell for the Ideology Layer Sorter: a client-only React application compiled by Vite, checked by strict TypeScript, styled from one editorial token set, and exercised by deterministic unit and browser test harnesses.

The product is an interpretive civic-reflection tool, not a scientific test, political recommendation engine, or identity classifier. The foundation must therefore keep the browser boundary explicit: answers are temporary in-process state, the static dataset is bundled at build time, and there is no API, database, account, analytics, or answer-storage boundary. Later sections add the dataset/scoring core, the quiz flow, and the results view without changing the mount contract or introducing a second application shell.

The implementation should preserve a framework-independent domain boundary. React owns composition and browser interaction; typed records and pure calculations remain portable modules that can be unit-tested without mounting the UI. This makes a later shell change reversible while keeping the first implementation small.

## Requirements

### Project and runtime boundary

- Create a React + TypeScript + Vite application that runs from `/` as a static web app.
- Provide `npm` scripts for development, strict type checking, production build, unit tests, and Playwright browser tests.
- Pin exact dependency versions in `package.json` and commit the generated lockfile. Do not use an unbounded `latest` tag or silently add a server, persistence layer, state-management framework, CSS framework, or analytics SDK.
- Keep the foundation free of network calls for answer storage. A font stylesheet request is a presentation dependency, not a data-storage integration; all functional data must remain bundled or in browser memory.
- Make the root shell usable when JavaScript loads and make failures explicit if the expected mount element is missing. Do not silently render an empty page.

### Strict contracts

- Add a single source of truth for shared domain contracts in `src/types.ts`.
- Use closed unions for the three layers, directional answer values, the `no-view` sentinel, source posture, and layer-result status.
- Preserve the semantics of `no-view`: it is missing information, not the numeric midpoint. `0` is reserved for an answered `Mixed / depends` response.
- Keep answer maps, question records, anchor records, coverage records, and result records read-only at module boundaries. Mutation belongs only in local UI state or in pure function-local reductions.
- Reject invalid values at validation boundaries in the data/scoring section. The React shell must not coerce malformed answers, unknown layers, or unknown record IDs into a plausible result.
- Do not export `any`. Use explicit interfaces/types and `unknown` only at an untrusted input boundary that is immediately validated.

### React shell

- Create `src/main.tsx` as the only browser entry point. It must import the stylesheet once, find `#root`, and mount `<App />` under `StrictMode`.
- Create `src/App.tsx` as the composition root. In this section it renders a stable, semantic introductory shell with the product name, the three-layer framing, the non-scientific interpretation disclaimer, and a named content region for later quiz/results work.
- Do not implement scoring, question navigation, result matching, share decoding, or a second route system here. Later sections extend `App.tsx` through the same composition root.
- Use semantic landmarks and accessible headings from the first render: one page-level `main`, a clear `h1`, explanatory paragraphs, and a stable `id`/`aria` relationship that later panels can reuse.
- Keep browser-only concerns in the composition layer. `src/types.ts` must not import React, access `window`, read the URL, or call a browser API.

### Editorial CSS tokens and base states

- Create a root visual source of truth in `DESIGN.md` and mirror the implementation values in `src/styles.css`.
- Use the editorial/research-notebook direction: warm paper neutrals, ink rules, one vermilion signal accent, asymmetric reading space, and no gradient.
- Define the following palette with a hexadecimal fallback followed by the specified `oklch()` value:

  | Token | HEX fallback | `oklch()` value |
  |---|---|---|
  | `--paper` | `#F4EFE7` | `oklch(96% 0.018 82)` |
  | `--paper-deep` | `#E8DED0` | `oklch(92% 0.025 82)` |
  | `--ink` | `#24221E` | `oklch(22% 0.018 70)` |
  | `--ink-muted` | `#706A61` | `oklch(47% 0.022 70)` |
  | `--rule` | `#C9BDAE` | `oklch(77% 0.026 76)` |
  | `--signal` | `#C84E39` | `oklch(60% 0.18 34)` |
  | `--signal-soft` | `#F3D8C3` | `oklch(91% 0.06 45)` |

- Load `Newsreader` for display text and `DM Sans` for body/control text through an explicit stylesheet import or link, using only the weights required by the design: Newsreader 400/500/600 and DM Sans 400/500/600/700. Retain a readable system fallback if the font request is unavailable.
- Define layout and state tokens for the 1180px maximum content width, responsive gutter, focus ring, rule, and motion behavior. Components must consume tokens instead of introducing arbitrary colors.
- Set `color-scheme: light` on the root and explicitly style `option` backgrounds and text. This is required even without a theme toggle because native select rendering can otherwise violate contrast.
- Use `min-height: 100dvh`, visible `:focus-visible` rings, and `prefers-reduced-motion: reduce`. Do not rely on color alone to identify a layer or state.
- Establish the shell as a container-query context for reusable question/result blocks. Reserve media queries for page-wide gutter and navigation changes.
- Avoid hard-coded pure white/pure black backgrounds and text, decorative motion, horizontal overflow, and component-level gradients.

### Test harness

- Configure Vitest through Vite with a DOM-capable environment for React tests and a small test setup file for DOM matchers.
- Configure Playwright with a local web server, a stable loopback host/port, a Chromium project, and traces on failure. The harness must work without a backend.
- Add a foundation smoke test for the semantic shell and a browser smoke test for the page title, main heading, and absence of answer-storage requests. Later sections extend the same test files rather than creating competing harnesses.
- Make the normal commands deterministic and explicit:

  ```text
  npm run typecheck
  npm run build
  npm test -- --run
  npm run test:e2e
  ```

## Dependencies

- Requires: an otherwise empty project directory and a supported Node.js/npm runtime. No prior application section is required.
- Blocks: `section-02-data-methodology`, `section-03-quiz-flow`, and `section-04-results`.
- Supplies: the browser entry point, React composition root, shared type contracts, design tokens, Vite/Vitest configuration, Playwright configuration, and stable test commands.
- Does not depend on: an API, database, authentication provider, current party/candidate data, remote answer storage, or an external content-management system.
- Downstream ownership boundary:
  - Section 02 adds `src/data.ts`, `src/scoring.ts`, `src/share.ts`, and methodology content while consuming the contracts here.
  - Section 03 adds question navigation and local answer state inside the existing composition root.
  - Section 04 adds coverage-aware result rendering, restart, and optional clipboard behavior inside the existing composition root.

## Reference Libraries

Use the current stable versions that are compatible with the project’s Node.js baseline, but pin the exact resolved versions in `package.json` and the lockfile before implementation. Verify official documentation for the selected versions before coding; the table records roles and compatibility requirements rather than a floating version range.

| Library or platform | Version policy | Purpose and boundary |
|---|---|---|
| React / React DOM | Same exact pinned major and patch | UI composition and browser rendering only; no domain logic in hooks or components beyond orchestration. |
| Vite | Exact pinned version compatible with the selected React plugin | Development server, production bundling, and static asset handling. |
| `@vitejs/plugin-react` | Exact pinned version compatible with Vite | JSX/TSX transformation and React fast refresh in development. |
| TypeScript | Exact pinned compiler version | Strict contracts and build-time validation; `noEmit` type checking is a required gate. |
| Vitest | Exact pinned version compatible with Vite | Fast deterministic unit/component test execution. |
| `jsdom` | Exact pinned version compatible with Vitest | DOM environment for React shell tests; do not treat it as browser/E2E evidence. |
| `@testing-library/react` / `@testing-library/jest-dom` | Exact pinned versions compatible with React and Vitest | Semantic component assertions and accessible DOM matchers. |
| `@playwright/test` | Exact pinned version; install only the browser project required by the harness | Browser-level smoke and end-to-end checks against the local static app. |
| Newsreader / DM Sans | Google Fonts stylesheet with only the specified weights, plus system fallbacks | Editorial typography. Fonts are presentation-only and must not carry user answers or application data. |

No state, router, HTTP client, CSS utility, or persistence library is needed for this section. Add a new dependency only if a later requirement cannot be met with the existing browser, React, TypeScript, Vite, Vitest, or Playwright contracts; record that decision at the section boundary before implementation.

## Implementation

### 1. Initialize the project manifest and compiler

Create `package.json` with scripts equivalent to the following contract:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

The exact dependency versions are resolved and pinned during setup. Generate the lockfile with the project’s package manager and commit it with the manifest. Do not add a `start` script that implies a server or a command that persists answers.

Configure `tsconfig.json` for a browser-oriented Vite project with:

- `target` and `lib` suitable for the selected Node/browser baseline;
- `module: "ESNext"` and `moduleResolution: "Bundler"`;
- `jsx: "react-jsx"`;
- `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`, `noImplicitOverride: true`, `noFallthroughCasesInSwitch: true`, and `forceConsistentCasingInFileNames: true`;
- `verbatimModuleSyntax: true` and `noEmit: true`;
- explicit `types`/includes for Vite, Node configuration files, Vitest, and Playwright without including generated `dist/` output.

If the selected Vite template separates application and Node configuration into multiple TypeScript config files, preserve the same strict flags in every config and make the references explicit. Do not weaken the application config to accommodate a test or tooling file.

### 2. Establish the shared type contract

Create `src/types.ts` with readonly contracts at the module boundary. The minimum contract must be equivalent to:

```ts
export const LAYERS = [
  "descriptive",
  "normative",
  "prescriptive",
] as const;

export type Layer = (typeof LAYERS)[number];
export type DirectionalAnswer = -2 | -1 | 0 | 1 | 2;
export type Answer = DirectionalAnswer | "no-view";
export type AnswerMap = Readonly<Record<string, Answer | undefined>>;

export type QuestionSourceType = "original" | "inspired_by";
export type AnchorSourceType = "editorial" | "inspired_by";
export type LayerResultStatus = "covered" | "insufficient-information";

export interface Question {
  readonly id: string;
  readonly layer: Layer;
  readonly domain: string;
  readonly prompt: string;
  readonly context?: string;
  readonly effects: Readonly<Record<string, number>>;
  readonly sourceType: QuestionSourceType;
  readonly sourceRefs: readonly string[];
  readonly version: number;
}

export interface IdeologyAnchor {
  readonly id: string;
  readonly label: string;
  readonly family: string;
  readonly summary: string;
  readonly profiles: Readonly<
    Record<Layer, Readonly<Record<string, number>>>
  >;
  readonly sourceType: AnchorSourceType;
  readonly sourceRefs: readonly string[];
  readonly note: string;
  readonly version: number;
}
```

Add the coverage/result types needed by the later UI without making them React-specific. At minimum, a coverage record contains `answered`, `total`, `ratio`, and `eligible`; a layer result contains its `layer`, `status`, coverage, an optional profile, and readonly neighbor/facet collections. Keep numeric display rounding out of these contracts so the scoring core can remain deterministic and the UI can round only at the presentation boundary.

Use `LAYERS` as the iteration source for layer order. Do not duplicate the strings in components, test fixtures, and scoring code. Data validation in Section 02 owns constraints such as effect ranges, unique IDs, complete layer membership, and valid source references; this section owns the type-level boundary.

### 3. Create the Vite/React shell

Create `index.html` with:

- `lang="en"`, viewport metadata, a descriptive title such as `Ideology Layer Sorter`, and a short description that calls the output interpretive rather than scientific;
- a single `<div id="root"></div>` mount point;
- no inline answer data, executable string content, `eval`, or remote API configuration.

Create `src/main.tsx` as the only entry point. It should import `./styles.css`, resolve `#root`, fail loudly if the mount element is absent, and render `<StrictMode><App /></StrictMode>`.

Create `src/App.tsx` as a small composition root. The foundation render should include:

- one `main` landmark with a stable `id` such as `main-content`;
- an editorial kicker identifying the three-layer method;
- an `h1` containing the product name;
- plain-language framing for descriptive, normative, and prescriptive reasoning;
- a visible disclaimer that the result will be an interpretive calculation, not a scientific test, diagnosis, recommendation, or claim of identity;
- an empty or minimally labelled content region that later sections can replace without changing the root mount contract.

Keep the initial shell free of fake scoring output. If a temporary action is needed for smoke testing, it must be clearly a shell action and must not imply that an answer has been recorded. Later quiz and results behavior should be added by extending this composition root, not by mounting a second React tree.

### 4. Encode the editorial design system in CSS

Create `DESIGN.md` at the project root with the direction, typography, palette, layout, accessibility, and motion rules that the implementation must preserve. `src/styles.css` is the executable form of those rules.

At the top of `src/styles.css`, load the selected `Newsreader` and `DM Sans` weights explicitly. Define each color first with its HEX fallback and then with its `oklch()` value. Include base tokens equivalent to:

```css
:root {
  color-scheme: light;

  --paper: #F4EFE7;
  --paper: oklch(96% 0.018 82);
  --paper-deep: #E8DED0;
  --paper-deep: oklch(92% 0.025 82);
  --ink: #24221E;
  --ink: oklch(22% 0.018 70);
  --ink-muted: #706A61;
  --ink-muted: oklch(47% 0.022 70);
  --rule: #C9BDAE;
  --rule: oklch(77% 0.026 76);
  --signal: #C84E39;
  --signal: oklch(60% 0.18 34);
  --signal-soft: #F3D8C3;
  --signal-soft: oklch(91% 0.06 45);

  --font-display: "Newsreader", Georgia, serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --content-max: 1180px;
  --gutter: clamp(1rem, 3vw, 3rem);
  --focus-ring: 3px solid var(--signal);
}
```

The duplicate custom-property declarations are intentional fallback ordering: browsers that understand `oklch()` use the perceptually specified value, while older browsers retain the preceding HEX value. Do not rewrite this as a single unsupported color declaration.

Add a minimal reset and base layout that:

- gives the body the paper background and ink text;
- sets `min-height: 100dvh` and a centered shell with the 1180px maximum width;
- uses the display serif for headings and the sans face for controls, metadata, and body copy;
- styles links, buttons, form controls, and `option` elements with token-based colors;
- exposes a strong `:focus-visible` outline with offset;
- establishes `.app-shell` as a container-query context;
- disables or shortens nonessential transitions/animations under `prefers-reduced-motion: reduce`;
- avoids pure black/white, gradients, color-only status signaling, and fixed widths that create mobile overflow.

### 5. Configure unit and browser tests

Create `vite.config.ts` with the React plugin and Vitest configuration. Use a DOM environment, explicit test include patterns for `src/**/*.test.{ts,tsx}`, and a setup file that registers `@testing-library/jest-dom/vitest` if Testing Library is selected. Keep tests isolated from network access; mock browser APIs locally when a later section needs them.

Create `playwright.config.ts` with:

- `testDir: "./tests"`;
- a loopback `baseURL` and a fixed development/preview port;
- a `webServer` command that starts the Vite app on that loopback address;
- a Chromium project and trace retention on failure;
- `reuseExistingServer` enabled outside CI and a bounded server startup timeout.

Create a small `src/App.test.tsx` that mounts `App` and asserts the main landmark, product heading, three layer explanations, and non-scientific framing are present. Create the initial `tests/sorter.spec.ts` smoke case that opens `/`, checks the title and heading, verifies there is no request to an answer-storage route, and confirms the document has no horizontal overflow at a mobile viewport. Later sections append their scenarios to these test surfaces.

## Test Scenarios

The following cases are the foundation’s required observable behavior. They are not a substitute for the scoring, quiz, and results scenarios owned by later sections.

### Project setup and type boundary

| Case | Input/action | Expected result |
|---|---|---|
| Clean dependency install | Install from the committed manifest and lockfile | Installation resolves the pinned dependency graph without adding a server or analytics package. |
| Strict type check | Run `npm run typecheck` | Exit code is zero; invalid layer/answer/source unions would fail compilation rather than being coerced. |
| Invalid contract fixture | Attempt to assign an unknown layer or an answer outside `-2..2`/`"no-view"` in a type-test fixture | The compiler rejects the assignment; no `any` escape hatch is added. |
| Production build | Run `npm run build` | Vite emits a static build with no TypeScript or bundler errors and no required backend endpoint. |

### React shell

| Case | Input/action | Expected result |
|---|---|---|
| Normal first load | Open `/` in a browser | One page-level `main`, the product `h1`, all three layer explanations, and the interpretive disclaimer are visible. |
| Missing mount point | Remove or rename `#root` in a local diagnostic fixture | `main.tsx` throws an explicit mount error; the app does not silently report a successful render. |
| Semantic unit render | Render `App` in Vitest/jsdom | The expected landmark, heading, framing text, and stable content-region identifier are present. |
| React tree ownership | Inspect the loaded document | There is one application mount; later sections can extend `App` without a second root. |

### CSS and accessibility baseline

| Case | Input/action | Expected result |
|---|---|---|
| Token resolution | Inspect computed styles in a browser that supports `oklch()` and one that does not | The same paper/ink/signal intent is retained; the HEX fallback remains available. |
| Focus visibility | Tab through the shell’s interactive elements and later controls | The focused element has a visible token-based focus ring and is not identified by color alone. |
| Native select safety | Render a select/options fixture used by later sections | Option foreground/background colors are explicitly set and remain readable under the declared light color scheme. |
| Reduced motion | Set `prefers-reduced-motion: reduce` | Nonessential transitions/animations are suppressed or shortened and no behavior depends on motion. |
| Mobile width | Visit at a narrow viewport such as 320 CSS pixels | The page has no horizontal overflow; text and future answer controls can fit within the responsive gutter. |
| Font loading | Inspect the stylesheet and `document.fonts` when network access is available | Newsreader and DM Sans are explicitly requested with only required weights, and the system fallback remains usable if the request fails. |

### Test harness behavior

| Case | Input/action | Expected result |
|---|---|---|
| Unit runner | Run `npm test -- --run` | All foundation unit tests pass deterministically without an external service. |
| Browser runner | Run `npm run test:e2e` | Playwright starts the local Vite server, runs the foundation smoke test, and exits successfully. |
| Storage boundary | Observe browser requests during the smoke test | No request is made to an answer, profile, analytics, or persistence endpoint. Presentation font requests, if enabled, are not used for application data. |
| Failure trace | Force a browser assertion failure locally | Playwright retains a trace or equivalent diagnostic artifact for the failing test. |

## Implementation Strategy

Use a narrow TDD loop and keep each phase runnable. Do not implement downstream scoring or quiz behavior merely to make the foundation tests pass.

### Phase 1: Red — define the executable contract

- Add the manifest scripts, strict compiler intent, Vitest/Playwright configuration shape, and the shell test cases.
- Write the `App` and browser smoke assertions against the required semantic structure, tokenized styling, and local-only boundary.
- Run `npm run typecheck`, `npm test -- --run`, and `npm run test:e2e` to capture the expected failures before the shell exists. If the dependency graph is not installed yet, record the install prerequisite rather than treating missing tools as a product failure.

### Phase 2: Green — create the smallest working shell

- Install and pin the selected libraries; generate the lockfile.
- Add `tsconfig.json`, Vite/Vitest config, Playwright config, `index.html`, `src/vite-env.d.ts`, `src/types.ts`, `src/main.tsx`, `src/App.tsx`, and `src/styles.css`.
- Add `DESIGN.md` with the same tokens and accessibility rules as the CSS implementation.
- Make the shell tests pass with semantic markup and no scoring or persistence logic.

### Phase 3: Refactor — enforce the boundary

- Review every exported type for closed unions, readonly collections, and explicit optionality.
- Confirm that React imports do not leak into domain types and that CSS values come from the root token set.
- Remove unnecessary dependencies, duplicated layer literals, dead placeholder state, and any unbounded string/`any` escape hatch.
- Re-run typecheck, unit tests, build, browser smoke, and the mobile overflow check after refactoring.

### Phase 4: Handoff to downstream sections

- Keep `src/types.ts` stable once Section 02 begins; if a new contract is necessary, add it to this module and document the reason in the implementation diff.
- Let Section 02 own dataset validation and pure scoring/share modules.
- Let Section 03 own question state and navigation, and Section 04 own results and clipboard behavior.
- Do not add a router, server, remote data source, adaptive questioning, current-party content, or account model as an incidental foundation improvement.

## Quality Gate

Mark this section complete only when every applicable item is true:

- [ ] `package.json` contains deterministic `dev`, `build`, `preview`, `typecheck`, `test`, and `test:e2e` scripts.
- [ ] Exact dependency versions and the generated lockfile are present; no unapproved server, analytics, persistence, or CSS framework dependency was added.
- [ ] `npm run typecheck` passes with strict flags enabled and no `any` escape hatch in the foundation modules.
- [ ] `npm run build` emits a static Vite build successfully.
- [ ] `npm test -- --run` passes the foundation component/contract tests.
- [ ] `npm run test:e2e` passes the foundation smoke test against a local Vite server.
- [ ] `src/main.tsx` is the only mount point, imports the stylesheet once, and fails explicitly when `#root` is missing.
- [ ] `src/App.tsx` renders one semantic `main`, a stable product heading, all three layer definitions, and the interpretive disclaimer.
- [ ] `src/types.ts` contains the shared readonly contracts and closed layer/answer/source unions without React or browser imports.
- [ ] `DESIGN.md` and `src/styles.css` agree on the editorial direction, exact palette values, font weights, responsive layout, focus behavior, reduced-motion behavior, and explicit option colors.
- [ ] The mobile smoke check reports no horizontal overflow at the selected narrow viewport.
- [ ] Browser inspection finds no answer-storage, profile, analytics, or persistence request.
- [ ] Downstream boundaries are explicit: no scoring, full quiz flow, result matching, or share restoration is hidden in the foundation.

## Risk & Rollback

| Risk | Impact | Mitigation | Rollback method |
|---|---|---|---|
| Dependency versions drift or become mutually incompatible | High | Resolve a compatible set once, pin exact versions, commit the lockfile, and run typecheck/build/test in the same environment | Restore the last known-good `package.json` and lockfile pair, then reinstall dependencies; keep source contracts unchanged |
| Strict compiler flags expose an ambiguous downstream contract | Medium | Define only stable shared unions and readonly record shapes here; keep data-specific validation in Section 02 | Revert the newly added contract member or isolate the experimental shape in the owning downstream module; do not weaken `strict` globally |
| The shell grows into a second state machine or route layer | High | Keep `App.tsx` as the single composition root and defer quiz/results behavior to Sections 03/04 | Remove incidental state/router code and restore the static shell commit; preserve `src/types.ts` and CSS tokens |
| Remote font loading is unavailable, blocked, or slow | Low | Provide explicit Newsreader/DM Sans system fallbacks and keep typography nonfunctional | Remove or replace only the font import; retain token names and fallback stacks, and do not introduce a data CDN |
| CSS values diverge between the planning design and implementation | Medium | Keep `DESIGN.md` and `src/styles.css` changes paired; use root tokens and computed-style checks | Restore the previous token block and reapply component styles through tokens; do not patch individual components with new colors |
| Playwright server or port setup is unreliable in CI | Medium | Use a loopback host, bounded startup timeout, explicit `webServer`, and a configurable port | Run against `vite preview` on the configured port or adjust only the harness command; application code remains unchanged |
| A test helper accidentally makes network calls | Medium | Keep unit tests in jsdom, observe browser requests, and restrict functional data to bundled modules/local memory | Remove the helper/network dependency and replace it with a local fixture or browser API mock; do not whitelist a remote persistence endpoint |

## Acceptance Criteria

- [ ] A clean checkout can install the pinned dependency graph and start the app with `npm run dev`.
- [ ] The browser loads a static React/Vite shell at `/` with one `main`, one product `h1`, three plainly labelled reasoning layers, and an explicit non-scientific framing statement.
- [ ] `src/types.ts` exposes strict, readonly contracts for layers, answers, questions, anchors, coverage, and layer-result status; an invalid layer or answer cannot compile through the normal type path.
- [ ] `src/main.tsx` is the only browser mount and fails explicitly when the expected root element is absent.
- [ ] The root design tokens use the specified paper/ink/rule/signal palette with HEX fallbacks and `oklch()` values, loaded Newsreader/DM Sans weights, tokenized layout/focus values, `color-scheme: light`, and explicit native-option colors.
- [ ] The layout uses `min-height: 100dvh`, responsive gutters, a container-query-ready shell, visible keyboard focus, and reduced-motion handling without gradients or pure black/white UI surfaces.
- [ ] Vitest/jsdom and Playwright are configured, the foundation unit/browser smoke tests pass, and the browser test can produce diagnostics on failure.
- [ ] `npm run typecheck`, `npm run build`, `npm test -- --run`, and `npm run test:e2e` all exit successfully.
- [ ] The foundation makes no answer-storage, analytics, authentication, database, or current-political-data request.
- [ ] The section introduces no implementation responsibility that belongs to the dataset/methodology, quiz-flow, or results sections.
- [ ] All Test Scenarios above have a corresponding automated check or an explicitly documented browser/manual verification step.

## Files

- `package.json` — React/Vite/TypeScript/Vitest/Playwright dependencies and deterministic scripts.
- `package-lock.json` — generated exact dependency resolution; commit with the manifest.
- `tsconfig.json` — strict browser/application compiler configuration.
- `vite.config.ts` — React plugin, Vite build settings, and Vitest/jsdom configuration.
- `playwright.config.ts` — local web server, Chromium project, base URL, timeout, and failure diagnostics.
- `index.html` — static document shell, metadata, and the single `#root` mount point.
- `DESIGN.md` — implementation-facing editorial design source of truth and token documentation.
- `src/vite-env.d.ts` — Vite client type reference for static asset/module typing.
- `src/types.ts` — framework-independent shared domain contracts and closed unions.
- `src/main.tsx` — single React entry point and explicit mount failure handling.
- `src/App.tsx` — semantic introductory composition root and stable downstream content region.
- `src/styles.css` — loaded fonts, palette fallbacks, layout tokens, reset, focus states, native-option styling, and reduced-motion rules.
- `src/test-setup.ts` — Vitest DOM matcher setup and browser API test setup kept local.
- `src/App.test.tsx` — foundation semantic-shell unit test.
- `tests/sorter.spec.ts` — initial Playwright shell/network-boundary/mobile smoke test, extended by later sections.
