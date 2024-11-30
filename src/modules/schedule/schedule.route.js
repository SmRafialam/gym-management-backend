import express from 'express';
import * as scheduleController from '../schedule/schedule.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.post('/create', verifyToken, authorizeRoles('Admin'), scheduleController.createSchedule);
router.post('/book-class', verifyToken, authorizeRoles('Admin','Trainer'), scheduleController.bookClass);
// router.get('/schedules/:scheduleId', scheduleController.getScheduleDetails);

export default router;
