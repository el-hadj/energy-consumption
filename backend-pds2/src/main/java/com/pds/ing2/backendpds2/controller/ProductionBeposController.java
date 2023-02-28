package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.ProductionBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
