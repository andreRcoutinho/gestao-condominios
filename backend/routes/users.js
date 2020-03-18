const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

/* WITHOUT MIDDLEWARE */
router.get('/sign-in');
router.get('/forgot-password');
router.get('/reset-password');

/* WITH MIDDLEWARE */
router.use(authMiddleware);
router.get('/sign-up');

module.exports = router;