import axios from "axios";

const api = axios.create({
  baseURL: "https://hamzaasghar.pythonanywhere.com",
});

export default api;