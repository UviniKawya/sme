package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.AssessmentSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentSectionRepository extends JpaRepository<AssessmentSection, Long> {
    List<AssessmentSection> findByOrderByDisplayOrderAsc();
}
