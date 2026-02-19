import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import sucursalController from "../controllers/sucursal.controller.js";
import validarMiddleware from "../middlewares/validar.middleware.js";
import { sucursalActualizarSchema, sucursalCrearSchema } from "../zod/sucursales.schema.js";

const router = Router()

router.use(authMiddleware.protegerRuta)

router.get("/",
    authMiddleware.verificarRol(['ADMIN', 'VENDEDOR']),
    sucursalController.obtenerSucursales
);
router.get("/:id",
    authMiddleware.verificarRol(['ADMIN', 'VENDEDOR']),
    sucursalController.obtenerSucursal
);
router.post("/",
    authMiddleware.verificarRol(['ADMIN']),
    validarMiddleware.validarEsquema(sucursalCrearSchema),
    sucursalController.crearSucursal
);
router.put("/:id",
    authMiddleware.verificarRol(['ADMIN']),
    validarMiddleware.validarEsquema(sucursalActualizarSchema),
    sucursalController.actualizarSucursal
);

export default router