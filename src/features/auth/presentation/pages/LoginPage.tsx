import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* ── Panneau gauche — Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8B1A2B] flex-col justify-between p-12">

        <div>
          <h1 className="text-white text-3xl font-bold">
            BiblioManager
          </h1>

          <p className="text-[#F3E4A8] mt-2 text-sm">
            Gestion de Bibliothèque Numérique
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-white/80 text-sm leading-relaxed">
            Retrouvez vos livres favoris, gérez vos emprunts
            et accédez à votre espace personnel rapidement.
          </p>

          <div className="flex flex-col gap-2 text-white/60 text-xs">
            <span>✓ Catalogue disponible 24h/24</span>
            <span>✓ Gestion simplifiée des emprunts</span>
            <span>✓ Expérience rapide et sécurisée</span>
          </div>
        </div>

        <div>
          <p className="text-white/60 text-sm">
            Nouveau sur la plateforme ?
          </p>

          <Link
            to="/register"
            className="inline-block mt-2 border border-white/40 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition-colors"
          >
            Créer un compte
          </Link>
        </div>

      </div>

      {/* ── Panneau droit — Formulaire ── */}
      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#8B1A2B]">
              BiblioManager
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Connexion
          </h2>

          <p className="text-gray-500 text-sm mb-8">
            Connectez-vous pour accéder à votre espace
          </p>

          <LoginForm />

          {/* Lien mobile */}
          <p className="lg:hidden text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}

            <Link
              to="/register"
              className="text-[#8B1A2B] font-medium hover:underline"
            >
              Créer un compte
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}