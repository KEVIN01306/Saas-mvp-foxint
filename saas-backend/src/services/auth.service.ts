import prisma from "../configs/db.config.js";
import AppError from "../errors/AppError.js";
import argon2 from 'argon2';
import JwtProvider from "../helpers/jwt.helper.js";
import { usuarioDetalleSelector } from "../selectors/usuario.selector.js";

class AuthService {
    private readonly jwtProvider: JwtProvider;

    constructor() {
        this.jwtProvider = new JwtProvider();
    }

    public async login(telefono: string, password_plano: string) {
        const usuario = await prisma.usuarios.findUnique({
            where: { telefono },
        });

        if (!usuario || !usuario.activo || !usuario.password_hash) {
            throw new AppError('Credenciales inválidas o cuenta inactiva', 'AUTH_FAILED', 401);
        }
        const esValido = await argon2.verify(usuario.password_hash, password_plano);
        if (!esValido) {
            throw new AppError('Credenciales inválidas', 'AUTH_FAILED', 401);
        }

        const tokens = await this.jwtProvider.generateTokens(usuario.id, usuario.rol);
        const usuarioData = await prisma.usuarios.findUnique({
            where: { id: usuario.id },
            select: usuarioDetalleSelector
        });
        return { ...tokens, usuario: usuarioData };
    }

    public async refresh(token_refresh: string) {
        try {
            const payload = await this.jwtProvider.verifyToken(token_refresh);

            if (!payload.sub) throw new Error();

            const usuario = await prisma.usuarios.findUnique({
                where: { id: payload.sub, activo: true },
                select: usuarioDetalleSelector
            });

            if (!usuario) {
                throw new AppError('Usuario no encontrado o inactivo', 'USER_NOT_FOUND', 404);
            }

            return await this.jwtProvider.generateTokens(usuario.id, usuario.rol);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('Token de refresco inválido o expirado', 'INVALID_REFRESH_TOKEN', 403);
        }
    }


    public async obtenerPerfilActual(id: string) {
        const usuario = await prisma.usuarios.findUnique({
            where: { id },
            select: usuarioDetalleSelector
        });

        if (!usuario) {
            throw new AppError('Usuario no encontrado', 'USER_NOT_FOUND', 404);
        }

        return usuario;
    }
}

export default AuthService;