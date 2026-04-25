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
public class SMEService {
    private final SMEProfileRepository smeProfileRepository;

    public SMEService(SMEProfileRepository smeProfileRepository) {
        this.smeProfileRepository = smeProfileRepository;
    }

    public SMEProfile registerSME(SMEProfile profile) {
        if (smeProfileRepository.existsBySmeId(profile.getSmeId())) {
            throw new RuntimeException("SME ID already exists: " + profile.getSmeId());
        }
        return smeProfileRepository.save(profile);
    }

    public Optional<SMEProfile> getSME(String smeId) {
        return smeProfileRepository.findBySmeId(smeId);
    }

    public List<SMEProfile> getAllSMEs() {
        return smeProfileRepository.findAll();
    }
}
