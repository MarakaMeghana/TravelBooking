package com.example.travelbooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private LocalDate travelDate;
    private int travelers;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
