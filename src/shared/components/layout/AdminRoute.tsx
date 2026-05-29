// AdminRoute — Protège les routes admin
// Si l'utilisateur n'est pas ADMIN → redirect /books

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/presentation/hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export default function AdminRoute({ children }: Props) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/books" replace />
  }

  return <>{children}</>
}