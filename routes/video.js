const express = require('express');
const videoController = require("../controllers/videoController");
const isAuth = require("../middlewares/is_auth");
const router = express.Router();

router.post("/upload-video", isAuth, videoController.uploadVideo);
router.post("/add-comment", isAuth, videoController.addComment);
router.post("/update-views", isAuth, videoController.incrementViews);
router.post("/like-video", isAuth, videoController.likeVideo);
router.post("/delete-video", isAuth, videoController.deleteVideo);
router.post("/get-likes", isAuth, videoController.getLikes);
router.post("/get-comments", isAuth, videoController.getComments);
router.post("/get-video-details", isAuth, videoController.getvideoDetails);

module.exports = router;