package com.example.traveladmin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Cab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Cab number is required")
    private String cabNumber;

    @NotBlank(message = "Driver name is required")
    private String driverName;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    @NotBlank(message = "Status is required")
    private String status;

    // ✅ Default constructor
    public Cab() {}

    // ✅ All-args constructor
    public Cab(Long id, String cabNumber, String driverName, Integer capacity, String status) {
        this.id = id;
        this.cabNumber = cabNumber;
        this.driverName = driverName;
        this.capacity = capacity;
        this.status = status;
    }

    // ✅ Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCabNumber() {
        return cabNumber;
    }

    public void setCabNumber(String cabNumber) {
        this.cabNumber = cabNumber;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
