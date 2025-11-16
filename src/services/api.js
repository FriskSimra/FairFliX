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