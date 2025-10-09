const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  checklist: { type: [Boolean], default: [] },  // Array of boolean for the checklist days
  streak: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
