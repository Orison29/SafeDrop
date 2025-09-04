// controllers/fileController.js
const { File } = require("../models/File");

const uploadFile = async (req, res) => {
  try {
    const { name, size, type, folderUuid } = req.body;

    const file = new File({
      name,
      size,
      type,
      folder: folderUuid || null, // root if not in a folder
      fileUrl: req.fileUrl,       // set by S3 upload middleware
      uploadedBy: req.user.uuid,
    });

    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload file", details: err.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.uuid });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files", details: err.message });
  }
};

const getFilesInFolder = async (req, res) => {
  try {
    const { folderUuid } = req.params;

    const files = await File.find({
      folder: folderUuid,
      uploadedBy: req.user.uuid,
    });

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch folder files", details: err.message });
  }
};

const moveFile = async (req, res) => {
  try {
    const { fileUuid } = req.params;
    const { folderUuid } = req.body;

    const file = await File.findOneAndUpdate(
      { uuid: fileUuid, uploadedBy: req.user.uuid },
      { folder: folderUuid || null },
      { new: true }
    );

    if (!file) return res.status(404).json({ error: "File not found" });

    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Failed to move file", details: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { uuid } = req.params;

    const file = await File.findOneAndDelete({
      uuid,
      uploadedBy: req.user.uuid,
    });

    if (!file) return res.status(404).json({ error: "File not found" });

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete file", details: err.message });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  getFilesInFolder,
  moveFile,
  deleteFile,
};
