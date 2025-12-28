const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  question: { type: String, required: true },

  sampleTables: { type: Array, default: [] }, 
  expectedOutput: {
    value: { type: Array, required: true } 
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);