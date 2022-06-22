import { createHmac } from "crypto";

import { SECRET_KEY } from "./constant.js";

export const encrypt_password = (payload) => {
  return createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
};

export const verify_password = (payload, password) => {
  return password === encrypt_password(payload);
};
