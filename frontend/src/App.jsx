import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccountProvider } from './context/AccountContext.jsx'
import { Layout } from './components/Layout.jsx'
import { AccountPage } from './pages/AccountPage.jsx'
import { CompaniesPage } from './pages/CompaniesPage.jsx'
import { CompanyPage } from './pages/CompanyPage.jsx'
import { DevToolsPage } from './pages/DevToolsPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { OffersPage } from './pages/OffersPage.jsx'
import { PublishOfferPage } from './pages/PublishOfferPage.jsx'
import { RecommendationsPage } from './pages/RecommendationsPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { StudentsPage } from './pages/StudentsPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="offres" element={<OffersPage />} />
            <Route path="recommandations" element={<RecommendationsPage />} />
            <Route path="entreprises" element={<CompaniesPage />} />
            <Route path="entreprises/:companyId" element={<CompanyPage />} />
            <Route path="etudiants" element={<StudentsPage />} />
            <Route path="publier" element={<PublishOfferPage />} />
            <Route path="inscription" element={<RegisterPage />} />
            <Route path="connexion" element={<LoginPage />} />
            <Route path="compte" element={<AccountPage />} />
            <Route
              path="outils"
              element={import.meta.env.DEV ? <DevToolsPage /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  )
}
