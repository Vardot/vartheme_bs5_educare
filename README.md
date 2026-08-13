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

## Learn More

- [Issue #3607229](https://www.drupal.org/project/vartheme_bs5_educare/issues/3607229)
- [Vartheme BS5](https://www.drupal.org/project/vartheme_bs5)
