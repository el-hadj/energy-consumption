package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.CookerBeposService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cooker")
@CrossOrigin("*")
@Slf4j
public class CookerController {

    private final CookerBeposService cookerBeposService;

    @PutMapping("/{id}/state")
    public void updateState(@PathVariable Integer id, @RequestBody boolean state) {
        cookerBeposService.updateState(id, state);
        log.info("cette cusinière avec l'id {}, a bien été modifié avec un état {}",id, state);
    }
}
