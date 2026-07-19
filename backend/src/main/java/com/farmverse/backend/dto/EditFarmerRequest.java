package com.farmverse.backend.dto;

import lombok.Data;

@Data
public class EditFarmerRequest {

    private String fullName;
    private String username;
    private String email;
    private String password;
}