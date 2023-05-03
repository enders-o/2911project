const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const teamController = require("./controller/team_controller");
// const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// routes

app.get("/teams", teamController.list)

app.get("/teams/create", teamController.new)

app.post("/teams/", teamController.create)

app.get("/teams/:id/edit", teamController.edit)

app.get("/teams/:id", teamController.listOne)

app.get("/players", teamController.listAllPlayers)

app.get("/players/:id", teamController.listPlayer)

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});
