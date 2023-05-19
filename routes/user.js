// const { Router } = require("express")
require('dotenv').config()
const express = require('express')
const Users = require('../models/users')
const router = express.Router()
const userControler = require('../controllers/user')
const signupController = require('../controllers/signup')
const loginController = require('../controllers/login')


router.route('/').get(userControler.newUser)

router.route('/about').get(userControler.aboutGet)

router.route('/projects').get(userControler.projectUser)

router.route('/login').get(loginController.loginGet).post(loginController.loginPost)

router.route('/register').get(signupController.signupGet).post(signupController.signupPost)

router.route('*').get(userControler.wrongUser)

module.exports = router;