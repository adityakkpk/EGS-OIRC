import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sponsorRegistrationRoutes from './routes/sponsorRegistrationRoutes.js';
import conferenceRegistrationRoutes from './routes/conferenceRegistrationRoutes.js';
import speakerRoutes from './routes/speakerRoutes.js';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Database connection
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
