package com.skillmatch.skillmatchweb.controllers;

import com.skillmatch.skillmatchweb.dto.RecommandationDTO;
import com.skillmatch.skillmatchweb.models.Etudiant;
import com.skillmatch.skillmatchweb.repositories.EtudiantRepository;
import com.skillmatch.skillmatchweb.service.MlApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommandations")
@CrossOrigin(origins = "*")
public class RecommandationController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private MlApiService mlApiService;

    @GetMapping
    public ResponseEntity<?> getRecommandations(
            @RequestParam Long etudiantId,
            @RequestParam(defaultValue = "peu importe") String ville) {

        return etudiantRepository.findById(etudiantId)
                .map(etudiant -> {
                    String profil = construireProfil(etudiant);
                    List<RecommandationDTO> recommandations = mlApiService.obtenirRecommandations(profil, ville);
                    return ResponseEntity.ok(recommandations);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    private String construireProfil(Etudiant etudiant) {
        StringBuilder texte = new StringBuilder();
        if (etudiant.getDomaineInteret() != null) texte.append(etudiant.getDomaineInteret()).append(" ");
        if (etudiant.getDescriptionProfil() != null) texte.append(etudiant.getDescriptionProfil()).append(" ");
        if (etudiant.getCompetences() != null) texte.append(String.join(" ", etudiant.getCompetences()));
        return texte.toString().toLowerCase();
    }
}