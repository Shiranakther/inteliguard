const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bluetooth: {
    type: Boolean,
    default: true,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  camera: {
    type: Boolean,
    default: true,
  },
  light: {
    type: Boolean,
    default: false,
  },
  defaultSpeed: {
    type: Number,
    default: 20,
  },
});

module.exports = mongoose.model('Settings', settingsSchema);
