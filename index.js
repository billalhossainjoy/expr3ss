const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const url = require('url')
const app = express()
const ejs = require('ejs') // handle bars
const mongoAtlas = "mongodb+srv://billalhossainjoy:billalhossain@cluster0.ivs0qnu.mongodb.net/myapp?retryWrites=true&w=majority"
const MongodbServerLink = 'mongodb://127.0.0.1:27017/Usersaccount'

mongoose.connect(MongodbServerLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB server cunnection succesfully....`)).catch((err) => console.log(err))

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

const users = mongoose.model("User", userInfo)

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.config = {
    port: process.env.port | 8080,
    host: '192.168.1.1'
}

app.get('/', (req, res) => {
    // fatch data 
    const getData = async () => {
        try {
            const data = await users.find({})
            const totalIndex = await users.find({}).countDocuments()
            const lastindex = totalIndex-1
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
    getData()
})

app.get('/about', (req, res) => {
    res.render('./layouts/about', {
        route: 'about'
    })
})

app.get('/projects', (req, res) => {
    res.render('./layouts/projects')
})
app.get('/login', (req, res) => {
    res.render('./layouts/login')
})
app.post('/login', (req, res) => {
    res.render('./layouts/login')
})

app.get('/register', (req, res) => {
    res.render('./layouts/register')
})
app.post('/register', (req, res) => {
    const user = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roll: req.body.roll,
        email: req.body.email,
        passowrd: req.body.passowrd
    })
    user.save()
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.render('./layouts/404NotFound')
})

app.listen(app.config.port, app.config.host, () => {
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})