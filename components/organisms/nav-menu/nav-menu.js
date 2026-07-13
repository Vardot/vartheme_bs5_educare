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
 */
((Drupal, once) => {
  const CARD_STAGGER_BASE_MS = 100;
  const CARD_STAGGER_STEP_MS = 100;

  Drupal.behaviors.navMenuMegaMenu = {
    attach(context) {
      once('nav-menu-mega-menu', '.nav-menu', context).forEach((navMenu) => {
        const toggles = Array.from(
          navMenu.querySelectorAll('[data-mega-menu-toggle]'),
        );
        if (!toggles.length) {
          return;
        }

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

        const positionPanel = (panel) => {
          panel.style.top = `${Math.round(navMenu.getBoundingClientRect().bottom)}px`;
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
          });
        };

        toggles.forEach((toggle) => {
          toggle.addEventListener('click', (event) => {
            event.preventDefault();

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
          if (!navMenu.contains(event.target)) {
            closeAll();
          }
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
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
      });
    },
  };
})(Drupal, once);
