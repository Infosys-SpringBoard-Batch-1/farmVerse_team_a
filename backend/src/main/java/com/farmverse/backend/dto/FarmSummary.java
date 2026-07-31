package com.farmverse.backend.dto;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmSummary {
    private Long farmId;
    private String farmName;
    private String farmType;
    private BigDecimal areaSqMt;
    private String soilType;
    private String location;
    private Integer cropCount;
}

//This is to list all farms, including cropCount
