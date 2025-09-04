const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FolderSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String, // stores user uuid
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Folder", FolderSchema);
