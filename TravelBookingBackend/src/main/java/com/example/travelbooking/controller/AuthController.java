package com.example.travelbooking.controller;

import com.example.travelbooking.model.User;
import com.example.travelbooking.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @GetMapping("/user")
    public Optional<User> findUser(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
