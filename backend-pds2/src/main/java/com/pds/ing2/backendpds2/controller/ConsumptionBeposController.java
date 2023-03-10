package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.ConsumptionBeposService;
import com.pds.ing2.backendpds2.service.ProductionBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/consommation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ConsumptionBeposController {

    private final ConsumptionBeposService consumptionBeposService;

    private final ProductionBeposService productionBeposService;



    private final TaskScheduler taskScheduler;
    private ScheduledFuture<?> scheduledFuture;
    private AtomicBoolean isScheduled = new AtomicBoolean(false);
    private LocalDateTime dateTime = LocalDateTime.now();


    @GetMapping("/startScheduledMethod")
    public void startScheduledMethod() {
        if (isScheduled.compareAndSet(false, true)) {
            scheduledFuture = taskScheduler.schedule(() ->{
                    //consumptionBeposService.addConsumption();
                    productionBeposService.getProduction();
                    },
                    new CronTrigger("*/20 * * * * *"));        }
    }

    @GetMapping("/stopScheduledMethod")
    public void stopScheduledMethod() {
        if (isScheduled.compareAndSet(true, false)) {
            if (scheduledFuture != null) {
                scheduledFuture.cancel(true);
            }
        }
    }

    public void restartScheduledMethod() {
        stopScheduledMethod();
        startScheduledMethod();
    }


    @GetMapping()
    public List<Map<String, String>> getListEquipment(@RequestParam("idRoom") Integer id){
        return consumptionBeposService.getListEquipment(id);
    }
    

    @GetMapping("/parjour")
    public Map<String, Integer> consumptionDay(){
        return consumptionBeposService.getConsommationParJour();
    }
}
