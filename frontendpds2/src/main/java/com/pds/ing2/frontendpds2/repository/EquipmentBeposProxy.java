package com.pds.ing2.frontendpds2.repository;

import com.pds.ing2.frontendpds2.CustomProperties;
import com.pds.ing2.frontendpds2.dto.EquipmentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class EquipmentBeposProxy {

    @Autowired
    private CustomProperties props;

    public List<EquipmentDto> getAllEquipmentByRoomId(Integer id) {
        String url = props.getApiUrl() + "/equipmentBepos/equipmentByRoom/" + id;
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<EquipmentDto>> resp = temp.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {
        });
        return resp.getBody();
    }
}
