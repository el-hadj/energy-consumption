package com.pds.ing2.frontendpds2.controller;

import com.pds.ing2.frontendpds2.service.MesureBeposService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Controller
public class ConsumptionRatt {

    @Autowired
    private MesureBeposService service;

    private static final Logger log = Logger.getLogger("Consumption");

    @GetMapping("/listDesPieces")
    public String roomlistController(Model model, HttpSession session){
        int id =Integer.parseInt(session.getAttribute("id") + "");
        List<Map<String, String>> pieces = service.roomlistservice(id);
        model.addAttribute("listepiece", pieces);
        model.addAttribute("users", id);
        return "Consommation/consum";
    }


    public String equipementList(Model model, HttpSession session){
        int id =Integer.parseInt(session.getAttribute("id") + "");
        List<Map<String, String>> equip = service.equipemenService(id);
        model.addAttribute("listepiece", equip);
        return "";
    }



}
