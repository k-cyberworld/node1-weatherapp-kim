const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utilis/forcast')
const geocode = require('./utilis/geocode')

const app=express()

//define paths for express config
const pathDirectorypublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(pathDirectorypublic))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kimmora micky.'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather App',
        name: 'Kimmora micky.'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        helptext: 'Help',
        title: 'HELP',
        name: 'Favour Nworah'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error){
            return res.send({error})
}
        
        forcast(latitude, longitude, (error, forcastData)=>{
            if (error){
               return res.send({error})
            }
           res.send({
            forcast: forcastData,
            location,
            address: req.query.address
           })
        })
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})
