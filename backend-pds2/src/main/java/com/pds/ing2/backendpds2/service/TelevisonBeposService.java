package com.pds.ing2.backendpds2.service;


import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.HeatingBepos;
import com.pds.ing2.backendpds2.model.TelevisionBepos;
import com.pds.ing2.backendpds2.repository.TelevisionBeposRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class TelevisonBeposService {

    private final TelevisionBeposRepo televisionBeposRepo;

    public Double calculatingEnergyConsumedTv(EquipmentBepos id, LocalDateTime dateTime) {
        Double energy = 0.0;
        TelevisionBepos televisionBepos = televisionBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette Télé avec l'id " + id + " n'existe pas "));
        LocalTime localTime = dateTime.toLocalTime();
        LocalTime h18 = LocalTime.of(18,0);
        LocalTime h23 = LocalTime.of(23,0);
        if (televisionBepos.getState()) {
            if ((localTime.isAfter(h18) && localTime.isBefore(h23))){
                energy += televisionBepos.getPower() * 2.0;
            } else {
                energy +=televisionBepos.getPower() * 1.5;
            }
        }
        return energy;
    }

    @Transactional
    public void updateState(Integer id, boolean state) {
        televisionBeposRepo.updateState(id, state);
    }


}
