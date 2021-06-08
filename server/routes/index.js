const { Router } = require('express')

const data = require('../data/movies.json')

const routes = Router()

routes.get('/movies', (req, res) => {
  res.json({ data })
})

// 500 Page
// eslint-disable-next-line no-unused-vars
routes.use((error, req, res, next) => {
  res.status(500).render('pages/500', {
    title: '500 - Internal Server Error',
    path: req.url,
    error,
  })
})

module.exports = routes
