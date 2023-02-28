package com.pds.ing2.frontendpds2.repository;

import com.pds.ing2.frontendpds2.CustomProperties;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProductionRepo {

    private final CustomProperties customProperties;

    public List<Map<String, String>> getProduction(){
        String listUrl = customProperties.getApiUrl() + "/production/prod";
        RestTemplate temp = new RestTemplate();
        ResponseEntity<List<Map<String, String>>> resp = temp.exchange(listUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Map<String, String>>>() {
                });
        System.out.println("Code response : " + resp.getStatusCode().toString());
        return resp.getBody();
    }
}
