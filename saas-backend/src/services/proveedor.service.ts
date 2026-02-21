import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import AppError from "../errors/AppError.js"
import { proveedorDetalleSelector, proveedorListaSelector } from "../selectors/proveedor.selector.js"
import type { ProveedorActualizarType, ProveedorCrearType, ProveedorType } from "../types/proveedor.type.js"
import { BaseService } from "./base.service.js"


class ProveedorService extends BaseService {

    constructor(db: any) {
        super(db)
    }

    public async obtenerProveedores(limit = 10, offset = 0, negocio_id: ProveedorType['negocio_id']) {

        return this.paginacion<ProveedorType>(this.db.proveedores, {
            limit,
            offset,
            negocio_id,
            select: proveedorListaSelector,
            orderBy: { nombre: 'desc' }
        });
    }

    public async obtenerProveedor(id: ProveedorType['id'], negocio_id: ProveedorType['negocio_id']) {
        const proveedor = await this.db.proveedores.findUnique({
            where: { id, negocio_id },
            select: proveedorDetalleSelector
        })

        if (!proveedor) {
            throw new AppError('No se encontro el proveedor', 'DATA_NOT_FOUND', 404)
        }

        return proveedor;
    }

    public async crearProveedor(data: ProveedorCrearType, negocio_id: ProveedorType['negocio_id']) {
        const proveedorExistente = await this.db.proveedores.findFirst({
            where: { nombre: data.nombre, negocio_id: negocio_id }
        })

        if (proveedorExistente) {
            throw new AppError('El proveedor ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const nuevoProveedor = {
            ...data,
            id: crypto.randomUUID(),
            negocio_id: negocio_id,
        }

        const proveedor = await this.db.proveedores.create({
            data: nuevoProveedor,
            select: proveedorDetalleSelector
        })

        return proveedor;
    }

    public async actualizarProveedor(id: ProveedorType['id'], data: ProveedorActualizarType, negocio_id: ProveedorType['negocio_id']) {
        try {
            const proveedorExistente = await this.db.proveedores.findFirst({
                where: { nombre: data.nombre, negocio_id: negocio_id, id: { not: id } }
            })

            if (proveedorExistente) {
                throw new AppError('El proveedor ya existe', 'DATA_ALREADY_EXISTS', 409)
            }

            const proveedorActualizado = await this.db.proveedores.update({
                where: { id },
                data,
                select: proveedorDetalleSelector
            })

            return proveedorActualizado;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError('No se encontro el proveedor para actualizar', 'DATA_NOT_FOUND', 404)
                }
            }
            throw error
        }
    }

}

export default ProveedorService;