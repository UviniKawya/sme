package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Long> {
    List<AssessmentQuestion> findBySectionIdOrderByDisplayOrderAsc(String sectionId);
    List<AssessmentQuestion> findBySection_SectionIdOrderByDisplayOrderAsc(String sectionId);
    List<AssessmentQuestion> findBySection_IdOrderByDisplayOrderAsc(Long sectionId);
}
