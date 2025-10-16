const express = require('express')
const AuthController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', authMiddleware, AuthController.refresh);
module.exports = router;