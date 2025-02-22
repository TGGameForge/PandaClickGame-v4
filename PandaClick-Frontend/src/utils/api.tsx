import axios from 'axios';
const api = axios.create({
    baseURL: `https://mintmastergame-backend.onrender.com/api`,
    // baseURL: `http://localhost:5000/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;