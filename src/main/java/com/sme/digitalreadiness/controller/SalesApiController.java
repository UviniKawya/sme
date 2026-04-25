package com.sme.digitalreadiness.controller;

import com.sme.digitalreadiness.model.SalesEntry;
import com.sme.digitalreadiness.service.SalesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SalesApiController {
    private final SalesService salesService;

    public SalesApiController(SalesService salesService) {
        this.salesService = salesService;
    }

    @GetMapping
    public ResponseEntity<List<SalesEntry>> getAllSales() {
        return ResponseEntity.ok(salesService.getAllSales());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<SalesEntry>> getPending() {
        return ResponseEntity.ok(salesService.getPendingPayments());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<SalesEntry>> getOverdue() {
        return ResponseEntity.ok(salesService.getOverduePayments());
    }

    @PostMapping
    public ResponseEntity<SalesEntry> createSale(@RequestBody SalesEntry sale) {
        return ResponseEntity.ok(salesService.createSale(sale));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesEntry> updateSale(@PathVariable Long id, @RequestBody SalesEntry sale) {
        return ResponseEntity.ok(salesService.updateSale(id, sale));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable Long id) {
        salesService.deleteSale(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
