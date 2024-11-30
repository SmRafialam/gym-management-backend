import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/database.js';
import authRoute from './src/modules/auth/auth.route.js'
import scheduleRoute from './src/modules/schedule/schedule.route.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use('/schedule', scheduleRoute);


export default app;