package com.farmverse.backend.controller;

import com.farmverse.backend.dto.FarmerDashboardResponse;
import com.farmverse.backend.service.FarmerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/farmverse/farmer")
@RequiredArgsConstructor
public class FarmerController {

    private final FarmerService farmerService;

    @GetMapping("/dashboard")
    public FarmerDashboardResponse dashboard(Authentication authentication) {
        return farmerService.getDashboard(authentication.getName());
    }
}