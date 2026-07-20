package com.farmverse.backend.service;

import com.farmverse.backend.dto.*;
import com.farmverse.backend.entity.Crop;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CropService {

    private final CropRepository cropRepository;
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;

    private User getCurrentFarmer(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public ApiResponse addCrop(AddCropRequest request, String username) {
        User farmer = getCurrentFarmer(username);

        Farm farm = farmRepository.findByIdAndFarmerId(request.getFarmId(), farmer.getId())
                .orElseThrow(() -> new IllegalArgumentException("Farm not found"));

        Crop crop = new Crop();
        crop.setCropName(request.getCropName());
        crop.setCropType(request.getCropType());
        crop.setQuantity(request.getQuantity());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestDate(request.getHarvestDate());
        crop.setFarm(farm);

        Crop saved = cropRepository.save(crop);

        return ApiResponse.ok("Crop added successfully", saved.getId().toString());
    }

    public ApiResponse editCrop(Long cropId, CropRequest request, String username) {
        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository.findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() -> new IllegalArgumentException("Crop not found"));

        crop.setCropName(request.getCropName());
        crop.setCropType(request.getCropType());
        crop.setQuantity(request.getQuantity());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestDate(request.getHarvestDate());

        cropRepository.save(crop);

        return ApiResponse.ok("Crop updated successfully", crop.getId().toString());
    }

    public ApiResponse deleteCrop(Long cropId, String username) {
        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository.findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() -> new IllegalArgumentException("Crop not found"));

        cropRepository.delete(crop);

        return ApiResponse.ok("Crop deleted successfully", cropId.toString());
    }

    public ViewCropResponse viewCrop(Long cropId, String username) {
        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository.findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() -> new IllegalArgumentException("Crop not found"));

        CropDetail detail = new CropDetail(
                crop.getId(),
                crop.getCropName(),
                crop.getCropType(),
                crop.getQuantity(),
                crop.getSowingDate(),
                crop.getHarvestDate(),
                crop.getFarm().getFarmName()
        );

        return new ViewCropResponse("ok", "200", "Crop details fetched successfully", detail);
    }
}