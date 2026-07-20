package com.skillmatch.skillmatchweb.dto;

public class RecommandationDTO {
    private String titre;
    private String entreprise;
    private String domaine;
    private String ville;

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getEntreprise() { return entreprise; }
    public void setEntreprise(String entreprise) { this.entreprise = entreprise; }

    public String getDomaine() { return domaine; }
    public void setDomaine(String domaine) { this.domaine = domaine; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
}