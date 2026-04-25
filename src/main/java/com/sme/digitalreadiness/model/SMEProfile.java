package com.sme.digitalreadiness.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sme_profiles")
public class SMEProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sme_id", nullable = false, unique = true, length = 100)
    private String smeId;

    @Column(name = "business_type", nullable = false, length = 200)
    private String businessType;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Location location;

    @Column(name = "employees", nullable = false, length = 50)
    private String employees;

    @Column(name = "years_of_operation", nullable = false, length = 50)
    private String yearsOfOperation;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Location {
        URBAN, RURAL
    }

    public SMEProfile() {}

    public SMEProfile(String smeId, String businessType, Location location, String employees, String yearsOfOperation) {
        this.smeId = smeId;
        this.businessType = businessType;
        this.location = location;
        this.employees = employees;
        this.yearsOfOperation = yearsOfOperation;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }

    public String getBusinessType() { return businessType; }
    public void setBusinessType(String businessType) { this.businessType = businessType; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public String getEmployees() { return employees; }
    public void setEmployees(String employees) { this.employees = employees; }

    public String getYearsOfOperation() { return yearsOfOperation; }
    public void setYearsOfOperation(String yearsOfOperation) { this.yearsOfOperation = yearsOfOperation; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
