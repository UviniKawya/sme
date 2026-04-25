package com.sme.digitalreadiness.controller;

import com.sme.digitalreadiness.dto.AssessmentSummaryDTO;
import com.sme.digitalreadiness.model.SMEProfile;
import com.sme.digitalreadiness.service.AssessmentService;
import com.sme.digitalreadiness.service.DashboardService;
import com.sme.digitalreadiness.service.SMEService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DashboardApiController {
    private final DashboardService dashboardService;
    private final AssessmentService assessmentService;
    private final SMEService smeService;

    public DashboardApiController(DashboardService dashboardService,
                                 AssessmentService assessmentService,
                                 SMEService smeService) {
        this.dashboardService = dashboardService;
        this.assessmentService = assessmentService;
        this.smeService = smeService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        try {
            DashboardService.DashboardStats stats = dashboardService.getStats();
            return ResponseEntity.ok(Map.of(
                "totalInventory", stats.getTotalInventory(),
                "lowStockCount", stats.getLowStockCount(),
                "totalSales", stats.getTotalSales(),
                "totalRevenue", stats.getTotalRevenue(),
                "pendingPayments", stats.getPendingPayments(),
                "overduePayments", stats.getOverduePayments()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/assessment/summary")
    public ResponseEntity<AssessmentSummaryDTO> getAssessmentSummary(@RequestParam String smeId) {
        var allQuestions = assessmentService.getQuestionsBySection("overview"); // placeholder
        AssessmentSummaryDTO summary = assessmentService.calculateSummary(smeId,
            List.of()); // simplified
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/smes")
    public ResponseEntity<List<SMEProfile>> getAllSMEs() {
        return ResponseEntity.ok(smeService.getAllSMEs());
    }
}
