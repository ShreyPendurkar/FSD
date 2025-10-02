const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');

// Get all experiments
exports.getAllExperiments = async (req, res) => {
  try {
    const experiments = await Experiment.find().sort({ createdAt: -1 });
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch experiments' });
  }
};

// Create new experiment
exports.createExperiment = async (req, res) => {
  try {
    const newExperiment = new Experiment(req.body);
    await newExperiment.save();
    res.json(newExperiment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create experiment' });
  }
};

// Update experiment by ID
exports.updateExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid experiment ID' });
    }

    // Validate status if provided
    const allowedStatuses = ['Pending', 'Completed'];
    if (updateData.status && !allowedStatuses.includes(updateData.status)) {
      return res.status(400).json({ error: `Invalid status value: ${updateData.status}` });
    }

    console.log('Update Experiment:', id, updateData);

    // Find and update
    const updatedExperiment = await Experiment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedExperiment) {
      return res.status(404).json({ error: 'Experiment not found' });
    }

    res.json(updatedExperiment);

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to update experiment' });
  }
};

// Delete experiment by ID
exports.deleteExperiment = async (req, res) => {
  try {
    const deletedExperiment = await Experiment.findByIdAndDelete(req.params.id);
    if (!deletedExperiment) {
      return res.status(404).json({ error: 'Experiment not found' });
    }
    res.json({ message: 'Experiment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete experiment' });
  }
};
