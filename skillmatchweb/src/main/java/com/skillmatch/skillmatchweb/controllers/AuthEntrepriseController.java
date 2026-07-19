package com.skillmatch.skillmatchweb.controllers;
import com.skillmatch.skillmatchweb.dto.EntrepriseDTO;
import com.skillmatch.skillmatchweb.models.Entreprise;
import com.skillmatch.skillmatchweb.repositories.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.skillmatch.skillmatchweb.dto.LoginRequest;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthEntrepriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/inscription-entreprise")
    public ResponseEntity<?> inscriptionEntreprise(@RequestBody Entreprise entreprise) {
        if (entrepriseRepository.findByEmail(entreprise.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet email est déjà utilisé");
        }

        entreprise.setMotDePasse(passwordEncoder.encode(entreprise.getMotDePasse()));
        Entreprise sauvegarde = entrepriseRepository.save(entreprise);

        return ResponseEntity.ok(new EntrepriseDTO(sauvegarde));
    }

    @PostMapping("/connexion-entreprise")
    public ResponseEntity<?> connexionEntreprise(@RequestBody LoginRequest loginRequest) {
        return entrepriseRepository.findByEmail(loginRequest.getEmail())
                .filter(entreprise -> passwordEncoder.matches(loginRequest.getMotDePasse(), entreprise.getMotDePasse()))
                .<ResponseEntity<?>>map(entreprise -> ResponseEntity.ok(new EntrepriseDTO(entreprise)))
                .orElse(ResponseEntity.status(401).body("Email ou mot de passe incorrect"));
    }
}
