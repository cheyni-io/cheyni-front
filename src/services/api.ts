import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.cheyni.io/api',
  // baseURL: 'http://localhost:3000/api'
});

export default api;
