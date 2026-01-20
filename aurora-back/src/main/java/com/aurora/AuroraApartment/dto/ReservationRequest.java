package com.aurora.AuroraApartment.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {

    @NotBlank
    @Size(max = 100)
    private String firstName;

    @NotBlank
    @Size(max = 100)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 200)
    private String email;

    @NotBlank
    @Size(max = 50)
    @Pattern(regexp = "^[0-9+()\\-\\s]{6,20}$", message = "Invalid phone number")
    private String phone;

    @NotBlank
    @Email
    @Size(max = 200)
    private String country;

        @NotBlank
    @Email
    @Size(max = 200)
    private String city;

    @NotNull
    @Min(1)
    private Integer adults;

    @NotNull
    @Min(0)
    private Integer children;

    @NotNull
    @Min(0)
    private Integer teens;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate arrivalDate; 

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate departureDate; 

    @Size(max = 2000)
    private String message;

    private String language = "en";

    @Enumerated(EnumType.STRING)
    private ContactSource source = ContactSource.CHECKOUT;
    
}
