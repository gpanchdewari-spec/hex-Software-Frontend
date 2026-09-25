import axios from "axios";
const api = axios.create({
  baseURL: "https://hexsoftware-backend-2.onrender.com/api",
});

//"http://localhost:5000/api"  https://hexsoftware-backend-2.onrender.com

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
