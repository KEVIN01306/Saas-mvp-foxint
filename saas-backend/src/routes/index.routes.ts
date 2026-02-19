import { Router } from "express";
import path from "path";
import express from "express";
import { errorMiddleware } from "../middlewares/error.middleware.js";

const router = Router();

router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
router.use('/auth', (await import('./auth.routes.js')).default)
router.use('/usuarios', (await import('./usuario.routes.js')).default)
router.use('/negocios', (await import('./negocio.routes.js')).default)
router.use('/sucursales', (await import('./sucursal.routes.js')).default)

router.use(errorMiddleware)

export default router;
