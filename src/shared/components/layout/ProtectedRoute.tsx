// ProtectedRoute — Protège les routes privées
// Si l'utilisateur n'est pas connecté → redirect /login

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/presentation/hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}