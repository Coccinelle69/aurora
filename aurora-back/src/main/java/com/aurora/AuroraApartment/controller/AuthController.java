package com.aurora.AuroraApartment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.dto.ContactRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
@PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody ContactRequest request) {


    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody ContactRequest request) {


    return ResponseEntity.ok("{\"success\": true}");
}
@PostMapping("/password/forgot")
public ResponseEntity<?> forgotPassword(@Valid @RequestBody ContactRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/password/update")
public ResponseEntity<?> updatePassword(@Valid @RequestBody ContactRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/check")
public ResponseEntity<?> verifyForm(@Valid @RequestBody ContactRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}



@GetMapping("/logout")
public ResponseEntity<?> logout(@Valid @RequestBody ContactRequest request) {


    return ResponseEntity.ok("{\"success\": true}");
}

@GetMapping("/me")
public ResponseEntity<?> getIdentity(@Valid @RequestBody ContactRequest request) {


    return ResponseEntity.ok("{\"success\": true}");
}


}
