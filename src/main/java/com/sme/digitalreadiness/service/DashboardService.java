package com.sme.digitalreadiness.service;

import com.sme.digitalreadiness.model.InventoryItem;
import com.sme.digitalreadiness.model.SalesEntry;
import com.sme.digitalreadiness.model.SMEProfile;
import com.sme.digitalreadiness.repository.InventoryItemRepository;
import com.sme.digitalreadiness.repository.SalesEntryRepository;
import com.sme.digitalreadiness.repository.SMEProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {
    private final SMEProfileRepository smeProfileRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final SalesEntryRepository salesEntryRepository;

    public DashboardService(SMEProfileRepository smeProfileRepository,
                           InventoryItemRepository inventoryItemRepository,
                           SalesEntryRepository salesEntryRepository) {
        this.smeProfileRepository = smeProfileRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.salesEntryRepository = salesEntryRepository;
    }

    public DashboardStats getStats() {
        long totalInventory = inventoryItemRepository.count();
        long lowStockCount = inventoryItemRepository.findByQuantityLessThanEqual(10).size(); // threshold 10 for demo
        long totalSales = salesEntryRepository.count();
        double totalRevenue = salesEntryRepository.findAll().stream()
            .mapToDouble(SalesEntry::getAmount)
            .sum();

        List<SalesEntry> pendingSales = salesEntryRepository.findByPaymentStatusOrderByDateDesc(SalesEntry.PaymentStatus.PENDING);
        List<SalesEntry> overdueSales = salesEntryRepository.findByPaymentStatusOrderByDateDesc(SalesEntry.PaymentStatus.OVERDUE);

        return new DashboardStats(
            totalInventory,
            lowStockCount,
            totalSales,
            totalRevenue,
            pendingSales.size(),
            overdueSales.size()
        );
    }

    public static class DashboardStats {
        private long totalInventory;
        private long lowStockCount;
        private long totalSales;
        private double totalRevenue;
        private long pendingPayments;
        private long overduePayments;

        public DashboardStats(long totalInventory, long lowStockCount, long totalSales,
                            double totalRevenue, long pendingPayments, long overduePayments) {
            this.totalInventory = totalInventory;
            this.lowStockCount = lowStockCount;
            this.totalSales = totalSales;
            this.totalRevenue = totalRevenue;
            this.pendingPayments = pendingPayments;
            this.overduePayments = overduePayments;
        }

        public long getTotalInventory() { return totalInventory; }
        public long getLowStockCount() { return lowStockCount; }
        public long getTotalSales() { return totalSales; }
        public double getTotalRevenue() { return totalRevenue; }
        public long getPendingPayments() { return pendingPayments; }
        public long getOverduePayments() { return overduePayments; }
    }
}
