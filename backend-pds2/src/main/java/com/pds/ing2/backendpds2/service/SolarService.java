package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.SolarRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SolarService {

    private final SolarRepo solarRepo;

    public double productionSolar(SourceProduction id) {
        Solar solar = solarRepo.findByIdSource(id)
                .orElseThrow(() -> new RuntimeException("le panneau solaire avec l'id " + id + " n'existe pas"));
        double energySolar = solar.getEnsoleillement() * solar.getPuissanceNominale(); //4 à 6 kWh
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
