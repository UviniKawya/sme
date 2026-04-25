package com.sme.digitalreadiness.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessment_answers")
public class AssessmentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private AssessmentQuestion question;

    @Column(name = "answer_value")
    private Integer answerValue;

    @Column(name = "sme_id", length = 100)
    private String smeId;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public AssessmentAnswer() {}

    public AssessmentAnswer(AssessmentQuestion question, Integer answerValue, String smeId) {
        this.question = question;
        this.answerValue = answerValue;
        this.smeId = smeId;
        this.completedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AssessmentQuestion getQuestion() { return question; }
    public void setQuestion(AssessmentQuestion question) { this.question = question; }

    public Integer getAnswerValue() { return answerValue; }
    public void setAnswerValue(Integer answerValue) { this.answerValue = answerValue; }

    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
