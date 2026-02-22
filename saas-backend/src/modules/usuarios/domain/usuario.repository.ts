import type { Usuario, UsuarioCrear, UsuarioActualizar, UsuarioObtenidoDetalle } from "./usuario.entity.js";


export interface UsuarioRepository {

    buscarPorId(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<UsuarioObtenidoDetalle | null>
    buscarPorNegocio(negocio_id: Usuario['negocio_id']): Promise<UsuarioObtenidoDetalle[]>
    crear(data: UsuarioCrear, negocio_id: Usuario['negocio_id']): Promise<Usuario>
    actualizar(id: Usuario['id'], negocio_id: Usuario['negocio_id'], data: UsuarioActualizar): Promise<Usuario>
    eliminar(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<void>
}