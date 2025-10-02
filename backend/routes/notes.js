const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.getAllNotes);
router.post('/', notesController.createNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
