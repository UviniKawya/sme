package com.sme.digitalreadiness.repository;

import com.sme.digitalreadiness.model.AssessmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssessmentAnswerRepository extends JpaRepository<AssessmentAnswer, Long> {
    List<AssessmentAnswer> findBySmeIdOrderByCompletedAtDesc(String smeId);
    List<AssessmentAnswer> findByQuestionIdAndSmeId(String questionId, String smeId);
    Optional<AssessmentAnswer> findByQuestion_QuestionIdAndSmeId(String questionId, String smeId);
    List<AssessmentAnswer> findBySmeId(String smeId);
    void deleteBySmeId(String smeId);
}
