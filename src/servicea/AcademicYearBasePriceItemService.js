import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/academic-year-base-prices";

export const listAcademicYearBasePrices = () => axios.get(REST_API_BASE_URL);
export const addAcademicYearBasePriceService = (personalPrice) => axios.post(REST_API_BASE_URL, personalPrice);
export const deleteAcademicYearBasePriceService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getAcademicYearBasePriceByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateAcademicYearBasePriceService = (id, personalPrice) => axios.put(REST_API_BASE_URL + '/' + id, personalPrice);
