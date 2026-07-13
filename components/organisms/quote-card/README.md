# Quote Card

A lightweight Bootstrap card for displaying a quote/testimonial with an optional uploaded icon image, a description, and an author name.

## Bootstrap reference

> [Bootstrap 5.3 — Card](https://getbootstrap.com/docs/5.3/components/card/)

## What it does

Use this component when you need a quote card that can:

- optionally show an uploaded icon image (SVG, PNG, WebP) above the description
- align the icon to the left, center, or right
- display a quote description and an author name
- apply a brand background color, border, rounded corners, shadow, and optional padding
- optionally turn the whole card into a clickable stretched link

## Files

- `quote-card.component.yml` — component schema and props
- `quote-card.twig` — component template
- `quote-card.scss` / `quote-card.css` — component styles
- `README.md` — usage notes and examples
- `quote-card.mdx` — Storybook docs page
- `quote-card.stories.json` — Storybook story configuration
- `quote-card.stories.twig` — Storybook story templates

## Props overview

### Icon

- `icon_image`: optional Canvas image object (`src`, `alt`, `width`, `height`); leave empty to hide the icon area
- `icon_alignment`: horizontal icon position — `me-auto` (left), `mx-auto` (center), `ms-auto` (right); defaults to `me-auto`. The value is the actual Bootstrap margin-utility class, passed straight through to the `atoms/image` component's `align` prop — no lookup table involved.

### Content

- `description`: the quote description text
- `author_name`: name (and optional title) of the person being quoted

### Appearance

- `background_color`: brand background color — `none`, `bg-body-tertiary`, `bg-tertiary`, `bg-accent`, `bg-primary`, `bg-primary-subtle`, `bg-secondary`, `bg-secondary-subtle`, `bg-dark`; defaults to `none`
- `card_border`: adds `border` (otherwise `border-0`); defaults to `false`
- `corner_style`: Bootstrap rounded utility — `rounded-0`, `rounded-1`, `rounded-2`, `rounded-3`, `rounded-4`, `rounded-5`, `rounded-pill`; defaults to `rounded-0`
- `box_shadow`: `shadow-none`, `shadow-sm`, `shadow`, `shadow-lg`; defaults to `shadow-none`
- `padded`: adds `p-4` to the content area; defaults to `false`
- `equal_height`: adds `h-100` to the card wrapper; defaults to `false`

### Link

- `stretched_link`: when enabled and `link_url` is set, the whole card becomes clickable; defaults to `false`
- `link_url`: optional card link URL; defaults to empty
- `link_target`: `default`, `_self`, `_blank`; defaults to `default`

## Background color options

| Value | Label |
|---|---|
| `none` | None (transparent) |
| `bg-body-tertiary` | Body tertiary |
| `bg-tertiary` | Tertiary |
| `bg-accent` | Accent |
| `bg-primary` | Primary |
| `bg-primary-subtle` | Primary subtle |
| `bg-secondary` | Secondary |
| `bg-secondary-subtle` | Secondary subtle |
| `bg-dark` | Dark |

## Example: dark quote card with icon

```twig
{% embed 'vartheme_bs5_educare:quote-card' with {
  icon_image: { src: '/path/to/quote-mark.svg', alt: '', width: 40, height: 40 },
  icon_alignment: 'start',
  background_color: 'bg-dark',
  padded: true,
  box_shadow: 'shadow-sm',
  corner_style: 'rounded-3',
  description: 'The scholarship program made it possible for me to pursue my dream of earning a world-class education.',
  author_name: "John Doe, Master's in Economics"
} %}
{% endembed %}
```

## Example: linked card (entire card clickable)

```twig
{% embed 'vartheme_bs5_educare:quote-card' with {
  card_border: true,
  padded: true,
  box_shadow: 'shadow-sm',
  corner_style: 'rounded-3',
  description: 'Clicking anywhere on this card follows the link.',
  author_name: 'Jane Smith',
  stretched_link: true,
  link_url: 'https://example.com',
  link_target: '_blank'
} %}
{% endembed %}
```

## Example: centered icon in an equal-height grid

Combine `icon_alignment: 'mx-auto'` with `equal_height: true` when several quote
cards sit side by side in a row (pair with the row's
`vertical_alignment: align-items-stretch` on the enclosing `atoms/section`):

```twig
{% embed 'vartheme_bs5_educare:quote-card' with {
  icon_image: { src: '/path/to/quote-mark.svg', alt: '', width: 40, height: 40 },
  icon_alignment: 'mx-auto',
  card_border: true,
  background_color: 'bg-primary-subtle',
  padded: true,
  corner_style: 'rounded-3',
  equal_height: true,
  description: 'Centering the icon works well for narrow single-column layouts.',
  author_name: 'Alex Johnson'
} %}
{% endembed %}
```

## Notes

- When `icon_image` is empty, the icon area is hidden.
- The icon is rendered via the `vartheme_bs5_educare:image` component using `object-fit-contain` and `w-auto`; SVGs are recommended.
- `icon_alignment` values are the literal Bootstrap utility classes (`me-auto` / `mx-auto` / `ms-auto`), matching the enum used by `atoms/image`'s own `align` prop.
- The stretched link is only rendered when both `stretched_link` is enabled and `link_url` is set; `link_target: default` maps to `_self`.
- Boolean props (`card_border`, `padded`, `equal_height`, `stretched_link`) are validated and defaulted by SDC, so they arrive as real booleans.
- The icon wrapper's sizing (`--icon-max-inline-size`, `max-inline-size`, `block-size`) is written with CSS logical properties in `quote-card.scss`, so it flips correctly in RTL layouts.
