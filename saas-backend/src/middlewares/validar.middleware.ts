import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import Respuesta from "../helpers/Respuesta.js";

class ValidarMiddleware {
    public validarEsquema = (schema: z.ZodTypeAny) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json(Respuesta.validacion(error));
                }
                next(error);
            }
        };
}

export default new ValidarMiddleware();