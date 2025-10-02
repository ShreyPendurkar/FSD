const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'code'], default: 'text' },
  experimentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experiment', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
