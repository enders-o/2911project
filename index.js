const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session")
const ejsLayouts = require("express-ejs-layouts");
const teamController = require("./controller/team_controller");

const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport")
const {ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth"); 

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24*60*60*1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);
  
//   console.log("Entire session object:");
//   console.log(req.session);
  
//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

// routes

app.get("/teams", ensureAuthenticated, teamController.list);

app.get("/teams/create", ensureAuthenticated, teamController.new);

app.post("/teams/", teamController.create);

app.get("/teams/:id/edit", teamController.edit);

app.post("/teams/update/:id", teamController.update);

app.get("/teams/:id", teamController.listOne);

app.post("/teams/delete/:id", teamController.delete);

app.post("/teams/:id/cancel", teamController.cancel);

app.post("/teams/:id/leave", teamController.leave);

app.post("/teams/:id/request", teamController.request);

app.post("/teams/:team_id/accept/:player_id", teamController.acceptRequest);

app.post("/teams/:team_id/decline/:player_id", teamController.decline);

app.post("/teams/:team_id/kick/:player_id", teamController.kick);

app.get("/players", ensureAuthenticated, teamController.listAllPlayers)

app.get("/players/:id", teamController.listPlayer)

app.get("/user", ensureAuthenticated, teamController.userProfile)

app.get("/user/edit", ensureAuthenticated, teamController.userEdit)

app.post("/user/edit", ensureAuthenticated, teamController.userEditSubmit)

// auth routes
app.get("/register", authController.register);

app.get("/login", forwardAuthenticated,authController.login);

app.post("/register", authController.registerSubmit);

app.post("/login", authController.loginSubmit);

app.get("/logout", authController.logout);

const server = app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});

module.exports = {
  app,
  server
}
