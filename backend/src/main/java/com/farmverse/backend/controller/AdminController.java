package com.farmverse.backend.controller;

import com.farmverse.backend.dto.AdminDashboardResponse;
import com.farmverse.backend.dto.FarmerResponse;
import com.farmverse.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.farmverse.backend.dto.AddFarmerRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.farmverse.backend.dto.AddFarmerResponse;
import com.farmverse.backend.dto.EditFarmerRequest;
import com.farmverse.backend.dto.EditFarmerResponse;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.farmverse.backend.dto.DeleteFarmerResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/farmverse/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        return adminService.getDashboard();
    }

    @GetMapping("/viewFarmers")
    public List<FarmerResponse> viewFarmers() {
        return adminService.getAllFarmers();
    }

    @PostMapping("/addFarmer")
    public AddFarmerResponse addFarmer(@RequestBody AddFarmerRequest request) {
        return adminService.addFarmer(request);
    }

    @PutMapping("/editFarmer/{username}")
    public EditFarmerResponse editFarmer(
            @PathVariable String username,
            @RequestBody EditFarmerRequest request) {

        return adminService.editFarmer(username, request);
    }

    @DeleteMapping("/deleteFarmer/{username}")
    public DeleteFarmerResponse deleteFarmer(@PathVariable String username) {
        return adminService.deleteFarmer(username);
    }
}