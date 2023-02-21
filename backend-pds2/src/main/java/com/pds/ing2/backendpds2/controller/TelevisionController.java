package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.service.TelevisonBeposService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tv")
@CrossOrigin("*")
@Slf4j
public class TelevisionController {

    private final TelevisonBeposService televisonBeposService;

    @PutMapping("/{id}/state")
    public void updateState(@PathVariable Integer id, @RequestBody boolean state) {
        televisonBeposService.updateState(id, state);
        log.info("cette télé avec l'id {}, a bien été modifié avec un état {}",id, state);
    }
}
