package com.farmverse.backend;

import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DbTest implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Override
    public void run(String... args) {
        System.out.println("Datasource URL = " + url);
        System.out.println("Datasource User = " + username);
        try {
            long userCount = userRepository.count();
            long farmCount = farmRepository.count();
            long cropCount = cropRepository.count();
            System.out.println("--- DB STATE ---");
            System.out.println("Users count: " + userCount);
            System.out.println("Farms count: " + farmCount);
            System.out.println("Crops count: " + cropCount);
            
            System.out.println("All Users in DB:");
            userRepository.findAll().forEach(u -> {
                var farms = farmRepository.findByFarmerId(u.getId());
                var crops = cropRepository.findAllByFarm_Farmer_Id(u.getId());
                double totQty = crops.stream().mapToDouble(c -> c.getQuantity() != null ? c.getQuantity() : 0).sum();
                double totRev = crops.stream().mapToDouble(c -> c.getRevenue() != null ? c.getRevenue() : 0).sum();
                System.out.println("  - Username: " + u.getUsername() + ", ID: " + u.getId() + ", Email: " + u.getEmail() + " | Farms: " + farms.size() + " | Crops: " + crops.size() + " | TotQty: " + totQty + " | TotRev: " + totRev);
                if (crops.size() > 0) {
                    System.out.println("    Crops:");
                    for (var c : crops) {
                        System.out.println("      * " + c.getCropName() + " (Qty: " + c.getQuantity() + ", Rev: " + c.getRevenue() + ")");
                    }
                }
            });
        } catch (Exception e) {
            System.err.println("Failed to query DB status: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
