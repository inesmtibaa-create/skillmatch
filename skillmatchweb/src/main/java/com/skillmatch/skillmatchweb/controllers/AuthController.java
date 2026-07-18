package com.skillmatch.skillmatchweb.controllers;
import com.skillmatch.skillmatchweb.dto.EtudiantDTO;
import com.skillmatch.skillmatchweb.models.Etudiant;
import com.skillmatch.skillmatchweb.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.skillmatch.skillmatchweb.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/inscription-etudiant")
    public ResponseEntity<?> inscriptionEtudiant(@RequestBody Etudiant etudiant) {
        if (etudiantRepository.findByEmail(etudiant.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet email est déjà utilisé");
        }

        etudiant.setMotDePasse(passwordEncoder.encode(etudiant.getMotDePasse()));
        Etudiant sauvegarde = etudiantRepository.save(etudiant);

        return ResponseEntity.ok(new EtudiantDTO(sauvegarde));
    }

    @PostMapping("/connexion-etudiant")
    public ResponseEntity<?> connexionEtudiant(@RequestBody LoginRequest loginRequest) {
        return etudiantRepository.findByEmail(loginRequest.getEmail())
                .filter(etudiant -> passwordEncoder.matches(loginRequest.getMotDePasse(), etudiant.getMotDePasse()))
                .<ResponseEntity<?>>map(etudiant -> ResponseEntity.ok(new EtudiantDTO(etudiant)))
                .orElse(ResponseEntity.status(401).body("Email ou mot de passe incorrect"));
    }

}