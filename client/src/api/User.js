import { request } from "../utils/index.js";

export const Login = function (payload) {
    return request.post("/v1/auth", payload);
};
