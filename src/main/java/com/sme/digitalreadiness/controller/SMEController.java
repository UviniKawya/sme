package com.sme.digitalreadiness.controller;

import com.sme.digitalreadiness.model.SMEProfile;
import com.sme.digitalreadiness.service.SMEService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sme")
@CrossOrigin(origins = "*")
public class SMEController {
    private final SMEService smeService;

    public SMEController(SMEService smeService) {
        this.smeService = smeService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SMEProfile profile) {
        try {
            SMEProfile saved = smeService.registerSME(profile);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "smeId", saved.getSmeId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{smeId}")
    public ResponseEntity<?> getSME(@PathVariable String smeId) {
        return smeService.getSME(smeId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
