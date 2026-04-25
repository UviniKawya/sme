package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.SalesEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesEntryRepository extends JpaRepository<SalesEntry, Long> {
    List<SalesEntry> findByPaymentStatusOrderByDateDesc(SalesEntry.PaymentStatus status);
    List<SalesEntry> findByOrderByDateDesc();
}
