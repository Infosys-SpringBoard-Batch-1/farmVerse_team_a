package com.farmverse.backend.controller;

import com.farmverse.backend.dto.*;
import com.farmverse.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/farmverse/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> dashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/viewFarmers")
    public ResponseEntity<List<FarmerResponse>> viewFarmers() {
        return ResponseEntity.ok(adminService.getAllFarmers());
    }

    @PostMapping("/addFarmer")
    public ResponseEntity<AddFarmerResponse> addFarmer(
            @Valid @RequestBody AddFarmerRequest request) {

        AddFarmerResponse response = adminService.addFarmer(request);

        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/editFarmer/{username}")
    public ResponseEntity<EditFarmerResponse> editFarmer(
            @PathVariable String username,
            @Valid @RequestBody EditFarmerRequest request) {

        EditFarmerResponse response = adminService.editFarmer(username, request);

        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }

        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteFarmer/{username}")
    public ResponseEntity<DeleteFarmerResponse> deleteFarmer(
            @PathVariable String username) {

        DeleteFarmerResponse response = adminService.deleteFarmer(username);

        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(response);
    }
}