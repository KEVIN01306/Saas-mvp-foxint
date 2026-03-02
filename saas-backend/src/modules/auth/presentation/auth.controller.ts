import Respuesta from "@app/http/respuesta.js";
import type { LoginUseCase } from "../application/login.usecase.js";
import type { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError.js";
import type { RefreshTokenUseCase } from "../application/refresh-token.usecase.js";


const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 *1000,
    path: '/'
}

const NOMBRECOOKIEREFRESHTOKEN = "refreshToken"

export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ) { }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { telefono, password } = req.body

            const { accessToken, refreshToken, usuario } = await this.loginUseCase.execute({ telefono, password })

            res.cookie(NOMBRECOOKIEREFRESHTOKEN, refreshToken, COOKIE_OPTIONS)

            return res.status(200).json(
                Respuesta.exito("Login exitoso", { accessToken, usuario })
            )
        } catch (error) {
            next(error)
        }
    }

    refresh = async  (req: Request, res:Response, next: NextFunction) => {
        try {
            const tokenEnviado = req.cookies.refreshToken;

            if (!tokenEnviado) {
                throw new AppError("Debe iniciar sesión de nuevo", "MISSING_COOKIE", 401)
            }

            const { accessToken, refreshToken } = await this.refreshTokenUseCase.execute(tokenEnviado)

            res.cookie(NOMBRECOOKIEREFRESHTOKEN, refreshToken, COOKIE_OPTIONS);

            return res.status(200).json(
                Respuesta.exito("Token renovado", { accessToken })
            )

        }catch (error) {
            next(error)
        }
    }

}