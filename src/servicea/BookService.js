import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net";

export const listBooks = () => axios.get(`${REST_API_BASE_URL}/api/books`);
export const addBookService = (book) => axios.post(`${REST_API_BASE_URL}/api/books`, book);

export const updateBookService = (book) => axios.post(`${REST_API_BASE_URL}/api/books`, book);

export const deleteBookService = (id) => axios.delete(`${REST_API_BASE_URL}/api/books/`, id);
