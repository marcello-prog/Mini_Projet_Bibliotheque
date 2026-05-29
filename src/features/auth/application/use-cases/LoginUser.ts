import { inject, injectable } from 'tsyringe'
import type { AuthRepository, LoginPayload } from '../../domain/repositories/AuthRepository'
import type { User } from '../../domain/entities/User'

@injectable()
export class LoginUser {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthRepository
  ) {}

  async execute(payload: LoginPayload): Promise<User> {
    return this.authRepository.login(payload)
  }
}