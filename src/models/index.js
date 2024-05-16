const User = require("./User")
const Song = require("./Song")
const Album = require("./Album")
const History = require("./History")

User.hasMany(Album, {
  onDelete: "cascade",
})
Album.belongsTo(User)

User.hasMany(History, {
  onDelete: "cascade",
})
History.belongsTo(User)

User.hasMany(Song, {
  onDelete: "cascade",
})
Song.belongsTo(User)

module.exports = {
  User,
  Song,
  Album,
  History,
}
