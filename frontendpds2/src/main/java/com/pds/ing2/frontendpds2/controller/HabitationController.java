package com.pds.ing2.frontendpds2.controller;

import org.springframework.stereotype.Controller;

@Controller
public class HabitationController {

//    @Autowired
//    private HabitationServices services;
//    @Autowired
//    private RoomService roomservices;
//    @Autowired
//    private HeatingBeposServices heatingservices;
//
//    @GetMapping("/getHome")
//    public String getHome(@RequestParam(name="id") int id, Model model){
//        Habitation h1=services.getHome(id);
//        ArrayList<Rooms> list_Rooms= (ArrayList<Rooms>) roomservices.listRooms(id);
//        Rooms r1= (Rooms) list_Rooms.get(0);
//        model.addAttribute("home",h1);
//        model.addAttribute("room",r1);
//        model.addAttribute("listRoom",list_Rooms);
//
//        return "HomeInterface";
//    }
//    @GetMapping("/getHomeBody")
//    public String getHomeBody(@RequestParam(name="home_id") int id_home, @RequestParam(name="room_id") int id_room,Model model){
//        Habitation h1=services.getHome(id_home);
//        Rooms r1=roomservices.getRoom(id_room);
//        model.addAttribute("home",h1);
//        model.addAttribute("room",r1);
//        model.addAttribute("listRoom",roomservices.listRooms(id_home));
//        System.out.println("id room="+id_room);
//        return "DataHome";
//    }
//    @GetMapping("/listHome")
//    public String listHome(Model model){
//        ArrayList<Habitation> listHabitation = (ArrayList<Habitation>) services.getHomes();
//        model.addAttribute("homes", listHabitation);
//        return "ListHome";
//    }
//
//    @GetMapping("/HomeInfo")
//    public String HomeInfo(Model model){
//
//        return "HomeInterface";
//    }
//
//    /*@GetMapping("/UserAdress")
//    public String UserAdress(Model model, HttpSession session){
//        Habitation place = services.getHome(Integer.parseInt(session.getAttribute("id")+""));
//
//        model.addAttribute("userOfThePlace", services);
//        return "HomeInterface";
//    }*/
//
//    @GetMapping("/UserAdress")
//    public String UserAdress(Model model, HttpSession session) {
//        Integer placeInt = Integer.parseInt(session.getAttribute("id") + "");
//        Iterable<Habitation> listplace = services.getHomes();
//        String placeString = "";
//        for (Habitation habitation : listplace) {
//            if (habitation.getId_home() == placeInt) {
//
//            }
//        }
//            return "HomeInterface";
//        }
//
//    @PostMapping("/setThermos/{id}")
//    public String setThermos(Model model, @PathVariable("id") int id, @RequestParam("thermos") int thermos) {
//        System.out.println("id=" + id + " ;  thermos = " + thermos);
//        Habitation h1=services.getHome(id);
//        ArrayList<Rooms> list_Rooms= (ArrayList<Rooms>) roomservices.listRooms(id);
//        Rooms r1= (Rooms) list_Rooms.get(0);
//        model.addAttribute("home",h1);
//        model.addAttribute("room",r1);
//        model.addAttribute("listRoom",list_Rooms);
//        services.setThermos(id,thermos);
//        return "HeatingBepos";
//    }
}
