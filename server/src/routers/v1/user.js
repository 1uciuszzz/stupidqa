import express from "express";
import multer from "multer";

import { Question, User } from "../../models/index.js";
import { encrypt_password } from "./../../utils/encrypt.js";
import { DEFAULT_AVATAR, USER } from "./../../utils/constant.js";
import { verify_token } from "../../utils/jwt.js";

const user = express.Router();

// 用户注册
user.post("/", multer().none(), async (req, res, next) => {
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
    avatar: DEFAULT_AVATAR + username,
    type: USER,
  });
  return res.status(200).json({
    status: 200,
    payload: {
      user: {
        _id: result._id,
        username: result.username,
        avatar: result.avatar,
      },
    },
    msg: "register success",
  });
});
user.delete("/:id", async (req, res, next) => {});
user.patch("/:id", async (req, res, next) => {});

// 获取用户详情
user.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      const user_output = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      };
      const questions = await Question.find({ create_for: id });
      const received_questions = questions.map(async (question) => {
        const publisher = await User.findById(question.created_by);
        return {
          title: question.title,
          tags: question.tags,
          created_by: {
            _id: publisher._id,
            username: publisher.username,
            avatar: publisher.avatar,
          },
          created_time: question.created_time,
          updated_time: question.updated_time,
          level: question.level,
          answer_count: question.answer_count,
        };
      });
      return res.status(200).json({
        status: 200,
        payload: {
          user: user_output,
          received_questions,
        },
        msg: "query success",
      });
    } else {
      return res.status(200).json({
        status: 404,
        msg: "user not found",
      });
    }
  } catch (e) {
    return res.status(200).json({
      status: 403,
      msg: "token invalid",
    });
  }
});

// 查询用户
user.get("/", async (req, res, next) => {
  const { authorization } = req.headers;
  const verify_result = verify_token(authorization);
  if (verify_result.status) {
    const { username } = req.query;
    const result = await User.find({
      username: { $regex: username, $options: "i" },
    });
    const filtered_result = result.map((user) => {
      return {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
      };
    });
    return res.status(200).json({
      status: 200,
      payload: {
        users: filtered_result,
      },
      msg: "query success",
    });
  } else {
    return res.status(200).json({
      status: 401,
      msg: "please login",
    });
  }
});

export default user;
