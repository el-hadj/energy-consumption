package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.EolienneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Random;
import java.util.Optional;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class EolienneService {

    private final EolienneRepository eolienneRepository;



    public Double ProductionInstantanne(SourceProduction id) {
        Eolienne eolienne = eolienneRepository.findByIdSource(id)
                .orElseThrow(() -> new RuntimeException( "l'eolienne avec l'id " +id+ "n'existe pas"));
        Random rand = new Random();
        double vitesseMin = 14.0; // Vitesse minimale en km/h
        double vitesseMax = 25.0; // Vitesse maximale en km/h
        double vitesse = rand.nextDouble() * (vitesseMax - vitesseMin) + vitesseMin;
        vitesse = Math.round(vitesse * 10) / 10.0; // Arrondir à une décimale
        updateEolienneVitesseVent(eolienne.getId(),vitesse);
        double rayon = 10.0; // Rayon de l'éolienne en mètres
        Double puissance = 0.5 * rayon * vitesse* eolienne.getPuissanceNominale();
        puissance = Math.round(puissance * 100.0) / 100.0;
        return  puissance; // 2 à 5 kwh
    }



    public Double getVitesse(Integer id){
        Eolienne eolienne = eolienneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException( "l'eolienne avec l'id " +id+ "n'existe pas"));
        Double vitesse = eolienne.getVitesseVent();
        return vitesse;
    }

    public Eolienne updateEolienneVitesseVent(Integer eolienneId, double vitesseVent) {
        Optional<Eolienne> optionalEolienne = eolienneRepository.findById(eolienneId);
        if (optionalEolienne.isPresent()) {
            Eolienne eolienne = optionalEolienne.get();
            eolienne.setVitesseVent(vitesseVent);
            return eolienneRepository.save(eolienne);
        } else {
            throw new RuntimeException( "l'eolienne avec l'id " +eolienneId+ "n'existe pas");
        }
    }
}
