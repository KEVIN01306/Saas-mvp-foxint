import type { NextFunction, Request, Response } from "express";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import BaseController from "@shared/presentation/base.controller.js";
import Respuesta from "@app/http/respuesta.js";
import type { BuscarPorNegocioUseCase } from "../application/buscar-por-negocio.usecase.js";
import type { CrearSucursalUseCase } from "../application/crear.usecase.js";
import type { ActualizarSucursalUseCase } from "../application/actualizar.usecase.js";
import type { EliminarSucursalUseCase } from "../application/eliminar.usecase.js";

export class SucursalController extends BaseController {

    constructor(
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase,
        private readonly buscarPorNegocioUseCase: BuscarPorNegocioUseCase,
        private readonly crearSucursalUseCase: CrearSucursalUseCase,
        private readonly actualizarSucursalUseCase: ActualizarSucursalUseCase,
        private readonly eliminarSucursalUseCase: EliminarSucursalUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursal = await this.buscarPorIdUseCase.execute(id, negocio_id);
            res.status(200).json(Respuesta.exito('Sucursal obtenida con éxito', sucursal))
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
            res.status(200).json(Respuesta.paginacion('Sucursales obtenidas con éxito', data, total, limit, offset))
        } catch (error) {
            next(error)
        }
    }

    crear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursal = await this.crearSucursalUseCase.execute(req.body, negocio_id)
            res.status(201).json(Respuesta.exito('Sucursal creada con éxito', sucursal))
        } catch (error) {
            next(error)
        }
    }

    actualizar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursal = await this.actualizarSucursalUseCase.execute(id, negocio_id, req.body)
            res.status(200).json(Respuesta.exito('Sucursal actualizada con éxito', sucursal))
        } catch (error) {
            next(error)
        }
    }

    eliminar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            await this.eliminarSucursalUseCase.execute(id, negocio_id)
            res.status(200).json(Respuesta.exito('Sucursal eliminada con éxito', null))
        } catch (error) {
            next(error)
        }
    }
}
