const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userCTRL = require('../controllers/user');
const uploadCtrl = require('../controllers/upload');
const multer = require('multer');
const upload = multer();
const authentificationLimiter = require('../middleware/authentificationLimiter'); // limite log each 15 min
const validatorRegister = require('../middleware/validatorRegister'); // security input register

// auth
router.post("/register", validatorRegister, authController.signUp);

router.post("/login", authentificationLimiter, authController.signIn);

router.get("/logout", authController.logout);

// user
router.get('/', userCTRL.getAllUsers);

router.get('/:id', userCTRL.userInfo);

router.put('/:id', userCTRL.updateUser);

router.delete('/:id', userCTRL.deleteUser);

// follow route
router.patch('/follow/:id', userCTRL.follow);
router.patch('/unfollow/:id', userCTRL.unfollow);

//upload profil
router.post('/upload', upload.single('file'), uploadCtrl.uploadProfil);

// upload clip
router.post('/clip', upload.single('file'), uploadCtrl.uploadClip);

module.exports = router;