import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
  content: String,
  published_by: mongoose.Types.ObjectId,
  question_for: mongoose.Types.ObjectId,
  liked_by: [mongoose.Types.ObjectId],
});

const Answer = mongoose.model("answers", AnswerSchema);

export default Answer;
