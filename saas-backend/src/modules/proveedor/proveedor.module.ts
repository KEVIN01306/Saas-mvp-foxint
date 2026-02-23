import { PrismaProveedorRepository } from "./infrastructure/prisma-proveedor.repository.js";
import { BuscarPorIdUseCase } from "./application/buscar-por-id.usecase.js";
import { BuscarPorNegocioUseCase } from "./application/buscar-por-negocio.usecase.js";
import { CrearProveedorUseCase } from "./application/crear.usecase.js";
import { ActualizarProveedorUseCase } from "./application/actualizar.usecase.js";
import { EliminarProveedorUseCase } from "./application/eliminar.usecase.js";
import { ProveedorController } from "./presentation/proveedor.controller.js";
import prisma from "@infrastructure/config/prisma.js";

const proveedorRepository = new PrismaProveedorRepository(prisma);

const buscarPorIdUseCase = new BuscarPorIdUseCase(proveedorRepository);
const buscarPorNegocioUseCase = new BuscarPorNegocioUseCase(proveedorRepository);
const crearProveedorUseCase = new CrearProveedorUseCase(proveedorRepository);
const actualizarProveedorUseCase = new ActualizarProveedorUseCase(proveedorRepository);
const eliminarProveedorUseCase = new EliminarProveedorUseCase(proveedorRepository);

export const proveedorController = new ProveedorController(
    buscarPorIdUseCase,
    buscarPorNegocioUseCase,
    crearProveedorUseCase,
    actualizarProveedorUseCase,
    eliminarProveedorUseCase
);
