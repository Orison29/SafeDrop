// controllers/folderController.js
const { Folder } = require("../models/Folder");

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    const folder = new Folder({
      name,
      createdBy: req.user.uuid, // from auth middleware
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create folder", details: err.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ createdBy: req.user.uuid });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch folders", details: err.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { uuid } = req.params;

    const folder = await Folder.findOneAndDelete({
      uuid,
      createdBy: req.user.uuid,
    });

    if (!folder) return res.status(404).json({ error: "Folder not found" });

    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete folder", details: err.message });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
};
