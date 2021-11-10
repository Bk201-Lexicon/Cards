"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const ModelHelper = require("./data-collection");
// const userSchema = require("./users.js");
const Care = require("./cards");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  Care: new ModelHelper(Care(sequelize, DataTypes)),
  //   users: userSchema(sequelize, DataTypes),
};
