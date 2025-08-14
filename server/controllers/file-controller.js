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

module.exports = {getUserFiles};
