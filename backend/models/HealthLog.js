const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., sleep, nutrition, meditation
  value: { type: String, required: true }, // e.g., hours slept, calories, minutes meditated
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HealthLog', HealthLogSchema);
