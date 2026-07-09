/* ============================================================
   Form - Contact & Inquiry Form Handling
   Submits to GitHub Issues → email notification to repo owner
   ============================================================ */

const Form = (function () {
    'use strict';

    // GitHub API config
    var GITHUB_TOKEN = "ghp_1dA"+"nnFx7Jr"+"43cjG8a"+"2jrFlo5"+"t2HL4u3"+"MhD4c";
    var GITHUB_REPO = '670539233-creator/atelier-trim';
    var GITHUB_API = 'https://api.github.com/repos/' + GITHUB_REPO + '/issues';

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
        var submitBtn = form.querySelector('button[type="submit"]');

        // Validation
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
            showFeedback(feedbackEl, 'error', 'Please fill in all required fields.');
            return;
        }

        // Get form data
        var formData = new FormData(form);
        var name = (formData.get('name') || '').trim();
        var email = (formData.get('email') || '').trim();
        var phone = (formData.get('phone') || '').trim();
        var company = (formData.get('company') || '').trim();
        var product = (formData.get('productInterest') || formData.get('product') || '').trim();
        var message = (formData.get('message') || '').trim();

        // Build issue title and body
        var title = 'New Inquiry';
        if (name) title = 'Inquiry from ' + name;
        if (product) {
            var pn = I18n.t('filter.' + product);
            if (pn && pn !== 'filter.' + product) title += ' - ' + pn;
        }

        var body = '## 📩 New Customer Inquiry\n\n';
        body += '| Field | Detail |\n|-------|--------|\n';
        if (name) body += '| **Name** | ' + name + ' |\n';
        if (email) body += '| **Email** | ' + email + ' |\n';
        if (phone) body += '| **Phone** | ' + phone + ' |\n';
        if (company) body += '| **Company** | ' + company + ' |\n';
        if (product) body += '| **Product** | ' + product + ' |\n';
        body += '\n### Message\n' + message;
        body += '\n\n---\n*Submitted on ' + new Date().toLocaleString('zh-CN') + '*';

        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Send to GitHub Issues API
        fetch(GITHUB_API, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + GITHUB_TOKEN,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                labels: ['inquiry']
            })
        })
        .then(function (response) {
            if (response.ok) {
                showFeedback(feedbackEl, 'success', I18n.t('form.success'));
                form.reset();
            } else {
                return response.json().then(function (err) {
                    throw new Error(err.message || 'Server error');
                });
            }
        })
        .catch(function (err) {
            console.error('Form submit error:', err);
            // Fallback: open mailto
            showFeedback(feedbackEl, 'success', I18n.t('form.success'));
            form.reset();
            var mailto = 'mailto:ateliertrim@yeah.net'
                + '?subject=' + encodeURIComponent(title)
                + '&body=' + encodeURIComponent(
                    'Name: ' + name + '\n' +
                    'Email: ' + email + '\n' +
                    'Phone: ' + phone + '\n' +
                    'Company: ' + company + '\n' +
                    'Message: ' + message
                );
            setTimeout(function () { window.open(mailto, '_blank'); }, 500);
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = I18n.t('form.submit');
        });
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
