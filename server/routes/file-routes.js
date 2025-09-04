// // fileRoutes.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const File = require('../models/file-model')
// const authMiddleware = require('../middleware/auth-middleware');
// const {getUserFiles,uploadFile,downloadFile,deleteFile} = require('../controllers/file-controller');


// const router = express.Router();

// // Multer storage config
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // store in uploads folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });

// //Routes
// router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
// router.get('/',authMiddleware, getUserFiles);
// router.get('/download/:id',authMiddleware,downloadFile);
// router.delete('/delete/:id',authMiddleware,deleteFile);

// module.exports = router;

// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, fileController.uploadFile);
router.get("/", authMiddleware, fileController.getFiles);
router.get("/folder/:folderUuid", authMiddleware, fileController.getFilesInFolder);
router.put("/:fileUuid/move", authMiddleware, fileController.moveFile);
router.delete("/:uuid", authMiddleware, fileController.deleteFile);

module.exports = router;
