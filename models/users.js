const mongoose = require('mongoose')

const userInfo = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    roll: {
        type: Number
    },
    email: {
        type: String
    },
    passowrd: {
        type: String
    },
    techcode: {
        type: Number,
        default: 85,
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model("User", userInfo)

module.exports = Users