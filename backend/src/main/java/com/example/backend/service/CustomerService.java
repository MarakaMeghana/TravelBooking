package com.example.backend.service;

import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer register(Customer customer) {
        return repository.save(customer);
    }

    public Optional<Customer> login(String username, String password) {
        return repository.findByUsernameAndPassword(username, password);
    }
}
