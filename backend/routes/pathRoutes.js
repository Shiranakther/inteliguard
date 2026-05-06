const express = require('express');
const router = express.Router();
const { getPaths, savePath, clearPaths } = require('../controllers/pathController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPaths);
router.post('/', protect, savePath);
router.delete('/', protect, clearPaths);

module.exports = router;
