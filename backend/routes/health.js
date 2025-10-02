const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getAllHealthLogs);
router.post('/', healthController.addOrUpdateLog);
router.delete('/:id', healthController.deleteLog);

module.exports = router;
