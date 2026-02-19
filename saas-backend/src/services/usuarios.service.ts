import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../configs/db.config.js";
import AppError from "../errors/AppError.js";
import { usuarioDetalleSelector, usuarioListaSelector } from "../selectors/usuario.selector.js";
import type { UsuarioActualizarType, UsuarioCrearType, UsuarioType } from "../types/usuario.type.js";
import argon2 from 'argon2'

class UsuarioServices {

    public async obtenerUsuarios() {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                activo: true
            },
            select: usuarioListaSelector
        })

        if (!usuarios || usuarios.length === 0) {
            throw new AppError('No se encontraron usuarios', 'DATA_NOT_FOUND', 404);
        }

        return usuarios
    }

    public async obtenerUsuario(id: UsuarioType['id']) {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: id,
                activo: true
            },
            select: usuarioDetalleSelector
        })

        if (!usuario) {
            throw new AppError('No se encontro el usuario', 'DATA_NOT_FOUND', 404)
        }

        return usuario
    }

    public async crearUsuario(data: UsuarioCrearType) {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                telefono: data.telefono

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
            verificado: false,
            activo: true
        }

        const usuarioCreaado = await prisma.usuarios.create({
            data: nuevoUsuario,
            select: usuarioDetalleSelector
        })

        return usuarioCreaado
    }

    public async actualizarUsuario(id: UsuarioType['id'], data: Partial<UsuarioActualizarType>) {
        try {
            const usuarioActualizado = await prisma.usuarios.update({
                where: {
                    id: id,
                    activo: true
                },
                data: {
                    ...data,
                },
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

    public async eliminarUsuario(id: UsuarioType['id']) {
        try {
            const usuarioEliminado = await prisma.usuarios.update({
                where: {
                    id: id,
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