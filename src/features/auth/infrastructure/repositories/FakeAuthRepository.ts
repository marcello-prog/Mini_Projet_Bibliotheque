
import { injectable } from 'tsyringe'
import type { AuthRepository, LoginPayload, RegisterPayload } from '../../domain/repositories/AuthRepository'
import type { User } from '../../domain/entities/User'
import { generateId } from '../../../../shared/utils/uuid'
import { StorageService } from '../../../../shared/utils/storage'

const USERS_KEY = 'bilio_users'

@injectable()
export class FakeAuthRepository implements AuthRepository {

  // Récupère tous les utilisateurs depuis localStorage
  private getUsers(): User[] {
    return StorageService.get<User[]>(USERS_KEY) ?? []
  }

  // Sauvegarde la liste des utilisateurs dans localStorage
  private saveUsers(users: User[]): void {
    StorageService.set(USERS_KEY, users)
  }

  async register(payload: RegisterPayload): Promise<User> {
    const users = this.getUsers()

    // Vérification email unique
    const exists = users.find(u => u.email === payload.email)
    if (exists) {
      throw new Error('Cet email est déjà associé à un compte')
    }

    // Création du nouvel utilisateur
    const newUser: User = {
      id: generateId(),
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password, // simulé — pas de hash en fake
      role: 'READER', // rôle par défaut
      createdAt: new Date().toISOString(),
    }

    // Sauvegarde
    this.saveUsers([...users, newUser])

    return newUser
  }

  async login(payload: LoginPayload): Promise<User> {
    const users = this.getUsers()

    // Recherche par email + mot de passe
    const user = users.find(
      u => u.email === payload.email && u.password === payload.password
    )

    if (!user) {
      throw new Error('Email ou mot de passe incorrect')
    }

    return user
  }

  async emailExists(email: string): Promise<boolean> {
    const users = this.getUsers()
    return users.some(u => u.email === email)
  }
}