const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js')
const profileRoutes = require('./routes/profileRoutes.js')
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: 'https://predesk-frontend.vercel.app', // remove trailing slash
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT ${process.env.PORT}`)
})
