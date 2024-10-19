import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'


dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');;        
    }).catch((error) => {
        console.log(error);
        
    })


const app = express();

app.listen(3000, () => {
    console.log(`Server Running on http://localhost:3000`);
    
})

app.use('/api/user', userRoutes);