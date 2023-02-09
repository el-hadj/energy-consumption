package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.model.RoomBepos;
import com.pds.ing2.backendpds2.service.RoomBeposService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomBeposController {


    private final RoomBeposService roomBeposService;

    @GetMapping("/all")
    public List<RoomBepos> getRooms(@RequestParam("id") Integer id){
        return roomBeposService.getRooms(id);
    }

    @GetMapping
    public List<RoomBepos> find(){
        return roomBeposService.find();
    }


}
