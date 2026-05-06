const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());


app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/car', require('./routes/carRoutes'));
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));


// Sample Protected Route for Admin only
app.get('/api/admin-only', require('./middleware/auth').protect, require('./middleware/auth').authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! This is restricted data.' });
});

// Sample Protected Route for both Admin and Operator
app.get('/api/dashboard', require('./middleware/auth').protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}! Accessing ${req.user.role} dashboard.` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
