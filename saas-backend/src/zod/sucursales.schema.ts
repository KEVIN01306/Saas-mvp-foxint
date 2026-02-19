import { z } from "zod";

export const sucursalSchema = z.object({
    id: z.string().max(36),
    negocio_id: z.string().max(36),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    es_principal: z.boolean(),
    direccion: z.string().min(3, "La direccion debe tener al menos 3 caracteres"),
});

export const sucursalCrearSchema = sucursalSchema.omit({ id: true, es_principal: true });

export const sucursalActualizarSchema = sucursalSchema.omit({ id: true, es_principal: true });