import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../configs/db.config.js";
import AppError from "../errors/AppError.js";
import { sucursalDetalleSelector, sucursalListaSelector } from "../selectors/sucursal.selector.js";
import type { SucursalActualizarType, SucursalCrearType, SucursalType } from "../types/sucursal.type.js";



class SucursalService {

    public async obtenerSucursales() {
        const sucursales = await prisma.sucursales.findMany({
            select: sucursalListaSelector
        })

        if (!sucursales || sucursales.length === 0) {
            throw new AppError('No se encontraron sucursales', 'DATA_NOT_FOUND', 404)
        }

        return sucursales
    }

    public async obtenerSucursalPorId(id: SucursalType['id']) {
        const sucursal = await prisma.sucursales.findUnique({
            where: { id },
            select: sucursalDetalleSelector
        })

        if (!sucursal) {
            throw new AppError('No se encontro la sucursal', 'DATA_NOT_FOUND', 404)
        }

        return sucursal
    }

    public async crearSucursal(data: SucursalCrearType) {
        const sucursalExistente = await prisma.sucursales.findFirst({
            where: { nombre: data.nombre, negocio_id: data.negocio_id }
        })

        if (sucursalExistente) {
            throw new AppError('La sucursal ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const totalSucursales = await prisma.sucursales.count({
            where: { negocio_id: data.negocio_id }
        })

        const nuevaSucursal = {
            ...data,
            id: crypto.randomUUID(),
            es_principal: totalSucursales === 0
        }

        const sucursal = await prisma.sucursales.create({
            data: nuevaSucursal,
            select: sucursalDetalleSelector
        })

        return sucursal
    }

    public async actualizarSucursal(id: SucursalType['id'], data: SucursalActualizarType) {
        try {
            const sucursalExistente = await prisma.sucursales.findFirst({
                where: { nombre: data.nombre, negocio_id: data.negocio_id, id: { not: id } }
            })

            if (sucursalExistente) {
                throw new AppError('La sucursal ya existe', 'DATA_ALREADY_EXISTS', 409)
            }

            const sucursalActualizada = await prisma.sucursales.update({
                where: { id },
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