import type{ Response } from 'express'
import AppError from '../errors/AppError.js'

abstract class BaseController {
    constructor() { }

    /**
     * Devuelve el contexto o entorno de la petición actual.
     * Centraliza la seguridad de los datos del negocio.
     */
    protected obtenerEntorno(res: Response){
        const usuario = res.locals.usuario
        
        if (!usuario){
            throw new AppError(
                "No se pudo determinar el entorno de la petición",
                "CONTEXT_NOT_FOUND",
                403
            )
        }

        return {
            negocio_id: usuario.negocio_id
        }
    }
}

export default BaseController;