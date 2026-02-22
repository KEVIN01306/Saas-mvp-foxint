import { Router } from "express";
import { ValidarMiddleware } from "../../../app/middlewares/ValidarMiddleware.js";
import { AuthMiddleware } from "../../../app/middlewares/AuthMiddleware.js";
import { usuarioController } from "../usuario.module.js";

const router = Router()

const validarMiddleware = new ValidarMiddleware()
const authMiddleware = new AuthMiddleware()

router.use(authMiddleware.protegerRuta)
router.use(authMiddleware.verificarRol(['ADMIN']))

router.get('/',
    usuarioController.buscarPorNegocio
)


router.get('/:id', 
    usuarioController.buscarPorId
)

export default router;