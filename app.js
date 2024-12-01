import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/database.js';
import authRoute from './src/modules/auth/auth.route.js'
import scheduleRoute from './src/modules/schedule/schedule.route.js';
import { errorHandler } from './src/middlewares/error.middleware.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import './swagger.js'; 

const app = express();
dotenv.config();

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      myapi: '3.0.0',
      info: {
        title: 'Gym Management API',
        version: '1.0.0',
        description: 'API documentation',
      },
      servers: [
        {
          url: 'http://localhost:8000',
        },
      ],
    },
    apis: ['./swagger.js'], 
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use('/schedule', scheduleRoute);
app.use(errorHandler);


export default app;