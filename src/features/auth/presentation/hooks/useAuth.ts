// useAuth — Zustand store AUTH
// Gère l'état de la session utilisateur
// Persisté dans localStorage pour survivre au rechargement

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../../domain/entities/User'
import { container } from '../../../../core/config/container'
import { RegisterUser } from '../../application/use-cases/RegisterUser'
import { LoginUser } from '../../application/use-cases/LoginUser'
import { LogoutUser } from '../../application/use-cases/LogoutUser'
import type { RegisterPayload, LoginPayload } from '../../domain/repositories/AuthRepository'

interface AuthState {
  // État
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  register: (payload: RegisterPayload) => Promise<void>
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      // État initial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Inscription
      register: async (payload) => {
        set({ isLoading: true, error: null })

        try {
          const useCase = container.resolve(RegisterUser)

          await useCase.execute(payload)

          set({
            isLoading: false,
          })

        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error
              ? err.message
              : 'Erreur inscription',
          })

          throw err
        }
      },

      // Connexion
      login: async (payload) => {
        set({ isLoading: true, error: null })
        try {
          const useCase = container.resolve(LoginUser)
          const user = await useCase.execute(payload)
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : 'Erreur connexion',
          })
          throw err
        }
      },

      // Déconnexion
      logout: () => {
        const useCase = container.resolve(LogoutUser)
        useCase.execute()
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })
      },

      // Réinitialise l'erreur
      clearError: () => set({ error: null }),
    }),
    {
      name: 'biblio_auth', // clé localStorage
      // On persiste seulement user et isAuthenticated
      // pas isLoading et error
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)