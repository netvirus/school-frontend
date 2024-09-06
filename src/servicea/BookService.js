import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/books";

export const listBooks = () => axios.get(REST_API_BASE_URL);
export const addBookService = (book) => axios.post(REST_API_BASE_URL, book);
export const deleteBookService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getBookByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateBookService = (id, book) => axios.put(REST_API_BASE_URL + '/' + id, book);