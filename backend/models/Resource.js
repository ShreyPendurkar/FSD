const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, enum: ['Documentation', 'Tutorial', 'Video', 'Article', 'Other'], default: 'Other' },
  bookmarked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
