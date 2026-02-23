import type { NegocioActualizar, NegocioCrear, NegocioObtenidoDetalle } from "./negocio.entity.js";

export interface NegocioRepository {
    crear(data: NegocioCrear & { logo_url: string | null }): Promise<NegocioObtenidoDetalle>;
    actualizar(id: string, data: NegocioActualizar): Promise<NegocioObtenidoDetalle>;
    buscarPorId(id: string): Promise<NegocioObtenidoDetalle | null>;
    buscarPorWaId(wa_id: string): Promise<NegocioObtenidoDetalle | null>;
}
