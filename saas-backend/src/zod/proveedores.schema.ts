import { z } from 'zod'

export const proveedoresSchema = z.object({
    id: z.string().min(36).max(36),
    negocio_id: z.string().min(36).max(36),
    nombre: z.string().max(100),
    telefono: z.string().max(20)
})

export const proveedorCrearSchema = proveedoresSchema.omit({ id: true, negocio_id: true })

export const proveedorActualizarSchema = proveedoresSchema.omit({ id: true, negocio_id: true })