import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/teachers";

export const listTeachers = () => axios.get(REST_API_BASE_URL);
export const addTeacherService = (teacher) => axios.post(REST_API_BASE_URL, teacher);
export const deleteTeacherService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getTeacherByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateTeacherService = (id, teacher) => axios.put(REST_API_BASE_URL + '/' + id, teacher);
