import express from "express";

const answer = express.Router();

answer.post("/", async (req, res, next) => {});
answer.delete("/", async (req, res, next) => {});
answer.patch("/", async (req, res, next) => {});
answer.get("/", async (req, res, next) => {});

export default answer;
