package com.skillmatch.skillmatchweb.controllers;

import com.skillmatch.skillmatchweb.dto.OffreDTO;
import com.skillmatch.skillmatchweb.models.Offre;
import com.skillmatch.skillmatchweb.repositories.OffreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offres")
@CrossOrigin(origins = "*")
public class OffreController {

    @Autowired
    private OffreRepository offreRepository;
    @GetMapping
    public List<OffreDTO> getAllOffres() {
        return offreRepository.findAll()
            .stream()
            .map(OffreDTO::new)
            .toList();
    }

    // Ajouter une nouvelle offre (POST http://localhost:8080/api/offres)
    @PostMapping
    public Offre createOffre(@RequestBody Offre offre) {
        return offreRepository.save(offre);
    }
}