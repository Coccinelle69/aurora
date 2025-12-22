package com.aurora.AuroraApartment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.dto.ContactRequest;
import com.aurora.AuroraApartment.service.ContactService;

import jakarta.validation.Valid;




@RestController
@RequestMapping("/contact")
public class ContactController {

@Autowired
ContactService contactService;
    
@PostMapping
public ResponseEntity<?> handleContact(@Valid @RequestBody ContactRequest request) {

    contactService.conserveContact(request);

    return ResponseEntity.ok("{\"success\": true}");
}


@PostMapping("/check")
public ResponseEntity<?> verifyForm(@Valid @RequestBody ContactRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}

}
