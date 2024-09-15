import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/payment-items";

export const listPaymentItems = () => axios.get(REST_API_BASE_URL);
export const addPaymentItemService = (item) => axios.post(REST_API_BASE_URL, item);
export const deletePaymentItemService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getPaymentItemByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updatePaymentItemService = (id, item) => axios.put(REST_API_BASE_URL + '/' + id, item);
