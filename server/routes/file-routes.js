// fileRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const file = require('../models/file-model')
const authMiddleware = require('../middleware/auth-middleware');
const {getUserFiles} = require('../controllers/file-controller');


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

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = new file({
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user.userId
        });

        await newFile.save();

        res.status(201).json({
            message: 'File uploaded successfully',
            file: newFile
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Get /api/files - Get files uploaded by loggedin user
router.get('/',authMiddleware, getUserFiles);

module.exports = router;