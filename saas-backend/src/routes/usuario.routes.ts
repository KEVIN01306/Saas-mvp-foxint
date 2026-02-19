import { Router } from "express";
import usuariosController from "../controllers/usuario.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import ValidarMiddleware from "../middlewares/validar.middleware.js";
import { usuarioActualizarSchema, usuariosCrearSchema } from "../zod/usuarios.schema.js";

const router = Router()

router.use(authMiddleware.protegerRuta)
router.use(authMiddleware.verificarRol(['ADMIN']))

router.get("/",
    usuariosController.obtenerUsuarios
);
router.get("/:id",
    usuariosController.obtenerUsuario
);
router.post("/",
    ValidarMiddleware.validarEsquema(usuariosCrearSchema),
    usuariosController.crearUsuario
);
router.put("/:id",
    ValidarMiddleware.validarEsquema(usuarioActualizarSchema),
    usuariosController.actualizarUsuario
);
router.delete("/:id",
    usuariosController.eliminarUsuario
);


export default router