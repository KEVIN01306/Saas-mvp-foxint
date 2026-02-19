import { Prisma } from "@prisma/client";

export const usuarioListaSelector: Prisma.usuariosSelect = {
    id: true,
    nombre: true,
    //correo: true,
    rol: true,
};

export const usuarioDetalleSelector: Prisma.usuariosSelect = {
    id: true,
    nombre: true,
    //correo:             true,
    telefono: true,
    rol: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true,
        }
    }
}
