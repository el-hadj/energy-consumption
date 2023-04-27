package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.CookerBepos;
import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.CookerBeposRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class CookerBeposService {


    private final CookerBeposRepo cookerBeposRepo;

    public Double calculatingEnergyConsumedCooker(EquipmentBepos id, LocalDateTime dateTime) {
        Double energy = 0.0;
        CookerBepos cookerBepos = cookerBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette cuisinière avec l'id " + id + " n'existe pas "));
        LocalTime localTime = dateTime.toLocalTime();
        LocalTime h7 = LocalTime.of(7,0);
        LocalTime h9 = LocalTime.of(9,0);
        LocalTime h12 = LocalTime.of(12,0);
        LocalTime h14 = LocalTime.of(14,0);
        LocalTime h18 = LocalTime.of(18,0);
        LocalTime h20 = LocalTime.of(20,0);
        if (cookerBepos.getState()) {
            if ((localTime.isAfter(h7) && localTime.isBefore(h9)) ||
                    (localTime.isAfter(h12) && localTime.isBefore(h14)) ||
                    (localTime.isAfter(h18) && localTime.isBefore(h20))) {
                energy += cookerBepos.getPower() * 2;
            } else {
                energy +=cookerBepos.getPower() * 1.5;
            }
        }
        return energy;
    }

    @Transactional
    public void updateState(Integer id, boolean state) {
        cookerBeposRepo.updateState(id, state);
    }
}
