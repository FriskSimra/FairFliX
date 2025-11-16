const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'sessions.json');
const MOVIES_FILE = path.join(__dirname, 'movies.json');

app.use(cors());
app.use(express.json());

// Initialize database files
const initDB = async () => {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(MOVIES_FILE);
  } catch {
    await fs.writeFile(MOVIES_FILE, JSON.stringify([]));
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
      createdAt: new Date().toISOString(),
      preferences: {
        genres: [],
        languages: [],
        platforms: []
      }
    };
    
    sessions.push(newSession);
    await fs.writeFile(DB_FILE, JSON.stringify(sessions, null, 2));
    
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Update session preferences
app.put('/api/sessions/:code/preferences', async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    const sessions = JSON.parse(data);
    const sessionIndex = sessions.findIndex(s => s.code === req.params.code.toUpperCase());
    
    if (sessionIndex === -1) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    sessions[sessionIndex].preferences = req.body;
    await fs.writeFile(DB_FILE, JSON.stringify(sessions, null, 2));
    
    res.json(sessions[sessionIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
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

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const data = await fs.readFile(MOVIES_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read movies' });
  }
});

// Get curated movies based on session preferences
app.get('/api/movies/curated/:sessionCode', async (req, res) => {
  try {
    const moviesData = await fs.readFile(MOVIES_FILE, 'utf8');
    const movies = JSON.parse(moviesData);
    
    const sessionsData = await fs.readFile(DB_FILE, 'utf8');
    const sessions = JSON.parse(sessionsData);
    const session = sessions.find(s => s.code === req.params.sessionCode.toUpperCase());
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Filter movies based on session preferences
    let filteredMovies = movies;
    
    if (session.preferences) {
      if (session.preferences.genres && session.preferences.genres.length > 0) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genre.some(g => session.preferences.genres.includes(g))
        );
      }
      
      if (session.preferences.languages && session.preferences.languages.length > 0) {
        filteredMovies = filteredMovies.filter(movie => 
          session.preferences.languages.includes(movie.language)
        );
      }
      
      if (session.preferences.platforms && session.preferences.platforms.length > 0) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.platforms.some(p => session.preferences.platforms.includes(p))
        );
      }
    }
    
    // Return up to 6 movies for selection
    const curatedMovies = filteredMovies.slice(0, 6);
    res.json(curatedMovies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get curated movies' });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`FairFlix Backend running on port ${PORT}`);
  });
});