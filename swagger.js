// swagger.js

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and role-based access
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/{role}:
 *   get:
 *     summary: Get users by role
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *         description: Role to filter users by (e.g., Admin, Trainer, Member)
 *     security:
 *       - bearerAuth: []  # Add this if you are using token-based auth
 *     responses:
 *       200:
 *         description: List of users with the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User's name
 *                   email:
 *                     type: string
 *                     description: User's email
 *                   role:
 *                     type: string
 *                     description: User's role
 *       403:
 *         description: Forbidden - Only Admins can access this endpoint
 */
/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Manage class schedules, bookings, and trainer assignments
 */

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
 *                 description: Name of the class
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Start time of the class
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: End time of the class
 *               trainerId:
 *                 type: string
 *                 description: ID of the trainer for the class
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Invalid input
 */

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
 *                 description: ID of the schedule to book
 *               userId:
 *                 type: string
 *                 description: ID of the user who is booking the class
 *     responses:
 *       200:
 *         description: Class booked successfully
 *       400:
 *         description: Invalid schedule or user ID
 *       403:
 *         description: User not authorized to book this class
 */

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
 *                 description: ID of the schedule to assign a trainer to
 *               trainerId:
 *                 type: string
 *                 description: ID of the trainer to assign
 *     responses:
 *       200:
 *         description: Trainer assigned successfully
 *       400:
 *         description: Invalid schedule or trainer ID
 *       404:
 *         description: Schedule or trainer not found
 */
