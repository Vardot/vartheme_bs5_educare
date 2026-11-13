<img src="logo.png" alt="Vartheme BS5 Educare" width="220">

# Vartheme BS5 Educare
[![pipeline status](https://git.drupalcode.org/project/vartheme_bs5_educare/badges/1.0.x/pipeline.svg)](https://git.drupalcode.org/project/vartheme_bs5_educare/-/pipelines)
[![Vartheme BS5 Educare](https://img.shields.io/badge/Vartheme%20BS5%20Educare-1.0.0--alpha2-0d6efc?labelColor=001d38&style=flat-square)](https://git.drupalcode.org/project/vartheme_bs5_educare/-/pipelines?ref=1.0.0-alpha2)

The Bootstrap 5 front-end theme for the Educare site template, with an education-focused design system.

## Requirement

After creating a **Varbase 11** or a **Drupal CMS** project with DDEV, require and enable Vartheme BS5 Educare:

```bash
ddev composer require drupal/vartheme_bs5_educare:1.0.x-dev
ddev drush theme:install vartheme_bs5_educare
ddev drush config:set system.theme default vartheme_bs5_educare -y
ddev drush cache:rebuild
```

It is the Bootstrap 5 front-end theme for the [Educare](https://www.drupal.org/project/educare) site template, cloned from [Vartheme BS5](https://www.drupal.org/project/vartheme_bs5) (Single Directory Components + Storybook).

## Content Security Policy

The footer Copy link runs through htmx `hx-on`, which uses eval. A site that enables a strict Content Security Policy needs `'unsafe-eval'` in `script-src` for it to work.

## Email logo

`logo-email.png` is `logo.svg` as a 99×30 PNG, for HTML emails. Many email clients (Gmail, Outlook) do not show SVG images, so a PNG is needed there. It keeps the site logo's displayed size because the email template sets no width on the logo. Educare points the Easy Email Theme logo at it.

## Learn More

- [Issue #3607229](https://www.drupal.org/project/vartheme_bs5_educare/issues/3607229)
- [Vartheme BS5](https://www.drupal.org/project/vartheme_bs5)
