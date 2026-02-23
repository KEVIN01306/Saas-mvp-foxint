import type { Usuario, UsuarioCrear, UsuarioActualizar, UsuarioObtenidoDetalle, UsuarioSimple } from "./usuario.entity.js";


export interface UsuarioRepository {

    buscarPorId(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<UsuarioObtenidoDetalle | null>
    buscarPorTelefono(telefono: Usuario['telefono']): Promise<UsuarioObtenidoDetalle | null>
    buscarPorNegocio(negocio_id: Usuario['negocio_id']): Promise<UsuarioSimple[]>
    crear(data: UsuarioCrear, negocio_id: Usuario['negocio_id']): Promise<UsuarioSimple>
    actualizar(id: Usuario['id'], negocio_id: Usuario['negocio_id'], data: UsuarioActualizar): Promise<Usuario>
    eliminar(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<void>
}