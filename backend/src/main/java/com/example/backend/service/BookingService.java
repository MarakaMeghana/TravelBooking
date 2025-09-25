package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Booking;
import com.example.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository repo;

    public BookingService(BookingRepository repo) {
        this.repo = repo;
    }

    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    public Booking createBooking(Booking booking) {
        return repo.save(booking);
    }

    public Booking getBookingById(Long id) {
        return repo.findById(id)
                   .orElseThrow();
    }

    public void deleteBooking(Long id) {
        repo.deleteById(id);
    }
}
