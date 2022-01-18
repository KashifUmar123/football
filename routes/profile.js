const express = require('express');
var path = require("path");
// const profileController = require("../controllers/ProfileController");
const profileController = require(path.join(__dirname, '../controllers/profileController'));
const isAuth = require("../middlewares/is_auth");

const router = express.Router();

router.post("/update-image", isAuth, profileController.updateImage);
router.post("/update-bio", isAuth, profileController.updateBio);
router.post("/update-instagram", isAuth, profileController.updateInstagram);
router.post("/update-youtube", isAuth, profileController.updateYoutube);
router.post("/follow", isAuth, profileController.follow);
router.get("/get-user-details", isAuth, profileController.getUserDetails);
router.get("/get-user-videos", isAuth, profileController.getUserVideos);

module.exports = router;