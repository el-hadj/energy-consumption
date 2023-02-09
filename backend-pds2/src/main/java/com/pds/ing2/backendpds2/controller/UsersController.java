package com.pds.ing2.backendpds2.controller;

import com.pds.ing2.backendpds2.model.Users;
import com.pds.ing2.backendpds2.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService service;

    /**
     * Select - users
     *
     * @return the users
     */

    @GetMapping("/getUsers")
    public List<Users> getUsers() {
        List<Users> listUsers = service.getUsers();
        return listUsers;
    }

    /**
     * Select - user
     *
     * @return one user
     */

    @GetMapping("/getUser")
    public Users getUser(@RequestParam("email") String email) {
        Users u1 = service.selectUser(email);
        return u1;
    }

    /**
     * Select - user
     *
     * @return one user
     */

    @GetMapping("/getUserWithId")
    public Users getUserWithId(@RequestParam("id") Integer id) {
        Users u1 = service.selectUserWithId(id);
        return u1;
    }

    /**
     * check - user
     *
     * @return boolean
     */

    @CrossOrigin(origins = { "http://localhost:9001", "http://172.31.250.12:9001", "http://172.31.249.241:9001" })
    @GetMapping("/checkUser")
    public Boolean checkUser(@RequestParam("email") String email) {
        Integer row = service.checkMail(email);
        if (row == 1)
            return true;
        else
            return false;
    }

    /**
     * Select - select all contacts
     *
     * @param value      which represents the value of the search
     * @param id_company search contact in a only company
     * @return list of rooms
     */

    @CrossOrigin(origins = { "http://localhost:9001", "http://172.31.250.12:9001", "http://172.31.249.241:9001" })
    @GetMapping("/getSearchContact")
    public List<Map<String, String>> getSearchContact(@RequestParam("value") String value,
            @RequestParam("id_company") Integer idCompany) {
        return service.selectUsersWithFirstNameOrLastName(value, idCompany);
    }


}
