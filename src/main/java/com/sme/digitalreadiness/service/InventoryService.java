package com.sme.digitalreadiness.service;

import com.sme.digitalreadiness.model.InventoryItem;
import com.sme.digitalreadiness.repository.InventoryItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    private final InventoryItemRepository inventoryItemRepository;

    public InventoryService(InventoryItemRepository inventoryItemRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
    }

    public List<InventoryItem> getAllItems() {
        return inventoryItemRepository.findAll();
    }

    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryItemRepository.findById(id);
    }

    public InventoryItem createItem(InventoryItem item) {
        return inventoryItemRepository.save(item);
    }

    public InventoryItem updateItem(Long id, InventoryItem itemDetails) {
        InventoryItem item = inventoryItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inventory item not found: " + id));
        item.setName(itemDetails.getName());
        item.setQuantity(itemDetails.getQuantity());
        item.setLowStockThreshold(itemDetails.getLowStockThreshold());
        return inventoryItemRepository.save(item);
    }

    public void deleteItem(Long id) {
        inventoryItemRepository.deleteById(id);
    }

    public List<InventoryItem> getLowStockItems() {
        return inventoryItemRepository.findByQuantityLessThanEqual(10);
    }
}
