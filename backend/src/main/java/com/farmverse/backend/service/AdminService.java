package com.farmverse.backend.service;

import com.farmverse.backend.dto.*;
import com.farmverse.backend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.farmverse.backend.enums.Role;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminDashboardResponse getDashboard() {

        long totalFarmers = userRepository.countByRole(Role.FARMER);
        long totalFarms = farmRepository.count();
        long totalCrops = cropRepository.count();

        return new AdminDashboardResponse(
                "ok",
                "200",
                "Dashboard data fetched successfully",
                totalFarmers,
                totalFarms,
                totalCrops
        );
    }

    public List<FarmerResponse> getAllFarmers() {

        return userRepository.findByRole(Role.FARMER)
                .stream()
                .map(user -> new FarmerResponse(
                        user.getFullName(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    public AddFarmerResponse addFarmer(AddFarmerRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AddFarmerResponse(
                    "error",
                    "400",
                    "Username already taken",
                    null
            );
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);

        User savedUser = userRepository.save(user);

        return new AddFarmerResponse(
                "ok",
                "200",
                "Farmer added successfully",
                savedUser.getId()
        );
    }

    public EditFarmerResponse editFarmer(String username, EditFarmerRequest request) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return new EditFarmerResponse(
                    "error",
                    "404",
                    "Farmer not found",
                    null
            );
        }

        if (!user.getUsername().equals(request.getUsername())
                && userRepository.existsByUsername(request.getUsername())) {

            return new EditFarmerResponse(
                    "error",
                    "400",
                    "Username already taken",
                    null
            );
        }

        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User updatedUser = userRepository.save(user);

        return new EditFarmerResponse(
                "ok",
                "200",
                "Farmer updated successfully",
                updatedUser.getId()
        );
    }

    public DeleteFarmerResponse deleteFarmer(String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return new DeleteFarmerResponse(
                    "error",
                    "404",
                    "Farmer not found",
                    null
            );
        }

        Long id = user.getId();

        userRepository.delete(user);

        return new DeleteFarmerResponse(
                "ok",
                "200",
                "Farmer deleted successfully",
                id
        );
    }
}