import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AppError from "../errors/AppError.js";
import { sucursalDetalleSelector, sucursalListaSelector } from "../selectors/sucursal.selector.js";
import type { SucursalActualizarType, SucursalCrearType, SucursalType } from "../types/sucursal.type.js";
import { BaseService } from "./base.service.js";



class SucursalService extends BaseService {

    constructor(db: any) {
        super(db)
    }

    public async obtenerSucursales(limit = 10, offset = 0, negocio_id: SucursalType['negocio_id']) {
        return this.paginacion<SucursalType>(this.db.sucursales, {
            limit,
            offset,
            negocio_id,
            select: sucursalListaSelector,
            orderBy: { nombre: 'asc' }
        })
    }

    public async obtenerSucursal(id: SucursalType['id'], negocio_id: SucursalType['negocio_id']) {
        const sucursal = await this.db.sucursales.findUnique({
            where: { id, negocio_id },
            select: sucursalDetalleSelector
        })

        if (!sucursal) {
            throw new AppError('No se encontro la sucursal', 'DATA_NOT_FOUND', 404)
        }

        return sucursal
    }

    public async crearSucursal(data: SucursalCrearType, negocio_id: SucursalType['negocio_id']) {
        const sucursalExistente = await this.db.sucursales.findFirst({
            where: { nombre: data.nombre, negocio_id: negocio_id }
        })

        if (sucursalExistente) {
            throw new AppError('La sucursal ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const totalSucursales = await this.db.sucursales.count({
            where: { negocio_id: negocio_id }
        })

        const nuevaSucursal = {
            ...data,
            id: crypto.randomUUID(),
            negocio_id,
            es_principal: totalSucursales === 0
        }

        const sucursal = await this.db.sucursales.create({
            data: nuevaSucursal,
            select: sucursalDetalleSelector
        })

        return sucursal
    }

    public async actualizarSucursal(id: SucursalType['id'], data: SucursalActualizarType, negocio_id: SucursalType['negocio_id']) {
        try {
            const sucursalExistente = await this.db.sucursales.findFirst({
                where: { nombre: data.nombre, negocio_id: negocio_id, id: { not: id } }
            })

            if (sucursalExistente) {
                throw new AppError('La sucursal ya existe', 'DATA_ALREADY_EXISTS', 409)
            }

            const sucursalActualizada = await this.db.sucursales.update({
                where: { id, negocio_id },
                data,
                select: sucursalDetalleSelector
            })

            return sucursalActualizada
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError('No se encontro la sucursal para actualizar', 'DATA_NOT_FOUND', 404)
                }
            }
            throw error
        }
    }
}

export default SucursalService;