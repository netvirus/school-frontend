import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net";

export const listBooks = () => axios.get(`${REST_API_BASE_URL}/api/books`);