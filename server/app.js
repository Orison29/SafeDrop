const express = require('express');
const fileRoutes = require('./routes/file-routes');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth-routes');

const app = express();

//Middlewares
app.use(cors);
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);

// Serve uploaded files statically
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// Routes
app.use('api/files',fileRoutes);

module.exports = app;
