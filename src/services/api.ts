import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cheyni-backend-production.up.railway.app',
});

export default api;
