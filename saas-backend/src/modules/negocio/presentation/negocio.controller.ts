import type { NextFunction, Request, Response } from "express";
import BaseController from "@shared/presentation/base.controller.js";
import Respuesta from "@app/http/respuesta.js";
import type { CrearNegocioUseCase } from "../application/crear.usecase.js";
import type { ActualizarNegocioUseCase } from "../application/actualizar.usecase.js";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import ManejadorArchivosUtils from "../infrastructure/utils/manejadorArchivos.utils.js";

export class NegocioController extends BaseController {

    constructor(
        private readonly crearNegocioUseCase: CrearNegocioUseCase,
        private readonly actualizarNegocioUseCase: ActualizarNegocioUseCase,
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const negocio = await this.buscarPorIdUseCase.execute(id, negocio_id);
            res.status(200).json(Respuesta.exito('Negocio obtenido con éxito', negocio))
        } catch (error) {
            next(error)
        }
    }

    crear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const logo = req.file;
            const logoPath = logo ? ManejadorArchivosUtils.formatearRuta(logo.path) : 'uploads/negocios/default.png';

            const negocio = await this.crearNegocioUseCase.execute(data, logoPath)
            res.status(201).json(Respuesta.exito('Negocio creado con éxito', negocio))
        } catch (error) {
            next(error)
        }
    }

    actualizar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const logo = req.file
            const logoPath = logo ? ManejadorArchivosUtils.formatearRuta(logo.path) : undefined

            const negocio = await this.actualizarNegocioUseCase.execute(id, data, logoPath, negocio_id)
            res.status(200).json(Respuesta.exito('Negocio actualizado con éxito', negocio))
        } catch (error) {
            next(error)
        }
    }
}
