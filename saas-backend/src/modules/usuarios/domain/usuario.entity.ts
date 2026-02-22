


export interface Usuario {
    id: string,
    nombre: string,
    password_hash: string | null,
    telefono: string,
    rol: string,
    activo: boolean | null,
    verificado: boolean | null,
    negocio_id: string,
}

export interface UsuarioObtenidoDetalle extends Omit<Usuario, "password_hash" | "negocio_id" | "activo"> {
    negocio: {
        id: string,
        nombre_comercial: string
    }
}

export interface UsuarioCrear extends Omit<Usuario, "id" | "activo" | "verificado"> { }

export interface UsuarioActualizar extends Omit<Usuario, "id" | "activo" | "password_hash" | "verificado"> { }