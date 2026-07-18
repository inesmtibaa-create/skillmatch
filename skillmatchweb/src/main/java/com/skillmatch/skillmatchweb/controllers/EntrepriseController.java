package com.skillmatch.skillmatchweb.controllers;

import com.skillmatch.skillmatchweb.models.Entreprise;
import com.skillmatch.skillmatchweb.repositories.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entreprises")
@CrossOrigin(origins = "*")
public class EntrepriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    // GET http://localhost:8080/api/entreprises
    @GetMapping
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    // GET http://localhost:8080/api/entreprises/3
    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        return entrepriseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST http://localhost:8080/api/entreprises
    @PostMapping
    public Entreprise createEntreprise(@RequestBody Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }
}