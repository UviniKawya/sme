package com.sme.digitalreadiness.dto;

public class AssessmentScoreDTO {
    private String sectionId;
    private String sectionTitle;
    private double score;
    private int answeredCount;
    private int totalQuestions;

    public AssessmentScoreDTO() {}

    public AssessmentScoreDTO(String sectionId, String sectionTitle, double score, int answeredCount, int totalQuestions) {
        this.sectionId = sectionId;
        this.sectionTitle = sectionTitle;
        this.score = score;
        this.answeredCount = answeredCount;
        this.totalQuestions = totalQuestions;
    }

    // Getters and Setters
    public String getSectionId() { return sectionId; }
    public void setSectionId(String sectionId) { this.sectionId = sectionId; }

    public String getSectionTitle() { return sectionTitle; }
    public void setSectionTitle(String sectionTitle) { this.sectionTitle = sectionTitle; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public int getAnsweredCount() { return answeredCount; }
    public void setAnsweredCount(int answeredCount) { this.answeredCount = answeredCount; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
}
