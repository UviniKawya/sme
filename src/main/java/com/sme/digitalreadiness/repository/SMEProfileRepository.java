package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.SMEProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SMEProfileRepository extends JpaRepository<SMEProfile, Long> {
    Optional<SMEProfile> findBySmeId(String smeId);
    boolean existsBySmeId(String smeId);
}
