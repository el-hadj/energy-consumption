package com.pds.ing2.frontendpds2.controller;

import com.pds.ing2.frontendpds2.service.ProductionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ProductionController {

    private final ProductionService productionService;

    @GetMapping("/prod")
    public String sendProduction(Model model){
        List<Map<String, String>> listProd = productionService.getProductionService();
        model.addAttribute("production", listProd);
        return "monitorerProd";
    }
}
