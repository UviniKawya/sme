package com.sme.digitalreadiness.controller;

import com.sme.digitalreadiness.dto.AssessmentScoreDTO;
import com.sme.digitalreadiness.model.AssessmentAnswer;
import com.sme.digitalreadiness.model.AssessmentQuestion;
import com.sme.digitalreadiness.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "*")
public class AssessmentApiController {
    private final AssessmentService assessmentService;

    public AssessmentApiController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping("/sections")
    public ResponseEntity<?> getSections() {
        try {
            List<Map<String, Object>> sections = new ArrayList<>();
            var allSections = assessmentService.getAllSections();

            for (var section : allSections) {
                Map<String, Object> sec = new HashMap<>();
                sec.put("id", section.getSectionId());
                sec.put("title", section.getTitle());
                sec.put("icon", section.getIcon());

                List<Map<String, Object>> questions = new ArrayList<>();
                for (AssessmentQuestion q : section.getQuestions()) {
                    Map<String, Object> qMap = new HashMap<>();
                    qMap.put("id", q.getQuestionId());
                    qMap.put("text", q.getText());
                    qMap.put("tooltip", q.getTooltip());
                    questions.add(qMap);
                }
                sec.put("questions", questions);
                sections.add(sec);
            }

            return ResponseEntity.ok(Map.of("sections", sections));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/data")
    public ResponseEntity<?> getAssessmentData(@RequestParam(required = false) String smeId) {
        try {
            Map<String, Object> data = assessmentService.getAssessmentData(smeId);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/answer")
    public ResponseEntity<?> saveAnswer(@RequestBody Map<String, String> payload) {
        try {
            String smeId = payload.get("smeId");
            String questionId = payload.get("questionId");
            Integer answer = Integer.valueOf(payload.get("answer"));

            assessmentService.saveAnswer(smeId, questionId, answer);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/answers")
    public ResponseEntity<?> saveAllAnswers(@RequestBody Map<String, Object> payload) {
        try {
            String smeId = (String) payload.get("smeId");
            @SuppressWarnings("unchecked")
            Map<String, Integer> answers = (Map<String, Integer>) payload.get("answers");

            assessmentService.saveAllAnswers(smeId, answers);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearAnswers(@RequestParam String smeId) {
        try {
            assessmentService.clearAnswers(smeId);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }
}
