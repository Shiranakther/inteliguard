const API_BASE_URL = 'https://inteliguard-bk.vercel.app:5000/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

export const authAPI = {
  login: (credentials) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  register: (userData) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    }).then(res => res.json()),
};

export const carAPI = {
  sendCommand: (endpoint, data, token) =>
    fetch(`${API_BASE_URL}/car/${endpoint}`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data)
    }),

  move: (direction, token) => carAPI.sendCommand('move', { direction }, token),
  setSpeed: (speed, token) => carAPI.sendCommand('speed', { speed }, token),
  toggleHorn: (active, token) => carAPI.sendCommand('horn', { active }, token),
  toggleLights: (active, token) => carAPI.sendCommand('lights', { active }, token),
};

export const settingsAPI = {
  get: (token) =>
    fetch(`${API_BASE_URL}/settings`, {
      headers: getHeaders(token)
    }).then(res => res.json()),

  update: (settings, token) =>
    fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(settings)
    }).then(res => res.json()),
};

export const pathAPI = {
  getAll: (token) =>
    fetch(`${API_BASE_URL}/paths`, {
      headers: getHeaders(token)
    }).then(res => res.json()),
};
