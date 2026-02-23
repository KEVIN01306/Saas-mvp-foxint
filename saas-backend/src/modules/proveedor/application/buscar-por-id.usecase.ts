import AppError from "@shared/errors/AppError.js";
import { DatabaseError } from "@shared/database/errors/DatabaseError.js";
import type { ProveedorObtenidoDetalle } from "../domain/proveedor.entity.js";
import type { ProveedorRepository } from "../domain/proveedor.repository.js";

export class BuscarPorIdUseCase {
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ) { }

    async execute(id: string, negocio_id: string): Promise<ProveedorObtenidoDetalle> {
        try {
            const proveedor = await this.proveedorRepository.buscarPorId(id, negocio_id);

            if (!proveedor) {
                throw new AppError('No se encontró el proveedor', 'DATA_NOT_FOUND', 404);
            }

            return proveedor;
        } catch (error) {
            if (error instanceof AppError) throw error;

            if (error instanceof DatabaseError) {
                throw new AppError('Error en base de datos', 'DATABASE_ERROR', 500)
            }

            throw error
        }
    }
}
