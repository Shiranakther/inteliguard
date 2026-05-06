const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  time: {
    type: String, // e.g., "Today, 14:30"
    required: true,
  },
  distance: {
    type: String, // e.g., "12.05m"
    required: true,
  },
  duration: {
    type: String, // e.g., "1m 35s"
    required: true,
  },
  points: [
    {
      c: Number,
      r: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Path', pathSchema);
