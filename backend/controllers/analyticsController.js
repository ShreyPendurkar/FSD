const Experiment = require('../models/Experiment');
const Note = require('../models/Note');
const Task = require('../models/Task');

// Get analytics summary
exports.getAnalytics = async (req, res) => {
  try {
    // Count completed experiments
    const completedExperiments = await Experiment.countDocuments({ status: 'Completed' });
    
    // Count total notes (no filter)
    const totalNotes = await Note.countDocuments();

    // Count completed tasks
    const completedTasks = await Task.countDocuments({ status: 'Completed' });

    // Example: current streak logic depends on your data model and rules; 
    // here we return a placeholder value
    const currentStreak = 0;

    res.json({ completedExperiments, totalNotes, completedTasks, currentStreak });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
