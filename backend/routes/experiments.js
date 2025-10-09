const express = require('express');
const router = express.Router();
const experimentsController = require('../controllers/experimentsController');

router.get('/', experimentsController.getAllExperiments);
router.post('/', experimentsController.createExperiment);
router.put('/:id', experimentsController.updateExperiment);
router.delete('/:id', experimentsController.deleteExperiment);

module.exports = router;
