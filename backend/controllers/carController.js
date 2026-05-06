// Mock state of the car
let carState = {
  status: 'idle', // idle, driving, stopped
  speed: 45,
  horn: false,
  lights: false,
  camera: true,
  lastCommand: null,
};

// @desc    Get current car state
// @route   GET /api/car/state
const getCarState = (req, res) => {
  res.json(carState);
};

// @desc    Control car (Movements, Horn, Lights)
// @route   POST /api/car/control
const controlCar = (req, res) => {
  const { action, value } = req.body;

  switch (action) {
    case 'move':
      carState.lastCommand = `Move ${value}`; // UP, DOWN, LEFT, RIGHT
      break;
    case 'speed':
      carState.speed = value;
      break;
    case 'start':
      carState.status = 'driving';
      break;
    case 'stop':
      carState.status = 'stopped';
      break;
    case 'horn':
      carState.horn = !carState.horn;
      break;
    case 'light':
      carState.lights = !carState.lights;
      break;
    default:
      return res.status(400).json({ message: 'Invalid action' });
  }

  console.log(`[IOT] Command received: ${action} ${value || ''}`);
  res.json({ message: 'Command sent to car successfully', state: carState });
};

module.exports = {
  getCarState,
  controlCar,
};
