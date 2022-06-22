import axios from "axios";

const request = axios.create({
    baseURL: "/api",
    timeout: 6000,
});

request.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    }
    return config;
});

export default request;
