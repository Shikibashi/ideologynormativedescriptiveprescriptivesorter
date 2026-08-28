# Layer Sorter Design Source

## Direction

Layer Sorter is an editorial research notebook: quiet paper, near-black ink, one vermilion signal, and a readable distinction between evidence and interpretation. The visual language should feel deliberate and inspectable rather than gamified, corporate, or scientific.

## Tokens

- Paper: `oklch(96% 0.018 82)` / `#F4EFE7`
- Paper deep: `oklch(92% 0.025 82)` / `#E8DED0`
- Ink: `oklch(22% 0.018 70)` / `#24221E`
- Muted ink: `oklch(47% 0.022 70)` / `#706A61`
- Rule: `oklch(77% 0.026 76)` / `#C9BDAE`
- Signal: `oklch(60% 0.18 34)` / `#C84E39`
- Signal soft: `oklch(91% 0.06 45)` / `#F3D8C3`

## Type

- `Newsreader` for display titles, layer headings, and editorial notes.
- `DM Sans` for controls, metadata, body copy, and navigation.
- Only weights 400, 500, 600, and 700 are used and imported.

## Layout contract

- Use `min-height: 100dvh`, not a fixed viewport height.
- Keep the layer rail and the main content visibly asymmetric on wide screens.
- Collapse to one column at narrow widths without horizontal overflow.
- Keep results as a sequence of readable sections rather than a dashboard of repeated cards.

## Interaction contract

- Every answer is a labeled native control with a visible focus state.
- Motion is limited to transform/opacity and disappears under reduced motion.
- Vermilion marks a signal or active state but never carries meaning alone.
- `No view yet` is as reachable and visually legible as the directional choices.
