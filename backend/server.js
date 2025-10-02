const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const notesRouter = require('./routes/notes');
const experimentsRouter = require('./routes/experiments');
const resourcesRouter = require('./routes/resources');
const analyticsRouter = require('./routes/analytics');
const skillsRouter = require('./routes/skills');
const goalsRouter = require('./routes/goals');
const healthRouter = require('./routes/health');
const eventsRouter = require('./routes/events');

require('dotenv').config();

const app = express();

// Middleware setup - always before routes
app.use(cors());
app.use(express.json());

// Connect to MongoDB with env variable MONGO_URI
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected (Local)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Basic test route
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/tasks', tasksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/experiments', experimentsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/health', healthRouter);
app.use('/api/events', eventsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
