import type { UsuarioAutentificacion } from "./auth-user.entity.js";

export interface AuthRepository {
    buscarPorTelefono(telefono: UsuarioAutentificacion['telefono']): Promise<UsuarioAutentificacion | null>
}