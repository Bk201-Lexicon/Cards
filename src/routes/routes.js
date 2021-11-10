"use strict";

const express = require("express");
const CardsRoutes = express.Router();
const { cardsCollection } = require("../models/index");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");

CardsRoutes.post("/cards", bearer, acl("create"), createCardHandler);
CardsRoutes.get("/cards/:id", bearer, readCardHandler);
CardsRoutes.get("/cards", bearer, readCardHandler);
CardsRoutes.put("/cards/:id", bearer, acl("update"), updateCardHandler);
CardsRoutes.delete("/cards/:id", bearer, acl("delete"), deleteCardHandler);

async function updateCardHandler(req, res) {
  let id = req.params.id;

  try {
    let updatedCard = await cardsCollection.update(id, req.body);
    res.status(200).json(updatedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function readCardHandler(req, res) {
  try {
    let id = req.params.id;
    let readCard = await cardsCollection.get(id);
    res.status(200).json(readCard);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createCardHandler(req, res) {
  console.clear();

  try {
    let newCard = await cardsCollection.create(req.body);
    res.status(201).json(newCard);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

async function deleteCardHandler(req, res) {
  try {
    let id = req.params.id;
    let deletedCard = await cardsCollection.delete(id);
    res.status(203).json(deletedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = CardsRoutes;
