import type { proveedores, negocios } from "@prisma/client";
import type { ProveedorObtenidoDetalle, ProveedorSimple } from "../../domain/proveedor.entity.js";

type PrismaProveedorConNegocio = proveedores & {
    negocios: negocios;
};

export class ProveedorMapper {
    static mapDetalle(proveedor: PrismaProveedorConNegocio): ProveedorObtenidoDetalle {
        return {
            id: proveedor.id,
            nombre: proveedor.nombre,
            telefono: proveedor.telefono,
            negocio: {
                id: proveedor.negocios.id,
                nombre_comercial: proveedor.negocios.nombre_comercial,
            },
        };
    }

    static mapSimple(proveedor: PrismaProveedorConNegocio): ProveedorSimple {
        return {
            id: proveedor.id,
            nombre: proveedor.nombre,
            telefono: proveedor.telefono,
            negocio: {
                id: proveedor.negocios.id,
                nombre_comercial: proveedor.negocios.nombre_comercial,
            },
        };
    }
}
