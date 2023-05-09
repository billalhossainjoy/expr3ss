const express = require('express')
const path = require('path')
const url = require('url')
const app = express()
const hbs = require('hbs') // handle bars


app.use(express.static('public'))

app.set('view engine','hbs');

hbs.registerPartials(path.join(__dirname,'./views/partials'))

app.config = {
    port: process.env.port | 8080,
    host: '192.168.1.1'
}

app.get('/',(req,res)=>{
    res.render('./layouts/home')
})

app.get('/about',(req,res)=>{
    res.render('./layouts/about',{
        pageTitle: req.url
    })
})
app.get('/projects',(req,res)=>{
    res.render('./layouts/projects')
})
app.get('/Contact',(req,res)=>{
    res.render('./layouts/Contact')
})
app.get('/info',(req,res)=>{
    res.render('./layouts/info')
})

app.get('/',(req,res)=>{
    res.render('./layouts/info')
})

app.get('*',(req,res)=>{
    res.render('./layouts/404NotFound')
})

app.listen(app.config.port, app.config.host,()=>{
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})

