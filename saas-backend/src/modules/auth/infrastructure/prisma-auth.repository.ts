import type { PrismaClient } from "@prisma/client";
import type { AuthRepository } from "../domain/auth.repository.js";
import type { UsuarioAutentificacion } from "../domain/auth-user.entity.js";


export class PrismaAuthRespository implements AuthRepository {

    constructor(private readonly db: PrismaClient) { }

    async buscarPorTelefono(
        telefono: UsuarioAutentificacion["telefono"]
    ): Promise<UsuarioAutentificacion | null> {

        const usuario = await this.db.usuarios.findUnique({
            where: { telefono }
        })

        if (!usuario) return null

        return {
            id: usuario.id,
            nombre: usuario.nombre,
            password_hash: usuario.password_hash,
            telefono: usuario.telefono,
            rol: usuario.rol,
            activo: usuario.activo,
            negocio_id: usuario.negocio_id,
        }
    }
}