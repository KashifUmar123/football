const express = require('express');
const profileController = require("../controllers/ProfileController");
const isAuth = require("../middlewares/is_auth");

const router = express.Router();

router.post("/update-image", isAuth, profileController.updateImage);
router.post("/update-bio", isAuth, profileController.updateBio);
router.post("/update-instagram", isAuth, profileController.updateInstagram);
router.post("/update-youtube", isAuth, profileController.updateYoutube);

module.exports = router;