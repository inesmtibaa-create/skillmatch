package com.skillmatch.skillmatchweb.controllers;

import com.skillmatch.skillmatchweb.models.Etudiant;
import com.skillmatch.skillmatchweb.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
@CrossOrigin(origins = "*") 
public class EtudiantController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    // 1. Récupérer la liste de tous les étudiants (GET http://localhost:8080/api/etudiants)
    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }

    // 2. Ajouter un nouvel étudiant (POST http://localhost:8080/api/etudiants)
    @PostMapping
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }
}