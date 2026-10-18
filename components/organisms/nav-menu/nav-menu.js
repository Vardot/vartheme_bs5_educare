/**
 * @file
 * Mega menu open/close behavior for the Nav Menu component.
 *
 * Progressive enhancement: every top-level toggle is a real menu link with
 * an href, so the page stays navigable without JS (each item's own page
 * remains reachable). This behavior layers the mega menu panel's
 * open/close interaction and staggered card reveal on top of that —
 * matching the existing Bootstrap dropdown-toggle it replaces, which also
 * requires JS to open.
 *
 * Only one mega menu panel is open at a time. Closing happens on: toggling
 * an already-open item, clicking outside the nav menu, pressing Escape, or
 * scrolling/resizing (panels are `position: fixed` so they can span the
 * full viewport width regardless of where the nav sits horizontally in the
 * header — see nav-menu.scss — which means their `top` offset has to be
 * computed here rather than via CSS, and can't track the header's position
 * on its own).
 *
 * Below xl the menu sits in the header's collapsed navbar: an expandable item
 * opens its child list in place (an accordion), and the open navbar is a
 * full-height panel under the header that holds focus until it closes.
 */
((Drupal, once) => {
  const CARD_STAGGER_BASE_MS = 100;
  const CARD_STAGGER_STEP_MS = 100;

  // Matches while the header menu is collapsed (`navbar-expand-xl`).
  const collapsedQuery = () => {
    const xl =
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--bs-breakpoint-xl')
        .trim() || '1200px';
    return window.matchMedia(`(max-width: ${parseFloat(xl) - 0.02}px)`);
  };

  Drupal.behaviors.navMenuMegaMenu = {
    attach(context) {
      once('nav-menu-mega-menu', '.nav-menu', context).forEach((navMenu) => {
        const header = navMenu.closest('header, [role="banner"]');
        const collapsed = collapsedQuery();
        const toggles = Array.from(
          navMenu.querySelectorAll('[data-mega-menu-toggle]'),
        );

        let cardTimers = [];

        const clearCardTimers = () => {
          cardTimers.forEach((timer) => window.clearTimeout(timer));
          cardTimers = [];
        };

        const hideCardsNow = (panel) => {
          clearCardTimers();
          panel.querySelectorAll('.mega-menu__card').forEach((card) => {
            card.classList.remove('is-visible');
          });
        };

        const revealCardsStaggered = (panel) => {
          clearCardTimers();
          panel.querySelectorAll('.mega-menu__card').forEach((card, i) => {
            const timer = window.setTimeout(
              () => card.classList.add('is-visible'),
              CARD_STAGGER_BASE_MS + i * CARD_STAGGER_STEP_MS,
            );
            cardTimers.push(timer);
          });
        };

        let isOpen = false;

        // The panel opens under the whole header, not just under this nav.
        const positionPanel = (panel) => {
          const anchor = header || navMenu;
          panel.style.top = `${Math.round(anchor.getBoundingClientRect().bottom)}px`;
        };

        const subListFor = (toggle) =>
          document.getElementById(
            `${toggle.getAttribute('data-mega-menu-toggle')}-list`,
          );

        // Each toggle controls its mega menu, or its child list while collapsed.
        const syncControls = () => {
          toggles.forEach((toggle) => {
            const panelId = toggle.getAttribute('data-mega-menu-toggle');
            const list = subListFor(toggle);
            toggle.setAttribute(
              'aria-controls',
              collapsed.matches && list ? list.id : panelId,
            );
          });
        };

        const closeAll = () => {
          isOpen = false;
          toggles.forEach((toggle) => {
            toggle.classList.remove('is-active');
            toggle.setAttribute('aria-expanded', 'false');

            const panel = document.getElementById(
              toggle.getAttribute('data-mega-menu-toggle'),
            );
            if (panel) {
              panel.hidden = true;
              panel.setAttribute('aria-hidden', 'true');
              hideCardsNow(panel);
            }

            const list = subListFor(toggle);
            if (list) {
              list.hidden = true;
            }
          });
        };

        const toggleSubList = (toggle) => {
          const list = subListFor(toggle);
          if (!list) {
            return;
          }
          const opening = list.hidden;
          list.hidden = !opening;
          toggle.classList.toggle('is-active', opening);
          toggle.setAttribute('aria-expanded', String(opening));
        };

        toggles.forEach((toggle) => {
          toggle.addEventListener('click', (event) => {
            event.preventDefault();

            if (collapsed.matches) {
              toggleSubList(toggle);
              return;
            }

            const wasActive = toggle.classList.contains('is-active');
            closeAll();

            if (wasActive) {
              return;
            }

            const panel = document.getElementById(
              toggle.getAttribute('data-mega-menu-toggle'),
            );
            if (!panel) {
              return;
            }

            isOpen = true;
            toggle.classList.add('is-active');
            toggle.setAttribute('aria-expanded', 'true');
            positionPanel(panel);
            panel.hidden = false;
            panel.setAttribute('aria-hidden', 'false');
            revealCardsStaggered(panel);
          });
        });

        document.addEventListener('click', (event) => {
          if (isOpen && !navMenu.contains(event.target)) {
            closeAll();
          }
        });

        document.addEventListener('keydown', (event) => {
          if (isOpen && event.key === 'Escape') {
            closeAll();
          }
        });

        window.addEventListener(
          'scroll',
          () => {
            if (isOpen) {
              closeAll();
            }
          },
          { passive: true },
        );

        window.addEventListener('resize', () => {
          if (isOpen) {
            closeAll();
          }
        });

        // The header's collapsed navbar, when this menu sits in one.
        const collapse = navMenu.closest('.navbar-collapse');
        const toggler =
          collapse && collapse.id
            ? document.querySelector(`[data-bs-target="#${collapse.id}"]`)
            : null;
        const isMenuOpen = () =>
          Boolean(collapse && collapse.classList.contains('show'));
        let inertNodes = [];

        const setPanelTop = () => {
          if (collapse && header) {
            collapse.style.setProperty(
              '--nav-menu-panel-top',
              `${Math.round(header.getBoundingClientRect().bottom)}px`,
            );
          }
        };

        // While the panel is open the page behind it neither scrolls nor
        // takes focus: everything outside the header is made inert.
        const lockPage = () => {
          const root = document.documentElement;
          // Keep the scrollbar's room so the header does not shift sideways.
          const scrollbar = window.innerWidth - root.clientWidth;
          if (scrollbar > 0) {
            document.body.style.paddingInlineEnd = `${scrollbar}px`;
          }
          root.classList.add('overflow-hidden');
          const path = [];
          for (let node = header; node && node !== document.body; ) {
            path.push(node);
            node = node.parentElement;
          }
          path.forEach((node) => {
            Array.from(node.parentElement.children).forEach((sibling) => {
              if (sibling !== node && !sibling.inert) {
                sibling.inert = true;
                inertNodes.push(sibling);
              }
            });
          });
        };

        const unlockPage = () => {
          document.documentElement.classList.remove('overflow-hidden');
          document.body.style.removeProperty('padding-inline-end');
          inertNodes.forEach((node) => {
            node.inert = false;
          });
          inertNodes = [];
        };

        const closeMenu = () => {
          if (isMenuOpen() && toggler) {
            toggler.click();
          }
        };

        if (collapse && toggler && header) {
          collapse.addEventListener('show.bs.collapse', (event) => {
            if (event.target === collapse && collapsed.matches) {
              setPanelTop();
              lockPage();
            }
          });

          collapse.addEventListener('shown.bs.collapse', (event) => {
            const first = collapse.querySelector('.nav-link');
            if (event.target === collapse && first) {
              first.focus();
            }
          });

          collapse.addEventListener('hide.bs.collapse', (event) => {
            if (event.target === collapse) {
              unlockPage();
            }
          });

          document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen() && collapsed.matches) {
              closeMenu();
              toggler.focus();
            }
          });

          // Opening the header search closes the menu, so the two never stack.
          header.addEventListener('show.bs.dropdown', closeMenu);

          window.addEventListener('resize', () => {
            if (isMenuOpen()) {
              setPanelTop();
            }
          });
        }

        // Crossing xl swaps the mega menus and the collapsed panel, so start
        // from a closed menu either way.
        collapsed.addEventListener('change', () => {
          closeAll();
          closeMenu();
          syncControls();
        });

        syncControls();
      });
    },
  };
})(Drupal, once);
