package com.pds.ing2.frontendpds2.controller;

import com.pds.ing2.frontendpds2.service.MesureBeposService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Controller
public class MesureBeposController {

    @Autowired
    private MesureBeposService service;

    private static final Logger log = Logger.getLogger("MesureBeposController");


    @GetMapping("/toutepiece")
    public String roomlistController(Model model, HttpSession session){
        int id =Integer.parseInt(session.getAttribute("id") + "");
        List<Map<String, String>> listval = service.roomlistservice(id);
        model.addAttribute("listepiece", listval);
        model.addAttribute("users", id);
        return "Consommation/monitorerConso" ;
    }


    @GetMapping("/equipementDepiece")
    public String equipmentList(Model model, HttpSession session, @RequestParam("roomChoice") String roomChoice){
        int id =Integer.parseInt(session.getAttribute("id") + "");
        List <String> listequipement = service.equipemenListService(id, roomChoice);
        model.addAttribute("listequipement", listequipement);
        return "monitorerConso";
    }

    @GetMapping("/value")
    public String recupereController(Model model, HttpSession session,
                            @RequestParam("nomEquip") String nomEquip){
        int id =Integer.parseInt(session.getAttribute("id") + "");
        int recupThermostat = service.recupereValueService(id, nomEquip);
        model.addAttribute("recupThermostat", recupThermostat);
        model.addAttribute("idUser",id);
        return "monitorerConso";
    }

    

    
}
