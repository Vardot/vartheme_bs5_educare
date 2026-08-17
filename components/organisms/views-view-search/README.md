# Views view search

Implementation to display a search results view with the filter bar above the result summary.

## Bootstrap reference

> [Bootstrap 5.3 — Background](https://getbootstrap.com/docs/5.3/utilities/background/)

## What it does

The shared Views view component prints the header before the exposed form, which puts the result count above the search box on a results page. This component reorders those two and prints the view title as the page `<h1>`, because Drupal Canvas owns the content region and no page title block runs there.

Use it when a view listing needs to:

- carry its own `<h1>`, taken from the view title
- show the exposed filter bar directly under that heading, through the Views exposed filters component
- follow it with the result summary the view header carries, then the rows
- present an empty result set as a quiet notice rather than bare text

## Files

- `views-view-search.component.yml` — component schema and props
- `views-view-search.twig` — component template
- `views-view-search.scss` / `views-view-search.css` — component styles
- `README.md` — usage notes and examples

## Props overview

Same variables as the Views view component; see `template_preprocess_views_view()`.

## Example

```twig
{% include "vartheme_bs5_educare:views-view-search" %}
```

## Notes

- The component is `noUi: true` — it is not offered in the Canvas component list; `templates/views/views-view--search--page.html.twig` includes it for the search results page.
- The filter bar is the `vartheme_bs5_educare:views-exposed-filters` component, so the results page and the listing pages share one exposed-filter skin.
- `views-view-search.css` is build output — edit `views-view-search.scss` and run `yarn components:build`.
