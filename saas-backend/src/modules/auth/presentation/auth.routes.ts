import { Router } from "express";
import { authController } from "../auth.module.js";
import { ValidarMiddleware } from "../../../app/middlewares/ValidarMiddleware.js";
import { loginSchema } from "./validators/login.schema.js";

const validarMiddleware = new ValidarMiddleware()

const router = Router();

router.post('/login',
    validarMiddleware.validarBody(loginSchema),
    authController.login)


export default router;