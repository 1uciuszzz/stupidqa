import express from "express";

import { User } from "../../models/index.js";
import { encrypt_password } from "./../../utils/encrypt.js";
import { USER } from "./../../utils/constant.js";

const user = express.Router();

user.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const dup = await User.findOne({ username });
  if (dup) {
    return res.status(200).json({
      status: 403,
      msg: "user existed",
    });
  }
  const encrypted_password = encrypt_password(password);
  const result = await User.create({
    username,
    password: encrypted_password,
    type: USER,
  });
  return res.status(200).json({
    status: 200,
    payload: { user: result },
    msg: "register successful",
  });
});
user.delete("/:id", async (req, res, next) => {});
user.patch("/:id", async (req, res, next) => {});
user.get("/:id", async (req, res, next) => {});

export default user;
