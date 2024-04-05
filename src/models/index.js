const User = require("./User")
const Song = require("./Song")
const Album = require("./Album")
const History = require("./History")

User.hasMany(Album)
Album.belongsTo(User)

User.hasMany(History)
History.belongsTo(User)

User.hasMany(Song)
Song.belongsTo(User)

module.exports = {
  User,
  Song,
  Album,
  History,
}
