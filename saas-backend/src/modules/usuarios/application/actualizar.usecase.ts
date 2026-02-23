import type { UsuarioRepository } from "../domain/usuario.repository.js";


export class ActualizarUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async execute() { }
}