import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net";

export const listTeachers = () => axios.get(`${REST_API_BASE_URL}/api/teachers`);
export const addTeacherService = (teacher) => axios.post(`${REST_API_BASE_URL}/api/teachers`, teacher);
