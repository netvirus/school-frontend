import api from './axiosConfig.js';

const REST_API_BASE_URL = "/students";

export const listStudents = () => api.get(REST_API_BASE_URL);
export const addStudentService = (student) => api.post(REST_API_BASE_URL, student);
export const deleteStudentService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getStudentByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updateStudentService = (id, student) => api.put(REST_API_BASE_URL + '/' + id, student);
