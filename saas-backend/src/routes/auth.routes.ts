import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login',
    AuthController.login
);
router.post('/refresh',
    AuthController.refresh
);
router.get("/me",
    authMiddleware.protegerRuta,
    AuthController.me
);

export default router;