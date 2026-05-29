// Navbar — Barre de navigation partagée
// Affiche les liens selon le rôle
// Contient le bouton de déconnexion (US-004)

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/presentation/hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Initiales pour l'avatar
  const initials = user?.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  return (
    <nav className="bg-[#8B1A2B] text-white px-6 py-3 flex items-center justify-between">

      {/* Logo */}
      <Link to="/books" className="font-bold text-lg tracking-tight">
        BiblioManager
      </Link>

      {/* Liens navigation */}
      <div className="flex items-center gap-6">
        <Link
          to="/books"
          className="text-sm hover:text-[#F3E4A8] transition-colors"
        >
          Livres
        </Link>
        <Link
          to="/loans"
          className="text-sm hover:text-[#F3E4A8] transition-colors"
        >
          Mes Emprunts
        </Link>
        <Link
          to="/profile"
          className="text-sm hover:text-[#F3E4A8] transition-colors"
        >
          Profil
        </Link>

        {/* Lien admin — visible uniquement pour ADMIN */}
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/dashboard"
            className="text-sm hover:text-[#F3E4A8] transition-colors"
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Avatar + Déconnexion */}
      <div className="flex items-center gap-3">
        {/* Avatar initiales */}
        <div className="w-8 h-8 rounded-full bg-[#F3E4A8] text-[#8B1A2B] flex items-center justify-center text-xs font-bold">
          {initials}
        </div>

        <span className="text-sm text-white/80">
          {user?.fullName}
        </span>

        {/* Bouton déconnexion — US-004 */}
        <button
          onClick={handleLogout}
          className="text-sm border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors"
        >
          Déconnexion
        </button>
      </div>

    </nav>
  )
}