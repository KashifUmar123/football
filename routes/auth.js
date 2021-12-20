const express = require('express');
const authContoller = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authContoller.signup);
router.post("/login", authContoller.login);
router.post("/check-email", authContoller.checkEmail);
router.post("/check-username", authContoller.checkUsername);

module.exports = router;