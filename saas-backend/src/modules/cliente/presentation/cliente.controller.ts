import type { NextFunction, Request, Response } from "express";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import BaseController from "../../../shared/presentation/base.controller.js";
import Respuesta from "../../../app/http/respuesta.js";
import type { BuscarPorNegocioUseCase } from "../application/buscar-por-negocio.usecase.js";
import type { CrearClienteUseCase } from "../application/crear.usecase.js";
import type { ActualizarClienteUseCase } from "../application/actualizar.usecase.js";
import type { EliminarClienteUseCase } from "../application/eliminar.usecase.js";

export class ClienteController extends BaseController {

    constructor(
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase,
        private readonly buscarPorNegocioUseCase: BuscarPorNegocioUseCase,
        private readonly crearClienteUseCase: CrearClienteUseCase,
        private readonly actualizarClienteUseCase: ActualizarClienteUseCase,
        private readonly eliminarClienteUseCase: EliminarClienteUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.buscarPorIdUseCase.execute(id, negocio_id);
            res.status(200).json(Respuesta.exito('Cliente obtenido con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    buscarPorNegocio = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const { limit, offset } = res.locals.query
            const page = Math.floor(offset / limit) + 1
            const { total, data } = await this.buscarPorNegocioUseCase.execute({ negocio_id, page, perPage: limit });
            res.status(200).json(Respuesta.paginacion('Clientes obtenidos con exito', data, total, limit, offset))
        } catch (error) {
            next(error)
        }
    }

    crear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.crearClienteUseCase.execute(req.body, negocio_id)
            res.status(201).json(Respuesta.exito('Cliente creado con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    actualizar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.actualizarClienteUseCase.execute(id, negocio_id, req.body)
            res.status(200).json(Respuesta.exito('Cliente actualizado con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    eliminar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            await this.eliminarClienteUseCase.execute(id, negocio_id)
            res.status(200).json(Respuesta.exito('Cliente eliminado con exito', null))
        } catch (error) {
            next(error)
        }
    }
}
