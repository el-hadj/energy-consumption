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
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class HeatingService {

    private final HeatingBeposRepo heatingBeposRepo;


    public Double calculatingEnergyConsumedHeating(EquipmentBepos id, LocalDateTime dateTime) {
        Double energy = 0.0;
        HeatingBepos heatingBepos = heatingBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" ce chauffage avec l'id " + id + " n'existe pas "));
        LocalTime localTime = dateTime.toLocalTime();
        LocalTime h6 = LocalTime.of(6,0);
        LocalTime h9 = LocalTime.of(9,0);
        LocalTime h17 = LocalTime.of(17,0);
        LocalTime h20 = LocalTime.of(20,0);
        if (heatingBepos.getState()) {
            if ((localTime.isAfter(h6) && localTime.isBefore(h9)) ||
                    (localTime.isAfter(h17) && localTime.isBefore(h20))) {
                energy += heatingBepos.getThermostat() * 0.8;
            } else {
                energy += heatingBepos.getThermostat() * 0.6;
            }
        }
        return energy;
    }


    @Transactional
    public void updateState(Integer id, boolean state) {
        heatingBeposRepo.updateState(id, state);
    }


}
