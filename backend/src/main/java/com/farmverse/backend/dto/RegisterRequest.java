package com.farmverse.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, message = "Username must be at least 3 characters")
    private String username;

    @NotBlank(message = "Email is rewuired")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Password is rewuired")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}
//DTO for registration data, controls what user can send us
