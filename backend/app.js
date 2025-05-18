import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDatabase from './config/dbConnect.js';
import courserouter from './routers/courserouter.js';
import studentRouter from './routers/studentRouter.js';
import staffRouter from './routers/staffRouter.js';
import errorMiddleware from './middleware/errorMiddleware.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/v1', courserouter);
app.use('/api/v1', studentRouter);
app.use('/api/v1', staffRouter);

// Serve React frontend static files from 'frontend/dist'
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all handler to serve index.html for React Router (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
});
