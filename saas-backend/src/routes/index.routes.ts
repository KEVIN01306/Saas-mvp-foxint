import { Router } from "express";
import path from "path";
import express from "express";
import { errorMiddleware } from "../middlewares/error.middleware.js";

const router = Router();

router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
router.use('/auth', (await import('../modules/auth/presentation/auth.routes.js')).default)
router.use('/usuarios', (await import('../modules/usuarios/presentation/usuario.routes.js')).default)
router.use('/negocios', (await import('./negocio.routes.js')).default)
router.use('/sucursales', (await import('./sucursal.routes.js')).default)
router.use('/clientes', (await import('./cliente.routes.js')).default)
router.use('/proveedores', (await import('./proveedor.routes.js')).default)

router.use(errorMiddleware)

export default router;
