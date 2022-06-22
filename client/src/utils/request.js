import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 6000,
});

export default request;
