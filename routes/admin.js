const express = require("express");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const Multer = require("multer");

const multer = Multer({
    storage: Multer.memoryStorage()
});

const router = express.Router();

router.get("/", adminController.getLogin);
router.get("/login", adminController.getLogin);
router.post("/post-login", adminController.postLogin);

router.get("/home", adminAuth, adminController.getHome);

router.get("/audios", adminAuth, adminController.getAudios);
router.get("/audio-upload", adminAuth, adminController.getAudioUpload);

router.post("/post-audio", adminAuth, multer.single("file"), adminController.postAudio);
router.get("/post-delete-audio/:key", adminAuth, adminController.deleteAudio);

module.exports = router;