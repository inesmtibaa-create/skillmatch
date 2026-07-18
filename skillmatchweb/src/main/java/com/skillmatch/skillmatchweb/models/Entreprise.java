package com.skillmatch.skillmatchweb.models;

import jakarta.persistence.*;

@Entity
@Table(name = "entreprises")
public class Entreprise extends Utilisateur {

    @Column(name = "nom_entreprise", nullable = false)
    private String nomEntreprise;

    private String secteur;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String logo;

    public Entreprise() {}

    public String getNomEntreprise() { return nomEntreprise; }
    public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }

    public String getSecteur() { return secteur; }
    public void setSecteur(String secteur) { this.secteur = secteur; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
}