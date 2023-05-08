package com.pds.ing2.backendpds2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ConsumptionHourlyDTO {

    private LocalDateTime hour;
    private double totalEnergy;

    public ConsumptionHourlyDTO(LocalDateTime hour, double totalEnergy) {
        this.hour = hour;
        this.totalEnergy = totalEnergy;
    }

}
