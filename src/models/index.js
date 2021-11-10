"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const Collection=require('./data-collection')
const cards=require('./cards')
const users=require('./users')


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
    
    const usersModel=users(sequelize,DataTypes)
    const cardsModel=cards(sequelize,DataTypes)
    
    const usersCollection= new Collection(usersModel)
    const cardsCollection= new Collection(cardsModel)
    
    


module.exports = {
  db: sequelize,

  usersCollection,
  cardsCollection


};


