package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.RoomBepos;
import com.pds.ing2.backendpds2.repository.RoomBeposRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomBeposService {

    private final RoomBeposRepo roomBeposRepo;

    public List<RoomBepos> getRooms(Integer id){
        return roomBeposRepo.getAllRoomsByUserId(id);
    }

    public List<RoomBepos> find(){
        return roomBeposRepo.findAll();
    }


}
