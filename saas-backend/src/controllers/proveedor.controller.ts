import type { NextFunction, Request, Response } from "express";
import Respuesta from "../helpers/Respuesta.js";
import ProveedorService from "../services/proveedor.service.js"
import prisma from "../configs/db.config.js";
import BaseController from "./base.controller.js";

class ProveedorController extends BaseController {
    constructor(private readonly proveedorService: ProveedorService) {
        super()
    }

    public obtenerProveedores = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = res.locals.query
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedores = await this.proveedorService.obtenerProveedores(limit, offset, negocio_id)
            return res.status(200).json(Respuesta.paginacion('Proveedores obtenidos correctamente', proveedores.data, proveedores.total, proveedores.limit, proveedores.offset))
        } catch (error) {
            next(error)
        }
    }

    public obtenerProveedor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.proveedorService.obtenerProveedor(String(id), negocio_id)
            return res.status(200).json(Respuesta.exito('Proveedor obtenido correctamente', proveedor))
        } catch (error) {
            next(error)
        }
    }

    public crearProveedor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.proveedorService.crearProveedor(data, negocio_id)
            return res.status(201).json(Respuesta.exito('Proveedor creado correctamente', proveedor))
        } catch (error) {
            next(error)
        }
    }

    public actualizarProveedor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const proveedor = await this.proveedorService.actualizarProveedor(String(id), data, negocio_id)
            return res.status(200).json(Respuesta.exito('Proveedor actualizado correctamente', proveedor))
        } catch (error) {
            next(error)
        }
    }
}


const proveedorService = new ProveedorService(prisma);
export default new ProveedorController(proveedorService);
