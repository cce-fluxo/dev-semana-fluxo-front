import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-semana-fluxo-back.onrender.com', // Substitua pelo seu backend local
});

export default api;
