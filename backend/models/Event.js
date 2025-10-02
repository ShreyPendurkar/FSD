const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: String, required: true }, // Store as ISO string, e.g. "2025-09-19"
  startTime: { type: String, required: true }, // e.g. "09:00"
  endTime: { type: String, required: true },   // e.g. "11:00"
  color: { type: String, default: '#2563eb' }, // For event block coloring, optional
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
