package com.sme.digitalreadiness.service;

import com.sme.digitalreadiness.dto.AssessmentScoreDTO;
import com.sme.digitalreadiness.dto.AssessmentSummaryDTO;
import com.sme.digitalreadiness.model.AssessmentAnswer;
import com.sme.digitalreadiness.model.AssessmentQuestion;
import com.sme.digitalreadiness.model.AssessmentSection;
import com.sme.digitalreadiness.repository.AssessmentAnswerRepository;
import com.sme.digitalreadiness.repository.AssessmentQuestionRepository;
import com.sme.digitalreadiness.repository.AssessmentSectionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssessmentService {
    private final AssessmentSectionRepository sectionRepository;
    private final AssessmentQuestionRepository questionRepository;
    private final AssessmentAnswerRepository answerRepository;

    public AssessmentService(AssessmentSectionRepository sectionRepository,
                            AssessmentQuestionRepository questionRepository,
                            AssessmentAnswerRepository answerRepository) {
        this.sectionRepository = sectionRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public List<AssessmentSection> getAllSections() {
        return sectionRepository.findByOrderByDisplayOrderAsc();
    }

    public List<AssessmentQuestion> getQuestionsBySection(String sectionId) {
        return questionRepository.findBySection_SectionIdOrderByDisplayOrderAsc(sectionId);
    }

    public Map<String, Object> getAssessmentData(String smeId) {
        List<AssessmentSection> sections = getAllSections();
        List<AssessmentQuestion> allQuestions = questionRepository.findAll();

        List<AssessmentAnswer> existingAnswers = smeId != null ? answerRepository.findBySmeId(smeId) : Collections.emptyList();
        Map<String, Integer> answerMap = existingAnswers.stream()
            .collect(Collectors.toMap(
                a -> a.getQuestion().getQuestionId(),
                AssessmentAnswer::getAnswerValue
            ));

        List<Map<String, Object>> sectionsData = new ArrayList<>();
        for (AssessmentSection section : sections) {
            List<QuestionData> questionsData = new ArrayList<>();
            for (AssessmentQuestion q : section.getQuestions()) {
                QuestionData qd = new QuestionData();
                qd.setId(q.getQuestionId());
                qd.setText(q.getText());
                qd.setTooltip(q.getTooltip());
                qd.setAnswer(answerMap.get(q.getQuestionId()));
                questionsData.add(qd);
            }

            Map<String, Object> sec = new HashMap<>();
            sec.put("id", section.getSectionId());
            sec.put("title", section.getTitle());
            sec.put("icon", section.getIcon());
            sec.put("questions", questionsData);
            sectionsData.add(sec);
        }

        AssessmentSummaryDTO summary = calculateSummary(smeId, allQuestions);

        Map<String, Object> result = new HashMap<>();
        result.put("sections", sectionsData);
        result.put("summary", summary);
        return result;
    }

    public AssessmentSummaryDTO calculateSummary(String smeId, List<AssessmentQuestion> allQuestions) {
        if (smeId == null) {
            return new AssessmentSummaryDTO(null, allQuestions.size(), 0, 0.0, Collections.emptyList());
        }

        List<AssessmentAnswer> answers = answerRepository.findBySmeId(smeId);
        Map<String, List<AssessmentAnswer>> bySection = answers.stream()
            .collect(Collectors.groupingBy(a -> a.getQuestion().getSection().getSectionId()));

        List<AssessmentScoreDTO> sectionScores = new ArrayList<>();
        int totalAnswered = 0;
        double weightedSum = 0;
        int totalWeight = 0;

        List<AssessmentSection> sections = getAllSections();
        for (AssessmentSection section : sections) {
            List<AssessmentQuestion> sectionQuestions = questionRepository.findBySection_SectionIdOrderByDisplayOrderAsc(section.getSectionId());
            List<AssessmentAnswer> sectionAnswers = bySection.getOrDefault(section.getSectionId(), Collections.emptyList());

            int answeredInSection = (int) sectionAnswers.stream().filter(a -> a.getAnswerValue() != null).count();
            double sectionScore = 0;
            if (!sectionAnswers.isEmpty()) {
                int sum = sectionAnswers.stream().mapToInt(a -> a.getAnswerValue() != null ? a.getAnswerValue() : 0).sum();
                sectionScore = (double) sum / (sectionQuestions.size() * 5) * 100; // 5 is max score per question
            }

            sectionScores.add(new AssessmentScoreDTO(
                section.getSectionId(),
                section.getTitle(),
                Math.round(sectionScore * 100.0) / 100.0,
                answeredInSection,
                sectionQuestions.size()
            ));

            totalAnswered += answeredInSection;
            weightedSum += sectionScore * sectionQuestions.size();
            totalWeight += sectionQuestions.size();
        }

        double overallScore = totalWeight > 0 ? weightedSum / totalWeight : 0.0;

        return new AssessmentSummaryDTO(smeId, allQuestions.size(), totalAnswered,
            Math.round(overallScore * 100.0) / 100.0, sectionScores);
    }

    public void saveAnswer(String smeId, String questionId, Integer answerValue) {
        AssessmentQuestion question = questionRepository.findByQuestionId(questionId)
            .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));

        Optional<AssessmentAnswer> existing = answerRepository.findByQuestion_QuestionIdAndSmeId(questionId, smeId);
        if (existing.isPresent()) {
            AssessmentAnswer ans = existing.get();
            ans.setAnswerValue(answerValue);
            answerRepository.save(ans);
        } else {
            AssessmentAnswer answer = new AssessmentAnswer(question, answerValue, smeId);
            answerRepository.save(answer);
        }
    }

    public void saveAllAnswers(String smeId, Map<String, Integer> answers) {
        answers.forEach((questionId, value) -> saveAnswer(smeId, questionId, value));
    }

    public void clearAnswers(String smeId) {
        answerRepository.deleteBySmeId(smeId);
    }

    // Helper class for question data
    public static class QuestionData {
        private String id;
        private String text;
        private String tooltip;
        private Integer answer;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public String getTooltip() { return tooltip; }
        public void setTooltip(String tooltip) { this.tooltip = tooltip; }
        public Integer getAnswer() { return answer; }
        public void setAnswer(Integer answer) { this.answer = answer; }
    }
}
