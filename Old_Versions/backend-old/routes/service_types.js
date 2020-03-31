const express = require('express');
const ServiceTypeController = require('../controllers/ServiceTypeController');
const router = express.Router();

router.post('/', ServiceTypeController.new);
router.get('/', ServiceTypeController.findAll);
router.get('/:id', ServiceTypeController.findOne);
router.put('/:id', ServiceTypeController.update);
router.delete('/:id', ServiceTypeController.delete);

module.exports = router;
