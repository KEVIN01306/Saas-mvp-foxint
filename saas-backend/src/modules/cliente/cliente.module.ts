import { PrismaClient } from "@prisma/client";
import { PrismaClienteRepository } from "./infrastructure/prisma-cliente.repository.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { BuscarPorNegocioUseCase } from "./application/buscar-por-negocio.usecase.js";
import { CrearClienteUseCase } from "./application/crear.usecase.js";
import { ActualizarClienteUseCase } from "./application/actualizar.usecase.js";
import { EliminarClienteUseCase } from "./application/eliminar.usecase.js";
import { ClienteController } from "./presentation/cliente.controller.js";
import prisma from "@infrastructure/config/prisma.js";

const clienteRepository = new PrismaClienteRepository(prisma);

const buscarPorIdUseCase = new BuscarPorIdUseCase(clienteRepository);
const buscarPorNegocioUseCase = new BuscarPorNegocioUseCase(clienteRepository);
const crearClienteUseCase = new CrearClienteUseCase(clienteRepository);
const actualizarClienteUseCase = new ActualizarClienteUseCase(clienteRepository);
const eliminarClienteUseCase = new EliminarClienteUseCase(clienteRepository);

export const clienteController = new ClienteController(
    buscarPorIdUseCase,
    buscarPorNegocioUseCase,
    crearClienteUseCase,
    actualizarClienteUseCase,
    eliminarClienteUseCase
);
