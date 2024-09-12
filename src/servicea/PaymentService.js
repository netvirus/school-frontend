import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/payments";

export const listPayments = () => axios.get(REST_API_BASE_URL);
export const addPaymentService = (payment) => axios.post(REST_API_BASE_URL, payment);
export const deletePaymentService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getPaymentByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updatePaymentService = (id, payment) => axios.put(REST_API_BASE_URL + '/' + id, payment);