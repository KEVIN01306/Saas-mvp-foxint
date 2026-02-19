import type { NextFunction, Request, Response } from "express";
import SucursalService from "../services/sucursal.service.js";
import Respuesta from "../helpers/Respuesta.js";

class SucursalController {
    private readonly sucursalService: SucursalService;
    constructor(sucursalService: SucursalService) {
        this.sucursalService = sucursalService;
    }

    public obtenerSucursales = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const sucursales = await this.sucursalService.obtenerSucursales()
            res.status(200).json(Respuesta.exito("Sucursales obtenidas con exito", sucursales))
        } catch (error) {
            next(error)
        }
    }

    public obtenerSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const sucursal = await this.sucursalService.obtenerSucursalPorId(String(id))
            res.status(200).json(Respuesta.exito("Sucursal obtenida con exito", sucursal))
        } catch (error) {
            next(error)
        }
    }

    public crearSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const sucursalCreada = await this.sucursalService.crearSucursal(data)
            res.status(201).json(Respuesta.exito("Sucursal creada con exito", sucursalCreada))
        } catch (error) {
            next(error)
        }
    }

    public actualizarSucursal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const data = req.body
            const sucursalActualizada = await this.sucursalService.actualizarSucursal(String(id), data)
            res.status(200).json(Respuesta.exito("Sucursal actualizada con exito", sucursalActualizada))
        } catch (error) {
            next(error)
        }
    }
}

const sucursalService = new SucursalService()
export default new SucursalController(sucursalService);
