import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AppError from "../errors/AppError.js";
import { negocioDetalleSelector, negocioListaSelector } from "../selectors/negocio.selector.js";
import type { NegocioActualizarType, NegocioCrearType, NegocioType } from "../types/negocio.type.js";
import ManejadorArchivosUtils from "../utils/manejadorArchivos.utils.js";
import { BaseService } from "./base.service.js";


class NegocioService extends BaseService {

    constructor(db: any) {
        super(db)
    }

    public async obtenerNegocio(id: NegocioType['id'], negocio_id: NegocioType['id']) {
        if (!(negocio_id === id)) {
            throw new AppError('No tienes permiso para acceder a este negocio', 'DATA_NOT_FOUND', 404)
        }

        const negocio = await this.db.negocios.findUnique({
            where: { id },
            select: negocioDetalleSelector
        })

        if (!negocio) {
            throw new AppError('No se encontro el negocio', 'DATA_NOT_FOUND', 404)
        }

        return negocio
    }

    public async crearNegocio(data: NegocioCrearType, logo: NegocioType['logo_url']) {
        const negocioExistente = await this.db.negocios.findUnique({
            where: { wa_id: data.wa_id }
        })

        if (negocioExistente) {
            throw new AppError('El negocio ya existe', 'DATA_ALREADY_EXISTS', 409)
        }

        const nuevoNegocio = {
            ...data,
            id: crypto.randomUUID(),
            fecha_registro: new Date(),
            logo_url: logo
        }

        const negocio = await this.db.negocios.create({
            data: nuevoNegocio,
            select: negocioDetalleSelector
        })

        return negocio
    }

    public async actualizarNegocio(id: NegocioType['id'], data: Partial<NegocioActualizarType>, logo: NegocioType['logo_url'], negocio_id: NegocioType['id']) {
        if (!(negocio_id === id)) {
            throw new AppError('No tienes permiso para acceder a este negocio', 'DATA_NOT_FOUND', 404)
        }
        try {

            if (logo) {
                const negocioActual = await this.db.negocios.findUnique({
                    where: { id },
                    select: { logo_url: true }
                })

                if (negocioActual?.logo_url) {
                    await ManejadorArchivosUtils.eliminarArchivo(negocioActual.logo_url)
                }

                data.logo_url = logo
            }

            const negocio = await this.db.negocios.update({
                where: { id },
                data,
                select: negocioDetalleSelector
            })

            return negocio
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                if (error.code === 'P2002') {
                    throw new AppError('El negocio ya está en uso por otro usuario', 'WA_ID_ALREADY_EXISTS', 409);
                }
                if (error.code === 'P2025') {
                    throw new AppError('No se encontró el negocio para actualizar', 'DATA_NOT_FOUND', 404);
                }
            }
            throw error
        }

    }
}

export default NegocioService;