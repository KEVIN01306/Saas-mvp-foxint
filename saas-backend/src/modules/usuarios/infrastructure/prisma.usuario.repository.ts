import type { PrismaClient } from "@prisma/client";
import type { UsuarioRepository } from "../domain/usuario.repository.js";
import type { Usuario, UsuarioActualizar, UsuarioCrear, UsuarioObtenidoDetalle, UsuarioSimple } from "../domain/usuario.entity.js";
import { UsuarioMapper } from "./mappers/usuario.mapper.js";


export class PrismaUsuarioRepository implements UsuarioRepository {
    constructor(private readonly db: PrismaClient) { }

    async buscarPorId(
        id: Usuario["id"],
        negocio_id: Usuario["negocio_id"]
    ): Promise<UsuarioObtenidoDetalle | null> {

        const usuario = await this.db.usuarios.findUnique({
            where: { id, negocio_id, activo: true },
            include: { negocios: { select: { id: true, nombre_comercial: true } } }
        })

        if (!usuario) return null

        return UsuarioMapper.mapDetalle(usuario)
    }


    async buscarPorTelefono(
        telefono: Usuario["telefono"],
    ): Promise<UsuarioObtenidoDetalle | null> {

        const usuario = await this.db.usuarios.findUnique({
            where: { telefono, activo: true },
            include: { negocios: { select: { id: true, nombre_comercial: true } } }
        })

        if (!usuario) return null

        return UsuarioMapper.mapDetalle(usuario)

    }


    async buscarPorNegocio(
        negocio_id: Usuario["negocio_id"]
    ): Promise<UsuarioSimple[]> {

        const usuarios = await this.db.usuarios.findMany({
            where: { negocio_id, activo: true },
            include: { negocios: { select: { id: true, nombre_comercial: true } } }
        })

        return usuarios.map(usuario => (
            UsuarioMapper.mapSimple(usuario)
        ))

    }

    async crear(data: UsuarioCrear, negocio_id: Usuario["negocio_id"]): Promise<UsuarioSimple> {

        const usuario = await this.db.usuarios.create({
            data: {
                ...data,
                negocio_id,
                rol: UsuarioMapper.mapRolBaseDatos(data.rol)
            }
        })

        return UsuarioMapper.mapSimple(usuario)
    }

    async actualizar(id: Usuario["id"], negocio_id: Usuario["negocio_id"], data: UsuarioActualizar): Promise<Usuario> {

        const usuario = await this.db.usuarios.update({
            where: { id, negocio_id },
            data: {
                ...data,
                rol: UsuarioMapper.mapRolBaseDatos(data.rol)
            }
        })
    }

    async eliminar(id: Usuario["id"], negocio_id: Usuario["negocio_id"]): Promise<void> {
        throw Error
    }

}