// RegisterPage — Page d'inscription
// Layout deux colonnes : panneau gauche (branding) + formulaire droite

import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">

      {/* ── Panneau gauche — Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8B1A2B] flex-col justify-between p-12">
        <div>
          <h1 className="text-white text-3xl font-bold">BiblioManager</h1>
          <p className="text-[#F3E4A8] mt-2 text-sm">
            Gestion de Bibliothèque Numérique
          </p>
        </div>


        <div className="space-y-4">
          <p className="text-white/80 text-sm leading-relaxed">
            Accédez à des milliers d'ouvrages, gérez vos emprunts
            et suivez vos lectures en toute simplicité.
          </p>
          <div className="flex flex-col gap-2 text-white/60 text-xs">
            <span>✓ Catalogue complet en temps réel</span>
            <span>✓ Suivi des emprunts personnalisé</span>
            <span>✓ Disponible hors ligne</span>
          </div>
        </div>


        <div>
          <p className="text-white/60 text-sm">
            Déjà un compte ?
          </p>
          <Link
            to="/login"
            className="inline-block mt-2 border border-white/40 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>


      {/* ── Panneau droit — Formulaire ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Logo mobile uniquement */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#8B1A2B]">BiblioManager</h1>
          </div>


          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Créer un compte
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Remplissez le formulaire pour vous inscrire
          </p>


          <RegisterForm />


          {/* Lien mobile uniquement */}
          <p className="lg:hidden text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#8B1A2B] font-medium hover:underline">
              Se connecter
            </Link>
          </p>


          {/* Lien vers CGU/Confidentialité (optionnel) */}
          <p className="text-center text-xs text-gray-400 mt-8">
            En t'inscrivant, tu acceptes nos{' '}
            <Link to="/terms" className="text-[#8B1A2B] hover:underline">
              Conditions d'utilisation
            </Link>
            {' '}et notre{' '}
            <Link to="/privacy" className="text-[#8B1A2B] hover:underline">
              Politique de confidentialité
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}