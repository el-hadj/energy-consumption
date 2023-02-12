package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.CookerBepos;
import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.LightBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.CookerBeposRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class CookerBeposService {


    private final CookerBeposRepo cookerBeposRepo;
    private final ConsumptionBeposRepo consumptionBeposRepo;
    private LocalDateTime dateTime = LocalDateTime.now();

    public Integer CalculatingEnergyConsumedCooker(EquipmentBepos id) {
        Integer energy = 0;
        CookerBepos cookerBepos = cookerBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette lampe avec l'id " + id + " n'existe pas "));
        if (cookerBepos != null && cookerBepos.getState()) {
            energy += cookerBepos.getPower() * 1;
            return energy;
        }else {
            return 0;
        }

    }
}
