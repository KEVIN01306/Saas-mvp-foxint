import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import prisma from "../configs/db.config.js"
import AppError from "../errors/AppError.js"
import type { ClienteActualizarType, ClienteCrearType, ClienteType } from "../types/cliente.type.js"
import { clienteDetalleSelector, clienteListaSelector } from "../selectors/cliente.selector.js"


class ClienteService {

    constructor() { }

    public async obtenerClientes() {
        const clientes = await prisma.clientes.findMany({
            select: clienteListaSelector
        })

        if (!clientes || clientes.length === 0) {
            throw new AppError('No se encontraron clientes', 'DATA_NOT_FOUND', 404)
        }

        return clientes
    }

    public async obtenerCliente(id: ClienteType['id']) {
        const cliente = await prisma.clientes.findUnique({
            where: { id },
            select: clienteDetalleSelector
        })

        if (!cliente) {
            throw new AppError('No se encontro el cliente', 'DATA_NOT_FOUND', 404)
        }

        return cliente
    }

    public async crearCliente(data: ClienteCrearType) {
        const clienteExistente = await prisma.clientes.findFirst({
            where: { telefono: data.telefono, negocio_id: data.negocio_id }
        })

        if (clienteExistente) {
            throw new AppError('El cliente ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const nuevoCliente = {
            ...data,
            id: crypto.randomUUID(),
            fecha_registro: new Date()
        }

        const cliente = await prisma.clientes.create({
            data: nuevoCliente,
            select: clienteDetalleSelector
        })

        return cliente
    }

    public async actualizarCliente(id: ClienteType['id'], data: Partial<ClienteActualizarType>) {
        try {
            const cliente = await prisma.clientes.update({
                where: { id },
                data,
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