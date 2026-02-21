import NegocioService from "../services/negocio.service.js";
import type { NextFunction, Request, Response } from "express";
import Respuesta from "../helpers/Respuesta.js";
import ManejadorArchivosUtils from "../utils/manejadorArchivos.utils.js";
import prisma from "../configs/db.config.js";
import BaseController from "./base.controller.js";

class NegocioController extends BaseController {

    constructor(private readonly negocioService: NegocioService) {
        super()
    }

    public obtenerNegocio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { negocio_id } = this.obtenerEntorno(res);
            const negocio = await this.negocioService.obtenerNegocio(String(id), negocio_id);
            res.status(200).json(Respuesta.exito("Negocio Obtenido con exito", negocio));
        } catch (error) {
            next(error);
        };
    };

    public crearNegocio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body;
            const logo = req.file;
            const logoPath = logo ? ManejadorArchivosUtils.formatearRuta(logo.path) : 'uploads/negocios/default.png';
            const negocioCreado = await this.negocioService.crearNegocio(data, logoPath);
            res.status(201).json(Respuesta.exito("Negocio Creado con exito", negocioCreado));
        } catch (error) {
            if (req.file) {
                await ManejadorArchivosUtils.eliminarArchivo(req.file.path);
            };
            next(error);
        };
    };

    public actualizarNegocio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { negocio_id } = this.obtenerEntorno(res);
            const logo = req.file;
            const logoPath = logo ? ManejadorArchivosUtils.formatearRuta(logo.path) : undefined;
            const data = req.body;
            const negocioActualizado = await this.negocioService.actualizarNegocio(String(id), data, logoPath, negocio_id);
            res.status(200).json(Respuesta.exito("Negocio Actualizado con exito", negocioActualizado));
        } catch (error) {
            if (req.file) {
                await ManejadorArchivosUtils.eliminarArchivo(req.file.path);
            };
            next(error);
        };
    };
}

const negocioService = new NegocioService(prisma);
export default new NegocioController(negocioService);
