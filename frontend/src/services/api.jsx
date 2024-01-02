
import axios from 'axios';

const baseURL = 'https://localhost:7031/api/';

const api = axios.create({
  baseURL,
});

export default api;
export { baseURL };
