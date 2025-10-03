const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const tasksRouter = require('./routes/tasks');
const notesRouter = require('./routes/notes');
const experimentsRouter = require('./routes/experiments');
const resourcesRouter = require('./routes/resources');
const analyticsRouter = require('./routes/analytics');
const skillsRouter = require('./routes/skills');
const goalsRouter = require('./routes/goals');
const healthRouter = require('./routes/health');
const eventsRouter = require('./routes/events');

// Import User model
const User = require('./models/User');

// Import auth middleware
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected (Local)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.get('/', (req, res) => res.send('API is running'));

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

// Protect routes with the auth middleware
app.use('/api/tasks', auth, tasksRouter);
app.use('/api/notes', auth, notesRouter);
app.use('/api/experiments', auth, experimentsRouter);
app.use('/api/resources', auth, resourcesRouter);
app.use('/api/analytics', auth, analyticsRouter);
app.use('/api/skills', auth, skillsRouter);
app.use('/api/goals', auth, goalsRouter);
app.use('/api/health', auth, healthRouter);
app.use('/api/events', auth, eventsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
