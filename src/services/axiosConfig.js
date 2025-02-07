import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.l2club.org/api/v1',
});
export default api;
