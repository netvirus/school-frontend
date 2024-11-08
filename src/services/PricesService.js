import api from './axiosConfig.js';

const REST_API_BASE_URL = "/personal-prices";

export const listPrices = () => api.get(REST_API_BASE_URL);
export const addPriceService = (price) => api.post(REST_API_BASE_URL, price);
export const deletePriceService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getPriceByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updatePriceService = (id, price) => api.put(REST_API_BASE_URL + '/' + id, price);
