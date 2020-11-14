"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  game.init(
    {
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      platform: DataTypes.STRING,
      genre: DataTypes.STRING,
      publisher: DataTypes.STRING,
      sale: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "game",
    }
  );
  return game;
};
