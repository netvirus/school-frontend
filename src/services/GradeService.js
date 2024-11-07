import api from './axiosConfig.js';

const REST_API_BASE_URL = "/grades";

export const listGrades = () => api.get(REST_API_BASE_URL);
export const addGradeService = (grade) => api.post(REST_API_BASE_URL, grade);
export const deleteGradeService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getGradeByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updateGradeService = (id, grade) => api.put(REST_API_BASE_URL + '/' + id, grade);
