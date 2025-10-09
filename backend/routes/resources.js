const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');

router.get('/', resourcesController.getAllResources);
router.post('/', resourcesController.createResource);
router.patch('/:id/toggleBookmark', resourcesController.toggleBookmark);
router.delete('/:id', resourcesController.deleteResource);

module.exports = router;
