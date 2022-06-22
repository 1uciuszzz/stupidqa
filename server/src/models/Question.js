import mongoose from "mongoose";

const TagSchema = mongoose.Schema({
  keyword: String,
});

const QuestionSchema = mongoose.Schema({
  title: String,
  tags: [TagSchema],
  created_by: mongoose.Types.ObjectId,
  created_for: mongoose.Types.ObjectId,
  created_time: Date,
  updated_time: Date,
  level: String,
  answer_count: Number,
});

const Question = mongoose.model("questions", QuestionSchema);

export default Question;
