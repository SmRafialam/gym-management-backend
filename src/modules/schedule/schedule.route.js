/**
 * @swagger
 * tags:
 *   name: Class Schedule
 *   description: User authentication and role-based access
 */

import express from 'express';
import * as scheduleController from '../schedule/schedule.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';

const router = express.Router();
/**
 * @swagger
 * /schedule/create:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               trainerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create', verifyToken, authorizeRoles('Admin'), scheduleController.createSchedule);

/**
 * @swagger
 * /schedule/book-class:
 *   post:
 *     summary: Book a class for a user
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class booked successfully
 *       400:
 *         description: Invalid schedule or user ID
 *       403:
 *         description: User not authorized to book this class
 */
router.post('/book-class', verifyToken, authorizeRoles('Trainee'), scheduleController.bookClass);

/**
 * @swagger
 * /schedule/assign-trainer:
 *   post:
 *     summary: Assign a trainer to a schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *               trainerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trainer assigned successfully
 *       400:
 *         description: Invalid schedule or trainer ID
 *       404:
 *         description: Schedule or trainer not found
 */
router.post('/assign-trainer', verifyToken, authorizeRoles('Admin', 'Trainer'), scheduleController.assignTrainer);

export default router;
