
export interface UsuarioAutentificacion {
    id: string,
    nombre: string,
    password_hash: string | null,
    telefono: string,
    rol: string,
    activo: boolean | null,
    negocio_id: string,
}

export interface AuthRespository {
    buscarPorTelefono(telefono: UsuarioAutentificacion['telefono']): Promise<UsuarioAutentificacion | null>
}