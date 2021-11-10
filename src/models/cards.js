/**
 * @param {sequelize} sequelize
 * @param {DataType} DataType
 * @module create table cards
 * @member id int auto_increment primary key,
 * @member name string not null,
 * @member description string not null,
 * @member image_url string allowNull true,
 * @member defense int not null,
 * @member attack int not null,
 * @returns {Model}
 */
const Cards = (sequelize, DataType) =>
  sequelize.define("cards", {
    name: { type: DataType.STRING, allowNull: false },
    description: { type: DataType.STRING, allowNull: false },
    image: { type: DataType.STRING, allowNull: true },
    defense: { type: DataType.INTEGER, allowNull: false },
    attack: { type: DataType.INTEGER, allowNull: false },
  });

module.exports = Cards;
