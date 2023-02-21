package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.HeatingBepos;
import com.pds.ing2.backendpds2.model.LightBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.HeatingBeposRepo;
import com.pds.ing2.backendpds2.repository.LightBeposRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class HeatingService {

    private final HeatingBeposRepo heatingBeposRepo;


    public Integer CalculatingEnergyConsumedHeating(EquipmentBepos id) {
        Integer energy = 0;
        HeatingBepos heatingBepos = heatingBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" ce chauffage avec l'id " + id + " n'existe pas "));
        if (heatingBepos.getState()) {
            Double power = heatingBepos.getThermostat() + (Math.random() * 100 - 50);
            energy = power.intValue();
            return energy;
        }else {
            return 0;
        }

    }


    @Transactional
    public void updateState(Integer id, boolean state) {
        heatingBeposRepo.updateState(id, state);
    }


}
