const express = require("express");
const router = express.Router();
const {createFolder, getFolders, deleteFolder} = require("../controllers/folder-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);
router.delete("/:uuid", authMiddleware, deleteFolder);

module.exports = router;

