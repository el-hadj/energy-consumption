package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.ConsumptionBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/consommation")
@RequiredArgsConstructor
public class ConsumptionBeposController {

    private final ConsumptionBeposService consumptionBeposService;


    @CrossOrigin(origins = { "http://localhost:9001"})
    @GetMapping()
    public List<Map<String, String>> getListEquipment(@RequestParam("idRoom") Integer id){
        return consumptionBeposService.getListEquipment(id);
    }
    

}
