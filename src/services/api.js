const API_BASE_URL = 'http://localhost:3001/api';

export const sessionAPI = {
  // Get all sessions
  getAllSessions: async () => {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return response.json();
  },

  // Create new session
  createSession: async (sessionData) => {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });
    if (!response.ok) throw new Error('Failed to create session');
    return response.json();
  },

  // Get session by code
  getSessionByCode: async (code) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${code}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch session');
    }
    return response.json();
  }
};

// Movie API functions
export const getAllMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const getCuratedMovies = async (sessionCode) => {
  const response = await fetch(`${API_BASE_URL}/movies/curated/${sessionCode}`);
  if (!response.ok) throw new Error('Failed to fetch curated movies');
  return response.json();
};

export const updateSessionPreferences = async (sessionCode, preferences) => {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionCode}/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });
  if (!response.ok) throw new Error('Failed to update preferences');
  return response.json();
};