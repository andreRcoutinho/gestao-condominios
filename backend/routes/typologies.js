const express = require('express');
const TypologyController = require('../controllers/TypologyController');
const router = express.Router();

router.get('/', TypologyController.findAll);
router.get('/:id', TypologyController.findOne);
router.put('/:id', TypologyController.update);

module.exports = router;
