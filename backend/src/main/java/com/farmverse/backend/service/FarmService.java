package com.farmverse.backend.service;
import com.farmverse.backend.dto.*;
import com.farmverse.backend.entity.Crop;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmService {
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;

    private User getCurrentFarmer(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public ApiResponse addFarm(FarmRequest request, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = new Farm();
        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setSoilType(request.getSoilType());
        farm.setLocation(request.getLocation());
        farm.setFarmer(farmer);

        Farm saved = farmRepository.save(farm);
        return ApiResponse.ok("Farm added successfully", saved.getId().toString());
    }

    public ApiResponse editFarm(Long farmId, FarmRequest request, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = farmRepository.findByIdAndFarmerId(farmId, farmer.getId()).orElseThrow(()-> new IllegalArgumentException("Farm not found"));

        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setSoilType(request.getSoilType());
        farm.setLocation(request.getLocation());


        farmRepository.save(farm);
        return ApiResponse.ok("Farm updated successfully", farm.getId().toString());
    }

    public ApiResponse deleteFarm(Long farmId, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = farmRepository.findByIdAndFarmerId(farmId, farmer.getId()).orElseThrow(() -> new IllegalArgumentException("Farm not found"));
        farmRepository.delete(farm);
        return ApiResponse.ok("Farm & its crops deleted successfully", farmId.toString());
    }

    public ViewFarmRespose viewFarm(Long farmId, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = farmRepository.findByIdAndFarmerId(farmId, farmer.getId()).orElseThrow(() -> new IllegalArgumentException("Farm not found"));
        List<CropSummary> cropSummaries = farm.getCrops().stream()
                .map(crop -> new CropSummary(crop.getId(), crop.getCropName()))
                .toList();

        FarmDetail detail = new FarmDetail(
                farm.getId(),
                farm.getFarmName(),
                farm.getFarmType(),
                farm.getAreaSqMt(),
                farm.getSoilType(),
                farm.getLocation(),
                cropSummaries
        );
        return new ViewFarmRespose("ok","200","Farm details fetched successfully",detail);
    }

    public ListFarmsResponse listAllFarms(String username){
        User farmer = getCurrentFarmer(username);
        List<Farm> farms = farmRepository.findByFarmerId(farmer.getId());
        List<FarmSummary> summaries = farms.stream().map(farm -> new FarmSummary(farm.getId(),farm.getFarmName(),farm.getFarmType(),farm.getAreaSqMt(),farm.getSoilType(),farm.getLocation(),farm.getCrops().size())).toList();
        return new ListFarmsResponse("ok","200","Farms fetched successfully", summaries);
    }
}
