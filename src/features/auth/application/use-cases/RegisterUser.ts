import { inject, injectable } from 'tsyringe'
import type { AuthRepository, RegisterPayload } from '../../domain/repositories/AuthRepository'
import type { User } from '../../domain/entities/User'

@injectable()
export class RegisterUser {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthRepository
  ) {}

  async execute(payload: RegisterPayload): Promise<User> {
    const emailTaken = await this.authRepository.emailExists(payload.email)
    if (emailTaken) {
      throw new Error('Cet email est déjà associé à un compte')
    }

    return this.authRepository.register(payload)
  }
}