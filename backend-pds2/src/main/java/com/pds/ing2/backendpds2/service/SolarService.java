package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.SolarRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
}
