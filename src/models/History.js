const sequelize = require("#config/db")
const { DataTypes } = require("sequelize")

const History = sequelize.define(
  "history",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    song_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
)

module.exports = History
