const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8080

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Open Weather',
    name: 'Mario Pirrocco'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mario Pirrocco'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    content: 'This is the help page for the Open Weather App',
    name: 'Mario Pirrocco'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  // passing an empty object as default in the callback to avoid errors
  geocode(req.query.address, (error, {lat, long, location} = {}) => { 
		if(error) {
			return res.send({ error })
		}
		forecast(lat, long, location,(error, forecastData) => {
      if(error) {
        res.send({ error })
      }
      
      res.send({    
        forecast: forecastData,
        location,
        address: req.query.address
      })
		})
	})
  
})

app.get('/products', (req, res) => {

  if(!req.query.search) {
    return res.send({
      error: 'Yoy must provide a search term'
    })
  }

  res.send({products: []})
})

 


app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Mario Pirrocco',
    errorMessage:'Article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Mario Pirrocco',
    errorMessage: 'Page not found'
  })
})

app.listen(port, (err) => {
  if(!err) {
    console.log(`Listening on port ${port}`)
  }
})