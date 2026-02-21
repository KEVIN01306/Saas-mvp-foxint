import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import AppError from "../errors/AppError.js"
import type { ClienteActualizarType, ClienteCrearType, ClienteType } from "../types/cliente.type.js"
import { clienteDetalleSelector, clienteListaSelector } from "../selectors/cliente.selector.js"
import { BaseService } from "./base.service.js"

class ClienteService extends BaseService {

    constructor(db: any) {
        super(db)
    }

    public async obtenerClientes(limit = 10, offset = 0, negocio_id: ClienteType['negocio_id']) {
        return await this.paginacion<ClienteType>(this.db.clientes, {
            limit,
            offset,
            negocio_id,
            select: clienteListaSelector,
            orderBy: { fecha_registro: 'desc' }
        })
    }

    public async obtenerCliente(id: ClienteType['id'], negocio_id: ClienteType['negocio_id']) {
        const cliente = await this.db.clientes.findUnique({
            where: { id, negocio_id },
            select: clienteDetalleSelector
        })

        if (!cliente) {
            throw new AppError('No se encontro el cliente', 'DATA_NOT_FOUND', 404)
        }

        return cliente
    }

    public async crearCliente(data: ClienteCrearType, negocio_id: ClienteType['negocio_id']) {
        const clienteExistente = await this.db.clientes.findFirst({
            where: { telefono: data.telefono, negocio_id }
        })

        if (clienteExistente) {
            throw new AppError('El cliente ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const nuevoCliente = {
            ...data,
            id: crypto.randomUUID(),
            negocio_id,
            fecha_registro: new Date()
        }

        const cliente = await this.db.clientes.create({
            data: nuevoCliente,
            select: clienteDetalleSelector
        })

        return cliente
    }

    public async actualizarCliente(id: ClienteType['id'], data: Partial<ClienteActualizarType>, negocio_id: ClienteType['negocio_id']) {
        try {
            const cliente = await this.db.clientes.update({
                where: { id },
                data: { ...data, negocio_id },
                select: clienteDetalleSelector
            })

            return cliente
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                if (error.code === 'P2002') {
                    throw new AppError('El cliente ya está en uso por otro usuario', 'WA_ID_ALREADY_EXISTS', 409);
                }
                if (error.code === 'P2025') {
                    throw new AppError('No se encontró el cliente para actualizar', 'DATA_NOT_FOUND', 404);
                }
            }
            throw error
        }

    }
}

export default ClienteService;