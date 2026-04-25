package com.sme.digitalreadiness.service;

import com.sme.digitalreadiness.model.SalesEntry;
import com.sme.digitalreadiness.repository.SalesEntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalesService {
    private final SalesEntryRepository salesEntryRepository;

    public SalesService(SalesEntryRepository salesEntryRepository) {
        this.salesEntryRepository = salesEntryRepository;
    }

    public List<SalesEntry> getAllSales() {
        return salesEntryRepository.findByOrderByDateDesc();
    }

    public Optional<SalesEntry> getSalesById(Long id) {
        return salesEntryRepository.findById(id);
    }

    public SalesEntry createSale(SalesEntry sale) {
        return salesEntryRepository.save(sale);
    }

    public SalesEntry updateSale(Long id, SalesEntry saleDetails) {
        SalesEntry sale = salesEntryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sales entry not found: " + id));
        sale.setInvoiceNumber(saleDetails.getInvoiceNumber());
        sale.setCustomerName(saleDetails.getCustomerName());
        sale.setAmount(saleDetails.getAmount());
        sale.setDate(saleDetails.getDate());
        sale.setPaymentStatus(saleDetails.getPaymentStatus());
        return salesEntryRepository.save(sale);
    }

    public void deleteSale(Long id) {
        salesEntryRepository.deleteById(id);
    }

    public List<SalesEntry> getPendingPayments() {
        return salesEntryRepository.findByPaymentStatusOrderByDateDesc(SalesEntry.PaymentStatus.PENDING);
    }

    public List<SalesEntry> getOverduePayments() {
        return salesEntryRepository.findByPaymentStatusOrderByDateDesc(SalesEntry.PaymentStatus.OVERDUE);
    }
}
