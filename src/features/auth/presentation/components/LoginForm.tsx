import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  loginSchema,
  type LoginFormData,
} from '../../../auth/application/validator/Auth.validator'

import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  // Etat affichage mot de passe
  const [showPassword, setShowPassword] = useState(false)

  // Message venant du register
  const successMessage = location.state?.message as string | undefined

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })

      const user = useAuth.getState().user

      if (user?.role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else {
        navigate('/books')
      }
    } catch {
      // erreur gérée par Zustand
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {/* Message succès */}
      {successMessage && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
          {successMessage}
        </div>
      )}

      {/* Erreur globale */}
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
          {error}

          <button
            type="button"
            onClick={clearError}
            className="ml-2 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Adresse email
        </label>

        <input
          {...register('email')}
          type="email"
          placeholder="jean@email.com"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A2B]"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Mot de passe */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Mot de passe
        </label>

        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A2B]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </button>
        </div>

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#8B1A2B] text-white py-2 rounded font-medium hover:bg-[#6d1522] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </button>

    </form>
  )
}