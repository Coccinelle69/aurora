package com.aurora.AuroraApartment.dto.password;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordResponse {
    private Boolean success;
    private String message;
}
