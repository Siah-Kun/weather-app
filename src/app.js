const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars and views  location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather', 
        name: 'Josiah Holland'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Josiah Holland'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Josiah Holland',
        message: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "Address must be provided"
        })
    }
  
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
    
       forecast(longitude, latitude, (error, forecastData) => {
           if(error){
               return res.send({ error })
           }
           res.send({
               forecast: forecastData,
               location, 
               address: address
           })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        }) 
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help',
        name: 'Josiah Holland',
        errorMessage: 'Help Article not found'
    })
}) 

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Josiah Holland',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000')
})