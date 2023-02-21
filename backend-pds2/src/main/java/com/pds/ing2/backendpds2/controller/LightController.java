package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.LightBeposService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/light")
@CrossOrigin("*")
@Slf4j
public class LightController {

    private final LightBeposService lightBeposService;


    @PutMapping("/{id}/state")
    public void updateState(@PathVariable Integer id, @RequestBody boolean state) {
        lightBeposService.updateState(id, state);
        log.info("cette lampe avec l'id {}, a bien été modifié avec un état {}",id, state);
    }
}
