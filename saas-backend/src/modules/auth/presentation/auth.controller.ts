import Respuesta from "@app/http/respuesta.js";
import type { LoginUseCase } from "../application/login.usecase.js";
import type { Request, Response, NextFunction } from "express";


export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { telefono, password } = req.body

            const resultado = await this.loginUseCase.execute({ telefono, password })

            return res.status(200).json(Respuesta.exito("Login exitoso", resultado))
        } catch (error) {
            next(error)
        }
    }
}