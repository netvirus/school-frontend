import api from './axiosConfig.js';

const REST_API_BASE_URL = "/services-list";

export const listPaymentItems = () => api.get(REST_API_BASE_URL);
export const addPaymentItemService = (item) => api.post(REST_API_BASE_URL, item);
export const deletePaymentItemService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getPaymentItemByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updatePaymentItemService = (id, item) => api.put(REST_API_BASE_URL + '/' + id, item);
