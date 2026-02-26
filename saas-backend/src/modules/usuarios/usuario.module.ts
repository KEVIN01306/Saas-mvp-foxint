import { PrismaUsuarioRepository } from "./infrastructure/prisma-usuario.repository.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { UsuarioController } from "./presentation/usuario.controller.js";
import { BuscarPorNegocioUseCase } from "./application/buscar-por-negocio.usecase.js";
import { CrearUsuarioUseCase } from "./application/crear.usecase.js";
import { ActualizarUsuarioUseCase } from "./application/actualizar.usecase.js";
import { EliminarUsuarioUseCase } from "./application/eliminar.usecase.js";
import prisma from "@infrastructure/config/prisma.js";
import { Argon2HashProvider } from "@shared/infrastructure/argon2-hash.provider.js";


const usuarioRepository = new PrismaUsuarioRepository(prisma);
const hashProvider = new Argon2HashProvider()

const buscarPorIdUseCase = new BuscarPorIdUseCase(usuarioRepository);
const buscarPorNegocioUseCase = new BuscarPorNegocioUseCase(usuarioRepository);
const crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepository, hashProvider)
const actualizarUsuarioUseCase = new ActualizarUsuarioUseCase(usuarioRepository)
const eliminarUsuarioUseCase = new EliminarUsuarioUseCase(usuarioRepository)

export const usuarioController = new UsuarioController(
    buscarPorIdUseCase,
    buscarPorNegocioUseCase,
    crearUsuarioUseCase,
    actualizarUsuarioUseCase,
    eliminarUsuarioUseCase
);