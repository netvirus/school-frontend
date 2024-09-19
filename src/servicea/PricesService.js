import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/prices";

export const listPrices = () => axios.get(REST_API_BASE_URL);
export const addPriceService = (price) => axios.post(REST_API_BASE_URL, price);
export const deletePriceService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getPriceByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updatePriceService = (id, price) => axios.put(REST_API_BASE_URL + '/' + id, price);
