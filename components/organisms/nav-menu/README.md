# Nav Menu

The site's main navigation menu, used by `menu--main.html.twig`. Top-level links get an accent underline that grows in from the center on hover/focus. Expandable items (`item.is_expanded` with `item.below`) open a full-width mega menu panel — a grid of arrow-button cards, one per submenu link, via `molecules/mega-menu` — instead of a classic Bootstrap dropdown.

## Bootstrap reference

> [Bootstrap 5.3 — Navbar](https://getbootstrap.com/docs/5.3/components/navbar/)

## What it does

- Renders a top-level `<ul class="nav">` of menu links, each wrapped with a `nav-link__text-wrap` (text + growing underline)
- Expandable items also render a `nav-link__chevron` that rotates 180deg while open
- Each expandable item's submenu (`item.below`) renders as a `molecules/mega-menu` panel, toggled open/closed by `nav-menu.js` (only one open at a time; closes on outside click or Escape)
- Every toggle is still a real link (`item.url`), so the page stays navigable without JS
- Below `xl` (the header's `navbar-expand-xl` breakpoint) an expandable item opens its children as an indented list under it instead, and the open navbar is a full-height panel under the header: focus moves into it, the page behind is inert and does not scroll, and Escape or the toggler closes it

## Files

- `nav-menu.component.yml` — component schema and props
- `nav-menu.twig` — component template
- `nav-menu.scss` — source styles (compiles to `nav-menu.css`)
- `nav-menu.js` — open/close + staggered card reveal behavior (Drupal.behaviors + once)
- `README.md` — usage notes and examples

## Notes

- `organisms/nav` is the separate, generic template used for other menus (footer, account, social media) — it keeps the classic Bootstrap dropdown and is unaffected by this redesign.
- Depends on `core/drupal` and `core/once` (declared via `libraryOverrides`).
