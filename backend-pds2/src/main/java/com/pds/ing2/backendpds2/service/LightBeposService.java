package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.ConsumptionBepos;
import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.LightBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.LightBeposRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LightBeposService {

    private final LightBeposRepo lightBeposRepo;


    public Integer CalculatingEnergyConsumedLight(EquipmentBepos id) {
        Integer energy = 0;
        LightBepos lightBepos = lightBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette lampe avec l'id " + id + " n'existe pas "));
        if (lightBepos != null && lightBepos.getState()) {
            energy += lightBepos.getIntensity() * 1;
            return energy;
        }else {
            return 0;
        }

    }

}
