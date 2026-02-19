import type { Prisma } from "@prisma/client";


export const clienteListaSelector: Prisma.clientesSelect = {
    id: true,
    nombre: true,
    telefono: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true
        }
    }
}

export const clienteDetalleSelector: Prisma.clientesSelect = {
    id: true,
    nombre: true,
    telefono: true,
    email: true,
    direccion_entrega: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true
        }
    }
}