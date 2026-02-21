import { z } from "zod";

export const comprasSchema = z.object({
    id: z.string().max(36),
    negocio_id: z.string().max(36),
    sucursal_id: z.string().max(36),
    proveedor_id: z.string().max(36),
    total: z.number(),
    fecha: z.date(),
})

export const comprasCrearSchema = comprasSchema.omit({ id: true, negocio_id: true, sucursal_id: true, proveedor_id: true, total: true, fecha: true })

export const comprasActualizarSchema = comprasSchema.omit({ id: true, negocio_id: true, sucursal_id: true, proveedor_id: true, total: true, fecha: true })