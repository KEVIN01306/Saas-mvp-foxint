import type { Paginated } from "@shared/domain/paginated.js";
import type { SucursalActualizar, SucursalCrear, SucursalCrearPersistencia, SucursalObtenidoDetalle, SucursalSimple } from "./sucursal.entity.js";

export interface SucursalRepository {
    crear(data: SucursalCrearPersistencia, negocio_id: string): Promise<SucursalObtenidoDetalle>;
    actualizar(id: string, negocio_id: string, data: SucursalActualizar): Promise<SucursalObtenidoDetalle>;
    eliminar(id: string, negocio_id: string): Promise<void>;
    buscarPorId(id: string, negocio_id: string): Promise<SucursalObtenidoDetalle | null>;
    buscarPorNegocio(params: { negocio_id: string; page: number; perPage: number }): Promise<Paginated<SucursalSimple>>;
    contarPorNegocio(negocio_id: string): Promise<number>;
}
