package com.pds.ing2.frontendpds2.controller;

import com.pds.ing2.frontendpds2.model.Users;
import com.pds.ing2.frontendpds2.service.UsersServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.logging.Logger;

@Controller
public class UsersController {

    private static final Logger logger = Logger.getLogger(UsersController.class.getName());

    @Autowired
    private UsersServices services;

    @GetMapping("/")
    public String loginPage() {
        return "login";
    }

    /**
     * Verify - verify if user exist and if he is a employee, inhabitant
     */
    @GetMapping("/checkUser")
    public String checkUser(@RequestParam(name = "email") String email, Model model, HttpSession session) {
        Boolean verfiUser = services.checkUser(email);

        if (verfiUser) {
            Users u1 = services.getUser(email);
            session.setAttribute("id", u1.getId());
            session.setAttribute("lastName", u1.getLastName());
            session.setAttribute("firstName", u1.getFirstName());

            return "homePage";
        } else
            return "login";
    }

    public void useSession(HttpSession session, String param) {
        if (param.equals("habitant")) {
            session.removeAttribute("idCompany");
            session.removeAttribute("role");
            session.removeAttribute("services_regulations");
        } else if (param.equals("services_regulations")) {
            session.removeAttribute("idCompany");
            session.removeAttribute("role");
            session.removeAttribute("habitant");
        } else if (param.equals("idCompany")) {
            session.removeAttribute("habitant");
            session.removeAttribute("services_regulations");
        }
    }

    /**
     * Empty Session - deconnexion
     */
    @GetMapping("/out")
    public String goOut(HttpSession session) {
        session.invalidate();
        return "login";
    }

}