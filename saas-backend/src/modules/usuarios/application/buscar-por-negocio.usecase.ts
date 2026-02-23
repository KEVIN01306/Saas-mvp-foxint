import type { UsuarioSimple } from "../domain/usuario.entity.js";
import type { UsuarioRepository } from "../domain/usuario.repository.js";


interface BuscarPorIdParams {
    negocio_id: string
    page: number
    perPage: number
}

interface BuscarPorNegocioRespuesta extends UsuarioSimple { }

export class BuscarPorNegocioUseCase {

    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async execute({ negocio_id, page, perPage }: BuscarPorIdParams): Promise<{ total: number, usuarios: BuscarPorNegocioRespuesta[] }> {

        const { total, data } = await this.usuarioRepository.buscarPorNegocio(negocio_id, { page, perPage })

        return {
            total, usuarios: data.map(usuario => ({
                id: usuario.id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                rol: usuario.rol,
            }))
        }
    }
}