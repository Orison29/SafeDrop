const s3 = require("../config/aws");
const File = require("../models/file-model");
const { v4: uuidv4 } = require("uuid");

// Generate pre-signed URL for upload
const getUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType, folderUuid } = req.body;
    const fileUuid = uuidv4();

    const key = `${req.user.uuid}/${fileUuid}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 300, // 5 minutes
      ContentType: fileType,
      ACL: "private",
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

    res.json({ uploadUrl, fileUuid, key });
  } catch (err) {
    console.error("Error generating upload URL:", err);
    res.status(500).json({ message: "Error generating upload URL" });
  }
};

// Step 2: Confirm file upload and save metadata
const confirmUpload = async (req, res) => {
  try {
    const { fileUuid, fileName, fileType, folderUuid, key } = req.body;

    if (!fileUuid || !fileName || !fileType || !key) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFile = new File({
      uuid: fileUuid,
      name: fileName,
      mimetype: fileType,
      fileUrl: key, 
      uploadedBy: req.user.uuid,
      folder: folderUuid || null,
    });

    await newFile.save();

    res.status(201).json({ message: "File metadata saved", file: newFile });
  } catch (err) {
    console.error("Error confirming upload:", err);
    res.status(500).json({ message: "Error confirming upload" });
  }
};


// List files (optionally filter by folder)
const listFiles = async (req, res) => {
  try {
    const query = { uploadedBy: req.user.uuid };
    if (req.query.folderUuid) {
      query.folder = req.query.folderUuid;
    }

    const files = await File.find(query).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid, uploadedBy: req.user.uuid });
    if (!file) return res.status(404).json({ message: "File not found" });

    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.fileUrl,  // 👈 use fileUrl
      })
      .promise();

    await file.deleteOne();
    res.json({ message: "File deleted" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ message: "Error deleting file" });
  }
};

// Generate pre-signed URL for download
const getDownloadUrl = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid, uploadedBy: req.user.uuid });
    if (!file) return res.status(404).json({ message: "File not found" });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.fileUrl,  // 👈 use fileUrl
      Expires: 300,
    };

    const downloadUrl = await s3.getSignedUrlPromise("getObject", params);
    res.json({ downloadUrl });
  } catch (err) {
    console.error("Error generating download URL:", err);
    res.status(500).json({ message: "Error generating download URL" });
  }
};

module.exports = {
  getUploadUrl,
  confirmUpload,
  listFiles,
  deleteFile,
  getDownloadUrl,
};
