package com.skillmatch.skillmatchweb.dto;

public class EntrepriseDTO {
    private Long id;
    private String email;
    private String nom;
    private String secteurActivite;
    private String descriptionEntreprise;
    private String logo;

    public EntrepriseDTO(com.skillmatch.skillmatchweb.models.Entreprise entreprise) {
        this.id = entreprise.getId();
        this.email = entreprise.getEmail();
        this.nom = entreprise.getNomEntreprise();
        this.secteurActivite = entreprise.getSecteur();
        this.descriptionEntreprise =entreprise.getDescription();
        this.logo = entreprise.getLogo();
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getNom() { return nom; }
    public String getSecteurActivite() { return secteurActivite; }
    public String getDescriptionEntreprise() { return descriptionEntreprise; }
    public String getLogo() { return logo; }
}