/* ============================================================
   Main - Application Entry Point
   Handles rendering, interactions, and coordination
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // PRODUCT DATA (used for rendering cards and details)
    // ============================================================
    const PRODUCTS = [
        {
            id: 'hangtags',
            images: ['images/products/hangtags/diaopai.jpg'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
            color: '#e74c3c'
        },
        {
            id: 'wovenlabels',
            images: ['images/products/wovenlabels/zhima.png'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
            color: '#3498db'
        },
        {
            id: 'woventape',
            images: ['images/products/woventape/zhidai.png'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
            color: '#2ecc71'
        },
        {
            id: 'buttons',
            images: ['images/products/buttons/niukou.png'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>',
            color: '#9b59b6'
        },
        {
            id: 'mailerboxes',
            images: ['images/products/mailerboxes/feijihe.png'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
            color: '#e67e22'
        },
        {
            id: 'garmentbags',
            images: ['images/products/garmentbags/fzd.png'],
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
            color: '#1abc9c'
        }
    ];

    const ADVANTAGES = [
        { id: 'quality', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>' },
        { id: 'delivery', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
        { id: 'custom', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' },
        { id: 'logistics', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M21 3l-7.5 7.5M8 3H3v5M3 3l7.5 7.5M8 21H3v-5M3 21l7.5-7.5M16 21h5v-5M21 21l-7.5-7.5"/><circle cx="12" cy="12" r="1"/></svg>' }
    ];

    // ---- 工厂图片配置 ----
    // 正确写法示例：src: 'images/factory/workshop1.jpg'
    //   1. 使用正斜杠 / 而不是反斜杠 \
    //   2. 写完整的文件名，如 workshop1.jpg，不是文件夹路径
    //   3. 使用相对路径（相对于 index.html 的位置）
    // 留空 '' = 显示灰色占位图；填入路径 = 显示真实照片
    const FACTORY_IMAGES = [
        { id: 'img1', src: 'images/factory/A1.jpg', large: false },
        { id: 'img2', src: 'images/factory/A2.jpg', large: false },
        { id: 'img3', src: 'images/factory/A4.jpg', large: false },
        { id: 'img6', src: 'images/factory/A3.jpg', large: false },
    ];

    // 占位图标（没有 src 时显示）
    var FACTORY_ICONS = {
        img1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        img2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
        img3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
        img4: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
        img5: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M21 3l-7.5 7.5M8 3H3v5M3 3l7.5 7.5M8 21H3v-5M3 21l7.5-7.5M16 21h5v-5M21 21l-7.5-7.5"/><circle cx="12" cy="12" r="1"/></svg>',
        img6: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    };

    // ============================================================
    // INITIALIZATION
    // ============================================================
    async function init() {
        // Initialize i18n first
        await I18n.init();

        // Initialize router
        Router.init();

        // Initialize form
        Form.init();

        // Render static content
        renderCategories();
        renderAdvantages();
        renderFactory();
        renderProducts();

        // Setup event listeners
        setupHeader();
        setupHeroSlider();
        setupModals();
        setupBackToTop();
        setupScrollReveal();
        setupFilterTabs();
        setupCategoryClicks();
        setupLangSwitcher();

        // Listen for language changes to re-render dynamic content
        I18n.onChange(function () {
            renderCategories();
            renderAdvantages();
            renderFactory();
            renderProducts();
        });

        // Listen for page changes
        Router.onChange(function () {
            // Re-render products when navigating to products page
            renderProducts();
        });
    }

    // ============================================================
    // RENDER FUNCTIONS
    // ============================================================

    function renderCategories() {
        const grid = document.getElementById('categoryGrid');
        if (!grid) return;

        grid.innerHTML = '';
        PRODUCTS.forEach(function (product) {
            const nameKey = 'categories.' + product.id;
            const descKey = 'categories.' + product.id + '_desc';
            const card = document.createElement('a');
            card.className = 'category-card';
            card.href = '#products';
            card.setAttribute('data-category', product.id);
            card.innerHTML =
                '<div class="category-card__icon">' + product.icon + '</div>' +
                '<div class="category-card__name" data-i18n="' + nameKey + '">' + I18n.t(nameKey) + '</div>' +
                '<div class="category-card__desc" data-i18n="' + descKey + '">' + I18n.t(descKey) + '</div>';
            grid.appendChild(card);
        });
    }

    function renderAdvantages() {
        const grid = document.getElementById('advantagesGrid');
        if (!grid) return;

        grid.innerHTML = '';
        ADVANTAGES.forEach(function (adv) {
            const titleKey = 'advantages.' + adv.id + '.title';
            const descKey = 'advantages.' + adv.id + '.desc';
            const card = document.createElement('div');
            card.className = 'advantage-card reveal';
            card.innerHTML =
                '<div class="advantage-card__icon">' + adv.icon + '</div>' +
                '<div class="advantage-card__title" data-i18n="' + titleKey + '">' + I18n.t(titleKey) + '</div>' +
                '<div class="advantage-card__desc" data-i18n="' + descKey + '">' + I18n.t(descKey) + '</div>';
            grid.appendChild(card);
        });
    }

    function renderFactory() {
        var grid = document.getElementById('factoryGrid');
        if (!grid) return;

        grid.innerHTML = '';
        FACTORY_IMAGES.forEach(function (item) {
            var captionKey = 'factory.' + item.id;
            var caption = I18n.t(captionKey);
            var hasImage = item.src && item.src.trim() !== '';

            var div = document.createElement('div');
            div.className = 'factory__item' + (item.large ? ' factory__item--large' : '');
            div.setAttribute('data-factory-img', item.id);

            if (hasImage) {
                // ---- 真实照片模式 ----
                div.innerHTML =
                    '<img class="factory__item-image" src="' + item.src + '" alt="' + escapeHtml(caption) + '" loading="lazy">' +
                    '<div class="factory__item-overlay">' +
                        '<span class="factory__item-caption">' + escapeHtml(caption) + '</span>' +
                    '</div>';
            } else {
                // ---- 占位图模式 ----
                div.innerHTML =
                    '<div class="factory__item-placeholder">' +
                        (FACTORY_ICONS[item.id] || '') +
                        '<span>' + escapeHtml(caption) + '</span>' +
                        '<small style="font-size:0.7rem;color:var(--clr-gray);">Click to enlarge</small>' +
                    '</div>' +
                    '<div class="factory__item-overlay">' +
                        '<span class="factory__item-caption">' + escapeHtml(caption) + '</span>' +
                    '</div>';
            }
            grid.appendChild(div);
        });

        // Click -> lightbox
        grid.querySelectorAll('.factory__item').forEach(function (item) {
            item.addEventListener('click', function () {
                var imgId = item.getAttribute('data-factory-img');
                openFactoryLightbox(imgId);
            });
        });
    }

    function openFactoryLightbox(imgId) {
        var caption = I18n.t('factory.' + imgId);

        // Find the item data
        var itemData = null;
        FACTORY_IMAGES.forEach(function (f) { if (f.id === imgId) itemData = f; });
        var hasImage = itemData && itemData.src && itemData.src.trim() !== '';

        // Remove existing lightbox
        var existing = document.querySelector('.factory-lightbox');
        if (existing) existing.remove();

        var lb = document.createElement('div');
        lb.className = 'factory-lightbox active';

        if (hasImage) {
            // ---- 真实照片灯箱 ----
            lb.innerHTML =
                '<button class="factory-lightbox__close">&times;</button>' +
                '<img class="factory-lightbox__img" src="' + itemData.src + '" alt="' + escapeHtml(caption) + '">' +
                '<span class="factory-lightbox__caption">' + escapeHtml(caption) + '</span>';
        } else {
            // ---- 占位图灯箱 ----
            lb.innerHTML =
                '<button class="factory-lightbox__close">&times;</button>' +
                '<div class="factory__item-placeholder" style="width:80%;max-width:800px;aspect-ratio:4/3;border-radius:12px;font-size:1.2rem;color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.08);">' +
                    '<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' +
                    '<span>' + escapeHtml(caption) + '</span>' +
                '</div>' +
                '<span class="factory-lightbox__caption">' + escapeHtml(caption) + '</span>';
        }

        document.body.appendChild(lb);

        // Close handlers
        var closeFn = function () { lb.classList.remove('active'); setTimeout(function () { lb.remove(); }, 300); };
        lb.addEventListener('click', function (e) { if (e.target === lb) closeFn(); });
        lb.querySelector('.factory-lightbox__close').addEventListener('click', closeFn);
        document.addEventListener('keydown', function escFn(e) {
            if (e.key === 'Escape') { closeFn(); document.removeEventListener('keydown', escFn); }
        });
    }

    function renderProducts(filterId) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        var productsToShow = PRODUCTS;
        if (filterId && filterId !== 'all') {
            productsToShow = PRODUCTS.filter(function (p) { return p.id === filterId; });
        }

        grid.innerHTML = '';
        if (productsToShow.length === 0) {
            grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:2rem;color:var(--clr-text-light);">No products found.</p>';
            return;
        }

        productsToShow.forEach(function (product) {
            var nameKey = 'product_data.' + product.id + '.name';
            var descKey = 'product_data.' + product.id + '.description';
            var catKey = 'filter.' + product.id;

            var name = I18n.t(nameKey);
            var catName = I18n.t(catKey);
            var desc = I18n.t(descKey);

            // Truncate description for card
            var shortDesc = desc.length > 80 ? desc.substring(0, 80) + '...' : desc;
            if (shortDesc === descKey) shortDesc = '';

            var hasImage = product.images && product.images.length > 0;
            var imgHTML = '';
            if (hasImage) {
                imgHTML = '<img src="' + product.images[0] + '" alt="' + escapeHtml(name) + '" loading="lazy">';
            } else {
                imgHTML = '<div class="product-card__image--placeholder"><span>' + escapeHtml(name) + '</span></div>';
            }

            var card = document.createElement('div');
            card.className = 'product-card reveal';
            card.setAttribute('data-category', product.id);
            card.innerHTML =
                '<div class="product-card__image" data-product="' + product.id + '">' +
                    imgHTML +
                '</div>' +
                '<div class="product-card__body">' +
                    '<span style="font-size:0.75rem;color:var(--clr-accent);text-transform:uppercase;letter-spacing:1px;font-weight:600;">' + escapeHtml(catName) + '</span>' +
                    '<div class="product-card__name">' + escapeHtml(name) + '</div>' +
                    (shortDesc ? '<div class="product-card__desc">' + escapeHtml(shortDesc) + '</div>' : '') +
                    '<div class="product-card__actions">' +
                        '<button class="btn btn--outline btn--sm" data-detail="' + product.id + '" style="color:var(--clr-primary);border-color:var(--clr-light-gray);padding:8px 16px;font-size:0.85rem;">' + I18n.t('products.viewDetails') + '</button>' +
                        '<button class="btn btn--primary btn--sm" data-inquiry="' + product.id + '" style="padding:8px 16px;font-size:0.85rem;">' + I18n.t('products.inquiry') + '</button>' +
                    '</div>' +
                '</div>';
            grid.appendChild(card);
        });

        // Attach event listeners
        grid.querySelectorAll('[data-detail]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                openProductDetail(btn.getAttribute('data-detail'));
            });
        });

        grid.querySelectorAll('[data-inquiry]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                Form.setInquiryProduct(btn.getAttribute('data-inquiry'));
            });
        });

        grid.querySelectorAll('.product-card__image').forEach(function (img) {
            img.addEventListener('click', function () {
                openProductDetail(img.getAttribute('data-product'));
            });
        });
    }

    // ============================================================
    // PRODUCT DETAIL MODAL
    // ============================================================

    function openProductDetail(productId) {
        var product = PRODUCTS.find(function (p) { return p.id === productId; });
        if (!product) return;

        var dataKey = 'product_data.' + productId;
        var name = I18n.t(dataKey + '.name');
        var desc = I18n.t(dataKey + '.description');
        var cat = I18n.t('filter.' + productId);

        // Build specs table
        var specsHtml = '';
        var specsData = null;
        try {
            // Try to get specs from translations
            var specKeys = ['material', 'type', 'process', 'width', 'color', 'size', 'moq', 'delivery', 'printing', 'thickness', 'folding'];
            specKeys.forEach(function (key) {
                var specVal = I18n.t(dataKey + '.specs.' + key);
                if (specVal !== dataKey + '.specs.' + key) {
                    specsHtml += '<tr><th>' + capitalize(key) + '</th><td>' + escapeHtml(specVal) + '</td></tr>';
                }
            });
        } catch (e) {
            // ignore
        }

        var hasImage = product.images && product.images.length > 0;
        var detailImgHTML = '';
        if (hasImage) {
            detailImgHTML = '<img src="' + product.images[0] + '" alt="' + escapeHtml(name) + '" style="width:100%;height:100%;object-fit:cover;">';
        } else {
            detailImgHTML = '<div class="product-card__image--placeholder">' +
                '<span style="font-weight:600;color:var(--clr-primary);">' + escapeHtml(name) + '</span>' +
                '<small style="font-size:0.8rem;color:var(--clr-gray);">Product Image</small>' +
            '</div>';
        }

        var modalBody = document.getElementById('modalBody');
        modalBody.innerHTML =
            '<div class="product-detail">' +
                '<div class="product-detail__image">' +
                    detailImgHTML +
                '</div>' +
                '<div class="product-detail__info">' +
                    '<span class="product-detail__category">' + escapeHtml(cat) + '</span>' +
                    '<h2>' + escapeHtml(name) + '</h2>' +
                    '<p class="product-detail__desc">' + escapeHtml(desc) + '</p>' +
                    (specsHtml ?
                        '<div class="product-detail__specs"><h4>' + I18n.t('products.specs') + '</h4>' +
                        '<table class="specs-table">' + specsHtml + '</table></div>'
                    : '') +
                    '<button class="btn btn--primary" onclick="Form.setInquiryProduct(\'' + productId + '\')">' + I18n.t('products.inquiry') + '</button>' +
                '</div>' +
            '</div>';

        // Show modal
        openModal('productModal');
    }

    // ============================================================
    // MODALS
    // ============================================================

    function openModal(id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function setupModals() {
        // Product detail modal
        var productModal = document.getElementById('productModal');
        if (productModal) {
            document.getElementById('modalClose').addEventListener('click', function () {
                closeModal('productModal');
            });
            document.getElementById('modalOverlay').addEventListener('click', function () {
                closeModal('productModal');
            });
        }

        // Inquiry modal
        var inquiryModal = document.getElementById('inquiryModal');
        if (inquiryModal) {
            document.getElementById('inquiryClose').addEventListener('click', function () {
                closeModal('inquiryModal');
            });
            document.getElementById('inquiryOverlay').addEventListener('click', function () {
                closeModal('inquiryModal');
            });
        }

        // Close modals on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal('productModal');
                closeModal('inquiryModal');
            }
        });
    }

    // ============================================================
    // HERO SLIDER
    // ============================================================

    function setupHeroSlider() {
        var slides = document.querySelectorAll('.hero__slide');
        var dots = document.querySelectorAll('.hero__dot');
        if (slides.length < 2) return;

        var currentSlide = 0;
        var interval;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        // Dot clicks
        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var idx = parseInt(dot.getAttribute('data-slide'));
                goToSlide(idx);
                resetInterval();
            });
        });

        // Auto-play
        function startInterval() {
            interval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(interval);
            startInterval();
        }

        startInterval();
    }

    // ============================================================
    // HEADER & NAVIGATION
    // ============================================================

    function setupHeader() {
        var header = document.getElementById('header');
        var menuToggle = document.getElementById('menuToggle');
        var navMenu = document.getElementById('navMenu');

        // Scroll effect: add shadow when scrolled
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });

        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', function () {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navMenu.querySelectorAll('.header__nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================================================
    // LANGUAGE SWITCHER
    // ============================================================

    function setupLangSwitcher() {
        var langBtn = document.getElementById('langBtn');
        var langDropdown = document.getElementById('langDropdown');

        if (!langBtn || !langDropdown) return;

        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown on outside click
        document.addEventListener('click', function () {
            langDropdown.classList.remove('active');
        });

        // Language selection
        langDropdown.querySelectorAll('a[data-lang]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var lang = link.getAttribute('data-lang');
                I18n.setLanguage(lang);
                langDropdown.classList.remove('active');
            });
        });
    }

    // ============================================================
    // PRODUCT FILTER TABS
    // ============================================================

    function setupFilterTabs() {
        var tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                // Update active state
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');

                // Filter products
                var filter = tab.getAttribute('data-filter');
                renderProducts(filter);
            });
        });
    }

    // ============================================================
    // CATEGORY CARD CLICKS -> Navigate to products with filter
    // ============================================================

    function setupCategoryClicks() {
        var grid = document.getElementById('categoryGrid');
        if (!grid) return;

        grid.addEventListener('click', function (e) {
            var card = e.target.closest('.category-card');
            if (!card) return;
            e.preventDefault();
            var category = card.getAttribute('data-category');
            // Navigate to products page
            Router.navigate('products');
            // After a brief delay, filter by category
            setTimeout(function () {
                var tabs = document.querySelectorAll('.filter-tab');
                tabs.forEach(function (t) {
                    t.classList.remove('active');
                    if (t.getAttribute('data-filter') === category) {
                        t.classList.add('active');
                    }
                });
                renderProducts(category);
            }, 200);
        });
    }

    // ============================================================
    // BACK TO TOP
    // ============================================================

    function setupBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================================

    function setupScrollReveal() {
        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all .reveal elements
        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });

        // Also observe dynamically added .reveal elements
        var mutationObserver = new MutationObserver(function () {
            document.querySelectorAll('.reveal:not(.revealed)').forEach(function (el) {
                observer.observe(el);
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
    }

    // ============================================================
    // START THE APP
    // ============================================================
    document.addEventListener('DOMContentLoaded', init);

    // Make Form available globally for inline onclick handlers
    window.Form = Form;
    window.I18n = I18n;
    window.Router = Router;
})();
