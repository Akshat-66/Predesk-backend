const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
dotenv.config();
const app = express();


// Middleware
app.use(express.json());


//config
connectDB();


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
})

