// Burger menu logic — shared across all pages
(function () {
    'use strict';

    function initBurgerMenu() {
        const hamburger = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-nav-overlay');
        const closeLinks = document.querySelectorAll('.mobile-menu-close-on-click');

        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            hamburger.classList.add('open');
            mobileMenu.classList.add('open');
            if (overlay) overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        }

        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on overlay click
        if (overlay) overlay.addEventListener('click', closeMenu);

        // Close when a nav link is clicked
        closeLinks.forEach(link => link.addEventListener('click', closeMenu));

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Update active state for mobile lang buttons based on stored language
        function updateMobileLangButtons(lang) {
            document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Sync with i18n system
        document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                if (lang && typeof setLanguage === 'function') {
                    setLanguage(lang);
                }
                updateMobileLangButtons(lang);
            });
        });

        // Set initial active state
        const savedLang = localStorage.getItem('vtransfer_lang') || 'en';
        updateMobileLangButtons(savedLang);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBurgerMenu);
    } else {
        initBurgerMenu();
    }
})();
