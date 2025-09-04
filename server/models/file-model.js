const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FileSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // AWS S3 / cloud storage path
  },
  size: {
    type: Number, // bytes
  },
  type: {
    type: String, // mime type
  },
  folder: {
    type: String, // stores folder uuid
    default: null, // null means root
  },
  uploadedBy: {
    type: String, // stores user uuid
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", FileSchema);
