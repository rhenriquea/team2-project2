const bodyParser = require('body-parser')
const app = require('express')()

const routes = require('./routes')

// Routes
app.use('/', routes)

// Body parser
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json())

module.exports = app
