import type { NextFunction, Request, Response } from "express";
import Respuesta from "../helpers/Respuesta.js";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let code = err.code || 'INTERNAL_SERVER_ERROR';
    let message = err.message || 'Error interno del servidor';

    if (!err.statusCode && err.code?.startsWith('P')) {
        statusCode = 400;
        code = `DATABASE_ERROR_${err.code}`;
        message = 'Error de base de datos: Conflicto de datos o restricción violada.';
    }

    res.status(statusCode).json(
        Respuesta.error(message, code)
    );
}