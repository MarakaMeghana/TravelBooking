package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // React frontend URL
public class AuthController {

    private final CustomerService service;

    public AuthController(CustomerService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return service.register(customer);
    }

    @PostMapping("/login")
    public Optional<Customer> login(@RequestBody Customer customer) {
        return service.login(customer.getUsername(), customer.getPassword());
    }
}
