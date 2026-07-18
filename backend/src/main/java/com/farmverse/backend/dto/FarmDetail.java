package com.farmverse.backend.dto;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmDetail {
    private Long farmId;
    private String farmName;
    private String farmType;
    private BigDecimal areaSqMt;
    private String soilType;
    private String location;
    private List<CropSummary> crops;
}

//This is for nested objects inside the View Farm request.