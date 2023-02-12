package com.pds.ing2.frontendpds2.repository;

import com.pds.ing2.frontendpds2.CustomProperties;
import com.pds.ing2.frontendpds2.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.logging.Logger;

@Component
public class UsersProxy {

    private static final Logger logger = Logger.getLogger(UsersProxy.class.getName());

    @Autowired
    private CustomProperties props;

    public Boolean checkUser(String email) {
        String usersUrl = props.getApiUrl() + "/users/checkUser?email=" + email;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<Boolean> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<Boolean>() {
                });
        logger.info("Code response : " + resp.getStatusCode().toString() + " for checkUser");
        return resp.getBody();
    }

    public Users getUser(String email) {
        String usersUrl = props.getApiUrl() + "/users/getUser?email=" + email;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<Users> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<Users>() {
                });
        logger.info("Code response : " + resp.getStatusCode().toString() + " for getUser");
        return resp.getBody();
    }

//    public Employee verifyEmployee(Integer id) {
//        String usersUrl = props.getApiUrl() + "/employee/verifyEmployee?id=" + id;
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<Employee> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
//                new ParameterizedTypeReference<Employee>() {
//                });
//        logger.info("Code response : " + resp.getStatusCode().toString() + " for verifyEmployee");
//        return resp.getBody();
//    }

//    public String getRight(Integer id) {
//        String usersUrl = props.getApiUrl() + "/employee/rightEmployee?id=" + id;
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<String> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
//                new ParameterizedTypeReference<String>() {
//                });
//        logger.info("Code response : " + resp.getStatusCode().toString() + " for getRight");
//        return resp.getBody();
//    }
//
//    public Services_Regulation verifyServiceRegulation(Integer id) {
//        String usersUrl = props.getApiUrl() + "/servicesRegulation/verifyServicesRegulation?id=" + id;
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<Services_Regulation> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
//                new ParameterizedTypeReference<Services_Regulation>() {
//                });
//        logger.info("Code response : " + resp.getStatusCode().toString() + " for verifyServiceRegulation");
//        return resp.getBody();
//    }
//
//    public Habitant verifyHabitant(Integer id) {
//        String usersUrl = props.getApiUrl() + "/habitant/verifyHabitant?id=" + id;
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<Habitant> resp = temp.exchange(usersUrl, HttpMethod.GET, null,
//                new ParameterizedTypeReference<Habitant>() {
//                });
//        logger.info("Code response : " + resp.getStatusCode().toString() + " for verifyHabitant");
//        return resp.getBody();
//    }

}
