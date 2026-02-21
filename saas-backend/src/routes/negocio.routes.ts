import { Router } from "express";
import negocioController from "../controllers/negocio.crontroller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { FileUploadMiddleware } from "../middlewares/upload.middleware.js";
import validarMiddleware from "../middlewares/validar.middleware.js";
import { negocioActualizarSchema, negocioCrearSchema } from "../zod/negocios.schema.js";

const router = Router();

router.use(authMiddleware.protegerRuta)

router.get("/:id",
    negocioController.obtenerNegocio
);
router.post("/",
    validarMiddleware.validarEsquema(negocioCrearSchema),
    FileUploadMiddleware.single('logo', '/negocios'),
    negocioController.crearNegocio
);

router.use(authMiddleware.verificarRol(['ADMIN']))

router.put("/:id",
    validarMiddleware.validarEsquema(negocioActualizarSchema),
    FileUploadMiddleware.single('logo', '/negocios'),
    negocioController.actualizarNegocio
);

export default router;