package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.SourceProduction;
import com.pds.ing2.backendpds2.repository.EolienneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EolienneService {

    private final EolienneRepository eolienneRepository;

    public double ProductionInstantanne(SourceProduction id) {
        Eolienne eolienne = eolienneRepository.findByIdSource(id)
                .orElseThrow(() -> new RuntimeException( "l'eolienne avec l'id " +id+ "n'existe pas"));
        double rayon = 10.0; // Rayon de l'éolienne en mètres
        double surface = Math.PI * Math.pow(rayon, 2); // Surface balayée par les pales de l'éolienne
        double vitesseVentEff = eolienne.getVitesseVent() * 0.7; // Vitesse effective du vent en tenant compte des pertes de rendement
        double puissance = 0.5 * 1.225 * surface * Math.pow(vitesseVentEff, 3); // Calcul de la puissance produite
        double puissanceMaximale = eolienne.getPuissanceMaximale(); //2 à 5 kWh
        if (puissance > puissanceMaximale) {
            puissance = puissanceMaximale; // La puissance produite est limitée par la puissance maximale de l'éolienne
        }
        return puissance;
    }
}
