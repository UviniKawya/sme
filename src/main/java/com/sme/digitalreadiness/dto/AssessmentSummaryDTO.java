package com.sme.digitalreadiness.dto;

import java.util.List;

public class AssessmentSummaryDTO {
    private String smeId;
    private int totalQuestions;
    private int answeredCount;
    private double overallScore;
    private List<AssessmentScoreDTO> sectionScores;

    public AssessmentSummaryDTO() {}

    public AssessmentSummaryDTO(String smeId, int totalQuestions, int answeredCount, double overallScore, List<AssessmentScoreDTO> sectionScores) {
        this.smeId = smeId;
        this.totalQuestions = totalQuestions;
        this.answeredCount = answeredCount;
        this.overallScore = overallScore;
        this.sectionScores = sectionScores;
    }

    // Getters and Setters
    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getAnsweredCount() { return answeredCount; }
    public void setAnsweredCount(int answeredCount) { this.answeredCount = answeredCount; }

    public double getOverallScore() { return overallScore; }
    public void setOverallScore(double overallScore) { this.overallScore = overallScore; }

    public List<AssessmentScoreDTO> getSectionScores() { return sectionScores; }
    public void setSectionScores(List<AssessmentScoreDTO> sectionScores) { this.sectionScores = sectionScores; }
}
