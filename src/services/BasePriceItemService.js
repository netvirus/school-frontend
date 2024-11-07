import api from './axiosConfig.js';

const REST_API_BASE_URL = "/base-prices";

export const listBasePrices = () => api.get(REST_API_BASE_URL);
export const addBasePriceService = (basePrice) => api.post(REST_API_BASE_URL, basePrice);
export const deleteBasePriceService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getBasePriceByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updateBasePriceService = (id, basePrice) => api.put(REST_API_BASE_URL + '/' + id, basePrice);
