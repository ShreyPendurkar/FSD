const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  recurring: { type: Boolean, default: false },
  history: { type: [Date], default: [] }, // For tracking habit completion dates
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
