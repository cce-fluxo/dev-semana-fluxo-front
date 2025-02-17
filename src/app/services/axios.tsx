import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000', // Usando http ao invés de https
// });
//Esse aqui de baixo é do deploy, ele n vai funcionar pra codar no local host :()
const api = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL, // Agora o front pega a URL do env
});

export default api;
