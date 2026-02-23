export interface Proveedor {
    id: string;
    negocio_id: string;
    nombre: string;
    telefono: string | null;
}

export interface ProveedorObtenidoDetalle extends Omit<Proveedor, "negocio_id"> {
    negocio: {
        id: string;
        nombre_comercial: string;
    };
}

export interface ProveedorSimple extends Pick<Proveedor, "id" | "nombre" | "telefono"> {
    negocio: {
        id: string;
        nombre_comercial: string;
    }
}

export interface ProveedorCrear extends Omit<Proveedor, "id" | "negocio_id"> { }

export interface ProveedorActualizar extends Partial<ProveedorCrear> { }
