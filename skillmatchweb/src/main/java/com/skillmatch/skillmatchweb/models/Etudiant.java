package com.skillmatch.skillmatchweb.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "etudiants")
public class Etudiant extends Utilisateur {

    @Column(nullable = false)
    private String nom;

    @Column(name = "niveau_etudes")
    private String niveauEtudes;

    @Column(name = "domaine_interet")
    private String domaineInteret;

    @ElementCollection
    @CollectionTable(name = "etudiant_competences", joinColumns = @JoinColumn(name = "etudiant_id"))
    @Column(name = "competence")
    private List<String> competences;

    @Column(name = "description_profil", columnDefinition = "TEXT")
    private String descriptionProfil;

    @Column(name = "disponibilite_mois")
    private Integer disponibiliteMois;

    @Column(name = "ville_preferee")
    private String villePreferee;

    public Etudiant() {
    }

    public Etudiant(String nom, String niveauEtudes, String domaineInteret, List<String> competences, String descriptionProfil, Integer disponibiliteMois, String villePreferee) {
        this.nom = nom;
        this.niveauEtudes = niveauEtudes;
        this.domaineInteret = domaineInteret;
        this.competences = competences;
        this.descriptionProfil = descriptionProfil;
        this.disponibiliteMois = disponibiliteMois;
        this.villePreferee = villePreferee;
    }


    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getNiveauEtudes() { return niveauEtudes; }
    public void setNiveauEtudes(String niveauEtudes) { this.niveauEtudes = niveauEtudes; }

    public String getDomaineInteret() { return domaineInteret; }
    public void setDomaineInteret(String domaineInteret) { this.domaineInteret = domaineInteret; }

    public List<String> getCompetences() { return competences; }
    public void setCompetences(List<String> competences) { this.competences = competences; }

    public String getDescriptionProfil() { return descriptionProfil; }
    public void setDescriptionProfil(String descriptionProfil) { this.descriptionProfil = descriptionProfil; }

    public Integer getDisponibiliteMois() { return disponibiliteMois; }
    public void setDisponibiliteMois(Integer disponibiliteMois) { this.disponibiliteMois = disponibiliteMois; }

    public String getVillePreferee() { return villePreferee; }
    public void setVillePreferee(String villePreferee) { this.villePreferee = villePreferee; }
}