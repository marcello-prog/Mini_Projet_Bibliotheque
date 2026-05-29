import type { User } from '../entities/User'

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthRepository {
  // Inscription — crée un nouvel utilisateur
  register(payload: RegisterPayload): Promise<User>

  // Connexion — retourne l'utilisateur si identifiants valides
  login(payload: LoginPayload): Promise<User>

  // Vérifie si un email est déjà utilisé
  emailExists(email: string): Promise<boolean>
}

