import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bot.swingerhub.net/api',
});
export default api;