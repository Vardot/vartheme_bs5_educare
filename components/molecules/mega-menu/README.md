# Mega menu

A full-width navigation panel rendered as a grid of arrow-button cards, one per menu item.

## Bootstrap reference

> [Bootstrap 5.3 — Navbar](https://getbootstrap.com/docs/5.3/components/navbar/)

## What it does

Use this component when you need a full-width panel that can:

- render a grid of `.mega-menu__card` links, one per item, each with an arrow button and a title
- stay hidden (`hidden` + `aria-hidden="true"`) until a parent toggle opens it
- reveal each card with a staggered fade-in/slide-down when opened (`is-visible` class)
- animate each card's arrow button on hover: the circle fills with the accent color and the arrow rotates from -45deg to 0deg

This component has no JS or open/close logic of its own — it is rendered and toggled by `organisms/nav-menu`, which owns the open/close state, `aria-expanded`/`aria-hidden` wiring, and the staggered reveal timing (see `nav-menu.js`).

## Files

- `mega-menu.component.yml` — component schema and props
- `mega-menu.twig` — component template
- `mega-menu.scss` — source styles (compiles to `mega-menu.css`)
- `README.md` — usage notes and examples

## Props overview

### Content

- `items` (required): the menu items to render as cards, each needs `title` and `url`
- `panel_id` (required): unique id applied to the panel root; the parent toggle references it via `aria-controls` and `data-mega-menu-toggle`

## Available attributes

- `attributes` — HTML attributes for the panel root element
- `card_attributes` — HTML attributes for each card, created fresh per loop iteration

## Example

```twig
{% include 'vartheme_bs5_educare:mega-menu' with {
  items: item.below,
  panel_id: 'mega-menu-123-0',
} %}
```

## Notes

- The panel starts `hidden` with `aria-hidden="true"`; `organisms/nav-menu`'s JS behavior removes both when its toggle is activated.
- Each card is a plain `<a href="{{ item.url }}">` — reachable via keyboard tab order once its panel is open.
- Respects `prefers-reduced-motion`: card reveal and arrow-button transitions are disabled.
