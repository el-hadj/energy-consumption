package com.pds.ing2.frontendpds2.service;

import com.pds.ing2.frontendpds2.model.Habitation;
import com.pds.ing2.frontendpds2.repository.HabitationProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HabitationServices {

    @Autowired
    private HabitationProxy proxy;

    public Habitation getHome(int id){return proxy.getHome(id);}
    public Iterable<Habitation> getHomes(){return proxy.getHomes();}

    //public HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>> HomeInfo(){return proxy.HomeInfo();}

   // public void setThermos(int id, int thermos) {
     //   proxy.setThermos(id, thermos);
   // }

    //public  String UserAdress(){return null;}//il faut changer le return et les param

}
