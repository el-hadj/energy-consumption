package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.ProductionBepos;
import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.ProductionBeposRepo;
import com.pds.ing2.backendpds2.repository.SourceProductionRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
@Data
public class ProductionBeposService {

    private final EolienneService eolienneService;

    LocalDate currentDate = LocalDate.now();
    private final SourceProductionRepo sourceProductionRepo;

    private final ProductionBeposRepo productionBeposRepo;

    private final SolarService solarService;

    public Boolean startScheduleProd = false;

    public List<Map<String, String>> getProd(){
        return productionBeposRepo.getAllProduction();
    }

    @Scheduled(fixedRate = 15000)
    public void getProduction() {
        if(startScheduleProd){
            log.info("je calcule la production à : "+currentDate);
            List<SourceProduction> source = sourceProductionRepo.findAll();
            if (source != null) {
                for (SourceProduction s : source) {
                    String typeEquipment = s.getName().toLowerCase();
                    switch (typeEquipment) {
                        case "eolienne":
                            log.info("je calcule pour l'eolienne {}", s.getId());
                            Double eolienneEnergy = eolienneService.ProductionInstantanne(s);
                            ProductionBepos productionBepos = new ProductionBepos(s.getName(), currentDate, eolienneEnergy, s.getId());
                            productionBeposRepo.save(productionBepos);
                            break;
                        case "solaire":
                            log.info("je calcule pour le solaire {}", s.getId());
                            Double solaireEnergy = solarService.productionSolar(s);
                            ProductionBepos solaire = new ProductionBepos(s.getName(), currentDate, solaireEnergy, s.getId());
                            productionBeposRepo.save(solaire);
                            break;
                    }

                }
                LocalDate newdate = currentDate.plusDays(1);
                setCurrentDate(newdate);
            }else {
                log.info("il n'y a pas de production");
            }
        }else {
            log.info("j'arrète la production ");
        }

    }

    public Map<String, Double> getProductionDay() {
        Map<String, Double> ProductionDay =new TreeMap<>(new Comparator<String>() {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            public int compare(String date1, String date2) {
                try {
                    return dateFormat.parse(date1).compareTo(dateFormat.parse(date2));
                } catch (ParseException e) {
                    throw new IllegalArgumentException(e);
                }
            }
        });
        List<ProductionBepos> productionBepos = productionBeposRepo.findAll();

        for (ProductionBepos p : productionBepos) {
            LocalDate startTime = p.getDateProd();
            String jour = startTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            Double energyPower = p.getQuantity();
            if (ProductionDay.containsKey(jour)) {
                energyPower += ProductionDay.get(jour);
            }
            ProductionDay.put(jour, energyPower);
        }
        return ProductionDay;
    }

    public Double vitesse(Integer id){
        return eolienneService.getVitesse(id);
    }

    public Double ensoleil(Integer id){
        return solarService.getEnsolleillement(id);
    }

    public Solar updateEnso(Integer id, Double enso){
        return solarService.updateSolarEnsoleillement(id, enso);
    }

    public Eolienne updateVitess(Integer id, Double vitesse){
        return eolienneService.updateEolienneVitesseVent(id, vitesse);
    }

    public LocalDate getLatestTime(){
        return productionBeposRepo.getDateTime();
    }
}
