import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net";

export const listStudents = () => axios.get(`${REST_API_BASE_URL}/api/students`);
export const addStudentService = (student) => axios.post(`${REST_API_BASE_URL}/api/studentss`, student);
