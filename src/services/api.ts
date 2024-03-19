import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.237.229.83:3000/api',
  // baseURL: 'http://localhost:3000/api'
});

export default api;
