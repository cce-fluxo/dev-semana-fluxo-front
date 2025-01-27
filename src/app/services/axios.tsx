import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Substitua pelo seu backend local
});

export default api;
