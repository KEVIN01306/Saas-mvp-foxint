import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AppError from "../errors/AppError.js";
import { usuarioDetalleSelector, usuarioListaSelector } from "../selectors/usuario.selector.js";
import type { UsuarioActualizarType, UsuarioCrearType, UsuarioType } from "../types/usuario.type.js";
import argon2 from 'argon2'
import { BaseService } from "./base.service.js";

class UsuarioServices extends BaseService {

    constructor(db: any) {
        super(db)
    }

    public async obtenerUsuarios(limit = 10, offset = 0, negocio_id: UsuarioType['negocio_id']) {
        return this.paginacion<UsuarioType>(this.db.usuarios, {
            where: {
                activo: true
            },
            limit,
            offset,
            negocio_id,
            select: usuarioListaSelector,
            orderBy: { nombre: 'asc' }
        })
    }

    public async obtenerUsuario(id: UsuarioType['id'], negocio_id: UsuarioType['negocio_id']) {
        const usuario = await this.db.usuarios.findUnique({
            where: {
                id: id,
                negocio_id,
                activo: true
            },
            select: usuarioDetalleSelector
        })

        if (!usuario) {
            throw new AppError('No se encontro el usuario', 'DATA_NOT_FOUND', 404)
        }

        return usuario
    }

    public async crearUsuario(data: UsuarioCrearType, negocio_id: UsuarioType['negocio_id']) {
        const usuario = await this.db.usuarios.findUnique({
            where: {
                telefono: data.telefono,
            }
        })

        if (usuario) {
            throw new AppError('Este correo ya esta registrado', 'EMAIL_ALREADY_EXISTS', 409)
        }

        const hashedPassword = await argon2.hash(data.password_hash)

        const nuevoUsuario = {
            ...data,
            id: crypto.randomUUID(),
            password_hash: hashedPassword,
            negocio_id,
            verificado: false,
            activo: true
        }

        const usuarioCreaado = await this.db.usuarios.create({
            data: nuevoUsuario,
            select: usuarioDetalleSelector
        })

        return usuarioCreaado
    }

    public async actualizarUsuario(id: UsuarioType['id'], data: Partial<UsuarioActualizarType>, negocio_id: UsuarioType['negocio_id']) {
        try {
            const usuarioActualizado = await this.db.usuarios.update({
                where: {
                    id: id,
                    negocio_id,
                    activo: true

                },
                data: data,
                select: usuarioDetalleSelector
            });

            return usuarioActualizado;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                if (error.code === 'P2002') {
                    throw new AppError('El numero de telefono ya esta registrado', 'PHONE_ALREADY_EXISTS', 409);
                }
                if (error.code === 'P2025') {
                    throw new AppError('No se encontró el usuario para actualizar', 'DATA_NOT_FOUND', 404);
                }
            }
            throw error;
        }
    }

    public async eliminarUsuario(id: UsuarioType['id'], negocio_id: UsuarioType['negocio_id']) {
        try {
            const usuarioEliminado = await this.db.usuarios.update({
                where: {
                    id: id,
                    negocio_id,
                    activo: true
                },
                data: {
                    activo: false
                },
                select: usuarioDetalleSelector
            });

            return usuarioEliminado;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError('No se encontró el usuario para eliminar', 'DATA_NOT_FOUND', 404);
                }
            }
            throw error;
        }
    }
}

export default UsuarioServices;