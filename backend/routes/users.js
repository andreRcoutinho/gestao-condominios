const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

/* WITHOUT MIDDLEWARE */
router.get('/sign-in', AuthController.SignIn);
router.post('/sign-up', AuthController.SignUp);
router.get('/forgot-password');
router.get('/reset-password');

/* WITH MIDDLEWARE */
//router.use(authMiddleware);

module.exports = router;
