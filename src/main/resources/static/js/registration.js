// Registration form handling
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registration-form');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const profile = {
                smeId: formData.get('smeId'),
                businessType: formData.get('businessType'),
                location: formData.get('location'),
                employees: formData.get('employees'),
                yearsOfOperation: formData.get('yearsOfOperation')
            };

            try {
                const result = await API.post('/api/sme/register', profile);
                if (result.success) {
                    document.getElementById('registration-form').classList.add('hidden');
                    document.getElementById('success-message').classList.remove('hidden');
                    showToast('Registration successful!', 'success');
                }
            } catch (error) {
                console.error('Registration failed:', error);
                showToast('Registration failed: ' + (error.error || 'Unknown error'), 'error');
            }
        });
    });
})();
