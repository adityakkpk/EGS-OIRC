import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sponsorRegistrationRoutes from './routes/sponsorRegistrationRoutes.js';
import conferenceRegistrationRoutes from './routes/conferenceRegistrationRoutes.js';
import speakerRoutes from './routes/speakerRoutes.js';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use('/api/conference', conferenceRegistrationRoutes);
app.use('/api/sponsor', sponsorRegistrationRoutes);
app.use('/api/speaker', speakerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    success: false
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
