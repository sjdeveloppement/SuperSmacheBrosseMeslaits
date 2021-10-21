const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userCTRL = require('../controllers/user');

// auth
router.post("/register", authController.signUp);

// user
router.get('/', userCTRL.getAllUsers);

router.get('/:id', userCTRL.userInfo);
module.exports = router;