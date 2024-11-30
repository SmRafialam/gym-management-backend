import express from 'express';
import * as AuthController from "./auth.controller.js";
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router()

router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.get('/:role', verifyToken, authorizeRoles('Admin'), AuthController.getUsersByRole); // Admin can view users by role

export default router;
