const HealthLog = require('../models/HealthLog');

// Get all health logs
exports.getAllHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch health logs' });
  }
};

// Add or update a health log
exports.addOrUpdateLog = async (req, res) => {
  const { type, value, date } = req.body;
  try {
    // Check if log exists for type and date
    let log = await HealthLog.findOne({ type, date: new Date(date) });

    if (log) {
      // Update existing
      log.value = value;
      await log.save();
    } else {
      // Create new
      log = new HealthLog({ type, value, date });
      await log.save();
    }
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add/update health log' });
  }
};

// Optionally add delete route if needed
exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await HealthLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ error: 'Health log not found' });
    }
    res.json({ message: 'Health log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete health log' });
  }
};
