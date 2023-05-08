const database = require("../database.json")

const getUserByEmailIdAndPassword = (email, password) => {
    let user = database.players.find( player => {
        console.log(player)
        return player.email === email;
    })
    if (user) {
        if (isUserValid(user, password)){
            return user;
        }
    }
    return null
}

const getUserById = (id) => {
    let user = database.players.find( player => {
        return player.id === id;
    })
    if(user) {
        return user;
    }
    return null;
}

const isUserValid = (user, password) => {
    return user.password === password;
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById
}