import type { NextFunction, Request, Response } from "express";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import BaseController from "@shared/presentation/base.controller.js";
import Respuesta from "@app/http/respuesta.js";
import type { BuscarPorNegocioUseCase } from "../application/buscar-por-negocio.usecase.js";
import type { CrearProveedorUseCase } from "../application/crear.usecase.js";
import type { ActualizarProveedorUseCase } from "../application/actualizar.usecase.js";
import type { EliminarProveedorUseCase } from "../application/eliminar.usecase.js";

export class ProveedorController extends BaseController {

    constructor(
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase,
        private readonly buscarPorNegocioUseCase: BuscarPorNegocioUseCase,
        private readonly crearProveedorUseCase: CrearProveedorUseCase,
        private readonly actualizarProveedorUseCase: ActualizarProveedorUseCase,
        private readonly eliminarProveedorUseCase: EliminarProveedorUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.buscarPorIdUseCase.execute(id, negocio_id);
            res.status(200).json(Respuesta.exito('Proveedor obtenido con éxito', proveedor))
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
            res.status(200).json(Respuesta.paginacion('Proveedores obtenidos con éxito', data, total, limit, offset))
        } catch (error) {
            next(error)
        }
    }

    crear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.crearProveedorUseCase.execute(req.body, negocio_id)
            res.status(201).json(Respuesta.exito('Proveedor creado con éxito', proveedor))
        } catch (error) {
            next(error)
        }
    }

    actualizar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.actualizarProveedorUseCase.execute(id, negocio_id, req.body)
            res.status(200).json(Respuesta.exito('Proveedor actualizado con éxito', proveedor))
        } catch (error) {
            next(error)
        }
    }

    eliminar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            await this.eliminarProveedorUseCase.execute(id, negocio_id)
            res.status(200).json(Respuesta.exito('Proveedor eliminado con éxito', null))
        } catch (error) {
            next(error)
        }
    }
}
