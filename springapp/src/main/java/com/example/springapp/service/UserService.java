package com.example.springapp.service;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String identifier, String password) {
    // Try phone first
        Optional<User> byPhone = userRepository.findByPhoneAndPassword(identifier, password);
        if (byPhone.isPresent()) return byPhone;

        // Try email as fallback
        return userRepository.findByEmailAndPassword(identifier, password);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
