package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.dto.ConsumptionHourlyDTO;
import com.pds.ing2.backendpds2.model.ConsumptionBepos;
import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.repository.ConsumptionBeposRepo;
import com.pds.ing2.backendpds2.repository.EquipementBeposRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
@Data
public class ConsumptionBeposService {

    private LocalDateTime dateTime = LocalDateTime.now();

    private final EquipementBeposRepo equipementBeposRepo;
    public Boolean startSchedule = true;

    private final ConsumptionBeposRepo consumptionBeposRepo;

    private final LightBeposService lightBeposService;
    private final CookerBeposService cookerBeposService;

    private final HeatingService heatingService;

    private final TelevisonBeposService televisonBeposService;


    @Scheduled(fixedRate = 8000)
    public void addConsumption() {
        if(startSchedule){
            log.info("je calcule la consommation à : " +dateTime);
            List<EquipmentBepos> equipmentBepos = equipementBeposRepo.findAll();
            if (equipmentBepos != null && startSchedule) {
                for (EquipmentBepos e : equipmentBepos) {
                    String typeEquipment = e.getNomEquipment().toLowerCase();
                    switch (typeEquipment) {
                        case "lampe":
                            //log.info("je calcule pour la lampe {}", e.getIdEquipment());
                            Double lightEnergy = lightBeposService.calculatingEnergyConsumedLight(e, dateTime);
                            ConsumptionBepos consumptionBepos = new ConsumptionBepos(lightEnergy, dateTime, e);
                            consumptionBeposRepo.save(consumptionBepos);
                            break;
                        case "cuisinière":
                            //log.info("je calcule pour la cuisinière {}", e.getIdEquipment());
                            Double cookerEnergy = cookerBeposService.calculatingEnergyConsumedCooker(e, dateTime);
                            ConsumptionBepos consumptionBepos1 = new ConsumptionBepos(cookerEnergy, dateTime, e);
                            consumptionBeposRepo.save(consumptionBepos1);
                            break;
                        case "chauffage":
                            //log.info("je calcule pour le chauffage {}", e.getIdEquipment());
                            Double heatingEnergy = heatingService.calculatingEnergyConsumedHeating(e, dateTime);
                            ConsumptionBepos consumptionBepos3 = new ConsumptionBepos(heatingEnergy, dateTime, e);
                            consumptionBeposRepo.save(consumptionBepos3);
                            break;
                        case "télévision":
                            // log.info("je calcule pour la télé {}", e.getIdEquipment());
                            Double tvEnergy = televisonBeposService.calculatingEnergyConsumedTv(e,dateTime);
                            ConsumptionBepos consumptionBepos4 = new ConsumptionBepos(tvEnergy, dateTime, e);
                            consumptionBeposRepo.save(consumptionBepos4);
                            break;
                    }

                }
                LocalDateTime newdate = dateTime.plusHours(1);
                setDateTime(newdate);
            } else {
                log.info("il n'y a pas d'équipement");
            }
            log.info("je termine le calcul de la consommation ");
        }else {
            log.info("j'arrète mon schedule");
        }

    }

    public List<Map<String, String>> getListEquipment(Integer id) {
        return consumptionBeposRepo.getEquipementByIdRoom(id);
    }

    public Map<String, Double> getConsommationParJour() {
        Map<String, Double> consommationParJour = new TreeMap<>(new Comparator<String>() {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            public int compare(String date1, String date2) {
                try {
                    return dateFormat.parse(date1).compareTo(dateFormat.parse(date2));
                } catch (ParseException e) {
                    throw new IllegalArgumentException(e);
                }
            }
        });
        List<ConsumptionBepos> consommations = consumptionBeposRepo.findAll();
        for (ConsumptionBepos consommation : consommations) {
            LocalDateTime startTime = consommation.getStartTime();
            String jour = startTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            Double energyPower = consommation.getEnergyPower();
            if (consommationParJour.containsKey(jour)) {
                energyPower += consommationParJour.get(jour);
            }
            consommationParJour.put(jour, energyPower);
        }
        return consommationParJour;
    }

    public List<ConsumptionHourlyDTO> getHourlyEnergyTotal(LocalDate targetDate) {
        List<Object[]> result = consumptionBeposRepo.findConsumptionByDay(targetDate);
        List<ConsumptionHourlyDTO> dtoList = new ArrayList<>();
        for (Object[] obj : result) {
            LocalDateTime hour = ((Timestamp) obj[0]).toLocalDateTime();
            double totalEnergy = ((Number) obj[1]).doubleValue();
            dtoList.add(new ConsumptionHourlyDTO(hour, totalEnergy));
        }
        return dtoList;
    }



    public LocalDateTime findLatestTimeService(){
        return consumptionBeposRepo.findLatestTime();
    }


}

