let database = require("../database.json")

let teamController = {
   list: (req, res) => {
    res.render("team/index", { teams: database.teams});
   },

   new: (req, res) => {
    res.render("team/create-team");
   },

   edit: (req, res) => {
    res.render("team/edit-team");
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
   },

   create: (req, res) => {
    const team = {
      id: database.teams.length + 1,
      name: req.body.name,
      description: req.body.description,
      sport: req.body.sport,
      skill_level: req.body.skill_level,
      competitive: req.body.competitive,
      player_count: req.body.player_count,
      manager_name: req.body.manager_name,
      manager_email: req.body.manager_email,
      location: req.body.location,
    };
    database.teams.push(team);
    res.redirect("/teams");
   },

   update: (req, res) => {
    let teamToFind = req.params.id;
    return
   },

   delete: (req, res) => {
    return
   }
};

module.exports = teamController;