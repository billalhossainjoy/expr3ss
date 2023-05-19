const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const Users = require('../models/users')


const loginGet = async (req, res) => {
    res.render('./layouts/login')
}

const loginPost = async (req, res) => {
    try {
        const user = await Users.find({
            email: req.body.email
        })

        if (user && user.length > 0) {
            const validpassword = await bcrypt.compare(req.body.password, user[0].passowrd)
            if (validpassword) {
                const token = jwt.sign({
                    username: user[0].email,
                    userid: user[0]._id
                }, process.env.JWTSIGN, {
                    expiresIn: '1h'
                })
                res.status(200).json({
                    "token": token,
                    "massage": 'login success'
                })
            } else {
                res.status(402).send('Authentication Error')
            }
        } else {
            res.status(401).send("Authentication Error")
        }
    } catch (error) {
        res.status(400).send("Authentication Error")
    }

}


const loginController ={
    loginGet,
    loginPost
}
module.exports = loginController