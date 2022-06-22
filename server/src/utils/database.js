import mongoose from "mongoose";

export default mongoose
  .connect("mongodb://1ucius.top:27017/stupidqa")
  .then((r) => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
