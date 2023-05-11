let database = require("../database.json")

let teamController = {
   list: (req, res) => {
    res.render("team/index", { teams: database.teams});
   },

   new: (req, res) => {
    res.render("team/create-team",{user: req.user});
   },

   edit: (req, res) => {
    let teamToFind = req.params.id;
    let searchResult = database.teams.find( team => {
      return team.id == teamToFind;
    });
    let managerId = searchResult.manager_id;
    let manager = database.players.find(player => {
      return player.id == managerId;
    })
    res.render("team/edit-team", {teamItem: searchResult, manager: manager, user: req.user});
   },

   listOne: (req, res) => {
    let teamToFind = req.params.id;
    let searchResult = database.teams.find( team => {
      return team.id == teamToFind;
    })
    let managerId = searchResult.manager_id;
    let manager = database.players.find(player => {
      return player.id == managerId;
    })
    res.render("team/single-team", {teamItem: searchResult, manager: manager});
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

   userProfile: (req, res) => {
    // let user = req.user;
    res.render("user/user-profile", {user: req.user, teams: database.teams})
   },

   userEdit: (req, res) => {
    res.render("user/user-edit", {user: req.user})
   },

   userEditSubmit: (req, res) => {
    // let playerToFind = req.params.id
    let index = database.players.findIndex( player => {
      return player.id == req.user.id; 
    })
    // console.log(index)
    database.players[index].fname = req.body.fname;
    database.players[index].lname = req.body.lname;
    database.players[index].gender = req.body.gender;
    database.players[index].sport = req.body.sport;
    database.players[index].skill = req.body.skill_level;
    database.players[index].dob = req.body.dob;
    database.players[index].email = req.body.email;
    res.redirect("/user");
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
      location: req.body.location,
    };
    database.teams.push(team);
    res.redirect("/teams");
   },

   update: (req, res) => {
    let teamToFind = req.params.id;
    let index = database.teams.findIndex( team => {
      return team.id == teamToFind;
    });
    database.teams[index].name = req.body.name;
    database.teams[index].description = req.body.description;
    database.teams[index].sport = req.body.sport;
    database.teams[index].skill_level = req.body.skill_level;
    database.teams[index].competitive = req.body.competitive;
    database.teams[index].player_count = req.body.player_count;
    database.teams[index].location = req.body.location;
    res.redirect("/teams")
   },

   delete: (req, res) => {
    let teamToFind = req.params.id;
    let index = database.teams.findIndex(team => {
      return team.id == teamToFind;
    });
    database.teams.splice(index,1);
    res.redirect("/teams")
   }
};

module.exports = teamController;