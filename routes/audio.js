const express = require('express');
const audioController = require("../controllers/audioController");
const isAuth = require("../middlewares/is_auth");

const router = express.Router();

router.post("/upload-audio", isAuth, audioController.uploadAudio);
router.get("/get-audios", isAuth, audioController.getAudios);

module.exports = router;