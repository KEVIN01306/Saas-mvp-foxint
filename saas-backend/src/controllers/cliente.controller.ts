import type { NextFunction, Request, Response } from "express"
import ClienteService from "../services/cliente.service.js"
import Respuesta from "../helpers/Respuesta.js"


class ClienteController {

    private readonly clienteService: ClienteService

    constructor(clienteService: ClienteService) {
        this.clienteService = clienteService
    }

    public async obtenerClientes(_req: Request, res: Response, next: NextFunction) {
        try {
            const clientes = await this.clienteService.obtenerClientes()
            res.status(200).json(Respuesta.exito('Clientes obtenidos con exito', clientes))
        } catch (error) {
            next(error)
        }
    };

    public async obtenerCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const cliente = await this.clienteService.obtenerCliente(String(id))
            res.status(200).json(Respuesta.exito('Cliente obtenido con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    public async crearCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const cliente = await this.clienteService.crearCliente(data)
            res.status(200).json(Respuesta.exito('Cliente creado con exito', cliente))
        } catch (error) {
            next(error)
        }
    }

    public async actualizarCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const data = req.body
            const cliente = await this.clienteService.actualizarCliente(String(id), data)
            res.status(200).json(Respuesta.exito('Cliente actualizado con exito', cliente))
        } catch (error) {
            next(error)
        }

    }
}

const clienteService = new ClienteService()
export default new ClienteController(clienteService);