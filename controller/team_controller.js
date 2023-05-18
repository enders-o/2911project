let database = require("../database.json")

let teamController = {
  list: (req, res) => {
    res.render("team/index", { teams: database.teams });
  },

  new: (req, res) => {
    if(req.user.isManager == false){
      res.status(401);
      res.send("You are not authorized to create a team.");
      res.end();
    } else {
      res.render("team/create-team", { user: req.user });
    }
  },

  edit: (req, res) => {
  if(req.user.isManager == false){
      res.status(401);
      res.send("You are not authorized to edit a team.");
      res.end();
  } else {
    let teamToFind = req.params.id;
    let searchResult = database.teams.find(team => {
      return team.id == teamToFind;
    });
    let managerId = searchResult.manager_id;
    let manager = database.players.find(player => {
      return player.id == managerId;
    })
    res.render("team/edit-team", { teamItem: searchResult, manager: manager, user: req.user });
  }
  },

  listOne: (req, res) => {
    let teamToFind = req.params.id;
    let searchResult = database.teams.find(team => {
      return team.id == teamToFind;
    })
    let managerId = searchResult.manager_id;    
    let manager = database.players.find(player => {
      return player.id == managerId;
    })
    res.render("team/single-team", { teamItem: searchResult, manager: manager, user: req.user, players: database.players});
  },

  listAllPlayers: (req, res) => {
    res.render("team/players", { players: database.players });
  },

  listPlayer: (req, res) => {
    let playerToFind = req.params.id;
    let searchResult = database.players.find(player => {
      return player.id == playerToFind
    })
    res.render("team/player-profile", { player: searchResult })
  },

  userProfile: (req, res) => {
    // let user = req.user;
    res.render("user/user-profile", { user: req.user, teams: database.teams ,players: database.players})
  },

  userEdit: (req, res) => {
    res.render("user/user-edit", { user: req.user })
  },

  userEditSubmit: (req, res) => {
    // let playerToFind = req.params.id
    let index = database.players.findIndex(player => {
      return player.id == req.user.id;
    })
    // console.log(index)
    database.players[index].fname = req.body.fname;
    database.players[index].lname = req.body.lname;
    database.players[index].gender = req.body.gender;
    database.players[index].sport = req.body.sport;
    database.players[index].skill = req.body.skill;
    database.players[index].dob = req.body.dob;
    database.players[index].email = req.body.email;
    database.players[index].social_link = req.body.social_link;
    res.redirect("/user");
  },

  create: (req, res) => {
    if(req.user.isManager == false){
      res.status(401);
      res.send("You are not authorized to create a team.");
      res.end();
    } else {
    const team = {
      id: database.teams.length + 1,
      name: req.body.name,
      description: req.body.description,
      sport: req.body.sport,
      skill_level: req.body.skill_level,
      competitive: req.body.competitive,
      player_count: req.body.player_count,
      location: req.body.location,
      manager_id: req.user.id,
      social_link: req.body.social_link,
    };
    database.teams.push(team);
    res.redirect("/teams");
  }
  },

  update: (req, res) => {
    if(req.user.isManager == false){
      res.status(401);
      res.send("You are not authorized to edit a team.");
      res.end();
    } else {
    let teamToFind = req.params.id;
    let index = database.teams.findIndex(team => {
      return team.id == teamToFind;
    });
    database.teams[index].name = req.body.name;
    database.teams[index].description = req.body.description;
    database.teams[index].sport = req.body.sport;
    database.teams[index].skill_level = req.body.skill_level;
    database.teams[index].competitive = req.body.competitive;
    database.teams[index].player_count = req.body.player_count;
    database.teams[index].location = req.body.location;
    database.teams[index].social_link = req.body.social_link;
    res.redirect("/teams")
  }
  },

  delete: (req, res) => {
    if(req.user.isManager == false){
      res.status(401);
      res.send("You are not authorized to delete a team.");
      res.end();
    } else {
    let teamToFind = req.params.id;
    let index = database.teams.findIndex(team => {
      return team.id == teamToFind;
    });
    database.teams.splice(index, 1);
    res.redirect("/teams")
  }
  },

  cancel: (req, res) => {
    const player = req.user;
    const teamId = req.params.id;
    const index = player.requestedTeams.findIndex(id => {
      return id == teamId;
    });
    player.requestedTeams.splice(index, 1);
    res.redirect("/user");
  },

  leave: (req, res) => {
    const player = req.user;
    console.log(player)
    const teamId = req.params.id;
    const index = player.joinedTeams.findIndex(id => {
      return id == teamId;
    });
    player.joinedTeams.splice(index, 1);
    res.redirect("/user");
  },

  request: (req, res) => {
    const teamId = parseInt(req.params.id);
    const player = req.user;
    if(!player.requestedTeams.includes(teamId)){
      player.requestedTeams.push(teamId);
    } else {
      console.log("already requested")
    };
    res.redirect("/user");
  },

  acceptRequest: (req, res) => {
    const teamId = req.params.team_id;
    const playerId = req.params.player_id;
    const playerToFind = database.players.find(player => {
      return player.id == playerId;
    });
    const teamToFind = database.teams.find(team => {
      return team.id == teamId;
    });
    // if(!teamToFind){
    //   // console.log("team not found")
    //   // respond with status 404
    //   res.status(404).send("Team not found");
    //   // res.redirect("/teams");
    // }
    // if(!playerToFind){
    //   // console.log("player not found")
    //   // respond with status 404
    //   res.status(404).send("Player not found");
    // };
    // if(teamToFind && playerToFind){
      // console.log("team and player found")
      // add player to team
    const index = playerToFind.requestedTeams.findIndex(id => {
      return id == teamId;
    });
    playerToFind.requestedTeams.splice(index, 1);
    playerToFind.joinedTeams.push(teamId);
    res.redirect("/user");
    // };
  },

  decline: (req, res) => {
    const teamId = req.params.team_id;
    const playerId = req.params.player_id;
    const playerToFind = database.players.find(player => {
      return player.id == playerId;
    });
    const teamToFind = database.teams.find(team => {
      return team.id == teamId;
    });
    if(!teamToFind){
      // console.log("team not found")
      // respond with status 404
      res.status(404).send("Team not found");
      // res.redirect("/teams");
    }
    if(!playerToFind){
      // console.log("player not found")
      // respond with status 404
      res.status(404).send("Player not found");
    };
    if(teamToFind && playerToFind){
      // console.log("team and player found")
      // add player to team
    const index = playerToFind.requestedTeams.findIndex(id => {
      return id == teamId;
    });
    playerToFind.requestedTeams.splice(index, 1);
    res.redirect("/user");
    };
  },

  kick: (req, res) => {
    const teamId = req.params.team_id;
    const playerId = req.params.player_id;
    const playerToFind = database.players.find(player => {
      return player.id == playerId;
    });
    const teamToFind = database.teams.find(team => {
      return team.id == teamId;
    });
    if(!teamToFind){
      // console.log("team not found")
      // respond with status 404
      res.status(404).send("Team not found");
      // res.redirect("/teams");
    }
    if(!playerToFind){
      // console.log("player not found")
      // respond with status 404
      res.status(404).send("Player not found");
    };
    if(teamToFind && playerToFind){
      // console.log("team and player found")
      // add player to team
    const index = playerToFind.joinedTeams.findIndex(id => {
      return id == teamId;
    });
    playerToFind.joinedTeams.splice(index, 1);
    res.redirect("/user");
    };
  }

};

module.exports = teamController;