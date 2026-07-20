# SkillMatch frontend

Small React + Vite frontend for the existing SkillMatch backend and model results.

## Run locally

Start the backend on port `8080`, then:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` when different URLs are needed:

```env
VITE_API_URL=http://localhost:8080
VITE_RESULTS_URL=/model-results.json
```

## Pages

- `/` — home
- `/offres` — backend offers
- `/recommandations` — model results
- `/entreprises` and `/entreprises/:id` — companies
- `/etudiants` — student profiles
- `/inscription` and `/connexion` — role-aware auth forms
- `/compte` — returned profile and demo session
- `/publier` — company offer form
- `/outils` — raw creation endpoints, development mode only

## Backend boundary

The frontend uses the backend as it currently exists. It does not modify backend logic or claim support for applications, saved offers, update/delete operations, or secure authenticated sessions.

Login responses are stored in `sessionStorage` only to demonstrate the returned profile. This is not production authentication because the backend does not return a token or session cookie.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Fonts

The supplied Magilio demo font is for local/personal evaluation only. Obtain the appropriate license before public or commercial deployment. Space Grotesk is used for functional interface text.

See [FRONTEND_PLAN.md](./FRONTEND_PLAN.md) for scope and endpoint coverage.
