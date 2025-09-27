package com.example.travelbooking.service;

import com.example.travelbooking.model.User;
import com.example.travelbooking.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Register a new user
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password
        user.setRole("ROLE_USER"); // default role
        return userRepository.save(user);
    }

    // ✅ Find by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Authenticate user (login)
    public Optional<User> authenticate(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user); // success
            }
        }
        return Optional.empty(); // fail
    }
}
