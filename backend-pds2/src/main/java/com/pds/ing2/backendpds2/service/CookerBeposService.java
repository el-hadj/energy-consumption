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

@Service
@Slf4j
@RequiredArgsConstructor
public class CookerBeposService {


    private final CookerBeposRepo cookerBeposRepo;

    public Integer CalculatingEnergyConsumedCooker(EquipmentBepos id) {
        Integer energy = 0;
        CookerBepos cookerBepos = cookerBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette cuisinière avec l'id " + id + " n'existe pas "));
        if (cookerBepos.getState()) {
            energy += cookerBepos.getPower() * 2;
            return energy;
        }else {
            return 0;
        }

    }

    @Transactional
    public void updateState(Integer id, boolean state) {
        cookerBeposRepo.updateState(id, state);
    }
}
