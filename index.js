require('dotenv').config()
require('./conn')//connect mongodb
const express = require('express')
const router = require('./routes/user')
const app = express()

app.config = {
    port: process.env.port,
    host: '192.168.0.1'
}





app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'))
app.use(router)

app.set('view engine', 'ejs');



app.listen(app.config.port, app.config.host, () => {
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})