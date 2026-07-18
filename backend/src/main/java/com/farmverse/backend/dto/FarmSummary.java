package com.farmverse.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmSummary {
    private Long farmId;
    private String farmName;
    private String farmType;
    private BigDecimal areaAqMt;
    private String soilType;
    private String location;
    private Integer cropCount;
}

//This is to list all farms, including cropCount
