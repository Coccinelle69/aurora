package com.aurora.AuroraApartment.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactRequest {

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

    @Size(max = 2000)
    @NotBlank
    private String message;

    @Builder.Default
    private String language = "en";

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ContactSource source = ContactSource.CONTACT;
    
}
