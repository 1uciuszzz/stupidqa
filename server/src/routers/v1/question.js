import express from "express";
import { verify_token } from "../../utils/jwt.js";
import { Answer, Question, User } from "./../../models/index.js";

const question = express.Router();

// 给特定用户提问题
question.post("/user/:id", async (req, res, next) => {
  const { authorization } = req.headers;
  const verify = verify_token(authorization);
  if (verify.status) {
    const publisher_id = verify.payload._id;
    const { id } = req.params;
    let created_for = null;
    try {
      created_for = await User.findById(id);
    } catch (e) {
      return res.status(200).json({
        status: 403,
        msg: "receiver id invalid",
      });
    }
    if (created_for) {
      const { title, tags, level } = req.body;
      if (title && tags.length && level) {
        const result = await Question.create({
          title,
          tags,
          created_by: publisher_id,
          created_time: new Date(),
          updated_time: new Date(),
          level,
          created_for: id,
          answer_count: 0,
        });
        return res.status(200).json({
          status: 200,
          payload: {
            question: result,
          },
          msg: "create question success",
        });
      } else {
        return res.status(200).json({
          status: 403,
          msg: "field title, tags or level missing",
        });
      }
    } else {
      return res.status(200).json({
        status: 403,
        msg: "receiver not found",
      });
    }
  } else {
    return res.status(200).json({
      status: 401,
      msg: "token invalid",
    });
  }
});

question.delete("/:id", async (req, res, next) => {});
question.patch("/:id", async (req, res, next) => {});

// 获取问题详情
question.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let question = null;
  try {
    question = await Question.findById(id);
  } catch (e) {
    return res.status(200).json({
      status: 200,
      msg: "question id invalid",
    });
  }
  const answers = await Answer.find({ question_for: id });
  const created_by = await User.findById(question.created_by);
  const created_for = await User.findById(question.created_for);
  const question_with_details = {
    title: question.title,
    tags: question.tags,
    created_by: {
      _id: created_by._id,
      avatar: created_by.avatar,
      username: created_by.username,
    },
    created_time: question.created_time,
    updated_time: question.updated_time,
    level: question.level,
    created_for: {
      _id: created_for._id,
      avatar: created_for.avatar,
      username: created_for.username,
    },
    answer_count: question.answer_count,
  };
  const answers_with_details = await answers.map(async (answer) => {
    const publisher = await User.findById(answer.published_by);
    const liked_users = answer.liked_by.map(async (uid) => {
      const user = await User.findById(uid);
      return {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
      };
    });
    return {
      content: answer.content,
      published_by: publisher,
      liked_by: liked_users,
    };
  });
  return res.status(200).json({
    status: 200,
    payload: {
      question: question_with_details,
      answers: await Promise.all(answers_with_details),
    },
    msg: "query success",
  });
});

// 获取提给特定用户的所有问题
question.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  let query_for = null;
  try {
    query_for = await User.findById(id);
  } catch (e) {
    return res.status(200).json({
      status: 403,
      msg: "user id invalid",
    });
  }
  const { page, per_size } = req.query;
  let result = null;
  const page_int = parseInt(page);
  const per_size_int = parseInt(per_size);
  if (page && per_size && !isNaN(page_int) && !isNaN(per_size_int)) {
    result = await Question.find({ created_for: query_for._id })
      .skip(parseInt(per_size_int) * (page_int - 1))
      .limit(parseInt(per_size_int));
  } else {
    result = await Question.find({ created_for: query_for._id });
  }
  const total = await Question.countDocuments({ created_for: query_for._id });
  return res.status(200).json({
    status: 200,
    payload: {
      questions: result,
      total,
    },
    msg: "query success",
  });
});

// 获取所有的问题，支持分页查询
question.get("/", async (req, res, next) => {
  const { page, per_size } = req.query;
  let result = null;
  const page_int = parseInt(page);
  const per_size_int = parseInt(per_size);
  if (page && per_size && !isNaN(page_int) && !isNaN(per_size_int)) {
    result = await Question.find()
      .skip(parseInt(per_size_int) * (page_int - 1))
      .limit(parseInt(per_size_int));
  } else {
    result = await Question.find();
  }
  const total = await Question.countDocuments();
  return res.status(200).json({
    status: 200,
    payload: {
      questions: result,
      total,
    },
    msg: "query success",
  });
});

export default question;
