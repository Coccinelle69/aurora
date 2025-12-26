package com.aurora.AuroraApartment.exception;

import java.net.URI;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class AdminActionExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Void> handle(ResponseStatusException ex) {

        String redirect;

        if (ex.getStatusCode() == HttpStatus.GONE) {
            if ("Link expired".equals(ex.getReason())) {
                redirect = "http://localhost:3000/admin/reservation/result?status=expired";
            } else if ("Link already used".equals(ex.getReason())) {
                redirect = "http://localhost:3000/admin/reservation/result?status=used";
            } else {
                redirect = "http://localhost:3000/admin/reservation/result?status=error";
            }
        } else {
            redirect = "http://localhost:3000/admin/reservation/result?status=error";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirect));

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}
