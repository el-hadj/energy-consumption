package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.*;
import com.pds.ing2.backendpds2.repository.ProductionBeposRepo;
import com.pds.ing2.backendpds2.repository.SourceProductionRepo;
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
public class ProductionBeposService {

    private final EolienneService eolienneService;

    private LocalDateTime dateTime = LocalDateTime.now();

    private final SourceProductionRepo sourceProductionRepo;

    private final ProductionBeposRepo productionBeposRepo;

    private final SolarService solarService;

    public List<Map<String, String>> getProd(){
        return productionBeposRepo.getAllProduction();
    }

    @Scheduled(fixedRate = 4000)
    private void getProduction() {
        List<SourceProduction> source = sourceProductionRepo.findAll();
        if (source != null) {
            for (SourceProduction s : source) {
                String typeEquipment = s.getName().toLowerCase();
                switch (typeEquipment) {
                    case "eolienne":
                        log.info("je calcule pour l'eolienne {}", s.getId());
                        Double eolienneEnergy = eolienneService.ProductionInstantanne(s);
                        ProductionBepos productionBepos = new ProductionBepos(s.getName(), dateTime, eolienneEnergy, s.getId());
                        productionBeposRepo.save(productionBepos);
                        break;
                    case "solaire":
                        log.info("je calcule pour le solaire {}", s.getId());
                        Double solaireEnergy = solarService.productionSolar(s);
                        ProductionBepos solaire = new ProductionBepos(s.getName(), dateTime, solaireEnergy, s.getId());
                        productionBeposRepo.save(solaire);
                        break;
                }
                LocalDateTime newdate = dateTime.plusHours(1);
                setDateTime(newdate);
            }
        }else {
            log.info("il n'y a pas de production");
        }
    }
}
