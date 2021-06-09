const app = require('../../app')
const data = require('../data/movies.json')

app.get('/api/v1/movies', (req, res) => {
  res.status(200).json({ data })
})

module.exports = app
