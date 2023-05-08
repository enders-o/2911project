const { register } = require("../../reminderAppStarterFile/controller/auth_controller");
let database = require("../database.json")

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: (req, res) => {

    },

    registerSubmit: (req, res) => {
        
    }
}

module.exports = authController