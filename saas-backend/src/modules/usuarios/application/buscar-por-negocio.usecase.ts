import type { UsuarioObtenidoDetalle } from "../domain/usuario.entity.js";
import type { UsuarioRepository } from "../domain/usuario.repository.js";


interface BuscarPorIdParams {
    negocio_id: string
}

interface BuscarPorNegocioRespuesta extends UsuarioObtenidoDetalle {}

export class BuscarPorNegocioUseCase {

    constructor (
        private readonly usuarioRepository: UsuarioRepository
    ) {}

    async execute({negocio_id}: BuscarPorIdParams ): Promise<BuscarPorNegocioRespuesta[]> {

        const usuarios = await this.usuarioRepository.buscarPorNegocio(negocio_id)

        return usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            rol: usuario.rol,
            verificado: usuario.verificado,
            negocio: {
                id: usuario.negocio.id,
                nombre_comercial: usuario.negocio.nombre_comercial
            }
        }))
    }
}