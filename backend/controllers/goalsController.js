const Goal = require('../models/Goal');

// Get all goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
};

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create goal' });
  }
};

// New: Update a goal by ID (generic update)
exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update goal' });
  }
};

// Toggle goal completion
exports.toggleCompletion = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to toggle completion' });
  }
};

// Add habit history date
exports.addHabitHistory = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    if (!goal.history.includes(req.body.date)) {
      goal.history.push(req.body.date);
      await goal.save();
    }
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add habit history' });
  }
};

// Remove habit history date
exports.removeHabitHistory = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.history = goal.history.filter(date => date !== req.body.date);
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to remove habit history' });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) return res.status(404).json({ error: 'Goal not found' });

    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};
