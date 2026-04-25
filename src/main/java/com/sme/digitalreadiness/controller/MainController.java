package com.sme.digitalreadiness.controller;

import com.sme.digitalreadiness.service.AssessmentService;
import com.sme.digitalreadiness.service.DashboardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class MainController {
    private final DashboardService dashboardService;

    public MainController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Dashboard");
        return "dashboard";
    }

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("title", "SME Registration");
        return "registration";
    }

    @GetMapping("/assessment")
    public String assessment(Model model) {
        model.addAttribute("title", "Digital Readiness Assessment");
        return "assessment";
    }

    @GetMapping("/inventory")
    public String inventory(Model model) {
        model.addAttribute("title", "Inventory Management");
        return "inventory";
    }

    @GetMapping("/sales")
    public String sales(Model model) {
        model.addAttribute("title", "Sales Management");
        return "sales";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About");
        return "about";
    }
}
