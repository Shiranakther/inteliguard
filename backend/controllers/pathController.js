const Path = require('../models/Path');

// @desc    Get all paths for user
// @route   GET /api/paths
const getPaths = async (req, res) => {
  try {
    const paths = await Path.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(paths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a path (Data Sync)
// @route   POST /api/paths
const savePath = async (req, res) => {
  const { label, time, distance, duration, points } = req.body;

  try {
    const path = await Path.create({
      user: req.user._id,
      label,
      time,
      distance,
      duration,
      points,
    });
    res.status(201).json(path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete all paths for user
// @route   DELETE /api/paths
const clearPaths = async (req, res) => {
  try {
    await Path.deleteMany({ user: req.user._id });
    res.json({ message: 'All paths cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPaths,
  savePath,
  clearPaths,
};
