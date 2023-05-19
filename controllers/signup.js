const bcrypt = require('bcrypt')
const Users = require('../models/users')


const signupGet = async (req, res) => {
    res.render('./layouts/register')
}

const signupPost = async (req, res) => {
    let hashPassword = await bcrypt.hash(req.body.passowrd, 10)
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roll: req.body.roll,
        email: req.body.email,
        passowrd: hashPassword
    })
    user.save()
    res.redirect('/')
}

const signupController = {
    signupPost,
    signupGet
}

module.exports = signupController