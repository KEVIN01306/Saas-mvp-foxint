import { Prisma } from "@prisma/client";

export const negocioListaSelector: Prisma.negociosSelect = {
    id: true,
    nombre_comercial: true,
    logo_url: true,
};

export const negocioDetalleSelector: Prisma.negociosSelect = {
    id: true,
    nombre_comercial: true,
    wa_id: true,
    nit_rut: true,
    logo_url: true,
    slogan: true,
    datos_facturacion_json: true,
    fecha_registro: true,
}