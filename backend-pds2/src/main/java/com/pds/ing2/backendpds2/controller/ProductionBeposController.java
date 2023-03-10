package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.model.Eolienne;
import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.service.ProductionBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/production")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductionBeposController {

    private final ProductionBeposService productionBeposService;

    @GetMapping("/prod")
    public List<Map<String, String>> getProduction(){
        return productionBeposService.getProd();
    }

    @GetMapping("/parjour")
    public Map<String, Double> productionDay(){
        return productionBeposService.getProductionDay();
    }

    @GetMapping("/vent")
    public Double getVitesse(){
        Integer id = 1;
        return productionBeposService.vitesse(id);
    }

    @GetMapping("/temp")
    public Double getTemp(){
        Integer id = 1;
        return productionBeposService.ensoleil(id);
    }

    @PutMapping("/{id}/upEnso")
    public Solar updateSolarEnsoleillement(@PathVariable(value = "id") Integer solarId,
                                           @RequestParam(value = "enso") Double ensoleillement) {
        return productionBeposService.updateEnso(solarId, ensoleillement);
    }

    @PutMapping("/{id}/upVit")
    public Eolienne updateEolienne(@PathVariable(value = "id") Integer eolId,
                                   @RequestParam(value = "vit") Double vitesse) {
        return productionBeposService.updateVitess(eolId, vitesse);
    }


}
