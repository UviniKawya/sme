// Main application JavaScript
(function() {
    'use strict';

    // Navigation active state
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update page title in top nav
    const pageTitle = document.querySelector('#page-title');
    if (pageTitle) {
        document.title = `${pageTitle.textContent} | SME Digital Readiness`;
    }

    // Global API helper
    window.API = {
        baseUrl: '',
        async get(endpoint) {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            return response.json();
        },
        async post(endpoint, data) {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        async put(endpoint, data) {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        async delete(endpoint) {
            const response = await fetch(`${this.baseUrl}${endpoint}`, { method: 'DELETE' });
            return response.json();
        }
    };

    // Toast notifications
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Confirm dialog
    window.confirmAction = function(message) {
        return confirm(message);
    };
})();
