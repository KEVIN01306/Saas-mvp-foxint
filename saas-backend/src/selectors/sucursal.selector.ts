import { Prisma } from "@prisma/client";

export const sucursalListaSelector = Prisma.validator<Prisma.sucursalesSelect>()({
    id: true,
    nombre: true,
    es_principal: true,
    direccion: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true
        }
    }
})

export const sucursalDetalleSelector = Prisma.validator<Prisma.sucursalesSelect>()({
    id: true,
    nombre: true,
    es_principal: true,
    direccion: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true
        }
    }
})