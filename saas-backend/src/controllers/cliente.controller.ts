import type { NextFunction, Request, Response } from "express"
import ClienteService from "../services/cliente.service.js"
import Respuesta from "../helpers/Respuesta.js"
import prisma from "../configs/db.config.js";
import BaseController from "./base.controller.js";


class ClienteController extends BaseController {


    constructor(private readonly clienteService: ClienteService) {
        super()
    }

    public obtenerClientes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { limit, offset } = res.locals.query
            const { negocio_id } = this.obtenerEntorno(res)
            const clientes = await this.clienteService.obtenerClientes(limit, offset, negocio_id)
            res.status(200).json(Respuesta.paginacion('Clientes obtenidos con exito', clientes.data, clientes.total, clientes.limit, clientes.offset))
        } catch (error) {
            next(error)
        }
    };

    public obtenerCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.clienteService.obtenerCliente(String(id), negocio_id)
            res.status(200).json(Respuesta.exito('Cliente obtenido con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    public crearCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.clienteService.crearCliente(data, negocio_id)
            res.status(200).json(Respuesta.exito('Cliente creado con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    public actualizarCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const cliente = await this.clienteService.actualizarCliente(String(id), data, negocio_id)
            res.status(200).json(Respuesta.exito('Cliente actualizado con exito', cliente))
        } catch (error) {
            next(error)
        }

    }
}

const clienteService = new ClienteService(prisma)
export default new ClienteController(clienteService);