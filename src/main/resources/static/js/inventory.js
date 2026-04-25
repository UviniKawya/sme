// Inventory management JavaScript
(function() {
    'use strict';

    let inventoryItems = [];

    document.addEventListener('DOMContentLoaded', function() {
        loadInventory();
        setupModalHandlers();
    });

    async function loadInventory() {
        try {
            inventoryItems = await API.get('/api/inventory');
            renderInventory();
        } catch (error) {
            console.error('Failed to load inventory:', error);
            // Use placeholder data for demo
            inventoryItems = [
                { id: 1, name: 'Laptop Computers', quantity: 15, lowStockThreshold: 10 },
                { id: 2, name: 'Office Chairs', quantity: 8, lowStockThreshold: 5 },
                { id: 3, name: 'Printing Paper (Reams)', quantity: 50, lowStockThreshold: 20 },
                { id: 4, name: 'Ink Cartridges', quantity: 3, lowStockThreshold: 5 },
                { id: 5, name: ' USB Drives', quantity: 25, lowStockThreshold: 10 }
            ];
            renderInventory();
        }
    }

    function renderInventory() {
        const tbody = document.getElementById('inventory-tbody');
        tbody.innerHTML = '';

        let lowStockCount = 0;
        inventoryItems.forEach(item => {
            if (item.quantity <= item.lowStockThreshold) {
                lowStockCount++;
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.name}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${item.quantity}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${item.lowStockThreshold}</td>
                <td class="px-6 py-4">
                    <span class="badge ${item.quantity <= item.lowStockThreshold ? 'badge-warning' : 'badge-success'}">
                        ${item.quantity <= item.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3" onclick="editItem(${item.id})">Edit</button>
                    <button class="text-red-600 hover:text-red-800 text-sm font-medium" onclick="deleteItem(${item.id}, '${item.name}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Update low stock alert
        const alertDiv = document.getElementById('low-stock-alerts');
        const alertText = document.getElementById('low-stock-count');
        alertText.textContent = `${lowStockCount} item${lowStockCount !== 1 ? 's' : ''} below threshold`;
        if (lowStockCount > 0) {
            alertDiv.classList.remove('hidden');
        } else {
            alertDiv.classList.add('hidden');
        }
    }

    function setupModalHandlers() {
        const modal = document.getElementById('item-modal');
        const form = document.getElementById('item-form');

        document.getElementById('add-item-btn').addEventListener('click', function() {
            openItemModal();
        });

        document.getElementById('cancel-modal').addEventListener('click', function() {
            modal.classList.add('hidden');
        });

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await saveItem();
        });
    }

    function openItemModal(item = null) {
        const modal = document.getElementById('item-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('item-form');

        if (item) {
            title.textContent = 'Edit Inventory Item';
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-quantity').value = item.quantity;
            document.getElementById('item-threshold').value = item.lowStockThreshold;
        } else {
            title.textContent = 'Add Inventory Item';
            form.reset();
            document.getElementById('item-id').value = '';
        }

        modal.classList.remove('hidden');
    }

    async function saveItem() {
        const id = document.getElementById('item-id').value;
        const item = {
            name: document.getElementById('item-name').value,
            quantity: parseInt(document.getElementById('item-quantity').value),
            lowStockThreshold: parseInt(document.getElementById('item-threshold').value)
        };

        try {
            if (id) {
                await API.put(`/api/inventory/${id}`, item);
                showToast('Item updated successfully', 'success');
            } else {
                await API.post('/api/inventory', item);
                showToast('Item added successfully', 'success');
            }
            document.getElementById('item-modal').classList.add('hidden');
            loadInventory();
        } catch (error) {
            console.error('Failed to save item:', error);
            showToast('Failed to save item', 'error');
        }
    }

    window.editItem = function(id) {
        const item = inventoryItems.find(i => i.id === id);
        if (item) openItemModal(item);
    };

    window.deleteItem = async function(id, name) {
        if (!confirmAction(`Are you sure you want to delete "${name}"?`)) return;

        try {
            await API.delete(`/api/inventory/${id}`);
            showToast('Item deleted', 'success');
            loadInventory();
        } catch (error) {
            console.error('Failed to delete item:', error);
            showToast('Failed to delete item', 'error');
        }
    };
})();
