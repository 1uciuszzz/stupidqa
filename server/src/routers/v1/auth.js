import express from "express";
import multer from "multer";

import { verify_password } from "../../utils/encrypt.js";
import { User } from "./../../models/index.js";
import { gen_token } from "./../../utils/jwt.js";

const auth = express.Router();

auth.post("/", multer().none(), async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const match = verify_password(password, user.password);
    if (match) {
      const token = gen_token({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      });
      return res.status(200).json({
        status: 200,
        payload: {
          token,
          user: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
          },
        },
        msg: "login success",
      });
    } else {
      return res.status(200).json({
        status: 401,
        msg: "auth failed",
      });
    }
  } else {
    return res.status(200).json({
      status: 404,
      msg: "user not found",
    });
  }
});

export default auth;
