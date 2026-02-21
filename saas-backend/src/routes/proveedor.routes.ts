import { Router } from "express";
import proveedorController from "../controllers/proveedor.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validarMiddleware from "../middlewares/validar.middleware.js";
import { proveedorActualizarSchema, proveedorCrearSchema } from "../zod/proveedores.schema.js";
import { paginacionQuerySchema } from "../zod/paginacion.query.schema.js";

const router = Router();

router.use(authMiddleware.protegerRuta);
router.use(authMiddleware.verificarRol(['ADMIN']));

router.get('/',
    validarMiddleware.ValidarQuery(paginacionQuerySchema),
    proveedorController.obtenerProveedores
);
router.get('/:id',
    proveedorController.obtenerProveedor
);
router.post('/',
    validarMiddleware.validarEsquema(proveedorCrearSchema),
    proveedorController.crearProveedor
);
router.put('/:id',
    validarMiddleware.validarEsquema(proveedorActualizarSchema),
    proveedorController.actualizarProveedor
);

export default router;