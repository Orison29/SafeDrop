const Folder = require("../models/folder-model");
const File = require("../models/file-model");
const s3 = require("../config/aws");

// Create a new folder
const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const folder = new Folder({
      name: name.trim(),
      createdBy: req.user.uuid,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    console.error("Error creating folder:", err);
    res.status(500).json({ message: "Failed to create folder" });
  }
};

//Get all folders for logged-in user
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ createdBy: req.user.uuid }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ message: "Failed to fetch folders" });
  }
};

//Cascade delete folder + its files
const deleteFolder = async (req, res) => {
  try {
    const { uuid } = req.params;

    const folder = await Folder.findOne({ uuid, createdBy: req.user.uuid });
    if (!folder) return res.status(404).json({ message: "Folder not found" });

    // 1) Find all files in this folder
    const files = await File.find({ folder: uuid, uploadedBy: req.user.uuid });

    // 2) Delete files from S3
    if (files.length > 0) {
      const objects = files.map(f => ({ Key: f.fileUrl }));
      console.log("Deleting from S3:", objects);  // 👈 add this
      await s3.deleteObjects({
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: { Objects: objects },
      }).promise();
    }

    // 3) Delete file records from DB
    await File.deleteMany({ folder: uuid, uploadedBy: req.user.uuid });

    // 4) Delete the folder itself
    await folder.deleteOne();

    res.json({ message: "Folder and all its files deleted successfully" });
  } catch (err) {
    console.error("Error deleting folder:", err);
    res.status(500).json({ message: "Failed to delete folder" });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
};
