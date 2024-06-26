const sequelize = require("#config/db")
const { DataTypes } = require("sequelize")

const Album = sequelize.define("albums", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  albumId: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = Album
