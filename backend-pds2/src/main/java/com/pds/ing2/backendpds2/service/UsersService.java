package com.pds.ing2.backendpds2.service;

import com.pds.ing2.backendpds2.model.Users;
import com.pds.ing2.backendpds2.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsersService {
    @Autowired
    private UsersRepo usersRepo;

    // select all user
    public List<Users> getUsers() {
        return (List<Users>) usersRepo.findAll();
    }

    // check email
    public Integer checkMail(String email) {
        if (usersRepo.checkEmail(email) == null) {
            return 0;
        } else
            return usersRepo.checkEmail(email);
    }

    // select user
    public Users selectUser(String email) {
        return usersRepo.selectUser(email);
    }

    // select user with id
    public Users selectUserWithId(Integer id) {
        return usersRepo.selectUserWithId(id);
    }

    // select users with lastName or firstName
    public List<Map<String, String>> selectUsersWithFirstNameOrLastName(String value, Integer idCompany) {
        return usersRepo.selectUsersWithFirstNameOrLastName(value, idCompany);
    }

}
