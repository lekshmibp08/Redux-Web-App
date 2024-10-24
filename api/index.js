import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 20000 })
    .then(() => {
        console.log('Connected to MongoDB');;        
    }).catch((error) => {
        console.log(error);
        
    })


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log(`Server Running on http://localhost:3000`);
    
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})