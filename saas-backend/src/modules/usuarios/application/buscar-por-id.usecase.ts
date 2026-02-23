import AppError from "@shared/errors/AppError.js";
import type { UsuarioObtenidoDetalle } from "../domain/usuario.entity.js";
import type { UsuarioRepository } from "../domain/usuario.repository.js";


interface BuscarPorIdParams {
    id: string,
    negocio_id: string
}

interface BuscarPorIdRespuesta extends UsuarioObtenidoDetalle { }

export class BuscarPorIdUseCase {

    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async execute({ id, negocio_id }: BuscarPorIdParams): Promise<BuscarPorIdRespuesta> {

        const usuario = await this.usuarioRepository.buscarPorId(id, negocio_id)

        if (!usuario) throw new AppError('Usuario no encontrado', 'DATA_NOT_FOUND', 404)

        return {
            id: usuario.id,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            rol: usuario.rol,
            verificado: usuario.verificado,
            negocio: {
                id: usuario.negocio.id,
                nombre_comercial: usuario.negocio.nombre_comercial
            }
        }
    }
}