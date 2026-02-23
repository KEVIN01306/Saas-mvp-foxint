import AppError from "../../../errors/AppError.js";
import type { Usuario, UsuarioCrear, UsuarioSimple } from "../domain/usuario.entity.js";
import type { UsuarioRepository } from "../domain/usuario.repository.js";


export class CrearUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async execute(data: UsuarioCrear, negocio_id: Usuario["negocio_id"]): Promise<UsuarioSimple> {

        const usuarioExistente = await this.usuarioRepository.buscarPorTelefono(data.telefono)
        if (usuarioExistente) throw new AppError('El usuario ya existe', 'DATA_ALREADY_EXISTS', 409)


        const usuario = {
            ...data,
            activo: true,
            verificado: false
        }

        const usuarioNuevo = await this.usuarioRepository.crear(usuario, negocio_id)

        return usuarioNuevo
    }
}