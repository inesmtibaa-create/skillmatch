package com.skillmatch.skillmatchweb.dto;

public class OffreDTO {
    private Long id;
    private String titre;
    private String entreprise;
    private String description;
    private String ville;
    private String domaine;
    private String competences;
    private Integer dureeMois;
    private Boolean remunere;


    public OffreDTO(com.skillmatch.skillmatchweb.models.Offre offre) {
        this.id = offre.getId();
        this.titre = offre.getTitre();
        this.entreprise = offre.getEntreprise().getNomEntreprise();
        this.description = offre.getDescription();
        this.ville = offre.getVille();
        this.domaine = offre.getDomaine();
        this.competences = String.join(", ", offre.getCompetences());
        this.dureeMois = offre.getDureeMois();
        this.remunere = offre.getRemunere();
    }

    public Long getId() { return id; }
    public String getTitre() { return titre; }
    public String getEntreprise() { return entreprise; }
    public String getDescription() { return description; }
    public String getVille() { return ville; }
    public String getDomaine() { return domaine; }
    public String getCompetences() { return competences; }
    public Integer getDureeMois() { return dureeMois; }
    public Boolean getRemunere() { return remunere; }

        
    }


