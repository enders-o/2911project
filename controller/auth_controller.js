let database = require("../database.json");
const passport = require("../middleware/passport");
const userController = require("./user_controller")

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: passport.authenticate("local", {
        successRedirect: "/teams",
        failureRedirect: "/login",
    }),

    registerSubmit: (req, res) => {
        const user = {
            id: database.players.length + 1,
            fname: req.body.firstName,
            lname: req.body.lastName,
            gender: req.body.gender,
            sport: req.body.sport,
            skill: req.body.skill_level,
            dob: req.body.dob,
            email: req.body.email,
            password: req.body.password,
            picture: null
        };
        database.players.push(user);
        res.redirect("/login");
    },

    logout: (req, res) => {
        req.logout(() => res.redirect("/login"))
    }
}

module.exports = authController;