import axios  from "axios";

const REST_API_BASE_URL = "https://bot.swingerhub.net/api/grades";

export const listGrades = () => axios.get(REST_API_BASE_URL);
export const addGradeService = (grade) => axios.post(REST_API_BASE_URL, grade);
export const deleteGradeService = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
export const getGradeByIdService = (id) => axios.get(REST_API_BASE_URL + '/' + id);
export const updateGradeService = (id, grade) => axios.put(REST_API_BASE_URL + '/' + id, grade);
