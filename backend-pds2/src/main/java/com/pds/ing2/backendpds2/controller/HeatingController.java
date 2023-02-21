package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.HeatingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/heating")
@CrossOrigin("*")
@Slf4j
public class HeatingController {

    private final HeatingService heatingService;


    @PutMapping("/{id}/state")
    public void updateState(@PathVariable Integer id, @RequestBody boolean state) {
        heatingService.updateState(id, state);
        log.info("ce chauffage avec l'id {}, a bien été modifié avec un état {}",id, state);
    }
}
