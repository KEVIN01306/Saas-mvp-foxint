import { PrismaSucursalRepository } from "./infrastructure/prisma-sucursal.repository.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { BuscarPorNegocioUseCase } from "./application/buscar-por-negocio.usecase.js";
import { CrearSucursalUseCase } from "./application/crear.usecase.js";
import { ActualizarSucursalUseCase } from "./application/actualizar.usecase.js";
import { EliminarSucursalUseCase } from "./application/eliminar.usecase.js";
import { SucursalController } from "./presentation/sucursal.controller.js";
import prisma from "@infrastructure/config/prisma.js";

const sucursalRepository = new PrismaSucursalRepository(prisma);

const buscarPorIdUseCase = new BuscarPorIdUseCase(sucursalRepository);
const buscarPorNegocioUseCase = new BuscarPorNegocioUseCase(sucursalRepository);
const crearSucursalUseCase = new CrearSucursalUseCase(sucursalRepository);
const actualizarSucursalUseCase = new ActualizarSucursalUseCase(sucursalRepository);
const eliminarSucursalUseCase = new EliminarSucursalUseCase(sucursalRepository);

export const sucursalController = new SucursalController(
    buscarPorIdUseCase,
    buscarPorNegocioUseCase,
    crearSucursalUseCase,
    actualizarSucursalUseCase,
    eliminarSucursalUseCase
);
