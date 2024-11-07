import api from './axiosConfig.js';

const REST_API_BASE_URL = "/payments";

export const listPayments = () => api.get(REST_API_BASE_URL);
export const addPaymentService = (payment) => api.post(REST_API_BASE_URL, payment);
export const deletePaymentService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getPaymentByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updatePaymentService = (id, payment) => api.put(REST_API_BASE_URL + '/' + id, payment);