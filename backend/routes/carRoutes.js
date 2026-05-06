const express = require('express');
const router = express.Router();
const { getCarState, controlCar } = require('../controllers/carController');
const { protect, authorize } = require('../middleware/auth');

router.get('/state', protect, getCarState);
router.post('/control', protect, authorize('admin', 'operator'), controlCar);

module.exports = router;
