package com.sme.digitalreadiness.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assessment_questions")
public class AssessmentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String questionId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "tooltip", columnDefinition = "TEXT")
    private String tooltip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    private AssessmentSection section;

    @Column(name = "display_order")
    private Integer displayOrder;

    public AssessmentQuestion() {}

    public AssessmentQuestion(String questionId, String text, String tooltip, Integer displayOrder) {
        this.questionId = questionId;
        this.text = text;
        this.tooltip = tooltip;
        this.displayOrder = displayOrder;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getTooltip() { return tooltip; }
    public void setTooltip(String tooltip) { this.tooltip = tooltip; }

    public AssessmentSection getSection() { return section; }
    public void setSection(AssessmentSection section) { this.section = section; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
