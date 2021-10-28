const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userCTRL = require('../controllers/user');

// auth
router.post("/register", authController.signUp);

router.post("/login", authController.signIn);

router.get("/logout", authController.logout);

// user
router.get('/', userCTRL.getAllUsers);

router.get('/:id', userCTRL.userInfo);

router.put('/:id', userCTRL.updateUser);

router.delete('/:id', userCTRL.deleteUser);

// follow route
router.patch('/follow/:id', userCTRL.follow);
router.patch('/unfollow/:id', userCTRL.unfollow);

module.exports = router;