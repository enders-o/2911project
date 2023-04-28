const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
// const reminderController = require("./controller/reminder_controller");
// const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});
