const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, folderController.createFolder);
router.get("/", authMiddleware, folderController.getFolders);
router.delete("/:uuid", authMiddleware, folderController.deleteFolder);

module.exports = router;

