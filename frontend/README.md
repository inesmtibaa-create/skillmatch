# SkillMatch frontend

Small React interface for displaying ranked results produced by the SkillMatch model.

## Scope

- One responsive results page
- No authentication, routing, dashboard, or backend logic
- Reads either a JSON array or an object containing `context` and `results`
- Displays a score only when the model output provides one

## Run locally

```bash
npm install
npm run dev
```

## Result format

The default file is `public/model-results.json`. Its minimal shape is:

```json
{
  "context": {
    "profile": "stage python data science",
    "city": "Tunis"
  },
  "results": [
    {
      "titre": "STAGE DATA SCIENTIST",
      "entreprise": "Carthage Analytics",
      "domaine": "Data",
      "ville": "Tunis"
    }
  ]
}
```

Set `VITE_RESULTS_URL` to another JSON URL when the model exposes one. The frontend does not calculate, reorder, or modify recommendations.

## Fonts

This personal-use frontend uses the supplied Magilio demo font and Space Grotesk files. Review the font licenses before any public or commercial deployment.
