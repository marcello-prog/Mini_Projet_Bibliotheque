// Entité User — Cœur métier pur
// Ne dépend d'aucune librairie externe
// Définit ce qu'est un utilisateur dans notre domaine

export type UserRole = 'ADMIN' | 'READER'

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  role: UserRole
  createdAt: string // ISO string
}