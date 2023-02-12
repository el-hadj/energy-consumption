package com.pds.ing2.frontendpds2.service;

import com.pds.ing2.frontendpds2.model.Users;
import com.pds.ing2.frontendpds2.repository.UsersProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServices {
    @Autowired
    private UsersProxy proxy;

    public Boolean checkUser(String email) {
        return proxy.checkUser(email);
    }

    public Users getUser(String email) {
        return proxy.getUser(email);
    }

//    public Employee verifyEmployee(Integer id) {
//        return proxy.verifyEmployee(id);
//    }
//
//    public String getRight(Integer id) {
//        return proxy.getRight(id);
//    }
//
//	public Services_Regulation verifyServiceRegulation(Integer id) {
//		  return proxy.verifyServiceRegulation(id);
//	}
//    public Habitant verifyHabitant(Integer id) {
//        return proxy.verifyHabitant(id);
//    }
}
