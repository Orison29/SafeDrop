const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const fileRoutes = require('./routes/file-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();

//Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL in dev
  credentials: true // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);

// Serve uploaded files statically
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// Routes
app.use('/api/files',fileRoutes);

module.exports = app;
