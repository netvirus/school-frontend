import api from './axiosConfig.js';

const REST_API_BASE_URL = "/books";

export const listBooks = () => api.get(REST_API_BASE_URL);
export const addBookService = (book) => api.post(REST_API_BASE_URL, book);
export const deleteBookService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getBookByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updateBookService = (id, book) => api.put(REST_API_BASE_URL + '/' + id, book);