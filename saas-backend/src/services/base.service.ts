import type { PrismaClient } from "@prisma/client";


export abstract class BaseService {

    constructor(protected readonly db: PrismaClient) { }

    /**
     * Clase base para todos los servicios servicios, de esta heredan metodos universales
     * @param db - Cliente de base de datos
     */

    protected async paginacion<T>(
        model: any,
        args: {
            limit: number,
            offset: number,
            negocio_id: string,
            where?: any,
            select?: any,
            orderBy?: any
        }
    ): Promise<{ total: number; data: T[], limit: number, offset: number }> {
        const { limit, offset, negocio_id, where, select, orderBy } = args
        const finalWhere = {
            negocio_id,
            ...where
        }

        const [total, data] = await Promise.all([
            model.count({ where: finalWhere }),
            model.findMany({
                take: limit,
                skip: offset,
                where: finalWhere,
                select,
                orderBy: orderBy || null
            })
        ])

        return { total, limit, offset, data }
    }
}