package com.skillmatch.skillmatchweb.dto;

import java.util.List;

public class EtudiantDTO {
    private Long id;
    private String email;
    private String nom;
    private String niveauEtudes;
    private String domaineInteret;
    private List<String> competences;
    private String descriptionProfil;
    private Integer disponibiliteMois;
    private String villePreferee;

    public EtudiantDTO(com.skillmatch.skillmatchweb.models.Etudiant etudiant) {
        this.id = etudiant.getId();
        this.email = etudiant.getEmail();
        this.nom = etudiant.getNom();
        this.niveauEtudes = etudiant.getNiveauEtudes();
        this.domaineInteret = etudiant.getDomaineInteret();
        this.competences = etudiant.getCompetences();
        this.descriptionProfil = etudiant.getDescriptionProfil();
        this.disponibiliteMois = etudiant.getDisponibiliteMois();
        this.villePreferee = etudiant.getVillePreferee();
    }

    
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getNom() { return nom; }
    public String getNiveauEtudes() { return niveauEtudes; }
    public String getDomaineInteret() { return domaineInteret; }
    public List<String> getCompetences() { return competences; }
    public String getDescriptionProfil() { return descriptionProfil; }
    public Integer getDisponibiliteMois() { return disponibiliteMois; }
    public String getVillePreferee() { return villePreferee; }
}