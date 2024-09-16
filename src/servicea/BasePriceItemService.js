import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/academic-year-base-prices";

export const listBasePrices = () => axios.get(REST_API_BASE_URL);
export const addBasePriceService = (personalPrice) => axios.post(REST_API_BASE_URL, personalPrice);
export const deleteBasePriceService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getBasePriceByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateBasePriceService = (id, personalPrice) => axios.put(REST_API_BASE_URL + '/' + id, personalPrice);
