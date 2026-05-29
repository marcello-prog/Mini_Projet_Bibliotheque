// Container DI — tsyringe
// C'est ici que tsyringe sait quelle implémentation
// utiliser quand un use case demande un repository

import { container } from 'tsyringe'
import { FakeAuthRepository } from '../../features/auth/infrastructure/repositories/FakeAuthRepository'

// AUTH
// Quand un use case demande 'AuthRepository'
// tsyringe lui donne FakeAuthRepository
container.registerSingleton('AuthRepository', FakeAuthRepository)

export { container }