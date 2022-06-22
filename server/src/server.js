import express from "express";

import database from "./utils/database.js";
import { auth, user } from "./routers/v1/index.js";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/v1/user", user);
server.use("/api/v1/auth", auth);

server.listen(5000, () => {
  console.log("server running on port 5000");
});
