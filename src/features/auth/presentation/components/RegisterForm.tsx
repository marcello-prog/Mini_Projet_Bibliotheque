// RegisterForm — Formulaire d'inscription
// Utilise React Hook Form + Zod pour la validation
// Appelle useAuth.register() au submit

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { registerSchema, type RegisterFormData } from '../../../auth/application/validator/Auth.validator'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'



export default function RegisterForm() {
    const { register: registerUser, login, isLoading, error, clearError } = useAuth()
    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })


    // État affichage mot de passe
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


const onSubmit = async (data: RegisterFormData) => {
  try {

    // Création du compte
    await registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })

    // Connexion automatique
    await login({
      email: data.email,
      password: data.password,
    })

    // Redirection accueil
    navigate('/books')

  } catch {
    // L'erreur est déjà dans le store Zustand
  }
}


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">


            {/* Erreur globale */}
            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                    {error}
                    <button
                        type="button"
                        onClick={clearError}
                        className="ml-2 font-bold pl-38"
                    >
                        ✕
                    </button>
                </div>
            )}


            {/* Nom complet */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Nom complet
                </label>
                <input
                    {...register('fullName')}
                    type="text"
                    placeholder="Jean Dupont"
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A2B]"
                />
                {errors.fullName && (
                    <span className="text-red-500 text-xs">{errors.fullName.message}</span>
                )}
            </div>


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
                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
            </div>


            {/* Mot de passe */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>

                <div className="relative">
                    <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="block w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A2B]"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                        aria-label={showConfirmPassword ? 'Afficher la confirmation' : 'Masquer la confirmation'}
                    >
                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>

                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>


            {/* Confirmation mot de passe */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>

                <div className="relative">
                    <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="block w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A2B]"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                        aria-label={showConfirmPassword ? 'Afficher la confirmation' : 'Masquer la confirmation'}
                    >
                        {showConfirmPassword ? <Eye size={16}/> : <EyeOff size={16} />}
                    </button>
                </div>

                {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
            </div>


            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-[#8B1A2B] text-white py-2 rounded font-medium hover:bg-[#6d1522] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Création en cours...' : 'Créer mon compte'}
            </button>
            


        </form>
    )
}