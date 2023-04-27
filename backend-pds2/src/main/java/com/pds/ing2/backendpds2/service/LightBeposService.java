package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.LightBepos;
import com.pds.ing2.backendpds2.repository.LightBeposRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class LightBeposService {

    private final LightBeposRepo lightBeposRepo;


    public Double calculatingEnergyConsumedLight(EquipmentBepos id, LocalDateTime dateTime) {
        Double energy = 0.0;
        LightBepos lightBepos = lightBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette lampe avec l'id " + id + " n'existe pas "));
        LocalTime localTime = dateTime.toLocalTime();
        LocalTime h00 = LocalTime.of(1,0);
        LocalTime h8 = LocalTime.of(8,0);
        LocalTime h12 = LocalTime.of(12,0);
        LocalTime h17 = LocalTime.of(17,0);
        LocalTime h20 = LocalTime.of(20,0);
        LocalTime h23 = LocalTime.of(23,0);

        if (lightBepos.getState()) {
            if ((localTime.isAfter(h00) && localTime.isBefore(h8)) ||
                    (localTime.isAfter(h12) && localTime.isBefore(h17)) ||
                    (localTime.isAfter(h20) && localTime.isBefore(h23))) {
                energy += lightBepos.getIntensity() * 1.5;
            } else if ((localTime.isAfter(h8) && localTime.isBefore(h12)) ||
                    (localTime.isAfter(h17) && localTime.isBefore(h20))) {
                energy += lightBepos.getIntensity() * 2;
            }
        }

        return energy;
    }


    @Transactional
    public void updateState(Integer id, boolean state) {
        lightBeposRepo.updateState(id, state);
    }

}
