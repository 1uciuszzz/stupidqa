import express from "express";

import { Answer, Question } from "./../../models/index.js";
import { verify_token } from "./../../utils/jwt.js";

const answer = express.Router();

// 在特定问题下面添加答案
answer.post("/question/:id", async (req, res, next) => {
  const { authorization } = req.headers;
  const verify_result = verify_token(authorization);
  if (verify_result.status) {
    const user = verify_result.payload;
    const { id } = req.params;
    let question = null;
    try {
      question = await Question.findById(id);
    } catch (e) {
      return res.status(200).json({
        status: 403,
        msg: "invalid question id",
      });
    }
    if (question) {
      const { content } = req.body;
      if (content) {
        const result = await Answer.create({
          content,
          published_by: user._id,
          question_for: id,
          liked_by: [],
        });
        question.answer_count += 1;
        question.save();
        return res.status(200).json({
          status: 200,
          payload: {
            answer: {
              content: result.content,
              published_by: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
              },
              question_for: result.question_for,
              liked_by: result.liked_by,
              _id: result._id,
            },
          },
          msg: "publish answer success",
        });
      } else {
        return res.status(200).json({
          status: 403,
          msg: "field content missing",
        });
      }
    } else {
      return res.status(200).json({
        status: 404,
        msg: "question not found",
      });
    }
  } else {
    return res.status(200).json({
      status: 401,
      msg: "token invalid",
    });
  }
});
answer.delete("/:id", async (req, res, next) => {});
answer.patch("/:id", async (req, res, next) => {});
answer.get("/:id", async (req, res, next) => {});

export default answer;
