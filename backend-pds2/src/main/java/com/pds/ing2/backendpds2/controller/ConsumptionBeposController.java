package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.dto.ConsumptionHourlyDTO;
import com.pds.ing2.backendpds2.service.ConsumptionBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/consommation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ConsumptionBeposController {

    private final ConsumptionBeposService consumptionBeposService;
    private AtomicBoolean isScheduled = new AtomicBoolean(false);
    private LocalDateTime dateTime = LocalDateTime.now();


    @GetMapping("/startScheduledConso")
    public void startScheduledMethod() {
        consumptionBeposService.startSchedule = true;
    }



    @GetMapping("/stopScheduledConso")
    public void stopScheduledMethod() {
        consumptionBeposService.startSchedule = false;
    }




    @GetMapping()
    public List<Map<String, String>> getListEquipment(@RequestParam("idRoom") Integer id){
        return consumptionBeposService.getListEquipment(id);
    }
    

    @GetMapping("/parjour")
    public Map<String, Double> consumptionDay(){
        return consumptionBeposService.getConsommationParJour();
    }

    @GetMapping("/parheure")
    public List<ConsumptionHourlyDTO> consumptionByDay(@RequestParam("targetDate") LocalDate localDate){
        return consumptionBeposService.getHourlyEnergyTotal(localDate);
    }

    @GetMapping("/latestTime")
    public LocalDateTime latestTimeController(){
        return consumptionBeposService.findLatestTimeService();
    }
}
