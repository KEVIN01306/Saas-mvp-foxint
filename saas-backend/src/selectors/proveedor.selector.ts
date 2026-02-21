

export const proveedorListaSelector = {
    id: true,
    nombre: true,
    telefono: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true,
        }
    }
}

export const proveedorDetalleSelector = {
    id: true,
    nombre: true,
    telefono: true,
    negocios: {
        select: {
            id: true,
            nombre_comercial: true,
        }
    }
}