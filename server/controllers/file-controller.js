const path = require('path');
const File = require('../models/file-model');

const getUserFiles = async (req,res) => {
    try{
        const filesFound = await File.find({uploadedBy:req.user.userId}).sort({uploadedAt:-1});
        res.json({filesFound});
    }catch(err){
         console.error("Error fetching files:",err);
         res.status(500).json({
            message: "Server error while fetching files"
         });
    }
}
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = new File({
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
} 

const downloadFile = async (req,res) => {
    try {

        const fileDoc = await File.findById(req.params.id);

        if(!fileDoc){
            return res.status(404).json({message:'File not found'});
        }

        //check if the logged in user is the owner
        if(fileDoc.uploadedBy.toString() !== req.user.userId){
            return res.status(403).json({message:'Access denied'});
        }

        const filePath = path.join(__dirname,'../uploads',fileDoc.filename);
        res.download(filePath,fileDoc.originalname);

    } catch (error) {
        console.error('Error downloading file:',error);
        res.status(500).json({message:'Server error while downloading file'});
    }
}

module.exports = {getUserFiles,uploadFile,downloadFile};
