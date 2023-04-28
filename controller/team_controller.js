let database = require("../database.json")

let teamController = {
   list: (req, res) => {
    res.render("team/index", { teams: database.teams});
   }, 

   listOne: (req, res) => {
    let teamToFind = req.params.id;
    let searchResult = database.teams.find( team => {
      return team.id == teamToFind;
    })
    res.render("team/single-team", {teamItem: searchResult});
   },

   listAllPlayers: (req, res) => {
      res.render("team/players", {players: database.players});
   },

   listPlayer: (req, res) => {
    let playerToFind = req.params.id;
    let searchResult = database.players.find( player => {
      return player.id == playerToFind
    })
    res.render("team/player-profile", {player: searchResult})
   }
};

module.exports = teamController;