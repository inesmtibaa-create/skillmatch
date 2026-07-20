# Simple Frontend Plan

## Hard rules

- All frontend work stays on the `frontend` Git branch.
- All implementation changes stay inside `frontend/`.
- Do not modify Java, Python, database, Maven, or backend configuration files.
- Do not change backend request or response formats.
- If a frontend feature needs a backend change, stop and ask for approval first.
- Keep the existing React + Vite setup and the supplied visual identity.
- Prefer plain React, `fetch`, and CSS. Do not add Redux or a large UI framework.

## Goal

Turn the current recommendation viewer into a small, clean website that demonstrates every feature already delivered by the backend:

1. Student registration and login
2. Company registration and login
3. Student directory
4. Company directory and company details
5. Offer listing
6. Offer publication
7. Model recommendation results

Features without a backend endpoint—applications, saved offers, profile editing, offer editing/deletion, dashboards, and live recommendations—will not be presented as functional.

## Simple page structure

| Page | Purpose |
| --- | --- |
| Home | Explain SkillMatch and link to offers, recommendations, registration, and login. |
| Offers | Display all offers returned by the backend. |
| Recommendations | Keep and reuse the existing model-results viewer. |
| Companies | Display companies and open a company detail view. |
| Students | Display a simple student talent directory. |
| Publish an offer | Let a company submit an offer using its company ID. |
| Register | One clean page with Student and Company tabs. |
| Login | One clean page with a role selector because the backend has separate login routes. |
| Account | Display the profile returned by the selected login endpoint. This is a demo session, not secure authentication. |
| Development tools | Development-only forms for the two raw creation endpoints so every backend endpoint is covered without exposing duplicate signup flows in public navigation. |

Navigation will remain small:

```text
SkillMatch | Offers | Recommendations | Companies | Students | Login
```

The account menu will add “Publish an offer” for a company profile.

## API endpoint coverage

The frontend will use the backend exactly as it exists.

| Backend endpoint | Frontend feature |
| --- | --- |
| `GET /api/offres` | Offers page and offer cards. |
| `POST /api/offres` | Publish-offer form. The request includes `{ entreprise: { id } }` as expected by the backend. |
| `GET /api/entreprises` | Company directory and company selector in development tools. |
| `GET /api/entreprises/{id}` | Company detail view. |
| `POST /api/entreprises` | Development-only raw company creation form. Public company signup uses the auth endpoint instead. |
| `GET /api/etudiants` | Student directory. The frontend only maps and renders non-sensitive profile fields. |
| `POST /api/etudiants` | Development-only raw student creation form. Public student signup uses the auth endpoint instead. |
| `POST /api/auth/inscription-etudiant` | Student registration form. |
| `POST /api/auth/connexion-etudiant` | Student login option. |
| `POST /api/auth/inscription-entreprise` | Company registration form. |
| `POST /api/auth/connexion-entreprise` | Company login option. |

The existing recommendation screen continues to read `VITE_RESULTS_URL` or `public/model-results.json` because the backend does not currently expose a recommendation endpoint.

## Important backend limitations the frontend will respect

- Login returns a profile, not a token or server session. The frontend can only provide a clearly labeled demo session stored in `sessionStorage`.
- The backend has two login endpoints, so the login screen must ask for the role instead of pretending to detect it automatically.
- There is no offer-detail endpoint. Offer details can only use an item already loaded from `GET /api/offres`.
- There are no application, saved-offer, update, or delete endpoints. Corresponding buttons will not be shown as functional.
- There is no live recommendation endpoint. The existing JSON result viewer remains a model demonstration.
- Raw student/company list responses may contain extra fields. The UI will whitelist the fields it displays and will never render or log password data.
- If any current endpoint fails because of a backend implementation issue, frontend work stops at that integration point and the issue is reported. The backend will not be edited automatically.

## Minimal frontend structure

```text
frontend/src/
├── api/
│   ├── client.js
│   ├── auth.js
│   ├── companies.js
│   ├── offers.js
│   └── students.js
├── components/
│   ├── Header.jsx
│   ├── LoadingState.jsx
│   ├── ErrorState.jsx
│   ├── EmptyState.jsx
│   ├── OfferCard.jsx
│   └── FormField.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── OffersPage.jsx
│   ├── RecommendationsPage.jsx
│   ├── CompaniesPage.jsx
│   ├── CompanyPage.jsx
│   ├── StudentsPage.jsx
│   ├── PublishOfferPage.jsx
│   ├── RegisterPage.jsx
│   ├── LoginPage.jsx
│   ├── AccountPage.jsx
│   └── DevToolsPage.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

One small API client will centralize `VITE_API_URL`, JSON parsing, and readable error messages. Pages will own their own loading, success, empty, and error state. Shared state will be limited to the demo account profile.

## Visual direction

- Keep the exact supplied palette.
- Use Magilio for the logo and main headings.
- Use Space Grotesk for navigation, body text, forms, cards, and buttons.
- Use one-column mobile layouts and simple two- or three-column desktop card grids.
- Use clear borders, generous spacing, and restrained hover states.
- Keep the current recommendation-card style and reuse it for offer cards.
- Avoid complex charts, glassmorphism, heavy gradients, large animations, and decorative dashboard widgets.
- Continue using the supplied Magilio demo only for local development; it must not be shipped publicly without the appropriate license.

## Delivery order

### Phase 1 — Foundation

- Add simple routing.
- Add the shared header and page container.
- Add the central API client using `VITE_API_URL`.
- Split the existing recommendation screen into its own page.

**Done when:** Home, Offers, Recommendations, Companies, Students, Register, and Login routes load without changing the backend.

### Phase 2 — Read-only backend features

- Connect `GET /api/offres`.
- Connect `GET /api/entreprises` and `GET /api/entreprises/{id}`.
- Connect `GET /api/etudiants`.
- Add loading, empty, retry, and simple responsive states.

**Done when:** every backend read endpoint has a clean frontend view and extra response fields are not displayed.

### Phase 3 — Registration and login

- Connect both registration endpoints.
- Connect both login endpoints through one role-aware form.
- Store only the returned safe profile fields in `sessionStorage`.
- Add Account and Logout behavior.

**Done when:** both roles can register, log in, view the returned profile, and clear the demo session.

### Phase 4 — Creation features

- Connect `POST /api/offres` for company users.
- Add development-only raw student/company creation forms for complete endpoint coverage.
- Validate required fields in the browser and show backend errors without changing their format.

**Done when:** every POST endpoint can be exercised from an appropriate frontend form without backend edits.

### Phase 5 — Cleanup and verification

- Test desktop and mobile layouts.
- Test keyboard navigation and visible focus.
- Test loading, empty, invalid form, 401, 404, and server-error states.
- Run the production frontend build.
- Verify that Git changes are limited to `frontend/` on the `frontend` branch.

**Done when:** the frontend builds cleanly, uses every current endpoint, and makes no claim that unsupported backend features work.

## Approval gates

Ask before proceeding if any of these becomes necessary:

- Editing any file outside `frontend/`
- Changing an endpoint, DTO, entity, CORS rule, or authentication behavior
- Adding a missing backend route
- Fixing a backend compile/runtime error
- Adding a new production dependency beyond the small router needed for page navigation

This plan deliberately favors a small working frontend over a large speculative application.
