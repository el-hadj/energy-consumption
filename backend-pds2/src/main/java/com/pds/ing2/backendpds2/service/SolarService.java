package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.SolarRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class SolarService {

    private final SolarRepo solarRepo;

    public double productionSolar(SourceProduction id) {
        Solar solar = solarRepo.findByIdSource(id)
                .orElseThrow(() -> new RuntimeException("le panneau solaire avec l'id " + id + " n'existe pas"));
        Random rand = new Random();
        double temperatureMin = 25.0; // Température minimale en degrés Celsius
        double temperatureMax = 35.0; // Température maximale en degrés Celsius
        double temperature = rand.nextDouble() * (temperatureMax - temperatureMin) + temperatureMin;
        temperature = Math.round(temperature * 10) / 10.0; // Arrondir à une décimale
        updateSolarEnsoleillement(solar.getId(), temperature);
        double energySolar = temperature * solar.getPuissanceNominale(); //4 à 6 kWh
        energySolar = Math.round(energySolar * 100.0) / 100.0;
        return energySolar;
    }

    public Double getEnsolleillement(Integer id){
       Solar solar = solarRepo.findById(id)
                .orElseThrow(() -> new RuntimeException( "le panneau solaire avec l'id " + id + " n'existe pas"));
        Double temp = solar.getEnsoleillement();
        return temp;
    }

    public Solar updateSolarEnsoleillement(Integer solarId, Double ensoleillement) {
        Optional<Solar> optionalSolar = solarRepo.findById(solarId);
        if (optionalSolar.isPresent()) {
            Solar solar = optionalSolar.get();
            solar.setEnsoleillement(ensoleillement);
            return solarRepo.save(solar);
        } else {
            throw new RuntimeException("le panneau solaire avec l'id " + solarId + " n'existe pas");
        }
    }
}
