import axios from "axios";

// const BASE_URL = "http://localhost:5050/api/v1";
const BASE_URL = "https://lms-api-kamran.up.railway.app/api/v1";
// const BASE_URL = "https://lms-api-u0zi.onrender.com/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;