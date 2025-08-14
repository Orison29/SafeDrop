// fileRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/file-model')
const authMiddleware = require('../middleware/auth-middleware');
const {getUserFiles,uploadFile,downloadFile} = require('../controllers/file-controller');


const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // store in uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// @desc Upload a file
// @route POST /api/files/upload
// @access Private
// Upload file

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

//Get /api/files - Get files uploaded by loggedin user
router.get('/',authMiddleware, getUserFiles);

//Get - Download files uploaded by the user
router.get('/download/:id',authMiddleware,downloadFile)

module.exports = router;