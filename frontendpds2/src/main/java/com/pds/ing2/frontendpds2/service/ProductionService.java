package com.pds.ing2.frontendpds2.service;

import com.pds.ing2.frontendpds2.repository.ProductionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductionService {

    private final ProductionRepo productionRepo;

    public List<Map<String, String>> getProductionService(){
        return productionRepo.getProduction();
    }
}
