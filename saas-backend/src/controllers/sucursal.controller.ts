import type { NextFunction, Request, Response } from "express";
import SucursalService from "../services/sucursal.service.js";
import Respuesta from "../helpers/Respuesta.js";
import prisma from "../configs/db.config.js";
import BaseController from "./base.controller.js";

class SucursalController extends BaseController {
    constructor(private readonly sucursalService: SucursalService) {
        super()
    }

    public obtenerSucursales = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = res.locals.query
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursales = await this.sucursalService.obtenerSucursales(limit, offset, negocio_id)
            res.status(200).json(Respuesta.paginacion("Sucursales obtenidas con exito", sucursales.data, sucursales.total, sucursales.limit, sucursales.offset))
        } catch (error) {
            next(error)
        }
    }

    public obtenerSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursal = await this.sucursalService.obtenerSucursal(String(id), negocio_id)
            res.status(200).json(Respuesta.exito("Sucursal obtenida con exito", sucursal))
        } catch (error) {
            next(error)
        }
    }

    public crearSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursalCreada = await this.sucursalService.crearSucursal(data, negocio_id)
            res.status(201).json(Respuesta.exito("Sucursal creada con exito", sucursalCreada))
        } catch (error) {
            next(error)
        }
    }

    public actualizarSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const sucursalActualizada = await this.sucursalService.actualizarSucursal(String(id), data, negocio_id)
            res.status(200).json(Respuesta.exito("Sucursal actualizada con exito", sucursalActualizada))
        } catch (error) {
            next(error)
        }
    }
}

const sucursalService = new SucursalService(prisma)
export default new SucursalController(sucursalService);
