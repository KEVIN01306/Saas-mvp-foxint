import { Router } from "express";
import clienteController from "../controllers/cliente.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validarMiddleware from "../middlewares/validar.middleware.js";
import { clienteActualizarSchema, clienteCrearSchema } from "../zod/clientes.schema.js";
import { paginacionQuerySchema } from "../zod/paginacion.query.schema.js";

const router = Router()

router.use(authMiddleware.protegerRuta)
router.use(authMiddleware.verificarRol(['ADMIN', 'VENDEDOR']))

router.get('/',
    validarMiddleware.ValidarQuery(paginacionQuerySchema),
    clienteController.obtenerClientes
);
router.get('/:id',
    clienteController.obtenerCliente
);
router.post('/',
    validarMiddleware.validarEsquema(clienteCrearSchema),
    clienteController.crearCliente
);
router.put('/:id',
    validarMiddleware.validarEsquema(clienteActualizarSchema),
    clienteController.actualizarCliente
);

export default router
