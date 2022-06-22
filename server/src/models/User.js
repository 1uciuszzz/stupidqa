import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  avatar: String,
  username: String,
  password: String,
  type: String,
});

const User = mongoose.model("users", UserSchema);

export default User;
