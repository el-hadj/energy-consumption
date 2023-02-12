package com.pds.ing2.frontendpds2.repository;

import com.pds.ing2.frontendpds2.CustomProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class MesureBeposProxy {

    @Autowired
    private CustomProperties props;

    public List<Map<String, String>> roomlistProxy(int id){
        String listUrl = props.getApiUrl() + "/room/all?id=" + id ;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<Map<String, String>>> resp = temp.exchange(listUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();
    }

    public List<String> equipementForeachRoom(int id, String roomName){
        String listEquipement = props.getApiUrl() + "/mesure/listEquipement?id=" + id +"&roomtype=" + roomName;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<String>> resp = temp.exchange(listEquipement, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<String>>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();
    }

    public int recupereValue(int id, String nomEquip){
        String recupereValue = props.getApiUrl() + "/mesure/mesureThermostat?id=" + id + "&nomEquip=" + nomEquip;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<Integer> resp = temp.exchange(recupereValue, HttpMethod.GET, null,
                new ParameterizedTypeReference<Integer>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();

    }

    /**
     *
     *
     *
     * rattrapage
     */

    public List<Map<String, String>> equipementList(int id){
        String listUrl = props.getApiUrl() + "mesure/equipementList?idEquip=" + id ;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<Map<String, String>>> resp = temp.exchange(listUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();
    }

    public List<Map<String, String>> infoProxy(int id, String date){
        String listUrl = props.getApiUrl() + "mesure/infoHeat?idEquip="+id+"&date="+date;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<Map<String, String>>> resp = temp.exchange(listUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();
    }

}
