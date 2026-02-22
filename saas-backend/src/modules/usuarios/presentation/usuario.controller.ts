import type { NextFunction, Request, Response } from "express";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import BaseController from "../../../shared/presentation/base.controller.js";
import Respuesta from "../../../app/http/respuesta.js";
import type { BuscarPorNegocioUseCase } from "../application/buscar-por-negocio.usecase.js";


export class UsuarioController extends BaseController{

    constructor (
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase,
        private readonly buscarPorNegocioUseCase: BuscarPorNegocioUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const usuario = await this.buscarPorIdUseCase.execute({id, negocio_id});
            res.status(200).json(Respuesta.exito('Usuario obtenido con exito',usuario))
        }catch (error) {
            next(error)
        }
    }

    buscarPorNegocio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const usuarios = await this.buscarPorNegocioUseCase.execute({negocio_id});
            res.status(200).json(Respuesta.exito('Usuarios Obtenidos con exito', usuarios))
        }catch (error){
            next(error)
        }
    }

    
}