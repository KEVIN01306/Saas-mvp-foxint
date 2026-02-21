import type { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import AuthService from "../services/auth.service.js";
import Respuesta from "../helpers/Respuesta.js";
import AppError from "../errors/AppError.js";
import { loginSchema } from "../zod/auth.schema.js";
import prisma from "../configs/db.config.js";


class AuthController {

    constructor(private readonly authService: AuthService) { }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataValidada = loginSchema.parse(req.body);

            const tokens = await this.authService.login(
                dataValidada.telefono,
                dataValidada.password_hash
            );

            res.status(200).json(Respuesta.exito("Login exitoso", tokens));
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(Respuesta.validacion(error));
                return;
            }
            next(error);
        }
    };

    public refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token_refresh } = req.body;

            if (!token_refresh) {
                throw new Error("REFRESH_TOKEN_REQUIRED");
            }

            const nuevosTokens = await this.authService.refresh(token_refresh);

            res.status(200).json(Respuesta.exito("Tokens actualizados", nuevosTokens));
        } catch (error: any) {
            if (error.message === "REFRESH_TOKEN_REQUIRED") {
                res.status(400).json(Respuesta.error("El token de refresco es obligatorio", "MISSING_DATA"));
                return;
            }
            next(error);
        }
    };

    public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userPayload = (req as any).usuario;

            if (!userPayload || !userPayload.id) {
                throw new AppError("No se encontró información de usuario", "AUTH_FAILED", 401);
            }

            const usuario = await this.authService.obtenerPerfilActual(userPayload.id);

            res.status(200).json(Respuesta.exito("Perfil obtenido", usuario));
        } catch (error) {
            next(error);
        }
    };
}

const authService = new AuthService(prisma);
export default new AuthController(authService);