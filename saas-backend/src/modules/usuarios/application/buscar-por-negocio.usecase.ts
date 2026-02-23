import type { UsuarioSimple } from "../domain/usuario.entity.js";
import type { UsuarioRepository } from "../domain/usuario.repository.js";


interface BuscarPorIdParams {
    negocio_id: string
}

interface BuscarPorNegocioRespuesta extends UsuarioSimple { }

export class BuscarPorNegocioUseCase {

    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async execute({ negocio_id }: BuscarPorIdParams): Promise<BuscarPorNegocioRespuesta[]> {

        const usuarios = await this.usuarioRepository.buscarPorNegocio(negocio_id)

        return usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            rol: usuario.rol,
        }))
    }
}