import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.47.144.217:3000/api',
  // baseURL: 'http://localhost:3000/api'
});

export default api;
