import { PrismaClient } from "@prisma/client";
import { PrismaUsuarioRepository } from "./infrastructure/prisma.usuario.repository.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { UsuarioController } from "./presentation/usuario.controller.js";
import { BuscarPorNegocioUseCase } from "./application/buscar-por-negocio.usecase.js";
import { CrearUsuarioUseCase } from "./application/crear.usecase.js";



const prisma = new PrismaClient();

const usuarioRepositoy = new PrismaUsuarioRepository(prisma);

const buscarPorIdUseCase = new BuscarPorIdUseCase(usuarioRepositoy);
const buscarPorNegocioUseCase = new BuscarPorNegocioUseCase(usuarioRepositoy);
const crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepositoy)


export const usuarioController = new UsuarioController(
    buscarPorIdUseCase,
    buscarPorNegocioUseCase,
    crearUsuarioUseCase
);

