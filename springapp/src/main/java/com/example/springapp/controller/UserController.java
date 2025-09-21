package com.example.springapp.controller;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register User
    @PostMapping
    public User registerUser(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Check if phone already exists
        if (userRepository.findByPhone(user.getPhone()).isPresent()) {
            throw new RuntimeException("Phone already registered!");
        }
       
        return userRepository.save(user);
    }

     // ✅ Login User (by phone OR email, plain text check)
    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest loginRequest) {
        // First try phone + password
        return userRepository.findByPhoneAndPassword(loginRequest.getIdentifier(), loginRequest.getPassword())
                .orElseGet(() -> 
                        // Then try email + password
                        userRepository.findByEmailAndPassword(loginRequest.getIdentifier(), loginRequest.getPassword())
                                .orElseThrow(() -> new RuntimeException("Invalid credentials!"))
                );
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    // ✅ Get total users count
    @GetMapping("/count")
    public long getUserCount() {
        return userRepository.count();
    }


    // ✅ DTO for login request
    static class LoginRequest {
        private String identifier; // can be phone OR email
        private String password;

        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
