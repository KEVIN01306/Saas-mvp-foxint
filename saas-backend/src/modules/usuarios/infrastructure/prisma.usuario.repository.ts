import type { PrismaClient } from "@prisma/client";
import type { UsuarioRepository } from "../domain/usuario.repository.js";
import type { Usuario, UsuarioActualizar, UsuarioCrear, UsuarioObtenidoDetalle } from "../domain/usuario.entity.js";



export class PrismaUsuarioRepository implements UsuarioRepository {
    constructor(private readonly db: PrismaClient) { }

    async buscarPorId(
        id: Usuario["id"], 
        negocio_id: Usuario["negocio_id"]
    ): Promise<UsuarioObtenidoDetalle | null> {
        
        const usuario = await this.db.usuarios.findUnique({
            where: {id, negocio_id, activo: true},
            include: { negocios: {select: { id: true, nombre_comercial: true }}}
        })

        if (!usuario) return null

        return {
            id: usuario.id,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            rol: usuario.rol,
            verificado: usuario.verificado,
            negocio: {
                id: usuario.negocios.id,
                nombre_comercial: usuario.negocios.nombre_comercial
            }
        }
    }

    async buscarPorNegocio(
        negocio_id: Usuario["negocio_id"]
    ): Promise<UsuarioObtenidoDetalle[]> {
        
        const usuarios = await this.db.usuarios.findMany({
            where: { negocio_id, activo: true },
            include: { negocios: {select: { id: true, nombre_comercial: true }}}
        })

            return usuarios.map(usuario => ({
                id: usuario.id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                rol: usuario.rol,
                verificado: usuario.verificado,
                negocio: {
                    id: usuario.negocios.id,
                    nombre_comercial: usuario.negocios.nombre_comercial
                }
            }))
        
    }

    async crear(data: UsuarioCrear, negocio_id: Usuario["negocio_id"]): Promise<Usuario> {
        throw Error
    }

    async actualizar(id: Usuario["id"], negocio_id: Usuario["negocio_id"], data: UsuarioActualizar): Promise<Usuario> {
        throw Error
    }

    async eliminar(id: Usuario["id"], negocio_id: Usuario["negocio_id"]): Promise<void> {
        throw Error
    }

}