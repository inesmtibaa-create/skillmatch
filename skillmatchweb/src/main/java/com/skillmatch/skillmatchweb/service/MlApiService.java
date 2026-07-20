package com.skillmatch.skillmatchweb.service;

import com.skillmatch.skillmatchweb.dto.RecommandationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MlApiService {

    private static final String FLASK_URL = "http://localhost:5000/recommander";

    @Autowired
    private RestTemplate restTemplate;

    public List<RecommandationDTO> obtenirRecommandations(String profil, String ville) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("profil", profil);
        body.put("ville", ville);

        HttpEntity<Map<String, String>> requete = new HttpEntity<>(body, headers);

        try {
            RecommandationDTO[] reponse = restTemplate.postForObject(
                    FLASK_URL, requete, RecommandationDTO[].class
            );
            return reponse != null ? List.of(reponse) : List.of();
        } catch (Exception e) {
            return List.of();
        }
    }
}