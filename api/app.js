// const bodyParser = require('body-parser')
const app = require('express')()
// const mongoose = require('mongoose')

/* const { MONGODB_USER, MONGODB_PASS, DB_NAME } = process.env

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.2pngo.mongodb.net/${DB_NAME}`

// Body parser
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json())

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info('Database Connected'))
 */

module.exports = app
