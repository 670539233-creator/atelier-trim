/* ============================================================
   Router - Simple Hash-based Page Router
   ============================================================ */

const Router = (function () {
    'use strict';

    let currentPage = 'home';
    let listeners = [];

    function init() {
        // Read initial hash or default to home
        const hash = window.location.hash.replace('#', '') || 'home';
        navigate(hash, false);

        // Listen for hash changes
        window.addEventListener('hashchange', function () {
            const newHash = window.location.hash.replace('#', '') || 'home';
            navigate(newHash, false);
        });
    }

    function navigate(page, updateHash) {
        if (updateHash !== false) {
            window.location.hash = page;
            return; // hashchange will trigger navigate again
        }

        if (page === currentPage) return;

        // Deactivate current page
        const oldPage = document.getElementById('page-' + currentPage);
        if (oldPage) oldPage.classList.remove('active');

        // Activate new page
        const newPage = document.getElementById('page-' + page);
        if (newPage) {
            newPage.classList.add('active');
            currentPage = page;

            // Update nav links
            document.querySelectorAll('.header__nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-page') === page);
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Notify listeners
            notifyListeners(page);
        }
    }

    function getCurrentPage() {
        return currentPage;
    }

    function onChange(fn) {
        listeners.push(fn);
    }

    function notifyListeners(page) {
        listeners.forEach(fn => fn(page));
    }

    return {
        init,
        navigate,
        getCurrentPage,
        onChange
    };
})();
