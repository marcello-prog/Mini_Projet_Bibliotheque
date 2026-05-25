// # Configuration tsyringe



// Container DI — tsyringe
// C'est ici que tsyringe sait quelle implémentation
// utiliser quand un use case demande un repository

import { container } from 'tsyringe'

// On enregistrera les repositories ici au fur et à mesure
// Exemple futur :
// container.registerSingleton<AuthRepository>(
//   'AuthRepository',
//   FakeAuthRepository
// )

export { container }