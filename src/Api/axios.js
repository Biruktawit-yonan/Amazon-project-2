import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-smxd.onrender.com",

});

export { axiosInstance };
