package com.creation.picselb.controller;

import com.creation.picselb.model.Admin;
import com.creation.picselb.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest) {
        Optional<Admin> admin = adminRepository.findByUsername(loginRequest.getUsername());

        if (admin.isPresent() && admin.get().getPassword().equals(loginRequest.getPassword())) {
            // Login Success
            return ResponseEntity.ok(Map.of("message", "Login successful", "status", "success"));
        } else {
            // Login Failed
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials", "status", "error"));
        }
    }
}