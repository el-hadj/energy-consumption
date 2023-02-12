package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.ConsumptionBepos;
import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.LightBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.EquipementBeposRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
@Data
public class ConsumptionBeposService {


    private LocalDateTime dateTime = LocalDateTime.now();

    private final EquipementBeposRepo equipementBeposRepo;

    private final ConsumptionBeposRepo consumptionBeposRepo;

    private final LightBeposService lightBeposService;
    private final CookerBeposService cookerBeposService;


    @Scheduled(fixedRate = 4000)
    private void addConsumption() {
        List<EquipmentBepos> equipmentBepos = equipementBeposRepo.findAll();
        if (equipmentBepos != null) {
            for (EquipmentBepos e : equipmentBepos) {
                String typeEquipment = e.getNomEquipment().toLowerCase();
                switch (typeEquipment) {
                    case "lampe":
                        log.info("je calcule pour la lampe {}", e.getIdEquipment());
                        Integer lightEnergy = lightBeposService.CalculatingEnergyConsumedLight(e);
                        ConsumptionBepos consumptionBepos = new ConsumptionBepos(lightEnergy, dateTime, e);
                        consumptionBeposRepo.save(consumptionBepos);
                        break;
                    case "cuisinière":
                        log.info("je calcule pour la cuisinière {}", e.getIdEquipment());
                        Integer cookerEnergy = cookerBeposService.CalculatingEnergyConsumedCooker(e);
                        ConsumptionBepos consumptionBepos1 = new ConsumptionBepos(cookerEnergy, dateTime, e);
                        consumptionBeposRepo.save(consumptionBepos1);
                        break;
                }
                LocalDateTime newdate = dateTime.plusHours(1);
                setDateTime(newdate);
            }
        }

    }

    public List<Map<String, String>> getListEquipment(Integer id){
        return consumptionBeposRepo.getEquipementByIdRoom(id);
    }


}

