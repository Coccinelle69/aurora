package com.aurora.AuroraApartment.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

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
public class Reservation {

    @NotBlank
    @Size(max = 100)
    private String reservationFirstName;

    @NotBlank
    @Size(max = 100)
    private String reservationLastName;

    @NotBlank
    @Email
    @Size(max = 200)
    private String email;

    @NotBlank
    @Size(max = 50)
    @Pattern(regexp = "^[0-9+()\\-\\s]{6,20}$", message = "Invalid phone number")
    private String phone;

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

    // @NotNull
    // @Min(0)
    // private Integer totalNights;

    // @NotNull
    // @Min(0)
    // private Integer totalPrice;


    
}
