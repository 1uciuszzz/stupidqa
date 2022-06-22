import jwt from "jsonwebtoken";

import { JWT_KEY } from "./constant.js";

export const gen_token = (payload) => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: "1d" });
};

export const verify_token = (token) => {
  const result = {};
  try {
    result.payload = jwt.verify(token, JWT_KEY);
    result.status = true;
  } catch (e) {
    result.status = false;
  }
  return result;
};
