import type { NextFunction, Request, Response } from "express";
import type { BuscarPorIdUseCase } from "../application/buscar-por-id.usecase.js";
import BaseController from "../../../shared/presentation/base.controller.js";
import Respuesta from "../../../app/http/respuesta.js";
import type { BuscarPorNegocioUseCase } from "../application/buscar-por-negocio.usecase.js";
import type { CrearUsuarioUseCase } from "../application/crear.usecase.js";
import type { ActualizarUsuarioUseCase } from "../application/actualizar.usecase.js";
import type { EliminarUsuarioUseCase } from "../application/eliminar.usecase.js";


export class UsuarioController extends BaseController {

    constructor(
        private readonly buscarPorIdUseCase: BuscarPorIdUseCase,
        private readonly buscarPorNegocioUseCase: BuscarPorNegocioUseCase,
        private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
        private readonly actualizarUsuarioUseCase: ActualizarUsuarioUseCase,
        private readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase
    ) {
        super()
    }

    buscarPorId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const usuario = await this.buscarPorIdUseCase.execute({ id, negocio_id });
            res.status(200).json(Respuesta.exito('Usuario obtenido con exito', usuario))
        } catch (error) {
            next(error)
        }
    }

    buscarPorNegocio = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const { limit, offset } = res.locals.query
            const page = offset / limit + 1
            const { total, usuarios } = await this.buscarPorNegocioUseCase.execute({ negocio_id, page, perPage: limit });
            res.status(200).json(Respuesta.paginacion('Usuarios Obtenidos con exito', usuarios, total, limit, offset))
        } catch (error) {
            next(error)
        }
    }

    crear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { negocio_id } = this.obtenerEntorno(res)
            const usuario = await this.crearUsuarioUseCase.execute(req.body, negocio_id)
            res.status(201).json(Respuesta.exito('Usuario creado con exito', usuario))
        } catch (error) {
            next(error)
        }
    }

    actualizar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const usuario = await this.actualizarUsuarioUseCase.execute(id, negocio_id, req.body)
            res.status(200).json(Respuesta.exito('Usuario actualizado con exito', usuario))
        } catch (error) {
            next(error)
        }
    }

    eliminar = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            await this.eliminarUsuarioUseCase.execute(id, negocio_id)
            res.status(204).json(Respuesta.exito('Usuario eliminado con exito', null))
        } catch (error) {
            next(error)
        }
    }
}