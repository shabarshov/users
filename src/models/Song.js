const sequelize = require("#config/db")
const { DataTypes } = require("sequelize")

const Song = sequelize.define("songs", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  song_id: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = Song
