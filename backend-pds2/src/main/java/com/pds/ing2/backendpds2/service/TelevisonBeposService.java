package com.pds.ing2.backendpds2.service;


import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.HeatingBepos;
import com.pds.ing2.backendpds2.model.TelevisionBepos;
import com.pds.ing2.backendpds2.repository.TelevisionBeposRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TelevisonBeposService {

    private final TelevisionBeposRepo televisionBeposRepo;

    public Integer CalculatingEnergyConsumedTv(EquipmentBepos id) {
        Integer energy = 0;
        TelevisionBepos televisionBepos = televisionBeposRepo.findByIdEquip(id)
                .orElseThrow(() -> new RuntimeException(" cette Télé avec l'id " + id + " n'existe pas "));
        if (televisionBepos.getState()) {
            Double power = televisionBepos.getPower() + (Math.random() * 20 - 10);
            energy = power.intValue();
            return energy;
        } else {
            return 0;
        }
    }

    @Transactional
    public void updateState(Integer id, boolean state) {
        televisionBeposRepo.updateState(id, state);
    }


}
