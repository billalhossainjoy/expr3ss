const Users = require("../models/users")

const newUser = async (req, res) => {
    // fatch data 
    try {
        const data = await Users.find({})
        const totalIndex = await Users.find({}).countDocuments()
        const lastindex = totalIndex - 1
        const i = lastindex
        res.render('./layouts/home', {
            firstName: data[i].firstName,
            lastName: data[i].lastName,
            rollNumber: data[i].roll,
            emailAddress: data[i].email,
            techCode: data[i].techcode,

        })
    } catch (err) {
        console.log(`error is : ${err}`)
    }
}

const wrongUser = async (req, res) => {
    res.render('./layouts/404NotFound')
}
const projectUser = async (req, res) => {
    res.render('./layouts/projects')
}
const aboutGet = async (req, res) => {
    res.render('./layouts/about', {
        route: 'about'
    })
}

const userControler = {
    newUser,
    wrongUser,
    projectUser,
    aboutGet
}

module.exports = userControler