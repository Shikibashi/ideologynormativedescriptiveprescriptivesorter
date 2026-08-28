# Design System — Editorial Research Notebook

## Experience contract

The interface should feel like a careful field notebook for comparing claims, not a gamified compass or a scientific dashboard. It should give the user a quiet reading surface, a clear next action, and enough visible method to resist false precision.

## Direction fingerprint

- Mode: editorial / research notebook.
- Layout axis: asymmetric two-column reading field that collapses into a single column.
- Type contrast: expressive serif display with a calm sans body.
- Hue family: paper neutrals with a vermilion signal accent; no gradient.
- Material: warm paper, ink rules, one highlighted annotation rail.
- Motion: one short opacity/translate entrance; no scroll-driven effects required.

## Tokens

```css
:root {
  --paper: oklch(96% 0.018 82);
  --paper-deep: oklch(92% 0.025 82);
  --ink: oklch(22% 0.018 70);
  --ink-muted: oklch(47% 0.022 70);
  --rule: oklch(77% 0.026 76);
  --signal: oklch(60% 0.18 34);
  --signal-soft: oklch(91% 0.06 45);
}
```

HEX fallbacks: `#F4EFE7`, `#E8DED0`, `#24221E`, `#706A61`, `#C9BDAE`, `#C84E39`, `#F3D8C3`.

## Typography

- Display: `Newsreader`, loaded through Google Fonts; used for the product name, layer headlines, and editorial pull quotes.
- Body: `DM Sans`, loaded through Google Fonts; used for controls, metadata, buttons, and paragraphs.
- Utility: `DM Sans` with uppercase tracking for layer labels and progress metadata.
- Use only loaded weights: Newsreader 400/500/600 and DM Sans 400/500/600/700.

## Layout

- Page shell: `min-height: 100dvh`, max content width 1180px, generous horizontal gutter.
- Intro: 1.35fr content column + 0.65fr layer rail.
- Quiz: top metadata row, readable prompt column, answer controls in a bordered list.
- Results: three stacked layer sections with a narrow accent rail and no repeated three-card dashboard.
- Use container queries for reusable question/result blocks; reserve media queries for page-wide navigation and gutter changes.

## Accessibility and states

- Always expose visible focus rings.
- Use fieldsets and legends for answer controls.
- Never rely on color alone for layer identity; pair color with labels and border treatment.
- Respect `prefers-reduced-motion`.
- `color-scheme: light` and explicit option colors are defined even though the MVP has no theme toggle.
- Error/empty states explain how to recover rather than apologizing.
