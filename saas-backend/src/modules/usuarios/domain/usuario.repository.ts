import type { Pagination } from "@shared/domain/pagination.js";
import type { Usuario, UsuarioCrear, UsuarioActualizar, UsuarioObtenidoDetalle, UsuarioSimple } from "./usuario.entity.js";
import type { Paginated } from "@shared/domain/paginated.js";


export interface UsuarioRepository {

    buscarPorId(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<UsuarioObtenidoDetalle | null>
    buscarPorTelefono(telefono: Usuario['telefono']): Promise<UsuarioObtenidoDetalle | null>
    buscarPorNegocio(negocio_id: Usuario['negocio_id'], pagination: Pagination): Promise<Paginated<UsuarioSimple>>
    crear(data: UsuarioCrear, negocio_id: Usuario['negocio_id']): Promise<UsuarioSimple>
    actualizar(id: Usuario['id'], negocio_id: Usuario['negocio_id'], data: UsuarioActualizar): Promise<UsuarioSimple>
    eliminar(id: Usuario['id'], negocio_id: Usuario['negocio_id']): Promise<void>
}