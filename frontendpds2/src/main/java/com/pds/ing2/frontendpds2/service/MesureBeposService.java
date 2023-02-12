package com.pds.ing2.frontendpds2.service;

import com.pds.ing2.frontendpds2.repository.MesureBeposProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MesureBeposService {
    
    @Autowired
    private MesureBeposProxy proxy;

    public List<Map<String, String>> roomlistservice(int id){
        return proxy.roomlistProxy(id);
    }

    public List<String> equipemenListService(int id, String roomName){
        return proxy.equipementForeachRoom(id, roomName);
    }

    public Integer recupereValueService(int id, String nomEquip){
        return proxy.recupereValue(id, nomEquip);
    }


    /**
     *
     * rattrapage
     * @param id
     * @return
     */
    public List<Map<String, String>> equipemenService(int id){
        return proxy.equipementList(id);
    }

    public List<Map<String, String>> infoServiceHeat(int id, String date){
        return proxy.infoProxy(id,date);
    }
}
