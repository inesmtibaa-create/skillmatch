package com.skillmatch.skillmatchweb.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "etudiants")
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(name = "niveau_etudes")
    private String niveauEtudes;

    @Column(name = "domaine_interet")
    private String domaineInteret;

    // Représente les compétences (ex: Java, Python, SQL)
    // Nous utilisons ElementCollection pour stocker une liste simple de textes
    @ElementCollection
    @CollectionTable(name = "etudiant_competences", joinColumns = @JoinColumn(name = "etudiant_id"))
    @Column(name = "competence")
    private List<String> competences;

    @Column(name = "description_profil", columnDefinition = "TEXT")
    private String descriptionProfil;

    @Column(name = "disponibilite_mois")
    private Integer disponibiliteMois; // Ex: 3 pour 3 mois, ou le mois de début (ex: 6 pour Juin)

    @Column(name = "ville_preferee")
    private String villePreferee;

    // Constructeur par défaut (obligatoire pour JPA)
    public Etudiant() {
    }

    // Constructeur complet
    public Etudiant(String nom, String niveauEtudes, String domaineInteret, List<String> competences, String descriptionProfil, Integer disponibiliteMois, String villePreferee) {
        this.nom = nom;
        this.niveauEtudes = niveauEtudes;
        this.domaineInteret = domaineInteret;
        this.competences = competences;
        this.descriptionProfil = descriptionProfil;
        this.disponibiliteMois = disponibiliteMois;
        this.villePreferee = villePreferee;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNiveauEtudes() {
        return niveauEtudes;
    }

    public void setNiveauEtudes(String niveauEtudes) {
        this.niveauEtudes = niveauEtudes;
    }

    public String getDomaineInteret() {
        return domaineInteret;
    }

    public void setDomaineInteret(String domaineInteret) {
        this.domaineInteret = domaineInteret;
    }

    public List<String> getCompetences() {
        return competences;
    }

    public void setCompetences(List<String> competences) {
        this.competences = competences;
    }

    public String getDescriptionProfil() {
        return descriptionProfil;
    }

    public void setDescriptionProfil(String descriptionProfil) {
        this.descriptionProfil = descriptionProfil;
    }

    public Integer getDisponibiliteMois() {
        return disponibiliteMois;
    }

    public void setDisponibiliteMois(Integer disponibiliteMois) {
        this.disponibiliteMois = disponibiliteMois;
    }

    public String getVillePreferee() {
        return villePreferee;
    }

    public void setVillePreferee(String villePreferee) {
        this.villePreferee = villePreferee;
    }
}