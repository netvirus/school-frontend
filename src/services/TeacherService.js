import api from './axiosConfig.js';

const REST_API_BASE_URL = "/teachers";

export const listTeachers = () => api.get(REST_API_BASE_URL);
export const addTeacherService = (teacher) => api.post(REST_API_BASE_URL, teacher);
export const deleteTeacherService = (id) => api.delete(REST_API_BASE_URL + '/' + id);
export const getTeacherByIdService = (id) => api.get(REST_API_BASE_URL + '/' + id);
export const updateTeacherService = (id, teacher) => api.put(REST_API_BASE_URL + '/' + id, teacher);
