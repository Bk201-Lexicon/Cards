"use strict";
// importing base64
const base64 = require("base-64");
const { usersCollection } = require("../models/index");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();
  let [user, pass] = base64.decode(basic).split(":");
  // console.log(user, pass);
  // const a = await usersCollection.model.authenticateBasic(user, pass);
  // console.log(a);
  try {
    req.user = await usersCollection.model.authenticateBasic(user, pass);

    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send("Invalid Login");
  }
};
