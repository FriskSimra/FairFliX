const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'sessions.json');

app.use(cors());
app.use(express.json());

// Initialize database file
const initDB = async () => {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
};

// Get all sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read sessions' });
  }
});

// Create new session
app.post('/api/sessions', async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    const sessions = JSON.parse(data);
    
    const newSession = {
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    sessions.push(newSession);
    await fs.writeFile(DB_FILE, JSON.stringify(sessions, null, 2));
    
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Get session by code
app.get('/api/sessions/:code', async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    const sessions = JSON.parse(data);
    const session = sessions.find(s => s.code === req.params.code.toUpperCase());
    
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to find session' });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`FairFlix Backend running on port ${PORT}`);
  });
});