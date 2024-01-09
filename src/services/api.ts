import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cheyni-backend-production.up.railway.app/api',
  // baseURL: 'http://localhost:3000/api'
});

export default api;
