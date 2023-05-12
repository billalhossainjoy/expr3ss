const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const url = require('url')
const app = express()
const ejs = require('ejs') // handle bars
const MongodbServerLink = 'mongodb://127.0.0.1:27017/Useraccount'

mongoose.connect(MongodbServerLink).then(() => console.log(`MongoDB server cunnection succesfully....`)).catch((err) => console.log(err))

const userInfo = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    passowrd: {
        type: String
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
})

const users = mongoose.model("Slist", userInfo)




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
    res.render('./layouts/home')
})

app.post('/post', (req, res) => {
    const user = new users({
        name: req.body.name,
        roll: req.body.roll,
        semester: req.body.semester,
        shift: req.body.shift,
        Depertment: req.body.Depertment,
        techCode: req.body.techCode
    })
    console.log(student)
    student.save()
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
    const user = new users ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passowrd: req.body.passowrd
    })
    user.save()
    res.send('data acceppted')
})

app.get('*', (req, res) => {
    res.render('./layouts/404NotFound')
})

app.listen(app.config.port, () => {
    console.log(`server running on http://localhost:${app.config.port}`)
})