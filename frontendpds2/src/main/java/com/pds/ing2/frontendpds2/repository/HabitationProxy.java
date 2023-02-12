package com.pds.ing2.frontendpds2.repository;

import com.pds.ing2.frontendpds2.CustomProperties;
import com.pds.ing2.frontendpds2.model.Habitation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class HabitationProxy {

    @Autowired
    private CustomProperties props;

    public Iterable<Habitation> getHomes() {
        String HomeUrl = props.getApiUrl() + "/Home/listHome";
        RestTemplate temp = new RestTemplate();
        ResponseEntity<Iterable<Habitation>> resp = temp.exchange(HomeUrl, HttpMethod.GET, null, new ParameterizedTypeReference<Iterable<Habitation>>() {});
        System.out.println("Code response : " + resp.getStatusCode().toString());
    return resp.getBody();
    }

    public Habitation getHome(int id){
        String HomeUrl = props.getApiUrl() + "/Home/getHome?id="+id;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<Habitation> resp = temp.exchange(HomeUrl, HttpMethod.GET, null, new ParameterizedTypeReference<Habitation>() {});
        System.out.println("Code response : " + resp.getStatusCode().toString());
        System.out.println("address from proxy "+resp.getBody().getAdress());
        return resp.getBody();
    }

//    public HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>> HomeInfo(){
//        String HomeUrl = props.getApiUrl() +"/Home/HomeInfo";
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>>> resp = temp.exchange(HomeUrl,HttpMethod.GET,null,new ParameterizedTypeReference<HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>>>(){});
//        System.out.println("Code response : " + resp.getStatusCode().toString());
//        return resp.getBody();
//    }
//
//
//    public void setThermos(int id, int thermos) {
//        String HomeUrl = props.getApiUrl() +"/Home/setThermos/" + id +"?thermos=" + thermos;
//        System.out.println(HomeUrl);
//        RestTemplate temp = new RestTemplate();
//        ResponseEntity<HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>>> resp = temp.exchange(HomeUrl,HttpMethod.POST,null,new ParameterizedTypeReference<HashMap<Integer, HashMap<String,Iterable<HeatingBepos>>>>(){});
//    }
}
