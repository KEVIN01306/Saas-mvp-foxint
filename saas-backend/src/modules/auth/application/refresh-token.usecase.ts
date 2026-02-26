import type { AuthRepository } from "../domain/auth.repository.js";
import type JwtProvider from "../domain/jwt.provider.js";



export class RefreshTokenUseCase {
    
    constructor (
        private readonly authRepository: AuthRepository,
        private readonly jWTProvider: JwtProvider
    ) {}
}