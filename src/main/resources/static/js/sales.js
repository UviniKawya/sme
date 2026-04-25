// Sales management JavaScript
(function() {
    'use strict';

    let salesEntries = [];

    document.addEventListener('DOMContentLoaded', function() {
        loadSales();
        setupModalHandlers();
    });

    async function loadSales() {
        try {
            salesEntries = await API.get('/api/sales');
            renderSales();
        } catch (error) {
            console.error('Failed to load sales:', error);
            // Placeholder data
            salesEntries = [
                { id: 1, invoiceNumber: 'INV-001', customerName: 'ABC Company', amount: 1250.00, date: '2025-01-15', paymentStatus: 'PAID' },
                { id: 2, invoiceNumber: 'INV-002', customerName: 'XYZ Corp', amount: 3200.50, date: '2025-01-20', paymentStatus: 'PENDING' },
                { id: 3, invoiceNumber: 'INV-003', customerName: 'Local Shop', amount: 750.00, date: '2025-01-22', paymentStatus: 'OVERDUE' },
                { id: 4, invoiceNumber: 'INV-004', customerName: 'Tech Startup', amount: 5000.00, date: '2025-01-18', paymentStatus: 'PAID' }
            ];
            renderSales();
        }
    }

    function renderSales() {
        const tbody = document.getElementById('sales-tbody');
        tbody.innerHTML = '';

        let pendingCount = 0, overdueCount = 0;
        salesEntries.forEach(sale => {
            if (sale.paymentStatus === 'PENDING') pendingCount++;
            if (sale.paymentStatus === 'OVERDUE') overdueCount++;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${sale.invoiceNumber}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${sale.customerName}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${formatDate(sale.date)}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">$${sale.amount.toFixed(2)}</td>
                <td class="px-6 py-4">
                    <span class="badge ${getStatusClass(sale.paymentStatus)}">${sale.paymentStatus}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3" onclick="editSale(${sale.id})">Edit</button>
                    <button class="text-red-600 hover:text-red-800 text-sm font-medium" onclick="deleteSale(${sale.id}, '${sale.invoiceNumber}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Update summary cards
        document.getElementById('total-sales').textContent = salesEntries.length;
        document.getElementById('pending-count').textContent = pendingCount;
        document.getElementById('overdue-count').textContent = overdueCount;
    }

    function getStatusClass(status) {
        switch(status) {
            case 'PAID': return 'badge-success';
            case 'PENDING': return 'badge-warning';
            case 'OVERDUE': return 'badge-danger';
            default: return 'badge-neutral';
        }
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function setupModalHandlers() {
        const modal = document.getElementById('sale-modal');
        const form = document.getElementById('sale-form');

        document.getElementById('add-sale-btn').addEventListener('click', function() {
            openSaleModal();
        });

        document.getElementById('cancel-sale-modal').addEventListener('click', function() {
            modal.classList.add('hidden');
        });

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await saveSale();
        });
    }

    function openSaleModal(sale = null) {
        const modal = document.getElementById('sale-modal');
        const title = document.getElementById('sale-modal-title');

        if (sale) {
            title.textContent = 'Edit Sale Entry';
            document.getElementById('sale-id').value = sale.id;
            document.getElementById('sale-invoice').value = sale.invoiceNumber;
            document.getElementById('sale-customer').value = sale.customerName;
            document.getElementById('sale-amount').value = sale.amount;
            document.getElementById('sale-date').value = sale.date;
            document.getElementById('sale-status').value = sale.paymentStatus;
        } else {
            title.textContent = 'Add Sale Entry';
            document.getElementById('sale-form').reset();
            document.getElementById('sale-id').value = '';
            // Set today's date as default
            document.getElementById('sale-date').value = new Date().toISOString().split('T')[0];
        }

        modal.classList.remove('hidden');
    }

    async function saveSale() {
        const id = document.getElementById('sale-id').value;
        const sale = {
            invoiceNumber: document.getElementById('sale-invoice').value,
            customerName: document.getElementById('sale-customer').value,
            amount: parseFloat(document.getElementById('sale-amount').value),
            date: document.getElementById('sale-date').value,
            paymentStatus: document.getElementById('sale-status').value
        };

        try {
            if (id) {
                await API.put(`/api/sales/${id}`, sale);
                showToast('Sale updated successfully', 'success');
            } else {
                await API.post('/api/sales', sale);
                showToast('Sale added successfully', 'success');
            }
            document.getElementById('sale-modal').classList.add('hidden');
            loadSales();
        } catch (error) {
            console.error('Failed to save sale:', error);
            showToast('Failed to save sale', 'error');
        }
    }

    window.editSale = function(id) {
        const sale = salesEntries.find(s => s.id === id);
        if (sale) openSaleModal(sale);
    };

    window.deleteSale = async function(id, invoiceNumber) {
        if (!confirmAction(`Are you sure you want to delete invoice ${invoiceNumber}?`)) return;

        try {
            await API.delete(`/api/sales/${id}`);
            showToast('Sale deleted', 'success');
            loadSales();
        } catch (error) {
            console.error('Failed to delete sale:', error);
            showToast('Failed to delete sale', 'error');
        }
    };
})();
