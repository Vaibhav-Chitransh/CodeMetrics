import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import authRoutes from './routes/auth.route.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port: ${PORT}`)
});