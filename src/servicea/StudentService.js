import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/students";

export const listStudents = () => axios.get(REST_API_BASE_URL);
export const addStudentService = (student) => axios.post(REST_API_BASE_URL, student);
export const deleteStudentService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getStudentByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateStudentService = (id, student) => axios.put(REST_API_BASE_URL + '/' + id, student);
