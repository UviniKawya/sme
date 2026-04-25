package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByQuantityLessThanEqual(Integer threshold);
}
