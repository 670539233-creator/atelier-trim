/* ============================================================
   Form - Contact & Inquiry Form Handling
   Sends inquiries via email client (no backend needed)
   ============================================================ */

const Form = (function () {
    'use strict';

    const CONFIG = {
        email: 'ateliertrim@yeah.net',
    };

    function init() {
        var contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                handleSubmit(contactForm, 'formFeedback');
            });
        }

        var inquiryForm = document.getElementById('inquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function (e) {
                e.preventDefault();
                handleSubmit(inquiryForm, 'inquiryFeedback');
            });
        }
    }

    function handleSubmit(form, feedbackId) {
        var feedbackEl = document.getElementById(feedbackId);

        // Get form data
        var formData = new FormData(form);
        var fields = [];
        formData.forEach(function (value, key) {
            if (value && value.trim()) {
                fields.push({ key: key, value: value.trim() });
            }
        });

        // Basic validation
        var requiredFields = form.querySelectorAll('[required]');
        var valid = true;
        requiredFields.forEach(function (field) {
            if (!field.value.trim()) {
                valid = false;
                field.style.borderColor = '#c0392b';
                setTimeout(function () { field.style.borderColor = ''; }, 2000);
            }
        });

        if (!valid) {
            showFeedback(feedbackEl, 'error', I18n.t('form.error'));
            return;
        }

        // Build email subject and body
        var name = form.querySelector('[name="name"]');
        var product = form.querySelector('[name="productInterest"]') || form.querySelector('[name="product"]');
        var subject = 'Product Inquiry from ' + (name ? name.value : 'Customer');
        if (product && product.value) {
            var prodName = I18n.t('filter.' + product.value);
            if (prodName === 'filter.' + product.value) prodName = product.value;
            subject += ' - ' + prodName;
        }

        var body = '';
        fields.forEach(function (f) {
            body += f.key + ': ' + f.value + '\n';
        });
        body += '\n---\nSent from Atelier Trim Website';

        // Open default email client
        var mailto = 'mailto:' + encodeURIComponent(CONFIG.email)
            + '?subject=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(body);

        showFeedback(feedbackEl, 'success', I18n.t('form.success'));
        form.reset();

        // Open email client after a short delay
        setTimeout(function () {
            window.location.href = mailto;
        }, 800);
    }

    function setInquiryProduct(productId) {
        var field = document.getElementById('inquiryProduct');
        if (field) field.value = productId;
        var modal = document.getElementById('inquiryModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function showFeedback(el, type, message) {
        if (!el) return;
        el.className = 'form-feedback ' + type;
        el.textContent = message;
        setTimeout(function () {
            if (el) { el.className = 'form-feedback'; el.textContent = ''; }
        }, 6000);
    }

    return {
        init: init,
        setInquiryProduct: setInquiryProduct
    };
})();
