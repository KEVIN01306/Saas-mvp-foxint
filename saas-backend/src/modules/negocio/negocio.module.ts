import { PrismaNegocioRepository } from "./infrastructure/prisma-negocio.repository.js";
import { CrearNegocioUseCase } from "./application/crear.usecase.js";
import { ActualizarNegocioUseCase } from "./application/actualizar.usecase.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { NegocioController } from "./presentation/negocio.controller.js";
import prisma from "@infrastructure/config/prisma.js";

const negocioRepository = new PrismaNegocioRepository(prisma);

const crearNegocioUseCase = new CrearNegocioUseCase(negocioRepository);
const actualizarNegocioUseCase = new ActualizarNegocioUseCase(negocioRepository);
const buscarPorIdUseCase = new BuscarPorIdUseCase(negocioRepository);

export const negocioController = new NegocioController(
    crearNegocioUseCase,
    actualizarNegocioUseCase,
    buscarPorIdUseCase
);
