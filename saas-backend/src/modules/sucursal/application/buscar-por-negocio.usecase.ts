import AppError from "@shared/errors/AppError.js";
import { DatabaseError } from "@shared/database/errors/DatabaseError.js";
import type { Paginated } from "@shared/domain/paginated.js";
import type { SucursalSimple } from "../domain/sucursal.entity.js";
import type { SucursalRepository } from "../domain/sucursal.repository.js";

export class BuscarPorNegocioUseCase {
    constructor(
        private readonly sucursalRepository: SucursalRepository
    ) { }

    async execute(params: { negocio_id: string; page: number; perPage: number }): Promise<Paginated<SucursalSimple>> {
        try {
            return await this.sucursalRepository.buscarPorNegocio(params);
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new AppError('Error en base de datos', 'DATABASE_ERROR', 500)
            }

            throw error
        }
    }
}
