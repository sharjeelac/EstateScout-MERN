import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';


dotenv.config();

// Connect to database
connectDB();

const app = express()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// auth routes
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

// post routes
import postRoutes from './routes/post.routes.js';
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
