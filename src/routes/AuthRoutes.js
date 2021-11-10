const express = require("express");
const auth = express.Router();
const basic = require("../middleware/basic");
const { usersCollection } = require("../models/index");
const bcrypt = require("bcrypt");

async function signUpHandler(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await usersCollection.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred" + error);
    ////////////////////////////////////
  }
}
async function signInHandler(req, res) {
  res.status(200).json(req.user);
}

auth.post("/sign-up", signUpHandler);
auth.post("/signin", basic, signInHandler);
module.exports = auth;
