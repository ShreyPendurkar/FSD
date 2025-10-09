const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');

router.get('/', goalsController.getAllGoals);
router.post('/', goalsController.createGoal);

// New generic update route for goal by ID
router.put('/:id', goalsController.updateGoal);

router.put('/:id/toggle', goalsController.toggleCompletion);
router.put('/:id/habit/history/add', goalsController.addHabitHistory);
router.put('/:id/habit/history/remove', goalsController.removeHabitHistory);
router.delete('/:id', goalsController.deleteGoal);

module.exports = router;
